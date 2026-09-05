import * as XLSX from "xlsx";
import type { Product } from "@/data/products";
import type { Partner } from "@/data/partners";
import { CATS_BY_INDUSTRY, type Industry } from "@/data/categories";
import { slugify } from "@/lib/utils";

const SHEET_INDUSTRY: Record<string, Industry> = {
  "pharma": "pharma",
  "personal care": "cosmetics",
  "food": "food",
};

const COLUMN_ALIASES: Record<string, string[]> = {
  srNo: ["sr.no.", "sr no", "s.no", "sno"],
  supplier: ["supplier name"],
  intro: ["short introduction", "introduction"],
  brand: ["brand", "brand name"],
  product: ["product", "product name"],
  grade: ["grade"],
  manufacturer: ["manufcaturer name", "manufacturer name"],
  country: ["country origin"],
  application: ["application"],
  category: ["category"],
};

type ColumnKey = keyof typeof COLUMN_ALIASES;

export interface ImportError {
  sheet: string;
  row?: number;
  message: string;
}

interface ParsedProductRow {
  industry: Industry;
  sheet: string;
  row: number;
  supplier: string;
  intro: string;
  brand: string | null;
  product: string;
  grade: string | null;
  manufacturer: string | null;
  country: string | null;
  application: string | null;
  category: string;
}

export interface ParsedPrincipal {
  name: string;
  about: string;
  country: string;
  verticals: Industry[];
}

export interface ImportSummary {
  products: Product[];
  principals: Partner[];
  principalDiff: { added: string[]; updated: string[]; removed: string[] };
  countsByIndustry: Record<Industry, { before: number; after: number }>;
  errors: ImportError[];
  warnings: ImportError[];
}

function norm(v: unknown): string | null {
  if (v === null || v === undefined) return null;
  const s = String(v).replace(/\s+/g, " ").trim();
  return s === "" ? null : s;
}

function normKey(v: unknown): string {
  return (norm(v) ?? "").toLowerCase();
}

function findColumns(headerRow: unknown[]): Partial<Record<ColumnKey, number>> {
  const cols: Partial<Record<ColumnKey, number>> = {};
  headerRow.forEach((cell, idx) => {
    const text = normKey(cell);
    if (!text) return;
    for (const key of Object.keys(COLUMN_ALIASES) as ColumnKey[]) {
      if (COLUMN_ALIASES[key].includes(text)) cols[key] = idx;
    }
  });
  return cols;
}

function findHeaderRowIndex(rows: unknown[][]): number {
  for (let i = 0; i < Math.min(rows.length, 5); i++) {
    const cols = findColumns(rows[i]);
    if (cols.supplier !== undefined && cols.product !== undefined) return i;
  }
  return -1;
}

function isRepeatedHeaderRow(row: unknown[], cols: Partial<Record<ColumnKey, number>>): boolean {
  const supplierText = cols.supplier !== undefined ? normKey(row[cols.supplier]) : "";
  const introText = cols.intro !== undefined ? normKey(row[cols.intro]) : "";
  return COLUMN_ALIASES.supplier.includes(supplierText) && COLUMN_ALIASES.intro.includes(introText);
}

function parseSheet(sheetName: string, industry: Industry, rows: unknown[][], errors: ImportError[], warnings: ImportError[]): ParsedProductRow[] {
  const headerIdx = findHeaderRowIndex(rows);
  if (headerIdx === -1) {
    errors.push({ sheet: sheetName, message: `Could not find a header row (expected "Supplier Name" and "Product" columns).` });
    return [];
  }
  const cols = findColumns(rows[headerIdx]);
  if (cols.category === undefined) {
    errors.push({ sheet: sheetName, message: `Missing required "Category" column.` });
    return [];
  }

  const allowedCats = CATS_BY_INDUSTRY[industry];
  const allowedCatsLower = new Map(allowedCats.map(c => [c.toLowerCase(), c]));

  const out: ParsedProductRow[] = [];
  let last = { supplier: "", intro: "", manufacturer: "", country: "", brand: "", product: "" };

  for (let i = headerIdx + 1; i < rows.length; i++) {
    const row = rows[i] ?? [];
    const rowNum = i + 1;
    if (isRepeatedHeaderRow(row, cols)) continue;
    if (row.every(c => norm(c) === null)) continue;

    const get = (key: ColumnKey) => (cols[key] !== undefined ? norm(row[cols[key]!]) : null);

    const srNo = get("srNo");
    let supplier = get("supplier");
    let intro = get("intro");
    let manufacturer = get("manufacturer");
    let country = get("country");
    let brand = get("brand");
    let product = get("product");
    const grade = get("grade");
    const application = get("application");
    const categoryRaw = get("category");

    if (srNo !== null) {
      last.supplier = supplier ?? last.supplier;
      last.intro = intro ?? last.intro;
      last.manufacturer = manufacturer ?? last.manufacturer;
      last.country = country ?? last.country;
    } else {
      supplier = supplier ?? last.supplier;
      intro = intro ?? last.intro;
      manufacturer = manufacturer ?? last.manufacturer;
      country = country ?? last.country;
    }
    if (brand !== null) last.brand = brand; else brand = last.brand || null;
    if (product !== null) last.product = product; else product = last.product || null;

    if (!brand && !product && !grade && !application) continue;

    if (!product) {
      warnings.push({ sheet: sheetName, row: rowNum, message: "Row skipped: no product name (after inheriting from rows above)." });
      continue;
    }
    if (!supplier) {
      warnings.push({ sheet: sheetName, row: rowNum, message: "Row skipped: no supplier name (after inheriting from rows above)." });
      continue;
    }

    const categoryKey = (categoryRaw ?? "").toLowerCase();
    const category = allowedCatsLower.get(categoryKey);
    if (!category) {
      errors.push({
        sheet: sheetName,
        row: rowNum,
        message: categoryRaw
          ? `Invalid Category "${categoryRaw}" for ${sheetName} (brand: ${brand ?? "—"}). Allowed: ${allowedCats.join(", ")}`
          : `Missing Category for ${sheetName} (brand: ${brand ?? "—"}).`,
      });
      continue;
    }

    out.push({
      industry, sheet: sheetName, row: rowNum,
      supplier, intro: intro ?? "", brand, product, grade,
      manufacturer, country, application, category,
    });
  }

  return out;
}

function effectiveGrade(brand: string | null, grade: string | null): string | undefined {
  if (!grade) return undefined;
  if (brand && grade.toLowerCase() === brand.toLowerCase()) return undefined;
  if (["-", "n/a", "none", "\\"].includes(grade.toLowerCase())) return undefined;
  return grade;
}

export function parseProductsWorkbook(buffer: ArrayBuffer): { rows: ParsedProductRow[]; errors: ImportError[]; warnings: ImportError[] } {
  const errors: ImportError[] = [];
  const warnings: ImportError[] = [];
  const wb = XLSX.read(buffer, { type: "array" });

  const rows: ParsedProductRow[] = [];
  let matchedAnySheet = false;

  for (const sheetName of wb.SheetNames) {
    const industry = SHEET_INDUSTRY[sheetName.trim().toLowerCase()];
    if (!industry) continue;
    matchedAnySheet = true;
    const ws = wb.Sheets[sheetName];
    const sheetRows: unknown[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null, blankrows: false });
    rows.push(...parseSheet(sheetName, industry, sheetRows, errors, warnings));
  }

  if (!matchedAnySheet) {
    errors.push({ sheet: "(workbook)", message: `No recognized sheets found. Expected sheet names: PHARMA, PERSONAL CARE, FOOD.` });
  }

  return { rows, errors, warnings };
}

export function buildProducts(rows: ParsedProductRow[]): Product[] {
  const seenSlugs = new Map<string, number>();
  return rows.map((r): Product => {
    const base = slugify(r.brand || r.product) || "product";
    const n = (seenSlugs.get(base) ?? 0) + 1;
    seenSlugs.set(base, n);
    const product: Product = {
      id: `import-${base}-${n}`,
      name: r.product,
      principal: r.supplier,
      category: r.category,
      industry: r.industry,
      description: r.intro,
    };
    if (r.brand) product.brand = r.brand;
    const grade = effectiveGrade(r.brand, r.grade);
    if (grade) product.grade = grade;
    if (r.manufacturer) product.manufacturer = r.manufacturer;
    if (r.country) product.country = r.country;
    if (r.application) product.application = r.application;
    return product;
  });
}

export function buildParsedPrincipals(rows: ParsedProductRow[]): ParsedPrincipal[] {
  const map = new Map<string, ParsedPrincipal>();
  for (const r of rows) {
    const key = r.supplier.toLowerCase();
    const existing = map.get(key);
    if (!existing) {
      map.set(key, { name: r.supplier, about: r.intro, country: r.country ?? "", verticals: [r.industry] });
    } else {
      if (!existing.verticals.includes(r.industry)) existing.verticals.push(r.industry);
      if (!existing.about && r.intro) existing.about = r.intro;
      if (!existing.country && r.country) existing.country = r.country;
    }
  }
  return [...map.values()];
}

export function mergePrincipals(existing: Partner[], parsed: ParsedPrincipal[]): { merged: Partner[]; added: string[]; updated: string[]; removed: string[] } {
  const existingByName = new Map(existing.map(p => [p.name.toLowerCase(), p]));
  const parsedNames = new Set(parsed.map(p => p.name.toLowerCase()));

  const added: string[] = [];
  const updated: string[] = [];
  const merged: Partner[] = parsed.map(p => {
    const match = existingByName.get(p.name.toLowerCase());
    if (match) {
      updated.push(p.name);
      return { ...match, about: p.about, country: p.country, verticals: p.verticals };
    }
    added.push(p.name);
    return { id: slugify(p.name), name: p.name, about: p.about, country: p.country, verticals: p.verticals, specialty: "" };
  });

  const removed = existing.filter(p => !parsedNames.has(p.name.toLowerCase())).map(p => p.name);

  return { merged, added, updated, removed };
}

export function summarizeImport(
  rows: ParsedProductRow[],
  errors: ImportError[],
  warnings: ImportError[],
  currentProducts: Product[],
  currentPartners: Partner[]
): ImportSummary {
  const products = buildProducts(rows);
  const parsedPrincipals = buildParsedPrincipals(rows);
  const { merged, added, updated, removed } = mergePrincipals(currentPartners, parsedPrincipals);

  const countsByIndustry = {} as Record<Industry, { before: number; after: number }>;
  (["pharma", "cosmetics", "food"] as Industry[]).forEach(ind => {
    countsByIndustry[ind] = {
      before: currentProducts.filter(p => p.industry === ind).length,
      after: products.filter(p => p.industry === ind).length,
    };
  });

  return {
    products,
    principals: merged,
    principalDiff: { added, updated, removed },
    countsByIndustry,
    errors,
    warnings,
  };
}

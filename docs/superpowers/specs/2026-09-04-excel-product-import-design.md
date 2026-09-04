# Excel Product Import — Design Spec

Date: 2026-09-04

## Problem

The site's product catalog (`src/data/products.ts`, `src/data/partners.ts`) was found to
diverge significantly from the client's master spreadsheet ("final manufacturer, brand,
product list.xlsx"): mismatched counts per industry, an entire fabricated principal
("Silvateam", 27 products), 33 products carrying another company's boilerplate
description, duplicate cross-industry listings, and 71+87 product-level gaps between
the two sources (see prior audit in conversation history).

The client will maintain the Excel going forward as the single source of truth. Because
the site is deployed as static files to Apache-style shared hosting (`public/.htaccess`
confirms this) with no database, and `public/admin-data.php` persists admin-entered data
to flat JSON files inside the deployed directory, **a full redeploy risks wiping that
JSON data** if the deploy process re-uploads/replaces the whole directory. The client's
plan: keep the Excel current, and re-upload it via the Admin panel after every
deployment to restore the catalog. This requires a real, repeatable, non-technical-user-
facing import feature — not a one-time migration script.

## Decisions (confirmed with user)

1. **Full replace, not merge.** Every upload wipes and rebuilds the entire product
   catalog from the Excel. This is intentional — it's what guarantees the site matches
   the file exactly after every re-upload, and it's how the stale/duplicate data found
   in the audit gets cleaned up automatically instead of accumulating.
2. **New required `Category` column.** The Excel has no category data today, but the
   site's filters depend on it. Rather than guessing from free-text Application/Product
   fields, the client adds one column using a fixed allowed-value list per industry
   (reusing `PHARMA_CATS` / `COSMETICS_CATS` / `FOOD_CATS`, already defined in
   `src/pages/Admin.tsx:34-36`, so the importer and the site's own filter dropdowns can
   never drift apart).
3. **Principal name = `Supplier Name` verbatim.** Today's site sometimes shows a
   curated/brand-style name (e.g. "RUTOCEL" for Excel's "RUITAI"). Per the client's
   stated goal of exactly following the Excel, the importer uses the Excel's Supplier
   Name column as-is, even where it changes current display names.

## Excel contract

Same 3-sheet workbook structure the client already produces — sheet names `PHARMA`,
`PERSONAL CARE`, `FOOD` (case/trailing-space tolerant), industry inferred from sheet
name. Columns (header text tolerant of the variants already seen across the three
sheets):

| Column | Aliases seen | Notes |
|---|---|---|
| Sr. No. | `Sr.No.`, `S.NO` | Marks the start of a new supplier block when non-blank |
| Supplier Name | — | Becomes `principal` verbatim |
| Short Introduction | `Short Introduction`, `Introduction` | Becomes principal `about` |
| Brand | `Brand`, `Brand Name` | |
| Product | `Product`, `Product Name` | Becomes product `name` |
| Grade | — | |
| Manufacturer Name | `Manufcaturer Name` (sic, matches client's existing typo), `Manufacturer Name` | |
| Country origin | `country origin`, `Country origin` | |
| Application | — | |
| **Category** (new) | — | Must be one of the allowed values for that sheet's industry |

**Continuation-row rule** (matches the client's existing spreadsheet convention, already
reverse-engineered and validated against their real file): if Sr.No is blank, the row
continues the previous supplier block — Supplier Name / Short Introduction /
Manufacturer / Country inherit from the last non-blank value above. If Brand or Product
is blank, it also inherits from the row above (this is how multi-grade product lines are
laid out, e.g. Stevia extracts with one row per grade). Grade, Application, and Category
are never inherited — always read per-row.

Two known quirks to tolerate (found in the client's actual file and already handled in
the validated Python prototype): the Food sheet has the header row spuriously repeated
mid-sheet twice (skip any row that exactly matches header text again); a few rows use
the Grade column to literally repeat the Brand name where no real grade exists (treat
`grade == brand` as "no grade").

## Parsing approach

Add `xlsx` (SheetJS) as a runtime dependency. Parse entirely client-side, in the browser,
at file-select time — the PHP backend never sees the binary file, only the final JSON
payload it already knows how to store. Port the forward-fill/header-alias/quirk-handling
logic from the validated Python prototype (used during the audit) into a shared TS
module, e.g. `src/lib/excelImport.ts`, exporting a pure function
`parseProductsWorkbook(file: ArrayBuffer): { products: ParsedProduct[]; errors: ImportError[] }`
so it's unit-testable without a browser file-picker in the loop.

## Products: full replace

New method on `ProductsContext`: `importAll(products: Product[]): Promise<boolean>`,
mirroring the existing `persist()` path — sets state, marks `isCustomized`, and calls
`saveServerData("products", products)`. No backend changes: `admin-data.php` already
accepts an arbitrary JSON blob per `type`. Product `id`s are regenerated on import
(`import_<slugified-brand>_<n>` with a numeric suffix for uniqueness) since there's no
stable external ID to preserve across full replacements.

## Principals: derived, not blind-replaced

The Excel supplies `name` (Supplier Name), `about` (Short Introduction), `country`, and
implicitly `verticals` (every industry sheet that supplier appears in). It does **not**
supply `logo` or `specialty` — both are manually curated today via the existing Admin
partner-edit form (`src/pages/Admin.tsx:586-618`, logo upload as data-URI or filename).

Merge algorithm on every import:
1. Build the new principal set from the Excel (one entry per unique, normalized Supplier
   Name across all three sheets), with `verticals` = union of industries it appears in.
2. For each, look up an existing partner by normalized name:
   - **Match found**: update `about`, `country`, `verticals`; **carry forward** existing
     `logo`, `specialty`, and `id` unchanged.
   - **No match (new principal)**: create with a slugified-name `id`, blank `logo`
     (site already renders initials as a fallback — confirmed in `Principals.tsx`
     `onError` handler), and blank `specialty` for later manual fill-in.
3. Existing partners with no matching Supplier Name in the new Excel are dropped
   (consistent with full-replace semantics for products).

New `PartnersContext` method: `importAll(partners: Partner[])`, same shape as the
products one, persisting via `saveServerData("partners", partners)`.

## Admin UI flow

In the Admin Products tab: an "Import from Excel" button opens a file picker
(`.xlsx` only) →
1. Parse client-side.
2. **Validation pass** — blocking errors: missing `Category` column entirely, or any row
   with a `Category` value not in the allowed list for its industry (surfaced as a list:
   sheet, row, brand, offending value). Non-blocking warnings: rows missing
   Brand/Product/Grade entirely (skipped, counted).
3. **Preview screen** — before any write: counts per industry (current vs. new), how
   many principals will be added / updated / removed, and the validation
   errors/warnings list. Commit button disabled while blocking errors exist.
4. **Confirm** (explicit, since this is destructive) → commit → `importAll` for both
   products and partners → success toast with final counts.

## Out of scope

News and Careers are untouched by this feature — they don't appear in this Excel at all
and keep using today's manual Admin CRUD + existing persistence.

## ID generation

Both new principal IDs and new product IDs use the same slug rule: lowercase, strip
`®`/`™`/`©`, replace any run of non-alphanumeric characters with a single hyphen, trim
leading/trailing hyphens. Product IDs additionally append a numeric suffix
(`<slug>-<n>`) to stay unique across grade variants of the same brand. Check whether an
equivalent slugify helper already exists in `src/lib/utils.ts` before adding a new one.

## Open items for implementation planning

- Unit tests for the parser against a fixture derived from (an anonymized excerpt of)
  the client's real workbook, covering: continuation rows, the Food-sheet duplicate
  header quirk, grade-equals-brand rows, and invalid/missing Category values.

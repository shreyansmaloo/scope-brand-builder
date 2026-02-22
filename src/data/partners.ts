import { products, type Product } from "./products";

export interface Partner {
  id: string;
  name: string;
  country: string;
  verticals: ("pharma" | "cosmetics" | "food")[];
  specialty: string;
}

export const partners: Partner[] = [
  { id: "roquette", name: "Roquette", country: "France", verticals: ["pharma", "food"], specialty: "Starch & polyol-based excipients" },
  { id: "kerry", name: "Kerry", country: "Ireland", verticals: ["food", "pharma"], specialty: "Taste & nutrition solutions" },
  { id: "prayon", name: "Prayon", country: "Belgium", verticals: ["pharma", "food"], specialty: "Phosphate-based ingredients" },
  { id: "stepan", name: "Stepan", country: "USA", verticals: ["cosmetics"], specialty: "Surfactants & emulsifiers" },
  { id: "kewpie", name: "Kewpie", country: "Japan", verticals: ["cosmetics"], specialty: "Hyaluronic acid & actives" },
  { id: "3v", name: "3V Sigma", country: "Italy", verticals: ["cosmetics"], specialty: "UV filters & preservatives" },
  { id: "tensachem", name: "Tensachem", country: "Belgium", verticals: ["cosmetics"], specialty: "Specialty surfactants" },
  { id: "salvona", name: "Salvona", country: "USA", verticals: ["cosmetics", "pharma"], specialty: "Encapsulation technology" },
  { id: "finzelberg", name: "Finzelberg", country: "Germany", verticals: ["pharma", "food"], specialty: "Botanical extracts" },
  { id: "tate-lyle", name: "Tate & Lyle", country: "UK", verticals: ["food"], specialty: "Sweeteners & stabilizers" },
  { id: "sun-pharma", name: "Sun Pharma Advanced", country: "India", verticals: ["pharma"], specialty: "Specialty excipients" },
  { id: "zochem", name: "Zochem", country: "Canada", verticals: ["pharma", "cosmetics"], specialty: "Zinc oxide" },
  { id: "olvea", name: "Olvea", country: "France", verticals: ["cosmetics"], specialty: "Natural oils & butters" },
  { id: "essentia", name: "Essentia", country: "Netherlands", verticals: ["food", "pharma"], specialty: "Protein & gelatin solutions" },
];

export const getPartnersByVertical = (vertical: "pharma" | "cosmetics" | "food") =>
  partners.filter((p) => p.verticals.includes(vertical));

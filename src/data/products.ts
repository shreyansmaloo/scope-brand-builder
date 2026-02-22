export interface Product {
  id: string;
  name: string;
  principal: string;
  category: string;
  industry: "pharma" | "cosmetics" | "food";
  dosageForm?: string;
  description: string;
}

export const products: Product[] = [
  { id: "1", name: "Microcrystalline Cellulose", principal: "Roquette", category: "Binders", industry: "pharma", dosageForm: "Solid Orals", description: "High-quality MCC for direct compression and wet granulation" },
  { id: "2", name: "Pregelatinized Starch", principal: "Roquette", category: "Binders", industry: "pharma", dosageForm: "Solid Orals", description: "Modified starch for improved tablet binding" },
  { id: "3", name: "Lactose Monohydrate", principal: "Kerry", category: "Fillers", industry: "pharma", dosageForm: "Solid Orals", description: "Pharmaceutical-grade lactose for solid dosage forms" },
  { id: "4", name: "Croscarmellose Sodium", principal: "Roquette", category: "Disintegrants", industry: "pharma", dosageForm: "Solid Orals", description: "Superdisintegrant for rapid tablet disintegration" },
  { id: "5", name: "Sodium Stearyl Fumarate", principal: "Roquette", category: "Lubricants", industry: "pharma", dosageForm: "Solid Orals", description: "Vegetable-sourced lubricant for clean-label tablets" },
  { id: "6", name: "Hypromellose (HPMC)", principal: "Kerry", category: "Coatings", industry: "pharma", dosageForm: "Coatings", description: "Film coating polymer for controlled release" },
  { id: "7", name: "Polysorbate 80", principal: "Kerry", category: "Emulsifiers", industry: "pharma", dosageForm: "Liquid Orals", description: "Non-ionic surfactant for parenteral and oral solutions" },
  { id: "8", name: "Sucralose", principal: "Tate & Lyle", category: "Sweeteners", industry: "pharma", dosageForm: "Liquid Orals", description: "High-intensity sweetener for pediatric formulations" },
  { id: "9", name: "Carbomer 940", principal: "3V Sigma", category: "Thickeners", industry: "pharma", dosageForm: "Topicals", description: "Cross-linked polyacrylic acid for gel formulations" },
  { id: "10", name: "Cetyl Alcohol", principal: "Stepan", category: "Emollients", industry: "cosmetics", description: "Fatty alcohol for creams and lotions" },
  { id: "11", name: "Sodium Hyaluronate", principal: "Kewpie", category: "Actives", industry: "cosmetics", description: "Ultra-pure hyaluronic acid for anti-aging formulations" },
  { id: "12", name: "Octocrylene", principal: "3V Sigma", category: "UV Filters", industry: "cosmetics", description: "Oil-soluble UV absorber for sunscreen formulations" },
  { id: "13", name: "Glyceryl Stearate", principal: "Stepan", category: "Emulsifiers", industry: "cosmetics", description: "Self-emulsifying base for O/W creams" },
  { id: "14", name: "Dimethicone", principal: "Stepan", category: "Emollients", industry: "cosmetics", description: "Silicone-based emollient for skin and hair care" },
  { id: "15", name: "Phenoxyethanol", principal: "3V Sigma", category: "Preservatives", industry: "cosmetics", description: "Broad-spectrum preservative for cosmetic products" },
  { id: "16", name: "Shea Butter", principal: "Olvea", category: "Emollients", industry: "cosmetics", description: "Cold-pressed African shea butter for premium skincare" },
  { id: "17", name: "Xanthan Gum", principal: "Kerry", category: "Stabilizers", industry: "food", description: "Polysaccharide thickener and stabilizer" },
  { id: "18", name: "Sucralose Food Grade", principal: "Tate & Lyle", category: "Sweeteners", industry: "food", description: "Zero-calorie sweetener for beverages and food" },
  { id: "19", name: "Gelatin Type A", principal: "Essentia", category: "Functional Actives", industry: "food", description: "Porcine gelatin for capsules and confectionery" },
  { id: "20", name: "Calcium Phosphate", principal: "Prayon", category: "Minerals", industry: "food", description: "Food-grade calcium source for nutritional products" },
  { id: "21", name: "Zinc Oxide USP", principal: "Zochem", category: "Actives", industry: "pharma", dosageForm: "Topicals", description: "Ultra-fine zinc oxide for dermatological preparations" },
  { id: "22", name: "Argan Oil", principal: "Olvea", category: "Emollients", industry: "cosmetics", description: "Organic Moroccan argan oil for premium haircare" },
  { id: "23", name: "Beta-Cyclodextrin", principal: "Roquette", category: "Solubilizers", industry: "pharma", dosageForm: "Solid Orals", description: "Molecular encapsulation for improved bioavailability" },
  { id: "24", name: "Botanical Extract Blend", principal: "Finzelberg", category: "Functional Actives", industry: "food", description: "Standardized herbal extracts for nutraceuticals" },
];

export const categories = [...new Set(products.map((p) => p.category))];
export const industries = ["pharma", "cosmetics", "food"] as const;

export const getProductsByIndustry = (industry: string) =>
  products.filter((p) => p.industry === industry);

export const getProductsByCategory = (category: string) =>
  products.filter((p) => p.category === category);

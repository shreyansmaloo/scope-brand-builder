export interface Partner {
  id: string;
  name: string;
  country: string;
  verticals: ("pharma" | "cosmetics" | "food")[];
  specialty: string;
}

export const partners: Partner[] = [
  // Pharma Principals
  { id: "gelymar", name: "Gelymar", country: "Chile", verticals: ["pharma"], specialty: "Hydrocolloids & carrageenan solutions" },
  { id: "reckon", name: "Reckon Organics", country: "India", verticals: ["pharma", "food"], specialty: "Ascorbic acid & vitamin C derivatives" },
  { id: "prayon", name: "Prayon", country: "Belgium", verticals: ["pharma", "food"], specialty: "Phosphate-based ingredients" },
  { id: "tomita", name: "Tomita", country: "Japan", verticals: ["pharma"], specialty: "Minerals & inorganic pharmaceuticals" },
  { id: "surinerts", name: "Surinerts", country: "India", verticals: ["pharma"], specialty: "Sugar spheres & globules for controlled release" },
  { id: "standard-chem", name: "Standard Chem", country: "Taiwan", verticals: ["pharma"], specialty: "Sodium stearyl fumarate lubricant" },
  { id: "rutocel", name: "RUTOCEL", country: "China", verticals: ["pharma", "cosmetics"], specialty: "HPMC, ethyl cellulose & HPC" },
  { id: "tianli", name: "Tianli", country: "China", verticals: ["pharma"], specialty: "Mannitol & sorbitol polyols" },
  { id: "cygnus", name: "Cygnus Polyols", country: "India", verticals: ["pharma"], specialty: "Mannitol & lactose formulations" },
  { id: "lactopharm", name: "LactoPharm", country: "India", verticals: ["pharma"], specialty: "Lactose for tableting & capsules" },
  { id: "sun-chemical", name: "Sun Chemical", country: "USA", verticals: ["pharma", "cosmetics"], specialty: "Iron oxide colorants" },

  // Cosmetics / Personal Care Principals
  { id: "3v", name: "3V Sigma", country: "Italy", verticals: ["cosmetics"], specialty: "Rheology modifiers, carbomers & conditioners" },
  { id: "mfci", name: "MFCI", country: "China", verticals: ["cosmetics"], specialty: "UV absorbers & sunscreen agents" },
  { id: "soho-aneco", name: "Soho Aneco", country: "China", verticals: ["cosmetics"], specialty: "Green surfactants & skin brightening actives" },
  { id: "salvona", name: "Salvona", country: "USA", verticals: ["cosmetics"], specialty: "Encapsulation technology & microsphere delivery" },
  { id: "olvea", name: "Olvea", country: "France", verticals: ["cosmetics"], specialty: "Natural oils, butters & argan oil" },
  { id: "natures-crops", name: "Natures Crops", country: "USA", verticals: ["cosmetics"], specialty: "Specialty oilseed crops & oils" },
  { id: "cosmax", name: "Cosmax", country: "China", verticals: ["cosmetics"], specialty: "Silicone-based cosmetic ingredients" },
  { id: "cht-bezema", name: "CHT Bezema", country: "Germany", verticals: ["cosmetics"], specialty: "Silicone conditioners for haircare" },
  { id: "nanogen", name: "Nanogen", country: "India", verticals: ["cosmetics"], specialty: "Color cosmetics & film formers" },
  { id: "p2-sciences", name: "P2 Sciences", country: "USA", verticals: ["cosmetics"], specialty: "Sustainable silicone alternatives (Citropol)" },
  { id: "saboderm", name: "Saboderm", country: "Europe", verticals: ["cosmetics"], specialty: "Emollient esters & lipid enhancers" },
  { id: "akott", name: "Akott Evolution", country: "Italy", verticals: ["cosmetics"], specialty: "Botanical actives & plant extracts" },
  { id: "alula", name: "Alula Peregrina", country: "Middle East", verticals: ["cosmetics"], specialty: "Moringa Peregrina oils & extracts" },

  // Food & Nutraceuticals Principals
  { id: "jianlong", name: "Jianlong", country: "China", verticals: ["food"], specialty: "Xanthan gum & dietary fiber" },
  { id: "custom-fiber", name: "Custom Fiber", country: "International", verticals: ["food"], specialty: "Functional high-quality dietary fibers" },
  { id: "satoria", name: "Satoria Agro", country: "Indonesia", verticals: ["food"], specialty: "Resistant maltodextrin (DRM)" },
  { id: "qht", name: "QHT", country: "China", verticals: ["food"], specialty: "FOS & GOS prebiotics" },
  { id: "sopure", name: "SoPure", country: "USA", verticals: ["food"], specialty: "Vertically integrated stevia" },
  { id: "shandong", name: "Shandong Sanyuan", country: "China", verticals: ["food"], specialty: "Erythritol sweetener" },
  { id: "baltmilk", name: "BaltMilk", country: "Europe", verticals: ["food"], specialty: "Milk protein concentrate & micellar casein" },
  { id: "china-foodstuff", name: "China Foodstuff", country: "China", verticals: ["food"], specialty: "Soy protein isolate" },
  { id: "algahealth", name: "AlgaHealth", country: "Israel", verticals: ["food"], specialty: "Microalgae-based nutraceuticals" },
  { id: "lutkala", name: "Lutkala", country: "Europe", verticals: ["food"], specialty: "Natural thickeners from apple pomace" },
  { id: "fibervita", name: "Fibervita", country: "Brazil", verticals: ["food"], specialty: "Tapioca fiber & cassava flour" },
  { id: "coffeefruit", name: "CoffeeFruit", country: "Costa Rica", verticals: ["food"], specialty: "Coffee fruit pomace antioxidants" },
];

export const getPartnersByVertical = (vertical: "pharma" | "cosmetics" | "food") =>
  partners.filter((p) => p.verticals.includes(vertical));

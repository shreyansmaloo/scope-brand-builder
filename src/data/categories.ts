export type Industry = "pharma" | "cosmetics" | "food";

export const PHARMA_CATS = ["Polymers & Cellulosics","Film Coating Polymers","Enteric Polymers","Fillers & Diluents","Disintegrants","Disintegrants & Binders","Binders","Lubricants & Glidants","Solubilizers & Surfactants","Plasticizers & Humectants","Colorants","Coating & Polishing","Capsule & Gel Formers","Pharmaceutical Excipients"];
export const COSMETICS_CATS = ["Active Ingredients","Antioxidants & Vitamins","Brightening Agents","Anti-Aging Actives","Peptides","Humectants & Fillers","Humectants & Polyols","Protein Actives","Lipids & Ceramides","UV Filters & Sunscreens","Preservatives","Silicones & Emollients","Botanical Extracts","Exfoliants","Emollients & Oils"];
export const FOOD_CATS = ["Sweeteners","Emulsifiers","Stabilizers & Hydrocolloids","Starches & Thickeners","Vitamins & Nutrients","Minerals & Nutrients","Fatty Acids & Lipids","Proteins & Amino Acids","Probiotics & Prebiotics","Colors & Pigments","Flavors & Seasonings","Antioxidants & Preservatives","Food Ingredients"];

export const CATS_BY_INDUSTRY: Record<Industry, string[]> = {
  pharma: PHARMA_CATS,
  cosmetics: COSMETICS_CATS,
  food: FOOD_CATS,
};

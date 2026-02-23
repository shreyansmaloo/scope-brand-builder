export interface Product {
  id: string;
  name: string;
  inci?: string;
  principal: string;
  category: string;
  industry: "pharma" | "cosmetics" | "food";
  dosageForm?: string;
  description: string;
  form?: string;
  dosage?: string;
}

export const products: Product[] = [
  // ==================== PHARMA ====================
  // Gelymar
  { id: "p1", name: "Carrageenan", inci: "Carrageenan", principal: "Gelymar", category: "Film Formers", industry: "pharma", dosageForm: "Solid Orals", description: "Film former in capsule manufacturing stabilizer", form: "Powder" },
  { id: "p2", name: "Sodium Alginate", inci: "Sodium Alginate", principal: "Gelymar", category: "Thickeners", industry: "pharma", dosageForm: "Liquid Orals", description: "Thickener and gelling agent (USP/EP)", form: "Powder" },

  // Reckon Organics - Pharma
  { id: "p3", name: "Ascorbic Acid", inci: "Ascorbic Acid", principal: "Reckon Organics", category: "Vitamins", industry: "pharma", dosageForm: "Solid Orals", description: "Vitamin C (IP/BP/USP)", form: "Powder" },
  { id: "p4", name: "Sodium Ascorbate", inci: "Sodium Ascorbate", principal: "Reckon Organics", category: "Antioxidants", industry: "pharma", dosageForm: "Solid Orals", description: "Antioxidant & acidity regulator (IP/BP/USP)", form: "Powder" },
  { id: "p5", name: "Calcium Ascorbate", inci: "Calcium Ascorbate", principal: "Reckon Organics", category: "Vitamins", industry: "pharma", description: "Food additive (IP)", form: "Powder" },
  { id: "p6", name: "Ascorbic Acid Coated", inci: "Ascorbic Acid Coated", principal: "Reckon Organics", category: "Vitamins", industry: "pharma", dosageForm: "Solid Orals", description: "Coated vitamin C for capsules & premixes (IP)", form: "Powder" },
  { id: "p7", name: "Ferrous Ascorbate", inci: "Ferrous Ascorbate", principal: "Reckon Organics", category: "Minerals", industry: "pharma", description: "Iron deficiency & anaemia treatment (IP)", form: "Powder" },

  // Prayon
  { id: "p8", name: "Dibasic Calcium Phosphate Anhydrous (DCPA)", inci: "Dibasic Calcium Phosphate Anhydrous", principal: "Prayon", category: "Fillers", industry: "pharma", dosageForm: "Solid Orals", description: "Diluent in tablets & capsules with good compaction and flow properties (USP, PhEur)", form: "Powder" },
  { id: "p9", name: "Dibasic Calcium Phosphate Dihydrate (DCPD)", inci: "Dibasic Calcium Phosphate Dihydrate", principal: "Prayon", category: "Fillers", industry: "pharma", dosageForm: "Solid Orals", description: "Tablet and capsule diluent (USP, PhEur)", form: "Powder" },
  { id: "p10", name: "Tribasic Calcium Phosphate (TCP)", inci: "Tribasic Calcium Phosphate", principal: "Prayon", category: "Fillers", industry: "pharma", dosageForm: "Solid Orals", description: "Buffer, glidant, diluent, anticaking agent (USP, NF, PhEur)", form: "Powder" },

  // Tomita
  { id: "p11", name: "Magnesium Oxide Light/Heavy/DC Grade", inci: "Magnesium Oxide", principal: "Tomita", category: "Minerals", industry: "pharma", description: "Alkaline diluent, pH modifier, glidant, anticaking agent, emulsifying agent (USP, NF, BP, JP, PhEur)", form: "Powder" },
  { id: "p12", name: "Magnesium Carbonate Light/Heavy", inci: "Magnesium Carbonate", principal: "Tomita", category: "Minerals", industry: "pharma", description: "Adsorbent, diluent (USP, PhEur, JP)", form: "Powder" },
  { id: "p13", name: "Magnesium Hydroxide", inci: "Magnesium Hydroxide", principal: "Tomita", category: "Minerals", industry: "pharma", description: "Mineral supplement (USP, NF, BP, JP, PhEur)", form: "Powder" },
  { id: "p14", name: "Magnesium Trisilicate", inci: "Magnesium Trisilicate", principal: "Tomita", category: "Minerals", industry: "pharma", description: "Glidant, anticaking agent, therapeutic agent (PhEur, USP, JP)", form: "Powder" },
  { id: "p15", name: "Sodium Chloride", inci: "Sodium Chloride", principal: "Tomita", category: "Tonicity Agents", industry: "pharma", dosageForm: "Parenterals", description: "Tonicity agent, tablet and capsule diluent, saline preparations (PhEur, USP, JP)", form: "Powder" },
  { id: "p16", name: "Calcium Hydroxide", inci: "Calcium Hydroxide", principal: "Tomita", category: "pH Modifiers", industry: "pharma", description: "pH modifier (USP, JP)", form: "Powder" },
  { id: "p17", name: "Calcium Silicate", inci: "Calcium Silicate", principal: "Tomita", category: "Glidants", industry: "pharma", description: "Anticaking agent, glidant and antacid (JP, NF, USP)", form: "Powder" },
  { id: "p18", name: "Calcium Citrate", inci: "Calcium Citrate", principal: "Tomita", category: "Preservatives", industry: "pharma", description: "Preservative (USP, NF, JP)", form: "Powder" },
  { id: "p19", name: "Magnesium Chloride", inci: "Magnesium Chloride", principal: "Tomita", category: "Minerals", industry: "pharma", description: "Mineral supplement (USP, NF, BP, JP, PhEur)", form: "Powder" },
  { id: "p20", name: "Magaldrate", inci: "Magaldrate", principal: "Tomita", category: "Antacids", industry: "pharma", description: "Antacid (USP, NF, BP, JP, PhEur, DMF Available)", form: "Powder" },
  { id: "p21", name: "Magnesium Sulfate", inci: "Magnesium Sulfate", principal: "Tomita", category: "Minerals", industry: "pharma", description: "Mineral supplement (USP, DMF Available)", form: "Powder" },

  // Surinerts
  { id: "p22", name: "Sugar Spheres", inci: "Sugar Spheres", principal: "Surinerts", category: "Coatings", industry: "pharma", dosageForm: "Solid Orals", description: "Inert cores based on sucrose and maize starch for controlled release oral drug forms (USP, PhEUR, JP)", form: "Spheres" },
  { id: "p23", name: "Sugar Globules", inci: "Sugar Globules", principal: "Surinerts", category: "Coatings", industry: "pharma", dosageForm: "Solid Orals", description: "Inert cores for controlled release oral drug forms (USP, PhEUR)", form: "Globules" },

  // Standard Chem
  { id: "p24", name: "Sodium Stearyl Fumarate", inci: "Sodium Stearyl Fumarate", principal: "Standard Chem", category: "Lubricants", industry: "pharma", dosageForm: "Solid Orals", description: "Superior lubricant with higher tablet hardness and lower ejection forces (USP, NF, PhEur, BP, DMF available)", form: "Powder" },

  // Stearic Acid
  { id: "p25", name: "Stearic Acid Powder", inci: "Stearic Acid", principal: "Palm Oil Derivatives", category: "Lubricants", industry: "pharma", dosageForm: "Solid Orals", description: "Lubricating agent to prevent ingredients from clumping and sticking (USP, PhEUR, DMF available)", form: "Powder" },

  // RUTOCEL
  { id: "p26", name: "HPMC E3/E5/E6/E15/E50/E4M", inci: "Hypromellose", principal: "RUTOCEL", category: "Binders", industry: "pharma", dosageForm: "Solid Orals", description: "Binder, coating agent, suspending agent (USP, PhEur, JP)", form: "Powder" },
  { id: "p27", name: "HPMC K4M/K15M/K100M/K200M", inci: "Hypromellose", principal: "RUTOCEL", category: "Coatings", industry: "pharma", dosageForm: "Coatings", description: "Rate controlling polymer, coating agent (USP, PhEur, JP)", form: "Powder" },
  { id: "p28", name: "Ethyl Cellulose N7–N300 & Aqueous", inci: "Ethyl Cellulose", principal: "RUTOCEL", category: "Coatings", industry: "pharma", dosageForm: "Coatings", description: "Hydrophilic coating agent, binder, release modifier (USP, PhEur, JP)", form: "Powder/Liquid" },
  { id: "p29", name: "Hydroxy Propyl Cellulose (HPC)", inci: "Hydroxypropyl Cellulose", principal: "RUTOCEL", category: "Binders", industry: "pharma", dosageForm: "Solid Orals", description: "Coating agent, binder, suspending agent (USP, PhEur, JP)", form: "Powder" },

  // TIANTO
  { id: "p30", name: "Mannitol – Low Endotoxin", inci: "Mannitol", principal: "Tianli", category: "Fillers", industry: "pharma", dosageForm: "Parenterals", description: "Cryoprotectant, mannitol injections and pyrogen free (USP, BP, IP, PhEur)", form: "Powder" },
  { id: "p31", name: "Mannitol Powder", inci: "Mannitol", principal: "Tianli", category: "Fillers", industry: "pharma", dosageForm: "Solid Orals", description: "Diluent, sweetener in chewable tablets (USP, BP, EP)", form: "Powder" },
  { id: "p32", name: "Sorbitol Powder", inci: "Sorbitol", principal: "Tianli", category: "Fillers", industry: "pharma", dosageForm: "Solid Orals", description: "Diluent, sweetener in chewable tablets (USP, BP, EP)", form: "Powder" },
  { id: "p33", name: "Sorbitol DC", inci: "Sorbitol", principal: "Tianli", category: "Fillers", industry: "pharma", dosageForm: "Solid Orals", description: "Sweetener, humectant (USP/EP)", form: "Powder" },

  // Cygnus Polyols
  { id: "p34", name: "Cygnol Mannitol 200SD/100", inci: "Mannitol", principal: "Cygnus Polyols", category: "Fillers", industry: "pharma", dosageForm: "Solid Orals", description: "Used as filler and binder (USP/EP/BP/IP)", form: "Powder" },
  { id: "p35", name: "Cygnol Mannitol 25C/50C/150C", inci: "Mannitol", principal: "Cygnus Polyols", category: "Fillers", industry: "pharma", dosageForm: "Solid Orals", description: "Used as filler and binder (USP/EP/BP/IP)", form: "Crystalline" },

  // LactoPharm
  { id: "p36", name: "LactoPharma 200", inci: "Lactose Monohydrate", principal: "LactoPharm", category: "Fillers", industry: "pharma", dosageForm: "Solid Orals", description: "Used in capsules and tableting by wet and dry granulation (USP/EP/BP/IP)", form: "Powder" },
  { id: "p37", name: "LactoPharma SD", inci: "Lactose Monohydrate", principal: "LactoPharm", category: "Fillers", industry: "pharma", dosageForm: "Solid Orals", description: "Used in tableting by direct compression processes (USP/EP/BP/IP)", form: "Powder" },

  // Sun Chemical - Pharma
  { id: "p38", name: "Iron Oxide (Red/Yellow/Black/Brown)", inci: "CI 77491/77492/77499", principal: "Sun Chemical", category: "Colorants", industry: "pharma", dosageForm: "Coatings", description: "Color cosmetics grade iron oxides for pharmaceutical coatings", form: "Powder" },

  // ==================== COSMETICS / PERSONAL CARE ====================
  // Rheology Modifiers / Thickeners
  { id: "c1", name: "Carrageenan", inci: "Carrageenan", principal: "3V Sigma", category: "Rheology Modifiers", industry: "cosmetics", description: "Thickening agent for cosmetics & oral care", form: "Powder", dosage: "0.1% - 3%" },
  { id: "c2", name: "PNC 400", inci: "Sodium Carbomer", principal: "3V Sigma", category: "Rheology Modifiers", industry: "cosmetics", description: "Pre-neutralised synthetic polymer – thickener, suspending agent and emulsion stabilizer", form: "Powder", dosage: "0.2 - 2.0%" },
  { id: "c3", name: "Polygel CS", inci: "Carbomer 934", principal: "3V Sigma", category: "Rheology Modifiers", industry: "cosmetics", description: "Thickener & suspending agent for emulsions and suspensions", form: "Fine Powder", dosage: "0.1 - 1.5%" },
  { id: "c4", name: "Polygel CA", inci: "Carbomer 940", principal: "3V Sigma", category: "Rheology Modifiers", industry: "cosmetics", description: "Sparkling & clear gel with high viscosity – thickener and suspending agent", form: "Powder", dosage: "0.1 - 2%" },
  { id: "c5", name: "Synthalen W 400", inci: "Acrylates Copolymer", principal: "3V Sigma", category: "Rheology Modifiers", industry: "cosmetics", description: "High suspending ability for thickener and beads in facewash, body wash, shower gel", form: "Liquid", dosage: "1 - 10%" },
  { id: "c6", name: "Synthalen W 2000", inci: "Acrylates/Palmeth-25 Acrylate Copolymer", principal: "3V Sigma", category: "Rheology Modifiers", industry: "cosmetics", description: "Anionic acrylic copolymer for clear gel & oil in water emulsion stabilizing", form: "Liquid", dosage: "0.5 - 7%" },
  { id: "c7", name: "Synthalen MP", inci: "Carbomer 934P / 974P", principal: "3V Sigma", category: "Rheology Modifiers", industry: "cosmetics", description: "Thickening & suspending agent complying to EP for topical and oral care", form: "Fine Powder", dosage: "0.1 - 1.5%" },
  { id: "c8", name: "Synthalen M", inci: "Carbomer 934 / 974", principal: "3V Sigma", category: "Rheology Modifiers", industry: "cosmetics", description: "Thickening & suspending agent for cosmetic and pharma emulsions", form: "Fine Powder", dosage: "0.1 - 1.5%" },
  { id: "c9", name: "Synthalen KP", inci: "Carbomer 940P", principal: "3V Sigma", category: "Rheology Modifiers", industry: "cosmetics", description: "Thickening and suspending agent complying to EP", form: "Fine Powder", dosage: "0.1 - 1.5%" },
  { id: "c10", name: "Synthalen K", inci: "Carbomer 940", principal: "3V Sigma", category: "Rheology Modifiers", industry: "cosmetics", description: "Thickening and suspending agent with high clarity for sparkling clear gels", form: "Fine Powder", dosage: "0.1 - 1.5%" },
  { id: "c11", name: "Synthalen E 80", inci: "Carbomer 980", principal: "3V Sigma", category: "Rheology Modifiers", industry: "cosmetics", description: "Thickening & suspending agent for shampoo, cream, lotion, gel", form: "Powder", dosage: "0.1 - 1.5%" },
  { id: "c12", name: "Stabylen 30", inci: "Acrylates/Vinyl Isodecanoate Crosspolymer", principal: "3V Sigma", category: "Rheology Modifiers", industry: "cosmetics", description: "Emulsifying with good thickening & high spreadability", form: "Powder", dosage: "0.1 - 1.5%" },
  { id: "c13", name: "Easygel RE", inci: "Acrylates/C10-30 Alkyl Acrylate Crosspolymer", principal: "3V Sigma", category: "Rheology Modifiers", industry: "cosmetics", description: "Rheology modifier with high viscosity & clarity for gels & emulsions", form: "Powder", dosage: "0.1 - 1.5%" },
  { id: "c14", name: "HPMC", inci: "Hydroxypropyl Methyl Cellulose", principal: "RUTOCEL", category: "Rheology Modifiers", industry: "cosmetics", description: "Thickening agent for hand sanitizer, shampoo, hand wash, facewash", form: "Powder", dosage: "0.1 - 1.5%" },
  { id: "c15", name: "Xanthan Gum", inci: "Xanthan Gum", principal: "Jianlong", category: "Rheology Modifiers", industry: "cosmetics", description: "Thickener & stabilizer for emulsion and suspensions in skin care & toothpaste", form: "Powder", dosage: "0.1 - 2%" },
  { id: "c16", name: "Sodium Alginate", inci: "Sodium Alginate", principal: "Gelymar", category: "Rheology Modifiers", industry: "cosmetics", description: "Natural thickening agent for face mask, skincare, haircare, oral care", form: "Powder" },
  { id: "c17", name: "Gellan Gum", inci: "Gellan Gum", principal: "Gelymar", category: "Rheology Modifiers", industry: "cosmetics", description: "Natural thickening & suspending agent for personal care and oral care", form: "Powder" },
  { id: "c18", name: "HEC", inci: "Hydroxyethylcellulose", principal: "RUTOCEL", category: "Rheology Modifiers", industry: "cosmetics", description: "Thickening agent, rheology modifier, stabilizer, and film-former", form: "Powder", dosage: "0.1 - 3%" },
  { id: "c19", name: "HPC", inci: "Hydroxypropyl Cellulose", principal: "RUTOCEL", category: "Rheology Modifiers", industry: "cosmetics", description: "Thickening and film forming agent for personal care", form: "Powder" },

  // Conditioners
  { id: "c20", name: "Synthalen CR", inci: "Polyquaternium 37", principal: "3V Sigma", category: "Conditioners", industry: "cosmetics", description: "Conditioner agent in low pH for hair & skin care", form: "Powder", dosage: "0.5 - 2%" },
  { id: "c21", name: "PQ10", inci: "Polyquaternium 10", principal: "3V Sigma", category: "Conditioners", industry: "cosmetics", description: "Excellent conditioning agent for hair & skin care", form: "Powder", dosage: "0.1 - 1.0%" },
  { id: "c22", name: "PQ6", inci: "Polyquaternium 6", principal: "3V Sigma", category: "Conditioners", industry: "cosmetics", description: "Conditions and protects hair, reducing static", form: "Powder", dosage: "0.2 - 1.2%" },
  { id: "c23", name: "PQ28", inci: "Polyquaternium 28", principal: "3V Sigma", category: "Conditioners", industry: "cosmetics", description: "Conditions and protects hair, reducing static", form: "Powder", dosage: "1 - 5%" },

  // Emulsifiers
  { id: "c24", name: "Nexagel", inci: "Sodium Acrylates Copolymer & Lecithin", principal: "3V Sigma", category: "Emulsifiers", industry: "cosmetics", description: "Advanced emulsifier system for stable formulations", form: "Liquid" },
  { id: "c25", name: "Plantus 360", inci: "Aloe barbadensis Ext; Abelmoschus esculentus Frt Ext; Moringa oleifera Sd Oil", principal: "3V Sigma", category: "Emulsifiers", industry: "cosmetics", description: "Natural plant-based emulsifier system", form: "Liquid" },

  // UV Filters
  { id: "c26", name: "Uvasorb HEB", inci: "Diethylhexyl Butamido Triazone", principal: "MFCI", category: "UV Filters", industry: "cosmetics", description: "UVB sunscreen with SPF boosting UVA + UVB protection", form: "Powder" },
  { id: "c27", name: "Avobenzone", inci: "Butyl Methoxydibenzoylmethane", principal: "MFCI", category: "UV Filters", industry: "cosmetics", description: "Broad spectrum UV-A sunscreen agent for sun creams and lotions", form: "Powder" },
  { id: "c28", name: "BP3", inci: "Benzophenone 3", principal: "MFCI", category: "UV Filters", industry: "cosmetics", description: "Oil soluble UV absorber for colour cosmetics & sun block products", form: "Powder", dosage: "MAX 10%" },
  { id: "c29", name: "BP4", inci: "Benzophenone 4", principal: "MFCI", category: "UV Filters", industry: "cosmetics", description: "Water soluble UV absorber for skincare & haircare products", form: "Powder" },
  { id: "c30", name: "Homosalate", inci: "Homosalate", principal: "MFCI", category: "UV Filters", industry: "cosmetics", description: "Sunscreen agent for sun creams and lotions", form: "Liquid", dosage: "Max 15%" },
  { id: "c31", name: "Octocrylene", inci: "Octocrylene", principal: "MFCI", category: "UV Filters", industry: "cosmetics", description: "Sunscreen agent UVA + UVB for sun creams and lotions", form: "Liquid" },
  { id: "c32", name: "OMC", inci: "Octyl Methoxycinnamate", principal: "MFCI", category: "UV Filters", industry: "cosmetics", description: "UV-B sunscreen agent for sun creams and lotions", form: "Liquid" },
  { id: "c33", name: "Octylsalicylate", inci: "Ethylhexyl Salicylate", principal: "MFCI", category: "UV Filters", industry: "cosmetics", description: "Sunscreen agent for sun creams and lotions", form: "Liquid", dosage: "5%" },

  // Surfactants
  { id: "c34", name: "AC 818 (Coco Glucoside)", inci: "Coco Glucoside", principal: "Soho Aneco", category: "Surfactants", industry: "cosmetics", description: "Mild non-ionic surfactant for cleansing products & intimate wash", form: "Liquid", dosage: "5 - 20%" },
  { id: "c35", name: "AC 2000 (Decyl Glucoside)", inci: "Decyl Glucoside", principal: "Soho Aneco", category: "Surfactants", industry: "cosmetics", description: "Mild non-ionic surfactant for cleansing products & intimate wash", form: "Liquid", dosage: "5 - 20%" },
  { id: "c36", name: "AC 1200 (Lauryl Glucoside)", inci: "Lauryl Glucoside", principal: "Soho Aneco", category: "Surfactants", industry: "cosmetics", description: "Mild non-ionic surfactant for cleansing products & intimate wash", form: "Liquid", dosage: "5 - 20%" },
  { id: "c37", name: "Sodium Cocoyl Isethionate (SCI)", inci: "Sodium Cocoyl Isethionate", principal: "Soho Aneco", category: "Surfactants", industry: "cosmetics", description: "Anionic surfactant for soaps, face, hand & body wash & shampoos", form: "Powder/Flakes", dosage: "2 - 20%" },

  // Silicones
  { id: "c38", name: "Hansa Care 2229", inci: "Silicone Quaternium-29 & Cocoamide DEA & Citric Acid", principal: "CHT Bezema", category: "Silicones", industry: "cosmetics", description: "Conditioner agent for clear shampoo", form: "Liquid", dosage: "0.3 - 5%" },
  { id: "c39", name: "Cosil 5", inci: "Cyclopentasiloxane", principal: "Cosmax", category: "Silicones", industry: "cosmetics", description: "Silky feel, spreadability, carrier & delivering fragrance", form: "Liquid", dosage: "0.5 - 10%" },
  { id: "c40", name: "Cosil 350", inci: "Dimethicone", principal: "Cosmax", category: "Silicones", industry: "cosmetics", description: "Smooth dry feel, water resistance for skin care & sun care", form: "Liquid", dosage: "0.5 - 10%" },
  { id: "c41", name: "Cosil 1501", inci: "Cyclopentasiloxane and Dimethiconol", principal: "Cosmax", category: "Silicones", industry: "cosmetics", description: "Smooth dry feel, water resistance for skin & sun care", form: "Liquid", dosage: "3 - 10%" },
  { id: "c42", name: "Cosil 12D", inci: "PEG 12 Dimethicone", principal: "Cosmax", category: "Silicones", industry: "cosmetics", description: "Skin whitening, targets hyper pigmentation & dark spots", form: "Liquid" },
  { id: "c43", name: "Cosil 9045", inci: "Cyclopentasiloxane Dimethicone & Crosspolymer", principal: "Cosmax", category: "Silicones", industry: "cosmetics", description: "Provides dry smoothness and non-greasy skin feel for sunscreens & color cosmetics", form: "Viscous Liquid", dosage: "1 - 3%" },

  // Citropol Range (P2 Sciences)
  { id: "c44", name: "Citropol V5", inci: "Polycitronellol & Undecane & Tridecane", principal: "P2 Sciences", category: "Emollients", industry: "cosmetics", description: "Silky feel, spreadability, heat resistance for haircare & skincare", form: "Liquid", dosage: "0.5-10%" },
  { id: "c45", name: "Citropol H", inci: "Polycitronellol", principal: "P2 Sciences", category: "Emollients", industry: "cosmetics", description: "Medium viscosity cosmetic polymer, anti frizz for haircare & skincare", form: "Liquid", dosage: "0.5-10%" },
  { id: "c46", name: "Citropol F", inci: "Polycitronellol", principal: "P2 Sciences", category: "Emollients", industry: "cosmetics", description: "High performance fragrance fixative and carrier", form: "Liquid", dosage: "0.5-2.0%" },

  // Color Cosmetics
  { id: "c47", name: "Flowsta ASO", inci: "Aluminium Starch Octenylsuccinate", principal: "Nanogen", category: "Color Cosmetics", industry: "cosmetics", description: "Moisture absorbance, oil absorbance in talc, lotions & cream", form: "Powder", dosage: "1 - 10%" },
  { id: "c48", name: "Nanosol CS", inci: "Ethylhexyl Acrylate Copolymer", principal: "Nanogen", category: "Color Cosmetics", industry: "cosmetics", description: "Water resistance film for eye care & sun block products", form: "Liquid", dosage: "0.1 - 16%" },
  { id: "c49", name: "Black P35", inci: "Carbon Black", principal: "Nanogen", category: "Color Cosmetics", industry: "cosmetics", description: "Carbon black for mascara, eyeliner, kajal", form: "Liquid", dosage: "2 - 35%" },
  { id: "c50", name: "Iron Oxide (Red/Yellow/Black/Brown)", inci: "CI 77491/77492/77499", principal: "Sun Chemical", category: "Color Cosmetics", industry: "cosmetics", description: "Color cosmetics pigments", form: "Powder", dosage: "1 - 10%" },

  // Oils
  { id: "c51", name: "Sweet Almond Oil", inci: "Prunus amygdalus dulcis", principal: "Olvea", category: "Oils", industry: "cosmetics", description: "Low comedogenicity & emollient for hair care, baby products, skin care", form: "Liquid", dosage: "0.5 - 90%" },
  { id: "c52", name: "Argan Oil", inci: "Argania spinosa Nut Oil", principal: "Olvea", category: "Oils", industry: "cosmetics", description: "Rich in natural tocopherols, phenols, phenolic acid for hair & skin care", form: "Liquid", dosage: "0.5 - 90%" },
  { id: "c53", name: "Jojoba Oil", inci: "Simmondsia chinensis Seed Oil", principal: "Olvea", category: "Oils", industry: "cosmetics", description: "Moisturizer and emollient to improve skin elasticity & suppleness", form: "Liquid", dosage: "0.5 - 90%" },
  { id: "c54", name: "Abyssinian Oil", inci: "Crambe abyssinica Seed Oil", principal: "Natures Crops", category: "Oils", industry: "cosmetics", description: "Anti frizz hair, detangle, anti fungal, penetrates hair shaft", form: "Liquid", dosage: "0.5 - 50%" },
  { id: "c55", name: "Meadowfoam Oil", inci: "Limnanthes alba Seed Oil", principal: "Natures Crops", category: "Oils", industry: "cosmetics", description: "Prevents sun damage, promotes cellular regeneration, prevents TEWL", form: "Liquid", dosage: "0.5 - 50%" },
  { id: "c56", name: "Avocado Oil", inci: "Persea gratissima Fruit Oil", principal: "Olvea", category: "Oils", industry: "cosmetics", description: "Natural emollient for hair, skin, lipstick & color cosmetics", form: "Liquid", dosage: "0.1 - 99%" },
  { id: "c57", name: "Olive Oil / Extra Virgin", inci: "Olea europaea Fruit Oil", principal: "Olvea", category: "Oils", industry: "cosmetics", description: "Natural emollient for hair, skin, color cosmetics", form: "Liquid", dosage: "0.1 - 99%" },
  { id: "c58", name: "Chia Oil", inci: "Salvia hispanica", principal: "Olvea", category: "Oils", industry: "cosmetics", description: "62% Omega 3 fatty acid for hair care & skin care", form: "Liquid", dosage: "1 - 5%" },
  { id: "c59", name: "Shea Oil", inci: "Butyrospermum parkii", principal: "Olvea", category: "Oils", industry: "cosmetics", description: "Skin/scalp emollient and moisturizer", form: "Oil", dosage: "0.5-100%" },
  { id: "c60", name: "Macadamia Oil", inci: "Macadamia integrifolia Seed Oil", principal: "Olvea", category: "Oils", industry: "cosmetics", description: "Moisturizing, nourishing, and anti-aging properties", form: "Liquid", dosage: "0.1 - 100%" },

  // Butters
  { id: "c61", name: "Shea Butter", inci: "Butyrospermum parkii", principal: "Olvea", category: "Butters", industry: "cosmetics", description: "Skin & scalp emollients & moisturizer", form: "Solid", dosage: "0.5 - 10%" },
  { id: "c62", name: "Kokum Butter", inci: "Garcinia indica Seed Butter", principal: "Olvea", category: "Butters", industry: "cosmetics", description: "Prevents drying of skin & development of wrinkles", form: "Solid", dosage: "0.5 - 10%" },
  { id: "c63", name: "Mango Butter", inci: "Mangifera indica Seed Butter", principal: "Olvea", category: "Butters", industry: "cosmetics", description: "Prevents rancidity, adds stability in emulsion & skin softening", form: "Solid", dosage: "0.5 - 10%" },
  { id: "c64", name: "Cocoa Butter", inci: "Theobroma cacao Seed Butter", principal: "Olvea", category: "Butters", industry: "cosmetics", description: "Excellent emolliency, softening effects and good spreadability", form: "Solid", dosage: "0.5 - 10%" },
  { id: "c65", name: "Sal Butter", inci: "Shorea robusta Butter", principal: "Olvea", category: "Butters", industry: "cosmetics", description: "Emolliency, softening effects for anti-aging, hair conditioning, skin care", form: "Solid", dosage: "0.5 - 10%" },

  // Actives - Anti Acne
  { id: "c66", name: "Salsphere Even Skin", inci: "Encapsulated Salicylic Acid", principal: "Salvona", category: "Actives - Anti Acne", industry: "cosmetics", description: "Encapsulated time release salicylic acid for gentle exfoliation & skin rejuvenation", form: "Liquid", dosage: "1.67-6.67%" },
  { id: "c67", name: "Salsphere BPO", inci: "Encapsulated Benzoyl Peroxide", principal: "Salvona", category: "Actives - Anti Acne", industry: "cosmetics", description: "Stable and targeted delivery system of benzoyl peroxide for acne treatment", form: "Liquid", dosage: "10 - 40%" },
  { id: "c68", name: "Multisal Salicylic Acid", inci: "Encapsulated Salicylic Acid", principal: "Salvona", category: "Actives - Anti Acne", industry: "cosmetics", description: "Technology to deliver pharmaceutical-grade salicylic acid for anhydrous applications", form: "Powder", dosage: "2 - 6.67%" },
  { id: "c69", name: "Salsphere Severe Acne Relief", inci: "Encapsulated Salicylic Acid, Palmitoyl Tripeptide-5, Ascorbic Acid, BKC, Zinc Sulfate", principal: "Salvona", category: "Actives - Anti Acne", industry: "cosmetics", description: "Multi-system addresses multiple causes of acne – exfoliation, sebum control, scar reduction", form: "Liquid", dosage: "1.67-6.67%" },
  { id: "c70", name: "Mandelic Acid", inci: "Mandelic Acid", principal: "Salvona", category: "Actives - Anti Acne", industry: "cosmetics", description: "Gentle exfoliation, evens skin tone, reduces fine lines", form: "White crystalline powder", dosage: "2 - 10%" },

  // Actives - Anti Aging
  { id: "c71", name: "Multisal Multilayer", inci: "Encapsulated Lactic Acid, Phenylethyl resorcinol, Palmitoyl Tripeptide-5", principal: "Salvona", category: "Actives - Anti Aging", industry: "cosmetics", description: "Anti-aging system with multiple functional compartments targeting multiple skin layers", form: "Powder", dosage: "1 - 3%" },
  { id: "c72", name: "Multisal Retinol", inci: "Encapsulated Retinol", principal: "Salvona", category: "Actives - Anti Aging", industry: "cosmetics", description: "Gentle age-defying technology that reduces signs of aging while being friendly to sensitive skin", form: "Powder", dosage: "0.5 - 2%" },
  { id: "c73", name: "Multisal Dark Circle Eliminator", inci: "Encapsulated Caffeine, Phenyl Ethyl Resorcinol, Acetyl Hexapeptide-8", principal: "Salvona", category: "Actives - Anti Aging", industry: "cosmetics", description: "Reduces discoloration and puffiness under eyes, promotes glowing skin", form: "Powder", dosage: "10 - 16.7%" },
  { id: "c74", name: "Hydrosal Youth", inci: "Ceramide, Resveratrol, Hyaluronic acid", principal: "Salvona", category: "Actives - Anti Aging", industry: "cosmetics", description: "Stimulates collagen & elastin production, enhances firmness, deep hydration", form: "Clear liquid", dosage: "2%" },
  { id: "c75", name: "Micore COL III", inci: "Collagen Type 3 / sh Polypeptide 69", principal: "Salvona", category: "Actives - Anti Aging", industry: "cosmetics", description: "Anti-aging, skin brightening, reduces dark circles and wrinkles", form: "Powder", dosage: "0.01 - 0.2%" },

  // Actives - Hair Care
  { id: "c76", name: "Salsphere Natural Hair Growth Promoter", inci: "Encapsulated Apple Extract (Procyanidin B2)", principal: "Salvona", category: "Actives - Hair Care", industry: "cosmetics", description: "Technology to reduce signs of hair aging and promote hair growth", form: "Opaque Liquid", dosage: "2 - 5%" },
  { id: "c77", name: "Salsphere Hair Stimulator", inci: "Encapsulated Caffeine, Azelaic Acid, Saw Palmetto, Zinc Sulfate, Biotin", principal: "Salvona", category: "Actives - Hair Care", industry: "cosmetics", description: "Targeted delivery of DHT blockers for hair growth", form: "Opaque Paste", dosage: "2.5-5%" },
  { id: "c78", name: "D-Biotin", inci: "Vitamin B7", principal: "Salvona", category: "Actives - Hair Care", industry: "cosmetics", description: "Supports keratin production, strengthens hair and nails, improves skin texture", form: "Powder", dosage: "0.01 - 0.1%" },
  { id: "c79", name: "Salsphere Colour Guard", inci: "Encapsulated Broccoli Seed Oil, UV filters & Fatty acids", principal: "Salvona", category: "Actives - Hair Care", industry: "cosmetics", description: "Hair protecting botanicals for longer colour protection with vibrancy", form: "Liquid", dosage: "1 - 20%" },

  // Actives - Skin Brightening
  { id: "c80", name: "Salsphere Light", inci: "Encapsulated Alpha Arbutin & Resveratrol", principal: "Salvona", category: "Actives - Skin Brightening", industry: "cosmetics", description: "Enhanced delivery of skin brightening agents for long-lasting benefits", form: "Liquid" },
  { id: "c81", name: "Multisal Vitamin C", inci: "Encapsulated Ascorbic Acid", principal: "Salvona", category: "Actives - Skin Brightening", industry: "cosmetics", description: "Enhances absorption and delivers Vitamin C directly to the skin", form: "Powder" },
  { id: "c82", name: "Natural Hydrosal Skin Toning", inci: "Encapsulated Kojic acid, Alpha arbutin, Niacinamide, Ascorbic acid", principal: "Salvona", category: "Actives - Skin Brightening", industry: "cosmetics", description: "Reduces skin discoloration from acne, melasma, and aging for bright even skin tone", form: "Opaque Paste", dosage: "2.5 - 5%" },
  { id: "c83", name: "VCE (3-O-Ethyl Ascorbic Acid)", inci: "3-O-Ethyl Ascorbic Acid", principal: "Soho Aneco", category: "Actives - Skin Brightening", industry: "cosmetics", description: "Most stable whitening agent for serum, face wash, cream", form: "Powder", dosage: "0.1 - 5%" },
  { id: "c84", name: "AA2G (Ascorbyl Glucoside)", inci: "Ascorbyl Glucoside", principal: "Soho Aneco", category: "Actives - Skin Brightening", industry: "cosmetics", description: "Skin whitening for cream, serum, face wash", form: "Powder", dosage: "0.1 - 5%" },
  { id: "c85", name: "Alpha Arbutin", inci: "Alpha Arbutin", principal: "Soho Aneco", category: "Actives - Skin Brightening", industry: "cosmetics", description: "Skin whitening, targets hyper pigmentation & dark spots", form: "Powder", dosage: "0.1 - 0.5%" },
  { id: "c86", name: "Kojic Acid Dipalmitate", inci: "Kojic Acid Dipalmitate", principal: "Salvona", category: "Actives - Skin Brightening", industry: "cosmetics", description: "Skin brightening, inhibits melanin formation, more stable than kojic acid", form: "Powder" },
  { id: "c87", name: "Tranexamic Acid", inci: "Tranexamic Acid", principal: "Salvona", category: "Actives - Skin Brightening", industry: "cosmetics", description: "Brightens skin, reduces hyperpigmentation, inhibits melanin synthesis", form: "Powder" },

  // Actives - Functional & Sensory
  { id: "c88", name: "Multisal Menthol", inci: "Encapsulated Menthol", principal: "Salvona", category: "Actives - Functional", industry: "cosmetics", description: "Time released cooling with reduced menthol odor for pain relief, skin care, lip care", form: "Powder", dosage: "1-5%" },
  { id: "c89", name: "Hydrosal Salcool", inci: "Encapsulated Menthyl Lactate, Methyl Diisopropyl Propionamide", principal: "Salvona", category: "Actives - Functional", industry: "cosmetics", description: "Time released cooling with reduced menthol odor for lotions and pain relief", form: "Liquid", dosage: "0.5-5%" },
  { id: "c90", name: "Hydrosal Lip Plumping", inci: "Methyl Diisopropyl Propionamide, Palmitoyl Tripeptide-38", principal: "Salvona", category: "Actives - Functional", industry: "cosmetics", description: "Collagen-boosting peptides with time-release technology for lip care", form: "Translucent liquid", dosage: "3-5%" },
  { id: "c91", name: "Salscent", inci: "Encapsulated Fragrance", principal: "Salvona", category: "Actives - Functional", industry: "cosmetics", description: "Microsphere-encapsulated fragrance for personal care & homecare", form: "Liquid", dosage: "50-70%" },

  // Hair Dye Intermediates
  { id: "c92", name: "PPD", inci: "Para-Phenylenediamine", principal: "Generic", category: "Hair Dye Intermediates", industry: "cosmetics", description: "Permanent hair dye intermediate", form: "Powder" },
  { id: "c93", name: "24 DPE", inci: "2,4-Diaminophenoxyethanol Dihydrochloride", principal: "Generic", category: "Hair Dye Intermediates", industry: "cosmetics", description: "Permanent hair dye intermediate", form: "Powder" },
  { id: "c94", name: "MAP (Meta Amino Phenol)", inci: "Meta Amino Phenol", principal: "Generic", category: "Hair Dye Intermediates", industry: "cosmetics", description: "Hair colorant", form: "Powder" },
  { id: "c95", name: "Resorcinol", inci: "Resorcinol", principal: "Generic", category: "Hair Dye Intermediates", industry: "cosmetics", description: "Hair colorant", form: "Paste / Powder" },

  // Other Strong Products
  { id: "c96", name: "Saboderm AB", inci: "C 12-15 Alkyl Benzoate", principal: "Saboderm", category: "Emollients", industry: "cosmetics", description: "Emollient for skin care formulations", form: "Liquid" },
  { id: "c97", name: "Saboderm CVC MB", inci: "Coco-caprylate/Caprate", principal: "Saboderm", category: "Emollients", industry: "cosmetics", description: "Emollient for skin care formulations", form: "Liquid" },
  { id: "c98", name: "Saboderm DBA", inci: "Dibutyl Adipate", principal: "Saboderm", category: "Emollients", industry: "cosmetics", description: "Emollient for skin care & sun care", form: "Liquid", dosage: "1-10%" },
  { id: "c99", name: "Saboderm DOE MB", inci: "Dicaprylyl Ether", principal: "Saboderm", category: "Emollients", industry: "cosmetics", description: "Emollient for skin care & hair care", form: "Liquid", dosage: "1-10%" },
  { id: "c100", name: "Saboderm G20", inci: "Octyldodecanol", principal: "Saboderm", category: "Emollients", industry: "cosmetics", description: "Emollient for deodorant & antiperspirant", form: "Liquid", dosage: "1-15%" },
  { id: "c101", name: "Sabosol PGO MB", inci: "Coco-Glucoside, Glyceryl Oleate", principal: "Saboderm", category: "Emollients", industry: "cosmetics", description: "Lipid layer enhancer for toiletries and rinse off products", form: "Liquid", dosage: "4-6%" },
  { id: "c102", name: "Ferulic Acid", inci: "Ferulic Acid", principal: "Generic", category: "Actives - Functional", industry: "cosmetics", description: "Potent antioxidant, stabilizes vitamins C and E, UV protection, anti-aging", form: "Crystalline", dosage: "0.5 - 1%" },
  { id: "c103", name: "Vitamin E Acetate", inci: "Vitamin E Acetate", principal: "Generic", category: "Actives - Functional", industry: "cosmetics", description: "Antioxidant for personal care, hair care, colour cosmetics", form: "Liquid", dosage: "0.2-0.5%" },
  { id: "c104", name: "Isododecane", inci: "Isododecane", principal: "Generic", category: "Emollients", industry: "cosmetics", description: "Fast-drying emollient, enhances spreadability, improves water resistance", form: "Liquid", dosage: "2-30%" },
  { id: "c105", name: "Allantoin", inci: "Allantoin", principal: "Generic", category: "Actives - Functional", industry: "cosmetics", description: "Regeneration of cells & smoothness for foot cream, after shave, spa products", form: "Powder", dosage: "0.1 - 2%" },
  { id: "c106", name: "D-Panthenol", inci: "D-Panthenol", principal: "Generic", category: "Actives - Functional", industry: "cosmetics", description: "Moisturizer for hair care & skin care products", form: "Viscous Liquid", dosage: "0.1 - 2%" },
  { id: "c107", name: "Titanium Dioxide", inci: "Titanium Dioxide", principal: "Generic", category: "UV Filters", industry: "cosmetics", description: "Sunscreen agent that resists UV rays and increases opacity", form: "Powder", dosage: "0.1 - 5%" },
  { id: "c108", name: "Zinc Oxide", inci: "Zinc Oxide", principal: "Generic", category: "Actives - Functional", industry: "cosmetics", description: "Astringent & anti-inflammatory for lotion, sun block & baby care", form: "Powder", dosage: "0.1 - 5%" },
  { id: "c109", name: "Sodium Hyaluronate", inci: "Sodium Hyaluronate", principal: "Generic", category: "Actives - Anti Aging", industry: "cosmetics", description: "Moisturizer, anti-wrinkle for skin care products", form: "Powder", dosage: "0.1 - 1%" },

  // Akott Evolution Actives
  { id: "c110", name: "Akosky Apium", principal: "Akott Evolution", category: "Actives - Functional", industry: "cosmetics", description: "Anti stretch marks / anti wrinkle active", form: "Liquid" },
  { id: "c111", name: "Akosky Azuki", principal: "Akott Evolution", category: "Actives - Hair Care", industry: "cosmetics", description: "Anti hairfall / eye lash intensifier", form: "Liquid" },
  { id: "c112", name: "Italine O", principal: "Akott Evolution", category: "Actives - Functional", industry: "cosmetics", description: "Anti pollution active", form: "Liquid" },
  { id: "c113", name: "Italine A", principal: "Akott Evolution", category: "Actives - Functional", industry: "cosmetics", description: "Undereye protection active", form: "Liquid" },
  { id: "c114", name: "Akowell Aknever", principal: "Akott Evolution", category: "Actives - Anti Acne", industry: "cosmetics", description: "Anti acne active", form: "Liquid" },
  { id: "c115", name: "Akowell Sun", principal: "Akott Evolution", category: "UV Filters", industry: "cosmetics", description: "UV rays protection / skin healing", form: "Liquid" },

  // Alula Peregrina (Moringa Peregrina)
  { id: "c116", name: "Virgin Alula Peregrina Oil", principal: "Alula Peregrina", category: "Oils", industry: "cosmetics", description: "Soothing effect, radiant complexion, antioxidant, anti-sagging, skin lifting", form: "Oil" },
  { id: "c117", name: "Lipophilic Alula Peregrina Extract", principal: "Alula Peregrina", category: "Actives - Anti Aging", industry: "cosmetics", description: "Intense hydration, soothing, DNA cell repair, prevents premature aging", form: "Liquid" },

  // Cosmetic Beads / Exfoliants
  { id: "c118", name: "Colorets & Pearlets", principal: "Salvona", category: "Beads & Exfoliants", industry: "cosmetics", description: "Decorative beads for water gel, cream, shower gel, body lotion, shampoo, soap", form: "Beads" },
  { id: "c119", name: "Cooling Scrubbing Beads (Mentholets)", principal: "Salvona", category: "Beads & Exfoliants", industry: "cosmetics", description: "Cooling scrubbing beads for toothpastes, shower gel, chewing gum", form: "Beads" },

  // ==================== FOOD & NUTRACEUTICALS ====================
  // Jianlong
  { id: "f1", name: "Xanthan Gum", inci: "Xanthan Gum (E415)", principal: "Jianlong", category: "Thickeners", industry: "food", description: "Thickener and viscosifying agent for all food products — beverages, ice creams, frozen desserts", form: "200 and 80 mesh powders, FNCS / Transparent grade" },

  // Custom Fiber
  { id: "f2", name: "Apple Fiber", principal: "Custom Fiber", category: "Dietary Fiber", industry: "food", description: "Improves fiber content, nutritional profile. Excellent natural prebiotic. Anti-caking agent", form: "Powder" },
  { id: "f3", name: "Oat Fiber", principal: "Custom Fiber", category: "Dietary Fiber", industry: "food", description: "High-quality dietary fiber for nutraceuticals, bakery, and food products", form: "Powder" },
  { id: "f4", name: "Pea Fiber", principal: "Custom Fiber", category: "Dietary Fiber", industry: "food", description: "Plant-based dietary fiber for food enrichment", form: "Powder" },
  { id: "f5", name: "Wheat Fiber", principal: "Custom Fiber", category: "Dietary Fiber", industry: "food", description: "Dietary fiber for bakery and food products", form: "Powder" },
  { id: "f6", name: "Bamboo Fiber", principal: "Custom Fiber", category: "Dietary Fiber", industry: "food", description: "Natural dietary fiber source", form: "Powder" },
  { id: "f7", name: "Citrus Fiber", principal: "Custom Fiber", category: "Dietary Fiber", industry: "food", description: "Citrus-derived dietary fiber for food applications", form: "Powder" },
  { id: "f8", name: "Cocoa Fiber", principal: "Custom Fiber", category: "Dietary Fiber", industry: "food", description: "Cocoa-derived dietary fiber for food enrichment", form: "Powder" },
  { id: "f9", name: "Sugar-Cane Fiber", principal: "Custom Fiber", category: "Dietary Fiber", industry: "food", description: "Sugar cane-derived dietary fiber", form: "Powder" },

  // Satoria Agro
  { id: "f10", name: "Resistant Maltodextrin (DRM)", inci: "Dextrin (E1400)", principal: "Satoria Agro", category: "Dietary Fiber", industry: "food", description: "Prebiotic, sugar substitute, lowers fat/cholesterol absorption, stabilizes blood sugar", form: "70, 80 & 90% Powder and Liquid" },

  // Reckon Organics - Food
  { id: "f11", name: "Lactose", principal: "Reckon Organics", category: "Dairy Ingredients", industry: "food", description: "Milk sugar — disaccharide for seasonings, baked products, ice cream, dairy, confectionery", form: "White to cream powder" },
  { id: "f12", name: "Polydextrose", inci: "Polydextrose (E1200)", principal: "Reckon Organics", category: "Dietary Fiber", industry: "food", description: "Added fiber claim, stabilizer, bulking agent, regulates lipid metabolism", form: "Liquid" },

  // QHT
  { id: "f13", name: "FOS (Fructo Oligosaccharide)", principal: "QHT", category: "Prebiotics", industry: "food", description: "Prebiotic, natural sweetener, improves immunity, relieves constipation", form: "Liquid and Powder (50-95%)" },
  { id: "f14", name: "GOS (Galacto Oligosaccharide)", principal: "QHT", category: "Prebiotics", industry: "food", description: "Prebiotic, promotes beneficial bacteria, improves stool consistency, increases mineral absorption", form: "Liquid and Powder (30-90%)" },

  // SoPure
  { id: "f15", name: "Stevia", inci: "Stevia (E960)", principal: "SoPure", category: "Sweeteners", industry: "food", description: "Natural sweetening agent with 'Sugar Free' claim for sugar replacement", form: "Powder" },

  // Shandong Sanyuan
  { id: "f16", name: "Erythritol", inci: "Erythritol (E968)", principal: "Shandong Sanyuan", category: "Sweeteners", industry: "food", description: "Sweetening agent with 'Sugar Less' claim, characteristic cooling sensation", form: "Powder & Crystal" },

  // BaltMilk
  { id: "f17", name: "Milk Protein Concentrate (MPC)", principal: "BaltMilk", category: "Proteins", industry: "food", description: "Milky taste, good solubility, high in calcium, high in BCAA for health supplements & protein bars", form: "White powder (70 & 85%)" },
  { id: "f18", name: "Micellar Casein", principal: "BaltMilk", category: "Proteins", industry: "food", description: "Slow assimilation for optimal muscle recovery, heat stable with milk mouthfeel", form: "Powder" },

  // China Foodstuff
  { id: "f19", name: "Soy Protein Isolate", principal: "China Foodstuff", category: "Proteins", industry: "food", description: "Non-GMO soy, gel forming, emulsion stability, water/oil holding for nutrition products", form: "Powder (various grades)" },

  // AlgaHealth
  { id: "f20", name: "Fucoxanthin", principal: "AlgaHealth", category: "Specialty", industry: "food", description: "Novel micro-algae extract using super-critical CO₂ extraction for health supplements", form: "Dark brown thick oily paste" },

  // Lutkala
  { id: "f21", name: "Apple Pomace Powder", principal: "Lutkala", category: "Specialty", industry: "food", description: "Natural thickener and suspending agent using only physical processes, no chemical transformation", form: "Powder" },

  // Fibervita
  { id: "f22", name: "Tapioca Fiber / Cassava Flour", principal: "Fibervita", category: "Dietary Fiber", industry: "food", description: "Made from cassava by patented process for bakery, frozen foods, beverages, sauces", form: "Fine beige powder" },

  // CoffeeFruit
  { id: "f23", name: "Coffee Fruit Pomace", principal: "CoffeeFruit", category: "Specialty", industry: "food", description: "High chlorogenic acid for weight reduction, sport nutrition, immune-enhancing formulations", form: "Brown powder" },
];

export const categories = [...new Set(products.map((p) => p.category))];
export const industries = ["pharma", "cosmetics", "food"] as const;

export const getProductsByIndustry = (industry: string) =>
  products.filter((p) => p.industry === industry);

export const getProductsByCategory = (category: string) =>
  products.filter((p) => p.category === category);

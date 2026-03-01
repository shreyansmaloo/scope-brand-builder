export interface Partner {
  id: string;
  name: string;
  country: string;
  verticals: ("pharma" | "cosmetics" | "food")[];
  specialty: string;
  about?: string;
}

export const partners: Partner[] = [
  // Pharma Principals
  { 
    id: "gelymar", 
    name: "Gelymar", 
    country: "Chile", 
    verticals: ["pharma"], 
    specialty: "Hydrocolloids & carrageenan solutions",
    about: "Produces hydrocolloids, specialized in offering texturizing solutions for Pharma, Food and personal care industry at a world level. Gelymar is a world leader in the production of carrageenan from cold water seaweeds with widest range of Carrageenans obtained through all the existing technologies, complementing them synergistically with different hydrocolloids."
  },
  { 
    id: "reckon", 
    name: "Reckon Organics", 
    country: "India", 
    verticals: ["pharma", "food"], 
    specialty: "Ascorbic acid & vitamin C derivatives",
    about: "India GMP Certified company and leading manufacturer of Ascorbic Acid (Vitamin-C) and other excipients offers quality product and services."
  },
  { 
    id: "prayon", 
    name: "Prayon", 
    country: "Belgium", 
    verticals: ["pharma", "food"], 
    specialty: "Phosphate-based ingredients" 
  },
  { 
    id: "tomita", 
    name: "Tomita", 
    country: "Japan", 
    verticals: ["pharma"], 
    specialty: "Minerals & inorganic pharmaceuticals",
    about: "For over a century Tomita Pharmaceutical Co. Ltd. has been contributing to society mainly in the field of inorganic pharmaceuticals. Its long history and expertise have made Tomita one of the leading manufacturers of high quality minerals based ingredients in Japan."
  },
  { 
    id: "surinerts", 
    name: "Surinerts", 
    country: "India", 
    verticals: ["pharma"], 
    specialty: "Sugar spheres & globules for controlled release",
    about: "Founded in 1976, it started cGMP manufacturing sugar-starch based excipients including sugar spheres for pharmaceutical use."
  },
  { 
    id: "standard-chem", 
    name: "Standard Chem", 
    country: "Taiwan", 
    verticals: ["pharma"], 
    specialty: "Sodium stearyl fumarate lubricant",
    about: "Standard chem is one of the biggest and famous drug as well as chemical company in Taiwan. It strictly works with the philosophy of Sincerity, Honesty, Experience, Innovation and Public Service."
  },
  { 
    id: "rutocel", 
    name: "RUTOCEL", 
    country: "China", 
    verticals: ["pharma", "cosmetics"], 
    specialty: "HPMC, ethyl cellulose & HPC",
    about: "This organization having over thirty five years of experience in product development, production and quality control and customer service in the specialised fields of multi-product palm oil based ingredients."
  },
  { id: "tianli", name: "Tianli", country: "China", verticals: ["pharma"], specialty: "Mannitol & sorbitol polyols", about: "It is the largest manufacturers of Polyols in Asia. Tianli belongs to Shandong Lianmeng Chemical Group. The company has sound management systems and certiﬁcations ie GMP, ISO, Kosher, HACCP, etc. The products are being exported to USA, Europe, South America, Asia, etc." },
  { id: "cygnus", name: "Cygnus Polyols", country: "India", verticals: ["pharma"], specialty: "Mannitol & lactose formulations", about: "It is specialized in formulation solutions to aid the improvement of final pharma and food products. Audits, preparation of strict specifications, revisions, monitoring, and updating quality parameters are our routine jobs to make a strong alliance between Cygnus, our suppliers, and customers." },
  { id: "lactopharm", name: "LactoPharm", country: "India", verticals: ["pharma"], specialty: "Lactose for tableting & capsules", about: "It is a company specialized in milk derivatives, including milk protein, lactose, and other ingredients extracted from milk." },
  { id: "sun-chemical", name: "Sun Chemical", country: "USA", verticals: ["pharma", "cosmetics"], specialty: "Iron oxide colorants", about: "Together with DIC, Sun Chemical has annual sales of more than $8.5 billion. Over 22,000 employees work every day to meet the needs of customers by improving performance on the essentials of business." },

  // Cosmetics / Personal Care Principals
  { id: "3v", name: "3V Sigma", country: "Italy", verticals: ["cosmetics"], specialty: "Rheology modifiers, carbomers & conditioners" },
  { id: "mfci", name: "MFCI", country: "China", verticals: ["cosmetics"], specialty: "UV absorbers & sunscreen agents", about: "Established in 1993, MFCI is a high-tech enterprise specialized in R&D, manufacturing, sales and service of UV absorbers. Now MFCI operates a large system, comprising of 3 plants, a sales company, 3 R&D overseas warehouses." },
  { id: "soho-aneco", name: "Soho Aneco", country: "China", verticals: ["cosmetics"], specialty: "Green surfactants & skin brightening actives" },
  { id: "salvona", name: "Salvona", country: "USA", verticals: ["cosmetics"], specialty: "Encapsulation technology & microsphere delivery" },
  { id: "olvea", name: "Olvea", country: "France", verticals: ["cosmetics"], specialty: "Natural oils, butters & argan oil" },
  { id: "natures-crops", name: "Natures Crops", country: "USA", verticals: ["cosmetics"], specialty: "Specialty oilseed crops & oils", about: "We grow and process exceptional specialty oilseed crops to create awesomely functional ingredients." },
  { id: "cosmax", name: "Cosmax", country: "China", verticals: ["cosmetics"], specialty: "Silicone-based cosmetic ingredients" },
  { id: "cht-bezema", name: "CHT Bezema", country: "Germany", verticals: ["cosmetics"], specialty: "Silicone conditioners for haircare" },
  { id: "nanogen", name: "Nanogen", country: "India", verticals: ["cosmetics"], specialty: "Color cosmetics & film formers" },
  { id: "p2-sciences", name: "P2 Sciences", country: "USA", verticals: ["cosmetics"], specialty: "Sustainable silicone alternatives (Citropol)", about: "P2 sciences makes high-performing Ingredients for cosmetics, personal care and fragrance products." },
  { id: "saboderm", name: "Saboderm", country: "Europe", verticals: ["cosmetics"], specialty: "Emollient esters & lipid enhancers" },
  { id: "akott", name: "Akott Evolution", country: "Italy", verticals: ["cosmetics"], specialty: "Botanical actives & plant extracts" },
  { id: "alula", name: "Alula Peregrina", country: "Middle East", verticals: ["cosmetics"], specialty: "Moringa Peregrina oils & extracts" },

  // Food & Nutraceuticals Principals
  { id: "jianlong", name: "Jianlong", country: "China", verticals: ["food"], specialty: "Xanthan gum & dietary fiber", about: "Jianlong Biotechnology Co., Ltd, which was founded in April, 2007, is located in West District, Togtoh Power Industrial Park, Hohhot City, Inner Mongolia, China. Jianlong is dedicated to manufacturing Xanthan Gum and Dietary Fiber with high and consistent quality through research & development, production and sales." },
  { id: "custom-fiber", name: "Custom Fiber", country: "International", verticals: ["food"], specialty: "Functional high-quality dietary fibers", about: "Custom Fiber is an international company specializing in the production of functional, high-quality fibers. Custom fiber manufactures products of the future that fit perfectly into innovative and current trends. Thanks to our dietary fibers, food manufactures around the world can offer their consumers more nutritious and healthy products." },
  { id: "satoria", name: "Satoria Agro", country: "Indonesia", verticals: ["food"], specialty: "Resistant maltodextrin (DRM)", about: "Satoria Agro is an integrated food processing manufacturing company located in Wonorejo, Pasuruan, Indonesia. Established in 2014, the 12 hectare factory produces various F&B nutrition ingredients and flavoring, biscuits and Digestion Resistant Maltodextrin (DRM) using the latest cutting edge technology to meet the needs of customers." },
  { id: "qht", name: "QHT", country: "China", verticals: ["food"], specialty: "FOS & GOS prebiotics", about: "QHT focuses on digestive microbiota health. Its core products, fructo-oligosaccharides (FOS) and galacto-oligosaccharides (GOS) , are widely recognized as essential prebiotics that have significant beneficial effects of a properly balanced human digestive microbiome." },
  { id: "sopure", name: "SoPure", country: "USA", verticals: ["food"], specialty: "Vertically integrated stevia", about: "SoPure stevia is made from our seeds, our growers, and our facilities to ensure the most consistent and highest quality product possible. Our proprietary and vertically integrated production process is non-GMO certified and employs only responsible farming practices." },
  { id: "shandong", name: "Shandong Sanyuan", country: "China", verticals: ["food"], specialty: "Erythritol sweetener", about: "Our company is a high bio-tech enterprise which based on the 'Erythritol production by fermentation' integrating scientific research, production, sales, committed to the production of erythritol and research and development of new multi-functional sweeteners." },
  { id: "baltmilk", name: "BaltMilk", country: "Europe", verticals: ["food"], specialty: "Milk protein concentrate & micellar casein", about: "BaltMilk is the cutting-edge manufacturer of milk proteins. We apply latest technology and innovation to provide the world with high value-added milk ingredients." },
  { id: "china-foodstuff", name: "China Foodstuff", country: "China", verticals: ["food"], specialty: "Soy protein isolate", about: "China Foodstuff & Protein Group Co., Ltd. is an enterprise that develops and produces soy protein, with more than 20 years of experience." },
  { id: "algahealth", name: "AlgaHealth", country: "Israel", verticals: ["food"], specialty: "Microalgae-based nutraceuticals", about: "AlgaHealth is an Israeli biotech company pioneering the development of smart, cost-effective applications of microalgae for production of nutraceuticals." },
  { id: "lutkala", name: "Lutkala", country: "Europe", verticals: ["food"], specialty: "Natural thickeners from apple pomace", about: "We are the only company in the world to offer thickeners with unique rheologic and nutraceutical properties, manufactured ONLY using PHYSICAL processes, without any chemical transformation." },
  { id: "fibervita", name: "Fibervita", country: "Brazil", verticals: ["food"], specialty: "Tapioca fiber & cassava flour", about: "This is a brazilian company headquartered in Chapeco, Santa Catarina state, Brazil acting synergistically with its brand office located in Toledo, Paran state, Brazil." },
  { id: "coffeefruit", name: "CoffeeFruit", country: "Costa Rica", verticals: ["food"], specialty: "Coffee fruit pomace antioxidants", about: "CoffeeFruit Pure offers a potent antioxidant alternative for your next dietary supplement, functional food or beverage, or skin care product." },
  { id: "gn-long", name: "GN Long", country: "International", verticals: ["food", "pharma"], specialty: "Nutraceuticals & functional ingredients", about: "GN Long is a trusted provider of high-quality nutritional ingredients and functional additives." }
];

export const getPartnersByVertical = (vertical: "pharma" | "cosmetics" | "food") =>
  partners.filter((p) => p.verticals.includes(vertical));

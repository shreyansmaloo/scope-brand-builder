export interface JobOpening {
  id: string;
  title: string;
  location: string;
  type: string;
  desc: string;
  responsibilities: string[];
  requirements: string[];
  rules: string;
}

export const jobOpenings: JobOpening[] = [
  {
    id: "technical-sales-executive-pharma",
    title: "Technical Sales Executive — Pharma",
    location: "Mumbai / Chennai",
    type: "Full-time",
    desc: "Drive sales of pharmaceutical excipients to formulators across India.",
    responsibilities: [
      "Identify and develop new business opportunities across the pharmaceutical sector.",
      "Conduct technical presentations and trials of excipients at client R&D centers.",
      "Maintain strong relationships with key decision-makers and formulation scientists.",
      "Collaborate with principal partners to understand new product applications.",
    ],
    requirements: [
      "B.Pharm / M.Pharm or degree in Chemistry / Chemical Engineering.",
      "2-5 years of technical sales experience in the pharmaceutical or related industry.",
      "Strong communication, negotiation, and interpersonal skills.",
      "Willingness to travel extensively to client sites.",
    ],
    rules: "Field-based role with regular office reporting. Performance-linked incentives apply.",
  },
  {
    id: "business-development-manager-personal-care",
    title: "Business Development Manager — Personal Care",
    location: "Mumbai",
    type: "Full-time",
    desc: "Expand our personal care ingredient portfolio across key accounts.",
    responsibilities: [
      "Drive revenue growth across personal care and color cosmetics segments.",
      "Introduce novel active ingredients and functional raw materials to formulators.",
      "Track market trends and competitor activities to refine sales strategies.",
      "Work closely with our internal technical team to provide formulation support.",
    ],
    requirements: [
      "B.Tech/M.Tech in Cosmetic Technology or related scientific discipline.",
      "5+ years experience in B2B sales of personal care ingredients.",
      "Established network within the Indian personal care manufacturing industry.",
      "Strategic mindset with proven ability to close complex enterprise deals.",
    ],
    rules: "Hybrid work model based in Mumbai. Expected to attend key industry trade shows.",
  },
  {
    id: "supply-chain-coordinator",
    title: "Supply Chain Coordinator",
    location: "Chennai",
    type: "Full-time",
    desc: "Manage logistics, warehousing and cold-chain operations for timely delivery.",
    responsibilities: [
      "Coordinate end-to-end import logistics and customs clearance.",
      "Manage inventory levels across multiple warehouses to ensure stock availability.",
      "Monitor cold-chain shipments and ensure strict GDP (Good Distribution Practice) compliance.",
      "Liaise with freight forwarders, transporters, and internal sales teams.",
    ],
    requirements: [
      "Bachelor's degree with specialization in Supply Chain or Logistics Management.",
      "3+ years of experience, preferably handling pharmaceutical or chemical products.",
      "Proficiency in ERP systems and advanced Excel skills.",
      "Excellent problem-solving abilities and attention to detail.",
    ],
    rules: "On-site role at our Chennai headquarters/warehouse facility.",
  },
  {
    id: "regulatory-affairs-specialist",
    title: "Regulatory Affairs Specialist",
    location: "Chennai / Remote",
    type: "Full-time",
    desc: "Support compliance documentation for pharmaceutical and food ingredients.",
    responsibilities: [
      "Review and maintain regulatory documentation from global principals.",
      "Assist clients with technical queries, DMFs, and compliance certificates.",
      "Ensure all imported products adhere to FSSAI and FDA guidelines.",
      "Stay updated on changing domestic regulatory requirements.",
    ],
    requirements: [
      "M.Pharm or MSc in Regulatory Affairs or related field.",
      "2-4 years experience in regulatory compliance within pharma/food ingredient sector.",
      "Strong understanding of Indian and global regulatory frameworks.",
      "Meticulous attention to detail and excellent technical writing skills.",
    ],
    rules: "Flexible remote work option available with occasional travel to headquarters.",
  },
];

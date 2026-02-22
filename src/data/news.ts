export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: "Event" | "News" | "Press";
  image?: string;
}

export const articles: NewsArticle[] = [
  { id: "1", slug: "cphi-india-2025", title: "Scope Ingredients at CPhI India 2025", excerpt: "Visit us at Booth #A-234 at CPhI India, Greater Noida. Meet our team and explore our latest pharmaceutical excipient portfolio.", date: "2025-11-28", category: "Event" },
  { id: "2", slug: "roquette-partnership-expansion", title: "Expanded Partnership with Roquette for Plant-Based Excipients", excerpt: "Scope strengthens its partnership with Roquette to bring a wider range of plant-based pharmaceutical excipients to Indian formulators.", date: "2025-10-15", category: "News" },
  { id: "3", slug: "iso-recertification-2025", title: "ISO 9001:2015 Recertification Achieved", excerpt: "Scope Ingredients successfully completes ISO 9001:2015 recertification audit, reaffirming our commitment to quality management.", date: "2025-09-20", category: "Press" },
  { id: "4", slug: "cosmetics-vertical-growth", title: "Cosmetics Vertical Records 40% Growth in FY2025", excerpt: "Our cosmetics ingredients division achieves record growth driven by increased demand for clean beauty ingredients in India.", date: "2025-08-12", category: "News" },
  { id: "5", slug: "new-hyderabad-warehouse", title: "New Temperature-Controlled Warehouse in Hyderabad", excerpt: "Scope opens a state-of-the-art cold chain warehouse in Hyderabad to better serve South and Central India.", date: "2025-07-05", category: "Press" },
  { id: "6", slug: "food-ingredients-expo", title: "Presenting at Food Ingredients India 2025", excerpt: "Join us at FI India 2025 to discover our range of food-grade stabilizers, sweeteners, and functional ingredients.", date: "2025-06-18", category: "Event" },
];

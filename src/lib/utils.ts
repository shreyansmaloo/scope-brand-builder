import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Chemical/INCI names in the product data are stored ALL CAPS; render them in
// title case for readability while preserving already-mixed-case names as-is.
export const formatChemicalName = (name: string): string => {
  if (!name) return "";
  if (/[a-z]/.test(name)) return name.trim();
  const minorWords = ["and", "or", "of", "with", "for", "in", "by", "to", "at", "on", "a", "an", "the"];
  return name.split(/\s+/).map((word, idx) => {
    if (!word) return "";
    const parts = word.split('/').map(p =>
      p.split('-').map(sub => {
        if (!sub) return "";
        if (/^C\d+/i.test(sub)) return "C" + sub.slice(1).toUpperCase();
        return sub.charAt(0).toUpperCase() + sub.slice(1).toLowerCase();
      }).join('-')
    ).join('/');
    return minorWords.includes(word.toLowerCase()) && idx !== 0 ? word.toLowerCase() : parts;
  }).join(' ');
};

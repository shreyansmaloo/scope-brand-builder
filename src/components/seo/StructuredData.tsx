interface StructuredDataProps {
  data: Record<string, unknown>;
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Scope India",
    "url": "https://www.scope-india.com",
    "logo": "https://www.scope-india.com/logo.png",
    "sameAs": [
      // Add social media links here if requested later
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-44-40-400-400",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["English"]
    }
  };
};

export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Scope India",
    "image": "https://www.scope-india.com/logo.png",
    "url": "https://www.scope-india.com",
    "telephone": "+91-44-40-400-400",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No. 19, Marshalls Road, S-10, Raja Annamalai Bldg. Egmore",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "600008",
      "addressCountry": "IN"
    },
    "description": "Pharmaceutical raw material suppliers India, offering Global principal representation, excipient distributors, and personal care, food, and nutra ingredient sourcing."
  };
};

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

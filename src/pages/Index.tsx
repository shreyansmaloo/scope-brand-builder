import HeroSection from "@/components/sections/HeroSection";
import StatsBand from "@/components/sections/StatsBand";
import BrandStatement from "@/components/sections/BrandStatement";
import IndustryCards from "@/components/sections/IndustryCards";
import PartnersMarquee from "@/components/sections/PartnersMarquee";
import WhyChooseScope from "@/components/sections/WhyChooseScope";
import ExcipientSearch from "@/components/sections/ExcipientSearch";
import CertificationStrip from "@/components/sections/CertificationStrip";
import SampleCTABand from "@/components/sections/SampleCTABand";
import NewsPreview from "@/components/sections/NewsPreview";
import SEO from "@/components/seo/SEO";
import StructuredData, { generateOrganizationSchema, generateLocalBusinessSchema, generateBreadcrumbSchema } from "@/components/seo/StructuredData";

const Index = () => {
  const orgSchema = generateOrganizationSchema();
  const localBusinessSchema = generateLocalBusinessSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([{ name: "Home", url: "https://www.scope-india.com" }]);

  return (
    <main>
      <SEO 
        title="Pharmaceutical Raw Material Suppliers India | Scope India"
        description="Leading pharmaceutical raw material suppliers and excipient distributors in India. We also specialize in global principal representation and cosmetic ingredient sourcing."
        canonical="https://www.scope-india.com/"
      />
      <StructuredData data={{
        "@context": "https://schema.org",
        "@graph": [orgSchema, localBusinessSchema, breadcrumbSchema]
      }} />
      <HeroSection />
      <StatsBand />
      <BrandStatement />
      <IndustryCards />
      <PartnersMarquee />
      <WhyChooseScope />
      <ExcipientSearch />
      <CertificationStrip />
      <SampleCTABand />
      <NewsPreview />
    </main>
  );
};

export default Index;

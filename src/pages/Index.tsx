import HeroSection from "@/components/sections/HeroSection";
import StatsBand from "@/components/sections/StatsBand";
import BrandStatement from "@/components/sections/BrandStatement";
import IndustryCards from "@/components/sections/IndustryCards";
import PartnersMarquee from "@/components/sections/PartnersMarquee";
import WhyChooseScope from "@/components/sections/WhyChooseScope";
import CertificationStrip from "@/components/sections/CertificationStrip";
import SampleCTABand from "@/components/sections/SampleCTABand";
import NewsPreview from "@/components/sections/NewsPreview";

const Index = () => {
  return (
    <main>
      <HeroSection />
      <StatsBand />
      <BrandStatement />
      <IndustryCards />
      <PartnersMarquee />
      <WhyChooseScope />
      <CertificationStrip />
      <SampleCTABand />
      <NewsPreview />
    </main>
  );
};

export default Index;

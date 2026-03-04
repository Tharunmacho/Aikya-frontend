import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsLocationSection from "@/components/ProjectsLocationSection";
import SpecialOffersSection from "@/components/SpecialOffersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LeadershipSection from "@/components/LeadershipSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Aikya Builds Future | Building India's Future - Premium Real Estate</title>
        <meta
          name="description"
          content="Aikya Builds Future is India's leading real estate developer. 100+ projects delivered, 20+ years experience. Affordable housing, luxury villas, and cutting-edge infrastructure."
        />
        <meta name="keywords" content="real estate India, Aikya Builders, property Chennai, villas Tamilnadu, construction company India" />
        <link rel="canonical" href="https://aikyabuildsfuture.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Aikya Builds Future",
            description: "India's premier real estate developer",
            url: "https://aikyabuildsfuture.com",
            foundingDate: "2006",
            address: { "@type": "PostalAddress", addressLocality: "Chennai", addressCountry: "IN" },
          })}
        </script>
      </Helmet>

      <Navbar />
      <FloatingContactButtons />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsLocationSection />
        <SpecialOffersSection />
        <TestimonialsSection />
        <LeadershipSection />
        <WhyChooseSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;

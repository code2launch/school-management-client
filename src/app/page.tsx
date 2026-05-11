import LandingNavbar from './Components/Landing/LandingNavbar';
import HeroSection from './Components/Landing/HeroSection';
import StatsSection from './Components/Landing/StatsSection';
import FeaturesSection from './Components/Landing/FeaturesSection';
import ModulesSection from './Components/Landing/ModulesSection';
import PricingSection from './Components/Landing/PricingSection';
import TestimonialsSection from './Components/Landing/TestimonialsSection';
import CTASection from './Components/Landing/CTASection';
import Footer from './Components/Landing/Footer';

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <LandingNavbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ModulesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}

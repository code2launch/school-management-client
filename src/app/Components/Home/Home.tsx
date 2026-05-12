import AboutSection from "./AboutSection";
import AchievementsSection from "./AchievementsSection";
import CTASection from "./CTASection";
import Header from "./Header";
import Hero from "./Hero";
import HomeFooter from "./HomeFooter";
import NewsSection from "./NewsSection";
import PartnersSection from "./PartnersSection";
import ProgramsSection from "./ProgramsSection";
import StatsSection from "./StatsSection";
import TestimonialsSection from "./TestimonialsSection";
import TopBar from "./TopBar";


export default function Home() {
  return (
    <div className="bg-white text-slate-800">
      <TopBar />
      <Header />
      <Hero />
      <AboutSection />
      <StatsSection />
      <ProgramsSection />
      <AchievementsSection />
      <TestimonialsSection />
      <NewsSection />
      {/* <PartnersSection /> */}
      <CTASection />
      <HomeFooter />
    </div>
  );
}
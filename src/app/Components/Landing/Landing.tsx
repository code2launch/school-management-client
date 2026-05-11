import React from 'react'
import LandingHeader from './LandingHeader'
import LandingHero from './LandingHero'
import FeaturesSection from './FeaturesSection'
import ModulesSection from './ModulesSection'
import LandingTestimonials from './LandingTestimonials'
import PricingSection from './PricingSection'
import LandingCTA from './LandingCTA'
import Footer from './Footer'

export default function Landing() {
  return (
    <div className="bg-white">
      <LandingHeader />
      <LandingHero />
      <FeaturesSection />
      <ModulesSection />
      <LandingTestimonials />
      <PricingSection />
      <LandingCTA />
      <Footer />
    </div>
  )
}

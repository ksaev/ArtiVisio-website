"use client"

import Hero from "@/components/sections/hero"
import Services from "@/components/sections/services"
import Portfolio from "@/components/portfolio" // fixed
import VideoSection from "@/components/video-section" // fixed
import PricingSection from "@/components/sections/pricing-section"
import Testimonials from "@/components/testimonials" // fixed
import Contact from "@/components/contact" // fixed

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <VideoSection />
      <PricingSection />
      <Testimonials />
      <Contact />
    </>
  )
}

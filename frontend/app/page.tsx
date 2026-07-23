import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { EnterpriseChallenges } from "@/components/enterprise-challenges"
import { FeatureGrid } from "@/components/feature-grid"
import { HowItWorks } from "@/components/how-it-works"

import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <EnterpriseChallenges />
        <FeatureGrid />
        <HowItWorks />
        
      </main>
      <SiteFooter />
    </div>
  )
}

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Categories } from "@/components/categories"
import { DealsSection } from "@/components/deals-section"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/components/auth/auth-provider"

export default function Home() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-orange-50/30 to-amber-50/20">
        <Header />
        <Hero />
        <Categories />
        <DealsSection />
        <Footer />
      </div>
    </AuthProvider>
  )
}

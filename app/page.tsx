import { CTA } from "@/components/landingpageui/cta";
import { Features } from "@/components/landingpageui/features";
import { Footer } from "@/components/landingpageui/footer";
import { Hero } from "@/components/landingpageui/herosection";
import { HowItWorks } from "@/components/landingpageui/how-it-works";
import { Navbar } from "@/components/landingpageui/navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}

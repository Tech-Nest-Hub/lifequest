import { CTA } from "@/components/landingpageui/cta";
import { Features } from "@/components/landingpageui/features";
import { Footer } from "@/components/landingpageui/footer";
import { Hero } from "@/components/landingpageui/herosection";
import { HowItWorks } from "@/components/landingpageui/how-it-works";
import { Navbar } from "@/components/landingpageui/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-background to-slate-50">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA/>
      <Footer />
    </main>
  );
}

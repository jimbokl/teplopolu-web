import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Calculator } from "@/components/calculator/calculator";
import { Segments } from "@/components/segments";
import { Cities } from "@/components/cities";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Calculator />
      <Segments />
      <Cities />
      <Footer />
    </main>
  );
}

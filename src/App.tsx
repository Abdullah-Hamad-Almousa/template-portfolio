import { CtaSection } from "./components/CtaSection";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { MissionSection } from "./components/MissionSection";
import { Navbar } from "./components/Navbar";
import { SearchSection } from "./components/SearchSection";
import { SolutionSection } from "./components/SolutionSection";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <main>
        <SearchSection />
        <MissionSection />
        <SolutionSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
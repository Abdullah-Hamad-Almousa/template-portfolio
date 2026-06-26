import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SearchSection } from "./components/SearchSection";
import { MissionSection } from "./components/MissionSection";
import { SolutionSection } from "./components/SolutionSection";
import { TimelineAchievements } from "./components/TimelineAchievements";
import { CtaSection } from "./components/CtaSection";
import { Footer } from "./components/Footer";
import { Capabilities } from "./components/Capabilities";
import { Contact } from "./components/Contact";
import { Links } from "./components/Links";
import { Books } from "./components/Books";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [showHidden, setShowHidden] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("portfolio_show_hidden") === "true";
    }
    return false;
  });

  const toggleHidden = () => {
    setShowHidden((prev) => {
      const next = !prev;
      localStorage.setItem("portfolio_show_hidden", String(next));
      if (!next && (activePage === "links" || activePage === "books")) {
        setActivePage("home");
      }
      return next;
    });
  };

  const renderPage = () => {
    switch (activePage) {
      case "capabilities":
        return <Capabilities />;
      case "contact":
        return <Contact />;
      case "links":
        if (!showHidden) return (
          <>
            <Hero />
            <SearchSection />
            <MissionSection />
            <SolutionSection />
            <TimelineAchievements />
            <CtaSection />
          </>
        );
        return <Links />;
      case "books":
        if (!showHidden) return (
          <>
            <Hero />
            <SearchSection />
            <MissionSection />
            <SolutionSection />
            <TimelineAchievements />
            <CtaSection />
          </>
        );
        return <Books />;
      case "home":
      default:
        return (
          <>
            <Hero />
            <SearchSection />
            <MissionSection />
            <SolutionSection />
            <TimelineAchievements />
            <CtaSection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between overflow-x-hidden">
      <Navbar activePage={activePage} setActivePage={setActivePage} showHidden={showHidden} />
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer onToggleHidden={toggleHidden} />
    </div>
  );
}
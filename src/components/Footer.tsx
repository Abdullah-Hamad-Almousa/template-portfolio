import { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

interface FooterProps {
  onToggleHidden: () => void;
}

export function Footer({ onToggleHidden }: FooterProps) {
  const { t } = useLanguage();
  const [visitorCount, setVisitorCount] = useState<number | string>("...");

  useEffect(() => {
    if (sessionStorage.getItem("visitor_counted")) return;
    sessionStorage.setItem("visitor_counted", "1");
    fetch("https://api.modelai.website/visitors")
      .then((res) => res.json())
      .then((data) => setVisitorCount(data.count ?? "..."))
      .catch(() => setVisitorCount("..."));
  }, []);

  const FOOTER_LINKS = [
    { label: t.footer.linkedin, href: "https://www.linkedin.com/in/abdullah-almousa-a76562237" },
    { label: t.footer.github, href: "https://github.com/Abdullah-Hamad-Almousa" },
    { label: t.footer.kaggle, href: "https://www.kaggle.com/abdullahhamadalmousa" },
  ];

  return (
    <footer className="flex items-center justify-between flex-wrap gap-4 py-12 px-6 md:px-14 lg:px-28 border-t border-border/20">
      <span className="text-sm text-muted-foreground">
        {t.footer.copyright}
      </span>
      <div className="flex items-center gap-6 text-sm">
        {FOOTER_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
        <span className="text-muted-foreground">
          {t.footer.visitors}: {typeof visitorCount === "number" ? visitorCount.toLocaleString() : visitorCount}
        </span>
        <button
          onClick={onToggleHidden}
          className="w-5 h-5 flex items-center justify-center focus:outline-none cursor-default float-water"
          aria-label="Toggle Pages"
        >
          <img
            src="logo.png"
            alt="Toggle Logo"
            className="w-4 h-4 object-contain opacity-50 cursor-default"
          />
        </button>
      </div>
    </footer>
  );
}
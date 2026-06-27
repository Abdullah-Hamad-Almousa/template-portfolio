import { Github, Linkedin, Globe } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "capabilities", label: "Capabilities" },
  { id: "contact", label: "Contact" },
  { id: "links", label: "Links" },
  { id: "books", label: "Books" },
];

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  showHidden: boolean;
}

export function Navbar({ activePage, setActivePage, showHidden }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visibleLinks = NAV_LINKS.filter(
    (link) => showHidden || (link.id !== "links" && link.id !== "books")
  );

  return (
    <nav
      className={
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between " +
        "px-6 md:px-14 lg:px-28 py-4 transition-colors duration-300 " +
        (scrolled ? "bg-background/70 backdrop-blur-md" : "bg-transparent")
      }
    >
      <div
        className="flex items-center gap-2.5 cursor-pointer"
        onClick={() => {
          setActivePage("home");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <div className="relative w-8 h-8 rounded-full shadow-sm overflow-hidden liquid-glass grid place-items-center water-shine float-water">
          <img
            src="logo.png"
            alt="Logo"
            className="w-[1.35rem] h-[1.35rem] object-contain"
          />
        </div>
        <span className="font-bold text-[1.05rem] tracking-tight">Abdullah Almousa</span>
      </div>

      <div className="hidden md:flex items-center gap-3 text-sm">
        {visibleLinks.map((link, i) => (
          <span key={link.id} className="flex items-center gap-3">
            <button
              onClick={() => {
                setActivePage(link.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`transition-colors duration-200 uppercase tracking-wider text-[11px] font-semibold ${
                activePage === link.id
                  ? "text-primary font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </button>
            {i < visibleLinks.length - 1 && (
              <span className="text-muted-foreground opacity-30">•</span>
            )}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2.5">
        <SocialButton label="GitHub" href="https://github.com/Abdullah-Hamad-Almousa">
          <Github size={18} strokeWidth={2} />
        </SocialButton>
        <SocialButton label="LinkedIn" href="https://www.linkedin.com/in/abdullah-almousa-a76562237">
          <Linkedin size={18} strokeWidth={2} />
        </SocialButton>
        <SocialButton label="Kaggle" href="https://www.kaggle.com/abdullahhamadalmousa">
          <Globe size={18} strokeWidth={2} />
        </SocialButton>
      </div>
    </nav>
  );
}

function SocialButton({ label, href, children }: { label: string; href: string; children: React.ReactNode }) {
  return (
    <a
      aria-label={label}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="liquid-glass w-10 h-10 rounded-full grid place-items-center text-foreground hover:scale-105 active:scale-95 transition-transform duration-200"
    >
      {children}
    </a>
  );
}
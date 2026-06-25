import { Instagram, Linkedin, Twitter } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "How It Works", href: "#how" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Use Cases", href: "#usecases" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between " +
        "px-6 md:px-14 lg:px-28 py-4 transition-colors duration-300 " +
        (scrolled ? "bg-background/70 backdrop-blur-md" : "bg-transparent")
      }
    >
      <div className="flex items-center gap-2.5">
        <div className="relative w-7 h-7 grid place-items-center">
          <div className="w-7 h-7 rounded-full border-2 border-foreground/60" />
          <div className="absolute w-3 h-3 rounded-full border border-foreground/60" />
        </div>
        <span className="font-bold text-[1.05rem] tracking-tight">Mindloop</span>
      </div>

      <div className="hidden md:flex items-center gap-2.5 text-sm">
        {NAV_LINKS.map((link, i) => (
          <span key={link.label} className="flex items-center gap-2.5">
            <a
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
            {i < NAV_LINKS.length - 1 && (
              <span className="text-muted-foreground opacity-50">•</span>
            )}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2.5">
        <SocialButton label="Instagram">
          <Instagram size={18} strokeWidth={2} />
        </SocialButton>
        <SocialButton label="LinkedIn">
          <Linkedin size={18} strokeWidth={2} />
        </SocialButton>
        <SocialButton label="Twitter">
          <Twitter size={18} strokeWidth={2} />
        </SocialButton>
      </div>
    </nav>
  );
}

function SocialButton({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button
      aria-label={label}
      className="liquid-glass w-10 h-10 rounded-full grid place-items-center text-foreground hover:scale-105 active:scale-95 transition-transform duration-200"
    >
      {children}
    </button>
  );
}
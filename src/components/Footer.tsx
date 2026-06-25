const FOOTER_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abdullah-almousa-a76562237" },
  { label: "GitHub", href: "https://github.com/Abdullah-Hamad-Almousa" },
  { label: "Kaggle", href: "https://www.kaggle.com/abdullahhamadalmousa" },
];

export function Footer() {
  return (
    <footer className="flex items-center justify-between flex-wrap gap-4 py-12 px-6 md:px-14 lg:px-28 border-t border-border/20">
      <span className="text-sm text-muted-foreground">
        © 2026 Abdullah Almousa. All rights reserved.
      </span>
      <div className="flex gap-6 text-sm">
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
      </div>
    </footer>
  );
}
const FOOTER_LINKS = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Contact", href: "#" },
];

export function Footer() {
  return (
    <footer className="flex items-center justify-between flex-wrap gap-4 py-12 px-6 md:px-14 lg:px-28">
      <span className="text-sm text-muted-foreground">
        © 2026 Mindloop. All rights reserved.
      </span>
      <div className="flex gap-6 text-sm">
        {FOOTER_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
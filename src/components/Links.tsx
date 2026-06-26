import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Copy, ExternalLink, QrCode, X, Check } from "lucide-react";
import { FadeUp } from "./FadeUp";

interface LinkItem {
  name: string;
  url: string;
  qrImage: string;
  description: string;
}

const LINKS: LinkItem[] = [
  {
    name: "My CV",
    url: "https://abdullah-hamad-almousa.github.io/MyNewPortfolio/pages/almousa_CV3.html",
    qrImage: "/QRCode/MyCV.png",
    description: "Updated resume with full project details.",
  },
  {
    name: "My Portfolio",
    url: "https://abdullah-hamad-almousa.github.io/MyNewPortfolio",
    qrImage: "/QRCode/MyPortfolio.png",
    description: "My personal website and showcase.",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/abdullah-almousa-a76562237",
    qrImage: "/QRCode/MyLinkedIn.png",
    description: "Professional networking and experience.",
  },
  {
    name: "GitHub",
    url: "https://github.com/Abdullah-Hamad-Almousa",
    qrImage: "/QRCode/MyGithub.png",
    description: "Code repositories and open source work.",
  },
  {
    name: "Kaggle",
    url: "https://www.kaggle.com/abdullahhamadalmousa",
    qrImage: "/QRCode/MyKaggle.png",
    description: "Data science competitions and notebooks.",
  },
  {
    name: "My Books",
    url: "https://abdullah-hamad-almousa.github.io/MyNewPortfolio/pages/Linkes/Book.html",
    qrImage: "/QRCode/MyBooks.png",
    description: "My reading journey and literary collection.",
  },
];

export function Links() {
  const [selectedQR, setSelectedQR] = useState<LinkItem | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(url);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <section className="pt-28 pb-20 container max-w-6xl">
      {/* Title */}
      <div className="text-center mb-16">
        <FadeUp as="div" delay={0}>
          <span className="block text-xs tracking-[3px] uppercase text-muted-foreground mb-3">
            CONNECT
          </span>
        </FadeUp>
        <FadeUp as="h1" delay={0.08}>
          <span className="block text-5xl md:text-6xl font-medium tracking-tightish">
            My <span className="serif">Links</span>
          </span>
        </FadeUp>
        <FadeUp as="p" delay={0.16}>
          <span className="block text-muted-foreground text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Explore my professional portfolios, code repositories, data science competition profiles, and reading list.
          </span>
        </FadeUp>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {LINKS.map((item, idx) => (
          <FadeUp key={item.name} delay={idx * 0.08}>
            <div className="liquid-glass p-6 rounded-2xl flex flex-col items-center text-center group hover:border-foreground/35 transition-all duration-300">
              {/* QR Image Box */}
              <div
                onClick={() => setSelectedQR(item)}
                className="w-40 h-40 bg-white p-2.5 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 relative group/qr flex items-center justify-center border border-border/25"
              >
                <img
                  src={item.qrImage}
                  alt={`${item.name} QR Code`}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/qr:opacity-100 flex items-center justify-center transition-opacity duration-200">
                  <QrCode size={24} className="text-white" />
                </div>
              </div>

              {/* Info */}
              <h3 className="text-lg font-semibold mt-6 mb-2">{item.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed min-h-[36px] mb-6">
                {item.description}
              </p>

              {/* Actions */}
              <div className="flex gap-3 w-full mt-auto">
                <button
                  onClick={() => handleCopy(item.url)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-border/40 hover:bg-foreground/5 hover:text-foreground text-xs font-semibold text-muted-foreground transition-all duration-200"
                >
                  {copiedLink === item.url ? (
                    <>
                      <Check size={13} className="text-green-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      Copy Link
                    </>
                  )}
                </button>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-foreground text-background hover:bg-foreground/90 text-xs font-semibold transition-all duration-200"
                >
                  <ExternalLink size={13} />
                  Visit
                </a>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      {/* QR Code Enlarged Modal */}
      <AnimatePresence>
        {selectedQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedQR(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-zinc-900 border border-border/30 p-8 rounded-2xl max-w-sm w-full flex flex-col items-center text-center shadow-2xl"
            >
              <button
                onClick={() => setSelectedQR(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <h3 className="text-xl font-semibold mb-1">{selectedQR.name}</h3>
              <p className="text-xs text-muted-foreground mb-6">Scan QR code to visit</p>

              <div className="w-64 h-64 bg-white p-4 rounded-xl overflow-hidden shadow-inner border border-zinc-700 flex items-center justify-center mb-6">
                <img
                  src={selectedQR.qrImage}
                  alt={`${selectedQR.name} Enlarged QR Code`}
                  className="w-full h-full object-contain"
                />
              </div>

              <a
                href={selectedQR.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline font-mono break-all max-w-full"
              >
                {selectedQR.url}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

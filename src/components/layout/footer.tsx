"use client";

import { motion } from "motion/react";

const footerLinks = [
  {
    title: "Navigate",
    links: [
      { label: "Services", href: "#services" },
      { label: "Projects", href: "#projects" },
      { label: "Approach", href: "#approach" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact", href: "#contact" },
      { label: "LinkedIn", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "Instagram", href: "#" },
    ],
  },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-muted">
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h2 className="text-4xl font-bold tracking-tighter mb-4">JH</h2>
            <p className="text-muted-foreground text-body max-w-sm">
              Lead process, prove results.
              <br />
              경험을 진화시키고, 성과로 증명합니다.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-caption uppercase tracking-widest mb-4 font-medium">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                      data-cursor-hover
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between mt-16 pt-8 border-t border-border">
          <p className="text-caption">
            &copy; {new Date().getFullYear()} JH. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm font-medium hover:text-muted-foreground transition-colors"
            data-cursor-hover
          >
            Back to top &uarr;
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

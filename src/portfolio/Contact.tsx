import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong rounded-4xl p-10 md:p-16 relative overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[140%] rounded-full"
            style={{ background: "radial-gradient(ellipse, oklch(1 0 0 / 0.1), transparent 60%)" }}
          />
          <div className="relative">
            <p className="font-mono text-xs text-muted-foreground mb-4">// 04 — Contact</p>
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[0.95] mb-8">
              Got something <br />
              <span className="italic font-light text-gradient">to build?</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mb-10 leading-relaxed">
              I take on a small number of engagements each quarter. If you&apos;re shipping
              something that demands taste and engineering rigor, let&apos;s talk.
            </p>

            <a
              href="mailto:kai-mercer@ace.me"
              className="group inline-flex items-center gap-3 text-2xl md:text-4xl font-semibold tracking-tight hover:text-gradient transition-all"
            >
              kai-mercer@ace.me
              <ArrowUpRight className="h-7 w-7 md:h-9 md:w-9 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            <div className="mt-14 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                {[
                  { icon: FaGithub, href: "https://github.com/Kai-Mercer-Coder", label: "GitHub" },
                  { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/kai-mercer-b95722407/", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:kai-mercer@ace.me", label: "Email" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="h-10 w-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <s.icon className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
              <p className="font-mono text-xs text-muted-foreground">
                © 2026 Kai Mercer — Designed & built in Singapore
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

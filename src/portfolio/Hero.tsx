import { motion } from "framer-motion";
import { ArrowUpRight, Download, MapPin, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20">
      {/* Ambient background */}
      <div
        aria-hidden
        className="absolute inset-0 grid-bg mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 h-150 w-225 rounded-full"
        style={{ background: "var(--gradient-radial)" }}
      />
      {/* Floating orbs */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-[10%] h-72 w-72 rounded-full bg-white/4 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-[10%] h-80 w-80 rounded-full bg-white/3 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs font-mono text-muted-foreground mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for new projects — Q3 2026
        </motion.div>

        <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.95] tracking-tighter font-semibold">
          {["Crafting", "interfaces"].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-4"
            >
              {word}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block text-gradient italic font-light"
          >
            with intent.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-10 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed"
        >
          I&apos;m <span className="text-foreground">Kai Mercer</span>, a frontend engineer
          shipping precise, performant web experiences — with enough backend fluency to
          architect what powers them.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            View selected work
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium hover:bg-white/8 transition-colors"
          >
            <Sparkles className="h-4 w-4" />
            Start a project
          </a>
          <a
            href="/kai-mercer-cv.pdf"
            download
            className="group inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium hover:bg-white/8 transition-colors"
          >
            <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            Download CV
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-16 flex items-center gap-6 text-xs font-mono text-muted-foreground"
        >
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            Berlin / Remote
          </div>
          <div className="h-3 w-px bg-border" />
          <div>5+ yrs shipping</div>
          <div className="h-3 w-px bg-border" />
          <div>Frontend × Backend</div>
        </motion.div>
      </div>
    </section>
  );
}

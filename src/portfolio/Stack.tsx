import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiFramer,
  SiShadcnui,
  SiHtml5,
  SiCss,
  SiFigma,
  SiPostgresql
} from "react-icons/si";

type Tech = {
  name: string;
  icon: IconType;
  level: "Mastery" | "Expert" | "Strong";
  description: string;
};

const stack: Tech[] = [
  { name: "TypeScript", icon: SiTypescript, level: "Mastery", description: "Typed JavaScript at scale." },
  { name: "JavaScript", icon: SiJavascript, level: "Mastery", description: "The language of the web." },
  { name: "Next.js", icon: SiNextdotjs, level: "Mastery", description: "React framework for production." },
  { name: "React", icon: SiReact, level: "Mastery", description: "UI library for components." },
  { name: "Tailwind CSS", icon: SiTailwindcss, level: "Mastery", description: "Utility-first styling." },
  { name: "Framer Motion", icon: SiFramer, level: "Expert", description: "Declarative motion engine." },
  { name: "shadcn/ui", icon: SiShadcnui, level: "Expert", description: "Composable component library." },
  { name: "Figma", icon: SiFigma, level: "Expert", description: "Interface design & prototyping." },
  { name: "HTML5", icon: SiHtml5, level: "Mastery", description: "Semantic markup foundation." },
  { name: "CSS", icon: SiCss, level: "Mastery", description: "A designing style sheet." },
  { name: "PostgreSQL", icon: SiPostgresql, level: "Strong", description: "Database development and management." },
];

export function Stack() {
  return (
    <section id="stack" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-14 gap-6 flex-wrap"
        >
          <div>
            <p className="font-mono text-xs text-muted-foreground mb-3">// 02 — Toolkit</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter">
              Tools I&apos;ve <span className="italic font-light text-gradient pr-1">mastered</span>.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            A focused stack chosen for type-safety, velocity, and surgical control over the user
            experience — from Figma to production.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
          {stack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              transition-hover={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group glass rounded-2xl p-6 relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/5 hover:border-white/20"
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 0%, oklch(1 0 0 / 0.08), transparent 70%)",
                }}
              />
              <tech.icon
                className="h-7 w-7 mb-5 text-foreground/80 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-foreground group-hover:scale-110 group-hover:-translate-y-0.5"
              />
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <h3 className="font-medium tracking-tight">{tech.name}</h3>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
                  {tech.level}
                </span>
              </div>
              <p className="text-xs text-muted-foreground/80 leading-relaxed">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Images } from "lucide-react";
import { useMemo, useState } from "react";
import { ProjectGallery } from "./ProjectGallery";

type Category = "all" | "frontend" | "uiux";

type Project = {
  n: string;
  title: string;
  blurb: string;
  tags: string[];
  year: string;
  category: Exclude<Category, "all">;
  href?: string;
  gallery?: string[];
};

// Random dummy gallery images (Picsum placeholder service)
const galleryFor = (seed: string, count = 7) =>
  Array.from({ length: count }, (_, i) => `https://picsum.photos/seed/${seed}-${i}/1200/900`);

const projects: Project[] = [
  {
    n: "01",
    title: "Lumen Analytics",
    blurb:
      "Realtime product analytics dashboard with sub-50ms interactions. Built the entire frontend and the streaming aggregation layer.",
    tags: ["Next.js", "TypeScript", "Postgres", "WebSockets"],
    year: "2026",
    category: "frontend",
    href: "#",
  },
  {
    n: "02",
    title: "Halo Commerce",
    blurb:
      "Headless storefront for a luxury skincare brand — 100/100 Lighthouse, with a custom Tailwind design system and motion choreography.",
    tags: ["Next.js", "Tailwind", "Framer Motion", "shadcn"],
    year: "2025",
    category: "frontend",
    href: "#",
  },
  {
    n: "03",
    title: "Aurora Banking",
    blurb:
      "End-to-end UI/UX concept for a mobile-first neobank. 40+ screens, design system, prototyped flows for onboarding, transfers, and budgeting.",
    tags: ["Figma", "Design System", "Prototyping"],
    year: "2025",
    category: "uiux",
    gallery: galleryFor("aurora", 8),
  },
  {
    n: "04",
    title: "Drift OS",
    blurb:
      "Internal tooling platform: drag-and-drop workflow editor, role-based access, and a Node API layer powering 12 enterprise teams.",
    tags: ["TypeScript", "Node", "tRPC", "React"],
    year: "2025",
    category: "frontend",
    href: "#",
  },
  {
    n: "05",
    title: "Pulse Wearables",
    blurb:
      "Companion app exploration for a fitness wearable. Visual identity, motion studies, and a complete component library handed off to engineering.",
    tags: ["Figma", "Motion", "Auto Layout"],
    year: "2024",
    category: "uiux",
    gallery: galleryFor("pulse", 7),
  },
  {
    n: "06",
    title: "Northwind Docs",
    blurb:
      "Documentation engine with MDX, full-text search, and an authoring UI. Open-sourced and used by 4k+ developers.",
    tags: ["Next.js", "MDX", "TypeScript"],
    year: "2024",
    category: "frontend",
    href: "#",
  },
];

const filters: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "frontend", label: "Frontend" },
  { key: "uiux", label: "UI / UX" },
];

export function Work() {
  const [filter, setFilter] = useState<Category>("all");
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="work" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="font-mono text-xs text-muted-foreground mb-3">// 01 — Selected work</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter max-w-2xl">
            Recent things I&apos;ve <span className="italic font-light text-gradient pr-1">shipped</span>.
          </h2>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-10"
          role="tablist"
          aria-label="Project filters"
        >
          {filters.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.key)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${active
                    ? "text-background"
                    : "text-muted-foreground hover:text-foreground glass"
                  }`}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 bg-foreground rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            );
          })}
        </motion.div>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => {
              const isUiux = p.category === "uiux";
              const inner = (
                <>
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), oklch(1 0 0 / 0.06), transparent 40%)",
                    }}
                  />
                  <div className="relative flex items-start gap-6 md:gap-10">
                    <span className="font-mono text-xs text-muted-foreground pt-1.5 shrink-0">
                      {p.n}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-4 flex-wrap mb-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                            {p.title}
                          </h3>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground border border-border rounded-full px-2 py-0.5">
                            {isUiux ? "UI / UX" : "Frontend"}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
                      </div>
                      <p className="text-muted-foreground max-w-2xl mb-5 leading-relaxed">
                        {p.blurb}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-border text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    {isUiux ? (
                      <Images className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:scale-110 transition-all shrink-0 mt-1.5" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:rotate-12 transition-all shrink-0 mt-1.5" />
                    )}
                  </div>
                </>
              );

              const className =
                "group block w-full text-left glass rounded-3xl p-7 md:p-8 hover:bg-white/6 transition-all relative overflow-hidden";
              const transition = { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };

              if (isUiux) {
                return (
                  <motion.button
                    key={p.n}
                    layout
                    type="button"
                    onClick={() => setOpenProject(p)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={transition}
                    className={className}
                  >
                    {inner}
                  </motion.button>
                );
              }

              return (
                <motion.a
                  key={p.n}
                  layout
                  href={p.href ?? "#"}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={transition}
                  className={className}
                >
                  {inner}
                </motion.a>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <ProjectGallery
        open={openProject !== null}
        onClose={() => setOpenProject(null)}
        title={openProject?.title ?? ""}
        images={openProject?.gallery ?? []}
      />
    </section>
  );
}

import { motion } from "framer-motion";
import { Database, Layout, Server } from "lucide-react";

const pillars = [
  {
    icon: Layout,
    title: "Frontend craft",
    body: "Pixel-precise UI, accessible components, motion that earns its keep, and performance budgets that hold up in production.",
  },
  {
    icon: Server,
    title: "Backend fluency",
    body: "REST and tRPC APIs, auth, queues and background jobs in Node — enough depth to design end-to-end, not just consume endpoints.",
  },
  {
    icon: Database,
    title: "Systems thinking",
    body: "Postgres schemas, caching strategies, and observable systems. I write the frontend with the database in mind.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <p className="font-mono text-xs text-muted-foreground mb-3">// 03 — About</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-6">
              Frontend first.<br />
              <span className="italic font-light text-gradient">Full-stack capable.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              I spend most of my time in the browser — but I&apos;ve shipped enough Node, Postgres,
              and infrastructure to know what good systems feel like. That perspective shows up in
              every interface I build.
            </p>
          </motion.div>

          <div className="lg:col-span-7 space-y-3">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-2xl p-7 flex gap-5"
              >
                <div className="shrink-0 h-11 w-11 rounded-xl glass-strong flex items-center justify-center">
                  <p.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-medium tracking-tight mb-1.5">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

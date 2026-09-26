import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  images: string[];
};

export function ProjectGallery({ open, onClose, title, images }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-100 bg-background/80 backdrop-blur-xl overflow-y-auto"
          onClick={onClose}
        >
          <div
            className="min-h-full px-6 py-20 mx-auto max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-10 sticky top-4 z-10">
              <div>
                <p className="font-mono text-xs text-muted-foreground mb-2">// Gallery</p>
                <h3 className="text-3xl md:text-4xl font-semibold tracking-tighter">{title}</h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close gallery"
                className="glass rounded-full h-11 w-11 inline-flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`glass rounded-2xl overflow-hidden ${
                    i % 5 === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                  }`}
                >
                  <img
                    src={src}
                    alt={`${title} mockup ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover aspect-4/3"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

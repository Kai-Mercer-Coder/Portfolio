import { useEffect, useRef, useState } from "react";

type Burst = { id: number; x: number; y: number };

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: mouse.x, y: mouse.y, vx: 0, vy: 0 };
    let cooldown = 0;
    let burstId = 0;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      }
    };

    const tick = () => {
      // Very low spring constant → ~9s settle from rest
      const k = 0.0009;
      const damping = 0.92;
      const dx = mouse.x - ring.x;
      const dy = mouse.y - ring.y;
      ring.vx = (ring.vx + dx * k) * damping;
      ring.vy = (ring.vy + dy * k) * damping;
      ring.x += ring.vx;
      ring.y += ring.vy;

      const dist = Math.hypot(dx, dy);
      if (cooldown > 0) cooldown--;

      if (dist < 3 && cooldown === 0) {
        // Knockback in direction opposite to approach (i.e., opposite of velocity)
        const speed = Math.hypot(ring.vx, ring.vy) || 1;
        const nx = -ring.vx / speed;
        const ny = -ring.vy / speed;
        const impulse = 38;
        // If basically still, fling in a random direction
        if (speed < 0.01) {
          const a = Math.random() * Math.PI * 2;
          ring.vx = Math.cos(a) * impulse;
          ring.vy = Math.sin(a) * impulse;
        } else {
          ring.vx = nx * impulse;
          ring.vy = ny * impulse;
        }
        cooldown = 45;
        const id = ++burstId;
        const bx = mouse.x;
        const by = mouse.y;
        setBursts((b) => [...b, { id, x: bx, y: by }]);
        setTimeout(() => {
          setBursts((b) => b.filter((x) => x.id !== id));
        }, 450);
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-100" aria-hidden>
      <div
        ref={ringRef}
        className="absolute top-0 left-0 h-8 w-8 rounded-full cursor-ring-spin"
        style={{ willChange: "transform" }}
      >
        <div className="absolute inset-0 rounded-full cursor-ring-grad" />
      </div>
      <div
        ref={dotRef}
        className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-white"
        style={{ mixBlendMode: "difference", willChange: "transform" }}
      />
      {bursts.map((b) => (
        <div
          key={b.id}
          className="absolute top-0 left-0"
          style={{
            transform: `translate3d(${b.x}px, ${b.y}px, 0) translate(-50%, -50%)`,
          }}
        >
          <div
            className="h-7 w-7 rounded-full border border-white/70 cursor-burst"
            style={{ mixBlendMode: "difference" }}
          />
        </div>
      ))}
    </div>
  );
}

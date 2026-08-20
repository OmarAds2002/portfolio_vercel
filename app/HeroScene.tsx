"use client";

import { useEffect, useRef } from "react";

// Bimanual handoff hero animation — two planar arms pass an object back and
// forth, gripping together through the middle (the mutual-grasp moment), with
// a fading violet trajectory trail. Pure Canvas 2D: zero dependencies, ~0KB.
export default function HeroScene() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;

    const resize = () => {
      W = cv.clientWidth;
      H = cv.clientHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const V = "rgba(139,92,246,";
    let t = 0;
    let trail: [number, number][] = [];

    const ss = (e0: number, e1: number, x: number) => {
      let u = (x - e0) / (e1 - e0);
      u = Math.max(0, Math.min(1, u));
      return u * u * (3 - 2 * u);
    };
    const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

    // Closed-form 2-link inverse kinematics
    const ik = (
      bx: number,
      by: number,
      tx: number,
      ty: number,
      L1: number,
      L2: number,
      sign: number
    ): [number, number][] => {
      const dx = tx - bx;
      const dy = ty - by;
      let d = Math.hypot(dx, dy);
      d = Math.max(Math.abs(L1 - L2) + 0.01, Math.min(L1 + L2 - 0.01, d));
      let c2 = (d * d - L1 * L1 - L2 * L2) / (2 * L1 * L2);
      c2 = Math.max(-1, Math.min(1, c2));
      const a2 = Math.acos(c2) * sign;
      const a1 =
        Math.atan2(dy, dx) - Math.atan2(L2 * Math.sin(a2), L1 + L2 * Math.cos(a2));
      const ex = bx + Math.cos(a1) * L1;
      const ey = by + Math.sin(a1) * L1;
      return [
        [bx, by],
        [ex, ey],
        [ex + Math.cos(a1 + a2) * L2, ey + Math.sin(a1 + a2) * L2],
      ];
    };

    const arm = (p: [number, number][], alpha: number) => {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = V + alpha + ")";
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(p[0][0], p[0][1]);
      for (let i = 1; i < p.length; i++) ctx.lineTo(p[i][0], p[i][1]);
      ctx.stroke();
      for (let j = 0; j < p.length; j++) {
        ctx.beginPath();
        ctx.arc(p[j][0], p[j][1], j === 0 ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = "#0a0a0a";
        ctx.strokeStyle = V + alpha + ")";
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
      }
    };

    let raf = 0;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      const by = H - 44;
      const L1 = 80;
      const L2 = 66;
      const rBase = W - 70;
      const lBase = W - 70 - 260;
      const cx = (lBase + rBase) / 2;
      const span = 200;
      const holdY = by - 96;
      const s = Math.sin(t);
      const ox = cx + (span / 2) * s;
      const oy = holdY - 24 * (1 - s * s);
      const lE = 1 - ss(0.1, 0.85, s);
      const rE = 1 - ss(-0.1, -0.85, s);
      const lTx = lerp(lBase + 34, ox, lE);
      const lTy = lerp(by - 72, oy, lE);
      const rTx = lerp(rBase - 34, ox, rE);
      const rTy = lerp(by - 72, oy, rE);

      // ground + bases
      ctx.strokeStyle = "rgba(139,92,246,0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(lBase - 40, by);
      ctx.lineTo(rBase + 40, by);
      ctx.stroke();
      ctx.strokeStyle = "rgba(139,92,246,0.3)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(lBase - 24, by);
      ctx.lineTo(lBase + 24, by);
      ctx.moveTo(rBase - 24, by);
      ctx.lineTo(rBase + 24, by);
      ctx.stroke();

      // trajectory trail
      trail.push([ox, oy]);
      if (trail.length > 85) trail.shift();
      for (let i = 1; i < trail.length; i++) {
        const a = (i / trail.length) * 0.45;
        ctx.strokeStyle = V + a + ")";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(trail[i - 1][0], trail[i - 1][1]);
        ctx.lineTo(trail[i][0], trail[i][1]);
        ctx.stroke();
      }

      arm(ik(lBase, by, lTx, lTy, L1, L2, -1), lerp(0.25, 0.9, lE));
      arm(ik(rBase, by, rTx, rTy, L1, L2, 1), lerp(0.25, 0.9, rE));

      // object
      ctx.save();
      ctx.translate(ox, oy);
      ctx.rotate(s * 0.3);
      ctx.fillStyle = "#c4b5fd";
      ctx.strokeStyle = "#a78bfa";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(-9, -9, 18, 18, 4);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      if (!reduced) {
        t += 0.011;
        raf = requestAnimationFrame(frame);
      }
    };

    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      trail = [];
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
    />
  );
}
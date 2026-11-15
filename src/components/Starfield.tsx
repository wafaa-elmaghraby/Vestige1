import React, { useEffect, useRef } from 'react';

interface StarfieldProps {
  density?: number;
  className?: string;
}

interface Star {
  x: number;
  y: number;
  r: number;
  a: number;
  twinkle: number;
  phase: number;
}

/**
 * Slow, low-contrast star field rendered on canvas.
 * Pauses when the element scrolls out of view or when the user prefers
 * reduced motion, and scales with devicePixelRatio for crisp points.
 */
export const Starfield: React.FC<StarfieldProps> = ({ density = 0.00016, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let stars: Star[] = [];
    let frame = 0;
    let visible = true;
    let width = 0;
    let height = 0;

    const build = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth || window.innerWidth;
      height = parent?.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(width * height * density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.25 + 0.25,
        a: Math.random() * 0.55 + 0.18,
        twinkle: Math.random() * 0.012 + 0.002,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        const alpha = reduceMotion ? s.a : s.a + Math.sin(t * s.twinkle + s.phase) * 0.16;
        ctx.beginPath();
        ctx.fillStyle =
          s.r > 1.1 ? `rgba(160, 208, 255, ${alpha})` : `rgba(214, 231, 255, ${alpha})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      if (visible) draw(t);
      frame = requestAnimationFrame(loop);
    };

    build();
    draw(0);
    if (!reduceMotion) frame = requestAnimationFrame(loop);

    const onResize = () => {
      build();
      draw(0);
    };
    window.addEventListener('resize', onResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
};
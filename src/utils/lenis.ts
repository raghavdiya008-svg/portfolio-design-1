import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export const initLenis = (): Lenis => {
  if (typeof window === 'undefined') return null as any;

  if (!lenisInstance) {
    lenisInstance = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Luxurious exponential decay
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenisInstance?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }

  return lenisInstance;
};

export const getLenis = (): Lenis | null => lenisInstance;

export const smoothScrollTo = (target: string | HTMLElement | number, offset = -70) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    // Fallback if lenis not ready
    if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  }
};

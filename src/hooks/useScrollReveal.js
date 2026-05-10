import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Attach blur-to-focus reveal to a section ref.
 * Targets elements with data-reveal attribute inside the ref.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const targets = el.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: options.y ?? 28,
          filter: 'blur(8px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: options.duration ?? 1.0,
          stagger: options.stagger ?? 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: options.start ?? 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [options.y, options.duration, options.stagger, options.start]);

  return ref;
}

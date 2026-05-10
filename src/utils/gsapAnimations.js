import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Blur-to-focus scroll reveal for a set of elements.
 * Returns cleanup function.
 */
export function scrollReveal(targets, options = {}) {
  const {
    start = 'top 85%',
    stagger = 0.12,
    duration = 1.0,
    y = 30,
    delay = 0,
  } = options;

  const ctx = gsap.context(() => {
    gsap.fromTo(
      targets,
      { opacity: 0, y, filter: 'blur(8px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration,
        delay,
        stagger,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: typeof targets === 'string' ? targets : targets[0],
          start,
          toggleActions: 'play none none none',
        },
      }
    );
  });

  return () => ctx.revert();
}

/**
 * Parallax scroll effect on an element.
 * Returns cleanup function.
 */
export function parallaxScroll(target, yPercent = '-15%') {
  const mq = window.matchMedia('(max-width: 639px)');
  if (mq.matches) return () => {};

  const ctx = gsap.context(() => {
    gsap.to(target, {
      yPercent: parseFloat(yPercent),
      ease: 'none',
      scrollTrigger: {
        trigger: target,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  return () => ctx.revert();
}

/**
 * Ken Burns slow zoom for hero background.
 * Returns cleanup function.
 */
export function kenBurns(target) {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      target,
      { scale: 1 },
      { scale: 1.08, duration: 12, ease: 'none', repeat: -1, yoyo: true }
    );
  });

  return () => ctx.revert();
}

/**
 * SVG line draw animation for timeline.
 * Returns cleanup function.
 */
export function drawLine(target, triggerEl) {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      target,
      { scaleY: 0, transformOrigin: 'top center' },
      {
        scaleY: 1,
        duration: 2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  return () => ctx.revert();
}

/**
 * Staggered line-by-line reveal for the letter section.
 * Returns cleanup function.
 */
export function letterReveal(lines, triggerEl) {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      lines,
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  return () => ctx.revert();
}

/**
 * Fade in sequence for ending section photos.
 */
export function endingReveal(targets, triggerEl) {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      targets,
      { opacity: 0, scale: 0.96 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.2,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  return () => ctx.revert();
}

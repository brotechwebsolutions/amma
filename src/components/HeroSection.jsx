import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { HERO } from '../utils/constants';

// Photo import — user places hero-bg.jpg here
let heroBg = null;
try {
  heroBg = new URL('../assets/intro/hero-bg.jpg', import.meta.url).href;
} catch { heroBg = null; }

export default function HeroSection() {
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    // Ken Burns
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.fromTo(bg, { scale: 1 }, { scale: 1.08, duration: 12, ease: 'none' });

    // Content reveal
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.querySelectorAll('[data-hero]'),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.18, duration: 1.0, ease: 'expo.out', delay: 0.3 }
      );
    });

    return () => {
      tl.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: 2,
      }}
      aria-label="Hero section"
    >
      {/* Background Image / Placeholder */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-5%',
          backgroundImage: heroBg ? `url(${heroBg})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundColor: 'var(--ink-700)',
        }}
        aria-hidden="true"
      >
        {!heroBg && (
          <div
            className="photo-placeholder"
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(160deg, #1a1510 0%, #0a0805 60%, #110e09 100%)',
            }}
          />
        )}
      </div>

      {/* Gradient overlays */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(10,8,5,0.95) 0%, rgba(10,8,5,0.45) 50%, rgba(10,8,5,0.2) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(212,170,80,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 var(--gutter)',
          maxWidth: '900px',
          width: '100%',
        }}
      >
        <p
          data-hero
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--gold-300)',
            marginBottom: '1.5rem',
            opacity: 0,
          }}
        >
          {HERO.eyebrow}
        </p>

        <h1
          data-hero
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(2.5rem, 7vw, 7rem)',
            color: 'var(--warm-white)',
            lineHeight: 1.05,
            marginBottom: '1.25rem',
            opacity: 0,
          }}
        >
          {HERO.headline}
        </h1>

        <p
          data-hero
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
            color: 'var(--muted)',
            letterSpacing: '0.06em',
            marginBottom: '3rem',
            opacity: 0,
          }}
        >
          {HERO.subheadline}
        </p>

        {/* Scroll hint */}
        <div
          data-hero
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            opacity: 0,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(212,170,80,0.4)',
            }}
          >
            {HERO.scrollHint}
          </p>
          <ScrollIndicator />
        </div>
      </div>
    </section>
  );
}

function ScrollIndicator() {
  const dotRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(dot, { y: 10, opacity: 0.2, duration: 1.0, ease: 'power2.in' })
      .fromTo(dot, { y: -2, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
    return () => tl.kill();
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        width: '1px',
        height: '40px',
        position: 'relative',
        background: 'rgba(212,170,80,0.15)',
      }}
    >
      <div
        ref={dotRef}
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '3px',
          height: '3px',
          borderRadius: '50%',
          background: 'var(--gold-300)',
          boxShadow: '0 0 8px var(--gold-300)',
        }}
      />
    </div>
  );
}

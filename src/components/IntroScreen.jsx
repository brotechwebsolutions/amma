import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { INTRO_LINES } from '../utils/constants';

export default function IntroScreen({ onComplete }) {
  const containerRef = useRef(null);
  const linesRef = useRef([]);

  useEffect(() => {
    const el = containerRef.current;
    const lines = linesRef.current.filter(Boolean);
    if (!el || !lines.length) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setTimeout(onComplete, 800);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(el, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete,
        });
      },
    });

    // Stagger each line in, hold, then out
    lines.forEach((line, i) => {
      tl.fromTo(
        line,
        { opacity: 0, y: 20, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'expo.out' },
        i * 0.9
      );
      if (i < lines.length - 1) {
        tl.to(line, { opacity: 0, y: -12, duration: 0.5, ease: 'power2.in' }, i * 0.9 + 1.1);
      }
    });

    // Hold the last line a bit longer
    tl.to({}, { duration: 1.2 });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        background: 'var(--ink-900)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 5vw',
      }}
    >
      {/* Particles — subtle radial */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,170,80,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      <div style={{ position: 'relative', textAlign: 'center', maxWidth: '720px', width: '100%' }}>
        {INTRO_LINES.map((line, i) => (
          <p
            key={i}
            ref={(el) => (linesRef.current[i] = el)}
            style={{
              position: i === 0 ? 'relative' : 'absolute',
              top: i === 0 ? 'auto' : '50%',
              left: i === 0 ? 'auto' : '50%',
              transform: i === 0 ? 'none' : 'translate(-50%, -50%)',
              opacity: 0,
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(1.3rem, 5vw, 2rem)',
              color: i === INTRO_LINES.length - 1 ? 'var(--gold-200)' : 'var(--warm-white)',
              lineHeight: 1.4,
              margin: 0,
              whiteSpace: 'pre-line',
              letterSpacing: '0.02em',
            }}
          >
            {line}
          </p>
        ))}
      </div>

      {/* Corner decoration */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.3em',
          color: 'rgba(212,170,80,0.3)',
          textTransform: 'uppercase',
        }}
      >
        A tribute in motion
      </div>
    </div>
  );
}

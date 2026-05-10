import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LETTER } from '../utils/constants';

gsap.registerPlugin(ScrollTrigger);

export default function LetterSection() {
  const sectionRef = useRef(null);
  const linesRef = useRef([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const lines = linesRef.current.filter(Boolean);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.075,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="letter"
      aria-label="A personal letter"
      style={{
        position: 'relative',
        zIndex: 2,
        padding: 'var(--section-py) var(--gutter)',
        background: 'linear-gradient(180deg, var(--ink-900) 0%, var(--ink-800) 50%, var(--ink-900) 100%)',
      }}
    >
      {/* Radial glow behind letter */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,170,80,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p className="chapter-label" style={{ marginBottom: '1rem' }}>
            {LETTER.sectionLabel}
          </p>
          <h2 className="section-title">{LETTER.title}</h2>
        </div>

        {/* Letter paper effect */}
        <div
          style={{
            background: 'rgba(26, 21, 16, 0.7)',
            border: '1px solid rgba(212,170,80,0.1)',
            borderRadius: '2px',
            padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 3.5rem)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,170,80,0.08)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Vignette */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(10,8,5,0.5) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Letter lines */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {LETTER.lines.map((line, i) => (
              <p
                key={i}
                ref={(el) => (linesRef.current[i] = el)}
                style={{
                  fontFamily: line === '' ? undefined : 'var(--font-display)',
                  fontStyle: line === '' ? undefined : 'italic',
                  fontWeight: 300,
                  fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                  color: line === '' ? undefined : 'var(--warm-white)',
                  lineHeight: 1.9,
                  margin: 0,
                  minHeight: line === '' ? '1.2rem' : undefined,
                  opacity: 0,
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Closing signature decoration */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '2rem',
            opacity: 0.4,
          }}
        >
          <div
            style={{
              width: '60px',
              height: '1px',
              background: 'var(--gold-500)',
              margin: '0 auto',
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

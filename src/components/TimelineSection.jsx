import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TIMELINE } from '../utils/constants';

gsap.registerPlugin(ScrollTrigger);

export default function TimelineSection() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    const el = sectionRef.current;
    const line = lineRef.current;
    if (!el || !line) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Draw line
      gsap.fromTo(
        line,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          duration: 2,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 70%', toggleActions: 'play none none none' },
        }
      );

      // Stagger nodes
      gsap.fromTo(
        nodesRef.current.filter(Boolean),
        { opacity: 0, x: -20, filter: 'blur(6px)' },
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          stagger: 0.18,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 70%', toggleActions: 'play none none none' },
          delay: 0.3,
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches;

  return (
    <section
      ref={sectionRef}
      id="timeline"
      aria-label="Memory Timeline"
      style={{
        position: 'relative',
        zIndex: 2,
        padding: 'var(--section-py) var(--gutter)',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <p className="chapter-label" style={{ marginBottom: '1rem' }}>
            {TIMELINE.sectionLabel}
          </p>
          <h2 className="section-title">{TIMELINE.title}</h2>
          <p className="section-subtitle" style={{ marginTop: '1rem', maxWidth: '440px', margin: '1rem auto 0' }}>
            {TIMELINE.subtitle}
          </p>
        </div>

        {/* Timeline */}
        <div
          style={{
            position: 'relative',
            paddingLeft: isMobile ? '44px' : '0',
          }}
        >
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: isMobile ? '20px' : '50%',
              transform: isMobile ? 'none' : 'translateX(-50%)',
              width: '1px',
              background: 'linear-gradient(to bottom, transparent 0%, var(--gold-500) 10%, var(--gold-500) 90%, transparent 100%)',
            }}
            aria-hidden="true"
          >
            <div
              ref={lineRef}
              style={{
                width: '100%',
                height: '100%',
                background: 'inherit',
              }}
            />
          </div>

          {/* Nodes */}
          {TIMELINE.nodes.map((node, i) => {
            const isRight = !isMobile && i % 2 === 0;
            return (
              <div
                key={i}
                ref={(el) => (nodesRef.current[i] = el)}
                style={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: isMobile ? 'flex-start' : (isRight ? 'flex-end' : 'flex-start'),
                  marginBottom: 'clamp(2.5rem, 5vw, 5rem)',
                  paddingRight: !isMobile && isRight ? 'calc(50% + 2rem)' : '0',
                  paddingLeft: !isMobile && !isRight ? 'calc(50% + 2rem)' : '0',
                }}
              >
                {/* Dot */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: isMobile ? '-31px' : '50%',
                    top: '0.4rem',
                    transform: isMobile ? 'none' : 'translateX(-50%)',
                    width: isMobile ? '10px' : '12px',
                    height: isMobile ? '10px' : '12px',
                    borderRadius: '50%',
                    background: 'var(--gold-300)',
                    boxShadow: '0 0 12px rgba(212,170,80,0.7)',
                    zIndex: 2,
                  }}
                />

                {/* Content */}
                <div style={{ maxWidth: '320px' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      color: 'var(--gold-300)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {node.label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontWeight: 300,
                      fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                      color: 'var(--warm-white)',
                      lineHeight: 1.7,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {node.memory}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

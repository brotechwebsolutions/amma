import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ENDING } from '../utils/constants';

gsap.registerPlugin(ScrollTrigger);

// All photos for the ending collage
const allPhotoSrcs = [null, null, null, null, null];
try {
  allPhotoSrcs[0] = new URL('../assets/mom/mom1.jpg', import.meta.url).href;
  allPhotoSrcs[1] = new URL('../assets/sister/sister1.jpg', import.meta.url).href;
  allPhotoSrcs[2] = new URL('../assets/mom/mom2.jpg', import.meta.url).href;
  allPhotoSrcs[3] = new URL('../assets/sister/sister2.jpg', import.meta.url).href;
  allPhotoSrcs[4] = new URL('../assets/mom/mom3.jpg', import.meta.url).href;
} catch { /* placeholders */ }

const photoAlts = [
  'A cherished photograph of Mom',
  'My sister — my second mom',
  'Mom — a moment frozen in time',
  'The one who always stayed beside me',
  'Her love, captured forever',
];

export default function EndingSection() {
  const sectionRef = useRef(null);
  const photosRef = useRef([]);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const fadeLineRef = useRef(null);
  const blackoutRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const photos = photosRef.current.filter(Boolean);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      // Photos fade in sequentially
      tl.fromTo(
        photos,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, stagger: 0.2, duration: 1.2, ease: 'expo.out' }
      );

      // Headline
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'expo.out' },
        '-=0.4'
      );

      // Subtext
      tl.fromTo(
        subtextRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.3'
      );

      // Fade line appears
      tl.fromTo(
        fadeLineRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.0, ease: 'power2.inOut' },
        '+=0.6'
      );
    }, el);

    // Fade to black on scroll out
    const blackoutCtx = gsap.context(() => {
      gsap.fromTo(
        blackoutRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'bottom 60%',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, el);

    return () => {
      ctx.revert();
      blackoutCtx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ending"
      aria-label="Ending — Forever My Home"
      style={{
        position: 'relative',
        zIndex: 2,
        padding: 'var(--section-py) var(--gutter) calc(var(--section-py) * 2)',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Ambient label */}
      <p
        className="chapter-label"
        style={{ marginBottom: '2rem', opacity: 0.6 }}
      >
        {ENDING.ambientLabel}
      </p>

      {/* Photo collage — 2x2 + 1 centered */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 'clamp(0.5rem, 1.5vw, 1rem)',
          maxWidth: '600px',
          width: '100%',
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
        }}
        className="ending-grid"
      >
        {allPhotoSrcs.slice(0, 4).map((src, i) => (
          <div
            key={i}
            ref={(el) => (photosRef.current[i] = el)}
            style={{ opacity: 0, aspectRatio: '1/1', borderRadius: '3px', overflow: 'hidden' }}
          >
            {src ? (
              <img
                src={src}
                alt={photoAlts[i]}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            ) : (
              <div
                className="photo-placeholder"
                style={{ width: '100%', height: '100%' }}
                aria-label={photoAlts[i]}
              >
                <span style={{ fontSize: '0.55rem', textAlign: 'center' }}>[ A memory lives here ]</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 5th photo centered */}
      <div
        ref={(el) => (photosRef.current[4] = el)}
        style={{
          opacity: 0,
          width: 'clamp(120px, 30vw, 200px)',
          aspectRatio: '1/1',
          borderRadius: '3px',
          overflow: 'hidden',
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
        }}
      >
        {allPhotoSrcs[4] ? (
          <img
            src={allPhotoSrcs[4]}
            alt={photoAlts[4]}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        ) : (
          <div
            className="photo-placeholder"
            style={{ width: '100%', height: '100%' }}
            aria-label={photoAlts[4]}
          >
            <span style={{ fontSize: '0.55rem' }}>[ A memory lives here ]</span>
          </div>
        )}
      </div>

      {/* Final text */}
      <h2
        ref={headlineRef}
        style={{
          opacity: 0,
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(2rem, 6vw, 5rem)',
          color: 'var(--warm-white)',
          textAlign: 'center',
          marginBottom: '1rem',
          lineHeight: 1.1,
        }}
      >
        {ENDING.headline}
      </h2>

      <p
        ref={subtextRef}
        style={{
          opacity: 0,
          fontFamily: 'var(--font-body)',
          fontWeight: 300,
          fontSize: 'clamp(0.85rem, 2vw, 1rem)',
          color: 'var(--muted)',
          textAlign: 'center',
          letterSpacing: '0.08em',
          marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
        }}
      >
        {ENDING.subtext}
      </p>

      {/* Fade line */}
      <p
        ref={fadeLineRef}
        style={{
          opacity: 0,
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          color: 'rgba(240,232,216,0.35)',
          textAlign: 'center',
          whiteSpace: 'pre-line',
          lineHeight: 1.8,
        }}
      >
        {ENDING.fadeOutLine}
      </p>

      {/* Fade to black overlay */}
      <div
        ref={blackoutRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--ink-900)',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />
    </section>
  );
}

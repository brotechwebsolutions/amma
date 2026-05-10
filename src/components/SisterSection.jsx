import { useScrollReveal } from '../hooks/useScrollReveal';
import { SISTER_SECTION } from '../utils/constants';
import PhotoCard from './PhotoCard';

// Photo imports
const photoSrcs = [null, null];
try {
  const s1 = new URL('../assets/sister/sister1.jpg', import.meta.url).href;
  const s2 = new URL('../assets/sister/sister2.jpg', import.meta.url).href;
  photoSrcs[0] = s1; photoSrcs[1] = s2;
} catch { /* placeholders used */ }

export default function SisterSection() {
  const sectionRef = useScrollReveal({ stagger: 0.12, start: 'top 80%' });

  return (
    <section
      ref={sectionRef}
      id="sister"
      aria-label="Chapter II — Sister"
      style={{
        position: 'relative',
        zIndex: 2,
        padding: 'var(--section-py) var(--gutter)',
        background: 'linear-gradient(180deg, var(--ink-900) 0%, var(--ink-800) 50%, var(--ink-900) 100%)',
      }}
    >
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        {/* Decorative line */}
        <div
          data-reveal
          style={{
            width: '1px',
            height: '80px',
            background: 'linear-gradient(to bottom, transparent, var(--gold-500), transparent)',
            margin: '0 auto clamp(2rem,4vw,3.5rem)',
          }}
          aria-hidden="true"
        />

        {/* Section header */}
        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)', textAlign: 'center' }}>
          <p data-reveal className="chapter-label" style={{ marginBottom: '1rem' }}>
            {SISTER_SECTION.chapterLabel}
          </p>
          <h2 data-reveal className="section-title">
            {SISTER_SECTION.title}
          </h2>
          <p
            data-reveal
            className="section-subtitle"
            style={{ marginTop: '1rem', maxWidth: '500px', margin: '1rem auto 0' }}
          >
            {SISTER_SECTION.subtitle}
          </p>
        </div>

        {/* 2-photo horizontal layout with offset */}
        <div
          data-reveal
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            maxWidth: '800px',
            margin: '0 auto clamp(3rem, 6vw, 5rem)',
            alignItems: 'start',
          }}
          className="sister-grid"
        >
          <div style={{ marginTop: 0 }}>
            <PhotoCard
              src={photoSrcs[0]}
              alt={SISTER_SECTION.photos[0].alt}
              quote={SISTER_SECTION.photos[0].quote}
            />
          </div>
          <div style={{ marginTop: 'clamp(0px, 4vw, 40px)' }}>
            <PhotoCard
              src={photoSrcs[1]}
              alt={SISTER_SECTION.photos[1].alt}
              quote={SISTER_SECTION.photos[1].quote}
            />
          </div>
        </div>

        {/* Body copy */}
        <div style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto 3rem' }}>
          <p
            data-reveal
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: 'var(--warm-white)',
              lineHeight: 2,
              whiteSpace: 'pre-line',
              fontWeight: 300,
            }}
          >
            {SISTER_SECTION.body}
          </p>
        </div>

        {/* Pull quote */}
        <div
          data-reveal
          style={{
            textAlign: 'center',
            maxWidth: '640px',
            margin: '0 auto',
            padding: 'clamp(1.5rem, 4vw, 3rem) 0',
            borderTop: '1px solid rgba(212,170,80,0.12)',
            borderBottom: '1px solid rgba(212,170,80,0.12)',
          }}
        >
          <p className="pull-quote" style={{ whiteSpace: 'pre-line' }}>
            "{SISTER_SECTION.pullQuote}"
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 639px) {
          .sister-grid > div:last-child {
            margin-top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}

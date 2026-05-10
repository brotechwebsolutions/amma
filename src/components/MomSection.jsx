import { useScrollReveal } from '../hooks/useScrollReveal';
import { MOM_SECTION } from '../utils/constants';
import PhotoCard from './PhotoCard';

// Photo imports — user places photos in src/assets/mom/
const photoSrcs = [null, null, null];
try {
  const m1 = new URL('../assets/mom/mom1.jpg', import.meta.url).href;
  const m2 = new URL('../assets/mom/mom2.jpg', import.meta.url).href;
  const m3 = new URL('../assets/mom/mom3.jpg', import.meta.url).href;
  photoSrcs[0] = m1; photoSrcs[1] = m2; photoSrcs[2] = m3;
} catch { /* placeholders used */ }

export default function MomSection() {
  const sectionRef = useScrollReveal({ stagger: 0.12, start: 'top 80%' });

  return (
    <section
      ref={sectionRef}
      id="mom"
      aria-label="Chapter I — Mom"
      style={{
        position: 'relative',
        zIndex: 2,
        padding: 'var(--section-py) var(--gutter)',
        maxWidth: '1320px',
        margin: '0 auto',
      }}
    >
      {/* Section header */}
      <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)', textAlign: 'center' }}>
        <p data-reveal className="chapter-label" style={{ marginBottom: '1rem' }}>
          {MOM_SECTION.chapterLabel}
        </p>
        <h2 data-reveal className="section-title">
          {MOM_SECTION.title}
        </h2>
        <p data-reveal className="section-subtitle" style={{ marginTop: '1rem', maxWidth: '560px', margin: '1rem auto 0' }}>
          {MOM_SECTION.subtitle}
        </p>
      </div>

      {/* Photo grid — asymmetric on desktop */}
      <div
        data-reveal
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          marginBottom: 'clamp(3rem, 6vw, 5rem)',
        }}
      >
        {/* Desktop: large left + 2 stacked right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)',
            gridTemplateRows: '1fr 1fr',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            width: '100%',
          }}
          className="mom-grid"
        >
          {/* Large photo spans 2 rows */}
          <div style={{ gridRow: '1 / 3' }}>
            <PhotoCard
              src={photoSrcs[0]}
              alt={MOM_SECTION.photos[0].alt}
              quote={MOM_SECTION.photos[0].quote}
            />
          </div>
          <PhotoCard
            src={photoSrcs[1]}
            alt={MOM_SECTION.photos[1].alt}
            quote={MOM_SECTION.photos[1].quote}
          />
          <PhotoCard
            src={photoSrcs[2]}
            alt={MOM_SECTION.photos[2].alt}
            quote={MOM_SECTION.photos[2].quote}
          />
        </div>
      </div>

      {/* Body copy */}
      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
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
          {MOM_SECTION.body}
        </p>
      </div>

      {/* Pull quote */}
      <div
        data-reveal
        style={{
          textAlign: 'center',
          maxWidth: '720px',
          margin: '0 auto',
          padding: 'clamp(1.5rem, 4vw, 3rem) 0',
          borderTop: '1px solid rgba(212,170,80,0.12)',
          borderBottom: '1px solid rgba(212,170,80,0.12)',
        }}
      >
        <span
          style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-300)', fontSize: '1.5rem' }}
          aria-hidden="true"
        >
          "
        </span>
        <p className="pull-quote" style={{ whiteSpace: 'pre-line' }}>
          {MOM_SECTION.pullQuote}
        </p>
        <span
          style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-300)', fontSize: '1.5rem' }}
          aria-hidden="true"
        >
          "
        </span>
      </div>

      <style>{`
        @media (max-width: 639px) {
          .mom-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .mom-grid > div:first-child {
            grid-row: auto !important;
          }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .mom-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

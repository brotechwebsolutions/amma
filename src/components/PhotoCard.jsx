import { useRef, useState } from 'react';

export default function PhotoCard({ src, alt, quote }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const isMobile = window.matchMedia('(max-width: 639px)').matches;

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: cy * -6, y: cx * 6 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-reveal
      style={{
        position: 'relative',
        aspectRatio: '4/5',
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
        border: '1px solid rgba(212,170,80,0.1)',
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
        cursor: 'default',
        willChange: 'transform',
      }}
    >
      {/* Image or placeholder */}
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          loading="lazy"
        />
      ) : (
        <div
          className="photo-placeholder"
          style={{ width: '100%', height: '100%' }}
          aria-label={alt}
        >
          <span style={{ textAlign: 'center', padding: '1rem', lineHeight: 1.7 }}>
            [ A memory lives here ]
          </span>
        </div>
      )}

      {/* Quote overlay */}
      <div
        className="quote-overlay"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '2rem 1.25rem 1.5rem',
          background: 'linear-gradient(to top, rgba(10,8,5,0.92) 0%, transparent 100%)',
          display: 'flex',
          alignItems: 'flex-end',
          opacity: isMobile ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(0.85rem, 2vw, 1rem)',
            color: 'var(--gold-100)',
            lineHeight: 1.6,
            whiteSpace: 'pre-line',
            margin: 0,
          }}
        >
          {quote}
        </p>
      </div>

      {/* Glow border on hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '4px',
          border: '1px solid rgba(212,170,80,0.25)',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
        className="glow-border"
      />

      <style>{`
        div:hover .quote-overlay { opacity: 1 !important; }
        div:hover .glow-border { opacity: 1 !important; }
      `}</style>
    </div>
  );
}

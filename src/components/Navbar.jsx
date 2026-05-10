import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
  const navRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="Site navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '48px',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: visible ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: visible ? 'blur(12px)' : 'none',
        background: visible ? 'rgba(10, 8, 5, 0.6)' : 'transparent',
        borderBottom: visible ? '1px solid rgba(212,170,80,0.08)' : 'none',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <span
        aria-label="Forever My Home"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.1rem',
          color: 'var(--gold-300)',
          fontStyle: 'italic',
          letterSpacing: '0.1em',
        }}
      >
        ❤
      </span>
    </nav>
  );
}

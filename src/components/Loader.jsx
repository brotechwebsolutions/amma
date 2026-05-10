import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { LOADER } from '../utils/constants';

export default function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const bar1Ref = useRef(null);
  const bar2Ref = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    const bar1 = bar1Ref.current;
    const bar2 = bar2Ref.current;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(el, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete,
        });
      },
    });

    tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.4 })
      .fromTo(
        bar1,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.2, ease: 'expo.inOut' },
        0.3
      )
      .fromTo(
        bar2,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.8, ease: 'expo.inOut' },
        1.0
      )
      .to({}, { duration: 0.4 });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-ink-900"
      style={{ backgroundColor: 'var(--ink-900)' }}
    >
      <div className="flex flex-col items-center gap-8 w-64">
        {/* Monogram */}
        <div
          className="text-5xl font-display font-light"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--gold-200)',
            fontStyle: 'italic',
          }}
        >
          ♡
        </div>

        {/* Lines */}
        <div className="w-full flex flex-col gap-4">
          <div>
            <p
              className="text-xs mb-2"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted)', letterSpacing: '0.2em' }}
            >
              {LOADER.line1}
            </p>
            <div
              className="h-px w-full"
              style={{ background: 'var(--ink-600)' }}
            >
              <div
                ref={bar1Ref}
                className="h-full"
                style={{ background: 'var(--gold-300)', transformOrigin: 'left center' }}
              />
            </div>
          </div>

          <div>
            <p
              className="text-xs mb-2"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted)', letterSpacing: '0.2em', opacity: 0.6 }}
            >
              {LOADER.line2}
            </p>
            <div
              className="h-px w-full"
              style={{ background: 'var(--ink-600)' }}
            >
              <div
                ref={bar2Ref}
                className="h-full"
                style={{ background: 'var(--gold-500)', transformOrigin: 'left center' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

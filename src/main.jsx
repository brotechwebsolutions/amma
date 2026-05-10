import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/globals.css';
import App from './App';
import Loader from './components/Loader';
import IntroScreen from './components/IntroScreen';
import { useLenis } from './hooks/useLenis';

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

// Configure ScrollTrigger defaults
ScrollTrigger.defaults({
  markers: false,
});

function Root() {
  const [phase, setPhase] = useState('loading'); // 'loading' | 'intro' | 'app'

  // Initialize Lenis smooth scroll (always running)
  useLenis();

  return (
    <>
      {phase === 'loading' && (
        <Loader onComplete={() => setPhase('intro')} />
      )}
      {phase === 'intro' && (
        <IntroScreen onComplete={() => setPhase('app')} />
      )}
      {phase === 'app' && <App />}
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
);

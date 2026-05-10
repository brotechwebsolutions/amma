import Navbar from './components/Navbar';
import FloatingParticles from './components/FloatingParticles';
import Home from './pages/Home';

export default function App() {
  return (
    <>
      {/* Three.js particles — fixed behind everything */}
      <FloatingParticles />

      {/* Ghost navigation */}
      <Navbar />

      {/* Main content */}
      <Home />
    </>
  );
}

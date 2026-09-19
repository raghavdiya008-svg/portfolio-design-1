import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { FloatingNav } from './components/FloatingNav';
import { MagneticCursor } from './components/MagneticCursor';
import { ResumeModal } from './components/ResumeModal';
import { Toaster } from 'sonner';
import { initLenis } from './utils/lenis';

function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Initialize Lenis smooth momentum scrolling engine
  useEffect(() => {
    const lenis = initLenis();
    return () => {
      lenis?.destroy();
    };
  }, []);

  // Top Hairline Scroll Progress Bar with Spring Physics
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <div className="w-full min-h-screen bg-black text-[#E8DFD8] relative overflow-x-hidden">
      {/* Top Hairline Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#8C6D4F] via-[#D4AF37] to-[#FFF5EB] z-50 origin-left shadow-[0_0_12px_rgba(212,175,55,0.6)]"
        style={{ scaleX }}
      />

      {/* Cinematic Ambient Grain Layer */}
      <div className="fixed inset-0 pointer-events-none z-30 cinematic-grain opacity-40" />

      {/* Global Toast Notification Engine */}
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: '#0E0C0A',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            color: '#E8DFD8',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '12px',
          },
        }}
      />

      {/* Global Direct Magnetic Cursor */}
      <MagneticCursor />

      {/* Floating Island Navbar */}
      <FloatingNav />

      {/* Main Page Journey */}
      <main className="w-full flex flex-col items-center">
        <HeroSection onOpenResume={() => setIsResumeOpen(true)} />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* Interactive Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { FloatingNav } from './components/FloatingNav';
import { MagneticCursor } from './components/MagneticCursor';
import { ResumeModal } from './components/ResumeModal';

function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-black text-[#E8DFD8] selection:bg-[#cbb59d] selection:text-black relative">
      {/* Global Magnetic Cursor */}
      <MagneticCursor />

      {/* Floating Island Navbar */}
      <FloatingNav />

      {/* Page Sections */}
      <HeroSection onOpenResume={() => setIsResumeOpen(true)} />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />

      {/* Interactive Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}

export default App;
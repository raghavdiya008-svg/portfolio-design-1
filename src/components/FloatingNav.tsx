import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'ABOUT', href: '#about' },
  { name: 'PROJECTS', href: '#work' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'CONTACT', href: '#contact' },
];

export const FloatingNav: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Show floating nav when scrolled past hero
      if (window.scrollY > 240) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setMobileMenuOpen(false);
      }

      // Section Spy
      const sections = ['contact', 'experience', 'skills', 'work', 'about'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Floating Island Header */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-5 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none"
          >
            <nav
              className="pointer-events-auto flex items-center justify-between px-5 py-2.5 rounded-full border border-[#D4AF37]/35 bg-black/85 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.85)] w-full max-w-4xl"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {/* Logo */}
              <a
                href="#"
                onClick={(e) => scrollToSection(e, '#')}
                data-cursor-text="TOP"
                className="text-xs font-semibold tracking-[0.3em] uppercase text-[#EAD8C7] hover:text-[#D4AF37] transition-colors select-none"
              >
                LOHITHA.
              </a>

              {/* Desktop Section Links */}
              <div className="hidden md:flex items-center space-x-1 lg:space-x-2 text-[11px] tracking-[0.22em] font-light">
                {navItems.map((item) => {
                  const sectionId = item.href.replace('#', '');
                  const isActive = activeSection === sectionId;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      data-cursor-text="GOTO"
                      className={`relative px-3.5 py-1.5 transition-colors uppercase cursor-pointer ${
                        isActive ? 'text-[#F7E7C4] font-medium' : 'text-[#A8988B] hover:text-[#E8DFD8]'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="navPill"
                          className="absolute inset-0 bg-[#D4AF37]/15 rounded-full border border-[#D4AF37]/40 -z-10"
                          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                        />
                      )}
                      {item.name}
                    </a>
                  );
                })}
              </div>

              {/* Right: Contact CTA + Mobile Menu Button */}
              <div className="flex items-center gap-3">
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  data-cursor-text="TALK"
                  className="hidden sm:inline-flex items-center gap-1 text-[10px] tracking-[0.2em] font-medium uppercase px-3.5 py-1.5 border border-[#8C6D4F]/60 rounded-full hover:border-[#D4AF37] text-[#EAD8C7] transition-all bg-[#120F0C]/60 cursor-pointer"
                >
                  <span>LET&apos;S TALK</span>
                  <span>↗</span>
                </a>

                {/* Mobile Hamburger Toggle */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden flex items-center justify-center p-2 rounded-full border border-[#8C6D4F]/50 text-[#EAD8C7] hover:text-[#D4AF37] transition-colors"
                  aria-label="Toggle Navigation Menu"
                >
                  {mobileMenuOpen ? '✕' : '☰'}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-8 md:hidden"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-[#8C6D4F]/30 pb-4">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#D4AF37]">
                NAVIGATION
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-xl text-[#BFA895] hover:text-white"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col space-y-6 my-auto">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.3 }}
                  className="text-2xl sm:text-3xl font-medium tracking-[0.2em] text-[#E8DFD8] hover:text-[#D4AF37] transition-colors flex items-center justify-between cursor-pointer"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  <span>{item.name}</span>
                  <span className="text-sm font-sans text-[#8C6D4F]">0{idx + 1}</span>
                </motion.a>
              ))}
            </div>

            {/* Drawer Footer */}
            <div className="border-t border-[#8C6D4F]/30 pt-6 flex flex-col gap-3 text-xs text-[#A8988B]">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="w-full text-center py-3 bg-[#D4AF37] text-black font-semibold tracking-widest uppercase rounded-sm cursor-pointer"
              >
                START A PROJECT ↗
              </a>
              <p className="text-center text-[11px] text-[#8C6D4F]">
                raghav13598@gmail.com
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

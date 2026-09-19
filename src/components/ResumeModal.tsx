import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#0A0806] border border-[#D4AF37]/40 rounded-sm p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] text-[#E8DFD8]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {/* Top Gold Horizon Accent */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

            {/* Corner Crosshairs */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#D4AF37]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#D4AF37]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]" />

            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#8C6D4F]/30 pb-6 mb-6">
              <div>
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#D4AF37] font-semibold">
                  CURRICULUM VITAE // VERIFIED PROFILE
                </span>
                <h2
                  className="text-3xl sm:text-4xl text-white tracking-wide uppercase mt-1"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  LOHITHA DAMISETTI
                </h2>
                <p className="text-xs text-[#A8988B] tracking-wider uppercase mt-0.5">
                  Full Stack Developer • UI/UX Designer • Data Science Specialization
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 border border-[#8C6D4F]/40 hover:border-[#D4AF37] text-[#BFA895] hover:text-white transition-colors"
                aria-label="Close resume modal"
              >
                ✕
              </button>
            </div>

            {/* Content Sections */}
            <div className="space-y-6 text-xs sm:text-[13px] text-[#C4B5A5]">
              {/* Summary */}
              <div>
                <h3 className="text-[11px] font-semibold tracking-[0.25em] text-[#D4AF37] uppercase mb-2">
                  01 / EXECUTIVE SUMMARY
                </h3>
                <p className="text-[#A8988B] leading-relaxed">
                  Full-stack engineer and data science specialist with deep experience architecting high-performance web and cross-platform mobile systems. Solved 1200+ algorithm challenges across LeetCode, CodeChef, and GeeksforGeeks. Department topper (9.07 CGPA) and national finalist in Myntra HackerRamp.
                </p>
              </div>

              {/* Technical Core */}
              <div>
                <h3 className="text-[11px] font-semibold tracking-[0.25em] text-[#D4AF37] uppercase mb-2">
                  02 / TECHNICAL COMPETENCIES
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-black/40 border border-[#8C6D4F]/30">
                    <span className="text-[#D4AF37] block font-medium mb-1">Frontend & Architecture</span>
                    React.js, React Native, TypeScript, Tailwind CSS, Electron.js, Framer Motion, Next.js
                  </div>
                  <div className="p-3 bg-black/40 border border-[#8C6D4F]/30">
                    <span className="text-[#D4AF37] block font-medium mb-1">Backend & Systems</span>
                    Node.js, Express.js, Spring Boot, RESTful APIs, JWT, Role-Based Access Control (RBAC)
                  </div>
                  <div className="p-3 bg-black/40 border border-[#8C6D4F]/30">
                    <span className="text-[#D4AF37] block font-medium mb-1">Data Platforms & ML</span>
                    PostgreSQL, MongoDB Atlas, MySQL, scikit-learn, Python, Random Forest, OpenAI API
                  </div>
                  <div className="p-3 bg-black/40 border border-[#8C6D4F]/30">
                    <span className="text-[#D4AF37] block font-medium mb-1">DevOps & Tooling</span>
                    Docker Compose, Git/GitHub, Vite, Linux, Cloudflare, Postman, Agile CI/CD
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-[11px] font-semibold tracking-[0.25em] text-[#D4AF37] uppercase mb-2">
                  03 / EXPERIENCE & TRACK RECORD
                </h3>
                <div className="space-y-3">
                  <div className="border-l-2 border-[#D4AF37]/60 pl-3">
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-white">Technical Hub Pvt Ltd</span>
                      <span className="text-[10px] text-[#A8988B]">MAY - JUN 2026</span>
                    </div>
                    <p className="text-[#D4AF37] text-xs">Full Stack & Mobile Engineering Intern</p>
                    <p className="text-[12px] text-[#A8988B] mt-1">
                      Engineered cross-platform mobile apps with React Native and modern web interfaces, optimizing rendering workflows and state management.
                    </p>
                  </div>

                  <div className="border-l-2 border-[#D4AF37]/60 pl-3">
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-white">Myntra WeForShe HackerRamp</span>
                      <span className="text-[10px] text-[#A8988B]">2026</span>
                    </div>
                    <p className="text-[#D4AF37] text-xs">Top 100 National Finalist</p>
                    <p className="text-[12px] text-[#A8988B] mt-1">
                      Ranked among the top 100 teams nationally for algorithmic design and machine learning solution prototyping.
                    </p>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-[11px] font-semibold tracking-[0.25em] text-[#D4AF37] uppercase mb-2">
                  04 / EDUCATION
                </h3>
                <div className="flex justify-between items-baseline border-l-2 border-[#8C6D4F]/40 pl-3">
                  <div>
                    <span className="font-semibold text-white">B.Tech in Computer Science (Data Science)</span>
                    <p className="text-xs text-[#A8988B]">Aditya College of Engineering (2023 - 2027)</p>
                  </div>
                  <span className="text-xs font-semibold text-[#D4AF37]">9.07 CGPA</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#8C6D4F]/30 pt-6 mt-8">
              <span className="text-[11px] text-[#A8988B]">
                Direct Inquiries: <a href="mailto:raghav13598@gmail.com" className="text-[#D4AF37] underline">raghav13598@gmail.com</a>
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-[#120F0C] border border-[#8C6D4F] hover:border-[#D4AF37] text-[#EAD8C7] text-xs tracking-wider uppercase transition-colors"
                >
                  Print / Save as PDF 🖨️
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#F7E7C4] transition-colors"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

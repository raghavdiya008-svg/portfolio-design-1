import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  githubUrl: string;
  demoUrl?: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  previewType: 'nlp' | 'heatmap' | 'saas' | 'payment';
}

const projects: Project[] = [
  {
    number: '01',
    title: 'PolicyGuard AI',
    category: 'AI / LEGAL-TECH PLATFORM',
    description:
      'AI-powered platform engineered for automated privacy policy analysis and legal contract auditing across web, desktop, and mobile. Implements NLP extraction, real-time risk alert detection, and generative risk score intelligence.',
    githubUrl: 'https://github.com/lohithadamisetti123',
    demoUrl: '#contact',
    tech: [
      'React.js',
      'React Native',
      'Electron.js',
      'Node.js',
      'Express.js',
      'MongoDB Atlas',
      'OpenAI API',
      'NLP',
      'Docker',
    ],
    metrics: [
      { label: 'PLATFORMS', value: 'Web, Mobile, Desktop' },
      { label: 'ENGINE', value: 'OpenAI NLP / GPT' },
      { label: 'PIPELINE', value: 'Automated Scoring' },
    ],
    previewType: 'nlp',
  },
  {
    number: '02',
    title: 'Software Release Risk Heatmap',
    category: 'MACHINE LEARNING / DEV PLATFORM',
    description:
      'Full-stack predictive release management platform utilizing Machine Learning. Implements a trained Random Forest classifier to categorize release stability from Low to Critical risk, rendered over a live interactive team heatmap.',
    githubUrl: 'https://github.com/lohithadamisetti123',
    demoUrl: '#contact',
    tech: [
      'React.js',
      'TypeScript',
      'Python',
      'FastAPI',
      'scikit-learn',
      'PostgreSQL',
      'Tailwind CSS',
      'REST APIs',
    ],
    metrics: [
      { label: 'MODEL', value: 'Random Forest' },
      { label: 'ACCURACY', value: 'High Precision' },
      { label: 'DASHBOARD', value: 'Live Risk Heatmap' },
    ],
    previewType: 'heatmap',
  },
  {
    number: '03',
    title: 'Multi-Tenant SaaS Platform',
    category: 'CLOUD / DISTRIBUTED SYSTEM',
    description:
      'Enterprise-grade multi-tenant platform built for unified management of teams, projects, and execution lifecycles. Architected with strict tenant data isolation, granular Role-Based Access Control (RBAC), and containerized deployments.',
    githubUrl: 'https://github.com/lohithadamisetti123',
    demoUrl: '#contact',
    tech: [
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'React',
      'Docker',
      'JWT',
      'RBAC',
      'REST APIs',
    ],
    metrics: [
      { label: 'ARCHITECTURE', value: 'Multi-Tenant' },
      { label: 'SECURITY', value: 'RBAC Isolation' },
      { label: 'CONTAINERS', value: 'Docker Compose' },
    ],
    previewType: 'saas',
  },
  {
    number: '04',
    title: 'Payment Gateway with Hosted Checkout',
    category: 'FINTECH / PAYMENT SYSTEMS',
    description:
      'End-to-end hosted payment gateway infrastructure supporting seamless merchant order generation, multi-currency processing, and secure consumer checkout via UPI and Cards with webhook transaction verification.',
    githubUrl: 'https://github.com/lohithadamisetti123',
    demoUrl: '#contact',
    tech: [
      'Node.js',
      'Spring Boot',
      'PostgreSQL',
      'React',
      'Docker',
      'REST APIs',
      'UPI / Card Integrations',
    ],
    metrics: [
      { label: 'PROTOCOLS', value: 'UPI & Cards' },
      { label: 'BACKEND', value: 'Spring Boot + Node' },
      { label: 'DATABASE', value: 'ACID PostgreSQL' },
    ],
    previewType: 'payment',
  },
];

// Interactive 3D Perspective Device Mockup
const ProjectMockup: React.FC<{ type: Project['previewType']; title: string }> = ({ type, title }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 250 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 250 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative w-full rounded-lg border border-[#8C6D4F]/40 bg-[#080605] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.85)] p-4 select-none"
    >
      {/* Browser Chrome Header */}
      <div className="flex items-center justify-between border-b border-[#8C6D4F]/25 pb-2.5 mb-3">
        <div className="flex items-center space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5484D]/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#F5B041]/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#46A758]/70" />
        </div>
        <div className="px-3 py-0.5 rounded-full bg-[#16120E] border border-[#8C6D4F]/30 text-[9.5px] font-mono text-[#A8988B] tracking-wider truncate max-w-[180px]">
          https://sys.local/{type}
        </div>
        <div className="w-2 h-2 rounded-full bg-[#46A758] animate-pulse" />
      </div>

      {/* Dynamic Simulated UI Viewport */}
      <div className="h-44 sm:h-52 w-full rounded bg-[#0D0B09] border border-[#8C6D4F]/20 p-3.5 flex flex-col justify-between overflow-hidden relative font-mono text-[11px]">
        {/* Glow Flare */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-[#D4AF37]/10 rounded-full blur-xl pointer-events-none" />

        {type === 'nlp' && (
          <>
            <div className="flex justify-between items-center border-b border-[#8C6D4F]/20 pb-2">
              <span className="text-[#D4AF37] font-semibold text-[10px] tracking-wider">LEGAL CLAUSE EXTRACTOR</span>
              <span className="px-2 py-0.5 rounded bg-[#46A758]/15 text-[#46A758] text-[9px]">RISK: MINIMAL</span>
            </div>
            <div className="space-y-1.5 text-[#A8988B] text-[10px] leading-relaxed my-auto">
              <p className="text-white">&gt; Analyzing Section 4.2 Data Processing Agreement...</p>
              <p className="text-[#D4AF37]">&gt; [OK] GDPR & CCPA Compliance Verified (99.2%)</p>
              <p className="text-[#C4B5A5]">&gt; Automated Scoring: Risk Score Index 12/100</p>
            </div>
            <div className="flex items-center justify-between text-[9px] text-[#8C6D4F]">
              <span>PIPELINE: ACTIVE</span>
              <span>LATENCY: 180MS</span>
            </div>
          </>
        )}

        {type === 'heatmap' && (
          <>
            <div className="flex justify-between items-center border-b border-[#8C6D4F]/20 pb-2">
              <span className="text-[#D4AF37] font-semibold text-[10px] tracking-wider">RELEASE RISK HEATMAP</span>
              <span className="px-2 py-0.5 rounded bg-[#D4AF37]/15 text-[#F7E7C4] text-[9px]">RANDOM FOREST</span>
            </div>
            {/* Visual Heatmap Grid */}
            <div className="grid grid-cols-4 gap-1.5 my-auto">
              {['LOW', 'LOW', 'MED', 'LOW', 'LOW', 'HIGH', 'LOW', 'LOW'].map((lvl, i) => (
                <div
                  key={i}
                  className={`p-2 rounded border text-center text-[9px] font-bold ${
                    lvl === 'LOW'
                      ? 'border-[#46A758]/30 bg-[#46A758]/10 text-[#46A758]'
                      : lvl === 'MED'
                      ? 'border-[#F5B041]/30 bg-[#F5B041]/10 text-[#F5B041]'
                      : 'border-[#E5484D]/30 bg-[#E5484D]/10 text-[#E5484D]'
                  }`}
                >
                  PKG-{i + 1}
                  <span className="block text-[7.5px] font-normal opacity-80">{lvl}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-[9px] text-[#8C6D4F]">
              <span>CLUSTER PREDICTION: 96.4%</span>
              <span>STATUS: STABLE</span>
            </div>
          </>
        )}

        {type === 'saas' && (
          <>
            <div className="flex justify-between items-center border-b border-[#8C6D4F]/20 pb-2">
              <span className="text-[#D4AF37] font-semibold text-[10px] tracking-wider">TENANT ISOLATION MONITOR</span>
              <span className="px-2 py-0.5 rounded bg-[#46A758]/15 text-[#46A758] text-[9px]">HEALTH: 100%</span>
            </div>
            <div className="space-y-2 my-auto text-[10px]">
              <div className="flex justify-between text-[#E8DFD8]">
                <span>Tenant Isolation Partition:</span>
                <span className="text-[#46A758]">ENFORCED</span>
              </div>
              <div className="w-full bg-black/60 h-2 rounded-full overflow-hidden border border-[#8C6D4F]/20">
                <div className="bg-gradient-to-r from-[#D4AF37] to-[#F7E7C4] h-full w-[84%]" />
              </div>
              <div className="flex justify-between text-[9px] text-[#A8988B]">
                <span>RBAC Policy: Granular</span>
                <span>Active Nodes: 12</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[9px] text-[#8C6D4F]">
              <span>CONTAINER: DOCKER</span>
              <span>UPTIME: 99.99%</span>
            </div>
          </>
        )}

        {type === 'payment' && (
          <>
            <div className="flex justify-between items-center border-b border-[#8C6D4F]/20 pb-2">
              <span className="text-[#D4AF37] font-semibold text-[10px] tracking-wider">HOSTED CHECKOUT GATEWAY</span>
              <span className="px-2 py-0.5 rounded bg-[#46A758]/15 text-[#46A758] text-[9px]">TLS 1.3 SECURE</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-black/50 border border-[#8C6D4F]/20 my-auto text-[10px]">
              <div>
                <span className="text-[#F7E7C4] block font-bold">MERCHANT ORDER #8942</span>
                <span className="text-[9px] text-[#A8988B]">UPI • VISA • MASTERCARD</span>
              </div>
              <span className="text-[#46A758] font-bold text-xs">₹ 14,999.00</span>
            </div>
            <div className="flex items-center justify-between text-[9px] text-[#8C6D4F]">
              <span>WEBHOOK: VERIFIED</span>
              <span>SETTLEMENT: INSTANT</span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="work"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-20 pb-32 px-6 sm:px-12 lg:px-20"
    >
      {/* Studio Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-[36rem] h-[36rem] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#8C6D4F]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-5"
        >
          <span
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            02 / FEATURED WORK
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.85] select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              SELECTED
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              ARCHITECTURES.
            </span>
          </h2>
        </motion.div>

        {/* Stacking Deck */}
        <ScrollStack
          itemDistance={20}
          itemScale={0.035}
          itemStackDistance={28}
          stackPosition="15%"
          scaleEndPosition="6%"
          baseScale={0.88}
          useWindowScroll={true}
        >
          {projects.map((project) => (
            <ScrollStackItem key={project.title}>
              <div 
                data-cursor-text="EXP"
                className="relative w-full rounded-2xl border border-[#8C6D4F]/50 bg-[#0E0C0A] p-6 sm:p-10 lg:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.98)] group overflow-hidden transition-colors duration-500 hover:border-[#D4AF37]"
              >
                {/* Top Gold Border Light Flare */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

                {/* Corner Minimal L-Brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />

                {/* Big Background Watermark Number */}
                <span
                  className="absolute -bottom-6 -right-3 text-8xl sm:text-9xl font-bold text-[#EAD8C7]/5 select-none pointer-events-none leading-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {project.number}
                </span>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                  
                  {/* Left Column (6 Cols) */}
                  <div className="lg:col-span-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-xs font-mono font-bold text-[#D4AF37]">
                          {project.number} //
                        </span>
                        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#A8988B]">
                          {project.category}
                        </span>
                      </div>

                      <h3
                        className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white mb-3 group-hover:text-[#F7E7C4] transition-colors uppercase leading-[0.95]"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {project.title}
                      </h3>

                      <p
                        className="text-xs sm:text-sm font-light text-[#BDB0A4] leading-[1.8] tracking-wide mb-6 max-w-xl"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#8C6D4F]/25">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 text-[9.5px] font-medium tracking-[0.14em] uppercase rounded-sm border border-[#8C6D4F]/40 bg-[#16120E] text-[#E8D7C5] group-hover:border-[#D4AF37]/50 transition-all duration-300"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column (6 Cols) */}
                  <div className="lg:col-span-6 flex flex-col justify-between space-y-5 lg:pl-4">
                    {/* Visual 3D Preview Frame */}
                    <ProjectMockup type={project.previewType} title={project.title} />

                    {/* Metrics Row */}
                    <div className="grid grid-cols-3 gap-2">
                      {project.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="p-2 rounded-sm border border-[#8C6D4F]/25 bg-[#050403] text-center"
                        >
                          <span className="text-[8.5px] font-mono text-[#A8988B] block truncate">
                            {m.label}
                          </span>
                          <span className="text-[10px] font-mono font-medium text-[#F7E7C4] block truncate mt-0.5">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="flex items-center gap-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-text="CODE"
                        className="flex-1 inline-flex items-center justify-center space-x-2 py-3 border border-[#8C6D4F] bg-[#16120E] hover:border-[#D4AF37] hover:bg-[#D4AF37] text-[#EAD8C7] hover:text-black text-[10px] font-medium tracking-[0.22em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <span>SOURCE CODE</span>
                        <span className="text-xs">⌥</span>
                      </a>

                      <a
                        href={project.demoUrl || '#contact'}
                        data-cursor-text="DEMO"
                        className="flex-1 inline-flex items-center justify-center space-x-2 py-3 border border-[#8C6D4F]/50 hover:border-[#D4AF37] text-[#EAD8C7] hover:text-[#FFF5EB] text-[10px] font-medium tracking-[0.22em] uppercase transition-all duration-300 bg-[#0A0806]"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <span>CASE STUDY</span>
                        <span className="text-xs">↗</span>
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>

      </div>
    </section>
  );
};
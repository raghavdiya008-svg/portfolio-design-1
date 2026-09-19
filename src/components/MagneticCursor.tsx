import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const MagneticCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Raw instantaneous mouse position (0ms lag, direct coordinates)
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Snappy GPU spring follower for the halo
  const followerX = useSpring(rawX, { damping: 28, stiffness: 450, mass: 0.05 });
  const followerY = useSpring(rawY, { damping: 28, stiffness: 450, mass: 0.05 });

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(hover: none) or (pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [data-cursor], input, textarea');
      if (interactive) {
        setIsHovered(true);
        const text = interactive.getAttribute('data-cursor-text');
        setCursorText(text || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [rawX, rawY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* GPU Composited Outer Ring (Scale transform only - zero layout reflow) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center rounded-full border border-[#D4AF37]/50 w-10 h-10 gpu-layer"
        style={{
          x: followerX,
          y: followerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? (cursorText ? 1.65 : 1.35) : 0.65,
          backgroundColor: isHovered ? 'rgba(212, 175, 55, 0.12)' : 'transparent',
          borderColor: isHovered ? 'rgba(212, 175, 55, 0.85)' : 'rgba(212, 175, 55, 0.4)',
        }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      >
        {cursorText && (
          <span className="text-[8px] tracking-[0.22em] font-semibold text-[#F7E7C4] uppercase select-none px-1">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Instant Center Reticle (1:1 with hardware pointer) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none w-1.5 h-1.5 rounded-full bg-[#F7E7C4] shadow-[0_0_8px_#D4AF37] gpu-layer"
        style={{
          x: rawX,
          y: rawY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isHovered && cursorText ? 0 : 0.9,
          scale: isHovered ? 0.75 : 1,
        }}
        transition={{ duration: 0.12 }}
      />
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const MagneticCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Raw instantaneous mouse position (0ms lag, 100% direct)
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Snappy responsive follower (stiff, minimal mass for direct feel)
  const followerX = useSpring(rawX, { damping: 35, stiffness: 650, mass: 0.08 });
  const followerY = useSpring(rawY, { damping: 35, stiffness: 650, mass: 0.08 });

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
      {/* Snappy Interactive Outer Halo (Zero Click Interference) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center rounded-full border border-[#D4AF37]/45"
        style={{
          x: followerX,
          y: followerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? (cursorText ? 64 : 40) : 20,
          height: isHovered ? (cursorText ? 64 : 40) : 20,
          backgroundColor: isHovered ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
          borderColor: isHovered ? 'rgba(212, 175, 55, 0.75)' : 'rgba(212, 175, 55, 0.3)',
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        {cursorText && (
          <span className="text-[8.5px] tracking-[0.2em] font-semibold text-[#F7E7C4] uppercase select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* 100% Direct Instant Center Reticle (Direct with mouse pointer, zero delay) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none w-1 h-1 rounded-full bg-[#F7E7C4]"
        style={{
          x: rawX,
          y: rawY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isHovered && cursorText ? 0 : 0.8,
        }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};

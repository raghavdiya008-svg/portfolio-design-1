import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const MagneticCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const cursorX = useSpring(rawX, { damping: 28, stiffness: 350, mass: 0.4 });
  const cursorY = useSpring(rawY, { damping: 28, stiffness: 350, mass: 0.4 });

  useEffect(() => {
    // Disable on touch / mobile devices
    const touchCheck = window.matchMedia('(hover: none) or (pointer: coarse)');
    if (touchCheck.matches || 'ontouchstart' in window) {
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

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [rawX, rawY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center rounded-full border border-[#D4AF37]/50 backdrop-blur-[1.5px]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? (cursorText ? 72 : 48) : 24,
          height: isHovered ? (cursorText ? 72 : 48) : 24,
          backgroundColor: isHovered ? 'rgba(212, 175, 55, 0.12)' : 'rgba(212, 175, 55, 0.03)',
          borderColor: isHovered ? 'rgba(212, 175, 55, 0.8)' : 'rgba(212, 175, 55, 0.35)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.3 }}
      >
        {cursorText && (
          <span className="text-[9px] tracking-[0.2em] font-semibold text-[#F7E7C4] uppercase select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Pinpoint Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-1.5 h-1.5 rounded-full bg-[#F7E7C4]"
        style={{
          x: rawX,
          y: rawY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isHovered && cursorText ? 0 : 0.9,
          scale: isHovered ? 0.6 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};

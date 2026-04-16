import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isChomping, setIsChomping] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // High stiffness and damping for a very snappy, low-lag feel
  const springConfig = { damping: 40, stiffness: 800, restDelta: 0.001 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  const rotation = useMotionValue(0);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      // Rotate gear based on movement - use a multiplier for more noticeable rotation
      rotation.set(rotation.get() + (Math.abs(e.movementX) + Math.abs(e.movementY)) * 0.5);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('.cursor-chomper')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, rotation]);

  // Chomp effect interval
  useEffect(() => {
    if (isHovering) {
      const interval = setInterval(() => {
        setIsChomping(prev => !prev);
      }, 150);
      return () => clearInterval(interval);
    } else {
      setIsChomping(false);
    }
  }, [isHovering]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
      }}
    >
      <motion.svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        style={{ rotate: rotation }}
      >
        <g transform="translate(24, 24)">
          {/* Gear Body with Pacman Mouth Clip */}
          <defs>
            <clipPath id="pacman-mouth">
              <motion.path
                d={isHovering 
                  ? (isChomping 
                    ? "M 0 0 L 30 -20 A 30 30 0 1 1 30 20 Z" // Open
                    : "M 0 0 L 30 -5 A 30 30 0 1 1 30 5 Z"   // Closed
                  )
                  : "M -30 -30 H 30 V 30 H -30 Z" // Full square (no clip)
                }
              />
            </clipPath>
          </defs>

          <g clipPath="url(#pacman-mouth)">
            {/* Gear Body */}
            <circle r="14" fill="var(--accent-yellow)" stroke="var(--border)" strokeWidth="2" />
            
            {/* Gear Teeth (Technic style) */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <rect
                key={deg}
                x="-4"
                y="-22"
                width="8"
                height="10"
                fill="var(--accent-yellow)"
                stroke="var(--border)"
                strokeWidth="2"
                transform={`rotate(${deg})`}
              />
            ))}
            
            {/* Technic Cross Hole */}
            <path 
              d="M -4 -1 H -1 V -4 H 1 V -1 H 4 V 1 H 1 V 4 H -1 V 1 H -4 Z" 
              fill="var(--bg)" 
              stroke="var(--border)" 
              strokeWidth="1" 
            />
          </g>
        </g>
      </motion.svg>
    </motion.div>
  );
}

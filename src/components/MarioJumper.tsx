import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';

interface MarioJumperProps {
  cardCount: number;
}

const MarioSprite: React.FC<{ state: 'idle' | 'running' | 'jumping', facingRight: boolean }> = ({ state, facingRight }) => {
  return (
    <div 
      className="relative w-12 h-12"
      style={{ 
        transform: facingRight ? 'scaleX(1)' : 'scaleX(-1)',
        transition: 'transform 0.2s ease-in-out'
      }}
    >
      <svg viewBox="0 -2 16 18" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
        <motion.g
          animate={state === 'running' ? { y: [0, -1, 0] } : {}}
          transition={{ duration: 0.2, repeat: Infinity }}
        >
          {/* Hat */}
          <rect x="4" y="0" width="8" height="1" fill="#e00000" />
          <rect x="3" y="1" width="11" height="1" fill="#e00000" />
          
          {/* Face/Head */}
          <rect x="3" y="2" width="9" height="1" fill="#885010" />
          <rect x="3" y="3" width="1" height="3" fill="#885010" />
          <rect x="4" y="2" width="7" height="4" fill="#f8b800" />
          <rect x="11" y="2" width="1" height="1" fill="#000000" />
          <rect x="11" y="3" width="1" height="1" fill="#f8b800" />
          <rect x="11" y="4" width="3" height="1" fill="#f8b800" />
          <rect x="10" y="5" width="4" height="1" fill="#f8b800" />
          <rect x="9" y="4" width="2" height="1" fill="#000000" />
          
          {/* Body/Overalls */}
          <rect x="4" y="6" width="8" height="1" fill="#e00000" />
          <rect x="3" y="7" width="10" height="1" fill="#e00000" />
          <rect x="3" y="8" width="10" height="4" fill="#0000d8" />
          <rect x="5" y="8" width="1" height="1" fill="#ffff00" />
          <rect x="10" y="8" width="1" height="1" fill="#ffff00" />
          
          {/* Arms */}
          {state === 'jumping' ? (
            <>
              <rect x="1" y="4" width="2" height="3" fill="#e00000" />
              <rect x="0" y="2" width="2" height="2" fill="#ffffff" />
            </>
          ) : (
            <>
              <rect x="1" y="8" width="2" height="3" fill="#e00000" />
              <rect x="0" y="10" width="2" height="2" fill="#ffffff" />
            </>
          )}
          <rect x="13" y="8" width="2" height="3" fill="#e00000" />
          <rect x="14" y="10" width="2" height="2" fill="#ffffff" />
          
          {/* Legs/Boots */}
          <rect x="4" y="12" width="3" height="2" fill="#885010" />
          <rect x="9" y="12" width="3" height="2" fill="#885010" />
        </motion.g>
      </svg>
    </div>
  );
};

export const MarioJumper: React.FC<MarioJumperProps> = ({ cardCount }) => {
  const [marioState, setMarioState] = useState<'idle' | 'running' | 'jumping'>('idle');
  const [isFacingRight, setIsFacingRight] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    const runAnimation = async () => {
      const container = document.querySelector('.dynamic-theme-container');
      const header = document.getElementById('mario-header');
      const sortDate = document.getElementById('mario-sort-date');
      const sortOrder = document.getElementById('mario-sort-order');

      if (!container || !header || !sortDate || !sortOrder) return;

      const containerRect = container.getBoundingClientRect();
      const getRelX = (rect: DOMRect) => rect.left - containerRect.left;
      const getRelY = (rect: DOMRect) => rect.top - containerRect.top;

      const headerRect = header.getBoundingClientRect();
      const sortDateRect = sortDate.getBoundingClientRect();
      const sortOrderRect = sortOrder.getBoundingClientRect();

      // 1. Start off-screen left (instant set to prevent visible sliding back)
      setMarioState('running');
      setIsFacingRight(true);
      
      controls.set({
        x: -100,
        y: getRelY(headerRect) - 48
      });

      // Jump into the "ENGINEERING" header
      setMarioState('jumping');
      await controls.start({
        x: getRelX(headerRect),
        y: [getRelY(headerRect) - 200, getRelY(headerRect) - 48],
        transition: { duration: 0.8, ease: "easeOut" }
      });

      // Run across "ENGINEERING" (Jump at the end of the first word 'Engineering')
      setMarioState('running');
      await controls.start({
        x: getRelX(headerRect) + (headerRect.width * 0.52) - 48,
        transition: { duration: 1, ease: "linear" }
      });

      // 2. Jump to "Sort by Date"
      setMarioState('jumping');
      await controls.start({
        x: getRelX(sortDateRect),
        y: [getRelY(headerRect) - 48, Math.min(getRelY(headerRect), getRelY(sortDateRect)) - 100, getRelY(sortDateRect) - 48],
        transition: { duration: 0.8, ease: "easeInOut" }
      });

      // 3. Run across "Sort by Date"
      setMarioState('running');
      await controls.start({
        x: getRelX(sortDateRect) + sortDateRect.width - 48,
        transition: { duration: 0.5, ease: "linear" }
      });

      // 4. Jump to "Newest First"
      setMarioState('jumping');
      await controls.start({
        x: getRelX(sortOrderRect),
        y: [getRelY(sortDateRect) - 48, Math.min(getRelY(sortDateRect), getRelY(sortOrderRect)) - 50, getRelY(sortOrderRect) - 48],
        transition: { duration: 0.5, ease: "easeInOut" }
      });

      // 5. Run across "Newest First" and jump out
      setMarioState('running');
      await controls.start({
        x: getRelX(sortOrderRect) + sortOrderRect.width - 48,
        transition: { duration: 0.5, ease: "linear" }
      });

      setMarioState('jumping');
      await controls.start({
        x: window.innerWidth + 100,
        y: getRelY(sortOrderRect) - 200,
        transition: { duration: 1, ease: "easeIn" }
      });

      setMarioState('idle');
    };

    const interval = setInterval(runAnimation, 10000);
    runAnimation(); // Initial run

    return () => clearInterval(interval);
  }, [controls]);

  if (cardCount === 0) return null;

  return (
    <motion.div
      animate={controls}
      className="absolute z-[100] pointer-events-none"
      style={{ width: 48, height: 48 }}
    >
      <MarioSprite state={marioState} facingRight={isFacingRight} />
    </motion.div>
  );
};

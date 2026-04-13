import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Cog } from 'lucide-react';

export default function MechanicalLinkage() {
  // Linkage dimensions
  const crankLength = 25;
  const couplerLength = 60;
  const rockerLength = 50;
  const baseWidth = 50;
  
  // State for the crank angle to calculate other positions
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    const animate = (time: number) => {
      // Rotate at about 1 revolution per 3 seconds
      setAngle((time / 3000) * 2 * Math.PI);
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Calculate coordinates
  // Origin (0,0) is the crank pivot
  const crankX = Math.cos(angle) * crankLength;
  const crankY = Math.sin(angle) * crankLength;

  // Rocker pivot is at (baseWidth, 0)
  const rockerPivotX = baseWidth;
  const rockerPivotY = 0;

  // Solve for the intersection of coupler and rocker (Point B)
  const dx = rockerPivotX - crankX;
  const dy = rockerPivotY - crankY;
  const d = Math.sqrt(dx * dx + dy * dy);
  
  const a = couplerLength;
  const b = rockerLength;
  const c = d;
  
  const cosAlpha = (b * b + c * c - a * a) / (2 * b * c);
  const alpha = Math.acos(Math.max(-1, Math.min(1, cosAlpha)));
  const beta = Math.atan2(dy, dx);
  
  const rockerX = rockerPivotX - Math.cos(beta + alpha) * rockerLength;
  const rockerY = rockerPivotY - Math.sin(beta + alpha) * rockerLength;

  return (
    <div className="relative w-48 h-32 flex items-center justify-center overflow-hidden">
      <svg width="100%" height="100%" viewBox="-40 -60 160 120" className="drop-shadow-xl">
        {/* Base / Ground - High Visibility Dotted Line */}
        <line 
          x1="0" 
          y1="0" 
          x2={baseWidth} 
          y2="0" 
          stroke="var(--fg)" 
          strokeWidth="4" 
          strokeDasharray="6 4" 
          className="opacity-80"
        />
        
        {/* Main Drive Gear (Attached to Crank Pivot) */}
        <motion.g 
          animate={{ rotate: (angle * 180) / Math.PI }}
          transition={{ ease: "linear", duration: 0 }}
        >
          <Cog 
            size={48} 
            strokeWidth={3}
            className="text-[var(--fg)]" 
            style={{ transform: 'translate(-24px, -24px)' }}
          />
        </motion.g>

        {/* Secondary Gear (Attached to Rocker Pivot) */}
        <motion.g 
          animate={{ rotate: -(angle * 90) / Math.PI }}
          transition={{ ease: "linear", duration: 0 }}
          style={{ x: baseWidth }}
        >
          <Cog 
            size={36} 
            strokeWidth={3}
            className="text-[var(--fg)] opacity-80" 
            style={{ transform: 'translate(-18px, -18px)' }}
          />
        </motion.g>

        {/* Pivots */}
        <circle cx="0" cy="0" r="6" fill="var(--fg)" />
        <circle cx={baseWidth} cy="0" r="6" fill="var(--fg)" />

        {/* Crank */}
        <line x1="0" y1="0" x2={crankX} y2={crankY} stroke="var(--accent-red)" strokeWidth="8" strokeLinecap="round" />
        <circle cx={crankX} cy={crankY} r="4" fill="var(--bg)" stroke="var(--accent-red)" strokeWidth="3" />

        {/* Coupler */}
        <line x1={crankX} y1={crankY} x2={rockerX} y2={rockerY} stroke="var(--accent-blue)" strokeWidth="8" strokeLinecap="round" />
        
        {/* Rocker */}
        <line x1={rockerPivotX} y1={rockerPivotY} x2={rockerX} y2={rockerY} stroke="var(--accent-yellow)" strokeWidth="8" strokeLinecap="round" />
        <circle cx={rockerX} cy={rockerY} r="4" fill="var(--bg)" stroke="var(--accent-blue)" strokeWidth="3" />

        {/* Trace Point */}
        <motion.circle 
          cx={rockerX} 
          cy={rockerY} 
          r="3" 
          fill="var(--accent-green)" 
          initial={false}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </svg>
      
      {/* Technical Labels */}
      <div className="absolute bottom-1 right-2 font-mono text-[8px] uppercase opacity-40 flex flex-col items-end">
        <span>Linkage_Type: 4-Bar</span>
        <span>Drive: Gear_Assisted</span>
        <span>Status: Operational</span>
      </div>
    </div>
  );
}

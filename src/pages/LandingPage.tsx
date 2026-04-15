import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Linkedin, Github, Heart, Zap, Download, ChevronRight, ChevronLeft, Target } from 'lucide-react';
import { resumeData } from '@/resumeData';
import MechanicalLinkage from '@/components/MechanicalLinkage';
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';

const HexScrew = ({ className }: { className?: string }) => (
  <div className={`absolute w-4 h-4 flex items-center justify-center ${className}`}>
    {/* Outer Hexagon - Metallic Steel Color */}
    <div className="w-full h-full bg-[#94a3b8] border border-[var(--border)]" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}>
      {/* Inner Hexagon (Socket) - Darker Steel */}
      <div className="absolute inset-[20%] bg-[#475569]" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }} />
    </div>
  </div>
);

const RevealCard = ({ 
  title, 
  icon: Icon, 
  content, 
  image, 
  themeClass, 
  hoverClass, 
  contentHoverClass = "group-hover:text-white",
  delay 
}: { 
  title: string, 
  icon: any, 
  content: string, 
  image: string, 
  themeClass: string, 
  hoverClass: string, 
  contentHoverClass?: string,
  delay: number 
}) => {
  const [showImage, setShowImage] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`card-mechanical p-8 ${themeClass} ${hoverClass} group cursor-chomper relative overflow-hidden flex flex-col min-h-[450px]`}
    >
      {/* Mechanical Header */}
      <div className="flex items-center justify-between mb-6 relative z-20">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white/10 border-2 border-white/20">
            <Icon className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight">{title}</h2>
        </div>
        
        {/* Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1 bg-black/20 border border-white/10 rounded-full">
          <div className={`w-2 h-2 rounded-full ${showImage ? 'bg-green-400 animate-pulse' : 'bg-white/30'}`} />
          <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">
            {showImage ? "Media Active" : "Data Stream"}
          </span>
        </div>
      </div>

      <div className="flex-grow relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!showImage ? (
            <motion.div
              key="text"
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="h-full relative z-10"
            >
              <p className={`text-xl leading-relaxed opacity-90 ${contentHoverClass} transition-colors font-medium`}>
                {content}
              </p>
              
              {/* Decorative Mechanical Lines */}
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-white/20 to-transparent" />
              <div className="absolute bottom-2 left-0 w-2/3 h-px bg-gradient-to-r from-white/10 to-transparent" />
            </motion.div>
          ) : (
            <motion.div
              key="image"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="absolute inset-0 w-full h-full z-10"
            >
              <div className="relative w-full h-full border-4 border-white/30 overflow-hidden group/img bg-black">
                {/* Technical Viewfinder Overlay */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  {/* Corner Brackets */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/40" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/40" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/40" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/40" />
                  
                  {/* Center Reticle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Target className="w-12 h-12 text-white/20 animate-pulse" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/10 rounded-full animate-spin-slow" />
                  </div>
                  
                  {/* Monospace Metadata */}
                  <div className="absolute top-2 left-2 font-mono text-[10px] text-white/60 uppercase tracking-widest bg-black/40 px-2 py-0.5">
                    X: 42.129 | Y: -71.058
                  </div>
                  <div className="absolute top-2 right-2 font-mono text-[10px] text-white/60 uppercase tracking-widest bg-black/40 px-2 py-0.5">
                    LIVE_FEED // {title.replace(' ', '_')}
                  </div>
                </div>

                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-full object-cover grayscale-[0.5] group-hover/img:grayscale-0 transition-all duration-700 scale-105 group-hover/img:scale-100"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Reveal Handle (The "Arrow") */}
      <button 
        onClick={() => setShowImage(!showImage)}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-30 h-32 w-12 flex items-center justify-center transition-all duration-300 ${showImage ? 'bg-white/20 -translate-x-2' : 'bg-black/20 hover:bg-black/40'}`}
      >
        <div className="flex flex-col items-center gap-1">
          {showImage ? (
            <>
              <ChevronLeft className="w-6 h-6 text-white animate-bounce-x" />
              <span className="[writing-mode:vertical-lr] text-[10px] font-bold uppercase tracking-[0.3em] rotate-180">BACK</span>
            </>
          ) : (
            <>
              <span className="[writing-mode:vertical-lr] text-[10px] font-bold uppercase tracking-[0.3em]">REVEAL</span>
              <ChevronRight className="w-6 h-6 text-white animate-bounce-x" />
            </>
          )}
        </div>
      </button>

      {/* Decorative Screws in Reveal Mode */}
      <div className="absolute bottom-4 left-4 z-20 flex gap-2 opacity-40">
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
      </div>
    </motion.div>
  );
};

export default function LandingPage() {
  return (
    <div className="max-w-5xl mx-auto py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-24 relative min-h-[40vh] flex flex-col items-center justify-center"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            type: "spring",
            damping: 20,
            stiffness: 100,
            delay: 0.2 
          }}
          className="relative z-10"
        >
          <div className="inline-block p-8 bg-[var(--card-bg)] border-4 border-[var(--border)] shadow-[8px_8px_0px_0px_var(--pixel-dot)] mb-8 relative">
            {/* Corner Screws */}
            <HexScrew className="top-1 left-1" />
            <HexScrew className="top-1 right-1" />
            <HexScrew className="bottom-1 left-1" />
            <HexScrew className="bottom-1 right-1" />
            
            <MechanicalLinkage />
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-[var(--fg)] mb-6 uppercase">
            Preeyansh <span className="text-[var(--accent-blue)]">Arora Majoka</span>
          </h1>
          <p className="text-2xl text-zinc-500 font-medium max-w-2xl mx-auto leading-tight relative top-2">
            Manufacturing Engineer & Mechatronics Enthusiast. <br /> 
            Chief Idea Stacker & Builder, One Pixel at a Time.
          </p>
        </motion.div>
        
        {/* Pacman Animation */}
        <div className="pacman-container hidden md:block">
          {/* Food dots */}
          <div className="pacman-food-container-inner">
            {[...Array(15)].map((_, i) => (
              <div 
                key={i} 
                className="pacman-food" 
                style={{ left: `${(i + 1) * 6.25}%` }} 
              />
            ))}
          </div>
          
          <div className="pacman" style={{ animationDelay: '0s' }} />
          <div className="ghost ghost-cyan" style={{ animationDelay: '0.6s' }}>
            <div className="ghost-pupil ghost-pupil-left" />
            <div className="ghost-pupil ghost-pupil-right" />
            <div className="ghost-legs text-[#00FFFF]" />
          </div>
          <div className="ghost ghost-orange" style={{ animationDelay: '1.2s' }}>
            <div className="ghost-pupil ghost-pupil-left" />
            <div className="ghost-pupil ghost-pupil-right" />
            <div className="ghost-legs text-[#FFB852]" />
          </div>
        </div>
      </motion.section>

      {/* Passions / About */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
      <RevealCard 
        title="My Passions"
        icon={Heart}
        themeClass="lego-blue"
        hoverClass="hover-blue"
        contentHoverClass="group-hover:text-[var(--accent-yellow)]"
        delay={0.2}
        image="/profile_machine.jpg"
        content="Driven by faith and a passion for building things. I enjoy mechanical design and automation, from leading an electric motorcycle student-team to designing medical lab devices. Whether designing motorbike subassemblies, or tinkering with PLCs, I bring the same focus to every project."
      />

      <RevealCard 
        title="My Vision"
        icon={Zap}
        themeClass="lego-yellow"
        hoverClass="hover-yellow"
        contentHoverClass="group-hover:text-white"
        delay={0.3}
        image="/profile_suit.jpg"
        content="My vision is to bridge mechanical design with predictive technology. I aim to leverage Machine Learning and FEA to analyze stress and predict critical failure modes, whether developing In-Line Inspection (ILI) for pipeline asset management or ensuring structural reliability in aerospace."
      />
      </div>

      {/* Main Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-24">
        <Link to="/profile" className="btn-mechanical lego-red text-2xl py-12 group">
          View Profile / Resume
          <ArrowRight className="ml-4 w-8 h-8 transition-transform group-hover:translate-x-2" />
        </Link>
        <Link to="/projects" className="btn-mechanical lego-green text-2xl py-12 group">
          Explore Projects
          <ArrowRight className="ml-4 w-8 h-8 transition-transform group-hover:translate-x-2" />
        </Link>
      </div>

      {/* Let's Connect */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card-mechanical p-12 text-center !bg-[var(--fg)] !text-[var(--bg)]"
      >
        <h2 className="text-4xl font-black uppercase mb-6 tracking-tighter !text-[var(--bg)]">Let's Connect</h2>
        <p className="mb-10 text-xl max-w-xl mx-auto !text-[var(--bg)] opacity-80">
          Interested in collaborating on fun projects or sharing your insights? Reach out through any of these channels. I am always excited to learn new things.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <a 
            href={`mailto:${resumeData.contact.email}`}
            className="btn-mechanical !bg-[var(--bg)] !text-[var(--fg)]"
          >
            <Mail className="w-5 h-5 mr-3" /> Email
          </a>
          <a 
            href={`https://${resumeData.contact.linkedin}`}
            target="_blank"
            rel="noreferrer"
            className="btn-mechanical !bg-[var(--bg)] !text-[var(--fg)]"
          >
            <Linkedin className="w-5 h-5 mr-3" /> LinkedIn
          </a>
          <a 
            href={`https://${resumeData.contact.github}`}
            target="_blank"
            rel="noreferrer"
            className="btn-mechanical !bg-[var(--bg)] !text-[var(--fg)]"
          >
            <Github className="w-5 h-5 mr-3" /> GitHub
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6 border-t-2 border-[var(--bg)]/20 pt-12">
          <a 
            href="/Preeyansh_Arora_Majoka_Resume.pdf" 
            download 
            target="_blank"
            rel="noopener noreferrer"
            className="btn-mechanical !bg-[var(--accent-red)] !text-white flex items-center gap-3 group"
          >
            <Download className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
            Resume (PDF)
          </a>
          <a 
            href="/Preeyansh_Arora_Majoka_Mechanical_Portfolio.pdf" 
            download 
            target="_blank"
            rel="noopener noreferrer"
            className="btn-mechanical !bg-[var(--accent-blue)] !text-white flex items-center gap-3 group"
          >
            <Download className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
            Mechanical Design Portfolio (PDF)
          </a>
        </div>
      </motion.section>

      {/* Bible Verse - Bottom Right Corner */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-none hidden lg:block">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="card-mechanical p-4 bg-[var(--card-bg)]/80 backdrop-blur-sm border-2 border-[var(--border)] max-w-[280px] shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2 border-b border-[var(--border)] pb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)]" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Jeremiah 17:7-8 ESV</span>
          </div>
          <p className="text-[11px] leading-relaxed font-medium italic text-zinc-500">
            "Blessed is the man who trusts in the Lord, whose trust is the Lord. He is like a tree planted by water, that sends out its roots by the stream, and does not fear when heat comes, for its leaves remain green, and is not anxious in the year of drought, for it does not cease to bear fruit."
          </p>
        </motion.div>
      </div>
    </div>
  );
}

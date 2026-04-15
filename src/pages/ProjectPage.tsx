import { useState, useEffect } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { projects } from '@/projectsData';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  ChevronRight, 
  Target, 
  Lightbulb, 
  Zap, 
  FileText, 
  ArrowRight, 
  X,
  Play,
  Pause,
  RotateCcw,
  Cpu,
  Settings,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function StepCard({ step, idx }: any) {
  const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);

  const hasImages = step.images && step.images.length > 0;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: -0 }}
      viewport={{ once: true }}
      transition={{ 
        delay: idx * 0.1,
        layout: { type: 'spring', damping: 25, stiffness: 200 }
      }}
      className={`relative flex flex-col md:flex-row gap-4 md:gap-8 p-6 bg-[var(--card-bg)] border-2 border-[var(--border)] shadow-[4px_4px_0px_0px_var(--border)] hover:shadow-[6px_6px_0px_0px_var(--hover-accent)] transition-all group/step overflow-hidden ${
        activeImageIdx !== null ? 'min-h-[500px] md:min-h-[600px]' : 'min-h-0'
      }`}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--fg)] text-[var(--bg)] flex items-center justify-center font-black text-lg z-10 group-hover/step:bg-[var(--hover-accent)] group-hover/step:text-black transition-colors">
        {idx + 1}
      </div>
      
      <div className="space-y-3 flex-grow">
        <div className="flex justify-between items-start">
          <h4 className="text-lg font-black uppercase tracking-tight text-[var(--fg)] transition-colors">
            {step.title}
          </h4>
          {hasImages && (
            <button 
              onClick={() => setActiveImageIdx(0)}
              className="p-2 bg-[var(--card-bg)] border-2 border-[var(--border)] hover:border-[var(--hover-accent)] hover:text-[var(--hover-accent)] transition-all shadow-[2px_2px_0px_0px_var(--border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              title="View Technical Media"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
        <p className="text-sm text-zinc-500 font-medium leading-relaxed group-hover/step:text-[var(--hover-accent)] transition-colors">
          {step.description}
        </p>
      </div>

      {/* Image Overlay / "Buried Behind" View */}
      <AnimatePresence mode="wait">
        {activeImageIdx !== null && hasImages && (
          <motion.div 
            key="image-overlay"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 bg-[var(--card-bg)] flex flex-col"
          >
            <button 
              onClick={() => setActiveImageIdx(null)}
              className="absolute top-4 right-4 z-30 p-2 bg-[var(--card-bg)]/80 backdrop-blur-md border-2 border-[var(--border)] hover:text-[var(--accent-red)] transition-colors shadow-[4px_4px_0px_0px_var(--border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
              <X className="w-5 h-5" />
            </button>

            {step.images.length > 1 && (
              <button 
                onClick={() => setActiveImageIdx((activeImageIdx + 1) % step.images.length)}
                className="absolute bottom-4 right-4 z-30 p-2 bg-[var(--card-bg)]/80 backdrop-blur-md border-2 border-[var(--border)] hover:text-[var(--hover-accent)] transition-colors shadow-[4px_4px_0px_0px_var(--border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            )}

            <div className="flex-grow relative overflow-hidden bg-white flex items-center justify-center p-8">
              <img 
                src={step.images[activeImageIdx]} 
                alt={`${step.title} detail`}
                className="max-w-full max-h-full object-contain shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FSMVisualization({ steps }: { steps: { id: string; label: string; description: string }[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  return (
    <div className="card-mechanical p-6 bg-zinc-900 border-2 border-zinc-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-6 min-h-[400px]">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          <span className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-widest">PLC RUNTIME: ACTIVE</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsPlaying(!isPlaying)} className="p-1 hover:text-[var(--hover-accent)] transition-colors">
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button onClick={() => setActiveIdx(0)} className="p-1 hover:text-[var(--accent-blue)] transition-colors">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 relative">
        {steps.map((step, idx) => {
          const isActive = activeIdx === idx;
          return (
            <div key={step.id} className="relative">
              <motion.div 
                animate={{ 
                  borderColor: isActive ? 'var(--accent-green)' : 'rgba(63, 63, 70, 1)',
                  backgroundColor: isActive ? 'rgba(34, 197, 94, 0.1)' : 'transparent',
                  x: isActive ? 10 : 0
                }}
                className="p-4 border-2 rounded-sm transition-all duration-500 flex items-center justify-between group/step"
              >
                <div className="flex flex-col">
                  <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-[var(--accent-green)]' : 'text-zinc-500'}`}>
                    STATE_{step.id.padStart(2, '0')}
                  </span>
                  <span className={`text-xs font-black uppercase tracking-tight ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                    {step.label}
                  </span>
                </div>
                {isActive && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-[var(--accent-green)] rounded-full shadow-[0_0_10px_var(--accent-green)]"
                  />
                )}
              </motion.div>
              {idx < steps.length - 1 && (
                <div className="h-4 flex items-center justify-center">
                  <ArrowRight className={`w-4 h-4 rotate-90 transition-colors duration-500 ${isActive ? 'text-[var(--accent-green)] animate-pulse' : 'text-zinc-800'}`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DetailedFSMVisualization({ data }: { data: any }) {
  const [baseIdx, setBaseIdx] = useState(0);
  const [appIdx, setAppIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    
    const sequence = setInterval(() => {
      // Logic for combined FSM simulation
      if (baseIdx === 0) setBaseIdx(1);
      else if (baseIdx === 1) setBaseIdx(2);
      else if (baseIdx === 2) {
        if (appIdx === 0) setAppIdx(1);
        else if (appIdx === 1) setAppIdx(2);
        else if (appIdx === 2) setAppIdx(3);
        else if (appIdx === 3) setAppIdx(4);
        else if (appIdx === 4) setAppIdx(5);
        else if (appIdx === 5) {
          setBaseIdx(3);
        }
      }
      else if (baseIdx === 3) {
        setBaseIdx(0);
        setAppIdx(0);
      }
    }, 1500);

    return () => clearInterval(sequence);
  }, [isPlaying, baseIdx, appIdx]);

  return (
    <div className="relative p-6 bg-[var(--card-bg)] border-4 border-[var(--border)] shadow-[8px_8px_0px_0px_var(--pixel-dot)] min-h-[700px] flex flex-col gap-8 font-mono overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle, var(--fg) 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
      />

      <div className="flex justify-between items-center border-b-2 border-[var(--border)] pb-4 z-10">
        <div className="flex items-center gap-4">
          <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">SYSTEM_STATUS</span>
            <span className="text-xs font-black text-[var(--fg)] uppercase tracking-tighter">PLC_COMBINED_RUNTIME</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 bg-[var(--card-bg)] border-2 border-[var(--border)] hover:text-[var(--hover-accent)] transition-all active:translate-y-1">
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button onClick={() => { setBaseIdx(0); setAppIdx(0); }} className="p-2 bg-[var(--card-bg)] border-2 border-[var(--border)] hover:text-[var(--accent-blue)] transition-all active:translate-y-1">
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10 flex-grow">
        {/* Base Conveyor FSM */}
        <div className="space-y-6 min-w-0">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-4 h-4 text-[var(--accent-blue)]" />
            <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">BASE_CONVEYOR_FSM</h4>
          </div>
          <div className="space-y-4">
            {data.base.map((step: any, idx: number) => {
              const isActive = baseIdx === idx;
              return (
                <motion.div 
                  key={step.id}
                  animate={{ 
                    borderColor: isActive ? 'var(--accent-blue)' : 'var(--border)',
                    backgroundColor: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    scale: isActive ? 1.02 : 1
                  }}
                  className="p-3 border-2 rounded-sm relative group/state overflow-hidden min-w-0"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-[9px] font-black ${isActive ? 'text-[var(--accent-blue)]' : 'text-zinc-600'}`}>STATE_{step.id.padStart(2, '0')}</span>
                    {isActive && <div className="w-1.5 h-1.5 bg-[var(--accent-blue)] rounded-full animate-ping" />}
                  </div>
                  <h5 className={`text-[10px] font-black uppercase tracking-tight truncate ${isActive ? 'text-[var(--fg)]' : 'text-zinc-500'}`}>{step.label}</h5>
                  {isActive && step.outputs && (
                    <div className="mt-2 pt-2 border-t border-[var(--border)]/10 space-y-1">
                      {step.outputs.map((out: any) => (
                        <div key={out.name} className="flex justify-between text-[8px] font-bold gap-2">
                          <span className="text-zinc-500 truncate">{out.name}</span>
                          <span className="text-[var(--accent-blue)] shrink-0">{out.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Application Module FSM */}
        <div className="space-y-6 min-w-0">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-[var(--accent-green)]" />
            <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">PICK_BY_LIGHT_FSM</h4>
          </div>
          <div className="space-y-4">
            {data.application.map((step: any, idx: number) => {
              const isActive = appIdx === idx;
              return (
                <motion.div 
                  key={step.id}
                  animate={{ 
                    borderColor: isActive ? 'var(--accent-green)' : 'var(--border)',
                    backgroundColor: isActive ? 'rgba(34, 197, 94, 0.1)' : 'transparent',
                    scale: isActive ? 1.02 : 1
                  }}
                  className="p-3 border-2 rounded-sm relative group/state overflow-hidden min-w-0"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-[9px] font-black ${isActive ? 'text-[var(--accent-green)]' : 'text-zinc-600'}`}>STATE_{step.id.padStart(2, '0')}</span>
                    {isActive && <div className="w-1.5 h-1.5 bg-[var(--accent-green)] rounded-full animate-ping" />}
                  </div>
                  <h5 className={`text-[10px] font-black uppercase tracking-tight truncate ${isActive ? 'text-[var(--fg)]' : 'text-zinc-500'}`}>{step.label}</h5>
                  {isActive && step.outputs && (
                    <div className="mt-2 pt-2 border-t border-[var(--border)]/10 space-y-1">
                      {step.outputs.map((out: any) => (
                        <div key={out.name} className="flex justify-between text-[8px] font-bold gap-2">
                          <span className="text-zinc-500 truncate">{out.name}</span>
                          <span className="text-[var(--accent-green)] shrink-0">{out.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Cross-FSM Links (Dashed Lines) */}
        <div className="absolute inset-0 pointer-events-none overflow-visible hidden sm:block">
          {/* Base 2 -> App 1 */}
          {baseIdx === 2 && (
            <motion.div 
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              className="absolute top-[45%] left-[45%] w-[10%] h-[2px] border-b-2 border-dashed border-[var(--hover-accent)] z-20"
            />
          )}
          {/* App 5 -> Base 3 */}
          {appIdx === 5 && (
            <motion.div 
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              className="absolute top-[85%] left-[45%] w-[10%] h-[2px] border-b-2 border-dashed border-[var(--hover-accent)] z-20"
            />
          )}
        </div>
      </div>

      <div className="mt-auto pt-6 border-t-2 border-[var(--border)] z-10">
        <div className="bg-[var(--fg)]/5 p-4 border border-[var(--border)]/20 rounded-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 bg-[var(--accent-green)] rounded-full" />
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">LIVE_TELEMETRY</span>
          </div>
          <p className="text-[11px] font-bold text-[var(--accent-green)] leading-tight">
            {`> BASE_STATE: ${data.base[baseIdx].label}`}
          </p>
          <p className="text-[11px] font-bold text-[var(--accent-green)] leading-tight mt-1">
            {`> APP_STATE: ${data.application[appIdx].label}`}
          </p>
          <p className="text-[10px] font-medium text-zinc-500 mt-3 italic leading-tight">
            {`// ${data.application[appIdx].description}`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);
  const [activeImpactImageIdx, setActiveImpactImageIdx] = useState<number | null>(null);
  const [activeApproachImageIdx, setActiveApproachImageIdx] = useState<number | null>(null);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const projectIndex = projects.indexOf(project);
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen dynamic-theme-container"
    >
      {/* Hero Header */}
      <div 
        className="relative h-[60vh] min-h-[500px] w-full overflow-hidden border-b-4 border-[var(--border)]"
        style={{ backgroundColor: project.imageBg || 'var(--bg)' }}
      >
        {project.videoThumbnail ? (
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover opacity-50 scale-[1.1]"
            style={{ objectPosition: project.videoPosition || 'center' }}
          >
            <source src={project.videoThumbnail} type="video/mp4" />
          </video>
        ) : (
          <img 
            src={project.image} 
            alt={project.title}
            className={`w-full h-full opacity-50 ${project.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
            style={{ 
              objectPosition: project.imagePosition || 'center',
              transform: project.imageScale ? `scale(${project.imageScale})` : undefined
            }}
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-20">
          <div className="max-w-6xl mx-auto">
            <Link 
              to="/projects" 
              className="btn-mechanical bg-[var(--card-bg)] text-[var(--fg)] mb-10 text-xs"
            >
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Projects
            </Link>
            <div className="flex flex-wrap gap-3 mb-8">
              {project.tags.map(tag => (
                <Badge key={tag} className="bg-[var(--fg)]/10 text-[var(--fg)] border-2 border-[var(--border)]/20 backdrop-blur-md font-black text-[10px] uppercase tracking-widest px-3 py-1">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-[var(--fg)] mb-6 max-w-5xl uppercase">
              {project.title}
            </h1>
            
            {/* Dynamic Tracker Bar */}
            <div className="max-w-md mt-10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Project Status</span>
                <span className="text-xs font-black text-[var(--fg)]">{project.progress}% Complete</span>
              </div>
              <div className="progress-bar-container">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="progress-bar-fill"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1700px] mx-auto py-20 px-8 md:px-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
          {/* Main Content Area (9 columns) */}
          <div className="xl:col-span-9 space-y-20">
            
            {/* Project Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-24 gap-12">
              <div className="lg:col-span-8" />
              <div className="lg:col-span-16">
                <section className="card-mechanical overflow-hidden group cursor-chomper transition-colors duration-300">
                  <div className="p-10 bg-[var(--card-bg)] border-b-2 border-[var(--border)] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[var(--card-bg)] border-2 border-[var(--border)] shadow-[4px_4px_0px_0px_var(--border)]">
                        <Cpu className="w-6 h-6 text-[var(--accent-blue)]" />
                      </div>
                      <h2 className="text-2xl font-black uppercase tracking-tight transition-colors">Project Overview</h2>
                    </div>
                  </div>
                  <div className="p-10 transition-colors duration-300">
                    <p className="text-zinc-500 leading-relaxed text-xl font-medium group-hover:text-[var(--hover-accent)] transition-colors mb-12">
                      {project.subtitle}
                    </p>
                    
                    <div className="grid grid-cols-1 gap-8">
                      <div className="space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-[var(--fg)] border-b-2 border-[var(--border)] pb-2">Technical Focus</h3>
                        <p className="text-sm text-zinc-500 font-medium leading-relaxed group-hover:text-[var(--hover-accent)]/80 transition-colors">
                          {project.approach}
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-[var(--fg)] border-b-2 border-[var(--border)] pb-2">Key Impact</h3>
                        <p className="text-sm text-zinc-500 font-medium leading-relaxed group-hover:text-[var(--hover-accent)]/80 transition-colors">
                          {project.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* The Challenge */}
            <div className="grid grid-cols-1 lg:grid-cols-24 gap-12">
              <div className="lg:col-span-8" />
              <div className="lg:col-span-16">
                <section className="card-mechanical overflow-hidden group cursor-chomper transition-colors duration-300">
                  <div className="p-10 bg-[var(--card-bg)] border-b-2 border-[var(--border)] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[var(--card-bg)] border-2 border-[var(--border)] shadow-[4px_4px_0px_0px_var(--border)]">
                        <Target className="w-6 h-6 text-[var(--accent-red)]" />
                      </div>
                      <h2 className="text-2xl font-black uppercase tracking-tight transition-colors">The Challenge</h2>
                    </div>
                  </div>
                  <div className="p-10 transition-colors duration-300">
                    <p className="text-zinc-500 leading-relaxed text-xl font-medium group-hover:text-[var(--hover-accent)] transition-colors">
                      {project.challenge}
                    </p>
                  </div>
                </section>
              </div>
            </div>

            {/* Approach */}
            <div className="grid grid-cols-1 lg:grid-cols-24 gap-12">
              <div className="lg:col-span-8" />
              <div className="lg:col-span-16">
                <section className={`card-mechanical overflow-hidden group cursor-chomper transition-all duration-300 relative ${activeApproachImageIdx !== null ? 'min-h-[500px] md:min-h-[600px]' : ''}`}>
                  <div className="p-10 bg-[var(--card-bg)] border-b-2 border-[var(--border)] transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-[var(--card-bg)] border-2 border-[var(--border)] shadow-[4px_4px_0px_0px_var(--border)]">
                          <Lightbulb className="w-6 h-6 text-[var(--accent-blue)]" />
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tight transition-colors">Approach & Methodology</h2>
                      </div>
                      {project.approachImages && project.approachImages.length > 0 && (
                        <button 
                          onClick={() => setActiveApproachImageIdx(0)}
                          className="p-3 bg-[var(--card-bg)] border-2 border-[var(--border)] hover:border-[var(--hover-accent)] hover:text-[var(--hover-accent)] transition-all shadow-[4px_4px_0px_0px_var(--border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                          title="View Approach Media"
                        >
                          <ArrowRight className="w-6 h-6" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="p-10 transition-colors duration-300">
                    <p className="text-zinc-500 leading-relaxed text-xl font-medium group-hover:text-[var(--hover-accent)] transition-colors">
                      {project.approach}
                    </p>
                  </div>

                  {/* Approach Image Overlay */}
                  <AnimatePresence>
                    {activeApproachImageIdx !== null && project.approachImages && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 bg-[var(--card-bg)] flex flex-col"
                      >
                        <button 
                          onClick={() => setActiveApproachImageIdx(null)}
                          className="absolute top-4 right-4 z-30 p-2 bg-[var(--card-bg)]/80 backdrop-blur-md border-2 border-[var(--border)] hover:text-[var(--accent-red)] transition-colors shadow-[4px_4px_0px_0px_var(--border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                        >
                          <X className="w-5 h-5" />
                        </button>

                        {project.approachImages.length > 1 && (
                          <button 
                            onClick={() => setActiveApproachImageIdx((activeApproachImageIdx + 1) % project.approachImages!.length)}
                            className="absolute bottom-4 right-4 z-30 p-2 bg-[var(--card-bg)]/80 backdrop-blur-md border-2 border-[var(--border)] hover:text-[var(--hover-accent)] transition-colors shadow-[4px_4px_0px_0px_var(--border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                          >
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        )}

                        <div className="flex-grow relative overflow-hidden bg-white flex items-center justify-center p-8">
                          <img 
                            src={project.approachImages[activeApproachImageIdx]} 
                            alt="Approach process"
                            className="max-w-full max-h-full object-contain shadow-2xl"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>
              </div>
            </div>

            {/* Impact */}
            <div className="grid grid-cols-1 lg:grid-cols-24 gap-12">
              <div className="lg:col-span-8" />
              <div className="lg:col-span-16">
                <section className={`card-mechanical overflow-hidden group cursor-chomper transition-all duration-300 relative ${activeImpactImageIdx !== null ? 'min-h-[500px] md:min-h-[600px]' : ''}`}>
                  <div className="p-10 bg-[var(--card-bg)] border-b-2 border-[var(--border)]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white border-2 border-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                          <Zap className="w-6 h-6 text-zinc-900" />
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tight transition-colors">Impact & Results</h2>
                      </div>
                      {project.impactImages && project.impactImages.length > 0 && (
                        <button 
                          onClick={() => setActiveImpactImageIdx(0)}
                          className="p-3 bg-[var(--card-bg)] border-2 border-[var(--border)] hover:border-[var(--hover-accent)] hover:text-[var(--hover-accent)] transition-all shadow-[4px_4px_0px_0px_var(--border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                          title="View Impact Media"
                        >
                          <ArrowRight className="w-6 h-6" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="p-10 transition-colors duration-300">
                    <p className="text-zinc-500 leading-relaxed text-xl font-medium group-hover:text-[var(--hover-accent)] transition-colors">
                      {project.impact}
                    </p>
                  </div>

                  {/* Impact Image Overlay */}
                  <AnimatePresence>
                    {activeImpactImageIdx !== null && project.impactImages && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 bg-[var(--card-bg)] flex flex-col"
                      >
                        <button 
                          onClick={() => setActiveImpactImageIdx(null)}
                          className="absolute top-4 right-4 z-30 p-2 bg-[var(--card-bg)]/80 backdrop-blur-md border-2 border-[var(--border)] hover:text-[var(--accent-red)] transition-colors shadow-[4px_4px_0px_0px_var(--border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                        >
                          <X className="w-5 h-5" />
                        </button>

                        {project.impactImages.length > 1 && (
                          <button 
                            onClick={() => setActiveImpactImageIdx((activeImpactImageIdx + 1) % project.impactImages!.length)}
                            className="absolute bottom-4 right-4 z-30 p-2 bg-[var(--card-bg)]/80 backdrop-blur-md border-2 border-[var(--border)] hover:text-[var(--hover-accent)] transition-colors shadow-[4px_4px_0px_0px_var(--border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                          >
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        )}

                        <div className="flex-grow relative overflow-hidden bg-white flex items-center justify-center p-8">
                          <img 
                            src={project.impactImages[activeImpactImageIdx]} 
                            alt="Impact result"
                            className="max-w-full max-h-full object-contain shadow-2xl"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>
              </div>
            </div>

            {/* Deeper Dive Header */}
            {(project.videoUrl || (project.detailedSections && project.detailedSections.length > 0)) && (
              <div className="grid grid-cols-1 lg:grid-cols-24 gap-12">
                <div className="lg:col-span-8" />
                <div className="lg:col-span-16">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="py-12 flex flex-col items-start"
                  >
                    <div className="flex items-center gap-6 mb-4">
                      <div className="h-1 w-12 md:w-20 bg-[var(--hover-accent)]" />
                      <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[var(--fg)]">
                        A Deeper Dive
                      </h2>
                      <div className="h-1 w-12 md:w-20 bg-[var(--hover-accent)]" />
                    </div>
                    <div className="flex gap-3">
                  </motion.div>
                </div>
              </div>
            )}

            {project.videoUrl && (
              <div className="grid grid-cols-1 lg:grid-cols-24 gap-12">
                <div className="lg:col-span-8" />
                <div className="lg:col-span-16">
                  <section className="card-mechanical overflow-hidden group cursor-chomper transition-colors duration-300">
                    <div className="p-10 bg-[var(--card-bg)] border-b-2 border-[var(--border)] transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-[var(--card-bg)] border-2 border-[var(--border)] shadow-[4px_4px_0px_0px_var(--border)]">
                          <Zap className="w-6 h-6 text-[var(--hover-accent)]" />
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tight transition-colors">Project Demonstration</h2>
                      </div>
                    </div>
                    <div className="p-10 transition-colors duration-300">
                      <div className="aspect-video w-full border-4 border-[var(--border)] shadow-[8px_8px_0px_0px_var(--pixel-dot)] overflow-hidden">
                        <iframe
                          src={project.videoUrl}
                          title={`${project.title} Video`}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            )}

            {project.detailedSections?.map((section, sIdx) => {
              const isDetailedFSM = !!section.detailedFSM;
              
              return (
                <div key={sIdx} className="grid grid-cols-1 lg:grid-cols-24 gap-12 py-12">
                  <div className="lg:col-span-8">
                    {isDetailedFSM && (
                      <div className="sticky top-20">
                        <DetailedFSMVisualization data={section.detailedFSM!} />
                      </div>
                    )}
                    {section.fsmSteps && (
                      <div className="sticky top-20">
                        <FSMVisualization steps={section.fsmSteps} />
                      </div>
                    )}
                  </div>
                  <div className="lg:col-span-16">
                    <section className="card-mechanical overflow-hidden group cursor-chomper transition-colors duration-300">
                      <div className="p-10 bg-[var(--card-bg)] border-b-2 border-[var(--border)] transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-[var(--card-bg)] border-2 border-[var(--border)] shadow-[4px_4px_0px_0px_var(--border)]">
                            <ChevronRight className="w-6 h-6 text-[var(--accent-blue)]" />
                          </div>
                          <h2 className="text-2xl font-black uppercase tracking-tight transition-colors">{section.title}</h2>
                        </div>
                      </div>

                      <div className="p-10 transition-colors duration-300">
                        <div className={section.fsmSteps ? "grid grid-cols-1 gap-12" : ""}>
                          <div>
                            <p className="text-zinc-500 leading-relaxed text-xl font-medium group-hover:text-[var(--hover-accent)] transition-colors mb-8">
                              {section.content}
                            </p>

                            {section.overview && (
                              <div className="space-y-12 mb-12">
                                <div className="grid grid-cols-1 gap-6">
                                  {[
                                    { label: 'What', value: section.overview.what, color: 'var(--accent-blue)' },
                                    { label: 'Why', value: section.overview.why, color: 'var(--accent-red)' },
                                    { label: 'How', value: section.overview.how, color: 'var(--hover-accent)' },
                                    { label: 'Outcome', value: section.overview.outcome, color: 'var(--accent-green)' }
                                  ].map((item) => (
                                  <div key={item.label} className="card-mechanical p-8 bg-[var(--card-bg)] border-2 border-[var(--border)] group/item hover:border-[var(--hover-accent)] transition-all">
                                    <h4 className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: item.color }}>
                                      {item.label}
                                    </h4>
                                    <p className="text-base font-bold text-zinc-500 leading-relaxed group-hover/item:text-[var(--hover-accent)] transition-colors">
                                      {item.value}
                                    </p>
                                  </div>
                                  ))}
                                </div>

                                <div className="space-y-4">
                                  <div className="card-mechanical p-8 bg-[var(--card-bg)] border-l-8 border-l-[var(--accent-blue)] border-2 border-[var(--border)] group/prob">
                                    <h4 className="text-lg font-black uppercase tracking-tight text-[var(--fg)] mb-3 transition-colors">
                                      The Problem
                                    </h4>
                                    <p className="text-sm text-zinc-500 font-medium leading-relaxed group-hover/prob:text-[var(--hover-accent)] transition-colors">
                                      {section.overview.problem}
                                    </p>
                                  </div>
                                  <div className="card-mechanical p-8 bg-[var(--card-bg)] border-l-8 border-l-[var(--accent-red)] border-2 border-[var(--border)] group/const">
                                    <h4 className="text-lg font-black uppercase tracking-tight text-[var(--fg)] mb-3 transition-colors">
                                      The Constraints
                                    </h4>
                                    <p className="text-sm text-zinc-500 font-medium leading-relaxed group-hover/const:text-[var(--hover-accent)] transition-colors">
                                      {section.overview.constraints}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {section.cards && (
                              <div className="grid grid-cols-1 gap-4 mb-12">
                                {section.cards.map((card, cIdx) => (
                                  <div key={cIdx} className="card-mechanical p-6 bg-[var(--card-bg)] border-2 border-[var(--border)] group/card hover:border-[var(--hover-accent)] transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                      <h4 className="text-sm font-black uppercase tracking-tight text-[var(--fg)] transition-colors">
                                        {card.title}
                                      </h4>
                                      {card.badge && (
                                        <Badge className="bg-[var(--fg)]/5 text-[var(--fg)] border border-[var(--border)]/20 text-[8px] font-black uppercase px-2 py-0">
                                          {card.badge}
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-xs text-zinc-500 font-medium leading-relaxed group-hover/card:text-[var(--hover-accent)]/80 transition-colors">
                                      {card.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {section.highlight && (
                              <div className={`mb-12 p-6 border-l-8 border-2 bg-[var(--card-bg)] card-mechanical group/highlight transition-all hover:border-[var(--hover-accent)] ${
                                section.highlight.type === 'success' ? 'border-l-[var(--accent-green)] border-[var(--border)]' :
                                section.highlight.type === 'warning' ? 'border-l-[var(--accent-red)] border-[var(--border)]' :
                                'border-l-[var(--accent-blue)] border-[var(--border)]'
                              }`}>
                                <h4 className="text-xs font-black uppercase tracking-widest mb-2 text-[var(--fg)] transition-colors">
                                  {section.highlight.title}
                                </h4>
                                <p className="text-lg font-bold text-zinc-500 leading-tight transition-colors group-hover/highlight:text-[var(--hover-accent)]">
                                  {section.highlight.content}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {section.steps && (
                          <div className="space-y-4 mb-12 relative">
                            <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-[var(--border)] opacity-20 hidden md:block" />
                            {section.steps.map((step, idx) => (
                              <StepCard key={idx} step={step} idx={idx} />
                            ))}
                          </div>
                        )}
                        {section.image && (
                          <div className="space-y-4">
                            <div className="border-4 border-[var(--border)] shadow-[8px_8px_0px_0px_var(--pixel-dot)] overflow-hidden">
                              <img 
                                src={section.image} 
                                alt={section.title}
                                className="w-full h-auto object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            {section.caption && (
                              <p className="text-sm font-mono font-bold text-zinc-500 uppercase tracking-widest group-hover:text-[var(--hover-accent)] transition-colors">
                                // {section.caption}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </section>
                  </div>
                </div>
              );
            })}

            {project.reflection && (
              <div className="grid grid-cols-1 lg:grid-cols-24 gap-12 py-12">
                <div className="lg:col-span-8" />
                <div className="lg:col-span-16">
                  <section className="card-mechanical overflow-hidden group cursor-chomper transition-colors duration-300">
                    <div className="p-10 bg-[var(--card-bg)] border-b-2 border-[var(--border)] transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-[var(--card-bg)] border-2 border-[var(--border)] shadow-[4px_4px_0px_0px_var(--border)]">
                          <FileText className="w-6 h-6 text-[var(--accent-blue)]" />
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tight transition-colors">{project.reflection.title}</h2>
                      </div>
                    </div>
                    <div className="p-10 transition-colors duration-300 space-y-12">
                      {project.reflection.sections.map((section, idx) => (
                        <div key={idx} className="space-y-4">
                          <h3 className="text-lg font-black uppercase tracking-tight text-[var(--fg)] border-b-2 border-[var(--border)] pb-2">
                            {section.title}
                          </h3>
                          <p className="text-sm text-zinc-500 font-medium leading-relaxed group-hover:text-[var(--hover-accent)] transition-colors">
                            {section.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Column (3 columns) */}
          <div className="xl:col-span-3 space-y-12">
            <div className="card-mechanical overflow-hidden bg-[var(--card-bg)] group cursor-chomper transition-colors duration-300">
              <div className="p-8 bg-[var(--card-bg)] border-b-2 border-[var(--border)]">
                <h3 className="text-xs font-black uppercase tracking-widest border-b-2 border-[var(--border)] pb-2 transition-colors">Technical Specs</h3>
              </div>
              <div className="p-8 transition-colors duration-300 space-y-8">
                <div>
                  <h4 className="text-xs font-black text-[var(--fg)] mb-4 uppercase transition-colors">Core Competencies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <Badge key={tag} className="bg-white text-zinc-900 border-2 border-zinc-900 text-[10px] font-black uppercase group-hover:bg-[var(--hover-accent)] group-hover:text-black transition-colors">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator className="bg-zinc-900/10" />
                <div>
                  <h4 className="text-xs font-black text-[var(--fg)] mb-4 uppercase transition-colors">Documentation</h4>
                  <p className="text-xs text-[var(--fg)] leading-relaxed font-bold mb-6 transition-colors group-hover:text-[var(--hover-accent)]">
                    Full technical reports, CAD models, and FEA simulations available upon request.
                  </p>
                  {project.posterUrl && (
                    <a 
                      href={project.posterUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-mechanical !bg-white !text-zinc-900 w-full flex items-center justify-center gap-3 group/btn"
                    >
                      <FileText className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                      Download Poster (PDF)
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Next Project Hint */}
            <div className="card-mechanical p-8 bg-[var(--card-bg)] border-2 border-[var(--border)] group/next cursor-pointer" onClick={() => navigate(`/projects/${nextProject.id}`)}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black text-zinc-500 uppercase tracking-widest">Next Project</span>
                <ArrowRight className="w-5 h-5 text-[var(--accent-blue)] group-hover/next:translate-x-2 transition-transform" />
              </div>
              <h4 className="text-xl font-black uppercase tracking-tight text-[var(--fg)] group-hover/next:text-[var(--accent-blue)] transition-colors">
                {nextProject.title}
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Context Indicator for Capstone */}
      {project.id === 'capstone-test-rig' && (
        <div className="fixed bottom-8 right-8 z-50 hidden lg:block max-w-[420px]">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="card-mechanical p-4 bg-[var(--card-bg)]/95 backdrop-blur-md border-2 border-[var(--border)] shadow-[8px_8px_0px_0px_var(--pixel-dot)]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--accent-red)] animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">System Context</span>
              </div>
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`w-1 h-2 ${i < 3 ? 'bg-[var(--accent-green)]' : 'bg-zinc-700'} opacity-50`} />
                ))}
              </div>
            </div>
            
            {/* Context Video */}
            <div className="aspect-video w-full border-2 border-[var(--border)] mb-3 overflow-hidden bg-black relative group/vid">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover opacity-80 group-hover/vid:opacity-100 transition-opacity"
              >
                <source src="/qis_context.mp4" type="video/mp4" />
                {/* Fallback for preview if file not yet uploaded */}
                <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-background-with-blue-lines-41205-large.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
              <div className="absolute top-2 right-2">
                <span className="text-[8px] font-mono text-white/40 uppercase">REC ●</span>
              </div>
              <div className="absolute bottom-2 left-2">
                <span className="text-[8px] font-mono text-white/80 uppercase tracking-tighter">Live Feed: QIS_UNIT_01</span>
              </div>
            </div>

            <p className="text-xs font-black uppercase tracking-tight text-[var(--fg)] leading-tight">
              Context: ARTMS QUANTM Irradiation System (QIS™)
            </p>
            
            <div className="mt-3 h-1 bg-zinc-200 overflow-hidden relative">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="absolute inset-0 w-full bg-[var(--accent-blue)] opacity-30"
                style={{ 
                  backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)' 
                }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

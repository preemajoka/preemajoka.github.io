import { resumeData } from '@/resumeData';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  GraduationCap, 
  Briefcase, 
  Wrench, 
  Code, 
  Award, 
  MapPin, 
  Settings,
  Download,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ProfilePage() {
  return (
    <div className="dynamic-theme-container">
      <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Resume Header */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 card-mechanical p-10 bg-[var(--card-bg)] relative overflow-hidden"
      >
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase text-[var(--fg)]">
            Resume
          </h1>
          <div className="flex flex-wrap gap-4 mb-8">
            <Badge className="px-4 py-1.5 text-sm font-bold bg-[var(--card-bg)] text-[var(--fg)] border-2 border-[var(--border)] shadow-[2px_2px_0px_0px_var(--border)]">
              <MapPin className="w-4 h-4 mr-2" /> {resumeData.education.school}
            </Badge>
            <Badge className="px-4 py-1.5 text-sm font-bold bg-[var(--card-bg)] text-[var(--fg)] border-2 border-[var(--border)] shadow-[2px_2px_0px_0px_var(--border)]">
              <GraduationCap className="w-4 h-4 mr-2" /> Class of 2026
            </Badge>
          </div>

          <div className="flex flex-wrap gap-6">
            <a 
              href="/Preeyansh_Arora_Majoka_Resume.pdf" 
              download 
              target="_blank"
              rel="noopener noreferrer"
              className="btn-mechanical !bg-[var(--bg)] !text-[var(--fg)] flex items-center gap-3 group"
            >
              <Download className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
              Download Resume (PDF)
            </a>
            <a 
              href="/Preeyansh_Arora_Majoka_Mechanical_Portfolio.pdf" 
              download 
              target="_blank"
              rel="noopener noreferrer"
              className="btn-mechanical !bg-[var(--hover-accent)] !text-[var(--fg)] flex items-center gap-3 group"
            >
              <FileText className="w-5 h-5 transition-transform group-hover:scale-110" />
              Mechanical Design Portfolio (PDF)
            </a>
          </div>
        </div>
        
        {/* Decorative Background Icon */}
        <FileText className="absolute -right-8 -bottom-8 w-64 h-64 opacity-10 rotate-12 pointer-events-none" />
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Experience & Projects */}
        <div className="lg:col-span-2 space-y-16">
          
          {/* Experience */}
          <section>
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-[var(--card-bg)] border-2 border-[var(--border)] shadow-[4px_4px_0px_0px_var(--border)]">
                <Briefcase className="w-6 h-6 text-[var(--accent-red)]" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">Professional Experience</h2>
            </div>
            <div className="space-y-12">
              {resumeData.experience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="card-mechanical overflow-hidden group cursor-chomper transition-colors"
                >
                  <div className="p-8 bg-[var(--card-bg)] border-b-2 border-[var(--border)] transition-colors">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div>
                        <h3 className="text-xl font-black text-[var(--fg)] uppercase tracking-tight">{exp.role}</h3>
                        <div className="text-[var(--accent-blue)] font-bold text-lg mt-1">
                          {exp.company}
                        </div>
                      </div>
                      <span className="text-sm font-mono font-bold text-zinc-500 bg-[var(--pixel-dot)] border-2 border-[var(--border)] px-3 py-1 uppercase tracking-tighter shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] group-hover:text-[var(--hover-accent)] transition-colors">
                        {exp.date}
                      </span>
                    </div>
                    <div className="text-zinc-500 font-bold mt-4 flex items-center gap-2 text-sm uppercase group-hover:text-[var(--hover-accent)] transition-colors">
                      <MapPin className="w-4 h-4" /> {exp.location}
                    </div>
                  </div>
                  <div className="p-8 transition-colors duration-300">
                    <ul className="space-y-4">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-zinc-400 text-base leading-relaxed flex items-start transition-colors group-hover:text-[var(--hover-accent)]">
                          <span className="mr-4 mt-2 w-2 h-2 bg-[var(--fg)] flex-shrink-0 transition-colors group-hover:bg-[var(--hover-accent)]" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Design Teams */}
          <section>
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-[var(--card-bg)] border-2 border-[var(--border)] shadow-[4px_4px_0px_0px_var(--border)]">
                <Award className="w-6 h-6 text-[var(--accent-green)]" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">Leadership & Design Teams</h2>
            </div>
            <div className="space-y-12">
              {resumeData.projects.map((proj, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="card-mechanical overflow-hidden group cursor-chomper transition-colors"
                >
                  <div className="p-8 bg-[var(--card-bg)] border-b-2 border-[var(--border)] transition-colors">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div>
                        <h3 className="text-xl font-black text-[var(--fg)] uppercase tracking-tight">{proj.role}</h3>
                        <div className="text-[var(--accent-red)] font-bold text-lg mt-1">{proj.name}</div>
                      </div>
                      <span className="text-sm font-mono font-bold text-zinc-500 bg-[var(--pixel-dot)] border-2 border-[var(--border)] px-3 py-1 uppercase tracking-tighter shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] group-hover:text-[var(--hover-accent)] transition-colors">
                        {proj.date}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 transition-colors duration-300">
                    <ul className="space-y-4">
                      {proj.highlights.map((h, i) => (
                        <li key={i} className="text-zinc-400 text-base leading-relaxed flex items-start transition-colors group-hover:text-[var(--hover-accent)]">
                          <span className="mr-4 mt-2 w-2 h-2 bg-[var(--fg)] flex-shrink-0 transition-colors group-hover:bg-[var(--hover-accent)]" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Sidebar */}
        <div className="space-y-12">
          {/* Education */}
          <section className="card-mechanical overflow-hidden bg-[var(--card-bg)] group cursor-chomper">
            <div className="p-8 bg-[var(--card-bg)] border-b-2 border-[var(--border)]">
              <h2 className="text-lg font-black uppercase tracking-widest border-b-2 border-[var(--border)] pb-2">Education</h2>
              <div className="mt-6">
                <h3 className="font-black text-[var(--fg)] text-xl uppercase leading-tight">{resumeData.education.school}</h3>
                <p className="text-zinc-500 font-bold mt-2 group-hover:text-[var(--hover-accent)] transition-colors">{resumeData.education.degree}</p>
                <p className="text-sm font-mono font-bold text-zinc-500 mt-2 bg-[var(--pixel-dot)] inline-block px-2 py-1 border border-[var(--border)] group-hover:text-[var(--hover-accent)] transition-colors">
                  {resumeData.education.date}
                </p>
              </div>
            </div>
            <div className="p-8 transition-colors duration-300">
              <p className="text-sm text-zinc-500 italic leading-relaxed font-medium transition-colors group-hover:text-[var(--hover-accent)]">
                {resumeData.education.honors}
              </p>
              <div className="pt-4">
                <h4 className="text-xs font-black uppercase text-[var(--fg)] mb-3 transition-colors">Key Coursework</h4>
                <div className="flex flex-wrap gap-2">
                  {resumeData.education.courses.map(course => (
                    <Badge key={course} className="bg-white text-zinc-900 border-2 border-[var(--border)] font-bold text-[10px] uppercase group-hover:bg-[var(--hover-accent)] group-hover:text-black transition-colors">
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Technical Skills */}
          <section className="space-y-8">
            <div className="card-mechanical p-6 group cursor-chomper">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-5 h-5 text-[var(--accent-blue)]" />
                <h2 className="text-sm font-black uppercase tracking-widest">Mechanical</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.mechanical.map(skill => (
                  <Badge key={skill} className="bg-[var(--fg)] text-[var(--bg)] text-[10px] py-1 px-3 uppercase font-bold group-hover:bg-[var(--hover-accent)] group-hover:text-black transition-colors">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="card-mechanical p-6 group cursor-chomper">
              <div className="flex items-center gap-3 mb-6">
                <Wrench className="w-5 h-5 text-[var(--accent-red)]" />
                <h2 className="text-sm font-black uppercase tracking-widest">Manufacturing</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.manufacturing.map(skill => (
                  <Badge key={skill} className="bg-[var(--card-bg)] text-[var(--fg)] border-2 border-[var(--border)] text-[10px] py-1 px-3 uppercase font-bold group-hover:bg-[var(--hover-accent)] group-hover:text-black transition-colors">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="card-mechanical p-6 group cursor-chomper">
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-5 h-5 text-[var(--accent-green)]" />
                <h2 className="text-sm font-black uppercase tracking-widest">Software & HW</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.softwareHardware.map(skill => (
                  <Badge key={skill} className="bg-[var(--pixel-dot)] text-zinc-500 border-2 border-[var(--border)] text-[10px] py-1 px-3 uppercase font-bold group-hover:bg-[var(--hover-accent)] group-hover:text-black transition-colors">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      </div>
    </div>
  );
}


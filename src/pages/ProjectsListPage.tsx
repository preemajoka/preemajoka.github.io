import { projects } from '@/projectsData';
import ProjectCard from '@/components/ProjectCard';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ArrowUpDown, Calendar } from 'lucide-react';

export default function ProjectsListPage() {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedProjects = [...projects].sort((a, b) => {
    const dateA = new Date(a.completionDate).getTime();
    const dateB = new Date(b.completionDate).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[var(--fg)] mb-6 uppercase">
            Engineering <span className="text-[var(--accent-green)]">Portfolio</span>
          </h1>
          <p className="text-2xl text-zinc-500 font-medium max-w-2xl leading-tight">
            A collection of mechanical design, mechatronics, and manufacturing projects from university and internships.
          </p>
        </div>

        {/* Sorting Controls */}
        <div className="flex items-center justify-center md:justify-end gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-[var(--card-bg)] border-2 border-[var(--border)] shadow-[4px_4px_0px_0px_var(--border)]">
            <Calendar className="w-4 h-4 text-[var(--accent-green)]" />
            <span className="text-xs font-black uppercase tracking-widest">Sort by Date</span>
          </div>
          <button 
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="btn-mechanical !py-2 !px-4 flex items-center gap-2 group"
          >
            <ArrowUpDown className={`w-4 h-4 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
            <span className="text-xs font-black uppercase tracking-widest">
              {sortOrder === 'asc' ? 'Oldest First' : 'Newest First'}
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {sortedProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}

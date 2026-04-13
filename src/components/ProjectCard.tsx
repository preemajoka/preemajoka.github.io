import React from 'react';
import { Project } from '@/projectsData';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/projects/${project.id}`} className="group cursor-chomper block h-full">
        <Card className="card-mechanical overflow-hidden h-full flex flex-col transition-colors duration-300">
          <div 
            className="aspect-video relative overflow-hidden border-b-4 border-[var(--border)]"
            style={{ backgroundColor: project.imageBg || 'var(--pixel-dot)' }}
          >
            {project.videoThumbnail ? (
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                preload="auto"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                style={{ 
                  objectPosition: project.videoPosition || 'center',
                  transform: `scale(${project.videoScale || 1.05})`
                }}
              >
                <source src={project.videoThumbnail} />
                {/* Fallback for browsers that don't support video tag */}
                <img 
                  src={project.image} 
                  alt={project.title}
                  className={`w-full h-full ${project.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                  referrerPolicy="no-referrer"
                />
              </video>
            ) : (
              <img 
                src={project.image} 
                alt={project.title}
                className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${project.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                style={{ 
                  objectPosition: project.imagePosition || 'center',
                  transform: project.imageScale ? `scale(${project.imageScale})` : undefined
                }}
                referrerPolicy="no-referrer"
              />
            )}
            <div className="absolute top-4 left-4">
              <div className="p-2 bg-[var(--card-bg)] border-2 border-[var(--border)] shadow-[2px_2px_0px_0px_var(--border)]">
                <Icon className="w-5 h-5 text-[var(--fg)]" />
              </div>
            </div>
          </div>
          <div className="flex-grow flex flex-col transition-colors duration-300">
            <CardHeader className="p-6 bg-[var(--card-bg)] border-b-2 border-[var(--border)] transition-colors">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} className="bg-[var(--pixel-dot)] text-[var(--fg)] border-2 border-[var(--border)] font-black text-[10px] uppercase tracking-wider group-hover:bg-[var(--accent-yellow)] group-hover:text-black transition-colors">
                    {tag}
                  </Badge>
                ))}
              </div>
              <CardTitle className="text-xl font-black leading-tight text-[var(--fg)] uppercase tracking-tight">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardDescription className="text-zinc-500 group-hover:text-[var(--accent-yellow)] line-clamp-2 font-medium transition-colors">
                {project.subtitle}
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0 mt-auto">
              <div className="w-full">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-[var(--accent-yellow)] transition-colors">Completion</span>
                  <span className="text-[10px] font-black text-[var(--fg)] group-hover:text-[var(--accent-yellow)] transition-colors">{project.progress}%</span>
                </div>
                <div className="progress-bar-container">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    className="progress-bar-fill"
                  />
                </div>
                <div className="flex items-center text-sm font-black text-[var(--fg)] group-hover:text-[var(--accent-yellow)] mt-6 uppercase tracking-widest transition-colors">
                  View Specs
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </CardFooter>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;

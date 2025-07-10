import { createSupabaseServerClient } from '@/utils/supabase/server';
import { Github, Globe, Rocket, Star, Terminal } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const statusColors: { [key: string]: string } = {
  completed: 'text-accent-cyan',
  'in-progress': 'text-accent-pink',
  planned: 'text-accent-amber',
  default: 'text-gray-400',
};

const page = async () => {
  const supabase = await createSupabaseServerClient();
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
  }

  return (
    <>
      <div className='fixed bg-dots min-h-screen w-full'></div>

      <div className='relative max-w-6xl mx-auto px-4 py-30 space-y-10'>
        <div className='card p-5 space-y-2'>
          <div className='flex items-center gap-2'>
            <Terminal className='icon-primary' />
            <h1>missions.log</h1>
          </div>
          <p className='card-text text-accent-pink'>System Status: Active</p>
          <p className='card-text text-accent-pink'>Mission Count: 3</p>
          <p className='card-text text-accent-pink'>Sector: Development_Zone</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          {projects?.map((project) => (
            <div
              key={project.id}
              className='card p-5 flex flex-col justify-between hover-border-accent-pink'
            >
              <div className='flex items-center gap-2'>
                <Rocket className='icon-primary' />
                <h2>{project.name}</h2>
                <p
                  className={`ml-auto text-2xl ${
                    statusColors[project.status] || statusColors.default
                  }`}
                >
                  [{project.status}]
                </p>
              </div>
              <p>{project.description}</p>
              <h2 className='text-accent-pink mt-5 mb-2'>Tech Stack:</h2>
              <ul className='flex flex-wrap gap-2'>
                {project.tech_stack?.map((tech: string) => (
                  <li key={tech} className='tag flex items-center gap-2'>
                    <Star className='icon-primary w-3 h-3' />
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
              <div className='flex flex-row gap-5 mt-5'>
                <Link
                  href={project.repo_url}
                  className='btn btn-primary flex items-center gap-2'
                >
                  <Github className='text-white' /> View Code
                </Link>
                <Link
                  href={project.demo_url}
                  className='btn btn-secondary flex items-center gap-2'
                >
                  <Globe className='text-white' /> Live Demo
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;

import { Github, Globe, Rocket, Star, Terminal } from 'lucide-react';
import React from 'react';

const page = () => {
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
          <div className='card p-5 space-y-2 hover-border-accent-pink'>
            <div className='flex items-center gap-2'>
              <Rocket className='icon-primary' />
              <h2>Project_Alpha</h2>
              <p className='ml-auto text-accent-cyan text-2xl'>[completed]</p>
            </div>
            <p>
              A neural interface for seamless human-computer interaction.
              Features advanced AI algorithms and real-time data processing.
            </p>
            <h2 className='text-accent-pink mt-5'>Tech Stack:</h2>
            <ul className='flex flex-wrap gap-2'>
              <li className='tag flex items-center gap-2'>
                <Star className='icon-primary w-3 h-3' />
                <span>React</span>
              </li>
              <li className='tag flex items-center gap-2'>
                <Star className='icon-primary w-3 h-3' />
                Next.js
              </li>
              <li className='tag flex items-center gap-2'>
                <Star className='icon-primary w-3 h-3' />
                Tailwind CSS
              </li>
              <li className='tag flex items-center gap-2'>
                <Star className='icon-primary w-3 h-3' />
                TypeScript
              </li>
            </ul>
            <div className='flex flex-row gap-5 mt-5'>
              <button className='btn btn-primary flex items-center gap-2'>
                <Github className='text-white' /> View Code
              </button>
              <button className='btn btn-secondary flex items-center gap-2'>
                <Globe className='text-white' /> Live Demo
              </button>
            </div>
          </div>
          <div className='card p-5 space-y-2 hover-border-accent-pink'>
            <div className='flex items-center gap-2'>
              <Rocket className='icon-primary' />
              <h2>Cyber_Matrix</h2>
              <p className='ml-auto text-accent-amber text-2xl'>
                [in-progress]
              </p>
            </div>
            <p>
              Decentralized platform for secure data transmission. Implements
              cutting-edge encryption protocols.
            </p>
            <h2 className='text-accent-pink mt-5'>Tech Stack:</h2>
            <ul className='flex flex-wrap gap-2'>
              <li className='tag flex items-center gap-2'>
                <Star className='icon-primary w-3 h-3' />
                <span>Next.js</span>
              </li>
              <li className='tag flex items-center gap-2'>
                <Star className='icon-primary w-3 h-3' />
                Node.js
              </li>
              <li className='tag flex items-center gap-2'>
                <Star className='icon-primary w-3 h-3' />
                WebAssembly
              </li>
              <li className='tag flex items-center gap-2'>
                <Star className='icon-primary w-3 h-3' />
                Rust
              </li>
            </ul>
            <div className='flex flex-row gap-5 mt-5'>
              <button className='btn btn-primary flex items-center gap-2'>
                <Github className='text-white' /> View Code
              </button>
              <button className='btn btn-secondary flex items-center gap-2'>
                <Globe className='text-white' /> Live Demo
              </button>
            </div>
          </div>
          <div className='card p-5 space-y-2 hover-border-accent-pink'>
            <div className='flex items-center gap-2'>
              <Rocket className='icon-primary' />
              <h2>Cyber_Matrix</h2>
              <p className='ml-auto text-accent-amber text-2xl'>
                [in-progress]
              </p>
            </div>
            <p>
              Decentralized platform for secure data transmission. Implements
              cutting-edge encryption protocols.
            </p>
            <h2 className='text-accent-pink mt-5'>Tech Stack:</h2>
            <ul className='flex flex-wrap gap-2'>
              <li className='tag flex items-center gap-2'>
                <Star className='icon-primary w-3 h-3' />
                <span>Next.js</span>
              </li>
              <li className='tag flex items-center gap-2'>
                <Star className='icon-primary w-3 h-3' />
                Node.js
              </li>
              <li className='tag flex items-center gap-2'>
                <Star className='icon-primary w-3 h-3' />
                WebAssembly
              </li>
              <li className='tag flex items-center gap-2'>
                <Star className='icon-primary w-3 h-3' />
                Rust
              </li>
            </ul>
            <div className='flex flex-row gap-5 mt-5'>
              <button className='btn btn-primary flex items-center gap-2'>
                <Github className='text-white' /> View Code
              </button>
              <button className='btn btn-secondary flex items-center gap-2'>
                <Globe className='text-white' /> Live Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

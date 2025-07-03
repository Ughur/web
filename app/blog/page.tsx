import {
  ChevronRight,
  Calendar,
  Clock,
  Cpu,
  Tag,
  Terminal,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <>
      <div className='fixed bg-dots min-h-screen w-full'></div>
      <div className='relative max-w-5xl mx-auto px-4 py-30 space-y-10'>
        <div className='card p-5 space-y-2'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2 mb-3'>
              <Terminal className='icon-primary' />
              <h1 className='text-xl md:text-2xl'>dev_diary</h1>
            </div>
            <p className='card-text text-accent-pink text-sm md:text-base'>
              Entry Count: 4
            </p>
            <p className='card-text text-accent-pink text-sm md:text-base'>
              Last Update: 2024.03.15
            </p>
            <p className='card-text text-accent-pink text-sm md:text-base'>
              Status: Broadcasting
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <Link
            href='/blog/33'
            className='card p-5 flex flex-col justify-between space-y-6 hover-border-accent-pink group cursor-pointer min-h-80'
          >
            <div className='flex flex-col md:flex-row md:justify-between gap-3'>
              <div className='flex items-center gap-2 mb-3'>
                <Cpu className='icon-primary w-5 h-5' />
                <p className='text-accent-amber font-pressStart text-xs md:text-sm'>
                  [Tutorial]
                </p>
              </div>
              <div className='flex items-center gap-2 mb-3'>
                <Calendar className='icon-primary w-5 h-5' />
                <p className='text-accent-cyan font-pressStart text-xs md:text-sm'>
                  2025.06.30
                </p>
                <Clock className='icon-primary w-5 h-5' />
                <p className='text-accent-pink font-pressStart text-xs md:text-sm'>
                  10 min
                </p>
              </div>
            </div>

            <h1 className='heading-primary transition-colors duration-300 group-focus:text-accent-pink group-hover:text-accent-pink text-2xl md:text-3xl'>
              How to build a website with Next.js and Tailwind CSS
            </h1>

            <p className='body-text mt-3 text-base md:text-lg'>
              Deep dive into the world of web development with Next.js and
              Tailwind CSS. Quick and easy guide to get you started. Stay tuned
              and follow me for more updates.
            </p>

            <div className='flex justify-between'>
              <ul className='flex flex-wrap gap-2'>
                <li className='tag flex items-center gap-2'>
                  <Tag className='icon-primary w-3 h-3' />
                  <span>Next.js</span>
                </li>
                <li className='tag flex items-center gap-2'>
                  <Tag className='icon-primary w-3 h-3' />
                  Node.js
                </li>
                <li className='tag flex items-center gap-2'>
                  <Tag className='icon-primary w-3 h-3' />
                  WebAssembly
                </li>
                <li className='tag flex items-center gap-2'>
                  <Tag className='icon-primary w-3 h-3' />
                  Rust
                </li>
              </ul>
              <ChevronRight className='icon-primary transition-colors duration-300 group-hover:text-accent-pink' />
            </div>
          </Link>
          <Link
            href='/blog/33'
            className='card p-5 flex flex-col justify-between space-y-6 hover-border-accent-pink group cursor-pointer min-h-80'
          >
            <div className='flex flex-col md:flex-row md:justify-between gap-3'>
              <div className='flex items-center gap-2 mb-3'>
                <Cpu className='icon-primary w-5 h-5' />
                <p className='text-accent-amber font-pressStart text-xs md:text-sm'>
                  [Tutorial]
                </p>
              </div>
              <div className='flex items-center gap-2 mb-3'>
                <Calendar className='icon-primary w-5 h-5' />
                <p className='text-accent-cyan font-pressStart text-xs md:text-sm'>
                  2025.06.30
                </p>
                <Clock className='icon-primary w-5 h-5' />
                <p className='text-accent-pink font-pressStart text-xs md:text-sm'>
                  10 min
                </p>
              </div>
            </div>

            <h1 className='heading-primary transition-colors duration-300 group-focus:text-accent-pink group-hover:text-accent-pink text-2xl md:text-3xl'>
              How to build a website with Next.js and Tailwind CSS
            </h1>

            <p className='body-text mt-3 text-base md:text-lg'>
              Deep dive into the world of web development with Next.js and
              Tailwind CSS. Quick and easy guide to get you started. Stay tuned
              and follow me for more updates.
            </p>

            <div className='flex justify-between'>
              <ul className='flex flex-wrap gap-2'>
                <li className='tag flex items-center gap-2'>
                  <Tag className='icon-primary w-3 h-3' />
                  <span>Next.js</span>
                </li>
                <li className='tag flex items-center gap-2'>
                  <Tag className='icon-primary w-3 h-3' />
                  Node.js
                </li>
                <li className='tag flex items-center gap-2'>
                  <Tag className='icon-primary w-3 h-3' />
                  WebAssembly
                </li>
                <li className='tag flex items-center gap-2'>
                  <Tag className='icon-primary w-3 h-3' />
                  Rust
                </li>
              </ul>
              <ChevronRight className='icon-primary transition-colors duration-300 group-hover:text-accent-pink' />
            </div>
          </Link>

          
        </div>
      </div>
    </>
  );
};

export default page;

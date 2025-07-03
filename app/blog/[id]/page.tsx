import {
  Calendar,
  Clock,
  Cpu,
  MessageSquare,
  MoveRight,
  Share,
  TagIcon,
} from 'lucide-react';
import React from 'react';
import Markdown from '../Markdown';
import Link from 'next/link';

const page = () => {
  const markdownContent = `
# This is a heading

This is a paragraph with some **bold** and *italic* text.

- List item 1
- List item 2

\`\`\`javascript
console.log("hello world");
\`\`\`

> A blockquote

[A link](https://example.com)
`;

  return (
    <>
      <div className='fixed bg-dots min-h-screen w-full'></div>
      <div className='relative max-w-6xl mx-auto px-4 py-30 space-y-10'>
        <div className='card p-5 flex flex-col gap-5 justify-between wrap-break-word'>
          <div className='flex items-center gap-2 text-sm md:text-base'>
            <Cpu className='w-5 h-5 icon-primary' />
            <span className='font-pressStart text-accent-amber'>
              [Tutorial]
            </span>
          </div>
          <h1 className='text-xl md:text-4xl md:leading-loose'>
            Implementing Neural Networks in TypeScript
          </h1>
          <ul className='font-pressStart flex items-center gap-5 text-xs md:text-sm'>
            <li className='flex items-center gap-2 text-accent-cyan'>
              <Calendar className='w-5 h-5 icon-primary' />
              <span>2025-01-01</span>
            </li>
            <li className='flex items-center gap-2 text-accent-pink'>
              <Clock className='w-5 h-5 icon-primary' />
              <span>10 min</span>
            </li>
            <li className='flex items-center gap-2 text-accent-amber'>
              <MessageSquare className='w-5 h-5 icon-primary' />
              <span>12 comments</span>
            </li>
          </ul>
        </div>
        <div className='mt-5'>
          <ul className='flex flex-wrap gap-2'>
            <li className='tag flex items-center gap-2'>
              <TagIcon className='icon-primary w-3 h-3' />
              <span>Next.js</span>
            </li>
            <li className='tag flex items-center gap-2'>
              <TagIcon className='icon-primary w-3 h-3' />
              Node.js
            </li>
            <li className='tag flex items-center gap-2'>
              <TagIcon className='icon-primary w-3 h-3' />
              WebAssembly
            </li>
            <li className='tag flex items-center gap-2'>
              <TagIcon className='icon-primary w-3 h-3' />
              Rust
            </li>
          </ul>
        </div>
        <div className='card p-5'>
          <Markdown content={markdownContent} />
        </div>
        <div className='card p-5 flex flex-col md:flex-row gap-5 md:gap-0 justify-between'>
          <button className='btn btn-primary flex items-center gap-2'>
            <Share className='w-4 h-4' />
            Share
          </button>
          <div className='flex items-center gap-2 justify-center md:justify-start'>
            <Link href={'/blog'} className='link flex items-center gap-2'>
              More Posts
              <MoveRight className='w-4 h-4' />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

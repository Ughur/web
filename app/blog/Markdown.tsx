'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const Markdown = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ ...props }) => (
          <h1 className='text-3xl md:text-4xl font-bold my-4' {...props} />
        ),
        h2: ({ ...props }) => (
          <h2 className='text-2xl md:text-3xl font-bold my-4' {...props} />
        ),
        h3: ({ ...props }) => (
          <h3 className='text-xl md:text-2xl font-bold my-4' {...props} />
        ),
        p: ({ ...props }) => (
          <p className='text-base md:text-lg my-4' {...props} />
        ),
        a: ({ ...props }) => (
          <a className='text-accent-pink hover:underline' {...props} />
        ),
        ul: ({ ...props }) => (
          <ul className='list-disc list-inside my-4' {...props} />
        ),
        li: ({ ...props }) => (
          <li className='text-base md:text-lg' {...props} />
        ),
        blockquote: ({ ...props }) => (
          <blockquote
            className='border-l-4 border-accent-cyan pl-4 italic my-4'
            {...props}
          />
        ),
        // @ts-expect-error -- Incorrect types for `inline` prop
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <div className='relative'>
              <div className='absolute top-0 right-0 bg-background text-white px-2 py-1 rounded-bl-lg text-sm'>
                {match[1]}
              </div>
              <SyntaxHighlighter
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                style={vscDarkPlus as any}
                language={match[1]}
                PreTag='div'
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;

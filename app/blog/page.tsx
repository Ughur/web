import { createSupabaseServerClient } from '@/utils/supabase/server';
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

const postTypeColors: { [key: string]: string } = {
  Article: 'text-accent-amber',
  DevLog: 'text-accent-pink',
  Tutorial: 'text-accent-cyan',
  default: 'text-gray-400',
};

const page = async () => {
  const supabase = createSupabaseServerClient();
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <p>Error loading posts: {error.message}</p>;
  }
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
              Entry Count: {posts.length}
            </p>
            <p className='card-text text-accent-pink text-sm md:text-base'>
              Last Update:{' '}
              {posts.length > 0
                ? new Date(posts[0].created_at).toLocaleDateString()
                : 'N/A'}
            </p>
            <p className='card-text text-accent-pink text-sm md:text-base'>
              Status: Broadcasting
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          {posts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.id}
              className='card p-5 flex flex-col justify-between space-y-6 hover-border-accent-pink group cursor-pointer min-h-80'
            >
              <div className='flex flex-col md:flex-row md:justify-between gap-3'>
                <div className='flex items-center gap-2 mb-3'>
                  <Cpu className='icon-primary w-5 h-5' />
                  <p
                    className={`font-pressStart text-xs md:text-sm ${
                      postTypeColors[post.post_type] || postTypeColors.default
                    }`}
                  >
                    [{post.post_type || 'Article'}]
                  </p>
                </div>
                <div className='flex items-center gap-2 mb-3'>
                  <Calendar className='icon-primary w-5 h-5' />
                  <p className='text-accent-cyan font-pressStart text-xs md:text-sm'>
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                  <Clock className='icon-primary w-5 h-5' />
                  <p className='text-accent-pink font-pressStart text-xs md:text-sm'>
                    {post.read_time ? `${post.read_time} min` : 'N/A'}
                  </p>
                </div>
              </div>

              <h1 className='heading-primary transition-colors duration-300 group-focus:text-accent-pink group-hover:text-accent-pink text-2xl md:text-3xl'>
                {post.title}
              </h1>

              <p className='body-text mt-3 text-base md:text-lg'>
                {post.description || 'No description available.'}
              </p>

              <div className='flex justify-between'>
                <ul className='flex flex-wrap gap-2'>
                  {post.tags?.map((tag: string) => (
                    <li key={tag} className='tag flex items-center gap-2'>
                      <Tag className='icon-primary w-3 h-3' />
                      <span>{tag}</span>
                    </li>
                  ))}
                </ul>
                <ChevronRight className='icon-primary transition-colors duration-300 group-hover:text-accent-pink' />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;

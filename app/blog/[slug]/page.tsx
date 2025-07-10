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
import { createSupabaseServerClient } from '@/utils/supabase/server';

const page = async ({ params }: { params: { slug: string } }) => {
  const supabase = createSupabaseServerClient();
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error) {
    return <p>Error loading post: {error.message}</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <>
      <div className='fixed bg-dots min-h-screen w-full'></div>
      <div className='relative max-w-6xl mx-auto px-4 py-30 space-y-10'>
        <div className='card p-5 flex flex-col gap-5 justify-between wrap-break-word'>
          <div className='flex items-center gap-2 text-sm md:text-base'>
            <Cpu className='w-5 h-5 icon-primary' />
            <span className='font-pressStart text-accent-amber'>
              [{post.post_type || 'Article'}]
            </span>
          </div>
          <h1 className='text-xl md:text-4xl md:leading-loose'>{post.title}</h1>
          <ul className='font-pressStart flex items-center gap-5 text-xs md:text-sm'>
            <li className='flex items-center gap-2 text-accent-cyan'>
              <Calendar className='w-5 h-5 icon-primary' />
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </li>
            <li className='flex items-center gap-2 text-accent-pink'>
              <Clock className='w-5 h-5 icon-primary' />
              <span>{post.read_time ? `${post.read_time} min` : 'N/A'}</span>
            </li>
            <li className='flex items-center gap-2 text-accent-amber'>
              <MessageSquare className='w-5 h-5 icon-primary' />
              <span>{post.comments_count} comments</span>
            </li>
          </ul>
        </div>
        <div className='mt-5'>
          <ul className='flex flex-wrap gap-2'>
            {post.tags?.map((tag: string) => (
              <li key={tag} className='tag flex items-center gap-2'>
                <TagIcon className='w-3 h-3 icon-primary' />
                <span>{tag}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className='card p-5'>
          <Markdown content={post.content} />
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

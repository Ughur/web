'use server';

import { supabase } from '@/utils/supabase/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPostAction(postData: {
  title: string;
  content: string;
  description: string;
  tags: { id: string; text: string }[];
  post_type: string;
}) {
  const { title, content, description, tags, post_type } = postData;

  // Generate slug
  const slug = title.toLowerCase().replace(/\s+/g, '-').slice(0, 50);

  // Calculate read time
  const words = content.trim().split(/\s+/).length;
  const read_time = Math.ceil(words / 200);

  const tagsArray = tags.map((tag) => tag.text);

  const { error } = await supabase.from('posts').insert([
    {
      title,
      content,
      slug,
      description,
      tags: tagsArray,
      post_type,
      read_time,
    },
  ]);

  if (error) {
    console.error('Error creating post:', error);
    // Return a more specific error message if possible
    return { error: `Failed to create post: ${error.message}` };
  }

  revalidatePath('/admin/posts');
  revalidatePath('/blog');
  redirect('/admin/posts');
}

export async function updatePostAction(
  id: string,
  postData: {
    title: string;
    content: string;
    description: string;
    tags: { id: string; text: string }[];
    post_type: string;
  }
) {
  const { title, content, description, tags, post_type } = postData;

  // Calculate read time
  const words = content.trim().split(/\s+/).length;
  const read_time = Math.ceil(words / 200);

  const tagsArray = tags.map((tag) => tag.text);

  const { data, error } = await supabase
    .from('posts')
    .update({
      title,
      content,
      description,
      tags: tagsArray,
      post_type,
      read_time,
    })
    .eq('id', id)
    .select('slug');

  if (error || !data || data.length === 0) {
    const errorMessage = error
      ? error.message
      : 'Post not found or failed to update.';
    console.error('Error updating post:', errorMessage);
    return { error: `Failed to update post: ${errorMessage}` };
  }

  revalidatePath('/admin/posts');
  revalidatePath('/blog');
  if (data[0]?.slug) {
    revalidatePath(`/blog/${data[0].slug}`);
  }
  redirect('/admin/posts');
}

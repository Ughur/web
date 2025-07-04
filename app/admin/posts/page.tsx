import { supabase } from '@/utils/supabase/client';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export const revalidate = 60;

export default async function PostsPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <p>Error loading posts: {error.message}</p>;
  }

  if (!posts || posts.length === 0) {
    return (
      <div>
        <h1 className='text-2xl font-bold mb-6'>Manage Posts</h1>
        <p>No posts found.</p>
        <Link
          href='/admin/posts/new'
          className='btn btn-primary mt-4 inline-flex items-center'
        >
          <PlusCircle className='w-5 h-5 mr-2' />
          Create First Post
        </Link>
      </div>
    );
  }

  return (
    <div className='card bg-gray-800 p-6 rounded-lg'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Manage Posts</h1>
        <Link
          href='/admin/posts/new'
          className='btn btn-primary inline-flex items-center'
        >
          <PlusCircle className='w-5 h-5 mr-2' />
          New Post
        </Link>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full text-left'>
          <thead className='border-b border-gray-600'>
            <tr>
              <th className='p-4'>Title</th>
              <th className='p-4'>Type</th>
              <th className='p-4'>Created At</th>
              <th className='p-4'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className='border-b border-gray-700 hover:bg-gray-700/50'
              >
                <td className='p-4'>{post.title}</td>
                <td className='p-4'>{post.post_type}</td>
                <td className='p-4 whitespace-nowrap'>
                  {new Date(post.created_at).toLocaleDateString()}
                </td>
                <td className='p-4'>
                  <Link
                    href={`/admin/posts/edit/${post.id}`}
                    className='text-blue-400 hover:underline'
                  >
                    Edit
                  </Link>
                  {/* Add delete button later */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

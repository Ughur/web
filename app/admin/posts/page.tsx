'use client';

import { createSupabaseBrowserClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { deleteMultiplePostsAction } from './actions';

// Define the type for a post for type safety
type Post = {
  id: string;
  created_at: string;
  title: string;
  post_type: string;
};

export default function PostsPage() {
  const supabase = createSupabaseBrowserClient();
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('id, created_at, title, post_type')
        .order('created_at', { ascending: false });
      if (data) setPosts(data);
      if (error) console.error('Error fetching posts:', error);
    };
    fetchPosts();
  }, [supabase]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(posts.map((post) => post.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    if (
      confirm(`Are you sure you want to delete ${selectedIds.length} post(s)?`)
    ) {
      startTransition(async () => {
        await deleteMultiplePostsAction(selectedIds);
        // Refetch posts after deletion
        const { data } = await supabase
          .from('posts')
          .select('id, created_at, title, post_type')
          .order('created_at', { ascending: false });
        if (data) setPosts(data);
        setSelectedIds([]);
      });
    }
  };

  return (
    <div className='card bg-gray-800 p-6 rounded-lg'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Manage Posts</h1>
        <div className='flex items-center gap-2'>
          {selectedIds.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className='btn btn-danger inline-flex items-center'
              disabled={isPending}
            >
              <Trash2 className='w-5 h-5 mr-2' />
              Delete ({selectedIds.length})
            </button>
          )}
          <Link
            href='/admin/posts/new'
            className='btn btn-primary inline-flex items-center'
          >
            <PlusCircle className='w-5 h-5 mr-2' />
            New Post
          </Link>
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full text-left'>
          <thead className='border-b border-gray-600'>
            <tr>
              <th className='p-4 w-4'>
                <input
                  type='checkbox'
                  className='form-checkbox'
                  onChange={handleSelectAll}
                  checked={
                    selectedIds.length > 0 &&
                    selectedIds.length === posts.length
                  }
                />
              </th>
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
                className={`border-b border-gray-700 ${
                  selectedIds.includes(post.id)
                    ? 'bg-blue-900/50'
                    : 'hover:bg-gray-700/50'
                }`}
              >
                <td className='p-4'>
                  <input
                    type='checkbox'
                    className='form-checkbox'
                    checked={selectedIds.includes(post.id)}
                    onChange={() => handleSelectRow(post.id)}
                  />
                </td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

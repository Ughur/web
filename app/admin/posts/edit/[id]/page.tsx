import { createSupabaseServerClient } from '@/utils/supabase/server';
import EditPostForm from './EditPostForm';

const page = async ({ params }: { params: { id: string } }) => {
  const supabase = await createSupabaseServerClient();
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    return <p>Error loading post: {error.message}</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div className='card bg-gray-800 p-6 rounded-lg'>
      <h1 className='text-2xl font-bold mb-6'>Edit Post</h1>
      <EditPostForm post={post} />
    </div>
  );
};

export default page;

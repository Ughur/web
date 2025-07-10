import { createSupabaseServerClient } from '@/utils/supabase/server';
import { FileText, MessageSquare } from 'lucide-react';
import { SupabaseClient } from '@supabase/supabase-js';

async function getStats(supabase: SupabaseClient) {
  const { count: postCount } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true });

  const { count: contactCount } = await supabase
    .from('contact_submissions')
    .select('*', { count: 'exact', head: true });

  return { postCount, contactCount };
}

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { postCount, contactCount } = await getStats(supabase);

  return (
    <div>
      <h1 className='text-3xl font-bold mb-8'>Admin Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <div className='bg-gray-800 p-6 rounded-lg'>
          <div className='flex items-center'>
            <FileText className='w-8 h-8 mr-4 text-blue-400' />
            <div>
              <p className='text-lg text-gray-400'>Total Posts</p>
              <p className='text-3xl font-bold'>{postCount ?? '0'}</p>
            </div>
          </div>
        </div>
        <div className='bg-gray-800 p-6 rounded-lg'>
          <div className='flex items-center'>
            <MessageSquare className='w-8 h-8 mr-4 text-green-400' />
            <div>
              <p className='text-lg text-gray-400'>Contact Submissions</p>
              <p className='text-3xl font-bold'>{contactCount ?? '0'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { supabase } from '@/utils/supabase/client';
import EditProjectForm from './EditProjectForm';

const page = async ({ params }: { params: { id: string } }) => {
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !project) {
    return <p>Error loading project or project not found.</p>;
  }

  return (
    <div className='card bg-gray-800 p-6 rounded-lg'>
      <h1 className='text-2xl font-bold mb-6'>Edit Project</h1>
      <EditProjectForm project={project} />
    </div>
  );
};

export default page;

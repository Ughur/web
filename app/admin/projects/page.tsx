import { supabase } from '@/utils/supabase/client';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export const revalidate = 0;

async function ProjectsPage() {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <p>Error loading projects: {error.message}</p>;
  }

  return (
    <div className='card bg-gray-800 p-6 rounded-lg'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Manage Projects</h1>
        <Link
          href='/admin/projects/new'
          className='btn btn-primary inline-flex items-center'
        >
          <PlusCircle className='w-5 h-5 mr-2' />
          New Project
        </Link>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full text-left'>
          <thead className='border-b border-gray-600'>
            <tr>
              <th className='p-4'>Name</th>
              <th className='p-4'>Status</th>
              <th className='p-4'>Created At</th>
              <th className='p-4'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className='border-b border-gray-700 hover:bg-gray-700/50'
              >
                <td className='p-4'>{project.name}</td>
                <td className='p-4'>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'completed'
                        ? 'bg-green-500 text-green-100'
                        : project.status === 'in-progress'
                        ? 'bg-blue-500 text-blue-100'
                        : 'bg-yellow-500 text-yellow-100'
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className='p-4 whitespace-nowrap'>
                  {new Date(project.created_at).toLocaleDateString()}
                </td>
                <td className='p-4 space-x-4'>
                  <Link
                    href={`/admin/projects/edit/${project.id}`}
                    className='text-blue-400 hover:underline'
                  >
                    Edit
                  </Link>
                  {/* Delete button will be a separate client component */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectsPage;

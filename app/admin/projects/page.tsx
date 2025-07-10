'use client';

import { createSupabaseBrowserClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { deleteMultipleProjectsAction } from './actions';

type Project = {
  id: string;
  created_at: string;
  name: string;
  status: string;
};

export default function ProjectsPage() {
  const supabase = createSupabaseBrowserClient();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, created_at, name, status')
        .order('created_at', { ascending: false });
      if (data) setProjects(data);
      if (error) console.error('Error fetching projects:', error);
    };
    fetchProjects();
  }, []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(projects.map((p) => p.id));
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
      confirm(
        `Are you sure you want to delete ${selectedIds.length} project(s)?`
      )
    ) {
      startTransition(async () => {
        await deleteMultipleProjectsAction(selectedIds);
        const { data } = await supabase
          .from('projects')
          .select('id, created_at, name, status')
          .order('created_at', { ascending: false });
        if (data) setProjects(data);
        setSelectedIds([]);
      });
    }
  };

  return (
    <div className='card bg-gray-800 p-6 rounded-lg'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Manage Projects</h1>
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
            href='/admin/projects/new'
            className='btn btn-primary inline-flex items-center'
          >
            <PlusCircle className='w-5 h-5 mr-2' />
            New Project
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
                    selectedIds.length === projects.length
                  }
                />
              </th>
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
                className={`border-b border-gray-700 ${
                  selectedIds.includes(project.id)
                    ? 'bg-blue-900/50'
                    : 'hover:bg-gray-700/50'
                }`}
              >
                <td className='p-4'>
                  <input
                    type='checkbox'
                    className='form-checkbox'
                    checked={selectedIds.includes(project.id)}
                    onChange={() => handleSelectRow(project.id)}
                  />
                </td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

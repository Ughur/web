'use server';

import { createSupabaseServerClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type ProjectData = {
  name: string;
  description: string;
  status: string;
  tech_stack: { id: string; text: string }[];
  repo_url: string;
  demo_url: string;
};

// Reusable function to revalidate paths
const revalidateProjectPaths = () => {
  revalidatePath('/admin/projects');
  revalidatePath('/work');
};

export async function createProjectAction(projectData: ProjectData) {
  const supabase = createSupabaseServerClient();
  const { name, description, status, tech_stack, repo_url, demo_url } =
    projectData;

  const techStackArray = tech_stack.map((tag) => tag.text);

  const { error } = await supabase.from('projects').insert([
    {
      name,
      description,
      status,
      tech_stack: techStackArray,
      repo_url,
      demo_url,
    },
  ]);

  if (error) {
    console.error('Error creating project:', error);
    return { error: `Failed to create project: ${error.message}` };
  }

  revalidateProjectPaths();
  redirect('/admin/projects');
}

export async function updateProjectAction(
  id: string,
  projectData: ProjectData
) {
  const supabase = createSupabaseServerClient();
  const { name, description, status, tech_stack, repo_url, demo_url } =
    projectData;

  const techStackArray = tech_stack.map((tag) => tag.text);

  const { error } = await supabase
    .from('projects')
    .update({
      name,
      description,
      status,
      tech_stack: techStackArray,
      repo_url,
      demo_url,
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating project:', error);
    return { error: `Failed to update project: ${error.message}` };
  }

  revalidateProjectPaths();
  redirect('/admin/projects');
}

export async function deleteProjectAction(id: string) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) {
    console.error('Error deleting project:', error);
    return { error: `Failed to delete project: ${error.message}` };
  }

  revalidateProjectPaths();
  redirect('/admin/projects');
}

export async function deleteMultipleProjectsAction(ids: string[]) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from('projects').delete().in('id', ids);

  if (error) {
    console.error('Error deleting projects:', error);
    return { error: `Failed to delete projects: ${error.message}` };
  }

  revalidateProjectPaths();
}

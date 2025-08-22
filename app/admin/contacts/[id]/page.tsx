import { createSupabaseServerClient } from '@/utils/supabase/server';
import React from 'react';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const supabase = await createSupabaseServerClient();
  const { id } = await params;
  const { data: submission, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    return <p>Error loading submission: {error.message}</p>;
  }
  return (
    <div className='card bg-gray-800 p-6 rounded-lg'>
      <h1 className='text-2xl font-bold mb-6'>Contact Submission</h1>
      <p>Name: {submission.name}</p>
      <p>Email: {submission.email}</p>
      <p>Message: {submission.message}</p>
    </div>
  );
};

export default page;

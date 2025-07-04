import { supabase } from '@/utils/supabase/client';

export const revalidate = 60; // Revalidate data every 60 seconds

export default async function ContactSubmissionsPage() {
  const { data: submissions, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <p>Error loading submissions: {error.message}</p>;
  }

  if (!submissions || submissions.length === 0) {
    return <p>No contact submissions yet.</p>;
  }

  return (
    <div className='card bg-gray-800 p-6 rounded-lg'>
      <h1 className='text-2xl font-bold mb-6'>Contact Submissions</h1>
      <div className='overflow-x-auto'>
        <table className='min-w-full text-left'>
          <thead className='border-b border-gray-600'>
            <tr>
              <th className='p-4'>Date</th>
              <th className='p-4'>Name</th>
              <th className='p-4'>Email</th>
              <th className='p-4'>Message</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr
                key={submission.id}
                className='border-b border-gray-700 hover:bg-gray-700/50'
              >
                <td className='p-4 whitespace-nowrap'>
                  {new Date(submission.created_at).toLocaleString()}
                </td>
                <td className='p-4'>{submission.name}</td>
                <td className='p-4'>{submission.email}</td>
                <td className='p-4 max-w-md truncate'>{submission.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

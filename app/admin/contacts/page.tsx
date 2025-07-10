'use client';

import { createSupabaseBrowserClient } from '@/utils/supabase/client';
import { Trash2 } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { deleteMultipleContactsAction } from './actions';
import Link from 'next/link';

type Submission = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  message: string;
};

export default function ContactSubmissionsPage() {
  const supabase = createSupabaseBrowserClient();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchSubmissions = async () => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setSubmissions(data);
      if (error) console.error('Error fetching submissions', error);
    };
    fetchSubmissions();
  }, []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(submissions.map((s) => s.id));
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
        `Are you sure you want to delete ${selectedIds.length} submission(s)?`
      )
    ) {
      startTransition(async () => {
        await deleteMultipleContactsAction(selectedIds);
        const { data } = await supabase
          .from('contact_submissions')
          .select('*')
          .order('created_at', { ascending: false });
        if (data) setSubmissions(data);
        setSelectedIds([]);
      });
    }
  };

  return (
    <div className='card bg-gray-800 p-6 rounded-lg'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Contact Submissions</h1>
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
                    selectedIds.length === submissions.length
                  }
                />
              </th>
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
                className={`border-b border-gray-700 ${
                  selectedIds.includes(submission.id)
                    ? 'bg-blue-900/50'
                    : 'hover:bg-gray-700/50'
                }`}
              >
                <td className='p-4'>
                  <input
                    type='checkbox'
                    className='form-checkbox'
                    checked={selectedIds.includes(submission.id)}
                    onChange={() => handleSelectRow(submission.id)}
                  />
                </td>
                <td className='p-4 whitespace-nowrap'>
                  {new Date(submission.created_at).toLocaleString()}
                </td>
                <td className='p-4'>{submission.name}</td>
                <td className='p-4'>{submission.email}</td>
                <td
                  className='p-4 max-w-md truncate'
                  title={submission.message}
                >
                  {submission.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

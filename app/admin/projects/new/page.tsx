'use client';

import { useState, useTransition } from 'react';
import { createProjectAction } from '../actions';
import { WithContext as ReactTags, SEPARATORS } from 'react-tag-input';
import type { Tag } from 'react-tag-input';
import TagInputStyles from '../../components/TagInputStyles';

export default function NewProjectPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('in-progress');
  const [tech_stack, setTechStack] = useState<Tag[]>([]);
  const [repo_url, setRepoUrl] = useState('');
  const [demo_url, setDemoUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await createProjectAction({
        name,
        description,
        status,
        tech_stack,
        repo_url,
        demo_url,
      });
      if (result?.error) setError(result.error);
    });
  };

  return (
    <div className='card bg-gray-800 p-6 rounded-lg'>
      <TagInputStyles />
      <h1 className='text-2xl font-bold mb-6'>Create New Project</h1>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='name' className='form-label'>
              Project Name
            </label>
            <input
              id='name'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='form-input bg-gray-700 border-gray-600'
              required
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='status' className='form-label'>
              Status
            </label>
            <select
              id='status'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className='form-input bg-gray-700 border-gray-600'
            >
              <option value='in-progress'>In Progress</option>
              <option value='completed'>Completed</option>
              <option value='planned'>Planned</option>
            </select>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className='form-input bg-gray-700 border-gray-600'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='form-label'>Tech Stack</label>
          <ReactTags
            tags={tech_stack}
            handleDelete={(i) =>
              setTechStack(tech_stack.filter((_, index) => index !== i))
            }
            handleAddition={(tag) => setTechStack([...tech_stack, tag])}
            handleDrag={(tag, currPos, newPos) => {
              const newTags = [...tech_stack];
              newTags.splice(currPos, 1);
              newTags.splice(newPos, 0, tag);
              setTechStack(newTags);
            }}
            separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
            inputFieldPosition='bottom'
            placeholder='Add technologies'
            classNames={{
              tagInputField: 'form-input bg-gray-700 border-gray-600',
            }}
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='repo_url' className='form-label'>
              Repository URL
            </label>
            <input
              id='repo_url'
              type='url'
              value={repo_url}
              onChange={(e) => setRepoUrl(e.target.value)}
              className='form-input bg-gray-700 border-gray-600'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='demo_url' className='form-label'>
              Live Demo URL
            </label>
            <input
              id='demo_url'
              type='url'
              value={demo_url}
              onChange={(e) => setDemoUrl(e.target.value)}
              className='form-input bg-gray-700 border-gray-600'
            />
          </div>
        </div>

        {error && <p className='text-red-500'>{error}</p>}

        <button
          type='submit'
          className='btn btn-primary w-full'
          disabled={isPending}
        >
          {isPending ? 'Creating...' : 'Create Project'}
        </button>
      </form>
    </div>
  );
}

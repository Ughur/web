'use client';

import { useState, useTransition } from 'react';
import { createPostAction } from '../actions';
import { WithContext as ReactTags, SEPARATORS } from 'react-tag-input';
import type { Tag } from 'react-tag-input';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('**Hello world!!!**');
  const [tags, setTags] = useState<Tag[]>([]);
  const [postType, setPostType] = useState('Article');
  const [error, setError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const handleDelete = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
    const newTags = [...tags];
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !content || !description) {
      setError('Title, Description, and Content are required.');
      return;
    }

    startTransition(async () => {
      const result = await createPostAction({
        title,
        content,
        description,
        tags: tags.map((tag) => ({ id: tag.id, text: tag.text })),
        post_type: postType,
      });

      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className='card bg-gray-800 p-6 rounded-lg'>
      <style>{`
        .ReactTags__tags {
          position: relative;
        }
        .ReactTags__tagInput {
            width: 100%;
            border-radius: 0.375rem;
            background-color: #2d3748; /* gray-800 */
            border: 1px solid #4a5568; /* gray-600 */
            padding: 0.5rem;
            font-size: 1rem;
            line-height: 1.5rem;
        }
        .ReactTags__tagInput:focus {
            border-color: #63b3ed; /* blue-400 */
            box-shadow: 0 0 0 1px #63b3ed;
        }
        .ReactTags__selected .ReactTags__tag {
            background-color: #4a5568; /* gray-600 */
            color: white;
            border: 1px solid #4a5568;
            border-radius: 0.375rem;
            padding: 0.25rem 0.5rem;
            margin: 0.25rem;
            display: inline-flex;
            align-items: center;
        }
        .ReactTags__remove {
            color: #fc8181; /* red-400 */
            margin-left: 0.5rem;
            cursor: pointer;
            border: none;
            background: none;
        }
        .ReactTags__suggestions {
          position: absolute;
          z-index: 10;
        }
      `}</style>
      <h1 className='text-2xl font-bold mb-6'>Create New Post</h1>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='title' className='form-label'>
            Title
          </label>
          <input
            id='title'
            name='title'
            type='text'
            className='form-input bg-gray-700 border-gray-600'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <textarea
            id='description'
            name='description'
            rows={3}
            className='form-input bg-gray-700 border-gray-600'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='content' className='form-label'>
            Content (Markdown)
          </label>
          <div data-color-mode='dark'>
            <MDEditor
              value={content}
              onChange={(val) => setContent(val || '')}
              height={400}
            />
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <label className='form-label'>Tags</label>
          <ReactTags
            tags={tags}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
            inputFieldPosition='bottom'
            placeholder='Add new tag'
            classNames={{
              tagInputField: 'form-input bg-gray-700 border-gray-600',
            }}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='post_type' className='form-label'>
            Post Type
          </label>
          <input
            id='post_type'
            name='post_type'
            type='text'
            className='form-input bg-gray-700 border-gray-600'
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
            required
          />
        </div>

        {error && <p className='text-red-500'>{error}</p>}

        <button
          type='submit'
          className='btn btn-primary w-full'
          disabled={isPending}
        >
          {isPending ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}

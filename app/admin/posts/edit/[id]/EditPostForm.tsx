'use client';

import { useState, useTransition } from 'react';
import { updatePostAction } from '../../actions';
import { WithContext as ReactTags, SEPARATORS } from 'react-tag-input';
import type { Tag } from 'react-tag-input';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import TagInputStyles from '../../../components/TagInputStyles';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

type Post = {
  id: string;
  created_at: string;
  title: string;
  content: string;
  slug: string;
  description: string;
  tags: string[];
  post_type: string;
  read_time: number;
  comments_count: number;
};

export default function EditPostForm({ post }: { post: Post }) {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [content, setContent] = useState(post.content);
  const [tags, setTags] = useState<Tag[]>(
    post.tags.map((tag) => ({ id: tag, text: tag, className: '' }))
  );
  const [postType, setPostType] = useState(post.post_type);
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
      const result = await updatePostAction(post.id, {
        title,
        content,
        description,
        tags: tags.map(({ id, text }) => ({ id, text })),
        post_type: postType,
      });

      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <>
      <TagInputStyles />
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
          <select
            id='post_type'
            name='post_type'
            className='form-input bg-gray-700 border-gray-600'
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
            required
          >
            <option value='Article'>Article</option>
            <option value='DevLog'>DevLog</option>
            <option value='Tutorial'>Tutorial</option>
          </select>
        </div>

        {error && <p className='text-red-500'>{error}</p>}

        <button
          type='submit'
          className='btn btn-primary w-full'
          disabled={isPending}
        >
          {isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </>
  );
}

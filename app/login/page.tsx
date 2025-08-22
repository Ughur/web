'use client';

import { Suspense, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { login } from './actions';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const initialState = {
  error: '',
};

function LoginMessage() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  if (!message) return null;
  return <p style={{ color: 'green', marginBottom: '1rem' }}>{message}</p>;
}

export default function LoginPage() {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <div className='min-h-[60vh] flex items-center justify-center p-4'>
      <div className='w-full max-w-md card bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700'>
        <div className='mb-6 text-center'>
          <h1 className='text-2xl font-bold'>Admin Login</h1>
          <p className='text-sm text-gray-400 mt-1'>Sign in to manage posts, projects and contacts</p>
        </div>

        <Suspense>
          <LoginMessage />
        </Suspense>

        {state?.error && (
          <div className='mb-4 text-red-400 text-sm bg-red-950/30 border border-red-800 rounded px-3 py-2'>
            {state.error}
          </div>
        )}

        <LoginForm formAction={formAction} />

        <div className='mt-4 flex items-center justify-between text-xs text-gray-400'>
          <Link href='/' className='hover:text-gray-200 transition-colors'>← Back to site</Link>
          <span>Forgot password? Contact the admin.</span>
        </div>
      </div>
    </div>
  );
}

function LoginForm({ formAction }: { formAction: (payload: FormData) => void }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form action={formAction} className='space-y-4'>
      <div className='flex flex-col gap-2'>
        <label htmlFor='email' className='form-label'>Email</label>
        <input
          id='email'
          name='email'
          type='email'
          autoComplete='email'
          required
          className='form-input bg-gray-700 border-gray-600'
          placeholder='you@example.com'
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='password' className='form-label'>Password</label>
        <div className='relative'>
          <input
            id='password'
            name='password'
            type={showPassword ? 'text' : 'password'}
            autoComplete='current-password'
            required
            className='form-input bg-gray-700 border-gray-600 pr-12 w-full'
            placeholder='••••••••'
          />
          <button
            type='button'
            onClick={() => setShowPassword((v) => !v)}
            className='absolute inset-y-0 right-0 px-3 text-xs text-gray-300 hover:text-white'
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      className='btn btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed'
      disabled={pending}
    >
      {pending ? 'Signing in…' : 'Login'}
    </button>
  );
}

'use client';

import { Suspense } from 'react';
import { useFormState } from 'react-dom';
import { login } from './actions';
import { useSearchParams } from 'next/navigation';

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
    <div className='mt-50'>
      <h1>Admin Login</h1>
      <Suspense>
        <LoginMessage />
      </Suspense>
      <form action={formAction}>
        <div>
          <label htmlFor='email'>Email</label>
          <input id='email' name='email' type='email' required />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input id='password' name='password' type='password' required />
        </div>
        {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

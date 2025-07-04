'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, this would be a server action.
    // For simplicity, we'll do a simple check here.
    // The password should be in an environment variable.
    if (password === 'pass') {
      // On the server, you would set a secure, httpOnly cookie.
      // We'll simulate this by setting a simple client-side value for now,
      // but the proper implementation would be in a server action.
      document.cookie = 'isAdmin=true; path=/';
      router.push('/admin');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className='mt-50'>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

'use client';

import { Mail, MessageCircle, MessageSquare, Send, User } from 'lucide-react';
import { FormEvent, useState } from 'react';
import useSound from '../hooks/useSound';
import { supabase } from '@/utils/supabase/client';

const ContactForm = () => {
  const playSound = useSound();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const handleFocus = () => {
    playSound('hover');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from('contact_submissions')
      .insert([{ name, email, message }]);

    if (error) {
      setFormStatus('Error: ' + error.message);
      playSound('failure');
    } else {
      setFormStatus('Message sent successfully!');
      playSound('success');
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <div className='card row-span-2'>
      <div className='flex items-center gap-2'>
        <MessageSquare className='icon-primary' />
        <h2>Initialize Connection</h2>
      </div>
      <form className='mt-10 space-y-5' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name' className='form-label'>
            Identifier
          </label>
          <div className='relative'>
            <span className='absolute left-2 top-1/2 -translate-y-1/2 text-accent-cyan'>
              <User className='w-5 h-5' />
            </span>
            <input
              type='text'
              id='name'
              className='form-input pl-9'
              placeholder='Enter your name'
              onFocus={handleFocus}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='email' className='form-label'>
            Neural Address
          </label>
          <div className='relative'>
            <span className='absolute left-2 top-1/2 -translate-y-1/2 text-accent-cyan'>
              <Mail />
            </span>
            <input
              type='email'
              id='email'
              className='form-input pl-9'
              placeholder='Enter your email'
              onFocus={handleFocus}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='message' className='form-label'>
            Transmission Content
          </label>
          <div className='relative'>
            <span className='absolute left-2 top-2 text-accent-cyan'>
              <MessageCircle />
            </span>
            <textarea
              id='message'
              className='form-input pl-9 h-40'
              placeholder='Enter your message'
              onFocus={handleFocus}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type='submit'
          className='btn btn-primary w-full flex items-center gap-2 justify-center'
          onMouseEnter={handleFocus}
        >
          <Send className='w-5 h-5' />
          Transmit Message
        </button>
      </form>
      {formStatus && <p className='mt-4 text-center'>{formStatus}</p>}
    </div>
  );
};

export default ContactForm;

'use client';

import { Mail, MessageCircle, MessageSquare, Send, User } from 'lucide-react';
import { FormEvent } from 'react';
import useSound from '../hooks/useSound';

const ContactForm = () => {
  const playSound = useSound();

  const handleFocus = () => {
    playSound('hover');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    playSound('success');
    // You can add your form submission logic here.
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
    </div>
  );
};

export default ContactForm;

import {
  Github,
  Globe,
  Linkedin,
  Mail,
  MessageCircle,
  MessageSquare,
  Send,
  Terminal,
  Twitter,
  User,
} from 'lucide-react';
import React from 'react';

const page = () => {
  return (
    <>
      <div className='fixed bg-dots min-h-screen w-full'></div>
      <div className='relative max-w-5xl mx-auto px-4 py-30 space-y-10'>
        <div className='card p-5 space-y-2'>
          <div className='flex items-center gap-2'>
            <Terminal className='icon-primary' />
            <h1>telepathy.exe</h1>
          </div>
          <p className='card-text text-accent-pink'>
            Connection Status: Online
          </p>
          <p className='card-text text-accent-pink'>Channel: Secure</p>
          <p className='card-text text-accent-pink'>
            Protocol: Neural_Link_v2.0
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div className='card row-span-2'>
            <div className='flex items-center gap-2'>
              <MessageSquare className='icon-primary' />
              <h2>Initialize Connection</h2>
            </div>
            <form className='mt-10 space-y-5'>
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
                  />
                </div>
              </div>
              <button
                type='submit'
                className='btn btn-primary w-full flex items-center gap-2 justify-center'
              >
                <Send className='w-5 h-5' />
                Transmit Message
              </button>
            </form>
          </div>
          <div className='card'>
            <div className='flex items-center gap-2'>
              <Terminal className='icon-primary' />
              <h2>Connection Info</h2>
            </div>
            <div className='mt-10 space-y-5'>
              <p className='card-text text-accent-pink'>
                Location: <span className='text-body'>Cyber Sector 7</span>
              </p>
              <p className='card-text text-accent-pink'>
                Time Zone: <span className='text-body'>GMT+1 (CET)</span>
              </p>
              <p className='card-text text-accent-pink'>
                Response Time: <span className='text-body'>~24 hours</span>
              </p>
            </div>
          </div>
          <div className='card'>
            <div className='flex items-center gap-2'>
              <Globe className='icon-primary' />
              <h2>Neural Networks</h2>
            </div>
            <div className='mt-10 grid grid-cols-2 gap-5'>
              <button className='btn btn-ghost flex items-center gap-2'>
                <Github className='text-accent-pink' />
                Github
              </button>
              <button className='btn btn-ghost flex items-center gap-2'>
                <Linkedin className='text-blue-900' />
                LinkedIn
              </button>
              <button className='btn btn-ghost flex items-center gap-2'>
                <Twitter className='text-accent-cyan' />
                Twitter
              </button>
              <button className='btn btn-ghost flex items-center gap-2'>
                <Globe className='text-accent-amber' />
                Website
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

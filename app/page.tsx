import ParticleImage from './animations/ParticleImage';
import PixelArtBackground from './animations/PixelArtBackground';

export default function Home() {
  return (
    <>
      <h1 className='heading'>Hello World</h1>
      <p className='body-text'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
        laboriosam necessitatibus consequatur vero harum ab, voluptates
        praesentium provident voluptate ullam.
      </p>
      <div className='flex gap-4'>
        <button className='btn btn-primary'>Click me</button>
        <button className='btn btn-secondary ml-4'>Click me</button>
        <button className='btn btn-ghost ml-4'>Click me</button>
      </div>
      <div className='flex gap-4'>
        <a href='#' className='link'>
          home
        </a>
        <a href='#' className='link'>
          about
        </a>
        <a href='#' className='link'>
          contact
        </a>
      </div>
      <form action=''>
        <div className='form-group'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            className='form-input'
            type='text'
            id='name'
            placeholder='Enter your name'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            className='form-input'
            type='email'
            id='email'
            placeholder='Enter your email'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='message' className='form-label'>
            Message
          </label>
          <textarea
            name='message'
            id='message'
            placeholder='Enter your message'
            className='form-input'
          />
        </div>
      </form>
      <PixelArtBackground />
      <ParticleImage imagePath='/images/portrait.jpg' brightnessThreshold={0.9} interactionRadius={60} />
    </>
  );
}

import PixelArtBackground from './animations/PixelArtBackground';
import ParticleImage from './animations/ParticleImage';
import Link from 'next/link';
import { Code, Cpu, Terminal } from 'lucide-react';

export default function Home() {
  return (
    <section className='relative h-svh'>
      <div className='container mx-auto px-4 pt-45 md:pt-5 z-10'>
        <div className='flex flex-col lg:flex-row items-center justify-between gap-10'>
          <div className='space-y-8 relative z-20'>
            <div className='space-y-4'>
              <div className='flex gap-4 items-center'>
                <Terminal className='text-accent-cyan w-12 h-12' />
                <Code className='text-accent-magenta w-12 h-12' />
                <Cpu className='text-accent-amber w-12 h-12' />
              </div>
              <h1 className='heading leading-tight'>
                FRONT END
                <br />
                DEVELOPER
              </h1>
            </div>
            <p className='body-text text-xl md:text-2xl max-w-2xl text-body'>
              hey, i&apos;m Ughur, a front end developer. I&apos;m building
              pixel-perfect web experiences with modern technologies
            </p>
            <div className='flex gap-6'>
              <Link href='/projects' className='btn btn-primary'>
                View Projects
              </Link>
              <Link href='/blog' className='btn btn-secondary'>
                Read Blog
              </Link>
            </div>
          </div>
          <div className='absolute lg:relative right-0 top-40 sm:top-0 w-full opacity-50 lg:opacity-100'>
            <ParticleImage
              imagePath='/images/linus.webp'
              particleColor='#b003c9'
              hoverColor='#5cfefe'
              brightnessThreshold={0.7}
              detailLevel={2}
              targetHeight={600}
              minRadius={1}
              className='w-full h-full'
              position={{
                x: 'center',
                y: 'center',
                offsetX: 50,
                offsetY: 0,
              }}
            />
          </div>
        </div>
      </div>
      <PixelArtBackground
        opacity={10}
        className='fixed top-0 left-0 w-full h-full'
      />
    </section>
  );
}

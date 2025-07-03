import { Code, Coffee, Star, Terminal, User } from 'lucide-react';

const page = () => {
  return (
    <>
      <div className='fixed bg-dots min-h-screen w-full'></div>
      <div className='relative z-10'>
        <div className='max-w-5xl mx-auto px-4 py-30 space-y-10'>
          <div className='card p-5 space-y-2 '>
            <div className='flex items-center gap-2'>
              <Terminal className='icon-primary' />
              <h1>profile.exe</h1>
            </div>
            <p className='card-text text-accent-pink'>System Status: Online</p>
            <p className='card-text text-accent-pink'>
              Location: Earth.sector_001
            </p>
            <p className='card-text text-accent-pink'>
              Mission: Building digital experiences
            </p>
          </div>
          <div className='card p-5 space-y-2 '>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2'>
                <User className='icon-primary' />
                <h1 className='heading-secondary'>whoami</h1>
              </div>
              <p className='card-text'>
                Greetings, traveler! I&apos;m a full-stack developer with a
                passion for creating immersive digital experiences. When
                I&apos;m not coding, you can find me exploring new technologies
                or debugging in cyberspace.
              </p>
            </div>
          </div>
          <div className='card p-5 space-y-2 '>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2'>
                <Code className='icon-primary' />
                <h1 className='heading-secondary'>skill_matrix</h1>
              </div>
              <div className='flex flex-col md:flex-row gap-8 md:gap-5'>
                <div className='card flex-1 min-w-0'>
                  <h1 className='text-accent-pink heading-secondary'>
                    Languages
                  </h1>
                  <ul className='font-pressStart text-body'>
                    <li className='list-item-layout'>
                      <Star className='list-item-icon' /> JavaScript
                    </li>
                    <li className='list-item-layout'>
                      <Star className='list-item-icon' /> TypeScript
                    </li>
                    <li className='list-item-layout'>
                      <Star className='list-item-icon' /> Python
                    </li>
                    <li className='list-item-layout'>
                      <Star className='list-item-icon' /> Java
                    </li>
                    <li className='list-item-layout'>
                      <Star className='list-item-icon' /> C#
                    </li>
                    <li className='list-item-layout'>
                      <Star className='list-item-icon' /> C++
                    </li>
                  </ul>
                </div>
                <div className='card flex-1 min-w-0'>
                  <h1 className='text-accent-pink heading-secondary'>
                    Frameworks
                  </h1>
                  <ul className='font-pressStart'>
                    <li className='list-item-layout'>
                      <Star className='list-item-icon' /> React
                    </li>
                    <li className='list-item-layout'>
                      <Star className='list-item-icon' /> Next.js
                    </li>
                    <li className='list-item-layout'>
                      <Star className='list-item-icon' /> Vue.js
                    </li>
                    <li className='list-item-layout'>
                      <Star className='list-item-icon' /> Angular
                    </li>
                  </ul>
                </div>
                <div className='card flex-1 min-w-0'>
                  <h1 className='text-accent-pink heading-secondary'>
                    Databases
                  </h1>
                  <ul className='font-pressStart text-body'>
                    <li className='list-item-layout'>
                      <Star className='list-item-icon' /> MySQL
                    </li>
                    <li className='list-item-layout'>
                      <Star className='list-item-icon' /> PostgreSQL
                    </li>
                    <li className='list-item-layout'>
                      <Star className='list-item-icon' /> MongoDB
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className='card p-5 space-y-2 '>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2'>
                <Coffee className='icon-primary' />
                <h2>current_status</h2>
              </div>
              <p className='card-text text-accent-pink'>
                Status: Available for new missions
              </p>
              <p className='card-text'>
                Last commit: Building something awesome
              </p>
              <p className='card-text'>Energy level: 100%</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

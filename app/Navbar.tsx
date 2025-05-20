'use client';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav
      className={`${
        isOpen && isMobile ? 'h-screen' : 'h-auto'
      } flex flex-col justify-center items-center p-5 bg-background`}
    >
      <MenuIcon
        className='absolute top-5 left-1/2 -translate-x-1/2 w-8 h-8 text-primary cursor-pointer hover:text-secondary md:hidden'
        onClick={toggleMenu}
      />
      {(isOpen || !isMobile) && (
        <ul className='flex flex-col md:flex-row items-center gap-8 transition-all duration-300'>
          <li>
            <Link href='/' className='link'>
              profile.exe
            </Link>
          </li>
          <li>
            <Link href='/' className='link'>
              missions.log
            </Link>
          </li>
          <li>
            <Link href='/' className='link hidden md:block'>
              <Image
                src='/images/yay.png'
                alt='logo'
                width={100}
                height={100}
                className='h-10 w-10 object-cover object-left'
              />
            </Link>
            <Link href='/' className='link block md:hidden'>
              home
            </Link>
          </li>
          <li>
            <Link href='/' className='link'>
              dev diary
            </Link>
          </li>
          <li>
            <Link href='/' className='link'>
              telepathy
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

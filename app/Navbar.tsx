'use client';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsOpen(false);
    }
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setActiveLink(pathname);
    console.log(activeLink);
    if (isOpen) {
      setIsOpen(false);
    }
  }, [pathname]);

  const primaryNavLinks = [
    {
      id: 'profile',
      href: '/about',
      text: 'profile.exe',
      active: activeLink === '/about',
    },
    {
      id: 'missions',
      href: '/work',
      text: 'missions.log',
      active: activeLink === '/work',
    },
    {
      id: 'diary',
      href: '/',
      text: 'dev diary',
      active: activeLink === '/blog',
    },
    {
      id: 'telepathy',
      href: '/',
      text: 'telepathy',
      active: activeLink === '/contact',
    },
  ];

  const commonLiClass = `transition-opacity duration-300 ease-in-out ${
    isScrolled && !isOpen
      ? 'md:opacity-0 md:pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto'
      : 'md:opacity-100'
  }`;

  return (
    <nav
      className={`group fixed top-0 left-0 w-full 
        flex flex-col justify-center 
        items-center p-3 z-999 h-auto
        ${isOpen ? 'h-screen bg-primary' : ''}
        ${
          isScrolled
            ? 'md:bg-transparent md:hover:bg-primary md:hover:border-2 md:border-accent-cyan'
            : ''
        }
      `}
    >
      <MenuIcon
        className='absolute top-5 left-1/2 -translate-x-1/2 w-8 h-8
        text-accent-cyan cursor-pointer hover:text-accent-pink md:hidden'
        onClick={toggleMenu}
      />
      <ul
        className={`${
          isOpen ? 'flex flex-col' : 'hidden'
        } md:flex md:flex-row items-center gap-8 transition-opacity duration-300 ease-in-out`}
      >
        {primaryNavLinks.slice(0, 2).map((link) => (
          <li key={link.id} className={commonLiClass}>
            <Link
              href={link.href}
              className={`link ${link.active ? 'text-accent-pink' : ''}`}
            >
              {link.text}
            </Link>
          </li>
        ))}

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

        {primaryNavLinks.slice(2).map((link) => (
          <li key={link.id} className={commonLiClass}>
            <Link href={link.href} className='link'>
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

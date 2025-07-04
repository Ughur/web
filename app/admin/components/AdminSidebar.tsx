'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, MessageSquare } from 'lucide-react';

const links = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/posts', label: 'Posts', icon: FileText },
  { href: '/admin/contacts', label: 'Contacts', icon: MessageSquare },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className='w-64 bg-gray-800 text-white p-5 pt-20'>
      <h2 className='text-2xl font-semibold mb-10'>Admin Panel</h2>
      <nav>
        <ul>
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/admin' && pathname.startsWith(link.href));
            return (
              <li key={link.href} className='mb-2'>
                <Link
                  href={link.href}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-700'
                  }`}
                >
                  <link.icon className='w-5 h-5 mr-3' />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

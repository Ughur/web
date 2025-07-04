import AdminSidebar from './components/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex min-h-screen bg-gray-900 text-gray-100'>
      <AdminSidebar />
      <main className='flex-1 p-10 pt-20'>{children}</main>
    </div>
  );
}

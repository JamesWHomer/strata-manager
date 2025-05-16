import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };
  
  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl">StrataManager</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className={`hover:underline ${isActive('/') ? 'font-medium' : ''}`}>
            Home
          </Link>
          <Link href="/committee" className={`hover:underline ${isActive('/committee') ? 'font-medium' : ''}`}>
            Committee
          </Link>
          <Link href="/bylaws" className={`hover:underline ${isActive('/bylaws') ? 'font-medium' : ''}`}>
            Bylaws
          </Link>
          <Link href="/maintenance" className={`hover:underline ${isActive('/maintenance') ? 'font-medium' : ''}`}>
            Maintenance
          </Link>
          <Link href="/meetings" className={`hover:underline ${isActive('/meetings') ? 'font-medium' : ''}`}>
            Meetings
          </Link>
          <Link href="/contacts" className={`hover:underline ${isActive('/contacts') ? 'font-medium' : ''}`}>
            Contacts
          </Link>
          <Link href="/report-issue" className={`hover:underline ${isActive('/report-issue') ? 'font-medium' : ''}`}>
            Report Issue
          </Link>
          <Link href="/api-test" className={`hover:underline ${isActive('/api-test') ? 'font-medium' : ''}`}>
            API Demo
          </Link>
        </nav>
        <button className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
} 
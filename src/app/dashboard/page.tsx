'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const lot = searchParams.get('lot');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-blue-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xl">StrataManager</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/committee" className="hover:underline">Committee</Link>
            <Link href="/api-test" className="hover:underline">API Test</Link>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-blue-700">Owner Dashboard</h1>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-4">Account Information</h2>
              <p className="text-gray-700 mb-2"><strong>Lot Number:</strong> {lot || 'Unknown'}</p>
              <p className="text-gray-700 mb-2"><strong>Status:</strong> <span className="text-green-600 font-semibold">Up to Date</span></p>
              <p className="text-gray-700 mb-4"><strong>Next Payment:</strong> No payments due</p>
              <div className="bg-green-100 p-4 rounded-md border border-green-300">
                <p className="text-green-800">
                  Your account is in good standing. All payments are up to date.
                </p>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Link href="/api-test" className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition">
                Back to API Test
              </Link>
              <button 
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                onClick={() => alert('This is a placeholder dashboard page demonstrating the redirect API functionality.')}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} StrataManager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 
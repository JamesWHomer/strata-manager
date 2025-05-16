'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason');

  let errorMessage = "An unknown error occurred.";
  if (reason === 'lot-not-found') {
    errorMessage = "The lot number you specified could not be found.";
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-red-600">Error</h1>
      
      <div className="bg-red-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
        <div className="bg-red-100 p-4 rounded-md border border-red-300">
          <p className="text-red-800">
            {errorMessage}
          </p>
        </div>
        <p className="text-gray-700 mt-4">
          This is a placeholder error page demonstrating the redirect API functionality.
        </p>
      </div>
      
      <div className="flex justify-between">
        <Link href="/api-test" className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition">
          Back to API Test
        </Link>
        <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default function ErrorPage() {
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
          <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
            <ErrorContent />
          </Suspense>
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
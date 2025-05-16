'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import Layout from '../components/Layout';

function ErrorContent() {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto text-center">
      <div className="mb-6 flex justify-center">
        <div className="bg-red-100 rounded-full p-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-4 text-red-700">Error</h1>
      <p className="text-gray-700 mb-6">We couldn't find the information you're looking for. The lot number may be invalid or not exist in our system.</p>
      
      <div className="bg-red-50 p-6 rounded-lg mb-8 text-left">
        <h2 className="text-xl font-semibold mb-4">What to do next:</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Check that you have entered the correct lot number</li>
          <li>Contact your strata manager if you're having trouble accessing your information</li>
          <li>Return to the home page and try again</li>
        </ul>
      </div>
      
      <div className="flex justify-center space-x-4">
        <Link href="/" className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition">
          Return Home
        </Link>
        <Link href="/api-test" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Back to API Test
        </Link>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Layout>
      <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
        <ErrorContent />
      </Suspense>
    </Layout>
  );
} 
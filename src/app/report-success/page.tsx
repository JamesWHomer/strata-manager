'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

// Wrap the component that uses useSearchParams in Suspense
function SearchParamsContent() {
  const searchParams = useSearchParams();
  const [submissionMethod, setSubmissionMethod] = useState<string>('');
  const [submissionData, setSubmissionData] = useState<Record<string, string>>({});
  
  useEffect(() => {
    // Check if we have query params (GET submission)
    if (searchParams.get('method') === 'GET') {
      setSubmissionMethod('GET');
      
      // Get all the parameters
      const data: Record<string, string> = {};
      searchParams.forEach((value, key) => {
        data[key] = value;
      });
      
      setSubmissionData(data);
    } else {
      // No query params means a POST submission
      setSubmissionMethod('POST');
    }
    
    // Generate random reference number
    const refNumber = `REF-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmissionData(prev => ({ ...prev, referenceNumber: refNumber }));
  }, [searchParams]);

  return (
    <>
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <p className="text-center font-medium">Your reference number is:</p>
        <p className="text-center text-2xl font-bold text-blue-700 my-2">
          {submissionData.referenceNumber || 'Processing...'}
        </p>
        <p className="text-center text-sm text-gray-600">
          Please save this number for future reference.
        </p>
      </div>
      
      <div className="mb-6">
        <p className="font-medium mb-2">What happens next?</p>
        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          <li>You will receive a confirmation email shortly.</li>
          <li>Your issue will be reviewed by the building manager or strata committee.</li>
          <li>You will be updated on any progress or resolution.</li>
          <li>You can follow up by quoting your reference number.</li>
        </ol>
      </div>
      
      {submissionMethod === 'GET' && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Submission Details (GET Request)</h2>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(submissionData)
                .filter(([key]) => key !== 'referenceNumber' && key !== 'method')
                .map(([key, value]) => (
                  <div key={key} className="py-1">
                    <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}:</span> {value}
                  </div>
                ))}
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Note: This data was submitted via a GET request and is visible in the URL.
          </p>
        </div>
      )}
      
      {submissionMethod === 'POST' && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Submission Details (POST Request)</h2>
          <div className="bg-gray-50 p-4 rounded-md">
            <p>
              Your data was submitted via POST request. This method is more secure as the data is not visible in the URL.
            </p>
            <p className="mt-2">
              Check your browser's network inspector to see the POST request details.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default function ReportSuccess() {
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
            <Link href="/bylaws" className="hover:underline">Bylaws</Link>
            <Link href="/maintenance" className="hover:underline">Maintenance</Link>
            <Link href="/meetings" className="hover:underline">Meetings</Link>
            <Link href="/contacts" className="hover:underline">Contacts</Link>
            <Link href="/report-issue" className="hover:underline">Report Issue</Link>
          </nav>
          <button className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-green-100 rounded-full p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-center mb-6">Issue Report Submitted!</h1>
              
              <p className="text-gray-700 text-center mb-6">
                Thank you for submitting your issue report. We have received your information and will take appropriate action.
              </p>
              
              <Suspense fallback={<div className="text-center p-4">Loading submission details...</div>}>
                <SearchParamsContent />
              </Suspense>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition text-center">
                  Return to Home
                </Link>
                <Link href="/report-issue" className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md font-medium hover:bg-gray-300 transition text-center">
                  Submit Another Issue
                </Link>
              </div>
            </div>
            
            <div className="bg-yellow-50 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                HTTP Request Types Explained
              </h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  <strong>GET Request:</strong> Data is appended to the URL as query parameters. 
                  This type of request is visible in the browser history and bookmarks. 
                  It's suitable for non-sensitive data or when you want to share a link with pre-filled form data.
                </p>
                <p>
                  <strong>POST Request:</strong> Data is sent in the request body, not visible in the URL. 
                  This method is more secure for sensitive information and is generally preferred for form submissions.
                </p>
                <p>
                  <strong>HTTP Status Codes:</strong> Servers respond with status codes to indicate the result of a request:
                </p>
                <ul className="list-disc pl-5">
                  <li><strong>2xx (Success):</strong> Request was successfully received and processed (e.g., 200 OK, 201 Created)</li>
                  <li><strong>3xx (Redirection):</strong> Client needs to take additional action (e.g., 301 Moved Permanently, 302 Found)</li>
                  <li><strong>4xx (Client Error):</strong> Client-side error (e.g., 404 Not Found, 403 Forbidden)</li>
                  <li><strong>5xx (Server Error):</strong> Server-side error (e.g., 500 Internal Server Error)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-4">StrataManager</h2>
              <p className="text-gray-400">Managing ABC Apartments since 2023</p>
              <p className="text-gray-400 mt-2">123 Building Street, Sydney NSW 2000</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/committee" className="text-gray-400 hover:text-white">Committee</Link></li>
                  <li><Link href="/bylaws" className="text-gray-400 hover:text-white">Bylaws</Link></li>
                  <li><Link href="/maintenance" className="text-gray-400 hover:text-white">Maintenance</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Resources</h3>
                <ul className="space-y-2">
                  <li><Link href="/meetings" className="text-gray-400 hover:text-white">Meetings</Link></li>
                  <li><Link href="/contacts" className="text-gray-400 hover:text-white">Contacts</Link></li>
                  <li><Link href="/report-issue" className="text-gray-400 hover:text-white">Report Issue</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} StrataManager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 
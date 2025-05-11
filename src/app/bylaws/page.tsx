'use client';

import Link from "next/link";
import { useState } from "react";

export default function Bylaws() {
  // Sample bylaws data
  const bylaws = [
    {
      id: 1,
      title: "Noise and Behavior",
      content: "Residents must not create noise likely to interfere with the peaceful enjoyment of other residents. Quiet hours are between 10:00 PM and 7:00 AM on weekdays, and 11:00 PM to 8:00 AM on weekends and public holidays."
    },
    {
      id: 2,
      title: "Pets",
      content: "Keeping of animals requires written approval from the Owners Corporation. Applications must be submitted in writing, including details of the animal. Approval may be subject to reasonable conditions and may be revoked if conditions are not met."
    },
    {
      id: 3,
      title: "Parking",
      content: "Residents must not park or stand a vehicle on common property without approval. Visitors must use designated visitor parking spaces only and for a maximum of 8 hours. Residents must not use visitor parking spaces."
    },
    {
      id: 4,
      title: "Waste Disposal",
      content: "Residents must dispose of garbage in a clean and tidy manner and in accordance with local council requirements. Recyclable materials must be separated and placed in designated recycling bins. Large items must not be placed in or around garbage chutes or bins."
    },
    {
      id: 5,
      title: "Moving and Deliveries",
      content: "Residents must notify building management at least 48 hours before moving in or out, or receiving large deliveries that require use of elevators. Moving is only permitted between 8:00 AM and 4:00 PM Monday to Saturday."
    },
    {
      id: 6,
      title: "Common Areas",
      content: "Residents must not obstruct common property or leave personal items in common areas. Common facilities such as the gym, pool, and barbecue area must be used in accordance with their specific rules and hours of operation."
    },
    {
      id: 7,
      title: "Renovations",
      content: "Any renovations or alterations to lots require written approval from the Owners Corporation. Applications must include detailed plans and specifications. Work may only be carried out between 8:00 AM and 4:00 PM Monday to Friday, and 9:00 AM to 1:00 PM on Saturdays."
    }
  ];

  // State to track which bylaw is expanded
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Toggle expansion
  const toggleExpand = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

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
            <Link href="/bylaws" className="hover:underline font-medium">Bylaws</Link>
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
          <h1 className="text-3xl font-bold mb-2">Building Bylaws</h1>
          <p className="text-gray-600 mb-8">The following bylaws govern ABC Apartments and must be followed by all residents and visitors</p>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">About Bylaws</h2>
            <p className="mb-4">
              Bylaws are rules that govern how owners and residents use and enjoy their lot and common property. 
              They're designed to enhance harmonious living in the strata scheme and are legally enforceable 
              under the Strata Schemes Management Act 2015 (NSW).
            </p>
            <p>Breaches of bylaws may result in warnings, notices to comply, and potentially fines imposed by the NSW Civil and Administrative Tribunal.</p>
          </div>
          
          <div className="space-y-4">
            {bylaws.map(bylaw => (
              <div key={bylaw.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button 
                  className="w-full px-6 py-4 text-left font-medium flex justify-between items-center hover:bg-gray-50 transition"
                  onClick={() => toggleExpand(bylaw.id)}
                >
                  <span>Bylaw {bylaw.id}: {bylaw.title}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 transition-transform ${expandedId === bylaw.id ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div 
                  className={`px-6 py-4 border-t border-gray-100 transition-all duration-300 ease-in-out ${
                    expandedId === bylaw.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 hidden'
                  }`}
                >
                  <p className="text-gray-700">{bylaw.content}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-blue-50 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Have Questions About Bylaws?</h2>
            <p className="mb-4">If you have any questions about the bylaws or wish to report a breach, please contact the committee:</p>
            <Link href="/report-issue" className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition inline-block">
              Contact the Committee
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
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
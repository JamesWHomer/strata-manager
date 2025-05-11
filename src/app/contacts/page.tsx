import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Important Contacts | Strata Manager",
  description: "Emergency and key contacts for ABC Apartments strata building",
};

export default function Contacts() {
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
            <Link href="/contacts" className="hover:underline font-medium">Contacts</Link>
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
          <h1 className="text-3xl font-bold mb-2">Important Contacts</h1>
          <p className="text-gray-600 mb-8">Emergency and key contacts for ABC Apartments</p>
          
          {/* Emergency Contacts */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-red-100 text-red-700 p-1 rounded-full mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </span>
              Emergency Contacts
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="border-l-4 border-red-600 p-6">
                  <h3 className="text-xl font-semibold mb-3">Life-Threatening Emergency</h3>
                  <p className="text-gray-600 mb-4">For fire, police, or ambulance</p>
                  <a href="tel:000" className="flex items-center text-xl font-bold text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    000
                  </a>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="border-l-4 border-orange-600 p-6">
                  <h3 className="text-xl font-semibold mb-3">Building Emergency</h3>
                  <p className="text-gray-600 mb-4">For urgent building issues (water leaks, power outages, etc.)</p>
                  <a href="tel:0400123456" className="flex items-center text-xl font-bold text-orange-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    0400 123 456
                  </a>
                </div>
              </div>
            </div>
          </section>
          
          {/* Building Management Contacts */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-blue-100 text-blue-700 p-1 rounded-full mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </span>
              Building Management
            </h2>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Building Manager</h3>
                    <p className="mb-2"><span className="font-medium">Name:</span> Michael Johnson</p>
                    <p className="mb-2"><span className="font-medium">Phone:</span> <a href="tel:0412345678" className="text-blue-600 hover:underline">0412 345 678</a></p>
                    <p className="mb-2"><span className="font-medium">Email:</span> <a href="mailto:manager@abcapartments.com.au" className="text-blue-600 hover:underline">manager@abcapartments.com.au</a></p>
                    <p className="text-sm text-gray-600 mt-2">On site Monday-Friday, 8:00 AM - 4:00 PM</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Strata Manager</h3>
                    <p className="mb-2"><span className="font-medium">Company:</span> XYZ Strata Management</p>
                    <p className="mb-2"><span className="font-medium">Contact:</span> Sarah Williams</p>
                    <p className="mb-2"><span className="font-medium">Phone:</span> <a href="tel:0298765432" className="text-blue-600 hover:underline">02 9876 5432</a></p>
                    <p className="mb-2"><span className="font-medium">Email:</span> <a href="mailto:admin@xyzstrata.com.au" className="text-blue-600 hover:underline">admin@xyzstrata.com.au</a></p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Security</h3>
                    <p className="mb-2"><span className="font-medium">Company:</span> SecureGuard Services</p>
                    <p className="mb-2"><span className="font-medium">Patrol Hours:</span> 8:00 PM - 6:00 AM</p>
                    <p className="mb-2"><span className="font-medium">Phone:</span> <a href="tel:0487654321" className="text-blue-600 hover:underline">0487 654 321</a></p>
                    <p className="text-sm text-gray-600 mt-2">For emergencies outside patrol hours, call the Building Emergency number</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Service Providers */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-green-100 text-green-700 p-1 rounded-full mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              Approved Service Providers
            </h2>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <p className="mb-4">The following service providers have been approved by the strata committee for maintenance and repairs. Owners should use these providers for work that affects common property.</p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Plumbing</h3>
                    <p className="mb-1"><span className="font-medium">Provider:</span> John's Plumbing</p>
                    <p className="mb-1"><span className="font-medium">Phone:</span> <a href="tel:0423456789" className="text-blue-600 hover:underline">0423 456 789</a></p>
                    <p className="text-sm text-gray-600 mt-1">24-hour emergency service available</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Electrical</h3>
                    <p className="mb-1"><span className="font-medium">Provider:</span> ElectraTech Solutions</p>
                    <p className="mb-1"><span className="font-medium">Phone:</span> <a href="tel:0445678901" className="text-blue-600 hover:underline">0445 678 901</a></p>
                    <p className="text-sm text-gray-600 mt-1">Licensed for all electrical work</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Locksmith</h3>
                    <p className="mb-1"><span className="font-medium">Provider:</span> Secure Lock Services</p>
                    <p className="mb-1"><span className="font-medium">Phone:</span> <a href="tel:0467890123" className="text-blue-600 hover:underline">0467 890 123</a></p>
                    <p className="text-sm text-gray-600 mt-1">Building master key system certified</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Cleaning</h3>
                    <p className="mb-1"><span className="font-medium">Provider:</span> BrightClean Services</p>
                    <p className="mb-1"><span className="font-medium">Phone:</span> <a href="tel:0412345987" className="text-blue-600 hover:underline">0412 345 987</a></p>
                    <p className="text-sm text-gray-600 mt-1">Common area cleaning 3 times per week</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Pest Control</h3>
                    <p className="mb-1"><span className="font-medium">Provider:</span> PestGuard Solutions</p>
                    <p className="mb-1"><span className="font-medium">Phone:</span> <a href="tel:0476543210" className="text-blue-600 hover:underline">0476 543 210</a></p>
                    <p className="text-sm text-gray-600 mt-1">Quarterly treatments for common areas</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Waste Management</h3>
                    <p className="mb-1"><span className="font-medium">Provider:</span> City Waste Services</p>
                    <p className="mb-1"><span className="font-medium">Phone:</span> <a href="tel:0289765432" className="text-blue-600 hover:underline">02 8976 5432</a></p>
                    <p className="text-sm text-gray-600 mt-1">Scheduled bin collection on Mondays and Thursdays</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Local Council and Utilities */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-purple-100 text-purple-700 p-1 rounded-full mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </span>
              Local Council & Utilities
            </h2>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Local Council</h3>
                    <p className="mb-2"><span className="font-medium">Name:</span> Sydney City Council</p>
                    <p className="mb-2"><span className="font-medium">Phone:</span> <a href="tel:0292659333" className="text-blue-600 hover:underline">02 9265 9333</a></p>
                    <p className="mb-2"><span className="font-medium">Email:</span> <a href="mailto:council@sydney.nsw.gov.au" className="text-blue-600 hover:underline">council@sydney.nsw.gov.au</a></p>
                    <p className="mb-2"><span className="font-medium">Website:</span> <a href="https://www.cityofsydney.nsw.gov.au/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.cityofsydney.nsw.gov.au</a></p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Utilities</h3>
                    <p className="mb-2"><span className="font-medium">Electricity Emergency:</span> <a href="tel:131351" className="text-blue-600 hover:underline">13 13 51</a></p>
                    <p className="mb-2"><span className="font-medium">Gas Emergency:</span> <a href="tel:131909" className="text-blue-600 hover:underline">13 19 09</a></p>
                    <p className="mb-2"><span className="font-medium">Water Emergency:</span> <a href="tel:132090" className="text-blue-600 hover:underline">13 20 90</a></p>
                    <p className="mb-2"><span className="font-medium">NBN Issues:</span> <a href="tel:1800275869" className="text-blue-600 hover:underline">1800 275 869</a></p>
                  </div>
                </div>
              </div>
            </div>
          </section>
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
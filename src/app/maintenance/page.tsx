'use client';

import Link from "next/link";
import { useState } from "react";

export default function Maintenance() {
  // Sample maintenance requests data
  const initialRequests = [
    {
      id: "M2023-001",
      title: "Leaking tap in common bathroom",
      status: "Completed",
      dateSubmitted: "2023-11-05",
      lastUpdated: "2023-11-12",
      priority: "Low",
      description: "The tap in the ground floor common bathroom is leaking continuously, causing water wastage.",
      assignedTo: "John's Plumbing",
      comments: [
        { date: "2023-11-06", author: "Admin", text: "Request received and scheduled for assessment." },
        { date: "2023-11-08", author: "John's Plumbing", text: "Inspected tap. Washer needs replacement. Will return with parts." },
        { date: "2023-11-12", author: "John's Plumbing", text: "Tap repaired and tested. No more leaks." }
      ]
    },
    {
      id: "M2023-002",
      title: "Garage door not closing properly",
      status: "In Progress",
      dateSubmitted: "2023-11-15",
      lastUpdated: "2023-11-18",
      priority: "Medium",
      description: "The main garage door is not closing all the way, leaving a gap at the bottom.",
      assignedTo: "SecureDoor Services",
      comments: [
        { date: "2023-11-16", author: "Admin", text: "Request received and forwarded to door company." },
        { date: "2023-11-18", author: "SecureDoor Services", text: "Inspected door. Sensor alignment issue. Parts ordered, will return to complete repair next week." }
      ]
    },
    {
      id: "M2023-003",
      title: "Flickering lights in hallway",
      status: "Scheduled",
      dateSubmitted: "2023-11-20",
      lastUpdated: "2023-11-22",
      priority: "Medium",
      description: "The lights in the 3rd floor hallway are flickering intermittently.",
      assignedTo: "ElectraTech",
      comments: [
        { date: "2023-11-21", author: "Admin", text: "Request logged. Electrician to be scheduled." },
        { date: "2023-11-22", author: "ElectraTech", text: "Scheduled for inspection on November 28th between 9am and 12pm." }
      ]
    },
    {
      id: "M2023-004",
      title: "Lobby intercom system not working",
      status: "Open",
      dateSubmitted: "2023-11-25",
      lastUpdated: "2023-11-25",
      priority: "High",
      description: "The intercom system in the main lobby isn't connecting to apartments. Visitors can't announce themselves.",
      assignedTo: "Unassigned",
      comments: [
        { date: "2023-11-25", author: "Admin", text: "Request received and marked as high priority. Seeking quotes from service providers." }
      ]
    }
  ];

  // State for the maintenance requests
  const [requests] = useState(initialRequests);
  
  // State for the selected request
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  
  // Filter state
  const [statusFilter, setStatusFilter] = useState<string>("All");
  
  // Get filtered requests
  const filteredRequests = statusFilter === "All" 
    ? requests 
    : requests.filter(req => req.status === statusFilter);

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Scheduled":
        return "bg-yellow-100 text-yellow-800";
      case "Open":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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
            <Link href="/bylaws" className="hover:underline">Bylaws</Link>
            <Link href="/maintenance" className="hover:underline font-medium">Maintenance</Link>
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
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Maintenance Requests</h1>
              <p className="text-gray-600">Track and manage building maintenance issues</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link href="/report-issue" className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition inline-block">
                Submit New Request
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Maintenance Request Status</h2>
            <p className="mb-6">
              The table below shows all current and recent maintenance requests for ABC Apartments. 
              Click on any request to view more details.
            </p>
            
            <div className="mb-4">
              <label htmlFor="statusFilter" className="mr-2 font-medium">Filter by status:</label>
              <select 
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded py-1 px-2"
              >
                <option value="All">All</option>
                <option value="Open">Open</option>
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left">ID</th>
                    <th className="py-3 px-4 text-left">Title</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Date Submitted</th>
                    <th className="py-3 px-4 text-left">Last Updated</th>
                    <th className="py-3 px-4 text-left">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRequests.map(request => (
                    <tr 
                      key={request.id} 
                      className={`hover:bg-gray-50 cursor-pointer ${selectedRequest === request.id ? 'bg-blue-50' : ''}`}
                      onClick={() => setSelectedRequest(request.id === selectedRequest ? null : request.id)}
                    >
                      <td className="py-3 px-4">{request.id}</td>
                      <td className="py-3 px-4">{request.title}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{request.dateSubmitted}</td>
                      <td className="py-3 px-4">{request.lastUpdated}</td>
                      <td className="py-3 px-4">{request.priority}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Detail view for selected request */}
          {selectedRequest && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              {(() => {
                const request = requests.find(r => r.id === selectedRequest);
                if (!request) return null;
                
                return (
                  <>
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-semibold">{request.title}</h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-500">Request ID</p>
                        <p className="font-medium">{request.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Assigned To</p>
                        <p className="font-medium">{request.assignedTo}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date Submitted</p>
                        <p className="font-medium">{request.dateSubmitted}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Last Updated</p>
                        <p className="font-medium">{request.lastUpdated}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Priority</p>
                        <p className="font-medium">{request.priority}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-gray-700">{request.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Activity</h3>
                      <div className="space-y-4">
                        {request.comments.map((comment, index) => (
                          <div key={index} className="border-l-2 border-gray-200 pl-4 py-1">
                            <div className="flex justify-between items-start">
                              <p className="font-medium">{comment.author}</p>
                              <p className="text-sm text-gray-500">{comment.date}</p>
                            </div>
                            <p className="text-gray-700 mt-1">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
          
          <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Maintenance Guidelines</h2>
            <p className="mb-4">If you notice any maintenance issues in common areas or your lot, please report them promptly:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>For urgent issues that pose safety risks or could cause significant property damage (e.g., water leaks, electrical hazards), call the emergency number: <span className="font-medium">0400 123 456</span></li>
              <li>For non-urgent issues, submit a maintenance request through the form</li>
              <li>Please provide as much detail as possible, including location, description of the issue, and photos if available</li>
              <li>All requests are reviewed by the building manager and prioritized based on urgency and impact</li>
            </ul>
            <Link href="/report-issue" className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition inline-block">
              Submit Maintenance Request
            </Link>
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
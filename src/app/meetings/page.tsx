'use client';

import Link from "next/link";
import { useState } from "react";

export default function Meetings() {
  // Sample upcoming meetings data
  const upcomingMeetings = [
    {
      id: 1,
      title: "Annual General Meeting",
      date: "2023-12-15",
      time: "18:30 - 20:30",
      location: "Building Common Room",
      description: "Annual General Meeting to elect the new committee, review financial statements, and discuss the budget for the next financial year.",
      agenda: [
        "Welcome and confirmation of quorum",
        "Approval of previous AGM minutes",
        "Chairperson's report",
        "Treasurer's report and presentation of financial statements",
        "Consideration of the budget for the next financial year",
        "Setting of levies for the next financial year",
        "Election of strata committee members",
        "Review and consideration of by-laws",
        "General business"
      ],
      documents: [
        { name: "AGM Notice", link: "/documents/agm-notice.pdf" },
        { name: "Proxy Form", link: "/documents/proxy-form.pdf" },
        { name: "Previous Minutes", link: "/documents/previous-agm-minutes.pdf" },
        { name: "Financial Statements", link: "/documents/financial-statements.pdf" }
      ]
    },
    {
      id: 2,
      title: "Strata Committee Meeting",
      date: "2023-11-30",
      time: "19:00 - 20:00",
      location: "Building Common Room",
      description: "Regular committee meeting to discuss maintenance issues, correspondence, and preparations for the upcoming AGM.",
      agenda: [
        "Confirmation of previous minutes",
        "Correspondence in/out",
        "Maintenance update",
        "Financial report",
        "AGM preparation",
        "General business"
      ],
      documents: [
        { name: "Committee Meeting Notice", link: "/documents/committee-meeting-notice.pdf" },
        { name: "Previous Minutes", link: "/documents/previous-committee-minutes.pdf" }
      ]
    }
  ];

  // Sample past meetings data
  const pastMeetings = [
    {
      id: 3,
      title: "Extraordinary General Meeting",
      date: "2023-09-10",
      time: "18:00 - 19:30",
      location: "Building Common Room",
      description: "Extraordinary General Meeting to discuss and vote on the proposed lobby renovation project.",
      minutes: "/documents/egm-minutes.pdf"
    },
    {
      id: 4,
      title: "Strata Committee Meeting",
      date: "2023-08-25",
      time: "19:00 - 20:15",
      location: "Building Common Room",
      description: "Regular committee meeting to discuss building maintenance, security upgrades, and planning for the EGM.",
      minutes: "/documents/committee-minutes-aug.pdf"
    },
    {
      id: 5,
      title: "Strata Committee Meeting",
      date: "2023-07-28",
      time: "19:00 - 20:00",
      location: "Building Common Room",
      description: "Regular committee meeting to discuss quarterly financial review and ongoing maintenance issues.",
      minutes: "/documents/committee-minutes-jul.pdf"
    }
  ];
  
  // State for meeting details modal
  const [selectedMeeting, setSelectedMeeting] = useState<number | null>(null);
  
  // Get selected meeting data
  const getMeetingById = (id: number) => {
    return [...upcomingMeetings, ...pastMeetings].find(meeting => meeting.id === id);
  };
  
  // Format date function
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-AU', options);
  };

  // Check if a meeting is upcoming or past
  const isUpcomingMeeting = (id: number) => {
    return upcomingMeetings.some(meeting => meeting.id === id);
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
            <Link href="/maintenance" className="hover:underline">Maintenance</Link>
            <Link href="/meetings" className="hover:underline font-medium">Meetings</Link>
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
          <h1 className="text-3xl font-bold mb-2">Meetings</h1>
          <p className="text-gray-600 mb-8">Schedule of upcoming meetings and archives of past meetings</p>
          
          {/* Upcoming Meetings */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Upcoming Meetings</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingMeetings.map(meeting => (
                <div key={meeting.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="border-l-4 border-blue-600 p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold">{meeting.title}</h3>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Upcoming</span>
                    </div>
                    <p className="text-gray-600 mb-4">{meeting.description}</p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">{formatDate(meeting.date)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-medium">{meeting.time}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">{meeting.location}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedMeeting(meeting.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Past Meetings */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Past Meetings</h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-gray-700">Date</th>
                    <th className="py-3 px-4 text-left text-gray-700">Title</th>
                    <th className="py-3 px-4 text-left text-gray-700">Location</th>
                    <th className="py-3 px-4 text-left text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pastMeetings.map(meeting => (
                    <tr key={meeting.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">{formatDate(meeting.date)}</td>
                      <td className="py-3 px-4 font-medium">{meeting.title}</td>
                      <td className="py-3 px-4">{meeting.location}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => setSelectedMeeting(meeting.id)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          >
                            View Details
                          </button>
                          <a 
                            href={meeting.minutes} 
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Minutes
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          
          {/* Calendar Notice */}
          <div className="bg-blue-50 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Meeting Calendar</h2>
            <p className="mb-4">You can add all strata meetings to your calendar by subscribing to our iCal feed:</p>
            <div className="flex space-x-4">
              <a href="/api/calendar.ics" className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Add to Calendar
              </a>
              <button 
                onClick={() => alert('Calendar URL copied to clipboard!')}
                className="text-blue-600 border border-blue-600 px-6 py-2 rounded-md font-medium hover:bg-blue-50 transition inline-flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Calendar URL
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Meeting Details Modal */}
      {selectedMeeting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {(() => {
                const meeting = getMeetingById(selectedMeeting);
                if (!meeting) return null;
                
                const isUpcoming = isUpcomingMeeting(selectedMeeting);
                
                return (
                  <>
                    <div className="flex justify-between items-start mb-6">
                      <h2 className="text-2xl font-bold">{meeting.title}</h2>
                      <button 
                        onClick={() => setSelectedMeeting(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">{formatDate(meeting.date)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-medium">{meeting.time}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">{meeting.location}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-gray-700">{meeting.description}</p>
                    </div>
                    
                    {isUpcoming && 'agenda' in meeting && (
                      <div className="mb-6">
                        <h3 className="font-semibold mb-2">Agenda</h3>
                        <ol className="list-decimal pl-5 space-y-1">
                          {meeting.agenda.map((item, index) => (
                            <li key={index} className="text-gray-700">{item}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                    
                    {isUpcoming && 'documents' in meeting && (
                      <div className="mb-6">
                        <h3 className="font-semibold mb-2">Documents</h3>
                        <div className="space-y-2">
                          {meeting.documents.map((doc, index) => (
                            <a 
                              key={index}
                              href={doc.link}
                              className="flex items-center text-blue-600 hover:text-blue-800"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                              {doc.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {!isUpcoming && 'minutes' in meeting && (
                      <div>
                        <h3 className="font-semibold mb-2">Minutes</h3>
                        <a 
                          href={meeting.minutes}
                          className="flex items-center text-blue-600 hover:text-blue-800"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          Download Meeting Minutes
                        </a>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-end rounded-b-lg">
              <button 
                onClick={() => setSelectedMeeting(null)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded font-medium hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
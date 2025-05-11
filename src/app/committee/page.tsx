import Link from "next/link";
import Image from "next/image";

export default function Committee() {
  // Sample committee member data
  const committeeMembers = [
    {
      id: 1,
      name: "Jane Smith",
      role: "Chairperson",
      bio: "Jane has been living in the building for 10 years and has served on the committee for 5 years.",
      email: "jane.smith@example.com",
      image: "/placeholder-profile.jpg"
    },
    {
      id: 2,
      name: "John Brown",
      role: "Secretary",
      bio: "John is a retired lawyer with expertise in strata law and has been on the committee for 3 years.",
      email: "john.brown@example.com",
      image: "/placeholder-profile.jpg"
    },
    {
      id: 3,
      name: "Sarah Johnson",
      role: "Treasurer",
      bio: "Sarah has a background in accounting and ensures the building's finances are well managed.",
      email: "sarah.johnson@example.com",
      image: "/placeholder-profile.jpg"
    },
    {
      id: 4,
      name: "Michael Chen",
      role: "Committee Member",
      bio: "Michael works in construction and provides valuable insights on building maintenance issues.",
      email: "michael.chen@example.com",
      image: "/placeholder-profile.jpg"
    },
    {
      id: 5,
      name: "Amanda Davis",
      role: "Committee Member",
      bio: "Amanda has a background in community management and focuses on improving resident experience.",
      email: "amanda.davis@example.com",
      image: "/placeholder-profile.jpg"
    }
  ];

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
            <Link href="/committee" className="hover:underline font-medium">Committee</Link>
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
          <h1 className="text-3xl font-bold mb-2">Strata Committee</h1>
          <p className="text-gray-600 mb-8">Meet the elected representatives managing ABC Apartments</p>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">About the Committee</h2>
            <p className="mb-4">The Strata Committee is elected by the Owners Corporation to manage the day-to-day operations of the building. The committee consists of up to 9 members and is responsible for:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Managing the building's finances</li>
              <li>Overseeing maintenance and repairs</li>
              <li>Enforcing by-laws</li>
              <li>Organizing meetings</li>
              <li>Responding to owner and resident concerns</li>
            </ul>
            <p>Committee members are elected at each Annual General Meeting for a term of one year.</p>
          </div>
          
          <h2 className="text-2xl font-semibold mb-6">Committee Members</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {committeeMembers.map(member => (
              <div key={member.id} className="bg-white rounded-lg shadow-md p-6 flex">
                <div className="w-24 h-24 bg-gray-200 rounded-full mr-4 flex-shrink-0 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    {member.image ? (
                      <Image 
                        src={member.image} 
                        alt={member.name} 
                        fill 
                        className="object-cover"
                      />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-3">{member.bio}</p>
                  <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {member.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-blue-50 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Contact the Committee</h2>
            <p className="mb-4">If you have any questions or concerns for the committee, please use our contact form:</p>
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
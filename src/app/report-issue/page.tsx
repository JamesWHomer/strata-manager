'use client';

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, FormEvent, Suspense } from "react";

// Component that uses useSearchParams should be wrapped in Suspense
function ReportIssueForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Pre-filled data from query parameters (GET)
  const initialIssueType = searchParams.get('issueType') || '';
  const initialLocation = searchParams.get('location') || '';
  const initialDescription = searchParams.get('description') || '';
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    lotNumber: '',
    issueType: initialIssueType,
    location: initialLocation,
    description: initialDescription,
    priority: 'Normal',
    preferredContact: 'Email',
    attachFile: null as File | null
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMethod, setSubmitMethod] = useState<'GET' | 'POST'>('POST');
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({ ...prev, attachFile: e.target.files?.[0] || null }));
    }
  };
  
  // Validate the form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.lotNumber.trim()) newErrors.lotNumber = 'Lot number is required';
    if (!formData.issueType.trim()) newErrors.issueType = 'Issue type is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    if (submitMethod === 'GET') {
      // For GET submission - redirect with query parameters
      const queryParams = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        lotNumber: formData.lotNumber,
        issueType: formData.issueType,
        location: formData.location,
        description: formData.description,
        priority: formData.priority,
        preferredContact: formData.preferredContact,
        method: 'GET'
      });
      
      // Simulate submission delay
      setTimeout(() => {
        router.push(`/report-success?${queryParams.toString()}`);
      }, 1000);
    } else {
      // For POST submission - would normally send to server
      // Simulating a POST request with delay
      setTimeout(() => {
        console.log('Submitted form data via POST:', formData);
        router.push('/report-success');
      }, 1000);
    }
  };
  
  // Switch between GET and POST
  const toggleSubmitMethod = () => {
    setSubmitMethod(prev => prev === 'GET' ? 'POST' : 'GET');
  };

  return (
    <div className="md:col-span-2">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Issue Report Form</h2>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Submit Method:</span>
            <button
              type="button"
              onClick={toggleSubmitMethod}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ease-in-out duration-200 focus:outline-none ${
                submitMethod === 'POST' ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block w-4 h-4 transform transition ease-in-out duration-200 bg-white rounded-full ${
                  submitMethod === 'POST' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-sm font-medium ml-2">
              {submitMethod === 'POST' ? 'POST' : 'GET'}
            </span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="John Smith"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="john.smith@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="0400 123 456"
              />
            </div>
            
            <div>
              <label htmlFor="lotNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Lot Number *
              </label>
              <input
                type="text"
                id="lotNumber"
                name="lotNumber"
                value={formData.lotNumber}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.lotNumber ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g. 101"
              />
              {errors.lotNumber && <p className="mt-1 text-sm text-red-500">{errors.lotNumber}</p>}
            </div>
          </div>
          
          <div>
            <label htmlFor="issueType" className="block text-sm font-medium text-gray-700 mb-1">
              Issue Type *
            </label>
            <select
              id="issueType"
              name="issueType"
              value={formData.issueType}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.issueType ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Issue Type</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Bylaw Breach">By-law Breach</option>
              <option value="Noise Complaint">Noise Complaint</option>
              <option value="Security Concern">Security Concern</option>
              <option value="Common Area">Common Area Issue</option>
              <option value="Other">Other</option>
            </select>
            {errors.issueType && <p className="mt-1 text-sm text-red-500">{errors.issueType}</p>}
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g. Garage, Level 3 hallway, unit 101"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full p-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Please provide a detailed description of the issue..."
            ></textarea>
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="preferredContact" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Contact Method
              </label>
              <select
                id="preferredContact"
                name="preferredContact"
                value={formData.preferredContact}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="Either">Either</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="attachFile" className="block text-sm font-medium text-gray-700 mb-1">
              Attach Files (optional)
            </label>
            <input
              type="file"
              id="attachFile"
              name="attachFile"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              accept="image/*,.pdf"
            />
            <p className="mt-1 text-sm text-gray-500">
              You can attach photos or documents related to the issue (max 5MB)
            </p>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              required
            />
            <label htmlFor="consent" className="ml-2 block text-sm text-gray-700">
              I consent to the collection and storage of the personal information provided in this form *
            </label>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : `Submit via ${submitMethod}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ReportIssue() {
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
            <Link href="/report-issue" className="hover:underline font-medium">Report Issue</Link>
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
          <h1 className="text-3xl font-bold mb-2">Report an Issue</h1>
          <p className="text-gray-600 mb-8">Use this form to report maintenance issues, by-law breaches, or other concerns</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Suspense fallback={<div className="md:col-span-2 p-6 bg-white rounded-lg shadow-md">Loading form...</div>}>
              <ReportIssueForm />
            </Suspense>
            
            <div>
              <div className="bg-blue-50 rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">How It Works</h2>
                <p className="text-gray-700 mb-4">
                  Once you submit an issue report, it will be logged in our system and assigned to the appropriate person for resolution.
                </p>
                <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                  <li>Fill out the form with as much detail as possible</li>
                  <li>Submit your report</li>
                  <li>Receive a confirmation email with your reference number</li>
                  <li>The building manager or strata committee will review your report</li>
                  <li>You will be updated on the status and resolution of your issue</li>
                </ol>
              </div>
              
              <div className="bg-yellow-50 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Emergency Issues
                </h2>
                <p className="text-gray-700 mb-4">
                  This form is not for reporting emergencies. For urgent issues that require immediate attention:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 mb-4">
                  <li>For life-threatening emergencies, call <strong>000</strong></li>
                  <li>For urgent building issues (water leaks, elevator issues, etc.), call <strong>0400 123 456</strong></li>
                </ul>
                <Link href="/contacts" className="text-blue-600 hover:underline flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  View all emergency contacts
                </Link>
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
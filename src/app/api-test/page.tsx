'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Suspense } from 'react';
import Layout from '../components/Layout';

// Define types for our API responses
interface GreetingResponse {
  greeting: string;
  message: string;
  timestamp: string;
}

interface FundStatus {
  dueDate: string;
  amountDue: number;
  paid: boolean;
}

interface PaymentRecord {
  date: string;
  amount: number;
  type: string;
  status: string;
}

interface LevyStatusResponse {
  lotNumber: string;
  buildingName: string;
  ownerName: string;
  nextPaymentDate: string;
  totalDue: number;
  adminFund: FundStatus;
  capitalWorksFund: FundStatus;
  status: string;
  paymentHistory: PaymentRecord[];
}

function ApiTestContent() {
  const [greetingData, setGreetingData] = useState<GreetingResponse | null>(null);
  const [levyData, setLevyData] = useState<LevyStatusResponse | null>(null);
  const [name, setName] = useState('John');
  const [lotNumber, setLotNumber] = useState('101');
  const [loading, setLoading] = useState({
    greeting: false,
    levy: false,
    redirect: false
  });
  const [error, setError] = useState({
    greeting: null as string | null,
    levy: null as string | null,
    redirect: null as string | null
  });

  // Function to fetch greeting API
  const fetchGreeting = async () => {
    setLoading(prev => ({ ...prev, greeting: true }));
    setError(prev => ({ ...prev, greeting: null }));
    
    try {
      const response = await fetch(`/api/greeting?name=${name}&lot=${lotNumber}`);
      const data = await response.json();
      setGreetingData(data);
    } catch (err: any) {
      setError(prev => ({ ...prev, greeting: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, greeting: false }));
    }
  };

  // Function to fetch levy status API
  const fetchLevyStatus = async () => {
    setLoading(prev => ({ ...prev, levy: true }));
    setError(prev => ({ ...prev, levy: null }));
    
    try {
      const response = await fetch(`/api/levy-status?lot=${lotNumber}`);
      const data = await response.json();
      setLevyData(data);
    } catch (err: any) {
      setError(prev => ({ ...prev, levy: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, levy: false }));
    }
  };

  // Function to test redirect API
  const testRedirect = () => {
    // Using window.location in the same window to avoid deployment ID issues
    window.location.href = `/api/redirect-late?lot=${lotNumber}`;
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">API Functionality Test</h1>
      <p className="mb-8">This page demonstrates the functionality of our serverless API routes.</p>
      
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Input Parameters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Lot Number</label>
            <input 
              type="text" 
              value={lotNumber} 
              onChange={(e) => setLotNumber(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Greeting API Test */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">1. Greeting API</h2>
          <p className="text-gray-600 mb-4">Tests the personalized greeting based on name, lot, and time of day.</p>
          <button 
            onClick={fetchGreeting} 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition mb-4 w-full"
            disabled={loading.greeting}
          >
            {loading.greeting ? 'Loading...' : 'Test Greeting API'}
          </button>
          
          {error.greeting && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              Error: {error.greeting}
            </div>
          )}
          
          {greetingData && (
            <div className="bg-gray-100 p-4 rounded-md">
              <p className="font-semibold">{greetingData.greeting}</p>
              <p>{greetingData.message}</p>
              <p className="text-xs text-gray-500 mt-2">Timestamp: {new Date(greetingData.timestamp).toLocaleString()}</p>
            </div>
          )}
        </div>
        
        {/* Levy Status API Test */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">2. Levy Status API</h2>
          <p className="text-gray-600 mb-4">Fetches levy payment information for the specified lot.</p>
          <button 
            onClick={fetchLevyStatus} 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition mb-4 w-full"
            disabled={loading.levy}
          >
            {loading.levy ? 'Loading...' : 'Test Levy Status API'}
          </button>
          
          {error.levy && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              Error: {error.levy}
            </div>
          )}
          
          {levyData && (
            <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-80">
              <p><strong>Owner:</strong> {levyData.ownerName}</p>
              <p><strong>Building:</strong> {levyData.buildingName}</p>
              <p><strong>Status:</strong> {levyData.status}</p>
              <p><strong>Total Due:</strong> ${levyData.totalDue.toFixed(2)}</p>
              <p><strong>Next Payment:</strong> {levyData.nextPaymentDate}</p>
              
              <div className="mt-3">
                <p className="font-semibold">Admin Fund:</p>
                <p>Amount: ${levyData.adminFund.amountDue.toFixed(2)}</p>
                <p>Paid: {levyData.adminFund.paid ? 'Yes' : 'No'}</p>
              </div>
              
              <div className="mt-3">
                <p className="font-semibold">Capital Works Fund:</p>
                <p>Amount: ${levyData.capitalWorksFund.amountDue.toFixed(2)}</p>
                <p>Paid: {levyData.capitalWorksFund.paid ? 'Yes' : 'No'}</p>
              </div>
              
              {levyData.paymentHistory && levyData.paymentHistory.length > 0 && (
                <div className="mt-3">
                  <p className="font-semibold">Payment History:</p>
                  <ul className="list-disc pl-5 mt-1">
                    {levyData.paymentHistory.map((payment, index) => (
                      <li key={index}>
                        {payment.date}: ${payment.amount.toFixed(2)} - {payment.status}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Redirect API Test */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">3. Redirect API</h2>
          <p className="text-gray-600 mb-4">Tests the redirection based on levy payment status (opens in new tab).</p>
          <button 
            onClick={testRedirect} 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition mb-4 w-full"
          >
            Test Redirect API
          </button>
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            <p>Note: This API will redirect you based on your payment status:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>If payments are due: Redirects to payment page</li>
              <li>If fully paid: Redirects to dashboard</li>
              <li>If lot not found: Redirects to error page</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-blue-50 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">About Serverless and Edge Functions</h2>
        <p className="mb-3">This project implements serverless functions using Vercel's Edge Runtime for optimal performance:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Edge Functions</strong> - Run globally at the edge closer to users, with minimal cold start times and lower latency.</li>
          <li><strong>Regular Serverless Functions</strong> - Run in specific regions with longer cold start times but support more Node.js features.</li>
        </ul>
        <p className="mt-3">Our strata management system uses Edge Functions for time-sensitive operations like levy status checks.</p>
      </div>
    </>
  );
}

export default function ApiTestPage() {
  return (
    <Layout>
      <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
        <ApiTestContent />
      </Suspense>
    </Layout>
  );
} 
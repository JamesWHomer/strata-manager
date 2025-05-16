'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import Layout from '../components/Layout';

function PaymentContent() {
  const searchParams = useSearchParams();
  const lot = searchParams.get('lot');

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Make a Payment</h1>
      
      <div className="bg-yellow-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Payment Due</h2>
        <p className="text-gray-700 mb-2"><strong>Lot Number:</strong> {lot || 'Unknown'}</p>
        <p className="text-gray-700 mb-2"><strong>Status:</strong> <span className="text-yellow-600 font-semibold">Payment Required</span></p>
        <p className="text-gray-700 mb-4"><strong>Due Date:</strong> 30 days from today</p>
        <div className="bg-yellow-100 p-4 rounded-md border border-yellow-300">
          <p className="text-yellow-800">
            Please make your payment to avoid late fees and penalties.
          </p>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Payment Breakdown</h3>
        <div className="border rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Item</th>
                <th className="py-2 px-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-2 px-4">Administrative Fund</td>
                <td className="py-2 px-4 text-right">$340.00</td>
              </tr>
              <tr className="border-t">
                <td className="py-2 px-4">Capital Works Fund</td>
                <td className="py-2 px-4 text-right">$240.00</td>
              </tr>
              <tr className="border-t bg-gray-50 font-semibold">
                <td className="py-2 px-4">Total Due</td>
                <td className="py-2 px-4 text-right">$580.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Link href="/api-test" className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition">
          Back to API Test
        </Link>
        <button 
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          onClick={() => alert('This is a placeholder payment page demonstrating the redirect API functionality.')}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Layout>
      <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
        <PaymentContent />
      </Suspense>
    </Layout>
  );
} 
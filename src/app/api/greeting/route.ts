import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'edge'
};

export async function GET(request: NextRequest) {
  // Get the name from query parameters
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || 'Resident';
  const lotNumber = searchParams.get('lot') || '';
  
  // Get the current time to customize greeting
  const now = new Date();
  const hour = now.getHours();
  
  let greeting = 'Hello';
  if (hour < 12) {
    greeting = 'Good morning';
  } else if (hour < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }
  
  // Build the response
  const message = {
    greeting: `${greeting}, ${name}${lotNumber ? ` from Lot ${lotNumber}` : ''}!`,
    timestamp: now.toISOString(),
    message: "Welcome to the ABC Apartments Strata Portal",
  };
  
  // Return the response with proper headers
  return NextResponse.json(message, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
} 
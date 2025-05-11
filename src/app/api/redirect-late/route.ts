import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'edge'
};

// Define types for our data structure
type FundStatus = {
  dueDate: string;
  amountDue: number;
  paid: boolean;
};

type LotData = {
  ownerId: string;
  ownerName: string;
  adminFund: FundStatus;
  capitalWorksFund: FundStatus;
};

type LevyDataType = {
  [key: string]: LotData;
};

// Mock data - in a real app, this would come from a database
const levyData: LevyDataType = {
  '101': { 
    ownerId: 'O1001',
    ownerName: 'John Smith',
    adminFund: { 
      dueDate: '2023-12-15', 
      amountDue: 750.00, 
      paid: false 
    },
    capitalWorksFund: { 
      dueDate: '2023-12-15', 
      amountDue: 450.00, 
      paid: true 
    }
  },
  '102': { 
    ownerId: 'O1002',
    ownerName: 'Jane Brown',
    adminFund: { 
      dueDate: '2023-12-15', 
      amountDue: 750.00, 
      paid: true 
    },
    capitalWorksFund: { 
      dueDate: '2023-12-15', 
      amountDue: 450.00, 
      paid: true 
    }
  },
  '201': { 
    ownerId: 'O1003',
    ownerName: 'David Wilson',
    adminFund: { 
      dueDate: '2023-12-15', 
      amountDue: 850.00, 
      paid: false 
    },
    capitalWorksFund: { 
      dueDate: '2023-12-15', 
      amountDue: 500.00, 
      paid: false 
    }
  }
};

/**
 * This function checks if a lot has overdue levies and redirects accordingly:
 * - If levies are fully paid: redirects to dashboard
 * - If levies are due but not paid: redirects to payment page
 * - If lot doesn't exist: redirects to error page
 * 
 * Demonstrates proper use of HTTP status codes for redirection (3xx series)
 */
export async function GET(request: NextRequest) {
  // Get lot number from query parameters
  const { searchParams } = new URL(request.url);
  const lotNumber = searchParams.get('lot');
  
  // If no lot number provided
  if (!lotNumber) {
    // 400 Bad Request - Missing required parameter
    return NextResponse.json({ 
      error: 'Missing required parameter: lot',
      message: 'Please provide a lot number'
    }, {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  }
  
  // If lot doesn't exist
  if (!levyData[lotNumber]) {
    // 303 See Other - Redirect to error page
    return NextResponse.redirect(new URL('/error?reason=lot-not-found', request.url), 303);
  }
  
  // Get data for the requested lot
  const lotData = levyData[lotNumber];
  
  // Check if any levies are unpaid
  const hasUnpaidLevies = !lotData.adminFund.paid || !lotData.capitalWorksFund.paid;
  
  // Calculate total amount due
  const totalDue = (lotData.adminFund.paid ? 0 : lotData.adminFund.amountDue) + 
                  (lotData.capitalWorksFund.paid ? 0 : lotData.capitalWorksFund.amountDue);
  
  if (hasUnpaidLevies) {
    // 302 Found - Temporary redirect to payment page
    const paymentURL = new URL(`/payment?lot=${lotNumber}&amount=${totalDue}`, request.url);
    return NextResponse.redirect(paymentURL, 302);
  } else {
    // 307 Temporary Redirect - Redirect to dashboard
    return NextResponse.redirect(new URL(`/dashboard?lot=${lotNumber}`, request.url), 307);
  }
} 
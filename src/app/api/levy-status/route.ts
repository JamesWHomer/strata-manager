import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'edge'
};

// Define types for our data structure
type PaymentRecord = {
  date: string;
  amount: number;
  type: string;
  status: string;
};

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
  history: PaymentRecord[];
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
    },
    history: [
      { date: '2023-09-15', amount: 1200.00, type: 'Quarterly Levy', status: 'Paid' },
      { date: '2023-06-15', amount: 1200.00, type: 'Quarterly Levy', status: 'Paid' },
      { date: '2023-03-15', amount: 1150.00, type: 'Quarterly Levy', status: 'Paid' },
    ]
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
    },
    history: [
      { date: '2023-09-15', amount: 1200.00, type: 'Quarterly Levy', status: 'Paid' },
      { date: '2023-06-15', amount: 1200.00, type: 'Quarterly Levy', status: 'Paid' },
      { date: '2023-03-15', amount: 1150.00, type: 'Quarterly Levy', status: 'Paid' },
    ]
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
    },
    history: [
      { date: '2023-09-15', amount: 1350.00, type: 'Quarterly Levy', status: 'Paid' },
      { date: '2023-06-15', amount: 1350.00, type: 'Quarterly Levy', status: 'Overdue' },
      { date: '2023-03-15', amount: 1300.00, type: 'Quarterly Levy', status: 'Paid' },
    ]
  }
};

export async function GET(request: NextRequest) {
  // Get lot number from query parameters
  const { searchParams } = new URL(request.url);
  const lotNumber = searchParams.get('lot');
  
  // If no lot number provided or lot doesn't exist
  if (!lotNumber || !levyData[lotNumber]) {
    return NextResponse.json({ 
      error: 'Lot number not found',
      validLots: Object.keys(levyData)
    }, {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  }
  
  // Get data for the requested lot
  const lotData = levyData[lotNumber];
  
  // Calculate next payment and total due
  const totalDue = lotData.adminFund.paid ? 0 : lotData.adminFund.amountDue + 
                  (lotData.capitalWorksFund.paid ? 0 : lotData.capitalWorksFund.amountDue);
  
  // Construct response data
  const responseData = {
    lotNumber,
    ownerName: lotData.ownerName,
    nextPaymentDate: lotData.adminFund.dueDate,
    totalDue,
    adminFund: lotData.adminFund,
    capitalWorksFund: lotData.capitalWorksFund,
    status: totalDue > 0 ? 'Payment Due' : 'Up to Date',
    paymentHistory: lotData.history,
  };
  
  // Return response
  return NextResponse.json(responseData, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
} 
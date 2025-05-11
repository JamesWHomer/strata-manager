import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'edge'
};

// Dummy data - in a real application, this would come from a database
const owners = [
  { id: 'O1001', name: 'John Smith', email: 'john.smith@example.com', lotNumber: '101', 
    hasDuePayment: true, amountDue: 750.00, dueDate: '2023-12-15' },
  { id: 'O1002', name: 'Jane Brown', email: 'jane.brown@example.com', lotNumber: '102', 
    hasDuePayment: false, amountDue: 0, dueDate: '2023-12-15' },
  { id: 'O1003', name: 'David Wilson', email: 'david.wilson@example.com', lotNumber: '201', 
    hasDuePayment: true, amountDue: 1350.00, dueDate: '2023-12-15' },
  { id: 'O1004', name: 'Sarah Johnson', email: 'sarah.j@example.com', lotNumber: '202', 
    hasDuePayment: true, amountDue: 1200.00, dueDate: '2023-12-15' },
  { id: 'O1005', name: 'Michael Chen', email: 'michael.c@example.com', lotNumber: '301', 
    hasDuePayment: false, amountDue: 0, dueDate: '2023-12-15' }
];

/**
 * This function is set up to run as a cron job on the 1st of each month at 9:00 AM (0 9 1 * *).
 * It would typically:
 * 1. Identify all owners with upcoming levy payments
 * 2. Generate and send email reminders about the upcoming payments
 * 3. Log the notifications to a database
 * 
 * For this demo, we're just returning sample response data.
 */
export async function GET(request: NextRequest) {
  // Get current date info for reporting
  const now = new Date();
  const formattedDate = now.toISOString().split('T')[0];
  
  // Filter owners who have payments due
  const ownersWithDuePayments = owners.filter(owner => owner.hasDuePayment);
  
  // In a real application, we would send emails to these owners
  // and record the notifications in a database
  
  // Calculate total amount due
  const totalDue = ownersWithDuePayments.reduce((sum, owner) => sum + owner.amountDue, 0);
  
  // Mock response data
  const reminderData = {
    generatedAt: now.toISOString(),
    reminderDate: formattedDate,
    totalOwnersNotified: ownersWithDuePayments.length,
    totalOwners: owners.length,
    totalAmountDue: totalDue,
    dueDate: ownersWithDuePayments[0]?.dueDate || 'N/A',
    emailsSent: ownersWithDuePayments.length
  };
  
  console.log(`Generated monthly levy reminders for ${formattedDate}`);
  
  // Return response data
  return NextResponse.json({
    success: true,
    message: `Sent ${ownersWithDuePayments.length} levy reminder emails`,
    data: reminderData
  }, {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
} 
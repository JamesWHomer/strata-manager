import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'edge'
};

/**
 * This function is set up to run as a cron job every night at midnight (0 0 * * *).
 * It would typically:
 * 1. Compile a daily report of building activity
 * 2. Email the report to committee members
 * 3. Log the report to a database
 * 
 * For this demo, we're just returning a sample response.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  // In a real application, we would fetch data from a database,
  // generate reports, send emails, etc.
  
  // Get current date for reporting
  const now = new Date();
  const formattedDate = now.toISOString().split('T')[0];
  
  // Get building and administrator details from environment variables
  const buildingName = process.env.BUILDING_NAME || 'ABC Apartments';
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const strataManagerName = process.env.STRATA_MANAGER_NAME || 'Property Management Inc.';
  
  // Mock report data
  const reportData = {
    generatedAt: now.toISOString(),
    reportDate: formattedDate,
    reportName: `${buildingName} Daily Summary ${formattedDate}`,
    buildingName,
    adminEmail,
    strataManager: strataManagerName,
    buildingStatus: "Normal",
    newMaintenanceIssues: 3,
    resolvedMaintenanceIssues: 2,
    occupancyRate: "94%",
    levyCollectionRate: "87%",
    upcomingMeetings: 1,
    emailsSent: 15,
    securityIncidents: 0
  };
  
  console.log(`Generated nightly report for ${buildingName} on ${formattedDate}`);
  
  // Return report data
  return NextResponse.json({
    success: true,
    message: `Generated daily report for ${buildingName} on ${formattedDate}`,
    report: reportData
  }, {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
} 
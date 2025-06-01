import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'edge'
};

// Dummy in-memory store just for demonstration; a real app would persist to a database
const submissions: any[] = [];

/**
 * GET /api/report-issue
 * Returns the last N submitted reports (demo purpose)
 */
export async function GET(_request: NextRequest) {
  return NextResponse.json({
    success: true,
    count: submissions.length,
    submissions: submissions.slice(-10).reverse()
  }, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}

/**
 * POST /api/report-issue
 * Accepts a JSON body representing an issue report and stores it.
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Basic validation: ensure required fields exist
    const requiredFields = ['name', 'email', 'lotNumber', 'issueType', 'description'];
    const missing = requiredFields.filter((f) => !data?.[f]);
    if (missing.length) {
      return NextResponse.json({
        success: false,
        error: `Missing required field(s): ${missing.join(', ')}`
      }, { status: 400 });
    }

    // Give the submission a reference number and timestamp
    const submission = {
      ...data,
      referenceNumber: `REF-${Math.floor(100000 + Math.random() * 900000)}`,
      receivedAt: new Date().toISOString()
    };

    submissions.push(submission);

    return NextResponse.json({
      success: true,
      message: 'Issue report received',
      referenceNumber: submission.referenceNumber
    }, { status: 201 });

  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: 'Invalid JSON body',
      details: err?.message || String(err)
    }, { status: 400 });
  }
} 
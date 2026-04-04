import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const { claimId, type, location } = await request.json();
  
  // 1. Simulate Verification against Mesh Telemetry
  // In a real app, we'd query the MeshNode history for this location/time
  await new Promise(resolve => setTimeout(resolve, 2500));

  const amount = type === 'WEATHER' ? 400.00 : 150.00;
  const isVerified = true; // For demo purposes, we always verify

  if (isVerified) {
    // 2. Perform functional wallet credit (Logic only for demo)
    return NextResponse.json({
      success: true,
      amount,
      verifier: 'Neural Oracle V2',
      meshSnapshot: {
        nodesActive: 12,
        signalStrength: '88%',
        eventDetected: 'CRITICAL_RAINFALL'
      },
      payoutId: `PAY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    });
  }

  return NextResponse.json({ success: false, reason: 'Telemetric Mismatch' });
}

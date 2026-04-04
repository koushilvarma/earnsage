import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// In-memory policy state for demo
let policyState = {
  active: false,
  expiry: null
};

export async function POST(request: Request) {
  const { amount, method } = await request.json();
  
  // Simulate payment processing
  await new Promise(resolve => setTimeout(resolve, 1500));

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7); // 7 day coverage

  policyState = {
    active: true,
    expiry: expiryDate.toISOString()
  };

  // Here we would normally update the Prisma DB
  // For the demo, we return the success state
  return NextResponse.json({
    success: true,
    transactionId: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    activePolicyEnd: policyState.expiry,
    message: 'Insurance Shield Activated'
  });
}

export async function GET() {
  return NextResponse.json(policyState);
}

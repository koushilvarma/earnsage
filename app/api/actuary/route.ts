import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  // 1. Fetch current weather for surge status
  const weatherRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/weather`, { cache: 'no-store' });
  const weather = await weatherRes.json();
  
  // 2. Base Premium calculation
  const baseRate = 49.00;
  const profileRiskFactor = 8.82; // Mocked risk for demo user
  
  // 3. Apply Surge Multiplier
  let surgeMultiplier = 1.0;
  if (weather.condition === 'Rain') surgeMultiplier = 1.8;
  if (weather.condition === 'Storm') surgeMultiplier = 2.5;

  const subTotal = (baseRate + profileRiskFactor) * surgeMultiplier;
  const gst = subTotal * 0.18;
  const grandTotal = subTotal + gst;

  return NextResponse.json({
    baseRate,
    profileRiskFactor,
    surgeMultiplier,
    isSurgeActive: weather.isSurgeActive,
    gst,
    total: grandTotal.toFixed(2),
    currency: 'INR',
    tier: 'Premium Shield'
  });
}

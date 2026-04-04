import { NextResponse } from 'next/server';

function generateRiders(count = 5) {
  const baseLat = 12.9716;
  const baseLng = 77.5946;
  return Array.from({ length: count }, (_, i) => ({
    id: `RIDER-${i + 1}`,
    lat: baseLat + (Math.random() - 0.5) * 0.05,
    lng: baseLng + (Math.random() - 0.5) * 0.05,
    active: true,
    risk: Math.random() > 0.8 ? "HIGH" : "LOW",
    shieldActive: Math.random() > 0.2
  }));
}

export async function GET() {
  const riders = generateRiders();
  return NextResponse.json({
    status: "SYNC_OK",
    hub: "Bengaluru East",
    activeNodes: riders.length,
    riders: riders,
    timestamp: new Date().toISOString()
  });
}

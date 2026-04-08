import { NextResponse } from 'next/server';

// Mock data storage for hackathon stability (Fallback if Prisma setup is restricted)
let userProfile = {
  id: "demo-user-123",
  name: "Ravi Kumar",
  cityHub: "Bengaluru East",
  kycStatus: "PENDING",
  platforms: ["Zomato", "Zepto"],
  protectionTier: "PREMIUM",
  activeShield: true,
  walletBalance: 1640.50,
  lifetimeEarnings: 124500.00
};

export async function GET() {
  return NextResponse.json(userProfile);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    userProfile = { ...userProfile, ...body };
    return NextResponse.json({ success: true, profile: userProfile });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update profile" }, { status: 400 });
  }
}

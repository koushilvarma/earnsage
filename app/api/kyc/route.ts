import { NextResponse } from 'next/server';

let kycData = {
  status: "PENDING",
  updatedAt: new Date().toISOString()
};

export async function GET() {
  return NextResponse.json(kycData);
}

export async function POST(request: Request) {
  try {
    const { action } = await request.json();
    if (action === "VERIFY") {
      kycData = { status: "VERIFIED", updatedAt: new Date().toISOString() };
    } else {
      kycData = { status: "PENDING", updatedAt: new Date().toISOString() };
    }
    return NextResponse.json({ success: true, data: kycData });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

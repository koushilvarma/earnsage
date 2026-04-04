import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Simulated Weather State (In-memory for the demo session)
let weatherState = {
  condition: 'Cloudy', // Clear, Cloudy, Rain, Storm
  temperature: 28,
  humidity: 64,
  isSurgeActive: false,
  forecast: [
    { time: '14:00', condition: 'Cloudy', temp: 28 },
    { time: '15:00', condition: 'Rain', temp: 24 },
    { time: '16:00', condition: 'Storm', temp: 22 },
    { time: '17:00', condition: 'Rain', temp: 23 },
  ]
};

export async function GET() {
  // Logic to simulate dynamic changes based on time
  const hour = new Date().getHours();
  
  if (hour >= 15 && hour <= 17) {
    weatherState.condition = 'Storm';
    weatherState.isSurgeActive = true;
  } else {
    weatherState.condition = 'Cloudy';
    weatherState.isSurgeActive = false;
  }

  return NextResponse.json(weatherState);
}

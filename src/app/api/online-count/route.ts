import { NextResponse } from 'next/server';

// Persistent store (replace with Redis in production)
let onlineCount = 0;

// Initialize from persistent storage if available
if (typeof window !== 'undefined') {
  onlineCount = parseInt(localStorage.getItem('onlineCount') || '0', 10);
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    console.log('Received webhook event:', payload.type);
    
    switch(payload.type) {
      case 'peer.joined':
      case 'peer.joined.success':
        console.log('peer.joined');
        onlineCount++;
        break;
      case 'peer.left':
      case 'peer.leave.success':
        console.log('peer.left');
        onlineCount = Math.max(0, onlineCount - 1);
        break;
    }
    
    // Persist the count
    if (typeof window !== 'undefined') {
      localStorage.setItem('onlineCount', onlineCount.toString());
    }
    
    console.log('Current online count:', onlineCount);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ count: onlineCount });
}
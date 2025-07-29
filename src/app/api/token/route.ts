import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

export async function GET() {
  try {
    const accessKey = process.env.NEXT_PUBLIC_HMS_ACCESS_KEY;
    const secret = process.env.HMS_SECRET;
    const roomId = process.env.NEXT_PUBLIC_ROOM_ID;

    if (!accessKey || !secret || !roomId) {
      return NextResponse.json(
        { error: 'Missing environment variables' },
        { status: 500 }
      );
    }

    // Current timestamp in seconds
    const now = Math.floor(Date.now() / 1000);
    
    // Create a management token (server-side)
    const payload = {
      access_key: accessKey,
      room_id: roomId,
      role: 'guest',
      type: 'app',
      version: 2,
      iat: now,
      nbf: now,
      exp: now + 86400,
      jti: crypto.randomUUID() // Add unique JWT ID
    };

    const encodedSecret = new TextEncoder().encode(secret);
    
    // Create and sign the JWT
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .sign(encodedSecret);

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import { verifyAndConsumeToken } from '@/lib/downloads';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  if (!token) return NextResponse.json({ error: 'Token required' }, { status: 400 });

  try {
    const payload = verifyAndConsumeToken(token);
    const fallbackUrl = `https://example.com/download/${payload.productId}`;
    return NextResponse.redirect(fallbackUrl);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid or consumed token' }, { status: 400 });
  }
}

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { audioContent } = await req.json(); // base64-encoded audio string
  const apiKey = process.env.GOOGLE_STT_API_KEY;

  const sttUrl = `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`;
  const sttPayload = {
    config: {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
    },
    audio: {
      content: audioContent,
    },
  };

  const res = await fetch(sttUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sttPayload),
  });

  const result = await res.json();
  return NextResponse.json(result);
}


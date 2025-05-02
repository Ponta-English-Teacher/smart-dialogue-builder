import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  const apiKey = process.env.GOOGLE_TTS_API_KEY;

  const ttsUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;
  const ttsPayload = {
    input: { text },
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' }
  };

  const res = await fetch(ttsUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ttsPayload),
  });

  const audioData = await res.json();
  return NextResponse.json(audioData);
}


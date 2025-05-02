import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { word } = await req.json();
  const prompt = `Define the word "${word}" in English with examples, translation in Japanese, and usage tips.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}


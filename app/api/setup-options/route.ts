import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { level } = await req.json();

    const prompt = `The user is a Japanese learner at the ${level} level. Suggest 4 simple and appropriate conversation scenarios in JSON format with these keys: places, goals, roles. Each should be an array of short Japanese phrases. Keep it culturally appropriate.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      }),
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '{}';
    const json = JSON.parse(text);

    return NextResponse.json(json);
  } catch (error) {
    console.error('Error in /api/setup-options:', error);
    return NextResponse.json({ error: 'Failed to generate options' }, { status: 500 });
  }
}


import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { level } = await req.json();

  if (!level) {
    return NextResponse.json({ error: 'Missing level parameter' }, { status: 400 });
  }

  const prompt = `
You are helping build a Smart Dialogue Builder for English learners.
Given the learner's level: "${level}", suggest:

- 5 typical conversation goals
- 5 realistic locations for a conversation
- 5 possible roles the learner might take

Return the result in JSON format:
{
  "goals": ["...", "..."],
  "places": ["...", "..."],
  "roles": ["...", "..."]
}
  `;

  const apiKey = process.env.OPENAI_API_KEY;
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  try {
    const result = JSON.parse(content);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to parse AI response', raw: content }, { status: 500 });
  }
}


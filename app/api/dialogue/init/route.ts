import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // 1. Receive the user's selections from the request body
    const setupData = await req.json();
    console.log('Received setup data:', setupData);

    // 2. Construct a prompt for ChatGPT based on setupData
    const prompt = `Based on the following preferences: Place - ${setupData.place}, Level - ${setupData.level}, Role - ${setupData.role}, what is the first line the ${setupData.role === 'Customer' ? 'staff' : 'customer'} would say? Keep it brief and natural.`;

    // 3. Call ChatGPT API (similar to your /api/chat endpoint)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const firstLine = data.choices?.[0]?.message?.content || "Hello.";

    // 4. Construct the response for the frontend
    const responseBody = {
      speaker: setupData.role === 'Customer' ? 'Staff' : 'You', // Adjust based on who speaks first
      line: firstLine,
      // You can add 'translation', 'audioUrl', and 'replyOptions' here later
    };

    // 5. Return the JSON response
    return NextResponse.json(responseBody);

  } catch (error) {
    console.error("Dialogue init API error:", error);
    return NextResponse.json({ error: "Failed to initialize dialogue" }, { status: 500 });
  }
}

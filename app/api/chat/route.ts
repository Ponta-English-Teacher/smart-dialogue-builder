import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const response = NextResponse.json({
      reply: `You said: ${message}`,
    });

    // ✅ CORS header
    response.headers.set("Access-Control-Allow-Origin", "*");
    return response;

  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// Optional: allow browser to preflight (not always necessary for simple POST)
export async function OPTIONS() {
  const res = new NextResponse(null, { status: 204 });
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return res;
}

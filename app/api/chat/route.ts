import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const response = NextResponse.json({
    reply: `You said: ${message}`,
  });

  // ✅ Add CORS header
  response.headers.set("Access-Control-Allow-Origin", "*");

  return response;
}

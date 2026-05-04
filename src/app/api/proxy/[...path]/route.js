import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const BASE_URL = "https://sunaura.vercel.app";

export async function GET(request, { params }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { path } = await params;
  const targetUrl = `${BASE_URL}/${path.join("/")}`;

  const { searchParams } = new URL(request.url);
  const query = searchParams.toString();
  const fullUrl = query ? `${targetUrl}?${query}` : targetUrl;

  const response = await fetch(fullUrl, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: `Upstream error: ${response.status}` },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}

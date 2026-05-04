import { NextResponse } from "next/server";

const DATA_URL = `${process.env.BETTER_AUTH_URL || "http://localhost:3000"}/data.json`;

export async function GET() {
  const res = await fetch(DATA_URL, { next: { revalidate: 3600 } });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 502 });
  }

  const products = await res.json();
  return NextResponse.json(products);
}

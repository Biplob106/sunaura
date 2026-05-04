import { NextResponse } from "next/server";

const DATA_URL = "https://sunaura.vercel.app/data.json";

export async function GET() {
  const res = await fetch(DATA_URL, { next: { revalidate: 3600 } });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 502 });
  }

  const products = await res.json();
  return NextResponse.json(products);
}

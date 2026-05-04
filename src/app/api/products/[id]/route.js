import { NextResponse } from "next/server";

const DATA_URL = `${process.env.BETTER_AUTH_URL || "http://localhost:3000"}/data.json`;

export async function GET(request, { params }) {
  const { id } = await params;

  const res = await fetch(DATA_URL, { next: { revalidate: 3600 } });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 502 });
  }

  const products = await res.json();
  const product = products.find((p) => p.id == id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

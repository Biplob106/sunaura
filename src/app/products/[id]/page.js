"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdStar, MdInventory2, MdCategory, MdStorefront, MdArrowBack } from "react-icons/md";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/proxy/data.json")
      .then((res) => {
        if (res.status === 401) {
          window.location.href = `/signin?callbackUrl=/products/${id}`;
          return;
        }
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((products) => {
        if (!products) return;
        const found = products.find((p) => p.id == id);
        if (!found) throw new Error("Product not found");
        setProduct(found);
        setLoading(false);
      })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-sky-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-gray-500 px-4 text-center">
        <p className="text-xl font-semibold">Product not found</p>
        <Link href="/products" className="text-sky-600 hover:underline text-sm">← Back to Products</Link>
      </div>
    );
  }

  const stars = Math.round(product.rating);

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-10 px-3 sm:px-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-600 transition-colors mb-6 sm:mb-8">
          <MdArrowBack className="text-lg" />
          Back to Products
        </Link>

        <div className="bg-white rounded-3xl shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-square bg-gray-100">
            <Image src={product.image} fill alt={product.name} className="object-cover" unoptimized />
            <span className="absolute top-4 left-4 bg-sky-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
              {product.category}
            </span>
          </div>

          <div className="p-5 sm:p-8 flex flex-col justify-between">
            <div>
              <p className="text-sm text-sky-600 font-semibold uppercase tracking-wide mb-1">{product.brand}</p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">{product.name}</h1>

              <div className="flex items-center gap-2 mb-5">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <MdStar key={i} className={`text-xl ${i < stars ? "text-amber-400" : "text-gray-200"}`} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                <span className="text-xs text-gray-400">/ 5.0</span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.description}</p>

              <div className="space-y-3 mb-6 sm:mb-8">
                <MetaRow icon={<MdStorefront className="text-sky-500" />} label="Brand" value={product.brand} />
                <MetaRow icon={<MdCategory className="text-sky-500" />} label="Category" value={product.category} />
                <MetaRow
                  icon={<MdInventory2 className="text-sky-500" />}
                  label="Stock"
                  value={
                    product.stock > 0
                      ? <span className="text-green-600 font-semibold">{product.stock} units available</span>
                      : <span className="text-red-500 font-semibold">Out of stock</span>
                  }
                />
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5 sm:pt-6">
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Price</p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-sky-600">${product.price.toFixed(2)}</p>
                </div>
                <span className="text-xs bg-green-100 text-green-700 font-semibold px-3 py-1.5 rounded-full">
                  Free Shipping
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 transition-all shadow-md">
                  🛒 Add to Cart
                </button>
                <button className="flex-1 py-3 rounded-xl font-semibold text-sky-600 border-2 border-sky-200 hover:bg-sky-50 transition-all">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetaRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-lg shrink-0">
      {icon}
    </div>
    <span className="text-xs text-gray-400 w-16 shrink-0">{label}</span>
    <span className="text-sm font-medium text-gray-700">{value}</span>
  </div>
);

export default ProductDetails;

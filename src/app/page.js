import Link from "next/link";
import Image from "next/image";
import HeroBanner from "@/component/HeroBanner";

async function getPopularProducts() {
  const res = await fetch(`${process.env.BETTER_AUTH_URL}/api/proxy/data.json`, {
    next: { revalidate: 3600 },
  });
  const products = await res.json();
  return products.sort((a, b) => b.rating - a.rating).slice(0, 3);
}

const popularProducts = await getPopularProducts();

const careTips = [
  {
    icon: "🧴",
    title: "Apply Sunscreen Daily",
    desc: "Use SPF 30+ every morning, even on cloudy days. Reapply every 2 hours when outdoors.",
  },
  {
    icon: "💧",
    title: "Stay Hydrated",
    desc: "Drink at least 8 glasses of water daily. Carry a reusable bottle to beat the summer heat.",
  },
  {
    icon: "🌿",
    title: "After-Sun Skincare",
    desc: "Apply aloe vera gel or a cooling moisturiser after sun exposure to soothe and repair skin.",
  },
  {
    icon: "👒",
    title: "Cover Up Smart",
    desc: "Wear lightweight, breathable clothing and a wide-brim hat to shield from direct UV rays.",
  },
];

const brands = [
  { name: "SunGuard", tagline: "UV Protection Experts", emoji: "☀️", bg: "from-amber-50 to-orange-50", border: "border-amber-200" },
  { name: "FreshGlow", tagline: "Skincare Essentials", emoji: "🌿", bg: "from-emerald-50 to-teal-50", border: "border-emerald-200" },
  { name: "CoolWear", tagline: "Summer Fashion", emoji: "👗", bg: "from-sky-50 to-cyan-50", border: "border-sky-200" },
  { name: "HydroMax", tagline: "Hydration Solutions", emoji: "💧", bg: "from-blue-50 to-indigo-50", border: "border-blue-200" },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 pb-20">
      <HeroBanner />

      <section className="mt-12 sm:mt-16">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">🔥 Popular Products</h2>
            <p className="text-gray-500 text-sm mt-1">Top-rated summer picks loved by shoppers</p>
          </div>
          <Link href="/products" className="text-sm font-semibold text-sky-600 hover:text-sky-700 hover:underline whitespace-nowrap">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {popularProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden group">
              <div className="relative w-full aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  fill
                  alt={product.name}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <span className="absolute top-3 left-3 bg-sky-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  ⭐ {product.rating}
                </span>
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-xs text-gray-400 font-medium mb-1">{product.brand}</p>
                <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-3">{product.name}</h3>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-lg sm:text-xl font-extrabold text-sky-600">${product.price.toFixed(2)}</span>
                  <Link
                    href={`/products/${product.id}`}
                    className="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 transition-all shadow-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 sm:mt-20">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">🌤️ Summer Care Tips</h2>
          <p className="text-gray-500 text-sm mt-2">Stay healthy, fresh, and glowing all season long</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {careTips.map((tip) => (
            <div key={tip.title} className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all text-center group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{tip.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2 text-sm">{tip.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 sm:mt-20">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">🏆 Top Brands</h2>
          <p className="text-gray-500 text-sm mt-2">Trusted names for your summer needs</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className={`bg-gradient-to-br ${brand.bg} border ${brand.border} rounded-2xl p-4 sm:p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer`}
            >
              <div className="text-3xl sm:text-4xl mb-3">{brand.emoji}</div>
              <h3 className="font-extrabold text-gray-800 text-sm sm:text-base">{brand.name}</h3>
              <p className="text-gray-500 text-xs mt-1">{brand.tagline}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

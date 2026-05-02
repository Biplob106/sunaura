import Image from "next/image";

const ProductPage = async () => {
  let products = [];

  try {
    const res = await fetch("https://sunaura.vercel.app/data.json", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    products = await res.json();
  } catch (error) {
    console.error(error);
    return (
      <div className="p-6 text-red-500">
        Failed to load products
      </div>
    );
  }

  if (!Array.isArray(products)) {
    return (
      <div className="p-6 text-gray-500">
        No products found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-2xl shadow-md p-4 hover:shadow-xl transition"
        >
          {/* IMAGE FIX */}
          <div className="relative w-full h-48">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-xl"
            />
          </div>

          <h2 className="text-lg font-semibold mt-3">
            {product.name}
          </h2>

          <p className="text-sm text-gray-500">
            {product.brand}
          </p>

          <p className="text-yellow-500">
            ⭐ {product.rating}
          </p>

          <p className="text-lg font-bold mt-2">
            ${product.price}
          </p>

          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {product.description}
          </p>

          <button className="mt-4 w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;
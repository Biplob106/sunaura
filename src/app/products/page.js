import ProductCard from "../../component/ProductCard";

const ProductPage = async () => {
  let products = [];

  try {
    const res = await fetch(`${process.env.BETTER_AUTH_URL}/api/proxy/data.json`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed to fetch products");

    products = await res.json();
  } catch (error) {
    console.error(error);
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load products. Please try again later.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-2">All Products</h1>
      <p className="text-gray-500 text-sm mb-8">{products.length} items available</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;

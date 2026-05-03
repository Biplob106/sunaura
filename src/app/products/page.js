import Image from "next/image";
import ProductCard from "../../component/ProductCard";

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
    <div >
     <h1 className="text-2xl font-bold m-4">All Photos</h1>

            

            <div className="grid grid-cols-4 gap-5">
  {products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
    </div>
  );
};

export default ProductPage;
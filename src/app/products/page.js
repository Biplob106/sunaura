import ProductCard from "../../component/ProductCard";
import productsData from "../../../public/data.json";

const ProductPage = () => {
  const products = productsData;

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

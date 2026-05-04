import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition">

      {/* Image */}
      <figure className="relative w-full aspect-square">
        <Image
          src={product.image}
          fill
          alt={product.name}
          className="object-cover"
        />
      </figure>

      {/* Content */}
      <div className="card-body p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>

        <p className="text-sm">⭐ {product.rating}</p>

        <p className="text-sky-600 font-bold">
          ${product.price.toFixed(2)}
        </p>

        <div className="mt-2">
          <Link href={`/products/${product.id}`}>
            <button className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 transition-all shadow-sm">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

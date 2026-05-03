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

        {/* Rating */}
        <p className="text-sm">⭐ {product.rating}</p>

        {/* Price */}
        <p className="text-primary font-bold">
          ${product.price.toFixed(2)}
        </p>

        {/* Button */}
        <div className="mt-2">
          <Link href={`/products/${product.id}`}>
            <button className="btn btn-primary w-full">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

const ProductDetails = async ({ params }) => {
    const { id } =  await params;
    const res = await fetch(`https://sunaura.vercel.app/data.json`);
    const products = await res.json()

    const product = products.find(p => p.id == id)

    return (
        <div>
            <h1>Product Details</h1>
            <p>Product ID: {product.id}</p>
            <p>Product Name: {product.name}</p>
            <p>Product Brand: {product.brand}</p>
            <p>Product Description: {product.description}</p>
            <p>Product Rating: {product.rating}</p>
            <p>Product Price: ${product.price.toFixed(2)}</p>
        </div>
    )
}

export default ProductDetails;
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "15px",
        width: "250px",
        textAlign: "center",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        width="180"
        height="180"
      />

      <h2>{product.name}</h2>

      <p>{product.description}</p>

      <h3>₹ {product.price}</h3>

      <Link to={`/product/${product._id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}

export default ProductCard;
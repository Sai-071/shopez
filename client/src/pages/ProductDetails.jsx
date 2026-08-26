import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);


  const getProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
      alert("Failed to Load Product");
    }
  };


  useEffect(() => {
    getProduct();
  }, []);

  
  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please Login First");
        return;
      }

      const res = await API.post(
        "/cart",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert(res.data.message);

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed To Add Product To Cart"
      );
    }
  };

  
  
  if (!product) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Loading Product...</h2>
      </div>
    );
  }


  return (
    <div
      style={{
        padding: "30px",
        display: "flex",
        gap: "40px",
        alignItems: "center",
      }}
    >
      {/* Product Image */}
      <div>
        <img
          src={product.image}
          alt={product.name}
          width="350"
          style={{
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        />
      </div>

      {/* Product Details */}
      <div>
        <h1>{product.name}</h1>

        <h2>₹ {product.price}</h2>

        <p>
          <strong>Description:</strong>
        </p>

        <p>{product.description}</p>

        <p>
          <strong>Category:</strong> {product.category}
        </p>

        <p>
          <strong>Stock:</strong> {product.stock}
        </p>

        <button
          onClick={addToCart}
          style={{
            padding: "12px 25px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
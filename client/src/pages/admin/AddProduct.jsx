import { useState } from "react";
import API from "../../services/api";
import "../../styles/AddProduct.css";

function AddProduct() {
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    if (
      !product.name ||
      !product.price ||
      !product.category ||
      !product.stock ||
      !product.image ||
      !product.description
    ) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await API.post("/products", product, {
        headers: {
          Authorization: token,
        },
      });

      alert("🎉 Product Added Successfully");

      setProduct({
        name: "",
        price: "",
        category: "",
        stock: "",
        image: "",
        description: "",
      });

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed To Add Product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page">

      <div className="product-card">

        <h1>Add New Product</h1>

        <form onSubmit={addProduct}>

          <input
            type="text"
            placeholder="Product Name"
            name="name"
            value={product.name}
            onChange={handleChange}
          />

          <input
            type="number"
            placeholder="Price"
            name="price"
            value={product.price}
            onChange={handleChange}
          />

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option>Mobiles</option>
            <option>Laptops</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Shoes</option>
            <option>Accessories</option>
            <option>Furniture</option>
            <option>Books</option>
          </select>

          <input
            type="number"
            placeholder="Stock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Image URL"
            name="image"
            value={product.image}
            onChange={handleChange}
          />

          <textarea
            rows="5"
            placeholder="Product Description"
            name="description"
            value={product.description}
            onChange={handleChange}
          ></textarea>

          <button type="submit">
            {loading ? "Adding Product..." : "Add Product"}
          </button>

        </form>

        {product.image && (
          <div className="preview">

            <h3>Image Preview</h3>

            <img
              src={product.image}
              alt="Preview"
              className="preview-image"
            />

          </div>
        )}

      </div>

    </div>
  );
}

export default AddProduct;
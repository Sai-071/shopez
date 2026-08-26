import { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/Product.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    getProducts();
  }, []);

  // ==========================
  // Get All Products
  // ==========================
  const getProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
      alert("Failed To Load Products");
    }
  };

  // ==========================
  // Delete Product
  // ==========================
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/products/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      alert("Product Deleted Successfully");
      getProducts();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  // ==========================
  // Edit Product
  // ==========================
  const openEditModal = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image,
      description: product.description,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateProduct = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/products/${editingProduct._id}`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Product Updated Successfully");

      setEditingProduct(null);

      getProducts();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  // ==========================
  // Search
  // ==========================
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products-page">

      <div className="products-header">
        <h1>Manage Products</h1>
        <p>View and manage all products in your store.</p>

        <div className="top-bar">

          <div className="product-count">
            Total Products : <strong>{products.length}</strong>
          </div>

          <input
            type="text"
            placeholder="🔍 Search Product..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>

      <div className="products-table">

        <table>

          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredProducts.length === 0 ? (

              <tr>
                <td colSpan="6">
                  No Products Found
                </td>
              </tr>

            ) : (

              filteredProducts.map((product) => (

                <tr key={product._id}>

                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                  </td>

                  <td>{product.name}</td>

                  <td>{product.category}</td>

                  <td>₹ {product.price}</td>

                  <td>

                    {product.stock > 10 ? (
                      <span className="stock in-stock">
                        In Stock ({product.stock})
                      </span>
                    ) : product.stock > 0 ? (
                      <span className="stock low-stock">
                        Low Stock ({product.stock})
                      </span>
                    ) : (
                      <span className="stock out-stock">
                        Out Of Stock
                      </span>
                    )}

                  </td>

                  <td>

                    <button
                      className="edit-btn"
                      onClick={() => openEditModal(product)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {editingProduct && (

        <div className="modal">

          <div className="modal-content">

            <h2>Edit Product</h2>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
            />

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
            />

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
            />

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Stock"
            />

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Image URL"
            />

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            />

            <div className="modal-buttons">

              <button
                className="save-btn"
                onClick={updateProduct}
              >
                Save Changes
              </button>

              <button
                className="cancel-btn"
                onClick={() => setEditingProduct(null)}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Products;
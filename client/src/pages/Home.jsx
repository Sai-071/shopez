import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import API from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
      alert("Failed to load products");
    }
  };

  // Search Products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(to right, #2563eb, #1d4ed8)",
          color: "white",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "45px", marginBottom: "15px" }}>
          Welcome to ShopEZ
        </h1>

        <p style={{ fontSize: "20px" }}>
          Your One Stop Online Shopping Store
        </p>

        <br />

        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "350px",
            maxWidth: "90%",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
          }}
        />
      </section>

      {/* Products */}
      <div style={{ padding: "30px" }}>
        <h2
          style={{
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          Featured Products
        </h2>

        {filteredProducts.length === 0 ? (
          <h3 style={{ textAlign: "center" }}>
            No Products Found
          </h3>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "30px",
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
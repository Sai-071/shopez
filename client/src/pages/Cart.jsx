import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCart();
  }, []);

  // ==========================
  // Get Cart
  // ==========================
  const getCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/cart", {
        headers: {
          Authorization: token,
        },
      });

      setCart(res.data.cart);
    } catch (error) {
      console.log(error);
      alert("Failed To Load Cart");
    }
  };

  // ==========================
  // Remove Product
  // ==========================
  const removeFromCart = async (id) => {
    const confirmDelete = window.confirm(
      "Remove this product from cart?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/cart/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      alert("Product Removed Successfully");

      getCart();
    } catch (error) {
      console.log(error);
      alert("Failed To Remove Product");
    }
  };

  let total = 0;

  cart.forEach((item) => {
    total += item.product.price * item.quantity;
  });

  return (
    <div className="cart-page">

      <h1 className="cart-title">My Shopping Cart</h1>

      {cart.length === 0 ? (

        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>

          <button
            className="shop-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>

      ) : (

        <>
          <div className="cart-items">

            {cart.map((item) => (

              <div
                className="cart-card"
                key={item._id}
              >

                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="cart-image"
                />

                <div className="cart-info">

                  <h2>{item.product.name}</h2>

                  <p>{item.product.description}</p>

                  <h3>₹ {item.product.price}</h3>

                  <p>
                    Quantity :
                    <strong> {item.quantity}</strong>
                  </p>

                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

          <div className="cart-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Total Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="summary-row">
              <strong>Total Amount</strong>
              <strong>₹ {total}</strong>
            </div>

            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed To Checkout
            </button>

          </div>

        </>

      )}

    </div>
  );
}

export default Cart;
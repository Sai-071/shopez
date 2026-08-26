import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const placeOrder = async (e) => {
    e.preventDefault();

    if (!shippingAddress.trim()) {
      alert("Please enter your shipping address.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/orders",
        {
          shippingAddress,
          paymentMethod,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("🎉 " + res.data.message);

      navigate("/orders");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed To Place Order"
      );
    }
  };

  return (
    <div className="checkout-page">

      <div className="checkout-container">

        <div className="checkout-left">

          <h1>Checkout</h1>

          <p>
            Complete your order by filling the details below.
          </p>

          <form onSubmit={placeOrder}>

            <label>Shipping Address</label>

            <textarea
              rows="6"
              placeholder="Enter complete shipping address..."
              value={shippingAddress}
              onChange={(e) =>
                setShippingAddress(e.target.value)
              }
            />

            <label>Payment Method</label>

            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            >
              <option>Cash on Delivery</option>
              <option>Online Payment</option>
            </select>

            <button type="submit">
              Place Order
            </button>

          </form>

        </div>

        <div className="checkout-right">

          <h2>Order Summary</h2>

          <div className="summary-card">

            <h3>Secure Checkout</h3>

            <ul>
              <li>✔ 100% Secure Payment</li>
              <li>✔ Fast Delivery</li>
              <li>✔ Easy Returns</li>
              <li>✔ Quality Assured Products</li>
            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;
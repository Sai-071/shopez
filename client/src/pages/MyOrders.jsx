import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Order.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders();
  }, []);

  // ==========================
  // Get My Orders
  // ==========================
  const getMyOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/orders", {
        headers: {
          Authorization: token,
        },
      });

      setOrders(res.data.orders);

    } catch (error) {
      console.log(error);
      alert("Failed To Load Orders");
    }
  };

  return (
    <div className="orders-page">

      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track all your purchases here.</p>
      </div>

      {orders.length === 0 ? (

        <div className="empty-orders">
          <h2>No Orders Found</h2>
          <p>You haven't placed any orders yet.</p>
        </div>

      ) : (

        orders.map((order) => (

          <div className="order-card" key={order._id}>

            <div className="order-top">

              <div>
                <h3>Order ID</h3>
                <p>{order._id}</p>
              </div>

              <div>
                <h3>Total</h3>
                <p>₹ {order.totalAmount}</p>
              </div>

              <div>
                <h3>Status</h3>

                <span className={`status ${order.orderStatus.toLowerCase()}`}>
                  {order.orderStatus}
                </span>

              </div>

            </div>

            <hr />

            {order.products.map((item) => (

              <div className="order-product" key={item._id}>

                <img
                  src={item.product.image}
                  alt={item.product.name}
                />

                <div>

                  <h2>{item.product.name}</h2>

                  <p>₹ {item.product.price}</p>

                  <p>Quantity : {item.quantity}</p>

                </div>

              </div>

            ))}

          </div>

        ))

      )}

    </div>
  );
}

export default MyOrders;
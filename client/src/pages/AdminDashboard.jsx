import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders();
  }, []);

  // ==========================
  // Get All Orders
  // ==========================
  const getAllOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/orders/all", {
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

  // ==========================
  // Update Order Status
  // ==========================
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/orders/${id}/status`,
        {
          orderStatus: status,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Order Status Updated");

      getAllOrders();
    } catch (error) {
      console.log(error);
      alert("Failed To Update Status");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <h2>All Orders</h2>

      {orders.length === 0 ? (
        <h3>No Orders Found</h3>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid gray",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>{order.user?.name}</h3>

            <p>Email: {order.user?.email}</p>

            <p>Total: ₹ {order.totalAmount}</p>

            <p>Status: {order.orderStatus}</p>

            <select
              value={order.orderStatus}
              onChange={(e) =>
                updateStatus(order._id, e.target.value)
              }
            >
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>

            <hr />

            {order.products.map((item) => (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  width="80"
                />

                <div>
                  <h4>{item.product.name}</h4>
                  <p>₹ {item.product.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;
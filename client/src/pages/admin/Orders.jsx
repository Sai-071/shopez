import { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/Order.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getOrders();
  }, []);

  // ==========================
  // Get All Orders
  // ==========================
  const getOrders = async () => {
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
  // Update Status
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

      getOrders();

    } catch (error) {
      console.log(error);
      alert("Status Update Failed");
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    order.user?.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="orders-page">

      <div className="orders-header">

        <div>
          <h1>Order Management</h1>
          <p>Manage customer orders</p>
        </div>

        <input
          type="text"
          placeholder="🔍 Search Customer..."
          className="order-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {filteredOrders.length === 0 ? (

        <h2>No Orders Found</h2>

      ) : (

        filteredOrders.map((order) => (

          <div
            className="order-card"
            key={order._id}
          >

            <div className="order-top">

              <div>

                <h2>{order.user?.name}</h2>

                <p>{order.user?.email}</p>

              </div>

              <div>

                <h3>₹ {order.totalAmount}</h3>

              </div>

            </div>

            <div className="status-row">

              <span className="status">
                {order.orderStatus}
              </span>

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

            </div>

            <hr />

            {order.products.map((item) => (

              <div
                className="product-row"
                key={item._id}
              >

                <img
                  src={item.product.image}
                  alt={item.product.name}
                />

                <div>

                  <h4>{item.product.name}</h4>

                  <p>₹ {item.product.price}</p>

                  <p>Qty : {item.quantity}</p>

                </div>

              </div>

            ))}

          </div>

        ))

      )}

    </div>
  );
}

export default Orders;
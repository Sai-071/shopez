import { Link } from "react-router-dom";
import "../../styles/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">

      <div className="sidebar">

        <h2>ShopEZ</h2>

        <ul>

          <li>
            <Link to="/admin">Dashboard</Link>
          </li>

          <li>
            <Link to="/admin/add-product">
              Add Product
            </Link>
          </li>

          <li>
            <Link to="/admin/products">
              Manage Products
            </Link>
          </li>

          <li>
            <Link to="/admin/orders">
              Orders
            </Link>
          </li>

          <li>
            <Link to="/">
              Back To Website
            </Link>
          </li>

        </ul>

      </div>

      <div className="dashboard-content">

        <h1>Admin Dashboard</h1>

        <div className="cards">

          <div className="card">
            <h2>Products</h2>
            <p>Manage Products</p>

            <Link to="/admin/products">
              Open
            </Link>

          </div>

          <div className="card">
            <h2>Add Product</h2>
            <p>Create New Product</p>

            <Link to="/admin/add-product">
              Add
            </Link>

          </div>

          <div className="card">
            <h2>Orders</h2>
            <p>Manage Orders</p>

            <Link to="/admin/orders">
              View
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
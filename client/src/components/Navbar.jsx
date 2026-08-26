import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged Out Successfully");

    navigate("/register");
  };

  return (
    <nav className="navbar">

      <div className="logo">
        <Link to="/">ShopEZ</Link>
      </div>

      <ul className="nav-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/cart">Cart</Link>
        </li>

        <li>
          <Link to="/orders">My Orders</Link>
        </li>

        {!token ? (
          <li>
            <Link to="/register">Register</Link>
          </li>
        ) : (
          <>
            {user?.role === "admin" && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}

            <li className="welcome">
              Hi, {user?.name}
            </li>

            <li>
              <button
                className="logout-btn"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </li>
          </>
        )}

      </ul>

    </nav>
  );
}

export default Navbar;
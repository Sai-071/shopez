import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import API from "../services/api";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-left">

          <h1>Welcome Back</h1>

          <p>
            Login to continue shopping with ShopEZ.
          </p>

          <img
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=700"
            alt="Shopping"
          />

        </div>

        <div className="login-right">

          <form onSubmit={loginUser}>

            <h2>Login</h2>

            <div className="input-box">

              <FaEnvelope className="icon" />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>

            <div className="input-box">

              <FaLock className="icon" />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

            </div>

            <button type="submit">
              Login
            </button>

            <p>
              Don't have an account?

              <Link to="/register">
                Register
              </Link>

            </p>

          </form>

        </div>

      </div>
    </div>
  );
}

export default Login;
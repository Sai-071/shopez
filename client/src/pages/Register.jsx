import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import API from "../services/api";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/register", formData);

      alert(res.data.message);

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">

        <div className="register-left">
          <h1>Join ShopEZ</h1>

          <p>
            Discover premium products, secure checkout,
            and a smooth shopping experience.
          </p>

          <img
            src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=700"
            alt="Shopping"
          />
        </div>

        <div className="register-right">

          <form onSubmit={submitHandler}>

            <h2>Create Account</h2>

            <div className="input-box">
              <FaUser className="icon" />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={name}
                onChange={changeHandler}
                required
              />
            </div>

            <div className="input-box">
              <FaEnvelope className="icon" />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={changeHandler}
                required
              />
            </div>

            <div className="input-box">
              <FaLock className="icon" />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={changeHandler}
                required
              />
            </div>

            <button type="submit">
              Create Account
            </button>

            <p>
              Already have an account?
              <Link to="/login"> Login</Link>
            </p>

          </form>

        </div>

      </div>
    </div>
  );
}

export default Register;
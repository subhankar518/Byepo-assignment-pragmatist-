import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../services/auth.service";
import { saveRole, saveUser } from "../../utils/storage";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      alert("Email and Password are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await login(formData);

      const user = response.data.user;

      saveUser(user);
      saveRole(user.role);

      switch (user.role) {
        case "SUPER-ADMIN":
          navigate("/super-admin/dashboard");
          break;

        case "ADMIN":
          navigate("/admin/dashboard");
          break;

        case "USER":
          navigate("/user/dashboard");
          break;

        default:
          navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Please Wait..." : "Login"}
        </button>

        <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

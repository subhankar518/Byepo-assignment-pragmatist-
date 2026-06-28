import { useNavigate } from "react-router-dom";

import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Feature Flag Management</h1>

        <p className="home-description">
          Manage organizations, features, and feature flags with role-based
          access control.
        </p>

        <div className="home-buttons">
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>

          <button className="signup-btn" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth.service";
import { getUser, clearStorage } from "../utils/storage";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const user = getUser();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    } finally {
      clearStorage();
      navigate("/");
    }
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Feature Flag System</h2>

      <div className="navbar-right">
        <span>
          Welcome, <strong>{user?.name}</strong>
        </span>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar.jsx";

import { getOrganizations } from "../../services/organization.service";

import { getUser } from "../../utils/storage";

import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = getUser();

  const fetchOrganizations = async () => {
    try {
      setLoading(true);

      const response = await getOrganizations();

      setOrganizations(response.data || []);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch organizations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h1>Super Admin Dashboard</h1>

        <p>Welcome, {user?.name}</p>

        <div className="dashboard-card">
          <h3>Total Organizations</h3>

          {loading ? <p>Loading...</p> : <h2>{organizations.length}</h2>}
        </div>

        <div className="dashboard-actions">
          <button onClick={() => navigate("/super-admin/create-organization")}>
            Create Organization
          </button>

          <button onClick={() => navigate("/super-admin/organizations")}>
            View Organizations
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

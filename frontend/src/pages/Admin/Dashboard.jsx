import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";

import { getAllFeatures } from "../../services/feature.service";

import { getUser } from "../../utils/storage";

import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = getUser();

  const fetchFeatures = async () => {
    try {
      setLoading(true);

      const response = await getAllFeatures();

      setFeatures(response.data || []);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch features.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h1>Admin Dashboard</h1>

        <p>Welcome, {user?.name}</p>

        <p>Role : {user?.role}</p>

        <div className="dashboard-card">
          <h3>Total Features</h3>

          {loading ? <p>Loading...</p> : <h2>{features.length}</h2>}
        </div>

        <div className="dashboard-actions">
          <button onClick={() => navigate("/admin/create-feature")}>
            Create Feature
          </button>

          <button onClick={() => navigate("/admin/features")}>
            View Features
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

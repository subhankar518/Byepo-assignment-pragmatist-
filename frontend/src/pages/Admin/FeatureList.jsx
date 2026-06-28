import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar.jsx";

import {
  deleteFeature,
  getAllFeatures,
  toggleFeature,
} from "../../services/feature.service";

import "./FeatureList.css";

const FeatureList = () => {
  const navigate = useNavigate();

  const [features, setFeatures] = useState([]);

  const [loading, setLoading] = useState(false);

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

  const handleDelete = async (featureId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this feature?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await deleteFeature(featureId);

      alert(response.message);

      setFeatures((prev) =>
        prev.filter((feature) => feature._id !== featureId),
      );
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete feature.");
    }
  };

  const handleToggle = async (featureId) => {
    try {
      const response = await toggleFeature(featureId);

      alert(response.message);

      fetchFeatures();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update feature.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="feature-list-container">
        <div className="feature-list-header">
          <h2>Feature List</h2>

          <button onClick={() => navigate("/admin/create-feature")}>
            Create Feature
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : features.length === 0 ? (
          <p>No Features Found.</p>
        ) : (
          <table className="feature-table">
            <thead>
              <tr>
                <th>Feature Key</th>
                <th>Description</th>
                <th>Organization</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {features.map((feature) => (
                <tr key={feature._id}>
                  <td>{feature.featureKey}</td>

                  <td>{feature.description}</td>

                  <td>{feature.organization?.name || feature.organization}</td>

                  <td>{feature.enabled ? "Enabled" : "Disabled"}</td>

                  <td className="action-buttons">
                    <button
                      onClick={() =>
                        navigate(`/admin/edit-feature/${feature._id}`)
                      }
                    >
                      Edit
                    </button>

                    <button onClick={() => handleToggle(feature._id)}>
                      {feature.enabled ? "Disable" : "Enable"}
                    </button>

                    <button onClick={() => handleDelete(feature._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default FeatureList;

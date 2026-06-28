import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar.jsx";

import { checkFeatureStatus } from "../../services/feature.service";
import { getOrganizations } from "../../services/organization.service";
import { getUser } from "../../utils/storage";

import "./CheckFeature.css";

const CheckFeature = () => {
  const user = getUser();

  const [organizations, setOrganizations] = useState([]);

  const [formData, setFormData] = useState({
    featureKey: "",
    organizationId:
      organizations.length > 0 ? organizations[0]._id || organizations[0] : "",
  });

  const [feature, setFeature] = useState(null);

  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.featureKey.trim()) {
      alert("Feature Key is required");
      return;
    }

    if (!formData.organizationId) {
      alert("Please select organization");
      return;
    }

    try {
      setLoading(true);

      const response = await checkFeatureStatus(
        formData.featureKey,
        formData.organizationId,
      );

      setFeature(response.data);
    } catch (error) {
      setFeature(null);

      alert(error.response?.data?.message || "Feature not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="check-feature-container">
        <form className="check-feature-form" onSubmit={handleSubmit}>
          <h2>Check Feature Status</h2>

          <select
            name="organizationId"
            value={formData.organizationId}
            onChange={handleChange}
          >
            <option value="">Select Organization</option>

            {organizations.map((organization) => (
              <option
                key={organization?._id || organization?.name}
                value={organization?._id || organization?.name}
              >
                {organization?.name || organization?._id}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="featureKey"
            placeholder="Enter Feature Key"
            value={formData.featureKey}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Checking..." : "Check Feature"}
          </button>
        </form>

        {feature && (
          <div className="feature-result">
            <h3>Feature Details</h3>

            <p>
              <strong>Feature Key :</strong> {feature.featureKey}
            </p>

            <p>
              <strong>Description :</strong> {feature.description || "N/A"}
            </p>

            <p>
              <strong>Organization :</strong>{" "}
              {feature.organization?.name || feature.organization}
            </p>

            <p>
              <strong>Status :</strong>{" "}
              {feature.enabled ? "Enabled" : "Disabled"}
            </p>

            <p>
              <strong>Created By :</strong>{" "}
              {feature.createdBy?.name || feature.createdBy}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckFeature;

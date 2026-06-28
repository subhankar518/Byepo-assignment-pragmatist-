import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar.jsx";

import {
  createFeature,
  getFeatureById,
  updateFeature,
} from "../../services/feature.service";

import { getOrganizations } from "../../services/organization.service";

import "./CreateFeature.css";

const CreateFeature = () => {
  const navigate = useNavigate();

  const { featureId } = useParams();

  const isEdit = Boolean(featureId);

  const [loading, setLoading] = useState(false);

  const [organizations, setOrganizations] = useState([]);

  const [formData, setFormData] = useState({
    featureKey: "",
    description: "",
    organization: "",
    enabled: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchOrganizations = async () => {
    try {
      const response = await getOrganizations();

      setOrganizations(response.data || []);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch organizations.");
    }
  };

  const fetchFeature = async () => {
    try {
      setLoading(true);

      const response = await getFeatureById(featureId);

      const feature = response.data;

      setFormData({
        featureKey: feature.featureKey || "",
        description: feature.description || "",
        organization: feature.organization?._id || feature.organization || "",
        enabled: feature.enabled,
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch feature.");

      navigate("/admin/features");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();

    if (isEdit) {
      fetchFeature();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.featureKey.trim()) {
      alert("Feature Key is required");
      return;
    }

    if (!formData.organization) {
      alert("Please select an organization");
      return;
    }

    try {
      setLoading(true);

      let response;

      if (isEdit) {
        response = await updateFeature(featureId, formData);
      } else {
        response = await createFeature(formData);
      }

      alert(response.message);

      navigate("/admin/features");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="create-feature-container">
        <form className="create-feature-form" onSubmit={handleSubmit}>
          <h2>{isEdit ? "Update Feature" : "Create Feature"}</h2>

          <input
            type="text"
            name="featureKey"
            placeholder="Feature Key"
            value={formData.featureKey}
            onChange={handleChange}
            disabled={loading}
          />

          <textarea
            name="description"
            placeholder="Description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
          />

          <select
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="">Select Organization</option>

            {organizations.map((organization) => (
              <option key={organization._id} value={organization._id}>
                {organization.name}
              </option>
            ))}
          </select>

          <label className="checkbox-container">
            <input
              type="checkbox"
              name="enabled"
              checked={formData.enabled}
              onChange={handleChange}
              disabled={loading}
            />

            <span>Enabled</span>
          </label>

          <button type="submit" disabled={loading}>
            {loading
              ? isEdit
                ? "Updating..."
                : "Creating..."
              : isEdit
                ? "Update Feature"
                : "Create Feature"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateFeature;

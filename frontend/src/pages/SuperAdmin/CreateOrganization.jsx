import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar.jsx";

import {
  createOrganization,
  getOrganizationById,
  updateOrganization,
} from "../../services/organization.service";

import "./CreateOrganization.css";

const CreateOrganization = () => {
  const navigate = useNavigate();
  const { organizationId } = useParams();

  const isEdit = Boolean(organizationId);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchOrganization = async () => {
    try {
      setLoading(true);

      const response = await getOrganizationById(organizationId);

      const organization = response.data;

      setFormData({
        name: organization.name,
        description: organization.description || "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch organization.");

      navigate("/super-admin/organizations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEdit) {
      fetchOrganization();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Organization name is required");
      return;
    }

    try {
      setLoading(true);

      let response;

      if (isEdit) {
        response = await updateOrganization(organizationId, formData);
      } else {
        response = await createOrganization(formData);
      }

      alert(response.message);

      navigate("/super-admin/organizations");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="create-organization-container">
        <form className="create-organization-form" onSubmit={handleSubmit}>
          <h2>{isEdit ? "Update Organization" : "Create Organization"}</h2>

          <input
            type="text"
            name="name"
            placeholder="Organization Name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
          />

          <textarea
            name="description"
            placeholder="Organization Description"
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
            rows={5}
          />

          <button type="submit" disabled={loading}>
            {loading
              ? isEdit
                ? "Updating..."
                : "Creating..."
              : isEdit
                ? "Update Organization"
                : "Create Organization"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateOrganization;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar.jsx";

import {
  deleteOrganization,
  getOrganizations,
} from "../../services/organization.service";

import "./OrganizationList.css";

const OrganizationList = () => {
  const navigate = useNavigate();

  const [organizations, setOrganizations] = useState([]);
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

  const handleDelete = async (organizationId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this organization?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteOrganization(organizationId);

      alert("Organization deleted successfully.");

      fetchOrganizations();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete organization.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="organization-list-container">
        <div className="organization-list-header">
          <h2>Organizations</h2>

          <button onClick={() => navigate("/super-admin/create-organization")}>
            Create Organization
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : organizations.length === 0 ? (
          <p>No organizations found.</p>
        ) : (
          <table className="organization-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {organizations.map((organization) => (
                <tr key={organization._id}>
                  <td>{organization.name}</td>

                  <td>{organization.description || "-"}</td>

                  <td>{organization.isActive ? "Active" : "Inactive"}</td>

                  <td>
                    <button
                      onClick={() =>
                        navigate(
                          `/super-admin/edit-organization/${organization._id}`,
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(organization._id)}
                    >
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

export default OrganizationList;

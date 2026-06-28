import api from "./axios";

const createOrganization = async (data) => {
  const response = await api.post("/organizations/create-organization", data);
  return response.data;
};

const getOrganizations = async () => {
  const response = await api.get("/organizations/get-all-organizations");
  return response.data;
};

const getOrganizationById = async (organizationId) => {
  const response = await api.get(
    `/organizations/get-organization-details/${organizationId}`,
  );
  return response.data;
};

const updateOrganization = async (organizationId, data) => {
  const response = await api.patch(
    `/organizations/update-organization/${organizationId}`,
    data,
  );

  return response.data;
};

const deleteOrganization = async (organizationId) => {
  const response = await api.delete(
    `/organizations/delete-organization/${organizationId}`,
  );

  return response.data;
};

const getOrganizationsByUser = async (userId) => {
  const response = await api.get(
    `/organizations/get-user-organizations/${userId}`,
  );

  return response.data;
};

export {
  createOrganization,
  getOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
  getOrganizationsByUser,
};

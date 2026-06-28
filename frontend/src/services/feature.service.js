import api from "./axios";

const createFeature = async (data) => {
  const response = await api.post("/features/create-feature", data);

  return response.data;
};

const getAllFeatures = async () => {
  const response = await api.get("/features/get-all-features");

  console.log("All features fetched:", response);
  return response.data;
};

const getFeatureById = async (featureId) => {
  const response = await api.get(`/features/get-feature-details/${featureId}`);

  return response.data;
};

const updateFeature = async (featureId, data) => {
  const response = await api.put(`/features/update-feature/${featureId}`, data);

  return response.data;
};

const deleteFeature = async (featureId) => {
  const response = await api.delete(`/features/delete-feature/${featureId}`);

  return response.data;
};

const toggleFeature = async (featureId) => {
  const response = await api.patch(`/features/toggle-feature/${featureId}`);

  return response.data;
};

const getFeaturesByOrganization = async (organizationId) => {
  const response = await api.get(
    `/features/get-features-by-organization/${organizationId}`,
  );

  return response.data;
};

const checkFeatureStatus = async (featureKey, organizationId) => {
  const response = await api.get("/features/check-feature", {
    params: {
      featureKey,
      organizationId,
    },
  });

  return response.data;
};

export {
  createFeature,
  getAllFeatures,
  getFeatureById,
  updateFeature,
  deleteFeature,
  toggleFeature,
  getFeaturesByOrganization,
  checkFeatureStatus,
};

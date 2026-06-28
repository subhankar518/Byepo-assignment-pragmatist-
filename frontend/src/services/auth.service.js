import api from "./axios";

const register = async (data) => {
  const response = await api.post("/users/register", data);
  return response.data;
};

const login = async (data) => {
  const response = await api.post("/users/login", data);
  return response.data;
};

const logout = async () => {
  const response = await api.post("/users/logout");
  return response.data;
};

export { register, login, logout };

// save logged in user
const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// get logged in user
const getUser = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  return JSON.parse(user);
};

// save user role
const saveRole = (role) => {
  localStorage.setItem("role", role);
};

// get user role
const getRole = () => {
  return localStorage.getItem("role");
};

// check login
const isLoggedIn = () => {
  return !!localStorage.getItem("user");
};

// clear all user data
const clearStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("role");
};

export { saveUser, getUser, saveRole, getRole, isLoggedIn, clearStorage };

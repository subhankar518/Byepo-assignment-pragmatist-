import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import SuperAdminDashboard from "./pages/SuperAdmin/Dashboard";
import CreateOrganization from "./pages/SuperAdmin/CreateOrganization";
import OrganizationList from "./pages/SuperAdmin/OrganizationList";

import AdminDashboard from "./pages/Admin/Dashboard";
import CreateFeature from "./pages/Admin/CreateFeature";
import FeatureList from "./pages/Admin/FeatureList";

import UserDashboard from "./pages/User/Dashboard";
import CheckFeature from "./pages/User/CheckFeature";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* home */}

      <Route path="/" element={<Home />} />

      {/* Auth */}

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      {/* Super admin */}

      <Route
        path="/super-admin/dashboard"
        element={
          <ProtectedRoute role="SUPER-ADMIN">
            <SuperAdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/super-admin/create-organization"
        element={
          <ProtectedRoute role="SUPER-ADMIN">
            <CreateOrganization />
          </ProtectedRoute>
        }
      />

      <Route
        path="/super-admin/edit-organization/:organizationId"
        element={
          <ProtectedRoute role="SUPER-ADMIN">
            <CreateOrganization />
          </ProtectedRoute>
        }
      />

      <Route
        path="/super-admin/organizations"
        element={
          <ProtectedRoute role="SUPER-ADMIN">
            <OrganizationList />
          </ProtectedRoute>
        }
      />

      {/* Admin */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/create-feature"
        element={
          <ProtectedRoute role="ADMIN">
            <CreateFeature />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/edit-feature/:featureId"
        element={
          <ProtectedRoute role="ADMIN">
            <CreateFeature />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/features"
        element={
          <ProtectedRoute role="ADMIN">
            <FeatureList />
          </ProtectedRoute>
        }
      />

      {/* user */}

      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute role="USER">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/features"
        element={
          <ProtectedRoute role="USER">
            <FeatureList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/check-feature"
        element={
          <ProtectedRoute role="USER">
            <CheckFeature />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;

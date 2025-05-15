import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import Bookings from "./pages/Bookings";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import SendOtp from "./pages/SendOtp";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import UserProfile from "./pages/UserProfile";
import UserDetails from "./pages/UserDetails";
import AdminUsersPage from "./pages/AdminUsersPage"; // ✅ NEW

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<SendOtp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Authenticated Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        {/* Admin: View All Users */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["Admin"]}>
                <AdminUsersPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Admin: View User by ID */}
        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["Admin"]}>
                <UserDetails />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Role-Based Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["Admin"]}>
                <AdminDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizer-dashboard"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["Organizer"]}>
                <OrganizerDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["Standard"]}>
                <Bookings />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-event"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["Organizer"]}>
                <CreateEvent />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-event/:id"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["Organizer"]}>
                <EditEvent />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

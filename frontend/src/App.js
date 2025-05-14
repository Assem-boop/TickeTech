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
import SendOtp from "./pages/SendOtp";            // ✅ New
import VerifyOtp from "./pages/VerifyOtp";        // ✅ New (you’ll get the file next)
import ResetPassword from "./pages/ResetPassword"; // ✅ New (you’ll get the file after that)

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

        {/* Protected + Role-Based Routes */}
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

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SendOtp from "./pages/SendOtp";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";

// Components
// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages (only these are available)
import Homepage from "./pages/Homepage";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import OrganizerMyEvents from "./pages/OrganizerMyEvents";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import ProfilePage from "./pages/ProfilePage";
import UserDetails from "./pages/UserDetails";
import EventDetails from "./pages/EventDetails";
import EventAnalytics from "./pages/EventAnalytics";

// ✅ Assuming these components are defined somewhere in your code
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* 🌍 Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<SendOtp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* 🌍 Public Route */}
        <Route path="/" element={<Homepage />} />
        <Route path="/events/:id" element={<EventDetails />} />

        {/* 👤 Authenticated Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* 🧾 Organizer Routes */}
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
          path="/organizer-my-events"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["Organizer"]}>
                <OrganizerMyEvents />
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
        <Route
          path="/organizer-analytics"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["Organizer"]}>
                <EventAnalytics />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* 🛠️ Admin Route (Only one available page) */}
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
      </Routes>
    </Router>
  );
}

export default App;
export default App;

// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { useDispatch, useSelector } from "react-redux";
import { getdoctor } from "./store/slices/doctorSlice";
import { useEffect } from "react";
import { ForgotPassword } from "./pages/auth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.doctor);
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />;
  }
  return children;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.doctor);
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard/home" replace />;
  }
  return children;
};

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getdoctor());
  }, [dispatch]);

  return (
    <Routes>
      {/* Forgot Password Route - Must come BEFORE the /auth/* wildcard route */}
      <Route
        path="/auth/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      {/* Public Auth Routes */}
      <Route
        path="/auth/*"
        element={
          <PublicRoute>
            <Auth />
          </PublicRoute>
        }
      />
      
      {/* Default Route */}
      <Route
        path="*"
        element={<Navigate to="/auth/sign-in" replace />}
      />
    </Routes>
  );
}

export default App;
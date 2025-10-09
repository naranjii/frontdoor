import { AuthContext } from "@/context/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const auth = React.useContext(AuthContext);
  if (!auth) {
    return <Navigate to="/login" />;
  }
  return auth.isAuthenticated ? children : <Navigate to="/login" />;
}
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  if (!localStorage.getItem("noteToken")) {
    return <Navigate to={"/login"} />;
  } else {
    return children;
  }
}

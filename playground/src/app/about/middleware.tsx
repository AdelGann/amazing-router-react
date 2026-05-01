import { Navigate } from "@amazing-router/react";
import { Outlet } from "react-router";

export const middleware = () => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

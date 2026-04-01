import { Navigate, Outlet } from "@amazing-router/react";

export const middleware = () => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

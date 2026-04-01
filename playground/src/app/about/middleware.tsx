import { Navigate, Outlet } from "@amazing-router/react";

export const middleware = () => {
  const isAuthenticated = false; // tu lógica aquí

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // bloquea y redirige
  }

  return <Outlet />; // permite continuar al page
};

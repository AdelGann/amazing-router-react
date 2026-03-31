import { useNavigate, useLocation } from "react-router";

export const useAmazingRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    pathname: location.pathname,
    push: (path: string) => navigate(path),
    replace: (path: string) => navigate(path, { replace: true }),
    back: () => navigate(-1),
  };
};

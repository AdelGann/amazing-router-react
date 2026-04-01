import { useNavigate, useLocation } from "react-router";

/**
 * Custom hook that provides a simplified navigation API built on top of React Router.
 *
 * @returns An object with the current pathname and navigation methods:
 * - `pathname` — the current URL path.
 * - `push(path)` — navigates to the given path, pushing a new entry onto the history stack.
 * - `replace(path)` — navigates to the given path, replacing the current history entry.
 * - `back()` — navigates back one entry in the history stack.
 */
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

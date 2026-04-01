import { useMatches } from "react-router";
import type { AmazingRouteObject } from "../types/routes.type";

/**
 * Custom hook that reads the meta information attached to the currently active route.
 * Meta is injected into the route's `handle` property during route transformation.
 *
 * @returns An object containing the resolved `title`, `description`, and any additional
 * meta fields defined on the matched route. Falls back to default values if no meta is found.
 */
export const useAmazingMeta = () => {
  const matches = useMatches();

  const lastMatch = matches[matches.length - 1];

  const route = lastMatch?.handle as AmazingRouteObject | undefined;

  return {
    title: route?.meta?.title || "React - Amazing Router",
    description: route?.meta?.description || "",
    ...route?.meta,
  };
};

// src/hooks/useAmazingMeta.ts
import { useMatches } from "react-router";
import type { AmazingRouteObject } from "../types/routes.type";

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

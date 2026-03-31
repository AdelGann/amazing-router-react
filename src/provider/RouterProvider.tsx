import { useState, useEffect, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { transformRoutes } from "../utils/TransformRoutes";
import type { AmazingRouteObject } from "../types/routes.type";
import { logger } from "@amazing-router/core";

export const AmazingProvider = ({
  loadingElement = null,
}: {
  loadingElement?: React.ReactNode;
}) => {
  const [routes, setRoutes] = useState<AmazingRouteObject[]>([]);

  useEffect(() => {
    import(/* @vite-ignore */ "/.amazing-router/routes.json")
      .then((module) => {
        const transformed = transformRoutes(module.default);
        setRoutes(transformed);
      })
      .catch((err) => {
        logger.error(
          "Could not find 'routes.json'. Did you run the core build?",
          err,
        );
      });
  }, []);

  const router = useMemo(() => {
    if (routes.length === 0) return null;
    return createBrowserRouter(routes as any);
  }, [routes]);

  if (!router) return loadingElement;

  return <RouterProvider router={router} />;
};

import { useState, useEffect, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { transformRoutes } from "../helpers/TransformRoutes";
import type { RouteNode } from "@amazing-router/core";

/**
 * Props for the {@link AmazingProvider} component.
 */
export interface AmazingProviderProps {
  /** Optional React node to display while the route configuration is being loaded. */
  loadingElement?: React.ReactNode;
}

/**
 * Root provider component for Amazing Router.
 * Dynamically loads the generated `routes.json` and `routeFiles.ts` artifacts
 * produced by the Amazing Router Vite/Webpack plugin, transforms them into a
 * React Router-compatible browser router, and renders the application.
 *
 * @param props - {@link AmazingProviderProps}
 */
export const AmazingProvider = ({
  loadingElement = null,
}: AmazingProviderProps) => {
  const [routes, setRoutes] = useState<RouteNode[]>([]);
  const [routeFiles, setRouteFiles] = useState<
    Record<string, () => Promise<any>>
  >({});

  useEffect(() => {
    const ts = Date.now();
    const routesPath = `/.amazing-router/routes.json?t=${ts}`;
    const routeFilesPath = `/.amazing-router/routeFiles.ts?t=${ts}`;

    Promise.all([
      import(/* @vite-ignore */ routesPath),
      import(/* @vite-ignore */ routeFilesPath),
    ])
      .then(([routesModule, filesModule]) => {
        setRoutes(routesModule.default || []);
        setRouteFiles(filesModule.routeFiles || {});
      })
      .catch((err) => {
        console.warn(
          "Could not find the generated route files. Did you run the core build or forgot to configure the Vite/Webpack plugin?",
        );
        console.error(err);
      });
  }, []);

  const router = useMemo(() => {
    if (!routes || routes.length === 0) return null;
    if (Object.keys(routeFiles).length === 0) return null;
    const transformed = transformRoutes(routes, routeFiles);
    return createBrowserRouter(transformed as any);
  }, [routes, routeFiles]);

  if (!router) return loadingElement;

  return <RouterProvider router={router} />;
};

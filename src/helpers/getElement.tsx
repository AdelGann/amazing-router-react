import { logger, RouteNode } from "@amazing-router/core";
import { lazy, Suspense } from "react";
import { Outlet } from "react-router";

/**
 * Resolves the React element for a given route node by lazy-loading its page or layout component.
 * Falls back to an `<Outlet />` if no file path is found or if the import function is missing.
 *
 * @param node - The route node containing the layout or page path to resolve.
 * @param routeFiles - A map of module paths to their dynamic import functions.
 * @returns A lazy-loaded React element wrapped in `<Suspense>`, or `<Outlet />` as a fallback.
 */
export function getElementForNode(
  node: RouteNode,
  routeFiles: Record<string, () => Promise<any>>,
) {
  const targetPath = node.layoutPath || node.pagePath;
  if (!targetPath) return <Outlet />;

  const normalizedPath = targetPath.replace(/\\/g, "/");
  const importFn = routeFiles[normalizedPath];

  if (!importFn) {
    logger.warn(`Missing route file for: ${normalizedPath}`);
    return <Outlet />;
  }

  const LazyComponent = lazy(importFn);
  return (
    <Suspense fallback={null}>
      <LazyComponent />
    </Suspense>
  );
}

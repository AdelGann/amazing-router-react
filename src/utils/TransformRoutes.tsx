import React, { lazy, Suspense } from "react";
import { Outlet } from "react-router";
import type { RouteNode } from "@amazing-router/core";
import type { AmazingRouteObject } from "../types/routes.type";

function getLazyComponent(filePath: string, routeFiles: Record<string, () => Promise<any>>) {
  const normalizedPath = filePath.replace(/\\/g, "/");
  const importFn = routeFiles[normalizedPath];
  if (!importFn) {
    console.warn(`[Amazing Router] Missing route file for: ${normalizedPath}`);
    return null;
  }
  return lazy(importFn);
}

/**
 * Middleware files use a NAMED export `middleware`, not a default export.
 * We wrap the import to expose it as `default` so React.lazy() can use it.
 */
function getLazyMiddleware(filePath: string, routeFiles: Record<string, () => Promise<any>>) {
  const normalizedPath = filePath.replace(/\\/g, "/");
  const importFn = routeFiles[normalizedPath];
  if (!importFn) {
    console.warn(`[Amazing Router] Missing middleware file for: ${normalizedPath}`);
    return null;
  }
  return lazy(() => importFn().then((mod: any) => ({ default: mod.middleware })));
}

function getElementForNode(
  node: RouteNode,
  routeFiles: Record<string, () => Promise<any>>,
  isPageOnly = false,
) {
  const filePath = isPageOnly ? node.pagePath : (node.layoutPath || node.pagePath);
  if (!filePath) return <Outlet />;

  const LazyComponent = getLazyComponent(filePath, routeFiles);
  if (!LazyComponent) return <Outlet />;

  const element = (
    <Suspense fallback={null}>
      <LazyComponent />
    </Suspense>
  );

  // If there's a middleware, wrap the page with it
  // Middleware uses a NAMED export, so we use getLazyMiddleware
  if (node.middlewarePath) {
    const LazyMiddleware = getLazyMiddleware(node.middlewarePath, routeFiles);
    if (LazyMiddleware) {
      return (
        <Suspense fallback={null}>
          <LazyMiddleware />
        </Suspense>
      );
    }
  }

  return element;
}

/**
 * Recursively transforms a tree of RouteNodes into React Router compatible objects.
 *
 * Key behaviors:
 * - Top-level routes use absolute paths ("/about")
 * - Nested routes use relative paths ("about") as required by React Router
 * - Pathless group layout wrappers have NO path property (not even undefined)
 * - Middleware wraps the page element when present
 *
 * @param nodes - Array of nodes from routes.json
 * @param isNested - Whether these nodes are children of another route
 * @returns Array of AmazingRouteObject
 */
export function transformRoutes(
  nodes: RouteNode[],
  routeFiles: Record<string, () => Promise<any>>,
  isNested = false,
): AmazingRouteObject[] {
  const result: AmazingRouteObject[] = [];

  for (const node of nodes) {
    // React Router requires relative paths for nested routes
    const routePath = isNested && node.path
      ? node.path.replace(/^\//, "")
      : node.path;

    // CRITICAL: Do NOT set path: undefined — omit the property entirely
    // React Router checks `'path' in route`, not just `route.path`
    const route: AmazingRouteObject = {
      id: node.id,
      element: getElementForNode(node, routeFiles),
      handle: { meta: node.meta },
      children: [],
      ...(routePath !== undefined ? { path: routePath } : {}),
    };

    if (node.layoutPath && node.pagePath) {
      // Node has BOTH layout and page → page becomes an index child
      route.children!.push({
        id: `${node.id}-index`,
        index: true,
        element: getElementForNode({ ...node, layoutPath: undefined }, routeFiles),
        handle: { meta: node.meta },
      });
    }

    if (node.children && node.children.length > 0) {
      route.children!.push(...transformRoutes(node.children, routeFiles, true));
    }

    if (route.children && route.children.length === 0) {
      delete route.children;
    }

    result.push(route);
  }

  return result;
}

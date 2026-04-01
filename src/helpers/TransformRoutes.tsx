import { Outlet } from "react-router";
import type { RouteNode } from "@amazing-router/core";
import type { AmazingRouteObject } from "../types/routes.type";
import { getPageElement, wrapLazy } from "../utils";
import { getLazyMiddleware } from "../utils/getMiddleware";
import { toRelativePath } from "../utils/toRelativePath";
import { getLayoutElement } from "../utils/getLayout";

/**
 * Recursively transforms a tree of RouteNodes into React Router route objects.
 *
 * Path relativity rules:
 *   - Top-level nodes (parentAbsPath=undefined) keep their absolute paths so
 *     React Router registers them correctly.
 *   - Nested nodes receive ONLY the remaining segment(s) relative to their parent:
 *       parent="/about", child="/about/hola" → child path becomes "hola"
 *   - Pathless nodes (group wrappers) have NO path property at all.
 *
 * Middleware pattern:
 *   When a node has a middleware, the middleware becomes the route element.
 *   The page is injected as an index child so <Outlet /> in the middleware
 *   renders the page. Sub-routes become siblings of the index child so they
 *   are also protected by the middleware.
 *
 * @param nodes         RouteNode array from routes.json
 * @param routeFiles    Import-map from routeFiles.ts
 * @param parentAbsPath Absolute URL path of the parent (undefined = top level)
 */
export function transformRoutes(
  nodes: RouteNode[],
  routeFiles: Record<string, () => Promise<any>>,
  parentAbsPath?: string,
): AmazingRouteObject[] {
  const result: AmazingRouteObject[] = [];

  for (const node of nodes) {
    const routePath =
      node.path !== undefined
        ? toRelativePath(node.path, parentAbsPath)
        : undefined;

    const route: AmazingRouteObject = {
      id: node.id,
      handle: { meta: node.meta },
      children: [],
      ...(routePath !== undefined ? { path: routePath } : {}),
    };

    const hasMiddleware = !!node.middlewarePath;
    const hasLayout = !!node.layoutPath;
    const hasPage = !!node.pagePath;

    if (hasMiddleware) {
      const LazyMw = getLazyMiddleware(node.middlewarePath!, routeFiles);
      route.element = LazyMw ? wrapLazy(LazyMw) : <Outlet />;

      if (hasPage) {
        route.children!.push({
          id: `${node.id}-page`,
          index: true,
          element: getPageElement(node, routeFiles),
          handle: { meta: node.meta },
        });
      }
    } else if (hasLayout) {
      route.element = getLayoutElement(node, routeFiles);

      if (hasPage) {
        route.children!.push({
          id: `${node.id}-index`,
          index: true,
          element: getPageElement(node, routeFiles),
          handle: { meta: node.meta },
        });
      }
    } else if (hasPage) {
      route.element = getPageElement(node, routeFiles);
    } else {
      route.element = <Outlet />;
    }

    if (node.children && node.children.length > 0) {
      const childParent =
        node.path !== undefined ? node.path : (parentAbsPath ?? "");
      route.children!.push(
        ...transformRoutes(node.children, routeFiles, childParent),
      );
    }

    if (route.children && route.children.length === 0) {
      delete route.children;
    }

    result.push(route);
  }

  return result;
}

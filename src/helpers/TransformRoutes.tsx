import { Outlet } from "react-router";
import type { RouteNode } from "@amazing-router/core";
import type { AmazingRouteObject } from "../types/routes.type";
import {
  getLayoutElement,
  getLazyMiddleware,
  toRelativePath,
  getPageElement,
  wrapLazy,
} from "../utils";

/**
 * Recursively transforms a tree of RouteNodes into React Router route objects.
 * Fixes:
 * 1. Path relativity for nested children.
 * 2. Layout nesting even without Middleware.
 * 3. Group Route isolation.
 */
export function transformRoutes(
  nodes: RouteNode[],
  routeFiles: Record<string, () => Promise<any>>,
  parentAbsPath?: string,
): AmazingRouteObject[] {
  const result: AmazingRouteObject[] = [];

  for (const node of nodes) {
    const isGroup = node.id.startsWith("(") && node.id.endsWith(")");

    const routePath =
      node.path !== undefined
        ? toRelativePath(node.path, isGroup ? undefined : parentAbsPath)
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
    const hasChildren = node.children && node.children.length > 0;

    if (hasMiddleware) {
      const LazyMw = getLazyMiddleware(node.middlewarePath!, routeFiles);
      route.element = LazyMw ? wrapLazy(LazyMw) : <Outlet />;
    } else if (hasLayout) {
      route.element = getLayoutElement(node, routeFiles);
    } else if (hasPage && !hasChildren) {
      route.element = getPageElement(node, routeFiles);
    } else {
      route.element = <Outlet />;
    }

    let targetChildren = route.children!;

    if (hasMiddleware && hasLayout) {
      const layoutChild: AmazingRouteObject = {
        id: `${node.id}-layout`,
        element: getLayoutElement(node, routeFiles),
        children: [],
      };
      targetChildren.push(layoutChild);
      targetChildren = layoutChild.children!;
    }

    // Add the page as an index if this route is a container
    if (hasPage && (hasMiddleware || hasLayout || hasChildren)) {
      targetChildren.push({
        id: `${node.id}-index`,
        index: true,
        element: getPageElement(node, routeFiles),
        handle: { meta: node.meta },
      });
    }

    if (hasChildren) {
      const nextParentPath = isGroup ? parentAbsPath : node.path;
      const childrenRoutes = transformRoutes(
        node.children!,
        routeFiles,
        nextParentPath,
      );
      targetChildren.push(...childrenRoutes);
    }

    if (route.children && route.children.length === 0) {
      delete route.children;
    }

    result.push(route);
  }

  return result;
}

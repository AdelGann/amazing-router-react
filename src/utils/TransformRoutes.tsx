import { DynamicComponent } from "../helpers/DynamicComponent";
import type { RouteNode } from "@amazing-router/core";
import type { AmazingRouteObject } from "../types/routes.type";

/**
 * Recursively transforms a tree of RouteNodes into React Router compatible objects.
 * * This function handles:
 * 1. Metadata injection into the 'handle' property for useAmazingMeta.
 * 2. Recursive nesting of child routes.
 * 3. Mapping of both Layouts and Pages through DynamicComponent.
 * * @param nodes - Array of nodes from routes.json
 * @returns Array of AmazingRouteObject
 */
export function transformRoutes(nodes: RouteNode[]): AmazingRouteObject[] {
  return nodes.map((node) => {
    const route: AmazingRouteObject = {
      id: node.id,
      // React Router 7 nesting: children shouldn't have leading slashes
      // except for the root-level independent routes.
      path: node.path,
      element: <DynamicComponent node={node} />,
      // Inject metadata so it's accessible via useMatches() or hooks
      handle: {
        meta: node.meta,
      },
    };

    if (node.children && node.children.length > 0) {
      route.children = transformRoutes(node.children);
    }

    return route;
  });
}

import type { RouteObject } from "react-router";
import { MetaProps } from "./meta.types";

/**
 * Extends React Router's `RouteObject` with Amazing Router specific fields.
 * Used as the internal representation of each route after transformation.
 */
export interface AmazingRouteObject extends Omit<RouteObject, "children"> {
  /** Unique identifier for the route, derived from the file-system path. */
  id: string;
  /** The URL path segment for this route. */
  path?: string;
  /** The React element rendered when this route is active. */
  element?: React.ReactNode;
  /** Optional metadata attached to this route, accessible via `useAmazingMeta`. */
  meta?: MetaProps;
  /** Nested child routes. */
  children?: AmazingRouteObject[];
}

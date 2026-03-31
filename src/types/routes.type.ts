// src/types/routes.type.ts
import type { RouteObject } from "react-router";
import { MetaProps } from "./meta.types";

export interface AmazingRouteObject extends Omit<RouteObject, "children"> {
  id: string;
  path?: string;
  element?: React.ReactNode;
  meta?: MetaProps;
  children?: AmazingRouteObject[];
}

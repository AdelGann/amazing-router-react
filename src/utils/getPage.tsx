import { RouteNode } from "@amazing-router/core";
import { getLazyComponent } from "./getLazyComponent";
import { Outlet } from "react-router";
import { wrapLazy } from "./wrapLazy";

export function getPageElement(
  node: RouteNode,
  routeFiles: Record<string, () => Promise<any>>,
) {
  if (!node.pagePath) return <Outlet />;
  const Comp = getLazyComponent(node.pagePath, routeFiles);
  return Comp ? wrapLazy(Comp) : <Outlet />;
}

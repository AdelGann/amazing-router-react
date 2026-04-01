import { RouteNode } from "@amazing-router/core";
import { getLazyComponent } from "./getLazyComponent";
import { wrapLazy } from "./wrapLazy";
import { Outlet } from "react-router";

export function getLayoutElement(
  node: RouteNode,
  routeFiles: Record<string, () => Promise<any>>,
) {
  if (!node.layoutPath) return <Outlet />;
  const Comp = getLazyComponent(node.layoutPath, routeFiles);
  return Comp ? wrapLazy(Comp) : <Outlet />;
}

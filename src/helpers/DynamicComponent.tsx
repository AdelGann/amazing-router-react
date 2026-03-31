import { Suspense, lazy, useMemo } from "react";
import type { RouteNode } from "@amazing-router/core";
import { Outlet } from "@amazing_router/react/index";

interface DynamicComponentProps {
  /** The route node data from the Core */
  node: RouteNode;
  /** Optional fallback for Suspense during lazy loading */
  fallback?: React.ReactNode;
}

/**
 * DynamicComponent is a high-order wrapper that resolves file paths into
 * actual React components using dynamic imports and Suspense.
 * * It prioritizes Layouts to ensure the nesting structure remains intact.
 */
export const DynamicComponent = ({
  node,
  fallback = null,
}: DynamicComponentProps) => {
  const Component = useMemo(() => {
    const targetPath = node.layoutPath || node.pagePath;

    if (!targetPath) {
      return () => <Outlet />;
    }

    return lazy(() => import(/* @vite-ignore */ targetPath));
  }, [node.layoutPath, node.pagePath]);

  return (
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  );
};

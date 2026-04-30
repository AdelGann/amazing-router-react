import { lazy } from "react";

export function getLazyComponent(
  filePath: string,
  routeFiles: Record<string, () => Promise<any>>,
) {
  const normalizedPath = filePath.replace(/\\/g, "/");
  const importFn = routeFiles[normalizedPath];
  if (!importFn) {
    console.warn(`Missing route file for: ${normalizedPath}`);
    return null;
  }
  return lazy(importFn);
}

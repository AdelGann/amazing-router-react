import { lazy } from "react";
import { logger } from "@amazing-router/core";

export function getLazyComponent(
  filePath: string,
  routeFiles: Record<string, () => Promise<any>>,
) {
  const normalizedPath = filePath.replace(/\\/g, "/");
  const importFn = routeFiles[normalizedPath];
  if (!importFn) {
    logger.warn(`Missing route file for: ${normalizedPath}`);
    return null;
  }
  return lazy(importFn);
}

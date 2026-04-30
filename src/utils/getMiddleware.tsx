import { lazy } from "react";

/**
 * Middleware files use a NAMED export `middleware`, not a default export.
 * Wrap the import so React.lazy() gets { default: fn }.
 */
export function getLazyMiddleware(
  filePath: string,
  routeFiles: Record<string, () => Promise<any>>,
) {
  const normalizedPath = filePath.replace(/\\/g, "/");
  const importFn = routeFiles[normalizedPath];
  if (!importFn) {
    console.warn(`Missing middleware file for: ${normalizedPath}`);
    return null;
  }
  return lazy(() =>
    importFn().then((mod: any) => ({ default: mod.middleware })),
  );
}

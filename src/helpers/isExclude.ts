/**
 * Determines whether a route node should be excluded from the generated route tree.
 *
 * @param nodeId - The unique identifier of the route node to check.
 * @param excludedPaths - Optional list of path prefixes that should be excluded.
 * @returns `true` if the node ID starts with any of the excluded path prefixes, otherwise `false`.
 */
export const isExcluded = (
  nodeId: string,
  excludedPaths?: string[],
): boolean => {
  if (!excludedPaths || excludedPaths.length === 0) return false;
  return excludedPaths.some((path) => nodeId.startsWith(path));
};

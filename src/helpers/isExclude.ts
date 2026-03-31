export const isExcluded = (
  nodeId: string,
  excludedPaths?: string[],
): boolean => {
  if (!excludedPaths || excludedPaths.length === 0) return false;
  return excludedPaths.some((path) => nodeId.startsWith(path));
};

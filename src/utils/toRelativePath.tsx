export function toRelativePath(absPath: string, parentAbsPath: string | undefined): string {
  if (parentAbsPath === undefined) {
    // Top-level: keep paths absolute
    return absPath;
  }
  if (!parentAbsPath || parentAbsPath === "/") {
    // Under root: just strip the leading "/"
    return absPath.replace(/^\//, "");
  }
  // Under a real parent path like "/about": strip the parent prefix
  const prefix = parentAbsPath + "/";
  if (absPath.startsWith(prefix)) {
    return absPath.slice(prefix.length);
  }
  // Fallback: strip leading "/"
  return absPath.replace(/^\//, "");
}

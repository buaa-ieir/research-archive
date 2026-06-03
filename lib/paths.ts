export const basePath =
  process.env.NODE_ENV === "production" ? "/research-archive" : "";

export function withBasePath(path: string | Blob | undefined | null): string {
  if (typeof path !== "string") return "";
  if (!path) return "";

  // Do not modify external URLs, anchors, data URLs, or blob URLs.
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("#") ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  ) {
    return path;
  }

  if (!path.startsWith("/")) return path;

  return `${basePath}${path}`;
}

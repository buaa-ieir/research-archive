export const basePath =
  process.env.NODE_ENV === "production" ? "/research-archive" : "";

export function withBasePath(path: string) {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}

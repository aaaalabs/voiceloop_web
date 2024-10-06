export function getOptimizedImageUrl(url: string, width: number): string {
  if (typeof url === "string" && url.includes("ik.imagekit.io")) {
    return `${url}${url.includes("?") ? "&" : "?"}tr=w-${width}`;
  }
  return url;
}

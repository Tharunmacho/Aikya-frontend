const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API_ORIGIN = API_BASE.replace(/\/api\/?$/, "");

export const getImageUrl = (imagePath?: string | null) => {
  if (!imagePath) return "";

  const path = imagePath.trim();
  if (!path) return "";

  if (path.startsWith("data:") || path.startsWith("blob:")) {
    return path;
  }

  if (path.startsWith("//")) {
    return `https:${path}`;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    try {
      const parsedUrl = new URL(path);
      if (parsedUrl.hostname === "localhost" || parsedUrl.hostname === "127.0.0.1") {
        const apiOriginUrl = new URL(API_ORIGIN);
        parsedUrl.protocol = apiOriginUrl.protocol;
        parsedUrl.host = apiOriginUrl.host;
        return parsedUrl.toString();
      }
    } catch {
      return path;
    }

    return path;
  }

  if (path.startsWith("/api/") || path.startsWith("/uploads/") || path.startsWith("/images/")) {
    return `${API_ORIGIN}${path}`;
  }

  if (path.startsWith("api/") || path.startsWith("uploads/") || path.startsWith("images/")) {
    return `${API_ORIGIN}/${path}`;
  }

  return path;
};

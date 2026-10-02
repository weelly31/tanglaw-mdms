import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Tanglaw Touch Care Foundation",
    short_name: "Tanglaw",
    description: "Grow in faith, grow in purpose, and grow together.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f7f7fb",
    theme_color: "#323675",
    categories: ["community", "lifestyle", "productivity"],
    icons: [
      {
        src: "/pwa/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

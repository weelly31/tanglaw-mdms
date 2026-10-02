const CACHE_NAME = "tanglaw-pwa-v2";
const PRECACHE_URLS = ["/manifest.webmanifest", "/pwa/icon-192.png", "/pwa/icon-512.png"];
const OFFLINE_PAGE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#323675">
    <title>You're offline | Tanglaw</title>
    <style>
      *{box-sizing:border-box}body{min-height:100vh;margin:0;display:grid;place-items:center;padding:24px;background:#f7f7fb;color:#292b42;font-family:Arial,Helvetica,sans-serif;text-align:center}main{max-width:360px;padding:36px 28px;background:#fff;border:1px solid #ececf2;border-radius:18px;box-shadow:0 12px 36px #292b4210}img{width:76px;height:76px;object-fit:contain}h1{margin:18px 0 8px;font-size:24px}p{margin:0;color:#85899b;font-size:14px;line-height:1.7}a{display:inline-block;margin-top:22px;padding:11px 18px;border-radius:8px;background:#575bd7;color:#fff;text-decoration:none;font-size:13px;font-weight:600}
    </style>
  </head>
  <body>
    <main>
      <img src="/pwa/icon-192.png" alt="Tanglaw Touch Care Foundation">
      <h1>You're offline</h1>
      <p>Reconnect to the internet to open this page. Pages you have already visited may still be available.</p>
      <a href="/">Try again</a>
    </main>
  </body>
</html>`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(cacheNames
        .filter((cacheName) => cacheName.startsWith("tanglaw-pwa-") && cacheName !== CACHE_NAME)
        .map((cacheName) => caches.delete(cacheName))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok && response.type === "basic") {
          const responseCopy = response.clone();
          event.waitUntil(
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseCopy)),
          );
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;

        if (request.mode === "navigate") {
          return new Response(OFFLINE_PAGE, {
            status: 503,
            headers: { "Content-Type": "text/html; charset=utf-8" },
          });
        }

        return new Response("You are offline. Reconnect to the internet and try again.", {
          status: 503,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      }),
  );
});

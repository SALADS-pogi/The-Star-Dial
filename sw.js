// Increment this version whenever app assets change.
const CACHE_VERSION = "v5";
// GitHub Pages projects share an origin; isolate caches by registration scope.
const CACHE_PREFIX = `star-dial:${self.registration.scope}:`;
const CACHE_NAME = `${CACHE_PREFIX}${CACHE_VERSION}`;
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./observatory.css",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin ||
      !url.href.startsWith(self.registration.scope)) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      const response = await fetch(event.request);
      if (response.ok) {
        // A full cache should not prevent a successful online response.
        await cache.put(event.request, response.clone()).catch(() => undefined);
      }
      return response;
    } catch {
      const cached = await cache.match(event.request);
      if (cached) return cached;
      if (event.request.mode === "navigate") {
        const app = await cache.match(new URL("./index.html", self.registration.scope).href);
        if (app) return app;
      }
      return new Response("Offline", { status: 503, statusText: "Offline" });
    }
  })());
});

/* ÜSTAD KPSS — çevrimdışı servis çalışanı */
const ONBELLEK = "ustad-kpss-v1.0";
const DOSYALAR = [
  "./", "./index.html", "./manifest.json", "./assets/stil.css", "./assets/uygulama.js",
  "./icerik/sorular.js", "./icerik/ozetler.js",
  "./img/madalyon.jpg", "./img/ikon-180.png", "./img/ikon-192.png", "./img/ikon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(ONBELLEK)
    .then(c => c.addAll(DOSYALAR).catch(() => {}))
    .then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(adlar => Promise.all(adlar.filter(a => a !== ONBELLEK).map(a => caches.delete(a))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const istek = e.request;
  if (istek.method !== "GET") return;
  const yol = new URL(istek.url);
  if (yol.origin !== location.origin) return;
  e.respondWith(
    caches.match(istek).then(yanit => yanit || fetch(istek).then(yeni => {
      if (yeni && yeni.status === 200) {
        const kopya = yeni.clone();
        caches.open(ONBELLEK).then(c => c.put(istek, kopya)).catch(() => {});
      }
      return yeni;
    }).catch(() => caches.match("./index.html")))
  );
});

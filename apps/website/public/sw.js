if (!self.define) {
  let e,
    s = {};
  const a = (a, n) => (
    (a = new URL(a + '.js', n).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, i) => {
    const t =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[t]) return;
    let c = {};
    const f = (e) => a(e, t),
      r = { module: { uri: t }, exports: c, require: f };
    s[t] = Promise.all(n.map((e) => r[e] || f(e))).then((e) => (i(...e), c));
  };
}
define(['./workbox-d25a3628'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/app-build-manifest.json',
          revision: 'f9ed72cd583d072d46b65f6302a416d3',
        },
        {
          url: '/_next/static/NGf9mfNfV7zSrbxQUqKEd/_buildManifest.js',
          revision: 'f97b2def7f98ec227a1c507e0a83564d',
        },
        {
          url: '/_next/static/NGf9mfNfV7zSrbxQUqKEd/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/162-2e29433d96f8a782.js',
          revision: 'NGf9mfNfV7zSrbxQUqKEd',
        },
        {
          url: '/_next/static/chunks/263-26998d1cd824c303.js',
          revision: 'NGf9mfNfV7zSrbxQUqKEd',
        },
        {
          url: '/_next/static/chunks/30-e104eb02de646f7a.js',
          revision: 'NGf9mfNfV7zSrbxQUqKEd',
        },
        {
          url: '/_next/static/chunks/449-0082d8adab06dfff.js',
          revision: 'NGf9mfNfV7zSrbxQUqKEd',
        },
        {
          url: '/_next/static/chunks/638-c1550727713b3f21.js',
          revision: 'NGf9mfNfV7zSrbxQUqKEd',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/demo/page-7263333c68ef7318.js',
          revision: 'NGf9mfNfV7zSrbxQUqKEd',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/layout-fd3121244f422f90.js',
          revision: 'NGf9mfNfV7zSrbxQUqKEd',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/page-2d2d50e5447bbcbb.js',
          revision: 'NGf9mfNfV7zSrbxQUqKEd',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-ad827f9776c69944.js',
          revision: 'NGf9mfNfV7zSrbxQUqKEd',
        },
        {
          url: '/_next/static/chunks/app/layout-ddcea0d40aa0c318.js',
          revision: 'NGf9mfNfV7zSrbxQUqKEd',
        },
        {
          url: '/_next/static/chunks/d852bed0-a17b81a349efd4a3.js',
          revision: 'NGf9mfNfV7zSrbxQUqKEd',
        },
        {
          url: '/_next/static/chunks/framework-e2992f489174322a.js',
          revision: 'NGf9mfNfV7zSrbxQUqKEd',
        },
        {
          url: '/_next/static/chunks/main-27e7b21c454e05d3.js',
          revision: 'NGf9mfNfV7zSrbxQUqKEd',
        },
        {
          url: '/_next/static/chunks/main-app-27600e3f07a0383d.js',
          revision: 'NGf9mfNfV7zSrbxQUqKEd',
        },
        {
          url: '/_next/static/chunks/pages/_app-0f3026d4bb6981d3.js',
          revision: 'NGf9mfNfV7zSrbxQUqKEd',
        },
        {
          url: '/_next/static/chunks/pages/_error-d8ffda56f6a89f4b.js',
          revision: 'NGf9mfNfV7zSrbxQUqKEd',
        },
        {
          url: '/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js',
          revision: '79330112775102f91e1010318bae2bd3',
        },
        {
          url: '/_next/static/chunks/webpack-5f3c6c2d08dd3e31.js',
          revision: 'NGf9mfNfV7zSrbxQUqKEd',
        },
        {
          url: '/_next/static/css/2f71e0d51b6954c9.css',
          revision: '2f71e0d51b6954c9',
        },
        {
          url: '/_next/static/css/837264de9abe11c7.css',
          revision: '837264de9abe11c7',
        },
        {
          url: '/_next/static/media/05a31a2ca4975f99-s.woff2',
          revision: 'f1b44860c66554b91f3b1c81556f73ca',
        },
        {
          url: '/_next/static/media/513657b02c5c193f-s.woff2',
          revision: 'c4eb7f37bc4206c901ab08601f21f0f2',
        },
        {
          url: '/_next/static/media/51ed15f9841b9f9d-s.woff2',
          revision: 'bb9d99fb9bbc695be80777ca2c1c2bee',
        },
        {
          url: '/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2',
          revision: '74c3556b9dad12fb76f84af53ba69410',
        },
        {
          url: '/_next/static/media/d6b16ce4a6175f26-s.woff2',
          revision: 'dd930bafc6297347be3213f22cc53d3e',
        },
        {
          url: '/_next/static/media/dark-screenshot.d29d9197.png',
          revision: '516ee60fd30b2b82165e6f7eb98d7d7f',
        },
        {
          url: '/_next/static/media/ec159349637c90ad-s.woff2',
          revision: '0e89df9522084290e01e4127495fae99',
        },
        {
          url: '/_next/static/media/fd4db3eb5472fc27-s.woff2',
          revision: '71f3fcaf22131c3368d9ec28ef839831',
        },
        {
          url: '/_next/static/media/light-screenshot.39ab6bdb.png',
          revision: '700bb42cdd1e1eaa93e9a3ad18b0fad5',
        },
        {
          url: '/assets/android-chrome-192x192.png',
          revision: 'd4a0ea8783eb3f40312ceed37f4750e2',
        },
        {
          url: '/assets/android-chrome-512x512.png',
          revision: '8c4974b507a4c6b41fbad86fe45967cd',
        },
        {
          url: '/assets/apple-touch-icon.png',
          revision: '7afc910eb2a96f8f785f2094b8ebb7da',
        },
        {
          url: '/assets/browserconfig.xml',
          revision: 'a493ba0aa0b8ec8068d786d7248bb92c',
        },
        {
          url: '/assets/favicon-16x16.png',
          revision: 'ef1b5674b4e65a39ca6c136db3bdd836',
        },
        {
          url: '/assets/favicon-32x32.png',
          revision: '03649fd1a3ac449cff64f471fd2d1fb9',
        },
        {
          url: '/assets/favicon.ico',
          revision: '9da7b96911a8a7bacad3429b833710f7',
        },
        {
          url: '/assets/manifest-icon-192.maskable.png',
          revision: 'de5a31d8d8eb88274af652946869d0be',
        },
        {
          url: '/assets/manifest-icon-512.maskable.png',
          revision: '5e680d10c55e458ebd10420300b1311e',
        },
        {
          url: '/assets/mstile-150x150.png',
          revision: 'e597cdf5b4a4a734d9b65045be161aeb',
        },
        {
          url: '/assets/safari-pinned-tab.svg',
          revision: '43ff1f1f5f303d9f80f76236d20ee121',
        },
        { url: '/robots.txt', revision: '1b88316955f031a9b2bc9d9ab338d854' },
        { url: '/sitemap.xml', revision: 'ebbca34a7cd10f5467aecf3331106bcf' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: n,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    );
});

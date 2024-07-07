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
  self.define = (n, c) => {
    const t =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[t]) return;
    let i = {};
    const o = (e) => a(e, t),
      r = { module: { uri: t }, exports: i, require: o };
    s[t] = Promise.all(n.map((e) => r[e] || o(e))).then((e) => (c(...e), i));
  };
}
define(['./workbox-01fd22c6'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/app-build-manifest.json',
          revision: '78f464e45fdff8bd3ea8cd88e6dada55',
        },
        {
          url: '/_next/static/M5SB3VCBbyX1AK1EsAHYv/_buildManifest.js',
          revision: '545f7a538c5845544d44851a5ba2c490',
        },
        {
          url: '/_next/static/M5SB3VCBbyX1AK1EsAHYv/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/112-ae74f9c5eb56fa0d.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/190-4aca4f13dff3b29c.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/326-af7545e64bbf9543.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/356-0ee57edf128d6cd0.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/364-2932a2f6a144fc2f.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/59aa9046-dff3088f60028a54.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/638-57d3574e401dec14.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/701-45252a6f2f989cb4.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/910-8d4d9756ac2b5f6d.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/demo/page-13afa4a8e724d32b.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/doc/concept/configuration/page-963f96e20386c64f.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/doc/concept/content_declaration/declaration_watching/page-a17c349d0eef1a1a.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/doc/concept/content_declaration/declare_your_content/page-683b079516d37c8c.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/doc/concept/content_declaration/enumeration/page-9241821885e84851.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/doc/concept/content_declaration/function_fetching/page-f5e5b4082ff05c3c.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/doc/concept/content_declaration/nested_id/page-c08695fde2c89690.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/doc/concept/content_declaration/translation/page-9b36c9f83e7ec46c.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/doc/concept/how_works_intlayer/page-4d386d7be81d76a6.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/doc/concept/interest_of_intlayer/page-a585dbdda20ab073.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/doc/concept/intlayer_editor/page-5f0e60c1472fb821.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/doc/concept/intlayer_with_i18n/page-e06b3ec364a99835.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/doc/environment/intlayer_with_create_react_app/page-23c3ec57ce3cb8ff.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/doc/environment/intlayer_with_nextjs/page-2ec3aa1041c6beea.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/doc/environment/intlayer_with_vite_and_react/page-65cf7d1cef8b86ea.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/doc/get_started/page-d4641ead798e5b7d.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/doc/page-c709fce1f72b23f0.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/layout-8da3f1f623416b05.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/page-da22c81a705a6655.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/privacy_notice/page-e5957d8f12368f77.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/terms_of_service/page-0a6507b97f0fb4e4.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-36eaff728a2ceb74.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/app/layout-b6c026dff49e503e.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/framework-e2992f489174322a.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/main-0d2062f1620f11a0.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/main-app-105dbb5fab230773.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/pages/_app-e2558c84100e467a.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/pages/_error-93938be3641efc5d.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js',
          revision: '79330112775102f91e1010318bae2bd3',
        },
        {
          url: '/_next/static/chunks/webpack-dd7d740f2a7f57bc.js',
          revision: 'M5SB3VCBbyX1AK1EsAHYv',
        },
        {
          url: '/_next/static/css/06d827690b51cd39.css',
          revision: '06d827690b51cd39',
        },
        {
          url: '/_next/static/css/2f71e0d51b6954c9.css',
          revision: '2f71e0d51b6954c9',
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
        {
          url: '/service-worker.js',
          revision: '1f7d0a2d1ae1ff684074554114aeae5a',
        },
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

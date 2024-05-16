if (!self.define) {
  let e,
    s = {};
  const a = (a, i) => (
    (a = new URL(a + '.js', i).href),
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
  self.define = (i, c) => {
    const n =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[n]) return;
    let t = {};
    const p = (e) => a(e, n),
      f = { module: { uri: n }, exports: t, require: p };
    s[n] = Promise.all(i.map((e) => f[e] || p(e))).then((e) => (c(...e), t));
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
          revision: 'adfd66acc76060b10657e00236e890ae',
        },
        {
          url: '/_next/static/chunks/263-26998d1cd824c303.js',
          revision: 'gpdXGJ92-mRJGAf0K5ezk',
        },
        {
          url: '/_next/static/chunks/966-0860d8fc554aaccd.js',
          revision: 'gpdXGJ92-mRJGAf0K5ezk',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/page-b67e7f2551b7388d.js',
          revision: 'gpdXGJ92-mRJGAf0K5ezk',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-ad827f9776c69944.js',
          revision: 'gpdXGJ92-mRJGAf0K5ezk',
        },
        {
          url: '/_next/static/chunks/app/layout-f2caeb2dfd9a1b93.js',
          revision: 'gpdXGJ92-mRJGAf0K5ezk',
        },
        {
          url: '/_next/static/chunks/d852bed0-a17b81a349efd4a3.js',
          revision: 'gpdXGJ92-mRJGAf0K5ezk',
        },
        {
          url: '/_next/static/chunks/framework-e2992f489174322a.js',
          revision: 'gpdXGJ92-mRJGAf0K5ezk',
        },
        {
          url: '/_next/static/chunks/main-app-27600e3f07a0383d.js',
          revision: 'gpdXGJ92-mRJGAf0K5ezk',
        },
        {
          url: '/_next/static/chunks/main-cc289d1a9205f40c.js',
          revision: 'gpdXGJ92-mRJGAf0K5ezk',
        },
        {
          url: '/_next/static/chunks/pages/_app-0f3026d4bb6981d3.js',
          revision: 'gpdXGJ92-mRJGAf0K5ezk',
        },
        {
          url: '/_next/static/chunks/pages/_error-d8ffda56f6a89f4b.js',
          revision: 'gpdXGJ92-mRJGAf0K5ezk',
        },
        {
          url: '/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js',
          revision: '79330112775102f91e1010318bae2bd3',
        },
        {
          url: '/_next/static/chunks/webpack-6e7e8d847905ac5e.js',
          revision: 'gpdXGJ92-mRJGAf0K5ezk',
        },
        {
          url: '/_next/static/css/2f71e0d51b6954c9.css',
          revision: '2f71e0d51b6954c9',
        },
        {
          url: '/_next/static/css/8f0dfaa86d94aa40.css',
          revision: '8f0dfaa86d94aa40',
        },
        {
          url: '/_next/static/gpdXGJ92-mRJGAf0K5ezk/_buildManifest.js',
          revision: 'f97b2def7f98ec227a1c507e0a83564d',
        },
        {
          url: '/_next/static/gpdXGJ92-mRJGAf0K5ezk/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
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
          url: '/_next/static/media/ec159349637c90ad-s.woff2',
          revision: '0e89df9522084290e01e4127495fae99',
        },
        {
          url: '/_next/static/media/fd4db3eb5472fc27-s.woff2',
          revision: '71f3fcaf22131c3368d9ec28ef839831',
        },
        {
          url: '/assets/apple-icon-180.png',
          revision: 'f682ea1d5f6aefc400f6d397aa3c24e6',
        },
        {
          url: '/assets/apple-splash-1125-2436.jpg',
          revision: '6066f8479b6861f659086d0940c2cff2',
        },
        {
          url: '/assets/apple-splash-1136-640.jpg',
          revision: '95a3ded0022112fe768e0134d09827d5',
        },
        {
          url: '/assets/apple-splash-1170-2532.jpg',
          revision: '9f45e8f644b16738d1ef717545ea09ba',
        },
        {
          url: '/assets/apple-splash-1179-2556.jpg',
          revision: '8899844a302445be11b7d0d2fb9bb11a',
        },
        {
          url: '/assets/apple-splash-1242-2208.jpg',
          revision: 'fd573a362e609b42a959fda37aef355d',
        },
        {
          url: '/assets/apple-splash-1242-2688.jpg',
          revision: '3e66d94a182fd5bb9d7163863d111868',
        },
        {
          url: '/assets/apple-splash-1284-2778.jpg',
          revision: '7a9cfe98343b0347b1e63344984dd2cc',
        },
        {
          url: '/assets/apple-splash-1290-2796.jpg',
          revision: '10b21f9039c9363c0a08ae41ef829bc3',
        },
        {
          url: '/assets/apple-splash-1334-750.jpg',
          revision: 'b8656b892bf08fbe96cc586b50c593b5',
        },
        {
          url: '/assets/apple-splash-1488-2266.jpg',
          revision: '6dddd0ec70b7c3c40ecd167f37472786',
        },
        {
          url: '/assets/apple-splash-1536-2048.jpg',
          revision: 'cbe09ffdd9d2f70d8fc550d08f75790c',
        },
        {
          url: '/assets/apple-splash-1620-2160.jpg',
          revision: 'ba3b27e3e10f6c262ea82c15870705c2',
        },
        {
          url: '/assets/apple-splash-1640-2360.jpg',
          revision: '928c02dd5d2aeb115ffb304b9abb1140',
        },
        {
          url: '/assets/apple-splash-1668-2224.jpg',
          revision: '74d4484a5bcd0c5daa7514676a33a5f5',
        },
        {
          url: '/assets/apple-splash-1668-2388.jpg',
          revision: 'fc959350653d480ceac0eb85f657cc58',
        },
        {
          url: '/assets/apple-splash-1792-828.jpg',
          revision: 'd8af054a398ec0554bbc13217f064f6a',
        },
        {
          url: '/assets/apple-splash-2048-1536.jpg',
          revision: 'f68da58a3fedbec1e3628a8e7df0530c',
        },
        {
          url: '/assets/apple-splash-2048-2732.jpg',
          revision: '65a969796da44a211af87c313ea326e6',
        },
        {
          url: '/assets/apple-splash-2160-1620.jpg',
          revision: 'f3b3a27daa420bb77b7c661a6ff20aa7',
        },
        {
          url: '/assets/apple-splash-2208-1242.jpg',
          revision: 'f40cf35cab2aa00f41a6482dac65f8a6',
        },
        {
          url: '/assets/apple-splash-2224-1668.jpg',
          revision: '225b4ed255b5bba7965d0645c6410a0a',
        },
        {
          url: '/assets/apple-splash-2266-1488.jpg',
          revision: 'cb300f742f6552310b0e8653dbb26f1c',
        },
        {
          url: '/assets/apple-splash-2360-1640.jpg',
          revision: 'aee297367509debbac8e933b4d85b16e',
        },
        {
          url: '/assets/apple-splash-2388-1668.jpg',
          revision: 'b9622f8370182d73932afdb5bbac5798',
        },
        {
          url: '/assets/apple-splash-2436-1125.jpg',
          revision: '6be76c4037ee8fec23d4e7780fd8332c',
        },
        {
          url: '/assets/apple-splash-2532-1170.jpg',
          revision: '5a47f946051e25cd962478633fb89324',
        },
        {
          url: '/assets/apple-splash-2556-1179.jpg',
          revision: '402d3b904195169b22af1f783aa0c68f',
        },
        {
          url: '/assets/apple-splash-2688-1242.jpg',
          revision: '258acdf1334c78934e510d8e7aba543b',
        },
        {
          url: '/assets/apple-splash-2732-2048.jpg',
          revision: 'c9320c14754e2a397dbd6357e83b08d7',
        },
        {
          url: '/assets/apple-splash-2778-1284.jpg',
          revision: 'c3b14014022137b14d28fc3b308dc948',
        },
        {
          url: '/assets/apple-splash-2796-1290.jpg',
          revision: '300a8f30fc45053a626db534ff276b78',
        },
        {
          url: '/assets/apple-splash-640-1136.jpg',
          revision: '5554bad0872d5a812f327dbc1657820b',
        },
        {
          url: '/assets/apple-splash-750-1334.jpg',
          revision: '054b933719c9af7c0ba95f3a389763ba',
        },
        {
          url: '/assets/apple-splash-828-1792.jpg',
          revision: 'bb5d4b6336e76d15592c59ee224203ef',
        },
        {
          url: '/assets/favicon.ico',
          revision: '1f8cb5472f11f1fc08fbcf16eccbf623',
        },
        {
          url: '/assets/manifest-icon-192.maskable.png',
          revision: 'de5a31d8d8eb88274af652946869d0be',
        },
        {
          url: '/assets/manifest-icon-512.maskable.png',
          revision: '5e680d10c55e458ebd10420300b1311e',
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
              state: i,
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

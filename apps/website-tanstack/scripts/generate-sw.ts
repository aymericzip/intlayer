import path from 'node:path';
import { generateSW } from 'workbox-build';

async function buildSW() {
  console.log('🏗️  Generating Service Worker...');

  const { count, size } = await generateSW({
    // Output to the TanStack Start / Nitro public output directory
    swDest: path.join(process.cwd(), '.output/public/sw.js'),

    // Target the TanStack Start / Nitro client build output
    globDirectory: '.output/public',

    // Precache critical application shell assets
    globPatterns: [
      'manifest.json',
      'favicon.ico',
      'logo.svg',
      'android-chrome-192x192.png',
      'android-chrome-512x512.png',
      'assets/*.css',
      'assets/__root-*.js',
      'assets/entry-*.js',
      'assets/index-*.js',
    ],
    globIgnores: ['**/node_modules/**/*', '**/*.map'],

    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'google-fonts',
          expiration: { maxEntries: 4, maxAgeSeconds: 365 * 24 * 60 * 60 },
        },
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: { maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 },
        },
      },
      {
        urlPattern: /\.(?:js|css)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-resources',
          expiration: { maxEntries: 32, maxAgeSeconds: 24 * 60 * 60 },
        },
      },
      {
        urlPattern: ({ request }) => request.mode === 'navigate',
        handler: 'NetworkFirst',
        options: {
          cacheName: 'pages',
          networkTimeoutSeconds: 3,
          expiration: { maxEntries: 20 },
        },
      },
    ],

    skipWaiting: true,
    clientsClaim: true,
    cleanupOutdatedCaches: true,
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
  });

  console.log(
    `✅ Service Worker generated! Precaching ${count} files (${size} bytes)`
  );
}

buildSW();

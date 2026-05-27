import path from 'node:path';
import { generateSW } from 'workbox-build';

async function buildSW() {
  console.log('🏗️  Generating Service Worker...');

  const { count, size } = await generateSW({
    // Output
    swDest: path.join(process.cwd(), 'public/sw.js'),

    // Precache (Static Assets)
    globDirectory: '.next',
    // Precache CSS, JS, and Workers.
    // We do NOT precache HTML here as Next.js pages are dynamic or ISR.
    globPatterns: [
      'static/chunks/**/*.js',
      'static/css/**/*.css',
      'static/media/**/*.*',
      'server/pages/manifest.json',
    ],
    globIgnores: [
      '**/node_modules/**/*',
      '**/*.map',
      'server/middleware*',
      'server/pages/api/**/*', // Never cache API routes
    ],

    // Normalize Next.js paths
    modifyURLPrefix: {
      'static/': '/_next/static/',
    },

    // Runtime Caching (The Fix)
    runtimeCaching: [
      // Cache Google Fonts & External Fonts (StaleWhileRevalidate)
      {
        urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'google-fonts',
          expiration: { maxEntries: 4, maxAgeSeconds: 365 * 24 * 60 * 60 },
        },
      },
      // Cache Images (CacheFirst)
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: { maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 },
        },
      },
      // Cache JS/CSS not in precache (StaleWhileRevalidate)
      {
        urlPattern: /\.(?:js|css)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-resources',
          expiration: { maxEntries: 32, maxAgeSeconds: 24 * 60 * 60 },
        },
      },
      // OPTIONAL: Cache Navigation (HTML)
      // Only enable this if you really need offline navigation.
      // It is often the cause of "stale" updates.
      // If used, use NetworkFirst with a short timeout.
      {
        urlPattern: ({ request }) => request.mode === 'navigate',
        handler: 'NetworkFirst',
        options: {
          cacheName: 'pages',
          networkTimeoutSeconds: 3, // Fallback to cache quickly if offline
          expiration: { maxEntries: 20 },
        },
      },
    ],

    // Cleanup
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

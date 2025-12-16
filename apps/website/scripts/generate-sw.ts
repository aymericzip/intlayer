import path from 'node:path';
import { generateSW } from 'workbox-build';

async function buildSW() {
  console.log('🏗️  Generating Service Worker...');

  const { count, size } = await generateSW({
    // 1. Where to output the file
    swDest: path.join(process.cwd(), 'public/sw.js'),

    // 2. Where to look for files to cache
    globDirectory: '.next',
    globPatterns: ['static/**/*.*', 'server/pages/manifest.json'],
    globIgnores: ['**/node_modules/**/*', '**/*.map', 'server/middleware*'],

    // 3. Modifying URLS to match Next.js structure
    modifyURLPrefix: {
      'static/': '/_next/static/',
    },

    // 4. Cache Config (The important part!)
    // This tells Workbox to cache the Google Fonts, Images, etc.
    // automatically without you writing a template.
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          expiration: {
            maxEntries: 200,
          },
        },
      },
    ],

    // 5. PWA Essentials
    skipWaiting: true, // Update SW immediately
    clientsClaim: true, // Take control immediately
    cleanupOutdatedCaches: true,
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB limit per file
  });

  console.log(
    `✅ Service Worker generated! Precaching ${count} files (${size} bytes)`
  );
}

buildSW();

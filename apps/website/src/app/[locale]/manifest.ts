import type { MetadataRoute } from 'next';

const manifest = (): MetadataRoute.Manifest => ({
  short_name: 'Intlayer',
  name: 'Intlayer',
  scope: '/',
  start_url: '/',
  description:
    'Intlayer offers a more flexible and modern approach to internationalization. Its seamless integration with Next.js and React, customizable configuration, and support for various content declaration formats make it a powerful choice for internationalization.',
  icons: [
    {
      src: 'assets/pwa-64x64.png',
      sizes: '64x64',
      type: 'image/png',
    },
    {
      src: 'assets/pwa-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: 'assets/pwa-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: 'assets/maskable-icon-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    },
  ],
  display: 'fullscreen',
  orientation: 'portrait-primary',
  theme_color: '#FFFFFF',
  background_color: '#000000',
});

export default manifest;

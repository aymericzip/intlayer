/**
 * Frontend packages whose apps are served over URLs, so a locale routing
 * strategy (`routing.mode`, the locale proxy) applies to them.
 */
const URL_ROUTING_FRAMEWORK_PACKAGES = [
  'next',
  'react',
  'react-dom',
  'react-router',
  'react-router-dom',
  '@tanstack/react-router',
  '@tanstack/react-start',
  '@tanstack/solid-router',
  '@tanstack/solid-start',
  'vue',
  'nuxt',
  'svelte',
  '@sveltejs/kit',
  'solid-js',
  'preact',
  '@angular/core',
  'astro',
  'lit',
  '@remix-run/react',
  'vite',
] as const;

/**
 * Returns true when the project is a web frontend for which locale routing is
 * meaningful. React Native / Expo apps are excluded (no URL routing), as are
 * backend-only and plain Node projects.
 */
export const hasUrlRoutingFramework = (
  dependencies: Record<string, string>
): boolean => {
  if (dependencies['react-native'] || dependencies.expo) return false;

  return URL_ROUTING_FRAMEWORK_PACKAGES.some(
    (packageName) => packageName in dependencies
  );
};

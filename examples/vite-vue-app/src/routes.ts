import {
  configuration,
  getCanonicalPath,
  getLocalizedUrl,
  type Locale,
  localeFlatMap,
} from 'intlayer';
import { createIntlayerClient } from 'vue-intlayer';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/home/HomeView.vue';
import RootView from './views/root/Root.vue';
import TestView from './views/test/TestView.vue';

// Get internationalization configuration
const { internationalization } = configuration;
const { defaultLocale } = internationalization;

const routes = localeFlatMap((localizedData) => [
  {
    path: getLocalizedUrl('/', localizedData.locale),
    name: `Root-${localizedData.locale}`,
    component: RootView,
    meta: {
      locale: localizedData.locale,
    },
  },
  {
    path: getLocalizedUrl('/home', localizedData.locale),
    name: `Home-${localizedData.locale}`,
    component: HomeView,
    meta: {
      locale: localizedData.locale,
    },
  },
  {
    path: getLocalizedUrl('/tests', localizedData.locale),
    name: `Test-${localizedData.locale}`,
    component: TestView,
    meta: {
      locale: localizedData.locale,
    },
  },
]);

// Create the router instance
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add navigation guard for locale handling
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  // 1. Identify the current locale based on the route or client state
  const currentLocale = client.locale.value;

  // 2. Resolve the canonical path (internal application path)
  // This handles custom rewrites (e.g., /accueil -> /home)
  const canonicalPath = getCanonicalPath(to.path, currentLocale);

  const metaLocale = to.meta.locale as Locale | undefined;

  if (metaLocale) {
    // Reuse the locale defined in the route meta
    client.setLocale(metaLocale);
    next();
  } else {
    // Fallback: no locale in meta, possibly unmatched route or custom path
    client.setLocale(currentLocale);

    // Construct the target localized path
    const localizedPath = getLocalizedUrl(canonicalPath, currentLocale);

    if (localizedPath !== to.path) {
      // Check if the localized path exists in routes
      const matched = router.resolve(localizedPath);
      if (matched.matched.length > 0) {
        return next(localizedPath);
      }
    }
    next();
  }
});

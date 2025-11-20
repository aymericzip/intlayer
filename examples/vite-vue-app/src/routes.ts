import {
  configuration,
  getPathWithoutLocale,
  getPrefix,
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
    path: `${localizedData.urlPrefix}/`,
    name: `Root-${localizedData.locale}`,
    component: RootView,
    meta: {
      locale: localizedData.locale,
    },
  },
  {
    path: `${localizedData.urlPrefix}/home`,
    name: `Home-${localizedData.locale}`,
    component: HomeView,
    meta: {
      locale: localizedData.locale,
    },
  },
  {
    path: `${localizedData.urlPrefix}/test`,
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

  const metaLocale = to.meta.locale as Locale | undefined;

  if (metaLocale) {
    // Reuse the locale defined in the route meta
    client.setLocale(metaLocale);
    next();
  } else {
    // Fallback: no locale in meta, possibly unmatched route
    // Optional: handle 404 or redirect to default locale
    client.setLocale(defaultLocale);

    next(`${getPrefix(defaultLocale).prefix}${getPathWithoutLocale(to.path)}`);
  }
});

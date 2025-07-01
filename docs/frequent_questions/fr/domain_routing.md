---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Comment configurer le routage basé sur le domaine ?
description: Apprenez à configurer le routage basé sur le domaine.
keywords:
  - domaine
  - routage
  - intlayer
  - configuration
  - middleware
  - react-router
  - vue-router
  - next.js
  - vite
  - framework
slugs:
  - doc
  - faq
  - routage-domaine
---

# Comment configurer le **routage basé sur le domaine** avec Intlayer au lieu des chemins `/[locale]/` ?

## Réponse courte

Le routage basé sur le domaine est plus simple que le routage basé sur le chemin (`example.com/[locale]/`) car vous pouvez éviter toute la configuration du middleware et du routage. Il suffit de déployer votre application sur chaque domaine de langue et de définir une variable d’environnement par domaine.

## Étape par étape

1. **Déployez une fois par domaine** (`example.com`, `exemple.fr`, `ejemplo.es`, …).
2. Pour chaque déploiement, définissez `LOCALE` (et les variables d’environnement Intlayer habituelles) sur la locale que ce domaine doit servir.
3. Référencez cette variable comme `defaultLocale` dans votre fichier `intlayer.config.[ts|js]`.

```ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: process.env.LOCALE, // 👈 le domaine décide de la locale
  },
  // ... reste de votre configuration
};

export default config;
```

C’est tout — cela fonctionne de la même manière pour **Next.js**, **Vite + React**, **Vite + Vue**, etc.

## Que faire si tous les domaines pointent vers le **même** déploiement ?

Si tous les domaines pointent vers le même bundle d’application, vous devrez détecter l’hôte à l’exécution et passer la locale manuellement via le provider.

### Pour Next.js

```tsx
// src/IntlayerProvider.tsx
import {
  IntlayerClientProvider,
  type IntlayerClientProviderProps,
} from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import type { FC } from "react";

export const IntlayerProvider: FC<IntlayerClientProviderProps> = ({
  children,
  locale,
}) => {
  const resolvedLocale = locale ?? getLocaleFromHostname(); // 👈 détecte la locale depuis le nom d’hôte si non fournie
  return (
    <IntlayerServerProvider locale={resolvedLocale}>
      <IntlayerClientProvider locale={resolvedLocale}>
        {children}
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

### Pour Vue

```ts
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import { router } from "./routes";

const app = createApp(App);
app.use(router);
installIntlayer(app, getLocaleFromHostname());
app.mount("#app");
```

Remplacez `getLocaleFromHostname()` par votre propre logique de recherche.

## Mettez à jour votre sélecteur de langue

Lors de l’utilisation du routage basé sur les domaines, changer de langue signifie naviguer vers un autre domaine :

```ts
const { locale } = useLocale();

function changeLanguage(target: Locale) {
  window.location.href = domainForLocale[target];
}
```

## Avantages du routage basé sur les domaines

1. **Configuration plus simple** : Pas besoin de configurer `intlayerMiddleware`, `generateStaticParams`, `react-router` ou `vue-router`
2. **Meilleur SEO** : Chaque langue dispose de son propre domaine
3. **URLs plus propres** : Pas de préfixe de langue dans le chemin
4. **Maintenance facilitée** : Chaque déploiement de langue est indépendant

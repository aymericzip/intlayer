---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Comment récupérer la locale depuis les cookies / headers ?
description: Apprenez comment récupérer la locale depuis les cookies / headers.
keywords:
  - cookie
  - headers
  - intlayer
  - locale
  - hook
  - useLocale
  - useLocaleCookie
  - next.js
  - react-intlayer
  - vue-intlayer
slugs:
  - frequent-questions
  - get-locale-cookie
---

# Comment récupérer la locale depuis les cookies / headers

## Utilisation des Hooks (Recommandé)

Pour la plupart des cas d'utilisation, il est recommandé de récupérer la locale actuelle en utilisant le hook `useLocale` car il est résolu automatiquement. Cela fonctionne de manière similaire au composable `useLocale` dans Vue.js.

```ts
import { useLocale } from "next-intlayer";
// or import { useLocale } from "react-intlayer";
// or import { useLocale } from "vue-intlayer";

// Utilisation côté client
const { locale } = useLocale();
```

Pour les composants serveur, vous pouvez l'importer depuis :

```tsx
import { useLocale } from "next-intlayer/server";

const Test = () => {
  const { locale } = useLocale();
  return <>{locale}</>;
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <Test />
    </IntlayerServerProvider>
  );
};
```

Il existe également un hook `useLocaleCookie` qui ne résout que la valeur du cookie.

## Configuration manuelle du cookie

Vous pouvez déclarer un nom de cookie personnalisé comme suit

```ts
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  middleware: {
    cookieName: "myCustomLocaleCookie", // par défaut c'est 'intlayer-locale'
  },
};

export default config;
```

le récupérer comme

### Côté client

```ts
// Utilisation du nom de cookie par défaut
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("intlayer-locale="))
  ?.split("=")[1];

// Utilisation d'un nom de cookie personnalisé
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("myCustomLocaleCookie="))
  ?.split("=")[1];
```

### Côté serveur (Next.js)

```ts
import { cookies } from "next/headers";

// Utilisation du nom de cookie par défaut
const locale = cookies().get("intlayer-locale")?.value;

// Utilisation d'un nom de cookie personnalisé
const locale = cookies().get("myCustomLocaleCookie")?.value;
```

### Si la locale n'est pas encore définie

La locale est définie en tant que cookie uniquement une fois que l'utilisateur sélectionne explicitement la locale. Par défaut, pour les nouveaux visiteurs, la locale est interprétée à partir des champs d'en-tête.

Vous pouvez détecter la locale préférée de l'utilisateur à partir des en-têtes de la requête. Voici un exemple de gestion :

```ts
/**
 * Détecte la locale à partir des en-têtes de la requête
 *
 * L'en-tête accept-language est le plus important pour la détection de la locale.
 * Il contient une liste de codes de langue avec des valeurs de qualité (q-values) qui indiquent
 * les langues préférées de l'utilisateur par ordre de préférence.
 *
 * Exemple : "en-US,en;q=0.9,fr;q=0.8,es;q=0.7"
 * - en-US est la langue principale (q=1.0 est implicite)
 * - en est le deuxième choix (q=0.9)
 * - fr est le troisième choix (q=0.8)
 * - es est le quatrième choix (q=0.7)
 */
import { localeDetector } from "@intlayer/core";

/**
 * Exemple d'en-têtes de négociation que les navigateurs envoient typiquement
 * Ces en-têtes aident à déterminer la langue préférée de l'utilisateur
 */
const exampleNegotiatorHeaders: Record<string, string> = {
  "accept-language": "en-US,en;q=0.9,fr;q=0.8,es;q=0.7",
  "accept":
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
};

// Exemple d'utilisation :
const detectedLocale = localeDetector(exampleNegotiatorHeaders);
```

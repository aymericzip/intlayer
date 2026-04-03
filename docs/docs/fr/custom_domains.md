---
createdAt: 2026-04-02
updatedAt: 2026-04-02
title: Domaines personnalisés
description: Apprenez à configurer le routage par domaine dans Intlayer pour servir différentes locales à partir de noms d'hôte dédiés.
keywords:
  - Domaines personnalisés
  - Routage par domaine
  - Routage
  - Internationalisation
  - i18n
slugs:
  - doc
  - concept
  - custom_domains
history:
  - version: 8.5.0
    date: 2026-04-02
    changes: "Ajout du routage par domaine via la configuration routing.domains."
---

# Domaines personnalisés

Intlayer prend en charge le routage par domaine, vous permettant de servir des locales spécifiques à partir de noms d'hôte dédiés. Par exemple, les visiteurs chinois peuvent être dirigés vers `intlayer.zh` au lieu de `intlayer.org/zh`.

## Fonctionnement

La carte `domains` dans `routing` associe chaque locale à un nom d'hôte. Intlayer utilise cette carte à deux endroits :

1. **Génération d'URL** (`getLocalizedUrl`) : lorsque la locale cible se trouve sur un domaine _différent_ de la page actuelle, une URL absolue est retournée (ex: `https://intlayer.zh/about`). Lorsque les deux domaines correspondent, une URL relative est retournée (ex: `/fr/about`).
2. **Proxy serveur** (Next.js & Vite) : les requêtes entrantes sont redirigées ou réécrites en fonction du domaine sur lequel elles arrivent.

### Domaines exclusifs vs partagés

La distinction clé est l'**exclusivité** :

- **Domaine exclusif** — une seule locale correspond à ce nom d'hôte (ex: `zh → intlayer.zh`). Le domaine lui-même identifie la locale, donc aucun préfixe de locale n'est ajouté au chemin. `https://intlayer.zh/about` sert le contenu chinois.
- **Domaine partagé** — plusieurs locales correspondent au même nom d'hôte (ex: `en` et `fr` correspondent tous deux à `intlayer.org`). Le routage standard basé sur les préfixes s'applique. `intlayer.org/fr/about` sert le contenu français.

## Configuration

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.CHINESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
    domains: {
      // Domaine partagé — en et fr utilisent le routage par préfixe sur intlayer.org
      en: "intlayer.org",
      // Domaine exclusif — zh a son propre nom d'hôte, aucun préfixe /zh/ n'est nécessaire
      zh: "intlayer.zh",
    },
  },
};

export default config;
```

Les locales qui ne sont pas listées dans `domains` continuent d'utiliser le routage par préfixe standard sans aucune substitution de domaine.

## Génération d'URL

`getLocalizedUrl` produit automatiquement le bon type d'URL en fonction du contexte d'appel.

### Locale sur le même domaine (URL relative)

```ts
// Page actuelle : intlayer.org/about
getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.org" });
// → "/fr/about"

getLocalizedUrl("/about", "en", { currentDomain: "intlayer.org" });
// → "/about"  (locale par défaut, pas de préfixe)
```

### Locale sur un domaine différent (URL absolue)

```ts
// Page actuelle : intlayer.org/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.org" });
// → "https://intlayer.zh/about"  (domaine exclusif, pas de préfixe /zh/)
```

### Service depuis le propre domaine de la locale

```ts
// Page actuelle : intlayer.zh/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.zh" });
// → "/about"  (déjà sur le bon domaine — URL relative)

getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.zh" });
// → "https://intlayer.org/fr/about"  (lien inter-domaines vers intlayer.org)
```

### Auto-détection du domaine actuel

`currentDomain` est facultatif. S'il est omis, `getLocalizedUrl` le résout dans cet ordre :

1. Le nom d'hôte d'une URL d'entrée absolue (ex: `https://intlayer.org/about` → `intlayer.org`).
2. `window.location.hostname` dans les environnements de navigation.
3. Si aucun n'est disponible (SSR sans option explicite), une URL relative est retournée pour les locales du même domaine et aucune URL absolue n'est produite — c'est le repli sécurisé.

```ts
// Navigateur — window.location.hostname === 'intlayer.org'
getLocalizedUrl("/about", "zh");
// → "https://intlayer.zh/about"  (détecté automatiquement à partir de window)

// À partir d'une URL absolue — domaine détecté automatiquement
getLocalizedUrl("https://intlayer.org/about", "zh");
// → "https://intlayer.zh/about"
```

### `getMultilingualUrls` avec domaines

`getMultilingualUrls` appelle `getLocalizedUrl` pour chaque locale, il produit donc un mélange d'URLs relatives et absolues selon le domaine de l'appelant :

```ts
// currentDomain: 'intlayer.org'
getMultilingualUrls("/about", { currentDomain: "intlayer.org" });
// {
//   en: "/about",
//   fr: "/fr/about",
//   es: "/es/about",
//   zh: "https://intlayer.zh/about",
// }
```

Ces URLs absolues sont prêtes à être utilisées dans les balises `<link rel="alternate" hreflang="...">` pour le SEO.

## Comportement du Proxy

### Next.js

Le middleware `intlayerProxy` gère automatiquement le routage par domaine. Ajoutez-le à votre `middleware.ts` :

```typescript fileName="middleware.ts"
export { intlayerProxy as default } from "next-intlayer/proxy";

export const config = {
  matcher: "/((?!api|static|assets|robots|sitemap|.*\\..*|_next).*)",
};
```

**Redirection** — la requête arrive sur le mauvais domaine pour un préfixe de locale donné :

```
GET intlayer.org/zh/about
→ 301 https://intlayer.zh/about
```

**Réécriture** — la requête arrive sur le domaine exclusif de la locale sans préfixe :

```
GET intlayer.zh/about
→ réécriture vers /zh/about  (routage interne Next.js uniquement, l'URL reste propre)
```

### Vite

Le plugin Vite `intlayerProxy` applique la même logique pendant le développement :

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

> **Note** : en développement local, vous êtes généralement sur `localhost`, donc les redirections inter-domaines pointeront vers les domaines en direct plutôt que vers un autre port local. Utilisez une substitution dans le fichier hosts (ex: `127.0.0.1 intlayer.zh`) ou un proxy inverse si vous avez besoin de tester le routage multi-domaines localement.

## Sélecteur de locale

Le hook `useLocale` de `next-intlayer` gère automatiquement la navigation tenant compte du domaine. Lorsqu'un utilisateur passe à une locale sur un domaine différent, le hook effectue une navigation de page complète (`window.location.href`) au lieu d'un push du routeur côté client, car le routeur Next.js ne peut pas traverser les origines.

```tsx fileName="components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { availableLocales, locale, setLocale } = useLocale();

  return (
    <ul>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <button
            onClick={() => setLocale(localeEl)}
            aria-current={localeEl === locale ? "true" : undefined}
          >
            {l.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};
```

Aucune configuration supplémentaire n'est requise — `useLocale` détecte `window.location.hostname` en interne et décide entre `router.replace` (même domaine) et `window.location.href` (domaine différent).

## SEO : Liens alternatifs `hreflang`

Le routage par domaine est couramment utilisé avec `hreflang` pour indiquer aux moteurs de recherche quelle URL indexer pour chaque langue. Utilisez `getMultilingualUrls` pour générer l'ensemble complet des URLs alternatives :

```tsx fileName="app/[locale]/layout.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const alternates = getMultilingualUrls("/", {
    currentDomain: process.env.NEXT_PUBLIC_DOMAIN, // ex: "intlayer.org"
  });

  return {
    alternates: {
      languages: alternates,
    },
  };
};
```

Cela produit :

```html
<link rel="alternate" hreflang="en" href="https://intlayer.org/" />
<link rel="alternate" hreflang="fr" href="https://intlayer.org/fr/" />
<link rel="alternate" hreflang="es" href="https://intlayer.org/es/" />
<link rel="alternate" hreflang="zh" href="https://intlayer.zh/" />
```

## Utilitaires de base

| Utilitaire                                        | Description                                                                                            |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `getLocalizedUrl(url, locale, { currentDomain })` | Retourne une URL relative ou absolue selon que la locale cible est sur le domaine actuel ou non.       |
| `getMultilingualUrls(url, { currentDomain })`     | Retourne une carte des URLs localisées par locale, mélangeant relatives et absolues selon les besoins. |
| `getPrefix(locale, { domains })`                  | Retourne un préfixe vide pour les locales à domaine exclusif, sinon le préfixe normal.                 |

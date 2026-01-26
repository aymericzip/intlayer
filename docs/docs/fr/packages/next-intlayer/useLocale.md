---
keywords:
  - useLocale
  - dictionary
  - key
  - Intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useLocale
description: Documentation for the useLocale hook in the next-intlayer package
createdAt: 2024-08-11
updatedAt: 2026-01-26
title: Documentation du Hook useLocale | next-intlayer
history:
  - version: 8.0.0
    date: 2026-01-26
    changes: Valeur par défaut de `onLocaleChange` définie sur `replace`
  - version: 5.5.10
    date: 2025-06-29
    changes: Historique initial
---

# Intégration Next.js : Documentation du Hook `useLocale` pour `next-intlayer`

Cette section offre une documentation détaillée sur le hook `useLocale` conçu pour les applications Next.js au sein de la bibliothèque `next-intlayer`. Il est conçu pour gérer efficacement les changements de langue et le routage.

## Importer `useLocale` dans Next.js

Pour utiliser le hook `useLocale` dans votre application Next.js, importez-le comme indiqué ci-dessous :

```javascript
import { useLocale } from "next-intlayer"; // Utilisé pour gérer les langues et le routage dans Next.js
```

## Utilisation

Voici comment implémenter le hook `useLocale` dans un composant Next.js :

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Langue actuelle : {locale}</h1>
      <p>Langue par défaut : {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Langue actuelle : {locale}</h1>
      <p>Langue par défaut : {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales } = require("intlayer");
const { useLocale } = require("next-intlayer");

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Langue actuelle : {locale}</h1>
      <p>Langue par défaut : {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

## Paramètres

Le hook `useLocale` accepte les paramètres suivants :

- **`onLocaleChange`** : Une chaîne de caractères qui détermine comment l'URL doit être mise à jour lorsque la langue change. Elle peut être `"replace"`, `"push"` ou `"none"`.

  > Prenons un exemple :
  >
  > 1. Vous êtes sur `/fr/home`
  > 2. Vous naviguez vers `/fr/about`
  > 3. Vous changez la langue pour `/es/about`
  > 4. Vous cliquez sur le bouton "retour" du navigateur
  >
  > Le comportement différera selon la valeur de `onLocaleChange` :
  >
  > - `"replace"` (par défaut) : Remplace l'URL actuelle par la nouvelle URL localisée, et définit le cookie.
  >   -> Le bouton "retour" ira vers `/es/home`
  > - `"push"` : Ajoute la nouvelle URL localisée à l'historique du navigateur, et définit le cookie.
  >   -> Le bouton "retour" ira vers `/fr/about`
  > - `"none"` : Met uniquement à jour la langue dans le contexte client, et définit le cookie, sans changer l'URL.
  >   -> Le bouton "retour" ira vers `/fr/home`
  > - `(locale) => void` : Définit le cookie et déclenche une fonction personnalisée qui sera appelée lorsque la langue change.
  >
  >   L'option `undefined` est le comportement par défaut car nous recommandons d'utiliser le composant `Link` pour naviguer vers la nouvelle langue.
  >   Exemple :
  >
  >   ```tsx
  >   <Link href="/es/about" replace>
  >     À propos
  >   </Link>
  >   ```

## Valeurs de retour

- **`locale`** : La langue actuelle telle que définie dans le contexte React.
- **`defaultLocale`** : La langue principale définie dans la configuration.
- **`availableLocales`** : Une liste de toutes les langues disponibles telles que définies dans la configuration.
- **`setLocale`** : Une fonction pour changer la langue de l'application et mettre à jour l'URL en conséquence. Elle gère les règles de préfixe, que ce soit pour ajouter ou non la langue au chemin en fonction de la configuration. Utilise `useRouter` de `next/navigation` pour les fonctions de navigation comme `push` et `refresh`.
- **`pathWithoutLocale`** : Une propriété calculée qui retourne le chemin sans la langue. Elle est utile pour comparer les URLs. Par exemple, si la langue actuelle est `fr`, et l'URL est `fr/my_path`, le chemin sans langue est `/my_path`. Utilise `usePathname` de `next/navigation` pour obtenir le chemin actuel.

## Conclusion

Le hook `useLocale` de `next-intlayer` est un outil essentiel pour gérer les langues dans les applications Next.js. Il offre une approche intégrée pour adapter votre application à plusieurs langues en gérant de manière transparente le stockage de la langue, la gestion de l'état et les modifications d'URL.

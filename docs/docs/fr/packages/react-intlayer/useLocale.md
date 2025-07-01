---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentation du Hook useLocale | react-intlayer
description: Découvrez comment utiliser le hook useLocale pour le package react-intlayer
keywords:
  - useLocale
  - dictionnaire
  - clé
  - Intlayer
  - Internationalisation
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useLocale
---

# Intégration React : Documentation du Hook `useLocale`

Cette section fournit des détails complets sur le hook `useLocale` de la bibliothèque `react-intlayer`, conçu pour gérer la gestion des locales dans les applications React.

## Importer `useLocale` dans React

Pour intégrer le hook `useLocale` dans votre application React, importez-le depuis son package respectif :

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // Utilisé dans les composants React pour la gestion des locales
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // Utilisé dans les composants React pour la gestion des locales
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // Utilisé dans les composants React pour la gestion des locales
```

## Vue d'ensemble

Le hook `useLocale` offre un moyen simple d'accéder et de manipuler les paramètres de locale au sein des composants React. Il permet d'accéder à la locale courante, à la locale par défaut, à toutes les locales disponibles, ainsi qu'aux fonctions pour mettre à jour les paramètres de locale.

## Utilisation

Voici comment vous pouvez utiliser le hook `useLocale` dans un composant React :

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Locale actuelle : {locale}</h1>
      <p>Locale par défaut : {defaultLocale}</p>
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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Locale actuelle : {locale}</h1>
      <p>Locale par défaut : {defaultLocale}</p>
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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Locale actuelle : {locale}</h1>
      <p>Locale par défaut : {defaultLocale}</p>
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

export default LocaleSwitcher;
```

## Paramètres et valeurs de retour

Lorsque vous invoquez le hook `useLocale`, il retourne un objet contenant les propriétés suivantes :

- **`locale`** : La locale actuelle telle que définie dans le contexte React.
- **`defaultLocale`** : La locale principale définie dans la configuration.
- **`availableLocales`** : Une liste de toutes les locales disponibles telles que définies dans la configuration.
- **`setLocale`** : Une fonction pour mettre à jour la locale actuelle dans le contexte de l'application.

## Exemple

Cet exemple montre un composant qui utilise le hook `useLocale` pour afficher un sélecteur de locale, permettant aux utilisateurs de changer dynamiquement la locale de l'application :

```tsx fileName="src/components/LocaleSelector.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSelector: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

## Conclusion

Le hook `useLocale` de `react-intlayer` est un outil essentiel pour gérer les locales dans vos applications React, fournissant la fonctionnalité nécessaire pour adapter efficacement votre application à divers publics internationaux.

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial

---
docName: package__next-intlayer__t
url: https://intlayer.org/doc/packages/next-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/t.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentation de la fonction t | next-intlayer
description: Découvrez comment utiliser la fonction t pour le package next-intlayer
keywords:
  - t
  - traduction
  - Intlayer
  - next-intlayer
  - Internationalisation
  - Documentation
  - Next.js
  - JavaScript
  - React
---

# Documentation: Fonction `t` dans `next-intlayer`

La fonction `t` dans le package `next-intlayer` est un outil fondamental pour l'internationalisation en ligne dans votre application Next.js. Elle vous permet de définir des traductions directement dans vos composants, ce qui simplifie l'affichage de contenu localisé en fonction de la langue actuelle.

---

## Vue d'ensemble

La fonction `t` est utilisée pour fournir des traductions pour différentes langues directement dans vos composants. En passant un objet contenant des traductions pour chaque langue prise en charge, `t` retourne la traduction appropriée en fonction du contexte de langue actuel dans votre application Next.js.

---

## Principales fonctionnalités

- **Traductions en ligne** : Idéal pour des textes rapides en ligne qui ne nécessitent pas de déclaration de contenu séparée.
- **Sélection automatique de la langue** : Retourne automatiquement la traduction correspondant à la langue actuelle.
- **Support de TypeScript** : Offre une sécurité de type et une autocomplétion lorsqu'elle est utilisée avec TypeScript.
- **Intégration facile** : Fonctionne parfaitement dans les composants client et serveur de Next.js.

---

## Signature de la fonction

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Paramètres

- `translations` : Un objet où les clés sont des codes de langue (par exemple, `en`, `fr`, `es`) et les valeurs sont les chaînes traduites correspondantes.

### Retourne

- Une chaîne représentant le contenu traduit pour la langue actuelle.

---

## Exemples d'utilisation

### Utilisation de `t` dans un composant client

Assurez-vous d'inclure la directive `'use client';` en haut de votre fichier de composant lorsque vous utilisez `t` dans un composant côté client.

```tsx codeFormat="typescript"
"use client";

import type { FC } from "react";
import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un exemple de composant client",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer";

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un exemple de composant client",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es le contenido d un exemple de composant client",
    })}
  </p>
);
```

### Utilisation de `t` dans un composant serveur

```tsx codeFormat="typescript"
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenu de un exemple de composant serveur",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer/server";

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es le contenu de un exemple de composant serveur",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer/server");

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es le contenu de un exemple de composant serveur",
    })}
  </p>
);
```

### Traductions en ligne dans les attributs

La fonction `t` est particulièrement utile pour les traductions en ligne dans les attributs JSX. Lors de la localisation d'attributs comme `alt`, `title`, `href` ou `aria-label`, vous pouvez utiliser `t` directement dans l'attribut.

```jsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Sujets avancés

### Intégration avec TypeScript

La fonction `t` est sûre en termes de types lorsqu'elle est utilisée avec TypeScript, garantissant que toutes les langues requises sont fournies.

```typescript codeFormat="typescript"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Détection de la langue et contexte

Dans `next-intlayer`, la langue actuelle est gérée via des fournisseurs de contexte : `IntlayerClientProvider` et `IntlayerServerProvider`. Assurez-vous que ces fournisseurs enveloppent vos composants et que la propriété `locale` est correctement passée.

#### Exemple :

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Vos composants ici */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Vos composants ici */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider } = require("next-intlayer/server");

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Vos composants ici */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## Erreurs courantes et dépannage

### `t` retourne une valeur indéfinie ou une traduction incorrecte

- **Cause** : La langue actuelle n'est pas correctement définie, ou la traduction pour la langue actuelle est manquante.
- **Solution** :
  - Vérifiez que le `IntlayerClientProvider` ou le `IntlayerServerProvider` est correctement configuré avec la langue appropriée.
  - Assurez-vous que votre objet de traductions inclut toutes les langues nécessaires.

### Traductions manquantes dans TypeScript

- **Cause** : L'objet de traductions ne satisfait pas les langues requises, ce qui entraîne des erreurs TypeScript.
- **Solution** : Utilisez le type `IConfigLocales` pour garantir l'exhaustivité de vos traductions.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // L'absence de 'es' entraînera une erreur TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // L'absence de 'es' entraînera une erreur TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // L'absence de 'es' entraînera une erreur TypeScript [!code error]
};

const text = t(translations);
```

---

## Conseils pour une utilisation efficace

1. **Utilisez `t` pour des traductions simples en ligne** : Idéal pour traduire de petits morceaux de texte directement dans vos composants.
2. **Préférez `useIntlayer` pour un contenu structuré** : Pour des traductions plus complexes et une réutilisation du contenu, définissez le contenu dans des fichiers de déclaration et utilisez `useIntlayer`.
3. **Fourniture cohérente de la langue** : Assurez-vous que votre langue est fournie de manière cohérente dans votre application via les fournisseurs appropriés.
4. **Exploitez TypeScript** : Utilisez les types TypeScript pour détecter les traductions manquantes et garantir la sécurité des types.

---

## Conclusion

La fonction `t` dans `next-intlayer` est un outil puissant et pratique pour gérer les traductions en ligne dans vos applications Next.js. En l'intégrant efficacement, vous améliorez les capacités d'internationalisation de votre application, offrant une meilleure expérience aux utilisateurs du monde entier.

Pour une utilisation plus détaillée et des fonctionnalités avancées, consultez la [documentation next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md).

---

**Remarque** : N'oubliez pas de configurer correctement vos `IntlayerClientProvider` et `IntlayerServerProvider` pour garantir que la langue actuelle est correctement transmise à vos composants. Cela est crucial pour que la fonction `t` retourne les bonnes traductions.

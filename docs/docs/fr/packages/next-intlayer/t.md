---
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
slugs:
  - doc
  - packages
  - next-intlayer
  - t
---

# Documentation : Fonction `t` dans `next-intlayer`

La fonction `t` dans le package `next-intlayer` est un outil fondamental pour l'internationalisation en ligne dans votre application Next.js. Elle vous permet de définir des traductions directement dans vos composants, facilitant ainsi l'affichage de contenu localisé en fonction de la locale courante.

---

## Vue d'ensemble

La fonction `t` est utilisée pour fournir des traductions pour différentes locales directement dans vos composants. En passant un objet contenant les traductions pour chaque locale prise en charge, `t` renvoie la traduction appropriée en fonction du contexte de la locale courante dans votre application Next.js.

---

## Fonctionnalités clés

- **Traductions en ligne** : Idéal pour du texte rapide et en ligne qui ne nécessite pas une déclaration de contenu séparée.
- **Sélection automatique de la locale** : Renvoie automatiquement la traduction correspondant à la locale courante.
- **Support TypeScript** : Offre une sécurité de type et l'autocomplétion lorsqu'il est utilisé avec TypeScript.
- **Intégration facile** : Fonctionne parfaitement dans les composants clients et serveurs de Next.js.

---

## Signature de la fonction

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Paramètres

- `translations` : Un objet dont les clés sont les codes de locale (par exemple, `en`, `fr`, `es`) et les valeurs sont les chaînes traduites correspondantes.

### Retour

- Une chaîne représentant le contenu traduit pour la locale courante.

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
      es: "Este es el contenido d un ejemplo de componente cliente",
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
      es: "Este es le contenido d un ejemplo de componente cliente",
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
      es: "Este es le contenido d un ejemplo de componente cliente",
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
      es: "Este es el contenido de un ejemplo de componente servidor",
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
      es: "Este es el contenido de un ejemplo de componente servidor",
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
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

###Traductions en ligne dans les attributs

La fonction `t` est particulièrement utile pour les traductions en ligne dans les attributs JSX.
Lors de la localisation d'attributs tels que `alt`, `title`, `href` ou `aria-label`, vous pouvez utiliser `t` directement dans l'attribut.

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

## Sujets Avancés

### Intégration TypeScript

La fonction `t` est typée de manière sécurisée lorsqu'elle est utilisée avec TypeScript, garantissant que toutes les locales requises sont fournies.

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

Dans `next-intlayer`, la langue courante est gérée via des fournisseurs de contexte : `IntlayerClientProvider` et `IntlayerServerProvider`. Assurez-vous que ces fournisseurs englobent vos composants et que la propriété `locale` est correctement transmise.

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

### `t` Renvoie Indéfini ou une Traduction Incorrecte

- **Cause** : La locale actuelle n'est pas correctement définie, ou la traduction pour la locale actuelle est manquante.
- **Solution** :
  - Vérifiez que `IntlayerClientProvider` ou `IntlayerServerProvider` est correctement configuré avec la `locale` appropriée.
  - Assurez-vous que votre objet de traductions inclut toutes les locales nécessaires.

### Traductions Manquantes en TypeScript

- **Cause** : L'objet de traductions ne satisfait pas les locales requises, ce qui entraîne des erreurs TypeScript.
- **Solution** : Utilisez le type `IConfigLocales` pour garantir l'exhaustivité de vos traductions.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // L'absence de 'es' provoquera une erreur TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // L'absence de 'es' provoquera une erreur TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // L'absence de 'es' provoquera une erreur TypeScript [!code error]
};

const text = t(translations);
```

---

## Conseils pour une Utilisation Efficace

1. **Utilisez `t` pour des Traductions Simples en Ligne** : Idéal pour traduire de petits morceaux de texte directement dans vos composants.
2. **Privilégiez `useIntlayer` pour le contenu structuré** : Pour des traductions plus complexes et la réutilisation de contenu, définissez le contenu dans des fichiers de déclaration et utilisez `useIntlayer`.
3. **Fourniture cohérente de la locale** : Assurez-vous que votre locale est fournie de manière cohérente dans toute votre application via les fournisseurs appropriés.
4. **Exploitez TypeScript** : Utilisez les types TypeScript pour détecter les traductions manquantes et garantir la sécurité des types.

---

## Conclusion

La fonction `t` dans `next-intlayer` est un outil puissant et pratique pour gérer les traductions en ligne dans vos applications Next.js. En l'intégrant efficacement, vous améliorez les capacités d'internationalisation de votre application, offrant une meilleure expérience aux utilisateurs du monde entier.

Pour une utilisation plus détaillée et des fonctionnalités avancées, consultez la [documentation next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md).

---

**Note** : N'oubliez pas de configurer correctement vos `IntlayerClientProvider` et `IntlayerServerProvider` afin de garantir que la locale courante soit bien transmise à vos composants. Ceci est crucial pour que la fonction `t` retourne les bonnes traductions.

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial

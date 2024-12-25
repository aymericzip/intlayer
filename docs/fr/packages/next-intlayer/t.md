# Documentation: `t` Fonction dans `next-intlayer`

La fonction `t` dans le paquet `next-intlayer` est un outil fondamental pour l'internationalisation en ligne dans votre application Next.js. Elle vous permet de définir des traductions directement dans vos composants, facilitant l'affichage de contenu localisé en fonction de la locale actuelle.

---

## Vue d'ensemble

La fonction `t` est utilisée pour fournir des traductions pour différentes locales directement dans vos composants. En passant un objet contenant des traductions pour chaque locale supportée, `t` renvoie la traduction appropriée en fonction du contexte de la locale actuelle dans votre application Next.js.

---

## Fonctionnalités clés

- **Traductions en ligne** : Idéal pour un texte en ligne rapide qui ne nécessite pas de déclaration de contenu séparée.
- **Sélection automatique de la locale** : Renvoie automatiquement la traduction correspondant à la locale actuelle.
- **Support TypeScript** : Fournit une sécurité de type et une autocomplétion lorsqu'il est utilisé avec TypeScript.
- **Intégration facile** : Fonctionne sans problème à la fois dans les composants client et serveur dans Next.js.

---

## Signature de la fonction

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Paramètres

- `translations` : Un objet où les clés sont des codes de locale (par exemple, `en`, `fr`, `es`) et les valeurs sont les chaînes traduites correspondantes.

### Retourne

- Une chaîne représentant le contenu traduit pour la locale actuelle.

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
      es: "Este es el contenido d un ejemplo de componente cliente",
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
      es: "Este es el contenido d un ejemplo de componente cliente",
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

### Traductions en ligne dans les attributs

La fonction `t` est particulièrement utile pour les traductions en ligne dans les attributs JSX. Lorsque vous localisez des attributs comme `alt`, `title`, `href`, ou `aria-label`, vous pouvez utiliser `t` directement dans l'attribut.

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

### Intégration TypeScript

La fonction `t` est sûre lorsque elle est utilisée avec TypeScript, garantissant que toutes les locales requises sont fournies.

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Détection de la locale et contexte

Dans `next-intlayer`, la locale actuelle est gérée par des fournisseurs de contexte : `IntlayerClientProvider` et `IntlayerServerProvider`. Assurez-vous que ces fournisseurs enveloppent vos composants et que la prop `locale` est correctement passée.

#### Exemple :

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";

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

### `t` Renvoie indéfini ou traduction incorrecte

- **Cause** : La locale actuelle n'est pas correctement définie, ou la traduction pour la locale actuelle est manquante.
- **Solution** :
  - Vérifiez que le `IntlayerClientProvider` ou `IntlayerServerProvider` est correctement configuré avec la `locale` appropriée.
  - Assurez-vous que votre objet de traductions inclut toutes les locales nécessaires.

### Traductions manquantes en TypeScript

- **Cause** : L'objet de traductions ne satisfait pas les locales requises, entraînant des erreurs TypeScript.
- **Solution** : Utilisez le type `IConfigLocales` pour garantir la complétude de vos traductions.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Manque 'es' entraînera une erreur TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Manque 'es' entraînera une erreur TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Manque 'es' entraînera une erreur TypeScript [!code error]
};

const text = t(translations);
```

---

## Conseils pour une utilisation efficace

1. **Utilisez `t` pour des traductions en ligne simples** : Idéal pour traduire de petits morceaux de texte directement dans vos composants.
2. **Préférez `useIntlayer` pour du contenu structuré** : Pour des traductions et réutilisations de contenu plus complexes, définissez du contenu dans des fichiers de déclaration et utilisez `useIntlayer`.
3. **Provision locale cohérente** : Assurez-vous que votre locale est fournie de manière cohérente dans votre application à travers les fournisseurs appropriés.
4. **Exploitez TypeScript** : Utilisez les types TypeScript pour attraper les traductions manquantes et garantir la sécurité des types.

---

## Conclusion

La fonction `t` dans `next-intlayer` est un outil puissant et pratique pour gérer les traductions en ligne dans vos applications Next.js. En l'intégrant efficacement, vous améliorez les capacités d'internationalisation de votre application, offrant une meilleure expérience pour les utilisateurs du monde entier.

Pour des instructions détaillées et des fonctionnalités avancées, référez-vous à la [documentation next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_editor.md).

---

**Note** : N'oubliez pas de configurer correctement votre `IntlayerClientProvider` et `IntlayerServerProvider` pour vous assurer que la locale actuelle est correctement transmise à vos composants. Ceci est crucial pour que la fonction `t` renvoie les traductions correctes.

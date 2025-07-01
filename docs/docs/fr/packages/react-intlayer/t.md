---
docName: package__react-intlayer__t
url: https://intlayer.org/doc/packages/react-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/t.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentation de la fonction t | react-intlayer
description: Découvrez comment utiliser la fonction t pour le package react-intlayer
keywords:
  - t
  - traduction
  - Intlayer
  - Internationalisation
  - Documentation
  - Next.js
  - JavaScript
  - React
---

# Documentation : Fonction `t` dans `react-intlayer`

La fonction `t` dans le package `react-intlayer` est un outil fondamental pour l'internationalisation en ligne dans votre application React. Elle vous permet de définir des traductions directement dans vos composants, facilitant ainsi l'affichage de contenu localisé en fonction de la locale actuelle.

---

## Vue d'ensemble

La fonction `t` est utilisée pour fournir des traductions pour différentes locales directement dans vos composants. En passant un objet contenant les traductions pour chaque locale prise en charge, `t` renvoie la traduction appropriée en fonction du contexte de la locale actuelle dans votre application React.

---

## Fonctionnalités clés

- **Traductions en ligne** : Idéal pour du texte rapide et en ligne qui ne nécessite pas une déclaration de contenu séparée.
- **Sélection automatique de la locale** : Renvoie automatiquement la traduction correspondant à la locale actuelle.
- **Support TypeScript** : Offre une sécurité de type et l'autocomplétion lorsqu'il est utilisé avec TypeScript.
- **Intégration facile** : Fonctionne parfaitement au sein des composants React.

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

### Utilisation basique de `t` dans un composant

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { t } from "react-intlayer";

export const ComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { t } from "react-intlayer";

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { t } = require("react-intlayer");

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
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

## Sujets Avancés

### Intégration TypeScript

La fonction `t` est typée de manière sécurisée lorsqu'elle est utilisée avec TypeScript, garantissant que toutes les locales requises sont fournies.

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "react-intlayer";

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Détection de la locale et contexte

Dans `react-intlayer`, la locale courante est gérée via le `IntlayerProvider`. Assurez-vous que ce provider enveloppe vos composants et que la prop `locale` est correctement passée.

#### Exemple :

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerProvider } from "react-intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Vos composants ici */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Vos composants ici */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Vos composants ici */}
  </IntlayerProvider>
);
```

---

## Erreurs courantes et dépannage

### `t` retourne undefined ou une traduction incorrecte

- **Cause** : La locale actuelle n'est pas correctement définie, ou la traduction pour la locale actuelle est manquante.
- **Solution** :
  - Vérifiez que le `IntlayerProvider` est correctement configuré avec la `locale` appropriée.
  - Assurez-vous que votre objet de traductions inclut toutes les locales nécessaires.

### Traductions manquantes en TypeScript

- **Cause** : L'objet de traductions ne satisfait pas les locales requises, ce qui entraîne des erreurs TypeScript.
- **Solution** : Utilisez le type `IConfigLocales` pour garantir l'exhaustivité de vos traductions.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // L'absence de 'es' provoquera une erreur TypeScript
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // L'absence de 'es' provoquera une erreur TypeScript
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // L'absence de 'es' provoquera une erreur TypeScript
};

const text = t(translations);
```

---

## Conseils pour une utilisation efficace

1. **Utilisez `t` pour des traductions simples en ligne** : Idéal pour traduire de petits morceaux de texte directement dans vos composants.
2. **Privilégiez `useIntlayer` pour un contenu structuré** : Pour des traductions plus complexes et la réutilisation de contenu, définissez le contenu dans des fichiers de déclaration et utilisez `useIntlayer`.
3. **Fourniture cohérente de la locale** : Assurez-vous que votre locale est fournie de manière cohérente dans toute votre application via le `IntlayerProvider`.
4. **Exploitez TypeScript** : Utilisez les types TypeScript pour détecter les traductions manquantes et garantir la sécurité des types.

---

## Conclusion

La fonction `t` dans `react-intlayer` est un outil puissant et pratique pour gérer les traductions en ligne dans vos applications React. En l'intégrant efficacement, vous améliorez les capacités d'internationalisation de votre application, offrant une meilleure expérience aux utilisateurs du monde entier.

Pour une utilisation plus détaillée et des fonctionnalités avancées, référez-vous à la [documentation react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md).

---

**Note** : N'oubliez pas de configurer correctement votre `IntlayerProvider` afin de garantir que la locale actuelle soit bien transmise à vos composants. Cela est crucial pour que la fonction `t` retourne les bonnes traductions.

## Historique du document

- 5.5.10 - 2025-06-29 : Historique initial

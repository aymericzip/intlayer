---
docName: package__react-intlayer__t
url: https://intlayer.org/doc/packages/react-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/t.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
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

# Documentation: Fonction `t` dans `react-intlayer`

La fonction `t` dans le package `react-intlayer` est un outil fondamental pour l'internationalisation en ligne dans votre application React. Elle vous permet de définir des traductions directement dans vos composants, ce qui simplifie l'affichage de contenu localisé en fonction de la langue actuelle.

---

## Vue d'ensemble

La fonction `t` est utilisée pour fournir des traductions pour différentes langues directement dans vos composants. En passant un objet contenant les traductions pour chaque langue prise en charge, `t` retourne la traduction appropriée en fonction du contexte de langue actuel dans votre application React.

---

## Fonctionnalités clés

- **Traductions en ligne** : Idéal pour des textes rapides en ligne qui ne nécessitent pas de déclaration de contenu séparée.
- **Sélection automatique de la langue** : Retourne automatiquement la traduction correspondant à la langue actuelle.
- **Support TypeScript** : Offre une sécurité de type et une autocomplétion lorsqu'il est utilisé avec TypeScript.
- **Intégration facile** : Fonctionne parfaitement dans les composants React.

---

## Signature de la fonction

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Paramètres

- `translations` : Un objet où les clés sont les codes de langue (par exemple, `en`, `fr`, `es`) et les valeurs sont les chaînes traduites correspondantes.

### Retourne

- Une chaîne représentant le contenu traduit pour la langue actuelle.

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
          es: "Este es un exemple de componente",
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

## Sujets avancés

### Intégration TypeScript

La fonction `t` est sécurisée par type lorsqu'elle est utilisée avec TypeScript, garantissant que toutes les langues requises sont fournies.

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

### Détection et contexte de langue

Dans `react-intlayer`, la langue actuelle est gérée via le `IntlayerProvider`. Assurez-vous que ce fournisseur enveloppe vos composants et que la propriété `locale` est correctement passée.

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

### `t` retourne une valeur indéfinie ou une traduction incorrecte

- **Cause** : La langue actuelle n'est pas correctement définie ou la traduction pour la langue actuelle est manquante.
- **Solution** :
  - Vérifiez que le `IntlayerProvider` est correctement configuré avec la langue appropriée.
  - Assurez-vous que votre objet de traductions inclut toutes les langues nécessaires.

### Traductions manquantes dans TypeScript

- **Cause** : L'objet de traductions ne satisfait pas les langues requises, entraînant des erreurs TypeScript.
- **Solution** : Utilisez le type `IConfigLocales` pour garantir l'exhaustivité de vos traductions.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // L'absence de 'es' entraînera une erreur TypeScript
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // L'absence de 'es' entraînera une erreur TypeScript
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // L'absence de 'es' entraînera une erreur TypeScript
};

const text = t(translations);
```

---

## Conseils pour une utilisation efficace

1. **Utilisez `t` pour des traductions simples en ligne** : Idéal pour traduire de petits morceaux de texte directement dans vos composants.
2. **Préférez `useIntlayer` pour un contenu structuré** : Pour des traductions plus complexes et une réutilisation du contenu, définissez le contenu dans des fichiers de déclaration et utilisez `useIntlayer`.
3. **Fourniture cohérente de la langue** : Assurez-vous que votre langue est fournie de manière cohérente dans toute votre application via le `IntlayerProvider`.
4. **Exploitez TypeScript** : Utilisez les types TypeScript pour détecter les traductions manquantes et garantir la sécurité des types.

---

## Conclusion

La fonction `t` dans `react-intlayer` est un outil puissant et pratique pour gérer les traductions en ligne dans vos applications React. En l'intégrant efficacement, vous améliorez les capacités d'internationalisation de votre application, offrant une meilleure expérience aux utilisateurs du monde entier.

Pour une utilisation plus détaillée et des fonctionnalités avancées, consultez la [documentation react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md).

---

**Remarque** : N'oubliez pas de configurer correctement votre `IntlayerProvider` pour garantir que la langue actuelle est correctement transmise à vos composants. Cela est crucial pour que la fonction `t` retourne les traductions correctes.

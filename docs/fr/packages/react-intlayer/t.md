# Documentation: `t` Function in `react-intlayer`

La fonction `t` dans le paquet `react-intlayer` est un outil fondamental pour l'internationalisation en ligne dans votre application React. Elle vous permet de définir des traductions directement dans vos composants, rendant simple l'affichage de contenu localisé en fonction de la locale actuelle.

---

## Aperçu

La fonction `t` est utilisée pour fournir des traductions pour différentes locales directement dans vos composants. En passant un objet contenant des traductions pour chaque locale prise en charge, `t` retourne la traduction appropriée en fonction du contexte de locale actuel dans votre application React.

---

## Fonctionnalités Clés

- **Traductions En Ligne** : Idéal pour un texte rapide et en ligne qui ne nécessite pas une déclaration de contenu séparée.
- **Sélection Automatique de Locale** : Retourne automatiquement la traduction correspondant à la locale actuelle.
- **Support TypeScript** : Fournit la sécurité des types et l'autocomplétion lors de son utilisation avec TypeScript.
- **Intégration Facile** : Fonctionne parfaitement au sein des composants React.

---

## Signature de Fonction

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Paramètres

- `translations` : Un objet où les clés sont des codes de locale (e.g., `en`, `fr`, `es`) et les valeurs sont les chaînes traduites correspondantes.

### Retourne

- Une chaîne représentant le contenu traduit pour la locale actuelle.

---

## Exemples d'Utilisation

### Utilisation de Base de `t` dans un Composant

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

### Traductions En Ligne dans les Attributs

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

La fonction `t` est sécurisée par les types lorsqu'elle est utilisée avec TypeScript, garantissant que toutes les locales requises sont fournies.

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

### Détection de Locale et Contexte

Dans `react-intlayer`, la locale actuelle est gérée à travers le `IntlayerProvider`. Assurez-vous que ce fournisseur enveloppe vos composants et que la prop `locale` est correctement passée.

#### Exemple:

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

## Erreurs Courantes et Dépannages

### `t` Retourne Indéfini ou Traduction Incorrecte

- **Cause** : La locale actuelle n'est pas correctement définie, ou la traduction pour la locale actuelle est manquante.
- **Solution** :
  - Vérifiez que le `IntlayerProvider` est correctement configuré avec la `locale` appropriée.
  - Assurez-vous que votre objet de traductions comprend toutes les locales nécessaires.

### Traducteurs Manquants dans TypeScript

- **Cause** : L'objet de traductions ne satisfait pas aux locales requises, entraînant des erreurs TypeScript.
- **Solution** : Utilisez le type `IConfigLocales` pour garantir la complétude de vos traductions.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Manquant 'es' entraînera une erreur TypeScript
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Manquant 'es' entraînera une erreur TypeScript
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Manquant 'es' entraînera une erreur TypeScript
};

const text = t(translations);
```

---

## Conseils pour une Utilisation Efficace

1. **Utilisez `t` pour des Traductions En Ligne Simples** : Idéal pour traduire de petits morceaux de texte directement dans vos composants.
2. **Préférez `useIntlayer` pour du Contenu Structuré** : Pour des traductions plus complexes et la réutilisation de contenu, définissez le contenu dans des fichiers de déclaration et utilisez `useIntlayer`.
3. **Provision de Locale Cohérente** : Assurez-vous que votre locale est fournie de manière cohérente dans toute votre application via le `IntlayerProvider`.
4. **Tirez Parti de TypeScript** : Utilisez les types TypeScript pour détecter les traductions manquantes et garantir la sécurité des types.

---

## Conclusion

La fonction `t` dans `react-intlayer` est un outil puissant et pratique pour gérer les traductions en ligne dans vos applications React. En l'intégrant efficacement, vous améliorez les capacités d'internationalisation de votre application, offrant une meilleure expérience aux utilisateurs du monde entier.

Pour des informations plus détaillées sur l'utilisation et les fonctionnalités avancées, consultez la [documentation react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_editor.md).

---

**Remarque** : N'oubliez pas de configurer correctement votre `IntlayerProvider` pour vous assurer que la locale actuelle est correctement transmise à vos composants. Cela est crucial pour que la fonction `t` retourne les traductions correctes.

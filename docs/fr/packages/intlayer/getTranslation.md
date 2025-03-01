# Documentation: Fonction `getTranslationContent` dans `intlayer`

## Description

La fonction `getTranslationContent` récupère le contenu correspondant à une locale spécifique à partir d'un ensemble de contenus linguistiques personnalisables. Si la locale spécifiée n'est pas trouvée, elle retourne par défaut le contenu de la locale par défaut configurée dans le projet.

## Paramètres

- `languageContent: CustomizableLanguageContent<Content>`

  - **Description** : Un objet contenant les traductions pour diverses locales. Chaque clé représente une locale, et sa valeur est le contenu correspondant.
  - **Type** : `CustomizableLanguageContent<Content>`
    - `Content` peut être de n'importe quel type, par défaut `string`.

- `locale: Locales`

  - **Description** : La locale pour laquelle le contenu doit être récupéré.
  - **Type** : `Locales`

## Retours

- **Type** : `Content`
- **Description** : Le contenu correspondant à la locale spécifiée. Si la locale n'est pas trouvée, le contenu de la locale par défaut est retourné.

## Exemple d'utilisation

### Utilisation de base

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Résultat : "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Résultat : "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Résultat : "Bonjour"
```

### Locale manquante :

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Résultat : "Hello" (contenu de la locale par défaut)
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Résultat : "Hello" (contenu de la locale par défaut)
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Résultat : "Hello" (contenu de la locale par défaut)
```

### Utilisation de types de contenu personnalisés :

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Résultat : "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Résultat : "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Résultat : "Bonjour"
```

## Cas particuliers

- **Locale non trouvée :**
  - Lorsque la `locale` n'est pas trouvée dans le `languageContent`, la fonction retourne le contenu de la locale par défaut.
- **Contenu linguistique incomplet :**
  - Si une locale est partiellement définie, la fonction ne fusionne pas les contenus. Elle récupère strictement la valeur de la locale spécifiée ou revient à la valeur par défaut.
- **Application stricte de TypeScript :**
  - Si les locales dans `languageContent` ne correspondent pas à la configuration du projet, TypeScript imposera que toutes les locales requises soient définies, garantissant que le contenu est complet et conforme au typage.

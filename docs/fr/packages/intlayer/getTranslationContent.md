# Documentation: `getTranslation` Function in `intlayer`

## Description

La fonction `getTranslation` récupère le contenu correspondant à un locale spécifique d'un ensemble de contenu linguistique personnalisable. Si le locale spécifié n'est pas trouvé, il retourne par défaut le contenu pour le locale par défaut configuré dans le projet.

## Parameters

- `languageContent: CustomizableLanguageContent<Content>`

  - **Description**: Un objet contenant des traductions pour divers locales. Chaque clé représente un locale, et sa valeur est le contenu correspondant.
  - **Type**: `CustomizableLanguageContent<Content>`
    - `Content` peut être de n'importe quel type, par défaut un `string`.

- `locale: Locales`

  - **Description**: Le locale pour lequel le contenu doit être récupéré.
  - **Type**: `Locales`

## Returns

- **Type**: `Content`
- **Description**: Le contenu correspondant au locale spécifié. Si le locale n'est pas trouvé, le contenu du locale par défaut est retourné.

## Example Usage

### Basic Usage

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Sortie: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Sortie: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Sortie: "Bonjour"
```

### Missing Locale:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Sortie: "Hello" (contenu du locale par défaut)
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Sortie: "Hello" (contenu du locale par défaut)
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Sortie: "Hello" (contenu du locale par défaut)
```

### Using Custom Content Types:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Sortie: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Sortie: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Sortie: "Bonjour"
```

## Edge Cases

- **Locale Not Found:**
  - Lorsque le `locale` n'est pas trouvé dans le `languageContent`, la fonction retourne le contenu pour le locale par défaut.
- **Incomplete Language Content:**

  - Si un locale est partiellement défini, la fonction ne fusionne pas les contenus. Elle récupère strictement la valeur du locale spécifié ou revient au défaut.

- **TypeScript Enforcement:**
  - Si les locales dans `languageContent` ne correspondent pas à la configuration du projet, TypeScript imposera que tous les locales requis soient définis, garantissant que le contenu est complet et type-sécurisé.

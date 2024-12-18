# Documentation: `getTranslationContent` Fonction dans `intlayer`

## Description:

La fonction `getTranslationContent` récupère le contenu correspondant à un locale spécifique à partir d'un ensemble de contenu linguistique personnalisable. Si le locale spécifié n'est pas trouvé, il renvoie par défaut le contenu du locale par défaut configuré dans le projet.

## Paramètres:

- `languageContent: CustomizableLanguageContent<Content>`

  - **Description**: Un objet contenant des traductions pour divers locales. Chaque clé représente un locale et sa valeur est le contenu correspondant.
  - **Type**: `CustomizableLanguageContent<Content>`
    - `Content` peut être de n'importe quel type, par défaut `string`.

- `locale: Locales`

  - **Description**: Le locale pour lequel le contenu doit être récupéré.
  - **Type**: `Locales`

## Retourne:

- **Type**: `Content`
- **Description**: Le contenu correspondant au locale spécifié. Si le locale n'est pas trouvé, le contenu du locale par défaut est renvoyé.

## Exemple d'Utilisation:

### Utilisation de Base:

```typescript
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Sortie: "Bonjour"
```

### Locale Manquant:

```typescript
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Sortie: "Hello" (contenu du locale par défaut)
```

### Utilisation de Types de Contenu Personnalisés:

```typescript
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Sortie: "Bonjour"
```

## Cas Limites:

- **Locale Non Trouvé:**
  - Lorsque le `locale` n'est pas trouvé dans le `languageContent`, la fonction renvoie le contenu pour le locale par défaut.
- **Contenu Linguistique Incomplet:**

  - Si un locale est partiellement défini, la fonction ne fusionne pas les contenus. Elle récupère strictement la valeur du locale spécifié ou revient au défaut.

- **Contrôle TypeScript:**
  - Si les locales dans `languageContent` ne correspondent pas à la configuration du projet, TypeScript imposera que tous les locales requis soient définis, garantissant que le contenu est complet et sécurisé par type.

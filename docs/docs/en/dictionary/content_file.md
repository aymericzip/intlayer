---
createdAt: 2025-02-07
updatedAt: 2025-09-20
title: Content File
description: Learn how to customize the extensions for your content declaration files. Follow this documentation to implement conditions efficiently in your project.
keywords:
  - Content File
  - Documentation
  - Intlayer
slugs:
  - doc
  - concept
  - content
history:
  - version: 6.0.0
    date: 2025-09-20
    changes: Add fields documentation
  - version: 5.5.10
    date: 2025-06-29
    changes: Init history
---

# Content File

<iframe title="i18n, Markdown, JSON… one single solution to manage it all | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## What is a Content File?

A content file in Intlayer is a file that contains dictionary definitions.
These files declare your application's text content, translations, and resources.
Content files are processed by Intlayer to generate dictionaries.

The dictionaries will be the final result that your application will import using the `useIntlayer` hook.

### Key Concepts

#### Dictionary

A dictionary is a structured collection of content organized by keys. Each dictionary contains:

- **Key**: A unique identifier for the dictionary
- **Content**: The actual content values (text, numbers, objects, etc.)
- **Metadata**: Additional information like title, description, tags, etc.

#### Content File

Content file example:

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { type ReactNode } from "react";
import {
  t,
  enu,
  cond,
  nest,
  md,
  insert,
  file,
  type Dictionary,
} from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
      javaScriptContent: string;
    };
  };
  multilingualContent: string;
  quantityContent: string;
  conditionalContent: string;
  markdownContent: never;
  externalContent: string;
  insertionContent: string;
  nestedContent: string;
  fileContent: string;
  jsxContent: ReactNode;
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
    conditionalContent: cond({
      true: "Validation is enabled",
      false: "Validation is disabled",
    }),
    insertionContent: insert("Hello {{name}}!"),
    nestedContent: nest(
      "navbar", // The key of the dictionary to nest
      "login.button" // [Optional] The path to the content to nest
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# Markdown Example"),

    /*
     * Only available using `react-intlayer` or `next-intlayer`
     */
    jsxContent: <h1>My title</h1>,
  },
} satisfies Dictionary<Content>; // [optional] Dictionary is generic and allow you to strengthen the formatting of your dictionary
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
    conditionalContent: cond({
      true: "Validation is enabled",
      false: "Validation is disabled",
    }),
    insertionContent: insert("Hello {{name}}!"),
    nestedContent: nest(
      "navbar", // The key of the dictionary to nest
      "login.button" // [Optional] The path to the content to nest
    ),
    markdownContent: md("# Markdown Example"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Only available using `react-intlayer` or `next-intlayer`
    jsxContent: <h1>My title</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md, insert, file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
    conditionalContent: cond({
      true: "Validation is enabled",
      false: "Validation is disabled",
    }),
    insertionContent: insert("Hello {{name}}!"),
    nestedContent: nest(
      "navbar", // The key of the dictionary to nest
      "login.button" // [Optional] The path to the content to nest
    ),
    markdownContent: md("# Markdown Example"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Only available using `react-intlayer` or `next-intlayer`
    jsxContent: <h1>My title</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "Hello World",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "English content",
        "en-GB": "English content (UK)",
        "fr": "French content",
        "es": "Spanish content",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "No cars",
        "1": "One car",
        "<-1": "Less than minus one car",
        "-1": "Minus one car",
        ">5": "Some cars",
        ">19": "Many cars",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "Validation is enabled",
        "false": "Validation is disabled",
      },
    },
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "Hello {{name}}!",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Markdown Example",
    },
    "fileContent": {
      "nodeType": "file",
      "file": "./path/to/file.txt",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["My title"],
      },
    },
  },
}
```

#### Content Nodes

Content nodes are the building blocks of dictionary content. They can be:

- **Primitive values**: strings, numbers, booleans, null, undefined
- **Typed nodes**: Special content types like translations, conditions, markdown, etc.
- **Functions**: Dynamic content that can be evaluated at runtime [see Function Fetching](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/function_fetching.md)
- **Nested content**: References to other dictionaries

#### Content Types

Intlayer supports various content types through typed nodes:

- **Translation Content**: Multilingual text with locale-specific values [see Translation Content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/translation_content.md)
- **Condition Content**: Conditional content based on boolean expressions [see Condition Content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/condition_content.md)
- **Enumeration Content**: Content that varies based on enumerated values [see Enumeration Content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/enumeration_content.md)
- **Insertion Content**: Content that can be inserted into other content [see Insertion Content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/insertion_content.md)
- **Markdown Content**: Rich text content in Markdown format [see Markdown Content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/markdown_content.md)
- **Nested Content**: References to other dictionaries [see Nested Content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/nested_content.md)
- **Gender Content**: Content that varies based on gender [see Gender Content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/gender_content.md)
- **File Content**: References to external files [see File Content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/file_content.md)

## Dictionary Structure

A dictionary in Intlayer is defined by the `Dictionary` type and contains several properties that control its behavior:

### Required Properties

#### `key` (string)

The identifier for the dictionary. If multiple dictionaries have the same key, Intlayer will merge them automatically.

> Use kebab-case naming convention (e.g., `"about-page-meta"`).

#### Content (string | number | boolean | object | array | function)

The `content` property contains the actual dictionary data and supports:

- **Primitive values**: strings, numbers, booleans, null, undefined
- **Typed nodes**: Special content types using Intlayer's helper functions
- **Nested objects**: Complex data structures
- **Arrays**: Collections of content
- **Functions**: Dynamic content evaluation

### Optional Properties

#### `title` (string)

Human-readable title for the dictionary that helps identify it in editors and CMS systems. This is particularly useful when managing large numbers of dictionaries or when working with content management interfaces.

**Example:**

```typescript
{
  key: "about-page-meta",
  title: "About Page Metadata",
  content: { /* ... */ }
}
```

#### `description` (string)

Detailed description explaining the dictionary's purpose, usage guidelines, and any special considerations. This description is also used as context for AI-powered translation generation, making it valuable for maintaining translation quality and consistency.

**Example:**

```typescript
{
  key: "about-page-meta",
  description: [
    "This dictionary manages the metadata of the About Page",
    "Consider good practices for SEO:",
    "- The title should be between 50 and 60 characters",
    "- The description should be between 150 and 160 characters",
  ].join('\n'),
  content: { /* ... */ }
}
```

#### `tags` (string[])

Array of strings for categorizing and organizing dictionaries. Tags provide additional context and can be used for filtering, searching, or organizing dictionaries in editors and CMS systems.

**Example:**

```typescript
{
  key: "about-page-meta",
  tags: ["metadata", "about-page", "seo"],
  content: { /* ... */ }
}
```

#### `locale` (LocalesValues)

Transforms the dictionary into a per-locale dictionary where each field declared in the content will be automatically transformed into a translation node. When this property is set:

- The dictionary is treated as a single-locale dictionary
- Each field becomes a translation node for that specific locale
- You should NOT use translation nodes (`t()`) in the content when using this property
- If missing, the dictionary will be treated as a multilingual dictionary

> See [Per-Locale Content Declaration in Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/per_locale_file.md) for more information.

**Example:**

```json
// Per-locale dictionary
{
  "key": "about-page",
  "locale": "en",
  "content": {
    "title": "About Us", // This becomes a translation node for 'en'
    "description": "Learn more about our company"
  }
}
```

#### `autoFill` (AutoFill)

Instructions for automatically filling dictionary content from external sources. This can be configured globally in `intlayer.config.ts` or per-dictionary. Supports multiple formats:

- **`true`**: Enable auto-fill for all locales
- **`string`**: Path to a single file or template with variables
- **`object`**: Per-locale file paths

**Examples:**

```json
// Enable for all locales
{
  "autoFill": true
}
// Single file
{
  "autoFill": "./translations/aboutPage.content.json"
}
// Template with variables
{
  "autoFill": "/messages/{{locale}}/{{key}}/{{fileName}}.content.json"
}
// Fine per-locale configuration
{
  "autoFill": {
    "en": "./translations/en/aboutPage.content.json",
    "fr": "./translations/fr/aboutPage.content.json",
    "es": "./translations/es/aboutPage.content.json"
  }
}
```

**Available variables:**

- `{{locale}}` – Locale code (e.g. `fr`, `es`)
- `{{fileName}}` – File name (e.g. `example`)
- `{{key}}` – Dictionary key (e.g. `example`)

> See [Auto-Fill Configuration in Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/autoFill.md) for more information.

##### `priority` (number)

Indicates the priority of the dictionary for conflict resolution. When multiple dictionaries have the same key, the dictionary with the highest priority number will override the others. This is useful for managing content hierarchies and overrides.

**Example:**

```typescript
// Base dictionary
{
  key: "welcome-message",
  priority: 1,
  content: { message: "Welcome!" }
}

// Override dictionary
{
  key: "welcome-message",
  priority: 10,
  content: { message: "Welcome to our premium service!" }
}
// This will override the base dictionary
```

### CMS Properties

##### `version` (string)

Version identifier for remote dictionaries. Helps track which version of the dictionary is currently being used, especially useful when working with remote content management systems.

##### `live` (boolean)

For remote dictionaries, indicates if the dictionary should be fetched live at runtime. When enabled:

- Requires `importMode` to be set to "live" in `intlayer.config.ts`
- Requires a live server to be running
- Dictionary will be fetched at runtime using the live sync API
- If live but fetch fails, falls back to dynamic value
- If not live, dictionary is transformed at build time for optimal performance

### System Properties (Auto-generated)

These properties are automatically generated by Intlayer and should not be manually modified:

##### `$schema` (string)

JSON schema used for validation of the dictionary structure. Automatically added by Intlayer to ensure dictionary integrity.

##### `id` (string)

For remote dictionaries, this is the unique identifier of the dictionary in the remote server. Used for fetching and managing remote content.

##### `projectIds` (string[])

For remote dictionaries, this array contains the IDs of the projects that can use this dictionary. A remote dictionary can be shared between multiple projects.

##### `localId` (LocalDictionaryId)

Unique identifier for local dictionaries. Auto-generated by Intlayer to help identify the dictionary and determine if it's local or remote, along with its location.

##### `localIds` (LocalDictionaryId[])

For merged dictionaries, this array contains the IDs of all dictionaries that were merged together. Useful for tracking the source of merged content.

##### `filePath` (string)

The file path of the local dictionary, indicating which `.content` file the dictionary was generated from. Helps with debugging and source tracking.

##### `versions` (string[])

For remote dictionaries, this array contains all available versions of the dictionary. Helps track which versions are available for use.

##### `autoFilled` (true)

Indicates whether the dictionary has been auto-filled from external sources. In case of conflicts, base dictionaries will override auto-filled dictionaries.

##### `location` ('distant' | 'locale')

Indicates the location of the dictionary:

- `'locale'`: Local dictionary (from content files)
- `'distant'`: Remote dictionary (from external source)

## Content Node Types

Intlayer provides several specialized content node types that extend basic primitive values:

### Translation Content (`t`)

Multilingual content that varies by locale:

```typescript
import { t } from "intlayer";

// TypeScript/JavaScript
multilingualContent: t({
  en: "Welcome to our website",
  fr: "Bienvenue sur notre site web",
  es: "Bienvenido a nuestro sitio web",
});
```

### Condition Content (`cond`)

Content that changes based on boolean conditions:

```typescript
import { cond } from "intlayer";

conditionalContent: cond({
  true: "User is logged in",
  false: "Please log in to continue",
});
```

### Enumeration Content (`enu`)

Content that varies based on enumerated values:

```typescript
import { enu } from "intlayer";

statusContent: enu({
  pending: "Your request is pending",
  approved: "Your request has been approved",
  rejected: "Your request has been rejected",
});
```

### Insertion Content (`insert`)

Content that can be inserted into other content:

```typescript
import { insert } from "intlayer";

insertionContent: insert("This text can be inserted anywhere");
```

### Nested Content (`nest`)

References to other dictionaries:

```typescript
import { nest } from "intlayer";

nestedContent: nest("about-page");
```

### Markdown Content (`md`)

Rich text content in Markdown format:

```typescript
import { md } from "intlayer";

markdownContent: md(
  "# Welcome\n\nThis is **bold** text with [links](https://example.com)"
);
```

### Gender Content (`gender`)

Content that varies based on gender:

```typescript
import { gender } from "intlayer";

genderContent: gender({
  male: "He is a developer",
  female: "She is a developer",
  other: "They are a developer",
});
```

### File Content (`file`)

References to external files:

```typescript
import { file } from "intlayer";

fileContent: file("./path/to/content.txt");
```

## Creating Content Files

### Basic Content File Structure

A content file exports a default object that satisfies the `Dictionary` type:

```typescript
// example.content.ts
import { t, cond, nest, md, insert, file } from "intlayer";

export default {
  key: "welcome-page",
  title: "Welcome Page Content",
  description:
    "Content for the main welcome page including hero section and features",
  tags: ["page", "welcome", "homepage"],
  content: {
    hero: {
      title: t({
        en: "Welcome to Our Platform",
        fr: "Bienvenue sur Notre Plateforme",
        es: "Bienvenido a Nuestra Plataforma",
      }),
      subtitle: t({
        en: "Build amazing applications with ease",
        fr: "Construisez des applications incroyables avec facilité",
        es: "Construye aplicaciones increíbles con facilidad",
      }),
      cta: cond({
        true: t({
          en: "Get Started",
          fr: "Commencer",
          es: "Comenzar",
        }),
        false: t({
          en: "Sign Up",
          fr: "S'inscrire",
          es: "Registrarse",
        }),
      }),
    },
    features: [
      {
        title: t({
          en: "Easy to Use",
          fr: "Facile à Utiliser",
          es: "Fácil de Usar",
        }),
        description: t({
          en: "Intuitive interface for all skill levels",
          fr: "Interface intuitive pour tous les niveaux",
          es: "Interfaz intuitiva para todos los niveles",
        }),
      },
    ],
    documentation: nest("documentation"),
    readme: file("./README.md"),
  },
} satisfies Dictionary;
```

### JSON Content File

You can also create content files in JSON format:

```json
{
  "key": "welcome-page",
  "title": "Welcome Page Content",
  "description": "Content for the main welcome page",
  "tags": ["page", "welcome"],
  "content": {
    "hero": {
      "title": {
        "nodeType": "translation",
        "translation": {
          "en": "Welcome to Our Platform",
          "fr": "Bienvenue sur Notre Plateforme"
        }
      },
      "subtitle": {
        "nodeType": "translation",
        "translation": {
          "en": "Build amazing applications with ease",
          "fr": "Construisez des applications incroyables avec facilité"
        }
      }
    }
  }
}
```

### Per-Locale Content Files

For per-locale dictionaries, specify the `locale` property:

```typescript
// welcome-page.en.content.ts
export default {
  key: "welcome-page",
  locale: "en",
  content: {
    hero: {
      title: "Welcome to Our Platform",
      subtitle: "Build amazing applications with ease",
    },
  },
} satisfies Dictionary;
```

```typescript
// welcome-page.fr.content.ts
export default {
  key: "welcome-page",
  locale: "fr",
  content: {
    hero: {
      title: "Bienvenue sur Notre Plateforme",
      subtitle: "Construisez des applications incroyables avec facilité",
    },
  },
} satisfies Dictionary;
```

## Content File Extensions

Intlayer allows you to customize the extensions for your content declaration files. This customization provides flexibility in managing large-scale projects and helps to avoid conflicts with other modules.

### Default Extensions

By default, Intlayer watches all files with the following extensions for content declarations:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

These default extensions are suitable for most applications. However, when you have specific needs, you can define custom extensions to streamline the build process and reduce the risk of conflicts with other components.

> To customize the file extensions Intlayer uses to identify content declaration files, you can specify them in the Intlayer configuration file. This approach is beneficial for large-scale projects where limiting the scope of the watch process improves build performance.

## Advanced Concepts

### Dictionary Merging

When multiple dictionaries have the same key, Intlayer automatically merges them. The merging behavior depends on several factors:

- **Priority**: Dictionaries with higher `priority` values override those with lower values
- **Auto-fill vs Base**: Base dictionaries override auto-filled dictionaries
- **Location**: Local dictionaries override remote dictionaries (when priorities are equal)

### Type Safety

Intlayer provides full TypeScript support for content files:

```typescript
// Define your content type
interface WelcomePageContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
}

// Use it in your dictionary
export default {
  key: "welcome-page",
  content: {
    // TypeScript will provide autocomplete and type checking
    hero: {
      title: "Welcome",
      subtitle: "Build amazing apps",
      cta: "Get Started",
    },
  },
} satisfies Dictionary<WelcomePageContent>;
```

### Node Imbrication

You can without problem imbricate functions into other ones.

Example :

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` returns `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Composite content imbricating condition, enumeration, and multilingual content
    // `getIntlayer('page','en').advancedContent(true)(10) returns 'Multiple items found'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` returns `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Composite content imbricating condition, enumeration, and multilingual content
    // `getIntlayer('page','en').advancedContent(true)(10) returns 'Multiple items found'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` returns `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Composite content imbricating condition, enumeration, and multilingual content
    // `getIntlayer('page','en').advancedContent(true)(10) returns 'Multiple items found'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "hiMessage": {
      "nodeType": "composite",
      "composite": [
        {
          "nodeType": "translation",
          "translation": {
            "en": "Hi",
            "fr": "Salut",
            "es": "Hola",
          },
        },
        " ",
        "John Doe",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        "true": {
          "nodeType": "enumeration",
          "enumeration": {
            "0": {
              "nodeType": "translation",
              "translation": {
                "en": "No items found",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "One item found",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "No valid data available",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```

### Best Practices

1. **Naming Conventions**:
   - Use kebab-case for dictionary keys (`"about-page-meta"`)
   - Group related content under the same key prefix

2. **Content Organization**:
   - Keep related content together in the same dictionary
   - Use nested objects to organize complex content structures
   - Leverage tags for categorization
   - Use the `autoFill` to automatically fill the missing translations

3. **Performance**:
   - Ajust the content configuration to limit the scope of watched files
   - Use live dictionaries only when real-time updates are necessary, (e.g. A/B testing, etc.)
   - Ensure the build transformation plugin (`@intlayer/swc`, or `@intlayer/babel`) is enabled to optimize the dictionary at build time

---
createdAt: 2025-02-07
updatedAt: 2026-01-28
title: Fichier de Contenu
description: Apprenez à personnaliser les extensions pour vos fichiers de déclaration de contenu. Suivez cette documentation pour implémenter efficacement des conditions dans votre projet.
keywords:
  - Fichier de Contenu
  - Documentation
  - Intlayer
slugs:
  - doc
  - concept
  - content
history:
  - version: 8.0.0
    date: 2026-01-28
    changes: "Ajout du type de nœud de contenu `html`"
  - version: 8.0.0
    date: 2026-01-24
    changes: "Rename `live` import mode to `fetch` to better describe the underlying mechanism."
  - version: 8.0.0
    date: 2026-01-18
    changes: "Ajout des options de dictionnaire `location` et `schema`"
  - version: 7.5.0
    date: 2025-12-13
    changes: "Ajout du support des formats ICU et i18next"
  - version: 6.0.0
    date: 2025-09-20
    changes: "Ajout de la documentation des champs"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historique initial"
---

# Fichier de Contenu

<iframe title="i18n, Markdown, JSON… une solution unique pour tout gérer | Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Qu'est-ce qu'un Fichier de Contenu ?

Un fichier de contenu dans Intlayer est un fichier qui contient des définitions de dictionnaires.  
Ces fichiers déclarent le contenu textuel de votre application, les traductions et les ressources.  
Les fichiers de contenu sont traités par Intlayer pour générer des dictionnaires.

Les dictionnaires seront le résultat final que votre application importera en utilisant le hook `useIntlayer`.

### Concepts Clés

#### Dictionnaire

Un dictionnaire est une collection structurée de contenu organisée par clés. Chaque dictionnaire contient :

- **Clé** : Un identifiant unique pour le dictionnaire
- **Contenu** : Les valeurs de contenu réelles (texte, nombres, objets, etc.)
- **Métadonnées** : Informations supplémentaires comme le titre, la description, les tags, etc.

#### Fichier de Contenu

Exemple de fichier de contenu :

```tsx fileName="src/example.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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
  htmlContent: never;
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
        stringContent: "Bonjour le monde",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "Contenu français",
      es: "Contenido en español",
    }),
    quantityContent: enu({
      "<-1": "Moins d'une voiture négative",
      "-1": "Moins une voiture",
      "0": "Pas de voitures",
      "1": "Une voiture",
      ">5": "Quelques voitures",
      ">19": "Beaucoup de voitures",
    }),
    conditionalContent: cond({
      true: "La validation est activée",
      false: "La validation est désactivée",
    }),
    insertionContent: insert("Bonjour {{name}} !"),
    nestedContent: nest(
      "navbar", // La clé du dictionnaire à imbriquer
      "login.button" // [Optionnel] Le chemin vers le contenu à imbriquer
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# Exemple Markdown"),
    htmlContent: html("<p>Hello <strong>World</strong></p>"),

    /*
     * Disponible uniquement avec `react-intlayer` ou `next-intlayer`
     */
    jsxContent: <h1>Mon titre</h1>,
  },
} satisfies Dictionary<Content>; // [optionnel] Dictionary est générique et vous permet de renforcer le formatage de votre dictionnaire
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "Bonjour le monde",
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
        "fr": "Contenu français",
        "es": "Spanish content",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "Pas de voitures",
        "1": "Une voiture",
        "<-1": "Moins d'une voiture négative",
        "-1": "Moins une voiture",
        ">5": "Quelques voitures",
        ">19": "Beaucoup de voitures",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "La validation est activée",
        "false": "La validation est désactivée",
      },
    },
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "Bonjour {{name}} !",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Exemple de Markdown",
    },
    "htmlContent": {
      "nodeType": "html",
      "html": "<p>Hello <strong>World</strong></p>",
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
        "children": ["Mon titre"],
      },
    },
  },
}
```

#### Nœuds de contenu

Les nœuds de contenu sont les éléments de base du contenu du dictionnaire. Ils peuvent être :

- **Valeurs primitives** : chaînes de caractères, nombres, booléens, null, undefined
- **Nœuds typés** : Types de contenu spéciaux comme les traductions, conditions, markdown, etc.
- **Fonctions** : Contenu dynamique pouvant être évalué à l'exécution [voir Récupération de fonctions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/function_fetching.md)
- **Contenu imbriqué** : Références à d'autres dictionnaires

#### Types de contenu

Intlayer prend en charge divers types de contenu via des nœuds typés :

- **Contenu de traduction** : Texte multilingue avec des valeurs spécifiques à chaque locale [voir Contenu de traduction](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/translation_content.md)
- **Contenu conditionnel** : Contenu conditionnel basé sur des expressions booléennes [voir Contenu conditionnel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/condition_content.md)
- **Contenu d'énumération** : Contenu qui varie en fonction de valeurs énumérées [voir Contenu d'énumération](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/enumeration_content.md)
- **Contenu d'insertion** : Contenu pouvant être inséré dans un autre contenu [voir Contenu d'insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/insertion_content.md)
- **Contenu Markdown** : Contenu en texte enrichi au format Markdown [voir Contenu Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/markdown_content.md)
- **Contenu HTML** : Contenu HTML riche avec des composants personnalisés optionnels [voir Contenu HTML](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/html.md)
- **Contenu Imbriqué** : Références à d’autres dictionnaires [voir Contenu Imbriqué](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/nested_content.md)
- **Contenu Genré** : Contenu qui varie selon le genre [voir Contenu Genré](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/gender_content.md)
- **Contenu Fichier** : Références à des fichiers externes [voir Contenu Fichier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/file_content.md)

## Structure du Dictionnaire

Un dictionnaire dans Intlayer est défini par le type `Dictionary` et contient plusieurs propriétés qui contrôlent son comportement :

### Propriétés requises

#### `key` (string)

L'identifiant du dictionnaire. Si plusieurs dictionnaires ont la même clé, Intlayer les fusionnera automatiquement.

> Utilisez la convention de nommage kebab-case (par exemple, `"about-page-meta"`).

#### Content (string | number | boolean | object | array | function)

La propriété `content` contient les données réelles du dictionnaire et supporte :

- **Valeurs primitives** : chaînes de caractères, nombres, booléens, null, undefined
- **Nœuds typés** : types de contenu spéciaux utilisant les fonctions d'aide d'Intlayer
- **Objets imbriqués** : structures de données complexes
- **Tableaux** : collections de contenu
- **Fonctions** : évaluation dynamique du contenu

### Propriétés optionnelles

#### `title` (string)

Titre lisible par l'humain pour le dictionnaire qui aide à l'identifier dans les éditeurs et les systèmes CMS. Ceci est particulièrement utile lors de la gestion d'un grand nombre de dictionnaires ou lors du travail avec des interfaces de gestion de contenu.

**Exemple :**

```typescript
{
  key: "about-page-meta",
  title: "Métadonnées de la page À propos",
  content: { /* ... */ }
}
```

#### `description` (string)

Description détaillée expliquant l'objectif du dictionnaire, les directives d'utilisation et toute considération spéciale. Cette description est également utilisée comme contexte pour la génération de traduction assistée par IA, ce qui est précieux pour maintenir la qualité et la cohérence des traductions.

**Exemple :**

```typescript
{
  key: "about-page-meta",
  description: [
    "Ce dictionnaire gère les métadonnées de la page À propos",
    "Considérez les bonnes pratiques pour le SEO :",
    "- Le titre doit comporter entre 50 et 60 caractères",
    "- La description doit comporter entre 150 et 160 caractères",
  ].join('\n'),
  content: { /* ... */ }
}
```

#### `tags` (string[])

Tableau de chaînes de caractères pour catégoriser et organiser les dictionnaires. Les tags fournissent un contexte supplémentaire et peuvent être utilisés pour filtrer, rechercher ou organiser les dictionnaires dans les éditeurs et les systèmes de gestion de contenu.

**Exemple :**

```typescript
{
  key: "about-page-meta",
  tags: ["metadata", "about-page", "seo"],
  content: { /* ... */ }
}
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Spécifie le formateur à utiliser pour le contenu du dictionnaire. Cela permet d'utiliser différentes syntaxes de formatage de messages.

- `'intlayer'`: Le formateur Intlayer par défaut.
- `'icu'`: Utilise le formatage de messages ICU.
- `'i18next'`: Utilise le formatage de messages i18next.

**Exemple :**

```typescript
{
  key: "my-dictionary",
  format: "icu",
  content: {
    message: "Hello {name}, you have {count, plural, one {# message} other {# messages}}"
  }
}
```

#### `locale` (LocalesValues)

Transforme le dictionnaire en un dictionnaire par locale où chaque champ déclaré dans le contenu sera automatiquement transformé en un nœud de traduction. Lorsque cette propriété est définie :

- Le dictionnaire est traité comme un dictionnaire à langue unique
- Chaque champ devient un nœud de traduction pour cette langue spécifique
- Vous ne devez PAS utiliser de nœuds de traduction (`t()`) dans le contenu lorsque cette propriété est utilisée
- En l'absence de cette propriété, le dictionnaire sera traité comme un dictionnaire multilingue

> Voir [Déclaration de contenu par langue dans Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/per_locale_file.md) pour plus d'informations.

**Exemple :**

```json
// Dictionnaire par langue
{
  "key": "about-page",
  "locale": "en",
  "content": {
    "title": "About Us", // Ceci devient un nœud de traduction pour 'en'
    "description": "Learn more about our company"
  }
}
```

#### `schema` (SchemaKeys)

Le schéma du contenu du dictionnaire. S'il est défini, le contenu sera validé par rapport à ce schéma. Cela vous permet d'imposer une structure spécifique pour le contenu de votre dictionnaire en utilisant des schémas de validation personnalisés définis dans votre configuration Intlayer.

**Exemple :**

```typescript fileName="intlayer.config.ts"
import { z } from "zod";

export default {
  schemas: {
    "seo-metadata": z.object({
      title: z.string().min(50).max(60),
      description: z.string().min(150).max(160),
    }),
  },
};
```

```typescript fileName="src/example.content.ts"
import { type Dictionary } from "intlayer";

const aboutPageMetaContent = {
  key: "about-page-meta",
  schema: "seo-metadata",
  content: {
    title: "About Our Company - Learn More About Us",
    description: "Discover our company's mission, values, and team.",
  },
} satisfies Dictionary;

export default aboutPageMetaContent;
```

#### `location` ('local' | 'remote' | 'hybrid' | string)

Indique l'emplacement du dictionnaire et contrôle la façon dont il se synchronise avec le CMS :

- `'local'` : Le dictionnaire est géré localement uniquement. Il ne sera pas poussé vers le CMS distant. Utilisez ceci pour le contenu qui doit rester dans votre codebase.
- `'remote'` : Le dictionnaire est géré à distance uniquement. Une fois poussé vers le CMS, il sera détaché du fichier local. Au moment du chargement du contenu, le dictionnaire distant sera récupéré depuis le CMS. Un fichier `.content` avec l'emplacement `remote` sera ignoré après le push initial.
- `'hybrid'` : Le dictionnaire est géré à la fois localement et à distance. Une fois poussé vers le CMS, il restera synchronisé, les modifications du fichier local sont poussées vers le CMS, et les modifications distantes peuvent être récupérées dans le fichier local.
- `string` (par ex., `'plugin'`) : Le dictionnaire est géré par un plugin ou une source personnalisée. Lorsque vous essayez de le pousser, le système vous demandera quoi faire.

**Exemple :**

```typescript
{
  key: "about-page",
  location: "local", // Le contenu reste uniquement dans votre codebase
  content: {
    title: "About Us"
  }
}
```

#### `autoFill` (AutoFill)

Instructions pour remplir automatiquement le contenu du dictionnaire à partir de sources externes. Cela peut être configuré globalement dans `intlayer.config.ts` ou par dictionnaire. Supporte plusieurs formats :

- **`true`** : Activer le remplissage automatique pour toutes les locales
- **`string`** : Chemin vers un fichier unique ou un modèle avec des variables
- **`object`** : Chemins de fichiers par locale

**Exemples :**

```json
// Activer pour toutes les locales
{
  "autoFill": true
}
// Fichier unique
{
  "autoFill": "./translations/aboutPage.content.json"
}
// Modèle avec variables
{
  "autoFill": "/messages/{{locale}}/{{key}}/{{fileName}}.content.json"
}
// Configuration fine par locale
{
  "autoFill": {
    "en": "./translations/en/aboutPage.content.json",
    "fr": "./translations/fr/aboutPage.content.json",
    "es": "./translations/es/aboutPage.content.json"
  }
}
```

**Variables disponibles :**

- `{{locale}}` – Code de la locale (ex. `fr`, `es`)
- `{{fileName}}` – Nom du fichier (ex. `example`)
- `{{key}}` – Clé du dictionnaire (ex. `example`)

> Voir [Configuration de l’auto-remplissage dans Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/autoFill.md) pour plus d’informations.

##### `priority` (nombre)

Indique la priorité du dictionnaire pour la résolution des conflits. Lorsque plusieurs dictionnaires contiennent la même clé, celui avec le numéro de priorité le plus élevé écrasera les autres. Ceci est utile pour gérer les hiérarchies de contenu et les surcharges.

**Exemple :**

```typescript
// Dictionnaire de base
{
  key: "welcome-message",
  priority: 1,
  content: { message: "Welcome!" }
}

// Dictionnaire de surcharge
{
  key: "welcome-message",
  priority: 10,
  content: { message: "Bienvenue dans notre service premium !" }
}
// Ceci remplacera le dictionnaire de base
```

### Propriétés CMS

##### `version` (string)

Identifiant de version pour les dictionnaires distants. Permet de suivre quelle version du dictionnaire est actuellement utilisée, particulièrement utile lors de l'utilisation de systèmes de gestion de contenu distants.

##### `importMode` ('static' | 'dynamic' | 'fetch')

Le mode d'importation détermine comment votre dictionnaire est importé dans votre application.

- `'static'`: Le dictionnaire est importé statiquement au moment de la compilation. C'est le mode par défaut.
- `'dynamic'`: Le dictionnaire est importé dynamiquement à l'exécution en utilisant l'API de suspense.
- `'fetch'`: Le dictionnaire est importé dynamiquement en utilisant l'API de synchronisation live.

Si défini, cette propriété remplace le `importMode` global défini dans `la propriété `dictionary`de`intlayer.config.ts``.

### Propriétés Système (Générées automatiquement)

Ces propriétés sont générées automatiquement par Intlayer et ne doivent pas être modifiées manuellement :

##### `$schema` (string)

Schéma JSON utilisé pour la validation de la structure du dictionnaire. Ajouté automatiquement par Intlayer pour garantir l'intégrité du dictionnaire.

##### `id` (string)

Pour les dictionnaires distants, il s'agit de l'identifiant unique du dictionnaire sur le serveur distant. Utilisé pour récupérer et gérer le contenu distant.

##### `localId` (LocalDictionaryId)

Identifiant unique pour les dictionnaires locaux. Généré automatiquement par Intlayer pour aider à identifier le dictionnaire et déterminer s'il est local ou distant, ainsi que sa localisation.

##### `localIds` (LocalDictionaryId[])

Pour les dictionnaires fusionnés, ce tableau contient les identifiants de tous les dictionnaires qui ont été fusionnés ensemble. Utile pour suivre la source du contenu fusionné.

##### `filePath` (string)

Le chemin du fichier du dictionnaire local, indiquant à partir de quel fichier `.content` le dictionnaire a été généré. Aide au débogage et au suivi de la source.

##### `versions` (string[])

Pour les dictionnaires distants, ce tableau contient toutes les versions disponibles du dictionnaire. Aide à suivre quelles versions sont disponibles pour utilisation.

##### `autoFilled` (true)

Indique si le dictionnaire a été automatiquement rempli à partir de sources externes. En cas de conflits, les dictionnaires de base prévaudront sur les dictionnaires auto-remplis.

## Types de nœuds de contenu

Intlayer fournit plusieurs types de nœuds de contenu spécialisés qui étendent les valeurs primitives de base :

### Contenu de traduction (`t`)

Contenu multilingue qui varie selon la locale :

```typescript
import { t } from "intlayer";

// TypeScript/JavaScript
multilingualContent: t({
  en: "Welcome to our website",
  fr: "Bienvenue sur notre site web",
  es: "Bienvenido a nuestro sitio web",
});
```

### Contenu conditionnel (`cond`)

Contenu qui change en fonction de conditions booléennes :

```typescript
import { cond } from "intlayer";

conditionalContent: cond({
  true: "User is logged in",
  false: "Please log in to continue",
});
```

### Contenu d'énumération (`enu`)

Contenu qui varie en fonction de valeurs énumérées :

```typescript
import { enu } from "intlayer";

statusContent: enu({
  pending: "Votre demande est en attente",
  approved: "Votre demande a été approuvée",
  rejected: "Votre demande a été rejetée",
});
```

### Contenu d'insertion (`insert`)

Contenu qui peut être inséré dans un autre contenu :

```typescript
import { insert } from "intlayer";

insertionContent: insert("Ce texte peut être inséré n'importe où");
```

### Contenu imbriqué (`nest`)

Références à d'autres dictionnaires :

```typescript
import { nest } from "intlayer";

nestedContent: nest("about-page");
```

### Contenu Markdown (`md`)

Contenu riche au format Markdown :

```typescript
import { md } from "intlayer";

markdownContent: md(
  "# Bienvenue\n\nCeci est un texte en **gras** avec des [liens](https://example.com)"
);
```

### Contenu HTML (`html`)

Contenu HTML riche pouvant utiliser des balises standard ou des composants personnalisés :

```typescript
import { html, file, t } from "intlayer";

// HTML en ligne
htmlContent: html("<p>Hello <strong>World</strong></p>");

// HTML par locale à partir de fichiers externes
localizedHtmlContent: t({
  en: html(file("./content.en.html")),
  fr: html(file("./content.fr.html")),
});
```

### Contenu selon le genre (`gender`)

Contenu qui varie selon le genre :

```typescript
import { gender } from "intlayer";

genderContent: gender({
  male: "Il est développeur",
  female: "Elle est développeuse",
  other: "Ils sont développeurs",
});
```

### Contenu de fichier (`file`)

Références à des fichiers externes :

```typescript
import { file } from "intlayer";

fileContent: file("./path/to/content.txt");
```

## Création de fichiers de contenu

### Structure de base d’un fichier de contenu

Un fichier de contenu exporte un objet par défaut qui satisfait le type `Dictionary` :

```typescript
// example.content.ts
import { t, cond, nest, md, insert, file } from "intlayer";

export default {
  key: "welcome-page",
  title: "Contenu de la page d’accueil",
  description:
    "Contenu pour la page d'accueil principale incluant la section héro et les fonctionnalités",
  tags: ["page", "accueil", "page-d-accueil"],
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

### Fichier de contenu JSON

Vous pouvez également créer des fichiers de contenu au format JSON :

```json
{
  "key": "welcome-page",
  "title": "Contenu de la page d'accueil",
  "description": "Contenu pour la page d'accueil principale",
  "tags": ["page", "accueil"],
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

### Fichiers de contenu par langue

Pour les dictionnaires par langue, spécifiez la propriété `locale` :

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

## Extensions des fichiers de contenu

Intlayer vous permet de personnaliser les extensions de vos fichiers de déclaration de contenu. Cette personnalisation offre une flexibilité dans la gestion de projets à grande échelle et aide à éviter les conflits avec d'autres modules.

### Extensions par défaut

Par défaut, Intlayer surveille tous les fichiers avec les extensions suivantes pour les déclarations de contenu :

- `.content.json`
- `.content.json5`
- `.content.jsonc`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

Ces extensions par défaut conviennent à la plupart des applications. Cependant, lorsque vous avez des besoins spécifiques, vous pouvez définir des extensions personnalisées pour rationaliser le processus de construction et réduire le risque de conflits avec d'autres composants.

> Pour personnaliser les extensions de fichiers qu'Intlayer utilise pour identifier les fichiers de déclaration de contenu, vous pouvez les spécifier dans le fichier de configuration d'Intlayer. Cette approche est bénéfique pour les projets à grande échelle où limiter la portée du processus de surveillance améliore les performances de construction.

## Concepts Avancés

### Fusion de Dictionnaires

Lorsque plusieurs dictionnaires ont la même clé, Intlayer les fusionne automatiquement. Le comportement de fusion dépend de plusieurs facteurs :

- **Priorité** : Les dictionnaires avec des valeurs de `priority` plus élevées remplacent ceux avec des valeurs plus basses
- **Auto-remplissage vs Base** : Les dictionnaires de base remplacent les dictionnaires auto-remplis
- **Localisation** : Les dictionnaires locaux remplacent les dictionnaires distants (lorsque les priorités sont égales)

### Sécurité de type

Intlayer offre un support complet de TypeScript pour les fichiers de contenu :

```typescript
// Définissez votre type de contenu
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

// Utilisez-le dans votre dictionnaire
export default {
  key: "welcome-page",
  content: {
    // TypeScript fournira l'autocomplétion et la vérification de type
    hero: {
      title: "Bienvenue",
      subtitle: "Créez des applications incroyables",
      cta: "Commencer",
    },
  },
} satisfies Dictionary<WelcomePageContent>;
```

### Imbrication de nœuds

Vous pouvez sans problème imbriquer des fonctions les unes dans les autres.

Exemple :

```javascript fileName="src/example.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` retourne `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Contenu composite imbriquant condition, énumération et contenu multilingue
    // `getIntlayer('page','en').advancedContent(true)(10)` retourne 'Multiple items found'
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

### Bonnes pratiques

1. **Conventions de nommage** :
   - Utilisez le kebab-case pour les clés du dictionnaire (`"about-page-meta"`)
   - Regroupez le contenu lié sous le même préfixe de clé

2. **Organisation du contenu** :
   - Gardez le contenu lié ensemble dans le même dictionnaire
   - Utilisez des objets imbriqués pour organiser des structures de contenu complexes
   - Exploitez les tags pour la catégorisation
   - Utilisez `autoFill` pour remplir automatiquement les traductions manquantes

3. **Performance** :
   - Ajustez la configuration du contenu pour limiter la portée des fichiers surveillés
   - Utilisez des dictionnaires en direct uniquement lorsque des mises à jour en temps réel sont nécessaires (par exemple, tests A/B, etc.)
   - Assurez-vous que le plugin de transformation de build (`@intlayer/swc` ou `@intlayer/babel`) est activé pour optimiser le dictionnaire au moment de la compilation

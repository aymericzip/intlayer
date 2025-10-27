---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: Documentation de la fonction t | express-intlayer
description: Découvrez comment utiliser la fonction t pour le package express-intlayer
keywords:
  - t
  - traduction
  - Intlayer
  - Internationalisation
  - Documentation
  - Express
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - express-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Historique initial
---

# Documentation : Fonction `t` dans `express-intlayer`

La fonction `t` dans le package `express-intlayer` est l'utilitaire principal pour fournir des réponses localisées dans votre application Express. Elle simplifie l'internationalisation (i18n) en sélectionnant dynamiquement le contenu en fonction de la langue préférée de l'utilisateur.

---

## Vue d'ensemble

La fonction `t` est utilisée pour définir et récupérer des traductions pour un ensemble donné de langues. Elle détermine automatiquement la langue appropriée à retourner en fonction des paramètres de la requête du client, tels que l'en-tête `Accept-Language`. Si la langue préférée n'est pas disponible, elle revient élégamment à la locale par défaut spécifiée dans votre configuration.

---

## Fonctionnalités clés

- **Localisation dynamique** : sélectionne automatiquement la traduction la plus appropriée pour le client.
- **Retour à la locale par défaut** : Reviens à une locale par défaut si la langue préférée du client n'est pas disponible, garantissant ainsi la continuité de l'expérience utilisateur.
- **Léger et rapide** : Conçu pour des applications haute performance, assurant une surcharge minimale.
- **Support du mode strict** : Imposer une adhérence stricte aux locales déclarées pour un comportement fiable.

---

## Signature de la fonction

```typescript
t(translations: Record<string, string>): string;
```

### Paramètres

- `translations` : Un objet où les clés sont des codes de locale (par exemple, `en`, `fr`, `es-MX`) et les valeurs sont les chaînes traduites correspondantes.

### Retour

- Une chaîne représentant le contenu dans la langue préférée du client.

---

## Chargement du gestionnaire de requêtes d'internationalisation

Pour garantir que la fonctionnalité d'internationalisation fournie par `express-intlayer` fonctionne correctement, vous **devez** charger le middleware d'internationalisation au début de votre application Express. Cela active la fonction `t` et assure une gestion correcte de la détection de la locale et de la traduction.

Placez le middleware `app.use(intlayer())` **avant toutes les routes** de votre application afin que toutes les routes bénéficient de l'internationalisation :

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Charger le gestionnaire de requêtes d'internationalisation
app.use(intlayer());

// Définissez vos routes après avoir chargé le middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// Charger le gestionnaire de requêtes d'internationalisation
app.use(intlayer());

// Définir vos routes après avoir chargé le middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer } = require("express-intlayer");

const app = express();

// Charger le gestionnaire de requêtes d'internationalisation
app.use(intlayer());

// Définir vos routes après avoir chargé le middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

### Pourquoi cela est nécessaire

- **Détection de la langue** : Le middleware `intlayer` traite les requêtes entrantes pour détecter la langue préférée de l'utilisateur en se basant sur les en-têtes, les cookies ou d'autres méthodes configurées.
- **Contexte de traduction** : Configure le contexte nécessaire pour que la fonction `t` fonctionne correctement, garantissant que les traductions sont retournées dans la bonne langue.
- **Prévention des erreurs** : Sans ce middleware, l'utilisation de la fonction `t` entraînera des erreurs d'exécution car les informations de langue nécessaires ne seront pas disponibles.

---

## Exemples d'utilisation

### Exemple de base

Servir du contenu localisé dans différentes langues :

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

**Requêtes des clients :**

- Un client avec `Accept-Language: fr` recevra `Bienvenue!`.
- Un client avec `Accept-Language: es` recevra `¡Bienvenido!`.
- Un client avec `Accept-Language: de` recevra `Welcome!` (locale par défaut).

### Gestion des erreurs

Fournir des messages d'erreur en plusieurs langues :

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
// Gestion des erreurs avec messages multilingues
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

---

### Utilisation des variantes de locale

Spécifiez des traductions pour des variantes spécifiques de locale :

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

---

## Sujets Avancés

### Mécanisme de Repli

Si une locale préférée n'est pas disponible, la fonction `t` utilisera la locale par défaut définie dans la configuration :

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {5-6} fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript {5-6} fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

Par exemple :

- Si `defaultLocale` est `Locales.CHINESE` et qu'un client demande `Locales.DUTCH`, la traduction retournée sera celle de `Locales.CHINESE`.
- Si `defaultLocale` n'est pas défini, la fonction `t` utilisera par défaut la valeur de `Locales.ENGLISH`.

---

### Application du Mode Strict

Configurez la fonction `t` pour appliquer une stricte conformité aux locales déclarées :

| Mode        | Comportement                                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `strict`    | Toutes les locales déclarées doivent avoir des traductions fournies. Les locales manquantes génèrent des erreurs.               |
| `inclusive` | Les locales déclarées doivent avoir des traductions. Les locales manquantes déclenchent des avertissements mais sont acceptées. |
| `loose`     | Toute locale existante est acceptée, même si elle n'est pas déclarée.                                                           |

Exemple de configuration :

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Votre configuration existante
  internationalization: {
    // ... Votre configuration d'internationalisation existante
    strictMode: "strict", // Appliquer le mode strict
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {7} fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Votre configuration existante
  internationalization: {
    // ... Votre configuration d'internationalisation existante
    strictMode: "strict", // Appliquer le mode strict
  },
};

export default config;
```

```javascript {7} fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Votre configuration existante
  internationalization: {
    // ... Votre configuration d'internationalisation existante
    strictMode: "strict", // Appliquer le mode strict
  },
};

module.exports = config;
```

---

### Intégration TypeScript

La fonction `t` est typée de manière sécurisée lorsqu'elle est utilisée avec TypeScript. Définissez un objet de traductions typé en toute sécurité :

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "express-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import { type LanguageContent } from "express-intlayer";

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const { type LanguageContent } = require("express-intlayer");

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

---

### Erreurs courantes et dépannage

| Problème                         | Cause                                      | Solution                                                            |
| -------------------------------- | ------------------------------------------ | ------------------------------------------------------------------- |
| Fonction `t` ne fonctionne pas   | Middleware non chargé                      | Assurez-vous que `app.use(intlayer())` est ajouté avant les routes. |
| Erreur de traductions manquantes | Mode strict activé sans toutes les locales | Fournissez toutes les traductions requises.                         |

---

## Conseils pour une utilisation efficace

1. **Centraliser les traductions** : Utilisez un module centralisé ou des fichiers JSON pour gérer les traductions afin d'améliorer la maintenabilité.
2. **Valider les traductions** : Assurez-vous que chaque variante linguistique dispose d'une traduction correspondante pour éviter les retours inutiles.
3. **Combiner avec l'internationalisation frontend** : Synchronisez avec l'internationalisation côté frontend pour une expérience utilisateur fluide dans toute l'application.
4. **Évaluer les performances** : Testez les temps de réponse de votre application lors de l'ajout de traductions pour garantir un impact minimal.

---

## Conclusion

1. **Centraliser les traductions** : Utilisez un module centralisé ou des fichiers JSON pour gérer les traductions afin d'améliorer la maintenabilité.
2. **Valider les traductions** : Assurez-vous que chaque variante linguistique dispose d'une traduction correspondante pour éviter les retours inutiles.
3. **Combiner avec l'i18n frontend** : Synchronisez avec l'internationalisation frontend pour une expérience utilisateur fluide dans toute l'application.
4. **Évaluer les performances** : Testez les temps de réponse de votre application lors de l'ajout de traductions pour garantir un impact minimal.

---

## Conclusion

La fonction `t` est un outil puissant pour l'internationalisation backend. En l'utilisant efficacement, vous pouvez créer une application plus inclusive et conviviale pour un public mondial. Pour une utilisation avancée et des options de configuration détaillées, référez-vous à la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

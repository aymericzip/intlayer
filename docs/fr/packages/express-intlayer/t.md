# Documentation: `t` Fonction dans `express-intlayer`

La fonction `t` du paquet `express-intlayer` est l'outil essentiel pour fournir des réponses localisées dans votre application Express. Elle simplifie l'internationalisation (i18n) en sélectionnant dynamiquement le contenu en fonction de la langue préférée de l'utilisateur.

---

## Aperçu

La fonction `t` est utilisée pour définir et récupérer des traductions pour un ensemble donné de langues. Elle détermine automatiquement la langue appropriée à retourner en fonction des paramètres de la requête du client, tels que l'en-tête `Accept-Language`. Si la langue préférée n'est pas disponible, elle bascule élégamment vers la locale par défaut spécifiée dans votre configuration.

---

## Caractéristiques Clés

- **Localisation Dynamique** : Sélectionne automatiquement la traduction la plus appropriée pour le client.
- **Retour à la Locale Par Défaut** : Bascule vers une locale par défaut si la langue préférée du client n'est pas disponible, garantissant ainsi la continuité de l'expérience utilisateur.
- **Léger et Rapide** : Conçu pour des applications haute performance, garantissant un overhead minimal.
- **Support du Mode Strict** : Imposer une adhésion stricte aux locales déclarées pour un comportement fiable.

---

## Signature de Fonction

```typescript
t(translations: Record<string, string>): string;
```

### Paramètres

- `translations`: Un objet où les clés sont des codes de locale (par exemple, `en`, `fr`, `es-MX`) et les valeurs sont les chaînes traduites correspondantes.

### Retours

- Une chaîne représentant le contenu dans la langue préférée du client.

---

## Chargement du Gestionnaire de Requêtes d'Internationalisation

Pour garantir que la fonctionnalité d'internationalisation fournie par `express-intlayer` fonctionne correctement, vous **devez** charger le middleware d'internationalisation au début de votre application Express. Cela active la fonction `t` et garantit une bonne gestion de la détection de locale et de la traduction.

Placez le middleware `app.use(intlayer())` **avant toutes les routes** dans votre application pour garantir que toutes les routes bénéficient de l'internationalisation :

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Charger le gestionnaire de requêtes d'internationalisation
app.use(intlayer());

// Définir vos routes après le chargement du middleware
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

// Définir vos routes après le chargement du middleware
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

// Définir vos routes après le chargement du middleware
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

### Pourquoi Ceci est Nécessaire

- **Détection de Locale** : Le middleware `intlayer` traite les requêtes entrantes pour détecter la locale préférée de l'utilisateur basée sur les en-têtes, les cookies ou d'autres méthodes configurées.
- **Contexte de Traduction** : Met en place le contexte nécessaire pour que la fonction `t` fonctionne correctement, garantissant que les traductions sont retournées dans la langue correcte.
- **Prévention d'Erreurs** : Sans ce middleware, l'utilisation de la fonction `t` entraînera des erreurs à l'exécution car les informations de locale nécessaires ne seront pas disponibles.

---

## Exemples d'Utilisation

### Exemple Simple

Servez du contenu localisé dans différentes langues :

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

**Requêtes Client :**

- Un client avec `Accept-Language: fr` recevra `Bienvenue!`.
- Un client avec `Accept-Language: es` recevra `¡Bienvenido!`.
- Un client avec `Accept-Language: de` recevra `Welcome!` (locale par défaut).

### Gestion des Erreurs

Fournir des messages d'erreur dans plusieurs langues :

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

### Utilisation des Variantes de Locale

Spécifiez des traductions pour des variantes spécifiques à la locale :

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

### Mécanisme de Retour

Si une locale préférée n'est pas disponible, la fonction `t` retournera la locale par défaut définie dans la configuration :

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

- Si `defaultLocale` est `Locales.CHINESE` et un client demande `Locales.DUTCH`, la traduction retournée sera la valeur de `Locales.CHINESE`.
- Si `defaultLocale` n'est pas défini, la fonction `t` basculera vers la valeur de `Locales.ENGLISH`.

---

### Application du Mode Strict

Configurez la fonction `t` pour imposer une adhésion stricte aux locales déclarées :

| Mode            | Comportement                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `strict`        | Toutes les locales déclarées doivent avoir des traductions fournies. Les locales manquantes généreront des erreurs.             |
| `required_only` | Les locales déclarées doivent avoir des traductions. Les locales manquantes déclenchent des avertissements mais sont acceptées. |
| `loose`         | Toute locale existante est acceptée, même si elle n'est pas déclarée.                                                           |

Exemple de Configuration :

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

La fonction `t` est sécurisée par type lorsqu'elle est utilisée avec TypeScript. Définissez un objet de traductions sécurisé par type :

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

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

---

### Erreurs Courantes et Dépannage

| Problème                         | Cause                                      | Solution                                                            |
| -------------------------------- | ------------------------------------------ | ------------------------------------------------------------------- |
| Fonction `t` non fonctionnelle   | Middleware non chargé                      | Assurez-vous que `app.use(intlayer())` est ajouté avant les routes. |
| Erreur de traductions manquantes | Mode strict activé sans toutes les locales | Fournissez toutes les traductions requises.                         |

---

## Conseils pour une Utilisation Efficace

1. **Centralisez les Traductions** : Utilisez un module centralisé ou des fichiers JSON pour gérer les traductions afin d'améliorer la maintenabilité.
2. **Validez les Traductions** : Assurez-vous que chaque variante de langue a une traduction correspondante pour éviter de tomber inutilement en arrière.
3. **Combinez avec l'i18n Frontend** : Synchronisez avec l'internationalisation côté frontend pour une expérience utilisateur homogène à travers l'application.
4. **Évaluez les Performances** : Testez les temps de réponse de votre application lors de l'ajout de traductions pour garantir un impact minimal.

---

## Conclusion

La fonction `t` est un outil puissant pour l'internationalisation backend. En l'utilisant efficacement, vous pouvez créer une application plus inclusive et conviviale pour un public mondial. Pour un usage avancé et des options de configuration détaillées, consultez la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

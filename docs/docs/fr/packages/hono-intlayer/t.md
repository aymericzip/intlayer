---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: Documentation de la Fonction t | hono-intlayer
description: Découvrez comment utiliser la fonction t pour le paquet hono-intlayer
keywords:
  - t
  - traduction
  - Intlayer
  - Internationalisation
  - Documentation
  - Hono
  - JavaScript
slugs:
  - doc
  - packages
  - hono-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Historique initial
---

# Documentation : Fonction `t` dans `hono-intlayer`

La fonction `t` dans le paquet `hono-intlayer` est l'utilitaire central pour fournir des réponses localisées dans votre application Hono. Elle simplifie l'internationalisation (i18n) en sélectionnant dynamiquement le contenu en fonction de la langue préférée de l'utilisateur.

---

## Aperçu

La fonction `t` est utilisée pour définir et récupérer des traductions pour un ensemble donné de langues. Elle détermine automatiquement la langue appropriée à renvoyer en fonction des paramètres de requête du client, tels que l'en-tête `Accept-Language`. Si la langue préférée est indisponible, elle se replie gracieusement sur la langue par défaut spécifiée dans votre configuration.

---

## Caractéristiques Clés

- **Localisation Dynamique** : Sélectionne automatiquement la traduction la plus appropriée pour le client.
- **Repli sur la Langue par Défaut** : Revient à une langue par défaut si la langue préférée du client n'est pas disponible, assurant la continuité de l'expérience utilisateur.
- **Léger et Rapide** : Conçu pour des applications haute performance, garantissant un impact minimal.
- **Support du Mode Strict** : Impose le respect strict des langues déclarées pour un comportement fiable.

---

## Signature de la Fonction

```typescript
t(translations: Record<string, string>): string;
```

### Paramètres

- `translations` : Un objet dont les clés sont des codes de langue (ex: `en`, `fr`, `es-MX`) et les valeurs sont les chaînes de caractères traduites correspondantes.

### Retour

- Une chaîne de caractères représentant le contenu dans la langue préférée du client.

---

## Chargement du Gestionnaire de Requêtes d'Internationalisation

Pour garantir que la fonctionnalité d'internationalisation fournie par `hono-intlayer` fonctionne correctement, vous **devez** charger le middleware d'internationalisation au début de votre application Hono. Cela active la fonction `t` et assure une gestion appropriée de la détection de la langue et de la traduction.

Placez le middleware `app.use("*", intlayer())` **avant toutes les routes** de votre application pour vous assurer que toutes les routes bénéficient de l'internationalisation :

```typescript {6} fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// Charger le gestionnaire de requêtes d'internationalisation
app.use("*", intlayer());

// Définissez vos routes après avoir chargé le middleware
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde !",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {6} fileName="src/index.mjs" codeFormat="esm"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// Charger le gestionnaire de requêtes d'internationalisation
app.use("*", intlayer());

// Définissez vos routes après avoir chargé le middleware
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde !",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {6} fileName="src/index.cjs" codeFormat="commonjs"
const { Hono } = require("hono");
const { intlayer, t } = require("hono-intlayer");

const app = new Hono();

// Charger le gestionnaire de requêtes d'internationalisation
app.use("*", intlayer());

// Définissez vos routes après avoir chargé le middleware
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde !",
      es: "¡Hola, Mundo!",
    })
  );
});
```

### Pourquoi c'est Requis

- **Détection de la Langue** : Le middleware `intlayer` traite les requêtes entrantes pour détecter la langue préférée de l'utilisateur en fonction des en-têtes, cookies ou autres méthodes configurées.
- **Contexte de Traduction** : Configure le contexte nécessaire pour que la fonction `t` fonctionne correctement, garantissant que les traductions sont renvoyées dans la bonne langue.
- **Prévention des Erreurs** : Sans ce middleware, l'utilisation de la fonction `t` entraînera des erreurs d'exécution car les informations de langue nécessaires ne seront pas disponibles.

---

## Exemples d'Utilisation

### Exemple de Base

Servir du contenu localisé dans différentes langues :

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (c) => {
  return c.text(
    t({
      en: "Welcome!",
      fr: "Bienvenue !",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/", (c) => {
  return c.text(
    t({
      en: "Welcome!",
      fr: "Bienvenue !",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/", (c) => {
  return c.text(
    t({
      en: "Welcome!",
      fr: "Bienvenue !",
      es: "¡Bienvenido!",
    })
  );
});
```

**Requêtes Clients :**

- Un client avec `Accept-Language: fr` recevra `Bienvenue !`.
- Un client avec `Accept-Language: es` recevra `¡Bienvenido!`.
- Un client avec `Accept-Language: de` recevra `Welcome!` (langue par défaut).

### Gestion des Erreurs

Fournir des messages d'erreur dans plusieurs langues :

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (c) => {
  return c.text(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    }),
    500
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/error", (c) => {
  return c.text(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    }),
    500
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/error", (c) => {
  return c.text(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    }),
    500
  );
});
```

---

### Utilisation des Variantes de Langue

Spécifiez des traductions pour des variantes spécifiques à une langue :

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (c) => {
  return c.text(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour !",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

---

## Sujets Avancés

### Mécanisme de Repli

Si une langue préférée est indisponible, la fonction `t` se repliera sur la langue par défaut définie dans la configuration :

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

---

### Application du Mode Strict

Configurez la fonction `t` pour imposer un respect strict des langues déclarées :

| Mode        | Comportement                                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `strict`    | Toutes les langues déclarées doivent avoir des traductions fournies. Les langues manquantes jetteront des erreurs.              |
| `inclusive` | Les langues déclarées doivent avoir des traductions. Les langues manquantes déclenchent des avertissements mais sont acceptées. |
| `loose`     | Toute langue existante est acceptée, même si elle n'est pas déclarée.                                                           |

---

### Intégration TypeScript

La fonction `t` est de type sécurisé lorsqu'elle est utilisée avec TypeScript. Définissez un objet de traductions sécurisé :

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "hono-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour !",
  es: "¡Buenos días!",
};

app.get("/morning", (c) => {
  return c.text(t(translations));
});
```

---

### Erreurs Courantes et Dépannage

| Problème                          | Cause                                      | Solution                                                                 |
| --------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------ |
| La fonction `t` ne fonctionne pas | Middleware non chargé                      | Assurez-vous que `app.use("*", intlayer())` est ajouté avant les routes. |
| Erreur de traductions manquantes  | Mode strict activé sans toutes les langues | Fournissez toutes les traductions requises.                              |

---

## Conclusion

La fonction `t` est un outil puissant pour l'internationalisation backend. En l'utilisant efficacement, vous pouvez créer une application plus inclusive et conviviale pour un public mondial. Pour une utilisation avancée et des options de configuration détaillées, reportez-vous à la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

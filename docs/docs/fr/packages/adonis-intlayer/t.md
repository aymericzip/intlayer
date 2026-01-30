---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: Documentation de la fonction t | adonis-intlayer
description: Découvrez comment utiliser la fonction t pour le package adonis-intlayer
keywords:
  - t
  - traduction
  - Intlayer
  - Internationalisation
  - Documentation
  - AdonisJS
  - JavaScript
slugs:
  - doc
  - packages
  - adonis-intlayer
  - t
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Documentation initiale
---

# Documentation : Fonction `t` dans `adonis-intlayer`

La fonction `t` du package `adonis-intlayer` est l'utilitaire principal pour fournir des réponses localisées dans votre application AdonisJS. Elle simplifie l'internationalisation (i18n) en sélectionnant dynamiquement le contenu en fonction de la langue préférée de l'utilisateur.

---

## Aperçu

La fonction `t` est utilisée pour définir et récupérer des traductions pour un ensemble donné de langues. Elle détermine automatiquement la langue appropriée à retourner en fonction des paramètres de la requête du client, tels que l'en-tête `Accept-Language`. Si la langue préférée est indisponible, elle revient gracieusement à la locale par défaut spécifiée dans votre configuration.

---

## Fonctionnalités Clés

- **Localisation Dynamique** : Sélectionne automatiquement la traduction la plus appropriée pour le client.
- **Repli sur la Locale par Défaut** : Revient à une locale par défaut si la langue préférée du client n'est pas disponible, assurant la continuité de l'expérience utilisateur.
- **Contexte Asynchrone** : Fonctionne de manière transparente au sein du cycle de vie des requêtes AdonisJS en utilisant l'Async Local Storage.
- **Support TypeScript** : Applique la sécurité de type pour vos traductions.

---

## Signature de la Fonction

```typescript
t(translations: Record<string, any>): any;
```

### Paramètres

- `translations` : Un objet où les clés sont les codes de locale (ex: `en`, `fr`, `es`) et les valeurs sont le contenu traduit correspondant.

### Retourne

- Le contenu représentant la langue préférée du client.

---

## Chargement du Middleware

Pour s'assurer que la fonction `t` fonctionne correctement, vous **devez** enregistrer le middleware `intlayer` dans votre application AdonisJS.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

---

## Exemples d'Utilisation

### Exemple de Base

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Welcome!",
    fr: "Bienvenue !",
    es: "¡Bienvenido!",
  });
});
```

### Utilisation dans les Contrôleurs

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour depuis le contrôleur",
      })
    );
  }
}
```

---

## Sujets Avancés

### Mécanisme de Repli

Si une locale préférée est indisponible, la fonction `t` se repliera sur la locale par défaut définie dans votre fichier `intlayer.config.ts`.

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Intégration TypeScript

La fonction `t` est sécurisée au niveau des types lorsqu'elle est utilisée avec des dictionnaires définis. Pour plus de détails, reportez-vous à la [documentation TypeScript](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

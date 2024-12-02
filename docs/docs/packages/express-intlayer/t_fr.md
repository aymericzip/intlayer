# Documentation : Fonction `t` dans `express-intlayer`

La fonction `t` du package `express-intlayer` est l'outil central pour fournir des réponses localisées dans votre application Express. Elle simplifie l'internationalisation (i18n) en sélectionnant dynamiquement le contenu en fonction de la langue préférée de l'utilisateur.

---

## Vue d'ensemble

La fonction `t` est utilisée pour définir et récupérer des traductions pour un ensemble de langues. Elle détermine automatiquement la langue appropriée à retourner en se basant sur les paramètres de la requête client, tels que l'en-tête `Accept-Language`. Si la langue préférée n'est pas disponible, elle revient gracieusement à la langue par défaut spécifiée dans votre configuration.

---

## Principales caractéristiques

- **Localisation dynamique** : Sélectionne automatiquement la traduction la plus adaptée pour le client.
- **Retour à la langue par défaut** : Utilise une langue par défaut si la langue préférée du client n'est pas disponible, assurant ainsi une continuité de l'expérience utilisateur.
- **Léger et rapide** : Conçu pour des applications haute performance avec un impact minimal.
- **Support du mode strict** : Applique un respect strict des locales déclarées pour un comportement fiable.

---

## Signature de la fonction

```typescript
t(translations: Record<string, string>): string;
```

### Paramètres

- `translations` : Un objet où les clés sont des codes de langue (par exemple, `en`, `fr`, `es-MX`) et les valeurs sont les chaînes traduites correspondantes.

### Valeur de retour

- Une chaîne de caractères représentant le contenu dans la langue préférée du client.

---

## Chargement du gestionnaire de requêtes d'internationalisation

Pour que les fonctionnalités d'internationalisation fournies par `express-intlayer` fonctionnent correctement, vous **devez** charger le middleware d'internationalisation au début de votre application Express. Cela active la fonction `t` et garantit une détection correcte de la langue et la gestion des traductions.

### Configuration du middleware requise

```typescript
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Charger le gestionnaire de requêtes d'internationalisation
app.use(intlayer());
```

### Placement dans l'application

Placez le middleware `app.use(intlayer())` **avant toute route** dans votre application pour que toutes les routes bénéficient de l'internationalisation :

```typescript
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

### Pourquoi est-ce nécessaire ?

- **Détection de la langue** : Le middleware `intlayer` traite les requêtes entrantes pour détecter la langue préférée de l'utilisateur à partir des en-têtes, des cookies ou d'autres méthodes configurées.
- **Contexte de traduction** : Configure le contexte nécessaire pour que la fonction `t` fonctionne correctement, garantissant que les traductions sont retournées dans la langue appropriée.
- **Prévention des erreurs** : Sans ce middleware, l'utilisation de la fonction `t` entraînera des erreurs d'exécution car les informations de langue nécessaires ne seront pas disponibles.

---

## Exemples d'utilisation

### Exemple basique

Servir du contenu localisé dans différentes langues :

```typescript
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

**Requêtes client :**

- Un client avec `Accept-Language: fr` recevra `Bienvenue!`.
- Un client avec `Accept-Language: es` recevra `¡Bienvenido!`.
- Un client avec `Accept-Language: de` recevra `Welcome!` (langue par défaut).

### Gestion des erreurs

Fournir des messages d'erreur dans plusieurs langues :

```typescript
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

### Utilisation des variantes de langue

Spécifiez des traductions pour des variantes spécifiques de locale :

```typescript
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

## Sujets avancés

### Mécanisme de retour

Si une locale préférée n'est pas disponible, la fonction `t` revient à la langue par défaut définie dans la configuration :

```typescript
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};
```

Par exemple :

- Si `defaultLocale` est `Locales.CHINESE` et qu'un client demande `Locales.DUTCH`, la traduction retournée sera celle de `Locales.CHINESE`.
- Si `defaultLocale` n'est pas défini, la fonction `t` reviendra à la valeur de `Locales.ENGLISH`.

---

### Application du mode strict

Configurez la fonction `t` pour appliquer un respect strict des locales déclarées :

| Mode            | Comportement                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `strict`        | Toutes les locales déclarées doivent avoir des traductions fournies. Les locales manquantes provoquent des erreurs.             |
| `required_only` | Les locales déclarées doivent avoir des traductions. Les locales manquantes déclenchent des avertissements mais sont acceptées. |
| `loose`         | Toute locale existante est acceptée, même si elle n'est pas déclarée.                                                           |

Exemple de configuration :

```typescript
const config = {
  internationalization: {
    strictMode: "strict", // Applique le mode strict
  },
};
```

---

### Intégration TypeScript

La fonction `t` est sécurisée par types lorsqu'elle est utilisée avec TypeScript. Définissez un objet de traductions type-safe :

```typescript
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

---

### Erreurs courantes et dépannage

| Problème                         | Cause                                      | Solution                                                            |
| -------------------------------- | ------------------------------------------ | ------------------------------------------------------------------- |
| Fonction `t` non fonctionnelle   | Middleware non chargé                      | Assurez-vous que `app.use(intlayer())` est ajouté avant les routes. |
| Erreur de traductions manquantes | Mode strict activé sans toutes les locales | Fournissez toutes les traductions nécessaires.                      |

---

## Conseils pour une utilisation efficace

1. **Centralisez les traductions** : Utilisez un module centralisé ou des fichiers JSON pour gérer les traductions et améliorer leur maintenabilité.
2. **Validez les traductions** : Assurez-vous que chaque variante de langue a une traduction correspondante pour éviter des retours inutiles.
3. **Combinez avec i18n frontend** : Synchronisez avec l'internationalisation du frontend pour une expérience utilisateur homogène.
4. **Mesurez les performances** : Testez les temps de réponse de votre application en ajoutant des traductions pour limiter leur impact.

---

## Conclusion

La fonction `t` est un outil puissant pour l'internationalisation côté backend. En l'utilisant efficacement, vous pouvez créer une application plus inclusive et conviviale pour un public mondial. Pour une utilisation avancée et des options de configuration détaillées, consultez la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/configuration_fr.md).

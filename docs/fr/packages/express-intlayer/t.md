# Documentation: `t` Fonction dans `express-intlayer`

La fonction `t` dans le package `express-intlayer` est l'utilitaire principal pour fournir des réponses localisées dans votre application Express. Elle simplifie l'internationalisation (i18n) en sélectionnant dynamiquement le contenu en fonction de la langue préférée de l'utilisateur.

---

## Aperçu

La fonction `t` est utilisée pour définir et récupérer des traductions pour un ensemble de langues donné. Elle détermine automatiquement la langue appropriée à retourner en fonction des paramètres de demande du client, tels que l'en-tête `Accept-Language`. Si la langue préférée n'est pas disponible, elle revient gracieusement à la langue par défaut spécifiée dans votre configuration.

---

## Caractéristiques Clés

- **Localisation Dynamique** : Sélectionne automatiquement la traduction la plus appropriée pour le client.
- **Retour à la Langue par Défaut** : Retourne à une langue par défaut si la langue préférée du client n'est pas disponible, garantissant la continuité de l'expérience utilisateur.
- **Léger et Rapide** : Conçu pour des applications à haute performance, garantissant un minimum de surcharge.
- **Support du Mode Strict** : Imposer le respect strict des langues déclarées pour un comportement fiable.

---

## Signature de la Fonction

```typescript
t(translations: Record<string, string>): string;
```

### Paramètres

- `translations` : Un objet où les clés sont des codes de langue (par exemple, `en`, `fr`, `es-MX`) et les valeurs sont les chaînes traduites correspondantes.

### Renvoie

- Une chaîne représentant le contenu dans la langue préférée du client.

---

## Chargement du Gestionnaire de Requêtes d'Internationalisation

Pour garantir que la fonctionnalité d'internationalisation fournie par `express-intlayer` fonctionne correctement, vous **devez** charger le middleware d'internationalisation au début de votre application Express. Cela active la fonction `t` et assure le traitement approprié de la détection de la langue et de la traduction.

### Configuration de Middleware Requise

```typescript
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Charger le gestionnaire de requêtes d'internationalisation
app.use(intlayer());
```

### Placement dans l'Application

Placez le middleware `app.use(intlayer())` **avant toutes les routes** de votre application pour garantir que toutes les routes profitent de l'internationalisation :

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

### Pourquoi Ceci Est Requis

- **Détection de Langue** : Le middleware `intlayer` traite les requêtes entrantes pour détecter la langue préférée de l'utilisateur basée sur les en-têtes, cookies ou autres méthodes configurées.
- **Contexte de Traduction** : Configure le contexte nécessaire pour que la fonction `t` fonctionne correctement, garantissant que les traductions sont retournées dans la langue correcte.
- **Prévention des Erreurs** : Sans ce middleware, l'utilisation de la fonction `t` entraînera des erreurs d'exécution car les informations de langue nécessaires ne seront pas disponibles.

---

## Exemples d'Utilisation

### Exemple de Base

Servez du contenu localisé dans différentes langues :

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

**Requêtes Clients :**

- Un client avec `Accept-Language: fr` recevra `Bienvenue!`.
- Un client avec `Accept-Language: es` recevra `¡Bienvenido!`.
- Un client avec `Accept-Language: de` recevra `Welcome!` (langue par défaut).

### Gestion des Erreurs

Fournissez des messages d'erreur dans plusieurs langues :

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

### Utilisation de Variantes de Langue

Spécifiez des traductions pour des variantes spécifiques à la langue :

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

## Sujets Avancés

### Mécanisme de Retour

Si une langue préférée n'est pas disponible, la fonction `t` reviendra à la langue par défaut définie dans la configuration :

```typescript
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};
```

Par exemple :

- Si `defaultLocale` est `Locales.CHINESE` et un client demande `Locales.DUTCH`, la traduction retournée sera la valeur de `Locales.CHINESE`.
- Si `defaultLocale` n'est pas défini, la fonction `t` reviendra à la valeur de `Locales.ENGLISH`.

---

### Application du Mode Strict

Configurez la fonction `t` pour imposer un respect strict des langues déclarées :

| Mode            | Comportement                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `strict`        | Tous les langues déclarées doivent avoir des traductions fournies. Les langues manquantes généreront des erreurs.               |
| `required_only` | Les langues déclarées doivent avoir des traductions. Les langues manquantes déclenchent des avertissements mais sont acceptées. |
| `loose`         | Toute langue existante est acceptée, même si elle n'est pas déclarée.                                                           |

Exemple de Configuration :

```typescript
const config = {
  internationalization: {
    strictMode: "strict", // Appliquer le mode strict
  },
};
```

---

### Intégration TypeScript

La fonction `t` est sûre en termes de types lorsqu'elle est utilisée avec TypeScript. Définissez un objet de traductions sûr en termes de types :

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

### Erreurs Communes et Dépannage

| Problème                         | Cause                                      | Solution                                                            |
| -------------------------------- | ------------------------------------------ | ------------------------------------------------------------------- |
| Fonction `t` ne fonctionne pas   | Middleware non chargé                      | Assurez-vous que `app.use(intlayer())` est ajouté avant les routes. |
| Erreur de traductions manquantes | Mode strict activé sans toutes les langues | Fournissez toutes les traductions requises.                         |

---

## Astuces pour une Utilisation Efficace

1. **Centraliser les Traductions** : Utilisez un module centralisé ou des fichiers JSON pour gérer les traductions afin d'améliorer la maintenabilité.
2. **Valider les Traductions** : Assurez-vous que chaque variante de langue a une traduction correspondante pour éviter des retours inutiles.
3. **Combiner avec l'i18n Frontend** : Synchronisez-vous avec l'internationalisation frontend pour une expérience utilisateur fluide dans l'application.
4. **Évaluer les Performances** : Testez les temps de réponse de votre application lors de l'ajout de traductions pour garantir un impact minimal.

---

## Conclusion

La fonction `t` est un outil puissant pour l'internationalisation backend. En l'utilisant efficacement, vous pouvez créer une application plus inclusive et conviviale pour un public mondial. Pour une utilisation avancée et des options de configuration détaillées, reportez-vous à la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: Documentation du Paquet hono-intlayer
description: Middleware Hono pour Intlayer, fournissant des fonctions de traduction et la détection de la langue.
keywords:
  - hono-intlayer
  - hono
  - middleware
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - hono-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: Documentation unifiée pour tous les exports
---

# Paquet hono-intlayer

Le paquet `hono-intlayer` fournit un middleware pour les applications Hono afin de gérer l'internationalisation. Il détecte la langue de l'utilisateur et remplit l'objet de contexte.

## Installation

```bash
npm install hono-intlayer
```

## Exports

### Middleware

Importation :

```tsx
import { intlayer } from "hono-intlayer";
```

| Fonction   | Description                                                                                                                                                                                                                                                                                                       | Doc Associée                                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `intlayer` | Middleware Hono qui intègre Intlayer dans votre application Hono. Gère la détection de la langue à partir du stockage (cookies, en-têtes), remplit le contexte avec `t`, `getIntlayer`, et `getDictionary`, et configure l'espace de noms CLS pour un accès programmatique pendant le cycle de vie de la requête. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/hono-intlayer/intlayer.md) |

### Fonctions

Importation :

```tsx
import { t, getIntlayer, getDictionary } from "hono-intlayer";
```

| Fonction        | Description                                                                                                                                                                                                                                                    | Doc Associée                                                                                          |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `t`             | Fonction de traduction globale qui récupère le contenu pour la langue actuelle dans Hono. Utilise CLS (Async Local Storage) et doit être utilisée dans un contexte de requête géré par le middleware `intlayer`. Peut également être accédée via le contexte.  | [traduction](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/translation.md) |
| `getIntlayer`   | Récupère un dictionnaire par sa clé à partir de la déclaration générée et renvoie son contenu pour la langue spécifiée. Version optimisée de `getDictionary`. Utilise CLS pour accéder au contexte de la requête. Peut également être accédée via le contexte. | -                                                                                                     |
| `getDictionary` | Traite les objets de dictionnaire et renvoie le contenu pour la langue spécifiée. Traite les traductions `t()`, les énumérations, le markdown, l'HTML, etc. Utilise CLS pour accéder au contexte de la requête. Peut également être accédée via le contexte.   | -                                                                                                     |

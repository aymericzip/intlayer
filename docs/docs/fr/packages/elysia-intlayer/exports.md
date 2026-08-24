---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: Documentation du package elysia-intlayer
description: Plugin Elysia pour Intlayer, fournissant des fonctions de traduction et la détection de la locale.
keywords:
  - elysia-intlayer
  - elysia
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - elysia-intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Documentation unifiée pour tous les exports"
author: aymericzip
---

# Package elysia-intlayer

Le package `elysia-intlayer` fournit un plugin pour les applications Elysia afin de gérer l'internationalisation. Il détecte la locale de l'utilisateur et injecte un objet `intlayer` dans le contexte de route.

## Installation

```bash
npm install elysia-intlayer
```

## Exports

### Plugin

Importer :

```tsx
import { intlayer } from "elysia-intlayer";
```

| Fonction   | Description                                                                                                                                                                                                                                                                                                                                      | Documentation associée                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Plugin Elysia qui intègre Intlayer dans votre application Elysia. Gère la détection de la locale depuis le storage (cookies, headers) puis depuis `Accept-Language`, injecte un objet `intlayer` exposant `locale`, `t`, `getIntlayer` et `getDictionary` dans le contexte de route, et met en place le contexte de requête `AsyncLocalStorage`. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/elysia-intlayer/intlayer.md) |

### Fonctions

Importer :

```tsx
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| Fonction        | Description                                                                                                                                                                                                                                                                                           | Documentation associée                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Fonction de traduction globale qui récupère le contenu pour la locale courante dans Elysia. Utilise `AsyncLocalStorage` pour accéder au contexte de requête mis en place par le plugin `intlayer`, et se rabat sur la locale par défaut en dehors de celui-ci. Accessible également via `intlayer.t`. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/translation.md) |
| `getIntlayer`   | Récupère un dictionnaire par sa clé depuis la déclaration générée et renvoie son contenu pour la locale courante. Version optimisée de `getDictionary`. Utilise `AsyncLocalStorage` pour accéder au contexte de requête. Accessible également via `intlayer.getIntlayer`.                             | -                                                                                                      |
| `getDictionary` | Traite les objets dictionnaire et renvoie le contenu pour la locale courante. Traite les traductions `t()`, les énumérations, le markdown, le HTML, etc. Utilise `AsyncLocalStorage` pour accéder au contexte de requête. Accessible également via `intlayer.getDictionary`.                          | -                                                                                                      |

### Types

Importer :

```tsx
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| Type                | Description                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `IntlayerContext`   | Forme de l'objet `intlayer` injecté dans chaque contexte de route : `locale`, `locale_storage`, `locale_detected`, `defaultLocale`, `t`, `getIntlayer`, `getDictionary`. |
| `TranslateFunction` | Signature de la fonction de traduction, qui transforme une locale map en contenu correspondant à la locale de la requête courante.                                       |

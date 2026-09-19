---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Documentation du hook useIntlayer | astro-intlayer
description: Découvrez comment utiliser le hook useIntlayer dans les composants Astro et les scripts client pour accéder au contenu localisé.
keywords:
  - useIntlayer
  - dictionary
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - internationalisation
  - documentation
slugs:
  - doc
  - packages
  - astro-intlayer
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Doc initiale"
author: aymericzip
---

# Documentation du hook useIntlayer

Le hook `useIntlayer` vous permet de récupérer du contenu de dictionnaire localisé par clé dans les applications Astro.

Il peut être appelé dans deux contextes distincts en utilisant le même chemin d'import :

1. **Serveur / Frontmatter** : Dans les fichiers `.astro`, il résout automatiquement le contenu en utilisant la locale de la requête stockée dans `Astro.locals.intlayer`.
2. **Navigateur / Balise `<script>` client** : Dans les scripts client ou les composants de framework UI, il résout vers l'implémentation du store côté client (`vanilla-intlayer`).

## Utilisation

### Dans le frontmatter de composant Astro

```astro fileName="src/pages/index.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

### Dans les blocs `<script>` client

```astro fileName="src/components/InteractiveWidget.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<button id="alert-btn">{content.buttonText}</button>

<script>
  import { useIntlayer } from "astro-intlayer";

  const content = useIntlayer("home");

  document.getElementById("alert-btn")?.addEventListener("click", () => {
    alert(content.buttonText);
  });
</script>
```

## Paramètres

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`** : La clé unique du dictionnaire (telle que définie dans vos fichiers de déclaration `.content.ts`).
2. **`localeOrSelector`** (optionnel) : Une locale spécifique ou un objet sélecteur (`{ item }`, `{ variant }`, éventuellement avec `locale`). Lorsqu'il est fourni, il remplace la locale détectée depuis le contexte de la requête ou le store client.

## Description

Le hook effectue les tâches suivantes :

1. **Résolution de la locale** :
   - Côté serveur, lit la locale active depuis `Astro.locals.intlayer` via une portée `AsyncLocalStorage` initialisée par `astro-intlayer/middleware`.
   - Dans le navigateur, lit la locale active depuis le stockage/store client.
2. **Récupération du dictionnaire** : Injecte le contenu du dictionnaire correspondant à la clé spécifiée.
3. **Traitement de la traduction** : Résout les traductions (`t()`), énumérations, conditions et markdown en contenu prêt à être affiché.

## Documentation associée

- [Intégration `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/astro-intlayer/intlayer.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/astro-intlayer/useDictionary.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/astro-intlayer/useLocale.md)

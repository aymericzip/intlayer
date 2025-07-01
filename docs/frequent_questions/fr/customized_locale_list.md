---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Comment personnaliser la liste des langues ?
description: Apprenez comment personnaliser la liste des langues.
keywords:
  - langues
  - liste
  - intlayer
  - configuration
  - availableLocales
  - defaultLocale
  - useLocale
  - hook
  - langue
  - liste
slugs:
  - doc
  - faq
  - liste-langues-personnalisee
---

# Est-il possible de bloquer un type de langue, comme l'anglais ? J'ajoute l'anglais dans mes dictionnaires mais je ne veux pas que l'anglais soit encore disponible sur le site web

Oui, vous pouvez bloquer un type de langue, comme l'anglais, en utilisant l'option `availableLocales` dans la configuration d'Intlayer.

```ts
import { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  locales: [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH],
  availableLocales: [Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.FRENCH,
};
```

ou

```ts
import { IntlayerConfig } from "intlayer";

const locales = [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH];

const config: IntlayerConfig = {
  locales,
  availableLocales: locales.filter((locale) => locale !== Locales.ENGLISH),
  defaultLocale: Locales.FRENCH,
};
```

Cette configuration modifiera les types de votre fonction `t()` pour n'inclure que les langues disponibles.

L'option availableLocales est facultative, si vous ne la fournissez pas, toutes les langues seront disponibles.

Faites attention, toutes les langues incluses dans l'option `availableLocales` doivent être incluses dans l'option `locales`.

Notez que si vous utilisez le hook `useLocale`, l'option `availableLocales` sera utilisée pour définir l'accès à la liste des langues.

```ts
import { useLocale } from "intlayer";

const { availableLocales } = useLocale();

console.log(availableLocales); // [Locales.FRENCH, Locales.SPANISH]
```

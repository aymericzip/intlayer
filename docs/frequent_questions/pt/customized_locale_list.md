---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Como personalizar a lista de idiomas?
description: Aprenda como personalizar a lista de idiomas.
keywords:
  - idiomas
  - lista
  - intlayer
  - configuração
  - availableLocales
  - defaultLocale
  - useLocale
  - hook
  - idioma
  - lista
slugs:
  - frequent-questions
  - customized-locale-list
---

# É possível bloquear um tipo de idioma, como o inglês? Estou adicionando inglês nos meus dicionários, mas ainda não quero que o inglês esteja disponível no site

Sim, você pode bloquear um tipo de idioma, como o inglês, usando a opção `availableLocales` na configuração do Intlayer.

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

Esta configuração irá alterar os tipos da sua função `t()` para incluir apenas os idiomas disponíveis.

A opção availableLocales é opcional, se você não a fornecer, todos os idiomas estarão disponíveis.

Tenha cuidado, todos os idiomas incluídos na opção `availableLocales` devem estar incluídos na opção `locales`.

Note que se você usar o hook `useLocale`, a opção `availableLocales` será usada para definir o acesso à lista de idiomas.

```ts
import { useLocale } from "intlayer";

const { availableLocales } = useLocale();

console.log(availableLocales); // [Locales.FRENCH, Locales.SPANISH]
```

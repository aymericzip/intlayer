---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Documentação do hook useDictionary | remix-intlayer
description: Veja como usar o hook useDictionary em aplicações Remix 3 para resolver objetos de dicionário para a locale da requisição atual.
keywords:
  - useDictionary
  - dicionário
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - Internacionalização
  - Documentação
slugs:
  - doc
  - packages
  - remix-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# Documentação do hook useDictionary

O hook `useDictionary` transforma um objeto de dicionário importado ou inline e retorna seu conteúdo resolvido para a locale da requisição atual em aplicações Remix 3.

Diferente do `useIntlayer`, que resolve dicionários por sua chave de string a partir do registro global de dicionários, o `useDictionary` aceita um objeto de dicionário diretamente.

## Uso

```ts fileName="src/views/home.ts"
import { useDictionary } from "remix-intlayer";
import homeContent from "./home.content";

export const HomeView = () => {
  const content = useDictionary(homeContent);

  return `
    <div>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </div>
  `;
};
```

Você também pode passar dicionários inline definidos com `t()`:

```ts
import { useDictionary } from "remix-intlayer";
import { t } from "intlayer";

export const FooterView = () => {
  const content = useDictionary({
    key: "footer",
    content: {
      copyright: t({
        pt: "Todos os direitos reservados.",
        en: "All rights reserved.",
        fr: "Tous droits réservés.",
      }),
    },
  });

  return `<footer>${content.copyright}</footer>`;
};
```

## Parâmetros

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: Um objeto de dicionário ou grupo de dicionários qualificado.
2. **`localeOrSelector`** (opcional): Uma locale específica ou objeto seletor (`{ item }`, `{ variant }`, opcionalmente com `locale`).

## Descrição

O hook realiza as seguintes tarefas:

1. **Detecção de locale**: Lê a locale ativa da requisição a partir do armazenamento `AsyncLocalStorage` criado pelo middleware `intlayer()`.
2. **Resolução de conteúdo**: Avalia traduções (`t()`), enumerações, condições e estruturas aninhadas de acordo com a locale resolvida.
3. **Processamento de seletores**: Aplica quaisquer seletores de item ou variante fornecidos nos argumentos.

## Documentação relacionada

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/remix-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/remix-intlayer/useLocale.md)

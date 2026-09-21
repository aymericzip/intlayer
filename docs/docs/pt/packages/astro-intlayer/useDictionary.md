---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Documentação do hook useDictionary | astro-intlayer
description: Veja como usar o hook useDictionary em componentes e scripts Astro para resolver objetos de dicionário.
keywords:
  - useDictionary
  - dictionary
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - internacionalização
  - documentação
slugs:
  - doc
  - packages
  - astro-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Doc inicial"
author: aymericzip
---

# Documentação do hook useDictionary

O hook `useDictionary` resolve um objeto de dicionário importado ou em linha e retorna seu conteúdo para o locale atual em aplicações Astro.

Diferente do `useIntlayer`, que busca dicionários por chave a partir do registro global de dicionários, o `useDictionary` trabalha diretamente com um objeto de dicionário.

## Utilização

```astro fileName="src/pages/index.astro"
---
import { useDictionary } from "astro-intlayer";
import homeContent from "../content/home.content";

const content = useDictionary(homeContent);
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

Você também pode passar dicionários em linha definidos com `t()`:

```astro fileName="src/components/Footer.astro"
---
import { useDictionary } from "astro-intlayer";
import { t } from "intlayer";

const footer = useDictionary({
  key: "footer",
  content: {
    copyright: t({
      pt: "Todos os direitos reservados.",
      en: "All rights reserved.",
      fr: "Tous droits réservés.",
      es: "Todos los derechos reservados.",
    }),
  },
});
---

<footer>
  <p>{footer.copyright}</p>
</footer>
```

## Parâmetros

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: Um objeto de dicionário ou grupo de dicionários qualificado.
2. **`localeOrSelector`** (opcional): Um locale específico ou objeto seletor (`{ item }`, `{ variant }`, opcionalmente com `locale`).

## Descrição

O hook realiza as seguintes tarefas:

1. **Detecção de Locale**: No servidor, obtém o locale de `Astro.locals.intlayer`. No navegador, utiliza o locale da store do cliente.
2. **Processamento de Conteúdo**: Resolve traduções (`t()`), enumerações, condições e estruturas aninhadas de acordo com o locale resolvido.
3. **Seletores**: Aplica quaisquer seletores de item ou variante fornecidos nos argumentos.

## Documentação relacionada

- [Integração `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/astro-intlayer/useLocale.md)

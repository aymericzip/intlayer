---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Documentação do hook useIntlayer | astro-intlayer
description: Veja como usar o hook useIntlayer em componentes e scripts de cliente Astro para acessar conteúdo localizado.
keywords:
  - useIntlayer
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
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Doc inicial"
author: aymericzip
---

# Documentação do hook useIntlayer

O hook `useIntlayer` permite recuperar conteúdo de dicionário localizado por chave em aplicações Astro.

Ele pode ser chamado em dois contextos distintos usando o mesmo caminho de importação:

1. **Servidor / Frontmatter**: Dentro de arquivos `.astro`, ele resolve automaticamente o conteúdo usando o locale da requisição armazenado em `Astro.locals.intlayer`.
2. **Navegador / Tag `<script>` do cliente**: Em scripts do cliente ou componentes de frameworks de interface, ele resolve para a implementação de store do lado do cliente (`vanilla-intlayer`).

## Utilização

### No Frontmatter de componentes Astro

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

### Em blocos `<script>` do cliente

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

## Parâmetros

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: A chave única do dicionário (conforme definida em seus arquivos de declaração `.content.ts`).
2. **`localeOrSelector`** (opcional): Um locale específico ou objeto seletor (`{ item }`, `{ variant }`, opcionalmente com `locale`). Quando fornecido, substitui o locale detectado do contexto da requisição ou store do cliente.

## Descrição

O hook realiza as seguintes tarefas:

1. **Resolução de Locale**:
   - No servidor, lê o locale ativo de `Astro.locals.intlayer` por meio de um escopo `AsyncLocalStorage` inicializado por `astro-intlayer/middleware`.
   - No navegador, lê o locale ativo do armazenamento/store do cliente.
2. **Recuperação de Dicionário**: Injeta o conteúdo do dicionário correspondente à chave especificada.
3. **Processamento de Tradução**: Resolve traduções (`t()`), enumerações, condições e markdown em conteúdo pronto para renderização.

## Documentação relacionada

- [Integração `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/astro-intlayer/intlayer.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/astro-intlayer/useDictionary.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/astro-intlayer/useLocale.md)

---
createdAt: 2026-01-21
updatedAt: 2026-09-19
title: Documentação da integração intlayer | astro-intlayer
description: Veja como configurar e usar a integração Astro intlayer no astro.config.mjs.
keywords:
  - intlayer
  - astro
  - astro-intlayer
  - integração
  - i18n
  - internacionalização
  - documentação
slugs:
  - doc
  - packages
  - astro-intlayer
  - intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Atualizada documentação de integração com detalhes de middleware e hooks"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Doc inicial"
author: aymericzip
---

# Documentação da integração Astro intlayer

A integração `intlayer` para Astro configura seu projeto para internacionalização (i18n) multilíngue. Ela cuida da preparação de dicionários no momento da compilação, injeção de plugins Vite, registro automático de middleware de requisição e emissão de páginas pré-renderizadas localizadas.

## Utilização

Adicione `intlayer()` ao seu `astro.config.mjs`:

```ts fileName="astro.config.mjs"
import { defineConfig } from "astro/config";
import { intlayer } from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

O codemod do Astro CLI (`astro add astro-intlayer`) também gera uma importação padrão que é suportada:

```ts
import intlayer from "astro-intlayer";
```

## Descrição

A integração se conecta ao ciclo de vida de build e execução do Astro:

1. **Configuração inicial (`astro:config:setup`)**:
   - **Preparação de Dicionários**: Prepara os dicionários do Intlayer e os tipos gerados antes da execução do build.
   - **Plugins Vite**: Injeta plugins para aliases Vite (permitindo importações diretas de dicionários), proxies de roteamento de locale e poda de compilação.
   - **Registro de Middleware**: Injeta automaticamente `astro-intlayer/middleware` na cadeia de middleware do seu projeto, preenchendo `Astro.locals.intlayer` em cada requisição recebida.
2. **Build concluído (`astro:build:done`)**:
   - **Reescritas de Página**: Inspeciona regras de reescrita de URL localizadas e emite páginas HTML pré-renderizadas em seus caminhos localizados correspondentes.

## O que é fornecido imediatamente

Uma vez configurada, sua aplicação Astro pode usar imediatamente:

- Os hooks `useIntlayer`, `useDictionary` e `useLocale` no frontmatter de componentes `.astro`.
- O objeto `Astro.locals.intlayer` em endpoints e páginas Astro.
- Importações no lado do cliente em blocos `<script>` que espelham a mesma API com atualizações reativas.
- Formatadores integrados em `astro-intlayer/format` (`useDate`, `useNumber`, `useCurrency`, etc.).

## Documentação relacionada

- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/astro-intlayer/useLocale.md)
- [Middleware `onRequest`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/astro-intlayer/onRequest.md)

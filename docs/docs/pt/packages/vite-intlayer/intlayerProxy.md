---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Documentação do plugin Vite intlayerProxy | vite-intlayer
description: Middleware de roteamento de idioma para servidores dev/preview do Vite e SSR de produção. Lida com detecção de idioma, redirecionamentos de URL e reescritas internas.
keywords:
  - intlayerProxy
  - vite
  - plugin
  - middleware
  - idioma
  - roteamento
  - internacionalização
  - i18n
  - SSR
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerProxy
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Mesclado configOptions em um único objeto de opções; proxy empacotado no intlayer()"
author: aymericzip
---

# intlayerProxy

O `intlayerProxy` é um plugin do Vite que registra o middleware de roteamento de idioma para **todos os ambientes**: servidor de desenvolvimento (dev server), servidor de visualização (preview server) e SSR de produção (Nitro / TanStack Start).

> **A partir do Intlayer v9**, o `intlayerProxy` é incluído automaticamente dentro do plugin principal [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vite-intlayer/intlayer.md) e ativado por padrão via `routing.enableProxy: true`. Você só precisa registrá-lo separadamente se precisar de controle de nível mais baixo ou se estiver usando-o fora da configuração padrão do `intlayer()`.

## Uso

### Como parte do `intlayer()` (recomendado, v9+)

Passe as opções do `proxy` para o plugin principal em vez de registrar o `intlayerProxy` separadamente:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

### Standalone (quando necessário)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Opções

```ts
import type { IntlayerProxyPluginOptions } from "vite-intlayer";
```

Todas as opções são opcionais e passadas como um único objeto:

| Opção           | Tipo                                | Descrição                                                                                                                                                                          |
| --------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ignore`        | `(req: IncomingMessage) => boolean` | Predicado que exclui requisições do roteamento de idioma. Retorne `true` para ignorar uma requisição (ex: rotas de API, verificações de integridade).                              |
| `configOptions` | `GetConfigurationOptions`           | Substituições de configuração do Intlayer encaminhadas para `getConfiguration()`. Use quando precisar que o proxy leia um arquivo de configuração específico ou substitua valores. |

### Exemplo

```ts
intlayerProxy({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});
```

## createIntlayerProxyHandler

O `createIntlayerProxyHandler` cria um middleware Node.js `(req, res, next)` independente de framework que contém toda a lógica de roteamento de idioma. É útil em ambientes onde a API do plugin do Vite não está disponível (ex: um servidor Node.js simples ou um módulo Nitro personalizado).

```ts
import { createIntlayerProxyHandler } from "vite-intlayer";

const handler = createIntlayerProxyHandler({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});

// Express / Connect
app.use(handler);
```

### SSR de Produção (TanStack Start / Nitro via h3)

```ts
// server/middleware/intlayerProxy.ts
import { fromNodeMiddleware } from "h3";
import { createIntlayerProxyHandler } from "vite-intlayer";

export default fromNodeMiddleware(
  createIntlayerProxyHandler({
    ignore: (req) => req.url?.startsWith("/api"),
  })
);
```

## Comportamento de roteamento

O middleware espelha a lógica de roteamento do middleware `next-intlayer` e suporta todos os modos de roteamento do Intlayer.

### Modos de roteamento

| Modo            | URL visível no navegador | Comportamento                                                                                                                            |
| --------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `prefix`        | `/pt/about`              | Padrão. Prefixo de idioma na URL. O idioma padrão redireciona para a URL sem prefixo, a menos que `prefix-all` esteja ativo.             |
| `prefix-all`    | `/en/about`, `/pt/about` | Todos os idiomas — incluindo o padrão — são sempre prefixados.                                                                           |
| `no-prefix`     | `/about`                 | Sem idioma na URL. O idioma é armazenado apenas em cookies; as reescritas de URL ocorrem internamente.                                   |
| `search-params` | `/about?locale=pt`       | Idioma passado como um parâmetro de consulta. Redireciona para adicionar/atualizar o parâmetro `locale` quando ausente ou desatualizado. |

### Prioridade de detecção

1. Prefixo do caminho da URL (ex: `/pt/about` → `pt`).
2. Valor do cookie / localStorage (`intlayer-locale`).
3. Cabeçalho `Accept-Language`.
4. `defaultLocale` da configuração.

### Desvio automático (Bypass)

O middleware sempre passa essas requisições diretamente sem manipulação de idioma:

- Requisições que correspondem ao predicado `ignore`.
- `/node_modules/**`
- `/@**` – Recursos internos do Vite (`@vite/`, `@fs/`, `@id/`, etc.).
- `/_**` – Recursos internos do servidor (`__vite_ping`, `__manifest`, etc.).
- Requisições cujo caminho termina com uma extensão de arquivo (recursos estáticos). Se um prefixo de idioma estiver presente em um caminho de recurso estático (ex: `/pt/logo.png`), ele será removido para que o arquivo possa ser servido corretamente.

### Roteamento por domínio

Quando `routing.domains` está configurado nas suas configurações do Intlayer, o middleware lida com o roteamento de idioma entre domínios:

- Uma requisição para `/zh/about` em `intlayer.org` é redirecionada para `https://intlayer.zh/about` quando `domains.zh = "intlayer.zh"`.
- Uma requisição para `intlayer.zh/about` é reescrita internamente para `/zh/about` para que o parâmetro de rota `[locale]` seja preenchido.

### Proteção contra loops de redirecionamento

O middleware rastreia as contagens de redirecionamento por par `originalUrl → newUrl` dentro de uma janela deslizante de 2 segundos. Mais de 10 redirecionamentos dentro dessa janela retornam uma resposta `500` com um erro descritivo em vez de entrar em loop eterno.

## Nitro / SSR de produção (injeção automática, v9+)

Quando o `intlayerProxy` é usado como um plugin do Vite, ele carrega uma propriedade `.nitro`. O plugin de compilação `nitro/vite` lê esta propriedade e a insere em `nitroConfig.modules`, de modo que o `intlayerNitroHandler` é registrado como um middleware do servidor Nitro automaticamente — nenhuma configuração manual é necessária para o SSR de produção.

O manipulador Nitro usa o modelo de evento Web Fetch API da h3 v2 (não o `fromNodeMiddleware`), por isso é compatível com todas as predefinições do Nitro: Node, Bun, Deno, runtimes edge.

## Aliases depreciados

| Exportação depreciada      | Substituição    |
| -------------------------- | --------------- |
| `intlayerMiddleware`       | `intlayerProxy` |
| `intLayerMiddlewarePlugin` | `intlayerProxy` |

---
createdAt: 2025-03-13
updatedAt: 2025-10-05
title: Plugin Sync JSON
description: Sincronize os dicionários Intlayer com arquivos JSON i18n de terceiros (i18next, next-intl, react-intl, vue-i18n e mais). Mantenha seu i18n existente enquanto usa o Intlayer para gerenciar, traduzir e testar suas mensagens.
keywords:
  - Intlayer
  - Sync JSON
  - i18next
  - next-intl
  - react-intl
  - vue-i18n
  - next-translate
  - nuxt-i18n
  - LinguiJS
  - Polyglot.js
  - Solid-i18next
  - svelte-i18n
  - i18n
  - traduções
slugs:
  - doc
  - plugin
  - sync-json
history:
  - version: 6.1.6
    date: 2025-10-05
    changes: Documentação inicial do plugin Sync JSON
---

## Sync JSON (pontes i18n)

Use o Intlayer como um complemento para sua pilha i18n existente. Este plugin mantém suas mensagens JSON sincronizadas com os dicionários Intlayer para que você possa:

- Manter i18next, next-intl, react-intl, vue-i18n, next-translate, nuxt-i18n, Solid-i18next, svelte-i18n, etc.
- Gerenciar e traduzir suas mensagens com o Intlayer (CLI, CI, provedores, CMS), sem precisar refatorar seu aplicativo.
- Publicar tutoriais e conteúdo SEO direcionado a cada ecossistema, enquanto sugere o Intlayer como a camada de gerenciamento JSON.

Notas e escopo atual:

- A externalização para o CMS funciona para traduções e texto clássico.
- Ainda não há suporte para inserções, plurais/ICU ou recursos avançados de tempo de execução de outras bibliotecas.
- O editor visual ainda não é suportado para saídas i18n de terceiros.

### Quando usar este plugin

- Você já usa uma biblioteca i18n e armazena mensagens em arquivos JSON.
- Você deseja preenchimento assistido por IA, testes em CI e operações de conteúdo sem alterar seu tempo de execução de renderização.

## Instalação

```bash
pnpm add -D @intlayer/sync-json-plugin
# ou
npm i -D @intlayer/sync-json-plugin
```

## Início rápido

Adicione o plugin ao seu `intlayer.config.ts` e aponte para sua estrutura JSON existente.

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Mantenha seus arquivos JSON atuais sincronizados com os dicionários Intlayer
  plugins: [
    syncJSON({
      // Layout por localidade, por namespace (por exemplo, next-intl, i18next com namespaces)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
});
```

Alternativa: arquivo único por localidade (comum em configurações i18next/react-intl):

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### Como funciona

- Leitura: o plugin descobre arquivos JSON a partir do seu construtor `source` e os carrega como dicionários Intlayer.
- Escrita: após builds e preenchimentos, ele grava o JSON localizado de volta nos mesmos caminhos (com uma nova linha final para evitar problemas de formatação).
- Auto-preenchimento: o plugin declara um caminho `autoFill` para cada dicionário. Executar `intlayer fill` atualiza apenas as traduções ausentes nos seus arquivos JSON por padrão.

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // obrigatório
  location?: string, // rótulo opcional, padrão: "plugin"
  priority?: number, // prioridade opcional para resolução de conflitos, padrão: 0
});
```

## Múltiplas fontes JSON e prioridade

Você pode adicionar múltiplos plugins `syncJSON` para sincronizar diferentes fontes JSON. Isso é útil quando você tem múltiplas bibliotecas i18n ou diferentes estruturas JSON no seu projeto.

### Sistema de prioridade

Quando múltiplos plugins têm como alvo a mesma chave de dicionário, o parâmetro `priority` determina qual plugin tem precedência:

- Números de prioridade mais altos ganham sobre os mais baixos
- Prioridade padrão dos arquivos `.content` é `0`
- Prioridade padrão dos arquivos de conteúdo dos plugins é `-1`
- Plugins com a mesma prioridade são processados na ordem em que aparecem na configuração

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Fonte JSON principal (maior prioridade)
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      location: "main-translations",
      priority: 10,
    }),

    // Fonte JSON de fallback (prioridade menor)
    syncJSON({
      source: ({ locale }) => `./fallback-locales/${locale}.json`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Fonte JSON legado (prioridade mais baixa)
    syncJSON({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.json`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
});
```

### Resolução de conflitos

Quando a mesma chave de tradução existe em múltiplas fontes JSON:

1. O plugin com a maior prioridade determina o valor final
2. Fontes com prioridade menor são usadas como fallback para chaves ausentes
3. Isso permite manter traduções legadas enquanto migra gradualmente para novas estruturas

## Integrações

Abaixo estão mapeamentos comuns. Mantenha seu runtime intacto; apenas adicione o plugin.

### i18next

Layout típico de arquivo: `./public/locales/{locale}/{namespace}.json` ou `./locales/{locale}/{namespace}.json`.

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

export default {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};
```

### next-intl

Mensagens JSON por localidade (frequentemente `./messages/{locale}.json`) ou por namespace.

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
  }),
];
```

Veja também: `docs/pt/intlayer_with_next-intl.md`.

### react-intl

JSON único por localidade é comum:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### vue-i18n

Pode ser um único arquivo por localidade ou por namespace:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
];
```

## CLI

Os arquivos JSON sincronizados serão considerados como outros arquivos `.content`. Isso significa que todos os comandos do intlayer estarão disponíveis para os arquivos JSON sincronizados. Incluindo:

- `intlayer content test` para testar se há traduções faltando
- `intlayer content list` para listar os arquivos JSON sincronizados
- `intlayer content fill` para preencher as traduções faltantes
- `intlayer content push` para enviar os arquivos JSON sincronizados
- `intlayer content pull` para puxar os arquivos JSON sincronizados

Veja [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md) para mais detalhes.

## Limitações (atuais)

- Sem suporte para inserções ou plurais/ICU ao direcionar bibliotecas de terceiros.
- Editor visual ainda não disponível para runtimes que não sejam Intlayer.
- Sincronização apenas de JSON; formatos de catálogo não JSON não são suportados.

## Por que isso importa

- Podemos recomendar soluções i18n consolidadas e posicionar o Intlayer como um complemento.
- Aproveitamos o SEO/palavras-chave delas com tutoriais que terminam sugerindo o Intlayer para gerenciar JSON.
- Expande o público-alvo de “novos projetos” para “qualquer equipe que já usa i18n”.

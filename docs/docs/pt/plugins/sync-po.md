---
createdAt: 2026-05-10
updatedAt: 2026-05-10
title: Plugin Sync PO
description: Sincronize os dicionários Intlayer com arquivos Gettext PO. Mantenha seu i18n existente enquanto usa o Intlayer para gerenciar, traduzir e testar suas mensagens.
keywords:
  - Intlayer
  - Sync PO
  - Gettext
  - i18n
  - traduções
slugs:
  - doc
  - plugin
  - sync-po
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 8.9.4
    date: 2026-05-10
    changes: "Documentação inicial do plugin Sync PO"
---

# Sync PO (pontes i18n) - Sync PO com suporte a ICU / i18next

Use o Intlayer como um complemento à sua stack de i18n existente. Este plugin mantém suas mensagens Gettext PO em sincronia com os dicionários Intlayer para que você possa:

- Manter seu fluxo de trabalho de tradução baseado em PO existente.
- Gerenciar e traduzir suas mensagens com o Intlayer (CLI, CI, provedores, CMS), sem refatorar seu aplicativo.
- Enviar tutoriais e conteúdo de SEO direcionados a cada ecossistema, sugerindo o Intlayer como a camada de gerenciamento de PO.

Notas e escopo atual:

- A externalização para o CMS funciona para traduções e texto clássico.
- Ainda não há suporte para inserções, plurais/ICU ou recursos avançados de tempo de execução de outras bibliotecas dentro das próprias entradas PO.
- O editor visual ainda não é suportado para saídas i18n de terceiros.

### Quando usar este plugin

- Você já usa arquivos Gettext PO para suas traduções.
- Você deseja preenchimento assistido por IA, testes em CI e operações de conteúdo sem alterar seu tempo de execução de renderização.

## Instalação

```bash
pnpm add -D @intlayer/sync-po-plugin
# ou
npm i -D @intlayer/sync-po-plugin
```

## Plugins

Este pacote fornece dois plugins:

- `loadPO`: Carrega arquivos PO nos dicionários Intlayer.
  - Este plugin é usado para carregar arquivos PO de uma fonte e eles serão carregados nos dicionários Intlayer. Ele pode escanear toda a base de código e procurar por arquivos PO específicos.
    Este plugin pode ser usado:
    - se você usa uma biblioteca i18n que impõe um local específico para que seus arquivos PO sejam carregados, mas você deseja colocar sua declaração de conteúdo onde preferir em sua base de código.
    - Também pode ser usado se você desejar buscar suas mensagens de uma fonte remota (ex: um CMS, uma API, etc.) e armazenar suas mensagens em arquivos PO.

  > Por baixo dos panos, este plugin escaneará toda a base de código e procurará por arquivos PO específicos e os carregará nos dicionários Intlayer.
  > Observe que este plugin não gravará a saída e as traduções de volta nos arquivos PO.

- `syncPO`: Sincroniza arquivos PO com dicionários Intlayer.
  - Este plugin é usado para sincronizar arquivos PO com dicionários Intlayer. Ele pode escanear o local fornecido e carregar o PO que corresponde ao padrão para arquivos PO específicos. Este plugin é útil se você deseja obter os benefícios do Intlayer enquanto usa outra biblioteca i18n.

## Usando ambos os plugins

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO, syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Mantenha seus arquivos PO atuais em sincronia com os dicionários Intlayer
  plugins: [
    /**
     * Carregará todos os arquivos PO no src que correspondem ao padrão {key}.i18n.po
     */
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      locale: Locales.ENGLISH,
      priority: 1, // Garante que esses arquivos PO tenham precedência sobre os arquivos em `./locales/en/${key}.po`
    }),
    /**
     * Carregará e gravará a saída e as traduções de volta nos arquivos PO no diretório locales
     */
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      priority: 0,
    }),
  ],
};

export default config;
```

## Plugin `syncPO`

### Início rápido

Adicione o plugin ao seu `intlayer.config.ts` e aponte-o para sua estrutura PO existente.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Mantenha seus arquivos PO atuais em sincronia com os dicionários Intlayer
  plugins: [
    syncPO({
      // Layout por idioma, por namespace
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

Alternativa: arquivo único por idioma:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      source: ({ locale }) => `./locales/${locale}.po`,
    }),
  ],
};

export default config;
```

#### Como funciona

- Leitura: o plugin descobre arquivos PO a partir do seu construtor `source` e os carrega como dicionários Intlayer.
- Gravação: após compilações e preenchimentos, ele grava o PO localizado de volta nos mesmos caminhos (com cabeçalhos Gettext apropriados).
- Preenchimento automático: o plugin declara um caminho `autoFill` para cada dicionário. Executar `intlayer fill` atualiza apenas as traduções ausentes em seus arquivos PO por padrão.

API:

```ts
syncPO({
  source: ({ key, locale }) => string, // obrigatório
  location?: string, // rótulo opcional, padrão: "sync-po::path/to/source"
  priority?: number, // prioridade opcional para resolução de conflitos, padrão: 0
});
```

### Múltiplas fontes PO e prioridade

Você pode adicionar vários plugins `syncPO` para sincronizar diferentes fontes PO. Isso é útil quando você tem várias fontes de tradução ou estruturas PO diferentes em seu projeto.

#### Sistema de prioridade

Quando vários plugins visam a mesma chave de dicionário, o parâmetro `priority` determina qual plugin tem precedência:

- Números de prioridade mais altos vencem os mais baixos
- A prioridade padrão dos arquivos `.content` é `0`
- A prioridade padrão dos plugins é `0`
- Plugins com a mesma prioridade são processados na ordem em que aparecem na configuração

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Fonte PO primária (maior prioridade)
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      location: "main-translations",
      priority: 10,
    }),

    // Fonte PO de fallback (prioridade mais baixa)
    syncPO({
      source: ({ locale }) => `./fallback-locales/${locale}.po`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Fonte PO legada (prioridade mínima)
    syncPO({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.po`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## Plugin Load PO

### Início rápido

Adicione o plugin ao seu `intlayer.config.ts` para ingerir arquivos PO existentes como dicionários Intlayer. Este plugin é apenas para leitura (sem gravações no disco):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Ingerir mensagens PO localizadas em qualquer lugar em sua árvore de fontes
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      // Carregar um único idioma por instância de plugin (o padrão é o defaultLocale da configuração)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Alternativa: layout por idioma, ainda apenas leitura (apenas o idioma selecionado é carregado):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadPO({
      // Apenas arquivos para Locales.FRENCH serão carregados a partir deste padrão
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### Como funciona

- Descoberta: constrói um glob a partir do seu construtor `source` e coleta arquivos PO correspondentes.
- Ingestão: carrega cada arquivo PO como um dicionário Intlayer com o `locale` fornecido.
- Apenas leitura: não grava nem formata arquivos de saída; use `syncPO` se precisar de sincronização de ida e volta.
- Pronto para preenchimento automático: define um caminho `fill` para que o `intlayer content fill` possa preencher as chaves ausentes.

### API

```ts
loadPO({
  // Construir caminhos para seus POs. `locale` é opcional se sua estrutura não tiver segmento de idioma
  source: ({ key, locale }) => string,

  // Idioma de destino para os dicionários carregados por esta instância de plugin
  // O padrão é configuration.internationalization.defaultLocale
  locale?: Locale,

  // Rótulo opcional para identificar a fonte
  location?: string, // padrão: "plugin"

  // Prioridade usada para resolução de conflitos com outras fontes
  priority?: number, // padrão: 0
});
```

### Comportamento e convenções

- Se sua máscara `source` incluir um marcador de posição de idioma, apenas arquivos para o `locale` selecionado serão ingeridos.
- Se não houver um segmento `{key}` em sua máscara, a chave do dicionário será "index".
- As chaves são derivadas dos caminhos dos arquivos substituindo o marcador de posição `{key}` em seu construtor `source`.
- O plugin usa apenas arquivos descobertos e não fabrica idiomas ou chaves ausentes.
- O caminho `fill` é inferido a partir da sua `source` e usado para atualizar valores ausentes via CLI quando você aceita.

## Resolução de conflitos

Quando a mesma chave de tradução existe em várias fontes PO:

1. O plugin com a maior prioridade determina o valor final
2. Fontes de menor prioridade são usadas como fallback para chaves ausentes
3. Isso permite que você mantenha traduções legadas enquanto migra gradualmente para novas estruturas

## CLI

Os arquivos PO sincronizados serão considerados como outros arquivos `.content`. Isso significa que todos os comandos do intlayer estarão disponíveis para os arquivos PO sincronizados. Incluindo:

- `intlayer content test` para testar se há traduções ausentes
- `intlayer content list` para listar os arquivos PO sincronizados
- `intlayer content fill` para preencher as traduções ausentes
- `intlayer content push` para enviar os arquivos PO sincronizados
- `intlayer content pull` para baixar os arquivos PO sincronizados

Consulte o [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) para mais detalhes.

## Limitações (atuais)

- Sem suporte para inserções ou plurais/ICU ao visar bibliotecas de terceiros.
- O editor visual ainda não está disponível para tempos de execução que não sejam Intlayer.
- Sincronização PO apenas; formatos de catálogo não-PO não são suportados.

## Por que isso importa

- Podemos recomendar soluções de i18n estabelecidas e posicionar o Intlayer como um complemento.
- Aproveitamos seu SEO/palavras-chave com tutoriais que terminam sugerindo o Intlayer para gerenciar PO.
- Expande o público endereçável de “novos projetos” para “qualquer equipe que já use i18n”.

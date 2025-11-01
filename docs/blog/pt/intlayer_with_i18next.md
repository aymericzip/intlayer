---
createdAt: 2024-12-24
updatedAt: 2025-11-01
title: Como automatizar suas traduções JSON do i18next usando Intlayer
description: Automatize suas traduções JSON com Intlayer e i18next para uma internacionalização aprimorada em aplicações JavaScript.
keywords:
  - Intlayer
  - i18next
  - Internacionalização
  - i18n
  - Localização
  - Tradução
  - React
  - Next.js
  - JavaScript
  - TypeScript
  - Migração
  - Integração
slugs:
  - blog
  - intlayer-with-i18next
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Adicionado plugin loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Alterado para plugin syncJSON
---

# Como automatizar suas traduções JSON do i18next usando Intlayer

## O que é o Intlayer?

**Intlayer** é uma biblioteca inovadora e open-source de internacionalização, projetada para resolver as limitações das soluções tradicionais de i18n. Ela oferece uma abordagem moderna para o gerenciamento de conteúdo em aplicações JavaScript.

Veja uma comparação concreta com o i18next em nosso post no blog [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/next-i18next_vs_next-intl_vs_intlayer.md).

## Por que combinar Intlayer com i18next?

Embora o Intlayer forneça uma excelente solução i18n independente (veja nosso [guia de integração com Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_16.md)), você pode querer combiná-lo com o i18next por vários motivos:

1. **Base de código existente**: Você possui uma implementação estabelecida do i18next e deseja migrar gradualmente para a melhor experiência de desenvolvedor do Intlayer.
2. **Requisitos legados**: Seu projeto requer compatibilidade com plugins ou fluxos de trabalho existentes do i18next.
3. **Familiaridade da equipe**: Sua equipe está confortável com o i18next, mas deseja um melhor gerenciamento de conteúdo.
4. **Uso dos recursos do Intlayer**: Você quer usar recursos do Intlayer como declaração de conteúdo, gerenciamento de chaves de tradução, status da tradução e mais.

**Para isso, o Intlayer pode ser implementado como um adaptador para o i18next, ajudando a automatizar suas traduções JSON em CLI ou pipelines CI/CD, testar suas traduções e muito mais.**

Este guia mostra como aproveitar o sistema superior de declaração de conteúdo do Intlayer enquanto mantém a compatibilidade com o i18next.

## Índice

<TOC/>

## Guia passo a passo para configurar o Intlayer com o i18next

### Passo 1: Instalar dependências

Instale os pacotes necessários:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin
```

**Descrição dos pacotes:**

- **intlayer**: Biblioteca principal para gerenciamento de internacionalização, declaração de conteúdo e construção
- **@intlayer/sync-json-plugin**: Plugin para exportar declarações de conteúdo do Intlayer para o formato JSON compatível com i18next

### Passo 2: Implemente o plugin Intlayer para encapsular o JSON

Crie um arquivo de configuração do Intlayer para definir os seus locais suportados:

**Se você também quiser exportar dicionários JSON para o i18next**, adicione o plugin `syncJSON`:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

O plugin `syncJSON` irá automaticamente encapsular o JSON. Ele irá ler e escrever os arquivos JSON sem alterar a arquitetura do conteúdo.

Se você quiser fazer coexistir esse JSON com arquivos de declaração de conteúdo do Intlayer (arquivos `.content`), o Intlayer procederá da seguinte forma:

    1. carregar tanto os arquivos JSON quanto os arquivos de declaração de conteúdo e transformá-los em um dicionário do Intlayer.
    2. se houver conflitos entre o JSON e os arquivos de declaração de conteúdo, o Intlayer realizará a mesclagem de todos esses dicionários. Dependendo da prioridade dos plugins e da do arquivo de declaração de conteúdo (tudo é configurável).

Se alterações forem feitas usando a CLI para traduzir o JSON, ou usando o CMS, o Intlayer atualizará o arquivo JSON com as novas traduções.

Para ver mais detalhes sobre o plugin `syncJSON`, consulte a [documentação do plugin syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md).

### (Opcional) Passo 3: Implementar traduções JSON por componente

Por padrão, o Intlayer irá carregar, mesclar e sincronizar tanto os arquivos JSON quanto os arquivos de declaração de conteúdo. Veja [a documentação da declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md) para mais detalhes. Mas, se preferir, usando um plugin do Intlayer, você também pode implementar o gerenciamento por componente de JSON localizado em qualquer lugar da sua base de código.

Para isso, você pode usar o plugin `loadJSON`.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Mantenha seus arquivos JSON atuais sincronizados com os dicionários do Intlayer
  plugins: [
    /**
     * Carregará todos os arquivos JSON na pasta src que correspondem ao padrão {key}.i18n.json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Garante que esses arquivos JSON tenham precedência sobre os arquivos em `./locales/en/${key}.json`
    }),
    /**
     * Carregará e gravará a saída e as traduções de volta nos arquivos JSON no diretório de locais
     */
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

Isso carregará todos os arquivos JSON no diretório `src` que correspondem ao padrão `{key}.i18n.json` e os carregará como dicionários do Intlayer.

---

## Configuração do Git

É recomendado ignorar os arquivos gerados automaticamente pelo Intlayer:

```plaintext fileName=".gitignore"
# Ignorar arquivos gerados pelo Intlayer
.intlayer
```

Esses arquivos podem ser regenerados durante seu processo de build e não precisam ser commitados no controle de versão.

### Extensão VS Code

Para uma melhor experiência de desenvolvimento, instale a extensão oficial **Intlayer VS Code Extension**:

[Instalar no VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

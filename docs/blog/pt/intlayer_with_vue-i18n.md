---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer e vue-i18n
description: Integre o Intlayer com vue-i18n para uma solução abrangente de internacionalização em Vue.js
keywords:
  - vue-i18n
  - Intlayer
  - Internacionalização
  - Blog
  - Vue.js
  - Nuxt
  - JavaScript
  - Vue
slugs:
  - blog
  - intlayer-with-vue-i18n
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Adicionado plugin loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Alterado para plugin syncJSON e reescrita completa
---

# Internacionalização (i18n) em Vue.js com vue-i18n e Intlayer

<iframe title="Como automatizar suas traduções JSON do vue-i18n usando Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Índice

<TOC/>

## O que é o Intlayer?

**Intlayer** é uma biblioteca inovadora e de código aberto para internacionalização, projetada para resolver as limitações das soluções tradicionais de i18n. Ela oferece uma abordagem moderna para o gerenciamento de conteúdo em aplicações Vue.js e Nuxt.

Veja uma comparação concreta com o vue-i18n em nosso post no blog [vue-i18n vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/vue-i18n_vs_intlayer.md).

## Por que combinar o Intlayer com o vue-i18n?

Embora o Intlayer forneça uma excelente solução de i18n independente (veja nosso [guia de integração com Vue.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+vue.md)), você pode querer combiná-lo com o vue-i18n por várias razões:

1. **Base de código existente**: Você possui uma implementação estabelecida do vue-i18n e deseja migrar gradualmente para a melhor experiência de desenvolvedor do Intlayer.
2. **Requisitos legados**: Seu projeto requer compatibilidade com plugins ou fluxos de trabalho existentes do vue-i18n.
3. **Familiaridade da equipe**: Sua equipe está confortável com o vue-i18n, mas deseja um melhor gerenciamento de conteúdo.
4. **Uso dos recursos do Intlayer**: Você quer usar recursos do Intlayer como declaração de conteúdo, automação de traduções, testes de traduções e mais.

**Para isso, o Intlayer pode ser implementado como um adaptador para o vue-i18n para ajudar a automatizar suas traduções JSON em pipelines CLI ou CI/CD, testar suas traduções e muito mais.**

Este guia mostra como aproveitar o sistema superior de declaração de conteúdo do Intlayer enquanto mantém a compatibilidade com o vue-i18n.

---

## Guia Passo a Passo para Configurar o Intlayer com vue-i18n

### Passo 1: Instalar Dependências

Instale os pacotes necessários usando seu gerenciador de pacotes preferido:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
```

**Explicações dos pacotes:**

- **intlayer**: Biblioteca principal para declaração e gerenciamento de conteúdo
- **@intlayer/sync-json-plugin**: Plugin para sincronizar declarações de conteúdo do Intlayer para o formato JSON do vue-i18n

### Passo 2: Implemente o plugin Intlayer para encapsular o JSON

Crie um arquivo de configuração do Intlayer para definir os seus locais suportados:

**Se você também quiser exportar dicionários JSON para o vue-i18n**, adicione o plugin `syncJSON`:

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
      format: "vue-i18n",
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

O plugin `syncJSON` irá automaticamente encapsular o JSON. Ele irá ler e escrever os arquivos JSON sem alterar a arquitetura do conteúdo.

Se você quiser fazer coexistir esse JSON com arquivos de declaração de conteúdo do Intlayer (arquivos `.content`), o Intlayer procederá da seguinte forma:

    1. carregar tanto os arquivos JSON quanto os arquivos de declaração de conteúdo e transformá-los em um dicionário do Intlayer.
    2. se houver conflitos entre o JSON e os arquivos de declaração de conteúdo, o Intlayer realizará a mesclagem de todos esses dicionários. Dependendo da prioridade dos plugins e da do arquivo de declaração de conteúdo (tudo é configurável).

Se alterações forem feitas usando o CLI para traduzir o JSON, ou usando o CMS, o Intlayer atualizará o arquivo JSON com as novas traduções.

Para ver mais detalhes sobre o plugin `syncJSON`, por favor consulte a [documentação do plugin syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md).

---

### (Opcional) Passo 3: Implementar traduções JSON por componente

Por padrão, o Intlayer irá carregar, mesclar e sincronizar tanto os arquivos JSON quanto os arquivos de declaração de conteúdo. Veja [a documentação da declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md) para mais detalhes. Mas se preferir, usando um plugin do Intlayer, você também pode implementar o gerenciamento por componente de JSON localizado em qualquer lugar da sua base de código.

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
     * Carregará e escreverá a saída e as traduções de volta nos arquivos JSON no diretório de locais
     */
    syncJSON({
      format: "vue-i18n",
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

Isso carregará todos os arquivos JSON no diretório `src` que correspondem ao padrão `{key}.i18n.json` e os carregará como dicionários do Intlayer.

---

## Configuração do Git

Exclua arquivos gerados do controle de versão:

```plaintext fileName=".gitignore"
# Ignorar arquivos gerados pelo Intlayer
.intlayer
```

Esses arquivos são automaticamente regenerados durante o processo de build e não precisam ser comitados no seu repositório.

### Extensão VS Code

Para uma melhor experiência de desenvolvimento, instale a extensão oficial **Intlayer VS Code Extension**:

[Instalar no Marketplace do VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

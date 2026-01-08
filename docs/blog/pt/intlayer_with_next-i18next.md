---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer e next-i18next
description: Integre o Intlayer com o next-i18next para uma solução abrangente de internacionalização Next.js
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - Internacionalização
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-i18next
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Adicionado plugin loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Alterado para plugin syncJSON e reescrita abrangente
---

# Internacionalização (i18n) Next.js com next-i18next e Intlayer

<iframe title="Como automatizar suas traduções JSON do next-i18next usando Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Índice

<TOC/>

## O que é o next-i18next?

**next-i18next** é um dos frameworks de internacionalização (i18n) mais populares para aplicações Next.js. Construído sobre o poderoso ecossistema **i18next**, ele oferece uma solução abrangente para gerenciar traduções, localização e troca de idiomas em projetos Next.js.

No entanto, o next-i18next apresenta alguns desafios:

- **Configuração complexa**: Configurar o next-i18next requer múltiplos arquivos de configuração e uma configuração cuidadosa das instâncias i18n no lado do servidor e do cliente.
- **Traduções dispersas**: Os arquivos de tradução geralmente são armazenados em diretórios separados dos componentes, dificultando a manutenção da consistência.
- **Gerenciamento manual de namespaces**: Os desenvolvedores precisam gerenciar manualmente os namespaces e garantir o carregamento adequado dos recursos de tradução.
- **Segurança de tipos limitada**: O suporte ao TypeScript requer configuração adicional e não fornece geração automática de tipos para traduções.

## O que é o Intlayer?

**Intlayer** é uma biblioteca inovadora e de código aberto para internacionalização, projetada para resolver as limitações das soluções tradicionais de i18n. Ela oferece uma abordagem moderna para o gerenciamento de conteúdo em aplicações Next.js.

Veja uma comparação concreta com o next-intl em nosso post no blog [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/next-i18next_vs_next-intl_vs_intlayer.md).

## Por que combinar o Intlayer com o next-i18next?

Enquanto o Intlayer oferece uma excelente solução i18n independente (veja nosso [guia de integração com Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_16.md)), você pode querer combiná-lo com o next-i18next por várias razões:

1. **Base de código existente**: Você possui uma implementação consolidada do next-i18next e deseja migrar gradualmente para a melhor experiência de desenvolvedor do Intlayer.
2. **Requisitos legados**: Seu projeto requer compatibilidade com plugins ou fluxos de trabalho existentes do i18next.
3. **Familiaridade da equipe**: Sua equipe está confortável com o next-i18next, mas deseja um melhor gerenciamento de conteúdo.

**Para isso, o Intlayer pode ser implementado como um adaptador para o next-i18next para ajudar a automatizar suas traduções JSON em CLI ou pipelines de CI/CD, testar suas traduções e muito mais.**

Este guia mostra como aproveitar o sistema superior de declaração de conteúdo do Intlayer enquanto mantém a compatibilidade com o next-i18next.

---

## Guia Passo a Passo para Configurar o Intlayer com next-i18next

### Passo 1: Instalar Dependências

Instale os pacotes necessários usando seu gerenciador de pacotes preferido:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
bunx intlayer init
```

**Explicações dos pacotes:**

- **intlayer**: Biblioteca principal para declaração e gerenciamento de conteúdo
- **@intlayer/sync-json-plugin**: Plugin para sincronizar declarações de conteúdo do Intlayer para o formato JSON do i18next

### Passo 2: Implemente o plugin Intlayer para encapsular o JSON

Crie um arquivo de configuração do Intlayer para definir os locais suportados:

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
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

O plugin `syncJSON` irá automaticamente encapsular o JSON. Ele irá ler e escrever os arquivos JSON sem alterar a arquitetura do conteúdo.

Se você quiser fazer coexistir esse JSON com os arquivos de declaração de conteúdo do Intlayer (`.content` files), o Intlayer procederá da seguinte forma:

    1. carregar tanto os arquivos JSON quanto os arquivos de declaração de conteúdo e transformá-los em um dicionário Intlayer.
    2. se houver conflitos entre o JSON e os arquivos de declaração de conteúdo, o Intlayer realizará a mesclagem de todos esses dicionários. Isso dependerá da prioridade dos plugins e da prioridade do arquivo de declaração de conteúdo (tudo é configurável).

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
      priority: 1, // Garante que esses arquivos JSON tenham precedência sobre os arquivos em `./public/locales/en/${key}.json`
    }),
    /**
     * Irá carregar e gravar a saída e as traduções de volta nos arquivos JSON no diretório de locales
     */
    syncJSON({
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

Isso irá carregar todos os arquivos JSON no diretório `src` que correspondem ao padrão `{key}.i18n.json` e carregá-los como dicionários do Intlayer.

---

## Configuração do Git

Exclua arquivos gerados do controle de versão:

```plaintext fileName=".gitignore"
# Ignorar arquivos gerados pelo Intlayer
.intlayer
```

Esses arquivos são automaticamente regenerados durante o processo de build e não precisam ser commitados no seu repositório.

### Extensão VS Code

Para uma melhor experiência do desenvolvedor, instale a extensão oficial **Intlayer para VS Code**:

[Instalar a partir do VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

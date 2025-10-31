---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Como automatizar suas traduções JSON do react-i18next usando Intlayer
description: Automatize suas traduções JSON com Intlayer e react-i18next para uma internacionalização aprimorada em aplicações React.
keywords:
  - react-i18next
  - i18next
  - Intlayer
  - Internacionalização
  - i18n
  - Blog
  - React
  - JavaScript
  - TypeScript
  - Gestão de Conteúdo
slugs:
  - blog
  - intlayer-with-react-i18next
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: Mudança para o plugin syncJSON
---

# Como automatizar suas traduções JSON do react-i18next usando Intlayer

## O que é o Intlayer?

**Intlayer** é uma biblioteca inovadora e de código aberto para internacionalização, projetada para resolver as limitações das soluções tradicionais de i18n. Ela oferece uma abordagem moderna para a gestão de conteúdo em aplicações React.

Veja uma comparação concreta com react-i18next em nosso post no blog [react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/react-i18next_vs_react-intl_vs_intlayer.md).

## Por que combinar Intlayer com react-i18next?

Embora o Intlayer forneça uma excelente solução de i18n independente (veja nosso [guia de integração com React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+react.md)), você pode querer combiná-lo com react-i18next por vários motivos:

1. **Base de código existente**: Você possui uma implementação estabelecida do react-i18next e deseja migrar gradualmente para a melhor experiência de desenvolvedor oferecida pelo Intlayer.
2. **Requisitos legados**: Seu projeto exige compatibilidade com plugins ou fluxos de trabalho existentes do react-i18next.
3. **Familiaridade da equipe**: Sua equipe está confortável com o react-i18next, mas deseja uma melhor gestão de conteúdo.

**Para isso, o Intlayer pode ser implementado como um adaptador para o react-i18next, ajudando a automatizar suas traduções JSON em pipelines CLI ou CI/CD, testar suas traduções e muito mais.**

Este guia mostra como aproveitar o sistema superior de declaração de conteúdo do Intlayer enquanto mantém a compatibilidade com o react-i18next.

## Índice

<TOC/>

## Guia passo a passo para configurar o Intlayer com react-i18next

### Passo 1: Instalar Dependências

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

**Descrição dos pacotes:**

- **intlayer**: Biblioteca principal para gerenciamento de internacionalização, declaração de conteúdo e construção
- **@intlayer/sync-json-plugin**: Plugin para exportar declarações de conteúdo do Intlayer para o formato JSON compatível com react-i18next

### Passo 2: Implementar o plugin Intlayer para encapsular o JSON

Crie um arquivo de configuração do Intlayer para definir os seus locais suportados:

**Se você também quiser exportar dicionários JSON para o react-i18next**, adicione o plugin `syncJSON`:

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
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

O plugin `syncJSON` irá automaticamente encapsular o JSON. Ele irá ler e escrever os arquivos JSON sem alterar a arquitetura do conteúdo.

Se você quiser fazer coexistir esse JSON com arquivos de declaração de conteúdo do intlayer (`.content` files), o Intlayer procederá da seguinte forma:

    1. carregar tanto os arquivos JSON quanto os arquivos de declaração de conteúdo e transformá-los em um dicionário intlayer.
    2. se houver conflitos entre o JSON e os arquivos de declaração de conteúdo, o Intlayer irá proceder à mesclagem de todos esses dicionários. Dependendo da prioridade dos plugins e da do arquivo de declaração de conteúdo (todos são configuráveis).

Se alterações forem feitas usando o CLI para traduzir o JSON, ou usando o CMS, o Intlayer atualizará o arquivo JSON com as novas traduções.

Para ver mais detalhes sobre o plugin `syncJSON`, por favor consulte a [documentação do plugin syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md).

## Configuração do Git

É recomendado ignorar os arquivos gerados automaticamente pelo Intlayer:

```plaintext fileName=".gitignore"
# Ignorar arquivos gerados pelo Intlayer
.intlayer
```

Estes arquivos podem ser regenerados durante o seu processo de build e não precisam ser commitados no controle de versão.

### Extensão VS Code

Para uma melhor experiência de desenvolvimento, instale a **Extensão oficial Intlayer para VS Code**:

[Instalar no VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

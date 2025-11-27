---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Intlayer Compiler | Extração Automática de Conteúdo para i18n
description: Automatize seu processo de internacionalização com o Intlayer Compiler. Extraia conteúdo diretamente dos seus componentes para uma i18n mais rápida e eficiente em Vite, Next.js e mais.
keywords:
  - Intlayer
  - Compiler
  - Internacionalização
  - i18n
  - Automação
  - Extração
  - Velocidade
  - Vite
  - Next.js
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - compiler
history:
  - version: 7.3.1
    date: 2025-11-27
    changes: Lançamento do Compiler
---

# Intlayer Compiler | Extração Automática de Conteúdo para i18n

## O que é o Intlayer Compiler?

O **Intlayer Compiler** é uma ferramenta poderosa projetada para automatizar o processo de internacionalização (i18n) em suas aplicações. Ele escaneia seu código-fonte (JSX, TSX, Vue, Svelte) em busca de declarações de conteúdo, extrai-as e gera automaticamente os arquivos de dicionário necessários. Isso permite que você mantenha seu conteúdo localizado junto aos seus componentes, enquanto o Intlayer gerencia e sincroniza seus dicionários.

## Por que Usar o Intlayer Compiler?

- **Automação**: Elimina a cópia manual e colagem de conteúdo nos dicionários.
- **Velocidade**: Extração de conteúdo otimizada garantindo que seu processo de build permaneça rápido.
- **Experiência do Desenvolvedor**: Mantenha as declarações de conteúdo exatamente onde são usadas, melhorando a manutenção.
- **Atualizações em Tempo Real**: Suporta Hot Module Replacement (HMR) para feedback instantâneo durante o desenvolvimento.

Veja o post do blog [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/compiler_vs_declarative_i18n.md) para uma comparação mais aprofundada.

## Por que não usar o Intlayer Compiler?

Embora o compilador ofereça uma excelente experiência "funciona automaticamente", ele também introduz algumas compensações das quais você deve estar ciente:

- **Ambiguidade heurística**: O compilador deve adivinhar o que é conteúdo voltado para o usuário versus a lógica da aplicação (por exemplo, `className="active"`, códigos de status, IDs de produtos). Em bases de código complexas, isso pode levar a falsos positivos ou strings perdidas que exigem anotações manuais e exceções.
- **Extração apenas estática**: A extração baseada em compilador depende de análise estática. Strings que existem apenas em tempo de execução (códigos de erro de API, campos CMS, etc.) não podem ser descobertas ou traduzidas pelo compilador sozinho, então você ainda precisa de uma estratégia i18n de tempo de execução complementar.

Para uma comparação arquitetural mais profunda, veja o post do blog [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/compiler_vs_declarative_i18n.md).

Como alternativa, para automatizar seu processo i18n mantendo controle total sobre seu conteúdo, o Intlayer também fornece um comando de auto-extração `intlayer transform` (consulte a [documentação CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/transform.md)), ou o comando `Intlayer: extract content to Dictionary` da extensão Intlayer VS Code (consulte a [documentação da extensão VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md)).

## Uso

### Vite

Para aplicações baseadas em Vite (React, Vue, Svelte, etc.), a maneira mais fácil de usar o compilador é através do plugin `vite-intlayer`.

#### Instalação

```bash
npm install vite-intlayer
```

#### Configuração

Atualize seu `vite.config.ts` para incluir o plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adiciona o plugin do compilador
  ],
});
```

#### Suporte a Frameworks

O plugin do Vite detecta e lida automaticamente com diferentes tipos de arquivos:

- **React / JSX / TSX**: Suportado nativamente.
- **Vue**: Requer `@intlayer/vue-compiler`.
- **Svelte**: Requer `@intlayer/svelte-compiler`.

Certifique-se de instalar o pacote do compilador apropriado para o seu framework:

```bash
# Para Vue
npm install @intlayer/vue-compiler

# Para Svelte
npm install @intlayer/svelte-compiler
```

### Next.js (Babel)

Para Next.js ou outras aplicações baseadas em Webpack que usam Babel, você pode configurar o compilador usando o plugin `@intlayer/babel`.

#### Instalação

```bash
npm install @intlayer/babel
```

#### Configuração

Atualize seu `babel.config.js` (ou `babel.config.json`) para incluir o plugin de extração. Fornecemos um helper `getCompilerOptions` para carregar automaticamente sua configuração do Intlayer.

```js fileName="babel.config.js"
const { intlayerExtractBabelPlugin } = require("@intlayer/babel");
const { getCompilerOptions } = require("@intlayer/babel/compiler");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      intlayerExtractBabelPlugin,
      getCompilerOptions(), // Carrega automaticamente as opções do intlayer.config.ts
    ],
  ],
};
```

Esta configuração garante que o conteúdo declarado em seus componentes seja automaticamente extraído e usado para gerar dicionários durante o processo de build.

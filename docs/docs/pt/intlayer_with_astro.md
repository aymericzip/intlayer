---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Tradução do Astro i18n - Como traduzir uma aplicação Astro em 2026
description: Aprenda como adicionar internacionalização (i18n) ao seu site Astro com o Intlayer. Siga este guia para tornar seu site multilíngue.
keywords:
  - internacionalização
  - documentação
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: "Adicionado comando init"
  - version: 6.2.0
    date: 2025-10-03
    changes: "Atualização da integração do Astro, configuração e uso"
---

# Traduza o seu site Astro com o Intlayer | Internacionalização (i18n)

## O que é o Intlayer?

**Intlayer** é uma biblioteca de internacionalização (i18n) inovadora e de código aberto projetada para simplificar o suporte multilíngue em aplicações web modernas.

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente**: Usando dicionários declarativos ao nível do componente.
- **Localizar metadados, rotas e conteúdo dinamicamente**.
- **Garantir suporte TypeScript**: Com tipos gerados automaticamente para melhor preenchimento automático e detecção de erros.
- **Beneficiar de recursos avançados**: Como detecção dinâmica de idioma e troca de idioma.

---

## Guia passo a passo para configurar o Intlayer no Astro

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Como internacionalizar sua aplicação com o Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Confira o [modelo da aplicação](https://github.com/aymericzip/intlayer-astro-template) no GitHub.

### Passo 1: Instalar Dependências

Instale os pacotes necessários usando seu gerenciador de pacotes preferido:

```bash packageManager="npm"
npm install intlayer astro-intlayer
# Opcional: Se você adicionar suporte para islands do React
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# Opcional: Se você adicionar suporte para islands do React
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
# Opcional: Se você adicionar suporte para islands do React
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**
  O pacote principal que fornece ferramentas de i18n para gerenciamento de configuração, traduções, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md), transpilação e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).

- **astro-intlayer**
  Inclui o plugin de integração do Astro para vincular o Intlayer ao [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), bem como o middleware para detectar o idioma preferido do usuário, gerenciar cookies e lidar com redirecionamentos de URL.

### Passo 2: Configurar seu Projeto

Crie um arquivo de configuração para definir os idiomas da sua aplicação:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.PORTUGUESE,
      // Seus outros idiomas
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Através deste arquivo de configuração, você pode configurar URLs localizadas, redirecionamentos de middleware, nomes de cookies, localização e extensões de declarações de conteúdo, desativar logs do Intlayer no console e muito mais. Para uma lista completa de parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

### Passo 3: Integrar o Intlayer na sua configuração do Astro

Adicione o plugin `intlayer` à sua configuração do Astro.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> O plugin de integração `intlayer()` é usado para integrar o Intlayer ao Astro. Ele garante a geração dos arquivos de declaração de conteúdo e os monitora em modo de desenvolvimento. Ele define variáveis de ambiente do Intlayer dentro da aplicação Astro e fornece aliases para otimizar o desempenho.

### Passo 4: Declarar seu conteúdo

Crie e gerencie suas declarações de conteúdo para armazenar traduções:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      pt: "Olá Mundo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> As declarações de conteúdo podem ser definidas em qualquer lugar da sua aplicação, desde que estejam incluídas no `contentDir` (por padrão `./src`) e correspondam à extensão do arquivo de declaração de conteúdo (por padrão `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Para mais informações, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md).

### Passo 5: Usar o conteúdo no Astro

Você pode consumir os dicionários diretamente nos seus arquivos `.astro` usando os ajudantes principais exportados do `intlayer`.

```astro fileName="src/pages/index.astro"
---
import { getIntlayer } from "intlayer";
import appContent from "../app.content";

const { title } = getIntlayer('app');
---

<html lang="pt">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>
  </body>
</html>
```

### Passo 6: Roteamento Localizado

Crie segmentos de rota dinâmicos para servir páginas localizadas (por exemplo, `src/pages/[locale]/index.astro`):

```astro fileName="src/pages/[locale]/index.astro"
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

A integração do Astro adiciona um middleware Vite que ajuda no roteamento sensível ao idioma e nas definições de ambiente durante o desenvolvimento. Você também pode criar links entre idiomas usando sua própria lógica ou ferramentas do `intlayer`, como o `getLocalizedUrl`.

### Passo 7: Continuar usando seus frameworks favoritos

Continue construindo sua aplicação usando o framework de sua escolha.

- Intlayer + React: [Intlayer com React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+react.md)
- Intlayer + Vue: [Intlayer com Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Intlayer com Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Intlayer com Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Intlayer com Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+preact.md)

### Configuração do TypeScript

O Intlayer usa o aumento de módulos (module augmentation) para aproveitar o TypeScript, tornando sua base de código mais robusta.

![Preenchimento automático](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Erro de tradução](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Certifique-se de que sua configuração do TypeScript inclua os tipos gerados automaticamente.

```json5 fileName="tsconfig.json"
{
  // ... sua configuração existente do TypeScript
  "include": [
    // ... sua configuração existente do TypeScript
    ".intlayer/**/*.ts", // Incluir tipos gerados automaticamente
  ],
}
```

### Configuração do Git

Recomenda-se ignorar os arquivos gerados pelo Intlayer. Isso evita committá-los no seu repositório Git.

Para fazer isso, adicione as seguintes instruções ao seu arquivo `.gitignore`:

```bash
# Ignorar os arquivos gerados pelo Intlayer
.intlayer
```

### Extensão do VS Code

Para melhorar sua experiência de desenvolvimento com o Intlayer, você pode instalar a **extensão oficial do Intlayer para VS Code**.

[Instalação pelo VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão fornece:

- **Preenchimento automático** para chaves de tradução.
- **Detecção de erros em tempo real** para traduções ausentes.
- **Visualização inline** do conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais informações sobre o uso da extensão, consulte a [documentação da Extensão do VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Aprofunde seu conhecimento

Se quiser saber mais, você também pode implementar o [Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou usar o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) para externalizar seu conteúdo.

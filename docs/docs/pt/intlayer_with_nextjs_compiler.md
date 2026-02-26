---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - Transforme uma aplicação Next.js existente numa aplicação multilíngue em 2026
description: Descubra como tornar a sua aplicação Next.js existente multilíngue usando o Compilador Intlayer. Siga a documentação para internacionalizar (i18n) e traduzir o seu aplicativo com IA.
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Compilador
  - IA
slugs:
  - doc
  - ambiente
  - nextjs
  - compilador
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: Lançamento inicial
---

# Como tornar uma aplicação Next.js existente multilíngue (i18n) (guia i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Vídeo" value="video">

<iframe title="A melhor solução i18n para Next.js? Descubra o Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Código" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Como internacionalizar o seu aplicativo com Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Veja o [Modelo de Aplicação](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) no GitHub.

## Índice

<TOC/>

## Por que a internacionalização de uma aplicação existente é difícil?

Se você já tentou adicionar vários idiomas a um aplicativo que foi construído apenas para um, conhece o esforço. Não é apenas "difícil" - é tedioso. Você precisa passar por cada ficheiro, encontrar cada sequência de texto, e movê-los para ficheiros de dicionário separados.

Em seguida, vem a parte arriscada: substituir todo esse texto por ganchos (hooks) de código sem quebrar o layout ou a lógica. É o tipo de trabalho que paralisa o desenvolvimento de novos recursos por semanas e parece uma refatoração sem fim.

## O que é o Intlayer Compiler?

O **Intlayer Compiler** foi desenvolvido para evitar esse trabalho manual pesado. Em vez de forçar você a extrair as strings manualmente, o compilador faz isso por você. Ele verifica o seu código, encontra o texto e usa IA para gerar dicionários em segundo plano.
Então, ele modifica o seu código durante o build para injetar os hooks i18n necessários. Basicamente, você continua a programar o seu aplicativo como se fosse em um único idioma, e o compilador cuida automaticamente da transformação multilíngue.

> Doc Compilador: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md)

### Limitações

Uma vez que o compilador executa a análise e transformação de código (inserindo hooks e gerando dicionários) no **tempo de compilação** (compile time), ele pode **diminuir a velocidade das builds** na sua aplicação.

Para mitigar este impacto durante o desenvolvimento, você pode definir o compilador para ser executado no modo [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md) ou desativá-lo quando não for necessário.

---

## Guia passo a passo para configurar o Intlayer em uma aplicação Next.js

### Etapa 1: Instale as dependências

Instale os pacotes necessários usando npm:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
bunx intlayer init
```

- **intlayer**

  O pacote principal que fornece as ferramentas de internacionalização para gestão de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md), transpilação e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).

- **next-intlayer**

  O pacote que integra o Intlayer no Next.js. Ele fornece hooks e context providers para internacionalização no Next.js. Além disso, ele inclui o plugin Next.js para integrar o Intlayer com o [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), bem como um proxy para detetar a preferência de idioma do usuário, gerir cookies e tratar redirecionamentos de URL.

### Etapa 2: Configure o seu projeto

Crie um ficheiro de configuração para configurar as línguas da sua aplicação:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.PORTUGUESE],
    defaultLocale: Locales.PORTUGUESE,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    /**
     * Indica se o compilador deve ser habilitado.
     */
    enabled: true,

    /**
     * Diretório de saída para os dicionários otimizados.
     */
    outputDir: "compiler",

    /**
     * Prefixo da chave do dicionário
     */
    dictionaryKeyPrefix: "", // Remover prefixo base

    /**
     * Indica se os componentes devem ser salvos após serem transformados.
     * Dessa forma, o compilador pode ser executado apenas uma vez para transformar o aplicativo e depois pode ser removido.
     */
    saveComponents: false,
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Este aplicativo é um app de mapas",
  },
};

export default config;
```

> **Nota**: Certifique-se de ter a sua `OPEN_AI_API_KEY` configurada nas suas variáveis de ambiente.

> Através deste ficheiro de configuração, pode configurar URLs localizadas, redirecionamentos de proxy, nomes de cookies, a localização e extensão das suas declarações de conteúdo, desativar os logs do Intlayer na consola e muito mais. Para uma lista completa dos parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

### Etapa 3: Integrar o Intlayer na sua configuração do Next.js

Configure a sua configuração do Next.js para usar o Intlayer:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* opções de configuração aqui */
};

export default withIntlayer(nextConfig);
```

> O plugin Next.js `withIntlayer()` é usado para integrar o Intlayer com o Next.js. Ele garante a construção dos ficheiros de declaração de conteúdo e monitoriza-os no modo de desenvolvimento. Define variáveis de ambiente do Intlayer nos ambientes [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Além disso, fornece aliases para otimizar o desempenho e garantir a compatibilidade com componentes de servidor.

### Etapa 4: Configurar o Babel

O compilador Intlayer precisa do Babel para extrair e otimizar o seu conteúdo. Atualize o seu `babel.config.js` (ou `babel.config.json`) para incluir os plugins do Intlayer:

```typescript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

### Etapa 5: Detetar Locale nas suas páginas

Remova tudo do `RootLayout` e substitua pelo seguinte código:

```tsx fileName="src/app/layout.tsx"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

### Etapa 6: Compile os seus componentes

Com o compilador ativado, você **não precisa mais** declarar manualmente os dicionários de conteúdo (como os ficheiros `.content.ts`).

Em vez disso, pode escrever o seu conteúdo diretamente no seu código como strings. O Intlayer analisará o seu código, gerará as traduções usando o provedor de IA configurado e substituirá as strings por conteúdo localizado no momento da build.

Basta escrever os seus componentes com strings fixas no seu idioma padrão. O compilador cuida do resto.

Exemplo de como a sua página pode parecer:

<Tabs>
  <Tab value="Code">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  return (
    <>
      <p>Comece editando</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
  <Tab value="Output">

```ts fileName="i18n/page-content.content.tsx"
{
  key: "page-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        getStartedByEditing: "Get started by editing",
      },
      fr: {
        getStartedByEditing: "Commencez par éditer",
      },
      pt: {
        getStartedByEditing: "Comece editando",
      },
    }
  }
}
```

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditing}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
</Tabs>

- **`IntlayerClientProvider`** é usado para fornecer o locale aos componentes do lado do cliente.
- **`IntlayerServerProvider`** é usado para fornecer o locale aos filhos do servidor.

### (Opcional) Passo 7: Preencher traduções em falta

O Intlayer fornece uma ferramenta CLI para ajudar a preencher traduções em falta. Pode usar o comando `intlayer` para testar e preencher as traduções em falta do seu código.

```bash
npx intlayer test         # Testar se existem traduções em falta
```

```bash
npx intlayer fill         # Preencher traduções em falta
```

> Para mais detalhes, consulte a [documentação da CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/ci.md)

### (Opcional) Etapa 8: Configurar Proxy para Deteção de Locale

Configure um proxy para detetar o locale preferido do usuário:

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> O `intlayerProxy` é usado para detetar o locale preferido do usuário e redirecioná-lo para o URL apropriado, conforme especificado na [configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md). Além disso, permite guardar o locale preferido do usuário num cookie.

### (Opcional) Etapa 8: Alterar o idioma do seu conteúdo

Para alterar o idioma do seu conteúdo no Next.js, a forma recomendada é usar o componente `Link` para redirecionar os usuários para a página localizada correspondente. O componente `Link` permite o prefetching da página, o que ajuda a evitar um recarregamento total da página.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Locale - ex. PT */}
              {localeItem}
            </span>
            <span>
              {/* Idioma no seu próprio Locale - ex. Português */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma no Locale atual - ex. Francés com o locale atual definido para Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma em inglês - ex. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Uma forma alternativa é usar a função `setLocale` fornecida pelo hook `useLocale`. Esta função não permitirá o prefetching da página. Consulte a [documentação do hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/next-intlayer/useLocale.md) para mais detalhes.

### (Opcional) Etapa 10: Otimize o tamanho do seu bundle

Ao usar o `next-intlayer`, os dicionários são incluídos no bundle para cada página por padrão. Para otimizar o tamanho do bundle, o Intlayer fornece um plugin SWC opcional que substitui de forma inteligente as chamadas `useIntlayer` usando macros. Isso garante que os dicionários sejam apenas incluídos nos bundles das páginas que realmente os utilizam.

Para ativar esta otimização, instale o pacote `@intlayer/swc`. Uma vez instalado, o `next-intlayer` detetará e usará automaticamente o plugin:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> Nota: Esta otimização está disponível apenas para Next.js 13 e superiores.

> Nota: Este pacote não é instalado por padrão porque os plugins SWC ainda são experimentais no Next.js. Pode mudar no futuro.

> Nota: Se definir a opção como `importMode: 'dynamic'` ou `importMode: 'fetch'` (na configuração `dictionary`), ele dependerá de Suspense, pelo que terá de envolver as suas chamadas `useIntlayer` numa boundary de `Suspense`. Isso significa que não poderá usar o `useIntlayer` diretamente no nível superior do seu componente Página / Layout.

### Configurar TypeScript

O Intlayer usa module augmentation para obter os benefícios do TypeScript e tornar a sua base de código mais robusta.

![Autocompletar](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Erro de tradução](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Certifique-se de que a sua configuração TypeScript inclua os tipos autogerados.

```json5 fileName="tsconfig.json"
{
  // ... As suas configurações TypeScript existentes
  "include": [
    // ... As suas configurações TypeScript existentes
    ".intlayer/**/*.ts", // Incluir os tipos autogerados
  ],
}
```

### Configuração do Git

Recomenda-se ignorar os ficheiros gerados pelo Intlayer. Isto permite evitar comitá-los no seu repositório Git.

Para fazer isso, pode adicionar as seguintes instruções ao seu ficheiro `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar os ficheiros gerados pelo Intlayer
.intlayer
```

### Extensão do VS Code

Para melhorar a sua experiência de desenvolvimento com o Intlayer, pode instalar a **Extensão oficial do Intlayer para VS Code**.

[Instalar a partir do Marketplace do VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão fornece:

- **Autocompletar** para chaves de tradução.
- **Deteção de erros em tempo real** para traduções em falta.
- **Pré-visualizações inline** do conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como usar a extensão, consulte a [documentação da Extensão do Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

### Ir mais além

Para ir mais além, pode implementar o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou externalizar o seu conteúdo usando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

---
createdAt: 2026-01-10
updatedAt: 2026-08-30
title: "Next.js i18n - Guia completo para traduzir seu aplicativo"
description: "Sem mais i18next. O guia 2026 para criar uma aplicação Next.js multilíngue (i18n). Traduza com agentes de IA e otimize o tamanho do bundle, SEO e desempenho."
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
  - environment
  - nextjs
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Atualizar o uso da API useIntlayer do Solid para acesso direto a propriedades"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Lançamento inicial"
author: aymericzip
---

# Como tornar uma aplicação Next.js existente multilíngue (i18n) (guia i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Vídeo" value="video">

<iframe title="A melhor solução i18n para Next.js? Descubra o Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-no-locale-path-template?file=intlayer.config.ts"
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

<Steps>

<Step number={1} title="Instale as dependências">

Instale os pacotes necessários usando npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> a flag `--interactive` é opcional. Use `intlayer-cli init` se você for um agente de IA.

> Este comando detectará seu ambiente e instalará os pacotes necessários. Por exemplo:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
```

- **intlayer**

  O pacote principal que fornece as ferramentas de internacionalização para gestão de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md), transpilação e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).

- **next-intlayer**

  O pacote que integra o Intlayer no Next.js. Ele fornece hooks e context providers para internacionalização no Next.js. Além disso, ele inclui o plugin Next.js para integrar o Intlayer com o [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), bem como um proxy para detetar a preferência de idioma do usuário, gerir cookies e tratar redirecionamentos de URL.

</Step>

<Step number={2} title="Configure o seu projeto">

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
     * Diretório de saída para os dicionários optimizados.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Inserir apenas o conteúdo no arquivo gerado, sem chave.
     */
    noMetadata: false,

    /**
     * Prefixo da chave do dicionário
     */
    dictionaryKeyPrefix: "", // Remove base prefix

    /**
     * Indica se os componentes devem ser salvos após serem transformados.
     * Dessa forma, o compilador pode ser executado apenas uma vez para transformar o app e depois removido.
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

</Step>

<Step number={3} title="Integrar o Intlayer na sua configuração do Next.js">

Configure a sua configuração do Next.js para usar o Intlayer:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* opções de configuração aqui */};

export default withIntlayer(nextConfig);
```

> O plugin Next.js `withIntlayer()` é usado para integrar o Intlayer com o Next.js. Ele garante a construção dos ficheiros de declaração de conteúdo e monitoriza-os no modo de desenvolvimento. Define variáveis de ambiente do Intlayer nos ambientes [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Além disso, fornece aliases para otimizar o desempenho e garantir a compatibilidade com componentes de servidor.

</Step>

<Step number={4} title="Configurar o Babel">

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

</Step>

<Step number={5} title="Detetar Locale nas suas páginas">

Remova tudo do `RootLayout` e substitua pelo seguinte código:

```tsx fileName="src/app/layout.tsx"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerProvider, LocalPromiseParams } from "next-intlayer";
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
      <body>
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Step>

<Step number={6} title="Compile os seus componentes">

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

</Tab>
</Tabs>

<Tabs>
<Tab label='Intlayer >=9.4' value='>=9.4'>

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

- **`IntlayerProvider`** é montado uma vez, no layout raiz. Ele fornece a localidade para componentes de servidor e cliente, para que as páginas não se envolvam mais.
- Sem um segmento de caminho `[locale]`, a localidade sempre vem da solicitação — o cabeçalho `x-intlayer-locale` definido pelo proxy Intlayer, depois o cookie de localidade — que os hooks do servidor leem por conta própria quando o provedor não foi executado.

</Tab>
<Tab label='Intlayer <9.4' value='<9.4'>

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

- **`IntlayerClientProvider`** é usado para fornecer o locale aos componentes do lado do cliente.
- **`IntlayerServerProvider`** é usado para fornecer o locale aos filhos do servidor.

  > Layout and page cannot share a common server context because the server context system is based on a per-request data store (via [React's cache](https://react.dev/reference/react/cache) mechanism), causing each "context" to be re-created for different segments of the application. Placing the provider in a shared layout would break this isolation, preventing the correct propagation of the server context values to your server components.

</Tab>

</Tabs>

</Step>

<Step number={7} title="Preencher traduções em falta" isOptional={true}>

O Intlayer fornece uma ferramenta CLI para ajudar a preencher traduções em falta. Pode usar o comando `intlayer` para testar e preencher as traduções em falta do seu código.

```bash packageManager="npm"
npx intlayer test         # Testar se existem traduções em falta
```

```bash packageManager="yarn"
yarn intlayer test         # Testar se existem traduções em falta
```

```bash packageManager="pnpm"
pnpm intlayer test         # Testar se existem traduções em falta
```

```bash packageManager="bun"
bun x intlayer test         # Testar se existem traduções em falta
```

```bash packageManager="npm"
npx intlayer fill         # Preencher traduções em falta
```

```bash packageManager="yarn"
yarn intlayer fill         # Preencher traduções em falta
```

```bash packageManager="pnpm"
pnpm intlayer fill         # Preencher traduções em falta
```

```bash packageManager="bun"
bun x intlayer fill         # Preencher traduções em falta
```

> Para mais detalhes, consulte a [documentação da CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/ci.md)

</Step>

<Step number={8} title="Configurar Proxy para Deteção de Locale" isOptional={true}>

Configure um proxy para detetar o locale preferido do usuário:

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> O `intlayerProxy` é usado para detetar o locale preferido do usuário e redirecioná-lo para o URL apropriado, conforme especificado na [configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md). Além disso, permite guardar o locale preferido do usuário num cookie.

> Desde o Intlayer v9, este middleware respeita a opção `routing.enableProxy` (`true` por padrão). Defina `routing.enableProxy: false` em sua configuração para transformá-lo em um pass-through sem remover este arquivo. Veja as [notas de lançamento v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/releases/v9.md).

</Step>

<Step number={9} title="Alterar o idioma do seu conteúdo" isOptional={true}>

Para alterar o idioma do seu conteúdo no Next.js, a forma recomendada é usar o componente `Link` para redirecionar os usuários para a página localizada correspondente. O componente `Link` permite o prefetching da página, o que ajuda a evitar um recarregamento total da página.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale();

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

</Step>

<Step number={10} title="Otimize o tamanho do seu bundle" isOptional={true}>

Ao usar o `next-intlayer`, os dicionários são incluídos no bundle para cada página por padrão. Para otimizar o tamanho do bundle, o Intlayer fornece um plugin SWC opcional que substitui de forma inteligente as chamadas `useIntlayer` usando macros. Isso garante que os dicionários sejam apenas incluídos nos bundles das páginas que realmente os utilizam.

O plugin `@intlayer/babel` já integra a otimização de bundling (veja `babel.config.js`). Mas o plugin `@intlayer/swc` é mais performático. Se você remover o plugin `@intlayer/babel`, você pode usar o plugin `@intlayer/swc`.

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

</Step>

<Step number={11} title="Extrair o conteúdo dos seus componentes" isOptional={true}>

Se você tiver uma base de código existente, transformar milhares de arquivos pode ser demorado.

Para facilitar esse processo, o Intlayer propõe um [compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) / [extrator](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md) para transformar seus componentes e extrair o conteúdo.

Para configurá-lo, você pode adicionar uma seção `compiler` no seu arquivo `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Resto da sua configuração
  compiler: {
    /**
     * Indica se o compilador deve ser ativado.
     */
    enabled: true,

    /**
     * Define o caminho dos arquivos de saída
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Indica se os componentes devem ser salvos após serem transformados. Dessa forma, o compilador pode ser executado apenas uma vez para transformar o aplicativo e depois removido.
     */
    saveComponents: false,

    /**
     * Prefixo da chave do dicionário
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
<Tab value='Extract command'>

Execute o extrator para transformar seus componentes e extrair o conteúdo

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

</Tab>
<Tab value='Babel compiler'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

```bash packageManager="npm"
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add @intlayer/babel --dev
```

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  getExtractPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Extrair conteúdo de componentes para dicionários
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
  ],
};
```

```bash packageManager="npm"
npm run build # Ou npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

</Tab>
</Tabs>
</Step>

</Steps>

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

## Perguntas Frequentes

<FAQ>

<Question title="Quais são as diferentes soluções disponíveis para internacionalizar um app Next.js?">

O campo `i18n` do `next.config.js` não se aplica ao App Router, portanto a camada de localização é sempre uma escolha de biblioteca:

- **`next-intl`**, **`next-i18next` / `i18next`** e **`react-intl`**: catálogos JSON ou ICU carregados por namespace, com chaves escritas manualmente em cada local de chamada.
- **`Lingui`**: orientado à extração, com mensagens ICU compiladas em tempo de build.
- **`Intlayer`**: conteúdo compilado diretamente dos seus componentes em tempo de build, totalmente tipado, com tradução por IA, editor visual e CMS.

Este guia utiliza a configuração do compilador, onde você continua escrevendo strings normais nos seus componentes e os dicionários são gerados automaticamente para você. Consulte [por que Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/interest_of_intlayer.md) e o [benchmark de i18n do Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md).

</Question>

<Question title="Quanto a i18n adiciona ao tamanho do bundle do Next.js?">

Muito menos do que uma configuração baseada em namespaces, porque uma página nunca baixa um catálogo que não renderiza. Os Server Components resolvem seu conteúdo no servidor, e o compilador de build substitui as chamadas `useIntlayer` pelas entradas exatas do dicionário usadas pelo componente, descartando chaves e idiomas não utilizados, enquanto os [dicionários dinâmicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md) dividem o restante por locale. Comparado às alternativas habituais, o Intlayer reduz o tamanho do bundle e da página em até 50%. Consulte [otimização de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) e o [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md).

</Question>

<Question title="Posso migrar do next-intl, next-i18next ou i18next sem reescrever meus componentes?">

Sim, e existem dois caminhos. Você pode migrar o conteúdo progressivamente com o [guia de migração do next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_next-intl_to_intlayer.md) ou o [guia de migração do i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_i18next_to_intlayer.md). Ou pode manter sua API atual inteiramente: os [adaptadores de compatibilidade (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md) expõem exatamente a mesma API que `next-intl`, `react-i18next` e `react-intl`, mas servidos por dicionários Intlayer, de modo que apenas as importações mudam e o código dos componentes permanece idêntico.

</Question>

<Question title="Posso manter meus arquivos de tradução JSON existentes?">

Sim. O [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) mantém seus arquivos `/messages/{locale}/{namespace}.json` como fonte de verdade e gera dicionários Intlayer a partir deles, em ambas as direções. O [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-po.md) faz o mesmo para catálogos gettext, e os [arquivos por locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/per_locale_file.md) permitem dividir o conteúdo por idioma em vez de agrupar todos os locales em um único arquivo.

</Question>

<Question title="Preciso mover meu conteúdo chave por chave?">

Não, e é exatamente isso que este guia configura. Você escreve seus componentes com strings normais no seu locale padrão, e o [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md) analisa o código-fonte a cada build, extrai os textos de interface e gera os dicionários, dispensando qualquer criação ou manutenção manual de chaves.

Dois limites são importantes considerar: o compilador opera por análise estática, de modo que strings criadas apenas em tempo de execução (como códigos de erro de API ou campos dinâmicos de CMS) ficam fora de alcance e precisam de um dicionário declarado da maneira tradicional. Além disso, ele precisa distinguir texto visível de lógicas de aplicação como `className="active"` ou status codes, exigindo algumas anotações em bases de código extensas.

Se preferir manter o controle manual passo a passo, o comando `npx intlayer extract` realiza a mesma extração uma única vez nos arquivos escolhidos, criando um arquivo `.content` ao lado de cada componente para sua revisão. Consulte o [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md).

</Question>

<Question title="Quais ferramentas de editor e agentes de IA estão disponíveis?">

Cinco ferramentas, todas opcionais:

- **[Extensão VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md)**: navegue de uma chave `useIntlayer` diretamente para o arquivo de conteúdo que a declara, extraia conteúdo de um componente e execute build, fill, test, push e pull pela paleta de comandos ou pela aba dedicada do Intlayer.
- **[Servidor LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**: a mesma inteligência em qualquer editor compatível com LSP, com ir para definição, localizar referências, pré-visualizações de valores traduzidos ao passar o mouse, autocompletar e alertas para chaves não declaradas. Também resolve chamadas de `i18next`, `react-i18next`, `next-intl` e `use-intl`, facilitando a migração.
- **[Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)**: expõe a documentação e a CLI do Intlayer para Cursor, VS Code, Claude Desktop, Claude Code e ChatGPT, permitindo que os assistentes respondam com base na documentação atualizada e executem comandos como `intlayer fill`.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)**: habilidades focadas como `intlayer-config`, `intlayer-cli` e `intlayer-content`, além de uma por framework, ensinando ao agente suas regras de roteamento e tipos de nós.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/eslint.md)**: a regra `no-raw-text` identifica strings hardcoded, com regras adicionais para chaves estáticas e conteúdo não utilizado.

</Question>

<Question title="Devo usar o compilador ou declarar meu conteúdo manualmente?">

Use o compilador quando quiser introduzir i18n em uma base de código existente com o menor atrito possível: seus componentes continuam como estão e os dicionários são criados automaticamente. Declare o conteúdo manualmente, como demonstrado no [guia padrão do Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_16.md), quando desejar controle explícito sobre chaves, estrutura e reutilização. Ambos os métodos podem coexistir harmoniosamente na mesma aplicação.

</Question>

<Question title="Por que preciso configurar o Babel?">

O passo 4 aborda essa questão. O compilador lê seus componentes por meio de uma transformação do Babel, portanto o Next.js precisa de um `babel.config.js` para que a etapa de extração seja executada. O comando `npx intlayer init --interactive` cria essa configuração automaticamente para você ao selecionar a opção com compilador.

</Question>

<Question title="O que acontece com strings que o compilador não consegue identificar?">

Elas permanecem sem tradução, pois o compilador trabalha exclusivamente com análise estática. Qualquer conteúdo montado em tempo de execução, como mensagens de erro de API, campos dinâmicos de CMS ou strings montadas por concatenação, deve ser declarado normalmente em um arquivo de conteúdo. Execute `npx intlayer test` para identificar o que está pendente.

</Question>

<Question title="Como preencho as traduções ausentes?">

O passo 7 explica esse processo. O comando `npx intlayer fill` envia o conteúdo extraído para o LLM de sua preferência, utilizando seu próprio provedor e chave de API, e a flag `--git-diff` limita a tradução ao que foi alterado na branch. Consulte o [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/fill.md) e a [integração CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/CI_CD.md).

</Question>

<Question title="Como o locale é detectado?">

O passo 5 lê o locale em suas páginas e o passo 8 adiciona o proxy que o resolve a partir da URL, de um cookie ou do header `Accept-Language`. A propriedade `routing.mode` define se o locale deve ou não aparecer no caminho da URL. Consulte a [referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Question>

<Question title="O Intlayer suporta plurais, gênero e rich text?">

Sim: [formas plurais](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/plurial.md), [conteúdo baseado em gênero](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/gender.md), condições, [inserções](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/markdown.md) e [formatadores](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/formatters.md) para números, datas e moedas.

</Question>

<Question title="Como tradutores podem editar o conteúdo sem tocar no código?">

Por meio do [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md), que roda em sua própria infraestrutura e permite editar textos diretamente no app em execução, ou pelo [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md), que externaliza o conteúdo para que ele possa ser alterado sem a necessidade de novos deploys.

</Question>

<Question title="O Intlayer é gratuito e de código aberto?">

Sim, sob a licença Apache 2.0, uso comercial incluído. O CMS hospedado é um serviço pago opcional que também pode ser [auto hospedado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md).

</Question>

</FAQ>

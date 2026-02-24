---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - Transforme uma aplicação Next.js existente numa aplicação multilíngue (guia i18n 2026)
description: Descubra como tornar a sua aplicação Next.js existente multilingue usando o Intlayer Compiler. Siga a documentação para internacionalizar (i18n) e traduzir o seu aplicativo usando IA.
keywords:
  - Internacionalização
  - Tradução
  - Documentação
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Compilador
  - IA
slugs:
  - doc
  - configuracao
  - nextjs
  - compilador
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: Versão Inicial
---

# Como tornar uma aplicação Next.js existente multilíngue (i18n) (guia i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Vídeo" value="video">
  
<iframe title="Melhor solução i18n para Next.js? Descubra o Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

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

Se você já tentou adicionar vários idiomas a um aplicativo que foi construído apenas para um, conhece a dificuldade. Não é apenas "difícil" - é tedioso. Você precisa passar por cada ficheiro/arquivo, encontrar cada sequência de texto, e movê-los para ficheiros de dicionário separados.

Em seguida, vem a parte arriscada: substituir todo esse texto por ganchos (hooks) de código sem quebrar o layout ou a lógica. É o tipo de trabalho que paralisa o desenvolvimento de novos recursos por semanas e parece uma refatoração sem fim.

## O que é o Intlayer Compiler?

O **Intlayer Compiler** foi desenvolvido para ignorar esse trabalho manual pesado. Em vez de forçar você a extrair as strings (sequências) manualmente, o compilador faz isso por você. Ele verifica o seu código, encontra o texto e usa Inteligência Artificial para gerar dicionários em segundo plano.
Então, ele modifica o seu código fonte durante a etapa de compilação (build) para injetar os hooks i18n necessários. Basicamente, você continua a programar o seu aplicativo como se fosse em um único idioma, e o compilador cuida de tudo para que a versão multilingue funcione perfeitamente de forma automática.

> Documentação do compilador: https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compiler.md

### Limitações

Uma vez que o compilador executa a análise e transformação de código (inserindo hooks e gerando dicionários) no **tempo de compilação** (compile time), pode portanto **diminuir a velocidade das "builds"** na sua aplicação.

Para limitar este impacto durante o seu desenvolvimento, você pode definir o compilador para ser executado num modo de [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md) ou desativá-lo assim que não for necessário.

---

## Guia passo a passo para configurar o Intlayer em uma aplicação Next.js

### Etapa 1: Instale as dependências

Instale os pacotes necessários usando o seu gestor favorito:

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

  O pacote unificador que fornece as ferramentas fundamentais de internacionalização para lidar com traduções, configuração, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md) e compilação, para além da [interface de comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).

- **next-intlayer**

  O pacote responsável pela integração inteligente do ecossistema Intlayer num projeto Next.js. Além de fornecer hooks e context providers específicos, ele vem com um plugin embutido que interliga de forma incrível tanto o [Webpack](https://webpack.js.org/) como o mais recente [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Estão também inclusos métodos para middleware, identificação do proxy do usuário, roteamento e gestão de cookies.

### Etapa 2: Configure o seu projeto

Irá precisar de estruturar um ficheiro de configuração (config) com o idioma base e as localizações preferidas que irá abranger na sua aplicação.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH], // As diversas línguas aplicadas
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // É possível colocar como 'build-only' para acelerar os ritmos no modo dev/desenvolvimento
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Sem aplicação prefixa 'comp-'
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Esta aplicação é um mero App de mapas geográficos",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // É possível colocar como 'build-only' para acelerar os ritmos no modo dev/desenvolvimento
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Sem aplicação prefixa 'comp-'
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Esta aplicação é um mero App de mapas geográficos",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // É possível colocar como 'build-only' para acelerar os ritmos no modo dev/desenvolvimento
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Sem aplicação prefixa 'comp-'
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Esta aplicação é um mero App de mapas geográficos",
  },
};

module.exports = config;
```

> **Aviso Importante**: Confirme ter estipulado seu `OPEN_AI_API_KEY` adequadamente nas variáveis do ambiente virtual antes de inicializar o projeto e sua conexão remota ao AI (Variáveis .env).

> Com a vasta extensão oferecida, além disso o ficheiro/arquivo propicia definições aos domínios e parâmetros com o Proxy/middleware associado a URLs regionalizados, os cookies, como estruturar e apontar os ficheiros dos dados das strings ou onde desabilitar certas mensagens do terminal pela lib do Intlayer. Olhe por este manual a base ampla e mais informações completas para se adaptar sobre [configurações](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

### Etapa 3: Integração do sistema Intlayer à base do Next.js.

Habilita a execução das ações via seu `next.config`:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* Deixe os parâmetros nativos contidos nesta chave se assim as ter. */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Deixe os parâmetros nativos contidos nesta chave se assim as ter. */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Deixe os parâmetros nativos contidos nesta chave se assim as ter. */
};

module.exports = withIntlayer(nextConfig);
```

> O extensor acoplado `withIntlayer()` do Next.js realiza a inclusão do motor de Intlayer via Next em modo subjacente, gerencia atualizações contextuais de desenvolvimento das builds dos dicionários em formato real "WatchMode" em compatibilidade mútua de [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) e de [Webpack](https://webpack.js.org/). Também concede optimizações como redirecionamentos automáticos por pseudónimos na raiz de Server Components.

### Configurar Babel

O compilador Intlayer precisa do Babel para extrair e otimizar seu conteúdo. Atualize seu `babel.config.js` (ou `babel.config.json`) para incluir os plugins do Intlayer:

```js fileName="babel.config.js" codeFormat="commonjs"
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

### Etapa 4: Estabeleça a injeção Global Local das rotas de idiomas.

Sua estruturação do ficheiro RootLayout carece agora ser envolvida desta maneira:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
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

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";
import { IntlayerClientProvider } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
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

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");
const { IntlayerClientProvider } = require("next-intlayer");
const { getHTMLTextDir, getIntlayer } = require("intlayer");
const { getLocale } = require("next-intlayer/server");
const { generateStaticParams } = require("next-intlayer");

const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

module.exports = {
  default: RootLayout,
  generateStaticParams,
  generateMetadata,
};
```

### Etapa 5: Promova sua própria inserção dos textos (Processo Automático e Silencioso).

Livre-se de precisar estabelecer dicionários paralelos (os `.content.ts`). Graças ao estado ativo do Compilador nativo, isto **acabou**.

Nesta alternativa você insere apenas o conteúdo pretendido com String puro ou direto nas funções do código visual de react. O Intlayer vasculha toda a árvore do algoritmo, formula as traduções usando o back-end da provedora AI listada (Exemplo OpenAI e similares) e providenciará os elementos finais do app em background perante compilação no deploy/build. Tudo perfeitamente automatizado.

### Etapa 6: Utilize o conteúdo em seu código

Basta escrever seus componentes com strings fixas em seu idioma padrão. O compilador cuida do resto.

Exemplo de como sua página pode parecer:

<Tabs>
  <Tab value="Code" label="Código">

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
  <Tab value="Output" label="Saída">

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

- Lembrete sobre **`IntlayerClientProvider`**: Este envia por client-side a transmissão do pacote do ficheiro do Locale a descer para instâncias componentes-filhos no DOM.
- Por seu lado o **`IntlayerServerProvider`** opera provendo informações as componentes SSR (De Servidor), distribuindo conteúdo traduzido via Next antes desta página dar sinal no carregamento Client Visual (SEO em mente).

### (Opcional) Passo 7: Preencher traduções em falta

O Intlayer fornece uma ferramenta CLI para o ajudar a preencher traduções em falta. Pode usar o comando `intlayer` para testar e preencher as traduções em falta no seu código.

```bash
npx intlayer test         # Testar se existem traduções em falta
```

```bash
npx intlayer fill         # Preencher traduções em falta
```

### (Opcionalmente) Etapa 8: Implementando Proxy Interceptivo por Predileção Intuitiva do Utilizador (I18n Middleware Proxy).

Basta exportar nossa Middleware Proxy padrão ou modificá-la as requisições que preferir para roteamento, gestão natural das requisições URL em caso que o cliente acessou em URL Base, e salvamento contínuo em formato `Cache Cookie` p/ uso nas requisições sem que o App Next carregasse mais tarde:

```typescript fileName="src/proxy.ts" codeFormat="typescript"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.mjs" codeFormat="esm"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.cjs" codeFormat="commonjs"
const { intlayerProxy } = require("next-intlayer/proxy");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { proxy: intlayerProxy, config };
```

> Como supradito a camada de proxy customizada (denominada `intlayerProxy`), visa redirecionar de foma engenhosa seções URLs via predileção do aparelho originário por Request Headres. Salvando e propagando as sessões conforme estipulado outrora e regulado perante a base de Regras presentes nas [Configurações do Arquivo/ficheiro intlayer.config](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

### (Opcionalmente) Etapa 9: Um Módulo visual p/ Troca entre Idiomas de maneira Orgânica "Switcher/Seletor"

Quando lidamos nos trâmites multilinguística e precisamos provar interface ao visitante que tem capacidade e liberdade nas mãos em visualizar uma tradução distinta, se pode elaborar seletores ou listas a serem adicionadas junto com um hook dinâmico `useLocale` (Evita recargas intensivas via client ou propõe navegações silenciosas sem perdas drásticas à experiência Next.js do App e recargas).

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat="typescript"
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
              {/* Mostra Locale Encurtado - eg. PT */}
              {localeItem}
            </span>
            <span>
              {/* O Próprio termo por extenso de onde você está - eg. Português se eu mudei para a bandeira/PT */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Como a nação do localeItem chama sua própria Lingua Mater - eg. Français (Se eu clico p/ Fr-FR estando em ambiente Pt) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Ou algo genérico padrão num idioma neutro como base Inglês mostrando os idiomas - eg. Portuguese  */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
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
              {/* Mostra Locale Encurtado - eg. PT */}
              {localeItem}
            </span>
            <span>
              {/* O Próprio termo por extenso de onde você está - eg. Português se eu mudei para a bandeira/PT */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Como a nação do localeItem chama sua própria Lingua Mater - eg. Français (Se eu clico p/ Fr-FR estando em ambiente Pt) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Ou algo genérico padrão num idioma neutro como base Inglês mostrando os idiomas - eg. Portuguese  */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales, getHTMLTextDir, getLocaleName } = require("intlayer");
const { useLocale } = require("next-intlayer");

export const LocaleSwitcher = () => {
  const path
  const { locale availableLocales, setLocale } = useLocale({
       onChange: ()=> window.location.reload(),
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
              {/* Mostra Locale Encurtado - eg. PT */}
              {localeItem}
            </span>
            <span>
              {/* O Próprio termo por extenso de onde você está - eg. Português se eu mudei para a bandeira/PT */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Como a nação do localeItem chama sua própria Lingua Mater - eg. Français (Se eu clico p/ Fr-FR estando em ambiente Pt) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Ou algo genérico padrão num idioma neutro como base Inglês mostrando os idiomas - eg. Portuguese  */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Outros parâmetros acoplativos de usabilidade, sintaxe avançada em react através do React hook interno `useLocale` via param/variável de alteração livre `setLocale` (Ao invés do Next Route Link direto) e o modelo/funções das quais providenciam podem ser vistos a fundo lendo as docs detalhadas nesta [Documentação da ferramenta hook `useLocale`.](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/next-intlayer/useLocale.md).

### (Opcionalmente) Etapa 10: Busque ou obtenha O estado Local perfeitamente por processos "Server Action / Fetching" nas Bases.

Alguns projetos demandam extrair informações não exibitíveis atráves de interface como E-Mail dinâmico que irá enviar p/ clientes em diversas regiões dependendo por Server-Side do Next JS e afins. Recomenda-se para tais usar e embutir na execução do Backend SSR/Server actions o injetor da função `getLocale` provindo via utilidade `@next-intlayer/server`:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Executa uma Server Action / Ação do Servidor através o `locale` aqui (ex: enviar uma newsletter em Pt ou em Fr etc.).
};
```

> Em questão a ordem procedimental de resolução desta ação/rotina Next pela função `getLocale`, esta usa estritas camadas fallbacks que irão identificar no Servidor nesta Ordem Decrescente:
>
> 1. Checa a Header dos Requests se os dados de envio estão localizados pela query enviada lá pela Middleware originária/proxy interno Next.
> 2. Procura Session do tipo `cookie`, onde salva se configurado no app as permissões e últimas linguagens pré-selecionadas.
> 3. Examina preferência técnica geral/padrão transmitidas ao servidor por meio das flags de dispositivo (System do Usuário via Headers / "User-Agent Locale").
> 4. E caso ausentes ou por motivos atípicos, é garantido um Fail-over usando a chave de idioma definido a raiz principal como idioma nativo em `intlayer.config` "Default locale".

### (Opcionalmente) Etapa 11: Adquira Melhor Capacidade nos Arquivos Processados no modo Build com Plu-Gins Avançados "SWC Plugin".

Frameworks pesados por rotina "Webpack\Next JS Client" tem atrelado um percalço padrão, transferir a lista toda e os metadados do `dicionário multilingua / json bundle code` as requisições em árvore no Client Render. Tal atitude inibe os recursos rápidos dos Servidores ao transferisse desnecessariamente dados a ser interpretados localmente e consequentemente diminuiu performance global dos sistemas nos tamanhos do Load.
Todavia! O Next hoje provê (Versões > 13 acima / Usando Turbopack Macro / SWC Extensibility) plugins avançados de transpilações e encurtamento cirúrgico as requisições, onde apenas aquele específico item/palavra é inserido, garantindo peso Nulo da library na compilação.
O ecossistema dispõe deste avanço para Node, instalando perfeitamente do repositório em desenvolvimento em sua build pipeline : ` @intlayer/swc`.

Você insere via terminal como Dependency no mode dev as dependências do `package.json`:

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

> Importante Frisar 1: Estas premissas são embasadas p/ Vercel no Ecossistemas Next.js das últimas gerações atuais Next 13 Plus. Outros mais rudimentares perdem total acesso as tecnologias do SWC Macro e/ou da estrutura App directory/Turbopack.

> Importante Saber 2: Como é atípico do Vercel atualizar versões constantes nos Builds SWC Macro sem anúncios prévios o plugin atual pode demonstrar ligeira instabilidade em alguns builds pois as funções seguem nos Status (React experimental SWC APIs). Requer atenção nos logs Next caso os atualize futuramente para o Node Package (NPM) Intlayer.

> Informação sobre Assincronicidade no UI App Render na Árvore - Adverte-se que os modos do NextJS no DOM Tree, onde ao empregador a Flag de carregamento assíncrono das importações para as funções/hook `useIntlayer` (Ex: opções `importMode` como `dynamic/fetch` e Async no Server Layout Nodes), tem de estritamente circunscrever seu App dentro e perfeitamente da hierarquia Tags React `Suspense`. Caso a rotina de delay de processamento atue e você tente buscar o UI, sem o envolver pela Tag em um escopo "Suspense-Fallback" O build/server irá abortar informando Erro grave interno provindo pela Engine do Vercel Next! Adéque sua arquitetura React visual seguindo metodologias Suspense Boundaries para essas flags na raiz.

### Observador/Vigilante no Workflow de Alterações constantes em Turbopack (Next.js Watcher Dev).

No recém desenvolvido e integrado gerador (O Bundler de Código de Alto Tempo) nativo da Vercel para substituir o WebPack (O famoso Turbopack do App Next CLI e comando "next dev --turbopack"), sua tecnologia limita processos assíncronos geradores criados p/ rodar no background do "Webpack Native Plugins", assim Intlayer que costuma rodar com Hot Reload atualizando perfeitamente arquivos modificados do "Dictionary Live-Build Output (.content Json File generation em .intlayer/ )" é comprometido falhando nas atualizações, travando e requerendo Recargas contínuas e Reboots pelo console no Process Mode Next/Dev Node.

O Contorno Oficial para se não abrir um terminal dedicado de Run é acionar na Package script o App da Ferramenta de Vigia acoplado (CLI script) para se ativar mutuamente.

Insira / Adapte sua "Flag Code" JSON em seu File principal root: `package.json`:

```json5 fileName="package.json"
{
  "scripts": {
    "dev": "intlayer watch --with 'next dev'", // Inicia de modo simultâneo um watcher da Ferramenta Intlayer no Turbo enviando junto ao comando processual a start-up nativa do Next DEV.
  },
}
```

> Nota se a build da livraria por motivos do seu projeto usar bibliotecas antiquadas (`intlayer<@6.X` inferior ao Update de Agosto/24 Series 7x) o comando e argumentador Turbo será via Flag do OS obrigatória (` --turbopack`) atada à sintaxe Next na chave dev: `"dev": "intlayer watch --with 'next dev --turbopack'"`. Nas construções mais habituais recém do pacote Intlayer não necessitam isso (Pós atualização >/= "@v7 Node Next Intlayer").

### Adicione o Preenchimento Sintático no Code do Visual Scripting para React & Tipagem Typecript TS

Trabalhando no VSCode c/ o Autocompletion via TS ? É imprescindível habilitar a descoberta as definições Types (As Augmented Modules Types Definition criadas num Output Automático de Geração/Generation).

Esta configuração irá ativar a "Leitura Inteligente/Autocomplete Popups Menu Code Hinting", prevendo sugestões para suas variáveis JSON strings importadas, em simultâneo exibirá "Linelints Warnings" quando cometer erros fatais caso faltem Traduções/Ou se declarou fora das strings cadastradas (Missing Keys on dictionary etc...):

![Sinalizador UI do Autocomplete exibindo as opções String p/ Chaves/Keys](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Linter Vermelho Visual da Ferramenta VS apontando ao programador Chave ou Dicionário I18n inexistente (Tipagem TypeScript no App)](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Por conseguinte e por vias a isso bastará que as matrizes base `compiler/tsconfig.json` do Typescript do App encontrem os ficheiros Typescripts automáticos do Root Output/Generation. Introduza o root no JSON Array de includes `tsconfig.json` dessa infraestrutura:

```json5 fileName="tsconfig.json"
{
  // A Estruturação Principal //
  "include": [
    // Inclusões/Arquivos padrão (Exp ".next", Env etc) e //
    ".intlayer/**/*.ts", // Alias vital Types/Root Inserido para o System Intlayer!
  ],
}
```

### Regras na Prevenção contra Repositório na Cloud e Conflitos CI/CD - Adicione exclusões em Git no ".gitignore"

É obrigatório isolar de push aos "Pull requests", Gits na "Pipeline", Nuvem/Branch Teams de Merge Commits etc a Raiz Automática (Root Outputs/Background Processing/Types Definitions e JSON/Data generated Dictionary Build) nativa gerada.

Sua arquitetura assíncrona criará constante instabilidades no Source Control Node. Elimine qualquer evento atrelando no indexer file do Git seu Root Folder respectivo:

```plaintext fileName=".gitignore"
# Comando para Excluir na Nuvem Git os dados Build Locais dinâmicos do Ecossistema Interno I18N. Mantenha excluídos como prioridade:
.intlayer
```

### Empodere ainda mais o Código Local (Instale Extensões Extras: O VS Code / Cursor Integrator).

No quesito Code Edition via "VS Studio Dev Apps" (Para Programações Web Frontend / IDE Typescript React etc) há uma App Extensão no Mercado super aprovada ("Oficinal Ext - Plugin System"). Para ampliar os aspectos do VS: App "Intlayer VS Code Extension"

Adquira do Dev-Portal (Plugin VSC da Microsoft):
[App oficial Link / Marketplace de Extensão](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

A instalação fará mutações/integrações extremamente efetuosas as capacidades:

- **Popup Viewer Preview in Locales / "Visualizador Transparente"**: Colocando sobre (Passar O Rato) os Componentes e Keys / Strings I18n das quais programam sem haver cliques exaustivos (Exibe janelas na aba com o Out-put textual natural direto como Output Result final renderizado) "ToolTip preview of outputs Content Result string".
- **Error Live Linting UI Notifier Red Line / "Prevenções ao Vivio/Alerta "**: Exibirá falhas lógicas e visual por baixo a Vermelho em Strings.
- **Auto Code Constructor - Click / Keyboard "Keys & HotKey Dictionary Bind Editor"**: Pressionando a Shortcut e sem esforço exportará na linha selecionada/marcada nos Docs Code do Componente os registros de String em direto export a Ficheiros Content Code Base dos Dicionários (.content / Files) com import dos Imports Locales Hook! Evitando do Code Editor mudar janelas as Files em pastas / Roots distintas de Componentes! Aprenda o uso no Guia para [VS Plugins Extension Install / Tutorial (inglês/pt)](https://intlayer.org/doc/vs-code-extension).

### Desvende novos métodos & Avance nas Capacidades - UI do Usuário e API/CMS sem intervenções Code Server-Side

Acabou o processo inicial base Code I18N no Repositório! Agora busque elevar e alavancar através da união das Ferramentas UI Client Editor (App Painel no Browser In-Layout p/ Mudar texto/Visualizar em Live/Dev Next-Intlayer) da Intlayer: Que libera às equipes da sua Agencia Web as Modificações Edit/Text Node e Linguagem em Direto no Front sem ter a "Libraria do Component UI/Code JS", agilizando de minutos do Git Pipeline Commit & Re-Deploying App Time p/ Edições Imediatas pelo Site [O Guia de Estudo: Implemente seu UI Web Editor In Component On-Site React Panel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md).

Quer levar os metadados além dos arquivos locais do Github Client? Enviar suas definições i18n pro Banco do Cloud Storage Server e usar via Fetch Remote-CMS (Edição Online Extracomputador em CMS do Headless System via Intlayer Back-End Web Console Management). Perfeito p/ Integração Next Node a App Escalonável Online. Consulte e Leia as orientações: [Configuração do Node CMS Headless Mode via Intlayer Cloud](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).

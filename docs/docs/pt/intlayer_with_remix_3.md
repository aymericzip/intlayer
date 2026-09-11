---
createdAt: 2026-09-09
updatedAt: 2026-09-11
title: "Remix 3 i18n - Guia completo para traduzir a sua aplicação"
description: "Esqueça o i18next. O guia 2026 para criar uma aplicação Remix 3 multilíngue (i18n). Traduza com agentes de IA e otimize o tamanho do bundle, SEO e desempenho."
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Remix 3
  - Remix
  - JavaScript
  - TypeScript
  - Padrões Web
slugs:
  - doc
  - environment
  - remix-3
applicationTemplate: https://github.com/aymericzip/intlayer-remix-3-template
applicationShowcase: https://intlayer-remix-3-template.vercel.app
history:
  - version: 9.5.0
    date: 2026-09-09
    changes: "Documentação inicial para Remix 3"
author: aymericzip
---

# Traduza o seu site Remix 3 utilizando o Intlayer | Internacionalização (i18n)

Este guia demonstra como integrar o **Intlayer** para uma internacionalização perfeita em aplicações **Remix 3**, com roteamento com suporte a idiomas, declarações de conteúdo com segurança de tipos, componentes JSX renderizados no servidor e compatibilidade multi-runtime no Node.js, Bun, Deno e Cloudflare Workers.

## O que é o Remix 3?

O **Remix 3** representa uma mudança arquitetural fundamental em direção a um **framework web combinável e independente de runtime, construído inteiramente sobre padrões web**. Em vez de estar vinculado a empacotadores específicos ou a APIs proprietárias de servidor, o Remix 3 é distribuído em pacotes combináveis de propósito único:

- **`remix/fetch-router`** (ou `remix/router`): Roteamento leve e em conformidade com os padrões, baseado na Fetch API (`Request` e `Response`).
- **`remix/ui`**: Um modelo de componentes JSX (`jsxImportSource: "remix/ui"`). Um componente é uma função de setup que retorna uma função de renderização, parecendo React, mas mantendo o estado em closures simples de JavaScript.
- **`remix/middleware/render`**: Instala `context.render(<Page />)` em cada requisição, transmitindo a árvore JSX em uma `Response` HTML.
- **`remix/node-fetch-server`**: Adaptadores de servidor para Node.js, com suporte nativo para Bun, Deno e runtimes edge.
- **`remix/cookie`**: Análise e serialização de cookies criptograficamente seguros.

Combinado com o **Intlayer**, obtém um sistema de internacionalização completo que oferece segurança em tempo de compilação, traduções automatizadas com IA, renderização no servidor sem overhead e roteamento fluido por idioma.

## Índice

<TOC/>

## Por que escolher o Intlayer em vez de alternativas?

Em comparação com soluções tradicionais como o `i18next` ou carregadores de tradução sob medida, o Intlayer oferece uma experiência de desenvolvimento integrada e otimizada para a arquitetura web moderna:

<AccordionGroup>
<Accordion header="Cobertura total do Remix 3 e Padrões Web">

O Intlayer foi desenvolvido para funcionar nativamente com os padrões web (`Request`, `Response`, `Headers` e `URL`). Ele integra-se sem esforço no roteador Fetch do Remix 3 através de um middleware leve, extraindo idiomas de caminhos de URL, cookies ou cabeçalhos `Accept-Language` sem prendê-lo a um runtime específico.

</Accordion>
<Accordion header="Declarações de Conteúdo com Segurança de Tipos">

Diga adeus às chaves JSON soltas e a falhas em tempo de execução causadas por chaves ausentes. O Intlayer aplica verificações do TypeScript em todos os idiomas declarados, avisando-o no momento da compilação caso falte uma tradução ou haja alguma inconsistência.

</Accordion>
<Accordion header="Zero Overhead de Pacote no Servidor">

O Remix 3 renderiza componentes JSX no servidor e transmite o HTML para o cliente. Apenas o texto resolvido para o idioma solicitado é enviado no fluxo de resposta. Nenhum bundle de hidratação no cliente ou catálogo pesado de tradução é necessário, a menos que um componente seja explicitamente marcado como `clientEntry`.

</Accordion>
<Accordion header="Pronto para Agentes de IA e Automação">

O Intlayer coloca as declarações de conteúdo (`.content.ts`) diretamente junto da lógica de rotas, reduzindo o contexto de tokens exigido por Grandes Modelos de Linguagem (LLMs). Comandos CLI integrados como `intlayer fill` e `intlayer test` permitem automatizar traduções em pipelines de CI/CD pelo custo direto do seu provedor de IA.

</Accordion>
<Accordion header="Editor Visual e Integração CMS">

Além dos fluxos de trabalho baseados em código, o Intlayer disponibiliza um [Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) auto-hospedado e um [CMS Remoto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md), permitindo que editores e tradutores atualizem o conteúdo sem necessidade de novo deploy.

</Accordion>
</AccordionGroup>

## Guia Passo a Passo

<Tabs defaultTab="code">
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-remix-3-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Como internacionalizar a sua aplicação com o Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-remix-3-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo Intlayer Remix 3 Template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Veja o [Modelo de Aplicação](https://github.com/aymericzip/intlayer-remix-3-template) no GitHub.

<Steps>
<Step number={1} title="Instalar Dependências">

Instale o `intlayer` e o `remix` (versão 3) usando o seu gestor de pacotes preferido:

```bash packageManager="npm"
npm install intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix@next
```

- **`intlayer`**: Motor principal de internacionalização que fornece gestão de configurações, declaração de dicionários (`t()`, `Dictionary`), ferramentas CLI e interpretador em tempo de execução.
- **`remix`**: O pacote unificado do framework Remix 3 que exporta `remix/router`, `remix/routes`, `remix/ui`, `remix/middleware/render` e `remix/node-fetch-server`.

</Step>
<Step number={2} title="Configurar o Intlayer">

Crie um arquivo `intlayer.config.ts` na raiz do seu projeto para declarar os idiomas suportados e as configurações de internacionalização:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.PORTUGUESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.PORTUGUESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.PORTUGUESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Para configurações adicionais, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Step>
<Step number={3} title="Declarar o Conteúdo Multilíngue">

Declare o seu conteúdo localizado em um arquivo `.content.ts`:

```typescript fileName="src/home.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      pt: "Bem-vindo ao Remix 3",
      en: "Welcome to Remix 3",
      fr: "Bienvenue sur Remix 3",
      es: "Bienvenido a Remix 3",
    }),
    description: t({
      pt: "Uma aplicação combinável baseada em padrões web com i18n nativa.",
      en: "A composable, web-standard application with native i18n.",
      fr: "Une application composable basée sur les standards web avec i18n native.",
      es: "Una aplicación componible basada en estándares web con i18n nativa.",
    }),
    switchLanguage: t({
      pt: "Alterar idioma:",
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

> O Intlayer também suporta formatos JSON, YAML e CommonJS. Veja a [Documentação sobre Declaração de Conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md).

</Step>
<Step number={4} title="Compilar os Dicionários Intlayer">

Compile as definições do dicionário para gerar os tipos TypeScript e registros de execução:

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="pnpm"
pnpm dlx intlayer build
```

```bash packageManager="yarn"
yarn dlx intlayer build
```

```bash packageManager="bun"
bun x intlayer build
```

Isso compila o seu conteúdo no diretório de artefatos `.intlayer`, permitindo autocompletar completo no TypeScript e consulta rápida aos dicionários.

</Step>
<Step number={5} title="Implementar o Middleware do Intlayer">

O Remix 3 fornece um pipeline de middleware combinável por meio de `createRouter({ middleware: [...] })`.

Crie um middleware do Intlayer que resolva o idioma de cada requisição seguindo:

1. O prefixo do caminho da URL via `getLocaleFromPath` do Intlayer (por exemplo, `/pt` ou `/fr`).
2. O utilitário `getLocale` do Intlayer, que negocia automaticamente através de cookies (`INTLAYER_LOCALE`), cabeçalhos customizados (`x-intlayer-locale`), cabeçalhos padrão `Accept-Language` e o seu `defaultLocale`.

```typescript fileName="src/middleware/intlayer.ts" codeFormat={["typescript", "esm"]}
import {
  defaultLocale,
  getCookie,
  getLocale,
  getLocaleFromPath,
  type Locale,
} from "intlayer";
import { createContextKey, type Middleware } from "remix/router";

/**
 * Chave de contexto tipada para recuperar o idioma resolvido do RequestContext do Remix 3.
 */
export const localeKey = createContextKey<Locale>(defaultLocale);

/**
 * Middleware do Intlayer para Remix 3.
 *
 * Resolve o idioma da requisição com base na prioridade:
 * 1. Prefixo da URL (ex. `/pt/...`) via `getLocaleFromPath`
 * 2. Negociação de cabeçalhos e cookies via `getLocale` (cookie, cabeçalho personalizado, negociação Accept-Language, fallback defaultLocale)
 *
 * Anexa o idioma resolvido ao RequestContext do Remix 3.
 */
export const intlayer = (): Middleware => {
  return async (context, next) => {
    // Detecção do caminho (/pt/about -> "pt", /about -> undefined)
    const pathLocale = getLocaleFromPath(context.url.pathname);

    if (pathLocale) {
      // Anexar idioma resolvido ao contexto de requisição do Remix 3
      context.set(localeKey, pathLocale);

      return next();
    }

    const storedLocale = await getLocale({
      getHeader: (name) => context.headers.get(name),
      getCookie: (name) =>
        getCookie(name, context.headers.get("cookie") ?? undefined),
    });

    // Anexar idioma resolvido ao contexto de requisição do Remix 3
    context.set(localeKey, storedLocale ?? defaultLocale);

    return next();
  };
};
```

</Step>
<Step number={6} title="Definir Rotas com Segurança de Tipos">

Defina as rotas da sua aplicação utilizando `route()` de `remix/routes`:

```typescript fileName="src/routes.ts" codeFormat={["typescript", "esm"]}
import { route } from "remix/routes";

export const routes = route({
  // Rota padrão do idioma
  home: "/",

  // Rota localizada com segmento dinâmico :locale
  localizedHome: "/:locale",
});
```

O uso de `route()` garante geração de URLs tipadas em toda a sua aplicação:

```typescript
routes.home.href(); // "/"
routes.localizedHome.href({ locale: "pt" }); // "/pt"
```

</Step>
<Step number={7} title="Renderizar Páginas Localizadas com JSX">

O Remix 3 renderiza a interface do usuário com componentes JSX de `remix/ui`. Um componente é uma **função de setup** que recebe um `Handle` e retorna uma **função de renderização**. O setup é executado uma vez por instância, o render a cada atualização, e as props são lidas através de `handle.props`.

Comece com um shell compartilhado `Document` que defina os atributos `<html lang="..." dir="...">` a partir do idioma resolvido:

```tsx fileName="src/views/document.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir, type Locale } from "intlayer";
import type { Handle, RemixNode } from "remix/ui";

type DocumentProps = {
  locale: Locale;
  title: string;
  children?: RemixNode;
};

export const Document = (handle: Handle<DocumentProps>) => () => {
  const { locale, title, children } = handle.props;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
};
```

Em seguida, crie a página inicial. Ela extrai o dicionário localizado com `getIntlayer` e exibe um seletor de idiomas:

```tsx fileName="src/views/home.tsx" codeFormat={["typescript", "esm"]}
import {
  getIntlayer,
  getLocaleName,
  getLocalizedPath,
  type Locale,
  locales,
} from "intlayer";
import type { Handle } from "remix/ui";
import { routes } from "../routes";
import { Document } from "./document";

type HomePageProps = {
  locale: Locale;
};

export const HomePage = (handle: Handle<HomePageProps>) => () => {
  const { locale } = handle.props;
  const home = getIntlayer("home", locale);

  return (
    <Document locale={locale} title={home.title}>
      <header>
        <nav aria-label="Languages">
          <span>{home.switchLanguage}</span>
          {locales.map((targetLocale) => {
            const isActive = targetLocale === locale;

            return (
              <a
                key={targetLocale}
                href={getLocalizedPath(routes.home.href(), targetLocale)}
                class={isActive ? "active" : undefined}
                aria-current={isActive ? "page" : undefined}
              >
                {getLocaleName(targetLocale, locale)}
              </a>
            );
          })}
        </nav>
      </header>
      <main>
        <h1>{home.title}</h1>
        <p>{home.description}</p>
      </main>
    </Document>
  );
};
```

> O JSX do Remix não é React: não há hooks, `class` é escrito como está (`className` também é aceito) e novas renderizações são disparadas explicitamente com `handle.update()`. Os valores interpolados passam por escape automaticamente.

</Step>
<Step number={8} title="Ligar o Roteador e o Servidor">

Adicione o middleware `render()` de `remix/middleware/render` junto com o middleware do Intlayer. Ele instala `context.render(node, init)` em cada requisição, transmitindo a árvore JSX em uma `Response` HTML (adicionando `<!DOCTYPE html>` no início e configurando o cabeçalho `Content-Type`):

```tsx fileName="src/router.tsx" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";
import { render } from "remix/middleware/render";
import { createRouter } from "remix/router";
import { intlayer, localeKey } from "./middleware/intlayer";
import { routes } from "./routes";
import { HomePage } from "./views/home";

// 1. Inicializar o roteador com os middlewares Intlayer + render
export const router = createRouter({
  middleware: [intlayer(), render()],
});

// 2. Mapear manipuladores de rota
router.map(routes, {
  actions: {
    // Rota de idioma padrão
    home(context) {
      const locale = context.get(localeKey);
      return context.render(<HomePage locale={locale} />);
    },

    // Rota localizada
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      const locale = context.get(localeKey);
      return context.render(<HomePage locale={locale} />);
    },
  },
});
```

> `context.render` aceita um `ResponseInit` opcional como segundo argumento, por exemplo: `context.render(<NotFoundPage locale={locale} />, { status: 404 })`.

Por fim, exponha o roteador através de um manipulador `fetch` padrão. O mesmo roteador funciona no Node.js, Bun, Deno e Cloudflare Workers:

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRequestListener } from "remix/node-fetch-server";
import { router } from "./router";

const PORT = Number(process.env.PORT || 3000);

// Node.js
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`Servidor em execução em http://localhost:${PORT}`);
});

// Bun / Deno / Cloudflare Workers
export default {
  port: PORT,
  fetch(request: Request) {
    return router.fetch(request);
  },
};
```

</Step>
<Step number={9} title="Auditar e Preencher Traduções Automaticamente">

O Intlayer disponibiliza uma CLI para verificar traduções em falta e preenchê-las automaticamente usando IA:

```bash packageManager="npm"
# Auditar traduções ausentes
npx intlayer test

# Preencher traduções ausentes usando IA
npx intlayer fill
```

```bash packageManager="pnpm"
# Auditar traduções ausentes
pnpm dlx intlayer test

# Preencher traduções ausentes usando IA
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
# Auditar traduções ausentes
yarn dlx intlayer test

# Preencher traduções ausentes usando IA
yarn dlx intlayer fill
```

```bash packageManager="bun"
# Auditar traduções ausentes
bun x intlayer test

# Preencher traduções ausentes usando IA
bun x intlayer fill
```

</Step>
</Steps>

## Configuração do TypeScript

Aponte o JSX para o runtime `remix/ui` e certifique-se de que o seu `tsconfig.json` inclui os tipos gerados do `.intlayer`:

```json fileName="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ESNext",
    "jsx": "react-jsx",
    "jsxImportSource": "remix/ui",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*", ".intlayer/**/*.ts"]
}
```

> `jsxImportSource: "remix/ui"` é o que faz com que `<HomePage />` resolva para o `createElement` do Remix em vez do React.

## Conclusão

Com o Remix 3 e o Intlayer, você obtém uma stack enxuta, totalmente tipada e portável, alinhada com os padrões da web aberta. A sua aplicação escala facilmente de páginas de marketing simples para serviços globais renderizados na borda (edge).

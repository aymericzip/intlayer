---
createdAt: 2026-09-09
updatedAt: 2026-09-21
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
  - version: 9.5.5
    date: 2026-09-19
    changes: "Uso do middleware e hooks do remix-intlayer"
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

Combinado com o **Intlayer** e o pacote **`remix-intlayer`**, um middleware de locale mais os mesmos hooks `useIntlayer` / `useDictionary` / `useLocale` do `react-intlayer`, vinculados ao contexto de requisição do Remix, você obtém um sistema completo de internacionalização que oferece segurança em tempo de compilação, traduções automatizadas por IA, renderização no servidor sem sobrecarga e roteamento fluido de locales.

## Índice

<TOC/>

## Por que escolher o Intlayer em vez de alternativas?

Em comparação com soluções tradicionais como o `i18next` ou carregadores de tradução sob medida, o Intlayer oferece uma experiência de desenvolvimento integrada e otimizada para a arquitetura web moderna:

<AccordionGroup>
<Accordion header="Cobertura total do Remix 3 e Padrões Web">

O Intlayer foi projetado para funcionar de forma nativa com os padrões web (`Request`, `Response`, `Headers` e `URL`). O `remix-intlayer` conecta-se ao router Fetch do Remix 3 como um middleware leve, extraindo o locale dos caminhos de URL, cookies ou cabeçalhos `Accept-Language` e expondo-o ao restante da requisição, handlers, visualizações e componentes `remix/ui`, sem a necessidade de repassá-lo manualmente nem prender você a um ambiente de execução específico.

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

Instale `intlayer`, `remix-intlayer` e `remix` (versão 3) usando seu gerenciador de pacotes preferido:

```bash packageManager="npm"
npm install intlayer remix-intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix-intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix-intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix-intlayer remix@next
```

- **`intlayer`**: Motor principal de internacionalização que fornece gestão de configurações, declaração de dicionários (`t()`, `Dictionary`), ferramentas CLI e interpretador em tempo de execução.
- **`remix-intlayer`**: A integração com Remix 3: o middleware de router `intlayer()` que resolve o locale de cada requisição, e os hooks `useIntlayer`, `useDictionary` e `useLocale` que o leem em qualquer ponto subsequente.
- **`remix`**: O pacote unificado do framework Remix 3 que exporta `remix/router`, `remix/routes`, `remix/ui`, `remix/middleware/render` e `remix/node-fetch-server`.

</Step>
<Step number={2} title="Configurar o Intlayer">

### Arquitetura

Nesta arquitetura, o middleware `intlayer()` do `remix-intlayer` é registrado no `createRouter()` antes do middleware `render()`. Ele remove o prefixo de localidade antes do matching do roteador, de modo que as rotas sejam declaradas apenas uma vez em `src/routes.ts` sem o segmento `:locale`, e executa o restante da requisição dentro de um escopo `AsyncLocalStorage`, permitindo que `useIntlayer` / `useLocale` leiam a localidade sem argumentos nos manipuladores de rotas e visualizações do `remix/ui`. As declarações de conteúdo são colocadas ao lado de suas visualizações em `src/`:

```bash
.
├── src
│   ├── home.content.ts               # Home page content declaration
│   ├── router.tsx                    # createRouter() with the intlayer() and render() middleware
│   ├── routes.ts                     # Type-safe routes, declared once without locale segment
│   ├── server.ts                     # fetch handler (Node.js, Bun, Deno, Cloudflare Workers)
│   └── views
│       ├── document.tsx              # HTML shell setting <html lang dir> from the locale
│       └── home.tsx                  # Localized page using useIntlayer / useLocale
├── intlayer.config.ts
├── package.json
└── tsconfig.json
```

### Configuração

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
<Step number={5} title="Adicionar o Middleware do Intlayer">

O Remix 3 oferece um pipeline de middleware componível por meio de `createRouter({ middleware: [...] })`.

O `remix-intlayer` fornece o middleware `intlayer()`. Para cada requisição recebida, ele resolve o locale usando:

1. A URL, em todos os modos de roteamento exceto `no-prefix`: o prefixo do caminho (ex. `/pt` ou `/es`) ou o parâmetro de busca `?locale=`.
2. O locale persistido pelo cliente: o cookie de armazenamento (`INTLAYER_LOCALE`) ou cabeçalho personalizado (`x-intlayer-locale`).
3. A negociação padrão de `Accept-Language`, recorrendo ao seu `defaultLocale` configurado.

O resultado é armazenado no contexto de requisição do Remix como `context.intlayer` (ou `context.get(Intlayer)`), com `locale`, `defaultLocale` e `availableLocales`. O middleware então executa o restante da requisição dentro de um escopo `AsyncLocalStorage` vinculado a esse contexto, o que permite que os hooks do pacote leiam o locale sem argumentos, seja em manipuladores de rotas, visualizações ou componentes `remix/ui`:

```typescript
import { useIntlayer, useLocale } from "remix-intlayer";

// Em qualquer ponto após o middleware
const { locale, availableLocales } = useLocale();
const { title } = useIntlayer("home");
```

`useIntlayer("home", "fr")` ou `useIntlayer("faq", { item: 2 })` sobrescrevem o locale da requisição para uma chamada, e `useDictionary(homeContent)` lê um dicionário importado em vez de uma chave. Fora de uma requisição, os hooks recorrem ao locale padrão.

> O middleware também prepara os dicionários do Intlayer quando o servidor inicia, de modo que a ausência de um `intlayer build` não deixa o registro vazio.

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

Comece com um shell compartilhado `Document` que define os atributos `<html lang="..." dir="...">` a partir do locale resolvido pelo middleware:

```tsx fileName="src/views/document.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "remix-intlayer";
import type { Handle, RemixNode } from "remix/ui";

type DocumentProps = {
  title: string;
  children?: RemixNode;
};

export const Document = (handle: Handle<DocumentProps>) => () => {
  const { title, children } = handle.props;
  const { locale } = useLocale();

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

Em seguida, crie a página inicial. Ela lê o dicionário localizado com `useIntlayer` e renderiza um seletor de idiomas:

```tsx fileName="src/views/home.tsx" codeFormat={["typescript", "esm"]}
import { getLocaleName, getLocalizedUrl, getPathWithoutLocale } from "intlayer";
import { useIntlayer, useLocale } from "remix-intlayer";
import { Document } from "./document";

export const HomePage = () => () => {
  const { locale, availableLocales } = useLocale();
  const home = useIntlayer("home");
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <Document title={home.title}>
      <header>
        <nav aria-label="Languages">
          <span>{home.switchLanguage}</span>
          <ul>
            {availableLocales.map((localeItem) => {
              const isActive = localeItem === locale;

              return (
                <li key={localeItem} class="p-1">
                  <a
                    href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                    class={isActive ? "active" : undefined}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {getLocaleName(localeItem, locale)}
                  </a>
                </li>
              );
            })}
          </ul>
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

> O JSX do Remix não é React: `class` é escrito como está (`className` também é aceito) e novas renderizações são disparadas explicitamente com `handle.update()`. Valores interpolados são escapados automaticamente. Os hooks do Intlayer são funções simples que leem o escopo da requisição, portanto podem ser chamados tanto na função de setup quanto na de renderização.

</Step>
<Step number={8} title="Ligar o Roteador e o Servidor">

Adicione o middleware `render()` de `remix/middleware/render` junto com o middleware do Intlayer. Ele instala `context.render(node, init)` em cada requisição, transmitindo a árvore JSX em uma `Response` HTML (adicionando `<!DOCTYPE html>` no início e configurando o cabeçalho `Content-Type`):

```tsx fileName="src/router.tsx" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";
import { intlayer } from "remix-intlayer";
import { render } from "remix/middleware/render";
import { createRouter } from "remix/router";
import { routes } from "./routes";
import { HomePage } from "./views/home";

// 1. Initialize router with Intlayer + render middleware
export const router = createRouter({
  middleware: [intlayer(), render()],
});

// 2. Map route handlers
router.map(routes, {
  actions: {
    // Default locale route
    home(context) {
      return context.render(<HomePage />);
    },

    // Localized route
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      return context.render(<HomePage />);
    },
  },
});
```

> `context.render` aceita um `ResponseInit` opcional como segundo argumento, por ex. `context.render(<NotFoundPage />, { status: 404 })`. O locale resolvido permanece acessível a partir do handler como `context.intlayer.locale`, por exemplo para construir uma resposta `Response.json`.

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

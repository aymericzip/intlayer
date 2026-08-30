---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "htmx i18n - Guia completo para traduzir sua aplicação"
description: "Sem mais i18next. O guia 2026 para construir uma aplicação htmx multilíngue (i18n). Traduza com agentes de IA e otimize o tamanho do bundle, SEO e performances."
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - htmx
  - Hypermedia
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - htmx
history:
  - version: 9.4.1
    date: 2026-08-29
    changes: "Histórico inicial"
author: aymericzip
---

# Traduza sua aplicação htmx usando Intlayer | Internacionalização (i18n)

htmx não renderiza conteúdo próprio. Todo rótulo que um visitante lê é HTML que seu servidor produziu, e cada swap é uma solicitação HTTP separada. Internacionalizar um aplicativo htmx é, portanto, uma preocupação do servidor: a locale tem que ser resolvida em cada solicitação, e cada fragmento tem que ser renderizado nessa locale.

Intlayer cobre isso através de suas integrações de backend, que detectam a locale por solicitação e expõem seu conteúdo declarado ao handler que constrói o HTML.

## Índice de Conteúdos

<TOC/>

## As três regras de i18n em um aplicativo htmx

<AccordionGroup>

<Accordion header="A locale deve ser resolvida em cada solicitação, não apenas na primeira">

Uma única página pode acionar dezenas de swaps. Cada um é uma requisição nova sem memória da página que o emitiu. Se a locale vive em uma variável definida durante a renderização inicial, cada fragment após ela volta ao idioma padrão.

O middleware Intlayer resolve a locale a partir da própria requisição, então um fragment servido no minuto dez responde no mesmo idioma que a página servida no minuto zero.

</Accordion>

<Accordion header="A locale deve viajar com a requisição">

Dois carriers funcionam com htmx. Um cookie (`INTLAYER_LOCALE`) é enviado pelo navegador automaticamente em cada requisição, incluindo as do htmx. Um header (`x-intlayer-locale`) pode ser anexado às requisições htmx com o atributo `hx-headers`. Ambos são lidos por padrão.

</Accordion>

<Accordion header="HTML trocado ainda é HTML">

Um valor traduzido interpolado em um fragmento é markup. Escape-o, exatamente como você faria com qualquer outro valor dinâmico, para que uma tradução contendo `<` não possa quebrar o documento no qual ele é trocado.

</Accordion>

</AccordionGroup>

---

## Guia Passo a Passo

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-htmx-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Como internacionalizar sua aplicação usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Veja [Modelo de Aplicação](https://github.com/aymericzip/intlayer-htmx-template) no GitHub.

<Steps>

<Step number={1} title="Instalar Dependências">

Instale `intlayer` mais a integração para seu servidor.

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```bash packageManager="npm"
npm install intlayer express-intlayer cookie-parser
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer cookie-parser
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer cookie-parser
```

```bash packageManager="bun"
bun add intlayer express-intlayer cookie-parser
```

  </Tab>
  <Tab label="Fastify" value="fastify">

```bash packageManager="npm"
npm install intlayer fastify-intlayer @fastify/cookie @fastify/formbody
```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer @fastify/cookie @fastify/formbody
```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer @fastify/cookie @fastify/formbody
```

```bash packageManager="bun"
bun add intlayer fastify-intlayer @fastify/cookie @fastify/formbody
```

  </Tab>
  <Tab label="Hono" value="hono">

```bash packageManager="npm"
npm install intlayer hono-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
```

  </Tab>
  <Tab label="Elysia" value="elysia">

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash
bun add intlayer elysia-intlayer
```

  </Tab>
</Tabs>

> Express e Fastify leem o cookie de locale através dos seus próprios parsers de cookies, portanto esses têm que ser instalados juntamente. Hono e Elysia analisam cookies nativamente.

htmx em si é uma única tag de script, adicionada no passo 4.

</Step>

<Step number={2} title="Configuração do seu projeto">

Crie um `intlayer.config.ts` na raiz do seu projeto:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.ARABIC],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Para a lista completa de opções, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

</Step>

<Step number={3} title="Declare Your Content">

Declare every label the server will render, including the ones that only ever appear inside a fragment:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    pageTitle: "Intlayer + htmx",

    localeLabel: t({
      pt: "Idioma",
      en: "Language",
      fr: "Langue",
      es: "Idioma",
      ar: "اللغة",
    }),

    cartSummary: insert(
      t({
        pt: "Itens no seu carrinho: {{count}}",
        en: "Items in your cart: {{count}}",
        fr: "Articles dans votre panier : {{count}}",
        es: "Artículos en tu carrito: {{count}}",
        ar: "المنتجات في سلتك: {{count}}",
      })
    ),

    addItem: t({
      pt: "Adicionar um item",
      en: "Add an item",
      fr: "Ajouter un article",
      es: "Añadir un artículo",
      ar: "أضف منتجًا",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> As declarações de conteúdo podem estar em qualquer lugar dentro de `contentDir` (por padrão `./src`) e corresponder a `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`. Consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md).

</Step>

<Step number={4} title="Registrar o middleware do Intlayer">

O middleware resolve a locale de cada requisição e a expõe aos seus handlers.

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import cookieParser from "cookie-parser";
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// O cookie parser precisa rodar primeiro: `express-intlayer` lê a locale
// do cookie através de `req.cookies`.
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(intlayer());
```

A locale resolvida está em `res.locals.locale`.

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}


</chunk>
import cookie from "@fastify/cookie";
import formbody from "@fastify/formbody";
import Fastify from "fastify";
import { intlayer } from "fastify-intlayer";

const fastify = Fastify();

await fastify.register(cookie);
await fastify.register(formbody);
await fastify.register(intlayer);
```

O locale resolvido está em `req.intlayer.locale`.

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());
```

O locale resolvido é `c.get("locale")`.

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer());
```

O locale resolvido é `intlayer!.locale` no contexto da rota.

  </Tab>
</Tabs>

Por padrão, o locale é obtido do cookie `INTLAYER_LOCALE`, depois do header `x-intlayer-locale`, e depois da negociação `Accept-Language`.

</Step>

<Step number={5} title="Renderizar fragmentos com o locale da requisição">

Escreva seus renderizadores de fragmentos como funções puras de um locale, e passe o locale que o middleware resolveu. Passá-lo explicitamente mantém um fragmento vinculado à requisição que o pediu, seja qual for o servidor em que você está.

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { currency, getIntlayer, type Locale } from "intlayer";

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escapa um valor traduzido para que não possa sair da marcação. */
const escapeHtml = (value: string): string =>
  value.replace(
    /[&<>"']/g,
    (character) => HTML_ENTITIES[character] ?? character
  );

export const renderCart = (locale: Locale, itemCount: number): string => {
  const content = getIntlayer("app", locale);

  return `<section id="cart">
  <p>${escapeHtml(String(content.cartSummary({ count: itemCount })))}</p>
  <p>${escapeHtml(currency(itemCount * 12.5, { locale, currency: "EUR" }))}</p>
  <button
    hx-post="/cart/items"
    hx-vals='{"itemCount": ${itemCount}}'
    hx-target="#cart"
    hx-swap="outerHTML"
  >${escapeHtml(String(content.addItem))}</button>
</section>`;
};
```

Entregue-o a partir de uma rota:

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
app.post("/cart/items", (req, res) => {
  // Obtém o número de itens do corpo da requisição, padrão é 0
  const itemCount = Number(req.body?.itemCount ?? 0) + 1;

  // Retorna o carrinho renderizado em HTML
  res.type("html").send(renderCart(res.locals.locale, itemCount));
});
```

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
fastify.post("/cart/items", async (req, reply) => {
  // Obtém o número de itens do corpo da requisição, padrão é 0
  const itemCount =
    Number((req.body as { itemCount?: string })?.itemCount ?? 0) + 1;

  // Retorna o carrinho renderizado em HTML
  return reply
    .type("text/html")
    .send(renderCart(req.intlayer.locale, itemCount));
});
```

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
app.post("/cart/items", async (c) => {
  const body = await c.req.parseBody();
  const itemCount = Number(body["itemCount"] ?? 0) + 1;

  return c.html(renderCart(c.get("locale"), itemCount));
});
```

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
app.post("/cart/items", ({ body, intlayer }) => {
  const itemCount =
    Number((body as { itemCount?: string })?.itemCount ?? 0) + 1;

  return new Response(renderCart(intlayer!.locale, itemCount), {
    headers: { "content-type": "text/html" },
  });
});
```

  </Tab>
</Tabs>

O mesmo fragmento agora responde em francês para um visitante cujo cookie diz `fr`, e em árabe para um cujo cookie diz `ar`, sem nenhuma alteração na marcação chamadora.

</Step>

<Step number={6} title="Servir a primeira página">

Renderize o `<body>` por si só, para que o alternador de locale na etapa 7 possa trocá-lo integralmente, depois envolva-o no documento que carrega o htmx:

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir, getIntlayer, type Locale } from "intlayer";

export const renderBody = (locale: Locale, itemCount: number): string => {
  const content = getIntlayer("app", locale);

  return `<body lang="${locale}" dir="${getHTMLTextDir(locale)}">
  <main>
    <h1>${escapeHtml(String(content.pageTitle))}</h1>
    ${renderLocaleSwitcher(locale)}
    ${renderCart(locale, itemCount)}
  </main>
</body>`;
};

export const renderPage = (locale: Locale, itemCount: number): string =>
  `<!doctype html>
<html lang="${locale}" dir="${getHTMLTextDir(locale)}">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(String(getIntlayer("app", locale).pageTitle))}</title>
  <script src="https://unpkg.com/htmx.org@2.0.4"></script>
</head>
${renderBody(locale, itemCount)}
</html>`;
```

`getHTMLTextDir` retorna `ltr`, `rtl` ou `auto` para o locale, o que faz com que Árabe e Hebraico sejam renderizados corretamente.

</Step>

<Step number={7} title="Alternar o idioma">

Alternar idioma é uma requisição como qualquer outra. O servidor armazena a escolha no cookie que o middleware lê e então retorna a página renderizada novamente no novo locale.

Renderize o seletor como um `select` que se submete e troca todo o `<body>`, para que os rótulos estáticos ao redor de seus fragmentos também mudem:

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { getIntlayer, getLocaleName, type Locale, locales } from "intlayer";

const renderLocaleSwitcher = (locale: Locale): string => {
  // Obtém o conteúdo internacionalizado para a localidade atual
  const content = getIntlayer("app", locale);

  // Mapeia cada localidade disponível para uma opção select
  const options = locales
    .map(
      (availableLocale: Locale) =>
        `<option value="${availableLocale}"${availableLocale === locale ? " selected" : ""}>${escapeHtml(getLocaleName(availableLocale, locale))}</option>`
    )
    .join("");

  return `<form>
  <label for="locale">${escapeHtml(String(content.localeLabel))}</label>
  <select
    id="locale"
    name="locale"
    hx-post="/locale"
    hx-trigger="change"
    hx-target="body"
    hx-swap="outerHTML"
  >${options}</select>
</form>`;
};
```

> `getLocaleName(availableLocale, locale)` escreve cada idioma no idioma atualmente exibido. Não passe um segundo argumento para escrever cada um em seu próprio idioma.

Manipule o post validando o valor, configurando o cookie e retornando o novo body:

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";

app.post("/locale", (req, res) => {
  const requestedLocale = String(req.body?.locale);

  if (!isDeclaredLocale(requestedLocale)) {
    res.status(400).send("Unknown locale");
    return;
  }

  res.cookie("INTLAYER_LOCALE", requestedLocale, {
    sameSite: "lax",
    path: "/",
  });
  res.type("html").send(renderBody(requestedLocale, 0));
});
```

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";

fastify.post("/locale", async (req, reply) => {
  const requestedLocale = String((req.body as { locale?: string })?.locale);

  if (!isDeclaredLocale(requestedLocale)) {
    return reply.status(400).send("Locale desconhecida");
  }

  return reply
    .setCookie("INTLAYER_LOCALE", requestedLocale, {
      sameSite: "lax",
      path: "/",
    })
    .type("text/html")
    .send(renderBody(requestedLocale, 0));
});
```

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { setCookie } from "hono/cookie";
import { isDeclaredLocale } from "intlayer";

app.post("/locale", async (c) => {
  const body = await c.req.parseBody();
  const requestedLocale = String(body["locale"]);

  // Valida se a locale solicitada é uma das locales configuradas
  if (!isDeclaredLocale(requestedLocale)) {
    return c.text("Unknown locale", 400);
  }

  // Define o cookie da locale
  setCookie(c, "INTLAYER_LOCALE", requestedLocale, {
    sameSite: "Lax",
    path: "/",
  });
  return c.html(renderBody(requestedLocale, 0));
});
```

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";

app.post("/locale", ({ body, cookie, status }) => {
  const requestedLocale = String((body as { locale?: string })?.locale);

  // Verifica se a locale solicitada é uma locale declarada
  if (!isDeclaredLocale(requestedLocale)) {
    return status(400, "Unknown locale");
  }

  // Define o cookie da locale do Intlayer
  cookie["INTLAYER_LOCALE"]!.set({
    value: requestedLocale,
    sameSite: "lax",
    path: "/",
  });

  // Retorna a resposta HTML renderizada com a nova locale
  return new Response(renderBody(requestedLocale, 0), {
    headers: { "content-type": "text/html" },
  });
});
```

  </Tab>
</Tabs>

> `isDeclaredLocale` reduz uma string arbitrária para uma de suas locales configuradas, garantindo que um valor inesperado nunca atinja seus renderers.

</Step>

<Step number={8} title="Manter lang e dir sincronizados após uma troca" isOptional={true}>

Uma troca pode substituir o `<body>`, nunca o `<html>` ao seu redor. Renderize `lang` e `dir` no body trocado e copie-os de volta para o elemento raiz uma vez, a partir do head:

```html fileName="src/views.ts"
<script>
  document.addEventListener("htmx:afterSwap", () => {
    document.documentElement.lang = document.body.lang;
    document.documentElement.dir = document.body.dir;
  });
</script>
```

Sem isso, uma troca para árabe renderiza da direita para a esquerda dentro do body enquanto o documento ainda anuncia o idioma anterior para tecnologia assistiva e crawlers.

</Step>

<Step number={9} title="Enviar a localização como um header em vez de um cookie" isOptional={true}>

Se um cookie não se adequar a você, anexe a localidade a cada requisição htmx com `hx-headers` em um elemento ancestral. Os descendentes herdam:

```html
<body hx-headers='{"x-intlayer-locale": "fr"}'>
  ...
</body>
```

O middleware lê `x-intlayer-locale` por padrão. Você pode renomear ambos os transportadores na sua configuração:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Outras opções de configuração
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

</Step>

</Steps>

### Configurar TypeScript

Inclua os tipos gerados automaticamente para que uma chave não declarada seja um erro de compilação em vez de uma string vazia em tempo de execução.

```json5 fileName="tsconfig.json"
{
  // ... Suas configurações existentes do TypeScript
  "include": [
    // ... Suas configurações existentes do TypeScript
    ".intlayer/**/*.ts", // Inclua os tipos gerados automaticamente
  ],
}
```

### Configuração do Git

É recomendado ignorar os arquivos gerados pelo Intlayer:

```plaintext fileName=".gitignore"
# Ignore os arquivos gerados pelo Intlayer
.intlayer
```

### Extensão VS Code

Para melhorar sua experiência de desenvolvimento com Intlayer, você pode instalar a **Extensão Oficial Intlayer para VS Code**.

[Instale do VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão fornece:

- **Autocompletar** para chaves de tradução.
- **Detecção de erros em tempo real** para traduções ausentes.
- **Visualizações inline** do conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como usar a extensão, consulte a [documentação da Extensão Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Ir Além

Para ir além, você pode externalizar seu conteúdo usando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md), para que tradutores alterem o conteúdo sem necessidade de deployment.

## Perguntas Frequentes

<FAQ>

<Question title="Por que meu fragmento trocado volta no idioma errado?">

Porque a solicitação do fragmento não continha nenhuma locale. As solicitações htmx são independentes da página que as emitiu, então a locale deve viajar em cada uma, através do cookie `INTLAYER_LOCALE` ou um header `x-intlayer-locale` definido com `hx-headers`. Verifique se o parser de cookie é executado antes do middleware Intlayer no Express e Fastify, caso contrário, o cookie nunca é lido e toda solicitação volta para `Accept-Language`.

</Question>

<Question title="Devo passar a locale para `getIntlayer` ou confiar no contexto da solicitação?">

Passe-o. As integrações expõem o locale resolvido (`res.locals.locale`, `req.intlayer.locale`, `c.get("locale")`, `intlayer!.locale`), e passá-lo para `getIntlayer` faz de cada renderer uma função pura de um locale. Isso é mais fácil de testar, e mantém seus fragment renderers portáveis se você mudar de servidor.

</Question>

<Question title="Preciso de uma biblioteca i18n no lado do cliente junto com htmx?">

Não. Tudo o que um visitante vê é produzido pelo servidor, portanto não há nada para traduzir no navegador. É também por isso que o custo de peso da página de i18n em um app htmx é próximo a zero: nenhum catálogo é jamais enviado para o cliente.

</Question>

<Question title="Como localizarei a URL também, para SEO?">

Sirva suas páginas sob um prefixo de locale (`/fr/cart`) e leia a locale do caminho em seu manipulador de rota, em vez de do cookie, para a renderização de página completa. Fragmentos podem continuar usando o cookie ou o header. Consulte [configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md) para as opções de roteamento e [reescritas de URL personalizadas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/custom_url_rewrites.md).

</Question>

<Question title="Como lido com idiomas da direita para a esquerda?">

`getHTMLTextDir(locale)` retorna `ltr`, `rtl` ou `auto`. Configure-o no documento para a renderização inicial e reaplique-o após uma troca conforme a etapa 8 mostra. Use propriedades CSS lógicas (`margin-inline-start` em vez de `margin-left`) para que seu layout siga.

</Question>

<Question title="Devo escapar valores traduzidos?">

Sim, para qualquer coisa que você interpole em uma string de template, exatamente como para qualquer outro valor dinâmico. Conteúdo vindo do CMS ou de um tradutor não é markup que você controla. O passo 5 mostra um escapador minimal.

</Question>

<Question title="O mesmo conteúdo pode servir minhas respostas de API também?">

Sim. As integrações backend expõem `t()` e `getIntlayer()` para qualquer handler, então uma mensagem de erro mostrada em um toast e um label renderizado em um fragment vêm do mesmo conteúdo declarado. Veja os guias [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_express.md), [Fastify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_fastify.md), [Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_hono.md) e [Elysia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_elysia.md).

</Question>

<Question title="Preciso mover meu conteúdo chave por chave?">

Não. Execute `npx intlayer extract` e o Intlayer lê seus arquivos de origem, extrai as strings voltadas para o usuário e escreve um arquivo `.content` ao lado de cada uma, para que você revise um diff em vez de copiar strings para um catálogo uma por uma. Veja o [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/extract.md).

</Question>

<Question title="Posso manter meus arquivos de tradução JSON existentes?">

Sim. O [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) mantém seus arquivos `/messages/{locale}/{namespace}.json` como fonte de verdade e gera dicionários Intlayer a partir deles, em ambas as direções. Um [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-po.md) faz o mesmo para catálogos gettext, e [arquivos por locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/per_locale_file.md) permitem que você divida o conteúdo por idioma em vez de agrupar locales em um arquivo.

</Question>

<Question title="Como faço para traduzir o app automaticamente com IA?">

Execute `npx intlayer fill`, que preenche traduções ausentes com o LLM da sua escolha usando seu próprio provider e API key. Adicione `--git-diff` para traduzir apenas o conteúdo alterado no branch. Consulte o [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/fill.md) e [integração CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/CI_CD.md).

</Question>

<Question title="O Intlayer suporta gênero, condições e valores interpolados?">

Sim: [conteúdo baseado em gênero](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/gender.md), condições, [enumerações](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/enumeration.md), [inserções](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/insertion.md) para valores interpolados, e [formatadores](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/formatters.md) para números, datas e moedas.

</Question>

<Question title="Que ferramentas de editor e agente de IA estão disponíveis?">

Cinco componentes, todos opcionais:

- **[Extensão VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md)**: salte de uma chave para o arquivo de conteúdo que a declara, extraia conteúdo de um arquivo e execute build, fill, test, push e pull da paleta de comandos.
- **[Servidor LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**: a mesma awareness em qualquer editor que suporte LSP, com go to definition, previsualizações ao passar o mouse de um valor traduzido, autocompletar de chaves e um aviso quando uma chave não está declarada em lugar nenhum.
- **[Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)**: expõe a documentação e CLI do Intlayer para Cursor, VS Code, Claude Desktop, Claude Code e ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)**: habilidades focadas como `intlayer-config`, `intlayer-cli` e `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/eslint.md)**: `no-raw-text` sinaliza strings codificadas.

</Question>

<Question title="O Intlayer é gratuito e de código aberto?">

Sim, sob a licença Apache 2.0, uso comercial incluído. O [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) hospedado é um serviço pago opcional que também pode ser [auto hospedado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/self_hosting.md).

</Question>

</FAQ>

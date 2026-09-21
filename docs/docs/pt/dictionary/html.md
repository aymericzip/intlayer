---
createdAt: 2026-01-20
updatedAt: 2026-09-21
title: Conteúdo HTML
description: Aprenda como declarar e usar conteúdo HTML com componentes personalizados no Intlayer. Siga esta documentação para incorporar conteúdo rico semelhante a HTML com substituição dinâmica de componentes no seu projeto internacionalizado.
keywords:
  - HTML
  - Custom Components
  - Rich Content
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Vue
  - Svelte
  - Remix
  - Astro
  - Solid
  - Angular
slugs:
  - doc
  - concept
  - content
  - html
history:
  - version: 8.5.0
    date: 2026-03-24
    changes: "Add `intlayerHTML` plugin object; use `app.use(intlayerHTML)` instead of `app.use(installIntlayerHTML)`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "mover a importação de {{framework}}-intlayer para {{framework}}-intlayer/html"
  - version: 8.0.0
    date: 2026-01-22
    changes: "Adicionar HTMLRenderer / useHTMLRenderer / utilitário renderHTML"
  - version: 8.0.0
    date: 2026-01-20
    changes: "Adicionar suporte ao parsing de HTML"
author: aymericzip
---

# Conteúdo HTML / HTML no Intlayer

O Intlayer suporta conteúdo HTML, permitindo que você incorpore conteúdo rico e estruturado dentro dos seus dicionários. Esse conteúdo pode ser renderizado com tags HTML padrão ou substituído por componentes personalizados em tempo de execução.

## Declarando Conteúdo HTML

Você pode declarar conteúdo HTML usando la função `html` ou simplesmente como uma string.

<Tabs>
  <Tab label="Envolvimento Manual" value="manual-wrapping">
    Use a função `html` para declarar explicitamente conteúdo HTML. Isso garante que as tags padrão sejam mapeadas corretamente mesmo se a detecção automática estiver desabilitada.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, type Dictionary } from "intlayer";

    const htmlDictionary = {
      key: "app",
      contentAutoTransformation: true, // pode ser definido no arquivo de configuração
      content: {
        myHtmlContent:  html("<p>Hello <strong>World</strong></p>"),
      },
    } satisfies Dictionary;

    export default htmlDictionary;
    ```

  </Tab>
  <Tab label="Detecção Automática" value="automatic-detection">
    Se a string contiver tags HTML comuns (por exemplo, `<p>`, `<div>`, `<strong>`, etc.), o Intlayer irá transformá-la automaticamente.

    ```typescript fileName="htmlDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // pode ser definido no arquivo de configuração
      content: {
        myHtmlContent:  "<p>Olá <strong>Mundo</strong></p>",
      },
    };
    ```

  </Tab>
  <Tab label="Arquivos Externos" value="external-files">
    Importe conteúdo HTML de arquivos. Note que atualmente a função `file()` retorna uma string, que será detectada automaticamente como HTML se contiver tags.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: html(file("./content.en.html")),
          fr: html(file("./content.fr.html")),
          pt: html(file("./content.pt.html")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

### O Nó `html()`

A função `html()` é um novo recurso no Intlayer v8 que permite definir explicitamente conteúdo HTML em seus dicionários. Embora o Intlayer possa frequentemente detectar automaticamente o conteúdo HTML, o uso da função `html()` oferece várias vantagens:

- **Segurança de Tipos**: A função `html()` permite definir as props esperadas para componentes personalizados, proporcionando melhor autocompletar e verificação de tipos em seu editor.
- **Declaração Explícita**: Garante que uma string seja sempre tratada como HTML, mesmo que não contenha tags HTML padrão que acionariam a detecção automática.
- **Definição de Componentes Personalizados**: Você pode passar um segundo argumento para `html()` para definir os componentes personalizados e seus tipos de props esperados.

```typescript
import { html } from "intlayer";

const myContent = html(
  "<MyCustomComponent title='Olá'>Mundo</MyCustomComponent>",
  {
    MyCustomComponent: {
      title: "string",
      children: "node",
    },
  }
);
```

Ao usar o método `.use()` em um nó HTML, os componentes que você fornecer serão verificados em relação à definição fornecida na função `html()` (se disponível).

## Renderização de HTML

A renderização pode ser feita automaticamente pelo sistema de conteúdo do Intlayer ou manualmente usando ferramentas especializadas.

### Renderização automática (usando `useIntlayer`)

Quando você acessa conteúdo via `useIntlayer`, os nós HTML já estão preparados para renderização.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    Os nós HTML podem ser renderizados diretamente como JSX. As tags padrão funcionam automaticamente.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

    Use o método `.use()` para fornecer componentes personalizados ou sobrescrever tags:

    ```tsx
    {myHtmlContent.use({
      p: (props) => <p className="prose" {...props} />,
      CustomLink: ({ children }) => <a href="/details">{children}</a>,
    })}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    No Vue, o conteúdo HTML pode ser renderizado usando o built-in `component`.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myHtmlContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myHtmlContent" />
    </template>
    ```

    Use `.use()` para sobrescrever:
    ```vue
    <component :is="myHtmlContent.use({ h1: 'h2' })" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    O Svelte renderiza nós HTML como strings. Use `{@html}` para renderizá-los.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact suporta nós HTML diretamente no JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid suporta nós HTML diretamente no JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular utiliza a diretiva `[innerHTML]` para renderizar conteúdo HTML.

    ```typescript fileName="app.component.ts"
    import { Component } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-root",
      template: `<div [innerHTML]="content().myHtmlContent"></div>`,
    })
    export class AppComponent {
      content = useIntlayer("app");
    }
    ```

    Use o método `.use()` para fornecer componentes personalizados ou sobrescrever tags:

    ```typescript
    content().myHtmlContent.use({
      p: { class: "prose" },
      CustomLink: { href: "/details" },
    })
    ```

  </Tab>
  <Tab label="Remix" value="remix">
    No Remix 3, os nós HTML são resolvidos em uma string HTML. Injete-a com a prop `innerHTML` do Remix JSX ou com `html.raw` em uma visualização `html-template`.

    ```tsx fileName="src/views/home.tsx"
    import { useIntlayer } from "remix-intlayer";

    export const HomePage = () => () => {
      const { myHtmlContent } = useIntlayer("app");

      return <div innerHTML={myHtmlContent.value} />;
    };
    ```

    ```ts fileName="src/views/home.ts"
    import { html } from "remix/html-template";
    import { useIntlayer } from "remix-intlayer";

    export const renderHomePage = () => {
      const { myHtmlContent } = useIntlayer("app");

      return html.raw`<div>${myHtmlContent.value}</div>`;
    };
    ```

    > O Remix escapa valores interpolados por padrão. `innerHTML` e `html.raw` são as duas exceções, que é o que uma string HTML precisa.

    Use o método `.use()` para substituir tags ou mapear componentes personalizados. As substituições são funções que retornam uma string HTML:

    ```tsx
    <div
      innerHTML={myHtmlContent.use({
        p: ({ children }) => `<p class="prose">${children}</p>`,
        CustomLink: ({ children }) => `<a href="/details">${children}</a>`,
      })}
    />
    ```

  </Tab>
  <Tab label="Astro" value="astro">
    No Astro, os nós HTML são resolvidos em uma string HTML. Injete-a com a diretiva `set:html` no template ou com `innerHTML` em um `<script>` do cliente.

    ```astro fileName="src/pages/index.astro"
    ---
    import { useIntlayer } from "astro-intlayer";

    const { myHtmlContent } = useIntlayer("app");
    ---

    <div set:html={myHtmlContent.value} />
    ```

    ```astro fileName="src/components/Content.astro"
    <div id="content"></div>

    <script>
      import { useIntlayer } from "astro-intlayer";

      const { myHtmlContent } = useIntlayer("app");

      document.querySelector("#content")!.innerHTML = myHtmlContent.value;
    </script>
    ```

    > O Astro escapa `{expressões}` por padrão. `set:html` é a exceção, que é o que uma string HTML precisa.

    Use o método `.use()` para substituir tags ou mapear componentes personalizados. As substituições são funções que retornam uma string HTML:

    ```astro
    <div
      set:html={myHtmlContent.use({
        p: ({ children }) => `<p class="prose">${children}</p>`,
        CustomLink: ({ children }) => `<a href="/details">${children}</a>`,
      })}
    />
    ```

  </Tab>
</Tabs>

## Configuração Global com `HTMLProvider`

Você pode configurar a renderização de HTML globalmente para toda a sua aplicação. Isso é ideal para definir componentes personalizados que devem estar disponíveis em todo o conteúdo HTML.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "react-intlayer/html";

    export const AppProvider = ({ children }) => (
      <HTMLProvider
        components={{
          p: (props) => <p className="prose" {...props} />,
          CustomLink: ({ children }) => <a href="/details">{children}</a>,
        }}
      >
        {children}
      </HTMLProvider>
    );
    ```

    Você também pode usar o seu próprio renderizador de HTML:

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "react-intlayer/html";

    export const AppProvider = ({ children }) => (
      <HTMLProvider
        renderHTML={async (html) => {
          const { renderHTML } = await import('react-intlayer/html');
          return renderHTML(html);
        }}
      >
        {children}
      </HTMLProvider>
    );
    ```

    > Importar dinamicamente o seu renderizador de HTML é uma boa maneira de reduzir o tamanho do bundle da sua aplicação.

  </Tab>
  <Tab label="Vue" value="vue">

    ```typescript fileName="main.ts"
    import { createApp, h } from "vue";
    import { intlayer } from "vue-intlayer";
    import { intlayerHTML } from "vue-intlayer/html";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);
    app.use(intlayerHTML, {
      components: {
        p: (props, { slots }) => h("p", { class: "prose", ...props }, slots.default?.()),
        CustomLink: (props, { slots }) => h("a", { href: "/details", ...props }, slots.default?.()),
      },
    });

    app.mount("#app");
    ```

    Você também pode usar o seu próprio renderizador de HTML:

    ```typescript fileName="main.ts"
    import { createApp, h } from "vue";
    import { intlayer } from "vue-intlayer";
    import { intlayerHTML } from "vue-intlayer/html";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);
    app.use(intlayerHTML, {
      renderHTML: async (html) => {
        const { renderHTML } = await import('vue-intlayer/html');
        return renderHTML(html);
      },
    });

    app.mount("#app");
    ```

    > Importar dinamicamente o seu renderizador de HTML é uma boa maneira de reduzir o tamanho do bundle da sua aplicação.

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { HTMLProvider } from "svelte-intlayer/html";
      import MyCustomP from "./MyCustomP.svelte";
    </script>

    <HTMLProvider
      components={{
        p: MyCustomP,
      }}
    >
      <slot />
    </HTMLProvider>
    ```

    Você também pode usar o seu próprio renderizador de HTML:

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { HTMLProvider } from "svelte-intlayer/html";
    </script>

    <HTMLProvider
      renderHTML={async (html) => {
        const { renderHTML } = await import('svelte-intlayer/html');
        return renderHTML(html);
      }}
    >
      <slot />
    </HTMLProvider>
    ```

    > Importar dinamicamente o seu renderizador de HTML é uma boa maneira de reduzir o tamanho do bundle da sua aplicação.

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "preact-intlayer/html";

    export const AppProvider = ({ children }) => (
      <HTMLProvider
        components={{
          p: (props) => <p className="prose" {...props} />,
        }}
      >
        {children}
      </HTMLProvider>
    );
    ```

    Você também pode usar o seu próprio renderizador de HTML:

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "preact-intlayer/html";

    export const AppProvider = ({ children }) => (
      <HTMLProvider
        renderHTML={async (html) => {
          const { renderHTML } = await import('preact-intlayer/html');
          return renderHTML(html);
        }}
      >
        {children}
      </HTMLProvider>
    );
    ```

    > Importar dinamicamente o seu renderizador de HTML é uma boa maneira de reduzir o tamanho do bundle da sua aplicação.

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "solid-intlayer/html";

    export const AppProvider = (props) => (
      <HTMLProvider
        components={{
          p: (props) => <p className="prose" {...props} />,
        }}
      >
        {props.children}
      </HTMLProvider>
    );
    ```

    Você também pode usar o seu próprio renderizador de HTML:

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "solid-intlayer/html";

    export const AppProvider = (props) => (
      <HTMLProvider
        renderHTML={async (html) => {
          const { renderHTML } = await import('solid-intlayer/html');
          return renderHTML(html);
        }}
      >
        {props.children}
      </HTMLProvider>
    );
    ```

    > Importar dinamicamente o seu renderizador de HTML é uma boa maneira de reduzir o tamanho do bundle da sua aplicação.

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="app.config.ts"
    import { createIntlayerHTMLProvider } from "angular-intlayer/html";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerHTMLProvider({
          components: {
            p: { class: "prose" },
            CustomLink: { href: "/details" },
          },
        }),
      ],
    };
    ```

    Você também pode usar o seu próprio renderizador de HTML:

    ```typescript fileName="app.config.ts"
    import { createIntlayerHTMLProvider } from "angular-intlayer/html";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerHTMLProvider({
          renderHTML: async (html) => {
            const { renderHTML } = await import('angular-intlayer/html');
            return renderHTML(html);
          },
        }),
      ],
    };
    ```

    > Importar dinamicamente o seu renderizador de HTML é uma boa maneira de reduzir o tamanho do bundle da sua aplicação.

  </Tab>
  <Tab label="Remix" value="remix">

    O Remix não possui uma árvore de componentes para manter um provider, portanto, a configuração é instalada uma vez, como um singleton, na inicialização do servidor. Ela configura o renderizador retornado por `useHTMLRenderer()`. Os nós `html` retornados por `useIntlayer` são renderizados no estado em que se encontram; substitua suas tags por nó com `.use()`.

    ```typescript fileName="src/router.ts"
    import { installIntlayerHTML } from "remix-intlayer/html";

    installIntlayerHTML({
      renderHTML: (html) => html.replaceAll("<p>", '<p class="prose">'),
    });
    ```

    > Use `installIntlayerHTMLDynamic(async () => …)` para carregar o renderizador de forma preguiçosa; o carregador é executado apenas na primeira chamada.

  </Tab>
  <Tab label="Astro" value="astro">

    O Astro não possui uma árvore de componentes para manter um provider, portanto, a configuração é instalada uma vez, como um singleton, no middleware (servidor) e em um `<script>` do cliente (navegador). Ela configura o renderizador retornado por `useHTMLRenderer()`. Os nós `html` retornados por `useIntlayer` são renderizados no estado em que se encontram; substitua suas tags por nó com `.use()`.

    ```typescript fileName="src/middleware.ts"
    import { installIntlayerHTML } from "astro-intlayer/html";
    import { defineMiddleware } from "astro:middleware";

    // Executa uma vez quando o servidor inicia; o próprio middleware do Intlayer é
    // registrado pela integração, antes deste arquivo.
    installIntlayerHTML({
      renderHTML: (html) => html.replaceAll("<p>", '<p class="prose">'),
    });

    export const onRequest = defineMiddleware((_context, next) => next());
    ```

    > Use `installIntlayerHTMLDynamic(async () => …)` para carregar o renderizador de forma preguiçosa; o carregador é executado apenas na primeira chamada.

  </Tab>
</Tabs>

### Renderização Manual e Ferramentas Avançadas

Se precisar renderizar strings HTML brutas ou tiver mais controlo sobre o mapeamento de componentes, use as seguintes ferramentas.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    #### Componente `<HTMLRenderer />`
    Renderize uma string HTML con componentes específicos.

    ```tsx
    import { HTMLRenderer } from "react-intlayer/html";

    <HTMLRenderer components={{ p: MyCustomP }}>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### Hook `useHTMLRenderer()`

    Obtenha uma função de renderização pré-configurada.

    ```tsx
    import { useHTMLRenderer } from "react-intlayer/html";

    const renderHTML = useHTMLRenderer({
      components: { strong: (props) => <strong {...props} className="text-red-500" /> }
    });

    return renderHTML("<p>Hello <strong>World</strong></p>");
    ```

    #### Utilitário `renderHTML()`

    Utilitário independente para renderização fora de componentes.

    ```tsx
    import { renderHTML } from "react-intlayer/html";

    const jsx = renderHTML("<p>Hello</p>", { components: { p: 'div' } });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### Componente `<HTMLRenderer />`

    ```vue
    <script setup>
    import { HTMLRenderer } from "vue-intlayer/html";
    </script>

    <template>
      <HTMLRenderer content="<p>Hello World</p>" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    #### Componente `<HTMLRenderer />`

    ```svelte
    <script lang="ts">
    import { HTMLRenderer } from "svelte-intlayer/html";
    </script>

    <HTMLRenderer value="<p>Hello World</p>" />
    ```

    #### Hook `useHTMLRenderer()`

    ```svelte
    <script lang="ts">
    import { useHTMLRenderer } from "svelte-intlayer/html";
    const render = useHTMLRenderer();
    </script>

    {@html render("<p>Hello World</p>")}
    ```

    #### Utilitário `renderHTML()`

    ```svelte
    <script lang="ts">
    import { renderHTML } from "svelte-intlayer/html";
    </script>

    {@html renderHTML("<p>Hello World</p>")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    #### Componente `<HTMLRenderer />`

    ```tsx
    import { HTMLRenderer } from "preact-intlayer/html";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### Hook `useHTMLRenderer()`

    ```tsx
    import { useHTMLRenderer } from "preact-intlayer/html";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### Utilitário `renderHTML()`

    ```tsx
    import { renderHTML } from "preact-intlayer/html";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    #### Componente `<HTMLRenderer />`

    ```tsx
    import { HTMLRenderer } from "solid-intlayer/html";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### Hook `useHTMLRenderer()`

    ```tsx
    import { useHTMLRenderer } from "solid-intlayer/html";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### Utilitário `renderHTML()`

    ```tsx
    import { renderHTML } from "solid-intlayer/html";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### Serviço `IntlayerHTMLService`
    Renderize uma string HTML utilizando o serviço.

    ```typescript
    import { IntlayerHTMLService } from "angular-intlayer/html";

    export class MyComponent {
      constructor(private markdownService: IntlayerHTMLService) {}

      renderHTML(html: string) {
        return this.markdownService.renderHTML(html);
      }
    }
    ```

  </Tab>
  <Tab label="Remix" value="remix">
    #### Hook `useHTMLRenderer()`

    Obtenha uma função de renderização pré-configurada por `installIntlayerHTML()`. Ela retorna uma string HTML.

    ```tsx
    import { useHTMLRenderer } from "remix-intlayer/html";

    const renderHTML = useHTMLRenderer();

    return <div innerHTML={renderHTML("<p>Hello <strong>World</strong></p>")} />;
    ```

    #### Utilitário `renderHTML()`

    Utilitário independente que ignora a configuração global.

    ```tsx
    import { renderHTML } from "remix-intlayer/html";

    const html = renderHTML("<p>Hello</p>");
    ```

  </Tab>
  <Tab label="Astro" value="astro">
    #### Hook `useHTMLRenderer()`

    Obtenha uma função de renderização pré-configurada por `installIntlayerHTML()`. Ela retorna uma string HTML.

    ```astro
    ---
    import { useHTMLRenderer } from "astro-intlayer/html";

    const renderHTML = useHTMLRenderer();
    ---

    <div set:html={renderHTML("<p>Hello <strong>World</strong></p>")} />
    ```

    #### Utilitário `renderHTML()`

    Utilitário independente que ignora a configuração global.

    ```astro
    ---
    import { renderHTML } from "astro-intlayer/html";

    const html = renderHTML("<p>Hello</p>");
    ---

    <div set:html={html} />
    ```

  </Tab>
</Tabs>

## Referência de Opções

Essas opções podem ser passadas para `HTMLProvider`, `HTMLRenderer`, `useHTMLRenderer` e `renderHTML`.

| Opção        | Tipo                  | Padrão | Descrição                                                                                                                           |
| :----------- | :-------------------- | :----- | :---------------------------------------------------------------------------------------------------------------------------------- |
| `components` | `Record<string, any>` | `{}`   | Um mapa que associa tags HTML ou nomes de componentes personalizados aos componentes.                                               |
| `renderHTML` | `Function`            | `null` | Uma função de renderização personalizada para substituir completamente o parser HTML padrão (providers Vue, Svelte, Remix e Astro). |

> Nota: Para React e Preact, as tags HTML padrão são fornecidas automaticamente. Você só precisa passar a prop `components` se quiser sobrescrevê-las ou adicionar componentes personalizados.

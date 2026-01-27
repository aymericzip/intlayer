---
createdAt: 2025-02-07
updatedAt: 2026-01-22
title: Markdown
description: Descubra como declarar e usar conteúdo Markdown no seu site multilíngue com o Intlayer. Siga os passos nesta documentação online para integrar o Markdown de forma simples ao seu projeto.
keywords:
  - Markdown
  - Internacionalização
  - Documentação
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - markdown
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Adicionar MarkdownRenderer / useMarkdownRenderer / utilitário renderMarkdown e opção forceInline
  - version: 8.0.0
    date: 2026-01-18
    changes: Decoração automática do conteúdo markdown, suporte MDX e SSR
  - version: 5.5.10
    date: 2025-06-29
    changes: Init history
---

# Markdown / Conteúdo de Texto Rico

O Intlayer suporta conteúdo de texto rico definido usando a sintaxe Markdown. Isso permite que você escreva e mantenha facilmente conteúdos com formatação rica, como blogs, artigos e muito mais.

## Como o Markdown Funciona

O Intlayer v8 detecta inteligentemente a sintaxe Markdown nas suas strings de conteúdo. Se uma string for identificada como Markdown, ela é automaticamente transformada em um nó Markdown.

<Columns>
  <Column title="Comportamento v7 (Envolvimento manual)">

    ```typescript fileName="markdownDictionary.content.ts"
    import { md } from "intlayer";

    export default {
      key: "app",
      content: {
        text: md("## Meu título \n\nLorem Ipsum"),
      },
    };
    ```

  </Column>
  <Column title="Comportamento v8 (Detecção automática)">

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Ativar a detecção automática de conteúdo Markdown - Pode ser definido globalmente em intlayer.config.ts
      content: {
        text: "## Meu título \n\nLorem Ipsum",
      },
    };
    ```

  </Column>
</Columns>

---

## Parte 1: Declarando Conteúdo Markdown

Você pode declarar conteúdo Markdown usando a função `md` ou simplesmente como uma string (se contiver sintaxe Markdown).

<Tabs>
  <Tab label="Envolvimento Manual">
    Use a função `md` para declarar explicitamente conteúdo Markdown. Isso é útil se você quiser garantir que uma string seja tratada como Markdown mesmo que não contenha sintaxe óbvia.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, type Dictionary } from "intlayer";

    const markdownDictionary = {
      key: "app",
      content: {
        myMarkdownContent: md("## Meu título \n\nLorem Ipsum"),
      },
    } satisfies Dictionary;

    export default markdownDictionary;
    ```

  </Tab>
  <Tab label="Detecção Automática">
    Se a string contiver indicadores comuns de Markdown (como cabeçalhos, listas, links, etc.), o Intlayer irá transformá-la automaticamente.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Ativar a detecção automática de conteúdo Markdown - Pode ser definido globalmente em intlayer.config.ts
      content: {
        myMarkdownContent: "## Meu título \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>
  <Tab label="Arquivos Externos">
    Importe arquivos `.md` diretamente usando a função `file`.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: md(file("./myMarkdown.en.md")),
          fr: md(file("./myMarkdown.fr.md")),
          pt: md(file("./myMarkdown.pt.md")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

---

## Parte 2: Renderização de Markdown

A renderização pode ser feita automaticamente pelo sistema de conteúdo do Intlayer ou manualmente usando ferramentas especializadas.

### 1. Renderização automática (usando `useIntlayer`)

Quando você acessa conteúdo via `useIntlayer`, os nós Markdown já estão preparados para renderização.

<Tabs group="framework">
  <Tab label="React / Next.js">
    Os nós Markdown podem ser renderizados diretamente como JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

    Você também pode fornecer substituições locais para nós específicos usando o método `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
    })}
    ```

  </Tab>
  <Tab label="Vue">
    No Vue, o conteúdo Markdown pode ser renderizado usando o built-in `component` ou diretamente como um nó.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myMarkdownContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myMarkdownContent" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte">
    O Svelte renderiza Markdown como uma string HTML por padrão. Use `{@html}` para renderizá-lo.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myMarkdownContent}
    ```

  </Tab>
  <Tab label="Preact">
    Preact suporta nós Markdown diretamente no JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid">
    Solid suporta nós Markdown diretamente no JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular">
    Angular utiliza a diretiva `[innerHTML]` para renderizar conteúdo Markdown.

    ```typescript fileName="app.component.ts"
    import { Component } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-root",
      template: `<div [innerHTML]="content().myMarkdownContent"></div>`,
    })
    export class AppComponent {
      content = useIntlayer("app");
    }
    ```

    Você também pode fornecer substituições locais para nós específicos usando o método `.use()`:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

  </Tab>
</Tabs>

### 2. Renderização Manual e Ferramentas Avançadas

Se precisar renderizar strings Markdown brutas ou tiver mais controlo sobre o processo de renderização, use as seguintes ferramentas.

<Tabs group="framework">
  <Tab label="React / Next.js">
  
    #### Componente `<MarkdownRenderer />`

    Renderize uma string Markdown com opções específicas.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# Meu Título"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    Obtenha uma função de renderização pré-configurada.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# Meu Título");
    ```

    #### Utilitário `renderMarkdown()`
    Utilitário independente para renderização fora de componentes.

    ```tsx
    import { renderMarkdown } from "react-intlayer";

    const jsx = renderMarkdown("# Meu Título", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue">

    #### Componente `<MarkdownRenderer />`

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# Meu Título" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte">

    #### Componente `<MarkdownRenderer />`

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer";
    </script>

    <MarkdownRenderer forceBlock={true} value="# Meu Título" />
    ```

    #### Hook `useMarkdownRenderer()`

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# Meu Título")}
    ```

    #### Utilitário `renderMarkdown()`

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer";
    </script>

    {@html renderMarkdown("# Meu Título")}
    ```

  </Tab>
  <Tab label="Preact">
    #### Componente `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# Meu Título"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# Meu Título")}</div>;
    ```

    #### Utilitário `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "preact-intlayer";

    return <div>{renderMarkdown("# Meu Título")}</div>;
    ```

  </Tab>
  <Tab label="Solid">
    #### Componente `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# Meu Título"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# Meu Título")}</div>;
    ```

    #### Utilitário `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "solid-intlayer";

    return <div>{renderMarkdown("# Meu Título")}</div>;
    ```

  </Tab>
  <Tab label="Angular">
    #### Serviço `IntlayerMarkdownService`
    Renderize uma string Markdown utilizando o serviço.

    ```typescript
    import { IntlayerMarkdownService } from "angular-intlayer";

    export class MyComponent {
      constructor(private markdownService: IntlayerMarkdownService) {}

      renderMarkdown(markdown: string) {
        return this.markdownService.renderMarkdown(markdown);
      }
    }
    ```

  </Tab>
</Tabs>

---

## Configuração Global com `MarkdownProvider`

Você pode configurar a renderização de Markdown globalmente para toda a sua aplicação. Isso evita passar as mesmas props para cada renderer.

<Tabs group="framework">
  <Tab label="React / Next.js">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "react-intlayer";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        forceBlock={true}
        tagfilter={true}
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
          a: ({ href, children }) => <Link to={href}>{children}</Link>,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

  </Tab>
  <Tab label="Vue">

    ```typescript fileName="main.ts"
    import { createApp } from "vue";
    import { installIntlayer, installIntlayerMarkdown } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(installIntlayer);
    app.use(installIntlayerMarkdown, {
      forceBlock: true,
      tagfilter: true,
      components: {
        h1: {
          component: "h1",
          props: { class: "text-2xl font-bold" },
        },
      },
    });

    app.mount("#app");
    ```

  </Tab>
  <Tab label="Svelte">

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { MarkdownProvider } from "svelte-intlayer";
      import MyHeading from "./MyHeading.svelte";
    </script>

    <MarkdownProvider
      forceBlock={true}
      tagfilter={true}
      components={{
        h1: MyHeading,
      }}
    >
      <slot />
    </MarkdownProvider>
    ```

  </Tab>
  <Tab label="Preact">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "preact-intlayer";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        forceBlock={true}
        tagfilter={true}
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

  </Tab>
  <Tab label="Solid">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "solid-intlayer";

    export const AppProvider = (props) => (
      <MarkdownProvider
        forceBlock={true}
        tagfilter={true}
        components={{
          h1: (props) => <h1 className="text-2xl font-bold">{props.children}</h1>,
        }}
      >
        {props.children}
      </MarkdownProvider>
    );
    ```

  </Tab>
  <Tab label="Angular">

    ```typescript fileName="app.config.ts"
    import { createIntlayerMarkdownProvider } from "angular-intlayer";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerMarkdownProvider({
          components: {
            h1: { class: "text-2xl font-bold" },
          },
        }),
      ],
    };
    ```

  </Tab>
</Tabs>

---

## Referência de Opções

Essas opções podem ser passadas para `MarkdownProvider`, `MarkdownRenderer`, `useMarkdownRenderer` e `renderMarkdown`.

| Opção                 | Tipo        | Padrão  | Descrição                                                                                            |
| :-------------------- | :---------- | :------ | :--------------------------------------------------------------------------------------------------- |
| `forceBlock`          | `boolean`   | `false` | Força a saída a ser envolvida em um elemento de nível de bloco (ex: `<div>`).                        |
| `forceInline`         | `boolean`   | `false` | Força a saída a ser envolvida em um elemento inline (ex: `<span>`).                                  |
| `tagfilter`           | `boolean`   | `true`  | Ativa o Filtro de Tags do GitHub para melhorar a segurança ao remover tags HTML perigosas.           |
| `preserveFrontmatter` | `boolean`   | `false` | Se `true`, o frontmatter no início da string Markdown não será removido.                             |
| `components`          | `Overrides` | `{}`    | Um mapa de tags HTML para componentes personalizados (ex: `{ h1: MyHeading }`).                      |
| `wrapper`             | `Component` | `null`  | Um componente personalizado para envolver o Markdown renderizado.                                    |
| `renderMarkdown`      | `Function`  | `null`  | Uma função de renderização personalizada para substituir completamente o compilador Markdown padrão. |

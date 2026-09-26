---
createdAt: 2025-02-07
updatedAt: 2026-09-21
priority: 8
title: Markdown
description: Aprenda como declarar e usar conteúdo Markdown em seu site multilíngue com o Intlayer. Siga os passos nesta documentação online para integrar o Markdown de forma nativa ao seu projeto.
keywords:
  - Markdown
  - Internacionalização
  - Documentação
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Remix
  - Astro
slugs:
  - doc
  - concept
  - content
  - markdown
history:
  - version: 8.11.0
    date: 2026-05-28
    changes: "Permitir a pré-análise do AST do Markdown para SSR / hidratação"
  - version: 8.10.0
    date: 2026-05-19
    changes: "Adicionado suporte a arquivos `.content.md`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "Adicionado o objeto plugin `intlayerMarkdown`; use `app.use(intlayerMarkdown)` em vez de `app.use(installIntlayerMarkdown)`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "Movida a importação de `{{framework}}-intlayer` para `{{framework}}-intlayer/markdown`"
  - version: 8.0.0
    date: 2026-01-22
    changes: "Adicionada a utilidade MarkdownRenderer / useMarkdownRenderer / renderMarkdown e a opção forceInline"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Decoração automática de conteúdo markdown, suporte a MDX e SSR"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Histórico inicializado"
author: aymericzip
---

# Markdown / Conteúdo de Texto Rico

O Intlayer suporta conteúdo de texto rico definido usando a sintaxe Markdown. Isso permite que você escreva e mantenha facilmente conteúdos com formatação rica, como blogs, artigos e muito mais.

## Declarando Conteúdo Markdown

Você pode declarar conteúdo Markdown usando a função `md` ou simplesmente como uma string (se ela contiver sintaxe Markdown).

<Tabs>
  <Tab label=".content.md" value=".content.md">

    A partir da versão `8.10.0`, você pode declarar conteúdo Markdown diretamente em arquivos `.content.md`. O Intlayer detectará e processará automaticamente o conteúdo Markdown.

    ```md fileName="markdown-file.en.content.md"
    ---
    key: my-markdown-content
    description: Meu conteúdo
    locale: en
    ---

    # Meu conteúdo

    Aqui está um exemplo de conteúdo markdown
    ```

    O campo `locale` no front-matter é o campo que define a localização do conteúdo. É opcional. Se não for fornecido, o Intlayer usará o idioma padrão, que também é usado como idioma de fallback caso não haja tradução disponível para um idioma específico.

    Exemplo de estrutura de diretórios:

    ```text
    content
    ├── markdown-file.en.content.md
    ├── markdown-file.fr.content.md
    └── markdown-file.es.content.md
    ```

    Você pode adicionar no front-matter quaisquer propriedades definidas na [Definição de Dicionário](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md)

  </Tab>
  <Tab label="Empacotamento Manual" value="manual-wrapping">
    Use a função `md` para declarar explicitamente o conteúdo Markdown. Isso é útil se você quiser garantir que uma string seja tratada como Markdown, mesmo que não contenha sintaxe óbvia.

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

  <Tab label="Arquivos Externos" value="external-files">
    Importe arquivos `.md` diretamente usando a função `file`.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: md(file("./myMarkdown.en.md")),
          pt: md(file("./myMarkdown.pt.md")),
        }),
      },
    };
    ```

  </Tab>

  <Tab label="Detecção Automática" value="automatic-detection">
    Se a string contiver indicadores Markdown comuns (como cabeçalhos, listas, links, etc.), o Intlayer a transformará automaticamente.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Ativar detecção automática de conteúdo Markdown - Pode ser definido globalmente em intlayer.config.ts
      content: {
        myMarkdownContent: "## Meu título \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>

</Tabs>

## Renderizando Markdown

O Intlayer fornece duas maneiras independentes de renderizar Markdown:

1. **Através do `useIntlayer`**
   — O Intlayer transforma automaticamente o nó `md` na saída nativa do framework (JSX, VNode, string HTML).
   - O Frontmatter é analisado e exposto como `.metadata`. Você pode substituir a renderização em dois níveis — globalmente com `MarkdownProvider` (ou o equivalente do framework) e localmente por nó com `.use()`. Ambos podem ser combinados; `.use()` tem prioridade sobre `MarkdownProvider`, que por sua vez tem prioridade sobre o padrão.

2. **Utilitários auxiliares** — `<MarkdownRenderer />`, `useMarkdownRenderer()` e `renderMarkdown()` são ferramentas autônomas que aceitam **apenas strings Markdown brutas**. Elas são independentes do `useIntlayer` e não funcionam com os nós decorados que ele retorna.

A renderização do Markdown suporta **MDX** — use qualquer componente JSX/framework por nome diretamente no seu Markdown.

### 1. Renderização Automática (através de `useIntlayer`)

<Tabs group="framework">
  <Tab label="React" value="react">
    Nós Markdown podem ser renderizados diretamente como JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";
    import { MarkdownProvider } from "react-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");

      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
          MyButton: (props) => <button {...props} />, // Componente MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Se o `MarkdownProvider` não estiver presente, o Intlayer renderizará o markdown usando o parser padrão Markdown-para-JSX.

    Você também pode fornecer substituições locais para nós específicos usando o método `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Você pode recuperar o Markdown como string:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    E você pode acessar os metadados do markdown assim:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    Nós Markdown podem ser renderizados diretamente como JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "next-intlayer";
    import { MarkdownProvider } from "next-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");

      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
          MyButton: (props) => <button {...props} />, // Componente MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Se o `MarkdownProvider` não estiver presente, o Intlayer renderizará o markdown usando o parser padrão Markdown-para-JSX.

    Você também pode fornecer substituições locais para nós específicos usando o método `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Você pode recuperar o Markdown como string:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    E você pode acessar os metadados do markdown assim:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    No Vue, o conteúdo Markdown pode ser renderizado usando a tag nativa `component` ou diretamente como um nó.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myMarkdownContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myMarkdownContent" />
    </template>
    ```

    Configure globalmente via plugin `intlayerMarkdown` (suporta componentes MDX personalizados):

    ```ts fileName="main.ts"
    import { intlayerMarkdown } from "vue-intlayer/markdown";

    app.use(intlayerMarkdown, {
      components: {
        h1: (props) => h('h1', { style: { color: 'green' } }, props.children),
        MyButton: (props) => h('button', props), // Componente MDX
      },
    });
    ```

    > Se o plugin `intlayerMarkdown` não estiver instalado, o Intlayer renderizará usando o compilador padrão.

    Você também pode fornecer substituições locais para nós específicos usando o método `.use()`:

    ```vue
    <component :is="myMarkdownContent.use({
      h1: (props) => h('h1', { style: { color: 'red' } }, props.children),
    })" />
    ```

    Você pode recuperar o Markdown como string:

    ```vue
    {{ myMarkdownContent.value }}
    {{ String(myMarkdownContent) }}
    {{ myMarkdownContent.toString() }}
    ```

    E você pode acessar os metadados do markdown assim:

    ```vue
    <component :is="myMarkdownContent.metadata" />
    <component :is="myMarkdownContent.metadata.title" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    O Svelte renderiza Markdown como string HTML por padrão. Use `{@html}` para renderizá-lo.

    ```svelte fileName="App.svelte"
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    import { MarkdownProvider } from "svelte-intlayer/markdown";
    import MyHeading from "./MyHeading.svelte";

    const content = useIntlayer("app");
    </script>

    <MarkdownProvider components={{ h1: MyHeading }}>
      {@html $content.myMarkdownContent}
    </MarkdownProvider>
    ```

    > Se o `MarkdownProvider` não estiver presente, o Intlayer renderizará o markdown usando o compilador padrão.

    Você também pode fornecer substituições locais para nós específicos usando o método `.use()`:

    ```svelte
    {@html $content.myMarkdownContent.use({ ... })}
    ```

    Você pode recuperar o Markdown como string:

    ```svelte
    {$content.myMarkdownContent.value}
    {String($content.myMarkdownContent)}
    {$content.myMarkdownContent.toString()}
    ```

    E você pode acessar os metadados do markdown assim:

    ```svelte
    {$content.myMarkdownContent.metadata}
    {$content.myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    O Preact suporta nós Markdown diretamente em JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";
    import { MarkdownProvider } from "preact-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
          MyButton: (props) => <button {...props} />, // Componente MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Se o `MarkdownProvider` não estiver presente, o Intlayer renderizará o markdown usando o parser padrão Markdown-para-JSX.

    Você também pode fornecer substituições locais para nós específicos usando o método `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Você pode recuperar o Markdown como string:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    E você pode acessar os metadados do markdown assim:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    O Solid suporta nós Markdown diretamente em JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";
    import { MarkdownProvider } from "solid-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
          MyButton: (props) => <button {...props} />, // Componente MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Se o `MarkdownProvider` não estiver presente, o Intlayer renderizará o markdown usando o parser padrão Markdown-para-JSX.

    Você também pode fornecer substituições locais para nós específicos usando o método `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
    })}
    ```

    Você pode recuperar o Markdown como string:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    E você pode acessar os metadados do markdown assim:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    O Angular usa a diretiva `[innerHTML]` para renderizar conteúdo Markdown.

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

    > Se o provedor IntlayerMarkdown não estiver configurado, o Intlayer renderizará usando o compilador padrão.

    Você também pode fornecer substituições locais para nós específicos usando o método `.use()`:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

    Você pode recuperar o Markdown como string:

    ```typescript
    content().myMarkdownContent.value
    String(content().myMarkdownContent)
    content().myMarkdownContent.toString()
    ```

    E você pode acessar os metadados do markdown assim:

    ```typescript
    content().myMarkdownContent.metadata
    content().myMarkdownContent.metadata.title
    ```

  </Tab>
  <Tab label="Remix" value="remix">
    No Remix 3, os nós Markdown são renderizados no servidor em uma string HTML. Injete-a com a prop `innerHTML` do Remix JSX ou com `html.raw` em uma visualização `html-template`.

    ```tsx fileName="src/views/home.tsx"
    import { useIntlayer } from "remix-intlayer";

    export const HomePage = () => () => {
      const { myMarkdownContent } = useIntlayer("app");

      return <div innerHTML={myMarkdownContent.value} />;
    };
    ```

    ```ts fileName="src/views/home.ts"
    import { html } from "remix/html-template";
    import { useIntlayer } from "remix-intlayer";

    export const renderHomePage = () => {
      const { myMarkdownContent } = useIntlayer("app");

      return html.raw`<div>${myMarkdownContent.value}</div>`;
    };
    ```

    > O Remix escapa valores interpolados por padrão. `innerHTML` e `html.raw` são as duas exceções, que é o que uma string Markdown renderizada precisa.

    Você também pode fornecer substituições locais para tags específicas usando o método `.use()`. As substituições são funções que retornam uma string HTML:

    ```tsx
    <div
      innerHTML={myMarkdownContent.use({
        h1: ({ children }) => `<h1 class="text-3xl font-bold">${children}</h1>`,
      })}
    />
    ```

    `.value` é a string HTML renderizada, enquanto `String()` / `.toString()` retornam a fonte Markdown bruta:

    ```tsx
    myMarkdownContent.value // "<h1>…</h1>"
    String(myMarkdownContent) // "# …"
    myMarkdownContent.toString() // "# …"
    ```

    E você pode acessar os metadados do seu markdown assim:

    ```tsx
    myMarkdownContent.metadata
    myMarkdownContent.metadata.title
    ```

  </Tab>
  <Tab label="Astro" value="astro">
    No Astro, os nós Markdown são renderizados em uma string HTML. Injete-a com a diretiva `set:html` no template ou com `innerHTML` em um `<script>` do cliente.

    ```astro fileName="src/pages/index.astro"
    ---
    import { useIntlayer } from "astro-intlayer";

    const { myMarkdownContent } = useIntlayer("app");
    ---

    <div set:html={myMarkdownContent.value} />
    ```

    ```astro fileName="src/components/Content.astro"
    <div id="content"></div>

    <script>
      import { useIntlayer } from "astro-intlayer";

      const { myMarkdownContent } = useIntlayer("app");

      document.querySelector("#content")!.innerHTML = myMarkdownContent.value;
    </script>
    ```

    > O Astro escapa `{expressões}` por padrão. `set:html` é a exceção, que é o que uma string Markdown renderizada precisa.

    Você também pode fornecer substituições locais para tags específicas usando o método `.use()`. As substituições são funções que retornam uma string HTML:

    ```astro
    <div
      set:html={myMarkdownContent.use({
        h1: ({ children }) => `<h1 class="text-3xl font-bold">${children}</h1>`,
      })}
    />
    ```

    `.value` é a string HTML renderizada, enquanto `String()` / `.toString()` retornam a fonte Markdown bruta:

    ```astro
    myMarkdownContent.value // "<h1>…</h1>"
    String(myMarkdownContent) // "# …"
    myMarkdownContent.toString() // "# …"
    ```

    E você pode acessar os metadados do seu markdown assim:

    ```astro
    myMarkdownContent.metadata
    myMarkdownContent.metadata.title
    ```

  </Tab>
</Tabs>

### 2. Utilitários auxiliares (Somente Strings Markdown)

Estes utilitários renderizam **apenas strings Markdown brutas** e são independentes do `useIntlayer`. Use-os quando precisar renderizar Markdown de fontes além de seus dicionários.

<Tabs group="framework">
  <Tab label="React" value="react">

    #### Componente `<MarkdownRenderer />`

    Renderiza uma string Markdown com opções específicas.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# Meu Título"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    Obtém uma função de renderização pré-configurada.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# Meu Título");
    ```

    #### Utilitário `renderMarkdown()`
    Utilitário autônomo para renderização fora dos componentes.

    ```tsx
    import { renderMarkdown } from "react-intlayer/markdown";

    const jsx = renderMarkdown("# Meu Título", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    #### Componente `<MarkdownRenderer />`

    Renderiza uma string Markdown com opções específicas.

    ```tsx
    import { MarkdownRenderer } from "next-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# Meu Título"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    Obtém uma função de renderização pré-configurada.

    ```tsx
    import { useMarkdownRenderer } from "next-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# Meu Título");
    ```

    #### Utilitário `renderMarkdown()`
    Utilitário autônomo para renderização fora dos componentes.

    ```tsx
    import { renderMarkdown } from "next-intlayer/markdown";

    const jsx = renderMarkdown("# Meu Título", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### Componente `<MarkdownRenderer />`

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer/markdown";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# Meu Título" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    #### Componente `<MarkdownRenderer />`

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer/markdown";
    </script>

    <MarkdownRenderer forceBlock={true} value="# Meu Título" />
    ```

    #### Hook `useMarkdownRenderer()`

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer/markdown";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# Meu Título")}
    ```

    #### Utilitário `renderMarkdown()`

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer/markdown";
    </script>

    {@html renderMarkdown("# Meu Título")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### Componente `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# Meu Título"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# Meu Título")}</div>;
    ```

    #### Utilitário `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "preact-intlayer/markdown";

    return <div>{renderMarkdown("# Meu Título")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### Componente `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# Meu Título"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# Meu Título")}</div>;
    ```

    #### Utilitário `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "solid-intlayer/markdown";

    return <div>{renderMarkdown("# Meu Título")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### Serviço `IntlayerMarkdownService`
    Renderiza uma string Markdown usando o serviço.

    ```typescript
    import { IntlayerMarkdownService } from "angular-intlayer/markdown";

    export class MyComponent {
      constructor(private markdownService: IntlayerMarkdownService) {}

      renderMarkdown(markdown: string) {
        return this.markdownService.renderMarkdown(markdown);
      }
    }
    ```

  </Tab>
  <Tab label="Remix" value="remix">
    #### Hook `useMarkdownRenderer()`

    Obtenha uma função de renderização pré-configurada por `installIntlayerMarkdown()`. Ela retorna uma string HTML.

    ```tsx
    import { useMarkdownRenderer } from "remix-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({ forceBlock: true });

    return <div innerHTML={renderMarkdown("# My Title")} />;
    ```

    #### Utilitário `renderMarkdown()`

    Utilitário independente que ignora a configuração global.

    ```tsx
    import { renderMarkdown } from "remix-intlayer/markdown";

    const html = renderMarkdown("# My Title", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Astro" value="astro">
    #### Hook `useMarkdownRenderer()`

    Obtenha uma função de renderização pré-configurada por `installIntlayerMarkdown()`. Ela retorna uma string HTML.

    ```astro
    ---
    import { useMarkdownRenderer } from "astro-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({ forceBlock: true });
    ---

    <div set:html={renderMarkdown("# My Title")} />
    ```

    #### Utilitário `renderMarkdown()`

    Utilitário independente que ignora a configuração global.

    ```astro
    ---
    import { renderMarkdown } from "astro-intlayer/markdown";

    const html = renderMarkdown("# My Title", { forceBlock: true });
    ---

    <div set:html={html} />
    ```

  </Tab>
</Tabs>

## Configuração Global com `MarkdownProvider`

O `MarkdownProvider` (ou o seu equivalente do framework) configura o pipeline de renderização Markdown para toda a sua aplicação. Aplica-se tanto para a renderização automática do `useIntlayer` quanto para os utilitários auxiliares. Opções definidas aqui são os padrões — o `.use()` substitui-os em nível de nó.

<Tabs group="framework">
  <Tab label="React" value="react">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "react-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        components={{
          h1: (props) => <h1 style={{color: 'green'}} {...props} />,
          a: ({ href, ...props }) => <a style={{color: 'red'}} {...props} />,
          MyCustomJSXComponent: (props) => <span style={{color: 'red'}} {...props} />,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```


    > O MDX é suportado — qualquer nome de componente usado dentro do seu Markdown (ex: `<MyCustomJSXComponent />`) é resolvido com base no mapa de `components`.

    Você também pode usar seu próprio renderizador de markdown:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "react-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          // Use dynamic import to reduce the bundle size of your application
          const { renderMarkdown } = await import('react-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > Importar dinamicamente o seu renderizador de Markdown é uma ótima maneira de reduzir o tamanho do bundle da sua aplicação.

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "next-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        components={{
          h1: (props) => <h1 style={{color: 'green'}} {...props} />,
          a: ({ href, ...props }) => <a style={{color: 'red'}} {...props} />,
          MyCustomJSXComponent: (props) => <span style={{color: 'red'}} {...props} />,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```


    > O MDX é suportado — qualquer nome de componente usado dentro do seu Markdown (ex: `<MyCustomJSXComponent />`) é resolvido com base no mapa de `components`.

    Você também pode usar seu próprio renderizador de markdown:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "next-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          // Use dynamic import to reduce the bundle size of your application
          const { renderMarkdown } = await import('next-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > Importar dinamicamente o seu renderizador de Markdown é uma ótima maneira de reduzir o tamanho do bundle da sua aplicação.

  </Tab>
  <Tab label="Vue" value="vue">

    ```typescript fileName="main.ts"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import { intlayerMarkdown } from "vue-intlayer/markdown";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);
    app.use(intlayerMarkdown, {
      components: {
        h1: (props) =>
        h('h1', { style: { color: 'orange' }, ...props }, props.children),
        ComponentDemo: () => h('div', { style: { background: 'grey' } }, 'DEMO'),
        bold: (props) => h('strong', props),
        code: (props) => h('code', props),
      },
    });

    app.mount("#app");
    ```


    > O MDX é suportado — qualquer nome de componente usado dentro do seu Markdown (ex: `<MyCustomJSXComponent />`) é resolvido com base no mapa de `components`.

    Você também pode usar seu próprio renderizador de markdown:

    ```typescript fileName="main.ts"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import { intlayerMarkdown } from "vue-intlayer/markdown";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);
    app.use(intlayerMarkdown, {
      renderMarkdown: async (md) => {
        const { renderMarkdown } = await import('vue-intlayer/markdown');
        return renderMarkdown(md);
      },
    });

    app.mount("#app");
    ```

    > Importar dinamicamente o seu renderizador de Markdown é uma ótima maneira de reduzir o tamanho do bundle da sua aplicação.

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { MarkdownProvider } from "svelte-intlayer/markdown";
      import MyHeading from "./MyHeading.svelte";
    </script>

    <MarkdownProvider
      components={{
        h1: MyHeading,
      }}
    >
      <slot />
    </MarkdownProvider>
    ```


    > O MDX é suportado — qualquer nome de componente usado dentro do seu Markdown (ex: `<MyCustomJSXComponent />`) é resolvido com base no mapa de `components`.

    Você também pode usar seu próprio renderizador de markdown:

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { MarkdownProvider } from "svelte-intlayer/markdown";
    </script>

    <MarkdownProvider
      renderMarkdown={async (md) => {
        const { renderMarkdown } = await import('svelte-intlayer/markdown');
        return renderMarkdown(md);
      }}
    >
      <slot />
    </MarkdownProvider>
    ```

    > Importar dinamicamente o seu renderizador de Markdown é uma ótima maneira de reduzir o tamanho do bundle da sua aplicação.

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "preact-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```


    > O MDX é suportado — qualquer nome de componente usado dentro do seu Markdown (ex: `<MyCustomJSXComponent />`) é resolvido com base no mapa de `components`.

    Você também pode usar seu próprio renderizador de markdown:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "preact-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          const { renderMarkdown } = await import('preact-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > Importar dinamicamente o seu renderizador de Markdown é uma ótima maneira de reduzir o tamanho do bundle da sua aplicação.

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "solid-intlayer/markdown";

    export const AppProvider = (props) => (
      <MarkdownProvider
        components={{
          h1: (props) => <h1 className="text-2xl font-bold">{props.children}</h1>,
        }}
      >
        {props.children}
      </MarkdownProvider>
    );
    ```


    > O MDX é suportado — qualquer nome de componente usado dentro do seu Markdown (ex: `<MyCustomJSXComponent />`) é resolvido com base no mapa de `components`.

    Você também pode usar seu próprio renderizador de markdown:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "solid-intlayer/markdown";

    export const AppProvider = (props) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          const { renderMarkdown } = await import('solid-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {props.children}
      </MarkdownProvider>
    );
    ```

    > Importar dinamicamente o seu renderizador de Markdown é uma ótima maneira de reduzir o tamanho do bundle da sua aplicação.

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="app.config.ts"
    import { createIntlayerMarkdownProvider } from "angular-intlayer/markdown";

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


    > O MDX é suportado — qualquer nome de componente usado dentro do seu Markdown (ex: `<MyCustomJSXComponent />`) é resolvido com base no mapa de `components`.

    Você também pode usar seu próprio renderizador de markdown:

    ```typescript fileName="app.config.ts"
    import { createIntlayerMarkdownProvider } from "angular-intlayer/markdown";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerMarkdownProvider({
          renderMarkdown: async (md) => {
            const { renderMarkdown } = await import('angular-intlayer/markdown');
            return renderMarkdown(md);
          },
        }),
      ],
    };
    ```

    > Importar dinamicamente o seu renderizador de Markdown é uma ótima maneira de reduzir o tamanho do bundle da sua aplicação.

  </Tab>
  <Tab label="Remix" value="remix">

    O Remix não possui uma árvore de componentes para manter um provider, portanto, a configuração é instalada uma vez, como um singleton, na inicialização do servidor. Ela configura o renderizador retornado por `useMarkdownRenderer()`. Os nós `md` retornados por `useIntlayer` são renderizados com o compilador padrão; substitua suas tags por nó com `.use()`.

    ```typescript fileName="src/router.ts"
    import { installIntlayerMarkdown } from "remix-intlayer/markdown";

    installIntlayerMarkdown({
      forceBlock: true,
      components: {
        h1: ({ children }) => `<h1 class="text-2xl font-bold">${children}</h1>`,
      },
    });
    ```

    Você também pode usar seu próprio renderizador de markdown:

    ```typescript fileName="src/router.ts"
    import { installIntlayerMarkdown } from "remix-intlayer/markdown";

    installIntlayerMarkdown({
      renderMarkdown: async (md) => {
        const { marked } = await import("marked");
        return marked(md) as string;
      },
    });
    ```

    > Use `installIntlayerMarkdownDynamic(async () => …)` para carregar o renderizador de forma preguiçosa; o carregador é executado apenas na primeira chamada.

  </Tab>
  <Tab label="Astro" value="astro">

    O Astro não possui uma árvore de componentes para manter um provider, portanto, a configuração é instalada uma vez, como um singleton, no middleware (servidor) e em um `<script>` do cliente (navegador). Ela configura o renderizador retornado por `useMarkdownRenderer()`. Os nós `md` retornados por `useIntlayer` são renderizados com o compilador padrão; substitua suas tags por nó com `.use()`.

    ```typescript fileName="src/middleware.ts"
    import { installIntlayerMarkdown } from "astro-intlayer/markdown";
    import { defineMiddleware } from "astro:middleware";

    // Executa uma vez quando o servidor inicia; o próprio middleware do Intlayer é
    // registrado pela integração, antes deste arquivo.
    installIntlayerMarkdown({
      forceBlock: true,
      components: {
        h1: ({ children }) => `<h1 class="text-2xl font-bold">${children}</h1>`,
      },
    });

    export const onRequest = defineMiddleware((_context, next) => next());
    ```

    Você também pode usar seu próprio renderizador de markdown:

    ```typescript fileName="src/middleware.ts"
    import { installIntlayerMarkdown } from "astro-intlayer/markdown";

    installIntlayerMarkdown({
      renderMarkdown: async (md) => {
        const { marked } = await import("marked");
        return marked(md) as string;
      },
    });
    ```

    > Use `installIntlayerMarkdownDynamic(async () => …)` para carregar o renderizador de forma preguiçosa; o carregador é executado apenas na primeira chamada.

  </Tab>
</Tabs>

## Suspense

O renderizador Markdown do Intlayer é carregado dinamicamente. Embora otimizado, o chunk do analisador subjacente tem aproximadamente 55 kb. Carregar isso de forma síncrona atrasa a renderização inicial da página e degrada o First Contentful Paint (FCP).

Para evitar o bloqueio da interface do usuário, o Intlayer se integra com a API Suspense do React. Ele busca o analisador em segundo plano e lança uma Promise durante o download.

Envolva qualquer componente que renderize o Intlayer Markdown em um limite `<Suspense>`. Isso exibe um estado de fallback localizado enquanto o chunk é baixado, permitindo que o restante de seu DOM seja renderizado imediatamente.

Aviso: Se você não fornecer um limite `<Suspense>`, o React irá suspender no nível raiz ou bloquear a renderização de toda a árvore de componentes até que o chunk de 55 kb seja totalmente carregado.

<Tabs>
  <Tab label="Next.js" value="nextjs">

No Next.js App Router, você pode usar o React `Suspense` para componentes do cliente ou um arquivo `loading.tsx` para componentes do servidor.

**Componente do Cliente:**

```tsx fileName="components/MyComponent.tsx"
"use client";
import { useIntlayer } from "next-intlayer";
import { Suspense } from "react";

const MyComponent = () => {
  const markdownContent = useIntlayer("my-markdown");

  return (
    <Suspense fallback={<div>Loading...</div>}>{markdownContent}</Suspense>
  );
};
```

**Componente do Servidor com `loading.tsx`:**

```tsx fileName="app/loading.tsx"
export default function Loading() {
  return <div>Loading...</div>;
}
```

```tsx fileName="app/page.tsx"
import { useIntlayer } from "next-intlayer/server";

const MyPage = () => {
  const markdownContent = useIntlayer("my-markdown");
  return <div>{markdownContent}</div>;
};

export default MyPage;
```

  </Tab>

  <Tab label="React" value="react">

```tsx
import { useIntlayer } from "react-intlayer";
import { Suspense } from "react";

const MyComponent = () => {
  const markdownContent = useIntlayer("my-markdown");

  return (
    <Suspense fallback={<div>Loading...</div>}>{markdownContent}</Suspense>
  );
};
```

  </Tab>

  <Tab label="Vue" value="vue">

Vue tem um componente `<Suspense>` integrado. Envolva o componente que renderiza o conteúdo Markdown em um limite `<Suspense>`.

```vue fileName="MyComponent.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { markdownContent } = useIntlayer("my-markdown");
</script>

<template>
  <Suspense>
    <component :is="markdownContent" />
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

O Svelte não tem um equivalente à API Suspense. Use um bloco `{#await}` para lidar com a renderização assíncrona do conteúdo Markdown.

```svelte fileName="MyComponent.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my-markdown");
</script>

{#await $content.markdownContent}
  <div>Loading...</div>
{:then rendered}
  {@html rendered}
{/await}
```

  </Tab>
  <Tab label="Preact" value="preact">

O Preact suporta a API Suspense do React via `preact/compat`.

```tsx fileName="MyComponent.tsx"
import { useIntlayer } from "preact-intlayer";
import { Suspense } from "preact/compat";

const MyComponent = () => {
  const markdownContent = useIntlayer("my-markdown");

  return (
    <Suspense fallback={<div>Loading...</div>}>{markdownContent}</Suspense>
  );
};
```

  </Tab>
  <Tab label="Solid" value="solid">

Solid tem seu próprio componente `<Suspense>` do `solid-js`.

```tsx fileName="MyComponent.tsx"
import { useIntlayer } from "solid-intlayer";
import { Suspense } from "solid-js";

const MyComponent = () => {
  const { markdownContent } = useIntlayer("my-markdown");

  return (
    <Suspense fallback={<div>Loading...</div>}>{markdownContent}</Suspense>
  );
};
```

  </Tab>
  <Tab label="Angular" value="angular">

Angular não tem uma API Suspense. Use as exibições adiáveis (`@defer`) para lidar com o conteúdo Markdown carregado lentamente (requer Angular 17+).

```typescript fileName="my.component.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-my",
  template: `
    @defer {
      <div [innerHTML]="content().markdownContent"></div>
    } @loading {
      <div>Loading...</div>
    }
  `,
})
export class MyComponent {
  content = useIntlayer("my-markdown");
}
```

  </Tab>
</Tabs>

## Renderização no Lado do Servidor (SSR) e Hidratação

Em comparação com outros analisadores de Markdown, como remark / rehype, o Intlayer Markdown é livre de dependências e roda tanto no cliente quanto no servidor.

No entanto, o Intlayer otimiza a análise para frameworks de Renderização no Lado do Servidor (SSR) (como Next.js App Router, React Router, Nuxt, SvelteKit, etc.).

Em vez de enviar strings Markdown brutas para o cliente e analisá-las no navegador (o que acarreta uma perda de desempenho), o Intlayer permite pré-analisar o Markdown em uma Árvore de Sintaxe Abstrata (AST) no servidor.

Você pode usar a função `parseMarkdown` do pacote Intlayer do seu framework no lado do servidor para gerar uma AST serializável (objeto `ParsedMarkdown`) e passá-la diretamente para o frontend. Todos os utilitários de renderização do Intlayer (como `<MarkdownRenderer>`, `useMarkdownRenderer`, etc.) aceitam automaticamente esse objeto AST e o renderizam perfeitamente.

### Exemplo em uma Arquitetura Servidor/Cliente

<Tabs group="framework">
  <Tab label="React Router" value="react">

    ```tsx fileName="server.ts"
    import { parseMarkdown } from "react-intlayer/markdown";

    // 1. No servidor: Analisar o markdown em uma AST serializável
    export const loader = async () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // Retornar a AST como JSON para o cliente
      return Response.json({ content: ast });
    };
    ```

    ```tsx fileName="client.tsx"
    import { useLoaderData } from "react-router";
    import { MarkdownRenderer } from "react-intlayer/markdown";

    // 2. No cliente: Renderizar a AST diretamente sem reanalisar
    export default function Page() {
      const { content } = useLoaderData();

      // O renderizador aceita uma string bruta ou a AST analisada
      return <MarkdownRenderer content={content} />;
    }
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="app/page.tsx"
    import { parseMarkdown } from "next-intlayer/markdown";
    import { MarkdownRenderer } from "next-intlayer/markdown";

    export default async function Page() {
      // 1. Analisar o markdown em uma AST serializável no servidor
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // 2. Renderizar a AST diretamente
      // Em um Server Component, isso funciona perfeitamente e passa a AST
    // diretamente para os componentes de cliente subjacentes, se necessário.
      return <MarkdownRenderer content={ast} />;
    }
    ```

  </Tab>
  <Tab label="Vue / Nuxt" value="vue">

    ```vue fileName="pages/index.vue"
    <script setup lang="ts">
    import { parseMarkdown } from "vue-intlayer/markdown";
    import { MarkdownRenderer } from "vue-intlayer/markdown";

    // 1. Buscar e analisar o markdown em uma AST no servidor
    const { data: ast } = await useAsyncData('markdown', () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      return parseMarkdown(markdownString);
    });
    </script>

    <template>
      <!-- 2. No cliente: Renderizar a AST diretamente sem reanalisar -->
      <MarkdownRenderer :content="ast" />
    </template>
    ```

  </Tab>
  <Tab label="SvelteKit" value="svelte">

    ```typescript fileName="+page.server.ts"
    import { parseMarkdown } from "svelte-intlayer/markdown";

    // 1. No servidor: Analisar o markdown em uma AST serializável
    export const load = async () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // Retornar a AST para o cliente
      return { content: ast };
    };
    ```

    ```svelte fileName="+page.svelte"
    <script lang="ts">
      import { MarkdownRenderer } from "svelte-intlayer/markdown";
      export let data;
    </script>

    <!-- 2. No cliente: Renderizar a AST diretamente sem reanalisar -->
    <MarkdownRenderer value={data.content} />
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    O SSR do Angular normalmente resolve os dados no servidor durante o carregamento inicial e hidrata no cliente. Você pode usar resolvers para passar a AST.

    ```typescript fileName="app.resolver.ts"
    import { Injectable } from "@angular/core";
    import { Resolve } from "@angular/router";
    import { parseMarkdown, type ParsedMarkdown } from "angular-intlayer/markdown";

    @Injectable({ providedIn: "root" })
    export class MarkdownResolver implements Resolve<ParsedMarkdown> {
      resolve(): ParsedMarkdown {
        const markdownString = "## My title \n\nLorem Ipsum";
        // 1. No servidor: Analisar o markdown em uma AST serializável
        return parseMarkdown(markdownString);
      }
    }
    ```

    ```typescript fileName="app.component.ts"
    import { Component } from "@angular/core";
    import { ActivatedRoute } from "@angular/router";
    import { IntlayerMarkdownService, type ParsedMarkdown } from "angular-intlayer/markdown";

    @Component({
      selector: "app-root",
      template: `<div [innerHTML]="renderedMarkdown"></div>`,
    })
    export class AppComponent {
      renderedMarkdown: string = "";

      constructor(
        private route: ActivatedRoute,
        private markdownService: IntlayerMarkdownService
      ) {
        // 2. No cliente: Renderizar a AST diretamente sem reanalisar
        this.route.data.subscribe((data) => {
          this.renderedMarkdown = this.markdownService.renderMarkdown(
            data.markdownAst
          ) as string;
        });
      }
    }
    ```

  </Tab>
  <Tab label="Remix" value="remix">

    O Remix 3 renderiza no servidor e transmite HTML, portanto, nenhuma AST precisa ser transferida para o cliente. Analise uma vez e renderize a AST onde quer que a página seja construída:

    ```tsx fileName="src/views/article.tsx"
    import { parseMarkdown, renderMarkdown } from "remix-intlayer/markdown";

    // 1. Analisar o markdown em uma AST serializável (por exemplo, uma vez, no carregamento do módulo)
    const ast = parseMarkdown("## My title \n\nLorem Ipsum");

    export const ArticlePage = () => () => (
      // 2. Renderizar a AST: o renderizador aceita uma string bruta ou a AST analisada
      <article innerHTML={renderMarkdown(ast)} />
    );
    ```

  </Tab>
  <Tab label="Astro" value="astro">

    As páginas do Astro são renderizadas no servidor, portanto, nenhuma AST precisa ser transferida para o cliente. Analise o Markdown no frontmatter e renderize-o com `set:html`:

    ```astro fileName="src/pages/article.astro"
    ---
    import { parseMarkdown, renderMarkdown } from "astro-intlayer/markdown";

    // 1. Analisar o markdown em uma AST serializável
    const ast = parseMarkdown("## My title \n\nLorem Ipsum");
    ---

    <!-- 2. Renderizar a AST: o renderizador aceita uma string bruta ou a AST analisada -->
    <article set:html={renderMarkdown(ast)} />
    ```

  </Tab>
</Tabs>

Esse padrão garante que a lógica de análise do Markdown seja executada inteiramente no servidor, reduzindo significativamente o tempo de execução no cliente e melhorando a velocidade de hidratação inicial.

## Referência de opções

Essas opções podem ser passadas para `MarkdownProvider`, `MarkdownRenderer`, `useMarkdownRenderer` e `renderMarkdown`.

| Option                | Type        | Default | Descrição                                                                                            |
| :-------------------- | :---------- | :------ | :--------------------------------------------------------------------------------------------------- |
| `forceBlock`          | `boolean`   | `false` | Força a saída a ser envolvida em um elemento de nível de bloco (ex: `<div>`).                        |
| `forceInline`         | `boolean`   | `false` | Força a saída a ser envolvida em um elemento em linha (ex: `<span>`).                                |
| `tagfilter`           | `boolean`   | `true`  | Habilita o GitHub Tag Filter para melhor segurança removendo tags HTML perigosas.                    |
| `preserveFrontmatter` | `boolean`   | `false` | Se `true`, o frontmatter no início da string Markdown não será removido.                             |
| `components`          | `Overrides` | `{}`    | Um mapa de tags HTML para componentes personalizados (ex: `{ h1: MyHeading }`).                      |
| `wrapper`             | `Component` | `null`  | Um componente personalizado para envolver o Markdown renderizado.                                    |
| `renderMarkdown`      | `Function`  | `null`  | Uma função de renderização personalizada para substituir completamente o compilador Markdown padrão. |

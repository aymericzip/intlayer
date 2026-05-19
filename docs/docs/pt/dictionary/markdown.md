---
createdAt: 2025-02-07
updatedAt: 2026-05-19
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
slugs:
  - doc
  - concept
  - content
  - markdown
history:
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
    content/
    ├── en/
    │   └── markdown-file.en.content.md
    ├── fr/
    │   └── markdown-file.fr.content.md
    └── es/
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
</Tabs>

---

## Renderizando Markdown

O Intlayer fornece duas maneiras independentes de renderizar Markdown:

1. **Através do `useIntlayer`**
   — O Intlayer transforma automaticamente o nó `md` na saída nativa do framework (JSX, VNode, string HTML).
   - O Frontmatter é analisado e exposto como `.metadata`. Você pode substituir a renderização em dois níveis — globalmente com `MarkdownProvider` (ou o equivalente do framework) e localmente por nó com `.use()`. Ambos podem ser combinados; `.use()` tem prioridade sobre `MarkdownProvider`, que por sua vez tem prioridade sobre o padrão.

2. **Utilitários auxiliares** — `<MarkdownRenderer />`, `useMarkdownRenderer()` e `renderMarkdown()` são ferramentas autônomas que aceitam **apenas strings Markdown brutas**. Elas são independentes do `useIntlayer` e não funcionam com os nós decorados que ele retorna.

A renderização do Markdown suporta **MDX** — use qualquer componente JSX/framework por nome diretamente no seu Markdown.

### 1. Renderização Automática (através de `useIntlayer`)

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
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
</Tabs>

### 2. Utilitários auxiliares (Somente Strings Markdown)

Estes utilitários renderizam **apenas strings Markdown brutas** e são independentes do `useIntlayer`. Use-os quando precisar renderizar Markdown de fontes além de seus dicionários.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
  
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
</Tabs>

---

## Configuração Global com `MarkdownProvider`

O `MarkdownProvider` (ou o seu equivalente do framework) configura o pipeline de renderização Markdown para toda a sua aplicação. Aplica-se tanto para a renderização automática do `useIntlayer` quanto para os utilitários auxiliares. Opções definidas aqui são os padrões — o `.use()` substitui-os em nível de nó.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

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
          const { renderMarkdown } = await import('react-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > Importar dinamicamente o seu renderizador de Markdown é uma ótima maneira de reduzir o tamanho do pacote da sua aplicação.

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

    > Importar dinamicamente o seu renderizador de Markdown é uma ótima maneira de reduzir o tamanho do pacote da sua aplicação.

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

    > Importar dinamicamente o seu renderizador de Markdown é uma ótima maneira de reduzir o tamanho do pacote da sua aplicação.

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

    > Importar dinamicamente o seu renderizador de Markdown é uma ótima maneira de reduzir o tamanho do pacote da sua aplicação.

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

    > Importar dinamicamente o seu renderizador de Markdown é uma ótima maneira de reduzir o tamanho do pacote da sua aplicação.

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="app.module.ts"
    import { NgModule } from '@angular/core';
    import { IntlayerMarkdownModule } from 'angular-intlayer/markdown';

    @NgModule({
      imports: [
        IntlayerMarkdownModule.forRoot({
          renderMarkdown: async (md) => {
            const { renderMarkdown } = await import('angular-intlayer/markdown');
            return renderMarkdown(md);
          }
        })
      ]
    })
    export class AppModule {}
    ```

    > Importar dinamicamente o seu renderizador de Markdown é uma ótima maneira de reduzir o tamanho do pacote da sua aplicação.

  </Tab>
</Tabs>

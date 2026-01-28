---
createdAt: 2025-02-07
updatedAt: 2026-01-22
title: Markdown
description: Scopri come dichiarare e utilizzare contenuti Markdown nel tuo sito web multilingue con Intlayer. Segui i passaggi in questa documentazione online per integrare Markdown nel tuo progetto in modo semplice.
keywords:
  - Markdown
  - Internazionalizzazione
  - Documentazione
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
    changes: Aggiunta dell'utility MarkdownRenderer / useMarkdownRenderer / renderMarkdown e opzione forceInline
  - version: 8.0.0
    date: 2026-01-18
    changes: Decorazione automatica del contenuto markdown, supporto MDX e SSR
  - version: 5.5.10
    date: 2025-06-29
    changes: Init history
---

# Markdown / Contenuto Rich Text

Intlayer supporta contenuti rich text definiti utilizzando la sintassi Markdown. Questo ti consente di scrivere e mantenere facilmente contenuti con formattazione ricca, come blog, articoli e altro.

## Parte 1: Dichiarare contenuti Markdown

Puoi dichiarare contenuti Markdown usando la funzione `md` o semplicemente come stringa (se contiene sintassi Markdown).

<Tabs>
  <Tab label="Avvolgimento manuale" value="manual-wrapping">
    Usa la funzione `md` per dichiarare esplicitamente contenuti Markdown. Questo è utile se vuoi assicurarti che una stringa sia trattata come Markdown anche se non contiene sintassi ovvia.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, type Dictionary } from "intlayer";

    const markdownDictionary = {
      key: "app",
      content: {
        myMarkdownContent: md("## Il mio titolo \n\nLorem Ipsum"),
      },
    } satisfies Dictionary;

    export default markdownDictionary;
    ```

  </Tab>
  <Tab label="Rilevamento automatico" value="automatic-detection">
    Se la stringa contiene indicatori Markdown comuni (come intestazioni, elenchi, collegamenti, ecc.), Intlayer la trasformerà automaticamente.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Abilita il rilevamento automatico del contenuto Markdown - Può essere impostato globalmente in intlayer.config.ts
      content: {
        myMarkdownContent: "## Il mio titolo \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>
  <Tab label="File esterni" value="external-files">
    Importa file `.md` direttamente usando la funzione `file`.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: md(file("./myMarkdown.en.md")),
          fr: md(file("./myMarkdown.fr.md")),
          it: md(file("./myMarkdown.it.md")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

---

## Parte 2: Rendering di Markdown

Il rendering può essere gestito automaticamente dal sistema di contenuti di Intlayer o manualmente utilizzando strumenti specializzati.

### 1. Rendering automatico (usando `useIntlayer`)

Quando accedi al contenuto tramite `useIntlayer`, i nodi Markdown sono già pronti per il rendering.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    I nodi Markdown possono essere renderizzati direttamente come JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

    Puoi anche fornire sovrascritture locali per nodi specifici utilizzando il metodo `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
    })}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    In Vue, il contenuto Markdown può essere renderizzato utilizzando il built-in `component` o direttamente come nodo.

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
  <Tab label="Svelte" value="svelte">
    Svelte renderizza Markdown come una stringa HTML per impostazione predefinita. Usa `{@html}` per renderizzarlo.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myMarkdownContent}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact supporta i nodi Markdown direttamente nel JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid supporta i nodi Markdown direttamente nel JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular utilizza la direttiva `[innerHTML]` per renderizzare il contenuto Markdown.

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

    Puoi anche fornire sovrascritture locali per nodi specifici utilizzando il metodo `.use()`:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

  </Tab>
</Tabs>

### 2. Rendering manuale e strumenti avanzati

Se hai bisogno di renderizzare stringhe Markdown grezze o di avere un maggiore controllo sul processo di rendering, usa i seguenti strumenti.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
  
    #### Componente `<MarkdownRenderer />`

    Renderizza una stringa Markdown con opzioni specifiche.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# Il mio titolo"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    Ottieni una funzione di rendering preconfigurata.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# Il mio titolo");
    ```

    #### Utility `renderMarkdown()`
    Utility standalone per il rendering al di fuori dei componenti.

    ```tsx
    import { renderMarkdown } from "react-intlayer";

    const jsx = renderMarkdown("# Il mio titolo", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### Componente `<MarkdownRenderer />`

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# Il mio titolo" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    #### Componente `<MarkdownRenderer />`

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer";
    </script>

    <MarkdownRenderer forceBlock={true} value="# Il mio titolo" />
    ```

    #### Hook `useMarkdownRenderer()`

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# Il mio titolo")}
    ```

    #### Utility `renderMarkdown()`

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer";
    </script>

    {@html renderMarkdown("# Il mio titolo")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### Componente `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# Il mio titolo"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# Il mio titolo")}</div>;
    ```

    #### Utility `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "preact-intlayer";

    return <div>{renderMarkdown("# Il mio titolo")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### Componente `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# Il mio titolo"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# Il mio titolo")}</div>;
    ```

    #### Utility `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "solid-intlayer";

    return <div>{renderMarkdown("# Il mio titolo")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### Servizio `IntlayerMarkdownService`
    Renderizza una stringa Markdown utilizzando il servizio.

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

## Configurazione globale con `MarkdownProvider`

Puoi configurare il rendering Markdown a livello globale per l'intera applicazione. Questo evita di passare le stesse prop a ogni renderer.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

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
  <Tab label="Vue" value="vue">

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
  <Tab label="Svelte" value="svelte">

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
  <Tab label="Preact" value="preact">

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
  <Tab label="Solid" value="solid">

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
  <Tab label="Angular" value="angular">

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

## Riferimento delle opzioni

Queste opzioni possono essere passate a `MarkdownProvider`, `MarkdownRenderer`, `useMarkdownRenderer`, e `renderMarkdown`.

| Opzione               | Tipo        | Predefinito | Descrizione                                                                                               |
| :-------------------- | :---------- | :---------- | :-------------------------------------------------------------------------------------------------------- |
| `forceBlock`          | `boolean`   | `false`     | Forza il wrapping dell'output in un elemento a livello di blocco (es. `<div>`).                           |
| `forceInline`         | `boolean`   | `false`     | Forza il wrapping dell'output in un elemento inline (es. `<span>`).                                       |
| `tagfilter`           | `boolean`   | `true`      | Abilita il Tag Filter di GitHub per una maggiore sicurezza rimuovendo i tag HTML pericolosi.              |
| `preserveFrontmatter` | `boolean`   | `false`     | Se `true`, il frontmatter all'inizio della stringa Markdown non verrà rimosso.                            |
| `components`          | `Overrides` | `{}`        | Una mappa di tag HTML a componenti personalizzati (es. `{ h1: MyHeading }`).                              |
| `wrapper`             | `Component` | `null`      | Un componente personalizzato per avvolgere il Markdown renderizzato.                                      |
| `renderMarkdown`      | `Function`  | `null`      | Una funzione di rendering personalizzata per sostituire completamente il compilatore Markdown di default. |

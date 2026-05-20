---
createdAt: 2025-02-07
updatedAt: 2026-05-19
title: Markdown
description: Scopri come dichiarare e utilizzare i contenuti Markdown nel tuo sito web multilingue con Intlayer. Segui i passaggi in questa documentazione online per integrare perfettamente Markdown nel tuo progetto.
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
  - version: 8.10.0
    date: 2026-05-19
    changes: "Aggiunto il supporto per i file `.content.md`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "Aggiunto l'oggetto plugin `intlayerMarkdown`; usa `app.use(intlayerMarkdown)` al posto di `app.use(installIntlayerMarkdown)`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "Spostata l'importazione da `{{framework}}-intlayer` a `{{framework}}-intlayer/markdown`"
  - version: 8.0.0
    date: 2026-01-22
    changes: "Aggiunte le utility MarkdownRenderer / useMarkdownRenderer / renderMarkdown e l'opzione forceInline"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Decorazione automatica dei contenuti markdown, supporto per MDX e SSR"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inizializzazione della cronologia"
---

# Markdown / Contenuti Rich Text

Intlayer supporta contenuti rich text definiti utilizzando la sintassi Markdown. Questo ti permette di scrivere e mantenere facilmente contenuti con formattazione ricca, come blog, articoli e molto altro.

## Dichiarare Contenuti Markdown

Puoi dichiarare i contenuti Markdown usando la funzione `md` o semplicemente come stringa (se contiene la sintassi Markdown).

<Tabs>
  <Tab label=".content.md" value=".content.md">
    Dalla versione `8.10.0`, puoi dichiarare i contenuti Markdown direttamente nei file `.content.md`. Intlayer rileverà e analizzerà automaticamente il contenuto Markdown.

    ```md fileName="markdown-file.en.content.md"
    ---
    key: my-markdown-content
    description: Il mio contenuto
    locale: en
    ---

    # Il mio contenuto

    Ecco un esempio di contenuto markdown
    ```

    Il campo front-matter `locale` è il campo che definisce la lingua del contenuto. È facoltativo. Se non viene fornito, Intlayer utilizzerà la lingua predefinita, che viene anche utilizzata come lingua di fallback se non è disponibile alcuna traduzione per una lingua specifica.

    Esempio di struttura dei file:

    ```text
    content/
    ├── en/
    │   └── markdown-file.en.content.md
    ├── fr/
    │   └── markdown-file.fr.content.md
    └── es/
        └── markdown-file.es.content.md
    ```

    Puoi aggiungere nel front-matter qualsiasi proprietà definita nella [Definizione del Dizionario](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md)

  </Tab>
  <Tab label="Wrapping Manuale" value="manual-wrapping">
    Usa la funzione `md` per dichiarare esplicitamente i contenuti Markdown. Questo è utile se vuoi assicurarti che una stringa venga trattata come Markdown anche se non contiene una sintassi evidente.

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
  <Tab label="File Esterni" value="external-files">
    Importa direttamente i file `.md` usando la funzione `file`.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: md(file("./myMarkdown.en.md")),
          it: md(file("./myMarkdown.it.md")),
        }),
      },
    };
    ```

  </Tab>

  <Tab label="Rilevamento Automatico" value="automatic-detection">
    Se la stringa contiene indicatori comuni di Markdown (come intestazioni, elenchi, link, ecc.), Intlayer la trasformerà automaticamente.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Abilita il rilevamento automatico dei contenuti Markdown - Può essere impostato globalmente in intlayer.config.ts
      content: {
        myMarkdownContent: "## Il mio titolo \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>
</Tabs>

## Rendering del Markdown

Intlayer fornisce due modi indipendenti per eseguire il rendering del Markdown:

1. **Tramite `useIntlayer`**
   — Intlayer trasforma automaticamente il nodo `md` nell'output nativo del framework (JSX, VNode, stringa HTML).
   - Il Frontmatter viene analizzato ed esposto come `.metadata`. Puoi sovrascrivere il rendering su due livelli — globalmente con `MarkdownProvider` (o l'equivalente nel framework) e localmente per nodo con `.use()`. Entrambi possono essere combinati; `.use()` ha priorità su `MarkdownProvider`, il quale ha priorità su quello predefinito.

2. **Utility di supporto** — `<MarkdownRenderer />`, `useMarkdownRenderer()`, e `renderMarkdown()` sono strumenti indipendenti che accettano **solo stringhe Markdown pure**. Sono indipendenti da `useIntlayer` e non funzionano con i nodi decorati che esso restituisce.

Il rendering del Markdown supporta **MDX** — usa qualsiasi componente JSX/framework tramite nome direttamente nel tuo Markdown.

### 1. Rendering Automatico (tramite `useIntlayer`)

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    I nodi Markdown possono essere renderizzati direttamente come JSX.

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

    > Se `MarkdownProvider` non è presente, Intlayer eseguirà il rendering del markdown usando il parser da Markdown a JSX predefinito.

    Puoi anche fornire sovrascritture locali per nodi specifici utilizzando il metodo `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Puoi recuperare il Markdown come stringa:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    E puoi accedere ai metadati del tuo markdown in questo modo:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    In Vue, il contenuto Markdown può essere renderizzato usando il tag `component` integrato o direttamente come nodo.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myMarkdownContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myMarkdownContent" />
    </template>
    ```

    Configura globalmente tramite il plugin `intlayerMarkdown` (supporta componenti MDX personalizzati):

    ```ts fileName="main.ts"
    import { intlayerMarkdown } from "vue-intlayer/markdown";

    app.use(intlayerMarkdown, {
      components: {
        h1: (props) => h('h1', { style: { color: 'green' } }, props.children),
        MyButton: (props) => h('button', props), // Componente MDX
      },
    });
    ```

    > Se il plugin `intlayerMarkdown` non è installato, Intlayer eseguirà il rendering utilizzando il compilatore predefinito.

    Puoi anche fornire sovrascritture locali per nodi specifici utilizzando il metodo `.use()`:

    ```vue
    <component :is="myMarkdownContent.use({
      h1: (props) => h('h1', { style: { color: 'red' } }, props.children),
    })" />
    ```

    Puoi recuperare il Markdown come stringa:

    ```vue
    {{ myMarkdownContent.value }}
    {{ String(myMarkdownContent) }}
    {{ myMarkdownContent.toString() }}
    ```

    E puoi accedere ai metadati del tuo markdown in questo modo:

    ```vue
    <component :is="myMarkdownContent.metadata" />
    <component :is="myMarkdownContent.metadata.title" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte renderizza il Markdown come una stringa HTML per impostazione predefinita. Usa `{@html}` per renderizzarlo.

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

    > Se `MarkdownProvider` non è presente, Intlayer renderizzerà il markdown usando il compilatore predefinito.

    Puoi anche fornire sovrascritture locali per nodi specifici utilizzando il metodo `.use()`:

    ```svelte
    {@html $content.myMarkdownContent.use({ ... })}
    ```

    Puoi recuperare il Markdown come stringa:

    ```svelte
    {$content.myMarkdownContent.value}
    {String($content.myMarkdownContent)}
    {$content.myMarkdownContent.toString()}
    ```

    E puoi accedere ai metadati del tuo markdown in questo modo:

    ```svelte
    {$content.myMarkdownContent.metadata}
    {$content.myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact supporta i nodi Markdown direttamente in JSX.

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

    > Se `MarkdownProvider` non è presente, Intlayer eseguirà il rendering del markdown usando il parser da Markdown a JSX predefinito.

    Puoi anche fornire sovrascritture locali per nodi specifici utilizzando il metodo `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Puoi recuperare il Markdown come stringa:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    E puoi accedere ai metadati del tuo markdown in questo modo:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid supporta i nodi Markdown direttamente in JSX.

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

    > Se `MarkdownProvider` non è presente, Intlayer eseguirà il rendering del markdown usando il parser da Markdown a JSX predefinito.

    Puoi anche fornire sovrascritture locali per nodi specifici utilizzando il metodo `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
    })}
    ```

    Puoi recuperare il Markdown come stringa:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    E puoi accedere ai metadati del tuo markdown in questo modo:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular utilizza la direttiva `[innerHTML]` per eseguire il rendering del contenuto Markdown.

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

    > Se il provider IntlayerMarkdown non è configurato, Intlayer eseguirà il rendering utilizzando il compilatore predefinito.

    Puoi anche fornire sovrascritture locali per nodi specifici utilizzando il metodo `.use()`:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

    Puoi recuperare il Markdown come stringa:

    ```typescript
    content().myMarkdownContent.value
    String(content().myMarkdownContent)
    content().myMarkdownContent.toString()
    ```

    E puoi accedere ai metadati del tuo markdown in questo modo:

    ```typescript
    content().myMarkdownContent.metadata
    content().myMarkdownContent.metadata.title
    ```

  </Tab>
</Tabs>

### 2. Utility di Supporto (Solo Stringhe Markdown)

Queste utility eseguono il rendering **solo di stringhe Markdown pure** e sono indipendenti da `useIntlayer`. Usale quando hai bisogno di renderizzare Markdown da fonti diverse dai tuoi dizionari.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
  
    #### Componente `<MarkdownRenderer />`

    Esegue il rendering di una stringa Markdown con opzioni specifiche.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# Il Mio Titolo"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    Ottieni una funzione di rendering preconfigurata.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# Il Mio Titolo");
    ```

    #### Utility `renderMarkdown()`
    Utility indipendente per il rendering al di fuori dei componenti.

    ```tsx
    import { renderMarkdown } from "react-intlayer/markdown";

    const jsx = renderMarkdown("# Il Mio Titolo", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### Componente `<MarkdownRenderer />`

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer/markdown";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# Il Mio Titolo" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    #### Componente `<MarkdownRenderer />`

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer/markdown";
    </script>

    <MarkdownRenderer forceBlock={true} value="# Il Mio Titolo" />
    ```

    #### Hook `useMarkdownRenderer()`

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer/markdown";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# Il Mio Titolo")}
    ```

    #### Utility `renderMarkdown()`

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer/markdown";
    </script>

    {@html renderMarkdown("# Il Mio Titolo")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### Componente `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# Il Mio Titolo"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# Il Mio Titolo")}</div>;
    ```

    #### Utility `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "preact-intlayer/markdown";

    return <div>{renderMarkdown("# Il Mio Titolo")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### Componente `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# Il Mio Titolo"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# Il Mio Titolo")}</div>;
    ```

    #### Utility `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "solid-intlayer/markdown";

    return <div>{renderMarkdown("# Il Mio Titolo")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### Servizio `IntlayerMarkdownService`
    Esegue il rendering di una stringa Markdown utilizzando il servizio.

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

## Configurazione Globale con `MarkdownProvider`

Il `MarkdownProvider` (o il suo equivalente nel framework) configura la pipeline di rendering Markdown per l'intera applicazione. Questo si applica sia al rendering automatico di `useIntlayer` che alle utility di supporto. Le opzioni impostate qui sono quelle predefinite — `.use()` le sovrascrive a livello di nodo.

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

    > MDX è supportato — qualsiasi nome di componente usato all'interno del tuo Markdown (es. `<MyCustomJSXComponent />`) viene risolto tramite la mappa `components`.

    Puoi anche usare il tuo renderer markdown:

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

    > Importare dinamicamente il tuo renderer Markdown è un buon modo per ridurre le dimensioni del bundle della tua applicazione.

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

    Puoi anche usare il tuo renderer markdown:

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

    > Importare dinamicamente il tuo renderer Markdown è un buon modo per ridurre le dimensioni del bundle della tua applicazione.

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

    Puoi anche usare il tuo renderer markdown:

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

    > Importare dinamicamente il tuo renderer Markdown è un buon modo per ridurre le dimensioni del bundle della tua applicazione.

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

    Puoi anche usare il tuo renderer markdown:

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

    > Importare dinamicamente il tuo renderer Markdown è un buon modo per ridurre le dimensioni del bundle della tua applicazione.

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

    Puoi anche usare il tuo renderer markdown:

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

    > Importare dinamicamente il tuo renderer Markdown è un buon modo per ridurre le dimensioni del bundle della tua applicazione.

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

    > Importare dinamicamente il tuo renderer Markdown è un buon modo per ridurre le dimensioni del bundle della tua applicazione.

  </Tab>
</Tabs>

## Suspense

Il renderer Markdown di Intlayer è caricato dinamicamente. Sebbene ottimizzato, il chunk del parser sottostante è di circa 55 kb. Il caricamento sincrono ritarda il rendering iniziale della pagina e riduce il First Contentful Paint (FCP).

Per evitare di bloccare l'interfaccia utente, Intlayer si integra con l'API Suspense di React. Recupera il parser in background e lancia una Promise durante il download.

Avvolgi qualsiasi componente che renderizza Intlayer Markdown in un limite `<Suspense>`. Questo visualizza uno stato di fallback localizzato durante il download del chunk, consentendo al resto del DOM di essere renderizzato immediatamente.

Avviso: Se non si fornisce un limite `<Suspense>`, React sospenderà a livello di root o bloccherà il rendering dell'intero albero dei componenti fino al completo caricamento del chunk di 55 kb.

<Tabs>
  <Tab label="Next.js" value="nextjs">

In Next.js App Router, puoi utilizzare React `Suspense` per i componenti client o un file `loading.tsx` per i componenti server.

**Componente Client:**

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

**Componente Server con `loading.tsx`:**

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

Vue ha un componente `<Suspense>` integrato. Avvolgi il componente che renderizza il contenuto Markdown in un limite `<Suspense>`.

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

Svelte non ha un equivalente dell'API Suspense. Usa un blocco `{#await}` per gestire il rendering asincrono del contenuto Markdown.

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

Preact supporta l'API Suspense di React tramite `preact/compat`.

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

Solid ha il suo componente `<Suspense>` da `solid-js`.

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

Angular non ha un'API Suspense. Usa le viste differite (`@defer`) per gestire i contenuti Markdown caricati in modo lazy (richiede Angular 17+).

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

---

## Riferimento opzioni

Queste opzioni possono essere passate a `MarkdownProvider`, `MarkdownRenderer`, `useMarkdownRenderer` e `renderMarkdown`.

| Option                | Type        | Default | Descrizione                                                                                                |
| :-------------------- | :---------- | :------ | :--------------------------------------------------------------------------------------------------------- |
| `forceBlock`          | `boolean`   | `false` | Forza l'output a essere avvolto in un elemento a livello di blocco (es. `<div>`).                          |
| `forceInline`         | `boolean`   | `false` | Forza l'output a essere avvolto in un elemento in linea (es. `<span>`).                                    |
| `tagfilter`           | `boolean`   | `true`  | Abilita il GitHub Tag Filter per una maggiore sicurezza rimuovendo i tag HTML pericolosi.                  |
| `preserveFrontmatter` | `boolean`   | `false` | Se `true`, il frontmatter all'inizio della stringa Markdown non verrà rimosso.                             |
| `components`          | `Overrides` | `{}`    | Una mappa di tag HTML per componenti personalizzati (es. `{ h1: MyHeading }`).                             |
| `wrapper`             | `Component` | `null`  | Un componente personalizzato per avvolgere il Markdown renderizzato.                                       |
| `renderMarkdown`      | `Function`  | `null`  | Una funzione di rendering personalizzata per sostituire completamente il compilatore Markdown predefinito. |

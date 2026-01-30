---
createdAt: 2026-01-20
updatedAt: 2026-01-22
title: Contenuto HTML
description: Scopri come dichiarare e usare contenuti HTML con componenti personalizzati in Intlayer. Segui questa documentazione per incorporare contenuti ricchi in stile HTML con sostituzione dinamica dei componenti nel tuo progetto internazionalizzato.
keywords:
  - HTML
  - Componenti personalizzati
  - Contenuto ricco
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Vue
  - Svelte
  - Solid
  - Angular
slugs:
  - doc
  - concept
  - content
  - html
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Aggiunta dell'utility HTMLRenderer / useHTMLRenderer / renderHTML
  - version: 8.0.0
    date: 2026-01-20
    changes: Aggiunto il supporto per il parsing HTML
---

# Contenuto HTML / HTML in Intlayer

Intlayer supporta contenuti HTML, permettendoti di incorporare contenuti ricchi e strutturati all'interno dei tuoi dizionari. Questi contenuti possono essere renderizzati con tag HTML standard o sostituiti con componenti personalizzati a runtime.

## Dichiarare contenuti HTML

Puoi dichiarare contenuti HTML usando la funzione `html` o semplicemente come stringa.

<Tabs>
  <Tab label="Avvolgimento manuale" value="manual-wrapping">
    Usa la funzione `html` per dichiarare esplicitamente contenuti HTML. Questo garantisce che i tag standard siano mappati correttamente anche se il rilevamento automatico è disabilitato.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, type Dictionary } from "intlayer";

    const htmlDictionary = {
      key: "app",
      contentAutoTransformation: true, // può essere impostato nel file di configurazione
      content: {
        myHtmlContent:  html("<p>Ciao <strong>Mondo</strong></p>"),
      },
    } satisfies Dictionary;

    export default htmlDictionary;
    ```

  </Tab>
  <Tab label="Rilevamento automatico" value="automatic-detection">
    Se la stringa contiene tag HTML comuni (ad esempio, `<p>`, `<div>`, `<strong>`, ecc.), Intlayer la trasformerà automaticamente.

    ```typescript fileName="htmlDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // può essere impostato nel file di configurazione
      content: {
        myHtmlContent:  "<p>Ciao <strong>Mondo</strong></p>",
      },
    };
    ```

  </Tab>
  <Tab label="File esterni" value="external-files">
    Importa contenuti HTML da file. Nota che attualmente la funzione `file()` restituisce una stringa, che verrà rilevata automaticamente come HTML se contiene tag.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: html(file("./content.en.html")),
          fr: html(file("./content.fr.html")),
          it: html(file("./content.it.html")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

### Il nodo `html()`

La funzione `html()` è una nuova funzionalità di Intlayer v8 che consente di definire esplicitamente il contenuto HTML nei dizionari. Sebbene Intlayer sia spesso in grado di rilevare automaticamente il contenuto HTML, l'uso della funzione `html()` offre diversi vantaggi:

- **Sicurezza dei tipi**: La funzione `html()` consente di definire le prop attese per i componenti personalizzati, offrendo un migliore completamento automatico e controllo dei tipi nel proprio editor.
- **Dichiarazione esplicita**: Garantisce che una stringa venga sempre trattata come HTML, anche se non contiene tag HTML standard che attiverebbero il rilevamento automatico.
- **Definizione di componenti personalizzati**: È possibile passare un secondo argomento a `html()` per definire i componenti personalizzati e i tipi di prop attesi.

```typescript
import { html } from "intlayer";

const myContent = html(
  "<MyCustomComponent title='Ciao'>Mondo</MyCustomComponent>",
  {
    MyCustomComponent: {
      title: "string",
      children: "node",
    },
  }
);
```

Quando si utilizza il metodo `.use()` su un nodo HTML, i componenti forniti verranno controllati rispetto alla definizione fornita nella funzione `html()` (se disponibile).

---

## Rendering dell'HTML

Il rendering può essere gestito automaticamente dal sistema di contenuti di Intlayer o manualmente utilizzando strumenti specializzati.

### Rendering automatico (usando `useIntlayer`)

Quando accedi al contenuto tramite `useIntlayer`, i nodi HTML sono già pronti per il rendering.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    I nodi HTML possono essere renderizzati direttamente come JSX. I tag standard funzionano automaticamente.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

    Usa il metodo `.use()` per fornire componenti personalizzati o sovrascrivere i tag:

    ```tsx
    {myHtmlContent.use({
      p: (props) => <p className="prose" {...props} />,
      CustomLink: ({ children }) => <a href="/details">{children}</a>,
    })}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    In Vue, i contenuti HTML possono essere renderizzati usando il built-in `component`.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myHtmlContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myHtmlContent" />
    </template>
    ```

    Usa `.use()` per le sovrascritture:
    ```vue
    <component :is="myHtmlContent.use({ h1: 'h2' })" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte rende i nodi HTML come stringhe. Usa `{@html}` per renderizzarli.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact supporta i nodi HTML direttamente nel JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid supporta i nodi HTML direttamente nel JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular utilizza la direttiva `[innerHTML]` per renderizzare contenuti HTML.

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

    Usa il metodo `.use()` per fornire componenti personalizzati o sovrascrivere i tag:

    ```typescript
    content().myHtmlContent.use({
      p: { class: "prose" },
      CustomLink: { href: "/details" },
    })
    ```

  </Tab>
</Tabs>

## Configurazione globale con `HTMLProvider`

Puoi configurare il rendering HTML a livello globale per l'intera applicazione. Questo è ideale per definire componenti personalizzati che dovrebbero essere disponibili in tutti i contenuti HTML.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
  
    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "react-intlayer";

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

  </Tab>
  <Tab label="Vue" value="vue">
  
    ```typescript fileName="main.ts"
    import { createApp, h } from "vue";
    import { installIntlayer, installIntlayerHTML } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(installIntlayer);
    app.use(installIntlayerHTML, {
      components: {
        p: (props, { slots }) => h("p", { class: "prose", ...props }, slots.default?.()),
        CustomLink: (props, { slots }) => h("a", { href: "/details", ...props }, slots.default?.()),
      },
    });

    app.mount("#app");
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
   
    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { HTMLProvider } from "svelte-intlayer";
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

  </Tab>
  <Tab label="Preact" value="preact">
   
    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "preact-intlayer";

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

  </Tab>
  <Tab label="Solid" value="solid">
   
    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "solid-intlayer";

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

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="app.config.ts"
    import { createIntlayerMarkdownProvider } from "angular-intlayer";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerMarkdownProvider({
          components: {
            p: { class: "prose" },
            CustomLink: { href: "/details" },
          },
        }),
      ],
    };
    ```

  </Tab>
</Tabs>

---

### Rendering manuale e strumenti avanzati

Se hai bisogno di renderizzare stringhe HTML grezze o di avere un controllo maggiore sulla mappatura dei componenti, usa i seguenti strumenti.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    #### Componente `<HTMLRenderer />`
    Esegui il rendering di una stringa HTML con componenti specifici.

    ```tsx
    import { HTMLRenderer } from "react-intlayer";

    <HTMLRenderer components={{ p: MyCustomP }}>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### Hook `useHTMLRenderer()`

    Ottieni una funzione di rendering preconfigurata.

    ```tsx
    import { useHTMLRenderer } from "react-intlayer";

    const renderHTML = useHTMLRenderer({
      components: { strong: (props) => <strong {...props} className="text-red-500" /> }
    });

    return renderHTML("<p>Hello <strong>World</strong></p>");
    ```

    #### Utility `renderHTML()`

    Utility standalone per il rendering al di fuori dei componenti.

    ```tsx
    import { renderHTML } from "react-intlayer";

    const jsx = renderHTML("<p>Hello</p>", { components: { p: 'div' } });
    ```

  </Tab>
  <Tab label="Vue" value="vue">
   
    #### Componente `<HTMLRenderer />`
   
    ```vue
    <script setup>
    import { HTMLRenderer } from "vue-intlayer";
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
    import { HTMLRenderer } from "svelte-intlayer";
    </script>

    <HTMLRenderer value="<p>Hello World</p>" />
    ```

    #### Hook `useHTMLRenderer()`

    ```svelte
    <script lang="ts">
    import { useHTMLRenderer } from "svelte-intlayer";
    const render = useHTMLRenderer();
    </script>

    {@html render("<p>Hello World</p>")}
    ```

    #### Utility `renderHTML()`

    ```svelte
    <script lang="ts">
    import { renderHTML } from "svelte-intlayer";
    </script>

    {@html renderHTML("<p>Hello World</p>")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
   
    #### Componente `<HTMLRenderer />`
   
    ```tsx
    import { HTMLRenderer } from "preact-intlayer";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### Hook `useHTMLRenderer()`

    ```tsx
    import { useHTMLRenderer } from "preact-intlayer";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### Utility `renderHTML()`

    ```tsx
    import { renderHTML } from "preact-intlayer";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
   
    #### Componente `<HTMLRenderer />`
   
    ```tsx
    import { HTMLRenderer } from "solid-intlayer";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### Hook `useHTMLRenderer()`

    ```tsx
    import { useHTMLRenderer } from "solid-intlayer";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### Utility `renderHTML()`

    ```tsx
    import { renderHTML } from "solid-intlayer";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### Servizio `IntlayerMarkdownService`
    Renderizza una stringa HTML utilizzando il servizio.

    ```typescript
    import { IntlayerMarkdownService } from "angular-intlayer";

    export class MyComponent {
      constructor(private markdownService: IntlayerMarkdownService) {}

      renderHTML(html: string) {
        return this.markdownService.renderMarkdown(html);
      }
    }
    ```

  </Tab>
</Tabs>

---

## Riferimento delle opzioni

Queste opzioni possono essere passate a `HTMLProvider`, `HTMLRenderer`, `useHTMLRenderer`, e `renderHTML`.

| Opzione      | Tipo                  | Predefinito | Descrizione                                                                                                                        |
| :----------- | :-------------------- | :---------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `components` | `Record<string, any>` | `{}`        | Una mappa che associa tag HTML o nomi di componenti personalizzati ai componenti.                                                  |
| `renderHTML` | `Function`            | `null`      | Una funzione di rendering personalizzata per sostituire completamente il parser HTML predefinito (solo per i provider Vue/Svelte). |

> Nota: per React e Preact, i tag HTML standard sono forniti automaticamente. È necessario passare la prop `components` solo se si desidera sovrascriverli o aggiungere componenti personalizzati.

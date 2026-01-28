---
createdAt: 2026-01-20
updatedAt: 2026-01-22
title: HTML-Inhalte
description: Erfahren Sie, wie Sie HTML-Inhalte deklarieren und mit benutzerdefinierten Komponenten in Intlayer verwenden. Folgen Sie dieser Dokumentation, um reichhaltige HTML-ähnliche Inhalte mit dynamischem Komponentenersatz in Ihrem internationalisierten Projekt einzubetten.
keywords:
  - HTML
  - Benutzerdefinierte Komponenten
  - Reicher Inhalt
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - concept
  - content
  - html
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Hinzufügen von HTMLRenderer / useHTMLRenderer / renderHTML Utility
  - version: 8.0.0
    date: 2026-01-20
    changes: Hinzufügen von HTML-Parsing-Unterstützung
---

# HTML-Inhalte / HTML in Intlayer

Intlayer unterstützt HTML-Inhalte, sodass Sie reichhaltige, strukturierte Inhalte in Ihre Dictionaries einbetten können. Diese Inhalte können mit Standard-HTML-Tags gerendert oder zur Laufzeit durch benutzerdefinierte Komponenten ersetzt werden.

## HTML-Inhalte deklarieren

Sie können HTML-Inhalte mit der `html`-Funktion oder einfach als String deklarieren.

<Tabs>
  <Tab label="Manuelles Wrapping" value="manual-wrapping">
    Verwenden Sie die `html`-Funktion, um HTML-Inhalte explizit zu deklarieren. Dies stellt sicher, dass Standard-Tags korrekt zugeordnet werden, selbst wenn die automatische Erkennung deaktiviert ist.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, type Dictionary } from "intlayer";

    const htmlDictionary = {
      key: "app",
      content: {
        myHtmlContent: html("<p>Hello <strong>World</strong></p>"),
      },
    } satisfies Dictionary;

    export default htmlDictionary;
    ```

  </Tab>
  <Tab label="Automatische Erkennung" value="automatic-detection">
    Wenn der String gängige HTML-Tags enthält (z. B. `<p>`, `<div>`, `<strong>` usw.), wird Intlayer ihn automatisch umwandeln.

    ```typescript fileName="htmlDictionary.content.ts"
    export default {
      key: "app",
      content: {
        myHtmlContent: "<p>Hello <strong>World</strong></p>",
      },
    };
    ```

  </Tab>
  <Tab label="Externe Dateien" value="external-files">
    Importieren Sie HTML-Inhalte aus Dateien. Beachten Sie, dass die Funktion `file()` derzeit einen String zurückgibt, der automatisch als HTML erkannt wird, wenn er Tags enthält.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: html(file("./content.en.html")),
          fr: html(file("./content.fr.html")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

---

## HTML rendern

Das Rendern kann automatisch durch das Inhaltssystem von Intlayer oder manuell mit spezialisierten Tools erfolgen.

### Automatisches Rendern (mit `useIntlayer`)

Wenn Sie auf Inhalte über `useIntlayer` zugreifen, sind HTML-Knoten bereits für das Rendering vorbereitet.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    HTML-Knoten können direkt als JSX gerendert werden. Standard-Tags funktionieren automatisch.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

    Verwenden Sie die `.use()`-Methode, um benutzerdefinierte Komponenten bereitzustellen oder Tags zu überschreiben:

    ```tsx
    {myHtmlContent.use({
      p: (props) => <p className="prose" {...props} />,
      CustomLink: ({ children }) => <a href="/details">{children}</a>,
    })}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    In Vue können HTML-Inhalte mit der integrierten `component`-Komponente gerendert werden.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myHtmlContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myHtmlContent" />
    </template>
    ```

    Verwenden Sie `.use()` für Overrides:
    ```vue
    <component :is="myHtmlContent.use({ h1: 'h2' })" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte rendert HTML-Knoten als Strings. Verwenden Sie `{@html}`, um sie zu rendern.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact unterstützt HTML-Knoten direkt im JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid unterstützt HTML-Knoten direkt im JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular verwendet die `[innerHTML]`-Direktive, um HTML-Inhalte zu rendern.

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

    Verwenden Sie die `.use()`-Methode, um benutzerdefinierte Komponenten bereitzustellen oder Tags zu überschreiben:

    ```typescript
    content().myHtmlContent.use({
      p: { class: "prose" },
      CustomLink: { href: "/details" },
    })
    ```

  </Tab>
</Tabs>

## Globale Konfiguration mit `HTMLProvider`

Sie können das HTML-Rendering global für Ihre gesamte Anwendung konfigurieren. Dies ist ideal, um benutzerdefinierte Komponenten zu definieren, die in allen HTML-Inhalten verfügbar sein sollen.

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

### Manuelles Rendering & Erweiterte Tools

Wenn Sie rohe HTML-Strings rendern müssen oder mehr Kontrolle über die Komponentenzuordnung benötigen, verwenden Sie die folgenden Tools.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    #### `<HTMLRenderer />` Komponente
    Rendern Sie einen HTML-String mit spezifischen Komponenten.

    ```tsx
    import { HTMLRenderer } from "react-intlayer";

    <HTMLRenderer components={{ p: MyCustomP }}>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` Hook

    Holen Sie sich eine vorkonfigurierte Renderer-Funktion.

    ```tsx
    import { useHTMLRenderer } from "react-intlayer";

    const renderHTML = useHTMLRenderer({
      components: { strong: (props) => <strong {...props} className="text-red-500" /> }
    });

    return renderHTML("<p>Hello <strong>World</strong></p>");
    ```

    #### `renderHTML()` Utility

    Eigenständiges Utility zum Rendern außerhalb von Komponenten.

    ```tsx
    import { renderHTML } from "react-intlayer";

    const jsx = renderHTML("<p>Hello</p>", { components: { p: 'div' } });
    ```

  </Tab>
  <Tab label="Vue" value="vue">
   
    #### `<HTMLRenderer />` Komponente
   
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
  
    #### `<HTMLRenderer />` Komponente
   
    ```svelte
    <script lang="ts">
    import { HTMLRenderer } from "svelte-intlayer";
    </script>

    <HTMLRenderer value="<p>Hello World</p>" />
    ```

    #### `useHTMLRenderer()` Hook

    ```svelte
    <script lang="ts">
    import { useHTMLRenderer } from "svelte-intlayer";
    const render = useHTMLRenderer();
    </script>

    {@html render("<p>Hello World</p>")}
    ```

    #### `renderHTML()` Utility

    ```svelte
    <script lang="ts">
    import { renderHTML } from "svelte-intlayer";
    </script>

    {@html renderHTML("<p>Hello World</p>")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
   
    #### `<HTMLRenderer />` Komponente
   
    ```tsx
    import { HTMLRenderer } from "preact-intlayer";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` Hook

    ```tsx
    import { useHTMLRenderer } from "preact-intlayer";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### `renderHTML()` Utility

    ```tsx
    import { renderHTML } from "preact-intlayer";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
   
    #### `<HTMLRenderer />` Komponente
   
    ```tsx
    import { HTMLRenderer } from "solid-intlayer";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` Hook

    ```tsx
    import { useHTMLRenderer } from "solid-intlayer";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### `renderHTML()` Utility

    ```tsx
    import { renderHTML } from "solid-intlayer";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### `IntlayerMarkdownService` Service
    Rendern Sie einen HTML-String mit dem Service.

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

## Optionen-Referenz

Diese Optionen können an `HTMLProvider`, `HTMLRenderer`, `useHTMLRenderer` und `renderHTML` übergeben werden.

| Option       | Typ                   | Standard | Beschreibung                                                                                                                   |
| :----------- | :-------------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `components` | `Record<string, any>` | `{}`     | Eine Map von HTML-Tags oder benutzerdefinierten Komponentennamen zu Komponenten.                                               |
| `renderHTML` | `Function`            | `null`   | Eine benutzerdefinierte Rendering-Funktion, um den Standard-HTML-Parser vollständig zu ersetzen (Nur für Vue/Svelte Provider). |

> Hinweis: Für React und Preact werden Standard-HTML-Tags automatisch bereitgestellt. Sie müssen das `components`-Prop nur übergeben, wenn Sie sie überschreiben oder benutzerdefinierte Komponenten hinzufügen möchten.

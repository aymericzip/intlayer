---
createdAt: 2026-01-20
updatedAt: 2026-09-21
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
  - Remix
  - Astro
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
    changes: "Import von {{framework}}-intlayer nach {{framework}}-intlayer/html verschieben"
  - version: 8.0.0
    date: 2026-01-22
    changes: "Hinzufügen von HTMLRenderer / useHTMLRenderer / renderHTML Utility"
  - version: 8.0.0
    date: 2026-01-20
    changes: "Hinzufügen von HTML-Parsing-Unterstützung"
author: aymericzip
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
      contentAutoTransformation: true, // kann in der Konfigurationsdatei festgelegt werden
      content: {
        myHtmlContent:  html("<p>Hello <strong>World</strong></p>"),
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
      contentAutoTransformation: true, // kann in der Konfigurationsdatei festgelegt werden
      content: {
        myHtmlContent:  "<p>Hello <strong>World</strong></p>",
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

### Der `html()`-Knoten

Die `html()`-Funktion ist ein neues Feature in Intlayer v8, mit dem Sie HTML-Inhalte in Ihren Wörterbüchern explizit definieren können. Während Intlayer HTML-Inhalte oft automatisch erkennt, bietet die Verwendung der `html()`-Funktion mehrere Vorteile:

- **Typsicherheit**: Mit der `html()`-Funktion können Sie die erwarteten Props für benutzerdefinierte Komponenten definieren, was eine bessere Autovervollständigung und Typprüfung in Ihrem Editor ermöglicht.
- **Explizite Deklaration**: Sie stellt sicher, dass eine Zeichenfolge immer als HTML behandelt wird, auch wenn sie keine Standard-HTML-Tags enthält, die die automatische Erkennung auslösen würden.
- **Definition benutzerdefinierter Komponenten**: Sie können ein zweites Argument an `html()` übergeben, um die benutzerdefinierten Komponenten und deren erwartete Prop-Typen zu definieren.

```typescript
import { html } from "intlayer";

const myContent = html(
  "<MyCustomComponent title='Hallo'>Welt</MyCustomComponent>",
  {
    MyCustomComponent: {
      title: "string",
      children: "node",
    },
  }
);
```

Wenn Sie die Methode `.use()` auf einem HTML-Knoten verwenden, werden die von Ihnen bereitgestellten Komponenten gegen die in der `html()`-Funktion bereitgestellte Definition (falls verfügbar) geprüft.

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
  <Tab label="Remix" value="remix">
    In Remix 3 werden HTML-Knoten zu einem HTML-String aufgelöst. Fügen Sie ihn mit der `innerHTML`-Prop von Remix JSX oder mit `html.raw` in einer `html-template`-Ansicht ein.

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

    > Remix maskiert interpolierte Werte standardmäßig. `innerHTML` und `html.raw` sind die beiden Ausnahmen, die ein HTML-String benötigt.

    Verwenden Sie die Methode `.use()`, um Tags zu überschreiben oder benutzerdefinierte Komponenten zuzuordnen. Überschreibungen sind Funktionen, die einen HTML-String zurückgeben:

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
    In Astro werden HTML-Knoten zu einem HTML-String aufgelöst. Fügen Sie ihn mit der `set:html`-Direktive im Template oder mit `innerHTML` in einem clientseitigen `<script>` ein.

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

    > Astro maskiert `{Ausdrücke}` standardmäßig. `set:html` ist die Ausnahme, die ein HTML-String benötigt.

    Verwenden Sie die Methode `.use()`, um Tags zu überschreiben oder benutzerdefinierte Komponenten zuzuordnen. Überschreibungen sind Funktionen, die einen HTML-String zurückgeben:

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

## Globale Konfiguration mit `HTMLProvider`

Sie können das HTML-Rendering global für Ihre gesamte Anwendung konfigurieren. Dies ist ideal, um benutzerdefinierte Komponenten zu definieren, die in allen HTML-Inhalten verfügbar sein sollen.

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

    Sie können auch Ihren eigenen HTML-Renderer verwenden:

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

    > Das dynamische Importieren Ihres HTML-Renderers ist eine gute Möglichkeit, die Bundle-Größe Ihrer Anwendung zu reduzieren.

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

    Sie können auch Ihren eigenen HTML-Renderer verwenden:

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

    > Das dynamische Importieren Ihres HTML-Renderers ist eine gute Möglichkeit, die Bundle-Größe Ihrer Anwendung zu reduzieren.

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

    Sie können auch Ihren eigenen HTML-Renderer verwenden:

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

    > Das dynamische Importieren Ihres HTML-Renderers ist eine gute Möglichkeit, die Bundle-Größe Ihrer Anwendung zu reduzieren.

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

    Sie können auch Ihren eigenen HTML-Renderer verwenden:

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

    > Das dynamische Importieren Ihres HTML-Renderers ist eine gute Möglichkeit, die Bundle-Größe Ihrer Anwendung zu reduzieren.

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

    Sie können auch Ihren eigenen HTML-Renderer verwenden:

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

    > Das dynamische Importieren Ihres HTML-Renderers ist eine gute Möglichkeit, die Bundle-Größe Ihrer Anwendung zu reduzieren.

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

    Sie können auch Ihren eigenen HTML-Renderer verwenden:

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

    > Das dynamische Importieren Ihres HTML-Renderers ist eine gute Möglichkeit, die Bundle-Größe Ihrer Anwendung zu reduzieren.

  </Tab>
  <Tab label="Remix" value="remix">

    Remix verfügt über keinen Komponentenbaum, der einen Provider aufnehmen könnte, daher wird die Konfiguration einmalig als Singleton beim Serverstart installiert. Sie konfiguriert den von `useHTMLRenderer()` zurückgegebenen Renderer. Die von `useIntlayer` zurückgegebenen `html`-Knoten werden unverändert gerendert; überschreiben Sie deren Tags pro Knoten mit `.use()`.

    ```typescript fileName="src/router.ts"
    import { installIntlayerHTML } from "remix-intlayer/html";

    installIntlayerHTML({
      renderHTML: (html) => html.replaceAll("<p>", '<p class="prose">'),
    });
    ```

    > Verwenden Sie `installIntlayerHTMLDynamic(async () => …)`, um den Renderer selbst träge zu laden; der Loader wird nur beim ersten Aufruf ausgeführt.

  </Tab>
  <Tab label="Astro" value="astro">

    Astro verfügt über keinen Komponentenbaum, der einen Provider aufnehmen könnte, daher wird die Konfiguration einmalig als Singleton in der Middleware (Server) und in einem clientseitigen `<script>` (Browser) installiert. Sie konfiguriert den von `useHTMLRenderer()` zurückgegebenen Renderer. Die von `useIntlayer` zurückgegebenen `html`-Knoten werden unverändert gerendert; überschreiben Sie deren Tags pro Knoten mit `.use()`.

    ```typescript fileName="src/middleware.ts"
    import { installIntlayerHTML } from "astro-intlayer/html";
    import { defineMiddleware } from "astro:middleware";

    // Wird einmal beim Serverstart ausgeführt; die Intlayer-Middleware selbst wird
    // vor dieser Datei durch die Integration registriert.
    installIntlayerHTML({
      renderHTML: (html) => html.replaceAll("<p>", '<p class="prose">'),
    });

    export const onRequest = defineMiddleware((_context, next) => next());
    ```

    > Verwenden Sie `installIntlayerHTMLDynamic(async () => …)`, um den Renderer selbst träge zu laden; der Loader wird nur beim ersten Aufruf ausgeführt.

  </Tab>
</Tabs>

### Manuelles Rendering & Erweiterte Tools

Wenn Sie rohe HTML-Strings rendern müssen oder mehr Kontrolle über die Komponentenzuordnung benötigen, verwenden Sie die folgenden Tools.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    #### `<HTMLRenderer />` Komponente
    Rendern Sie einen HTML-String mit spezifischen Komponenten.

    ```tsx
    import { HTMLRenderer } from "react-intlayer/html";

    <HTMLRenderer components={{ p: MyCustomP }}>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` Hook

    Holen Sie sich eine vorkonfigurierte Renderer-Funktion.

    ```tsx
    import { useHTMLRenderer } from "react-intlayer/html";

    const renderHTML = useHTMLRenderer({
      components: { strong: (props) => <strong {...props} className="text-red-500" /> }
    });

    return renderHTML("<p>Hello <strong>World</strong></p>");
    ```

    #### `renderHTML()` Utility

    Eigenständiges Utility zum Rendern außerhalb von Komponenten.

    ```tsx
    import { renderHTML } from "react-intlayer/html";

    const jsx = renderHTML("<p>Hello</p>", { components: { p: 'div' } });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### `<HTMLRenderer />` Komponente

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

    #### `<HTMLRenderer />` Komponente

    ```svelte
    <script lang="ts">
    import { HTMLRenderer } from "svelte-intlayer/html";
    </script>

    <HTMLRenderer value="<p>Hello World</p>" />
    ```

    #### `useHTMLRenderer()` Hook

    ```svelte
    <script lang="ts">
    import { useHTMLRenderer } from "svelte-intlayer/html";
    const render = useHTMLRenderer();
    </script>

    {@html render("<p>Hello World</p>")}
    ```

    #### `renderHTML()` Utility

    ```svelte
    <script lang="ts">
    import { renderHTML } from "svelte-intlayer/html";
    </script>

    {@html renderHTML("<p>Hello World</p>")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    #### `<HTMLRenderer />` Komponente

    ```tsx
    import { HTMLRenderer } from "preact-intlayer/html";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` Hook

    ```tsx
    import { useHTMLRenderer } from "preact-intlayer/html";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### `renderHTML()` Utility

    ```tsx
    import { renderHTML } from "preact-intlayer/html";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    #### `<HTMLRenderer />` Komponente

    ```tsx
    import { HTMLRenderer } from "solid-intlayer/html";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` Hook

    ```tsx
    import { useHTMLRenderer } from "solid-intlayer/html";

    const render = useHTMLRenderer();

    return <div>{render("<p>Hello World</p>")}</div>;
    ```

    #### `renderHTML()` Utility

    ```tsx
    import { renderHTML } from "solid-intlayer/html";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### `IntlayerHTMLService` Service
    Rendern Sie einen HTML-String mit dem Service.

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
    #### `useHTMLRenderer()` Hook

    Holen Sie sich eine von `installIntlayerHTML()` vorkonfigurierte Renderer-Funktion. Sie gibt einen HTML-String zurück.

    ```tsx
    import { useHTMLRenderer } from "remix-intlayer/html";

    const renderHTML = useHTMLRenderer();

    return <div innerHTML={renderHTML("<p>Hello <strong>World</strong></p>")} />;
    ```

    #### `renderHTML()` Utility

    Eigenständiges Dienstprogramm, das die globale Konfiguration ignoriert.

    ```tsx
    import { renderHTML } from "remix-intlayer/html";

    const html = renderHTML("<p>Hello</p>");
    ```

  </Tab>
  <Tab label="Astro" value="astro">
    #### `useHTMLRenderer()` Hook

    Holen Sie sich eine von `installIntlayerHTML()` vorkonfigurierte Renderer-Funktion. Sie gibt einen HTML-String zurück.

    ```astro
    ---
    import { useHTMLRenderer } from "astro-intlayer/html";

    const renderHTML = useHTMLRenderer();
    ---

    <div set:html={renderHTML("<p>Hello <strong>World</strong></p>")} />
    ```

    #### `renderHTML()` Utility

    Eigenständiges Dienstprogramm, das die globale Konfiguration ignoriert.

    ```astro
    ---
    import { renderHTML } from "astro-intlayer/html";

    const html = renderHTML("<p>Hello</p>");
    ---

    <div set:html={html} />
    ```

  </Tab>
</Tabs>

## Optionen-Referenz

Diese Optionen können an `HTMLProvider`, `HTMLRenderer`, `useHTMLRenderer` und `renderHTML` übergeben werden.

| Option       | Typ                   | Standard | Beschreibung                                                                                                                             |
| :----------- | :-------------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `components` | `Record<string, any>` | `{}`     | Eine Map von HTML-Tags oder benutzerdefinierten Komponentennamen zu Komponenten.                                                         |
| `renderHTML` | `Function`            | `null`   | Eine benutzerdefinierte Rendering-Funktion, um den Standard-HTML-Parser vollständig zu ersetzen (Vue, Svelte, Remix und Astro Provider). |

> Hinweis: Für React und Preact werden Standard-HTML-Tags automatisch bereitgestellt. Sie müssen das `components`-Prop nur übergeben, wenn Sie sie überschreiben oder benutzerdefinierte Komponenten hinzufügen möchten.

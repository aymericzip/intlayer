---
createdAt: 2026-01-20
updatedAt: 2026-01-22
title: HTML-Inhalte
description: Erfahren Sie, wie Sie HTML-Inhalte deklarieren und mit benutzerdefinierten Komponenten in Intlayer verwenden. Folgen Sie dieser Dokumentation, um reichhaltige, HTML-ähnliche Inhalte mit dynamischem Komponentenersatz in Ihrem internationalisierten Projekt einzubetten.
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
    changes: Hinzufügen der Utilities HTMLRenderer / useHTMLRenderer / renderHTML
  - version: 8.0.0
    date: 2026-01-20
    changes: Hinzufügen von HTML-Parsing-Unterstützung
---

# HTML-Inhalte / HTML in Intlayer

Intlayer unterstützt HTML-Inhalte, mit denen Sie reichhaltige, strukturierte Inhalte in Ihren Dictionaries einbetten können. Diese Inhalte können mit Standard-HTML-Tags gerendert oder zur Laufzeit durch benutzerdefinierte Komponenten ersetzt werden.

## Wie HTML funktioniert

Intlayer v8 erkennt HTML-Tags in Ihren Inhaltsstrings intelligent. Wenn eine Zeichenfolge als HTML identifiziert wird (Tags enthält), wird sie automatisch in einen HTML-Knoten umgewandelt.

<Columns>
<Column title="v7 Verhalten (Manuelles Wrapping)">

```typescript fileName="htmlDictionary.content.ts"
import { html } from "intlayer";

export default {
  key: "app",
  content: {
    text: html("<p>Hello <strong>World</strong></p>"),
  },
};
```

</Column>
<Column title="v8 Verhalten (Automatische Erkennung)">

```typescript fileName="htmlDictionary.content.ts"
export default {
  key: "app",
  content: {
    text: "<p>Hallo <strong>Welt</strong></p>",
  },
};
```

</Column>
</Columns>

---

## HTML-Inhalte deklarieren

Sie können HTML-Inhalte mithilfe der `html`-Funktion deklarieren oder einfach als String.

<Tabs>
  <Tab label="Manuelles Wrapping">
    Verwenden Sie die `html`-Funktion, um HTML-Inhalte explizit zu deklarieren. Dies stellt sicher, dass Standard-Tags korrekt gemappt werden, selbst wenn die automatische Erkennung deaktiviert ist.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, type Dictionary } from "intlayer";

    const htmlDictionary = {
      key: "app",
      content: {
        myHtmlContent: html("<p>Hallo <strong>Welt</strong></p>"),
      },
    } satisfies Dictionary;

    export default htmlDictionary;
    ```

  </Tab>
  <Tab label="Automatische Erkennung">
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
  <Tab label="Externe Dateien">
    Importieren Sie HTML-Inhalte aus Dateien. Beachten Sie, dass die Funktion `file()` derzeit einen String zurückgibt, der automatisch als HTML erkannt wird, wenn er Tags enthält.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          de: html(file("./content.de.html")),
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

Das Rendern kann automatisch vom Intlayer-Content-System übernommen werden oder manuell mit spezialisierten Tools erfolgen.

### Automatisches Rendern (mithilfe von `useIntlayer`)

Wenn Inhalte über `useIntlayer` abgerufen werden, sind die HTML-Knoten bereits für das Rendern vorbereitet.

<Tabs group="framework">
  <Tab label="React / Next.js">
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
  <Tab label="Vue">
    In Vue kann HTML-Inhalt mit der eingebauten `component`-Komponente gerendert werden.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myHtmlContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myHtmlContent" />
    </template>
    ```

    Verwende `.use()` für Überschreibungen:
    ```vue
    <component :is="myHtmlContent.use({ h1: 'h2' })" />
    ```

  </Tab>
  <Tab label="Svelte">
    Svelte rendert HTML-Knoten als Strings. Verwende `{@html}`, um sie darzustellen.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact">
    Preact unterstützt HTML-Knoten direkt im JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
</Tabs>

## Globale Konfiguration mit `HTMLProvider`

Sie können das HTML-Rendering global für Ihre gesamte Anwendung konfigurieren. Dies eignet sich ideal, um benutzerdefinierte Komponenten zu definieren, die in allen HTML-Inhalten verfügbar sein sollen.

<Tabs group="framework">
  <Tab label="React / Next.js">
  
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
  <Tab label="Vue">
  
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
  <Tab label="Svelte">
   
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
  <Tab label="Preact">
   
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
</Tabs>

---

### Manuelles Rendering & Erweiterte Werkzeuge

Wenn Sie rohe HTML-Strings rendern müssen oder mehr Kontrolle über die Komponentenabbildung benötigen, verwenden Sie die folgenden Werkzeuge.

<Tabs group="framework">
  <Tab label="React / Next.js">
    #### `<HTMLRenderer />` Komponente
    Rendern einer HTML-Zeichenkette mit bestimmten Komponenten.

    ```tsx
    import { HTMLRenderer } from "react-intlayer";

    <HTMLRenderer components={{ p: MyCustomP }}>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` Hook

    Erhalten Sie eine vorkonfigurierte Renderer-Funktion.

    ```tsx
    import { useHTMLRenderer } from "react-intlayer";

    const renderHTML = useHTMLRenderer({
      components: { strong: (props) => <strong {...props} className="text-red-500" /> }
    });

    return renderHTML("<p>Hallo <strong>Welt</strong></p>");
    ```

    #### `renderHTML()` Hilfsfunktion

    Unabhängige Hilfsfunktion zum Rendern außerhalb von Komponenten.

    ```tsx
    import { renderHTML } from "react-intlayer";

    const jsx = renderHTML("<p>Hallo</p>", { components: { p: 'div' } });
    ```

  </Tab>
  <Tab label="Vue">
   
    #### `<HTMLRenderer />` Komponente
   
    ```vue
    <script setup>
    import { HTMLRenderer } from "vue-intlayer";
    </script>

    <template>
      <HTMLRenderer content="<p>Hallo Welt</p>" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte">
  
    #### `<HTMLRenderer />` Komponente
   
    ```svelte
    <script lang="ts">
    import { HTMLRenderer } from "svelte-intlayer";
    </script>

    <HTMLRenderer value="<p>Hello World</p>" />
    ```

  </Tab>
  <Tab label="Preact">
   
    #### `<HTMLRenderer />` Komponente
   
    ```tsx
    import { HTMLRenderer } from "preact-intlayer";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

  </Tab>
</Tabs>

---

## Optionen-Referenz

Diese Optionen können an `HTMLProvider`, `HTMLRenderer`, `useHTMLRenderer` und `renderHTML` übergeben werden.

| Option       | Typ                   | Standardwert | Beschreibung                                                                                                                 |
| :----------- | :-------------------- | :----------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `components` | `Record<string, any>` | `{}`         | Eine Zuordnung von HTML-Tags oder benutzerdefinierten Komponenten-Namen zu Komponenten.                                      |
| `renderHTML` | `Function`            | `null`       | Eine benutzerdefinierte Render-Funktion, um den Standard-HTML-Parser vollständig zu ersetzen (nur für Vue-/Svelte-Provider). |

> Hinweis: Für React und Preact werden Standard-HTML-Tags automatisch bereitgestellt. Sie müssen das `components`-Prop nur übergeben, wenn Sie diese überschreiben oder benutzerdefinierte Komponenten hinzufügen möchten.

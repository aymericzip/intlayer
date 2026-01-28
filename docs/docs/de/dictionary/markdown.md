---
createdAt: 2025-02-07
updatedAt: 2026-01-22
title: Markdown
description: Erfahren Sie, wie Sie Markdown-Inhalte in Ihrer mehrsprachigen Website mit Intlayer deklarieren und verwenden. Folgen Sie den Schritten in dieser Online-Dokumentation, um Markdown nahtlos in Ihr Projekt zu integrieren.
keywords:
  - Markdown
  - Internationalisierung
  - Dokumentation
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
    changes: Hinzufügen von MarkdownRenderer / useMarkdownRenderer / renderMarkdown Utility und forceInline Option
  - version: 8.0.0
    date: 2026-01-18
    changes: Automatische Dekoration von Markdown-Inhalten, MDX- und SSR-Unterstützung
  - version: 5.5.10
    date: 2025-06-29
    changes: Initialisierung des Verlaufs
---

# Markdown / Rich-Text-Inhalte

Intlayer unterstützt Rich-Text-Inhalte, die mittels Markdown-Syntax definiert sind. Dies ermöglicht es Ihnen, Inhalte mit reichhaltiger Formatierung, wie Blogs, Artikel und mehr, einfach zu schreiben und zu pflegen.

## Teil 1: Markdown-Inhalte deklarieren

Sie können Markdown-Inhalte mit der `md`-Funktion oder einfach als String deklarieren (sofern er Markdown-Syntax enthält).

<Tabs>
  <Tab label="Manuelles Wrapping" value="manual-wrapping">
    Verwenden Sie die `md`-Funktion, um Markdown-Inhalte explizit zu deklarieren. Dies ist nützlich, wenn Sie sicherstellen möchten, dass ein String als Markdown behandelt wird, auch wenn er keine offensichtliche Syntax enthält.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, type Dictionary } from "intlayer";

    const markdownDictionary = {
      key: "app",
      content: {
        myMarkdownContent: md("## Mein Titel \n\nLorem Ipsum"),
      },
    } satisfies Dictionary;

    export default markdownDictionary;
    ```

  </Tab>
  <Tab label="Automatische Erkennung" value="automatic-detection">
    Wenn der String gängige Markdown-Indikatoren enthält (wie Überschriften, Listen, Links usw.), wird Intlayer ihn automatisch umwandeln.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Automatische Erkennung von Markdown-Inhalten aktivieren - Kann global in intlayer.config.ts eingestellt werden
      content: {
        myMarkdownContent: "## Mein Titel \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>
  <Tab label="Externe Dateien" value="external-files">
    Importieren Sie `.md`-Dateien direkt mit der `file`-Funktion.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: md(file("./myMarkdown.en.md")),
          fr: md(file("./myMarkdown.fr.md")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

---

## Teil 2: Markdown rendern

Das Rendering kann automatisch durch das Inhaltssystem von Intlayer oder manuell mit spezialisierten Tools erfolgen.

### 1. Automatisches Rendering (mit `useIntlayer`)

Wenn Sie auf Inhalte über `useIntlayer` zugreifen, sind Markdown-Knoten bereits für das Rendering vorbereitet.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    Markdown-Knoten können direkt als JSX gerendert werden.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

    Sie können auch lokale Overrides für bestimmte Knoten mit der `.use()`-Methode bereitstellen:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
    })}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    In Vue können Markdown-Inhalte mit der integrierten `component`-Komponente oder direkt als Knoten gerendert werden.

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
    Svelte rendert Markdown standardmäßig als HTML-String. Verwenden Sie `{@html}`, um es zu rendern.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myMarkdownContent}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact unterstützt Markdown-Knoten direkt im JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid unterstützt Markdown-Knoten direkt im JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular verwendet die `[innerHTML]`-Direktive, um Markdown-Inhalte zu rendern.

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

    Sie können auch lokale Overrides für bestimmte Knoten mit der `.use()`-Methode bereitstellen:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

  </Tab>
</Tabs>

### 2. Manuelles Rendering & Erweiterte Tools

Wenn Sie rohe Markdown-Strings rendern müssen oder mehr Kontrolle über den Rendering-Prozess wünschen, verwenden Sie die folgenden Tools.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
  
    #### `<MarkdownRenderer />` Komponente

    Rendern Sie einen Markdown-String mit spezifischen Optionen.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# Mein Titel"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Hook

    Holen Sie sich eine vorkonfigurierte Renderer-Funktion.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# Mein Titel");
    ```

    #### `renderMarkdown()` Utility
    Eigenständiges Utility zum Rendern außerhalb von Komponenten.

    ```tsx
    import { renderMarkdown } from "react-intlayer";

    const jsx = renderMarkdown("# Mein Titel", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### `<MarkdownRenderer />` Komponente

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# Mein Titel" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    #### `<MarkdownRenderer />` Komponente

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer";
    </script>

    <MarkdownRenderer forceBlock={true} value="# Mein Titel" />
    ```

    #### `useMarkdownRenderer()` Hook

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# Mein Titel")}
    ```

    #### `renderMarkdown()` Utility

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer";
    </script>

    {@html renderMarkdown("# Mein Titel")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### `<MarkdownRenderer />` Komponente

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# Mein Titel"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Hook

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# Mein Titel")}</div>;
    ```

    #### `renderMarkdown()` Utility

    ```tsx
    import { renderMarkdown } from "preact-intlayer";

    return <div>{renderMarkdown("# Mein Titel")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### `<MarkdownRenderer />` Komponente

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# Mein Titel"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Hook

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# Mein Titel")}</div>;
    ```

    #### `renderMarkdown()` Utility

    ```tsx
    import { renderMarkdown } from "solid-intlayer";

    return <div>{renderMarkdown("# Mein Titel")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### `IntlayerMarkdownService` Service
    Rendern Sie einen Markdown-String mit dem Service.

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

## Globale Konfiguration mit `MarkdownProvider`

Sie können das Markdown-Rendering global für Ihre gesamte Anwendung konfigurieren. Dies vermeidet die Übergabe der gleichen Props an jeden Renderer.

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

## Optionen-Referenz

Diese Optionen können an `MarkdownProvider`, `MarkdownRenderer`, `useMarkdownRenderer` und `renderMarkdown` übergeben werden.

| Option                | Typ         | Standard | Beschreibung                                                                                           |
| :-------------------- | :---------- | :------- | :----------------------------------------------------------------------------------------------------- |
| `forceBlock`          | `boolean`   | `false`  | Erzwingt, dass die Ausgabe in ein Block-Level-Element (z. B. `<div>`) eingeschlossen wird.             |
| `forceInline`         | `boolean`   | `false`  | Erzwingt, dass die Ausgabe in ein Inline-Element (z. B. `<span>`) eingeschlossen wird.                 |
| `tagfilter`           | `boolean`   | `true`   | Aktiviert den GitHub-Tag-Filter für verbesserte Sicherheit durch das Entfernen gefährlicher HTML-Tags. |
| `preserveFrontmatter` | `boolean`   | `false`  | Wenn `true`, wird Frontmatter am Anfang des Markdown-Strings nicht entfernt.                           |
| `components`          | `Overrides` | `{}`     | Eine Zuordnung von HTML-Tags zu benutzerdefinierten Komponenten (z. B. `{ h1: MyHeading }`).           |
| `wrapper`             | `Component` | `null`   | Eine benutzerdefinierte Komponente, um das gerenderte Markdown zu umschließen.                         |
| `renderMarkdown`      | `Function`  | `null`   | Eine benutzerdefinierte Render-Funktion, um den Standard-Markdown-Compiler vollständig zu ersetzen.    |

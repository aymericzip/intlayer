---
createdAt: 2025-02-07
updatedAt: 2026-05-19
title: Markdown
description: Erfahren Sie, wie Sie Markdown-Inhalte auf Ihrer mehrsprachigen Website mit Intlayer deklarieren und verwenden. Befolgen Sie die Schritte in dieser Online-Dokumentation, um Markdown nahtlos in Ihr Projekt zu integrieren.
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
  - version: 8.10.0
    date: 2026-05-19
    changes: "Unterstützung für `.content.md`-Dateien hinzugefügt"
  - version: 8.5.0
    date: 2026-03-24
    changes: "`intlayerMarkdown`-Plugin-Objekt hinzugefügt; verwenden Sie `app.use(intlayerMarkdown)` anstelle von `app.use(installIntlayerMarkdown)`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "Import von `{{framework}}-intlayer` nach `{{framework}}-intlayer/markdown` verschoben"
  - version: 8.0.0
    date: 2026-01-22
    changes: "MarkdownRenderer / useMarkdownRenderer / renderMarkdown-Dienstprogramm und forceInline-Option hinzugefügt"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Automatische Dekoration von Markdown-Inhalten, MDX- und SSR-Unterstützung"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historie initialisiert"
---

# Markdown / Rich-Text-Inhalte

Intlayer unterstützt Rich-Text-Inhalte, die mit der Markdown-Syntax definiert werden. Dies ermöglicht es Ihnen, Inhalte mit umfangreicher Formatierung wie Blogs, Artikel und vieles mehr einfach zu erstellen und zu verwalten.

## Markdown-Inhalte deklarieren

Sie können Markdown-Inhalte mithilfe der Funktion `md` oder einfach als Zeichenfolge (sofern sie Markdown-Syntax enthält) deklarieren.

<Tabs>
  <Tab label=".content.md" value=".content.md">
    Ab Version `8.10.0` können Sie Markdown-Inhalte direkt in `.content.md`-Dateien deklarieren. Intlayer erkennt und analysiert den Markdown-Inhalt automatisch.

    ```md fileName="markdown-file.en.content.md"
    ---
    key: my-markdown-content
    description: Mein Inhalt
    locale: en
    ---

    # Mein Inhalt

    Hier ist ein Beispiel für Markdown-Inhalte
    ```

    Das `locale`-Feld im Frontmatter definiert die Sprache des Inhalts. Es ist optional. Wird es nicht angegeben, verwendet Intlayer die Standardsprache, die auch als Fallback-Sprache dient, falls keine Übersetzung für eine spezifische Sprache verfügbar ist.

    Beispiel für die Dateistruktur:

    ```text
    content/
    ├── en/
    │   └── markdown-file.en.content.md
    ├── fr/
    │   └── markdown-file.fr.content.md
    └── es/
        └── markdown-file.es.content.md
    ```

    Sie können im Frontmatter alle Eigenschaften hinzufügen, die in der [Wörterbuch-Definition](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md) definiert sind.

  </Tab>
  <Tab label="Manuelles Einwickeln" value="manual-wrapping">
    Verwenden Sie die Funktion `md`, um Markdown-Inhalte explizit zu deklarieren. Dies ist nützlich, wenn Sie sicherstellen möchten, dass eine Zeichenfolge als Markdown behandelt wird, auch wenn sie keine offensichtliche Syntax aufweist.

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
    Wenn die Zeichenfolge gängige Markdown-Indikatoren (wie Überschriften, Listen, Links usw.) enthält, transformiert Intlayer sie automatisch.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Automatische Erkennung von Markdown-Inhalten aktivieren - Kann global in intlayer.config.ts konfiguriert werden
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
          de: md(file("./myMarkdown.de.md")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

---

## Markdown rendern

Intlayer bietet zwei unabhängige Möglichkeiten zum Rendern von Markdown:

1. **Über `useIntlayer`**
   — Intlayer konvertiert den `md`-Knoten automatisch in die native Ausgabe des Frameworks (JSX, VNode, HTML-String).
   - Das Frontmatter wird analysiert und als `.metadata` bereitgestellt. Sie können das Rendern auf zwei Ebenen überschreiben — global mit dem `MarkdownProvider` (oder dem Framework-Äquivalent) und lokal pro Knoten mit `.use()`. Beide können kombiniert werden; `.use()` hat Vorrang vor dem `MarkdownProvider`, der wiederum Vorrang vor dem Standardverhalten hat.

2. **Hilfsprogramme** — `<MarkdownRenderer />`, `useMarkdownRenderer()` und `renderMarkdown()` sind eigenständige Tools, die **nur reine Markdown-Strings** akzeptieren. Sie sind unabhängig von `useIntlayer` und funktionieren nicht mit den dekorierten Knoten, die es zurückgibt.

Das Markdown-Rendering unterstützt **MDX** — verwenden Sie jede JSX/Framework-Komponente namentlich direkt in Ihrem Markdown.

### 1. Automatisches Rendern (über `useIntlayer`)

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    Markdown-Knoten können direkt als JSX gerendert werden.

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
          MyButton: (props) => <button {...props} />, // MDX-Komponente
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Wenn `MarkdownProvider` nicht vorhanden ist, rendert Intlayer das Markdown mit dem standardmäßigen Markdown-zu-JSX-Parser.

    Sie können auch lokale Überschreibungen für bestimmte Knoten mit der Methode `.use()` bereitstellen:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Sie können das Markdown als Zeichenfolge abrufen:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    Und Sie können folgendermaßen auf Ihre Markdown-Metadaten zugreifen:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    In Vue kann Markdown-Inhalt mithilfe des integrierten Tags `component` oder direkt als Knoten gerendert werden.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myMarkdownContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myMarkdownContent" />
    </template>
    ```

    Global über das `intlayerMarkdown`-Plugin konfigurieren (unterstützt benutzerdefinierte MDX-Komponenten):

    ```ts fileName="main.ts"
    import { intlayerMarkdown } from "vue-intlayer/markdown";

    app.use(intlayerMarkdown, {
      components: {
        h1: (props) => h('h1', { style: { color: 'green' } }, props.children),
        MyButton: (props) => h('button', props), // MDX-Komponente
      },
    });
    ```

    > Wenn das `intlayerMarkdown`-Plugin nicht installiert ist, rendert Intlayer mit dem Standard-Compiler.

    Sie können auch lokale Überschreibungen für bestimmte Knoten mit der Methode `.use()` bereitstellen:

    ```vue
    <component :is="myMarkdownContent.use({
      h1: (props) => h('h1', { style: { color: 'red' } }, props.children),
    })" />
    ```

    Sie können das Markdown als Zeichenfolge abrufen:

    ```vue
    {{ myMarkdownContent.value }}
    {{ String(myMarkdownContent) }}
    {{ myMarkdownContent.toString() }}
    ```

    Und Sie können folgendermaßen auf Ihre Markdown-Metadaten zugreifen:

    ```vue
    <component :is="myMarkdownContent.metadata" />
    <component :is="myMarkdownContent.metadata.title" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte rendert Markdown standardmäßig als HTML-String. Verwenden Sie `{@html}`, um es zu rendern.

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

    > Wenn `MarkdownProvider` nicht vorhanden ist, rendert Intlayer das Markdown mit dem Standard-Compiler.

    Sie können auch lokale Überschreibungen für bestimmte Knoten mit der Methode `.use()` bereitstellen:

    ```svelte
    {@html $content.myMarkdownContent.use({ ... })}
    ```

    Sie können das Markdown als Zeichenfolge abrufen:

    ```svelte
    {$content.myMarkdownContent.value}
    {String($content.myMarkdownContent)}
    {$content.myMarkdownContent.toString()}
    ```

    Und Sie können folgendermaßen auf Ihre Markdown-Metadaten zugreifen:

    ```svelte
    {$content.myMarkdownContent.metadata}
    {$content.myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact unterstützt Markdown-Knoten direkt in JSX.

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
          MyButton: (props) => <button {...props} />, // MDX-Komponente
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Wenn `MarkdownProvider` nicht vorhanden ist, rendert Intlayer das Markdown mit dem standardmäßigen Markdown-zu-JSX-Parser.

    Sie können auch lokale Überschreibungen für bestimmte Knoten mit der Methode `.use()` bereitstellen:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Sie können das Markdown als Zeichenfolge abrufen:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    Und Sie können folgendermaßen auf Ihre Markdown-Metadaten zugreifen:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid unterstützt Markdown-Knoten direkt in JSX.

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
          MyButton: (props) => <button {...props} />, // MDX-Komponente
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Wenn `MarkdownProvider` nicht vorhanden ist, rendert Intlayer das Markdown mit dem standardmäßigen Markdown-zu-JSX-Parser.

    Sie können auch lokale Überschreibungen für bestimmte Knoten mit der Methode `.use()` bereitstellen:

    ```tsx
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
    })}
    ```

    Sie können das Markdown als Zeichenfolge abrufen:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    Und Sie können folgendermaßen auf Ihre Markdown-Metadaten zugreifen:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
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

    > Wenn der IntlayerMarkdown-Provider nicht konfiguriert ist, rendert Intlayer mit dem Standard-Compiler.

    Sie können auch lokale Überschreibungen für bestimmte Knoten mit der Methode `.use()` bereitstellen:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

    Sie können das Markdown als Zeichenfolge abrufen:

    ```typescript
    content().myMarkdownContent.value
    String(content().myMarkdownContent)
    content().myMarkdownContent.toString()
    ```

    Und Sie können folgendermaßen auf Ihre Markdown-Metadaten zugreifen:

    ```typescript
    content().myMarkdownContent.metadata
    content().myMarkdownContent.metadata.title
    ```

  </Tab>
</Tabs>

### 2. Hilfsprogramme (Nur Markdown-Strings)

Diese Dienstprogramme rendern **nur reine Markdown-Strings** und sind unabhängig von `useIntlayer`. Verwenden Sie sie, wenn Sie Markdown aus anderen Quellen als Ihren Wörterbüchern rendern müssen.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
  
    #### `<MarkdownRenderer />` Komponente

    Rendert einen Markdown-String mit bestimmten Optionen.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# Mein Titel"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Hook

    Holt eine vorkonfigurierte Render-Funktion.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# Mein Titel");
    ```

    #### `renderMarkdown()` Dienstprogramm
    Eigenständiges Dienstprogramm zum Rendern außerhalb von Komponenten.

    ```tsx
    import { renderMarkdown } from "react-intlayer/markdown";

    const jsx = renderMarkdown("# Mein Titel", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### `<MarkdownRenderer />` Komponente

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer/markdown";
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
    import { MarkdownRenderer } from "svelte-intlayer/markdown";
    </script>

    <MarkdownRenderer forceBlock={true} value="# Mein Titel" />
    ```

    #### `useMarkdownRenderer()` Hook

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer/markdown";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# Mein Titel")}
    ```

    #### `renderMarkdown()` Dienstprogramm

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer/markdown";
    </script>

    {@html renderMarkdown("# Mein Titel")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### `<MarkdownRenderer />` Komponente

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# Mein Titel"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Hook

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# Mein Titel")}</div>;
    ```

    #### `renderMarkdown()` Dienstprogramm

    ```tsx
    import { renderMarkdown } from "preact-intlayer/markdown";

    return <div>{renderMarkdown("# Mein Titel")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### `<MarkdownRenderer />` Komponente

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# Mein Titel"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Hook

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# Mein Titel")}</div>;
    ```

    #### `renderMarkdown()` Dienstprogramm

    ```tsx
    import { renderMarkdown } from "solid-intlayer/markdown";

    return <div>{renderMarkdown("# Mein Titel")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### `IntlayerMarkdownService` Dienst
    Rendert einen Markdown-String mit dem Dienst.

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

## Globale Konfiguration mit `MarkdownProvider`

Der `MarkdownProvider` (oder sein Framework-Äquivalent) konfiguriert die Markdown-Rendering-Pipeline für Ihre gesamte Anwendung. Dies gilt sowohl für das automatische Rendering von `useIntlayer` als auch für die Hilfsprogramme. Die hier konfigurierten Optionen sind die Standardeinstellungen — `.use()` überschreibt sie auf Knotenebene.

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

    > MDX wird unterstützt — jeder in Ihrem Markdown verwendete Komponentenname (z. B. `<MyCustomJSXComponent />`) wird mit dem `components`-Mapping aufgelöst.

    Sie können auch Ihren eigenen Markdown-Renderer verwenden:

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

    > Das dynamische Importieren Ihres Markdown-Renderers ist eine gute Möglichkeit, die Bundle-Größe Ihrer Anwendung zu reduzieren.

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

    Sie können auch Ihren eigenen Markdown-Renderer verwenden:

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

    > Das dynamische Importieren Ihres Markdown-Renderers ist eine gute Möglichkeit, die Bundle-Größe Ihrer Anwendung zu reduzieren.

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

    Sie können auch Ihren eigenen Markdown-Renderer verwenden:

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

    > Das dynamische Importieren Ihres Markdown-Renderers ist eine gute Möglichkeit, die Bundle-Größe Ihrer Anwendung zu reduzieren.

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

    Sie können auch Ihren eigenen Markdown-Renderer verwenden:

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

    > Das dynamische Importieren Ihres Markdown-Renderers ist eine gute Möglichkeit, die Bundle-Größe Ihrer Anwendung zu reduzieren.

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

    Sie können auch Ihren eigenen Markdown-Renderer verwenden:

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

    > Das dynamische Importieren Ihres Markdown-Renderers ist eine gute Möglichkeit, die Bundle-Größe Ihrer Anwendung zu reduzieren.

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

    > Das dynamische Importieren Ihres Markdown-Renderers ist eine gute Möglichkeit, die Bundle-Größe Ihrer Anwendung zu reduzieren.

  </Tab>
</Tabs>

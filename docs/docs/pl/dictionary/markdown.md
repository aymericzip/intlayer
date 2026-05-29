---
createdAt: 2025-02-07
updatedAt: 2026-05-19
title: Markdown
description: Dowiedz się, jak deklarować i używać treści Markdown na swojej wielojęzycznej stronie internetowej za pomocą Intlayer. Postępuj zgodnie z instrukcjami w tej dokumentacji online, aby bezproblemowo zintegrować Markdown ze swoim projektem.
keywords:
  - Markdown
  - Internacjonalizacja
  - Dokumentacja
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
  - version: 8.11.0
    date: 2026-05-28
    changes: "Zezwalaj na wstępne parsowanie AST Markdown dla SSR / hydratacji"
  - version: 8.10.0
    date: 2026-05-19
    changes: "Dodano obsługę plików `.content.md`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "Dodano obiekt wtyczki `intlayerMarkdown`; użyj `app.use(intlayerMarkdown)` zamiast `app.use(installIntlayerMarkdown)`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "Przeniesiono import z `{{framework}}-intlayer` do `{{framework}}-intlayer/markdown`"
  - version: 8.0.0
    date: 2026-01-22
    changes: "Dodano narzędzie MarkdownRenderer / useMarkdownRenderer / renderMarkdown i opcję forceInline"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Automatyczna dekoracja treści markdown, obsługa MDX i SSR"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Zainicjowano historię"
---

# Markdown / Treść w postaci tekstu sformatowanego

Intlayer obsługuje treści w postaci tekstu sformatowanego (Rich Text) definiowane za pomocą składni Markdown. Pozwala to na łatwe pisanie i utrzymywanie bogato sformatowanych treści, takich jak blogi, artykuły i inne.

## Deklarowanie treści Markdown

Możesz zadeklarować treść Markdown używając funkcji `md` lub po prostu jako ciąg znaków (jeśli zawiera składnię Markdown).

<Tabs>
  <Tab label=".content.md" value=".content.md">
    Począwszy od wersji `8.10.0`, możesz deklarować treść Markdown bezpośrednio w plikach `.content.md`. Intlayer automatycznie wykryje i przetworzy treść Markdown.

    ```md fileName="markdown-file.en.content.md"
    ---
    key: my-markdown-content
    description: Moja treść
    locale: en
    ---

    # Moja treść

    Oto przykład treści markdown
    ```

    Pole front-matter `locale` to pole, które definiuje język treści. Jest ono opcjonalne. Jeśli nie zostanie podane, Intlayer użyje języka domyślnego, który służy również jako język zastępczy, jeśli nie jest dostępne tłumaczenie dla określonego języka.

    Przykład struktury plików:

    ```text
    content
    ├── markdown-file.en.content.md
    ├── markdown-file.fr.content.md
    └── markdown-file.es.content.md
    ```

    Do front-matter można dodać dowolne właściwości zdefiniowane w [Definicji słownika](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md)

  </Tab>
  <Tab label="Ręczne pakowanie" value="manual-wrapping">
    Użyj funkcji `md`, aby jawnie zadeklarować treść Markdown. Jest to przydatne, jeśli chcesz upewnić się, że ciąg znaków jest traktowany jako Markdown, nawet jeśli nie zawiera wyraźnej składni.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, type Dictionary } from "intlayer";

    const markdownDictionary = {
      key: "app",
      content: {
        myMarkdownContent: md("## Mój tytuł \n\nLorem Ipsum"),
      },
    } satisfies Dictionary;

    export default markdownDictionary;
    ```

  </Tab>
  <Tab label="Pliki zewnętrzne" value="external-files">
    Importuj pliki `.md` bezpośrednio za pomocą funkcji `file`.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: md(file("./myMarkdown.en.md")),
          pl: md(file("./myMarkdown.pl.md")),
        }),
      },
    };
    ```

  </Tab>

  <Tab label="Automatyczne wykrywanie" value="automatic-detection">
    Jeśli ciąg znaków zawiera typowe wskaźniki Markdown (takie jak nagłówki, listy, linki itp.), Intlayer automatycznie je przekształci.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Włącz automatyczne wykrywanie treści Markdown - Można ustawić globalnie w intlayer.config.ts
      content: {
        myMarkdownContent: "## Mój tytuł \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>
</Tabs>

## Renderowanie Markdown

Intlayer zapewnia dwa niezależne sposoby renderowania Markdown:

1. **Przez `useIntlayer`**
   — Intlayer automatycznie przekształca węzeł `md` w natywny wynik frameworka (JSX, VNode, ciąg znaków HTML).
   - Frontmatter jest analizowany i eksponowany jako `.metadata`. Możesz nadpisać renderowanie na dwóch poziomach — globalnie za pomocą `MarkdownProvider` (lub odpowiednika frameworka) i lokalnie dla węzła za pomocą `.use()`. Oba można łączyć; `.use()` ma pierwszeństwo przed `MarkdownProvider`, który z kolei ma pierwszeństwo przed ustawieniami domyślnymi.

2. **Narzędzia pomocnicze** — `<MarkdownRenderer />`, `useMarkdownRenderer()` i `renderMarkdown()` to samodzielne narzędzia, które akceptują **tylko surowe ciągi znaków Markdown**. Są one niezależne od `useIntlayer` i nie działają ze zwracanymi przez nie udekorowanymi węzłami.

Renderowanie Markdown obsługuje **MDX** — użyj dowolnego komponentu JSX/frameworka podając jego nazwę bezpośrednio w swoim Markdown.

### 1. Automatyczne renderowanie (przez `useIntlayer`)

<Tabs group="framework">
  <Tab label="React" value="react">
    Węzły Markdown można renderować bezpośrednio jako JSX.

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
          MyButton: (props) => <button {...props} />, // Komponent MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Jeśli `MarkdownProvider` nie jest obecny, Intlayer użyje domyślnego parsera Markdown do JSX do wyrenderowania markdownu.

    Możesz również zapewnić lokalne nadpisania dla określonych węzłów za pomocą metody `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Możesz pobrać Markdown jako ciąg znaków:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    Możesz uzyskać dostęp do metadanych markdown w ten sposób:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    Węzły Markdown można renderować bezpośrednio jako JSX.

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
          MyButton: (props) => <button {...props} />, // Komponent MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Jeśli `MarkdownProvider` nie jest obecny, Intlayer użyje domyślnego parsera Markdown do JSX do wyrenderowania markdownu.

    Możesz również zapewnić lokalne nadpisania dla określonych węzłów za pomocą metody `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Możesz pobrać Markdown jako ciąg znaków:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    Możesz uzyskać dostęp do metadanych markdown w ten sposób:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    W Vue, treść Markdown można renderować przy użyciu wbudowanego tagu `component` lub bezpośrednio jako węzeł.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myMarkdownContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myMarkdownContent" />
    </template>
    ```

    Skonfiguruj globalnie za pomocą wtyczki `intlayerMarkdown` (obsługuje komponenty niestandardowe MDX):

    ```ts fileName="main.ts"
    import { intlayerMarkdown } from "vue-intlayer/markdown";

    app.use(intlayerMarkdown, {
      components: {
        h1: (props) => h('h1', { style: { color: 'green' } }, props.children),
        MyButton: (props) => h('button', props), // Komponent MDX
      },
    });
    ```

    > Jeśli wtyczka `intlayerMarkdown` nie jest zainstalowana, Intlayer wyrenderuje za pomocą domyślnego kompilatora.

    Możesz również zapewnić lokalne nadpisania dla określonych węzłów za pomocą metody `.use()`:

    ```vue
    <component :is="myMarkdownContent.use({
      h1: (props) => h('h1', { style: { color: 'red' } }, props.children),
    })" />
    ```

    Możesz pobrać Markdown jako ciąg znaków:

    ```vue
    {{ myMarkdownContent.value }}
    {{ String(myMarkdownContent) }}
    {{ myMarkdownContent.toString() }}
    ```

    Możesz uzyskać dostęp do metadanych markdown w ten sposób:

    ```vue
    <component :is="myMarkdownContent.metadata" />
    <component :is="myMarkdownContent.metadata.title" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte domyślnie renderuje Markdown jako ciąg znaków HTML. Użyj `{@html}`, aby go wyrenderować.

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

    > Jeśli `MarkdownProvider` nie jest obecny, Intlayer wyrenderuje markdown używając domyślnego kompilatora.

    Możesz również zapewnić lokalne nadpisania dla określonych węzłów za pomocą metody `.use()`:

    ```svelte
    {@html $content.myMarkdownContent.use({ ... })}
    ```

    Możesz pobrać Markdown jako ciąg znaków:

    ```svelte
    {$content.myMarkdownContent.value}
    {String($content.myMarkdownContent)}
    {$content.myMarkdownContent.toString()}
    ```

    Możesz uzyskać dostęp do metadanych markdown w ten sposób:

    ```svelte
    {$content.myMarkdownContent.metadata}
    {$content.myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact obsługuje węzły Markdown bezpośrednio w JSX.

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
          MyButton: (props) => <button {...props} />, // Komponent MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Jeśli `MarkdownProvider` nie jest obecny, Intlayer użyje domyślnego parsera Markdown do JSX do wyrenderowania markdownu.

    Możesz również zapewnić lokalne nadpisania dla określonych węzłów za pomocą metody `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Możesz pobrać Markdown jako ciąg znaków:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    Możesz uzyskać dostęp do metadanych markdown w ten sposób:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid obsługuje węzły Markdown bezpośrednio w JSX.

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
          MyButton: (props) => <button {...props} />, // Komponent MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Jeśli `MarkdownProvider` nie jest obecny, Intlayer użyje domyślnego parsera Markdown do JSX do wyrenderowania markdownu.

    Możesz również zapewnić lokalne nadpisania dla określonych węzłów za pomocą metody `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
    })}
    ```

    Możesz pobrać Markdown jako ciąg znaków:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    Możesz uzyskać dostęp do metadanych markdown w ten sposób:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular używa dyrektywy `[innerHTML]` do renderowania treści Markdown.

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

    > Jeśli dostawca IntlayerMarkdown nie jest skonfigurowany, Intlayer wyrenderuje za pomocą domyślnego kompilatora.

    Możesz również zapewnić lokalne nadpisania dla określonych węzłów za pomocą metody `.use()`:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

    Możesz pobrać Markdown jako ciąg znaków:

    ```typescript
    content().myMarkdownContent.value
    String(content().myMarkdownContent)
    content().myMarkdownContent.toString()
    ```

    Możesz uzyskać dostęp do metadanych markdown w ten sposób:

    ```typescript
    content().myMarkdownContent.metadata
    content().myMarkdownContent.metadata.title
    ```

  </Tab>
</Tabs>

### 2. Narzędzia pomocnicze (tylko ciągi znaków Markdown)

Te narzędzia renderują **tylko surowe ciągi znaków Markdown** i są niezależne od `useIntlayer`. Używaj ich, gdy musisz wyrenderować Markdown ze źródeł innych niż słowniki.

<Tabs group="framework">
  <Tab label="React" value="react">
  
    #### Komponent `<MarkdownRenderer />`

    Renderuje ciąg znaków Markdown z określonymi opcjami.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# Mój Tytuł"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    Pobierz wstępnie skonfigurowaną funkcję renderowania.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# Mój Tytuł");
    ```

    #### Narzędzie `renderMarkdown()`
    Samodzielne narzędzie do renderowania poza komponentami.

    ```tsx
    import { renderMarkdown } from "react-intlayer/markdown";

    const jsx = renderMarkdown("# Mój Tytuł", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
  
    #### Komponent `<MarkdownRenderer />`

    Renderuje ciąg znaków Markdown z określonymi opcjami.

    ```tsx
    import { MarkdownRenderer } from "next-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# Mój Tytuł"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    Pobierz wstępnie skonfigurowaną funkcję renderowania.

    ```tsx
    import { useMarkdownRenderer } from "next-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# Mój Tytuł");
    ```

    #### Narzędzie `renderMarkdown()`
    Samodzielne narzędzie do renderowania poza komponentami.

    ```tsx
    import { renderMarkdown } from "next-intlayer/markdown";

    const jsx = renderMarkdown("# Mój Tytuł", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### Komponent `<MarkdownRenderer />`

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer/markdown";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# Mój Tytuł" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    #### Komponent `<MarkdownRenderer />`

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer/markdown";
    </script>

    <MarkdownRenderer forceBlock={true} value="# Mój Tytuł" />
    ```

    #### Hook `useMarkdownRenderer()`

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer/markdown";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# Mój Tytuł")}
    ```

    #### Narzędzie `renderMarkdown()`

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer/markdown";
    </script>

    {@html renderMarkdown("# Mój Tytuł")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### Komponent `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# Mój Tytuł"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# Mój Tytuł")}</div>;
    ```

    #### Narzędzie `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "preact-intlayer/markdown";

    return <div>{renderMarkdown("# Mój Tytuł")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### Komponent `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# Mój Tytuł"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# Mój Tytuł")}</div>;
    ```

    #### Narzędzie `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "solid-intlayer/markdown";

    return <div>{renderMarkdown("# Mój Tytuł")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### Usługa `IntlayerMarkdownService`
    Renderuje ciąg znaków Markdown przy użyciu usługi.

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

## Konfiguracja globalna z `MarkdownProvider`

`MarkdownProvider` (lub jego odpowiednik we frameworku) konfiguruje potok renderowania Markdown dla całej aplikacji. Dotyczy to zarówno automatycznego renderowania `useIntlayer`, jak i narzędzi pomocniczych. Ustawione tutaj opcje są ustawieniami domyślnymi — `.use()` nadpisuje je na poziomie węzła.

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


    > MDX jest obsługiwany — każda nazwa komponentu użyta wewnątrz twojego Markdown (np. `<MyCustomJSXComponent />`) jest rozwiązywana względem mapy `components`.

    Możesz również użyć własnego renderera markdown:

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

    > Dynamiczne importowanie twojego renderera Markdown to świetny sposób na zmniejszenie rozmiaru pakietu twojej aplikacji.

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


    > MDX jest obsługiwany — każda nazwa komponentu użyta wewnątrz twojego Markdown (np. `<MyCustomJSXComponent />`) jest rozwiązywana względem mapy `components`.

    Możesz również użyć własnego renderera markdown:

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

    > Dynamiczne importowanie twojego renderera Markdown to świetny sposób na zmniejszenie rozmiaru pakietu twojej aplikacji.

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


    > MDX jest obsługiwany — każda nazwa komponentu użyta wewnątrz twojego Markdown (np. `<MyCustomJSXComponent />`) jest rozwiązywana względem mapy `components`.

    Możesz również użyć własnego renderera markdown:

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

    > Dynamiczne importowanie twojego renderera Markdown to świetny sposób na zmniejszenie rozmiaru pakietu twojej aplikacji.

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


    > MDX jest obsługiwany — każda nazwa komponentu użyta wewnątrz twojego Markdown (np. `<MyCustomJSXComponent />`) jest rozwiązywana względem mapy `components`.

    Możesz również użyć własnego renderera markdown:

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

    > Dynamiczne importowanie twojego renderera Markdown to świetny sposób na zmniejszenie rozmiaru pakietu twojej aplikacji.

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


    > MDX jest obsługiwany — każda nazwa komponentu użyta wewnątrz twojego Markdown (np. `<MyCustomJSXComponent />`) jest rozwiązywana względem mapy `components`.

    Możesz również użyć własnego renderera markdown:

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

    > Dynamiczne importowanie twojego renderera Markdown to świetny sposób na zmniejszenie rozmiaru pakietu twojej aplikacji.

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


    > MDX jest obsługiwany — każda nazwa komponentu użyta wewnątrz twojego Markdown (np. `<MyCustomJSXComponent />`) jest rozwiązywana względem mapy `components`.

    Możesz również użyć własnego renderera markdown:

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

    > Dynamiczne importowanie twojego renderera Markdown to świetny sposób na zmniejszenie rozmiaru pakietu twojej aplikacji.

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

    > Dynamiczne importowanie twojego renderera Markdown to świetny sposób na zmniejszenie rozmiaru pakietu twojej aplikacji.

  </Tab>
</Tabs>

## Suspense

Renderer Markdown Intlayer jest ładowany dynamicznie. Mimo optymalizacji, bazowy fragment parsera zajmuje około 55 kb. Synchroniczne ładowanie tego opóźnia początkowe renderowanie strony i pogarsza First Contentful Paint (FCP).

Aby zapobiec blokowaniu interfejsu użytkownika, Intlayer integruje się z API Suspense Reacta. Pobiera parser w tle i rzuca Promise podczas pobierania.

Zawiń dowolny komponent renderujący Intlayer Markdown w granicę `<Suspense>`. Wyświetli to zlokalizowany stan rezerwowy podczas pobierania fragmentu, umożliwiając natychmiastowe renderowanie reszty DOM.

Ostrzeżenie: Jeśli nie zapewnisz granicy `<Suspense>`, React wstrzyma działanie na poziomie głównym lub zablokuje renderowanie całego drzewa komponentów do czasu pełnego załadowania 55 kb fragmentu.

<Tabs>
  <Tab label="Next.js" value="nextjs">

W Next.js App Router można użyć React `Suspense` dla komponentów klienckich lub pliku `loading.tsx` dla komponentów serwerowych.

**Komponent kliencki:**

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

**Komponent serwerowy z `loading.tsx`:**

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

Vue ma wbudowany komponent `<Suspense>`. Zawiń komponent renderujący zawartość Markdown w granicę `<Suspense>`.

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

Svelte nie ma odpowiednika API Suspense. Użyj bloku `{#await}`, aby obsłużyć asynchroniczne renderowanie zawartości Markdown.

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

Preact obsługuje API Suspense Reacta przez `preact/compat`.

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

Solid ma swój własny komponent `<Suspense>` z `solid-js`.

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

Angular nie ma API Suspense. Użyj odroczonych widoków (`@defer`) w Angular, aby obsługiwać leniwie ładowaną zawartość Markdown (wymaga Angular 17+).

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

## Renderowanie po stronie serwera (SSR) i hydratacja

W porównaniu do innych parserów Markdown, takich jak remark / rehype, Intlayer Markdown jest pozbawiony zależności i działa zarówno po stronie klienta, jak i serwera.

Jednak Intlayer optymalizuje parsowanie dla frameworków renderowania po stronie serwera (SSR) (takich jak Next.js App Router, React Router, Nuxt, SvelteKit itp.).

Zamiast wysyłać surowe ciągi Markdown do klienta i parsować je w przeglądarce (co powoduje spadek wydajności), Intlayer pozwala na wstępne sparsowanie Markdown do abstrakcyjnego drzewa składniowego (AST) na serwerze.

Możesz użyć funkcji `parseMarkdown` z pakietu Intlayer swojego frameworka po stronie serwera, aby wygenerować serializowalne AST (obiekt `ParsedMarkdown`) i przekazać je bezpośrednio do frontendu. Wszystkie narzędzia renderujące Intlayer (takie jak `<MarkdownRenderer>`, `useMarkdownRenderer` itp.) automatycznie akceptują ten obiekt AST i renderują go bez zakłóceń.

### Przykład w architekturze serwer/klient

<Tabs group="framework">
  <Tab label="React Router" value="react">

    ```tsx fileName="server.ts"
    import { parseMarkdown } from "react-intlayer/markdown";

    // 1. Na serwerze: Sparsuj markdown do serializowalnego AST
    export const loader = async () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // Zwróć AST jako JSON do klienta
      return Response.json({ content: ast });
    };
    ```

    ```tsx fileName="client.tsx"
    import { useLoaderData } from "react-router";
    import { MarkdownRenderer } from "react-intlayer/markdown";

    // 2. Na kliencie: Renderuj AST bezpośrednio bez ponownego parsowania
    export default function Page() {
      const { content } = useLoaderData();

      // Renderer akceptuje surowy ciąg znaków lub sparsowane AST
      return <MarkdownRenderer content={content} />;
    }
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="app/page.tsx"
    import { parseMarkdown } from "next-intlayer/markdown";
    import { MarkdownRenderer } from "next-intlayer/markdown";

    export default async function Page() {
      // 1. Sparsuj markdown do serializowalnego AST na serwerze
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // 2. Renderuj AST bezpośrednio
      // W Server Component działa to bezproblemowo i przekazuje AST
    // bezpośrednio do bazowych komponentów klienckich, jeśli to konieczne.
      return <MarkdownRenderer content={ast} />;
    }
    ```

  </Tab>
  <Tab label="Vue / Nuxt" value="vue">

    ```vue fileName="pages/index.vue"
    <script setup lang="ts">
    import { parseMarkdown } from "vue-intlayer/markdown";
    import { MarkdownRenderer } from "vue-intlayer/markdown";

    // 1. Pobierz i sparsuj markdown do AST na serwerze
    const { data: ast } = await useAsyncData('markdown', () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      return parseMarkdown(markdownString);
    });
    </script>

    <template>
      <!-- 2. Na kliencie: Renderuj AST bezpośrednio bez ponownego parsowania -->
      <MarkdownRenderer :content="ast" />
    </template>
    ```

  </Tab>
  <Tab label="SvelteKit" value="svelte">

    ```typescript fileName="+page.server.ts"
    import { parseMarkdown } from "svelte-intlayer/markdown";

    // 1. Na serwerze: Sparsuj markdown do serializowalnego AST
    export const load = async () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // Zwróć AST do klienta
      return { content: ast };
    };
    ```

    ```svelte fileName="+page.svelte"
    <script lang="ts">
      import { MarkdownRenderer } from "svelte-intlayer/markdown";
      export let data;
    </script>

    <!-- 2. Na kliencie: Renderuj AST bezpośrednio bez ponownego parsowania -->
    <MarkdownRenderer value={data.content} />
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    Angular SSR zazwyczaj pobiera dane na serwerze podczas początkowego ładowania i hydratuje na kliencie. Możesz użyć resolverów do przekazania AST.

    ```typescript fileName="app.resolver.ts"
    import { Injectable } from "@angular/core";
    import { Resolve } from "@angular/router";
    import { parseMarkdown, type ParsedMarkdown } from "angular-intlayer/markdown";

    @Injectable({ providedIn: "root" })
    export class MarkdownResolver implements Resolve<ParsedMarkdown> {
      resolve(): ParsedMarkdown {
        const markdownString = "## My title \n\nLorem Ipsum";
        // 1. Na serwerze: Sparsuj markdown do serializowalnego AST
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
        // 2. Na kliencie: Renderuj AST bezpośrednio bez ponownego parsowania
        this.route.data.subscribe((data) => {
          this.renderedMarkdown = this.markdownService.renderMarkdown(
            data.markdownAst
          ) as string;
        });
      }
    }
    ```

  </Tab>
</Tabs>

Ten wzorzec zapewnia, że logika parsowania Markdown jest wykonywana całkowicie na serwerze, co znacznie skraca czas wykonywania po stronie klienta i poprawia szybkość początkowej hydratacji.

## Opcje referencyjne

Te opcje można przekazać do `MarkdownProvider`, `MarkdownRenderer`, `useMarkdownRenderer` i `renderMarkdown`.

| Option                | Type        | Default | Opis                                                                                                    |
| :-------------------- | :---------- | :------ | :------------------------------------------------------------------------------------------------------ |
| `forceBlock`          | `boolean`   | `false` | Wymusza zawijanie wyjścia w element blokowy (np. `<div>`).                                              |
| `forceInline`         | `boolean`   | `false` | Wymusza zawijanie wyjścia w element liniowy (np. `<span>`).                                             |
| `tagfilter`           | `boolean`   | `true`  | Włącza GitHub Tag Filter w celu zwiększenia bezpieczeństwa poprzez usuwanie niebezpiecznych tagów HTML. |
| `preserveFrontmatter` | `boolean`   | `false` | Jeśli `true`, frontmatter na początku ciągu Markdown nie zostanie usunięty.                             |
| `components`          | `Overrides` | `{}`    | Mapa tagów HTML na niestandardowe komponenty (np. `{ h1: MyHeading }`).                                 |
| `wrapper`             | `Component` | `null`  | Niestandardowy komponent do zawijania renderowanego Markdown.                                           |
| `renderMarkdown`      | `Function`  | `null`  | Niestandardowa funkcja renderowania, aby całkowicie zastąpić domyślny kompilator Markdown.              |

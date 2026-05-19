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
    content/
    ├── en/
    │   └── markdown-file.en.content.md
    ├── fr/
    │   └── markdown-file.fr.content.md
    └── es/
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
</Tabs>

---

## Renderowanie Markdown

Intlayer zapewnia dwa niezależne sposoby renderowania Markdown:

1. **Przez `useIntlayer`**
   — Intlayer automatycznie przekształca węzeł `md` w natywny wynik frameworka (JSX, VNode, ciąg znaków HTML).
   - Frontmatter jest analizowany i eksponowany jako `.metadata`. Możesz nadpisać renderowanie na dwóch poziomach — globalnie za pomocą `MarkdownProvider` (lub odpowiednika frameworka) i lokalnie dla węzła za pomocą `.use()`. Oba można łączyć; `.use()` ma pierwszeństwo przed `MarkdownProvider`, który z kolei ma pierwszeństwo przed ustawieniami domyślnymi.

2. **Narzędzia pomocnicze** — `<MarkdownRenderer />`, `useMarkdownRenderer()` i `renderMarkdown()` to samodzielne narzędzia, które akceptują **tylko surowe ciągi znaków Markdown**. Są one niezależne od `useIntlayer` i nie działają ze zwracanymi przez nie udekorowanymi węzłami.

Renderowanie Markdown obsługuje **MDX** — użyj dowolnego komponentu JSX/frameworka podając jego nazwę bezpośrednio w swoim Markdown.

### 1. Automatyczne renderowanie (przez `useIntlayer`)

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
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
  <Tab label="React / Next.js" value="react">
  
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

---

## Konfiguracja globalna z `MarkdownProvider`

`MarkdownProvider` (lub jego odpowiednik we frameworku) konfiguruje potok renderowania Markdown dla całej aplikacji. Dotyczy to zarówno automatycznego renderowania `useIntlayer`, jak i narzędzi pomocniczych. Ustawione tutaj opcje są ustawieniami domyślnymi — `.use()` nadpisuje je na poziomie węzła.

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

    > MDX jest obsługiwany — każda nazwa komponentu użyta wewnątrz twojego Markdown (np. `<MyCustomJSXComponent />`) jest rozwiązywana względem mapy `components`.

    Możesz również użyć własnego renderera markdown:

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

---
createdAt: 2025-02-07
updatedAt: 2026-01-22
title: Markdown
description: Dowiedz się, jak deklarować i używać zawartości Markdown na swojej wielojęzycznej stronie internetowej z Intlayer. Postępuj zgodnie z krokami w tej dokumentacji online, aby bezproblemowo zintegrować Markdown z Twoim projektem.
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
  - version: 8.0.0
    date: 2026-01-22
    changes: Dodano MarkdownRenderer / useMarkdownRenderer / renderMarkdown i opcję forceInline
  - version: 8.0.0
    date: 2026-01-18
    changes: Automatyczna dekoracja treści markdown, obsługa MDX i SSR
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Markdown / Zawartość Tekstu Sformatowanego

Intlayer obsługuje zawartość tekstu sformatowanego zdefiniowaną za pomocą składni Markdown. Pozwala to na łatwe pisanie i utrzymywanie treści z bogatym formatowaniem, takich jak blogi, artykuły i inne.

## Część 1: Deklarowanie treści Markdown

Możesz zadeklarować treść Markdown, używając funkcji `md` lub po prostu jako łańcuch znaków (jeśli zawiera składnię Markdown).

<Tabs>
  <Tab label="Ręczne opakowanie" value="manual-wrapping">
    Użyj funkcji `md`, aby jawnie zadeklarować zawartość Markdown. Jest to przydatne, jeśli chcesz upewnić się, że ciąg zostanie potraktowany jako Markdown, nawet jeśli nie zawiera oczywistej składni.

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
    Jeśli ciąg zawiera typowe wskaźniki Markdown (takie jak nagłówki, listy, linki itp.), Intlayer automatycznie go przekształci.

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
    Importuj pliki `.md` bezpośrednio przy użyciu funkcji `file`.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: md(file("./myMarkdown.en.md")),
          fr: md(file("./myMarkdown.fr.md")),
          pl: md(file("./myMarkdown.pl.md")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

---

## Część 2: Renderowanie Markdown

Renderowaniem można zająć się automatycznie za pomocą systemu treści Intlayer lub ręcznie przy użyciu specjalistycznych narzędzi.

### 1. Automatyczne renderowanie (z użyciem `useIntlayer`)

Kiedy uzyskujesz dostęp do treści za pomocą `useIntlayer`, węzły Markdown są już przygotowane do renderowania.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    Węzły Markdown można renderować bezpośrednio jako JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

    Możesz również dostarczyć lokalne nadpisania dla określonych węzłów przy użyciu metody `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
    })}
    ```

  </Tab>
  <Tab label="Vue">
    W Vue zawartość Markdown można renderować przy użyciu wbudowanego komponentu `component` lub bezpośrednio jako węzeł.

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
    Svelte domyślnie renderuje Markdown jako ciąg znaków HTML. Użyj `{@html}`, aby go wyrenderować.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myMarkdownContent}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact obsługuje węzły Markdown bezpośrednio w JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid obsługuje węzły Markdown bezpośrednio w JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular wykorzystuje dyrektywę `[innerHTML]` do renderowania zawartości Markdown.

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

    Możesz również dostarczyć lokalne nadpisania dla określonych węzłów przy użyciu metody `.use()`:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

  </Tab>
</Tabs>

### 2. Ręczne renderowanie i zaawansowane narzędzia

Jeśli musisz renderować surowe łańcuchy Markdown lub potrzebujesz większej kontroli nad procesem renderowania, użyj poniższych narzędzi.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
  
    #### Komponent `<MarkdownRenderer />`

    Renderuj łańcuch Markdown przy użyciu określonych opcji.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# Mój Tytuł"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    Uzyskaj wstępnie skonfigurowaną funkcję renderującą.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# Mój Tytuł");
    ```

    #### Narzędzie `renderMarkdown()`
    Samodzielne narzędzie do renderowania poza komponentami.

    ```tsx
    import { renderMarkdown } from "react-intlayer";

    const jsx = renderMarkdown("# Mój Tytuł", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue">

    #### Komponent `<MarkdownRenderer />`

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer";
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
    import { MarkdownRenderer } from "svelte-intlayer";
    </script>

    <MarkdownRenderer forceBlock={true} value="# Mój Tytuł" />
    ```

    #### Hook `useMarkdownRenderer()`

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# Mój Tytuł")}
    ```

    #### Narzędzie `renderMarkdown()`

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer";
    </script>

    {@html renderMarkdown("# Mój Tytuł")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### Komponent `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# Mój Tytuł"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# Mój Tytuł")}</div>;
    ```

    #### Narzędzie `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "preact-intlayer";

    return <div>{renderMarkdown("# Mój Tytuł")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### Komponent `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# Mój Tytuł"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# Mój Tytuł")}</div>;
    ```

    #### Narzędzie `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "solid-intlayer";

    return <div>{renderMarkdown("# Mój Tytuł")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### Usługa `IntlayerMarkdownService`
    Renderuje ciąg Markdown przy użyciu usługi.

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

## Konfiguracja globalna z `MarkdownProvider`

Możesz skonfigurować renderowanie Markdown globalnie dla całej aplikacji. To pozwala uniknąć przekazywania tych samych prop do każdego renderera.

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
  <Tab label="Vue">

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

## Referencja opcji

Te opcje mogą być przekazane do `MarkdownProvider`, `MarkdownRenderer`, `useMarkdownRenderer` i `renderMarkdown`.

| Opcja                 | Typ         | Domyślnie | Opis                                                                                                 |
| :-------------------- | :---------- | :-------- | :--------------------------------------------------------------------------------------------------- |
| `forceBlock`          | `boolean`   | `false`   | Wymusza zawinięcie danych wyjściowych w element poziomu bloku (np. `<div>`).                         |
| `forceInline`         | `boolean`   | `false`   | Wymusza zawinięcie danych wyjściowych w element liniowy (np. `<span>`).                              |
| `tagfilter`           | `boolean`   | `true`    | Włącza filtr tagów GitHub w celu poprawy bezpieczeństwa poprzez usuwanie niebezpiecznych tagów HTML. |
| `preserveFrontmatter` | `boolean`   | `false`   | Jeśli `true`, frontmatter na początku ciągu Markdown nie zostanie usunięty.                          |
| `components`          | `Overrides` | `{}`      | Mapa tagów HTML do niestandardowych komponentów (np. `{ h1: MyHeading }`).                           |
| `wrapper`             | `Component` | `null`    | Niestandardowy komponent do opakowania wyrenderowanego Markdowna.                                    |
| `renderMarkdown`      | `Function`  | `null`    | Niestandardowa funkcja renderująca, która całkowicie zastąpi domyślny kompilator Markdown.           |

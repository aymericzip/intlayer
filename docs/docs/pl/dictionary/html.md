---
createdAt: 2026-01-20
updatedAt: 2026-01-22
title: Zawartość HTML
description: Dowiedz się, jak deklarować i używać zawartości HTML z niestandardowymi komponentami w Intlayer. Postępuj zgodnie z tą dokumentacją, aby osadzić bogate, przypominające HTML treści z dynamiczną podmianą komponentów w swoim zlokalizowanym projekcie.
keywords:
  - HTML
  - Niestandardowe komponenty
  - Bogata zawartość
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
    changes: Dodano HTMLRenderer / useHTMLRenderer / renderHTML
  - version: 8.0.0
    date: 2026-01-20
    changes: Dodano obsługę parsowania HTML
---

# Zawartość HTML / HTML w Intlayer

Intlayer obsługuje zawartość HTML, umożliwiając osadzanie bogatej, strukturalnej treści w Twoich słownikach. Ta zawartość może być renderowana za pomocą standardowych tagów HTML lub zastępowana niestandardowymi komponentami w czasie wykonywania.

## Deklarowanie treści HTML

Możesz zadeklarować treść HTML, używając funkcji `html` lub po prostu jako łańcuch znaków.

<Tabs>
  <Tab label="Ręczne opakowanie" value="manual-wrapping">
    Użyj funkcji `html`, aby jawnie zadeklarować zawartość HTML. Zapewnia to poprawne odwzorowanie standardowych tagów, nawet jeśli automatyczne wykrywanie jest wyłączone.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, type Dictionary } from "intlayer";

    const htmlDictionary = {
      key: "app",
      content: {
        myHtmlContent: html("<p>Witaj <strong>świecie</strong></p>"),
      },
    } satisfies Dictionary;

    export default htmlDictionary;
    ```

  </Tab>
  <Tab label="Automatyczne wykrywanie" value="automatic-detection">
    Jeśli ciąg zawiera typowe tagi HTML (np. `<p>`, `<div>`, `<strong>` itd.), Intlayer automatycznie go przekształci.

    ```typescript fileName="htmlDictionary.content.ts"
    export default {
      key: "app",
      content: {
        myHtmlContent: "<p>Witaj <strong>świecie</strong></p>",
      },
    };
    ```

  </Tab>
  <Tab label="Pliki zewnętrzne" value="external-files">
    Importuj zawartość HTML z plików. Zauważ, że obecnie funkcja `file()` zwraca ciąg znaków, który zostanie automatycznie rozpoznany jako HTML, jeśli zawiera tagi.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: html(file("./content.en.html")),
          fr: html(file("./content.fr.html")),
          pl: html(file("./content.pl.html")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

---

## Renderowanie HTML

Renderowaniem można zająć się automatycznie za pomocą systemu treści Intlayer lub ręcznie przy użyciu specjalistycznych narzędzi.

### Automatyczne renderowanie (z użyciem `useIntlayer`)

Kiedy uzyskujesz dostęp do treści za pomocą `useIntlayer`, węzły HTML są już przygotowane do renderowania.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    Węzły HTML można renderować bezpośrednio jako JSX. Standardowe tagi działają automatycznie.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

    Użyj metody `.use()`, aby dostarczyć własne komponenty lub nadpisać tagi:

    ```tsx
    {myHtmlContent.use({
      p: (props) => <p className="prose" {...props} />,
      CustomLink: ({ children }) => <a href="/details">{children}</a>,
    })}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    W Vue zawartość HTML można renderować przy użyciu wbudowanego komponentu `component`.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myHtmlContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myHtmlContent" />
    </template>
    ```

    Użyj `.use()` do nadpisania:
    ```vue
    <component :is="myHtmlContent.use({ h1: 'h2' })" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte renderuje węzły HTML jako ciągi znaków. Użyj `{@html}`, aby je wyrenderować.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact obsługuje węzły HTML bezpośrednio w JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid obsługuje węzły HTML bezpośrednio w JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular wykorzystuje dyrektywę `[innerHTML]` do renderowania zawartości HTML.

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

    Użyj metody `.use()`, aby dostarczyć własne komponenty lub nadpisać tagi:

    ```typescript
    content().myHtmlContent.use({
      p: { class: "prose" },
      CustomLink: { href: "/details" },
    })
    ```

  </Tab>
</Tabs>

## Konfiguracja globalna z `HTMLProvider`

Możesz skonfigurować renderowanie HTML globalnie dla całej aplikacji. To idealne rozwiązanie do zdefiniowania niestandardowych komponentów, które powinny być dostępne we wszystkich treściach HTML.

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

### Ręczne renderowanie i zaawansowane narzędzia

Jeśli musisz renderować surowe łańcuchy HTML lub potrzebujesz większej kontroli nad mapowaniem komponentów, użyj poniższych narzędzi.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    #### Komponent `<HTMLRenderer />`
    Renderuj łańcuch HTML przy użyciu określonych komponentów.

    ```tsx
    import { HTMLRenderer } from "react-intlayer";

    <HTMLRenderer components={{ p: MyCustomP }}>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### Hook `useHTMLRenderer()`

    Uzyskaj wstępnie skonfigurowaną funkcję renderującą.

    ```tsx
    import { useHTMLRenderer } from "react-intlayer";

    const renderHTML = useHTMLRenderer({
      components: { strong: (props) => <strong {...props} className="text-red-500" /> }
    });

    return renderHTML("<p>Witaj <strong>świecie</strong></p>");
    ```

    #### Narzędzie `renderHTML()`

    Samodzielne narzędzie do renderowania poza komponentami.

    ```tsx
    import { renderHTML } from "react-intlayer";

    const jsx = renderHTML("<p>Hello</p>", { components: { p: 'div' } });
    ```

  </Tab>
  <Tab label="Vue" value="vue">
   
    #### Komponent `<HTMLRenderer />`
   
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
  
    #### Komponent `<HTMLRenderer />`
   
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

    #### Narzędzie `renderHTML()`

    ```svelte
    <script lang="ts">
    import { renderHTML } from "svelte-intlayer";
    </script>

    {@html renderHTML("<p>Hello World</p>")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
   
    #### Komponent `<HTMLRenderer />`
   
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

    #### Narzędzie `renderHTML()`

    ```tsx
    import { renderHTML } from "preact-intlayer";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
   
    #### Komponent `<HTMLRenderer />`
   
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

    #### Narzędzie `renderHTML()`

    ```tsx
    import { renderHTML } from "solid-intlayer";

    return <div>{renderHTML("<p>Hello World</p>")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### Usługa `IntlayerMarkdownService`
    Renderuje ciąg HTML przy użyciu usługi.

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

## Referencja opcji

Te opcje mogą być przekazane do `HTMLProvider`, `HTMLRenderer`, `useHTMLRenderer` i `renderHTML`.

| Opcja        | Typ                   | Domyślnie | Opis                                                                                                  |
| :----------- | :-------------------- | :-------- | :---------------------------------------------------------------------------------------------------- |
| `components` | `Record<string, any>` | `{}`      | Mapa tagów HTML lub niestandardowych nazw komponentów do odpowiadających im komponentów.              |
| `renderHTML` | `Function`            | `null`    | Funkcja renderująca, która całkowicie zastąpi domyślny parser HTML (tylko dla providerów Vue/Svelte). |

> Uwaga: Dla React i Preact standardowe tagi HTML są dostarczane automatycznie. Prop `components` trzeba przekazać tylko wtedy, gdy chcesz je nadpisać lub dodać niestandardowe komponenty.

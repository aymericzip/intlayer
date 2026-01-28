---
createdAt: 2026-01-20
updatedAt: 2026-01-22
title: HTML-контент
description: Узнайте, как объявлять и использовать HTML-контент с пользовательскими компонентами в Intlayer. Следуйте этой документации, чтобы встроить богатый HTML-подобный контент с динамической заменой компонентов в ваш проект с поддержкой интернационализации.
keywords:
  - HTML
  - Пользовательские компоненты
  - Богатый контент
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
    changes: Добавлены HTMLRenderer / useHTMLRenderer / renderHTML
  - version: 8.0.0
    date: 2026-01-20
    changes: Добавлена поддержка парсинга HTML
---

# HTML-контент / HTML в Intlayer

Intlayer поддерживает HTML-контент, позволяя встраивать насыщенный, структурированный контент в ваши словари. Этот контент может отображаться с помощью стандартных HTML-тегов или заменяться на пользовательские компоненты во время выполнения.

## Объявление HTML-контента

Вы можете объявлять HTML-контент с помощью функции `html` или просто как строку.

<Tabs>
  <Tab label="Ручная обёртка" value="manual-wrapping">
    Используйте функцию `html`, чтобы явно объявлять HTML-контент. Это гарантирует корректную сопоставляемость стандартных тегов, даже если автоматическое обнаружение отключено.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, type Dictionary } from "intlayer";

    const htmlDictionary = {
      key: "app",
      content: {
        myHtmlContent: html("<p>Привет <strong>Мир</strong></p>"),
      },
    } satisfies Dictionary;

    export default htmlDictionary;
    ```

  </Tab>
  <Tab label="Автоматическое обнаружение" value="automatic-detection">
    Если строка содержит распространённые HTML-теги (например, `<p>`, `<div>`, `<strong>` и т. п.), Intlayer автоматически преобразует её.

    ```typescript fileName="htmlDictionary.content.ts"
    export default {
      key: "app",
      content: {
        myHtmlContent: "<p>Привет <strong>Мир</strong></p>",
      },
    };
    ```

  </Tab>
  <Tab label="Внешние файлы" value="external-files">
    Импортируйте HTML-контент из файлов. Обратите внимание, что в настоящее время функция `file()` возвращает строку, которая будет автоматически распознана как HTML, если содержит теги.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: html(file("./content.en.html")),
          fr: html(file("./content.fr.html")),
          ru: html(file("./content.ru.html")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

---

## Рендеринг HTML

Рендеринг можно осуществлять автоматически с помощью системы контента Intlayer или вручную с использованием специализированных инструментов.

### Автоматический рендеринг (с использованием `useIntlayer`)

Когда вы получаете контент через `useIntlayer`, HTML-узлы уже подготовлены для рендеринга.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    HTML-узлы можно рендерить напрямую как JSX. Стандартные теги работают автоматически.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

    Используйте метод `.use()` для предоставления пользовательских компонентов или переопределения тегов:

    ```tsx
    {myHtmlContent.use({
      p: (props) => <p className="prose" {...props} />,
      CustomLink: ({ children }) => <a href="/details">{children}</a>,
    })}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    Во Vue HTML-контент можно рендерить с помощью встроенного `component`.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myHtmlContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myHtmlContent" />
    </template>
    ```

    Используйте `.use()` для переопределений:
    ```vue
    <component :is="myHtmlContent.use({ h1: 'h2' })" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte рендерит HTML-узлы в виде строк. Используйте `{@html}`, чтобы их отобразить.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact поддерживает HTML-узлы непосредственно в JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid поддерживает HTML-узлы непосредственно в JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    В Angular используется директива `[innerHTML]` для рендеринга HTML-контента.

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

    Используйте метод `.use()` для предоставления пользовательских компонентов или переопределения тегов:

    ```typescript
    content().myHtmlContent.use({
      p: { class: "prose" },
      CustomLink: { href: "/details" },
    })
    ```

  </Tab>
</Tabs>

## Глобальная конфигурация с `HTMLProvider`

Вы можете настроить рендеринг HTML глобально для всего приложения. Это удобно для определения пользовательских компонентов, которые должны быть доступны во всём HTML-контенте.

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

### Ручной рендеринг и расширенные инструменты

Если вам нужно рендерить сырые HTML-строки или иметь больший контроль над маппингом компонентов, используйте следующие инструменты.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    #### Компонент `<HTMLRenderer />`
    Рендерит HTML-строку с заданными компонентами.

    ```tsx
    import { HTMLRenderer } from "react-intlayer";

    <HTMLRenderer components={{ p: MyCustomP }}>
      {"<p>Привет, мир</p>"}
    </HTMLRenderer>
    ```

    #### Хук `useHTMLRenderer()`

    Возвращает предварительно настроенную функцию рендеринга.

    ```tsx
    import { useHTMLRenderer } from "react-intlayer";

    const renderHTML = useHTMLRenderer({
      components: { strong: (props) => <strong {...props} className="text-red-500" /> }
    });

    return renderHTML("<p>Привет <strong>Мир</strong></p>");
    ```

    #### Утилита `renderHTML()`

    Утилита для рендеринга вне компонентов.

    ```tsx
    import { renderHTML } from "react-intlayer";

    const jsx = renderHTML("<p>Привет</p>", { components: { p: 'div' } });
    ```

  </Tab>
  <Tab label="Vue" value="vue">
   
    #### Компонент `<HTMLRenderer />`
   
    ```vue
    <script setup>
    import { HTMLRenderer } from "vue-intlayer";
    </script>

    <template>
      <HTMLRenderer content="<p>Привет, мир</p>" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
  
    #### Компонент `<HTMLRenderer />`
   
    ```svelte
    <script lang="ts">
    import { HTMLRenderer } from "svelte-intlayer";
    </script>

    <HTMLRenderer value="<p>Привет, мир</p>" />
    ```

    #### Хук `useHTMLRenderer()`

    ```svelte
    <script lang="ts">
    import { useHTMLRenderer } from "svelte-intlayer";
    const render = useHTMLRenderer();
    </script>

    {@html render("<p>Привет, мир</p>")}
    ```

    #### Утилита `renderHTML()`

    ```svelte
    <script lang="ts">
    import { renderHTML } from "svelte-intlayer";
    </script>

    {@html renderHTML("<p>Привет, мир</p>")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
   
    #### Компонент `<HTMLRenderer />`
   
    ```tsx
    import { HTMLRenderer } from "preact-intlayer";

    <HTMLRenderer>
      {"<p>Привет, мир</p>"}
    </HTMLRenderer>
    ```

    #### Хук `useHTMLRenderer()`

    ```tsx
    import { useHTMLRenderer } from "preact-intlayer";

    const render = useHTMLRenderer();

    return <div>{render("<p>Привет, мир</p>")}</div>;
    ```

    #### Утилита `renderHTML()`

    ```tsx
    import { renderHTML } from "preact-intlayer";

    return <div>{renderHTML("<p>Привет, мир</p>")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
   
    #### Компонент `<HTMLRenderer />`
   
    ```tsx
    import { HTMLRenderer } from "solid-intlayer";

    <HTMLRenderer>
      {"<p>Привет, мир</p>"}
    </HTMLRenderer>
    ```

    #### Хук `useHTMLRenderer()`

    ```tsx
    import { useHTMLRenderer } from "solid-intlayer";

    const render = useHTMLRenderer();

    return <div>{render("<p>Привет, мир</p>")}</div>;
    ```

    #### Утилита `renderHTML()`

    ```tsx
    import { renderHTML } from "solid-intlayer";

    return <div>{renderHTML("<p>Привет, мир</p>")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### Сервис `IntlayerMarkdownService`
    Рендерит HTML-строку с помощью сервиса.

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

## Справочник опций

Эти опции могут быть переданы в `HTMLProvider`, `HTMLRenderer`, `useHTMLRenderer` и `renderHTML`.

| Опция        | Тип                   | По умолчанию | Описание                                                                                                             |
| :----------- | :-------------------- | :----------- | :------------------------------------------------------------------------------------------------------------------- |
| `components` | `Record<string, any>` | `{}`         | Отображение HTML-тегов или имён пользовательских компонентов на соответствующие компоненты.                          |
| `renderHTML` | `Function`            | `null`       | Пользовательская функция рендеринга для полной замены стандартного HTML-парсера (только для провайдеров Vue/Svelte). |

> Примечание: для React и Preact стандартные HTML-теги предоставляются автоматически. Вам нужно передавать проп `components` только если вы хотите переопределить их или добавить пользовательские компоненты.

---
createdAt: 2025-02-07
updatedAt: 2026-01-22
title: Markdown
description: Узнайте, как объявлять и использовать Markdown-контент на вашем многоязычном сайте с помощью Intlayer. Следуйте шагам этой онлайн-документации, чтобы без проблем интегрировать Markdown в ваш проект.
keywords:
  - Markdown
  - Интернационализация
  - Документация
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
    changes: Добавлены MarkdownRenderer / useMarkdownRenderer / renderMarkdown и опция forceInline
  - version: 8.0.0
    date: 2026-01-18
    changes: Автоматическое оформление содержимого markdown, поддержка MDX и SSR
  - version: 5.5.10
    date: 2025-06-29
    changes: Инициализация истории
---

# Markdown / Содержимое с богатым текстом

Intlayer поддерживает содержимое с богатым текстом, определенное с использованием синтаксиса Markdown. Это позволяет легко писать и поддерживать контент с богатым форматированием, такой как блоги, статьи и многое другое.

## Как работает Markdown

Intlayer v8 интеллектуально обнаруживает синтаксис Markdown в ваших строках контента. Если строка идентифицируется как Markdown, она автоматически преобразуется в узел Markdown.

<Columns>
  <Column title="Поведение v7 (Ручная обертка)">

    ```typescript fileName="markdownDictionary.content.ts"
    import { md } from "intlayer";

    export default {
      key: "app",
      content: {
        text: md("## Мой заголовок \n\nLorem Ipsum"),
      },
    };
    ```

  </Column>
  <Column title="Поведение v8 (Автоматическое обнаружение)">

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Включить автоматическое обнаружение контента Markdown - Можно установить глобально в intlayer.config.ts
      content: {
        text: "## Мой заголовок \n\nLorem Ipsum",
      },
    };
    ```

  </Column>
</Columns>

---

## Часть 1: Объявление контента Markdown

Вы можете объявлять контент Markdown с помощью функции `md` или просто как строку (если она содержит синтаксис Markdown).

<Tabs>
  <Tab label="Ручная обертка">
    Используйте функцию `md`, чтобы явно объявить контент Markdown. Это полезно, если вы хотите гарантировать, что строка обрабатывается как Markdown, даже если она не содержит явного синтаксиса.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, type Dictionary } from "intlayer";

    const markdownDictionary = {
      key: "app",
      content: {
        myMarkdownContent: md("## Мой заголовок \n\nLorem Ipsum"),
      },
    } satisfies Dictionary;

    export default markdownDictionary;
    ```

  </Tab>
  <Tab label="Автоматическое обнаружение">
    Если строка содержит распространенные индикаторы Markdown (такие как заголовки, списки, ссылки и т. д.), Intlayer автоматически преобразует ее.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Включить автоматическое обнаружение контента Markdown - Можно установить глобально в intlayer.config.ts
      content: {
        myMarkdownContent: "## Мой заголовок \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>
  <Tab label="Внешние файлы">
    Импортируйте файлы `.md` напрямую с помощью функции `file`.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: md(file("./myMarkdown.en.md")),
          fr: md(file("./myMarkdown.fr.md")),
          ru: md(file("./myMarkdown.ru.md")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

---

## Часть 2: Рендеринг Markdown

Рендеринг может осуществляться автоматически системой контента Intlayer или вручную с использованием специализированных инструментов.

### 1. Автоматический рендеринг (с использованием `useIntlayer`)

Когда вы получаете контент через `useIntlayer`, узлы Markdown уже подготовлены для рендеринга.

<Tabs group="framework">
  <Tab label="React / Next.js">
    Узлы Markdown можно рендерить напрямую как JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

    Вы также можете предоставить локальные переопределения для конкретных узлов, используя метод `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
    })}
    ```

  </Tab>
  <Tab label="Vue">
    Во Vue контент Markdown можно рендерить с помощью встроенного компонента `component` или напрямую как узел.

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
  <Tab label="Svelte">
    Svelte рендерит Markdown как HTML-строку по умолчанию. Используйте `{@html}`, чтобы отобразить его.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myMarkdownContent}
    ```

  </Tab>
  <Tab label="Preact">
    Preact поддерживает узлы Markdown непосредственно в JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid">
    Solid поддерживает узлы Markdown непосредственно в JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular">
    В Angular используется директива `[innerHTML]` для рендеринга контента Markdown.

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

    Вы также можете предоставить локальные переопределения для конкретных узлов, используя метод `.use()`:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

  </Tab>
</Tabs>

### 2. Ручной рендеринг и расширенные инструменты

Если вам нужно отрендерить сырые строки Markdown или иметь больше контроля над процессом рендеринга, используйте следующие инструменты.

<Tabs group="framework">
  <Tab label="React / Next.js">
  
    #### Компонент `<MarkdownRenderer />`

    Рендерит строку Markdown с заданными параметрами.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# Мой заголовок"}
    </MarkdownRenderer>
    ```

    #### Хук `useMarkdownRenderer()`

    Получите предварительно настроенную функцию рендеринга.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# Мой заголовок");
    ```

    #### Утилита `renderMarkdown()`
    Автономная утилита для рендеринга вне компонентов.

    ```tsx
    import { renderMarkdown } from "react-intlayer";

    const jsx = renderMarkdown("# Мой заголовок", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue">

    #### Компонент `<MarkdownRenderer />`

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# Мой заголовок" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte">

    #### Компонент `<MarkdownRenderer />`

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer";
    </script>

    <MarkdownRenderer forceBlock={true} value="# Мой заголовок" />
    ```

    #### Хук `useMarkdownRenderer()`

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# Мой заголовок")}
    ```

    #### Утилита `renderMarkdown()`

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer";
    </script>

    {@html renderMarkdown("# Мой заголовок")}
    ```

  </Tab>
  <Tab label="Preact">
    #### Компонент `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# Мой заголовок"}
    </MarkdownRenderer>
    ```

    #### Хук `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# Мой заголовок")}</div>;
    ```

    #### Утилита `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "preact-intlayer";

    return <div>{renderMarkdown("# Мой заголовок")}</div>;
    ```

  </Tab>
  <Tab label="Solid">
    #### Компонент `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# Мой заголовок"}
    </MarkdownRenderer>
    ```

    #### Хук `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# Мой заголовок")}</div>;
    ```

    #### Утилита `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "solid-intlayer";

    return <div>{renderMarkdown("# Мой заголовок")}</div>;
    ```

  </Tab>
  <Tab label="Angular">
    #### Сервис `IntlayerMarkdownService`
    Рендерит строку Markdown с помощью сервиса.

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

## Глобальная конфигурация с `MarkdownProvider`

Вы можете настроить рендеринг Markdown глобально для всего приложения. Это позволяет избежать передачи одних и тех же параметров каждому рендереру.

<Tabs group="framework">
  <Tab label="React / Next.js">

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
  <Tab label="Svelte">

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
  <Tab label="Preact">

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
  <Tab label="Solid">

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
  <Tab label="Angular">

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

## Справочник опций

Эти опции могут быть переданы в `MarkdownProvider`, `MarkdownRenderer`, `useMarkdownRenderer` и `renderMarkdown`.

| Опция                 | Тип         | По умолчанию | Описание                                                                                            |
| :-------------------- | :---------- | :----------- | :-------------------------------------------------------------------------------------------------- |
| `forceBlock`          | `boolean`   | `false`      | Принудительно выводит результат в виде блочного элемента (например, `<div>`).                       |
| `forceInline`         | `boolean`   | `false`      | Принудительно выводит результат в виде встроенного элемента (например, `<span>`).                   |
| `tagfilter`           | `boolean`   | `true`       | Включает фильтр тегов GitHub для повышения безопасности путем удаления опасных HTML-тегов.          |
| `preserveFrontmatter` | `boolean`   | `false`      | Если `true`, frontmatter в начале строки Markdown не будет удаляться.                               |
| `components`          | `Overrides` | `{}`         | Карта HTML-тегов и соответствующих им пользовательских компонентов (например, `{ h1: MyHeading }`). |
| `wrapper`             | `Component` | `null`       | Пользовательский компонент для обертки отрендеренного Markdown.                                     |
| `renderMarkdown`      | `Function`  | `null`       | Пользовательская функция рендеринга для полной замены стандартного компилятора Markdown.            |

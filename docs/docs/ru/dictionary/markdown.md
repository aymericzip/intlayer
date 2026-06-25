---
createdAt: 2025-02-07
updatedAt: 2026-05-19
title: Markdown
description: Узнайте, как объявлять и использовать Markdown-контент на вашем многоязычном сайте с помощью Intlayer. Следуйте инструкциям в этой документации, чтобы легко интегрировать Markdown в ваш проект.
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
  - version: 8.11.0
    date: 2026-05-28
    changes: "Разрешить предварительный синтаксический анализ AST Markdown для SSR / гидратации"
  - version: 8.10.0
    date: 2026-05-19
    changes: "Добавлена поддержка файлов `.content.md`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "Добавлен объект плагина `intlayerMarkdown`; используйте `app.use(intlayerMarkdown)` вместо `app.use(installIntlayerMarkdown)`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "перенос импорта из `{{framework}}-intlayer` в `{{framework}}-intlayer/markdown`"
  - version: 8.0.0
    date: 2026-01-22
    changes: "Добавление утилит MarkdownRenderer / useMarkdownRenderer / renderMarkdown и опции forceInline"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Автоматическое декорирование Markdown-контента, поддержка MDX и SSR"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Инициализация истории"
author: aymericzip
---

# Markdown / Форматированный текст

Intlayer поддерживает форматированный текстовый контент, определенный с использованием синтаксиса Markdown. Это позволяет легко писать и поддерживать контент со сложным форматированием, такой как блоги, статьи и многое другое.

## Объявление Markdown-контента

Вы можете объявить Markdown-контент с помощью функции `md` или просто как строку (если она содержит синтаксис Markdown).

<Tabs>
  <Tab label=".content.md" value=".content.md">
    Начиная с версии `8.10.0`, вы можете объявлять Markdown-контент непосредственно в файлах `.content.md`. Intlayer автоматически обнаружит и проанализирует Markdown-контент.

    ```md fileName="markdown-file.en.content.md"
    ---
    key: my-markdown-content
    description: Мой контент
    locale: en
    ---

    # Мой контент

    Вот пример Markdown-контента
    ```

    Поле `locale` в front-matter определяет локаль контента. Оно необязательно. Если оно не указано, Intlayer будет использовать локаль по умолчанию, которая также используется в качестве резервной локали (fallback), если перевод для конкретной локали недоступен.

    Пример структуры файлов:

    ```text
    content/
    ├── en/
    │   └── markdown-file.en.content.md
    ├── fr/

    │   └── markdown-file.fr.content.md
    └── es/
        └── markdown-file.es.content.md
    ```

    Вы можете добавить в front-matter любые свойства, определенные в [определении словаря](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md)

  </Tab>
  <Tab label="Ручное оборачивание" value="manual-wrapping">
    Используйте функцию `md` для явного объявления Markdown-контента. Это полезно, если вы хотите гарантировать, что строка будет обрабатываться как Markdown, даже если она не содержит явного синтаксиса.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, type Dictionary } from "intlayer";

    const markdownDictionary = {
      key: "app",
      content: {
        myMarkdownContent: md("## My title \n\nLorem Ipsum"),
      },
    } satisfies Dictionary;

    export default markdownDictionary;
    ```

  </Tab>
  <Tab label="Внешние файлы" value="external-files">
    Импортируйте файлы `.md` напрямую, используя функцию `file`.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          ru: md(file("./myMarkdown.ru.md")),
          en: md(file("./myMarkdown.en.md")),
          fr: md(file("./myMarkdown.fr.md")),
        }),
      },
    };
    ```

  </Tab>

  <Tab label="Автоматическое обнаружение" value="automatic-detection">
    Если строка содержит общие признаки Markdown (такие как заголовки, списки, ссылки и т. д.), Intlayer автоматически преобразует ее.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Включить автоматическое обнаружение Markdown контента — можно установить глобально в intlayer.config.ts
      content: {
        myMarkdownContent: "## My title \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>
</Tabs>

## Рендеринг Markdown

Intlayer предоставляет два независимых способа рендеринга Markdown:

1. **Через `useIntlayer`**
   — Intlayer автоматически преобразует узел `md` в нативный вывод фреймворка (JSX, VNode, HTML-строка).
   - Frontmatter парсится и предоставляется как `.metadata`. Вы можете переопределить рендеринг на двух уровнях — глобально с помощью `MarkdownProvider` (или эквивалента для вашего фреймворка) и локально для каждого узла с помощью `.use()`. Оба метода можно комбинировать; `.use()` имеет приоритет над `MarkdownProvider`, который, в свою очередь, имеет приоритет над поведением по умолчанию.

2. **Вспомогательные утилиты** — `<MarkdownRenderer />`, `useMarkdownRenderer()` и `renderMarkdown()` являются автономными инструментами, которые принимают **только необработанные строки Markdown (raw strings)**. Они не зависят от `useIntlayer` и не работают с декорированными узлами, которые он возвращает.

Рендеринг Markdown поддерживает **MDX** — используйте любой JSX компонент или компонент фреймворка по имени прямо в вашем Markdown.

### 1. Автоматический рендеринг (через `useIntlayer`)

<Tabs group="framework">
  <Tab label="React" value="react">
    Markdown-узлы могут быть отрисованы напрямую как JSX.

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
          MyButton: (props) => <button {...props} />, // MDX-компонент
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Если `MarkdownProvider` отсутствует, intlayer будет отрисовывать markdown, используя стандартный парсер Markdown в JSX.

Вы также можете предоставить локальные переопределения для конкретных узлов, используя метод `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Вы можете получить Markdown в виде строки:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    И вы можете получить доступ к метаданным вашего markdown, например:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    Markdown-узлы могут быть отрисованы напрямую как JSX.

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
          MyButton: (props) => <button {...props} />, // MDX-компонент
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Если `MarkdownProvider` отсутствует, intlayer будет отрисовывать markdown, используя стандартный парсер Markdown в JSX.

Вы также можете предоставить локальные переопределения для конкретных узлов, используя метод `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Вы можете получить Markdown в виде строки:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    И вы можете получить доступ к метаданным вашего markdown, например:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    В Vue контент Markdown можно отрендерить с помощью встроенного элемента `component` или напрямую как узел.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myMarkdownContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myMarkdownContent" />
    </template>
    ```

    Настройте глобально через плагин `intlayerMarkdown` (поддерживает пользовательские компоненты MDX):

    ```ts fileName="main.ts"
    import { intlayerMarkdown } from "vue-intlayer/markdown";

    app.use(intlayerMarkdown, {
      components: {
        h1: (props) => h('h1', { style: { color: 'green' } }, props.children),
        MyButton: (props) => h('button', props), // Компонент MDX
      },
    });
    ```

    > Если плагин `intlayerMarkdown` не установлен, Intlayer будет выполнять рендеринг с использованием компилятора по умолчанию.

    Вы также можете предоставить локальные переопределения для конкретных узлов, используя метод `.use()`:

    ```vue
    <component :is="myMarkdownContent.use({
      h1: (props) => h('h1', { style: { color: 'red' } }, props.children),
    })" />
    ```

    Вы можете получить Markdown в виде строки:

    ```vue
    {{ myMarkdownContent.value }}
    {{ String(myMarkdownContent) }}
    {{ myMarkdownContent.toString() }}
    ```

    И вы можете получить доступ к метаданным вашего markdown, например:

    ```vue
    <component :is="myMarkdownContent.metadata" />
    <component :is="myMarkdownContent.metadata.title" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte по умолчанию рендерит Markdown как HTML-строку. Используйте `{@html}` для его рендеринга.

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

    > Если `MarkdownProvider` отсутствует, Intlayer будет рендерить markdown с использованием компилятора по умолчанию.

    Вы также можете предоставить локальные переопределения для конкретных узлов, используя метод `.use()`:

    ```svelte
    {@html $content.myMarkdownContent.use({ ... })}
    ```

    Вы можете получить Markdown в виде строки:

    ```svelte
    {$content.myMarkdownContent.value}
    {String($content.myMarkdownContent)}
    {$content.myMarkdownContent.toString()}
    ```

    И вы можете получить доступ к метаданным вашего markdown, например:

    ```svelte
    {$content.myMarkdownContent.metadata}
    {$content.myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact поддерживает узлы Markdown непосредственно в JSX.

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
          MyButton: (props) => <button {...props} />, // Компонент MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Если `MarkdownProvider` отсутствует, intlayer будет отрисовывать markdown, используя стандартный парсер Markdown в JSX.

    Вы также можете предоставить локальные переопределения для конкретных узлов, используя метод `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Вы можете получить Markdown в виде строки:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    И вы можете получить доступ к метаданным вашего markdown, например:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid поддерживает узлы Markdown непосредственно в JSX.

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
          MyButton: (props) => <button {...props} />, // Компонент MDX
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Если `MarkdownProvider` отсутствует, intlayer будет отрисовывать markdown, используя стандартный парсер Markdown в JSX.

    Вы также можете предоставить локальные переопределения для конкретных узлов, используя метод `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
    })}
    ```

    Вы можете получить Markdown в виде строки:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    И вы можете получить доступ к метаданным вашего markdown, например:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular использует директиву `[innerHTML]` для рендеринга контента Markdown.

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

    > Если провайдер IntlayerMarkdown не настроен, Intlayer будет выполнять рендеринг с использованием компилятора по умолчанию.

    Вы также можете предоставить локальные переопределения для конкретных узлов, используя метод `.use()`:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

    Вы можете получить Markdown в виде строки:

    ```typescript
    content().myMarkdownContent.value
    String(content().myMarkdownContent)
    content().myMarkdownContent.toString()
    ```

    И вы можете получить доступ к метаданным вашего markdown, например:

    ```typescript
    content().myMarkdownContent.metadata
    content().myMarkdownContent.metadata.title
    ```

  </Tab>
</Tabs>

### 2. Вспомогательные утилиты (только строки Markdown)

Эти утилиты отображают **сырые строки Markdown** и независимы от `useIntlayer`. Используйте их, когда вам нужно отобразить Markdown из источников, отличных от ваших словарей.

<Tabs group="framework">
  <Tab label="React" value="react">
  
    #### Компонент `<MarkdownRenderer />`

    Отобразите строку Markdown с конкретными параметрами.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    Получить предварительно настроенную функцию рендера.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# My Title");
    ```

    #### Утилита `renderMarkdown()`
    Автономная утилита для рендеринга вне компонентов.

    ```tsx
    import { renderMarkdown } from "react-intlayer/markdown";

    const jsx = renderMarkdown("# My Title", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
  
    #### Компонент `<MarkdownRenderer />`

    Отрендерить строку Markdown с конкретными опциями.

    ```tsx
    import { MarkdownRenderer } from "next-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    Получить предварительно настроенную функцию рендеринга.

    ```tsx
    import { useMarkdownRenderer } from "next-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# My Title");
    ```

    #### Утилита `renderMarkdown()`
    Самостоятельная утилита для рендеринга вне компонентов.

    ```tsx
    import { renderMarkdown } from "next-intlayer/markdown";

    const jsx = renderMarkdown("# My Title", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### Компонент `<MarkdownRenderer />`

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer/markdown";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# My Title" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    #### Компонент `<MarkdownRenderer />`

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer/markdown";
    </script>

    <MarkdownRenderer forceBlock={true} value="# My Title" />
    ```

    #### `useMarkdownRenderer()` Hook

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer/markdown";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# My Title")}
    ```

    #### Утилита `renderMarkdown()`

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer/markdown";
    </script>

    {@html renderMarkdown("# My Title")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### Компонент `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` Hook

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# My Title")}</div>;
    ```

    #### `renderMarkdown()` Утилита

    ```tsx
    import { renderMarkdown } from "preact-intlayer/markdown";

    return <div>{renderMarkdown("# My Title")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### `<MarkdownRenderer />` компонент

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### Hook `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# My Title")}</div>;
    ```

    #### Утилита `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "solid-intlayer/markdown";

    return <div>{renderMarkdown("# My Title")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### Сервис `IntlayerMarkdownService`
    Отрендеринг Markdown строки с использованием сервиса.

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

## Глобальная конфигурация с `MarkdownProvider`

`MarkdownProvider` (или его эквивалент для конкретного фреймворка) настраивает pipeline рендеринга Markdown для всего приложения. Это применяется как к автоматическому рендерингу `useIntlayer`, так и к вспомогательным утилитам. Параметры, установленные здесь, являются значениями по умолчанию — `.use()` переопределяет их на уровне узла.

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


    > MDX поддерживается — любое имя компонента, используемое внутри вашего Markdown (например `<MyCustomJSXComponent />`), разрешается по отношению к карте `components`.

    Вы также можете использовать свой собственный renderer Markdown:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "react-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          // Используйте динамический импорт, чтобы уменьшить размер bundle приложения
          const { renderMarkdown } = await import('react-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > Динамический импорт вашего renderer Markdown — это хороший способ уменьшить размер bundle приложения.

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


    > MDX поддерживается — любое имя компонента, используемое внутри вашего Markdown (например `<MyCustomJSXComponent />`), разрешается по отношению к карте `components`.

    Вы также можете использовать свой собственный renderer Markdown:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "next-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          // Используйте динамический импорт, чтобы уменьшить размер bundle приложения
          const { renderMarkdown } = await import('next-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > Динамический импорт вашего renderer Markdown — это хороший способ уменьшить размер bundle приложения.

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


    > MDX поддерживается — любое имя компонента, используемое внутри вашего Markdown (например `<MyCustomJSXComponent />`), разрешается по отношению к карте `components`.

    Вы также можете использовать свой собственный renderer Markdown:

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

    > Динамический импорт вашего renderer Markdown — это хороший способ уменьшить размер bundle приложения.

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


    > MDX поддерживается — любое имя компонента, используемое внутри вашего Markdown (например `<MyCustomJSXComponent />`), разрешается по отношению к карте `components`.

    Вы также можете использовать свой собственный renderer Markdown:

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

    > Динамический импорт вашего renderer Markdown — это хороший способ уменьшить размер bundle приложения.

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


    > MDX поддерживается — любое имя компонента, используемое внутри вашего Markdown (например `<MyCustomJSXComponent />`), разрешается по отношению к карте `components`.

    Вы также можете использовать свой собственный renderer Markdown:

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

    > Динамический импорт вашего renderer Markdown — это хороший способ уменьшить размер bundle приложения.

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


    > MDX поддерживается — любое имя компонента, используемое внутри вашего Markdown (например `<MyCustomJSXComponent />`), разрешается по отношению к карте `components`.

    Вы также можете использовать свой собственный renderer Markdown:

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

    > Динамический импорт вашего renderer Markdown — это хороший способ уменьшить размер bundle приложения.

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="app.config.ts"
    import { createIntlayerMarkdownProvider } from "angular-intlayer/markdown";

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


    > MDX поддерживается — любое имя компонента, используемое внутри вашего Markdown (например `<MyCustomJSXComponent />`), разрешается по отношению к карте `components`.

    Вы также можете использовать свой собственный renderer Markdown:

    ```typescript fileName="app.config.ts"
    import { createIntlayerMarkdownProvider } from "angular-intlayer/markdown";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerMarkdownProvider({
          renderMarkdown: async (md) => {
            const { renderMarkdown } = await import('angular-intlayer/markdown');
            return renderMarkdown(md);
          },
        }),
      ],
    };
    ```

    > Динамический импорт вашего renderer Markdown — это хороший способ уменьшить размер bundle приложения.

  </Tab>
</Tabs>

## Suspense

Рендерер Markdown в Intlayer загружается динамически. Несмотря на оптимизацию, базовый фрагмент парсера составляет около 55 КБ. Его синхронная загрузка задерживает первоначальный рендеринг страницы и ухудшает First Contentful Paint (FCP).

Чтобы предотвратить блокировку пользовательского интерфейса, Intlayer интегрируется с API React Suspense. Он загружает парсер в фоновом режиме и выдает Promise во время загрузки.

Оберните любой компонент, рендерящий Intlayer Markdown, в границу `<Suspense>`. Это отобразит локализованное резервное состояние во время загрузки фрагмента, позволяя остальной части вашего DOM рендериться немедленно.

Предупреждение: Если вы не предоставите границу `<Suspense>`, React приостановит работу на корневом уровне или заблокирует рендеринг всего дерева компонентов до тех пор, пока фрагмент размером 55 КБ не будет полностью загружен.

<Tabs>
  <Tab label="Next.js" value="nextjs">

В маршрутизаторе Next.js App Router вы можете использовать либо React `Suspense` для клиентских компонентов, либо файл `loading.tsx` для серверных компонентов.

**Клиентский компонент:**

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

**Серверный компонент с `loading.tsx`:**

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

В Vue есть встроенный компонент `<Suspense>`. Оберните компонент, рендерящий содержимое Markdown, в границу `<Suspense>`.

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

Svelte не имеет эквивалента API Suspense. Используйте блок `{#await}` для обработки асинхронного рендеринга содержимого Markdown.

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

Preact поддерживает API React Suspense через `preact/compat`.

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

В Solid есть собственный компонент `<Suspense>` из `solid-js`.

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

Angular не имеет API Suspense. Используйте отложенные представления (`@defer`) для обработки лениво загружаемого содержимого Markdown (требуется Angular 17+).

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

## Рендеринг на стороне сервера (SSR) и гидратация

По сравнению с другими парсерами Markdown, такими как remark / rehype, Intlayer Markdown не имеет зависимостей и работает как на клиенте, так и на сервере.

Однако Intlayer оптимизирует синтаксический анализ для фреймворков серверного рендеринга (SSR) (таких как Next.js App Router, React Router, Nuxt, SvelteKit и т. д.).

Вместо отправки необработанных строк Markdown клиенту и их анализа в браузере (что приводит к снижению производительности), Intlayer позволяет предварительно проанализировать Markdown в абстрактное синтаксическое дерево (AST) на сервере.

Вы можете использовать функцию `parseMarkdown` из пакета Intlayer вашего фреймворка на стороне сервера для генерации сериализуемого AST (объекта `ParsedMarkdown`) и передачи его непосредственно на фронтенд. Все утилиты рендеринга Intlayer (такие как `<MarkdownRenderer>`, `useMarkdownRenderer` и т. д.) автоматически принимают этот объект AST и плавно рендерят его.

### Пример в архитектуре Сервер/Клиент

<Tabs group="framework">
  <Tab label="React Router" value="react">

    ```tsx fileName="server.ts"
    import { parseMarkdown } from "react-intlayer/markdown";

    // 1. На сервере: преобразовать markdown в сериализуемое AST
    export const loader = async () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // Возвратить AST клиенту в формате JSON
      return Response.json({ content: ast });
    };
    ```

    ```tsx fileName="client.tsx"
    import { useLoaderData } from "react-router";
    import { MarkdownRenderer } from "react-intlayer/markdown";

    // 2. На клиенте: отрендерить AST напрямую без повторного анализа
    export default function Page() {
      const { content } = useLoaderData();

      // Рендерер принимает либо необработанную строку, либо проанализированное AST
      return <MarkdownRenderer content={content} />;
    }
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="app/page.tsx"
    import { parseMarkdown } from "next-intlayer/markdown";
    import { MarkdownRenderer } from "next-intlayer/markdown";

    export default async function Page() {
      // 1. Преобразовать markdown в сериализуемое AST на сервере
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // 2. Отрендерить AST напрямую
      // В серверном компоненте это работает бесшовно и передает AST
    // напрямую в базовые клиентские компоненты, если это необходимо.
      return <MarkdownRenderer content={ast} />;
    }
    ```

  </Tab>
  <Tab label="Vue / Nuxt" value="vue">

    ```vue fileName="pages/index.vue"
    <script setup lang="ts">
    import { parseMarkdown } from "vue-intlayer/markdown";
    import { MarkdownRenderer } from "vue-intlayer/markdown";

    // 1. Получить и преобразовать markdown в AST на сервере
    const { data: ast } = await useAsyncData('markdown', () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      return parseMarkdown(markdownString);
    });
    </script>

    <template>
      <!-- 2. На клиенте: отрендерить AST напрямую без повторного анализа -->
      <MarkdownRenderer :content="ast" />
    </template>
    ```

  </Tab>
  <Tab label="SvelteKit" value="svelte">

    ```typescript fileName="+page.server.ts"
    import { parseMarkdown } from "svelte-intlayer/markdown";

    // 1. На сервере: преобразовать markdown в сериализуемое AST
    export const load = async () => {
      const markdownString = "## My title \n\nLorem Ipsum";
      const ast = parseMarkdown(markdownString);

      // Возвратить AST клиенту
      return { content: ast };
    };
    ```

    ```svelte fileName="+page.svelte"
    <script lang="ts">
      import { MarkdownRenderer } from "svelte-intlayer/markdown";
      export let data;
    </script>

    <!-- 2. На клиенте: отрендерить AST напрямую без повторного анализа -->
    <MarkdownRenderer value={data.content} />
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    Angular SSR обычно разрешает данные на сервере во время первоначальной загрузки и выполняет гидратацию на клиенте. Вы можете использовать резолверы для передачи AST.

    ```typescript fileName="app.resolver.ts"
    import { Injectable } from "@angular/core";
    import { Resolve } from "@angular/router";
    import { parseMarkdown, type ParsedMarkdown } from "angular-intlayer/markdown";

    @Injectable({ providedIn: "root" })
    export class MarkdownResolver implements Resolve<ParsedMarkdown> {
      resolve(): ParsedMarkdown {
        const markdownString = "## My title \n\nLorem Ipsum";
        // 1. На сервере: преобразовать markdown в сериализуемое AST
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
        // 2. На клиенте: отрендерить AST напрямую без повторного анализа
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

Этот подход гарантирует, что логика анализа Markdown полностью выполняется на сервере, что значительно сокращает время выполнения на стороне клиента и повышает скорость первоначальной гидратации.

## Справочник по опциям

Эти параметры могут быть переданы в `MarkdownProvider`, `MarkdownRenderer`, `useMarkdownRenderer` и `renderMarkdown`.

| Option                | Type        | Default | Описание                                                                                   |
| :-------------------- | :---------- | :------ | :----------------------------------------------------------------------------------------- |
| `forceBlock`          | `boolean`   | `false` | Принудительно оборачивает вывод в блочный элемент (например, `<div>`).                     |
| `forceInline`         | `boolean`   | `false` | Принудительно оборачивает вывод во встроенный элемент (например, `<span>`).                |
| `tagfilter`           | `boolean`   | `true`  | Включает фильтр тегов GitHub для повышения безопасности путем удаления опасных тегов HTML. |
| `preserveFrontmatter` | `boolean`   | `false` | Если `true`, начальный мета-блок (frontmatter) в строке Markdown не будет удален.          |
| `components`          | `Overrides` | `{}`    | Карта HTML-тегов в пользовательские компоненты (например, `{ h1: MyHeading }`).            |
| `wrapper`             | `Component` | `null`  | Пользовательский компонент для обертывания отрендеренного Markdown.                        |
| `renderMarkdown`      | `Function`  | `null`  | Пользовательская функция рендеринга для полной замены компилятора Markdown по умолчанию.   |

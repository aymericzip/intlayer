---
createdAt: 2025-02-07
updatedAt: 2026-01-22
title: Markdown
description: Дізнайтеся, як оголошувати та використовувати контент Markdown на вашому багатомовному веб-сайті за допомогою Intlayer. Дотримуйтесь кроків у цій онлайн-документації, щоб легко інтегрувати Markdown у ваш проєкт.
keywords:
  - Markdown
  - Інтернаціоналізація
  - Документація
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
    changes: Додано MarkdownRenderer / useMarkdownRenderer / утиліту renderMarkdown та опцію forceInline
  - version: 8.0.0
    date: 2026-01-18
    changes: Автоматичне оформлення контенту markdown, підтримка MDX та SSR
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Markdown / Форматований текст

Intlayer підтримує контент rich text, визначений за допомогою синтаксису Markdown. Це дозволяє легко писати та підтримувати контент із багатим форматуванням, таким як блоги, статті та інше.

## Як працює Markdown

Intlayer v8 інтелектуально виявляє синтаксис Markdown у ваших рядках контенту. Якщо рядок ідентифіковано як Markdown, він автоматично перетворюється на вузол Markdown.

<Columns>
  <Column title="Поведінка v7 (ручне обгортання)">

    ```typescript fileName="markdownDictionary.content.ts"
    import { md } from "intlayer";

    export default {
      key: "app",
      content: {
        text: md("## Мій заголовок \n\nLorem Ipsum"),
      },
    };
    ```

  </Column>
  <Column title="Поведінка v8 (автоматичне виявлення)">

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Увімкнути автоматичне виявлення контенту Markdown - Можна встановити глобально в intlayer.config.ts
      content: {
        text: "## Мій заголовок \n\nLorem Ipsum",
      },
    };
    ```

  </Column>
</Columns>

---

## Частина 1: Оголошення контенту Markdown

Ви можете оголосити контент Markdown за допомогою функції `md` або просто як рядок (якщо він містить синтаксис Markdown).

<Tabs>
  <Tab label="Ручне обгортання">
    Використовуйте функцію `md` для явного оголошення контенту Markdown. Це корисно, якщо ви хочете переконатися, що рядок розглядається як Markdown, навіть якщо він не містить очевидного синтаксису.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, type Dictionary } from "intlayer";

    const markdownDictionary = {
      key: "app",
      content: {
        myMarkdownContent: md("## Мій заголовок \n\nLorem Ipsum"),
      },
    } satisfies Dictionary;

    export default markdownDictionary;
    ```

  </Tab>
  <Tab label="Автоматичне виявлення">
    Якщо рядок містить загальні індикатори Markdown (наприклад, заголовки, списки, посилання тощо), Intlayer автоматично перетворить його.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Увімкнути автоматичне виявлення контенту Markdown - Можна встановити глобально в intlayer.config.ts
      content: {
        myMarkdownContent: "## Мій заголовок \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>
  <Tab label="Зовнішні файли">
    Імпортуйте файли `.md` безпосередньо за допомогою функції `file`.

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

## Частина 2: Відтворення Markdown

Відтворення може виконуватися автоматично системою контенту Intlayer або вручну за допомогою спеціалізованих інструментів.

### 1. Автоматичне відтворення (за допомогою `useIntlayer`)

Коли ви отримуєте доступ до контенту через `useIntlayer`, вузли Markdown вже підготовлені до відтворення.

<Tabs group="framework">
  <Tab label="React / Next.js">
    Вузли Markdown можна відтворювати безпосередньо як JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

    Ви також можете надати локальні перевизначення для конкретних вузлів за допомогою методу `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
    })}
    ```

  </Tab>
  <Tab label="Vue">
    У Vue контент Markdown можна відтворити за допомогою вбудованого компонента `component` або безпосередньо як вузол.

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
    Svelte відтворює Markdown як рядок HTML за замовчуванням. Використовуйте `{@html}` для його відображення.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myMarkdownContent}
    ```

  </Tab>
  <Tab label="Preact">
    Preact підтримує вузли Markdown безпосередньо в JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid">
    Solid підтримує вузли Markdown безпосередньо в JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular">
    Angular використовує директиву `[innerHTML]` для відтворення контенту Markdown.

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

    Ви також можете надати локальні перевизначення для конкретних вузлів за допомогою методу `.use()`:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

  </Tab>
</Tabs>

### 2. Ручне відтворення та розширені інструменти

Якщо вам потрібно відтворити сирі рядки Markdown або мати більше контролю над процесом відтворення, використовуйте наступні інструменти.

<Tabs group="framework">
  <Tab label="React / Next.js">
  
    #### Компонент `<MarkdownRenderer />`

    Відтворіть рядок Markdown із конкретними параметрами.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# Мій заголовок"}
    </MarkdownRenderer>
    ```

    #### Хук `useMarkdownRenderer()`

    Отримайте попередньо налаштовану функцію рендерера.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# Мій заголовок");
    ```

    #### Утиліта `renderMarkdown()`
    Автономна утиліта для відтворення поза компонентами.

    ```tsx
    import { renderMarkdown } from "react-intlayer";

    const jsx = renderMarkdown("# Мій заголовок", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue">

    #### Компонент `<MarkdownRenderer />`

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# Мій заголовок" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte">

    #### Компонент `<MarkdownRenderer />`

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer";
    </script>

    <MarkdownRenderer forceBlock={true} value="# Мій заголовок" />
    ```

    #### Хук `useMarkdownRenderer()`

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# Мій заголовок")}
    ```

    #### Утиліта `renderMarkdown()`

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer";
    </script>

    {@html renderMarkdown("# Мій заголовок")}
    ```

  </Tab>
  <Tab label="Preact">
    #### Компонент `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# Мій заголовок"}
    </MarkdownRenderer>
    ```

    #### Хук `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# Мій заголовок")}</div>;
    ```

    #### Утиліта `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "preact-intlayer";

    return <div>{renderMarkdown("# Мій заголовок")}</div>;
    ```

  </Tab>
  <Tab label="Solid">
    #### Компонент `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# Мій заголовок"}
    </MarkdownRenderer>
    ```

    #### Хук `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# Мій заголовок")}</div>;
    ```

    #### Утиліта `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "solid-intlayer";

    return <div>{renderMarkdown("# Мій заголовок")}</div>;
    ```

  </Tab>
  <Tab label="Angular">
    #### Сервіс `IntlayerMarkdownService`
    Відтворіть рядок Markdown за допомогою сервісу.

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

## Глобальна конфігурація за допомогою `MarkdownProvider`

Ви можете налаштувати відтворення Markdown глобально для всього застосунку. Це дозволяє уникнути передачі однакових пропсів кожному рендереру.

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

## Довідник опцій

Ці опції можна передавати в `MarkdownProvider`, `MarkdownRenderer`, `useMarkdownRenderer` та `renderMarkdown`.

| Опція                 | Тип         | Типово  | Опис                                                                                       |
| :-------------------- | :---------- | :------ | :----------------------------------------------------------------------------------------- |
| `forceBlock`          | `boolean`   | `false` | Змушує вивід бути загорнутим у елемент блочного рівня (наприклад, `<div>`).                |
| `forceInline`         | `boolean`   | `false` | Змушує вивід бути загорнутим у рядковий елемент (наприклад, `<span>`).                     |
| `tagfilter`           | `boolean`   | `true`  | Вмикає фільтр тегів GitHub для підвищення безпеки шляхом видалення небезпечних HTML-тегів. |
| `preserveFrontmatter` | `boolean`   | `false` | Якщо `true`, frontmatter на початку рядка Markdown не буде видалено.                       |
| `components`          | `Overrides` | `{}`    | Мапа HTML-тегів до користувацьких компонентів (наприклад, `{ h1: MyHeading }`).            |
| `wrapper`             | `Component` | `null`  | Користувацький компонент для обгортання відтвореного Markdown.                             |
| `renderMarkdown`      | `Function`  | `null`  | Користувацька функція відтворення для повної заміни стандартного компілятора Markdown.     |

---
createdAt: 2025-02-07
updatedAt: 2026-05-19
title: Markdown
description: Дізнайтеся, як оголошувати та використовувати вміст Markdown на вашому багатомовному веб-сайті за допомогою Intlayer. Дотримуйтесь інструкцій у цій онлайн-документації, щоб безперешкодно інтегрувати Markdown у ваш проект.
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
  - version: 8.10.0
    date: 2026-05-19
    changes: "Додано підтримку файлів `.content.md`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "Додано об'єкт плагіна `intlayerMarkdown`; використовуйте `app.use(intlayerMarkdown)` замість `app.use(installIntlayerMarkdown)`"
  - version: 8.5.0
    date: 2026-03-24
    changes: "Імпорт переміщено з `{{framework}}-intlayer` до `{{framework}}-intlayer/markdown`"
  - version: 8.0.0
    date: 2026-01-22
    changes: "Додано утиліту MarkdownRenderer / useMarkdownRenderer / renderMarkdown та опцію forceInline"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Автоматичне оформлення вмісту markdown, підтримка MDX та SSR"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Ініціалізація історії"
---

# Markdown / Вміст форматованого тексту

Intlayer підтримує вміст форматованого тексту, визначений за допомогою синтаксису Markdown. Це дозволяє легко створювати та підтримувати форматований вміст, такий як блоги, статті тощо.

## Оголошення вмісту Markdown

Ви можете оголосити вміст Markdown за допомогою функції `md` або просто як рядок (якщо він містить синтаксис Markdown).

<Tabs>
  <Tab label=".content.md" value=".content.md">
    Починаючи з версії `8.10.0`, ви можете оголошувати вміст Markdown безпосередньо у файлах `.content.md`. Intlayer автоматично виявлятиме та аналізуватиме вміст Markdown.

    ```md fileName="markdown-file.en.content.md"
    ---
    key: my-markdown-content
    description: Мій вміст
    locale: en
    ---

    # Мій вміст

    Ось приклад вмісту markdown
    ```

    Поле front-matter `locale` визначає локаль вмісту. Воно є необов'язковим. Якщо його не вказано, Intlayer використовуватиме локаль за замовчуванням, яка також слугуватиме резервною, якщо переклад для конкретної локалі недоступний.

    Приклад структури файлів:

    ```text
    content/
    ├── en/
    │   └── markdown-file.en.content.md
    ├── fr/
    │   └── markdown-file.fr.content.md
    └── es/
        └── markdown-file.es.content.md
    ```

    У front-matter ви можете додати будь-які властивості, визначені у [Визначенні словника](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md)

  </Tab>
  <Tab label="Ручне обгортання" value="manual-wrapping">
    Використовуйте функцію `md` для явного оголошення вмісту Markdown. Це корисно, якщо ви хочете переконатися, що рядок обробляється як Markdown, навіть якщо він не містить очевидного синтаксису.

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
  <Tab label="Зовнішні файли" value="external-files">
    Імпортуйте файли `.md` безпосередньо за допомогою функції `file`.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: md(file("./myMarkdown.en.md")),
          uk: md(file("./myMarkdown.uk.md")),
        }),
      },
    };
    ```

  </Tab>

  <Tab label="Автоматичне виявлення" value="automatic-detection">
    Якщо рядок містить типові індикатори Markdown (наприклад, заголовки, списки, посилання тощо), Intlayer автоматично перетворить його.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Увімкнути автоматичне виявлення вмісту Markdown - Можна налаштувати глобально в intlayer.config.ts
      content: {
        myMarkdownContent: "## Мій заголовок \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>
</Tabs>

---

## Рендеринг Markdown

Intlayer надає два незалежні способи рендерингу Markdown:

1. **Через `useIntlayer`**
   — Intlayer автоматично перетворює вузол `md` у нативний вихідний формат фреймворку (JSX, VNode, HTML-рядок).
   - Frontmatter аналізується та надається як `.metadata`. Ви можете перевизначити рендеринг на двох рівнях — глобально за допомогою `MarkdownProvider` (або еквівалента фреймворку) та локально для кожного вузла за допомогою `.use()`. Обидва підходи можна комбінувати; `.use()` має пріоритет над `MarkdownProvider`, який має пріоритет над поведінкою за замовчуванням.

2. **Допоміжні утиліти** — `<MarkdownRenderer />`, `useMarkdownRenderer()` та `renderMarkdown()` є самостійними інструментами, які приймають **тільки необроблені рядки Markdown**. Вони не залежать від `useIntlayer` і не працюють з оформленими вузлами, які він повертає.

Рендеринг Markdown підтримує **MDX** — використовуйте будь-який компонент JSX/фреймворку за назвою безпосередньо у вашому Markdown.

### 1. Автоматичний рендеринг (через `useIntlayer`)

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    Вузли Markdown можна рендерити безпосередньо як JSX.

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

    > Якщо `MarkdownProvider` відсутній, Intlayer рендеритиме markdown, використовуючи стандартний парсер Markdown у JSX.

    Ви також можете надати локальні перевизначення для конкретних вузлів за допомогою методу `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Ви можете отримати Markdown як рядок:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    І ви можете отримати доступ до метаданих markdown наступним чином:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    У Vue вміст Markdown можна рендерити за допомогою вбудованого тегу `component` або безпосередньо як вузол.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myMarkdownContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myMarkdownContent" />
    </template>
    ```

    Глобальне налаштування через плагін `intlayerMarkdown` (підтримує власні компоненти MDX):

    ```ts fileName="main.ts"
    import { intlayerMarkdown } from "vue-intlayer/markdown";

    app.use(intlayerMarkdown, {
      components: {
        h1: (props) => h('h1', { style: { color: 'green' } }, props.children),
        MyButton: (props) => h('button', props), // MDX-компонент
      },
    });
    ```

    > Якщо плагін `intlayerMarkdown` не встановлено, Intlayer рендеритиме за допомогою компілятора за замовчуванням.

    Ви також можете надати локальні перевизначення для конкретних вузлів за допомогою методу `.use()`:

    ```vue
    <component :is="myMarkdownContent.use({
      h1: (props) => h('h1', { style: { color: 'red' } }, props.children),
    })" />
    ```

    Ви можете отримати Markdown як рядок:

    ```vue
    {{ myMarkdownContent.value }}
    {{ String(myMarkdownContent) }}
    {{ myMarkdownContent.toString() }}
    ```

    І ви можете отримати доступ до метаданих markdown наступним чином:

    ```vue
    <component :is="myMarkdownContent.metadata" />
    <component :is="myMarkdownContent.metadata.title" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte за замовчуванням рендерить Markdown як HTML-рядок. Використовуйте `{@html}`, щоб його відрендерити.

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

    > Якщо `MarkdownProvider` відсутній, Intlayer рендеритиме markdown за допомогою компілятора за замовчуванням.

    Ви також можете надати локальні перевизначення для конкретних вузлів за допомогою методу `.use()`:

    ```svelte
    {@html $content.myMarkdownContent.use({ ... })}
    ```

    Ви можете отримати Markdown як рядок:

    ```svelte
    {$content.myMarkdownContent.value}
    {String($content.myMarkdownContent)}
    {$content.myMarkdownContent.toString()}
    ```

    І ви можете отримати доступ до метаданих markdown наступним чином:

    ```svelte
    {$content.myMarkdownContent.metadata}
    {$content.myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact підтримує вузли Markdown безпосередньо у JSX.

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
          MyButton: (props) => <button {...props} />, // MDX-компонент
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Якщо `MarkdownProvider` відсутній, Intlayer рендеритиме markdown, використовуючи стандартний парсер Markdown у JSX.

    Ви також можете надати локальні перевизначення для конкретних вузлів за допомогою методу `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    Ви можете отримати Markdown як рядок:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    І ви можете отримати доступ до метаданих markdown наступним чином:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid підтримує вузли Markdown безпосередньо у JSX.

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
          MyButton: (props) => <button {...props} />, // MDX-компонент
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > Якщо `MarkdownProvider` відсутній, Intlayer рендеритиме markdown, використовуючи стандартний парсер Markdown у JSX.

    Ви також можете надати локальні перевизначення для конкретних вузлів за допомогою методу `.use()`:

    ```tsx
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
    })}
    ```

    Ви можете отримати Markdown як рядок:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    І ви можете отримати доступ до метаданих markdown наступним чином:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular використовує директиву `[innerHTML]` для рендерингу вмісту Markdown.

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

    > Якщо провайдер IntlayerMarkdown не налаштовано, Intlayer рендеритиме за допомогою компілятора за замовчуванням.

    Ви також можете надати локальні перевизначення для конкретних вузлів за допомогою методу `.use()`:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

    Ви можете отримати Markdown як рядок:

    ```typescript
    content().myMarkdownContent.value
    String(content().myMarkdownContent)
    content().myMarkdownContent.toString()
    ```

    І ви можете отримати доступ до метаданих markdown наступним чином:

    ```typescript
    content().myMarkdownContent.metadata
    content().myMarkdownContent.metadata.title
    ```

  </Tab>
</Tabs>

### 2. Допоміжні утиліти (тільки рядки Markdown)

Ці утиліти рендерять **тільки необроблені рядки Markdown** і не залежать від `useIntlayer`. Використовуйте їх, коли вам потрібно відрендерити Markdown з джерел, відмінних від ваших словників.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
  
    #### Компонент `<MarkdownRenderer />`

    Рендерить рядок Markdown з певними опціями.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# Мій Заголовок"}
    </MarkdownRenderer>
    ```

    #### Хук `useMarkdownRenderer()`

    Отримайте попередньо налаштовану функцію рендерингу.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# Мій Заголовок");
    ```

    #### Утиліта `renderMarkdown()`
    Окрема утиліта для рендерингу поза компонентами.

    ```tsx
    import { renderMarkdown } from "react-intlayer/markdown";

    const jsx = renderMarkdown("# Мій Заголовок", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### Компонент `<MarkdownRenderer />`

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer/markdown";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# Мій Заголовок" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    #### Компонент `<MarkdownRenderer />`

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer/markdown";
    </script>

    <MarkdownRenderer forceBlock={true} value="# Мій Заголовок" />
    ```

    #### Хук `useMarkdownRenderer()`

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer/markdown";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# Мій Заголовок")}
    ```

    #### Утиліта `renderMarkdown()`

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer/markdown";
    </script>

    {@html renderMarkdown("# Мій Заголовок")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### Компонент `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# Мій Заголовок"}
    </MarkdownRenderer>
    ```

    #### Хук `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# Мій Заголовок")}</div>;
    ```

    #### Утиліта `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "preact-intlayer/markdown";

    return <div>{renderMarkdown("# Мій Заголовок")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### Компонент `<MarkdownRenderer />`

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# Мій Заголовок"}
    </MarkdownRenderer>
    ```

    #### Хук `useMarkdownRenderer()`

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# Мій Заголовок")}</div>;
    ```

    #### Утиліта `renderMarkdown()`

    ```tsx
    import { renderMarkdown } from "solid-intlayer/markdown";

    return <div>{renderMarkdown("# Мій Заголовок")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### Сервіс `IntlayerMarkdownService`
    Рендерить рядок Markdown за допомогою сервісу.

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

## Глобальне налаштування за допомогою `MarkdownProvider`

`MarkdownProvider` (або його еквівалент у фреймворку) налаштовує конвеєр рендерингу Markdown для всього вашого додатку. Це стосується як автоматичного рендерингу `useIntlayer`, так і допоміжних утиліт. Налаштування, вказані тут, є значеннями за замовчуванням — `.use()` перевизначає їх на рівні вузла.

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

    > Підтримується MDX — будь-яка назва компонента, яка використовується всередині вашого Markdown (наприклад, `<MyCustomJSXComponent />`), розпізнається відповідно до карти `components`.

    Ви також можете використовувати власний рендерер markdown:

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

    > Динамічний імпорт вашого рендерера Markdown — чудовий спосіб зменшити розмір бандлу вашого додатка.

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

    Ви також можете використовувати власний рендерер markdown:

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

    > Динамічний імпорт вашого рендерера Markdown — чудовий спосіб зменшити розмір бандлу вашого додатка.

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

    Ви також можете використовувати власний рендерер markdown:

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

    > Динамічний імпорт вашого рендерера Markdown — чудовий спосіб зменшити розмір бандлу вашого додатка.

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

    Ви також можете використовувати власний рендерер markdown:

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

    > Динамічний імпорт вашого рендерера Markdown — чудовий спосіб зменшити розмір бандлу вашого додатка.

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

    Ви також можете використовувати власний рендерер markdown:

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

    > Динамічний імпорт вашого рендерера Markdown — чудовий спосіб зменшити розмір бандлу вашого додатка.

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

    > Динамічний імпорт вашого рендерера Markdown — чудовий спосіб зменшити розмір бандлу вашого додатка.

  </Tab>
</Tabs>

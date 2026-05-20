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

---

## Рендеринг Markdown

Intlayer предоставляет два независимых способа рендеринга Markdown:

1. **Через `useIntlayer`**
   — Intlayer автоматически преобразует узел `md` в нативный вывод фреймворка (JSX, VNode, HTML-строка).
   - Frontmatter парсится и предоставляется как `.metadata`. Вы можете переопределить рендеринг на двух уровнях — глобально с помощью `MarkdownProvider` (или эквивалента для вашего фреймворка) и локально для каждого узла с помощью `.use()`. Оба метода можно комбинировать; `.use()` имеет приоритет над `MarkdownProvider`, который, в свою очередь, имеет приоритет над поведением по умолчанию.

2. **Вспомогательные утилиты** — `<MarkdownRenderer />`, `useMarkdownRenderer()` и `renderMarkdown()` являются автономными инструментами, которые принимают **только необработанные строки Markdown (raw strings)**. Они не зависят от `useIntlayer` и не работают с декорированными узлами, которые он возвращает.

Рендеринг Markdown поддерживает **MDX** — используйте любой JSX компонент или компонент фреймворка по имени прямо в вашем Markdown.

### 1. Автоматический рендеринг (через `useIntlayer`)

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
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

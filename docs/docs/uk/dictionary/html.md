---
createdAt: 2026-01-20
updatedAt: 2026-01-22
title: Вміст HTML
description: Дізнайтеся, як оголошувати та використовувати HTML-контент із користувацькими компонентами в Intlayer. Дотримуйтесь цієї документації, щоб вбудувати багатий вміст, схожий на HTML, з динамічною заміною компонентів у вашому інтернаціоналізованому проєкті.
keywords:
  - HTML
  - Користувацькі компоненти
  - Багатий вміст
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - concept
  - content
  - html
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Додано HTMLRenderer, useHTMLRenderer та утиліту renderHTML
  - version: 8.0.0
    date: 2026-01-20
    changes: Додано підтримку парсингу HTML
---

# Вміст HTML / HTML в Intlayer

Intlayer підтримує HTML-контент, що дозволяє вбудовувати в словники насичений, структурований вміст. Цей вміст може відображатися за допомогою стандартних HTML-тегів або замінюватися на користувацькі компоненти під час виконання.

## Як працює HTML

Intlayer v8 автоматично виявляє HTML-теги в рядках вмісту. Якщо рядок ідентифіковано як HTML (містить теги), він автоматично перетворюється на HTML-вузол.

<Columns>
<Column title="Поведінка v7 (ручне обгортання)">

```typescript fileName="htmlDictionary.content.ts"
import { html } from "intlayer";

export default {
  key: "app",
  content: {
    text: html("<p>Hello <strong>World</strong></p>"),
  },
};
```

</Column>
<Column title="Поведінка v8 (автоматичне виявлення)">

```typescript fileName="htmlDictionary.content.ts"
export default {
  key: "app",
  content: {
    text: "<p>Привіт <strong>Світ</strong></p>",
  },
};
```

</Column>
</Columns>

---

## Оголошення HTML-контенту

Ви можете оголосити HTML-контент, використовуючи функцію `html` або просто як рядок.

<Tabs>
  <Tab label="Ручне обгортання">
    Використовуйте функцію `html` для явного оголошення HTML-контенту. Це гарантує правильне відображення стандартних тегів навіть якщо автоматичне виявлення вимкнене.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, type Dictionary } from "intlayer";

    const htmlDictionary = {
      key: "app",
      content: {
        myHtmlContent: html("<p>Привіт <strong>Світ</strong></p>"),
      },
    } satisfies Dictionary;

    export default htmlDictionary;
    ```

  </Tab>
  <Tab label="Автоматичне виявлення">
    Якщо рядок містить звичайні HTML-теги (наприклад, `<p>`, `<div>`, `<strong>` тощо), Intlayer автоматично перетворює його.

    ```typescript fileName="htmlDictionary.content.ts"
    export default {
      key: "app",
      content: {
        myHtmlContent: "<p>Привіт <strong>Світ</strong></p>",
      },
    };
    ```

  </Tab>
  <Tab label="Зовнішні файли">
    Імпортуйте HTML-контент з файлів. Зауважте, що наразі функція `file()` повертає рядок, який буде автоматично визначено як HTML, якщо він містить теги.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          uk: html(file("./content.uk.html")),
          en: html(file("./content.en.html")),
          fr: html(file("./content.fr.html")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

---

## Відтворення HTML

Відтворення може виконуватися автоматично за допомогою системи контенту Intlayer або вручну за допомогою спеціалізованих інструментів.

### Автоматичне відтворення (за допомогою `useIntlayer`)

Коли ви отримуєте контент через `useIntlayer`, HTML-вузли вже підготовлені до відображення.

<Tabs group="framework">
  <Tab label="React / Next.js">
    HTML-вузли можна відображати безпосередньо як JSX. Стандартні теги працюють автоматично.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

    Використовуйте метод `.use()` щоб передати власні компоненти або перевизначити теги:

    ```tsx
    {myHtmlContent.use({
      p: (props) => <p className="prose" {...props} />,
      CustomLink: ({ children }) => <a href="/details">{children}</a>,
    })}
    ```

  </Tab>
  <Tab label="Vue">
    У Vue HTML-контент можна відобразити за допомогою вбудованого компонента `component`.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myHtmlContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myHtmlContent" />
    </template>
    ```

    Використовуйте `.use()` для перевизначень:
    ```vue
    <component :is="myHtmlContent.use({ h1: 'h2' })" />
    ```

  </Tab>
  <Tab label="Svelte">
    Svelte відображає HTML-вузли як рядки. Використайте `{@html}` для їхнього відображення.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact">
    Preact підтримує HTML-вузли безпосередньо в JSX.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
</Tabs>

## Глобальна конфігурація за допомогою `HTMLProvider`

Ви можете налаштувати рендеринг HTML глобально для всього застосунку. Це ідеально підходить для визначення кастомних компонентів, які мають бути доступні в усьому HTML-контенті.

<Tabs group="framework">
  <Tab label="React / Next.js">
  
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
  <Tab label="Vue">
  
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
  <Tab label="Svelte">
   
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
  <Tab label="Preact">
   
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
</Tabs>

---

### Ручний рендеринг і розширені інструменти

Якщо потрібно рендерити сирі HTML-рядки або мати більший контроль над мапуванням компонентів, використовуйте такі інструменти.

<Tabs group="framework">
  <Tab label="React / Next.js">
    #### Компонент `<HTMLRenderer />`
    Відрендеруйте HTML-рядок із конкретними компонентами.

    ```tsx
    import { HTMLRenderer } from "react-intlayer";

    <HTMLRenderer components={{ p: MyCustomP }}>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### Хук `useHTMLRenderer()`

    Отримайте попередньо налаштовану функцію рендерера.

    ```tsx
    import { useHTMLRenderer } from "react-intlayer";

    const renderHTML = useHTMLRenderer({
      components: { strong: (props) => <strong {...props} className="text-red-500" /> }
    });

    return renderHTML("<p>Hello <strong>World</strong></p>");
    ```

    #### Утиліта `renderHTML()`

    Самостійна утиліта для рендерингу поза межами компонентів.

    ```tsx
    import { renderHTML } from "react-intlayer";

    const jsx = renderHTML("<p>Hello</p>", { components: { p: 'div' } });
    ```

  </Tab>
  <Tab label="Vue">
   
    #### Компонент `<HTMLRenderer />`
   
    ```vue
    <script setup>
    import { HTMLRenderer } from "vue-intlayer";
    </script>

    <template>
      <HTMLRenderer content="<p>Hello World</p>" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte">
  
    #### Компонент `<HTMLRenderer />`
   
    ```svelte
    <script lang="ts">
    import { HTMLRenderer } from "svelte-intlayer";
    </script>

    <HTMLRenderer value="<p>Hello World</p>" />
    ```

  </Tab>
  <Tab label="Preact">
   
    #### `<HTMLRenderer />` Компонент
   
    ```tsx
    import { HTMLRenderer } from "preact-intlayer";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

  </Tab>
</Tabs>

---

## Довідник опцій

Ці параметри можна передавати в `HTMLProvider`, `HTMLRenderer`, `useHTMLRenderer` та `renderHTML`.

| Опція        | Тип                   | Значення за замовчуванням | Опис                                                                                                              |
| :----------- | :-------------------- | :------------------------ | :---------------------------------------------------------------------------------------------------------------- |
| `components` | `Record<string, any>` | `{}`                      | Мапа HTML-тегів або імен користувацьких компонентів у відповідні компоненти.                                      |
| `renderHTML` | `Function`            | `null`                    | Користувацька функція рендерингу для повної заміни стандартного HTML-парсера (тільки для провайдерів Vue/Svelte). |

> Примітка: Для React та Preact стандартні HTML-теги додаються автоматично. Вам потрібно передавати проп `components` лише якщо ви хочете перевизначити їх або додати користувацькі компоненти.

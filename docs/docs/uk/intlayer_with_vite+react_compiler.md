---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Vite та React i18n - Перетворіть існуючий додаток на багатомовний (посібник з i18n 2026)
description: Дізнайтеся, як зробити ваш існуючий додаток Vite та React багатомовним за допомогою Intlayer Compiler. Дотримуйтесь документації, щоб інтернаціоналізувати (i18n) та перекласти його за допомогою ШІ.
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Vite
  - React
  - Компілятор
  - ШІ
slugs:
  - doc
  - середовище
  - vite-та-react
  - компілятор
  - ШІ
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: Початковий реліз
---

# Як зробити багатомовним (i18n) існуючий додаток Vite та React згодом (посібник з i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Відео" value="video">
  
<iframe title="Найкраще рішення i18n для Vite та React? Відкрийте для себе Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Код" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox - Як інтернаціоналізувати ваш додаток за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Дивіться [Шаблон додатка](https://github.com/aymericzip/intlayer-vite-react-template) на GitHub.

## Зміст

<TOC/>

## Чому важко інтернаціоналізувати існуючий додаток?

Якщо ви коли-небудь пробували додати підтримку кількох мов у додаток, створений лише для однієї, ви знаєте цей біль. Це не просто «важко» — це нудно. Вам доводиться перебирати кожен окремий файл, вишукувати кожен рядок тексту і переносити їх в окремі файли словників.

Потім настає ризикована частина: заміна всього цього тексту програмними хуками без порушення макета чи логіки. Це та робота, яка зупиняє розробку нових функцій на тижні і здається нескінченним рефакторингом.

## Що таке Intlayer Compiler?

**Intlayer Compiler** був створений, щоб пропустити цю ручну рутинну роботу. Замість того, щоб ви вручну витягували рядки, компілятор робить це за вас. Сканує ваш код, знаходить текст і використовує ШІ для створення словників у фоновому режимі.
Потім він змінює ваш код під час збірки, щоб вставити необхідні хуки i18n. По суті, ви продовжуєте писати свій додаток так, ніби він одномовний, а компілятор автоматично обробляє багатомовну трансформацію.

> Документація компілятора: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md)

### Обмеження

Оскільки компілятор виконує аналіз і трансформацію кода (вставку хуків і генерацію словників) під час **компіляції**, це може **сповільнити процес збірки** вашого додатка.

Щоб пом'якшити цей вплив під час розробки, ви можете налаштувати компілятор для роботи в режимі [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) або вимкнути його, коли він не потрібен.

---

## Покроковий посібник з налаштування Intlayer у додатку Vite та React

### Крок 1: Встановлення залежностей

Встановіть необхідні пакети за допомогою npm:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**
  Основний пакет, який надає інструменти інтернаціоналізації для керування конфігурацією, перекладу, [декларації вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), транспіляції та [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **react-intlayer**
  Пакет, який інтегрує Intlayer з додатком React. Він надає провайдери контексту та хуки для інтернаціоналізації React.

- **vite-intlayer**
  Включає плагін Vite для інтеграції Intlayer з [бандлером Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а також проміжне програмне забезпечення для визначення бажаної мови користувача, керування файлами cookie та обробки перенаправлення URL-адрес.

### Крок 2: Налаштування вашого проєкту

Створіть файл конфігурації, щоб налаштувати мови вашого додатка:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.UKRAINIAN, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  compiler: {
    enabled: true, // Можна встановити 'build-only', щоб обмежити вплив на режим розробки
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Без префікса comp-
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Цей додаток — це карта", // Примітка: ви можете налаштувати цей опис додатка
  },
};

export default config;
```

> **Примітка**: Переконайтеся, що ваш `OPEN_AI_API_KEY` встановлений у змінних середовища.

> Через цей файл конфігурації ви можете налаштувати локалізовані URL-адреси, перенаправлення проміжного програмного забезпечення, назви файлів cookie, розташування та розширення ваших декларацій вмісту, вимкнути логи Intlayer у консолі тощо. Повний список доступних параметрів дивіться в [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

### Крок 3: Інтеграція Intlayer у вашу конфігурацію Vite

Додайте плагін intlayer у вашу конфігурацію.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerCompiler } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerCompiler()],
});
```

> Плагін Vite `intlayer()` використовується для інтеграції Intlayer з Vite. Він забезпечує збірку файлів декларації вмісту та відстежує їх у режимі розробки. Він визначає змінні середовища Intlayer у додатку Vite. Крім того, він надає аліаси для оптимізації продуктивності.

> Плагін Vite `intlayerCompiler()` використовується для витягування вмісту з компонентів і запису файлів `.content`.

### Крок 4: Компіляція вашого коду

Просто пишіть свої компоненти з жорстко закодованими рядками вашою мовою за замовчуванням. Компілятор зробить усе інше.

Приклад того, як може виглядати ваша сторінка:

<Tabs>
 <Tab value="Код">

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
 <Tab value="Результат">

```ts fileName="i18n/app-content.content.json"
{
  key: "app-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        viteLogo: "Vite logo",
        reactLogo: "React logo",
        title: "Vite + React",
        countButton: "count is",
        editMessage: "Edit",
        hmrMessage: "and save to test HMR",
        readTheDocs: "Click on the Vite and React logos to learn more",
      },
      uk: {
        viteLogo: "Логотип Vite",
        reactLogo: "Логотип React",
        title: "Vite + React",
        countButton: "рахунок дорівнює",
        editMessage: "Редагувати",
        hmrMessage: "і зберегти для перевірки HMR",
        readTheDocs: "Натисніть на логотипи Vite та React, щоб дізнатися більше",
      },
    }
  }
}
```

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app-content");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.countButton} {count}
        </button>
        <p>
          {content.editMessage} <code>src/App.tsx</code> {content.hmrMessage}
        </p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
</Tabs>

- **`IntlayerProvider`** використовується для надання локалі вкладеним компонентам.

### (Опціонально) Крок 6: Зміна мови вашого вмісту

Щоб змінити мови вашого вмісту, ви можете використовувати функцію `setLocale`, яку надає хук `useLocale`. Ця функція дозволяє встановити локаль додатка та відповідним чином оновити вміст.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Змінити мову на англійську
    </button>
  );
};
```

> Щоб дізнатися більше про хук `useLocale`, зверніться до [документації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md).

### Конфігурація Git

Рекомендується ігнорувати файли, створені Intlayer. Це дозволяє уникнути їхнього коміту у ваш Git-репозиторій.

Для цього ви можете додати наступні інструкції до вашого файлу `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, створені Intlayer
.intlayer
```

### Розширення VS Code

Щоб покращити ваш досвід розробки з Intlayer, ви можете встановити офіційне **розширення Intlayer для VS Code**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудований попередній перегляд** перекладеного вмісту.
- **Швидкі дії** для легкого створення та оновлення перекладів.

Для отримання додаткової інформації про те, як користуватися розширенням, зверніться до [документації розширення Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

### Йти далі

Щоб піти далі, ви можете впровадити [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) або винести свій вміст назовні за допомогою [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

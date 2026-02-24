---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Vite и React i18n - Превратите существующее приложение в многоязычное (руководство по i18n 2026)
description: Узнайте, как сделать ваше существующее приложение Vite и React многоязычным с помощью Intlayer Compiler. Следуйте документации, чтобы интернационализировать (i18n) и перевести его с помощью ИИ.
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Vite
  - React
  - Компилятор
  - ИИ
slugs:
  - doc
  - environment
  - vite-and-react
  - compiler
  - AI
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: Первый выпуск
---

# Как сделать многоязычным (i18n) существующее приложение Vite и React впоследствии (руководство по i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Видео" value="video">
  
<iframe title="Лучшее решение i18n для Vite и React? Откройте для себя Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Код" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox - Как интернационализировать ваше приложение с помощью Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Посмотрите [шаблон приложения](https://github.com/aymericzip/intlayer-vite-react-template) на GitHub.

## Содержание

<TOC/>

## Почему сложно интернационализировать существующее приложение?

Если вы когда-либо пытались добавить несколько языков в приложение, созданное только для одного, вы знаете эту боль. Это не просто «сложно» — это утомительно. Вам приходится прочесывать каждый файл, выискивать каждую строку текста и переносить их в отдельные файлы словарей.

Затем наступает рискованная часть: замена всего этого текста программными хуками без нарушения верстки или логики. Это такая работа, которая останавливает разработку новых функций на недели и кажется бесконечным рефакторингом.

## Что такое Intlayer Compiler?

**Intlayer Compiler** был создан, чтобы пропустить эту рутинную ручную работу. Вместо того чтобы вы извлекали строки вручную, компилятор делает это за вас. Он сканирует ваш код, находит текст и использует ИИ для генерации словарей за кулисами.
Затем он изменяет ваш код во время сборки, чтобы внедрить необходимые хуки i18n. По сути, вы продолжаете писать свое приложение так, как если бы оно было одноязычным, а компилятор автоматически обрабатывает многоязычную трансформацию.

> Документация компилятора: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md

### Ограничения

Поскольку компилятор выполняет анализ и трансформацию кода (вставку хуков и генерацию словарей) во время **компиляции**, это может **замедлить процесс сборки** вашего приложения.

Чтобы смягчить это влияние во время разработки, вы можете настроить компилятор на запуск в режиме [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md) или отключить его, когда он не нужен.

---

## Пошаговое руководство по настройке Intlayer в приложении Vite и React

### Шаг 1: Установка зависимостей

Установите необходимые пакеты с помощью npm:

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
  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, перевода, [декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md), транспиляции и [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

- **react-intlayer**
  Пакет, интегрирующий Intlayer с приложением React. Он предоставляет провайдеры контекста и хуки для интернационализации React.

- **vite-intlayer**
  Включает плагин Vite для интеграции Intlayer с [бандлером Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а также промежуточное ПО для определения предпочтительной локали пользователя, управления куки и обработки перенаправления URL.

### Шаг 2: Настройка вашего проекта

Создайте конфигурационный файл для настройки языков вашего приложения:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  compiler: {
    enabled: true, // Можно установить значение 'build-only', чтобы ограничить влияние на режим разработки
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Без префикса comp-
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "This app is an map app", // Примечание: вы можете настроить описание этого приложения
  },
};

export default config;
```

> **Примечание**: Убедитесь, что у вас установлен `OPEN_AI_API_KEY` в переменных окружения.

> Через этот конфигурационный файл вы можете настроить локализованные URL-адреса, перенаправление middleware, имена куки, расположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Полный список доступных параметров см. в [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

### Шаг 3: Интеграция Intlayer в конфигурацию Vite

Добавьте плагин intlayer в вашу конфигурацию.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerCompiler } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerCompiler()],
});
```

> Плагин Vite `intlayer()` используется для интеграции Intlayer с Vite. Он обеспечивает сборку файлов декларации контента и отслеживает их в режиме разработки. Он определяет переменные окружения Intlayer в приложении Vite. Кроме того, он предоставляет псевдонимы для оптимизации производительности.

> Плагин Vite `intlayerCompiler()` используется для извлечения контента из компонентов и записи файлов `.content`.

### Шаг 4: Компиляция вашего кода

Просто пишите свои компоненты с жестко заданными строками на вашем языке по умолчанию. Компилятор позаботится об остальном.

Пример того, как может выглядеть ваша страница:

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
 <Tab value="Вывод">

```ts fileName="i18n/app-content.content.tsx"
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
      fr: {
        viteLogo: "Logo Vite",
        reactLogo: "Logo React",
        title: "Vite + React",
        countButton: "compte est",
        editMessage: "Modifier",
        hmrMessage: "et enregistrer pour tester HMR",
        readTheDocs: "Cliquez sur les logos Vite et React pour en savoir plus",
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

- **`IntlayerProvider`** используется для предоставления локали вложенным компонентам.

### (Опционально) Шаг 6: Изменение языка вашего контента

Чтобы изменить язык вашего контента, вы можете использовать функцию `setLocale`, предоставляемую хуком `useLocale`. Эта функция позволяет установить локаль приложения и соответствующим образом обновить контент.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

> Чтобы узнать больше о хуке `useLocale`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useLocale.md).

### Конфигурация Git

Рекомендуется игнорировать файлы, созданные Intlayer. Это позволит вам избежать их фиксации в вашем репозитории Git.

Чтобы сделать это, вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext fileName=".gitignore"
# Игнорировать файлы, созданные Intlayer
.intlayer
```

### Расширение VS Code

Для улучшения вашего опыта разработки с Intlayer вы можете установить официальное **расширение Intlayer VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение обеспечивает:

- **Автодополнение** ключей перевода.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенный предпросмотр** переведенного контента.
- **Быстрые действия** для легкого создания и обновления переводов.

Подробности о том, как использовать расширение, см. в [документации по расширению Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

### Идите дальше

Чтобы пойти дальше, вы можете внедрить [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынести свой контент с помощью [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

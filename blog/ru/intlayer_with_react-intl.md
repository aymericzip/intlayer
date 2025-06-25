---
blogName: intlayer_with_react-intl
url: /blog/intlayer-with-react-intl
githubUrl: https://github.com/aymericzip/intlayer/blob/main/blog/en/intlayer_with_react-intl.md
createdAt: 2025-01-02
updatedAt: 2025-01-02
title: Intlayer и react-intl
description: Интегрируйте Intlayer с react-intl для React-приложения
keywords:
  - react-intl
  - Intlayer
  - Интернационализация
  - Документация
  - Next.js
  - JavaScript
  - React
---

# React Internationalization (i18n) с **react-intl** и Intlayer

Этот гид показывает, как интегрировать **Intlayer** с **react-intl** для управления переводами в приложении React. Вы будете объявлять ваши переводимые данные с помощью Intlayer, а затем использовать эти сообщения с **react-intl**, популярной библиотекой из экосистемы [FormatJS](https://formatjs.io/docs/react-intl).

## Обзор

- **Intlayer** позволяет хранить переводы в **файлах декларации контента** уровня компонента (JSON, JS, TS и т.д.) внутри вашего проекта.
- **react-intl** предоставляет компоненты React и хуки (такие как `<FormattedMessage>` и `useIntl()`) для отображения локализованных строк.

Настраивая Intlayer на **экспорт** переводов в **формат, совместимый с react-intl**, вы можете автоматически **генерировать** и **обновлять** файлы сообщений, которые требуется `<IntlProvider>` (из react-intl).

---

## Почему использовать Intlayer с react-intl?

1. **Декларации контента на уровне компонента**  
   Файлы декларации контента Intlayer могут находиться рядом с вашими компонентами React, предотвращая «сиротские» переводы, если компоненты перемещаются или удаляются. Например:

   ```bash
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts   # Декларация контента Intlayer
               └── index.tsx          # Компонент React
   ```

2. **Централизованные переводы**  
   Каждый файл декларации контента собирает все переводы, необходимые для компонента. Это особенно полезно в проектах TypeScript: отсутствующие переводы можно выявить во время **компиляции**.

3. **Автоматическая сборка и регенерация**  
   Каждый раз, когда вы добавляете или обновляете переводы, Intlayer регенерирует файлы сообщений JSON. Затем вы можете передать их в `<IntlProvider>` от react-intl.

---

## Установка

В типичном проекте React установите следующее:

```bash
# с npm
npm install intlayer react-intl

# с yarn
yarn add intlayer react-intl

# с pnpm
pnpm add intlayer react-intl
```

### Почему эти пакеты?

- **intlayer**: Основная CLI и библиотека, которая сканирует декларации контента, объединяет их и создает выходные словари.
- **react-intl**: Основная библиотека от FormatJS, которая предоставляет `<IntlProvider>`, `<FormattedMessage>`, `useIntl()` и другие примитивы интернационализации.

> Если у вас еще не установлен React, вам тоже нужно это сделать (`react` и `react-dom`).

## Настройка Intlayer для экспорта сообщений react-intl

В корне вашего проекта создайте **`intlayer.config.ts`** (или `.js`, `.mjs`, `.cjs`) следующим образом:

```typescript title="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // Добавьте столько локалей, сколько хотите
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // Указывает Intlayer на генерацию файлов сообщений для react-intl
    dictionaryOutput: ["react-intl"],

    // Директория, в которую Intlayer будет записывать ваши файлы JSON сообщений
    reactIntlMessagesDir: "./react-intl/messages",
  },
};

export default config;
```

> **Примечание**: Для других расширений файлов (`.mjs`, `.cjs`, `.js`) смотрите [документацию Intlayer](https://intlayer.org/ru/doc/concept/configuration) для получения деталей использования.

---

## Создание деклараций контента Intlayer

Intlayer сканирует вашу кодовую базу (по умолчанию, в `./src`) на наличие файлов, соответствующих `*.content.{ts,tsx,js,jsx,mjs,mjx,cjs,cjx,json}`.  
Вот пример на **TypeScript**:

```typescript title="src/components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const content = {
  // "key" становится ключом верхнего уровня сообщения в вашем файле JSON react-intl
  key: "my-component",

  content: {
    // Каждый вызов t() объявляет переводимое поле
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    description: t({
      en: "This is a description",
      fr: "Ceci est une description",
      es: "Esta es una descripción",
    }),
  },
} satisfies Dictionary;

export default content;
```

Если вы предпочитаете JSON или разные варианты JS (`.cjs`, `.mjs`), структура в значительной степени такая же , смотрите [документацию Intlayer по декларациям контента](https://intlayer.org/ru/doc/concept/content).

---

## Сборка сообщений для react-intl

Чтобы сгенерировать фактические файлы JSON сообщений для **react-intl**, выполните:

```bash
# с npm
npx intlayer dictionaries build

# с yarn
yarn intlayer build

# с pnpm
pnpm intlayer build
```

Это сканирует все файлы `*.content.*`, компилирует их и записывает результаты в директорию, указанную в вашем **`intlayer.config.ts`** , в этом примере, `./react-intl/messages`.  
Типичный вывод может выглядеть так:

```bash
.
└── react-intl
    └── messages
        ├── en.json
        ├── fr.json
        └── es.json
```

Каждый файл является объектом JSON, верхние ключи которого соответствуют каждому **`content.key`** из ваших деклараций. Подключи (например, `helloWorld`) отражают переводы, объявленные в этом элементе контента.

Например, **en.json** может выглядеть так:

```json fileName="react-intl/messages/en/my-component.json"
{
  "helloWorld": "Hello World",
  "description": "This is a description"
}
```

---

## Инициализация react-intl в вашем приложении React

### 1. Загрузка сгенерированных сообщений

Где вы настраиваете корневой компонент вашего приложения (например, `src/main.tsx` или `src/index.tsx`), вам нужно:

1. **Импортировать** сгенерированные файлы сообщений (статически или динамически).
2. **Передать** их в `<IntlProvider>` от `react-intl`.

Простой подход , импортировать их **статически**:

```typescript title="src/index.tsx"
import React from "react";
import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";
import App from "./App";

// Импортировать JSON файлы из выходных данных сборки.
// Альтернатива: вы можете импортировать динамически в зависимости от выбранной локали пользователем.
import en from "../react-intl/messages/en.json";
import fr from "../react-intl/messages/fr.json";
import es from "../react-intl/messages/es.json";

// Если у вас есть механизм для определения языка пользователя, установите его здесь.
// Для простоты давайте выберем английский.
const locale = "en";

// Соберите сообщения в объекте (или выберите их динамически)
const messagesRecord: Record<string, Record<string, any>> = {
  en,
  fr,
  es,
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={messagesRecord[locale]}>
      <App />
    </IntlProvider>
  </React.StrictMode>
);
```

> **Совет**: Для реальных проектов вы можете:
>
> - Динамически загружать сообщения JSON во время выполнения.
> - Использовать основанную на окружении, браузере или учетной записи пользователя детекцию локали.

### 2. Используйте `<FormattedMessage>` или `useIntl()`

Как только ваши сообщения загружены в `<IntlProvider>`, любой дочерний компонент может использовать react-intl для доступа к локализованным строкам. Есть два основных подхода:

- **`<FormattedMessage>`** компонент
- **`useIntl()`** хук

---

## Использование переводов в компонентах React

### Подход A: `<FormattedMessage>`

Для быстрого использования в пределах строки:

```tsx title="src/components/MyComponent/index.tsx"
import React from "react";
import { FormattedMessage } from "react-intl";

export default function MyComponent() {
  return (
    <div>
      <h1>
        {/* “my-component.helloWorld” ссылается на ключ из en.json, fr.json и т.д. */}
        <FormattedMessage id="my-component.helloWorld" />
      </h1>

      <p>
        <FormattedMessage id="my-component.description" />
      </p>
    </div>
  );
}
```

> Проп в **`id`** в `<FormattedMessage>` должен соответствовать **ключу верхнего уровня** (`my-component`) плюс любым под-ключам (`helloWorld`).

### Подход B: `useIntl()`

Для более динамичного использования:

```tsx title="src/components/MyComponent/index.tsx"
import React from "react";
import { useIntl } from "react-intl";

export default function MyComponent() {
  const intl = useIntl();

  return (
    <div>
      <h1>{intl.formatMessage({ id: "my-component.helloWorld" })}</h1>
      <p>{intl.formatMessage({ id: "my-component.description" })}</p>
    </div>
  );
}
```

Оба подхода допустимы , выбирайте тот стиль, который лучше подходит вашему приложению.

---

## Обновление или добавление новых переводов

1. **Добавьте или измените** контент в любом файле `*.content.*`.
2. Повторно выполните `intlayer build`, чтобы регенерировать файлы JSON в `./react-intl/messages`.
3. React (и react-intl) будут подбирать обновления в следующий раз, когда вы пересоберете или перезагрузите ваше приложение.

---

## Интеграция TypeScript (по желанию)

Если вы используете TypeScript, Intlayer может **генерировать определения типов** для ваших переводов.

- Убедитесь, что `tsconfig.json` включает вашу папку `types` (или любую другую выходную папку, которую генерирует Intlayer) в массиве `"include"`.

```json5
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", "types"],
}
```

Сгенерированные типы могут помочь выявлять отсутствующие переводы или недействительные ключи в ваших компонентах React на этапе компиляции.

---

## Конфигурация Git

Обычно **исключаются** внутренние артефакты сборки Intlayer из контроля версий. В вашем `.gitignore` добавьте:

```plaintext
# Игнорировать артефакты сборки intlayer
.intlayer
react-intl
```

В зависимости от вашего рабочего процесса, вы также можете захотеть игнорировать или коммитить окончательные словари в `./react-intl/messages`. Если ваш CI/CDipeline регенерирует их, их можно безопасно игнорировать; в противном случае коммитите их, если они вам нужны для оберток в производства.

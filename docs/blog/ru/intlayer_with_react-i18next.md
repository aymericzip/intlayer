---
createdAt: 2025-01-02
updatedAt: 2025-06-29
title: Intlayer и react-i18next
description: Сравнить Intlayer с react-i18next для приложения React
keywords:
  - react-i18next
  - i18next
  - Intlayer
  - Интернационализация
  - Документация
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-react-i18next
---

# React Internationalization (i18n) с react-i18next и Intlayer

## Обзор

- **Intlayer** помогает вам управлять переводами с помощью файлов декларации контента на **уровне компонентов**.
- **react-i18next** - популярная интеграция React для **i18next**, которая предоставляет хуки, такие как `useTranslation`, для получения локализованных строк в ваших компонентах.

Когда они объединены, Intlayer может **экспортировать** словари в **i18next-совместимый JSON**, чтобы react-i18next мог **потреблять** их во время выполнения.

## Зачем использовать Intlayer с react-i18next?

Файлы декларации контента **Intlayer** предлагают лучший опыт разработчика, потому что они:

1. **Гибкие в размещении файлов**  
   Поместите каждый файл декларации контента прямо рядом с компонентом, которому он нужен. Эта структура позволяет вам сохранять переводы в одном месте, предотвращая оставшихся от orphaned переводов, когда компоненты перемещаются или удаляются.

   ```bash codeFormat="typescript"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts # Файл декларации контента
               └── index.tsx
   ```

   ```bash codeFormat="esm"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.mjs # Файл декларации контента
               └── index.mjx
   ```

   ```bash codeFormat="cjs"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.cjs # Файл декларации контента
               └── index.cjx
   ```

   ```bash codeFormat="json"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.json # Файл декларации контента
               └── index.jsx
   ```

2. **Централизованные переводы**  
   Один файл декларации контента собирает все необходимые переводы для компонента, облегчая обнаружение недостающих переводов.  
   С TypeScript вы даже получите ошибки во время компиляции, если переводы отсутствуют.

## Установка

В проекте Create React App установите эти зависимости:

```bash
# С npm
npm install intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# С yarn
yarn add intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# С pnpm
pnpm add intlayer react-i18next i18next i18next-resources-to-backend
```

### Что это за пакеты?

- **intlayer** – CLI и основная библиотека для управления конфигурациями i18n, декларациями контента и построением выходных словарей.
- **react-intlayer** – Специфическая для React интеграция для Intlayer, предоставляющая скрипты для автоматизации создания словарей.
- **react-i18next** – Специфическая для React библиотека интеграции для i18next, включая хук `useTranslation`.
- **i18next** – Основная платформа для обработки переводов.
- **i18next-resources-to-backend** – Бэкенд i18next, который динамически импортирует ресурсы JSON.

## Настройка Intlayer для экспорта словарей i18next

Создайте (или обновите) ваш `intlayer.config.ts` в корне вашего проекта:

```typescript title="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // Добавьте столько локалей, сколько вам нужно
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // Укажите Intlayer создавать i18next-совместимый JSON
    dictionaryOutput: ["i18next"],

    // Выберите выходной каталог для созданных ресурсов
    // Эта папка будет создана, если еще не существует.
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

> **Примечание**: Если вы не используете TypeScript, вы можете создать этот файл конфигурации как `.cjs`, `.mjs` или `.js` (см. [документацию Intlayer](https://intlayer.org/ru/doc/concept/configuration) для получения подробной информации).

## Создание ресурсов i18next

После того как ваши декларации контента будут на месте (в следующем разделе), выполните **команду сборки Intlayer**:

```bash
# С npm
npx run intlayer build
```

```bash
# С yarn
yarn intlayer build
```

```bash
# С pnpm
pnpm intlayer build
```

> Это сгенерирует ваши ресурсы i18next внутри директории `./i18next/resources` по умолчанию.

Типичный вывод может выглядеть так:

```bash
.
└── i18next
    └── resources
       ├── en
       │   └── my-content.json
       ├── fr
       │   └── my-content.json
       └── es
           └── my-content.json
```

Где каждый ключ декларации **Intlayer** используется как **i18next пространство имен** (например, `my-content.json`).

## Импорт словарей в вашу конфигурацию react-i18next

Чтобы динамически загружать эти ресурсы во время выполнения, используйте [`i18next-resources-to-backend`](https://www.npmjs.com/package/i18next-resources-to-backend). Например, создайте файл `i18n.ts` (или `.js`) в вашем проекте:

```typescript title="i18n.ts"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // плагин react-i18next
  .use(initReactI18next)
  // динамическая загрузка ресурсов
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      // Настройте путь импорта к вашему каталогу ресурсов
      return import(`../i18next/resources/${language}/${namespace}.json`);
    })
  )
  // Инициализация i18next
  .init({
    // Альтернативная локаль
    fallbackLng: "en",

    // Вы можете добавить другие параметры конфигурации i18next здесь, смотрите:
    // https://www.i18next.com/overview/configuration-options
  });

export default i18next;
```

```javascript title="i18n.js"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18next/resources/${language}/${namespace}.json`)
    )
  )
  .init({
    fallbackLng: "en",
  });

export default i18next;
```

Затем, в вашем **корневом** или **индексном** файле (например, `src/index.tsx`), импортируйте эту настройку `i18n` **до** рендеринга `App`:

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
// Инициализация i18n перед чем-либо еще
import "./i18n";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Создание и управление вашими декларациями контента

Intlayer извлекает переводы из “файлов декларации контента”, находящихся где угодно под `./src` (по умолчанию).  
Вот минимальный пример на TypeScript:

```typescript title="src/components/MyComponent/MyComponent.content.ts"
import { t, type Dictionary } from "intlayer";

const content = {
  // "key" будет вашим пространством имен i18next (например, "my-component")
  key: "my-component",
  content: {
    // Каждый вызов "t" - это отдельный узел перевода
    heading: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    description: t({
      en: "My i18n description text...",
      fr: "Ma description en i18n...",
      es: "Mi descripción en i18n...",
    }),
  },
} satisfies Dictionary;

export default content;
```

Если вы предпочитаете JSON, `.cjs` или `.mjs`, обратитесь к [документации Intlayer](https://intlayer.org/ru/doc/concept/content).

> По умолчанию действительные декларации контента соответствуют шаблону расширения файла:

> `*.content.{ts,tsx,js,jsx,mjs,mjx,cjs,cjx,json}`

## Использование переводов в React-компонентах

После того как вы **собрали** свои ресурсы Intlayer и настроили react-i18next, вы можете напрямую использовать хук `useTranslation` из **react-i18next**.  
Например:

```tsx title="src/components/MyComponent/MyComponent.tsx"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

/**
 * Пространство имен i18next - это ключ Intlayer из "MyComponent.content.ts",
 * поэтому мы передадим "my-component" в useTranslation().
 */
const MyComponent: FC = () => {
  const { t } = useTranslation("my-component");

  return (
    <div>
      <h1>{t("heading")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};

export default MyComponent;
```

> Обратите внимание, что функция `t` ссылается на **ключи** внутри вашего сгенерированного JSON. Для записи контента Intlayer с именем `heading`, вы будете использовать `t("heading")`.

## Дополнительно: Интеграция с Create React App Scripts (CRACO)

**react-intlayer** предлагает подход на основе CRACO для пользовательских сборок и конфигурации сервера разработки. Если вы хотите seamlessly интегрировать шаг сборки Intlayer, вы можете:

1. **Установить react-intlayer** (если вы этого еще не сделали):
   ```bash
   npm install react-intlayer --save-dev
   ```
2. **Настройте ваши скрипты `package.json`** для использования скриптов `react-intlayer`:

   ```jsonc
   "scripts": {
     "start": "react-intlayer start",
     "build": "react-intlayer build",
     "transpile": "intlayer build"
   }
   ```

   > Скрипты `react-intlayer` основаны на [CRACO](https://craco.js.org/). Вы также можете реализовать свою собственную настройку на основе плагина intlayer craco. [Смотрите пример здесь](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

Теперь выполнение `npm run build`, `yarn build` или `pnpm build` запускает как сборку Intlayer, так и CRA.

## Конфигурация TypeScript

**Intlayer** предоставляет **автоматически сгенерированные определения типов** для вашего контента. Чтобы гарантировать, что TypeScript их подберет, добавьте **`types`** (или `types`, если вы настроили иначе) в массив **include** вашего `tsconfig.json`:

```json5 title="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", "types"],
}
```

> Это позволит TypeScript выводить тип ваших переводов для лучшей автозавершения и обнаружения ошибок.

## Конфигурация Git

Рекомендуется **игнорировать** автоматически сгенерированные файлы и папки от Intlayer. Добавьте эту строку в ваш `.gitignore`:

```plaintext
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
i18next
```

Вы обычно **не** коммитите эти ресурсы или внутренние артефакты сборки `.intlayer`, так как их можно сгенерировать при каждой сборке.

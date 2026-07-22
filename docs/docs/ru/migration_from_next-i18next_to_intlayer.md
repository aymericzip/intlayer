---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Миграция с next-i18next на Intlayer | Интернационализация (i18n)"
description: "Узнайте, как перевести ваше приложение Next.js с next-i18next на Intlayer — шаг за шагом, не ломая существующий код. Используйте адаптер совместимости @intlayer/next-i18next для плавного перехода."
keywords:
  - next-i18next
  - react-i18next
  - i18next
  - intlayer
  - миграция
  - интернационализация
  - i18n
  - Next.js
  - React
  - JavaScript
slugs:
  - doc
  - migration
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Миграция с next-i18next на Intlayer

## Почему стоит перейти с next-i18next на Intlayer?

<AccordionGroup>

<Accordion header="Размер бандла">

Вместо того чтобы загружать огромные JSON-файлы на ваших страницах, загружайте только необходимый контент. Intlayer помогает **сократить размер бандла и страниц до 50%**.

</Accordion>

<Accordion header="Поддерживаемость">

Локализация контента на уровне компонентов и разделов делает крупные приложения **удобными для поддержки**. Вы можете дублировать или удалять целые директории с фичами без необходимости пересматривать всю базу контента. Кроме того, Intlayer **строго типизирован**, что гарантирует правильность вашего контента на уровне TypeScript.

Intlayer также является **наиболее активно развивающимся** решением в экосистеме i18n — проблемы решаются быстро, регулярно добавляются адаптеры для новых фреймворков, а основное API постоянно дорабатывается на основе реальных отзывов разработчиков.

</Accordion>

<Accordion header="ИИ Агенты">

Колокация контента **сокращает контекст, необходимый для работы** Больших Языковых Моделей (LLM). Intlayer также предоставляет набор инструментов, таких как **CLI** для тестирования отсутствующих переводов, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md)** и **[Навыки для Агентов (Agent Skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)**, чтобы сделать процесс разработки (DX) еще более плавным для ИИ-агентов.

</Accordion>

<Accordion header="Автоматизация">

Автоматизируйте переводы в вашем CI/CD-пайплайне, используя любую LLM по вашему выбору по цене вашего ИИ-провайдера. Intlayer также предоставляет **компилятор** для автоматического извлечения контента, а также [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md) для помощи с **фоновым переводом**.

</Accordion>

<Accordion header="Производительность">

Привязка огромных JSON-файлов к компонентам может привести к проблемам с производительностью и реактивностью. Intlayer оптимизирует загрузку контента на этапе сборки (build-time).

</Accordion>

<Accordion header="Масштабируемость для не-разработчиков">

Будучи больше, чем просто решением i18n, Intlayer предоставляет **[визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md)** (self-hosted) и **[полноценную CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md)**, чтобы помочь вам управлять мультиязычным контентом в **реальном времени**, делая сотрудничество с переводчиками, копирайтерами и другими членами команды бесшовным. Контент может храниться как локально, так и/или удаленно.

</Accordion>

</AccordionGroup>

---

## Стратегии миграции

Поскольку `next-i18next` использует "под капотом" `react-i18next` и `i18next`, существует две дополняющие друг друга стратегии миграции на Intlayer:

1. **Адаптер совместимости (рекомендуется для существующих приложений)** — Установите `@intlayer/next-i18next`, `@intlayer/react-i18next` и `@intlayer/i18next`. Эти пакеты предоставляют **абсолютно те же API**, что и оригиналы, но перенаправляют всю логику переводов в Intlayer. Ваши текущие вызовы `useTranslation`, `appWithTranslation`, `serverSideTranslations` и маршрутизация страниц Next.js останутся нетронутыми — изменится только настройка и инициализация.

2. **Полная миграция** — Постепенно заменяйте API `next-i18next` на нативные хуки Intlayer (`useIntlayer`) и переводите ваш контент в файлы `.content.ts`, размещая их рядом с компонентами.

В этом руководстве сначала рассматривается **Стратегия 1** (адаптер совместимости без существенных изменений), а затем — опциональная полная миграция.

---

## Оглавление

<TOC/>

---

## Быстрая миграция

Следующие шаги — это необходимый минимум для запуска вашего приложения Next.js (Pages Router) с Intlayer, не меняя код ни одной страницы или компонента.

<Steps>

<Step number={1} title="Установка зависимостей">

Установите основные пакеты Intlayer и адаптеры совместимости:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> флаг `--interactive` не является обязательным. Используйте `intlayer-cli init`, если вы являетесь ИИ-агентом.

> Эта команда определит вашу среду и установит необходимые пакеты. Например:

```bash packageManager="npm"
npm install intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

> Вы можете безопасно оставить установленными пакеты `next-i18next`, `react-i18next` и `i18next` во время миграции, пока все алиасы не будут настроены.

</Step>

<Step number={2} title="Настройка Intlayer">

Команда `intlayer init` создает базовый файл конфигурации `intlayer.config.ts`. Обновите его, указав ваши текущие локали, и настройте плагин `syncJSON` на ваши файлы сообщений `next-i18next` (обычно расположенные в `public/locales`):

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Добавьте все ваши текущие локали сюда
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // соответствует синтаксису плейсхолдеров i18next: {{name}}
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

> **`source`** сопоставляет локаль и namespace (`key`) с путем к вашему JSON-файлу. **`location`** сообщает вотчеру (watcher) Intlayer, за какой папкой нужно следить для отслеживания изменений. Настройка `format: 'i18next'` гарантирует правильную обработку плейсхолдеров, используемых в `next-i18next`.

</Step>

<Step number={3} title="Обновление конфигурации Next.js">

Оберните ваш текущий `next.config.ts` (или `.js`) функцией `createNextI18nPlugin` из `@intlayer/next-i18next/plugin`. Эта функция-обертка применяет `withIntlayer` **и одновременно** настраивает алиасы для `next-i18next` / `react-i18next` / `i18next` → `@intlayer/*`. Таким образом, во время сборки ваши импорты вроде `import { useTranslation } from 'next-i18next'` будут прозрачно перенаправлены. Вносить изменения в исходный код не требуется.

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";
// Импорт конфигурации i18n из next-i18next.config.js можно удалить
// import { i18n } from './next-i18next.config';

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {
  // Intlayer обрабатывает нативную маршрутизацию i18n в Next.js "под капотом",
  // так что вам больше не нужно передавать объект i18n сюда.
};

export default withIntlayer(nextConfig);
```

> **Файл `next-i18next.config.js` больше не нужен.** Intlayer компилирует все словари на этапе **сборки** (build-time) и берет на себя бесшовное определение локали, маршрутизацию и загрузку словарей.
>
> Предпочитаете использовать чистый плагин `withIntlayer` из `next-intlayer/server`? При его использовании словари будут скомпилированы, но алиасы для `next-i18next` / `react-i18next` / `i18next` **не будут добавлены** — в этом случае вам придется вручную переименовать импорты в `@intlayer/*` (см. Шаг 4).

</Step>

</Steps>

На этом быстрая миграция завершена. Теперь ваше приложение Next.js работает на Intlayer, при этом все ваши вызовы `useTranslation`, `serverSideTranslations` и `appWithTranslation` остаются без изменений.

> **Строгая типизация ключей перевода — автоматически.** Как только Intlayer скомпилирует ваши словари, методы `useTranslation` и `getFixedT` будут типизированы на основе вашего реального контента. Ключи будут автодополняться в вашей IDE, а недействительные пути приведут к ошибкам TypeScript при компиляции — дополнительная настройка не требуется.
>
> ```tsx
> // Pages Router — 'about' — зарегистрированный namespace (пространство имен) словаря
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ автодополнение
> t("does.not.exist"); // ✗ Ошибка TypeScript
>
> // getStaticProps / getServerSideProps (экземпляр i18next)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ строгая типизация
> ```

---

## Полная миграция

Следующие шаги необязательны и могут выполняться постепенно. Они открывают доступ ко всему набору функций Intlayer: визуальному редактору, CMS, строго типизированным файлам контента, ИИ-автоматизации переводов и многому другому.

<Steps>

<Step number={4} title="Явное переименование импортов (Опционально)" isOptional={true}>

Плагин Intlayer уже справляется с подменой алиасов на уровне сборщика. Если вы хотите сделать зависимости явными в ваших исходных файлах, вы можете переименовать импорты вручную:

| Было                                                                           | Стало                                                             |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |
| `import { useTranslation } from 'react-i18next'`                               | `import { useTranslation } from '@intlayer/react-i18next'`        |

Это **прямые замены** — вам не нужно менять сигнатуры функций, передаваемые аргументы или возвращаемые типы.

</Step>

<Step number={5} title="Включение ИИ-автоматизации перевода" isOptional={true}>

Когда Intlayer настроен, вы можете использовать CLI для автоматического заполнения недостающих переводов:

```bash packageManager="npm"
# Проверить отсутствующие переводы (добавьте в CI)
npx intlayer test

# Заполнить недостающие переводы с помощью ИИ
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

Добавьте конфигурацию ИИ в ваш `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    // provider: "openai",     // по умолчанию
    // model: "gpt-4o-mini",   // по умолчанию
  },
};

export default config;
```

> Ознакомьтесь с [Документацией по Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md), чтобы изучить все доступные возможности.

</Step>

</Steps>

---

## Что можно удалить после миграции

После настройки адаптера совместимости следующий стандартный бойлерплейт `next-i18next` можно удалить:

| Файл / Паттерн                                | Почему это больше не нужно                                                                                                                                  |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `next-i18next.config.js`                      | Intlayer полностью берет на себя маршрутизацию, загрузку словарей и работу с локалями на основе `intlayer.config.ts`.                                       |
| `next-i18next` в `package.json`               | Полностью заменен на `@intlayer/next-i18next` и алиасы.                                                                                                     |
| JSON бандлы локалей (`public/locales/*.json`) | JSON бандлы необходимы только если вы продолжаете использовать плагин `syncJSON`. После миграции на файлы `.content.ts` вы можете удалить эту папку с JSON. |

Когда вы будете готовы двигаться дальше, Intlayer **автоматически обнаружит все файлы `.content.ts` и `.content.json` в любом месте вашей кодовой базы** (по умолчанию, в любом месте внутри `./src`). Вы можете поместить файл `my-component.content.ts` прямо рядом с вашим кодом `MyComponent.tsx`, и Intlayer обнаружит его на этапе сборки без дополнительной настройки — не нужно никаких импортов, регистрации или центрального index-файла. Это делает совместное размещение переводов невероятно удобным.

---

## Настройка TypeScript

Intlayer использует расширение модулей (module augmentation), чтобы предоставить полноценный IntelliSense в TypeScript для ключей перевода. Убедитесь, что ваш `tsconfig.json` включает автоматически сгенерированные типы:

```json5 fileName="tsconfig.json"
{
  // ... Ваша текущая конфигурация TypeScript
  "include": [
    // ... Ваша текущая конфигурация TypeScript
    ".intlayer/**/*.ts", // Включает автосгенерированные типы
  ],
}
```

---

## Настройка Git

Добавьте сгенерированную директорию Intlayer в ваш `.gitignore`:

```plaintext fileName=".gitignore"
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

---

## Узнать больше

- **Визуальный редактор** — Управляйте переводами визуально прямо в браузере: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md)
- **CMS** — Вынесите контент за пределы кода и управляйте им удаленно: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md)
- **VS Code Расширение** — Получите автодополнение и обнаружение ошибок в реальном времени: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md)
- **Справочник по CLI** — Полный список команд интерфейса командной строки: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md)
- **Intlayer с Next.js (Pages Router)** — Полное руководство по настройке в Next.js: [intlayer_with_nextjs_page_router.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_page_router.md)

---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Миграция с next-intl на Intlayer | Интернационализация (i18n)"
description: "Узнайте, как перевести ваше приложение Next.js с next-intl на Intlayer — шаг за шагом, не ломая существующий код. Используйте адаптер совместимости @intlayer/next-intl для плавного перехода."
keywords:
  - next-intl
  - intlayer
  - миграция
  - интернационализация
  - i18n
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - migration
  - next-intl
history:
  - version: 8.13.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Миграция с next-intl на Intlayer

## Почему стоит перейти с next-intl на Intlayer?

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

## Стратегия миграции

Рекомендуемый подход для существующих приложений — использовать **адаптер совместимости**: Установите `@intlayer/next-intl`. Этот пакет предоставляет **точно такой же API**, что и `next-intl`, но делегирует всю работу по переводу "под капотом" в Intlayer.

Ваши `useTranslations`, `getTranslations`, `NextIntlClientProvider` и прочее остаются нетронутыми в существующих файлах — **изменяется только путь импорта**. Вам не нужно переписывать сигнатуры вызовов, пропсы компонентов или логику.

Со временем вы можете выборочно переводить отдельные файлы на формат `.content.ts` от Intlayer, чтобы раскрыть возможности визуального редактора, CMS и локализации на уровне компонента, но этот шаг не является обязательным и может быть выполнен постепенно.

---

## Оглавление

<TOC/>

---

## Быстрая миграция

Следующие шаги — это минимум, необходимый для запуска вашего существующего приложения `next-intl` с использованием Intlayer без внесения изменений в бизнес-логику кода.

<Steps>

<Step number={1} title="Установка зависимостей">

Установите основные пакеты Intlayer и адаптер совместимости `@intlayer/next-intl`:

```bash packageManager="npm"
npm install intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
bun x intlayer init
```

> Сохраните `next-intl` установленным — он всё еще требуется для **маршрутизации (URL-роутинга)** (`createNavigation`, `createMiddleware`, `Link`, `redirect`, `usePathname`, `useRouter`). Адаптер совместимости **не** заменяет слой маршрутизации.

</Step>

<Step number={2} title="Настройка Intlayer">

Команда `intlayer init` создает базовый файл `intlayer.config.ts`. Обновите его, указав ваши текущие локали, и настройте плагин `syncJSON` на ваши файлы сообщений:

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
      // 'icu' соответствует синтаксису плейсхолдеров ICU в next-intl: {name}, {count, plural, ...}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

> **`source`** сопоставляет локаль с путем к соответствующему JSON-файлу. **`location`** сообщает вотчеру (watcher) Intlayer, за какой папкой нужно следить для отслеживания изменений. Настройка `format: 'icu'` гарантирует правильную обработку ICU плейсхолдеров вроде `{name}` и `{count, plural, one {# item} other {# items}}`.

> См. [Документацию по Конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md) для ознакомления со всеми доступными настройками.

</Step>

<Step number={3} title="Внедрение плагина Intlayer в Next.js">

Оберните вашу текущую конфигурацию Next.js функцией `createNextIntlPlugin` из `@intlayer/next-intl/plugin`. Это применяет `withIntlayer` **и одновременно** настраивает подмену алиаса `next-intl` → `@intlayer/next-intl`:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* Ваша текущая конфигурация Next.js */
};

export default withIntlayer(nextConfig);
```

> `createNextIntlPlugin()` включает в себя `withIntlayer`, автоматически определяет **Webpack** или **Turbopack**, прикрепляет наблюдатель (content watcher), прекомпилирует словари, и, самое главное, **внедряет алиасы модулей**, так что во время сборки все ваши импорты `import … from 'next-intl'` прозрачно перенаправляются на `@intlayer/next-intl`. Импорты роутинга вроде `next-intl/routing` останутся указывать на реальный пакет. Не нужно изменять исходный код.
>
> Предпочитаете использовать чистый плагин `withIntlayer` из `next-intlayer/server`? При его использовании словари будут скомпилированы, но алиас `next-intl` **не будет добавлен** — в таком случае вам придется вручную переименовывать импорты в `@intlayer/next-intl` (см. Шаг 4).

> **Файл `getRequestConfig` и загрузка сообщений больше не требуются.** В `next-intl` вам приходилось создавать файл `src/i18n.ts`, который на каждый запрос загружал JSON файлы через `getRequestConfig`. Так как Intlayer компилирует все словари на этапе **сборки** (build-time), шага загрузки сообщений при каждом запросе больше не существует. Вы можете безопасно удалить этот файл (или оставить в нем только роутинг, если используете `createNavigation`).

</Step>

</Steps>

На этом быстрая миграция завершена. Теперь ваше приложение работает на Intlayer, при этом все ваши импорты и API `next-intl` остаются нетронутыми.

> **Строгая типизация ключей перевода — автоматически.** Как только Intlayer скомпилирует словари, `useTranslations` и `getTranslations` будут типизированы на основе вашего реального контента. Ключи будут автодополняться в вашей IDE, а недействительные пути приведут к ошибкам TypeScript при компиляции — дополнительная настройка не требуется.
>
> ```tsx
> // Клиентский компонент (Client component) — 'about' — это ключ словаря
> const t = useTranslations("about");
> t("counter.label"); // ✓ автодополнение
> t("does.not.exist"); // ✗ Ошибка TypeScript
>
> // Серверный компонент (Server component)
> const t = await getTranslations("about");
> t("counter.label"); // ✓ типизация
> ```

---

## Полная миграция

Следующие шаги необязательны и могут выполняться постепенно. Они открывают доступ ко всему набору функций Intlayer: визуальному редактору, CMS, строго типизированным файлам контента, ИИ-автоматизации переводов и многому другому.

<Steps>

<Step number={4} title="Явное переименование импортов (Опционально)" isOptional={true}>

Обертка `createNextIntlPlugin()` уже обрабатывает подмену (aliasing) `next-intl` → `@intlayer/next-intl` на стороне сборщика. Если вы хотите сделать зависимости явными в ваших исходных файлах (и использовать чистый `withIntlayer` плагин), вы можете изменить пути импортов вручную:

| Было                                                 | Стало                                                          |
| ---------------------------------------------------- | -------------------------------------------------------------- |
| `import { useTranslations } from 'next-intl'`        | `import { useTranslations } from '@intlayer/next-intl'`        |
| `import { useLocale } from 'next-intl'`              | `import { useLocale } from '@intlayer/next-intl'`              |
| `import { NextIntlClientProvider } from 'next-intl'` | `import { NextIntlClientProvider } from '@intlayer/next-intl'` |
| `import { getTranslations } from 'next-intl/server'` | `import { getTranslations } from '@intlayer/next-intl/server'` |
| `import { getLocale } from 'next-intl/server'`       | `import { getLocale } from '@intlayer/next-intl/server'`       |
| `import { setLocale } from 'next-intl/server'`       | `import { setLocale } from '@intlayer/next-intl/server'`       |
| `import { getMessages } from 'next-intl/server'`     | `import { getMessages } from '@intlayer/next-intl/server'`     |

> Оставляйте импорты маршрутизации направленными на реальный `next-intl` — адаптер совместимости **не заменяет** механизмы URL-маршрутизации `next-intl`:
>
> ```ts
> // ✅ Оставьте это из настоящего пакета 'next-intl'
> import { createNavigation } from "next-intl/routing";
> import { createMiddleware } from "next-intl/server";
> import { defineRouting } from "next-intl/routing";
> ```
>
> Либо использование `defineRouting` из `@intlayer/next-intl/routing` позволит вам автоматически импортировать среды (environments), заданные в `intlayer.config.ts`.

</Step>

<Step number={5} title="Включение ИИ-автоматизации перевода" isOptional={true}>

Когда Intlayer настроен, вы можете использовать CLI для автоматического заполнения недостающих переводов с помощью выбранной вами LLM:

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

Добавьте ваш `OPENAI_API_KEY` (или ключ от другой LLM) в локальный `.env` файл и добавьте секцию `ai` в `intlayer.config.ts`:

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
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
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

После настройки `@intlayer/next-intl` следующий стандартный бойлерплейт `next-intl` можно удалить:

| Файл / Паттерн                             | Почему это больше не нужно                                                                                                                                                             |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Экспорт `getRequestConfig` в `src/i18n.ts` | Intlayer компилирует контент на этапе сборки. Загрузки "запрос-за-запросом" больше нет. Оставьте этот файл, если используете его для `createNavigation`.                               |
| Вызовы `getMessages()` в ваших Layout      | Провайдер `NextIntlClientProvider` от `@intlayer/next-intl` самостоятельно считывает скомпилированные словари, делая пропс `messages` необязательным.                                  |
| Загрузка JSON (`messages/*.json`)          | Бандлы (наборы) JSON необходимы только в случае, если вы продолжаете использовать плагин `syncJSON`. После завершения перевода файлов в формат `.content.ts` папку JSON можно удалить. |

Когда вы будете готовы двигаться дальше, Intlayer **автоматически обнаружит все файлы `.content.ts` и `.content.json` в любом месте вашей кодовой базы** (по умолчанию, в любом месте внутри `./src`). Вы можете поместить файл `about.content.ts` прямо рядом с вашим кодом `about/page.tsx`, и Intlayer обнаружит его на этапе сборки без дополнительной настройки — не нужно никаких импортов, регистрации или центрального index-файла. Это делает совместное размещение переводов невероятно удобным.

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
- **Intlayer с Next.js** — Полное руководство по настройке в Next.js: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_16.md)

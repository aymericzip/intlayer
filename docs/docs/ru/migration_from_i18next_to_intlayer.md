---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Миграция с i18next на Intlayer | Интернационализация (i18n)"
description: "Узнайте, как перевести ваше JavaScript/TypeScript приложение с i18next на Intlayer — шаг за шагом, не ломая существующий код. Используйте адаптер совместимости @intlayer/i18next для плавного перехода."
keywords:
  - i18next
  - intlayer
  - миграция
  - интернационализация
  - i18n
  - JavaScript
  - Node.js
slugs:
  - doc
  - migration
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Миграция с i18next на Intlayer

## Почему стоит перейти с i18next на Intlayer?

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

Существует две дополняющие друг друга стратегии миграции с `i18next` на Intlayer:

1. **Адаптер совместимости (рекомендуется для существующих приложений)** — Установите `@intlayer/i18next`. Этот пакет предоставляет **точно такой же API**, как и `i18next`, но делегирует всю работу по переводу "под капотом" в Intlayer. Ваши текущие вызовы `i18next.t()`, `i18next.changeLanguage()` и `createInstance()` останутся нетронутыми — изменится только путь импорта и инициализация.

2. **Полная миграция** — Постепенно заменяйте API `i18next` на нативные инструменты Intlayer и локализуйте ваш контент в файлах `.content.ts` рядом с вашими компонентами.

В этом руководстве сначала рассматривается **Стратегия 1** (адаптер совместимости), а затем опциональная полная миграция.

---

## Оглавление

<TOC/>

---

## Быстрая миграция

Следующие шаги — это минимум, необходимый для запуска вашего существующего приложения `i18next` с использованием Intlayer без внесения изменений в бизнес-логику кода.

<Steps>

<Step number={1} title="Установка зависимостей">

Установите основные пакеты Intlayer и адаптер совместимости:

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
npm install intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

> Вы можете смело оставить установленным `i18next` — адаптер совместимости использует его как `devDependency` / `peerDependency` для типов TypeScript.

</Step>

<Step number={2} title="Настройка Intlayer">

Команда `intlayer init` создает файл `intlayer.config.ts`. Обновите его, указав ваши текущие локали, и настройте плагин `syncJSON` на ваши файлы переводов (messages):

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
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** сопоставляет локаль с путем к файлу JSON. **`location`** сообщает вотчеру (watcher) Intlayer, за какой папкой следить на предмет изменений. Опция `format: 'i18next'` гарантирует, что плейсхолдеры вроде `{{name}}` будут обработаны правильно.

</Step>

<Step number={3} title="Обновление алиасов сборщика (опционально)">

Если вы используете сборщик (Vite, Webpack, esbuild), вы можете внедрить алиас модуля, чтобы `import ... from 'i18next'` автоматически разрешался в `@intlayer/i18next`. Это избавит от необходимости изменять пути импорта вручную по всей кодовой базе.

**Для Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import i18nextVitePlugin from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

> `i18nextVitePlugin()` оборачивает плагин `intlayer()` из `vite-intlayer` и автоматически добавляет алиас `i18next` → `@intlayer/i18next`. Использование обычного плагина `intlayer()` из `vite-intlayer` скомпилирует словари, но **не** добавит алиас — в таком случае вам придется вручную переименовывать импорты в `@intlayer/i18next` (см. следующий шаг).

</Step>

</Steps>

На этом быстрая миграция завершена. Теперь ваше приложение работает на Intlayer, а все ваши импорты и API `i18next` остались нетронутыми.

---

## Полная миграция

Следующие шаги необязательны и могут выполняться постепенно. Они открывают доступ ко всему набору функций Intlayer: визуальному редактору, CMS, строго типизированным файлам контента, ИИ-автоматизации переводов и многому другому.

<Steps>

<Step number={4} title="Явное переименование импортов (Опционально)" isOptional={true}>

Если вы предпочитаете сделать зависимость явной в исходных файлах или не используете плагин сборщика для подмены (aliasing) импортов, вы можете переименовать пути импорта вручную:

| Было                                       | Стало                                                |
| ------------------------------------------ | ---------------------------------------------------- |
| `import i18next from 'i18next'`            | `import i18next from '@intlayer/i18next'`            |
| `import { createInstance } from 'i18next'` | `import { createInstance } from '@intlayer/i18next'` |
| `import { t } from 'i18next'`              | `import { t } from '@intlayer/i18next'`              |

Это **прямая замена** — никаких изменений в сигнатурах вызовов, аргументах или возвращаемых типах не требуется.

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
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
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

После настройки адаптера совместимости следующий стандартный бойлерплейт `i18next` можно удалить:

| Файл / Паттерн                         | Почему это больше не нужно                                                                                                                              |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Вызовы `i18next.init()`                | Intlayer инициализирует всё автоматически; шага загрузки во время выполнения (runtime) больше нет.                                                      |
| `i18next.use(...)`                     | Intlayer не использует плагины i18next, бэкенды или детекторы языков.                                                                                   |
| JSON бандлы локалей (`locales/*.json`) | JSON бандлы необходимы только если вы продолжаете использовать плагин `syncJSON`. После миграции на файлы `.content.ts` вы можете удалить папку с JSON. |

Когда вы будете готовы двигаться дальше, Intlayer **автоматически обнаружит все файлы `.content.ts` и `.content.json` в любом месте вашей кодовой базы** (по умолчанию, в любом месте внутри `./src`). Вы можете поместить файл `my-component.content.ts` прямо рядом с вашим кодом, и Intlayer обнаружит его на этапе сборки без дополнительной настройки — не нужно никаких импортов, регистрации или центрального index-файла. Это делает совместное размещение переводов невероятно удобным.

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

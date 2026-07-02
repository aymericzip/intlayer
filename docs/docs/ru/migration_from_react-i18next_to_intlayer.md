---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Миграция с react-i18next / i18next на Intlayer | Интернационализация (i18n)"
description: "Узнайте, как перевести ваше React или Next.js приложение с react-i18next или i18next на Intlayer — шаг за шагом, не ломая существующий код. Используйте адаптеры совместимости @intlayer/react-i18next и @intlayer/i18next для плавного перехода."
keywords:
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
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Миграция с react-i18next / i18next на Intlayer

## Почему стоит перейти с react-i18next / i18next на Intlayer?

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

Существует две дополняющие друг друга стратегии миграции с `react-i18next` / `i18next` на Intlayer:

1. **Адаптер совместимости (рекомендуется для существующих приложений)** — Установите `@intlayer/react-i18next` (для компонентов React) и/или `@intlayer/i18next` (для корневого инстанса `i18n`). Эти пакеты предоставляют **абсолютно тот же API**, что и `react-i18next` / `i18next`, но перенаправляют всю логику переводов в Intlayer. Ваши текущие вызовы `useTranslation`, `Trans`, `withTranslation`, `i18next.t()` остаются нетронутыми — изменяется только путь импорта.

2. **Полная миграция** — Постепенно заменяйте API `react-i18next` на нативные хуки Intlayer (`useIntlayer`, `IntlayerProvider`) и переводите ваш контент в файлы `.content.ts`, размещая их рядом с компонентами.

В этом руководстве сначала рассматривается **Стратегия 1** (адаптер совместимости), а затем — опциональная полная миграция.

---

## Оглавление

<TOC/>

---

## Быстрая миграция

Следующие шаги — это необходимый минимум для запуска вашего приложения `react-i18next` с Intlayer без изменений в коде компонентов.

<Steps>

<Step number={1} title="Установка зависимостей">

Установите основные пакеты Intlayer и адаптер совместимости:

```bash packageManager="npm"
npx intlayer@canary init --interactive    # v9
# npx intlayer init                       # v8
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive   # v9
# pnpm dlx intlayer init                      # v8
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive   # v9
# yarn dlx intlayer init                      # v8
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive   # v9
# bunx intlayer init                      # v8
```

> флаг `--interactive` не является обязательным. Используйте `intlayer-cli init`, если вы являетесь ИИ-агентом.

> Эта команда определит вашу среду и установит необходимые пакеты. Например:

```bash packageManager="npm"
npm install intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

> Вы можете смело оставить установленными `react-i18next` и `i18next` — адаптер совместимости использует их как `devDependencies` / `peerDependencies` для типов TypeScript. Вам не нужно удалять какие-либо peer зависимости в `package.json`.

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
      // соответствует синтаксису плейсхолдеров react-i18next: {{name}}
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** сопоставляет локаль с путем к соответствующему JSON-файлу. **`location`** сообщает вотчеру (watcher) Intlayer, за какой папкой нужно следить для отслеживания изменений. Настройка `format: 'i18next'` гарантирует правильную обработку плейсхолдеров вроде `{{name}}`.

</Step>

<Step number={3} title="Добавление плагинов Intlayer в сборщик">

Оберните вашу текущую конфигурацию сборщика плагином совместимости. Это подключает базовый плагин Intlayer, включает отслеживание контента и, что самое важное, **внедряет алиасы модулей**, так что во время сборки все импорты `import … from 'react-i18next'` (и `'i18next'`) прозрачно перенаправляются на `@intlayer/react-i18next` / `@intlayer/i18next`. Никаких изменений в исходном коде не требуется.

**Для Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

> `reactI18nextVitePlugin()` оборачивает плагин `intlayer()` из `vite-intlayer` и автоматически добавляет алиасы для `react-i18next` / `i18next`. Использование обычного плагина `intlayer()` из `vite-intlayer` скомпилирует словари, но **не** добавит алиасы — в таком случае вам придется вручную переименовать импорты в `@intlayer/*` (см. шаг 4).

**Для Next.js:**

Если вы используете `next-i18next` (Pages Router интеграция), установите `@intlayer/next-i18next` и `next-intlayer`:

```bash packageManager="npm"
npm install @intlayer/next-i18next next-intlayer
```

Затем добавьте плагин совместимости в ваш `next.config.ts` (он внедрит алиасы для `next-i18next` / `react-i18next` / `i18next`):

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {/* ваши опции конфигурации */};

export default withIntlayer(nextConfig);
```

> **Вызов `i18next.init()` или ручная загрузка провайдеров больше не требуются.** Intlayer компилирует все словари на этапе **сборки** (build-time), удаляя шаг загрузки "на лету" (runtime). Подмененный Provider заботится об инициализации.

</Step>

</Steps>

На этом быстрая миграция завершена. Теперь ваше приложение работает на Intlayer, при этом все ваши импорты и API `react-i18next` остаются нетронутыми.

> **Строгая типизация ключей перевода — автоматически.** Как только Intlayer скомпилирует словари, `useTranslation` и `getFixedT` будут типизированы на основе вашего реального контента. Ключи будут автодополняться в вашей IDE, а недействительные пути приведут к ошибкам TypeScript при компиляции — дополнительная настройка не требуется.
>
> ```tsx
> // 'about' — зарегистрированный ключ словаря → t() принимает только валидные пути
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ автодополнение
> t("does.not.exist"); // ✗ Ошибка TypeScript
>
> // На стороне сервера (инстанс i18next)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ типизация
> ```

---

## Полная миграция

Следующие шаги необязательны и могут выполняться постепенно. Они открывают доступ ко всему набору функций Intlayer: визуальному редактору, CMS, строго типизированным файлам контента, ИИ-автоматизации переводов и многому другому.

<Steps>

<Step number={4} title="Явное переименование импортов (Опционально)" isOptional={true}>

Плагин Intlayer уже справляется с подменой алиасов на уровне сборщика. Если вы хотите сделать зависимости явными в ваших исходных файлах, вы можете переименовать импорты вручную:

| Было                                               | Стало                                                        |
| -------------------------------------------------- | ------------------------------------------------------------ |
| `import { useTranslation } from 'react-i18next'`   | `import { useTranslation } from '@intlayer/react-i18next'`   |
| `import { Trans } from 'react-i18next'`            | `import { Trans } from '@intlayer/react-i18next'`            |
| `import { withTranslation } from 'react-i18next'`  | `import { withTranslation } from '@intlayer/react-i18next'`  |
| `import { I18nextProvider } from 'react-i18next'`  | `import { I18nextProvider } from '@intlayer/react-i18next'`  |
| `import { initReactI18next } from 'react-i18next'` | `import { initReactI18next } from '@intlayer/react-i18next'` |
| `import i18next from 'i18next'`                    | `import i18next from '@intlayer/i18next'`                    |
| `import { createInstance } from 'i18next'`         | `import { createInstance } from '@intlayer/i18next'`         |
| `import { t } from 'i18next'`                      | `import { t } from '@intlayer/i18next'`                      |

Для Next.js (`next-i18next`):

| Было                                                                           | Стало                                                             |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |

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

После настройки адаптера совместимости следующий стандартный бойлерплейт `react-i18next` / `i18next` можно удалить:

| Файл / Паттерн                         | Почему это больше не нужно                                                                                                                                                    |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Вызовы `i18next.init()`                | Провайдер Intlayer всё инициализирует автоматически; шага загрузки "на лету" больше нет.                                                                                      |
| `I18nextProvider` / `initReactI18next` | Плагин Intlayer самостоятельно обрабатывает инъекцию и загрузку.                                                                                                              |
| JSON бандлы локалей (`locales/*.json`) | JSON бандлы необходимы только в случае, если вы продолжаете использовать плагин `syncJSON`. После завершения перевода файлов в формат `.content.ts` папку JSON можно удалить. |

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
- **Intlayer с React** — Полное руководство по настройке в React: [intlayer_with_vite+react.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+react.md)
- **Intlayer с Next.js** — Полное руководство по настройке в Next.js: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_16.md)

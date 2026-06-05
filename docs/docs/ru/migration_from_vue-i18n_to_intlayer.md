---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Миграция с vue-i18n на Intlayer | Интернационализация (i18n)"
description: "Узнайте, как перевести ваше Vue или Nuxt приложение с vue-i18n на Intlayer — шаг за шагом, не ломая существующий код. Используйте адаптер совместимости @intlayer/vue-i18n для плавного перехода."
keywords:
  - vue-i18n
  - intlayer
  - миграция
  - интернационализация
  - i18n
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - migration
  - vue-i18n
history:
  - version: 8.13.0
    date: 2026-06-05
    changes: "Init history"
---

# Миграция с vue-i18n на Intlayer

## Почему стоит перейти с vue-i18n на Intlayer?

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

Существует две дополняющие друг друга стратегии миграции с `vue-i18n` на Intlayer:

1. **Адаптер совместимости (рекомендуется для существующих приложений)** — Установите `@intlayer/vue-i18n` (для компонентов Vue). Этот пакет предоставляет **абсолютно тот же API**, что и `vue-i18n`, но перенаправляет всю логику переводов в Intlayer. Ваши текущие вызовы `$t`, `useI18n()` и `<i18n-t>` остаются нетронутыми — изменяется только путь импорта и инициализация.

2. **Полная миграция** — Постепенно заменяйте API `vue-i18n` на нативный хук Intlayer (`useIntlayer`) и переводите ваш контент в файлы `.content.ts`, размещая их рядом с компонентами.

В этом руководстве сначала рассматривается **Стратегия 1** (адаптер совместимости), а затем — опциональная полная миграция.

---

## Оглавление

<TOC/>

---

## Быстрая миграция

Следующие шаги — это необходимый минимум для запуска вашего приложения `vue-i18n` с Intlayer без изменений в коде компонентов.

<Steps>

<Step number={1} title="Установка зависимостей">

Установите основные пакеты Intlayer и адаптер совместимости:

```bash packageManager="npm"
npm install intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
bun x intlayer init
```

> Вы можете смело оставить установленным `vue-i18n` — адаптер совместимости использует его как `devDependency` / `peerDependency` для типов TypeScript.

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
      // соответствует синтаксису плейсхолдеров vue-i18n: {name}
      format: "icu",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** сопоставляет локаль с путем к соответствующему JSON-файлу. **`location`** сообщает вотчеру (watcher) Intlayer, за какой папкой нужно следить для отслеживания изменений. Настройка `format: 'icu'` гарантирует правильную обработку плейсхолдеров вроде `vue-i18n`.

</Step>

<Step number={3} title="Добавление плагинов Intlayer в сборщик">

Оберните вашу текущую конфигурацию сборщика плагином совместимости. Это подключает базовый плагин Intlayer, включает отслеживание контента и, что самое важное, **внедряет алиасы модулей**, так что во время сборки все импорты `import … from 'vue-i18n'` прозрачно перенаправляются на `@intlayer/vue-i18n`. Никаких изменений в исходном коде не требуется.

**Для Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

> `vueI18nVitePlugin()` оборачивает плагин `intlayer()` из `vite-intlayer` и автоматически добавляет алиасы для `vue-i18n`. Использование обычного плагина `intlayer()` из `vite-intlayer` скомпилирует словари, но **не** добавит алиасы — в таком случае вам придется вручную переименовать импорты в `@intlayer/vue-i18n` (см. шаг 4).

**Для Nuxt:**

Если вы используете `@nuxtjs/i18n` (Nuxt интеграция), установите `nuxt-intlayer` и добавьте его в `nuxt.config.ts`:

```bash packageManager="npm"
npm install nuxt-intlayer
```

```typescript fileName="nuxt.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
  // Модуль @nuxtjs/i18n можно смело удалять
});
```

> **Вызов `createI18n()` или ручная загрузка провайдеров больше не требуются.** Intlayer компилирует все словари на этапе **сборки** (build-time), удаляя шаг загрузки "на лету" (runtime). Подмененный Provider заботится об инициализации.

</Step>

</Steps>

На этом быстрая миграция завершена. Теперь ваше приложение работает на Intlayer, при этом все ваши импорты и API `vue-i18n` остаются нетронутыми.

> **Строгая типизация ключей перевода — автоматически.** Как только Intlayer скомпилирует словари, `useI18n` будет типизирован на основе вашего реального контента, если вы передадите опцию `namespace`. Ключи будут автодополняться в вашей IDE, а недействительные пути приведут к ошибкам TypeScript при компиляции — дополнительная настройка не требуется.
>
> ```ts
> // 'about' — зарегистрированный ключ словаря
> const { t } = useI18n({ namespace: "about" });
> t("counter.label"); // ✓ автодополнение
> t("does.not.exist"); // ✗ Ошибка TypeScript
> ```

---

## Полная миграция

Следующие шаги необязательны и могут выполняться постепенно. Они открывают доступ ко всему набору функций Intlayer: визуальному редактору, CMS, строго типизированным файлам контента, ИИ-автоматизации переводов и многому другому.

<Steps>

<Step number={4} title="Явное переименование импортов (Опционально)" isOptional={true}>

Плагин Intlayer уже справляется с подменой алиасов на уровне сборщика. Если вы хотите сделать зависимости явными в ваших исходных файлах, вы можете переименовать импорты вручную:

| Было                                    | Стало                                             |
| --------------------------------------- | ------------------------------------------------- |
| `import { useI18n } from 'vue-i18n'`    | `import { useI18n } from '@intlayer/vue-i18n'`    |
| `import { createI18n } from 'vue-i18n'` | `import { createI18n } from '@intlayer/vue-i18n'` |

Это **прямые замены** — вам не нужно менять сигнатуры вызовов, аргументы или возвращаемые типы.

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
      format: "icu",
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

После настройки адаптера совместимости следующий стандартный бойлерплейт `vue-i18n` можно удалить:

| Файл / Паттерн                            | Почему это больше не нужно                                                                                                                                                    |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Вызовы `createI18n()`                     | Провайдер Intlayer всё инициализирует автоматически; шага загрузки "на лету" больше нет.                                                                                      |
| Регистрация плагина Vue (`app.use(i18n)`) | Плагин Intlayer самостоятельно обрабатывает инъекцию.                                                                                                                         |
| JSON бандлы локалей (`locales/*.json`)    | JSON бандлы необходимы только в случае, если вы продолжаете использовать плагин `syncJSON`. После завершения перевода файлов в формат `.content.ts` папку JSON можно удалить. |

Когда вы будете готовы двигаться дальше, Intlayer **автоматически обнаружит все файлы `.content.ts` и `.content.json` в любом месте вашей кодовой базы** (по умолчанию, в любом месте внутри `./src`). Вы можете поместить файл `my-component.content.ts` прямо рядом с вашим кодом `MyComponent.vue`, и Intlayer обнаружит его на этапе сборки без дополнительной настройки — не нужно никаких импортов, регистрации или центрального index-файла. Это делает совместное размещение переводов невероятно удобным.

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
- **Intlayer с Vue** — Полное руководство по настройке в Vue: [intlayer_with_vite+vue.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+vue.md)
- **Intlayer с Nuxt** — Полное руководство по настройке в Nuxt: [intlayer_with_nuxt.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nuxt.md)

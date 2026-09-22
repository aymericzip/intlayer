---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "next-intl vs Intlayer: Benchmark и сравнение 2026"
description: Bundle size, утечки контента, реактивность переключения локали и опыт разработчика, измеренные на Next.js и TanStack Start. Какую библиотеку i18n вам выбрать в 2026?
keywords:
  - next-intl
  - use-intl
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - next-intl-vs-intlayer
author: aymericzip
---

# next-intl VS Intlayer | Benchmark интернационализации Next.js (i18n)

![next-intl VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`next-intl` - самая популярная библиотека i18n для Next.js. Intlayer - это альтернатива на основе компилятора с областью видимости компонента. Обе локализуют приложение App Router. Вопрос в том, какие затраты каждая из них влечет после сборки приложения.

Эта статья - не учебное пособие. Это сравнение, подкрепленное числами из [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), открытого набора инструментов для тестирования, который создает одно и то же приложение с каждой библиотекой и измеряет то, что браузер фактически загружает и выполняет.

<TOC/>

> **tl;dr**: На одном и том же приложении Next.js `next-intl` добавляет **+12.6 KB gzip** JavaScript на каждую страницу, против **+0.3 KB** для Intlayer. Без дополнительной работы `next-intl` поставляет **~90% строк иностранных страниц** с каждой страницей. Чтобы достичь утечки 0% с `next-intl`, требуется область видимости namespace и per-page `pick(messages, [...])`. Intlayer достигает 0% по умолчанию, потому что его компилятор ограничивает контент для каждого компонента. Если вы хотите API `next-intl` с выходом Intlayer, адаптер `@intlayer/next-intl` показал **147.5 KB** на страницу против **153.6 KB** с оригиналом.

## Вкратце

- **next-intl** - Легковесная, хорошо документированная, поддержка ICU message format, встроенная поддержка App Router с middleware, форматировщиками и помощниками навигации. Контент хранится в централизованных JSON каталогах; оптимизация производительности (namespaces, выборка сообщений для каждой страницы, ленивая загрузка) - ваша ответственность.
- **Intlayer** - Компонентоцентричная модель контента. Словари `.content.ts` находятся рядом с компонентом, который они обслуживают, compiler во время сборки выполняет tree-shaking и ленивую загрузку для каждого компонента и локали, строгие типы TypeScript генерируются из вашего контента, и отсутствующие переводы вызывают ошибку во время сборки. Поставляется с middleware, помощниками SEO, Visual Editor / CMS и переводом с поддержкой AI.

| Библиотека            | GitHub Stars                                                                                                                                                                   | Всего коммитов                                                                                                                                                                     | Последний коммит                                                                                                                                    | Первая версия | NPM версия                                                                                                    | Загрузки NPM                                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Апрель 2024   | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   |
| `amannn/next-intl`    | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       | Nov 2020      | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) |

> Значки обновляются автоматически. Снимки экрана будут изменяться с течением времени.

## Сравнение функций "рядом"

| Функция                                                   | `next-intlayer` (Intlayer)                                                                | `next-intl`                                                                                                                              |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Переводы рядом с компонентами**                         | ✅ Да, `.content.ts` расположен вместе с каждым компонентом                               | ❌ Нет, централизованный `messages/{locale}.json`                                                                                        |
| **Интеграция TypeScript**                                 | ✅ Строгие типы автоматически генерируются из контента                                    | ✅ Хорошо, типизация ключей через расширение `global.d.ts`                                                                               |
| **Обнаружение отсутствующих переводов**                   | ✅ Ошибка TypeScript + ошибка/предупреждение на этапе сборки                              | ⚠️ Fallback во время выполнения + предупреждение консоли                                                                                 |
| **Rich content (JSX / Markdown / components)**            | ✅ Прямая поддержка                                                                       | ⚠️ `t.rich()` / `t.markup()` с заполнителями тегов                                                                                       |
| **ICU support**                                           | ⚠️ WIP                                                                                    | ✅ Да                                                                                                                                    |
| **Formatting (dates, numbers, currencies)**               | ✅ `useNumber`, `useDate`, ... (Intl под капотом)                                         | ✅ `useFormatter()` (Intl под капотом)                                                                                                   |
| **Локализованная маршрутизация и middleware**             | ✅ Встроенный прокси/middleware, `getMultilingualUrls`                                    | ✅ Встроенный middleware, `Link`, `redirect`, `usePathname`                                                                              |
| **SEO помощники (hreflang, sitemap, robots)**             | ✅ Встроенные помощники                                                                   | ⚠️ Ручной, на основе конфигурации маршрутизации                                                                                          |
| **Синхронные серверные компоненты**                       | ✅ `useIntlayer` из `next-intlayer/server` работает в любом дочернем серверном компоненте | ⚠️ `getTranslations` асинхронен; синхронные дочерние компоненты нуждаются в `t` переданном как props                                     |
| **Статический рендеринг**                                 | ✅ Не блокирует статический рендеринг                                                     | ⚠️ Требует `setRequestLocale()`; каталоги с пространствами имён по-прежнему исключали страницы из статического рендеринга в наших тестах |
| **Tree-shaking (отправка только используемого контента)** | ✅ По компоненту, по локали, автоматизировано компилятором                                | ⚠️ Ручная работа: пространства имён + `pick(messages, [...])` на страницу                                                                |
| **Lazy loading**                                          | ✅ `importMode: 'dynamic'` (одна строка конфигурации)                                     | ⚠️ Ручной динамический импорт в `getRequestConfig`                                                                                       |
| **Purge unused content**                                  | ✅ Dead dictionaries are dropped at build time                                            | ❌ Not built-in                                                                                                                          |
| **Testing missing translations (CLI / CI)**               | ✅ `npx intlayer content test`                                                            | ⚠️ Not built-in; docs suggest `npx @lingual/i18n-check`                                                                                  |
| **AI-powered translation**                                | ✅ Built-in, uses your own provider keys                                                  | ❌ No                                                                                                                                    |
| **Визуальный редактор / CMS**                             | ✅ Бесплатный визуальный редактор + опциональная CMS                                      | ❌ Нет (внешние платформы локализации)                                                                                                   |
| **MCP server & Agent Skills**                             | ✅ Да                                                                                     | ❌ Нет                                                                                                                                   |
| **Экосистема / сообщество**                               | ⚠️ Меньше, но быстро растет                                                               | ✅ Большое, справочный стандарт Next.js                                                                                                  |

## Бенчмарк

### Что было измерено

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) проводит тесты **одного и того же приложения** с каждой библиотекой: **10 страниц** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 локалей** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), идентичные компоненты и идентичное содержимое. Страницы измеряются на `en` и `fr`. Каждая библиотека реализуется до четырех **стратегий загрузки**, от наивной установки до оптимальной:

| Стратегия          | Описание                                                                                                 | Кто это делает                                   |
| ------------------ | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| **static**         | Все локали и все страницы объединены вместе                                                              | Быстрые прототипы, AI-generated код              |
| **dynamic**        | Загружается только активная локаль, но все страницы сразу                                                | Большинство проектов                             |
| **scoped-static**  | Пространства имён по маршрутам, без ленивой загрузки                                                     | Редкий случай                                    |
| **scoped-dynamic** | Пространства имён по маршрутам + ленивая загрузка. Отправляется только текущая страница в текущей локали | Приложения с строгим бюджетом производительности |

Intlayer не имеет варианта "scoped": компилятор автоматически распределяет контент **по компонентам**, поэтому его строки `static` и `dynamic` уже распределены по области видимости.

Для каждой сборки набор тестов записывает:

- **Lib size**: gzip размер пустого компонента, который только импортирует i18n библиотеку. Фиксированная стоимость runtime.
- **Page JS**: gzip JavaScript, скачанный на страницу, усреднённый по всем страницам и локалям.
- **Locale leak %**: доля переведённых строк, найденных в скачанном JS, которые принадлежат локали, которую пользователь **не** просматривает (отпечатано на `en` и `fr`, поэтому 50% означает "другая измеренная локаль полностью присутствует"; с 10 связанными локалями, реальные потери выше).
- **Page leak %**: доля переведённых строк, найденных в скачанном JS, которые принадлежат странице, на которой пользователь **не** находится.
- **Component avg**: средний gzip размер каждого компонента, скомпилированного в изоляции. Показывает, сколько i18n runtime один компонент тянет за собой.
- **E2E reactivity**: время в реальном масштабе времени между выбором нового языка и обновлением `html[lang]` в DOM (Playwright, 5 итераций).
- **Hydration**: продолжительность фазы гидрации React.

> Приведённые ниже числа получены из запуска от **2026-09-12** с `next-intl` 4.14.2, `use-intl` 4.14.2 и `intlayer` 9.5.1. Тестовое приложение намеренно небольшое (несколько десятков строк на язык), поэтому процентные значения утечек описывают **паттерн**: они растут вместе с вашим контентом, тогда как стоимость runtime остаётся постоянной.

### Результаты на Next.js (App Router)

Выберите метрики и библиотеки, которые вас интересуют:

<I18nBenchmark framework="nextjs" vertical/>

| Library                        | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity | Hydration |
| ------------------------------ | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | --------: |
| **base** (no i18n)             | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |   11.8 ms |
| `next-intl`                    | static         |       14.7 KB |         153.6 KB |        4.2% |     89.8% |            21.8 KB |        16.0 ms |   14.7 ms |
| `next-intl`                    | dynamic        |       14.7 KB |         153.6 KB |        9.7% |     89.9% |            21.8 KB |        15.6 ms |   14.8 ms |
| `next-intl`                    | scoped-static  |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            80.1 KB |        17.9 ms |   17.4 ms |
| `next-intl`                    | scoped-dynamic |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            22.9 KB |        17.8 ms |   16.8 ms |
| **`next-intlayer`**            | static         |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **8.5 KB** |    **15.5 ms** |   16.9 ms |
| **`next-intlayer`**            | dynamic        |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **6.9 KB** |    **15.3 ms** |   15.9 ms |
| `@intlayer/next-intl` (compat) | static         |        8.0 KB |         147.5 KB |        0.0% |      0.0% |             8.1 KB |        14.5 ms |   12.8 ms |
| `@intlayer/next-intl` (compat) | dynamic        |        8.0 KB |         148.7 KB |        0.0% |      0.0% |             8.1 KB |        11.7 ms |   12.8 ms |

**Как это читать**

- **Стоимость runtime.** Базовое приложение весит 141.0 KB на страницу. `next-intl` доводит это значение до 153.6 KB (**+12.6 KB gzip на каждой странице**), Intlayer до 141.3 KB (**+0.3 KB**). Этот разрыв не зависит от количества строк: это runtime библиотеки.
- **Leakage.** В двух конфигурациях, которые большинство команд фактически используют (`static` и `dynamic`), `next-intl` доставляет **~90% строк иностранных страниц** на каждую страницу: весь `en.json` попадает в клиентский провайдер. Чтобы достичь 0%, требуются конфигурации `scoped-*`: разделить каталоги на namespaces, затем выбрать нужные с помощью `pick()` на каждой странице. Intlayer находится на 0% в обоих случаях без всего этого.
- **JavaScript на странице не изменился для `next-intl` между стратегиями.** Тестовое содержимое небольшое, поэтому утечка ~90% составляет всего несколько KB здесь. В реальном приложении со сотнями строк на странице это соотношение становится доминирующей стоимостью. Тем временем +12.6 KB runtime оплачивается в каждой конфигурации.
- **Размер компонента.** Компонент, который вызывает `useTranslations()`, компилируется в среднем до 21.8 KB; тот же компонент с `useIntlayer()` компилируется до 6.9 KB. В конфигурации `scoped-static` компоненты `next-intl` увеличиваются до 80.1 KB, потому что каждый встраивает свой каталог пространства имен.
- **Реактивность и гидратация** находятся в одном диапазоне для обеих библиотек на Next.js (15-18 мс). Ни одна из них не является узким местом здесь.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Полная таблица, каждая библиотека и каждая стратегия, в [отчете о бенчмарке Next.js](https://intlayer.org/ru/doc/benchmark/nextjs).

### Результаты на TanStack Start (`use-intl`)

`use-intl` - это не зависящее от фреймворка ядро `next-intl`. Тот же API, тот же формат сообщений. Его сравнение с `intlayer` на TanStack Start исключает из уравнения части, специфичные для Next.js.

<I18nBenchmark framework="tanstack" vertical/>

| Библиотека                    | Стратегия      | Размер библиотеки (gz) | Среднее JS страницы (gz) | Утечка локали | Утечка страницы | Среднее размер компонента (gz) | E2E реактивность |
| ----------------------------- | -------------- | ---------------------: | -----------------------: | ------------: | --------------: | -----------------------------: | ---------------: |
| **base** (без i18n)           | -              |                 0.0 KB |                 111.0 KB |          0.0% |            0.0% |                         0.7 KB |           8.1 ms |
| `use-intl`                    | static         |                14.1 KB |                 179.8 KB |         50.0% |           89.8% |                        76.0 KB |           6.7 ms |
| `use-intl`                    | dynamic        |                14.1 KB |                 119.4 KB |          0.0% |           89.8% |                        75.9 KB |           7.0 ms |
| `use-intl`                    | scoped-static  |                14.1 KB |                 128.7 KB |          0.0% |            0.0% |                        87.1 KB |          20.9 ms |
| `use-intl`                    | scoped-dynamic |                14.1 KB |                 128.7 KB |          0.0% |            0.0% |                        87.1 KB |          13.3 ms |
| **`intlayer`**                | static         |             **5.0 KB** |             **125.8 KB** |         50.0% |        **0.0%** |                     **8.1 KB** |       **3.2 ms** |
| **`intlayer`**                | dynamic        |             **5.0 KB** |             **118.6 KB** |      **0.0%** |        **0.0%** |                     **6.3 KB** |       **3.6 ms** |
| `@intlayer/use-intl` (compat) | dynamic        |                 7.3 KB |                 129.7 KB |          0.0% |            0.0% |                         9.3 KB |           8.7 ms |

**Как это читать**

- Наивная конфигурация `use-intl` доставляет **на 68.8 KB больше JS на страницу** чем базовое приложение, причём половина строк принадлежит неправильной локали и 90% неправильной странице.
- `use-intl` в режиме `dynamic` достигает 119.4 KB, близко к 118.6 KB Intlayer, но все еще несет **89.8% утечку страницы**: строки всех страниц для активной локали загружаются на каждой странице. Их группировка по маршруту (`scoped-*`) устраняет утечку, но добавляет еще ~9 KB накладных расходов на chunk.
- В Intlayer строка `static` уже имеет **0% утечку страницы**: компилятор собирает только словари, используемые компонентами на странице. Включение `importMode: 'dynamic'` (одна строка в `intlayer.config.ts`) также устраняет утечку локали.
- **Размер компонента показывает разницу в архитектуре**: 76-87 KB на компонент с `use-intl` против 6-8 KB с Intlayer. `useTranslations()` привязывает каждый компонент к глобальному дереву сообщений; `useIntlayer()` привязывает его к собственному словарю.
- **Переключение локали** в 2-4 раза быстрее с Intlayer (3 мс против 7-21 мс).

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Полная таблица в [отчете о бенчмарке TanStack Start](https://intlayer.org/ru/doc/benchmark/tanstack).

## Почему такая разница? Централизованные каталоги vs скомпилированные словари

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

`next-intl` следует классической модели: один JSON на локаль, загруженный в `getRequestConfig`, переданный в `NextIntlClientProvider`, доступный через `t("namespace.key")`.

```bash
.
├── messages
│   ├── en.json
│   └── fr.json
└── src
    ├── i18n
    │   ├── request.ts
    │   └── routing.ts
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── about
                └── page.tsx
```

Runtime не может знать, какие ключи будет использовать страница, поэтому безопасный стандарт - отправить весь каталог. Оптимизация означает, что **вы** разделяете каталог на пространства имён, **вы** решаете, какие пространства имён нужны каждой странице, и **вы** поддерживаете это соответствие в синхронизации при перемещении компонентов. Строка `scoped-dynamic` в тесте производительности - это награда за эту работу, и большинство команд туда никогда не доходят.

Цена недостижения этой цели растет сразу по двум осям, страницы и локали:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Intlayer переворачивает ответственность. Контент объявляется рядом с компонентом:

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about
    │           ├── page.tsx
    │           └── page.content.ts
    └── components
        └── Counter
            ├── index.tsx
            └── index.content.ts
```

При сборке компилятор (`@intlayer/swc` / `@intlayer/babel`) видит, какой компонент импортирует какой словарь. Он объединяет только те словари, только для активной локали, и удаляет те, которые ничто не импортирует. Паттерн "scoped-dynamic" становится результатом сборки вместо дисциплины, которую команда должна поддерживать.

> Чтобы получить цифры `dynamic` строки, установите `dictionary.importMode: 'dynamic'` в `intlayer.config.ts`. См. [документацию по оптимизации bundle](https://intlayer.org/doc/concept/bundle-optimization).

## Опыт разработчика

### Client компонент

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```json fileName="messages/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/Counter.tsx"
"use client";

import { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

export const Counter = () => {
  const t = useTranslations("counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button aria-label={t("label")} onClick={() => setCount((c) => c + 1)}>
        {t("increment")}
      </button>
    </div>
  );
};
```

> Помните, что нужно включить пространство имён `counter` в сообщения, передаваемые в `NextIntlClientProvider` на каждой странице, которая отображает этот компонент.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ ru: "Счётчик", en: "Counter", fr: "Compteur" }),
    increment: t({ ru: "Увеличить", en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter/index.tsx"
"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { useNumber } from "next-intlayer/format";

export const Counter = () => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

Не требуется регистрировать на странице: компонент содержит свой собственный контент.

</Tab>
</Tabs>
### Синхронный серверный компонент

Компоненты системы проектирования (navbar, footer, карточки) часто являются серверными компонентами, отрендеренными как дочерние элементы клиентских компонентов, поэтому они не могут быть `async`.

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  formattedCount: string;
};

export const ServerCounter = ({ t, formattedCount }: ServerCounterProps) => (
  <div>
    <p>{formattedCount}</p>
    <button aria-label={t("label")}>{t("increment")}</button>
  </div>
);
```

Страница должна `await getTranslations("counter")` и `await getFormatter()`, затем передать результаты вниз как props. Компонент больше не является самостоятельным.

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";
import { useNumber } from "next-intlayer/server/format";

export const ServerCounter = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

</Tab>
</Tabs>
### Метаданные

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```tsx fileName="src/app/[locale]/about/page.tsx"
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

// Функция для получения локализованного пути
const localizedPath = (locale: string, path: string) =>
  locale === routing.defaultLocale ? path : `/${locale}${path}`;

// Генерация метаданных для страницы
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(l, "/about")])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
};
```

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const metadata = getIntlayer("about-metadata", locale);
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};
```

</Tab>
</Tabs>

## Сохраните API next-intl, получите вывод Intlayer

Вам не нужно переписывать компоненты, чтобы получить указанные выше числа производительности. `@intlayer/next-intl` - это готовый адаптер: он сохраняет `useTranslations`, `getTranslations`, `useFormatter`, `t.rich()`, ICU plurals и помощники `next-intl/navigation`, и предоставляет их из словарей Intlayer, скомпилированных компилятором Intlayer.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

В benchmark, compat-сборка того же приложения сократилась с **153.6 KB до 147.5 KB** за страницу, с **21.8 KB до 8.1 KB** за компонент, и с **~90% page leakage на 0%**, при этом код приложения остался без изменений. Ваши существующие файлы `messages/{locale}.json` могут остаться источником истины благодаря [JSON sync plugin](https://intlayer.org/ru/doc/compatibility/next-intl).

Смотрите [руководство миграции next-intl](https://intlayer.org/ru/doc/migration/next-intl) для пошагового процесса.

## Когда выбрать что?

<AccordionGroup>
<Accordion header="Выбрать next-intl">

Вам нужен стандарт экосистемы для Next.js, вы полагаетесь на ICU MessageFormat, ваше приложение небольшое или среднего размера, либо вы интегрируетесь с платформой переводов (Crowdin, Phrase, Lokalise...), ожидающей централизованный JSON. Заложите время на разделение каталогов по пространствам имен и выборку сообщений через `pick()` на каждой странице, если важна производительность.

</Accordion>
<Accordion header="Выбрать Intlayer">

Вам нужен **контент с областью видимости компонента**, **строгий TypeScript**, **ошибки отсутствующих ключей на этапе сборки**, **автоматический tree-shaking и ленивая загрузка**, синхронные серверные компоненты и встроенные редакционные инструменты ([Визуальный редактор](https://intlayer.org/ru/doc/concept/editor), [CMS](https://intlayer.org/ru/doc/concept/cms), [ИИ-перевод](https://intlayer.org/ru/doc/concept/auto-fill), [MCP-сервер](https://intlayer.org/ru/doc/mcp-server)). Особенно актуально для крупных модульных кодовых баз и дизайн-систем.

</Accordion>
<Accordion header="Выбрать @intlayer/next-intl">

Вы уже используете `next-intl` и хотите получить преимущества в размере бандла без полного переписывания. [Адаптер совместимости](https://intlayer.org/ru/doc/compatibility/next-intl) сохраняет ваши импорты и файл `messages/{locale}.json` в качестве единого источника правды. Сравнение производительности в [next-intl против @intlayer/next-intl](https://intlayer.org/ru/blog/next-intl-vs-intlayer-next-intl).

</Accordion>
</AccordionGroup>

## Часто задаваемые вопросы

<FAQ>

<Question title="next-intl медленнее, чем Intlayer?">

Не во время рендеринга. Разница в том, что передается клиенту: `next-intl` добавляет **+12.6 KB gzip** рантайма на каждой странице и в стандартных конфигурациях отправляет ~90% строк посторонних страниц с каждой страницей. Переключение локали и гидратация сопоставимы в Next.js (15-18 мс); в TanStack Start `use-intl` занимает 7-21 мс против 3-4 мс у Intlayer.

</Question>

<Question title="Могу ли я достичь 0% утечки с next-intl?">

Да, с конфигурацией `scoped-dynamic`: разделите `messages/{locale}.json` на пространства имен для каждого маршрута, затем используйте `pick(messages, [...])` на каждой странице и поддерживайте эту структуру при перемещении компонентов. Строки `scoped-*` бенчмарка как раз отражают эту работу. Intlayer достигает 0% по умолчанию без этого, так как компилятор изолирует контент по компонентам. См. [оптимизация бандла](https://intlayer.org/ru/doc/concept/bundle-optimization).

</Question>

<Question title="Нужно ли переписывать компоненты для миграции?">

Нет. `@intlayer/next-intl` сохраняет `useTranslations`, `getTranslations`, `useFormatter`, `t.rich()`, множественные формы ICU и хелперы навигации, предоставляя их из скомпилированных словарей. Достаточно одной строки плагина в `next.config.ts`. Пошаговое руководство в [руководстве по миграции с next-intl](https://intlayer.org/ru/doc/migration/next-intl).

</Question>

<Question title="Поддерживает ли Intlayer формат сообщений ICU?">

Нативная поддержка ICU находится в разработке. Адаптеры совместимости (`@intlayer/next-intl`, `@intlayer/use-intl`) полностью поддерживают ICU: множественные формы, `select`, `selectordinal`, `#` и `{ts, date, long}` обрабатываются резолвером ICU от Intlayer. Подробнее читайте в [формат сообщений ICU](https://intlayer.org/ru/blog/icu-message-format).

</Question>

<Question title="Могу ли я сохранить файлы messages/{locale}.json?">

Да. [Плагин синхронизации JSON](https://intlayer.org/ru/doc/compatibility/next-intl) читает их, разбивает ключи верхнего уровня на словари и перезаписывает переводы в те же файлы при обновлении через CLI или CMS. Рабочий процесс переводчиков не меняется.

</Question>

</FAQ>

## Связанные сравнения

Тот же бенчмарк, другие библиотеки:

- [i18next vs Intlayer](https://intlayer.org/ru/blog/i18next-vs-intlayer)
- [Lingui vs Intlayer](https://intlayer.org/ru/blog/lingui-vs-intlayer)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/ru/blog/vue-i18n-vs-intlayer-benchmark)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/ru/blog/next-i18next-vs-next-intl-vs-intlayer)
- [react-i18next vs react-intl vs Intlayer](https://intlayer.org/ru/blog/react-i18next-vs-react-intl-vs-intlayer)

Подробнее о next-intl:

- [next-intl vs @intlayer/next-intl](https://intlayer.org/ru/blog/next-intl-vs-intlayer-next-intl), адаптер измерен на том же приложении
- [Is next-intl outdated?](https://intlayer.org/ru/blog/is-next-intl-outdated)
- [Using Intlayer with next-intl](https://intlayer.org/ru/blog/intlayer-with-next-intl)
- [How to internationalize a Next.js app with next-intl](https://intlayer.org/ru/blog/nextjs-internationalization-using-next-intl)

Справочная документация:

- [Отчет о бенчмарке Next.js](https://intlayer.org/ru/doc/benchmark/nextjs) и [отчет о бенчмарке TanStack Start](https://intlayer.org/ru/doc/benchmark/tanstack)
- [Адаптер совместимости: next-intl](https://intlayer.org/ru/doc/compatibility/next-intl) и [руководство по миграции](https://intlayer.org/ru/doc/migration/next-intl)
- [Оптимизация бандла](https://intlayer.org/ru/doc/concept/bundle-optimization) и [компилятор Intlayer](https://intlayer.org/ru/doc/compiler)
- [Компонентная i18n против централизованной](https://intlayer.org/ru/blog/per-component-vs-centralized-i18n)
- [Компиляторная i18n против декларативной](https://intlayer.org/ru/blog/compiler-vs-declarative-i18n)

## GitHub STARs

GitHub stars - это сильный индикатор популярности проекта, доверия сообщества и долгосрочной актуальности. Хотя это не прямая мера технического качества, они отражают, сколько разработчиков находят проект полезным, следят за его развитием и, вероятно, готовы его использовать.

[![Star History Chart](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#amannn/next-intl&aymericzip/intlayer)

## Заключение

`next-intl` - это надежная, хорошо поддерживаемая библиотека, и benchmark подтверждает, что это далеко не худший вариант для Next.js. Однако её централизованная модель каталога возлагает все оптимизации на разработчика: наивная конфигурация пропускает ~90% контента иностранных страниц, а само runtime стоит +12,6 KB gzip на каждой странице.

Intlayer переносит эту работу в компилятор. Словари для каждого компонента, ленивая загрузка для каждого локала и очистка мертвого контента являются выходными данными сборки, а не соглашениями. Результат в том же приложении: **+0.3 KB на страницу**, **0% утечек**, компоненты **в 3 раза меньше** и переключение локали **в 2-4 раза быстрее** на TanStack Start.

Все необработанные данные, тестовые приложения и скрипты находятся в [репозитории Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Запустите его самостоятельно.

Обратитесь к документации ['Why Intlayer?'](https://intlayer.org/ru/doc/why) для получения дополнительных сведений.

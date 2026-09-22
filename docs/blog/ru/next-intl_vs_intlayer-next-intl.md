---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "next-intl vs @intlayer/next-intl: Один и тот же API, разный Bundle"
description: Что меняется, когда импорты next-intl приложения Next.js обслуживаются адаптером совместимости @intlayer/next-intl. Размер bundle, утечки, размер компонента и гидратация, измеренные на одном коде, плюс то, что адаптер сохраняет, игнорирует и не может заменить.
keywords:
  - next-intl
  - use-intl
  - "@intlayer/next-intl"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer-next-intl
author: aymericzip
---

# next-intl VS @intlayer/next-intl | Один и тот же API, разный Bundle

![next-intl VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`@intlayer/next-intl` - это адаптер совместимости: он предоставляет API `next-intl` (`useTranslations`, `getTranslations`, `useLocale`, `t.rich()`, ICU plurals, `NextIntlClientProvider`...) и обслуживает его из словарей, скомпилированных Intlayer. Код приложения не меняется. Меняется bundle.

Эта статья сравнивает оба варианта на одном Next.js приложении, собранном один раз с `next-intl` и один раз с адаптером. Цифры взяты из [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), open-source набора инструментов, который записывает, что на самом деле загружает браузер. Если вам нужно сравнение `next-intl` и Intlayer как библиотек, прочитайте [next-intl vs Intlayer](https://intlayer.org/ru/blog/next-intl-vs-intlayer). Здесь речь идёт о том, что меняется в адаптере, когда вы оставляете компоненты как они есть.

<TOC/>

> **tl;dr**: На одном и том же приложении Next.js переход с `next-intl` на `@intlayer/next-intl` снизил размер JavaScript на страницу с **153.6 KB до 147.5 KB** (gzip), средний компонент с **21.8 KB до 8.1 KB**, утечку строк на чужих страницах с **~90% до 0%**, и гидратацию с **14.7 ms до 12.8 ms**, при этом ни один компонент не был отредактирован. На TanStack Start эквивалент `use-intl` (`@intlayer/use-intl`) сократил компоненты с **76-87 KB до 9-11 KB** и переключение локали с **7-21 ms до 4-9 ms**. Адаптер занимает **8.0 KB** runtime против **14.7 KB** для `next-intl` и **5.5 KB** для нативного `next-intlayer`. Навигация и middleware переработаны на основе конфига маршрутизации Intlayer; локализованные `pathnames` - единственная функция, которая не перенесена.

## Что такое `@intlayer/next-intl`

`next-intl` - это runtime: `getRequestConfig` загружает `messages/{locale}.json` на каждый запрос, `NextIntlClientProvider` отправляет его на клиент, и `useTranslations("about")` читает ключи из этого объекта во время рендеринга. Каждая оптимизация (namespaces, `pick(messages, [...])` на страницу, ленивая загрузка) - ваша ответственность.

`@intlayer/next-intl` сохраняет первую и последнюю часть этой цепи и заменяет середину. Ваши компоненты по-прежнему вызывают `useTranslations("about")`; то, что они получают, берется из словаря Intlayer, скомпилированного во время сборки, ограниченного этим компонентом и активной локалью только.

Три механизма делают это возможным:

1. **Import aliasing.** `createNextIntlPlugin()` из `@intlayer/next-intl/plugin` оборачивает `withIntlayer` и добавляет aliases Webpack / Turbopack так, чтобы `next-intl`, `next-intl/server`, `next-intl/navigation` и `next-intl/middleware` разрешались в `@intlayer/next-intl`. Никакие импорты в вашей codebase не переименовываются.
2. **JSON as source of truth.** The `syncJSON` plugin читает ваши существующие `messages/{locale}.json`, разделяет его top-level ключи на один dictionary per namespace и записывает переводы обратно в те же файлы, когда CLI или CMS их обновляют. Рабочий процесс ваших переводчиков остается неизменным.
3. **Привязка на месте вызова.** Оптимизирующий проход Intlayer (Babel или SWC) переписывает `useTranslations("about")` в вызов, который получает словарь `about` напрямую. Компонент больше не обращается к глобальному дереву сообщений; он обращается к своему собственному контенту.

```tsx fileName="app/[locale]/about/page.tsx"
// Ваш код, без изменений
import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="Что выдаёт компилятор (упрощённо)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslations } from "@intlayer/next-intl";

const AboutPage = () => {
  const t = useTranslations(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

Это переписывание объясняет, почему столбцы размера компонента и утечки страницы ниже смещаются: страница загружает только словари компонентов, которые она отображает, и только в обслуживаемой локали.

## Что адаптер сохраняет, игнорирует и не заменяет

| `next-intl` API                                                      | С `@intlayer/next-intl`                                                                                                                         |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `useTranslations("ns")` / `getTranslations("ns")`                    | ✅ Сохранено. Привязано к словарю `ns` на этапе сборки. Ключи типизированы в соответствии с вашим контентом.                                    |
| `getTranslations({ locale, namespace })`                             | ✅ Сохранено                                                                                                                                    |
| `t("key", { name })`, `t.rich()`, `t.markup()`, `t.raw()`            | ✅ Сохранено. ICU множественные числа, `select`, `selectordinal`, `#`, `{ts, date, long}` выполняются через Intlayer's ICU resolver             |
| `useLocale()` / `getLocale()` / `setRequestLocale()` / `setLocale`   | ✅ Сохранено                                                                                                                                    |
| `useFormatter()`                                                     | ✅ Сохранено. `dateTime`, `number`, `relativeTime`, `list`, `dateTimeRange` подключаются к нативному `Intl`                                     |
| `NextIntlClientProvider`                                             | ✅ Сохранено. Props `messages`, `timeZone` и `now` **принимаются, но игнорируются** (dev warning уведомит вас об этом)                          |
| `getMessages()`                                                      | ✅ Сохранено для совместимости; больше не требуется                                                                                             |
| `getRequestConfig()` в `src/i18n.ts`                                 | ⚠️ Не требуется. Словари компилируются во время сборки; загрузки сообщений для каждого запроса нет                                              |
| `defineRouting()`                                                    | ✅ Сохранено. Опущенные поля (`locales`, `defaultLocale`, `localePrefix`) читаются из `intlayer.config.ts`                                      |
| `createNavigation()`, `Link`, `redirect`, `usePathname`, `useRouter` | ✅ Сохранено. Переимплементировано на основе конфигурации маршрутизации Intlayer; аргумент `routing` принимается, но игнорируется               |
| `pathnames` (локализованные имена маршрутов)                         | ❌ Принимается для типизации, **не интерполируется**. Сохраняйте простые имена маршрутов или переместите это сопоставление в `rewrite` Intlayer |
| `createMiddleware()`                                                 | ✅ Сохранено. Возвращает прокси Intlayer; устанавливает куку `NEXT_LOCALE` так, чтобы `useLocale()` и ваш переключатель продолжали работать     |
| `NEXT_LOCALE` кука                                                   | ✅ Читается по умолчанию (если вы не настроили `routing.storage` самостоятельно)                                                                |
| Bare `useTranslations()` без namespace                               | ⚠️ Работает, но сайт вызова не привязан: разрешается через runtime registry. Передайте namespace для получения выигрыша в bundle                |

## The benchmark

### What was measured

Набор тестов [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) собирает **одно и то же приложение** с каждой конфигурацией: **10 страниц** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 локалей** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), идентичные компоненты и идентичное содержимое. Страницы измеряются в `en` и `fr`.

`next-intl` был создан с четырьмя стратегиями загрузки, от наивного подхода (загрузка целого файла `messages/{locale}.json`) до оптимального (один namespace на маршрут + per-page `pick()`). Адаптер был построен на **тех же компонентах, что и наивный подход**, с измененными только `next.config.ts` и `intlayer.config.ts`. У него нет варианта "scoped": компилятор определяет содержимое на уровне компонента, поэтому его строки `static` и `dynamic` уже являются scoped.

Для каждой сборки suite записывает:

- **Lib size**: gzip размер пустого компонента, который только импортирует i18n библиотеку. Фиксированная стоимость runtime.
- **Page JS**: gzip JavaScript, загруженный на одну страницу, усредненный по всем страницам и локалям.
- **Locale leak %**: доля переведённых строк, найденных в загруженном JS, которые принадлежат локали, которую пользователь **не** просматривает.
- **Page leak %**: доля переведённых строк, найденных в загруженном JS, которые принадлежат странице, на которой пользователь **не** находится.
- **Component avg**: средний размер gzip каждого компонента, скомпилированного отдельно. Показывает, сколько i18n runtime и каталога тащит за собой один компонент.
- **E2E reactivity**: время, прошедшее между выбором новой локали и обновлением `html[lang]` в DOM (Playwright, 5 итераций).
- **Hydration**: длительность фазы гидратации React.

> Приведённые ниже числа получены из прогона от **2026-09-12** с `next-intl` / `use-intl` 4.14.2 и `@intlayer/*` 9.5.1. Тестовое приложение намеренно небольшое (несколько десятков строк на локаль), поэтому процентные показатели утечки описывают **закономерность**: они растут с расширением вашего контента, а стоимость runtime остаётся неизменной.

### Результаты на Next.js

Выберите интересующие вас метрики и библиотеки:

<I18nBenchmark framework="nextjs" vertical/>

| Setup                     | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |   Hydration |
| ------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ----------: |
| **base** (no i18n)        | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |     11.8 ms |
| `next-intl`               | static         |       14.7 KB |         153.6 KB |        4.2% |     89.8% |            21.8 KB |        16.0 ms |     14.7 ms |
| `next-intl`               | dynamic        |       14.7 KB |         153.6 KB |        9.7% |     89.9% |            21.8 KB |        15.6 ms |     14.8 ms |
| `next-intl`               | scoped-static  |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            80.1 KB |        17.9 ms |     17.4 ms |
| `next-intl`               | scoped-dynamic |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            22.9 KB |        17.8 ms |     16.8 ms |
| **`@intlayer/next-intl`** | static         |    **8.0 KB** |     **147.5 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **14.5 ms** | **12.8 ms** |
| **`@intlayer/next-intl`** | dynamic        |    **8.0 KB** |     **148.7 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **11.7 ms** | **12.8 ms** |
| `next-intlayer` (native)  | static         |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             8.5 KB |        15.5 ms |     16.9 ms |
| `next-intlayer` (native)  | dynamic        |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             6.9 KB |        15.3 ms |     15.9 ms |

**Как это читать**

- **Те же компоненты, 6 KB меньше на каждую страницу.** Сборка адаптера наивного приложения приземляется на **147.5 KB**, ниже каждой конфигурации `next-intl`, включая полностью оптимизированную (153.6 KB). Сам runtime - это разница: 8.0 KB против 14.7 KB, оплачиваемая на каждой странице.
- **Утечка данных составляет 0% без изменения компонентов.** Наивная конфигурация `next-intl` доставляет ~90% строк иностранных страниц на каждую страницу. Достижение 0% с `next-intl` означает использование конфигураций `scoped-*`: одно пространство имён на маршрут и `pick(messages, [...])` на каждой странице. Адаптер достигает 0% из наивного кода, потому что проход оптимизации привязывает каждый `useTranslations("ns")` к своему собственному словарю.
- **Компоненты сжимаются в 2,7 раза.** Компонент, скомпилированный изолированно, в среднем весит **21,8 КБ** с `next-intl` (он достигает провайдера и дерева сообщений) и **8,1 КБ** с адаптером. В конфигурации `scoped-static` `next-intl` это число _увеличивается_ до 80 КБ, потому что файл пространства имён каждого маршрута становится доступным со страницы, которая его выбирает.
- **Гидратация на 2 мс быстрее** (12.8 против 14.7 мс): нет необходимости десериализовать объект сообщения из RSC payload перед тем, как React может выполнить гидратацию.
- **Адаптер не является нативным runtime.** `next-intlayer` занимает **141.3 KB**, +0.3 KB относительно базового приложения, с runtime 5.5 KB. Адаптер предоставляет API поверхность `next-intl` (`useFormatter`, `t.rich`, ICU resolver) поверх ядра Intlayer, отсюда 8.0 KB и +6 KB на страницу. Это мост, а не пункт назначения.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Полная таблица, каждая библиотека и стратегия в [отчете о бенчмарке Next.js](https://intlayer.org/ru/doc/benchmark/nextjs).

### Результаты на TanStack Start (`use-intl`)

`use-intl` - это framework-агностическое ядро `next-intl`. Его адаптер, `@intlayer/use-intl`, следует той же архитектуре с Vite плагином (`@intlayer/use-intl/plugin`).

<I18nBenchmark framework="tanstack" vertical/>

| Настройка                | Стратегия      | Размер lib (gz) | Средний JS страницы (gz) | Утечка локали | Утечка страницы | Средний компонент (gz) | E2E отзывчивость |  Гидратация |
| ------------------------ | -------------- | --------------: | -----------------------: | ------------: | --------------: | ---------------------: | ---------------: | ----------: |
| **base** (без i18n)      | -              |          0.0 KB |                 111.0 KB |          0.0% |            0.0% |                 0.7 KB |           8.1 ms |     21.6 ms |
| `use-intl`               | static         |         14.1 KB |                 179.8 KB |         50.0% |           89.8% |                76.0 KB |           6.7 ms |     15.3 ms |
| `use-intl`               | dynamic        |         14.1 KB |                 119.4 KB |          0.0% |           89.8% |                75.9 KB |           7.0 ms |     15.4 ms |
| `use-intl`               | scoped-static  |         14.1 KB |                 128.7 KB |          0.0% |            0.0% |                87.1 KB |          20.9 ms |     24.8 ms |
| `use-intl`               | scoped-dynamic |         14.1 KB |                 128.7 KB |          0.0% |            0.0% |                87.1 KB |          13.3 ms |     25.9 ms |
| **`@intlayer/use-intl`** | static         |      **7.3 KB** |                 135.8 KB |         49.7% |        **0.0%** |            **10.9 KB** |       **4.2 ms** | **10.5 ms** |
| **`@intlayer/use-intl`** | dynamic        |      **7.3 KB** |             **129.7 KB** |      **0.0%** |        **0.0%** |             **9.3 KB** |       **8.7 ms** |     16.1 ms |
| `intlayer` (native)      | static         |          5.0 KB |                 125.8 KB |         50.0% |            0.0% |                 8.1 KB |           3.2 ms |     11.5 ms |
| `intlayer` (native)      | dynamic        |          5.0 KB |                 118.6 KB |          0.0% |            0.0% |                 6.3 KB |           3.6 ms |     14.1 ms |

**Как читать таблицу**

- **Байты на странице примерно равны оптимизированному `use-intl`.** `@intlayer/use-intl` в режиме `dynamic` (129.7 KB) находится в пределах 1 KB от `use-intl`'s `scoped-dynamic` (128.7 KB), и на 10 KB _выше_ простого `dynamic` `use-intl` (119.4 KB). Эта простая строка `dynamic` по-прежнему утекает 90% строк со страниц на других языках; количество байт низко, потому что содержимое тестового приложения небольшое. Адаптер 0% остается неизменным при увеличении содержимого.
- **Компоненты на 7-9x меньше.** Компоненты `use-intl` в среднем занимают **76-87 KB** при любой стратегии, потому что `useTranslations` привязан к полному объекту сообщений провайдера. Адаптер в среднем занимает **9-11 KB**.
- **Переключение локалей работает быстрее.** Оптимизированные настройки `use-intl` занимают **13-21 ms** для обновления `html[lang]`; адаптер занимает **4-9 ms**. Меньше компонентов перерисовывается, и ничего не переходит из дерева сообщений.
- **`static` сохраняет каждую локаль.** Строка `static` адаптера показывает утечку локалей на 49.7%, как и native Intlayer в режиме `static`: все локали объединены, но используются только словари страницы. Одна строка конфига (`importMode: 'dynamic'`) это убирает.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Полная таблица в [отчете о бенчмарке TanStack Start](https://intlayer.org/ru/doc/benchmark/tanstack).

## Почему цифры меняются

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Ничего в компоненте не изменилось, поэтому прирост производительности полностью зависит от того, к чему привязана `useTranslations`.

**With `next-intl`**, the binding is the provider. `NextIntlClientProvider` receives the whole `messages` object for the locale; every `useTranslations("about")` reads from it. The bundler sees one component importing one hook that reads one context, and cannot know that only the `about` branch is used. The routes below all share the same message object, so the page-leak column reads ~90% until you split the file yourself, и потери растут сразу по двум осям, страницы и локали:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

```bash
.
├── messages
│   ├── en.json                       # все пространства имён, все страницы
│   └── fr.json
└── src
    ├── i18n.ts                       # getRequestConfig({ messages: await import(...) })
    ├── middleware.ts                 # createMiddleware(routing)
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider messages={messages}>
        └── about/page.tsx            # useTranslations("about")
```

**С `@intlayer/next-intl`** привязка осуществляется к словарю. `syncJSON` преобразует `messages/en.json` в один словарь на каждый ключ верхнего уровня; компилятор разрешает, какой компонент вызывает `useTranslations("about")`, и передает ему `about` напрямую на активном языке как импорт, который bundler может отследить и разделить.

```bash
.
├── intlayer.config.ts                # syncJSON({ source: ({ locale }) => `./messages/${locale}.json` })
├── messages
│   ├── en.json                       # неизменно, остается источником истины
│   └── fr.json
├── .intlayer/                        # сгенерировано: один словарь на каждый namespace, на каждый locale
└── src
    ├── middleware.ts                 # createMiddleware() теперь возвращает прокси Intlayer
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider> (без свойства messages)
        └── about/page.tsx            # useTranslations("about")  ← без изменений
```

`src/i18n.ts` и свойство `messages` удаляются. Всё остальное остаётся идентичным.

## Миграция в три шага

<Steps>
<Step number={1} title="Установка">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

Команда обнаруживает `next-intl` и устанавливает `intlayer`, `next-intlayer`, `@intlayer/next-intl` и `@intlayer/sync-json-plugin`. Сохраните `next-intl` установленным: это peer dependency адаптера и предоставляет типы.

</Step>
<Step number={2} title="Укажите Intlayer на ваши сообщения">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" упаковывает каждую локаль; "dynamic" загружает активную по требованию
    importMode: "dynamic",
  },
  plugins: [
    syncJSON({
      // ICU заполнители: {name}, {count, plural, one {# item} other {# items}}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

`messages/{locale}.json` остаётся на месте. Каждый ключ верхнего уровня становится словарём; `useTranslations("about")` соответствует словарю `about`.

</Step>
<Step number={3} title="Обёртка next.config.ts">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

`createNextIntlPlugin()` компонует `withIntlayer` (отслеживание контента, компиляция словарей, оптимизирующий проход) и aliases `next-intl` → `@intlayer/next-intl` для Webpack и Turbopack. Постройте проект, и числа в таблицах выше будут вашими.

</Step>
</Steps>

### Что вы можете удалить впоследствии

| Файл / шаблон                                | Причина                                                                                                             |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `getRequestConfig` в `src/i18n.ts`           | Нет загрузки сообщений на каждый запрос. Оставьте файл только если он также экспортирует helpers `createNavigation` |
| `messages={...}` на `NextIntlClientProvider` | Адаптер читает скомпилированный output; свойство игнорируется и выводит предупреждение в разработке                 |
| `await getMessages()` в layouts              | По той же причине                                                                                                   |
| Per-page `pick(messages, [...])`             | Компилятор выполняет выборку, для каждого компонента                                                                |

### Что вы получаете сверх оптимизации размера

- **Типизированные ключи.** `useTranslations("about")` типизирована против скомпилированного словаря `about`. `t("does.not.exist")`, это ошибка TypeScript, а не fallback во время выполнения.
- **`npx intlayer test`** блокирует CI, когда в какой-то локали отсутствует ключ. **`npx intlayer fill`** переводит отсутствующие ключи с помощью выбранного провайдера (OpenAI, Anthropic, Mistral, Gemini...) используя ваш собственный ключ и записывает результат обратно в `messages/{locale}.json`.
- **Visual Editor и CMS** работают с одними и теми же словарями, поэтому не-разработчики могут редактировать `messages/fr.json` через UI, и файл обновляется.
- **Постепенный переход на `.content.ts`.** Любой компонент может переключиться с `useTranslations("about")` на `useIntlayer("about")` с co-located content файлом, по одному за раз. JSON и `.content.ts` словари сосуществуют и объединяются.

## Ограничения, которые нужно знать перед началом

<AccordionGroup>
<Accordion header="Конфигурация маршрутизации переносится в intlayer.config.ts">

`createNavigation(routing)` и `createMiddleware(routing)` сохраняют сигнатуру, но игнорируют аргумент: локали, локаль по умолчанию и стратегия префиксов берутся из конфигурации `routing` Intlayer. Если вы используете локализованные `pathnames` из `next-intl` (`/about` в `/a-propos`), адаптер их не интерполирует; `routing.rewrite` Intlayer покрывает этот случай, но это отдельное изменение.

</Accordion>
<Accordion header="useTranslations() без пространства имен не связывается">

Фазе оптимизации требуется статическое пространство имен, чтобы знать, какой словарь импортировать. Вызов без namespace все еще работает через реестр рантайма, ссылающийся на каждый словарь, что как раз и является той утечкой, которую вы пытались устранить. Передавайте namespace.

</Accordion>
<Accordion header="Адаптер не бесплатен">

8.0 KB рантайма против 5.5 KB у `next-intlayer`, и +6-7 KB на страницу по сравнению с нативной сборкой. Это плата за API `next-intl`. Когда все компоненты будут переведены на `useIntlayer`, удалите адаптер.

</Accordion>
<Accordion header="messages, timeZone и now в провайдере игнорируются">

Форматтеры основаны на нативном `Intl`, и только локаль влияет на вывод. Если вам нужен принудительный часовой пояс или фиксированное `now` для стабильной гидратации дат, управляйте этим в месте вызова. См. [форматирование дат, времени и чисел](https://intlayer.org/ru/blog/date-time-number-formatting-locales).

</Accordion>
</AccordionGroup>

## Когда использовать что?

<AccordionGroup>
<Accordion header="Остаться на next-intl">

Ваше приложение небольшое, размер бандла вас не беспокоит, и вашей команде удобно вручную управлять пространствами имен и `pick()` на каждой странице.

</Accordion>
<Accordion header="Использовать @intlayer/next-intl">

Вы уже используете `next-intl` сегодня и хотите получить преимущества в размере бандла, отсутствии утечек, быстрой гидратации, типизированных ключах и инструментах CLI / CMS без переписывания кода. Это рекомендуемая точка входа для любой существующей кодовой базы `next-intl`.

</Accordion>
<Accordion header="Перейти на нативный next-intlayer">

Для новых проектов или когда адаптер выполнил свою задачу. Это самый легкий из трех вариантов (5.5 KB, +0.3 KB на страницу), который открывает синхронные серверные компоненты, файлы `.content.ts` для каждого компонента и полный набор функций. Начните с [Intlayer с Next.js](https://intlayer.org/ru/doc/environment/nextjs).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Действительно ли код моего приложения остается нетронутым?">

В Next.js да для компонентов: сборка бенчмарка изменила только `next.config.ts` и `intlayer.config.ts`. `getRequestConfig` в `src/i18n.ts`, проп `messages` в провайдере и вызовы `pick()` становятся мертвым кодом, который затем можно удалить.

</Question>

<Question title="Что происходит с сообщениями ICU?">

Они продолжают работать. `t("key", { count })`, `t.rich()`, `t.markup()`, `select`, `selectordinal`, `#` и `{ts, date, long}` обрабатываются резолвером ICU в Intlayer. См. [формат сообщений ICU](https://intlayer.org/ru/blog/icu-message-format).

</Question>

<Question title="Почему адаптер тяжелее нативного next-intlayer?">

Он несет на себе API `next-intl` поверх ядра Intlayer: `useFormatter`, `t.rich`, резолвер ICU, хелперы навигации. Это 8.0 KB против 5.5 KB и +6 KB на страницу. Это мост, а не конечная цель.

</Question>

<Question title="Могу ли я мигрировать компонент за компонентом?">

Да. Любой компонент может перейти с `useTranslations("about")` на `useIntlayer("about")` с рядом лежащим `.content.ts`. Словари JSON и `.content.ts` сосуществуют и объединяются.

</Question>

<Question title="Работают ли локализованные пути (pathnames)?">

Не через `pathnames` из `next-intl`: адаптер принимает их для типизации, но не интерполирует. Используйте вместо этого `routing.rewrite` от Intlayer.

</Question>

</FAQ>

## Связанные сравнения

Та же серия адаптеров:

- [i18next vs @intlayer/i18next](https://intlayer.org/ru/blog/i18next-vs-intlayer-i18next)
- [Lingui vs @intlayer/lingui](https://intlayer.org/ru/blog/lingui-vs-intlayer-lingui)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/ru/blog/vue-i18n-vs-intlayer-vue-i18n)

Прямое сравнение библиотек:

- [next-intl vs Intlayer](https://intlayer.org/ru/blog/next-intl-vs-intlayer), тот же бенчмарк
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/ru/blog/next-i18next-vs-next-intl-vs-intlayer)
- [Is next-intl outdated?](https://intlayer.org/ru/blog/is-next-intl-outdated)

Справочная документация:

- [Compat adapter: next-intl](https://intlayer.org/ru/doc/compatibility/next-intl)
- [Руководство по миграции: с next-intl на Intlayer](https://intlayer.org/ru/doc/migration/next-intl)
- [Отчет о бенчмарке Next.js](https://intlayer.org/ru/doc/benchmark/nextjs) и [отчет о бенчмарке TanStack Start](https://intlayer.org/ru/doc/benchmark/tanstack)
- [Оптимизация бандла](https://intlayer.org/ru/doc/concept/bundle-optimization) и [компилятор Intlayer](https://intlayer.org/ru/doc/compiler)
- [Визуальный редактор](https://intlayer.org/ru/doc/concept/editor), [CMS](https://intlayer.org/ru/doc/concept/cms) и [ИИ-перевод](https://intlayer.org/ru/doc/concept/auto-fill)

## Заключение

`@intlayer/next-intl` делает одно: изменяет, к чему привязан `useTranslations`, от провайдера, содержащего все сообщения, к словарю, скомпилированному для этого компонента. На том же Next.js приложении, которое стоит **6 KB на страницу**, **компоненты в 2,7 раза меньше**, **0% утечек** и **2 мс гидратации**, прежде чем кто-либо откроет файл компонента. Навигация и middleware сохраняют свой API поверх конфига маршрутизации Intlayer, а нативный runtime `next-intlayer` остается еще более легким.

Все исходные данные, тестовые приложения и скрипты находятся в [репозитории Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Запустите это самостоятельно.

Дополнительные сведения см. в документации ['Why Intlayer?'](https://intlayer.org/doc/why).

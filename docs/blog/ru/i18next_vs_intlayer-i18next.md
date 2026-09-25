---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "i18next vs @intlayer/i18next: Тот же API, другой бандл"
description: Что меняется, когда приложение на React или Next.js сохраняет вызовы i18next, react-i18next и next-i18next, но обслуживает их через адаптеры @intlayer/i18next. Размер JavaScript на страницу, вес компонентов, утечка строк и гидратация на одном и том же коде, а также то, что адаптеры сохраняют, игнорируют и чем не могут стать.
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - "@intlayer/i18next"
  - "@intlayer/react-i18next"
  - "@intlayer/next-i18next"
  - Intlayer
  - Адаптер совместимости
  - Миграция
  - Интернационализация
  - i18n
  - Бенчмарк
  - Размер бандла
  - Блог
  - Next.js
  - React
slugs:
  - blog
  - i18next-vs-intlayer-i18next
author: aymericzip
---

# i18next VS @intlayer/i18next | Тот же API, другой бандл

![i18next VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`@intlayer/i18next`, `@intlayer/react-i18next` и `@intlayer/next-i18next` - это адаптеры совместимости. Они предоставляют API `i18next`, который уже использует ваш код (`useTranslation`, `t()`, `<Trans>`, `i18n.changeLanguage()`, `getFixedT`, `serverSideTranslations`...), и передают данные из словарей, скомпилированных Intlayer. Компоненты не меняются. Меняется среда выполнения (runtime) под ними.

В этой статье измеряется эффект от этой замены на одном и том же приложении Next.js, собранном сначала с `next-i18next`, а затем с `@intlayer/next-i18next`. Исходные цифры взяты из [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Если вас интересует сравнение `i18next` и Intlayer как отдельных библиотек, прочтите [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/i18next_vs_intlayer.md). Этот материал посвящен тому, что именно меняет адаптер, если вы оставляете свой код в исходном виде.

<TOC/>

> **tl;dr**: В одном и том же приложении Next.js замена `next-i18next` на `@intlayer/next-i18next` уменьшила объем JavaScript на страницу с **218.5 КБ до 150.7 КБ** gzip (базовая конфигурация) и превзошла полностью оптимизированную конфигурацию `next-i18next` (163.4 КБ) на **12.7 КБ**. Средний компонент уменьшился с **78.5 КБ до 9.7 КБ**, утечка строк других страниц упала с **~90% до 0%**, гидратация ускорилась с **15.6 мс до 11.3 мс**, а runtime сократился с **19.7 КБ до 9.4 КБ**. Ни один компонент не редактировался; изменился только файл провайдера. Плагины `i18next` (бэкенды, детекторы языка) принимаются, но ничего не делают: во время выполнения больше нечего загружать или определять.

## Что такое `@intlayer/i18next`

`i18next` - это рантайм. Вызов `i18n.init({ resources })` или бэкенд-плагин загружает `locales/{lng}/{ns}.json` в глобальный экземпляр; вызов `useTranslation("about")` подписывает компонент на него; `t("title")` ищет ключ во время рендеринга. Пространства имен (namespaces), ленивая загрузка, списки пространств имен для каждой страницы и строгая типизация полностью остаются на вашей стороне для настройки и поддержки.

Адаптеры сохраняют API и заменяют глобальный экземпляр:

1. **Алиасы импорта.** Функция `createNextI18nPlugin()` из `@intlayer/next-i18next/plugin` (или `withI18next`) оборачивает `withIntlayer` и добавляет алиасы Webpack / Turbopack, благодаря чему `next-i18next`, `react-i18next` и `i18next` разрешаются в соответствующие пакеты `@intlayer/*`. В Vite `reactI18nextVitePlugin()` из `@intlayer/react-i18next/plugin` выполняет ту же задачу. Ни один импорт не переименовывается.
2. **JSON как единственный источник истины.** Плагин `syncJSON` считывает существующие файлы `locales/{lng}/{ns}.json` с параметром `format: "i18next"` (поэтому `{{name}}`, вложенность `$t()`, суффиксы `_one` / `_other` и контекстные суффиксы разбираются корректно) и записывает переводы обратно, когда CLI или CMS обновляют их.
3. **Связывание на месте вызова.** Этап оптимизации Intlayer переписывает `useTranslation("about")` в вызов, который напрямую получает словарь `about` в активной локали. Компонент больше не обращается к глобальному хранилищу.

```tsx fileName="components/About.tsx"
// Ваш код, без изменений
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="Что генерирует компилятор (упрощенно)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslation } from "@intlayer/react-i18next";

const About = () => {
  const { t } = useTranslation(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

Именно эта перезапись обеспечивает колоссальное уменьшение размера компонентов и ликвидацию утечек контента в таблице ниже.

## Что адаптеры сохраняют, игнорируют и не заменяют

| API `i18next`                                                                            | С `@intlayer/*`                                                                                               |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `useTranslation("ns")`, `useTranslation("ns", { keyPrefix })`                            | ✅ Сохранено. Привязывается к словарю `ns` во время сборки; ключи типизированы по вашему контенту             |
| `t("key", { name })`, `{{interpolation}}`, вложенность `$t(key)`                         | ✅ Сохранено                                                                                                  |
| Формы множественного числа `key_one` / `key_other`, контекст `key_male`, `returnObjects` | ✅ Сохранено. Множественные числа рассчитываются через `Intl.PluralRules`                                     |
| `<Trans>` с `components`, нумерованными тегами `<1>...</1>`, `values`                    | ✅ Сохранено                                                                                                  |
| `withTranslation`, `Translation`, `I18nContext`                                          | ✅ Сохранено                                                                                                  |
| `i18n.changeLanguage()`, `i18n.language`, `i18n.dir()`, `on("languageChanged")`          | ✅ Сохранено. `changeLanguage` управляет локалью Intlayer                                                     |
| `getFixedT(lng, ns, keyPrefix)`, `i18n.exists()`, `hasLoadedNamespace()`                 | ✅ Сохранено                                                                                                  |
| `i18n.use(Backend).use(LanguageDetector).init({...})`                                    | ⚠️ `use()` вызывает `init` плагина и завершает работу; бэкендам и детекторам нечего загружать или определять  |
| `init({ resources })`, `addResourceBundle()`                                             | ⚠️ `resources` **игнорируется** с предупреждением в dev-режиме; удалите импорты JSON для снижения веса бандла |
| `I18nextProvider i18n={i18n}`                                                            | ⚠️ Рендерит `IntlayerProvider`; проп `i18n` игнорируется. В App Router передайте локаль (см. ниже)            |
| `serverSideTranslations(locale, ["common"])` (next-i18next)                              | ⚠️ Возвращает ожидаемую структуру и ничего не загружает. Безопасно оставить, безопасно удалить                |
| `appWithTranslation(App)` (next-i18next)                                                 | ✅ Сохранено                                                                                                  |
| `next-i18next.config.js`                                                                 | ⚠️ Не считывается. Локали берутся из `intlayer.config.ts`                                                     |
| Простой `useTranslation()` без пространства имен                                         | ✅ Работает со словарем `translation` всего файла целиком (`splitKeys: false`)                                |

## Бенчмарк

### Что измерялось

Тестовый набор [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) собирает **одно и то же приложение** в каждой конфигурации: **10 страниц** (главная, о нас, блог, карьера, контакты, FAQ, цены, продукты, настройки, команда), **10 локалей** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), идентичные компоненты и контент. Страницы тестируются в `en` и `fr`.

Сборка `next-i18next` тестировалась по четырем стратегиям: от импорта всех JSON в `resources` (`static`) до отдельного пространства имен на маршрут с ленивой загрузкой через бэкенд (`scoped-dynamic`). Адаптер тестировался на **тех же компонентах, что и базовая сборка**, с изменениями только в `next.config.ts`, `intlayer.config.ts` и файле провайдера. У него нет ручного режима "scoped": компилятор изолирует контент для каждого компонента автоматически.

Для каждой сборки фиксируются показатели:

- **Размер библиотеки**: gzip-размер пустого компонента, который импортирует только библиотеку i18n.
- **JS на страницу**: средний объем gzip JavaScript, загружаемый на страницу по всем маршрутам и локалям.
- **% утечки локали**: доля строк в загруженном JS, относящаяся к языку, который пользователь в данный момент **не** просматривает.
- **% утечки страницы**: доля строк в загруженном JS, относящаяся к странице, на которой пользователь в данный момент **не** находится.
- **Средний вес компонента**: средний gzip-размер каждого изолированно скомпилированного компонента.
- **E2E-реактивность**: реальное время между выбором новой локали и обновлением атрибута `html[lang]` в DOM (Playwright, 5 итераций).
- **Гидратация**: продолжительность фазы гидратации React.

> Приведенные ниже цифры получены в прогоне от **12.09.2026** с версиями `next-i18next` 16.3.0 (`react-i18next` 17.0.13, `i18next` 26.4.2) и `@intlayer/next-i18next` 9.5.1. Тестовое приложение намеренно компактное (несколько десятков строк на локаль), поэтому проценты утечки отражают **тенденцию**: они масштабируются вместе с вашим контентом, тогда как стоимость рантайма остается неизменной.

### Результаты на Next.js

Выберите метрики и библиотеки, которые вас интересуют:

<I18nBenchmark framework="nextjs" vertical/>

| Конфигурация                 | Стратегия      | Размер либы (gz) | JS стр сред (gz) | Утечка локали | Утечка стр | Комп сред (gz) | E2E-реактивность |  Гидратация |
| ---------------------------- | -------------- | ---------------: | ---------------: | ------------: | ---------: | -------------: | ---------------: | ----------: |
| **base** (без i18n)          | -              |           0.0 КБ |         141.0 КБ |          0.0% |       0.0% |         0.9 КБ |          13.4 мс |     11.8 мс |
| `next-i18next`               | static         |          19.7 КБ |         218.5 КБ |          0.0% |      89.8% |        78.5 КБ |          16.4 мс |     15.6 мс |
| `next-i18next`               | dynamic        |          19.7 КБ |         169.5 КБ |         50.0% |      89.8% |        26.1 КБ |          15.4 мс |     27.7 мс |
| `next-i18next`               | scoped-static  |          19.7 КБ |         220.1 КБ |          0.0% |      89.8% |        78.9 КБ |          16.4 мс |     14.7 мс |
| `next-i18next`               | scoped-dynamic |          19.7 КБ |         163.4 КБ |          0.0% |       0.0% |        27.1 КБ |          15.9 мс |     15.1 мс |
| **`@intlayer/next-i18next`** | static         |       **9.4 КБ** |     **150.7 КБ** |      **0.0%** |   **0.0%** |     **9.7 КБ** |      **10.7 мс** | **11.3 мс** |
| **`@intlayer/next-i18next`** | dynamic        |       **9.4 КБ** |     **150.7 КБ** |      **0.0%** |   **0.0%** |     **9.7 КБ** |      **11.9 мс** | **10.6 мс** |
| `next-intlayer` (native)     | static         |           5.5 КБ |         141.3 КБ |          0.0% |       0.0% |         8.5 КБ |          15.5 мс |     16.9 мс |
| `next-intlayer` (native)     | dynamic        |           5.5 КБ |         141.3 КБ |          0.0% |       0.0% |         6.9 КБ |          15.3 мс |     15.9 мс |

**Как читать эти данные**

- **На 68 КБ меньше на страницу по сравнению с базовым подходом.** Подход `resources: { en, fr, ... }` отправляет каждую локаль и каждое пространство имен на каждую страницу: **218.5 КБ**. Сборка с адаптером для тех же компонентов составляет **150.7 КБ**. Она также обходит лучшую конфигурацию `next-i18next` (163.4 КБ, одно пространство имен на маршрут с ленивой загрузкой) на 12.7 КБ, поскольку только рантайм `i18next` весит 19.7 КБ против 9.4 КБ.
- **Утечка снижается до 0% без правки компонентов.** Любая конфигурация `next-i18next`, кроме полностью изолированной вручную, отправляет ~90% строк посторонних страниц. Строка `dynamic` на практике проигрывает: она не устраняет утечку страниц и добавляет **50% утечки локалей**, так как бэкенд для локали вытягивает всё пространство имен `translation`. Адаптер обеспечивает 0% / 0% сразу на исходном коде.
- **Компоненты легче в 8 раз.** Компонент с `useTranslation()`, скомпилированный изолированно, весит в среднем **78.5 КБ** с инлайновыми `resources` и **26-27 КБ** с бэкендом, так как `t` жестко связан с глобальным хранилищем. С адаптером его вес падает до **9.7 КБ**.
- **Быстрее гидратация и переключение локали.** Гидратация ускоряется с 15.6 мс до **11.3 мс** (и с 27.7 мс в конфигурации `dynamic`, где запрос бэкенда блокирует критический путь). Переключение языка ускоряется с 15-16 мс до **11-12 мс**.
- **Адаптер не равен нативному рантайму.** `next-intlayer` весит **141.3 КБ**, всего на +0.3 КБ больше базового приложения без i18n. Адаптер несет поверх ядра Intlayer всю поверхность API `i18next` (синтаксис интерполяции, суффиксы чисел и контекста, разбор тегов `<Trans>`): 9.4 КБ и +9.4 КБ на страницу относительно нативного решения. Это промежуточный мост, а не конечная точка.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Полная таблица, каждая библиотека и каждая стратегия, в [отчете о бенчмарке Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/nextjs.md).

> Адаптер `react-i18next` на Vite / TanStack Start не входил в этот тестовый прогон. Базовые замеры для `react-i18next` на TanStack Start можно найти в статье [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/i18next_vs_intlayer.md): 127-184 КБ на страницу и 123-185 мс задержки переключения языка при отложенном бэкенде.

## Почему изменяются показатели

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

В директории `components/` ничего не менялось, поэтому весь выигрыш достигается за счет того, к чему привязан `useTranslation`.

**В случае `i18next`** привязка идет к глобальному экземпляру. Все, что было в него загружено (все языки в `static`, всё пространство имен активного языка в `dynamic`), доступно из любого компонента, вызывающего `useTranslation()`. Бандлер не может разделить код тоньше того, что удерживает экземпляр, а среда выполнения не знает, какие ключи понадобятся при рендеринге.

```bash
.
├── next-i18next.config.js
├── public/locales
│   ├── en/translation.json           # строки всех страниц
│   └── fr/translation.json
├── i18n/i18n.ts                      # i18n.use(initReactI18next).init({ resources })
└── components
    ├── AppProviders.tsx              # <I18nextProvider i18n={i18n}>
    └── About.tsx                     # useTranslation(); t("about.title")
```

Все, что содержит экземпляр, отправляется на каждую страницу, и утечки растут по двум осям, страницы и локали:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

**В случае `@intlayer/next-i18next`** связывание идет напрямую со словарем. Плагин `syncJSON` превращает каждый файл пространства имен в словарь; оптимизатор передает компоненту только запрошенный словарь в виде импорта, который сборщик может отследить и разделить по страницам и локалям.

```bash
.
├── intlayer.config.ts                # syncJSON({ format: "i18next", source: ... })
├── public/locales
│   ├── en/translation.json           # без изменений, по-прежнему источник истины
│   └── fr/translation.json
├── .intlayer/                        # генерируется: по словарю на пространство имен и локаль
└── components
    ├── AppProviders.tsx              # <IntlayerClientProvider locale={locale}>
    └── About.tsx                     # useTranslation(); t("about.title")  ← без изменений
```

Файл `i18n/i18n.ts` и импорт `resources` превращаются в мертвый код. Именно отсюда берется экономия в 68 КБ.

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

Команда распознает `i18next` / `react-i18next` / `next-i18next`, установит `intlayer`, пакет фреймворка (`next-intlayer` или `react-intlayer`), соответствующий адаптер `@intlayer/*` и `@intlayer/sync-json-plugin`, а также сгенерирует `intlayer.config.ts`. Оставьте исходные библиотеки установленными: они выступают peer dependencies и предоставляют типы.

</Step>
<Step number={2} title="Настройка путей к файлам локалей">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
    format: "i18next",
  },
  plugins: [
    syncJSON({
      // диалект i18next: {{name}}, $t(key), key_one / key_other, key_male
      format: "i18next",
      // Один файл на пространство имен: `useTranslation("about")` → about.json
      source: ({ locale, key }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

Если у вас один файл `translation.json` на локаль (дефолтный namespace в i18next), установите `splitKeys: false`, чтобы весь файл оставался единым словарем и прямой вызов `useTranslation()` продолжал корректно работать.

</Step>
<Step number={3} title="Подключение плагина">

<Tabs>
<Tab label="Next.js">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { withI18next } from "@intlayer/next-i18next/plugin";

const nextConfig: NextConfig = {};

export default withI18next(nextConfig);
```

В App Router клиентские компоненты получают локаль из сегмента `[locale]`. Адаптер `I18nextProvider` не принимает проп локали, поэтому замените его единожды в файле провайдера:

```tsx fileName="components/AppProviders.tsx"
"use client";

import { IntlayerClientProvider } from "next-intlayer";
import type { LocalesValues } from "intlayer";

export const AppProviders = ({
  locale,
  children,
}: {
  locale: LocalesValues;
  children: React.ReactNode;
}) => (
  <IntlayerClientProvider locale={locale}>{children}</IntlayerClientProvider>
);
```

Все компоненты ниже по дереву продолжают вызывать `useTranslation()` без правок.

</Tab>
<Tab label="Vite / TanStack Start">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

Плагин `reactI18nextVitePlugin()` оборачивает `vite-intlayer` и настраивает алиасы для `react-i18next` и `i18next`. Для проекта без React плагин `i18nextVitePlugin()` из `@intlayer/i18next/plugin` алиасит только `i18next`.

</Tab>
</Tabs>

</Step>
</Steps>

### Что можно удалить после перехода

| Файл / шаблон                                          | Причина                                                                             |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| `resources: { en, fr, ... }` и импорты JSON            | Игнорируются адаптером. Именно здесь крылись 68 КБ                                  |
| `i18next-http-backend`, `i18next-resources-to-backend` | В рантайме больше нечего запрашивать по сети                                        |
| `i18next-browser-languagedetector`                     | Определение языка выполняет маршрутизация Intlayer (префикс URL, cookie, заголовок) |
| `serverSideTranslations()` в `getStaticProps`          | Возвращает пустую структуру; безвредно, но не нужно                                 |
| `next-i18next.config.js`                               | Не считывается. Локали настраиваются в `intlayer.config.ts`                         |
| Списки `ns: [...]` для каждой страницы                 | Компилятор связывает пространства имен с каждым компонентом автоматически           |

### Что вы получаете помимо байтов

- **Типизированные ключи.** `useTranslation("about")` типизируется по скомпилированному словарю `about`; опечатка вроде `t("does.not.exist")` вызывает ошибку TypeScript, а не возврат строки ключа.
- **`npx intlayer test`** прерывает CI при отсутствии перевода в любой локали. **`npx intlayer fill`** переводит недостающие ключи через ваш API-ключ (OpenAI, Anthropic, Mistral, Gemini...) и записывает их обратно в `locales/{lng}/{ns}.json`.
- **Визуальный редактор и CMS** работают с тем же JSON, позволяя переводчикам вносить правки через UI с фиксацией в Git.
- **Постепенный переход на `.content.ts`.** Любой компонент можно переключить с `useTranslation("about")` на `useIntlayer("about")` с изолированным файлом контента. Словари JSON и `.content.ts` сосуществуют без проблем.

## Ограничения, о которых важно знать

<AccordionGroup>
<Accordion header="Бэкенды и детекторы не активны">

`i18n.use(HttpBackend)` вызывает init плагина и ничего больше. Если ваше приложение полагалось на получение переводов из CMS во время выполнения, этот процесс больше не работает; используйте [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md) или команды `intlayer pull` / `push`. Определение локали становится конфигурацией маршрутизации Intlayer (префикс URL, cookie, заголовок).

</Accordion>
<Accordion header="resources игнорируется, а не объединяется">

В отличие от некоторых других адаптеров, `@intlayer/i18next` не использует встроенные `resources` в качестве резервного варианта. Каждый ключ должен существовать в синхронизированных словарях, что проверяет `intlayer test`.

</Accordion>
<Accordion header="App Router требует изменения провайдера">

Один файл, показанный выше. Pages Router с `appWithTranslation` не требует никаких изменений.

</Accordion>
<Accordion header="next-i18next.config.js не считывается">

`localePath`, `fallbackLng`, `reloadOnPrerender` и аналоги не имеют эквивалентов; локали и резервные варианты берутся из `intlayer.config.ts`.

</Accordion>
<Accordion header="Адаптер не бесплатен">

9.4 КБ рантайма и +9.4 КБ на страницу по сравнению с `next-intlayer`. Как только каждый компонент перейдет на `useIntlayer`, удалите его.

</Accordion>
</AccordionGroup>

## Когда что выбирать?

<AccordionGroup>
<Accordion header="Остаться на i18next">

Ваше приложение зависит от бэкендов времени выполнения (переводы, предоставляемые CMS во время запроса), от экосистемы плагинов или от платформы без React, которую адаптеры не поддерживают.

</Accordion>
<Accordion header="Использовать @intlayer/*">

Вы используете `react-i18next` / `next-i18next` и хотите получить экономию 68 КБ, в 8 раз меньшие компоненты, 0% утечек, типизированные ключи и проверки CI без переписывания кода. Это точка входа для существующей кодовой базы `i18next`.

</Accordion>
<Accordion header="Перейти на нативный (next-intlayer / react-intlayer)">

Для новых проектов или когда адаптер выполнил свою задачу. Он имеет самый легкий рантайм (5.5 КБ, +0.3 КБ на страницу) и открывает доступ к синхронным серверным компонентам и файлам `.content.ts` для каждого компонента. Начните с [Intlayer с Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_16.md) или [с Vite и React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+react.md).

</Accordion>
</AccordionGroup>

## Часто задаваемые вопросы

<FAQ>

<Question title="Откуда берутся 68 КБ?">

Из `resources: { en, fr, ... }`. Стандартная настройка `next-i18next` импортирует JSON каждой локали в `init()`, поэтому каждая страница несет в себе каждое пространство имен на каждом языке: **218.5 КБ** на страницу. Адаптер никогда не включает этот блок целиком; он передает каждому компоненту только названный словарь на активном языке.

</Question>

<Question title="Продолжают ли работать мои компоненты <Trans>?">

Да, с `components`, нумерованными тегами `<1>...</1>` и `values`. Также поддерживаются `{{interpolation}}`, вложенность `$t(key)`, формы множественного числа `key_one` / `key_other` (вычисляемые с помощью `Intl.PluralRules`), суффиксы контекста и `returnObjects`.

</Question>

<Question title="Что если я использую один файл translation.json для каждой локали?">

Установите `splitKeys: false` в плагине `syncJSON`. Весь файл останется одним словарем, и обычный вызов `useTranslation()` продолжит разрешаться относительно него.

</Question>

<Question title="Это то же самое, что миграция на Intlayer?">

Нет, это мост. Адаптер сохраняет API `i18next` и требует 9.4 КБ рантайма; нативный `next-intlayer` весит 5.5 КБ и добавляет синхронные серверные компоненты и файлы `.content.ts` рядом с компонентами. Вы можете мигрировать покомпонентно, так как словари JSON и `.content.ts` сосуществуют.

</Question>

<Question title="Могут ли переводчики продолжать работать так, как они привыкли?">

Да. `locales/{lng}/{ns}.json` остается источником истины: `syncJSON` считывает его с диалектом i18next и записывает переводы обратно при обновлении через CLI или CMS.

</Question>

</FAQ>

## Связанные сравнения

Та же серия адаптеров:

- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/next-intl_vs_intlayer-next-intl.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/lingui_vs_intlayer-lingui.md)
- [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/vue-i18n_vs_intlayer-vue-i18n.md)

Прямое сравнение библиотек:

- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/i18next_vs_intlayer.md), same benchmark
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/react-i18next_vs_react-intl_vs_intlayer.md)
- [Is i18next outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/is_i18next_outdated.md)

Справочная документация:

- Compat adapters: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/i18next.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/next-i18next.md)
- Migration guides: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_i18next_to_intlayer.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_react-i18next_to_intlayer.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_next-i18next_to_intlayer.md)
- [Next.js benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/nextjs.md) and [TanStack Start benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/tanstack.md)
- [Bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md) and [the Intlayer compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md)
- [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md) and [AI translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/autoFill.md)

## Заключение

`i18next` оказался самым тяжелым рантаймом в этом бенчмарке, а адаптеры снимают подавляющую часть его нагрузки, сохраняя привычный API. На одном и том же приложении Next.js это дает **на 68 КБ меньше на страницу** по сравнению с наивной настройкой, **на 12.7 КБ меньше**, чем в самой оптимизированной ручной сборке, **в 8 раз более компактные компоненты**, **0% утечек** и **на 4 мс более быструю гидратацию** ценой одного конфига, одной строки плагина и замены провайдера. Бэкенды и детекторы становятся неактивными, `resources` игнорируется, а нативный `next-intlayer` остается еще на 9 КБ легче.

Все сырые данные, тестовые приложения и скрипты опубликованы в [репозитории Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom).

Подробности смотрите в документе [Почему Intlayer?](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/interest_of_intlayer.md).

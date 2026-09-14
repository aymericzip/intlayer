---
createdAt: 2026-09-13
updatedAt: 2026-09-13
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

`@intlayer/i18next`, `@intlayer/react-i18next` и `@intlayer/next-i18next` - это адаптеры совместимости. Они предоставляют API `i18next`, который уже использует ваш код (`useTranslation`, `t()`, `<Trans>`, `i18n.changeLanguage()`, `getFixedT`, `serverSideTranslations`...), и передают данные из словарей, скомпилированных Intlayer. Компоненты не меняются. Меняется среда выполнения (runtime) под ними.

В этой статье измеряется эффект от этой замены на одном и том же приложении Next.js, собранном сначала с `next-i18next`, а затем с `@intlayer/next-i18next`. Исходные цифры взяты из [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Если вас интересует сравнение `i18next` и Intlayer как отдельных библиотек, прочтите [i18next vs Intlayer](https://intlayer.org/ru/blog/i18next-vs-intlayer). Этот материал посвящен тому, что именно меняет адаптер, если вы оставляете свой код в исходном виде.

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

> Адаптер `react-i18next` на Vite / TanStack Start не входил в этот тестовый прогон. Базовые замеры для `react-i18next` на TanStack Start можно найти в статье [i18next vs Intlayer](https://intlayer.org/ru/blog/i18next-vs-intlayer): 127-184 КБ на страницу и 123-185 мс задержки переключения языка при отложенном бэкенде.

## Почему изменяются показатели

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

- **Бэкенды и детекторы неактивны.** `i18n.use(HttpBackend)` просто вызывает `init` плагина. Если ваше приложение рассчитывало на подгрузку переводов из CMS при каждом запросе, эта схема больше не работает; используйте CMS Intlayer или команды `intlayer pull` / `push`.
- **`resources` игнорируется, а не объединяется.** В отличие от некоторых адаптеров, `@intlayer/i18next` не использует инлайновые `resources` как запасной вариант. Каждый ключ обязан существовать в синхронизированных словарях, что проверяется командой `intlayer test`.
- **App Router требует правки провайдера.** Всего один файл, показанный выше. Pages Router с `appWithTranslation` не требует никаких правок.
- **`next-i18next.config.js` игнорируется.** Настройки `localePath`, `fallbackLng`, `reloadOnPrerender` и аналогичные не действуют; локали и запасные варианты берутся из `intlayer.config.ts`.
- **Адаптер не бесплатный.** 9.4 КБ в рантайме и +9.4 КБ на страницу относительно `next-intlayer`. Когда все компоненты мигрируют на `useIntlayer`, адаптер можно отключить.

## Когда что выбирать?

- **Оставайтесь на `i18next`**, если приложение жестко зависит от сетевых бэкендов в рантайме (раздача переводов из CMS по запросу), экосистемы сторонних плагинов или окружения вне React, которое адаптеры не поддерживают.
- **Используйте `@intlayer/*`**, если вы работаете с `react-i18next` / `next-i18next` и хотите выиграть 68 КБ, сделать компоненты в 8 раз легче, устранить утечки (0%), получить типизацию ключей и проверки в CI без переписывания кодовой базы. Это лучший путь модернизации существующего проекта на `i18next`.
- **Переходите на нативный `next-intlayer` / `react-intlayer`** для новых проектов или после завершения этапа адаптера. Это самое быстрое и легкое решение (5.5 КБ, +0.3 КБ на страницу), открывающее синхронные серверные компоненты и изолированные файлы контента `.content.ts`.

## Связанные сравнения

- [i18next vs Intlayer](https://intlayer.org/ru/blog/i18next-vs-intlayer) (сравнение библиотек, тот же бенчмарк)
- [next-intl vs @intlayer/next-intl](https://intlayer.org/ru/blog/next-intl-vs-intlayer-next-intl) (та же серия адаптеров)
- [Lingui vs @intlayer/lingui](https://intlayer.org/ru/blog/lingui-vs-intlayer-lingui) (та же серия адаптеров)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/ru/blog/vue-i18n-vs-intlayer-vue-i18n) (та же серия адаптеров)
- Руководства по миграции: [i18next](https://intlayer.org/ru/doc/migration/i18next), [react-i18next](https://intlayer.org/ru/doc/migration/react-i18next), [next-i18next](https://intlayer.org/ru/doc/migration/next-i18next)
- Документация адаптеров: [i18next](https://intlayer.org/ru/doc/compatibility/i18next), [react-i18next](https://intlayer.org/ru/doc/compatibility/react-i18next), [next-i18next](https://intlayer.org/ru/doc/compatibility/next-i18next)

## Заключение

`i18next` оказался самым тяжелым рантаймом в этом бенчмарке, а адаптеры снимают подавляющую часть его нагрузки, сохраняя привычный API. На одном и том же приложении Next.js это дает **на 68 КБ меньше на страницу** по сравнению с наивной настройкой, **на 12.7 КБ меньше**, чем в самой оптимизированной ручной сборке, **в 8 раз более компактные компоненты**, **0% утечек** и **на 4 мс более быструю гидратацию** ценой одного конфига, одной строки плагина и замены провайдера. Бэкенды и детекторы становятся неактивными, `resources` игнорируется, а нативный `next-intlayer` остается еще на 9 КБ легче.

Все сырые данные, тестовые приложения и скрипты опубликованы в [репозитории Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom).

Подробности смотрите в документе [Почему Intlayer?](https://intlayer.org/ru/doc/why).

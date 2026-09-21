---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n vs Intlayer: бенчмарк 2026"
description: vue-i18n и Intlayer, измеренные на одном и том же приложении Vite + Vue 3. Размер библиотеки, JavaScript на страницу, утечка контента, размер компонентов и реактивность переключения локали, с объяснением цифр.
keywords:
  - vue-i18n
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer-benchmark
author: aymericzip
---

# vue-i18n VS Intlayer | Бенчмарк интернационализации (i18n) для Vue

`vue-i18n` — эталонная i18n-библиотека для Vue. Intlayer — альтернатива на основе компилятора с контентом, ограниченным областью компонента, и интеграцией с Vue (`vue-intlayer`). Мы уже сравнивали их [возможности и опыт разработчика](https://intlayer.org/blog/vue-i18n-vs-intlayer). Эта статья рассматривает, во что обходится каждая из них после сборки приложения.

Данные взяты из [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), open-source набора, который собирает одно и то же приложение с каждой библиотекой и записывает, что браузер на самом деле загружает и выполняет.

<TOC/>

> **tl;dr**: На одном и том же приложении Vite + Vue 3 `vue-i18n` отдаёт **134,9 КБ** gzip-сжатого JavaScript на страницу против **41,3 КБ** для приложения без i18n. Intlayer отдаёт **57,1 КБ**. Один только рантайм `vue-i18n` весит **24,3 КБ gzip** (в 6 раз больше 3,9 КБ у Intlayer), каждая страница несёт **90 % строк чужих страниц**, а компонент, скомпилированный изолированно, тянет за собой **196 КБ**, потому что привязан к глобальному дереву сообщений. Адаптер `@intlayer/vue-i18n` сохраняет API `vue-i18n` и показал **47,0 КБ** на страницу.

## Коротко

- **vue-i18n** — де-факто i18n-библиотека для Vue 2 / Vue 3 и ядро `@nuxtjs/i18n`. Сообщения в стиле ICU, блоки `<i18n>` в SFC, директива `v-t`, форматтеры `d()` / `n()`, большая экосистема. Сообщения регистрируются на глобальном экземпляре в `createI18n()`; ленивая загрузка по локали — это ручной паттерн с `setLocaleMessage()`, а разбиение по маршрутам вам нужно строить самостоятельно.
- **Intlayer** — модель контента, ориентированная на компоненты. Словари `.content.ts` лежат рядом с компонентом, который они обслуживают, компилятор на этапе сборки (`vite-intlayer`) выполняет tree-shaking и ленивую загрузку по компонентам и по локалям, строгие типы TypeScript генерируются из вашего контента, а отсутствующие переводы приводят к ошибке на этапе сборки. Включает хелперы для роутера / SEO, Visual Editor / CMS и перевод с помощью ИИ.

| Библиотека            | Звёзды GitHub                                                                                                                                                                  | Всего коммитов                                                                                                                                                                     | Последний коммит                                                                                                                                    | Первая версия | Версия NPM                                                                                                  | Загрузки NPM                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Апрель 2024   | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) |
| `intlify/vue-i18n`    | [![GitHub Repo stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       | Дек 2016      | [![npm](https://img.shields.io/npm/v/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) | [![npm downloads](https://img.shields.io/npm/dm/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) |

> Бейджи обновляются автоматически. Снимки будут меняться со временем.

## Сравнение возможностей бок о бок

| Возможность                                             | `vue-intlayer` (Intlayer)                                     | `vue-i18n`                                                                         |
| ------------------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **Переводы рядом с компонентами**                       | ✅ Да, `.content.ts` располагается рядом с каждым компонентом | ✅ Через блоки SFC `<i18n>` (опционально); обычно используются глобальные каталоги |
| **Интеграция с TypeScript**                             | ✅ Строгие типы автоматически генерируются из контента        | ✅ Хорошие типы; строгая безопасность ключей требует типизации схемы и дисциплины  |
| **Обнаружение отсутствующих переводов**                 | ✅ Ошибка TypeScript + ошибка/предупреждение во время сборки  | ⚠️ Fallback во время выполнения + предупреждение в консоли                         |
| **Богатый контент (компоненты / Markdown)**             | ✅ Прямая поддержка                                           | ⚠️ Интерполяция компонентов `<i18n-t>`; Markdown через внешние плагины             |
| **Поддержка ICU**                                       | ⚠️ В работе                                                   | ✅ Да                                                                              |
| **Форматирование (даты, числа, валюты)**                | ✅ Форматтеры на основе Intl                                  | ✅ `d()` / `n()` с `datetimeFormats` / `numberFormats`                             |
| **Локализованная маршрутизация**                        | ✅ Хелперы для Vue Router / Nuxt, `getMultilingualUrls`       | ⚠️ Не в ядре (`@nuxtjs/i18n` или собственная настройка роутера)                    |
| **SEO-хелперы (hreflang, sitemap, robots)**             | ✅ Встроенные хелперы                                         | ❌ Не в ядре                                                                       |
| **Tree-shaking (отдавать только используемый контент)** | ✅ По компонентам, по локалям, автоматически компилятором     | ⚠️ Вручную: разбивать каталоги, `setLocaleMessage()` на каждый маршрут             |
| **Ленивая загрузка**                                    | ✅ `importMode: 'dynamic'` (одна строка конфигурации)         | ✅ Ручной `import()` + `setLocaleMessage()`                                        |
| **Очистка неиспользуемого контента**                    | ✅ Мёртвые словари удаляются на этапе сборки                  | ❌ Не встроено                                                                     |
| **Проверка отсутствующих переводов (CLI / CI)**         | ✅ `npx intlayer content test`                                | ⚠️ Сторонние инструменты (`vue-i18n-extract`)                                      |
| **Перевод с помощью ИИ**                                | ✅ Встроен, использует ваши собственные ключи провайдера      | ❌ Нет                                                                             |
| **Visual Editor / CMS**                                 | ✅ Бесплатный Visual Editor + опциональная CMS                | ❌ Нет (внешние платформы локализации)                                             |
| **MCP-сервер и Agent Skills**                           | ✅ Да                                                         | ❌ Нет                                                                             |
| **Экосистема / сообщество**                             | ⚠️ Меньше, но быстро растёт                                   | ✅ Большая и зрелая в экосистеме Vue                                               |

## Бенчмарк

### Что измерялось

Набор [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) собирает **одно и то же приложение Vite + Vue 3** с каждой библиотекой: **10 страниц** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 локалей** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), одинаковые компоненты и одинаковый контент. Страницы измеряются в `en` и `fr`.

Обе библиотеки тестировались в конфигурации **static** — той, с которой выходит большинство Vue-проектов: для `vue-i18n` JSON каждой локали импортируется и передаётся в `createI18n({ messages })`; для Intlayer — `importMode: 'static'` по умолчанию. В этом режиме Intlayer тоже упаковывает все локали, но компилятор по-прежнему ограничивает контент **по компонентам**, так что страница несёт только словари тех компонентов, которые она рендерит.

Для каждой сборки набор записывает:

- **Lib size**: gzip-размер пустого компонента, который только импортирует i18n-библиотеку. Фиксированная стоимость рантайма.
- **Page JS**: gzip JavaScript, загружаемый на страницу, усреднённый по всем страницам и локалям.
- **Locale leak %**: доля переведённых строк в загруженном JS, которые принадлежат локали, которую пользователь **не** просматривает (отпечатки по `en` и `fr`, так что 50 % означает «вторая измеряемая локаль присутствует полностью»; при 10 упакованных локалях реальные потери выше).
- **Page leak %**: доля переведённых строк в загруженном JS, которые принадлежат странице, на которой пользователь **не** находится.
- **Component avg**: средний gzip-размер каждого компонента, скомпилированного изолированно. Показывает, сколько i18n-рантайма и каталога тянет за собой один компонент.
- **E2E reactivity**: реальное время между выбором новой локали и обновлением `html[lang]` в DOM (Playwright, 5 итераций).
- **Page load**: `PerformanceNavigationTiming.duration`.

> Цифры ниже взяты из прогона от **2026-09-12** с `vue-i18n` 11.4.0 и `intlayer` 9.5.0 / 9.5.1. Тестовое приложение намеренно небольшое (несколько десятков строк на локаль), поэтому проценты утечки описывают **закономерность**: они растут вместе с вашим контентом, тогда как стоимость рантайма остаётся фиксированной.

### Результаты на Vite + Vue 3

| Библиотека                    | Стратегия | Lib size (gz) | Lib size (min) | Page JS ср. (gz) | Locale leak | Page leak | Component ср. (gz) | Реактивность E2E | Page load |
| ----------------------------- | --------- | ------------: | -------------: | ---------------: | ----------: | --------: | -----------------: | ---------------: | --------: |
| **base** (без i18n)           | -         |        0,0 КБ |         0,0 КБ |          41,3 КБ |       0,0 % |         - |             1,1 КБ |           1,8 мс |   10,8 мс |
| `vue-i18n`                    | static    |       24,3 КБ |        83,2 КБ |         134,9 КБ |      50,0 % |    90,0 % |           196,0 КБ |           2,8 мс |   13,6 мс |
| **`vue-intlayer`**            | static    |    **3,9 КБ** |    **11,1 КБ** |      **57,1 КБ** |      56,8 % | **0,0 %** |         **7,7 КБ** |       **4,5 мс** |   13,8 мс |
| `@intlayer/vue-i18n` (compat) | static    |        7,9 КБ |        23,2 КБ |          47,0 КБ |      15,0 % |     0,0 % |             8,4 КБ |           1,5 мс |    9,3 мс |

> Столбец page-leak для базового приложения оставлен пустым: без i18n-библиотеки снятие отпечатков подхватывает жёстко закодированные строки в общих чанках, и число не имеет смысла.

**Как это читать**

- **Стоимость рантайма.** `vue-i18n` — один из самых тяжёлых рантаймов во всём бенчмарке: **24,3 КБ gzip / 83,2 КБ в минифицированном виде** для пустого компонента, который только его импортирует. `vue-intlayer` стоит 3,9 КБ gzip. Этот разрыв оплачивается на каждой странице независимо от того, сколько у вас строк.
- **JavaScript на страницу.** Приложение без i18n весит 41,3 КБ. `vue-i18n` увеличивает его более чем втрое — до **134,9 КБ**; Intlayer выходит на **57,1 КБ**, +15,8 КБ, большая часть из которых — десять упакованных локалей (см. следующий пункт).
- **Утечка.** С `createI18n({ messages: { en, fr, ... } })` каждая страница отдаёт все локали и строки всех страниц: **50 % утечки локалей** (по двум измеряемым локалям) и **90 % утечки страниц**. Режим `static` у Intlayer тоже упаковывает все локали (отсюда сопоставимый показатель утечки локалей), но даёт **0 % утечки страниц**: страница подтягивает только словари тех компонентов, которые рендерит. Переход на `importMode: 'dynamic'` убирает и утечку локалей; эта конфигурация не входила в данный прогон для Vue.
- **Размер компонентов — то место, где проявляется архитектура.** Компонент, вызывающий `useI18n()`, компилируется в среднем в **196 КБ**, потому что `t()` привязан к глобальному экземпляру, который держит все сообщения всех локалей. Тот же компонент с `useIntlayer()` компилируется в **7,7 КБ**: он обращается только к своему словарю.
- **Реактивность** не является проблемой ни для одной из них (2–5 мс). Система реактивности Vue делает переключение локали дешёвым, как только сообщения находятся в памяти.
- **`@intlayer/vue-i18n`**, drop-in адаптер, сохраняет API `vue-i18n` и показал **47,0 КБ на страницу** и **8,4 КБ на компонент**, при этом код приложения не изменялся.

> Для справки: тот же прогон измерил `fluent-vue` на уровне 171,8 КБ на страницу, 29,7 КБ рантайма и 217 КБ на компонент.

## Откуда разрыв? Глобальный экземпляр против скомпилированных словарей

`vue-i18n` — это рантайм. `createI18n()` создаёт глобальный экземпляр, хранящий дерево сообщений для каждой локали; `useI18n()` привязывает к нему каждый компонент; `t("footer.github")` ищет ключ во время рендера. Именно это делает возможными блоки SFC `<i18n>`, `v-t` и загрузку сообщений во время выполнения, и именно поэтому граф зависимостей каждого компонента включает всё дерево:

```bash
.
├── locales
│   ├── en.json
│   ├── fr.json
│   └── ...                        # один файл на локаль, все страницы внутри
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts
    └── components
        └── Footer.vue             # const { t } = useI18n(); t("footer.github")
```

Оптимизация означает, что **вы** разбиваете `en.json` на файлы по маршрутам, **вы** вызываете `setLocaleMessage()` в guard роутера и **вы** поддерживаете корректность соответствия маршрутов файлам по мере перемещения компонентов. Рантайм не может сделать это за вас, потому что не знает, какие ключи запросит компонент.

Intlayer переносит это знание на этап сборки. Контент объявляется рядом с компонентом, а `vite-intlayer` определяет, какой компонент импортирует какой словарь:

```bash
.
├── intlayer.config.ts
└── src
    ├── main.ts                    # createApp(App).use(intlayer)
    └── components
        └── Footer
            ├── Footer.vue         # useIntlayer("footer")
            └── Footer.content.ts
```

Компилятор генерирует для каждого словаря и каждой локали ровно тот JSON, который нужен этому компоненту, и отбрасывает словари, которые никто не импортирует. Ограничение по маршрутам — следствие ограничения по компонентам, а не отдельная задача.

> Чтобы также отбросить неиспользуемые локали, установите `dictionary.importMode: 'dynamic'` в `intlayer.config.ts`. См. [документацию по оптимизации бандла](https://intlayer.org/doc/concept/bundle-optimization).

## Опыт разработчика

### Настройка

**vue-i18n**

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: { en, fr },
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";

createApp(App).use(router).use(i18n).mount("#app");
```

**Intlayer**

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), vue()],
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import { intlayer } from "vue-intlayer";
import App from "./App.vue";
import router from "./router";

createApp(App).use(intlayer).use(router).mount("#app");
```

### Компонент

**vue-i18n**

```json fileName="locales/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```vue fileName="src/components/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, n } = useI18n();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ n(count) }}</p>
    <button :aria-label="t('counter.label')" @click="count++">
      {{ t("counter.increment") }}
    </button>
  </div>
</template>
```

`t('counter.label')` остаётся строкой, пока вы сами не типизируете схему сообщений; опечатка отрендерит ключ.

**Intlayer**

```ts fileName="src/components/Counter/Counter.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ en: "Counter", fr: "Compteur" }),
    increment: t({ en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```vue fileName="src/components/Counter/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";
import { useNumber } from "vue-intlayer/format";

const { label, increment } = useIntlayer("counter");
const number = useNumber();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ number.value(count) }}</p>
    <button :aria-label="label" @click="count++">
      {{ increment }}
    </button>
  </div>
</template>
```

`label` и `increment` типизированы; опечатка — это ошибка TypeScript, отсутствующее французское значение — ошибка сборки.

### Ленивая загрузка по локали

**vue-i18n**

```ts fileName="src/i18n.ts"
import { nextTick } from "vue";
import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
});

export const loadLocaleMessages = async (locale: string) => {
  const messages = await import(`../locales/${locale}.json`);
  i18n.global.setLocaleMessage(locale, messages.default);
  await nextTick();
  i18n.global.locale.value = locale;
};
```

Затем вызовите `loadLocaleMessages()` из guard роутера и самостоятельно разбейте `locales/{locale}.json` по маршрутам, если хотите ограничение по страницам.

**Intlayer**

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  // ...
  dictionary: {
    importMode: "dynamic",
  },
};
```

## Сохраните API vue-i18n, получите результат Intlayer

`@intlayer/vue-i18n` — это drop-in адаптер: `useI18n()`, `t()`, `d()`, `n()`, интерполяция `{name}` и `{0}`, множественные формы через pipe (`"car | cars"`), `v-t` и `i18n.global.locale` продолжают работать, но обслуживаются из словарей Intlayer, скомпилированных `vite-intlayer`.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

В бенчмарке compat-сборка того же приложения уменьшилась с **134,9 КБ до 47,0 КБ** на страницу и с **196 КБ до 8,4 КБ** на компонент, при этом компоненты не менялись. Ваши существующие `locales/{locale}.json` могут оставаться источником истины через плагин синхронизации JSON.

См. [руководство по миграции с vue-i18n](https://intlayer.org/doc/migration/vue-i18n) и [документацию по совместимости](https://intlayer.org/doc/compatibility/vue-i18n). У пользователей Nuxt тот же путь через [совместимость с `@nuxtjs/i18n`](https://intlayer.org/doc/compatibility/nuxtjs-i18n).

## Когда что выбирать?

- **Выбирайте vue-i18n**, если вам нужен стандартный подход Vue, вы полагаетесь на ICU-сообщения или блоки SFC `<i18n>`, уже используете `@nuxtjs/i18n` или платформа перевода ожидает централизованный JSON. Заложите время на разбиение каталогов и ленивую загрузку по маршрутам, если размер бандла имеет значение.
- **Выбирайте Intlayer**, если вам нужны **контент, ограниченный компонентом**, **строгий TypeScript**, **ошибки отсутствующих ключей на этапе сборки**, **tree-shaking и ленивая загрузка без усилий** и встроенные редакторские инструменты (Visual Editor, CMS, ИИ-перевод, MCP-сервер). Особенно актуально для больших модульных кодовых баз Vue / Nuxt и дизайн-систем.
- **Выбирайте `@intlayer/vue-i18n`**, если вы уже на `vue-i18n` и хотите выигрыш в размере бандла без переписывания.

## Связанные сравнения

- [next-intl vs Intlayer](https://intlayer.org/blog/next-intl-vs-intlayer) (тот же бенчмарк)
- [i18next vs Intlayer](https://intlayer.org/blog/i18next-vs-intlayer) (тот же бенчмарк)
- [Lingui vs Intlayer](https://intlayer.org/blog/lingui-vs-intlayer) (тот же бенчмарк)
- [vue-i18n vs Intlayer (возможности и DX)](https://intlayer.org/blog/vue-i18n-vs-intlayer)
- [Устарел ли vue-i18n?](https://intlayer.org/blog/is-vue-i18n-outdated)

## Звёзды GitHub

Звёзды GitHub — сильный индикатор популярности проекта, доверия сообщества и долгосрочной актуальности. Хотя они не являются прямой мерой технического качества, они отражают, сколько разработчиков считают проект полезным, следят за его развитием и, вероятно, будут его использовать.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## Заключение

`vue-i18n` — зрелая, гибкая и глубоко интегрированная с Vue библиотека. Бенчмарк показывает, во что обходится её runtime-first дизайн в сборке Vite: **рантайм 24 КБ gzip**, **134,9 КБ на страницу** для приложения, которое весит 41 КБ без i18n, **90 % контента чужих страниц** на каждой странице и компоненты, каждый из которых достигает **196 КБ**, потому что висит на глобальном дереве сообщений.

Intlayer переносит работу в компилятор. Словари по компонентам и очистка мёртвого контента — это результаты сборки, а не соглашения. На том же приложении: **рантайм 3,9 КБ**, **57,1 КБ на страницу**, **0 % утечки страниц**, компоненты **в 25 раз меньше**. А если переписывание не рассматривается, `@intlayer/vue-i18n` проходит большую часть пути, не затрагивая компоненты.

Все сырые данные, тестовые приложения и скрипты находятся в [репозитории Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Запустите его сами.

Подробнее см. в документе [«Почему Intlayer?»](https://intlayer.org/doc/why).

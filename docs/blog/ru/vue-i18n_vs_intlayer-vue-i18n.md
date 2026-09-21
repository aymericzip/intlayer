---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n vs @intlayer/vue-i18n: Одинаковый API, Разные Bundle"
description: Что меняется, когда приложение Vue 3 сохраняет свои вызовы vue-i18n, но обслуживает их через адаптер совместимости @intlayer/vue-i18n. JavaScript на странице, размер runtime, размер компонента и утечки, измеренные на одном коде Vite + Vue, плюс то, что адаптер сохраняет, игнорирует и не может заменить.
keywords:
  - vue-i18n
  - "@intlayer/vue-i18n"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
slugs:
  - blog
  - vue-i18n-vs-intlayer-vue-i18n
author: aymericzip
---

# vue-i18n VS @intlayer/vue-i18n | Одинаковый API, Разные Bundle

`@intlayer/vue-i18n` — это адаптер совместимости: он предоставляет API `vue-i18n` (`createI18n`, `useI18n`, `t()`, `d()`, `n()`, `$t`, `v-t`, `i18n.global.locale`...) и обслуживает его из словарей, скомпилированных Intlayer. Ваши файлы `.vue` не изменяются. Только то, к чему привязан `t("footer.github")`, меняется.

В этой статье измеряется эта замена в одном и том же приложении Vite + Vue 3, собранном один раз с `vue-i18n` и один раз с адаптером. Цифры взяты из [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Для сравнения `vue-i18n` и Intlayer как библиотек прочитайте [vue-i18n vs Intlayer](https://intlayer.org/blog/vue-i18n-vs-intlayer) и [бенчмарк vue-i18n vs Intlayer](https://intlayer.org/blog/vue-i18n-vs-intlayer-benchmark). Это о том, какие изменения вносит адаптер, когда вы оставляете свои компоненты как они есть.

<TOC/>

> **tl;dr**: На том же приложении Vite + Vue 3 замена `vue-i18n` на `@intlayer/vue-i18n` снизила JavaScript на страницу с **134.9 KB до 47.0 KB** gzip (приложение без i18n весит 41.3 KB), runtime с **24.3 KB до 7.9 KB**, средний компонент с **196 KB до 8.4 KB**, и утечку строк на иностранных страницах с **90% на 0%**, без редактирования файлов `.vue`. `createI18n({ messages })` продолжает работать как fallback; удалите импорты JSON для получения указанных выше значений. SFC блоки `<i18n>` и runtime `setLocaleMessage()` — это два функционала, которые не переносятся.

## Что такое `@intlayer/vue-i18n`

`vue-i18n` — это runtime. `createI18n({ messages: { en, fr, ... } })` создает глобальный экземпляр, содержащий все сообщения для каждой локали; `useI18n()` привязывает каждый компонент к нему; `t("footer.github")` проходит по дереву во время рендеринга. Такой дизайн позволяет использовать SFC `<i18n>` блоки и `setLocaleMessage()`, и он же является причиной того, что граф зависимостей каждого компонента включает все дерево.

`@intlayer/vue-i18n` сохраняет API и заменяет дерево:

1. **Import aliasing.** `vueI18nVitePlugin()` из `@intlayer/vue-i18n/plugin` обертывает `vite-intlayer` и добавляет `resolve.alias`, так что `vue-i18n` разрешается на `@intlayer/vue-i18n`. Никакой импорт не переименовывается.
2. **JSON как источник истины.** Плагин `syncJSON` читает ваш существующий файл `locales/{locale}.json` с `format: "vue-i18n"` (чтобы интерполяция `{name}`, `{0}` и множественные формы `"car | cars"` через pipe анализировались корректно) и записывает переводы обратно, когда CLI или CMS их обновляют.
3. **Привязка к месту вызова.** Оптимизирующий проход Intlayer переписывает места вызова `useI18n()` так, чтобы компонент получал словари своих ключей на активном языке в виде импортов, которые bundler может отследить и разделить.

```vue fileName="src/components/Footer.vue"
<!-- Ваш код, без изменений -->
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <a href="https://github.com/intlayer-org/benchmark-bloom">{{
    t("footer.github")
  }}</a>
</template>
```

```ts fileName="Что компилятор выдает (упрощено)"
import _dicHash_footer from "../.intlayer/dictionaries/footer.mjs";
import { useDictionary as useI18n } from "@intlayer/vue-i18n";

const { t } = useI18n(_dicHash_footer);
```

Компонент больше не обращается к глобальному дереву сообщений. Он обращается только к `footer`. Вот почему столбец размера компонента ниже снижается с 196 KB до 8 KB.

## Что адаптер сохраняет, игнорирует и не заменяет

| `vue-i18n` API                                                      | С `@intlayer/vue-i18n`                                                                                                                                                |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useI18n()` → `{ t, d, n, te, tm, rt, locale, availableLocales }`   | ✅ Сохранено. Ключи `t` типизированы в соответствии с вашими словарями                                                                                                |
| `t("key", { name })`, `t("key", [a, b])`, `t("key", count)`         | ✅ Сохранено. `{name}`, `{0}` и разделённые точками с запятой множественные числа разрешаются как раньше                                                              |
| `d(date, "long")`, `n(value, "currency")`                           | ✅ Сохранено. `datetimeFormats` / `numberFormats` из `createI18n()` учитываются, поддерживаемые встроенным `Intl`                                                     |
| `i18n.global.locale.value = "fr"`                                   | ✅ Сохранено. `WritableComputedRef` поддерживается Intlayer's client; реактивность работает как раньше                                                                |
| `$t`, `$tc`, `$te`, `$tm`, `$rt`, `$d`, `$n`, `$i18n` (Options API) | ✅ Сохранено. Зарегистрировано в `app.config.globalProperties` с помощью `app.use(i18n)`                                                                              |
| `v-t` directive                                                     | ✅ Сохранено                                                                                                                                                          |
| `legacy: true`                                                      | ✅ Принято                                                                                                                                                            |
| `createI18n({ messages })`                                          | ⚠️ `messages` используются как **резервный вариант во время выполнения** с предупреждением при разработке. Удалите импорты JSON для получения выгоды в размере пакета |
| `setLocaleMessage()`, `mergeLocaleMessage()`                        | ❌ Предупреждение и ничего не делать. Загрузка сообщений во время выполнения заменена встроенными словарями                                                           |
| SFC `<i18n>` пользовательские блоки                                 | ❌ Не прочитано. Переместите эти сообщения в JSON локали (или `.content.ts` рядом с компонентом)                                                                      |
| `@nuxtjs/i18n`                                                      | ⚠️ Отдельный адаптер, см. [документацию совместимости Nuxt](https://intlayer.org/doc/compatibility/nuxtjs-i18n)                                                       |

## Бенчмарк

### Что измерялось

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) suite создает **одно и то же приложение Vite + Vue 3** с каждой конфигурацией: **10 страниц** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 локалей** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), идентичные компоненты и идентичное содержимое. Страницы измеряются на `en` и `fr`.

Обе были собраны в **статической** конфигурации, той, которую отправляют большинство проектов Vue: для `vue-i18n` каждый JSON локали импортируется и передается в `createI18n({ messages })`; для адаптера используются те же компоненты с измененными `vite.config.ts` и `intlayer.config.ts` и удаленным импортом `messages`. Встроенный `vue-intlayer` включен для справки.

Для каждой сборки suite записывает:

- **Lib size**: размер gzip (и минифицированный) пустого компонента, который только импортирует библиотеку i18n.
- **Page JS**: объем загруженного gzip JavaScript на страницу, усреднённый по всем страницам и локалям.
- **Locale leak %**: доля переведённых строк в загруженном JS, которые принадлежат локали, которую пользователь **не** просматривает.
- **Page leak %**: доля переведённых строк в загруженном JS, которые принадлежат странице, на которой пользователь **не** находится.
- **Component avg**: средний размер gzip каждого компонента, скомпилированного изолированно.
- **E2E reactivity**: время настенных часов между выбором новой локали и обновлением `html[lang]` в DOM (Playwright, 5 итераций).
- **Page load**: `PerformanceNavigationTiming.duration`.

> Приведённые ниже числа получены из запуска от **2026-09-12** с `vue-i18n` 11.4.0 и `@intlayer/vue-i18n` 9.5.1. Тестовое приложение намеренно небольшого размера (несколько десятков строк на язык), поэтому процентили утечки описывают **закономерность**: они растут с вашим контентом, в то время как стоимость выполнения остаётся неизменной.

### Результаты на Vite + Vue 3

| Setup                    | Strategy | Lib size (gz) | Lib size (min) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |  Page load |
| ------------------------ | -------- | ------------: | -------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ---------: |
| **base** (без i18n)      | -        |        0.0 KB |         0.0 KB |          41.3 KB |        0.0% |         - |             1.1 KB |         1.8 ms |    10.8 ms |
| `vue-i18n`               | static   |       24.3 KB |        83.2 KB |         134.9 KB |       50.0% |     90.0% |           196.0 KB |         2.8 ms |    13.6 ms |
| **`@intlayer/vue-i18n`** | static   |    **7.9 KB** |    **23.2 KB** |      **47.0 KB** |   **15.0%** |  **0.0%** |         **8.4 KB** |     **1.5 ms** | **9.3 ms** |
| `vue-intlayer` (native)  | static   |        3.9 KB |        11.1 KB |          57.1 KB |       56.8% |      0.0% |             7.7 KB |         4.5 ms |    13.8 ms |
| `vue-intlayer` (native)  | dynamic  |        3.9 KB |        11.1 KB |          59.8 KB |       50.0% |      0.0% |             6.5 KB |         4.0 ms |    15.8 ms |

> Столбец page-leak базового приложения остается пустым: без библиотеки i18n сканирование отпечатков подхватывает жестко кодированные строки в общих чанках, и число не имеет смысла.

**Как это читать**

- **88 KB меньше на страницу, те же компоненты.** `vue-i18n` берет приложение 41.3 KB и доводит его до **134.9 KB**. Адаптер сборки тех же компонентов приземляется на **47.0 KB**, на 5.7 KB больше, чем базовое приложение. Большая часть разницы — это 74.9 KB из `src/locales`, которые `createI18n({ messages })` втягивает на каждую страницу, а адаптер никогда не бундлит как блок.
- **Runtime сжимается в 3 раза.** Пустой компонент, который только импортирует `vue-i18n`, стоит **24.3 KB gzip / 83.2 KB minified**: `@intlify/core-base`, компилятор сообщений и runtime. Адаптер стоит **7.9 KB / 23.2 KB**, большую часть составляет ядро Intlayer плюс поверхность API `vue-i18n`.
- **Компоненты: в 23 раза меньше.** Компонент `useI18n()`, скомпилированный изолированно, в среднем занимает **196 KB**, потому что `t` привязана к экземпляру, который содержит каждое сообщение каждой локали. С адаптером тот же компонент в среднем занимает **8.4 KB**: он обращается к собственному словарю.
- **Утечка.** `vue-i18n` поставляет все локали и строки каждой страницы на каждой странице: 50% утечка локали (по двум отпечатанным локалям; при десяти объединённых локалях реальные потери выше), 90% утечка страницы. Адаптер снижает утечку страницы до **0%**, потому что каждый компонент импортирует только свои словари. Утечка локали составляет 15% в этом запуске `static`; `importMode: 'dynamic'` — это параметр, который её устраняет, и эта конфигурация не была частью этого запуска Vue.
- **Реактивность и загрузка страницы.** Переключение локали дешёво для обоих (1,5-2,8 мс); система реактивности Vue делает это возможным, как только сообщения находятся в памяти. Загрузка страницы уменьшается с 13,6 мс до **9,3 мс**, что соответствует 88 КБ меньше JavaScript для парсинга.
- **О нативных строках.** `vue-intlayer` в этом запуске собрал все локали в режиме `static` и достиг размера 57,1 КБ с runtime в 3,9 КБ; синхронизированные словари адаптера содержали меньше строк иностранных локалей, отсюда и меньший показатель на одну страницу. Нативный runtime остается самым легким из трех, а его модель `.content.ts` — это эквивалент SFC `<i18n>` блоков.

## Почему меняются цифры

Ничего в `src/components/` не изменилось, поэтому улучшения исходят из того, к чему привязан `useI18n`.

**С `vue-i18n`** связывание осуществляется через глобальный экземпляр. `createI18n({ messages: { en, fr, ... } })` — это один импорт, который содержит всё; каждый компонент, вызывающий `useI18n()`, может получить доступ ко всему этому, поэтому bundler не может разделить ниже уровня экземпляра. Оптимизация означает, что _вы_ разделяете `en.json` по маршрутам, вызываете `setLocaleMessage()` в guard маршрутизатора и поддерживаете корректность карты маршрут-к-файлу по мере перемещения компонентов.

```bash
.
├── locales
│   ├── en.json                    # строки всех страниц
│   └── fr.json
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts                    # app.use(i18n)
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")
```

**С `@intlayer/vue-i18n`**, привязка осуществляется к словарю. `syncJSON` превращает каждый ключ верхнего уровня `en.json` в словарь; проход оптимизации предоставляет компоненту нужные ему ключи, импортируя их так, чтобы bundler мог отследить и разделить их по страницам.

```bash
.
├── intlayer.config.ts             # syncJSON({ format: "vue-i18n", source: ... })
├── locales
│   ├── en.json                    # без изменений, остаётся источником истины
│   └── fr.json
├── .intlayer/                     # сгенерировано: один словарь на ключ верхнего уровня, на локаль
└── src
    ├── i18n.ts                    # createI18n({})   ← импорт messages удалён
    ├── main.ts                    # app.use(i18n)    ← без изменений
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")  ← без изменений
```

Импорт `messages` в `i18n.ts` — это одна строка, которую нужно удалить. Это 88 KB.

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

Команда обнаруживает `vue-i18n`, устанавливает `intlayer`, `vue-intlayer`, `@intlayer/vue-i18n` и `@intlayer/sync-json-plugin`, и предварительно заполняет `intlayer.config.ts`. Оставьте `vue-i18n` установленным: это peer dependency и предоставляет типы.

</Step>
<Step number={2} title="Укажите Intlayer на файлы локалей">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" упаковывает все локали; "dynamic" загружает активную по требованию
    importMode: "dynamic",
    format: "vue-i18n",
  },
  plugins: [
    syncJSON({
      // диалект vue-i18n: {name}, {0}, "car | cars"
      format: "vue-i18n",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

`locales/{locale}.json` остаётся на месте. Каждый top-level key (`footer`, `hero`...) становится словарём.

</Step>
<Step number={3} title="Добавьте плагин и удалите импорт сообщений">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";

// До: createI18n({ locale: "en", messages: { en, fr, es } })
export const i18n = createI18n({ locale: "en" });
```

`vueI18nVitePlugin()` оборачивает `vite-intlayer` (наблюдение за содержимым, компиляция словаря, шаг оптимизации) и создает алиас `vue-i18n` на адаптер. Удаление импорта `messages` — это то, что уменьшает размер на 88 KB; если оставить его, приложение продолжит работать, но будет содержать оба варианта.

</Step>
</Steps>

### Что можно удалить впоследствии

| Файл / паттерн                                     | Причина                                                                              |
| -------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `import en from "./locales/en.json"` и аналогичные | Используется только как fallback адаптером. Именно отсюда взялись 88 KB              |
| `setLocaleMessage()` в router guards               | No-op. Загрузка для каждого маршрута теперь работает через компилятор                |
| `@intlify/unplugin-vue-i18n`                       | Не требуется: он предкомпилирует сообщения и блоки SFC, которые адаптер не читает    |
| SFC блоки `<i18n>`                                 | Не читаются; переместите их в locale JSON или в `.content.ts` для каждого компонента |

### Что вы получите кроме сокращения размера

- **Типизированные ключи.** `t("footer.github")` типизируется против скомпилированного словаря `footer`; неправильный путь — это ошибка TypeScript вместо отображения ключа как текста.
- **`npx intlayer test`** прерывает CI при отсутствии ключа в любой локали. **`npx intlayer fill`** переводит отсутствующие ключи с помощью вашего поставщика (OpenAI, Anthropic, Mistral, Gemini...) и записывает их обратно в `locales/{locale}.json`.
- **Visual Editor и CMS** работают с одним и тем же JSON, поэтому не разработчики могут редактировать через UI, а файлы обновляются автоматически.
- **Постепенный переход на `.content.ts`.** Любой компонент может переключиться с `useI18n()` на `useIntlayer("footer")` с сопутствующим файлом контента. JSON и `.content.ts` словари сосуществуют и объединяются.

## Ограничения, которые нужно знать перед началом

- **SFC `<i18n>` блоки не читаются.** Если ваши сообщения находятся внутри компонентов, они должны переместиться в файлы локалей (или в `.content.ts`, что является тем же самым с типами).
- **Загрузка сообщений во время выполнения исчезла.** `setLocaleMessage()` и `mergeLocaleMessage()` выдают предупреждение и возвращают результат. Переводы, полученные из CMS во время выполнения, требуют CMS Intlayer или команд `intlayer pull` / `push`.
- **`messages` — это fallback, не бесплатно.** Сохранение импортов JSON в `createI18n()` оставляет 75 KB в бандле. Удалите их после того, как пройдёт `intlayer test`.
- **Адаптер не является нативным runtime.** 7.9 KB против 3.9 KB для `vue-intlayer`. Как только каждый компонент переместится на `useIntlayer`, удалите его.

## Когда что использовать?

- **Оставайтесь на `vue-i18n`**, если ваше приложение зависит от SFC `<i18n>` блоков, от runtime потоков `setLocaleMessage()`, или если 90 KB на странице не являются проблемой для вашей аудитории.
- **Используйте `@intlayer/vue-i18n`**, если вы работаете с `vue-i18n` и хотите снизить размер на 88 KB, иметь компоненты меньше в 23 раза, 0% утечки страниц, типизированные ключи и CI проверки без редактирования файла `.vue`. Это точка входа для существующей `vue-i18n` codebase.
- **Переходите на native (`vue-intlayer`)** для новых проектов или когда адаптер выполнит свою роль. Он имеет самый легкий runtime (3.9 KB) и модель `.content.ts` на компонент, который заменяет `<i18n>` блоки типизированным контентом.

## Связанные сравнения

- [vue-i18n vs Intlayer](https://intlayer.org/blog/vue-i18n-vs-intlayer) (возможности и DX)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/blog/vue-i18n-vs-intlayer-benchmark) (библиотеки, одинаковый benchmark)
- [next-intl vs @intlayer/next-intl](https://intlayer.org/blog/next-intl-vs-intlayer-next-intl) (одна серия адаптеров)
- [i18next vs @intlayer/i18next](https://intlayer.org/blog/i18next-vs-intlayer-i18next) (одна серия адаптеров)
- [Lingui vs @intlayer/lingui](https://intlayer.org/blog/lingui-vs-intlayer-lingui) (одна серия адаптеров)
- [Руководство по миграции: vue-i18n на Intlayer](https://intlayer.org/doc/migration/vue-i18n)
- [Compat adapter reference: vue-i18n](https://intlayer.org/doc/compatibility/vue-i18n), [Nuxt i18n](https://intlayer.org/doc/compatibility/nuxtjs-i18n)

## Заключение

`@intlayer/vue-i18n` изменяет то, к чему привязан `useI18n()`: от глобального экземпляра, содержащего все сообщения каждой локали, к словарю, скомпилированному для этого компонента. На том же приложении Vite + Vue 3 это дает **88 KB меньше на странице**, **runtime в 3 раза меньше**, **компоненты в 23 раза меньше** и **0% утечек страницы**, при этом требуя только файл конфигурации, одну строку плагина и одно удаленное импортирование. SFC блоки `<i18n>` и загрузка сообщений во время выполнения — это две вещи, которые он не поддерживает, и native `vue-intlayer` runtime при этом остается вполовину меньше по размеру.

Все исходные данные, тестовые приложения и сценарии находятся в [репозитории Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Запустите его самостоятельно.

Обратитесь к документации ['Почему Intlayer?'](https://intlayer.org/doc/why) для получения дополнительной информации.

---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n vs @intlayer/vue-i18n: Однаковий API, різний Bundle"
description: Що змінюється, коли Vue 3 додаток зберігає свої виклики vue-i18n, але обслуговує їх через адаптер сумісності @intlayer/vue-i18n. JavaScript на сторінку, розмір runtime, розмір компонента та витоку вимірюються на тому самому коді Vite + Vue, плюс те, що адаптер зберігає, ігнорує та не може замінити.
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

# vue-i18n VS @intlayer/vue-i18n | Однаковий API, різний Bundle

`@intlayer/vue-i18n` — це адаптер сумісності: він надає API `vue-i18n` (`createI18n`, `useI18n`, `t()`, `d()`, `n()`, `$t`, `v-t`, `i18n.global.locale`...) та обслуговує його зі словників, скомпільованих Intlayer. Ваші файли `.vue` не змінюються. Змінюється лише те, до чого прив'язаний `t("footer.github")`.

Ця стаття вимірює цей перехід на тій же програмі Vite + Vue 3, зібраній один раз з `vue-i18n` і один раз з адаптером. Цифри походять з [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Для порівняння `vue-i18n` та Intlayer як бібліотек прочитайте [vue-i18n vs Intlayer](https://intlayer.org/blog/vue-i18n-vs-intlayer) та [vue-i18n vs Intlayer benchmark](https://intlayer.org/blog/vue-i18n-vs-intlayer-benchmark). Ця стаття присвячена тому, які зміни адаптер вносить, коли ви зберігаєте компоненти такими, якими вони є.

<TOC/>

> **tl;dr**: На тому самому додатку Vite + Vue 3 заміна `vue-i18n` на `@intlayer/vue-i18n` зменшила JavaScript на сторінку з **134.9 KB до 47.0 KB** gzip (додаток без i18n важить 41.3 KB), runtime з **24.3 KB до 7.9 KB**, середній компонент з **196 KB до 8.4 KB** і витоком рядків іноземної сторінки з **90% до 0%**, без редагування жодного файлу `.vue`. `createI18n({ messages })` продовжує працювати як резервний варіант; видаліть імпорти JSON, щоб отримати наведені вище цифри. SFC блоки `<i18n>` та runtime `setLocaleMessage()` — це дві функції, які не переносяться.

## Що таке `@intlayer/vue-i18n`

`vue-i18n` — це runtime. `createI18n({ messages: { en, fr, ... } })` будує глобальний екземпляр, який містить усі повідомлення кожної мови; `useI18n()` пов'язує кожний компонент з ним; `t("footer.github")` проходить деревом під час рендеру. Це дизайн робить можливими SFC блоки `<i18n>` та `setLocaleMessage()`, а також робить граф залежностей кожного компонента включеним у все дерево.

`@intlayer/vue-i18n` зберігає API та замінює дерево:

1. **Import aliasing.** `vueI18nVitePlugin()` з `@intlayer/vue-i18n/plugin` обгортає `vite-intlayer` та додає `resolve.alias` так що `vue-i18n` розпізнається як `@intlayer/vue-i18n`. Жоден імпорт не перейменовується.
2. **JSON як джерело істини.** Плагін `syncJSON` читає ваш існуючий `locales/{locale}.json` з `format: "vue-i18n"` (тому `{name}`, `{0}` інтерполяція списку та `"car | cars"` pipe множини аналізуються правильно) і записує переклади назад, коли CLI або CMS їх оновлюють.
3. **Call-site binding.** Пройти оптимізації Intlayer переписує call sites `useI18n()` так, щоб компонент отримував словники своїх ключів у активній локалі, як імпорти, які bundler може відслідкувати та розділити.

```vue fileName="src/components/Footer.vue"
<!-- Ваш код, без змін -->
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

```ts fileName="Що компілятор видає (спрощено)"
import _dicHash_footer from "../.intlayer/dictionaries/footer.mjs";
import { useDictionary as useI18n } from "@intlayer/vue-i18n";

const { t } = useI18n(_dicHash_footer);
```

Компонент більше не звертається до глобального дерева повідомлень. Він звертається до `footer`. Саме тому стовпець розміру компонента нижче падає з 196 KB до 8 KB.

## Що адаптер зберігає, ігнорує та не замінює

| `vue-i18n` API                                                      | З `@intlayer/vue-i18n`                                                                                                                      |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `useI18n()` → `{ t, d, n, te, tm, rt, locale, availableLocales }`   | ✅ Збережено. `t` ключі типізовані відносно ваших словників                                                                                 |
| `t("key", { name })`, `t("key", [a, b])`, `t("key", count)`         | ✅ Збережено. `{name}`, `{0}` та plurals розділені трубою розв'язуються як раніше                                                           |
| `d(date, "long")`, `n(value, "currency")`                           | ✅ Збережено. `datetimeFormats` / `numberFormats` з `createI18n()` дотримуються, підкріплені нативним `Intl`                                |
| `i18n.global.locale.value = "fr"`                                   | ✅ Збережено. `WritableComputedRef`, підтримується Intlayer's client; реактивність працює як раніше                                         |
| `$t`, `$tc`, `$te`, `$tm`, `$rt`, `$d`, `$n`, `$i18n` (Options API) | ✅ Збережено. Зареєстровано на `app.config.globalProperties` через `app.use(i18n)`                                                          |
| `v-t` directive                                                     | ✅ Збережено                                                                                                                                |
| `legacy: true`                                                      | ✅ Прийнято                                                                                                                                 |
| `createI18n({ messages })`                                          | ⚠️ `messages` використовуються як **резервна версія під час виконання** з попередженням розробника. Видаліть JSON імпорти для набору bundle |
| `setLocaleMessage()`, `mergeLocaleMessage()`                        | ❌ Попереджувати та нічого не робити. Завантаження повідомлень під час виконання замінено на словники під час збірки                        |
| SFC `<i18n>` користувацькі блоки                                    | ❌ Не читаються. Перемістіть ці повідомлення в локаль JSON (або в `.content.ts` поруч з компонентом)                                        |
| `@nuxtjs/i18n`                                                      | ⚠️ Окремий адаптер, див. [документацію сумісності Nuxt](https://intlayer.org/doc/uk/compatibility/nuxtjs-i18n)                              |

## Бенчмарк

### Що було виміряно

The [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) suite будує **ту саму Vite + Vue 3 програму** з кожною конфігурацією: **10 сторінок** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 локалей** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), ідентичні компоненти та ідентичний контент. Сторінки вимірюються на `en` та `fr`.

Обидва були побудовані в **статичній** конфігурації, як зазвичай поставляються Vue проекти: для `vue-i18n`, JSON кожної локалі імпортується та передається в `createI18n({ messages })`; для адаптера, ті ж компоненти з змінені `vite.config.ts` та `intlayer.config.ts` та видалений імпорт `messages`. Нативний `vue-intlayer` включений як еталон.

Для кожної збірки suite записує:

- **Lib size**: розмір gzip (і мініфікований) порожньої компоненти, яка лише імпортує бібліотеку i18n.
- **Page JS**: розмір завантаженого gzip JavaScript на сторінку, усереднений по всім сторінкам та локалізаціям.
- **Locale leak %**: частка перекладених рядків у завантаженому JS, які належать локалізації, яку користувач **не** переглядає.
- **Page leak %**: частка перекладених рядків у завантаженому JS, які належать сторінці, на якій користувач **не** перебуває.
- **Component avg**: середній розмір gzip кожної компоненти, скомпільованої окремо.
- **E2E reactivity**: час в реальному часі між вибором нової локалізації та оновленням `html[lang]` у DOM (Playwright, 5 ітерацій).
- **Page load**: `PerformanceNavigationTiming.duration`.

> Числові дані нижче отримані з запуску від **2026-09-12** з `vue-i18n` 11.4.0 та `@intlayer/vue-i18n` 9.5.1. Тестовий додаток навмисно невеликий (кілька десятків рядків на локаль), тому відсотки витоків описують **закономірність**: вони зростають зі збільшенням вашого контенту, тоді як вартість виконання залишається незмінною.

### Результати на Vite + Vue 3

| Setup                    | Strategy | Lib size (gz) | Lib size (min) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |  Page load |
| ------------------------ | -------- | ------------: | -------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ---------: |
| **base** (no i18n)       | -        |        0.0 KB |         0.0 KB |          41.3 KB |        0.0% |         - |             1.1 KB |         1.8 ms |    10.8 ms |
| `vue-i18n`               | static   |       24.3 KB |        83.2 KB |         134.9 KB |       50.0% |     90.0% |           196.0 KB |         2.8 ms |    13.6 ms |
| **`@intlayer/vue-i18n`** | static   |    **7.9 KB** |    **23.2 KB** |      **47.0 KB** |   **15.0%** |  **0.0%** |         **8.4 KB** |     **1.5 ms** | **9.3 ms** |
| `vue-intlayer` (native)  | static   |        3.9 KB |        11.1 KB |          57.1 KB |       56.8% |      0.0% |             7.7 KB |         4.5 ms |    13.8 ms |
| `vue-intlayer` (native)  | dynamic  |        3.9 KB |        11.1 KB |          59.8 KB |       50.0% |      0.0% |             6.5 KB |         4.0 ms |    15.8 ms |

> Стовпець page-leak базової програми залишається пустим: без бібліотеки i18n відбиток вхоплює жорстко закодовані рядки в спільних блоках, і число не має сенсу.

**Як це читати**

- **88 KB менше на сторінку, ті ж компоненти.** `vue-i18n` бере програму 41.3 KB до **134.9 KB**. Адаптер збірка тих же компонентів приземляється на **47.0 KB**, 5.7 KB більше базової програми. Більшість різниці — це 74.9 KB з `src/locales`, яку `createI18n({ messages })` тягне на кожну сторінку, а адаптер ніколи не пакує як блок.
- **Runtime зменшується в 3 рази.** Порожний компонент, який лише імпортує `vue-i18n`, коштує **24.3 KB gzip / 83.2 KB мініфіковано**: `@intlify/core-base`, компілятор повідомлень і runtime. Адаптер коштує **7.9 KB / 23.2 KB**, більшість з яких це core Intlayer плюс поверхня API `vue-i18n`.
- **Компоненти: 23x менші.** Компонент `useI18n()`, скомпільований ізольовано, в середньому займає **196 KB**, тому що `t` пов'язана з екземпляром, який містить кожне повідомлення кожної локалізації. З адаптером той самий компонент в середньому займає **8.4 KB**: він досягає своїх власних словників.
- **Витоку.** `vue-i18n` поставляє кожну локаль і рядки кожної сторінки на кожній сторінці: 50% витоку локалі (на двох відбитих локалях; з десятьма упакованими локалями реальні втрати вищі), 90% витоку сторінки. Адаптер знижує витік сторінки до **0%**, оскільки кожний компонент імпортує тільки свої словники. Витік локалі становить 15% у цьому запуску `static`; `importMode: 'dynamic'` — це параметр, який його видаляє, і ця конфігурація не була частиною цього запуску Vue.
- **Реактивність та завантаження сторінки.** Перемикання локалі дешево для обох (1,5-2,8 мс); система реактивності Vue робить це можливим, коли повідомлення вже в пам'яті. Завантаження сторінки займає 13,6 мс до **9,3 мс**, що відповідає 88 КБ менше JavaScript для аналізу.
- **Про природні рядки.** `vue-intlayer` у цьому запуску упаковував кожну локаль у режимі `static` і приземлився на 57.1 KB з рантайм 3.9 KB; синхронізовані словники адаптера містили менше іноземних рядків локалі, тому нижча цифра на сторінку. Нативний рантайм залишається найлегшим із трьох, а його модель `.content.ts` — це еквівалент блоків SFC `<i18n>`.

## Чому змінюються числа

Нічого в `src/components/` не змінилося, тому прибутки походять від того, до чого прив'язаний `useI18n`.

**З `vue-i18n`**, прив'язка — це глобальний екземпляр. `createI18n({ messages: { en, fr, ... } })` — це один імпорт, який містить все; кожен компонент, який викликає `useI18n()`, може отримати доступ до всього цього, тому бандлер не може розділити нижче екземпляра. Оптимізація означає, що _ви_ розділяєте `en.json` за маршрутом, викликаєте `setLocaleMessage()` в охоронцеві маршрутизатора й утримуєте карту маршруту до файлу в актуальному стані, коли компоненти переміщуються.

```bash
.
├── locales
│   ├── en.json                    # рядки кожної сторінки
│   └── fr.json
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts                    # app.use(i18n)
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")
```

**З `@intlayer/vue-i18n`**, binding — це словник. `syncJSON` перетворює кожен top-level ключ `en.json` у словник; оптимізаційний проход передає компоненту ті, чиї ключи він назначує, імпортуючи bundler відстежує та розділяє за сторінкою.

```bash
.
├── intlayer.config.ts             # syncJSON({ format: "vue-i18n", source: ... })
├── locales
│   ├── en.json                    # без змін, все ще джерело істини
│   └── fr.json
├── .intlayer/                     # згенеровано: один словник на top-level ключ, на locale
└── src
    ├── i18n.ts                    # createI18n({})   ← import messages видалено
    ├── main.ts                    # app.use(i18n)    ← без змін
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")  ← без змін
```

Імпорт `messages` в `i18n.ts` - це єдиний рядок, який потрібно видалити. Це 88 KB.

## Міграція в три кроки

<Steps>
<Step number={1} title="Встановлення">

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

Команда виявляє `vue-i18n`, встановлює `intlayer`, `vue-intlayer`, `@intlayer/vue-i18n` і `@intlayer/sync-json-plugin`, та попередньо заповнює `intlayer.config.ts`. Залишіть `vue-i18n` встановленим: це peer dependency і надає типи.

</Step>
<Step number={2} title="Вкажіть Intlayer на ваші файли локалей">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" об'єднує кожну мову; "dynamic" завантажує активну за запитом
    importMode: "dynamic",
    format: "vue-i18n",
  },
  plugins: [
    syncJSON({
      // vue-i18n діалект: {name}, {0}, "car | cars"
      format: "vue-i18n",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

`locales/{locale}.json` залишається на своєму місці. Кожен ключ верхнього рівня (`footer`, `hero`...) стає словником.

</Step>
<Step number={3} title="Додайте плагін та видаліть імпорт повідомлень">

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

// Раніше: createI18n({ locale: "en", messages: { en, fr, es } })
export const i18n = createI18n({ locale: "en" });
```

`vueI18nVitePlugin()` обертає `vite-intlayer` (спостереження за вмістом, компіляція словника, оптимізацій) та створює alias `vue-i18n` до адаптера. Видалення імпорту `messages` скорочує 88 KB; якщо залишити його, додаток продовжить працювати, але буде поставляти обидва варіанти.

</Step>
</Steps>

### Що ви можете видалити потім

| Файл / патерн                                   | Причина                                                                                |
| ----------------------------------------------- | -------------------------------------------------------------------------------------- |
| `import en from "./locales/en.json"` та подібні | Використовується лише як fallback адаптером. Саме звідси було 88 KB                    |
| `setLocaleMessage()` в router guards            | No-op. Завантаження per-route тепер робить компілятор                                  |
| `@intlify/unplugin-vue-i18n`                    | Не потрібен: він попередньо компілює повідомлення та SFC блоки, які адаптер не читає   |
| SFC `<i18n>` блоки                              | Не читаються; перемістіть їх до locale JSON або в `.content.ts` для кожного компонента |

### Що ви отримуєте крім економії байтів

- **Типізовані ключі.** `t("footer.github")` має тип для скомпільованого словника `footer`; неправильний шлях — це помилка TypeScript замість ключа, відображеного як текст.
- **`npx intlayer test`** завершується помилкою CI для відсутнього ключа в будь-якій локалі. **`npx intlayer fill`** перекладає відсутні за допомогою вашого ключа постачальника (OpenAI, Anthropic, Mistral, Gemini...) і записує їх назад в `locales/{locale}.json`.
- **Visual Editor і CMS** працюють з одним і тим самим JSON, тому розробники редагують через UI, а файли оновлюються.
- **Поступовий перехід до `.content.ts`.** Будь-який компонент може перейти з `useI18n()` на `useIntlayer("footer")` з прив'язаним файлом контенту. JSON та `.content.ts` словники співіснують та об'єднуються.

## Обмеження, про які потрібно знати перед початком

- **SFC `<i18n>` блоки не читаються.** Якщо ваші повідомлення знаходяться всередині компонентів, вони повинні перейти до файлів локалізації (або до `.content.ts`, що є тією ж ідеєю з типами).
- **Завантаження повідомлень під час виконання відсутнє.** `setLocaleMessage()` та `mergeLocaleMessage()` видають попередження та повертаються. Переклади, отримані з CMS під час виконання, потребують CMS Intlayer або команд `intlayer pull` / `push`.
- **`messages` є резервним варіантом, а не безплатним.** Збереження імпортів JSON у `createI18n()` зберігає 75 KB у bundle. Видаліть їх, коли `intlayer test` пройде.
- **Адаптер - це не нативний runtime.** 7.9 KB проти 3.9 KB для `vue-intlayer`. Як тільки кожен компонент перейде на `useIntlayer`, можна його видалити.

## Коли використовувати що?

- **Залишайтеся на `vue-i18n`**, якщо ваш додаток залежить від SFC `<i18n>` блоків, від flows `setLocaleMessage()` під час виконання, або якщо 90 KB на сторінку - це не проблема для вашої аудиторії.
- **Використовуйте `@intlayer/vue-i18n`**, якщо ви на `vue-i18n` і хочете зекономити 88 KB, мати компоненти в 23 рази менші, 0% витоків сторінки, типізовані ключі та CI перевірки без редагування `.vue` файлу. Це точка входу для існуючого `vue-i18n` codebase.
- **Переходьте на native (`vue-intlayer`)** для нових проектів, або як тільки адаптер виконав свою роботу. Він має найлегший runtime (3.9 KB) та per-component `.content.ts` модель, яка замінює `<i18n>` блоки типізованим контентом.

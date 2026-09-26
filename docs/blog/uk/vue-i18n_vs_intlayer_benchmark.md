---
createdAt: 2026-09-13
updatedAt: 2026-09-13
priority: 8
title: "vue-i18n vs Intlayer: бенчмарк 2026"
description: vue-i18n та Intlayer, виміряні на одному й тому самому застосунку Vite + Vue 3. Розмір бібліотеки, JavaScript на сторінку, витік контенту, розмір компонентів і реактивність перемикання локалі, з поясненням цифр.
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

# vue-i18n VS Intlayer | Бенчмарк інтернаціоналізації (i18n) для Vue

`vue-i18n` — еталонна i18n-бібліотека для Vue. Intlayer — альтернатива на основі компілятора з контентом, обмеженим областю компонента, та інтеграцією з Vue (`vue-intlayer`). Ми вже порівнювали їхні [можливості та досвід розробника](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/vue-i18n_vs_intlayer.md). Ця стаття розглядає, скільки коштує кожна з них після збірки застосунку.

Дані взято з [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), open-source набору, який збирає один і той самий застосунок із кожною бібліотекою та записує, що браузер насправді завантажує й виконує.

<TOC/>

> **tl;dr**: На одному й тому самому застосунку Vite + Vue 3 `vue-i18n` віддає **134,9 КБ** gzip-стисненого JavaScript на сторінку проти **41,3 КБ** для застосунку без i18n. Intlayer віддає **57,1 КБ**. Сам лише рантайм `vue-i18n` важить **24,3 КБ gzip** (у 6 разів більше за 3,9 КБ Intlayer), кожна сторінка несе **90 % рядків чужих сторінок**, а компонент, скомпільований ізольовано, тягне за собою **196 КБ**, бо прив'язаний до глобального дерева повідомлень. Адаптер `@intlayer/vue-i18n` зберігає API `vue-i18n` і показав **47,0 КБ** на сторінку.

## Коротко

- **vue-i18n** — де-факто i18n-бібліотека для Vue 2 / Vue 3 та ядро `@nuxtjs/i18n`. Повідомлення в стилі ICU, блоки `<i18n>` у SFC, директива `v-t`, форматери `d()` / `n()`, велика екосистема. Повідомлення реєструються на глобальному екземплярі під час `createI18n()`; ліниве завантаження за локаллю — це ручний патерн із `setLocaleMessage()`, а розбиття за маршрутами вам потрібно будувати самостійно.
- **Intlayer** — модель контенту, орієнтована на компоненти. Словники `.content.ts` лежать поруч із компонентом, який вони обслуговують, компілятор на етапі збірки (`vite-intlayer`) виконує tree-shaking і ліниве завантаження за компонентами та локалями, суворі типи TypeScript генеруються з вашого контенту, а відсутні переклади спричиняють помилку на етапі збірки. Містить хелпери для роутера / SEO, Visual Editor / CMS та переклад за допомогою ШІ.

| Бібліотека            | Зірки GitHub                                                                                                                                                                   | Усього комітів                                                                                                                                                                     | Останній коміт                                                                                                                                      | Перша версія | Версія NPM                                                                                                  | Завантаження NPM                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Квітень 2024 | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) |
| `intlify/vue-i18n`    | [![GitHub Repo stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       | Груд 2016    | [![npm](https://img.shields.io/npm/v/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) | [![npm downloads](https://img.shields.io/npm/dm/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) |

> Бейджі оновлюються автоматично. Знімки змінюватимуться з часом.

## Порівняння можливостей пліч-о-пліч

| Можливість                                             | `vue-intlayer` (Intlayer)                                     | `vue-i18n`                                                                        |
| ------------------------------------------------------ | ------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Переклади поруч із компонентами**                    | ✅ Так, `.content.ts` розташовано поруч із кожним компонентом | ✅ Через блоки SFC `<i18n>` (опційно); зазвичай використовують глобальні каталоги |
| **Інтеграція з TypeScript**                            | ✅ Суворі типи автоматично генеруються з контенту             | ✅ Гарні типи; сувора безпека ключів потребує типізації схеми та дисципліни       |
| **Виявлення відсутніх перекладів**                     | ✅ Помилка TypeScript + помилка/попередження під час збірки   | ⚠️ Fallback під час виконання + попередження в консолі                            |
| **Багатий контент (компоненти / Markdown)**            | ✅ Пряма підтримка                                            | ⚠️ Інтерполяція компонентів `<i18n-t>`; Markdown через зовнішні плагіни           |
| **Підтримка ICU**                                      | ⚠️ У роботі                                                   | ✅ Так                                                                            |
| **Форматування (дати, числа, валюти)**                 | ✅ Форматери на основі Intl                                   | ✅ `d()` / `n()` із `datetimeFormats` / `numberFormats`                           |
| **Локалізована маршрутизація**                         | ✅ Хелпери для Vue Router / Nuxt, `getMultilingualUrls`       | ⚠️ Не в ядрі (`@nuxtjs/i18n` або власне налаштування роутера)                     |
| **SEO-хелпери (hreflang, sitemap, robots)**            | ✅ Вбудовані хелпери                                          | ❌ Не в ядрі                                                                      |
| **Tree-shaking (віддавати лише використаний контент)** | ✅ За компонентами, за локалями, автоматично компілятором     | ⚠️ Вручну: розбивати каталоги, `setLocaleMessage()` на кожен маршрут              |
| **Ліниве завантаження**                                | ✅ `importMode: 'dynamic'` (один рядок конфігурації)          | ✅ Ручний `import()` + `setLocaleMessage()`                                       |
| **Очищення невикористаного контенту**                  | ✅ Мертві словники видаляються на етапі збірки                | ❌ Не вбудовано                                                                   |
| **Перевірка відсутніх перекладів (CLI / CI)**          | ✅ `npx intlayer content test`                                | ⚠️ Сторонні інструменти (`vue-i18n-extract`)                                      |
| **Переклад за допомогою ШІ**                           | ✅ Вбудований, використовує ваші власні ключі провайдера      | ❌ Ні                                                                             |
| **Visual Editor / CMS**                                | ✅ Безкоштовний Visual Editor + опційна CMS                   | ❌ Ні (зовнішні платформи локалізації)                                            |
| **MCP-сервер і Agent Skills**                          | ✅ Так                                                        | ❌ Ні                                                                             |
| **Екосистема / спільнота**                             | ⚠️ Менша, але швидко зростає                                  | ✅ Велика та зріла в екосистемі Vue                                               |

## Бенчмарк

### Що вимірювалося

Набір [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) збирає **один і той самий застосунок Vite + Vue 3** з кожною бібліотекою: **10 сторінок** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 локалей** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), однакові компоненти та однаковий контент. Сторінки вимірюються в `en` та `fr`.

Обидві бібліотеки тестувалися в конфігурації **static** — тій, з якою виходить більшість Vue-проєктів: для `vue-i18n` JSON кожної локалі імпортується та передається в `createI18n({ messages })`; для Intlayer — `importMode: 'static'` за замовчуванням. У цьому режимі Intlayer також пакує всі локалі, але компілятор і далі обмежує контент **за компонентами**, тож сторінка несе лише словники тих компонентів, які вона рендерить.

Для кожної збірки набір записує:

- **Lib size**: gzip-розмір порожнього компонента, який лише імпортує i18n-бібліотеку. Фіксована вартість рантайму.
- **Page JS**: gzip JavaScript, що завантажується на сторінку, усереднений за всіма сторінками та локалями.
- **Locale leak %**: частка перекладених рядків у завантаженому JS, які належать до локалі, яку користувач **не** переглядає (відбитки за `en` та `fr`, тож 50 % означає «інша вимірювана локаль присутня повністю»; за 10 запакованих локалей реальні втрати вищі).
- **Page leak %**: частка перекладених рядків у завантаженому JS, які належать до сторінки, на якій користувач **не** перебуває.
- **Component avg**: середній gzip-розмір кожного компонента, скомпільованого ізольовано. Показує, скільки i18n-рантайму та каталогу тягне за собою один компонент.
- **E2E reactivity**: реальний час між вибором нової локалі та оновленням `html[lang]` у DOM (Playwright, 5 ітерацій).
- **Page load**: `PerformanceNavigationTiming.duration`.

> Цифри нижче взято з прогону від **2026-09-12** із `vue-i18n` 11.4.0 та `intlayer` 9.5.0 / 9.5.1. Тестовий застосунок навмисно невеликий (кілька десятків рядків на локаль), тому відсотки витоку описують **закономірність**: вони зростають разом із вашим контентом, тоді як вартість рантайму залишається фіксованою.

### Результати на Vite + Vue 3

| Бібліотека                    | Стратегія | Lib size (gz) | Lib size (min) | Page JS сер. (gz) | Locale leak | Page leak | Component сер. (gz) | Реактивність E2E | Page load |
| ----------------------------- | --------- | ------------: | -------------: | ----------------: | ----------: | --------: | ------------------: | ---------------: | --------: |
| **base** (без i18n)           | -         |        0,0 КБ |         0,0 КБ |           41,3 КБ |       0,0 % |         - |              1,1 КБ |           1,8 мс |   10,8 мс |
| `vue-i18n`                    | static    |       24,3 КБ |        83,2 КБ |          134,9 КБ |      50,0 % |    90,0 % |            196,0 КБ |           2,8 мс |   13,6 мс |
| **`vue-intlayer`**            | static    |    **3,9 КБ** |    **11,1 КБ** |       **57,1 КБ** |      56,8 % | **0,0 %** |          **7,7 КБ** |       **4,5 мс** |   13,8 мс |
| `@intlayer/vue-i18n` (compat) | static    |        7,9 КБ |        23,2 КБ |           47,0 КБ |      15,0 % |     0,0 % |              8,4 КБ |           1,5 мс |    9,3 мс |

> Стовпець page-leak для базового застосунку залишено порожнім: без i18n-бібліотеки зняття відбитків підхоплює жорстко закодовані рядки в спільних чанках, і число не має сенсу.

**Як це читати**

- **Вартість рантайму.** `vue-i18n` — один із найважчих рантаймів у всьому бенчмарку: **24,3 КБ gzip / 83,2 КБ у мініфікованому вигляді** для порожнього компонента, який лише його імпортує. `vue-intlayer` коштує 3,9 КБ gzip. Цей розрив оплачується на кожній сторінці незалежно від того, скільки у вас рядків.
- **JavaScript на сторінку.** Застосунок без i18n важить 41,3 КБ. `vue-i18n` збільшує його більш ніж утричі — до **134,9 КБ**; Intlayer виходить на **57,1 КБ**, +15,8 КБ, більша частина з яких — десять запакованих локалей (див. наступний пункт).
- **Витік.** Із `createI18n({ messages: { en, fr, ... } })` кожна сторінка віддає всі локалі та рядки всіх сторінок: **50 % витоку локалей** (за двома вимірюваними локалями) та **90 % витоку сторінок**. Режим `static` в Intlayer також пакує всі локалі (звідси порівнянний показник витоку локалей), але дає **0 % витоку сторінок**: сторінка підтягує лише словники тих компонентів, які рендерить. Перехід на `importMode: 'dynamic'` прибирає й витік локалей; ця конфігурація не входила до цього прогону для Vue.
- **Розмір компонентів — те місце, де проявляється архітектура.** Компонент, що викликає `useI18n()`, компілюється в середньому у **196 КБ**, бо `t()` прив'язаний до глобального екземпляра, який тримає всі повідомлення всіх локалей. Той самий компонент із `useIntlayer()` компілюється у **7,7 КБ**: він звертається лише до свого словника.
- **Реактивність** не є проблемою для жодної з них (2–5 мс). Система реактивності Vue робить перемикання локалі дешевим, щойно повідомлення опиняються в пам'яті.
- **`@intlayer/vue-i18n`**, drop-in адаптер, зберігає API `vue-i18n` і показав **47,0 КБ на сторінку** та **8,4 КБ на компонент**, при цьому код застосунку не змінювався.

> Для довідки: той самий прогін виміряв `fluent-vue` на рівні 171,8 КБ на сторінку, 29,7 КБ рантайму та 217 КБ на компонент.

## Звідки розрив? Глобальний екземпляр проти скомпільованих словників

`vue-i18n` — це рантайм. `createI18n()` створює глобальний екземпляр, що зберігає дерево повідомлень для кожної локалі; `useI18n()` прив'язує до нього кожен компонент; `t("footer.github")` шукає ключ під час рендеру. Саме це уможливлює блоки SFC `<i18n>`, `v-t` та завантаження повідомлень під час виконання, і саме тому граф залежностей кожного компонента містить усе дерево:

```bash
.
├── locales
│   ├── en.json
│   ├── fr.json
│   └── ...                        # один файл на локаль, усі сторінки всередині
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts
    └── components
        └── Footer.vue             # const { t } = useI18n(); t("footer.github")
```

Оптимізація означає, що **ви** розбиваєте `en.json` на файли за маршрутами, **ви** викликаєте `setLocaleMessage()` у guard роутера і **ви** підтримуєте коректність відповідності маршрутів файлам у міру переміщення компонентів. Рантайм не може зробити це за вас, бо не знає, які ключі запитає компонент.

Intlayer переносить це знання на етап збірки. Контент оголошується поруч із компонентом, а `vite-intlayer` визначає, який компонент імпортує який словник:

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

Компілятор генерує для кожного словника та кожної локалі рівно той JSON, який потрібен цьому компоненту, і відкидає словники, які ніхто не імпортує. Обмеження за маршрутами — наслідок обмеження за компонентами, а не окреме завдання.

> Щоб також відкинути невикористані локалі, встановіть `dictionary.importMode: 'dynamic'` в `intlayer.config.ts`. Див. [документацію з оптимізації бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md).

## Досвід розробника

### Налаштування

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

`t('counter.label')` залишається рядком, доки ви самі не типізуєте схему повідомлень; одруківка відрендерить ключ.

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

`label` та `increment` типізовані; одруківка — це помилка TypeScript, відсутнє французьке значення — помилка збірки.

### Ліниве завантаження за локаллю

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

Потім викличте `loadLocaleMessages()` із guard роутера та самостійно розбийте `locales/{locale}.json` за маршрутами, якщо хочете обмеження за сторінками.

**Intlayer**

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  // ...
  dictionary: {
    importMode: "dynamic",
  },
};
```

## Збережіть API vue-i18n, отримайте результат Intlayer

`@intlayer/vue-i18n` — це drop-in адаптер: `useI18n()`, `t()`, `d()`, `n()`, інтерполяція `{name}` та `{0}`, множина через pipe (`"car | cars"`), `v-t` та `i18n.global.locale` продовжують працювати, але обслуговуються зі словників Intlayer, скомпільованих `vite-intlayer`.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

У бенчмарку compat-збірка того самого застосунку зменшилася зі **134,9 КБ до 47,0 КБ** на сторінку та зі **196 КБ до 8,4 КБ** на компонент, при цьому компоненти не змінювалися. Ваші наявні `locales/{locale}.json` можуть залишатися джерелом істини через плагін синхронізації JSON.

Див. [посібник із міграції з vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_vue-i18n_to_intlayer.md) та [документацію із сумісності](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/vue-i18n.md). Користувачі Nuxt мають той самий шлях через [сумісність із `@nuxtjs/i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/nuxtjs-i18n.md).

## Коли що обирати?

- **Обирайте vue-i18n**, якщо вам потрібен стандартний підхід Vue, ви покладаєтеся на ICU-повідомлення або блоки SFC `<i18n>`, уже використовуєте `@nuxtjs/i18n` або платформа перекладу очікує централізований JSON. Закладіть час на розбиття каталогів і ліниве завантаження за маршрутами, якщо розмір бандла має значення.
- **Обирайте Intlayer**, якщо вам потрібні **контент, обмежений компонентом**, **суворий TypeScript**, **помилки відсутніх ключів на етапі збірки**, **tree-shaking і ліниве завантаження без зусиль** та вбудовані редакторські інструменти (Visual Editor, CMS, ШІ-переклад, MCP-сервер). Особливо актуально для великих модульних кодових баз Vue / Nuxt та дизайн-систем.
- **Обирайте `@intlayer/vue-i18n`**, якщо ви вже на `vue-i18n` і хочете виграш у розмірі бандла без переписування.

## Пов'язані порівняння

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/next-intl_vs_intlayer.md) (той самий бенчмарк)
- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18next_vs_intlayer.md) (той самий бенчмарк)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/lingui_vs_intlayer.md) (той самий бенчмарк)
- [vue-i18n vs Intlayer (можливості та DX)](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/vue-i18n_vs_intlayer.md)
- [Чи застарів vue-i18n?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/is_vue-i18n_outdated.md)

## Зірки GitHub

Зірки GitHub — сильний індикатор популярності проєкту, довіри спільноти та довгострокової актуальності. Хоча вони не є прямою мірою технічної якості, вони відображають, скільки розробників вважають проєкт корисним, стежать за його розвитком і, ймовірно, використовуватимуть його.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## Висновок

`vue-i18n` — зріла, гнучка та глибоко інтегрована з Vue бібліотека. Бенчмарк показує, скільки коштує її runtime-first дизайн у збірці Vite: **рантайм 24 КБ gzip**, **134,9 КБ на сторінку** для застосунку, який важить 41 КБ без i18n, **90 % контенту чужих сторінок** на кожній сторінці та компоненти, кожен із яких сягає **196 КБ**, бо висить на глобальному дереві повідомлень.

Intlayer переносить роботу в компілятор. Словники за компонентами та очищення мертвого контенту — це результати збірки, а не домовленості. На тому самому застосунку: **рантайм 3,9 КБ**, **57,1 КБ на сторінку**, **0 % витоку сторінок**, компоненти **у 25 разів менші**. А якщо переписування не розглядається, `@intlayer/vue-i18n` проходить більшу частину шляху, не торкаючись компонентів.

Усі сирі дані, тестові застосунки та скрипти знаходяться в [репозиторії Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Запустіть його самі.

Докладніше див. у документі [«Чому Intlayer?»](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md).

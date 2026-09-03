---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: Чи застарів vue-i18n у 2026 році?
description: vue-i18n був стандартом для застосунків Vue та Nuxt ціле десятиліття. Проте в наших бенчмарках він виявився найважчим runtime i18n у вебі. Пояснюємо причини.
keywords:
  - vue-i18n
  - Intlayer
  - Інтернаціоналізація
  - i18n
  - Vue
  - Nuxt
  - Розмір бандла
  - Блог
slugs:
  - blog
  - is-vue-i18n-outdated
author: aymericzip
---

# Чи застарів vue-i18n у 2026 році?

У спільноті Vue небагато бібліотек мають настільки високий рівень використання, як `vue-i18n`. Підтримуваний Kazupon ще з часів Vue 2, він забезпечує роботу `@nuxtjs/i18n` і слугує рішенням за замовчуванням практично для кожного багатомовного Vue-проєкту.

Однак наші бенчмарки 2026 року показали несподіваний результат: **`vue-i18n` виявився найважчим runtime локалізації серед усіх протестованих фронтенд-фреймворків.**

На чистій базі Vite + Vue розміром 31.5 КБ додавання `vue-i18n` збільшило середній обсяг JavaScript на сторінку до **136.4 КБ**, більш ніж учетверо перевищивши початковий розмір.

Як інструмент для фреймворку, відомого компактністю, отримав настільки важкий стек інтернаціоналізації? І чи має сенс класична модель часу виконання сьогодні?

<TOC/>

## Головні висновки

**Найважчий протестований runtime:**

З вагою **24.3 КБ gzipped (83.2 КБ minified)** до додавання будь-яких перекладів `vue-i18n` приблизно в **9 разів важчий** за рушій `intlayer` (2.7 КБ).

**Збільшення ваги сторінки на 330%:**

`vue-i18n` збільшив базову сторінку Vue з 31.5 КБ до 136.4 КБ. Intlayer забезпечив 59.3 КБ, тобто **на 56% менший обсяг**.

**Прихований компілятор у браузері:**

За замовчуванням, без створення спеціальних аліасів у збирачі, `vue-i18n` відправляє повний компілятор повідомлень у браузер для розбору рядків на льоту.

**Темпи підтримки:**

За минулий рік `vue-i18n` зафіксував ~259 комітів, спрямованих на виправлення помилок та сумісність із версіями Vue.

**Відсутність рідних сучасних інструментів:**

Немає офіційної підтримки Language Server (LSP), MCP-серверів для ШІ або автоматизованих CLI-команд перекладу.

## Підтримка проти сучасного інструментарію

| Репозиторій           | Зірки                                                                                                                                                  | Всього комітів                                                                                                                                                      | Комітів / рік                                                                                                                                                      | Останній коміт                                                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlify/vue-i18n`    | [![stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/intlify/vue-i18n?style=for-the-badge&label=%2Fyear)](https://github.com/intlify/vue-i18n/commits)       | [![last](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

Показники за останні 12 місяців:

- `intlify/vue-i18n`: **259 комітів** (регулярні виправлення для Vue 3 і Nuxt).
- `aymericzip/intlayer`: **4 343 коміти** (активна розробка оптимізацій компілятора, LSP-інструментів та інтеграцій для ШІ).

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

Зріла бібліотека забезпечує передбачуваність. Проте сучасні фронтенд-рішення застосовують AST-трансформації на етапі збірки, очищення мертвого коду та автоматизацію за допомогою ШІ. Системі, орієнтованій виключно на виконання у браузері, складно переймати ці переваги.

## Тестування продуктивності у Vite + Vue

Бенчмарк застосунку на 10 сторінок та 10 мов із використанням Vite та Vue 3:

<I18nBenchmark framework="vite-vue" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> Вимірювання у реальних браузерах зі стисненням gzip. Вичерпні дані наведено в [документації бенчмарка Vue](https://intlayer.org/uk/doc/benchmark/vue).

### Початковий оверхед бібліотек

Вага до додавання файлів перекладу:

| Бібліотека        | Gzipped    | Minified   |
| ----------------- | ---------- | ---------- |
| `vue-i18n@11.4.0` | 24.3 КБ    | 83.2 КБ    |
| `intlayer@8.7.12` | **2.7 КБ** | **7.6 КБ** |

Runtime `vue-i18n` сам по собі важить **24.3 КБ gzipped**, що майже дорівнює вазі всього ядра Vue. Intlayer додає лише **2.7 КБ**.

### Вага сторінок та витік перекладів

| Конфігурація    | Сер. JS / стор. (gz) | Витік мов | Витік ін. сторінок | Сер. компонент (gz) |
| --------------- | -------------------- | --------- | ------------------ | ------------------- |
| База (без i18n) | 31.5 КБ              | 0.0%      | 90.0%              | 0.9 КБ              |
| `vue-i18n`      | **136.4 КБ**         | 50.2%     | 90.0%              | 196.0 КБ            |
| Intlayer        | **59.3 КБ**          | 51.1%     | **0.0%**           | **6.5 КБ**          |

### Головні підсумки

**Значне пропорційне зростання:**

Оскільки база Vue дуже легка (~31 КБ), підключення `vue-i18n` збільшує вагу сторінки більш ніж у чотири рази.

**Витік на інші маршрути:**

За замовчуванням **90% тексту**, що передається на сторінку, стосується інших розділів. Intlayer повністю прибирає зайві дані, зменшуючи показник до **0.0%**.

**Вага окремих компонентів:**

Компоненти з локальними областями видимості досягали в середньому 196 КБ у `vue-i18n` через дублювання каталогів, проти лише **6.5 КБ** в Intlayer.

## Чому vue-i18n важкий?

### Компілятор AST у браузері користувача

`vue-i18n` містить власний компілятор повідомлень. Правила множини та підстановки інтерпретуються як дерева AST безпосередньо у браузері під час роботи.

Щоб запобігти цьому, потрібно прописувати спеціальні аліаси до `vue-i18n/dist/vue-i18n.runtime.esm-bundler.js` і прекомпілювати файли через `@intlify/unplugin-vue-i18n`. Багато команд пропускають цей крок.

### Монолітний набір функцій

`vue-i18n` включає модулі форматування чисел і дат, зв'язані повідомлення, мости для застарілого Options API (`$t`, `v-t`) та реактивні проксі. Навіть для виведення простих рядків у `<script setup>` завантажується весь комплекс.

### Динамічні ключі блокують tree-shaking

Оскільки `"home.hero.title"` обчислюється під час виконання, збирачі не можуть перевірити реальне використання ключів. Зайві тексти залишаються в коді.

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("home.hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

[Компілятор Intlayer](https://intlayer.org/uk/doc/compiler) бачить використані поля та прибирає зайвий контент до створення клієнтських чанків. Детальніше в розділі [оптимізація бандла](https://intlayer.org/uk/doc/concept/bundle-optimization).

## Досвід розробника

### Окремі каталоги проти спільного розміщення

У `vue-i18n` переклади зберігаються в окремій папці `locales/`. Intlayer розміщує типізовані файли контенту поруч із компонентами:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```json fileName="locales/en.json"
{
  "hero": {
    "title": "Ship in every language"
  }
}
```

```json fileName="locales/uk.json"
{
  "hero": {
    "title": "Запускайте будь-якою мовою"
  }
}
```

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      en: "Ship in every language",
      uk: "Запускайте будь-якою мовою",
    }),
  },
} satisfies Dictionary;
```

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

При видаленні чи перейменуванні `Hero.vue` його файл контенту переміщується або видаляється одночасно.

### Автодоповнення проти суворої перевірки повноти

`DefineLocaleMessage` забезпечує автодоповнення в IDE на основі базової схеми. Проте воно не гарантує повноту всіх мов. Пропуск ключа в `uk.json` не викликає помилки під час збірки TypeScript.

В Intlayer словники перевіряються суворо. Активація [`strictMode`](https://intlayer.org/uk/doc/concept/configuration) призводить до зупинки збірки при відсутності перекладу в будь-якій мові.

### Інструменти для IDE та ШІ

| Можливість                   | `vue-i18n`           | Intlayer                                                                     |
| ---------------------------- | -------------------- | ---------------------------------------------------------------------------- |
| **Розширення VS Code**       | Сторонні (i18n Ally) | ✅ [Офіційне розширення](https://intlayer.org/uk/doc/vs-code-extension)      |
| **Language Server (LSP)**    | ❌ Немає             | ✅ [Вбудований LSP](https://intlayer.org/uk/doc/lsp)                         |
| **MCP Server для ШІ**        | ❌ Немає             | ✅ [Готовий MCP-сервер](https://intlayer.org/uk/doc/mcp-server)              |
| **Навички агентів (Skills)** | ❌ Немає             | ✅ [Автономні навички](https://intlayer.org/uk/doc/agent_skills)             |
| **Візуальна CMS**            | ❌ Немає             | ✅ [Безкоштовна Open Source CMS](https://intlayer.org/uk/doc/concept/editor) |

## Процеси перекладу

`vue-i18n` не містить вбудованих інструментів перекладу. Зазвичай команди передають файли зовнішнім сервісам на кшталт Crowdin або Phrase.

Intlayer пропонує вбудовані засоби:

**Локальний автопереклад за допомогою ШІ (`intlayer fill`):**

Заповнює відсутні ключі з використанням ваших особистих ключів OpenAI, Anthropic, Mistral чи Gemini.

**Автономна візуальна CMS:**

Розгортайте [Intlayer CMS](https://intlayer.org/uk/doc/concept/cms), щоб редактори могли змінювати тексти візуально зі збереженням безпосередньо в Git.

**Відкрита ліцензія:**

Усі інструменти ліцензовано під Apache 2.0.

## Коли vue-i18n все ще актуальний?

<AccordionGroup>
<Accordion header="Існуючі великі проєкти на Nuxt 2/3">

Якщо маршрутизація сильно інтегрована з `@nuxtjs/i18n`, кардинальні зміни можуть бути невиправданими.

</Accordion>
<Accordion header="Специфічні вимоги до ICU">

При широкому застосуванні зв'язаних повідомлень або особливих правил форматування дат і чисел.

</Accordion>
<Accordion header="Невеликі навчальні або особисті сайти">

Якщо розмір підсумкового бандла не є визначальним фактором.

</Accordion>
</AccordionGroup>

## Як поліпшити поточну конфігурацію vue-i18n?

Intlayer пропонує готові пакети сумісності, які точно відтворюють сигнатури функцій `vue-i18n` та `@nuxtjs/i18n` (`useI18n`, `$t`, `<i18n-t>`). Вам не потрібно переписувати шаблони чи composables, щоб скористатися перевагами легкої архітектури на базі компілятора.

Налаштування виконується однією командою:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

Цей інтерактивний CLI:

1. Встановлює пакет сумісності `@intlayer/vue-i18n` або `@intlayer/nuxt-i18n`.
2. Налаштовує аліаси бандлера (Vite чи Nuxt), щоб наявні імпорти та директиви шаблонів автоматично перенаправлялися на Intlayer, дозволяючи прибрати `vue-i18n` з `package.json`.
3. Миттєво підключає діагностику мовного сервера (LSP), видаляє 24-кілобайтний AST-парсер із клієнтського бандла та відкриває локальні робочі процеси ШІ-перекладу без суттєвого рефакторингу.

Детальні інструкції дивіться у наших посібниках:

- **Швидка сумісність:** Залишайте наявні шаблони за допомогою [адаптера для `vue-i18n`](https://intlayer.org/uk/doc/compatibility/vue-i18n) чи [`@nuxtjs/i18n`](https://intlayer.org/uk/doc/compatibility/nuxtjs-i18n).
- **Покрокові інструкції:** Перетворіть JSON-файли на типізовані словники за нашими посібниками: [з vue-i18n](https://intlayer.org/uk/doc/migration/vue-i18n) або [з @nuxtjs/i18n](https://intlayer.org/uk/doc/migration/nuxtjs-i18n).
- **Гібридний підхід:** Залиште `vue-i18n` у runtime, підключивши [Intlayer до vue-i18n](https://intlayer.org/uk/blog/intlayer-with-vue-i18n) для суворої типізації та локального ШІ-перекладу.

Перевірте ваш сайт за допомогою безкоштовного [SEO-сканера i18n](https://intlayer.org/i18n-seo-scanner):

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Корисні матеріали

- [Бенчмарк Vue & Vite i18n: повний аналіз продуктивності](https://intlayer.org/uk/doc/benchmark/vue)
- [vue-i18n проти Intlayer: детальне порівняння](https://intlayer.org/uk/blog/vue-i18n-vs-intlayer)
- [Чи застарів next-intl у 2026 році?](https://intlayer.org/uk/blog/is-next-intl-outdated)
- [Інтернаціоналізація на базі компілятора проти декларативної](https://intlayer.org/uk/blog/compiler-vs-declarative-i18n)

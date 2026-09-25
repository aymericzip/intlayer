---
createdAt: 2024-08-11
updatedAt: 2026-09-22
title: vue-i18n против Intlayer
description: Сравнение vue-i18n и Intlayer для интернационализации (i18n) в приложениях Vue/Nuxt
keywords:
  - vue-i18n
  - Intlayer
  - Интернационализация
  - i18n
  - Блог
  - Vue
  - Nuxt
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer
author: aymericzip
---

# vue-i18n ПРОТИВ Intlayer | Интернационализация Vue (i18n)

![Vue i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

Это руководство сравнивает два популярных варианта i18n для **Vue 3** (и **Nuxt**): **vue-i18n** и **Intlayer**.
Мы сосредотачиваемся на современном инструментировании Vue (Vite, Composition API) и оцениваем:

1. **Архитектуру и организацию контента**
2. **TypeScript и безопасность**
3. **Обработку отсутствующих переводов**
4. **Маршрутизацию и стратегию URL**
5. **Производительность и поведение загрузки**
6. **Опыт разработчика (DX), инструменты и сопровождение**
7. **SEO и масштабируемость для крупных проектов**

<TOC/>

> **кратко**: Оба решения могут локализовать приложения Vue. Если вам нужен **контент, ограниченный компонентом**, **строгие типы TypeScript**, **проверка отсутствующих ключей во время сборки**, **деревья сжатые словари**, а также **встроенные помощники для маршрутизации и SEO** плюс **Визуальный редактор и AI-переводы**, то **Intlayer** - более полный и современный выбор.

## Общее позиционирование

- **vue-i18n** - де-факто библиотека i18n для Vue. Гибкое форматирование сообщений (стиль ICU), блоки SFC `<i18n>` для локальных сообщений и большая экосистема. Безопасность и масштабное сопровождение в основном на вашей стороне.
- **Intlayer** - компонентно-ориентированная модель контента для Vue/Vite/Nuxt с **строгой типизацией TS**, **проверками во время сборки**, **деревьями сжатия**, **помощниками для маршрутизации и SEO**, опциональным **Визуальным редактором/CMS** и **AI-поддержкой переводов**.

## Сколько это стоит во время сборки

Перед таблицами возможностей, измеренная часть. [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) собирает одно и то же приложение Vite + Vue 3 (10 страниц, 10 локалей) с каждой библиотекой и фиксирует загрузку браузером:

<I18nBenchmark framework="vite-vue" vertical/>

| Setup                | Lib size (gz) | Page JS avg (gz) | Page leak | Component avg (gz) |
| -------------------- | ------------: | ---------------: | --------: | -----------------: |
| **base** (no i18n)   |        0.0 KB |          41.3 KB |         - |             1.1 KB |
| `vue-i18n`           |       24.3 KB |         134.9 KB |     90.0% |           196.0 KB |
| `@intlayer/vue-i18n` |        7.9 KB |          47.0 KB |      0.0% |             8.4 KB |
| **`vue-intlayer`**   |    **3.9 KB** |      **57.1 KB** |  **0.0%** |         **7.7 KB** |

Один лишь рантайм `vue-i18n` весит **в 6 раз** больше Intlayer, каждая страница содержит **90% строк чужих страниц**, а изолированно скомпилированный компонент тянет **196 КБ**, поскольку `useI18n()` связывает его со всем деревом сообщений. Полный отчет с показателями реактивности и загрузки страниц доступен в [бенчмарке vue-i18n vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/vue-i18n_vs_intlayer_benchmark.md).

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> Полная таблица в [отчете о бенчмарке Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/vue.md).

## Сравнение функций бок о бок (с фокусом на Vue)

| Функция                                                   | **Intlayer**                                                                           | **vue-i18n**                                                                                      |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Переводы рядом с компонентами**                         | ✅ Да, контент расположен рядом с компонентом (например, `MyComp.content.ts`)          | ✅ Да, через SFC-блоки `<i18n>` (опционально)                                                     |
| **Интеграция с TypeScript**                               | ✅ Продвинутая, автоматически сгенерированные **строгие** типы и автозаполнение ключей | ✅ Хорошая типизация; **строгая безопасность ключей требует дополнительной настройки/дисциплины** |
| **Обнаружение отсутствующих переводов**                   | ✅ Предупреждения/ошибки во время сборки и отображение в TS                            | ⚠️ Запасные варианты и предупреждения во время выполнения                                         |
| **Богатый контент (компоненты/Markdown)**                 | ✅ Прямая поддержка сложных узлов и файлов с содержимым Markdown                       | ⚠️ Ограничено (компоненты через `<i18n-t>`, Markdown через внешние плагины)                       |
| **Перевод с использованием ИИ**                           | ✅ Встроенные рабочие процессы с использованием ваших ключей провайдера ИИ             | ❌ Не встроено                                                                                    |
| **Визуальный редактор / CMS**                             | ✅ Бесплатный визуальный редактор и опциональная CMS                                   | ❌ Не встроено (используйте внешние платформы)                                                    |
| **Локализованная маршрутизация**                          | ✅ Хелперы для Vue Router/Nuxt для генерации локализованных путей, URL и `hreflang`    | ⚠️ Не является ядром (используйте Nuxt i18n или кастомную настройку Vue Router)                   |
| **Динамическая генерация маршрутов**                      | ✅ Да                                                                                  | ❌ Не предоставляется (предоставляется Nuxt i18n)                                                 |
| **Плюрализация и форматирование**                         | ✅ Шаблоны перечислений; форматтеры на основе Intl                                     | ✅ Сообщения в стиле ICU; форматтеры Intl                                                         |
| **Форматы контента**                                      | ✅ `.ts`, `.js`, `.json`, `.md`, `.txt` (YAML в разработке)                            | ✅ `.json`, `.js` (плюс SFC-блоки `<i18n>`)                                                       |
| **Поддержка ICU**                                         | ⚠️ В разработке                                                                        | ✅ Да                                                                                             |
| **SEO-хелперы (sitemap, robots, метаданные)**             | ✅ Встроенные хелперы (независимые от фреймворка)                                      | ❌ Не является ядром (Nuxt i18n/сообщество)                                                       |
| **SSR/SSG**                                               | ✅ Работает с Vue SSR и Nuxt; не блокирует статическую генерацию                       | ✅ Работает с Vue SSR/Nuxt                                                                        |
| **Tree-shaking (отгрузка только используемого контента)** | ✅ По компонентам во время сборки                                                      | ⚠️ Частично; требует ручного разделения кода/асинхронных сообщений                                |
| **Ленивая загрузка**                                      | ✅ По локалям / по словарям                                                            | ✅ Поддержка асинхронных сообщений локалей                                                        |
| **Удаление неиспользуемого контента**                     | ✅ Да (во время сборки)                                                                | ❌ Не встроено                                                                                    |
| **Поддерживаемость крупных проектов**                     | ✅ Поощряет модульную структуру, удобную для дизайн-систем                             | ✅ Возможно, но требует строгой дисциплины в работе с файлами/пространствами имён                 |
| **Экосистема / сообщество**                               | ⚠️ Меньше, но быстро растёт                                                            | ✅ Большое и зрелое в экосистеме Vue                                                              |

## Глубокое сравнение

<AccordionGroup>
<Accordion header="1) Архитектура и масштабируемость">

- **vue-i18n**: Обычно используется **централизованные каталоги** для каждой локали (опционально разделённые на файлы/пространства имён). Блоки SFC `<i18n>` позволяют использовать локальные сообщения, но по мере роста проектов команды часто возвращаются к общим каталогам. См. [i18n для каждого компонента против централизованного](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/per-component_vs_centralized_i18n.md).
- **Intlayer**: Продвигает использование **словарей для каждого компонента**, хранящихся рядом с самим компонентом. Это снижает конфликты между командами, облегчает поиск контента и естественным образом ограничивает расхождение и неиспользуемые ключи.

**Почему это важно:** В больших Vue-приложениях или дизайн-системах **модульный контент** масштабируется лучше, чем монолитные каталоги.

</Accordion>
<Accordion header="2) TypeScript и безопасность">

- **vue-i18n**: Хорошая поддержка TS; для **строгой типизации ключей** обычно требуются пользовательские схемы/дженерики и тщательные соглашения.
- **Intlayer**: **Генерирует строгие типы** из вашего контента, обеспечивая **автодополнение в IDE** и **ошибки на этапе компиляции** для опечаток/отсутствующих ключей.

**Почему это важно:** Строгая типизация выявляет ошибки **до** выполнения программы.

</Accordion>
<Accordion header="3) Обработка отсутствующих переводов">

- **vue-i18n**: **Время выполнения** - предупреждения/запасные варианты (например, fallback локаль или ключ). См. [обнаружение отсутствующих переводов](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/detecting_missing_translations.md).
- **Intlayer**: **Время сборки** - обнаружение с предупреждениями/ошибками по локалям и ключам., плюс `npx intlayer test` в CI.

**Почему это важно:** Контроль на этапе сборки поддерживает чистый и согласованный UI в продакшене.

</Accordion>
<Accordion header="4) Стратегия маршрутизации и URL (Vue Router/Nuxt)">

- **Обе** системы могут работать с локализованными маршрутами. См. [руководство по hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/hreflang_guide_multilingual_seo.md).
- **Intlayer** предоставляет помощники для **генерации локализованных путей**, **управления префиксами локалей** и генерации **`<link rel="alternate" hreflang>`** для SEO. В Nuxt он дополняет маршрутизацию фреймворка.

**Почему это важно:** Меньше пользовательских прослоек и **чище SEO** для разных локалей.

</Accordion>
<Accordion header="5) Производительность и поведение загрузки">

- **vue-i18n**: Поддерживает асинхронные сообщения локалей; избегать избыточного объединения бандлов - ваша задача (аккуратно разделяйте каталоги). Бенчмарк выше подтверждает это цифрами: 134.9 КБ против 57.1 КБ на страницу.
- **Intlayer**: Выполняет **tree-shaking** на этапе сборки и **ленивую загрузку по словарю/локали**. Неиспользуемый контент не включается в сборку.

**Почему это важно:** Меньшие бандлы и более быстрая загрузка для многоязычных Vue-приложений.

</Accordion>
<Accordion header="6) Опыт разработчика и инструменты">

- **vue-i18n**: Зрелая документация и сообщество; обычно вы будете полагаться на **внешние платформы локализации** для редакционных процессов.
- **Intlayer**: В комплекте **бесплатный визуальный редактор**, опциональная **CMS** (дружелюбная к Git или внешняя), расширение для **VSCode**, утилиты **CLI/CI** и **переводы с помощью ИИ** с использованием ваших собственных ключей провайдера., **сервер MCP**

**Почему это важно:** Меньше затрат на эксплуатацию и более короткий цикл разработка–контент.

</Accordion>
<Accordion header="7) SEO, SSR и SSG">

- **Обе** работают с Vue SSR и Nuxt. См. [интернационализация и SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/internationalization_and_SEO.md).
- **Intlayer**: Добавляет **SEO помощники** (карты сайта/метаданные/`hreflang`), которые не зависят от фреймворка и хорошо интегрируются с Vue/Nuxt сборками.

**Почему это важно:** Международное SEO без сложных настроек.

</Accordion>
</AccordionGroup>

## Почему Intlayer? (Проблема и подход)

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

Большинство i18n стеков (включая **vue-i18n**) начинают с **централизованных каталогов**:

<Tabs defaultTab="per-locale" group="catalog">
<Tab label="Один файл на локаль" value="per-locale">

```bash
.
├── locales
│   ├── en.json
│   ├── es.json
│   └── fr.json
└── src
    └── components
        └── MyComponent.vue
```

</Tab>
<Tab label="Одна папка на локаль" value="per-folder">

```bash
.
├── locales
│   ├── en
│   │  ├── footer.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── footer.json
│   │  └── navbar.json
│   └── es
│      ├── footer.json
│      └── navbar.json
└── src
    └── components
        └── MyComponent.vue
```

</Tab>
</Tabs>

Эта папка постоянно разрастается, по пространству имен на каждую функцию в каждой локали:

```txt
locales
├── EN
│   ├── blog.json
│   ├── about.json
│   ├── auth.json
│   ├── blog.json
│   ├── cart.json
│   ├── categories.json
│   ├── contact.json
│   ├── dashboard.json
│   ├── errors.json
│   ├── faq.json
│   ├── footer.json
│   ├── form.json
│   ├── home.json
│   ├── language.json
│   ├── navbar.json
│   ├── ... 65 files
│   └── validation.json
└── ES
```

Это часто замедляет разработку по мере роста приложений:

1. **Для нового компонента** вы создаёте/редактируете удалённые каталоги, настраиваете пространства имён и переводите (часто вручную копируя/вставляя из AI-инструментов).
2. **При изменении компонентов** вы ищете общие ключи, переводите, синхронизируете локали, удаляете неиспользуемые ключи и выравниваете структуры JSON.

**Intlayer** ограничивает область видимости контента **на уровне компонента** и хранит его **рядом с кодом**, как мы уже делаем с CSS, историями, тестами и документацией:

```bash
.
└── components
    └── MyComponent
        ├── MyComponent.content.ts
        └── MyComponent.vue
```

<Tabs defaultTab="intlayer" group="techno">
<Tab label="vue-i18n" value="vue-i18n">

```json fileName="./locales/en.json"
{
  "componentExample": {
    "greeting": "Hello World"
  }
}
```

```vue fileName="./components/MyComponent.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <span>{{ t("componentExample.greeting") }}</span>
</template>
```

Каждый файл локали приходится редактировать вручную, а ключ является простой строкой: опечатка отобразится в продакшене как `componentExample.greting`.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="./components/MyComponent/myComponent.content.ts"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```vue fileName="./components/MyComponent/MyComponent.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer"; // Vue integration

const { greeting } = useIntlayer("component-example");
</script>

<template>
  <span>{{ greeting }}</span>
</template>
```

Все локали находятся в одном типизированном файле рядом с компонентом.

</Tab>
</Tabs>

Этот подход:

- **Ускоряет разработку** (объявляйте один раз; автозаполнение в IDE/ИИ).
- **Очищает кодовую базу** (1 компонент = 1 словарь).
- **Облегчает дублирование/миграцию** (копируйте компонент вместе с его содержимым).
- **Избегает "мертвых" ключей** (неиспользуемые компоненты не импортируют содержимое).
- **Оптимизирует загрузку** (лениво загружаемые компоненты приносят с собой своё содержимое).

## Дополнительные возможности Intlayer (актуально для Vue)

- **Поддержка нескольких фреймворков**: работает с Vue, Nuxt, Vite, React, Express и другими.
- **Управление содержимым на базе JavaScript**: объявляйте в коде с полной гибкостью.
- **Файл декларации для каждого локаля**: Задайте все локали и позвольте инструментам сгенерировать остальное.
- **Типобезопасная среда**: Сильная конфигурация TypeScript с автодополнением.
- **Упрощённый доступ к контенту**: Один хук/композабл для получения всего контента словаря.
- **Организованная кодовая база**: 1 компонент = 1 словарь в одной папке.
- **Расширенная маршрутизация**: Хелперы для локализованных путей и метаданных **Vue Router/Nuxt**.
- **Поддержка Markdown**: Импорт удалённого/локального Markdown по локалям; доступ к frontmatter из кода.
- **Бесплатный визуальный редактор и опциональная CMS**: Создание контента без платной платформы локализации; синхронизация, удобная для Git.
- **Контент с поддержкой tree-shaking**: Поставляется только используемый контент; поддержка ленивой загрузки.
- **Дружелюбность к статической генерации**: Не блокирует SSG.
- **Переводы с поддержкой ИИ**: Переводите на 231 язык, используя собственного провайдера ИИ/ключ API.
- **Сервер MCP и расширение VSCode**: Автоматизируйте рабочие процессы i18n и создание контента прямо в вашей IDE.
- **Взаимодействие**: Интеграция с **vue-i18n**, **react-i18next** и **react-intl** при необходимости.

## Когда что выбирать?

<AccordionGroup>
<Accordion header="Выбрать vue-i18n">

Вам нужен **стандартный подход Vue**, вам удобно управлять каталогами и пространствами имен самостоятельно, а ваше приложение **небольшого или среднего размера** (или вы уже используете Nuxt i18n). Блоки SFC `<i18n>` и рантайм `setLocaleMessage()`, это функции, которые Intlayer намеренно не воспроизводит.

</Accordion>
<Accordion header="Выбрать Intlayer">

Вы цените **контент, привязанный к компонентам**, **строгий TypeScript**, **гарантии на этапе сборки**, **tree-shaking** и встроенные инструменты для маршрутизации, SEO и редактирования, особенно для **крупных модульных кодовых баз Vue/Nuxt** и дизайн-систем. Начните с [Intlayer с Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+vue.md) или [с Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nuxt.md).

</Accordion>
<Accordion header="Выбрать @intlayer/vue-i18n">

Вы используете `vue-i18n` сегодня и хотите оптимизировать бандл без редактирования файлов `.vue`. [Адаптер совместимости](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/vue-i18n.md) сохраняет `createI18n`, `useI18n`, `t()`, `d()`, `n()`, `$t` и `v-t`, обслуживая их из скомпилированных словарей. Прямое сравнение см. в [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/vue-i18n_vs_intlayer-vue-i18n.md).

</Accordion>
</AccordionGroup>

## Interoperability with vue-i18n

`intlayer` also может помочь управлять вашими `vue-i18n` namespaces.

Using `intlayer`, you can declare your content in the format of your favorite i18n library, and intlayer will generate your namespaces in the location of your choice (example: `/messages/{{locale}}/{{namespace}}.json`). См. [документацию по совместимости с vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/vue-i18n.md) и [адаптер Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/nuxtjs-i18n.md).

## Часто задаваемые вопросы

<FAQ>

<Question title="Intlayer, это замена vue-i18n или надстройка над ним?">

И то, и другое, в зависимости от выбранного подхода. `vue-intlayer`, это нативный рантайм с собственным компонуемым методом `useIntlayer()`. `@intlayer/vue-i18n`, это адаптер совместимости, сохраняющий API `vue-i18n` и заменяющий его привязку, что позволяет мигрировать без изменения компонентов и затем постепенно обновлять файлы.

</Question>

<Question title="Что произойдет с моими блоками SFC <i18n>?">

Адаптер их не считывает. Перенесите эти сообщения в JSON-файлы локалей или в файл `.content.ts` рядом с компонентом, что представляет собой аналогичную идею со сгенерированными типами. Это единственная функция `vue-i18n`, которая не переносится.

</Question>

<Question title="Работает ли Intlayer с Nuxt?">

Да. [Intlayer с Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nuxt.md) охватывает многоязычную маршрутизацию, middleware для определения локали и генерацию sitemap. Если вы используете `@nuxtjs/i18n`, [адаптер совместимости Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/nuxtjs-i18n.md) является путем миграции.

</Question>

<Question title="Могу ли я сохранить свои locales/{locale}.json в качестве источника истины?">

Да. [Плагин синхронизации JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/vue-i18n.md) считывает их с диалектом `vue-i18n` (`{name}`, `{0}`, множественные формы с разделителем `"car | cars"`) и записывает переводы обратно при обновлении через CLI или CMS.

</Question>

<Question title="Работает ли ICU с Intlayer на Vue?">

Нативная поддержка ICU находится в разработке. Адаптер `@intlayer/vue-i18n` поддерживает синтаксис сообщений `vue-i18n`, включая множественные формы с разделителем и именованную/списочную интерполяцию. О модели плюрализации Intlayer см. [содержимое перечисления](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/enumeration.md).

</Question>

</FAQ>

## GitHub STARs

Звезды на GitHub являются надежным индикатором популярности проекта, доверия сообщества и долгосрочной актуальности. Хотя они не являются прямым показателем технического качества, они отражают, сколько разработчиков находят проект полезным, следят за его развитием и готовы внедрить его. Для оценки ценности проекта звезды помогают сравнить популярность альтернатив и дают представление о росте экосистемы.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## Заключение

И **vue-i18n**, и **Intlayer** хорошо локализуют Vue-приложения. Разница в том, **сколько вам нужно построить самостоятельно**, чтобы получить надёжную и масштабируемую систему:

- С **Intlayer** вы получаете **модульный контент**, **строгую типизацию TS**, **безопасность на этапе сборки**, **оптимизированные бандлы с tree-shaking**, а также **инструменты для роутера, SEO и редактора** прямо «из коробки».
- Если ваша команда ставит в приоритет **поддерживаемость и скорость** в многоязычном приложении на Vue/Nuxt с компонентной архитектурой, Intlayer предлагает сегодня **самый полный** опыт.

## Дополнительные материалы

- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/vue-i18n_vs_intlayer_benchmark.md), the measured run behind the table above
- [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/vue-i18n_vs_intlayer-vue-i18n.md), the adapter on the same app
- [Is vue-i18n outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/is_vue-i18n_outdated.md)
- [How to pick a Vue i18n library](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/how_to_pick_vue_i18n_library.md)
- [Using Intlayer with vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/intlayer_with_vue-i18n.md)
- [Vue benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/vue.md)
- [Migration guide: vue-i18n to Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_vue-i18n_to_intlayer.md)
- [Bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md) and [the Intlayer compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md)

Refer to ['Why Intlayer?' doc](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/interest_of_intlayer.md) for more details.

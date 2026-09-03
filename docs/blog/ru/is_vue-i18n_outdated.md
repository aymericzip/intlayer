---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: Устарел ли vue-i18n в 2026 году?
description: vue-i18n был стандартом для Vue и Nuxt целое десятилетие. Однако в наших бенчмарках он оказался самым тяжелым runtime i18n в вебе. Разбираем причины.
keywords:
  - vue-i18n
  - Intlayer
  - Интернационализация
  - i18n
  - Vue
  - Nuxt
  - Размер бандла
  - Блог
slugs:
  - blog
  - is-vue-i18n-outdated
author: aymericzip
---

# Устарел ли vue-i18n в 2026 году?

В сообществе Vue трудно найти более популярную библиотеку, чем `vue-i18n`. Развиваемая Kazupon еще со времен Vue 2, она лежит в основе `@nuxtjs/i18n` и используется почти в каждом многоязычном Vue-приложении.

Однако бенчмарки 2026 года привели к неожиданному выводу: **`vue-i18n` оказался самым тяжелым runtime среди всех протестированных фронтенд-фреймворков.**

В базовом проекте на Vite + Vue размером 31.5 КБ добавление `vue-i18n` увеличило средний объем JavaScript на страницу до **136.4 КБ**, более чем в четыре раза превысив исходный вес.

Как фреймворк, славящийся легкостью и лаконичностью, получил настолько тяжелый инструмент локализации? И оправдана ли сегодня классическая runtime-модель?

<TOC/>

## Главные выводы

**Самый тяжелый протестированный runtime:**

С весом **24.3 КБ gzipped (83.2 КБ minified)** до добавления текстов `vue-i18n` примерно в **9 раз тяжелее** движка `intlayer` (2.7 КБ).

**Увеличение объема страницы на 330%:**

`vue-i18n` увеличил страницу Vue с 31.5 КБ до 136.4 КБ. Intlayer обеспечил 59.3 КБ, что на **56% легче**.

**Скрытый компилятор в браузере:**

По умолчанию, без настройки специальных алиасов в сборщике, `vue-i18n` загружает весь компилятор сообщений в браузер для разбора строк на лету.

**Темпы обновлений:**

За прошедший год `vue-i18n` получил ~259 коммитов, сфокусированных на исправлении ошибок и совместимости с Vue.

**Отсутствие нативного современного инструментария:**

Нет встроенной поддержки Language Server (LSP), MCP-серверов для ИИ или автоматизированных CLI-команд перевода.

## Поддержка vs. современные инструменты

| Репозиторий           | Звезды                                                                                                                                                 | Всего коммитов                                                                                                                                                      | Коммитов / год                                                                                                                                                     | Последний коммит                                                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlify/vue-i18n`    | [![stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/intlify/vue-i18n?style=for-the-badge&label=%2Fyear)](https://github.com/intlify/vue-i18n/commits)       | [![last](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

Показатели за 12 месяцев:

- `intlify/vue-i18n`: **259 коммитов** (плановые исправления для Vue 3 и Nuxt).
- `aymericzip/intlayer`: **4 343 коммита** (развитие компилятора, LSP-утилит и интеграций с ИИ-агентами).

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

Зрелая библиотека гарантирует стабильность. Но современные фронтенды используют AST-преобразования при сборке, удаление мертвого кода и автоматический перевод нейросетями. Системе, работающей исключительно во время выполнения, сложно использовать эти новшества.

## Производительность в Vite + Vue

Бенчмарк проведен на проекте из 10 страниц и 10 языков на Vite и Vue 3:

<I18nBenchmark framework="vite-vue" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> Измерения в реальных браузерах с gzip-сжатием. Данные доступны в [документации бенчмарка Vue](https://intlayer.org/ru/doc/benchmark/vue).

### Начальный оверхед библиотек

Размер до добавления переводов:

| Библиотека        | Gzipped    | Minified   |
| ----------------- | ---------- | ---------- |
| `vue-i18n@11.4.0` | 24.3 КБ    | 83.2 КБ    |
| `intlayer@8.7.12` | **2.7 КБ** | **7.6 КБ** |

Runtime `vue-i18n` весит **24.3 КБ gzipped**, что сопоставимо с ядром самого Vue. Intlayer добавляет лишь **2.7 КБ**.

### Вес страниц и утечка данных

| Конфигурация    | Ср. JS / стр. (gz) | Утечка языков | Утечка др. страниц | Ср. компонент (gz) |
| --------------- | ------------------ | ------------- | ------------------ | ------------------ |
| База (без i18n) | 31.5 КБ            | 0.0%          | 90.0%              | 0.9 КБ             |
| `vue-i18n`      | **136.4 КБ**       | 50.2%         | 90.0%              | 196.0 КБ           |
| Intlayer        | **59.3 КБ**        | 51.1%         | **0.0%**           | **6.5 КБ**         |

### Главные наблюдения

**Значительный относительный рост:**

Поскольку базовый стек Vue очень компактен (~31 КБ), подключение `vue-i18n` увеличивает вес страницы в четыре с лишним раза.

**Утечка на другие маршруты:**

По умолчанию **90% текста**, передаваемого на страницу, относится к другим разделам сайта. Intlayer полностью исключает эти данные, снижая показатель до **0.0%**.

**Вес изолированных компонентов:**

Компоненты с локальными областями видимости занимали в среднем 196 КБ в `vue-i18n` из-за дублирования каталогов против **6.5 КБ** в Intlayer.

## Почему vue-i18n тяжелый?

### Парсер AST в браузере

`vue-i18n` содержит встроенный компилятор сообщений. Правила множественного числа и интерполяции преобразуются в деревья AST прямо в браузере во время выполнения.

Чтобы избежать этого, необходимо прописывать алиасы на `vue-i18n/dist/vue-i18n.runtime.esm-bundler.js` и компилировать каталоги через `@intlify/unplugin-vue-i18n`. Многие команды упускают этот шаг.

### Монолитный набор возможностей

`vue-i18n` включает форматирование чисел и дат, связанные сообщения, мосты для Options API (`$t`, `v-t`) и реактивные прокси. Даже если вам нужны только простые строки в `<script setup>`, браузер загружает всю функциональность.

### Динамические ключи препятствуют tree-shaking

Так как `"home.hero.title"` вычисляется в рантайме, бандлеры не могут узнать, какие ключи реально вызываются. Неиспользуемые строки остаются в итоговом коде.

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

[Компилятор Intlayer](https://intlayer.org/ru/doc/compiler) отслеживает точные обращения к полям и исключает лишнее до сборки клиентских файлов. Подробнее в [оптимизации бандла](https://intlayer.org/ru/doc/concept/bundle-optimization).

## Опыт разработки

### Внешние каталоги против совместного размещения

В `vue-i18n` тексты вынесены в обособленный каталог `locales/`. Intlayer располагает файлы контента непосредственно рядом с компонентами:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```json fileName="locales/en.json"
{
  "hero": {
    "title": "Ship in every language"
  }
}
```

```json fileName="locales/ru.json"
{
  "hero": {
    "title": "Запускайте на любом языке"
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
      ru: "Запускайте на любом языке",
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

При переносе или удалении `Hero.vue` файл контента перемещается или удаляется автоматически.

### Автодополнение против строгой проверки полноты

`DefineLocaleMessage` дает автодополнение в редакторе по базовой схеме. Но оно не гарантирует полноту всех переводов. Пропуск ключа в `ru.json` не вызовет ошибку сборки TypeScript.

В Intlayer словари валидируются строго. Включение [`strictMode`](https://intlayer.org/ru/doc/concept/configuration) приводит к ошибке сборки при отсутствии перевода в любом настроенном языке.

### Инструменты для IDE и ИИ

| Возможность                 | `vue-i18n`            | Intlayer                                                                    |
| --------------------------- | --------------------- | --------------------------------------------------------------------------- |
| **Расширение VS Code**      | Стороннее (i18n Ally) | ✅ [Официальное расширение](https://intlayer.org/ru/doc/vs-code-extension)  |
| **Language Server (LSP)**   | ❌ Нет                | ✅ [Встроенный LSP](https://intlayer.org/ru/doc/lsp)                        |
| **MCP Server для ИИ**       | ❌ Нет                | ✅ [Интегрированный MCP-сервер](https://intlayer.org/ru/doc/mcp-server)     |
| **Навыки агентов (Skills)** | ❌ Нет                | ✅ [Готовые навыки](https://intlayer.org/ru/doc/agent_skills)               |
| **Визуальная CMS**          | ❌ Нет                | ✅ [Бесплатная Open Source CMS](https://intlayer.org/ru/doc/concept/editor) |

## Процессы перевода

`vue-i18n` не имеет встроенной команды для генерации переводов. Файлы обычно выгружают на внешние платформы вроде Crowdin или Phrase.

Intlayer предлагает встроенные решения:

**Автодополнение через локальный ИИ (`intlayer fill`):**

Заполняет недостающие ключи с использованием ваших API-ключей OpenAI, Anthropic, Mistral или Gemini.

**Автономная визуальная CMS:**

Используйте [Intlayer CMS](https://intlayer.org/ru/doc/concept/cms), чтобы контент-менеджеры редактировали тексты визуально с фиксацией изменений прямо в Git.

**Свободная лицензия:**

Все компоненты распространяются под лицензией Apache 2.0.

## Когда vue-i18n по-прежнему оправдан?

<AccordionGroup>
<Accordion header="Действующие проекты на Nuxt 2/3">

Если маршрутизация жестко завязана на `@nuxtjs/i18n`, переработка не всегда целесообразна.

</Accordion>
<Accordion header="Специфические требования к ICU">

При широком использовании сложных связанных сообщений или нестандартных правил форматирования.

</Accordion>
<Accordion header="Небольшие любительские сайты">

Если размер клиентского бандла не является значимым фактором.

</Accordion>
</AccordionGroup>

## Как улучшить текущую конфигурацию vue-i18n?

Intlayer предлагает готовые пакеты совместимости, полностью повторяющие сигнатуры функций `vue-i18n` и `@nuxtjs/i18n` (`useI18n`, `$t`, `<i18n-t>`). Вам не нужно переписывать шаблоны или composables, чтобы воспользоваться преимуществами легкой архитектуры на базе компилятора.

Настройка выполняется одной командой:

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

Интерактивный интерфейс командной строки:

1. Устанавливает пакет совместимости `@intlayer/vue-i18n` или `@intlayer/nuxt-i18n`.
2. Настраивает алиасы сборщика (Vite или Nuxt), чтобы привычные импорты и теги в шаблонах прозрачно вели на Intlayer, позволяя удалить `vue-i18n` из `package.json`.
3. Мгновенно включает диагностику языкового сервера (LSP), исключает 24-килобайтный AST-парсер из клиентского бандла и открывает локальные сценарии ИИ-перевода без глобального рефакторинга.

Подробные инструкции можно найти в наших руководствах:

- **Простая совместимость:** Сохраняйте существующие шаблоны с помощью [адаптера для `vue-i18n`](https://intlayer.org/ru/doc/compatibility/vue-i18n) или [`@nuxtjs/i18n`](https://intlayer.org/ru/doc/compatibility/nuxtjs-i18n).
- **Руководства по миграции:** Конвертируйте JSON-файлы в типизированные словари по нашим инструкциям: [с vue-i18n](https://intlayer.org/ru/doc/migration/vue-i18n) или [с @nuxtjs/i18n](https://intlayer.org/ru/doc/migration/nuxtjs-i18n).
- **Гибридный подход:** Оставьте `vue-i18n` в работе, подключив [Intlayer к vue-i18n](https://intlayer.org/ru/blog/intlayer-with-vue-i18n) для строгой типизации и локального ИИ-перевода.

Проверьте сайт на утечки с помощью бесплатного [SEO-сканера i18n](https://intlayer.org/i18n-seo-scanner):

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Дополнительные статьи

- [Бенчмарк Vue & Vite i18n: подробный анализ производительности](https://intlayer.org/ru/doc/benchmark/vue)
- [vue-i18n против Intlayer: детальное сравнение](https://intlayer.org/ru/blog/vue-i18n-vs-intlayer)
- [Устарел ли next-intl в 2026 году?](https://intlayer.org/ru/blog/is-next-intl-outdated)
- [Компиляция против декларативной интернационализации](https://intlayer.org/ru/blog/compiler-vs-declarative-i18n)

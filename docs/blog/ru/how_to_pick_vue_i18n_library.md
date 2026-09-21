---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Как выбрать подходящую библиотеку i18n для Vue в 2026 году"
description: Руководство по выбору инструментов интернационализации для Vue и Nuxt. На какие вопросы ответить перед сравнением vue-i18n, @nuxtjs/i18n, fluent-vue, Paraglide и Intlayer, и во сколько каждый выбор обходится в плане размера bundle, типизации и SSR payload.
keywords:
  - vue i18n
  - vue интернационализация
  - vue-i18n
  - nuxt i18n
  - fluent-vue
  - Paraglide
  - Intlayer
  - сравнение библиотек i18n
slugs:
  - blog
  - how-to-pick-vue-i18n-library
author: aymericzip
---

# Как выбрать подходящую библиотеку i18n для Vue

«Vue i18n», это одновременно и общий термин, и название библиотеки, которую устанавливают почти все. Это удобно и в то же время вводит в заблуждение: `vue-i18n`, отличный вариант по умолчанию, но далеко не единственный, а вопросы, определяющие выбор (нужен ли SSR, сколько страниц, кто пишет переводы), редко задаются до выполнения `npm install`.

Это руководство сначала ставит правильные вопросы, а затем сопоставляет ответы с подходящими библиотеками, как для чистого Vite + Vue, так и для Nuxt.

![Экосистема библиотек i18n для Vue](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Table of Contents

<TOC/>

## Шесть вопросов перед сравнением библиотек

1. **Vite SPA или Nuxt?** В SPA затраты на каталог, это проблема размера JS bundle. В Nuxt это также проблема размера HTML payload, поскольку сообщения сериализуются в состояние SSR и гидратируются. Именно поэтому большинство жалоб на то, что «vue-i18n работает медленно», исходят от приложений на Nuxt.
2. **Кто пишет переводы?** Разработчики, TMS, агентство, поставляющее строки ICU, или AI-пайплайн. `vue-i18n` использует собственный синтаксис плюрализации, разделенный вертикальной чертой (pipe), а не ICU. Это имеет решающее значение, если строки поступают извне.
3. **Сколько локалей и страниц?** Две локали и пять страниц могут позволить себе загружать всё сразу. Десять локалей и сорок маршрутов не могут, и стратегия загрузки становится главной статьей расходов.
4. **Нужна ли типизация ключей?** `t("cart.totl")` скомпилируется в `vue-i18n` без ошибок, если не передать generic схемы сообщений, а эта схема конфликтует с лениво загружаемыми каталогами.
5. **Что содержит контент?** Только UI-метки или также markdown, ссылки внутри предложений и блоки под конкретные локали. Сложный (rich) контент, это место, где `t()`, возвращающий строку, становится неудобным.
6. **Является ли CSP ограничением?** Сборка `vue-i18n` по умолчанию компилирует сообщения в браузере с помощью `new Function`. Сборкам только для runtime требуется `@intlify/unplugin-vue-i18n` для предварительной компиляции во время сборки.

Запишите ответы. Всё изложенное ниже будет опираться на них.

## Общая картина

В экосистеме Vue меньше библиотек i18n, чем в React, и они относятся к разным архитектурным волнам.

![История библиотек i18n в JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Словари времени выполнения (2015–2019): vue-i18n, @nuxt/i18n">

`vue-i18n` появился в 2015 году и с тех пор остается решением по умолчанию. `@nuxt/i18n` оборачивает его, добавляя маршрутизацию локалей, SEO-теги и ленивую загрузку для каждой локали. Сообщения компилируются в функции рендеринга: во время сборки (если подключен unplugin) или в браузере.

</Accordion>
<Accordion header="Альтернативные форматы (2020): fluent-vue">

Файлы `.ftl` от Mozilla Fluent принесли более удобный синтаксис сообщений с учетом грамматических вариантов. Типизация ключей отсутствует, а плагин Vite загружает все локали на каждую страницу.

</Accordion>
<Accordion header="Компилятор и колоцированный контент (2024–2026): Paraglide, Intlayer">

Paraglide генерирует отдельную функцию для каждого сообщения и позволяет сборщику исключать неиспользуемый код через tree-shaking. Intlayer объявляет контент для каждого компонента в файлах `.content.ts`, генерирует типы и отправляет клиенту только то, что рендерит маршрут.

</Accordion>
</AccordionGroup>

В статье об [истории JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/history_of_i18n.md) каждая волна рассмотрена подробно.

## Главное решение: где живет контент и когда он загружается

Два структурных выбора объясняют большую часть разницы в размере bundle между различными конфигурациями:

- **Централизованный или локальный (scoped) контент.** Один `locales/en.json` на всё приложение или отдельное объявление для каждого компонента.
- **Статический или динамический импорт.** Загрузка всего сразу при запуске или получение активной локали (и в идеале активного маршрута) по требованию.

На графике показана расчетная нагрузка для теоретического приложения от 1 до 10 страниц, переведенного на 1–10 локалей, при объеме текста около 30 КБ на страницу.

![Теоретическая утечка контента в зависимости от архитектуры](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`vue-i18n` поддерживает динамическую ось: вызов `setLocaleMessage` после `import()` позволяет не отправлять девять локалей, которые никто не читает. Однако он не дает разделения по страницам. Каталог локали, это один объект, и его загрузка подтягивает текст для всех страниц. В SPA этого никто не заметит. В Nuxt с `@nuxtjs/i18n` и более чем десятью страницами каждый маршрут несет в себе строки всех остальных маршрутов дважды: в JS chunk и в SSR payload.

В [бенчмарке Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/vue.md) это измеряется как «утечка из других маршрутов» и «утечка из других локалей». Если вашим ответом на вопрос 3 было «много страниц», этот раздел важнее любых предпочтений по API. В статье о [покомпонентном и централизованном i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/per-component_vs_centralized_i18n.md) этот компромисс рассматривается со стороны поддержки кода.

## Кандидаты

Размеры библиотек взяты из [бенчмарка Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/vue.md): плагин плюс composable в пустом компоненте после сборки, tree-shaking и минификации для приложения из 10 страниц и 10 локалей. Контент измеряется отдельно.

| Библиотека     | Модель контента                                                | Типобезопасность                      | Формат сообщений                    | Разделение по маршрутам | Размер библиотеки                                    |
| :------------- | :------------------------------------------------------------- | :------------------------------------ | :---------------------------------- | :---------------------- | :--------------------------------------------------- |
| `vue-i18n`     | Центральные каталоги на локаль, опционально блоки SFC `<i18n>` | 2/5 — Опционально через generic схемы | Собственный (pipe plurals)          | Нет                     | ~24.3 kB                                             |
| `@nuxtjs/i18n` | Как и в `vue-i18n`, плюс маршрутизация и SEO-теги              | 2/5 — То же                           | То же                               | Нет, только по локалям  | ~24.3 kB                                             |
| `fluent-vue`   | Файлы `.ftl` (Mozilla Fluent)                                  | 1/5 — Нет                             | Fluent                              | Нет                     | ~29.7 kB                                             |
| Paraglide      | Проект inlang, сгенерированные функции                         | 3.5/5 — Сгенерированные               | Собственный                         | Через tree-shaking      | Около нуля (за счёт сгенерированного кода в проекте) |
| Intlayer       | Один `.content.ts` на компонент                                | 5/5 — Сгенерированные, по умолчанию   | Intlayer (+ ICU, i18next, vue-i18n) | Да, по компонентам      | ~3.9 kB                                              |

> Значения представляют собой срез версий на момент проведения бенчмарка. Запустите его на своем приложении, прежде чем принимать решение исключительно на основе размера.
> Типобезопасность: 5/5 означает, что ключи, параметры и каждая локаль проверяются без ручной настройки, включая форматтеры URL и хелперы.

Размер библиотеки Paraglide близок к нулю по архитектурным причинам: runtime генерируется прямо в ваш репозиторий, что требует шага регенерации перед каждым push и приводит к merge-конфликтам в сгенерированных файлах. Intlayer требует `vite-intlayer` (или модуль для Nuxt), поэтому не может работать без шага сборки.

## Сопоставьте ваши ответы с библиотекой

<AccordionGroup>
<Accordion header="Vite SPA, небольшая команда, мало локалей">

`vue-i18n` в режиме Composition (`legacy: false`) с `@intlify/unplugin-vue-i18n`, чтобы использовать сборку только для runtime. Ленивая загрузка локалей через `import()`. Это покрывает большинство небольших приложений, а ответы сообщества можно найти везде. Блоки SFC `<i18n>` размещают сообщения рядом с компонентом, что удобно, однако экосистема извлечения и TMS-инструментов вокруг них слабее, чем вокруг JSON-каталогов, поэтому заранее определитесь, что будет использовать команда.

</Accordion>
<Accordion header="Nuxt с локализованной маршрутизацией, sitemap и hreflang">

`@nuxtjs/i18n` предоставляет стратегию маршрутизации, теги `hreflang` и определение локали без написания лишнего кода, и одного этого достаточно для контентных сайтов с небольшим числом страниц. Его ограничением является каталог на уровне локали: когда страниц больше десятка, SSR payload начинает содержать тексты всех маршрутов. Если это ваш случай, настройте `vue-i18n` вручную с сообщениями для каждого маршрута либо перейдите на scoped-контент. В статье об [i18n в Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/list_i18n_technologies/frameworks/nuxt.md) подробно рассматривается выбор стратегии маршрутизации.

</Accordion>
<Accordion header="Переводы приходят из TMS или агентства в формате ICU">

Синтаксис плюрализации в `vue-i18n` (`"no item | one item | {count} items"`), это не ICU, и он не является переносимым. Переводчиков нужно предупреждать об этом заранее, а экспорт из TMS не выдаст такой формат автоматически. Либо согласуйте формат до создания первого каталога, либо выберите библиотеку, формат которой совпадает с форматом вашего поставщика. Поддержка ICU в Intlayer частичная, поэтому если вы уже получаете строки в ICU, учитывайте это как сдерживающий фактор.

</Accordion>
<Accordion header="Большое приложение, много маршрутов, строгий бюджет на bundle или SSR payload">

Отдавайте предпочтение scoped-контенту, скомпилированному во время сборки. Paraglide решает эту задачу через tree-shaking, который отлично работает на Vite. Intlayer достигает этого за счет покомпонентных объявлений и отправляет клиенту только то, что рендерит маршрут. В `vue-i18n` можно разделять сообщения по маршрутам вручную, но инструменты этого не контролируют, и общий компонент, импортирующий глобальный namespace, незаметно нарушит разделение.

</Accordion>
<Accordion header="Типобезопасность обязательна">

`vue-i18n` можно типизировать, передав generic схемы в `createI18n`. Это работает, но ломается при ленивой загрузке каталогов, так как схема описывает сообщения, которых может еще не быть в памяти. Если вы не хотите поддерживать это вручную, выберите библиотеку, где типы генерируются из контента: Paraglide или Intlayer. В статье об [обнаружении недостающих переводов](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/detecting_missing_translations.md) сравнивается, что каждая библиотека находит на этапе сборки.

</Accordion>
<Accordion header="Контент сложнее простых UI-меток">

Markdown-страницы, предложения с `<RouterLink>` посередине, компоненты под конкретные локали. В `vue-i18n` есть `<i18n-t>` для интерполяции компонентов, что работает, но выглядит многословно. Узлы контента в Intlayer принимают markdown, HTML и вложенные объекты напрямую, что гораздо удобнее для приложений с большим объемом контента.

</Accordion>
<Accordion header="Переводы будут создаваться с помощью AI">

В этом случае у централизованного JSON не остается потребителя, который бы его оправдывал. Колоцированный контент в сочетании с CLI, дополняющим недостающие локали, наиболее прямой путь. Команда `fill` в Intlayer работает с вашим собственным API-ключом (OpenAI, Anthropic, Mistral, Gemini) и переводит только то, что изменилось.

</Accordion>
</AccordionGroup>

## В чем слабые стороны каждой библиотеки

- **`vue-i18n`**: самая тяжелая из всех, собственный формат плюрализации, типы подключаются вручную и нестабильны при ленивой загрузке, нет разделения по маршрутам, неиспользуемые ключи незаметно накапливаются. Оставленный флаг `legacy: true` в приложении Vue 3 сохраняет слой совместимости с Vue 2 и отключает типизацию `useI18n()`.
- **`@nuxtjs/i18n`**: наследует все недостатки выше, а SSR payload несет в себе строки каждой страницы, как только число маршрутов превышает десяток.
- **`fluent-vue`**: приятный синтаксис сообщений, отсутствие типизации ключей, а плагин Vite загружает весь контент на всех языках на каждую страницу. Самая тяжелая библиотека в бенчмарке.
- **Paraglide**: сгенерированные файлы сохраняются в репозиторий, требуется регенерация перед каждым push, а локаль считывается из cookie или storage при каждом вызове сообщения вместо реактивного store, что создает лишнюю нагрузку при смене языка.
- **Intlayer**: обязательный плагин для сборки, меньшая экосистема, частичная поддержка ICU, контент распределен по кодовой базе по концепции дизайна, поэтому для экспорта единого JSON для переводчика требуются специальные инструменты.

## Как каждый вариант выглядит в коде

Один и тот же компонент, сводка корзины с заголовком и формой множественного числа, написанный с использованием каждого кандидата. Самое интересное здесь, не шаблон, а то, где находится контент и что о нем знает `vue-tsc`.

<Tabs defaultTab="vue-i18n">
  <Tab label="vue-i18n" value="vue-i18n">

  <Tabs group="locale">
  <Tab value="en" label="Английский">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "no item | one item | {count} items"
  }
}
```

  </Tab>
  <Tab value="fr" label="Французский">

```json fileName="src/locales/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "aucun article | un article | {count} articles"
  }
}
```

  </Tab>
  <Tab value="es" label="Испанский">

```json fileName="src/locales/es.json"
{
  "cart": {
    "title": "Tu carrito",
    "items": "ningún artículo | un artículo | {count} artículos"
  }
}
```

  </Tab>
  </Tabs>

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const props = defineProps<{ count: number }>();
const { t } = useI18n();
</script>

<template>
  <section>
    <h2>{{ t("cart.title") }}</h2>
    <p>{{ t("cart.items", { count: props.count }, props.count) }}</p>
  </section>
</template>
```

Плюрализация через вертикальную черту (pipe), собственный формат vue-i18n, а не ICU. Функция `t` принимает любую строку, если не передать generic схемы сообщений в `createI18n`.

  </Tab>
  <Tab label="fluent-vue" value="fluent-vue">

  <Tabs group="locale">
  <Tab value="en" label="Английский">

```ftl fileName="src/locales/en.ftl"
cart-title = Your cart
cart-items = { $count ->
    [one] { $count } item
   *[other] { $count } items
}
```

  </Tab>
  <Tab value="fr" label="Французский">

```ftl fileName="src/locales/fr.ftl"
cart-title = Votre panier
cart-items = { $count ->
    [one] { $count } article
   *[other] { $count } articles
}
```

  </Tab>
  <Tab value="es" label="Испанский">

```ftl fileName="src/locales/es.ftl"
cart-title = Tu carrito
cart-items = { $count ->
    [one] { $count } artículo
   *[other] { $count } artículos
}
```

  </Tab>
  </Tabs>

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useFluent } from "fluent-vue";

const props = defineProps<{ count: number }>();
const { $t } = useFluent();
</script>

<template>
  <section>
    <h2>{{ $t("cart-title") }}</h2>
    <p>{{ $t("cart-items", { count: props.count }) }}</p>
  </section>
</template>
```

Синтаксис Fluent отлично справляется с формами множественного числа и грамматическими вариантами. Идентификаторы сообщений, это нетипизированные строки, а плагин Vite включает все локали в каждую страницу.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

  <Tabs group="locale">
  <Tab value="en" label="Английский">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

  </Tab>
  <Tab value="fr" label="Французский">

```json fileName="messages/fr.json"
{
  "cart_title": "Votre panier",
  "cart_items": "{count} articles"
}
```

  </Tab>
  <Tab value="es" label="Испанский">

```json fileName="messages/es.json"
{
  "cart_title": "Tu carrito",
  "cart_items": "{count} artículos"
}
```

  </Tab>
  </Tabs>

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { m } from "../paraglide/messages.js";

const props = defineProps<{ count: number }>();
</script>

<template>
  <section>
    <h2>{{ m.cart_title() }}</h2>
    <p>{{ m.cart_items({ count: props.count }) }}</p>
  </section>
</template>
```

Каждое сообщение, это сгенерированная типизированная функция, поэтому отсутствие ключа вызывает ошибку импорта. Папка `paraglide/` генерируется прямо в репозитории и пересоздается при каждом изменении.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      ru: "Ваша корзина",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: t({
      ru: plural({
        one: "{{count}} товар",
        few: "{{count}} товара",
        many: "{{count}} товаров",
        other: "{{count}} товаров",
      }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const props = defineProps<{ count: number }>();
const { title, items } = useIntlayer("cart-summary");
</script>

<template>
  <section>
    <h2><title /></h2>
    <p>{{ items(props.count) }}</p>
  </section>
</template>
```

Все локали находятся в одном файле рядом с компонентом. Типы генерируются во время сборки, поэтому для `title` работает автодополнение, а опечатка вызовет ошибку `vue-tsc`. `<title />` рендерит узел, доступный визуальному редактору, а `{{ items(props.count) }}` возвращает обычную строку.

  </Tab>
</Tabs>

Уже используете `vue-i18n`? [Адаптер совместимости `@intlayer/vue-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/vue-i18n.md) создает псевдонимы пакета на уровне сборщика, благодаря чему `useI18n()`, `$t`, pipe-плюрализация и `v-t` продолжают работать, пока Intlayer управляет контентом. В [руководстве по миграции](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_vue-i18n_to_intlayer.md) описан последующий отказ от адаптера, также доступно [руководство для Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_nuxtjs_i18n_to_intlayer.md).

## Перед тем как сделать выбор

Таблица возможностей показывает, что библиотека умеет сегодня. Следующие пункты помогут понять, каково будет поддерживать ее в реальной работе.

**Проверьте активность репозитория.**

Коммиты, время ответа на issues и выходил ли последний минорный релиз в этом году. Надежная архитектура без мейнтейнера, это отложенная миграция.

**Не выбирайте исключительно по числу загрузок в npm.**

Самая скачиваемая библиотека, это та, что вышла первой, а не та, которая лучше всего подходит для кодовой базы на Vue в 2026 году. Число загрузок отражает историю, а не соответствие текущим требованиям.

![Рейтинг библиотек i18n для JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Узнайте, кто финансирует мейнтейнера и что они продают.**

`vue-i18n` поддерживается платформой Crowdin, как `next-intl` и `svelte-i18n`. `i18next` поддерживается Locize. Tolgee, Paraglide (inlang) и Intlayer развивают собственные платформы. Поставщик, чей доход строится на платном хостинге переводов, мало заинтересован в том, чтобы переводы стали бесплатными внутри вашего toolchain. Intlayer, единственный вариант из списка, предлагающий AI-перевод через CLI с вашим собственным API-ключом, а также CMS, которую можно развернуть самостоятельно (self-host).

**Готова ли библиотека к работе с AI-агентами?**

Агенты все еще испытывают сложности с i18n: они забывают локали, выдумывают ключи и путают синтаксис сообщений. Поставляет ли библиотека [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md) или [MCP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md), чтобы агент мог получать список контента, заполнять его и тестировать? Оптимизирована ли загрузка контента по умолчанию, или кому-то придется каждый квартал проверять namespaces и ленивые импорты?

**Типобезопасность из коробки.**

Не «можно типизировать с помощью дополнительных настроек», а «неверный ключ приводит к ошибке `tsc` сразу после чистой установки». Проверьте, что происходит при обращении к несуществующему ключу и если для какой-то локали пропущен перевод.

**Обнаружение неиспользуемого контента.**

Каталоги со временем только растут. Сборка Intlayer удаляет неиспользуемые поля и логирует их (`build.purge`). Paraglide решает эту задачу на уровне архитектуры, поскольку невызываемая функция сообщения удаляется через tree-shaking. Во всех остальных случаях очистка остается за вами.

**Developer experience.**

Время от настройки до первой переведенной строки, наличие [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/lsp.md) или [расширения для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md), показывающего перевод при наведении и позволяющего перейти к объявлению, [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md) для заполнения, тестирования и отправки, [компилятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) или экстрактор, который извлекает захардкоженные строки из компонентов, чтобы не управлять каждой строкой ключ за ключом, а также возможность для не-разработчиков редактировать контент ([визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md)) без создания pull request.

## Часто задаваемые вопросы

<FAQ>

<Question title="Остается ли vue-i18n хорошим выбором по умолчанию в 2026 году?">

Для большинства приложений на Vue, да. У нее крупнейшая экосистема, подробная документация и предсказуемые издержки: тяжелый runtime, собственный формат множественного числа и разделение по маршрутам, которое вам придется настраивать и контролировать самостоятельно.

</Question>

<Question title="Стоит ли использовать @nuxtjs/i18n или настроить vue-i18n вручную в Nuxt?">

Используйте модуль, если только у вас не нестандартная маршрутизация или в приложении мало страниц. Настройка вручную означает самостоятельную реализацию маршрутов локалей, middleware, `hreflang` и карты сайта (sitemap), а это сложнее, чем кажется.

</Question>

<Question title="Нужна ли мне библиотека на основе компилятора?">

Только если размер bundle, SSR payload, сгенерированные типы или проверка отсутствующих ключей во время сборки являются обязательными требованиями. В статье о [сравнении компиляторного и декларативного подходов в i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/compiler_vs_declarative_i18n.md) объясняется, что дают компиляторы и где они могут ошибаться.

</Question>

<Question title="Влияет ли выбор библиотеки на SEO?">

Косвенно. Поисковым роботам важны маршрутизация, `hreflang`, `<html lang>` и наличие текста в HTML, отрендеренном на сервере. См. [руководство по hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Дополнительные материалы

- [Бенчмарк Vue i18n: размер bundle, утечки и время переключения локалей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/vue.md)
- [Vue i18n: как устроен vue-i18n и в чем его слабые места](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/list_i18n_technologies/frameworks/vue.md) и [статья об i18n в Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/list_i18n_technologies/frameworks/nuxt.md)
- [vue-i18n против Intlayer: детальное сравнение функций](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/vue-i18n_vs_intlayer.md) и [бенчмарк vue-i18n против Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/vue-i18n_vs_intlayer_benchmark.md)
- [Устарел ли vue-i18n?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/is_vue-i18n_outdated.md)
- [История i18n в JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/history_of_i18n.md)
- [Компиляторный против декларативного i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/compiler_vs_declarative_i18n.md)
- [Покомпонентный против централизованного i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/per-component_vs_centralized_i18n.md)
- [Настройка i18n в приложении Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+vue.md) и в [приложении Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nuxt.md)
- Аналогичные руководства для [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/how_to_pick_react_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/how_to_pick_svelte_i18n_library.md) и [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/how_to_pick_solid_i18n_library.md)

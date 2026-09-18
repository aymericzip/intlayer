---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Как выбрать подходящую библиотеку i18n для React в 2026 году"
description: Руководство по выбору инструментов интернационализации React. На какие вопросы ответить перед сравнением react-i18next, react-intl, Lingui, use-intl, Paraglide и Intlayer, и во сколько каждый выбор обходится в плане размера bundle, типизации и поддержки.
keywords:
  - react i18n
  - react интернационализация
  - react-i18next
  - react-intl
  - Lingui
  - use-intl
  - Paraglide
  - Intlayer
  - сравнение библиотек i18n
slugs:
  - blog
  - how-to-pick-react-i18n-library
author: aymericzip
---

# Как выбрать подходящую библиотеку i18n для React

React не поставляется со встроенными примитивами для i18n. Библиотека, которую вы выберете в первый же день, определяет, как будут храниться переводы, как они попадут в bundle и какой объем работы останется за вами на ближайшие несколько лет. Большинство команд выбирают по популярности, а затем сталкиваются с компромиссами, когда проект разрастается до 2 000 ключей.

Это руководство предлагает пойти от обратного: сначала ответьте на несколько вопросов о вашем проекте, а затем сопоставьте ответы с подходящими библиотеками. Оно ориентировано на чистый React (Vite, React Router, TanStack Start). У Next.js есть свои ограничения, рассмотренные в [сравнении Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/next-i18next_vs_next-intl_vs_intlayer.md).

![Экосистема библиотек i18n для React](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Table of Contents

<TOC/>

## Шесть вопросов перед сравнением библиотек

Таблица возможностей бесполезна, если вы не знаете, какие строки важны именно для вас. Сначала пройдитесь по этим пунктам.

1. **Как рендерится приложение?** Только SPA, SSR с гидратацией или React Server Components. Хуки на основе context работают везде в SPA. При использовании RSC хук вынуждает указывать `"use client"` для каждого компонента, отображающего текст, поэтому вам также потребуется server-side API.
2. **Кто пишет переводы?** Разработчики, внутренняя команда через TMS, агентство, предоставляющее файлы ICU, или AI-пайплайн. Это определяет формат каталога в гораздо большей степени, чем любые детали API.
3. **Сколько локалей и страниц?** Две локали и пять страниц могут позволить себе отправлять всё сразу. Десять локалей и пятьдесят маршрутов не могут, и стратегия загрузки становится главной статьей расходов.
4. **Нужна ли типизация ключей?** Опечатка в `t("checkout.totl")` скомпилируется в любой библиотеке на основе ключей, если вы не настроите типы вручную. Решите, допустимо ли это.
5. **Что содержит строка?** Простой текст, плюрализацию или предложения с компонентом `<Link>` посередине. Rich-контент, то место, где большинство API становятся неудобными.
6. **Как долго проживет проект?** Трехмесячный прототип и пятилетний продукт требуют совершенно разного объема build-инструментария.

Запишите ответы. Всё изложенное ниже будет опираться на них.

## Общая картина

Пятнадцать лет JavaScript i18n укладываются в четыре архитектурные волны, и сравниваемые библиотеки React относятся к разным из них.

![История библиотек i18n в JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Словари во время выполнения (2011–2017): i18next, react-intl">

JSON-каталоги, загружаемые в память, поиск `t("a.b")` во время выполнения, ICU или кастомный синтаксис, парсируемый в браузере. Самые большие экосистемы, самые тяжелые runtime, типизация подключается опционально.

</Accordion>
<Accordion header="Макросы времени компиляции (2018–2021): Lingui, typesafe-i18n">

Сообщения извлекаются при сборке, компилируются в компактные каталоги, типизированные аргументы. Дополнительный шаг сборки (`extract`, `compile`) в обмен на меньший размер bundle.

</Accordion>
<Accordion header="Server-first (2022–2024): use-intl / next-intl">

Спроектированы с учетом SSR и Server Components. Рендеринг на сервере, гидратация только того, что требуется клиенту. По-прежнему централизованы и основаны на ключах.

</Accordion>
<Accordion header="Компилятор и колоцированный контент (2024–2026): Paraglide, Intlayer, wuchale">

Контент компилируется в tree-shakable функции или покомпонентные словари. Типы генерируются автоматически, отсутствие переводов приводит к ошибке сборки, а перевод с помощью AI запускается прямо из CLI.

</Accordion>
</AccordionGroup>

В статье об [истории JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/history_of_i18n.md) подробно описано, как каждая волна решала проблемы предыдущей.

## Главное решение: где живет контент и когда он загружается

Каждая библиотека i18n для React устроена одинаково: store, provider, hook. Всё, что получает provider, оказывается в клиентском bundle или в данных гидратации. Поэтому существует два ключевых структурных выбора:

- **Централизованный или локальный (scoped) контент.** Один `en.json` на всё приложение или отдельное объявление для каждого компонента (или namespace).
- **Статический или динамический импорт.** Все данные собираются в bundle при запуске, либо активная локаль и маршрут загружаются по требованию.

На графике ниже показана расчетная нагрузка для теоретического приложения от 1 до 10 страниц, переведенного на 1–10 локалей, при объеме текста около 30 КБ на страницу.

![Теоретическая утечка контента в зависимости от архитектуры](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Централизованный контент со статическими импортами растет по обеим осям: 10 страниц, умноженные на 10 локалей, дают 300 КБ текста на каждой странице. Динамические импорты убирают зависимость от локалей. Локальное разделение (scoping) убирает зависимость от страниц. Только их сочетание позволяет графику оставаться плоским.

Это свойство не самой библиотеки, а дисциплины разработки. `react-i18next` можно разделить с помощью namespaces и lazy backend. `use-intl` можно разбивать по маршрутам. Но ничто не заставляет это делать строго, и общий `<Button>`, вызывающий `t("common:cta")`, незаметно превращает `common` в зависимость для каждого маршрута. В [бенчмарке](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/index.md) это измеряется как "утечка из других маршрутов" и "утечка из других локалей", и именно здесь кроется большая часть разницы между библиотеками.

Если вашим ответом на вопрос №3 было "много локалей, много страниц", уделите этому разделу больше внимания, чем любым предпочтениям по API. В статье о [покомпонентном и централизованном i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/per-component_vs_centralized_i18n.md) этот выбор рассматривается глубже с точки зрения поддержки кода.

## Кандидаты

Размеры библиотек взяты из [бенчмарка TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/tanstack.md): provider плюс hook в пустом компоненте после сборки, tree-shaking и минификации для 10 страниц и 10 локалей. Контент измеряется отдельно.

| Библиотека              | Волна        | Модель контента                                  | Типобезопасность                             | Формат сообщений                | Размер библиотеки                                    |
| :---------------------- | :----------- | :----------------------------------------------- | :------------------------------------------- | :------------------------------ | :--------------------------------------------------- |
| `react-i18next`         | Runtime      | Центральный JSON, namespaces                     | 2/5 — Опционально (`CustomTypeOptions`)      | i18next (суффиксы плюрализации) | ~18.4 kB                                             |
| `react-intl` (FormatJS) | Runtime      | Центральный JSON, ICU                            | 2/5 — Опционально (extraction + union)       | ICU                             | ~15.3 kB                                             |
| `use-intl`              | Server-first | Центральный JSON, ICU                            | 2/5 — Опционально (declaration merging)      | ICU                             | ~14.1 kB                                             |
| `@tolgee/react`         | Runtime      | Центральный, редактирование in-context           | 1/5 — Нет                                    | ICU                             | ~11.1 kB                                             |
| Lingui                  | Macro        | Исходный текст в коде, скомпилированные каталоги | 2/5 — Надежные, от компилятора               | ICU через макросы               | ~11.8 kB                                             |
| Paraglide               | Compiler     | Проект inlang, сгенерированные функции           | 3.5/5 — Сгенерированные                      | Собственный                     | Около нуля (за счёт сгенерированного кода в проекте) |
| Intlayer                | Compiler     | `.content.ts` для каждого компонента             | 5/5 — Сгенерированные, включены по умолчанию | Intlayer (+ ICU, i18next, PO)   | ~5.0 kB                                              |

> Значения представляют собой срез версий на момент проведения бенчмарка и меняются с новыми релизами. Запустите бенчмарк на своем приложении, прежде чем принимать решение только по размеру.
> Типобезопасность: 5/5 означает, что ключи, параметры и каждая локаль проверяются без ручной настройки, включая форматтеры URL и хелперы.

Две вещи, которые не отражены в таблице. `Paraglide` практически не добавляет размер библиотеки, поскольку генерирует код прямо в ваш репозиторий, что требует шага регенерации перед каждым коммитом и ведет к merge-конфликтам в сгенерированных файлах. А `Intlayer` требует плагин для bundler (`vite-intlayer` или аналог), поэтому его нельзя запустить в среде без сборки.

## Сопоставьте ваши ответы с библиотекой

<AccordionGroup>
<Accordion header="Прототип, небольшая команда, мало локалей">

Выбирайте самый простой рабочий вариант и не усложняйте. `react-i18next` с одним JSON на локаль отлично подойдет, а десятилетний опыт ответов на Stack Overflow сэкономит вам время. Пропустите namespaces, пока они действительно не понадобятся. Если прототип перерастет в продукт, запланируйте миграцию на scoped-контент, [адаптер совместимости react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/react-i18next.md) позволяет сделать это постепенно.

</Accordion>
<Accordion header="Переводы приходят от агентства или TMS с поддержкой ICU">

Формат каталога уже предопределен за вас. `react-intl` нативно поддерживает ICU, а инструментарий извлечения FormatJS создан специально под этот пайплайн. `use-intl` также работает с ICU. `react-i18next` требует плагин ICU, иначе придется использовать его собственные ключи плюрализации. Поддержка ICU в Intlayer пока частичная, поэтому, если вы уже получаете строки в ICU, учитывайте это ограничение до появления полной поддержки.

</Accordion>
<Accordion header="Большое приложение, много маршрутов, важен бюджет bundle">

Отдавайте предпочтение локальному контенту и динамической загрузке по умолчанию, а не по договоренности. `Lingui` и `Paraglide` достигают этого за счет компиляции. Intlayer реализует это через покомпонентные объявления, а компилятор включает в сборку только то, что рендерит маршрут. С `react-i18next` или `use-intl` планируйте стратегию namespaces и lazy-loading с первого дня и контролируйте ее на code review, так как инструменты этого делать не будут.

</Accordion>
<Accordion header="Типобезопасность обязательна">

Любая библиотека на основе ключей может быть типизирована, но почти ни одна не типизирована по умолчанию. Если вы не хотите поддерживать declaration merging, который должен корректно работать с лениво загружаемыми namespaces, выберите библиотеку, где типы генерируются из контента: `Lingui`, `Paraglide` или Intlayer. В статье об [обнаружении недостающих переводов](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/detecting_missing_translations.md) сравнивается, какие ошибки каждая из них находит на этапе сборки.

</Accordion>
<Accordion header="Много rich-контента: markdown, ссылки внутри предложений, компоненты под конкретные локали">

Узлы со сложным форматированием, то место, где `t()`, возвращающий строку, перестает справляться. В `react-i18next` и `Lingui` есть `<Trans>`, в `react-intl`, теги форматирования rich-текста, и все эти решения менее удобны, чем работа с обычной строкой. Узлы контента Intlayer принимают JSX, markdown и вложенные объекты напрямую, что гораздо удобнее, если контент сложнее простых меток в интерфейсе.

</Accordion>
<Accordion header="Переводы создаются AI и проверяются разработчиками">

В этом случае централизованный JSON больше не является обязательным требованием, так как нет нужды импортировать его в TMS. Колоцированный контент вместе с CLI, который дополняет недостающие локали, наиболее короткий путь. Команда `fill` в Intlayer работает с вашим собственным API-ключом (OpenAI, Anthropic, Mistral, Gemini) и переводит только то, что изменилось. Paraglide и Tolgee предлагают облачные аналоги с собственными тарифными планами.

</Accordion>
<Accordion header="Возможен переход на Next.js App Router в будущем">

React context не пересекает границу между сервером и клиентом. Библиотекам, построенным только на клиентском хуке (`react-i18next`, `react-intl`), потребуется параллельное серверное API, как только вы перейдете на RSC. В `use-intl` (в виде `next-intl`) и Intlayer (в виде `next-intlayer`) такое разделение уже предусмотрено. Ознакомьтесь со статьей об [i18n в Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/list_i18n_technologies/frameworks/nextjs.md), прежде чем стандартизировать подход.

</Accordion>
</AccordionGroup>

## В чем слабые стороны каждой библиотеки

Честные ограничения, ведь они есть у любого решения.

- **`react-i18next`**: самая тяжелая из всех, собственный формат плюрализации, типы нужно настраивать и поддерживать вручную, неиспользуемые ключи незаметно накапливаются.
- **`react-intl`**: громоздкий DX (`useIntl()`, затем `formatMessage({ id })`), глобальный экземпляр привязан ко множеству узлов.
- **`use-intl`**: проста в начале, сложна в оптимизации. Совмещение namespaces, динамической загрузки и типов существенно замедляет разработку.
- **`Lingui`**: дополнительный шаг сборки `extract` / `compile`, несколько пересекающихся синтаксисов (`t()`, tagged template, `i18n.t()`, `<Trans>`), которые путают как людей, так и AI-ассистентов.
- **`Paraglide`**: сгенерированные файлы хранятся в репозитории, tree-shaking не сработал в бенчмарке React, а локаль считывается из storage на каждом узле вместо единого store.
- **`Tolgee`**: нет типизации ключей, более сложный онбординг, главным преимуществом является редактирование in-context.
- **`Intlayer`**: обязательный плагин для сборщика, меньшая экосистема, частичная поддержка ICU, контент распределен по codebase по концепции дизайна, поэтому для экспорта единого JSON для переводчика требуются специальные инструменты.
- **`gt-react`, `lingo.dev`**: не рекомендованы по результатам бенчмарка: ошибки квот при сборке, привязка к вендору и проблемы с реактивностью, требовавшие принудительного повторного рендеринга provider.

## Как каждый вариант выглядит в коде

Один и тот же компонент, сводка корзины с заголовком и плюрализацией, реализованный на каждом из кандидатов. Самое интересное здесь не сам компонент, а то, где находится контент и что о нем знает средство проверки типов.

<Tabs defaultTab="react-i18next">
  <Tab label="react-i18next" value="react-i18next">

  <Tabs group="locale">
  <Tab value="en" label="Английский">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

  </Tab>
  <Tab value="fr" label="Французский">

```json fileName="public/locales/fr/cart.json"
{
  "title": "Votre panier",
  "items_one": "{{count}} article",
  "items_other": "{{count}} articles"
}
```

  </Tab>
  <Tab value="es" label="Испанский">

```json fileName="public/locales/es/cart.json"
{
  "title": "Tu carrito",
  "items_one": "{{count}} artículo",
  "items_other": "{{count}} artículos"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { t } = useTranslation("cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

Плюрализация использует суффиксы ключей, обрабатываемые через `Intl.PluralRules`. `t` имеет тип `(key: string) => string`, если не объявлен `CustomTypeOptions`, поэтому вызов `t("titel")` скомпилируется без ошибок.

  </Tab>
  <Tab label="react-intl" value="react-intl">

  <Tabs group="locale">
  <Tab value="en" label="Английский">

```json fileName="src/locales/en.json"
{
  "cart.title": "Your cart",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

  </Tab>
  <Tab value="fr" label="Французский">

```json fileName="src/locales/fr.json"
{
  "cart.title": "Votre panier",
  "cart.items": "{count, plural, one {# article} other {# articles}}"
}
```

  </Tab>
  <Tab value="es" label="Испанский">

```json fileName="src/locales/es.json"
{
  "cart.title": "Tu carrito",
  "cart.items": "{count, plural, one {# artículo} other {# artículos}}"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const intl = useIntl();

  return (
    <section>
      <h2>
        <FormattedMessage id="cart.title" />
      </h2>
      <p>{intl.formatMessage({ id: "cart.items" }, { count })}</p>
    </section>
  );
};
```

ICU на всех этапах, именно такой формат экспортирует большинство платформ TMS. Типы для `id` появляются благодаря шагу извлечения `formatjs` и сгенерированному union, но не доступны из коробки.

  </Tab>
  <Tab label="use-intl" value="use-intl">

  <Tabs group="locale">
  <Tab value="en" label="Английский">

```json fileName="messages/en.json"
{
  "Cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="Французский">

```json fileName="messages/fr.json"
{
  "Cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  <Tab value="es" label="Испанский">

```json fileName="messages/es.json"
{
  "Cart": {
    "title": "Tu carrito",
    "items": "{count, plural, one {# artículo} other {# artículos}}"
  }
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useTranslations } from "use-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const t = useTranslations("Cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

Та же структура, что и в `next-intl`, без привязок к Next.js. Ключи становятся типизированными после расширения `AppConfig` типом сообщений; разделение на namespaces выполняется вручную.

  </Tab>
  <Tab label="Lingui" value="lingui">

  <Tabs group="locale">
  <Tab value="en" label="Английский">

```po fileName="src/locales/en/messages.po"
msgid "Your cart"
msgstr "Your cart"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# item} other {# items}}"
```

  </Tab>
  <Tab value="fr" label="Французский">

```po fileName="src/locales/fr/messages.po"
msgid "Your cart"
msgstr "Votre panier"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# article} other {# articles}}"
```

  </Tab>
  <Tab value="es" label="Испанский">

```po fileName="src/locales/es/messages.po"
msgid "Your cart"
msgstr "Tu carrito"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# artículo} other {# artículos}}"
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { Plural, Trans } from "@lingui/react/macro";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>
      <Trans>Your cart</Trans>
    </h2>
    <p>
      <Plural value={count} one="# item" other="# items" />
    </p>
  </section>
);
```

Исходный язык находится прямо в компоненте; другие локали размещаются в `.po`-файлах с хешированными идентификаторами после выполнения `lingui extract`. Если забыть выполнить `extract` или `compile`, приложение без предупреждений переключится на английский fallback.

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

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { m } from "../paraglide/messages.js";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count })}</p>
  </section>
);
```

Каждое сообщение представляет собой сгенерированную типизированную функцию, поэтому отсутствующий ключ вызывает ошибку импорта. Папка `paraglide/` генерируется прямо в репозитории и пересоздается при каждом изменении.

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

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { title, items } = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{title}</h2>
      <p>{items(count)}</p>
    </section>
  );
};
```

Все локали находятся в одном файле рядом с компонентом. Типы генерируются при сборке, поэтому для `title` работает автодополнение, а опечатка приводит к ошибке `tsc` без настройки declaration merging. Удаление папки удаляет и связанные строки.

  </Tab>
</Tabs>

Уже используете `react-i18next`, `react-intl` или `Lingui`? Адаптеры совместимости ([react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/react-i18next.md), [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/react-intl.md), [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/lingui.md)) создают псевдонимы для импортов на уровне bundler, благодаря чему существующий API продолжает работать, пока вы переносите проект компонент за компонентом. Остальные подробности описаны в [руководстве по миграции](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_react-i18next_to_intlayer.md).

## Перед тем как сделать выбор

Таблица возможностей показывает, что библиотека умеет сейчас. Следующие пункты помогут понять, каково будет поддерживать ее в долгосрочной перспективе.

**Проверьте активность репозитория.**

Коммиты, скорость ответов в issues и выходил ли последний минорный релиз в этом году. Продуманная архитектура без поддержки, это будущая вынужденная миграция.

**Не выбирайте исключительно по количеству скачиваний в npm.**

Самая скачиваемая библиотека, та, что появилась первой, а не та, которая лучше всего подходит для кодовой базы React в 2026 году. Количество загрузок отражает историю, а не применимость к вашим задачам.

![Рейтинг библиотек i18n для JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Узнайте, кто финансирует поддержку и какие услуги продает.**

`i18next` поддерживается Locize. `next-intl` / `use-intl`, `vue-i18n`, `svelte-i18n` и Lingui поддерживаются Crowdin. Tolgee, Paraglide (inlang) и Intlayer развивают собственные платформы. Поставщик, чей доход строится на платном хостинге переводов, мало заинтересован в том, чтобы сделать переводы бесплатными внутри вашего toolchain. Intlayer, единственный вариант из списка, предлагающий AI-перевод через CLI с вашим собственным API-ключом, а также CMS, которую можно развернуть самостоятельно (self-host).

**Готова ли библиотека к работе с AI-агентами?**

Агенты все еще испытывают сложности с i18n: они забывают локали, придумывают несуществующие ключи и путают синтаксисы сообщений. Предоставляет ли библиотека [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md) или [MCP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md), чтобы агент мог просматривать, заполнять и тестировать контент? Оптимизирована ли загрузка контента по умолчанию, или кому-то придется каждый квартал проверять namespaces и lazy imports?

**Типобезопасность из коробки.**

Не «можно типизировать с помощью дополнительных настроек», а «неверный ключ приводит к ошибке `tsc` сразу после установки». Проверьте, что происходит при обращении к несуществующему ключу и если для какой-то локали пропущен перевод.

**Обнаружение неиспользуемого контента.**

Каталоги со временем только разрастаются. Сборка Intlayer удаляет неиспользуемые поля и логирует их (`build.purge`). Paraglide решает эту задачу на уровне архитектуры, так как невызываемая функция сообщения исключается через tree-shaking. В остальных решениях поиск и очистка ложатся на вас.

**Developer experience.**

Время от начала настройки до первой переведенной строки, наличие [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/lsp.md) или [расширения для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md), показывающего перевод при наведении и позволяющего перейти к объявлению, [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md) для заполнения, тестирования и отправки данных, [компилятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) или экстрактор, который извлекает захардкоженные строки из компонентов, чтобы не управлять каждой строкой ключ за ключом, а также возможность для не-разработчиков редактировать контент ([визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md)) без создания pull request.

## Часто задаваемые вопросы

<FAQ>

<Question title="Остается ли react-i18next хорошим выбором по умолчанию в 2026 году?">

Да, для большинства команд. У нее самая крупная экосистема и больше всего готовых ответов в сети. Ее недостатки предсказуемы: самый тяжелый runtime, собственный формат плюрализации, а также необходимость самостоятельно настраивать и поддерживать типизацию и разделение на области видимости (scoping).

</Question>

<Question title="Нужна ли мне библиотека на основе компилятора?">

Только если в число ваших требований входят минимальный размер bundle, сгенерированные типы или проверка отсутствующих ключей на этапе сборки. Для небольшого приложения с двумя локалями библиотеки с runtime-подходом будет достаточно. В статье о [сравнении компиляторного и декларативного подходов в i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/compiler_vs_declarative_i18n.md) подробно описаны преимущества компиляторов и возможные подводные камни.

</Question>

<Question title="Можно ли сменить библиотеку позже без переписывания каждого компонента?">

Частично. Библиотеки на основе ключей имеют схожую структуру, поэтому адаптер совместимости может сопоставить один API с другим, именно так работают адаптеры Intlayer. Форматы сообщений (ICU, i18next или хелперы) не конвертируются автоматически, поэтому плюрализацию и интерполяцию придется корректировать вручную.

</Question>

<Question title="Влияет ли выбор библиотеки на SEO?">

Косвенно. То, что видят поисковые роботы, определяется маршрутизацией, атрибутами `hreflang`, тегом `<html lang>` и наличием текста в HTML, отрендеренном на сервере. Некоторые библиотеки предоставляют хелперы для этого, большинство оставляют реализацию за вами. См. [руководство по hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Дополнительные материалы

- [Бенчмарк библиотек i18n: размер bundle, утечки и время переключения локалей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/index.md) и [отчет по TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/tanstack.md)
- [React i18n: как работает модель provider и сколько она стоит](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/list_i18n_technologies/frameworks/react.md)
- [Сравнение react-i18next, react-intl и Intlayer по функциям](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/react-i18next_vs_react-intl_vs_intlayer.md)
- [next-i18next против next-intl и Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/next-i18next_vs_next-intl_vs_intlayer.md)
- [История i18n в JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/history_of_i18n.md)
- [Компиляторный против декларативного i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/compiler_vs_declarative_i18n.md)
- [Покомпонентный против централизованного i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/per-component_vs_centralized_i18n.md)
- [Как оптимизация bundle работает на этапе сборки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md)
- [Настройка i18n в приложении Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+react.md)
- Аналогичные руководства для [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/how_to_pick_vue_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/how_to_pick_svelte_i18n_library.md) и [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/how_to_pick_solid_i18n_library.md)

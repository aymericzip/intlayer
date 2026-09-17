---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Как выбрать подходящую библиотеку i18n для Solid в 2026 году"
description: Руководство по выбору инструментов интернационализации SolidJS и SolidStart. На какие вопросы ответить перед сравнением @solid-primitives/i18n, solid-i18next, Paraglide, Lingui и Intlayer, и во сколько каждый выбор обходится в плане реактивности, размера bundle и типизации.
keywords:
  - solidjs i18n
  - solid start i18n
  - solid интернационализация
  - solid-primitives i18n
  - solid-i18next
  - Paraglide
  - Lingui
  - Intlayer
  - сравнение библиотек i18n
slugs:
  - blog
  - how-to-pick-solid-i18n-library
author: aymericzip
---

# Как выбрать подходящую библиотеку i18n для Solid

Модель реактивности Solid меняет то, что должна делать библиотека i18n. Компоненты выполняются один раз, поэтому перевод, сохраненный в `const` при инициализации (setup), превращается в застывшую строку. Библиотека, возвращающая строки вместо accessors, приведет к тому, что язык на странице переключится везде, кроме тех трех компонентов, где кто-то так сделал. Выбор библиотеки для Solid заключается как в удобстве API, так и в том, насколько сложно в ней допустить такую ошибку.

В этом руководстве перечислены вопросы, на которые стоит ответить в первую очередь, а затем они сопоставляются с `@solid-primitives/i18n`, `solid-i18next`, Paraglide, `@lingui/solid` и Intlayer как для связки Vite + Solid, так и для SolidStart.

![Экосистема библиотек i18n для Solid](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.png?raw=true)

## Table of Contents

<TOC/>

## Шесть вопросов перед сравнением библиотек

1. **Vite SPA или SolidStart?** В SPA локаль может храниться в обычном signal. В SolidStart локаль должна определяться на сервере из URL, а все данные, которые поисковый робот должен видеть без JavaScript (`<html lang>`, `hreflang`), должны находиться в `entry-server.tsx`.
2. **Насколько реактивной должна быть смена локали?** Полная перезагрузка страницы при переключении приемлема для некоторых приложений. Если нет, значения библиотеки должны быть signals или accessors, а их чтение должно отслеживаться, а не копироваться.
3. **Кто пишет переводы?** Разработчики, TMS, агентство, предоставляющее строки ICU, или AI-пайплайн. `solid-i18next` использует формат i18next. `@solid-primitives/i18n` работает с любым объектом словаря. Выбирайте под поставщика переводов.
4. **Сколько локалей и страниц?** Две локали и пять страниц могут позволить себе отправлять всё сразу. Десять локалей и сорок маршрутов не могут, и lazy-каталоги вместе со scoping становятся основной статьей расходов.
5. **Нужна ли типизация ключей?** `@solid-primitives/i18n` выводит их из исходного словаря. `solid-i18next` требует ручного объявления. Библиотеки времени компиляции генерируют их автоматически.
6. **Какой объем функциональности вам нужен?** Управление cookie, маршрутизация с префиксом локали, редиректы, форматтеры. В самом легковесном варианте ничего этого нет, и это нормально, пока не возникнет реальная необходимость.

Запишите ответы. Всё изложенное ниже будет опираться на них.

## Общая картина

Solid, самая молодая экосистема в этом ряду, имеет наименьшее количество вариантов, разделенных на три волны.

![История библиотек i18n в JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.png?raw=true)

<AccordionGroup>
<Accordion header="Словари во время выполнения: solid-i18next">

Обертка i18next для Solid. Пространства имен (namespaces), бэкенды, детекторы и десятилетие плагинов. Самый тяжелый вариант из всех с теми же накладными расходами на вызовы `t("a.b")`, что и в React.

</Accordion>
<Accordion header="Минималистичные примитивы (2022): @solid-primitives/i18n">

Плоский словарь, которым вы управляете сами, функция `translator()`, возвращающая accessors, и типы, выводимые из исходного объекта. Очень компактный, без scoping, без маршрутизации и без форматтеров. Выбор по умолчанию в сообществе.

</Accordion>
<Accordion header="Компилятор и колокация контента (2024–2026): Paraglide, Intlayer, @lingui/solid">

Paraglide генерирует отдельную функцию для каждого сообщения. Intlayer объявляет контент для каждого компонента в файлах `.content.ts` и возвращает узлы на базе signals. Биндинг Lingui для Solid появился в 2026 году и предлагает извлечение переводов на основе макросов.

</Accordion>
</AccordionGroup>

Статья об [истории JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/history_of_i18n.md) подробно рассматривает каждую волну.

## Главное архитектурное решение: где хранится контент и когда он загружается

Два структурных фактора объясняют большую часть различий в размере bundle между решениями:

- **Централизованный или изолированный (scoped) контент.** Один общий словарь на всё приложение или отдельное объявление для каждого компонента.
- **Статический или динамический импорт.** Загрузка всего контента при старте или подгрузка активной локали (и в идеале активного маршрута) по требованию.

График оценивает объем передаваемых данных для теоретического приложения размером от 1 до 10 страниц, переведенного на 1–10 локалей, с объемом текста около 30 КБ на страницу.

![Теоретическая утечка контента в зависимости от архитектуры](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.png?raw=true)

`@solid-primitives/i18n` не решает эти задачи из коробки: вы используете `createResource` для словаря каждой локали, что дает динамическую загрузку, а остальное реализуете сами. `solid-i18next` поддерживает namespaces и lazy backends, но ничто не контролирует их разделение: если общий компонент импортирует `common`, он становится зависимостью каждого маршрута. Paraglide оптимизирует разделение по страницам с помощью tree-shaking, хотя в [Solid benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/solid.md) этого эффекта достичь не удалось. Intlayer обеспечивает разделение за счет деклараций на уровне отдельных компонентов.

Если вашим ответом на вопрос 4 было «много страниц», уделите этому разделу больше внимания, чем предпочтениям в API. В статье о [колокации против централизованного i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/per-component_vs_centralized_i18n.md) рассматривается аспект поддержки того же компромисса.

## Кандидаты

Размеры библиотек взяты из [Solid benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/solid.md): provider плюс accessor в пустом компоненте после сборки, tree-shaking и минификации в приложении на 10 страниц и 10 локалей. Объем контента измеряется отдельно.

| Библиотека               | Модель контента                                  | Реактивность при смене локали                       | Типизация ключей                       | Scoping и lazy loading        | Размер библиотеки  |
| :----------------------- | :----------------------------------------------- | :-------------------------------------------------- | :------------------------------------- | :---------------------------- | :----------------- |
| `@solid-primitives/i18n` | Плоский словарь под вашим управлением            | Signal, accessors, возвращаемые translator          | Выводится из исходного словаря         | Нет встроенного               | Очень маленький    |
| `solid-i18next`          | Каталоги и namespaces i18next                    | Store, повторный рендер через provider              | Ручное объявление                      | Namespaces, lazy backends     | ~14.9 КБ           |
| Paraglide                | Проект inlang, сгенерированные функции           | Чтение из cookie или storage при вызове             | Сгенерированная                        | Tree-shaking (не в бенчмарке) | Почти нулевой      |
| `@lingui/solid`          | Исходный текст в коде, скомпилированные каталоги | На основе signals                                   | От компилятора                         | По каталогам                  | Маленький          |
| Intlayer                 | Один `.content.ts` на компонент                  | Узлы на signals, без повторного запуска компонентов | Сгенерированная, включена по умолчанию | Да, на уровне компонентов     | Базовый (Baseline) |

> Цифры отражают состояние на момент версий бенчмарка. Пакет `@lingui/solid` не участвовал в бенчмарке. Протестируйте библиотеки на своем приложении, прежде чем принимать решение только на основе размера.

Почти нулевой размер библиотеки Paraglide обусловлен ее архитектурой: runtime генерируется прямо в ваш репозиторий. Для Intlayer требуется `vite-intlayer`, поэтому он не может работать без этапа сборки (build step).

## Сопоставление ответов с библиотеками

<AccordionGroup>
<Accordion header="Vite SPA, небольшой каталог, минимум лишнего">

`@solid-primitives/i18n`. Плоский словарь, `translator()`, возвращающий accessors, и типы, выводимые без дополнительных настроек. Это отличный выбор для небольшого приложения, а чтение исходного кода займет десять минут. Что придется написать самостоятельно: сохранение локали, маршрутизацию, форматтеры и разделение по маршрутам. Если этот список начинает расти, это сигнал к переходу на другое решение.

</Accordion>
<Accordion header="Переход с React с кодовой базой на i18next">

`solid-i18next` позволяет переиспользовать каталоги, namespaces, бэкенды и детекторы без изменений. Это самый тяжелый вариант, который несет в себе те же накладные расходы, что и `react-i18next`: ручное объявление типов, возможные, но трудоемкие оптимизации, а также функцию `t()`, возвращающую строку, из-за чего легко допустить ошибку с застывшим переводом. Оборачивайте чтение в JSX или `createMemo` и никогда не сохраняйте результат в переменные при инициализации (setup).

</Accordion>
<Accordion header="SolidStart с маршрутами с префиксом локали и SSR">

Локаль должна извлекаться из URL на сервере, чтобы данные на обеих сторонах совпадали; определять ее на клиенте уже слишком поздно. `@solid-primitives/i18n` и `solid-i18next` оставляют маршрут `[[locale]]`, `matchFilters`, редиректы и теги в `entry-server.tsx` на ваше усмотрение. У Paraglide есть плагин для Vite, отвечающий за маршрутизацию. Intlayer поставляется с готовыми middleware и хелперами маршрутов. Что бы вы ни выбрали, размещайте `<html lang>` и `hreflang` в `entry-server.tsx`; `@solidjs/meta` применяется на клиенте только после гидратации в SolidStart v2. В статье об [i18n в Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/list_i18n_technologies/frameworks/solid.md) подробно описана эта настройка.

</Accordion>
<Accordion header="Смена локали должна быть мгновенной и точечной">

Выбирайте библиотеку, чьи значения представлены в виде signals или accessors, а их чтение отслеживается. Accessors в `@solid-primitives/i18n` и узлы Intlayer обновляют только те DOM-узлы, которые их читают, без повторного выполнения самого компонента. `solid-i18next` выполняет повторный рендер через provider. Paraglide считывает локаль из cookie или storage при каждом вызове сообщения вместо использования signal, что работает, но создает больше лишних операций на каждый узел.

</Accordion>
<Accordion header="Крупное приложение, множество маршрутов, строгий бюджет на bundle">

Изолированный контент, компилируемый на этапе сборки. Intlayer отправляет в браузер только то, что рендерит конкретный маршрут. Paraglide должен достигать этого через tree-shaking (проверьте это в своей конфигурации, так как в бенчмарке этого не произошло). При использовании `solid-i18next` спланируйте стратегию namespaces и lazy-загрузки с первого дня и контролируйте ее на code review.

</Accordion>
<Accordion header="Типобезопасность принципиально важна">

`@solid-primitives/i18n` предоставляет автоматически выводимые типы из коробки, чего не предлагает большинство библиотек для React. Если нужны сгенерированные типы, сохраняющиеся при lazy-загрузке и разделении по маршрутам, Paraglide, `@lingui/solid` и Intlayer создают их напрямую из контента. В статье об [обнаружении недостающих переводов](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/detecting_missing_translations.md) сравнивается, какие ошибки каждая библиотека отлавливает на этапе сборки.

</Accordion>
<Accordion header="Переводы будут создаваться с помощью AI">

В таком случае централизованный словарь теряет свое главное преимущество. Колокация контента вместе с CLI, заполняющим недостающие локали, представляет собой более короткий путь. Команда `fill` в Intlayer работает с вашим собственным API-ключом (OpenAI, Anthropic, Mistral, Gemini) и повторно переводит только измененные фрагменты.

</Accordion>
</AccordionGroup>

## В чем ограничения каждой библиотеки

- **`@solid-primitives/i18n`**: нет встроенной lazy-загрузки или scoping кроме того, что вы напишете сами, нет маршрутизации, нет работы с cookie и нет форматтеров. Отлично подходит для небольших проектов, но быстро перестает удовлетворять требованиям профессиональных приложений.
- **`solid-i18next`**: самый тяжелый вариант, ручная типизация, собственный формат плюрализации, а `t()` возвращает строку, из-за чего переводы застывают при сохранении в переменные во время инициализации компонента.
- **Paraglide**: сгенерированные файлы сохраняются в репозиторий и пересоздаются перед каждым push, tree-shaking не сработал в Solid benchmark, а локаль считывается из хранилища при каждом вызове вместо использования signal.
- **`@lingui/solid`**: новинка 2026 года, поэтому опыта эксплуатации в production пока мало. Наследует шаг сборки Lingui с `extract` / `compile` и несколько пересекающихся синтаксисов.
- **Intlayer**: обязательный плагин для сборщика, меньшая экосистема, частичная поддержка ICU и контент, распределенный по всей кодовой базе по замыслу архитектуры, поэтому для экспорта единого JSON для переводчика потребуются дополнительные инструменты.

## Как каждый вариант выглядит в коде

Один и тот же компонент, сводка корзины с заголовком и формой множественного числа, реализованный с помощью каждого кандидата. Обратите внимание на то, где читается перевод: внутри JSX чтение отслеживается, а в теле setup-функции превращается в застывшую строку.

<Tabs defaultTab="solid-primitives">
  <Tab label="@solid-primitives/i18n" value="solid-primitives">

```ts fileName="src/i18n/index.ts"
import * as i18n from "@solid-primitives/i18n";

export const en = {
  cart: { title: "Your cart", items: "{{ count }} items" },
};

export const dictionary = () => i18n.flatten(en);
export const t = i18n.translator(dictionary, i18n.resolveTemplate);
```

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { t } from "../i18n";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{t("cart.title")}</h2>
    <p>{t("cart.items", { count: props.count })}</p>
  </section>
);
```

Ключи типизируются из объекта без кодогенерации. Здесь нет правил плюрализации, lazy-загрузки и маршрутизации; всё это предстоит добавить вам.

  </Tab>
  <Tab label="solid-i18next" value="solid-i18next">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import { useTransContext } from "@mbarzda/solid-i18next";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const [t] = useTransContext();

  return (
    <section>
      <h2>{t("cart:title")}</h2>
      <p>{t("cart:items", { count: props.count })}</p>
    </section>
  );
};
```

Каталоги, namespaces и плагины i18next в исходном виде. Функция `t` возвращает строку, поэтому `const title = t("cart:title")` при инициализации зафиксирует значение; вызывайте функцию непосредственно внутри JSX.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { m } from "../paraglide/messages.js";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count: props.count })}</p>
  </section>
);
```

Каждое сообщение представляет собой сгенерированную типизированную функцию. Локаль считывается из cookie или storage при каждом вызове, а не из signal, поэтому реактивность при переключении языка настраивается вручную.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { type Dictionary, plural, t } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      ru: "Ваша корзина",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: plural({
      one: t({
        ru: "{{count}} товар",
        en: "{{count}} item",
        fr: "{{count}} article",
      }),
      other: t({
        ru: "{{count}} товаров",
        en: "{{count}} items",
        fr: "{{count}} articles",
      }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```tsx fileName="src/components/CartSummary.tsx"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const content = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{content.title}</h2>
      <p>{content.items(props.count)}</p>
    </section>
  );
};
```

Все локали находятся в одном файле рядом с компонентом. `useIntlayer` возвращает узлы на основе signals, поэтому смена локали обновляет только те DOM-узлы, которые их читают. Выражение `{content.title}` в JSX отслеживается; `content.title.value` в теле setup, нет.

  </Tab>
</Tabs>

Для существующей кодовой базы на i18next [адаптер совместимости с i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/i18next.md) подменяет alias пакета на уровне сборщика, благодаря чему каталоги и `t()` продолжают работать, пока Intlayer отдает контент. Остальные шаги описаны в [руководстве по миграции](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_i18next_to_intlayer.md).

## На что обратить внимание перед выбором

Таблица возможностей показывает, что библиотека умеет сегодня. Следующие пункты подскажут, каково будет поддерживать ее в долгосрочной перспективе.

**Проверьте активность репозитория.**

Коммиты, скорость ответов на issues и был ли последний минорный релиз в этом году. Продуманная архитектура без мейнтейнера, это будущая вынужденная миграция.

**Не ориентируйтесь только на количество скачиваний в npm.**

Самая скачиваемая библиотека, это та, которая появилась первой, а не та, которая лучше всего подходит для кодовой базы Solid в 2026 году. Количество загрузок отражает историю, а не соответствие текущим задачам.

![Рейтинг библиотек i18n для JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.png?raw=true)

**Узнайте, кто финансирует мейнтейнера и что они продают.**

`i18next` (лежащий в основе `solid-i18next`) поддерживается платформой Locize. `next-intl`, `vue-i18n`, `svelte-i18n` и Lingui поддерживаются Crowdin. Tolgee, Paraglide (inlang) и Intlayer развивают собственные платформы. Поставщик, чей доход строится на платном хостинге переводов, мало заинтересован в том, чтобы сделать переводы бесплатными внутри вашего инструментария. Intlayer, единственный в этом списке, кто предлагает AI-перевод через CLI с вашим собственным API-ключом и CMS с возможностью self-hosting.

**Готова ли библиотека к работе с AI-агентами?**

Агенты по-прежнему испытывают трудности с i18n: забывают локали, выдумывают несуществующие ключи и смешивают синтаксисы сообщений. Предоставляет ли библиотека [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md) или [MCP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md), чтобы агент мог просматривать, заполнять и тестировать контент? Оптимизирована ли загрузка контента по умолчанию, или кому-то придется ежеквартально проверять namespaces и lazy-импорты?

**Типобезопасность из коробки.**

Не «можно настроить типы при дополнительных усилиях», а «неверный ключ приводит к ошибке `tsc` сразу после чистой установки». Проверьте, что происходит при обращении к несуществующему ключу и если в какой-то локали отсутствует перевод.

**Обнаружение неиспользуемого контента.**

Словари со временем только разрастаются. Сборщик Intlayer удаляет неиспользуемые поля и логирует их (`build.purge`). Paraglide добивается этого архитектурно, так как невызываемая функция сообщения отсекается с помощью tree-shaking. Все остальные решения оставляют очистку на вашей ответственности.

**Удобство для разработчиков (DX).**

Время от установки до первой переведенной строки, наличие [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/lsp.md) или [расширения для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md), показывающего перевод при наведении и позволяющего перейти к объявлению, [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md) для заполнения, тестирования и пуша, а также возможность для нетехнических специалистов редактировать контент ([визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md)) без pull request.

## Часто задаваемые вопросы

<FAQ>

<Question title="Достаточно ли @solid-primitives/i18n для production-приложения?">

Для небольшого приложения, да, и это самый легковесный из доступных вариантов. Его возможностей перестает хватать, когда вам требуются lazy-каталоги для каждого маршрута, маршрутизация с локалями в SolidStart, сохранение в cookie или форматтеры, поскольку всё это придется разрабатывать самостоятельно.

</Question>

<Question title="Почему перевод не обновляется при смене локали?">

Потому что компоненты Solid выполняются один раз. Перевод, прочитанный в `const` при инициализации, является обычной строкой, а не реактивной подпиской. Читайте его внутри JSX, effect или memo, либо выберите библиотеку со значениями в виде accessors, где такую ошибку допустить гораздо труднее.

</Question>

<Question title="Нужна ли мне библиотека на основе компилятора?">

Только если размер bundle, сгенерированные типы или проверка отсутствующих ключей на этапе сборки являются обязательными требованиями. В статье о [компиляторах против декларативного i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/compiler_vs_declarative_i18n.md) объясняется, что дают компиляторы и в каких случаях они могут подвести.

</Question>

<Question title="Влияет ли выбор библиотеки на SEO?">

Косвенно. Поисковые роботы обращают внимание на маршрутизацию, `hreflang`, `<html lang>` и наличие текста в HTML, отрендеренном на сервере, что в SolidStart означает корректную настройку `entry-server.tsx`. Ознакомьтесь с [руководством по hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Дополнительные материалы

- [Solid i18n benchmark: размер bundle, утечки и время переключения локали](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/solid.md)
- [Solid i18n: почему переводы застывают при смене локали](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/list_i18n_technologies/frameworks/solid.md)
- [Адаптер совместимости с i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/i18next.md) и [руководство по миграции с i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_i18next_to_intlayer.md)
- [История JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/history_of_i18n.md)
- [Компиляторы против декларативного i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/compiler_vs_declarative_i18n.md)
- [Колокация против централизованного i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/per-component_vs_centralized_i18n.md)
- [Как оптимизация bundle работает на этапе сборки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md)
- [Настройка i18n в приложении на Vite + Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+solid.md) и в [приложении на SolidStart](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_solid_start.md)
- Аналогичные руководства для [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/how_to_pick_vue_i18n_library.md) и [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/how_to_pick_svelte_i18n_library.md)

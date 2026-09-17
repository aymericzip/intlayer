---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Как выбрать подходящую библиотеку i18n для Svelte в 2026 году"
description: Руководство по интернационализации Svelte и SvelteKit. На какие вопросы ответить перед сравнением svelte-i18n, Paraglide, typesafe-i18n, wuchale и Intlayer, и во сколько каждый выбор обходится в плане размера bundle, типизации и SSR.
keywords:
  - svelte i18n
  - sveltekit i18n
  - svelte интернационализация
  - svelte-i18n
  - Paraglide
  - typesafe-i18n
  - wuchale
  - Intlayer
  - сравнение библиотек i18n
slugs:
  - blog
  - how-to-pick-svelte-i18n-library
author: aymericzip
---

# Как выбрать подходящую библиотеку i18n для Svelte

В Svelte нет встроенных инструментов для i18n: ни `$t`, ни примитива локали, ни формата сообщений. Любой вариант это стороннее решение. При этом экосистема Svelte продвинулась в compile-time i18n дальше остальных, поэтому кандидаты различаются между собой сильнее, чем в React или Vue.

В этом руководстве собраны вопросы, на которые нужно ответить в первую очередь, а затем ответы сопоставляются с `svelte-i18n`, Paraglide, `typesafe-i18n`, `wuchale` и Intlayer, как для связки Vite + Svelte, так и для SvelteKit.

![Экосистема библиотек i18n для Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Table of Contents

<TOC/>

## Шесть вопросов перед сравнением библиотек

1. **Vite SPA или SvelteKit?** В SPA модуль-уровневый store работает корректно: одна вкладка, один пользователь, одна локаль. В SvelteKit тот же синглтон разделяется между параллельными запросами на сервере, из-за чего запрос B может отрендериться на языке запроса A. Библиотека либо предоставляет решение per-request (context, `locals`), либо оставляет эту задачу вам.
2. **Кто пишет переводы?** Разработчики, TMS, агентство с ICU-строками или AI-pipeline. `svelte-i18n` работает с ICU. Paraglide и `typesafe-i18n` используют собственный синтаксис. Выбирайте под формат поставщика.
3. **Сколько локалей и страниц?** Две локали и пять страниц позволяют загружать все сразу. Десять локалей и сорок маршрутов уже нет, и разница между runtime-каталогами и скомпилированными сообщениями становится ключевым фактором накладных расходов.
4. **Нужна ли типизация ключей?** `$_("cart.totl")` в `svelte-i18n` приведет к ошибке во время выполнения. Compile-time библиотеки делают такую опечатку ошибкой типов на этапе компиляции.
5. **Svelte 4 stores или Svelte 5 runes?** Runes меняют синтаксис состояния локали, но не проблему совместного использования данных. Однако `$state` в файле `.ts` компилируется в обычную переменную, поэтому runtime библиотеки должен поддерживать runes, если вы используете Svelte 5.
6. **Готовы ли вы хранить сгенерированные файлы в репозитории?** Paraglide и `typesafe-i18n` генерируют файлы JavaScript или TypeScript прямо в исходный код. Для одних команд это приемлемо, у других вызывает merge conflicts в каждой параллельной ветке.

Запишите ответы. Все последующие разделы опираются на них.

## Общая картина

i18n в Svelte появился позже, чем в React или Vue, и сразу перешел к волне решений времени компиляции.

![История библиотек i18n в JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Словари во время выполнения (2019–2020): svelte-i18n, sveltekit-i18n">

JSON-каталоги, ICU парсится в браузере через `intl-messageformat`, локаль хранится в stores уровня модуля (`$locale`, `$_`). Самое популярное и хорошо документированное решение, но интеграцию с SSR приходится настраивать самостоятельно.

</Accordion>
<Accordion header="Генерация типов (2020–2022): typesafe-i18n">

Генератор отслеживает каталоги и создает типизированные аксессоры (`$LL.cart.total()`). Продуманная модель, сгенерированные файлы в репозитории, однако активность разработки в последнее время снизилась.

</Accordion>
<Accordion header="Компиляторы и колокация контента (2022–2026): Paraglide, wuchale, Intlayer">

Paraglide компилирует каждое сообщение в отдельную экспортируемую функцию, благодаря чему bundler удаляет через tree-shaking неиспользуемые на маршруте строки. `wuchale` извлекает строки из разметки при сборке. Intlayer декларирует контент рядом с компонентом, генерируя типы и словари для каждого компонента отдельно.

</Accordion>
</AccordionGroup>

В статье об [истории i18n в JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/history_of_i18n.md) подробно рассматривается каждая волна.

## Главное решение: где хранится контент и когда он загружается

Два архитектурных выбора объясняют большую часть разницы в размере bundle между решениями:

- **Централизованный или изолированный контент.** Один файл `locales/en.json` на все приложение или отдельные объявления для каждого компонента.
- **Статический или динамический импорт.** Загрузка всего сразу при старте или получение активной локали (и в идеале активного маршрута) по требованию.

На графике показана расчетная нагрузка для приложения от 1 до 10 страниц с переводом на 1–10 локалей при объеме текста около 30 КБ на страницу.

![Теоретическая утечка контента по архитектурам](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`svelte-i18n` по умолчанию находится в верхнем левом углу: вызов `register("fr", () => import("./fr.json"))` обеспечивает динамическую загрузку для каждой локали, но каталог локали представляет собой единый объект, поэтому при его загрузке подтягиваются тексты всех страниц. Paraglide представляет собой интересный случай: поскольку каждое сообщение является отдельным экспортом, tree-shaking автоматически разделяет страницы, и [бенчмарк Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/svelte.md) подтверждает эффективность на Vite + Svelte (в бенчмарках React и Next.js этого не происходило). Intlayer достигает аналогичных показателей за счет объявлений на уровне компонентов.

Если в вопросе 3 вы указали «много страниц», уделите этому разделу больше внимания, чем предпочтениям в API. В статье о [колокации против централизованного i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/per-component_vs_centralized_i18n.md) подробно описана сторона поддержки этого компромисса.

## Кандидаты

Размеры библиотек взяты из [бенчмарка Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/svelte.md): store плюс аксессор в пустом компоненте после сборки, tree-shaking и минификации в приложении на 10 страниц и 10 локалей. Объем контента измеряется отдельно.

| Библиотека      | Где хранятся сообщения                 | Состояние локали                         | Типобезопасность        | Формат сообщений              | Разделение по маршрутам  | Размер библиотеки                                       |
| :-------------- | :------------------------------------- | :--------------------------------------- | :---------------------- | :---------------------------- | :----------------------- | :------------------------------------------------------ |
| `svelte-i18n`   | JSON-каталоги по локалям               | Svelte store на уровне модуля            | 2/5 — Ручные union-типы | ICU                           | Нет                      | ~16.6 kB                                                |
| `typesafe-i18n` | Сгенерированные TS-модули              | Адаптер store                            | 4/5 — Сгенерированные   | Собственный                   | Частично                 | Маленький                                               |
| Paraglide       | Проект inlang, компилируемый в функции | Чтение при вызове из cookie, URL/storage | 3.5/5 — Сгенерированные | Собственный                   | Да, через tree-shaking   | Почти нулевой (за счёт сгенерированного кода в проекте) |
| `wuchale`       | Извлечение из разметки при build       | Store                                    | N/A (без ключей)        | Собственный                   | Да                       | ~30.7 kB                                                |
| Intlayer        | `.content.ts` рядом с компонентом      | Context плюс store, поддержка runes      | 5/5 — Автоматически     | Intlayer (+ ICU, i18next, PO) | Да, на уровне компонента | ~3.6 kB                                                 |

> Цифры отражают состояние на момент тестирования версий бенчмарка. Проверьте показатели на собственном приложении перед принятием решения исключительно по размеру.
> Типобезопасность: 5/5 означает, что ключи, параметры и каждая локаль проверяются без ручной настройки, включая форматтеры URL и хелперы.

Почти нулевой размер Paraglide обусловлен его архитектурой: runtime генерируется прямо в репозиторий. Для работы Intlayer требуется `vite-intlayer`, поэтому он не может работать без шага build.

## Сопоставление требований с библиотекой

<AccordionGroup>
<Accordion header="Vite SPA, небольшая команда, мало локалей">

`svelte-i18n`. Это самый документированный вариант, `$_` лаконично смотрится в разметке, а связка `register` и `waitLocale()` решает задачу ленивой загрузки локалей. Обязательно блокируйте первый рендер через `isLoading`, иначе возникнет мигание необработанных ключей. Если в будущем планируется серверный рендеринг, поместите локаль в context Svelte с самого начала вместо store уровня модуля: сейчас это не требует усилий, но защитит от трудноуловимых ошибок в production.

</Accordion>
<Accordion header="SvelteKit с локализованным роутингом и SSR">

В этом случае решающим фактором становится проблема разделения состояния. `svelte-i18n` работает в SvelteKit, но логику per-request (`hooks.server.ts`, `locals`, `load`, затем `setContext`) приходится реализовывать вручную, где легко допустить ошибку. Paraglide предлагает готовую интеграцию со SvelteKit, которая берет на себя роутинг и считывает локаль при каждом вызове, избегая синглтонов. Intlayer передает локаль из данных `load` в context. В статье об [i18n в SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/list_i18n_technologies/frameworks/sveltekit.md) подробно разобран выбор между `[[lang]]` и `reroute`, с которым стоит определиться до выбора библиотеки.

</Accordion>
<Accordion header="Переводы поступают из TMS или агентства в формате ICU">

`svelte-i18n` нативно поддерживает ICU через `intl-messageformat`, что позволяет подключать его к большинству поставщиков напрямую. Paraglide и `typesafe-i18n` используют собственный синтаксис и требуют конвертации. В Intlayer поддержка ICU частичная, поэтому если вы уже получаете строки в ICU, это может стать блокирующим фактором.

</Accordion>
<Accordion header="Размер bundle является главным ограничением">

Решения времени компиляции. Tree-shaking в Paraglide отлично работает на связке Vite + Svelte, а размер библиотеки почти нулевой. Словари на уровне компонентов в Intlayer дают схожий результат без необходимости коммитить сгенерированные файлы в репозиторий. `svelte-i18n` поставляет парсер ICU вместе со всем каталогом, занимая в бенчмарке примерно в 4.5 раза больше места, чем `svelte-intlayer`, еще до добавления контента.

</Accordion>
<Accordion header="Строгая типизация обязательна">

Любой вариант, кроме базовой конфигурации `svelte-i18n`, где единственной типизацией является созданный вручную union-тип, быстро рассинхронизирующийся с JSON. `typesafe-i18n`, Paraglide и Intlayer генерируют типы напрямую из контента. Перед выбором `typesafe-i18n` обратите внимание на активность репозитория. В статье об [обнаружении пропущенных переводов](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/detecting_missing_translations.md) сравнивается, какие ошибки выявляет каждая библиотека на этапе сборки.

</Accordion>
<Accordion header="Нежелательно хранить сгенерированные файлы в репозитории">

Это исключает Paraglide и `typesafe-i18n`. `svelte-i18n` и Intlayer хранят результаты работы в `node_modules` или директории сборки. В Intlayer файлы `.content.ts` являются исходным кодом, а скомпилированные словари и типы находятся в папке `.intlayer/`, которая добавляется в `.gitignore`.

</Accordion>
<Accordion header="Переводы генерируются с помощью AI">

В таком случае в централизованном JSON больше нет практической необходимости. Колокация контента в сочетании с CLI для заполнения недостающих локалей оказывается быстрее. Команда `fill` в Intlayer работает с вашими API-ключами (OpenAI, Anthropic, Mistral, Gemini) и переводит только то, что изменилось. Экосистема inlang у Paraglide предлагает облачные аналоги с собственными тарифами.

</Accordion>
</AccordionGroup>

## Недостатки библиотек

- **`svelte-i18n`**: самая тяжелая библиотека из представленных, нет типизации ключей, нет разделения по маршрутам, а store уровня модуля приводит к утечкам состояния между запросами на SvelteKit, если не настроить context вручную.
- **`typesafe-i18n`**: требует отдельного процесса watcher, генерирует файлы в репозитории, а разработка проекта в последнее время практически не ведется.
- **Paraglide**: сгенерированные файлы коммитятся в репозиторий и пересоздаются перед каждым push, что приводит к merge conflicts в параллельных ветках; локаль считывается из cookie или storage при каждом вызове сообщения, а не берется из store, создавая дополнительную нагрузку при смене языка.
- **`wuchale`**: интересная идея извлечения строк, но проект находится на ранней стадии. В бенчмарке React возникли проблемы с реактивностью, потребовавшие принудительного ререндера провайдера, а документация пока минимальна.
- **Intlayer**: требует обязательного плагина сборки, меньшая экосистема, частичная поддержка ICU и распределение контента по проекту, из-за чего для экспорта единого JSON переводчику нужны дополнительные инструменты.

## Примеры кода

Один и тот же компонент корзины с заголовком и формой множественного числа, реализованный на каждом из кандидатов. Главные различия заключаются не в разметке, а в том, где хранится контент, как устроено состояние локали и что доступно проверке типов.

<Tabs defaultTab="svelte-i18n">
  <Tab label="svelte-i18n" value="svelte-i18n">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { _ } from "svelte-i18n";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$_("cart.title")}</h2>
  <p>{$_("cart.items", { values: { count } })}</p>
</section>
```

ICU через `intl-messageformat`, локаль в store уровня модуля. `$_` принимает любую строку, а типизация ограничивается написанным вручную union-типом.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{m.cart_title()}</h2>
  <p>{m.cart_items({ count })}</p>
</section>
```

Каждое сообщение представляет собой сгенерированную типизированную функцию, которая исключается при tree-shaking, если не используется. Папка `paraglide/` генерируется прямо в репозитории, а локаль считывается при каждом вызове, а не из store.

  </Tab>
  <Tab label="typesafe-i18n" value="typesafe-i18n">

```ts fileName="src/i18n/en/index.ts"
import type { BaseTranslation } from "../i18n-types";

const en = {
  cart: {
    title: "Your cart",
    items: "{count} item{{s}}",
  },
} satisfies BaseTranslation;

export default en;
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import LL from "$i18n/i18n-svelte";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$LL.cart.title()}</h2>
  <p>{$LL.cart.items({ count })}</p>
</section>
```

Типизированные аксессоры, генерируемые фоновым процессом. Модель надежна, но сгенерированные файлы сохраняются в репозитории, а активность проекта заметно снизилась.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/lib/cartSummary.content.ts"
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

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  let { count }: { count: number } = $props();
  const content = useIntlayer("cart-summary");
</script>

<section>
  <h2>{$content.title}</h2>
  <p>{$content.items(count)}</p>
</section>
```

Все локали хранятся в одном файле рядом с компонентом. `useIntlayer` возвращает readable store со стандартной автоподпиской `$content`, а локаль сохраняется в context (безопасно для SSR), а не в синглтоне модуля.

  </Tab>
</Tabs>

Уже используете `svelte-i18n`? [Адаптер совместимости `@intlayer/svelte-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/svelte-i18n.md) создает алиас пакета на уровне bundler, сохраняя работоспособность `$_`, `$date`, `$number` и плоских ключей, пока Intlayer управляет контентом.

## Перед принятием окончательного решения

Таблица возможностей показывает текущее состояние библиотеки. Следующие критерии помогут понять, каково будет поддерживать ее в долгосрочной перспективе.

**Проверьте активность репозитория.**

Обратите внимание на коммиты, скорость ответов в issues и дату последнего минорного релиза. Качественная архитектура без активного мейнтейнера со временем неизбежно потребует миграции.

**Не выбирайте исключительно по числу загрузок в npm.**

Самая скачиваемая библиотека это та, которая появилась первой, а не та, которая лучше всего подходит для Svelte в 2026 году. Количество загрузок отражает историю, а не актуальность.

![Рейтинг библиотек i18n для JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Узнайте, кто финансирует поддержку и какую бизнес-модель использует.**

Разработку `svelte-i18n` поддерживает Crowdin, как и `next-intl` с `vue-i18n`. За `i18next` стоит Locize. Tolgee, Paraglide (inlang) и Intlayer развивают собственные платформы. Поставщик, чей доход зависит от платного хостинга переводов, мало заинтересован в развитии бесплатных инструментов внутри вашего toolchain. Intlayer является единственным решением из списка, предлагающим AI-перевод через CLI с вашим собственным API-ключом и self-hosted CMS.

**Готовность к работе с AI-агентами.**

Агенты все еще допускают ошибки в i18n: забывают локали, придумывают несуществующие ключи и путают синтаксис сообщений. Предлагает ли библиотека [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md) или [MCP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md), чтобы агент мог просматривать, заполнять и тестировать контент? Оптимизирована ли загрузка контента по умолчанию, или команде придется регулярно пересматривать namespaces и динамические импорты?

**Типизация из коробки.**

Речь идет не о «возможности настроить типы вручную», а о ситуации, когда неверный ключ приводит к ошибке `tsc` сразу после установки. Проверьте, как библиотека реагирует на несуществующий ключ и на локаль с отсутствующим переводом.

**Обнаружение неиспользуемого контента.**

Каталоги со временем только увеличиваются. Сборка Intlayer удаляет неиспользуемые поля и логирует их (`build.purge`). Paraglide решает эту задачу на уровне архитектуры: невызываемая функция сообщения удаляется при tree-shaking. Остальные инструменты оставляют очистку на усмотрение разработчика.

**Удобство для разработчиков (DX).**

Время от начала настройки до первой переведенной строки, наличие [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/lsp.md) или [расширения VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md) с подсказками при наведении и переходом к объявлению, [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md) для генерации, тестирования и отправки переводов, [компилятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) или экстрактор, который извлекает захардкоженные строки из компонентов, чтобы не управлять каждой строкой ключ за ключом, а также возможность редактирования контента специалистами без участия разработчиков ([визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md)) без создания pull request.

## Часто задаваемые вопросы

<FAQ>

<Question title="Остается ли svelte-i18n оптимальным выбором по умолчанию в 2026 году?">

Для SPA на Vite с небольшим объемом текстов да. Это самый документированный вариант, а совместимость с ICU важна для многих команд. Однако на SvelteKit или в проектах объемом более нескольких десятков страниц его недостатки (отсутствие типов, глобальный store, отсутствие модульности) становятся ощутимыми.

</Question>

<Question title="Действительно ли работает tree-shaking в Paraglide?">

На связке Vite + Svelte да, что подтверждается результатами бенчмарка. В то же время на React с TanStack Start или Next.js в рамках того же бенчмарка эффекта достичь не удалось. Рекомендуется протестировать решение на собственном стеке, не полагаясь исключительно на сторонние тесты.

</Question>

<Question title="Влияют ли runes на выбор библиотеки?">

Они меняют синтаксис управления состоянием локали, но не решают проблему изоляции данных на сервере. Главное значение имеет то, поддерживает ли runtime библиотеки runes в Svelte 5 и использует ли context вместо store на уровне модуля. Проверьте оба пункта.

</Question>

<Question title="Влияет ли выбор библиотеки на SEO?">

Косвенно. Для поисковых роботов критичны корректный роутинг, теги `hreflang`, атрибут `<html lang>` и присутствие текста в HTML, сгенерированном на сервере. Подробнее об этом читайте в [руководстве по hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Полезные материалы

- [Бенчмарк i18n для Svelte: размер bundle, утечки контента и скорость переключения локалей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/svelte.md)
- [i18n в Svelte: stores, runes и ловушка синглтонов уровня модуля](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/list_i18n_technologies/frameworks/svelte.md) и [i18n в SvelteKit: роутинг, SSR и разделяемое состояние](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/list_i18n_technologies/frameworks/sveltekit.md)
- [Адаптер совместимости с `svelte-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/svelte-i18n.md)
- [История i18n в JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/history_of_i18n.md)
- [Компиляторы против декларативного i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/compiler_vs_declarative_i18n.md)
- [Колокация контента против централизованного i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/per-component_vs_centralized_i18n.md)
- [Как работает оптимизация bundle на этапе сборки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md)
- [Настройка i18n в приложении Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+svelte.md) и в [SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_svelte_kit.md)
- Аналогичные руководства для [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/how_to_pick_vue_i18n_library.md) и [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/how_to_pick_solid_i18n_library.md)

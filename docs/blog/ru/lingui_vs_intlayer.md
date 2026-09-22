---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "Lingui против Intlayer: бенчмарк и сравнение 2026"
description: "Две библиотеки интернационализации на базе компилятора, протестированные на Next.js и TanStack Start. Размер бандла, утечка контента, размер компонентов, гидратация, отзывчивость при смене языка и опыт разработки."
keywords:
  - Lingui
  - Intlayer
  - Интернационализация
  - i18n
  - Бенчмарк
  - Размер бандла
  - Компилятор
  - Блог
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - lingui-vs-intlayer
author: aymericzip
---

# Lingui против Intlayer | Бенчмарк интернационализации (i18n) для React и Next.js

![JavaScript i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

Lingui и Intlayer - единственные две библиотеки в этом сравнительном исследовании, которые опираются на **компилятор**, а не на обычный рантайм. Lingui извлекает сообщения из макросов во время сборки и компилирует каталоги под каждую локаль. Intlayer компилирует словари на уровне компонентов и применяет tree-shaking отдельно для каждого языка. В теории их показатели должны быть близки. Цифры показывают, в чем они существенно расходятся.

Данные получены с помощью [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) - открытого набора тестов, который собирает одно и то же приложение с каждой библиотекой и замеряет то, что браузер реально скачивает и исполняет.

<TOC/>

> **Кратко (tl;dr)**: Lingui ближе всех подобрался к Intlayer по объему чистого JavaScript на страницу: **115-120 КБ** против **118,6 КБ** на TanStack Start при настроенной ленивой загрузке, и **148,6 КБ** против **141,3 КБ** на Next.js. Однако в остальных аспектах образуется значительный разрыв: изолированно скомпилированный компонент Lingui весит **58-153 КБ** против **6-8 КБ** у Intlayer, гидратация занимает **28-34 мс** против **11-14 мс**, запасной текст исходной локали дает утечку **3-15%** английских строк на французские страницы даже в оптимизированных сборках, а достижение такой оптимизации требует ручного извлечения, сборки и маршрутного разделения каталогов. Intlayer обеспечивает наилучшие показатели без какой-либо ручной настройки.

## Коротко о главном

- **Lingui** - работает на макросах (`` t`...` ``, `<Trans>`, `msg`), поддерживает синтаксис ICU MessageFormat, каталоги в форматах `.po` / JSON, пайплайн `lingui extract` + `lingui compile`. Компилирует идентификаторы в компактные хеши, поддерживает динамическую подгрузку каталогов по языкам. Зрелое, не привязанное к фреймворку решение с развитой инфраструктурой переводческих утилит вокруг формата `.po`.
- **Intlayer** - компонентно-ориентированная модель контента. Словари `.content.ts` располагаются прямо рядом с целевым компонентом; компилятор на этапе сборки выполняет tree-shaking и загружает переводы по требованию для каждого компонента и языка; генерирует строгие типы TypeScript на основе контента, а пропущенные переводы вызывают ошибку сборки. Содержит встроенные middleware, SEO-хелперы, Визуальный редактор / CMS и модуль автоперевода через ИИ.

| Библиотека            | Звезды на GitHub                                                                                                                                                               | Всего коммитов                                                                                                                                                                     | Последний коммит                                                                                                                                    | Первый релиз | Версия в NPM                                                                                                        | Загрузки в NPM                                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Апрель 2024  | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `lingui/js-lingui`    | [![GitHub Repo stars](https://img.shields.io/github/stars/lingui/js-lingui?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/lingui/js-lingui/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/lingui/js-lingui?style=for-the-badge&label=commits)](https://github.com/lingui/js-lingui/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/lingui/js-lingui?style=for-the-badge)](https://github.com/lingui/js-lingui/commits)       | Декабрь 2016 | [![npm](https://img.shields.io/npm/v/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) | [![npm downloads](https://img.shields.io/npm/dm/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) |

> Значки обновляются автоматически. Актуальные значения меняются со временем.

## Сопоставление функциональности

| Возможность                                      | Intlayer (`react-intlayer` / `next-intlayer`)                                              | Lingui (`@lingui/core` / `@lingui/react`)                                                    |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| **Переводы рядом с компонентами**                | ✅ Да, файл `.content.ts` хранится в одной папке с компонентом                             | ⚠️ Исходные строки внутри JSX через макросы; переводы в централизованных `.po` каталогах     |
| **Интеграция с TypeScript**                      | ✅ Строгая типизация автоматически генерируется из содержимого                             | ⚠️ Макросы типизированы; идентификаторы без типов, недостающие ключи не подсвечиваются       |
| **Поиск отсутствующих переводов**                | ✅ Ошибка TypeScript + предупреждение/ошибка во время сборки                               | ⚠️ `lingui extract` показывает статистику; в рантайме тихо откатывается на английский текст  |
| **Форматированный контент (JSX/Markdown/комп.)** | ✅ Прямая встроенная поддержка                                                             | ✅ Компонент `<Trans>` со вложенными элементами                                              |
| **Поддержка ICU**                                | ⚠️ В разработке                                                                            | ✅ Да (макросы `plural`, `select`, `selectOrdinal`)                                          |
| **Форматирование (даты, числа, валюты)**         | ✅ `useNumber`, `useDate`, ... (на базе нативного `Intl`)                                  | ✅ `i18n.date()`, `i18n.number()`                                                            |
| **Локализованный роутинг и middleware**          | ✅ Встроенный прокси/middleware, метод `getMultilingualUrls`                               | ❌ Отсутствует в базовом пакете                                                              |
| **Инструменты SEO (hreflang, sitemap...)**       | ✅ Встроенные хелперы                                                                      | ❌ Требуется ручная реализация                                                               |
| **Синхронные серверные компоненты (RSC)**        | ✅ `useIntlayer` из `next-intlayer/server` работает в любых дочерних серверных компонентах | ⚠️ Требуется экземпляр `I18n` на запрос, передаваемый вручную или через `setI18n`            |
| **Tree-shaking (поставка только нужного)**       | ✅ На уровне компонентов и языков, автоматически компилятором                              | ⚠️ По языкам через `lingui compile`; по маршрутам требует ручного разделения файлов каталога |
| **Ленивая загрузка (Lazy loading)**              | ✅ `importMode: 'dynamic'` (одна строка в конфигурационном файле)                          | ⚠️ Ручной вызов `import()` скомпилированных каталогов + `i18n.load()` / `i18n.activate()`    |
| **Очистка неиспользуемого контента**             | ✅ Устаревшие словари удаляются во время сборки                                            | ✅ `lingui extract --clean` удаляет неактуальные сообщения                                   |
| **Проверка отсутствующих строк (CLI / CI)**      | ✅ `npx intlayer content test`                                                             | ⚠️ Отчеты `lingui extract` (по умолчанию сборка не падает с ошибкой)                         |
| **Сборочный процесс**                            | ✅ Один плагин (`@intlayer/swc` / `@intlayer/babel` / `vite-intlayer`)                     | ⚠️ Плагин макросов (Babel или SWC) + раздельные шаги `extract` и `compile`                   |
| **Перевод с помощью искусственного интеллекта**  | ✅ Встроен, использует ваши собственные ключи API                                          | ❌ Нет                                                                                       |
| **Визуальный редактор / CMS**                    | ✅ Бесплатный Visual Editor + подключаемая CMS                                             | ❌ Нет (формат `.po` интегрируется со сторонними TMS)                                        |
| **Сервер MCP и Agent Skills**                    | ✅ Да                                                                                      | ❌ Нет                                                                                       |
| **Экосистема и сообщество**                      | ⚠️ Моложе, но стремительно развивается                                                     | ✅ Зрелое, независимое от конкретного фреймворка решение                                     |

## Сравнительное тестирование

### Что исследовалось

Пакет [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) собирает **абсолютно идентичное приложение** на каждой библиотеке: **10 страниц** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 локалей** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), одинаковая верстка и контент. Замеры проводились на страницах `en` и `fr`. Каждая библиотека исследовалась в четырех **стратегиях загрузки**:

| Стратегия          | Описание                                                                                 | Где применяется                      |
| ------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------ |
| **static**         | Каталоги всех языков импортируются и загружаются целиком на старте                       | Быстрые прототипы, код от нейросетей |
| **dynamic**        | Через `import()` подгружается каталог только активного языка, но для всего сайта сразу   | Подавляющее большинство проектов     |
| **scoped-static**  | По каталогу на каждый маршрут, все каталоги упакованы в общий стартовый бандл            | Встречается редко                    |
| **scoped-dynamic** | По каталогу на маршрут + динамический `import()`. Только активная страница и нужный язык | Проекты со строгим лимитом по весу   |

У Intlayer отсутствует вариант "scoped": компилятор изолирует контент **на уровне каждого компонента** автоматически, поэтому режимы `static` и `dynamic` изначально работают максимально изолированно.

В ходе каждого теста замеряются:

- **Lib size**: вес gzip пустого компонента, подключающего исключительно библиотеку i18n (базовый оверхед рантайма).
- **Page JS**: средний вес gzip JavaScript, загружаемого на страницу (усреднено по всем страницам и локалям).
- **Locale leak %**: доля переведенных строк в загруженном JS, относящихся к языкам, которые пользователь **не** просматривает.
- **Page leak %**: доля строк в загруженном JS, относящихся к страницам, на которых пользователь **не** находится.
- **Component avg**: средний вес gzip отдельного компонента при изолированной сборке.
- **E2E reactivity**: чистое время от момента выбора нового языка до фактического обновления атрибута `html[lang]` в DOM (Playwright, среднее по 5 прогонам).
- **Hydration**: время завершения фазы гидратации React.

> Значения зафиксированы в тестировании от **2026-09-12** на базе `@lingui/react` 6.6.0 и `intlayer` 9.5.1. Тестовое приложение намеренно сделано компактным (несколько десятков фраз на язык), поэтому утечки наглядно отражают **системную проблему**: по мере роста проекта они пропорционально увеличиваются.

### Результаты на Next.js

Выберите интересующие вас метрики и библиотеки:

<I18nBenchmark framework="nextjs" vertical/>

| Библиотека          | Стратегия      | Lib size (gz) | Page JS ср. (gz) | Утечка языка | Утечка страниц | Компонент ср. (gz) | E2E-реактивность | Гидратация |
| ------------------- | -------------- | ------------: | ---------------: | -----------: | -------------: | -----------------: | ---------------: | ---------: |
| **база** (без i18n) | -              |        0,0 КБ |         141,0 КБ |         0,0% |           0,0% |             0,9 КБ |          13,4 мс |    11,8 мс |
| Lingui              | static         |       11,9 КБ |         207,4 КБ |        50,0% |          90,0% |            73,3 КБ |          15,3 мс |    15,2 мс |
| Lingui              | dynamic        |       11,9 КБ |         145,4 КБ |         2,8% |          89,9% |            19,9 КБ |          15,7 мс |    12,7 мс |
| Lingui              | scoped-static  |       11,9 КБ |         148,2 КБ |         2,7% |          89,1% |            20,4 КБ |          15,1 мс |    13,1 мс |
| Lingui              | scoped-dynamic |       11,9 КБ |         148,6 КБ |        14,8% |           0,0% |           152,6 КБ |          16,1 мс |    14,8 мс |
| **`next-intlayer`** | static         |    **5,5 КБ** |     **141,3 КБ** |     **0,0%** |       **0,0%** |         **8,5 КБ** |      **15,5 мс** |    16,9 мс |
| **`next-intlayer`** | dynamic        |    **5,5 КБ** |     **141,3 КБ** |     **0,0%** |       **0,0%** |         **6,9 КБ** |      **15,3 мс** |    15,9 мс |

**Анализ данных**

- **Базовый вес рантайма.** Пустой компонент с Lingui весит 11,9 КБ gzip против 5,5 КБ с Intlayer. В масштабе страницы лучшая сборка Lingui оказывается на **+7,3 КБ** тяжелее Intlayer (148,6 против 141,3 КБ); Intlayer добавляет всего **+0,3 КБ** к весу приложения без интернационализации.
- **Простая сборка создает колоссальный оверхед.** Загрузка всех каталогов сразу дает **207,4 КБ на страницу** (+66 КБ к базовому весу). Половина строк относится к чужому языку, а 90% - к посторонним страницам сайта.
- **Динамическая загрузка исправляет язык, но не маршруты.** При наличии одного каталога на язык утечка страниц сохраняется на уровне ~90%: весь французский каталог отдается на каждой странице. Чтобы добиться 0% утечки страниц в Lingui, приходится настраивать `scoped-dynamic`: собирать отдельный каталог на каждый маршрут и вручную подключать его в страницы.
- **Утечка оригинального текста.** Даже в наиболее продуманных схемах **от 3% до 15% английских строк попадают на страницы на французском языке**. Макросы Lingui встраивают исходную строку для подстраховки в итоговый бандл. Intlayer разрешает фолбеки на этапе сборки и доставляет клиенту только целевой язык.
- **Взрывной рост размера компонентов в `scoped-dynamic`.** Каждый изолированный компонент весит в среднем **152,6 КБ**, поскольку через цепочку импортов в него попадают каталоги других маршрутов. Тот же компонент на `useIntlayer()` занимает всего **6,9 КБ**.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Полная таблица, каждая библиотека и стратегия в [отчете о бенчмарке Next.js](https://intlayer.org/ru/doc/benchmark/nextjs).

### Результаты на TanStack Start

<I18nBenchmark framework="tanstack" vertical/>

| Библиотека                   | Стратегия      | Lib size (gz) | Page JS ср. (gz) | Утечка языка | Утечка страниц | Компонент ср. (gz) | E2E-реактивность | Гидратация |
| ---------------------------- | -------------- | ------------: | ---------------: | -----------: | -------------: | -----------------: | ---------------: | ---------: |
| **база** (без i18n)          | -              |        0,0 КБ |         111,0 КБ |         0,0% |           0,0% |             0,7 КБ |           8,1 мс |    21,6 мс |
| Lingui                       | static         |       11,2 КБ |         152,2 КБ |        50,0% |          90,0% |            58,0 КБ |           3,9 мс |    19,9 мс |
| Lingui                       | dynamic        |       11,2 КБ |         115,2 КБ |         9,3% |           0,0% |            85,5 КБ |           5,9 мс |    28,0 мс |
| Lingui                       | scoped-static  |       11,2 КБ |         120,8 КБ |         4,0% |           0,0% |           147,9 КБ |           7,1 мс |    33,9 мс |
| Lingui                       | scoped-dynamic |       11,2 КБ |         120,2 КБ |         8,6% |           0,0% |            83,7 КБ |          42,1 мс |    32,9 мс |
| **`intlayer`**               | static         |    **5,0 КБ** |     **125,8 КБ** |        50,0% |       **0,0%** |         **8,1 КБ** |       **3,2 мс** |    11,5 мс |
| **`intlayer`**               | dynamic        |    **5,0 КБ** |     **118,6 КБ** |     **0,0%** |       **0,0%** |         **6,3 КБ** |       **3,6 мс** |    14,1 мс |
| `@intlayer/lingui` (адаптер) | dynamic        |       10,3 КБ |         137,0 КБ |         9,9% |           0,0% |            12,8 КБ |           2,9 мс |    19,7 мс |

**Анализ данных**

- **По объему JS на страницу Lingui незначительно выигрывает.** Вариант Lingui `dynamic` фиксирует **115,2 КБ**, что на 3,4 КБ меньше, чем 118,6 КБ у Intlayer. Скомпилированные каталоги Lingui с хешированными ключами очень компактны, а роутер TanStack Start отлично разделяет код маршрутов, поэтому утечка страниц исчезает уже на шаге `dynamic`.
- **Все остальные метрики на стороне Intlayer.** Гидратация с Lingui длится **28-34 мс** против **11-14 мс** с Intlayer: методы `i18n.load()` + `i18n.activate()` обязаны отработать на клиенте до старта гидратации React. Отдельные компоненты весят **58-148 КБ** вместо **6-8 КБ**. Утечка исходного языка не обнуляется никогда (составляя 4-9%).
- **Смена языка в оптимизированном режиме заметно замедлена.** Lingui в схеме `scoped-dynamic` тратит **42 мс** на смену `html[lang]`, поскольку браузер должен сначала запросить, получить и активировать новый каталог маршрута. Intlayer переключает язык за **3-4 мс** в обоих сценариях.
- **Строка `static` у Intlayer сразу обеспечивает 0% утечки страниц**, так как в бандл включаются исключительно словари, импортированные задействованными на странице компонентами. А параметр `importMode: 'dynamic'` устраняет и языковую утечку.
- **`@intlayer/lingui`** сохраняет синтаксис макросов Lingui, связывая их со словарями Intlayer. Это решение жертвует небольшим объемом на страницу (137 КБ из-за присутствия макро-рантайма), взамен давая облегченные компоненты (12,8 КБ) и быструю гидратацию. Прекрасный вариант для плавного перехода.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Полная таблица в [отчете о бенчмарке TanStack Start](https://intlayer.org/ru/doc/benchmark/tanstack).

## В чем фундаментальная причина? Два компилятора, две единицы деления

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Обе библиотеки компилируют код, но принципиально отличается **объект компиляции**.

**Lingui компилирует каталоги.** Макросы в коде извлекаются в единый файл `.po` на язык, а затем компилируются в модуль JS на язык. Главная единица деления - **локаль**. Чтобы разделить данные глубже (по маршрутам или компонентам), вам придется заводить отдельные каталоги, прописывать правила в `lingui.config.ts` и вручную настраивать их загрузку. Экземпляр `I18n` глобален, и каждый `useLingui()` подключает компонент ко всему его содержимому.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en
    │   │   ├── messages.po
    │   │   └── messages.mjs             # вывод lingui compile
    │   └── fr
    │       ├── messages.po
    │       └── messages.mjs
    ├── components
    │   └── Counter.tsx                  # const { t } = useLingui(); t`Increment`
    └── routes
        └── $locale
            └── about.tsx                # await import(`../locales/${locale}/messages.mjs`)
```

**Intlayer компилирует словари.** Каждый файл `.content.ts` - это изолированный словарь под определенным ключом; компилятор выясняет, какой компонент использует какой ключ, и формирует компактный JSON строго для этого компонента и языка. Главная единица деления - **компонент**. Привязка к маршрутам происходит автоматически: страница скачивает словари только тех компонентов, которые выводятся на экран.

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx                # useIntlayer("counter")
    │       └── index.content.ts
    └── routes
        └── $locale
            ├── about.tsx
            └── about.content.ts
```

Именно поэтому архитектура `scoped-dynamic` формируется в Intlayer автоматически на этапе сборки, тогда как в Lingui это требует масштабной ручной настройки. Разрыв увеличивается сразу по двум осям, страницы и локали:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

> Чтобы повторить показатели строки `dynamic`, активируйте `dictionary.importMode: 'dynamic'` в `intlayer.config.ts`. Подробнее в [документации по оптимизации бандла](https://intlayer.org/ru/doc/concept/bundle-optimization).

## Опыт разработки (Developer Experience)

### Настройка

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "en",
  locales: ["en", "fr"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
});
```

```ts fileName="src/i18n.ts"
import { setupI18n } from "@lingui/core";

export const loadCatalog = async (locale: string) => {
  const { messages } = await import(`./locales/${locale}/messages.mjs`);
  const i18n = setupI18n();
  i18n.load(locale, messages);
  i18n.activate(locale);
  return i18n;
};
```

Затем в сборщик добавляется плагин `@lingui/babel-plugin-lingui-macro` (или `@lingui/swc-plugin`), после правок выполняется `lingui extract`, перед сборкой - `lingui compile`, а приложение оборачивается в `<I18nProvider i18n={i18n}>`.

</Tab>
<Tab label="Intlayer" value="intlayer">

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

Добавьте плагин `intlayer()` в `vite.config.ts` (или `withIntlayer()` в `next.config.ts`) и оберните дерево компонентов в `<IntlayerProvider>`. Никаких ручных команд извлечения или сборки: словари компилируются автоматически бандлером.

</Tab>
</Tabs>
### Компоненты

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useLingui } from "@lingui/react/macro";
import { Trans } from "@lingui/react/macro";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{i18n.number(count)}</p>
      <button aria-label={t`Counter`} onClick={() => setCount((c) => c + 1)}>
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

Английский текст пишется прямо в компоненте; перевод на французский хранится в `src/locales/fr/messages.po` под сгенерированным хеш-идентификатором после выполнения `lingui extract`. Если забыть запустить команду извлечения или сборки, на экране незаметно останется английский текст.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/Counter/index.content.ts"
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

```tsx fileName="src/components/Counter/index.tsx"
import { useState } from "react";
import { useIntlayer } from "react-intlayer";
import { useNumber } from "react-intlayer/format";

export const Counter = () => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

Оба языка находятся в одном файле рядом с компонентом. Отсутствие перевода для `fr` приведет к ошибке сборщика, а опечатка в имени ключа будет немедленно подсвечена TypeScript.

</Tab>
</Tabs>
### Вне компонентов React

Метаданные, функции загрузки данных (loaders), серверные функции: в любом контексте без дерева React.

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```ts fileName="src/routes/$locale/about.tsx"
import { setupI18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";

const title = msg`About us`;

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { messages } = await import(
    `../../locales/${params.locale}/messages.mjs`
  );
  const i18n = setupI18n({
    locale: params.locale,
    messages: { [params.locale]: messages },
  });

  return { title: i18n._(title) };
};
```

Создание нового экземпляра `I18n` на каждый вызов, ручной импорт конкретного каталога и использование `msg` + `i18n._()` вместо привычного `t`. Как отмечается в [примечаниях к бенчмарку](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md), постоянный выбор между `t`, `` t` ` ``, `i18n.t()`, `msg` или `<Trans>` часто сбивает с толку.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/routes/$locale/about.tsx"
import { getIntlayer } from "intlayer";

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { title } = getIntlayer("about-metadata", params.locale);

  return { title };
};
```

</Tab>
</Tabs>

## Использование макросов Lingui со словарями Intlayer

`@intlayer/lingui` работает как прозрачный адаптер для `@lingui/core` и `@lingui/react`. Макросы компилируются в прежнем режиме; генерируемые вызовы `i18n._()` берут данные из словарей Intlayer, а плагины синхронизации сохраняют файлы `.po` в качестве источника данных. Формы множественного числа и условия ICU отображаются абсолютно идентично.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [lingui()],
});
```

Оставьте `@lingui/babel-plugin-lingui-macro` или `@lingui/swc-plugin` в конфигурации сборщика перед компилятором Intlayer. См. [документацию по совместимости с Lingui](https://intlayer.org/ru/doc/compatibility/lingui).

## Что выбрать для вашего проекта?

<AccordionGroup>
<Accordion header="Выбрать Lingui">

Вам нужен **ICU MessageFormat** с типизированными макросами, ваши переводчики работают в **`.po`** с существующим пайплайном TMS, вы предпочитаете исходные строки инлайн в JSX, и вашей команде удобно управлять извлечением, компиляцией и разделением каталогов. Его JS на страницу вполне конкурентоспособен после настройки lazy loading.

</Accordion>
<Accordion header="Выбрать Intlayer">

Вам нужен **контент с областью видимости на уровне компонентов**, **строгий TypeScript**, **ошибки отсутствующих ключей во время сборки**, **tree-shaking и lazy loading без усилий**, компактные компоненты, быстрая гидратация, мгновенное переключение локалей и встроенные инструменты редактирования ([Визуальный редактор](https://intlayer.org/ru/doc/concept/editor), [CMS](https://intlayer.org/ru/doc/concept/cms), [ИИ-перевод](https://intlayer.org/ru/doc/concept/auto-fill), [MCP-сервер](https://intlayer.org/ru/doc/mcp-server)). Особенно актуально для крупных модульных кодовых баз и дизайн-систем.

</Accordion>
<Accordion header="Выбрать @intlayer/lingui">

Вы уже используете Lingui и хотите постепенно перейти на словари Intlayer, не трогая макросы. Ваши каталоги `.po` остаются источником истины благодаря [плагину синхронизации PO](https://intlayer.org/ru/doc/compatibility/lingui). Измерено бок о бок в [Lingui vs @intlayer/lingui](https://intlayer.org/ru/blog/lingui-vs-intlayer-lingui).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Lingui тоже компилирует. Почему результат настолько разный?">

Потому что единица компиляции различается. Lingui компилирует **один каталог на локаль**: всё, что ниже этого (каталоги по маршрутам, lazy loading, исключение fallback из бандла), требует ручной конфигурации. Intlayer компилирует **один словарь на компонент**, поэтому разделение по маршрутам происходит автоматически во время сборки. Вот почему изолированно скомпилированный компонент Lingui весит 58-153 KB против 6-8 KB у Intlayer.

</Question>

<Question title="Почему утечка локалей никогда не достигает 0% с Lingui?">

Макросы сохраняют исходное сообщение доступным в рантайме в качестве фоллбэка, поэтому английская строка отправляется вместе с переводом. Бенчмарк фиксирует **3-15% строк `en` внутри страниц `fr`** в каждой оптимизированной конфигурации. Intlayer разрешает фоллбэки во время сборки и отправляет только активную локаль.

</Question>

<Question title="Действительно ли JavaScript на страницу у Lingui конкурентоспособен?">

Да, а на TanStack Start он даже чуть впереди: 115.2 KB в режиме `dynamic` против 118.6 KB у Intlayer. Скомпилированные каталоги с хэшированными ID компактны. Однако цена проявляется в других аспектах: гидратация за 28-34 мс против 11-14 мс и переключение локали за **42 мс** в конфигурации `scoped-dynamic`.

</Question>

<Question title="Нужно ли отказываться от макросов для миграции?">

Нет. `@intlayer/lingui` сохраняет компиляцию `` t`...` ``, `<Trans>`, `msg`, `plural`, `select` и `selectOrdinal` как раньше; меняется только то, относительно чего резолвит `i18n._()`. Сохраните `@lingui/babel-plugin-lingui-macro` или `@lingui/swc-plugin` в сборке. См. [документацию по совместимости с Lingui](https://intlayer.org/ru/doc/compatibility/lingui).

</Question>

<Question title="Что насчет этапов извлечения и компиляции?">

Они остаются для макросов и исчезают для собственного контента Intlayer. Словари `.content.ts` собираются при запуске бандлера без отдельного шага CLI, а [`intlayer test`](https://intlayer.org/ru/doc/concept/cli) прерывает CI при отсутствии ключа вместо тихого отката к исходной строке.

</Question>

</FAQ>

## Похожие сравнения

Тот же бенчмарк, другие библиотеки:

- [next-intl vs Intlayer](https://intlayer.org/ru/blog/next-intl-vs-intlayer)
- [i18next vs Intlayer](https://intlayer.org/ru/blog/i18next-vs-intlayer)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/ru/blog/vue-i18n-vs-intlayer-benchmark)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/ru/blog/next-i18next-vs-next-intl-vs-intlayer)
- [react-i18next vs react-intl vs Intlayer](https://intlayer.org/ru/blog/react-i18next-vs-react-intl-vs-intlayer)

Подробнее:

- [Lingui vs @intlayer/lingui](https://intlayer.org/ru/blog/lingui-vs-intlayer-lingui), адаптер измерен на том же приложении
- [Compiler-driven vs declarative i18n](https://intlayer.org/ru/blog/compiler-vs-declarative-i18n)
- [Per-component vs centralized i18n](https://intlayer.org/ru/blog/per-component-vs-centralized-i18n)
- [ICU message format explained](https://intlayer.org/ru/blog/icu-message-format)

Справочная документация:

- [Отчет о бенчмарке Next.js](https://intlayer.org/ru/doc/benchmark/nextjs) и [отчет о бенчмарке TanStack Start](https://intlayer.org/ru/doc/benchmark/tanstack)
- [Compat adapter: Lingui](https://intlayer.org/ru/doc/compatibility/lingui)
- [Оптимизация бандла](https://intlayer.org/ru/doc/concept/bundle-optimization) и [компилятор Intlayer](https://intlayer.org/ru/doc/compiler)

## Звезды на GitHub

Количество звезд на GitHub отражает интерес индустрии, уровень доверия сообщества и перспективность развития проекта. Это наглядно показывает, сколько разработчиков находят библиотеку полезной в реальной работе.

[![График динамики звезд](https://api.star-history.com/chart?repos=lingui%2Fjs-lingui%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#lingui/js-lingui&aymericzip/intlayer)

## Заключение

Lingui - сильнейшая гибридная библиотека в данном бенчмарке. Ее скомпилированные и хешированные каталоги дают размер JavaScript на страницу, практически равный показателям Intlayer, а на TanStack Start даже слегка превосходящий его. Если бы единственным критерием были килобайты на страницу, результатом стала бы боевая ничья.

Но это не единственный показатель. Компилятор Lingui ограничен границами локали; все, что лежит ниже (каталоги маршрутов, ленивая загрузка, очистка запасного текста), требует ручного труда разработчика. Бенчмарк демонстрирует цену этого ограничения: компоненты **в 10-20 раз тяжелее**, гидратация **в 2-3 раза медленнее**, **постоянная утечка 3-15% исходных текстов** и пауза в **42 мс** при переключении языка в оптимизированной сборке. Компилятор Intlayer работает на уровне каждого компонента, обеспечивая **6-8 КБ**, **11-14 мс**, **0%** и **3-4 мс** из коробки без лишней настройки.

Все первичные данные, тестовые приложения и скрипты опубликованы в [репозитории Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Вы можете повторить эти тесты самостоятельно.

Подробнее читайте в материале ['Почему Intlayer?'](https://intlayer.org/ru/doc/why).

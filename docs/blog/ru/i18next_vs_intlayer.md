---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "i18next против Intlayer: бенчмарк и сравнение 2026"
description: "react-i18next и next-i18next в сравнении с Intlayer на Next.js и TanStack Start. Размер bundle, утечки контента, скорость переключения локали и опыт разработчика."
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - Intlayer
  - Интернационализация
  - i18n
  - Бенчмарк
  - Размер bundle
  - Блог
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - i18next-vs-intlayer
author: aymericzip
---

# i18next против Intlayer | Бенчмарк интернационализации (i18n) для React и Next.js

![i18next VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`i18next` - самый распространенный i18n-фреймворк в экосистеме JavaScript. Через `react-i18next` и `next-i18next` он используется в огромном количестве приложений на React и Next.js. Intlayer представляет собой альтернативу на основе компилятора с изолированной областью видимости для каждого компонента.

В этой статье они сравниваются на основе реальных замеров, а не списков возможностей. Данные взяты из [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) - открытого набора тестов, собирающего одно и то же приложение на каждой библиотеке и фиксирующего то, что браузер фактически загружает по сети.

<TOC/>

> **tl;dr**: `i18next` оказался самым тяжелым runtime в бенчмарке: **+77 KB gzip на страницу** в Next.js при базовой конфигурации, **+22 KB** после полной оптимизации пространств имен и ленивой загрузки. Intlayer добавляет всего **+0.3 KB**. Каждая конфигурация `i18next`, кроме полностью изолированной (scoped), отдает **~90% строк с посторонних страниц**; Intlayer отдает **0%** по умолчанию. Переключение языка с динамической подгрузкой через бэкенд заняло **123-185 ms** в `react-i18next` против **3-4 ms** в Intlayer. Адаптер `@intlayer/next-i18next` сохраняет API `i18next` и продемонстрировал результат **150.7 KB** на страницу против **218.5 KB** в оригинале.

## Вкратце

- **i18next / react-i18next / next-i18next** - Зрелый, богатый плагинами, независимый от фреймворка инструмент. Пространства имен, детекторы языка, бэкенды, ICU через плагины, компонент `<Trans>` для сложной разметки. Контент хранится централизованно в `locales/{lng}/{ns}.json`. Мощный, однако каждая оптимизация (разделение пространств имен, постраничная загрузка, типобезопасность) требует ручной настройки и поддержки.
- **Intlayer** - Модель с упором на компоненты. Словари `.content.ts` располагаются рядом с компонентом, для которого предназначены. Компилятор во время сборки выполняет tree-shaking и загружает их лениво для каждого компонента и языка. Строгие типы TypeScript формируются автоматически, а пропущенные переводы вызывают ошибки сборки. Включает middleware, SEO-утилиты, визуальный редактор / CMS и перевод с помощью ИИ.

| Библиотека              | Звезды GitHub                                                                                                                                                                      | Всего коммитов                                                                                                                                                                         | Последний коммит                                                                                                                                        | Первая версия | Версия NPM                                                                                                            | Загрузки NPM                                                                                                                     |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer`   | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)     | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)     | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)     | Апрель 2024   | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           |
| `i18next/i18next`       | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)             | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)             | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)             | Январь 2012   | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             |
| `i18next/react-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/react-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/react-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/react-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/react-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/react-i18next?style=for-the-badge)](https://github.com/i18next/react-i18next/commits) | Декабрь 2015  | [![npm](https://img.shields.io/npm/v/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) | [![npm downloads](https://img.shields.io/npm/dm/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) |
| `i18next/next-i18next`  | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits)   | Ноябрь 2018   | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   |

> Значки обновляются автоматически. Показатели со временем меняются.

## Сравнение возможностей

| Возможность                                    | Intlayer (`react-intlayer` / `next-intlayer`)                                    | i18next (`react-i18next` / `next-i18next`)                                        |
| ---------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Переводы рядом с компонентами**              | ✅ Да, `.content.ts` располагается рядом с компонентом                           | ❌ Нет, централизованно в `locales/{lng}/{ns}.json`                               |
| **Интеграция с TypeScript**                    | ✅ Строгие типы создаются автоматически из контента                              | ⚠️ Базовая; требует расширения `CustomTypeOptions` и описания ресурсов            |
| **Поиск пропущенных переводов**                | ✅ Ошибка TypeScript + ошибка/предупреждение при сборке                          | ⚠️ Заглушка в runtime (`saveMissing`, возврат ключа)                              |
| **Сложный контент (JSX / Markdown)**           | ✅ Прямая поддержка                                                              | ⚠️ `<Trans>` с числовыми индексами                                                |
| **Поддержка ICU**                              | ⚠️ В разработке                                                                  | ⚠️ Через плагин (`i18next-icu`)                                                   |
| **Плюрализация**                               | ✅ Шаблоны на основе перечислений                                                | ✅ Суффиксы `_one` / `_other` (Intl.PluralRules)                                  |
| **Форматирование (даты, числа, валюты)**       | ✅ `useNumber`, `useDate`, ... (встроенный Intl)                                 | ⚠️ Форматировщики интерполяции или ручной вызов `Intl.*`                          |
| **Локализованная маршрутизация и middleware**  | ✅ Встроенный прокси/middleware, `getMultilingualUrls`                           | ⚠️ Не входит в ядро; сторонние библиотеки или собственный код                     |
| **SEO-утилиты (hreflang, sitemap, robots)**    | ✅ Встроенные помощники                                                          | ❌ Вручную                                                                        |
| **Синхронные серверные компоненты**            | ✅ `useIntlayer` из `next-intlayer/server` доступен в любом серверном компоненте | ⚠️ `getFixedT` на странице и проброс `t` через props                              |
| **Tree-shaking (только нужный контент)**       | ✅ Для каждого компонента и языка, автоматически компилятором                    | ⚠️ Вручную: namespaces + список `ns` на страницу + бэкенд                         |
| **Lazy loading**                               | ✅ `importMode: 'dynamic'` (одна строка конфигурации)                            | ✅ Через плагины бэкенда (`i18next-resources-to-backend`, `i18next-http-backend`) |
| **Очистка неиспользуемого контента**           | ✅ Лишние словари отсекаются на этапе сборки                                     | ❌ Не предусмотрено                                                               |
| **Проверка пропущенных строк (CLI / CI)**      | ✅ `npx intlayer content test`                                                   | ⚠️ `i18next-parser` / сторонние утилиты                                           |
| **Перевод с помощью ИИ**                       | ✅ Встроен, использует ваши собственные API-ключи                                | ❌ Нет (Locize - отдельный платный сервис)                                        |
| **Визуальный редактор / CMS**                  | ✅ Бесплатный Visual Editor + опциональная CMS                                   | ❌ Нет (Locize / внешние системы)                                                 |
| **Сервер MCP и навыки агентов (Agent Skills)** | ✅ Да                                                                            | ❌ Нет                                                                            |
| **Экосистема и сообщество**                    | ⚠️ Моложе, но быстро развивается                                                 | ✅ Самое масштабное и проверенное временем                                        |

## Бенчмарк

### Что измерялось

Набор тестов [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) собирает **одно и то же приложение** с каждой библиотекой: **10 страниц** (главная, о нас, блог, вакансии, контакты, FAQ, цены, продукты, настройки, команда), **10 языков** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), одинаковые компоненты и идентичный контент. Страницы замеряются на `en` и `fr`. Каждая библиотека тестируется в рамках четырех **стратегий загрузки**:

| Стратегия          | Описание                                                                                     | Где применяется                               |
| ------------------ | -------------------------------------------------------------------------------------------- | --------------------------------------------- |
| **static**         | Все языки и страницы упакованы вместе (`resources` встроены в `init()`)                      | Быстрые прототипы, код от ИИ                  |
| **dynamic**        | Только активный язык загружается через бэкенд, но все пространства имен сразу                | Большинство проектов                          |
| **scoped-static**  | Одно пространство имен на маршрут, все упакованы заранее                                     | Редко                                         |
| **scoped-dynamic** | Одно пространство имен на маршрут + ленивая загрузка бэкенда. Только текущая страница и язык | Проекты со строгим лимитом производительности |

У Intlayer нет варианта "scoped": компилятор изолирует контент **для каждого компонента** автоматически, поэтому строки `static` и `dynamic` уже оптимизированы.

Для каждой сборки замеряются:

- **Lib size**: gzip-размер пустого компонента, импортирующего только библиотеку i18n. Постоянный вес runtime.
- **Page JS**: средний объем JavaScript gzip, скачиваемый на страницу, по всем страницам и языкам.
- **Locale leak %**: доля переведенных строк в JS, относящихся к языку, который пользователь **не** просматривает.
- **Page leak %**: доля строк в JS, относящихся к страницам, на которых пользователь **не** находится.
- **Component avg**: средний размер gzip каждого компонента, скомпилированного изолированно.
- **E2E reactivity**: реальное время между выбором нового языка и обновлением `html[lang]` в DOM (Playwright, 5 итераций).
- **Hydration**: длительность этапа гидратации React.

> Приведенные данные получены в прогоне от **2026-09-12** с версиями `next-i18next` 16.3.0, `react-i18next` 17.0.13 и `intlayer` 9.5.1. Тестовое приложение намеренно компактно (несколько десятков строк на язык), поэтому проценты утечек отражают **тенденцию**: они увеличиваются с ростом контента, тогда как вес runtime остается неизменным.

### Результаты на Next.js (`next-i18next`)

Выберите интересующие вас метрики и библиотеки:

<I18nBenchmark framework="nextjs" vertical/>

| Библиотека                        | Стратегия      | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E-реактивность | Гидратация |
| --------------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | ---------------: | ---------: |
| **base** (без i18n)               | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |          13.4 ms |    11.8 ms |
| `next-i18next`                    | static         |       19.7 KB |         218.5 KB |        0.0% |     89.8% |            78.5 KB |          16.4 ms |    15.6 ms |
| `next-i18next`                    | dynamic        |       19.7 KB |         169.5 KB |       50.0% |     89.8% |            26.1 KB |          15.4 ms |    27.7 ms |
| `next-i18next`                    | scoped-static  |       19.7 KB |         220.1 KB |        0.0% |     89.8% |            78.9 KB |          16.4 ms |    14.7 ms |
| `next-i18next`                    | scoped-dynamic |       19.7 KB |         163.4 KB |        0.0% |      0.0% |            27.1 KB |          15.9 ms |    15.1 ms |
| **`next-intlayer`**               | static         |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **8.5 KB** |      **15.5 ms** |    16.9 ms |
| **`next-intlayer`**               | dynamic        |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **6.9 KB** |      **15.3 ms** |    15.9 ms |
| `@intlayer/next-i18next` (compat) | static         |        9.4 KB |         150.7 KB |        0.0% |      0.0% |             9.7 KB |          10.7 ms |    11.3 ms |
| `@intlayer/next-i18next` (compat) | dynamic        |        9.4 KB |         150.7 KB |        0.0% |      0.0% |             9.7 KB |          11.9 ms |    10.6 ms |

**Как читать результаты**

- **Вес runtime.** Ядро `i18next` вместе с `react-i18next` - самый объемный runtime в тесте: **19.7 KB gzip** для пустого компонента против 5.5 KB у `next-intlayer`.
- **Базовая конфигурация обходится дорого.** Встраивание `resources` в `init()` дает **218.5 KB на страницу**, что на +77.5 KB больше базового приложения. Каждая страница загружает все пространства имен.
- **Оптимизация требует значительных усилий.** Подключение бэкенда (`dynamic`) экономит 49 KB, но по-прежнему оставляет **90% утечки строк других страниц**, причем в этой конфигурации половина строк принадлежит не тому языку. Добавление разделения пространств имен по маршрутам (`scoped-dynamic`) позволяет достичь 0% утечки при весе **163.4 KB**, что все равно на **+22.4 KB на страницу** больше, чем у Intlayer (141.3 KB), не требовавшего никакой ручной настройки.
- **Размер компонентов.** Компонент с вызовом `useTranslation()` компилируется в 26-79 KB; тот же компонент с `useIntlayer()` весит 6.9 KB.
- **Гидратация** возрастает до 27.7 ms в варианте `dynamic`: экземпляр i18next инициализируется и запрашивает бэкенд на стороне клиента до того, как React завершит гидратацию.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Полная таблица, каждая библиотека и каждая стратегия, в [отчете о бенчмарке Next.js](https://intlayer.org/ru/doc/benchmark/nextjs).

### Результаты на TanStack Start (`react-i18next`)

То же приложение на TanStack Start со стандартным `react-i18next`, что исключает специфику Next.js из сравнения.

| Библиотека          | Стратегия      | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E-реактивность | Гидратация |
| ------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | ---------------: | ---------: |
| **base** (без i18n) | -              |        0.0 KB |         111.0 KB |        0.0% |      0.0% |             0.7 KB |           8.1 ms |    21.6 ms |
| `react-i18next`     | static         |       18.4 KB |         180.3 KB |       50.0% |     89.8% |            24.3 KB |          12.9 ms |    85.1 ms |
| `react-i18next`     | dynamic        |       18.4 KB |         136.4 KB |       23.1% |     89.8% |            24.8 KB |         123.1 ms |    32.9 ms |
| `react-i18next`     | scoped-static  |       18.4 KB |         184.2 KB |       50.7% |     89.8% |            25.3 KB |         185.1 ms |    25.2 ms |
| `react-i18next`     | scoped-dynamic |       18.4 KB |         127.2 KB |        0.0% |      0.0% |            26.7 KB |          17.6 ms |    11.3 ms |
| **`intlayer`**      | static         |    **5.0 KB** |     **125.8 KB** |       50.0% |  **0.0%** |         **8.1 KB** |       **3.2 ms** |    11.5 ms |
| **`intlayer`**      | dynamic        |    **5.0 KB** |     **118.6 KB** |    **0.0%** |  **0.0%** |         **6.3 KB** |       **3.6 ms** |    14.1 ms |

**Как читать результаты**

- Неоптимизированное приложение на `react-i18next` отдает на **+69 KB на страницу** больше базы, а гидратация занимает **85 ms** (в 4 раза дольше), поскольку дерево ресурсов полностью анализируется и регистрируется на клиенте до первичного рендера.
- **Смена языка подчеркивает задержку ленивой загрузки.** Если ресурсы загружаются по запросу, смена языка влечет сетевой запрос до обновления `html[lang]`: **123 ms** в `dynamic`, **185 ms** в `scoped-static`. Intlayer обновляет DOM за **3-4 ms** в обоих режимах: переключение выполняется мгновенно и не блокируется сетью.
- Полностью оптимизированный вариант `scoped-dynamic` достигает 0% утечки при весе 127.2 KB, что все еще на **+8.6 KB** больше строки `dynamic` у Intlayer, при этом потребовав маппинга маршрутов к пространствам имен, бэкенда ресурсов и оберток Suspense.
- Строка `static` у Intlayer уже дает **0% утечки страниц**, так как в сборку входят только словари, импортированные компонентами этой страницы. Включение `importMode: 'dynamic'` устраняет и утечку языков.
- **Размер компонентов**: 24-27 KB на компонент в `react-i18next` против 6-8 KB в Intlayer. `useTranslation()` связывает каждый компонент с глобальным экземпляром i18next.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Полная таблица в [отчете о бенчмарке TanStack Start](https://intlayer.org/ru/doc/benchmark/tanstack).

## Причина различий: глобальный экземпляр против скомпилированных словарей

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

`i18next` был создан в 2012 году как runtime: глобальный объект содержит хранилище ресурсов, плагины расширяют его возможности, а `t()` ищет ключи при рендере. Это обеспечивает гибкость (любой фреймворк, бэкенд и формат), но ведет к утяжелению:

```bash
.
├── i18n.ts                      # createInstance().use(...).use(...).init({...})
└── src
    ├── locales
    │   ├── en
    │   │   ├── common.json
    │   │   ├── home.json
    │   │   └── about.json
    │   └── fr
    │       ├── common.json
    │       ├── home.json
    │       └── about.json
    ├── components
    │   └── Counter.tsx          # useTranslation("about") + t("counter.label")
    └── app
        └── [locale]
            └── about
                └── page.tsx     # должна знать, что нужны ["common", "about"]
```

Экземпляр не может знать заранее, какие ключи понадобятся компоненту, поэтому держит в памяти все загруженные пространства имен. Оптимизация означает, что **вы** делите каталоги, **вы** перечисляете пространства имен для каждой страницы и **вы** вручную обновляете этот список при перемещении компонентов.

Издержки растут сразу по двум осям, страницам и локалям:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Как отмечено в [заметках бенчмарка](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md): "поддерживать типобезопасность и точно знать, какое пространство имен подключить к странице - это сущий кошмар".

Intlayer отказывается от глобального экземпляра. Контент объявляется рядом с компонентом, а компилятор строит граф зависимостей при сборке:

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx        # useIntlayer("counter")
    │       └── index.content.ts
    └── app
        └── [locale]
            └── about
                ├── page.tsx
                └── page.content.ts
```

`@intlayer/swc` / `@intlayer/babel` видит, какой компонент импортирует конкретный словарь, упаковывает только его, исключительно для активной локали, и удаляет неиспользуемое. Модель "scoped-dynamic" становится прямым следствием сборки, а не обременительным регламентом команды.

> Чтобы повторить показатели строки `dynamic`, укажите `dictionary.importMode: 'dynamic'` в `intlayer.config.ts`. Подробнее читайте в [документации по оптимизации bundle](https://intlayer.org/ru/doc/concept/bundle-optimization).

## Опыт разработчика

### Настройка

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export const initI18next = async (
  locale: string,
  namespaces: string[] = ["common"]
) => {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
};
```

Дополнительно требуется клиентский `I18nProvider`, воссоздающий экземпляр с теми же параметрами, `generateStaticParams` и список `namespaces` на каждой странице.

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

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import { IntlayerClientProvider, type NextLayoutIntlayer } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

</Tab>
</Tabs>

### Клиентский компонент

<Tabs defaultTab="intlayer" group="techno">
<Tab label="react-i18next" value="i18next">

```json fileName="src/locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/Counter.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Counter = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};
```

> Страница, отображающая этот компонент, обязана загрузить пространство имен `about`, а `t("counter.label")` будет обычной строкой без строгой типизации, если не дополнить интерфейс `CustomTypeOptions`.

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
"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { useNumber } from "next-intlayer/format";

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

`label` и `increment` строго типизированы: опечатка в имени вызовет ошибку TypeScript, а отсутствие французского текста остановит сборку.

</Tab>
</Tabs>

### Синхронный серверный компонент

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

export const ServerCounter = ({ t, locale, count }: ServerCounterProps) => (
  <div>
    <p>{new Intl.NumberFormat(locale).format(count)}</p>
    <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
  </div>
);
```

Страница вызывает `i18n.getFixedT(locale, "about")` и пробрасывает `t` и `locale` вниз через props.

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";
import { useNumber } from "next-intlayer/server/format";

export const ServerCounter = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

</Tab>
</Tabs>

## Сохраните API i18next, получите производительность Intlayer

Вам не нужно переписывать компоненты, чтобы получить показатели из бенчмарка выше. `@intlayer/i18next`, `@intlayer/react-i18next` и `@intlayer/next-i18next` являются готовыми адаптерами: `useTranslation`, `t()`, `<Trans>`, `{{interpolation}}`, формы множественного числа `_one` / `_other`, суффиксы контекста и `returnObjects` продолжают работать, получая данные из скомпилированных словарей Intlayer.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [reactI18nextVitePlugin()],
});
```

В бенчмарке адаптерная версия того же приложения Next.js уменьшилась с **218.5 KB до 150.7 KB** на страницу, с **78.5 KB до 9.7 KB** на компонент, утечка упала с **~90% до 0%**, а гидратация ускорилась с 15.6 ms до 11.3 ms при полностью неизменном коде компонентов. Ваши существующие файлы `locales/{lng}/{ns}.json` могут оставаться источником данных через плагин синхронизации JSON.

Смотрите руководства по миграции: [i18next](https://intlayer.org/ru/doc/migration/i18next), [react-i18next](https://intlayer.org/ru/doc/migration/react-i18next), [next-i18next](https://intlayer.org/ru/doc/migration/next-i18next).

## Что и когда выбирать?

<AccordionGroup>
<Accordion header="Выбрать i18next">

Если вам необходима его экосистема плагинов (детекторы, бэкенды, ICU, Locize), вы локализуете решения вне React (сервисы Node, чистый JS, другие фреймворки), у команды уже есть практический опыт или переводческая платформа ожидает формат `locales/{lng}/{ns}.json`. Заложите время на организацию пространств имен, настройку бэкенда и ручную поддержку карты маршрутов, если важна скорость.

</Accordion>
<Accordion header="Выбрать Intlayer">

Вам нужен **контент на уровне компонентов**, **строгий TypeScript**, **ошибки отсутствующих ключей во время сборки**, **tree-shaking и lazy loading без усилий**, мгновенное переключение языка, синхронные серверные компоненты и встроенные инструменты для редактирования ([Визуальный редактор](https://intlayer.org/ru/doc/concept/editor), [CMS](https://intlayer.org/ru/doc/concept/cms), [ИИ-перевод](https://intlayer.org/ru/doc/concept/auto-fill), [MCP-сервер](https://intlayer.org/ru/doc/mcp-server)). Особенно актуально для крупных модульных кодовых баз и дизайн-систем.

</Accordion>
<Accordion header="Выбрать адаптеры @intlayer/*-i18next">

Вы уже используете i18next и хотите получить преимущества в размере бандла и реактивности без переписывания компонентов. Ваши файлы `locales/{lng}/{ns}.json` остаются источником истины. Измерено бок о бок в [i18next против @intlayer/i18next](https://intlayer.org/ru/blog/i18next-vs-intlayer-i18next).

</Accordion>
</AccordionGroup>

## Часто задаваемые вопросы (FAQ)

<FAQ>

<Question title="Почему i18next намного тяжелее других библиотек?">

Он проектировался как агностичный к фреймворкам runtime: глобальный экземпляр, пайплайн плагинов, хранилище ресурсов, резолвер ключей. Эта гибкость компилируется в каждый бандл. Пустой компонент, импортирующий только библиотеку, весит **19.7 KB gzip** с `next-i18next` против **5.5 KB** с `next-intlayer`, и эта цена платится на каждой странице, независимо от объема контента.

</Question>

<Question title="Помогает ли ленивая загрузка с бэкендом?">

Она решает проблему байтов, но не задержки. Переход на `i18next-resources-to-backend` экономит ~49 KB на страницу, но добавляет сетевой запрос при переключении локали: **123 мс** в конфигурации `dynamic` и **185 мс** в `scoped-static` против **3-4 мс** у Intlayer. Гидратация также увеличивается до 27.7 мс, так как инстанс резолвит бэкенд до гидратации React.

</Question>

<Question title="Можно ли достичь 0% утечек с i18next?">

Да, с `scoped-dynamic`: один неймспейс на маршрут, бэкенд ресурсов и карта соответствия страниц неймспейсам, поддерживаемая вручную. Это дает 163.4 KB на страницу в Next.js, все еще на **+22 KB** больше, чем у Intlayer (141.3 KB), которому не требовалась ручная настройка. См. [оптимизацию бандла](https://intlayer.org/ru/doc/concept/bundle-optimization).

</Question>

<Question title="Нужно ли переписывать компоненты для миграции?">

Нет. `@intlayer/i18next`, `@intlayer/react-i18next` и `@intlayer/next-i18next` сохраняют `useTranslation`, `t()`, `<Trans>`, `{{interpolation}}`, формы множественного числа `_one` / `_other`, контекстные суффиксы и `returnObjects`. Всего одна строчка плагина в `next.config.ts` или `vite.config.ts`. Пошагово в [руководстве по миграции с next-i18next](https://intlayer.org/ru/doc/migration/next-i18next).

</Question>

<Question title="Что происходит с моими плагинами i18next?">

Бэкенды и детекторы языка принимаются, но остаются неактивными: в рантайме больше нечего загружать или определять. Определение языка становится конфигурацией маршрутизации Intlayer (префикс URL, cookie, заголовок). Если ваше приложение получает переводы из CMS во время запроса, используйте [Intlayer CMS](https://intlayer.org/ru/doc/concept/cms) или `intlayer pull` / `push`.

</Question>

</FAQ>

## Похожие сравнения

Тот же бенчмарк, другие библиотеки:

- [next-intl vs Intlayer](https://intlayer.org/ru/blog/next-intl-vs-intlayer)
- [Lingui vs Intlayer](https://intlayer.org/ru/blog/lingui-vs-intlayer)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/ru/blog/vue-i18n-vs-intlayer-benchmark)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/ru/blog/next-i18next-vs-next-intl-vs-intlayer)
- [react-i18next vs react-intl vs Intlayer](https://intlayer.org/ru/blog/react-i18next-vs-react-intl-vs-intlayer)

Подробнее об i18next:

- [i18next против @intlayer/i18next](https://intlayer.org/ru/blog/i18next-vs-intlayer-i18next), адаптеры измерены на одном приложении
- [Устарел ли i18next?](https://intlayer.org/ru/blog/is-i18next-outdated)
- [Использование Intlayer с i18next](https://intlayer.org/ru/blog/intlayer-with-i18next) и [с react-i18next](https://intlayer.org/ru/blog/intlayer-with-react-i18next)
- [Как интернационализировать приложение Next.js с помощью next-i18next](https://intlayer.org/ru/blog/nextjs-internationalization-using-next-i18next)

Справочная документация:

- [Отчет о бенчмарке Next.js](https://intlayer.org/ru/doc/benchmark/nextjs) и [отчет о бенчмарке TanStack Start](https://intlayer.org/ru/doc/benchmark/tanstack)
- Адаптеры совместимости: [i18next](https://intlayer.org/ru/doc/compatibility/i18next), [react-i18next](https://intlayer.org/ru/doc/compatibility/react-i18next), [next-i18next](https://intlayer.org/ru/doc/compatibility/next-i18next)
- Руководства по миграции: [i18next](https://intlayer.org/ru/doc/migration/i18next), [react-i18next](https://intlayer.org/ru/doc/migration/react-i18next), [next-i18next](https://intlayer.org/ru/doc/migration/next-i18next)
- [Оптимизация бандла](https://intlayer.org/ru/doc/concept/bundle-optimization) и [компилятор Intlayer](https://intlayer.org/ru/doc/compiler)
- [Компонентная i18n против централизованной](https://intlayer.org/ru/blog/per-component-vs-centralized-i18n)
- [Компиляторная i18n против декларативной](https://intlayer.org/ru/blog/compiler-vs-declarative-i18n)

## Звезды на GitHub

Звезды на GitHub наглядно демонстрируют популярность проекта, доверие разработчиков и перспективы его развития. Хотя они не являются прямой оценкой качества кода, они показывают заинтересованность сообщества и готовность к внедрению.

[![График динамики звезд](https://api.star-history.com/chart?repos=i18next%2Fi18next%2Ci18next%2Freact-i18next%2Ci18next%2Fnext-i18next%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#i18next/i18next&i18next/react-i18next&i18next/next-i18next&aymericzip/intlayer)

## Заключение

`i18next` по праву занял лидирующие позиции: он поддерживается на любых платформах, располагает плагинами под любые сценарии и развивается более десяти лет. Бенчмарк наглядно раскрывает цену архитектуры, завязанной на runtime. Типичная сборка большинства команд добавляет **+70-77 KB gzip на страницу**, передает **~90% контента с других страниц**, а смена языка с ленивой загрузкой занимает **свыше 100 ms**. Добиться 0% утечки возможно, однако это требует бэкенда, ручной разбивки на namespaces по маршрутам, и все равно оставляет вес на **+9-22 KB** больше, чем у Intlayer.

Intlayer переносит всю эту нагрузку на компилятор. Словари для компонентов, ленивая подгрузка по языкам и удаление неиспользуемых текстов являются прямым результатом сборки. На том же приложении: **+0.3 KB на страницу**, **0% утечек**, компоненты **в 3-10 раз меньше**, а язык переключается за **3-4 ms**.

Все исходные замеры, тестовые приложения и скрипты опубликованы в [репозитории Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Запустите их и убедитесь сами.

Подробности смотрите в материале ['Почему Intlayer?'](https://intlayer.org/ru/doc/why).

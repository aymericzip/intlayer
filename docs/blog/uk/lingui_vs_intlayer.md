---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "Lingui проти Intlayer: Бенчмарк та порівняння 2026"
description: "Дві бібліотеки i18n на основі компілятора протестовані на Next.js та TanStack Start. Розмір бандла, витік контенту, розмір компонентів, гідратація, реактивність перемикання локалей та досвід розробника."
keywords:
  - Lingui
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Compiler
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - lingui-vs-intlayer
author: aymericzip
---

# Lingui проти Intlayer | Бенчмарк інтернаціоналізації (i18n) у React та Next.js

![JavaScript i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

Lingui та Intlayer - це дві бібліотеки в цьому бенчмарку, які покладаються на **компілятор**, а не на чистий runtime. Lingui витягує повідомлення з макросів під час збирання та компілює каталоги для кожної локалі. Intlayer компілює словники для кожного компонента та виконує tree-shaking для кожної локалі. У теорії вони мають бути близькими. Числа показують, де вони розходяться.

Дані отримані з [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), відкритого набору тестів, який створює однаковий додаток з кожною бібліотекою та фіксує, що браузер насправді завантажує та виконує.

<TOC/>

> **Коротко (tl;dr)**: Lingui найближче підходить до Intlayer за обсягом чистого JavaScript на сторінку: **115-120 КБ** проти **118.6 КБ** на TanStack Start після налаштування лінивого завантаження (lazy loading), **148.6 КБ** проти **141.3 КБ** на Next.js. Розрив виникає в інших показниках: компонент Lingui, скомпільований ізольовано, важить **58-153 КБ** проти **6-8 КБ** у Intlayer, гідратація займає **28-34 мс** проти **11-14 мс**, резервна локаль джерела витікає на **3-15%** рядків `en` на сторінках `fr` у кожній оптимізованій конфігурації, а досягнення цієї оптимізованої конфігурації вимагає ручного вилучення, компіляції та вибору каталогів для кожного маршруту. Intlayer досягає цього без будь-яких налаштувань.

## Короткий огляд

- **Lingui** - На основі макросів (`` t`...` ``, `<Trans>`, `msg`), ICU MessageFormat, каталоги `.po` / JSON, робочий процес `lingui extract` + `lingui compile`. Компілює ідентифікатори повідомлень у короткі хеші, підтримує динамічне завантаження каталогів для кожної локалі. Добре зарекомендований, незалежний від фреймворків, багата екосистема інструментів для перекладачів навколо `.po`.
- **Intlayer** - Модель контенту, орієнтована на компоненти. Словники `.content.ts` розташовані поруч із компонентом, який вони обслуговують, компілятор часу збирання виконує tree-shaking та ліниве завантаження для кожного компонента та локалі, суворі типи TypeScript генеруються автоматично з вашого контенту, а відсутні переклади призводять до помилки збирання. Включає middleware, помічники SEO, Візуальний редактор / CMS та переклад за допомогою штучного інтелекту.

| Бібліотека            | Зірки GitHub                                                                                                                                                                   | Всього комітів                                                                                                                                                                     | Останній коміт                                                                                                                                      | Перша версія | Версія NPM                                                                                                          | Завантаження NPM                                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Квітень 2024 | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `lingui/js-lingui`    | [![GitHub Repo stars](https://img.shields.io/github/stars/lingui/js-lingui?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/lingui/js-lingui/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/lingui/js-lingui?style=for-the-badge&label=commits)](https://github.com/lingui/js-lingui/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/lingui/js-lingui?style=for-the-badge)](https://github.com/lingui/js-lingui/commits)       | Грудень 2016 | [![npm](https://img.shields.io/npm/v/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) | [![npm downloads](https://img.shields.io/npm/dm/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) |

> Значки оновлюються автоматично. Показники змінюються з часом.

## Порівняння функціональності

| Функція                                             | Intlayer (`react-intlayer` / `next-intlayer`)                                       | Lingui (`@lingui/core` / `@lingui/react`)                                                       |
| --------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Переклади поруч із компонентами**                 | ✅ Так, `.content.ts` розташований поруч із кожним компонентом                      | ⚠️ Вихідні рядки всередині JSX через макроси; переклади у централізованих каталогах `.po`       |
| **Інтеграція з TypeScript**                         | ✅ Суворі типи генеруються автоматично з контенту                                   | ⚠️ Макроси типізовані; ідентифікатори повідомлень ні, відсутні записи в каталозі не виявляються |
| **Виявлення відсутніх перекладів**                  | ✅ Помилка TypeScript + помилка/попередження під час збирання                       | ⚠️ `lingui extract` показує статистику; під час виконання повертається вихідний рядок           |
| **Багатий контент (JSX / Markdown / компоненти)**   | ✅ Пряма підтримка                                                                  | ✅ `<Trans>` із вкладеними компонентами                                                         |
| **Підтримка ICU**                                   | ⚠️ У розробці                                                                       | ✅ Так (макроси `plural`, `select`, `selectOrdinal`)                                            |
| **Форматування (дати, числа, валюти)**              | ✅ `useNumber`, `useDate`, ... (Intl під капотом)                                   | ✅ `i18n.date()`, `i18n.number()`                                                               |
| **Локалізована маршрутизація та middleware**        | ✅ Вбудований проксі/middleware, `getMultilingualUrls`                              | ❌ Не є частиною ядра                                                                           |
| **SEO-помічники (hreflang, sitemap, robots)**       | ✅ Вбудовані інструменти                                                            | ❌ Вручну                                                                                       |
| **Синхронні серверні компоненти**                   | ✅ `useIntlayer` з `next-intlayer/server` працює у будь-якому дочірньому компоненті | ⚠️ Потрібен екземпляр `I18n` для кожного запиту, який передається або задається через `setI18n` |
| **Tree-shaking (відправка лише потрібного вмісту)** | ✅ Для кожного компонента та локалі, автоматизовано компілятором                    | ⚠️ Для кожної локалі через `lingui compile`; для кожного маршруту потрібен ручний поділ         |
| **Ліниве завантаження (Lazy loading)**              | ✅ `importMode: 'dynamic'` (один рядок конфігурації)                                | ⚠️ Ручний `import()` скомпільованих каталогів + `i18n.load()` / `i18n.activate()`               |
| **Очищення невикористаного контенту**               | ✅ Невикористані словники видаляються під час збирання                              | ✅ `lingui extract --clean` видаляє застарілі повідомлення                                      |
| **Тестування відсутніх перекладів (CLI / CI)**      | ✅ `npx intlayer content test`                                                      | ⚠️ Статистика `lingui extract` (за замовчуванням немає коду помилки завершення)                 |
| **Конвеєр збирання (Build pipeline)**               | ✅ Один плагін (`@intlayer/swc` / `@intlayer/babel` / `vite-intlayer`)              | ⚠️ Плагін макросів (Babel або SWC) + кроки `extract` + `compile`                                |
| **Переклад за допомогою ШІ**                        | ✅ Вбудовано, використовує ваші власні ключі постачальників                         | ❌ Немає                                                                                        |
| **Візуальний редактор / CMS**                       | ✅ Безкоштовний Візуальний редактор + додаткова CMS                                 | ❌ Немає (`.po` працює із зовнішніми системами TMS)                                             |
| **Сервер MCP та навички агентів (Agent Skills)**    | ✅ Так                                                                              | ❌ Немає                                                                                        |
| **Екосистема / спільнота**                          | ⚠️ Менша, але стрімко зростає                                                       | ✅ Добре зарекомендована, універсальна                                                          |

## Бенчмарк

### Що вимірювалося

Набір тестів [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) збирає **однаковий додаток** для кожної бібліотеки: **10 сторінок** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 локалей** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), однакові компоненти та ідентичний вміст. Сторінки вимірюються мовами `en` та `fr`. Кожна бібліотека реалізована у чотирьох **стратегіях завантаження**, від найпростішої конфігурації до оптимальної:

| Стратегія          | Опис                                                                                       | Хто це використовує                       |
| ------------------ | ------------------------------------------------------------------------------------------ | ----------------------------------------- |
| **static**         | Скомпільований каталог кожної локалі імпортується та завантажується заздалегідь            | Швидкі прототипи, код, згенерований ШІ    |
| **dynamic**        | Тільки каталог активної локалі імпортується через `import()`, але він містить усі сторінки | Більшість проєктів                        |
| **scoped-static**  | Один каталог на маршрут, усі запаковані заздалегідь                                        | Рідко                                     |
| **scoped-dynamic** | Один каталог на маршрут + лінивий `import()`. Тільки поточна сторінка та локаль            | Додатки з суворим бюджетом продуктивності |

Intlayer не має варіанта "scoped": компілятор автоматично обмежує контекст контенту **для кожного компонента**, тому його рядки `static` і `dynamic` вже оптимізовані за маршрутами.

Для кожного збирання тестовий набір фіксує:

- **Розмір бібліотеки (Lib size)**: розмір gzip порожнього компонента, який імпортує лише бібліотеку i18n. Постійні витрати runtime.
- **JS сторінки (Page JS)**: стиснутий gzip JavaScript, що завантажується на сторінку, усереднений для всіх сторінок і локалей.
- **% витоку локалі (Locale leak %)**: частка перекладених рядків у завантаженому JS, які належать локалі, яку користувач **не** переглядає (протестовано на `en` і `fr`, тому 50% означає повну присутність іншої вимірюваної мови; при 10 запакованих локалях реальні зайві витрати набагато більші).
- **% витоку сторінки (Page leak %)**: частка перекладених рядків у завантаженому JS, які належать сторінці, на якій користувач **не** перебуває.
- **Середній розмір компонента (Component avg)**: середній розмір gzip кожного компонента, скомпільованого окремо. Показує, скільки runtime та каталогів тягне за собою один компонент.
- **Реактивність E2E**: час між вибором нової локалі та оновленням `html[lang]` у DOM (Playwright, 5 ітерацій).
- **Гідратація**: тривалість фази гідратації React.

> Наведені нижче дані отримані під час тестування від **2026-09-12** з `@lingui/react` 6.6.0 та `intlayer` 9.5.1. Тестовий додаток навмисно невеликий (кілька десятків рядків на локаль), тому відсотки витоку описують **закономірність**: вони збільшуються разом зі зростанням вашого контенту, тоді як витрати runtime залишаються фіксованими.

### Результати на Next.js

Виберіть метрики та бібліотеки, які вас цікавлять:

<I18nBenchmark framework="nextjs" vertical/>

| Бібліотека          | Стратегія      | Розмір Lib (gz) | Сер. JS сторінки (gz) | Витік локалі | Витік сторінки | Сер. компонента (gz) | Реактивність E2E | Гідратація |
| ------------------- | -------------- | --------------: | --------------------: | -----------: | -------------: | -------------------: | ---------------: | ---------: |
| **base** (без i18n) | -              |          0.0 KB |              141.0 KB |         0.0% |           0.0% |               0.9 KB |          13.4 ms |    11.8 ms |
| Lingui              | static         |         11.9 KB |              207.4 KB |        50.0% |          90.0% |              73.3 KB |          15.3 ms |    15.2 ms |
| Lingui              | dynamic        |         11.9 KB |              145.4 KB |         2.8% |          89.9% |              19.9 KB |          15.7 ms |    12.7 ms |
| Lingui              | scoped-static  |         11.9 KB |              148.2 KB |         2.7% |          89.1% |              20.4 KB |          15.1 ms |    13.1 ms |
| Lingui              | scoped-dynamic |         11.9 KB |              148.6 KB |        14.8% |           0.0% |             152.6 KB |          16.1 ms |    14.8 ms |
| **`next-intlayer`** | static         |      **5.5 KB** |          **141.3 KB** |     **0.0%** |       **0.0%** |           **8.5 KB** |      **15.5 ms** |    16.9 ms |
| **`next-intlayer`** | dynamic        |      **5.5 KB** |          **141.3 KB** |     **0.0%** |       **0.0%** |           **6.9 KB** |      **15.3 ms** |    15.9 ms |

**Як інтерпретувати результати**

- **Витрати runtime.** Порожній компонент важить 11.9 КБ gzip з Lingui і 5.5 КБ з Intlayer. На повній сторінці найкраща конфігурація Lingui дає **+7.3 КБ** у порівнянні з Intlayer (148.6 проти 141.3 КБ); Intlayer додає лише **+0.3 КБ** до базового додатка без i18n.
- **Проста конфігурація коштує дорого.** Попереднє завантаження всіх скомпільованих каталогів дає **207.4 КБ на сторінку**, що на +66 КБ більше за базовий додаток. Половина виявлених рядків належить до іншої локалі, а 90% - до інших сторінок.
- **Динамічне завантаження вирішує проблему локалі, але не сторінки.** З одним каталогом на локаль витік сторінки залишається на рівні ~90%: весь каталог `fr` завантажується на кожній французькій сторінці. Щоб досягти 0% витоку сторінки, потрібна конфігурація `scoped-dynamic`: окремий каталог для кожного маршруту, який створюється та підключається вручну.
- **Витік резервної мови (fallback).** Навіть в оптимізованих конфігураціях **3-15% рядків `en` потрапляють на сторінки `fr`**. Макроси Lingui зберігають початкове повідомлення як fallback, через що воно потрапляє у бандл поруч із перекладом. Intlayer розв'язує резервні переклади під час збирання та надсилає виключно активну мову.
- **Розмір компонента різко зростає у `scoped-dynamic`.** Кожен компонент, скомпільований окремо, важить у середньому **152.6 КБ**, оскільки каталог кожного маршруту стає доступним із компонента, який його імпортує. Той самий компонент з `useIntlayer()` важить у середньому **6.9 КБ**.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Повна таблиця, кожна бібліотека та стратегія у [звіті про бенчмарк Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/nextjs.md).

### Результати на TanStack Start

| Бібліотека                   | Стратегія      | Розмір Lib (gz) | Сер. JS сторінки (gz) | Витік локалі | Витік сторінки | Сер. компонента (gz) | Реактивність E2E | Гідратація |
| ---------------------------- | -------------- | --------------: | --------------------: | -----------: | -------------: | -------------------: | ---------------: | ---------: |
| **base** (без i18n)          | -              |          0.0 KB |              111.0 KB |         0.0% |           0.0% |               0.7 KB |           8.1 ms |    21.6 ms |
| Lingui                       | static         |         11.2 KB |              152.2 KB |        50.0% |          90.0% |              58.0 KB |           3.9 ms |    19.9 ms |
| Lingui                       | dynamic        |         11.2 KB |              115.2 KB |         9.3% |           0.0% |              85.5 KB |           5.9 ms |    28.0 ms |
| Lingui                       | scoped-static  |         11.2 KB |              120.8 KB |         4.0% |           0.0% |             147.9 KB |           7.1 ms |    33.9 ms |
| Lingui                       | scoped-dynamic |         11.2 KB |              120.2 KB |         8.6% |           0.0% |              83.7 KB |          42.1 ms |    32.9 ms |
| **`intlayer`**               | static         |      **5.0 KB** |          **125.8 KB** |        50.0% |       **0.0%** |           **8.1 KB** |       **3.2 ms** |    11.5 ms |
| **`intlayer`**               | dynamic        |      **5.0 KB** |          **118.6 KB** |     **0.0%** |       **0.0%** |           **6.3 KB** |       **3.6 ms** |    14.1 ms |
| `@intlayer/lingui` (сумісн.) | dynamic        |         10.3 KB |              137.0 KB |         9.9% |           0.0% |              12.8 KB |           2.9 ms |    19.7 ms |

**Як інтерпретувати результати**

- **За обсягом JavaScript на сторінку Lingui перемагає з мінімальним відривом.** `dynamic` Lingui досягає **115.2 КБ**, що на 3.4 КБ менше за Intlayer (118.6 КБ). Скомпільовані каталоги Lingui з хешованими ідентифікаторами дуже компактні, а маршрутизатор TanStack Start настільки добре ділить код, що витік сторінки становить 0% уже в рядку `dynamic`.
- **Усі інші показники свідчать на користь Intlayer.** Гідратація займає **28-34 мс** у Lingui проти **11-14 мс** у Intlayer: `i18n.load()` + `i18n.activate()` запускаються на клієнті до того, як React зможе завершити гідратацію. Компоненти, скомпільовані ізольовано, важать **58-148 КБ** проти **6-8 КБ**. Витік локалі ніколи не опускається до 0% (становить 4-9%) через наявність рядків вихідної мови.
- **Перемикання локалі в оптимізованій конфігурації відбувається повільно.** `scoped-dynamic` Lingui потребує **42 мс** для оновлення `html[lang]`: каталог нового маршруту необхідно завантажити та активувати до того, як зміна стане помітною. Intlayer перемикається за **3-4 мс** в обох режимах.
- **Рядок `static` в Intlayer вже має 0% витоку сторінки**, оскільки до бандла потрапляють лише словники, імпортовані компонентами поточної сторінки. Один рядок конфігурації (`importMode: 'dynamic'`) повністю прибирає і витік локалі.
- **`@intlayer/lingui`** зберігає синтаксис макросів Lingui та обслуговує їх зі словників Intlayer. Це дещо збільшує розмір сторінки (137 КБ через наявність runtime макросів) заради зменшення розміру компонентів (12.8 КБ) та швидшої гідратації, ніж у нативному Lingui. Це чудовий крок для поступової міграції.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Повна таблиця у [звіті про бенчмарк TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md).

## Чому виникає ця різниця? Два компілятори, дві одиниці роботи

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Обидві бібліотеки виконують компіляцію. Різниця полягає в тому, **що** саме вони компілюють.

**Lingui компілює каталоги.** Макроси у вашому вихідному коді вилучаються у файл `.po` для кожної локалі, а потім компілюються в модуль JS для кожної локалі. Одиницею роботи є **локаль**. Подальший поділ за маршрутами чи компонентами означає створення багатьох каталогів, налаштування `lingui.config.ts` та ручне підключення потрібного каталогу на кожному маршруті. Екземпляр `I18n` є глобальним; кожен виклик `useLingui()` підписує компонент на нього.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en
    │   │   ├── messages.po
    │   │   └── messages.mjs             # вихідний результат lingui compile
    │   └── fr
    │       ├── messages.po
    │       └── messages.mjs
    ├── components
    │   └── Counter.tsx                  # const { t } = useLingui(); t`Increment`
    └── routes
        └── $locale
            └── about.tsx                # await import(`../locales/${locale}/messages.mjs`)
```

**Intlayer компілює словники.** Кожен файл `.content.ts` - це словник, прив'язаний до певного ключа; компілятор визначає, який компонент імпортує цей ключ, і генерує для кожного словника та локалі саме той фрагмент JSON, який потрібен цьому компоненту. Одиницею роботи є **компонент**. Прив'язка до маршруту є природним наслідком: сторінка підтягує лише словники тих компонентів, які вона реально рендерить.

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

Ось чому патерн `scoped-dynamic` є автоматичним результатом збирання для Intlayer і складним ручним конфігураційним проєктом для Lingui. Розрив збільшується за двома осями одночасно, сторінками та мовами:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

> Щоб отримати показники рядка `dynamic`, встановіть `dictionary.importMode: 'dynamic'` у `intlayer.config.ts`. Дивіться [документацію з оптимізації бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md).

## Досвід розробника

### Налаштування

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

Потім додайте `@lingui/babel-plugin-lingui-macro` (або `@lingui/swc-plugin`) до бандлера, запускайте `lingui extract` після редагування коду, `lingui compile` перед збиранням і оберніть дерево компонентів у `<I18nProvider i18n={i18n}>`.

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

Додайте `intlayer()` до `vite.config.ts` (або `withIntlayer()` до `next.config.ts`) та оберніть дерево в `<IntlayerProvider>`. Жодних кроків extract чи compile: словники створюються автоматично під час роботи бандлера.

</Tab>
</Tabs>
### Компонент

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

Англійський текст міститься безпосередньо в компоненті; французький зберігається у файлі `src/locales/fr/messages.po` під хешованим ідентифікатором після запуску `lingui extract`. Якщо забути виконати цю команду або `compile`, застосунок непомітно повернеться до англійського тексту.

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

Обидві локалі зберігаються в одному файлі поруч із компонентом. Відсутнє значення `fr` спричиняє помилку під час збирання, а невірний ключ призводить до помилки TypeScript.

</Tab>
</Tabs>
### За межами компонентів

Метадані, завантажувачі (loaders), серверні функції: будь-яке місце без дерева React.

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

Створення нового екземпляра `I18n` для кожного виклику, завантаження потрібного каталогу вручну та використання `msg` + `i18n._()` замість `t`. Як зазначено в [примітках до бенчмарку](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md), розуміння того, коли саме використовувати `t`, `` t` ` ``, `i18n.t()`, `msg` або `<Trans>`, часто не є інтуїтивним.

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

## Збережіть макроси Lingui, отримайте словники Intlayer

`@intlayer/lingui` - це сумісний адаптер для `@lingui/core` та `@lingui/react`. Макроси продовжують компілюватися як і раніше; виклики `i18n._()`, у які вони перетворюються, обслуговуються зі словників Intlayer, а плагіни синхронізації `.po` зберігають ваші чинні каталоги як єдине джерело правди. Форми множини та селектори ICU відображаються повністю ідентично.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [lingui()],
});
```

Збережіть плагін `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` у процесі збирання перед компілятором Intlayer. Дивіться [документацію щодо сумісності з Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/lingui.md).

## Що і коли обрати?

<AccordionGroup>
<Accordion header="Обрати Lingui">

Вам потрібен **ICU MessageFormat** із типізованими макросами, ваші перекладачі працюють у **`.po`** з існуючим конвеєром TMS, ви віддаєте перевагу вихідним рядкам інлайн у JSX, а вашій команді зручно самостійно керувати вилученням, компіляцією та розділенням каталогів. Його JS на сторінку цілком конкурентний після налаштування lazy loading.

</Accordion>
<Accordion header="Обрати Intlayer">

Вам потрібен **контент з областю видимості на рівні компонентів**, **суворий TypeScript**, **помилки відсутніх ключів під час збирання**, **tree-shaking та lazy loading без зайвих зусиль**, компактні компоненти, швидка гідратація, миттєве перемикання мов і вбудовані інструменти редагування ([Візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md), [переклад через ШІ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/autoFill.md), [сервер MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)). Особливо актуально для великих модульних кодових баз і дизайн-систем.

</Accordion>
<Accordion header="Обрати @intlayer/lingui">

Ви вже використовуєте Lingui і хочете поступово перейти на словники Intlayer, не змінюючи макроси. Ваші каталоги `.po` залишаються джерелом правди завдяки [плагіну синхронізації PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/lingui.md). Виміряно поруч у [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/lingui_vs_intlayer-lingui.md).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Lingui також компілює. Чому результат настільки відрізняється?">

Тому що одиниця компіляції відрізняється. Lingui компілює **один каталог на мову**: все інше (каталоги на маршрут, lazy loading, виключення резервного варіанту з бандла) вимагає налаштування. Intlayer компілює **один словник на компонент**, тому ізоляція за маршрутами виникає автоматично під час збирання. Ось чому окремо скомпільований компонент Lingui важить 58-153 KB проти 6-8 KB в Intlayer.

</Question>

<Question title="Чому витік локалей ніколи не досягає 0% з Lingui?">

Макроси зберігають вихідне повідомлення доступним у рантаймі як резервний варіант (fallback), тому англійський рядок відправляється поруч із перекладом. Бенчмарк фіксує **3-15% рядків `en` всередині сторінок `fr`** у кожній оптимізованій конфігурації. Intlayer вирішує резервні варіанти під час збирання та відправляє лише активну мову.

</Question>

<Question title="Чи справді JavaScript на сторінку в Lingui є конкурентним?">

Так, а на TanStack Start він навіть трохи попереду: 115.2 KB у режимі `dynamic` проти 118.6 KB в Intlayer. Скомпільовані каталоги з хешованими ID є компактними. Проте витрати виникають в іншому: гідратація за 28-34 мс проти 11-14 мс і перемикання мови за **42 мс** у конфігурації `scoped-dynamic`.

</Question>

<Question title="Чи потрібно відмовлятися від макросів для міграції?">

Ні. `@intlayer/lingui` підтримує компіляцію `` t`...` ``, `<Trans>`, `msg`, `plural`, `select` і `selectOrdinal` як раніше; змінюється лише те, звідки `i18n._()` бере значення. Залиште `@lingui/babel-plugin-lingui-macro` або `@lingui/swc-plugin` у збірці. Див. [документацію щодо сумісності з Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/lingui.md).

</Question>

<Question title="Що щодо кроків вилучення та компіляції?">

Вони залишаються для макросів і зникають для власного контенту Intlayer. Словники `.content.ts` створюються під час роботи бандлера без окремого виклику CLI, а [`intlayer test`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md) зупиняє CI у разі відсутності ключа замість непомітного відкату до вихідного рядка.

</Question>

</FAQ>

## Схожі порівняння

Той самий бенчмарк, інші бібліотеки:

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/next-intl_vs_intlayer.md)
- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18next_vs_intlayer.md)
- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/vue-i18n_vs_intlayer_benchmark.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/react-i18next_vs_react-intl_vs_intlayer.md)

Докладніше:

- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/lingui_vs_intlayer-lingui.md), адаптер виміряно на тому ж застосунку
- [Compiler-driven vs declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/compiler_vs_declarative_i18n.md)
- [Per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/per-component_vs_centralized_i18n.md)
- [ICU message format explained](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/icu_message_format.md)

Довідкова документація:

- [Звіт про бенчмарк Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/nextjs.md) та [звіт про бенчмарк TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md)
- [Compat adapter: Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/lingui.md)
- [Оптимізація бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md) та [компілятор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md)

## Зірки GitHub

Зірки на GitHub є вагомим показником популярності проєкту, довіри спільноти та його довгострокової актуальності. Хоча вони не є прямою оцінкою технічної досконалості, вони відображають, скільки розробників вважають проєкт корисним і стежать за його розвитком.

[![Графік історії зірок](https://api.star-history.com/chart?repos=lingui%2Fjs-lingui%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#lingui/js-lingui&aymericzip/intlayer)

## Висновок

Lingui є найпотужнішою комбінованою бібліотекою (runtime + компілятор) у цьому бенчмарку. Її скомпільовані хешовані каталоги забезпечують обсяг JavaScript на сторінку лише на кілька кілобайтів більший, ніж у Intlayer, а на TanStack Start навіть дещо менший. Якби розмір сторінки був єдиною метрикою, це була б нічия.

Але це не так. Компілятор Lingui зупиняється на межі цілої локалі; все, що нижче (каталоги для кожного маршруту, ліниве завантаження, виключення резервної мови з бандла), вимагає ручного налаштування. Бенчмарк демонструє наслідки цього обмеження: компоненти **у 10-20 разів більші**, гідратація **у 2-3 рази повільніша**, **3-15% витоку локалі**, якого неможливо позбутися, і перемикання локалі тривалістю **42 мс** в оптимізованому режимі. Компілятор Intlayer працює безпосередньо на рівні окремих компонентів, тому ці показники становлять **6-8 КБ**, **11-14 мс**, **0%** та **3-4 мс** без будь-яких ручних налаштувань.

Усі вихідні дані, тестові додатки та скрипти доступні у [репозиторії Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Ви можете запустити їх самостійно.

Зверніться до документа ['Чому Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md) для отримання детальнішої інформації.

---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "i18next проти Intlayer: бенчмарк та детальне порівняння 2026"
description: "Порівняння react-i18next та next-i18next з Intlayer на Next.js та TanStack Start. Розмір bundle, витік контенту, швидкість перемикання мови та досвід розробника."
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - Intlayer
  - Інтернаціоналізація
  - i18n
  - Бенчмарк
  - Розмір bundle
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

# i18next проти Intlayer | Бенчмарк інтернаціоналізації (i18n) для React та Next.js

![i18next VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`i18next` - найпопулярніший фреймворк інтернаціоналізації (i18n) в екосистемі JavaScript. Через `react-i18next` та `next-i18next` він використовується у величезній кількості додатків React та Next.js. Intlayer - це сучасна альтернатива на основі компілятора з ізольованою областю видимості для кожного компонента.

У цій статті порівнюються дві бібліотеки на основі реальних вимірювань, а не просто переліку функцій. Усі показники отримані з [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) - відкритого набору тестів, який збирає однаковий додаток з кожною бібліотекою та фіксує те, що браузер реально завантажує по мережі.

<TOC/>

> **Короткий підсумок (tl;dr)**: `i18next` виявився найважчим runtime у тесті: він додає **+77 KB gzip на сторінку** у Next.js при базовій конфігурації, і **+22 KB** навіть після повної оптимізації просторів імен та лінивого завантаження (lazy-loading). Intlayer додає лише **+0.3 KB**. Усі конфігурації `i18next`, крім повністю ізольованої (scoped), передають **близько 90% рядків з інших сторінок**; Intlayer за замовчуванням передає **0%**. Перемикання мови з бекендом лінивого завантаження тривало **123-185 ms** з `react-i18next` проти **3-4 ms** з Intlayer. Адаптер сумісності `@intlayer/next-i18next` зберігає API `i18next` і зменшив розмір сторінки з **218.5 KB** до **150.7 KB**.

## Коротко про головне

- **i18next / react-i18next / next-i18next** - Зрілий, багатий на плагіни, незалежний від фреймворку інструмент. Підтримує простори імен, детектори мови, бекенди, ICU через плагіни та компонент `<Trans>` для розміченого контенту. Переклади зберігаються централізовано у `locales/{lng}/{ns}.json`. Дуже потужний, але кожна оптимізація (розділення просторів імен, завантаження для конкретної сторінки, типобезпека) потребує ручного налаштування та постійної підтримки.
- **Intlayer** - Модель контенту, орієнтована на компоненти. Словники `.content.ts` розташовані безпосередньо поруч із компонентом, який вони обслуговують; компілятор під час збірки виконує tree-shaking та ліниве завантаження окремо для кожного компонента й мови, суворі типи TypeScript генеруються автоматично з вмісту, а відсутні переклади спричиняють помилку збірки. Включає middleware, утиліти для SEO, візуальний редактор / CMS та переклад за допомогою штучного інтелекту.

| Бібліотека              | Зірки на GitHub                                                                                                                                                                    | Всього комітів                                                                                                                                                                         | Останній коміт                                                                                                                                          | Перша версія  | Версія NPM                                                                                                            | Завантаження NPM за місяць                                                                                                       |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer`   | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)     | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)     | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)     | Квітень 2024  | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           |
| `i18next/i18next`       | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)             | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)             | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)             | Січень 2012   | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             |
| `i18next/react-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/react-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/react-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/react-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/react-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/react-i18next?style=for-the-badge)](https://github.com/i18next/react-i18next/commits) | Грудень 2015  | [![npm](https://img.shields.io/npm/v/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) | [![npm downloads](https://img.shields.io/npm/dm/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) |
| `i18next/next-i18next`  | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits)   | Листопад 2018 | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   |

> Значки оновлюються автоматично. Показники з часом змінюються.

## Порівняння функціональності

| Можливість                                       | Intlayer (`react-intlayer` / `next-intlayer`)                                       | i18next (`react-i18next` / `next-i18next`)                       |
| ------------------------------------------------ | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Переклади поруч із компонентами**              | ✅ Так, `.content.ts` розміщується поруч із кожним компонентом                      | ❌ Ні, централізовано у `locales/{lng}/{ns}.json`                |
| **Інтеграція з TypeScript**                      | ✅ Суворі типи створюються автоматично на основі вмісту                             | ⚠️ Базова; суворі ключі вимагають розширення `CustomTypeOptions` |
| **Виявлення пропущених перекладів**              | ✅ Помилка TypeScript + помилка/попередження під час збірки                         | ⚠️ Заглушка в runtime (`saveMissing`, повернення самого ключа)   |
| **Розмічений контент (JSX / Markdown)**          | ✅ Пряма нативна підтримка                                                          | ⚠️ Через `<Trans>` з індексованими маркерами                     |
| **Підтримка ICU**                                | ⚠️ В процесі розробки                                                               | ⚠️ Через плагін (`i18next-icu`)                                  |
| **Множина (Pluralization)**                      | ✅ Чіткі шаблони на основі переліків (Enum)                                         | ✅ Суфікси `_one` / `_other` (Intl.PluralRules)                  |
| **Форматування (дати, числа, валюти)**           | ✅ `useNumber`, `useDate`, ... (вбудований Intl)                                    | ⚠️ Форматери інтерполяції або ручний виклик `Intl.*`             |
| **Локалізована маршрутизація та middleware**     | ✅ Вбудований проксі/middleware, `getMultilingualUrls`                              | ⚠️ Не входить у ядро; потрібні сторонні рішення або власний код  |
| **SEO-помічники (hreflang, sitemap, robots)**    | ✅ Вбудовані інструменти                                                            | ❌ Ручне налаштування                                            |
| **Синхронні серверні компоненти (RSC)**          | ✅ `useIntlayer` з `next-intlayer/server` працює у будь-якому серверному компоненті | ⚠️ `getFixedT` на рівні сторінки та передача `t` через Props     |
| **Tree-shaking (лише потрібний вміст)**          | ✅ Для кожного компонента та мови автоматично компілятором                          | ⚠️ Вручну: простори імен + список `ns` на сторінку + бекенд      |
| **Ліниве завантаження (Lazy loading)**           | ✅ `importMode: 'dynamic'` (один рядок конфігурації)                                | ✅ Через плагіни бекенда (`i18next-resources-to-backend` тощо)   |
| **Очищення невикористаного вмісту (Purge)**      | ✅ Невикористані словники відсікаються під час збірки                               | ❌ Немає вбудованої підтримки                                    |
| **Тестування відсутніх рядків (CLI / CI)**       | ✅ `npx intlayer content test`                                                      | ⚠️ `i18next-parser` або сторонні утиліти                         |
| **Переклад за допомогою ШІ**                     | ✅ Вбудований, використовує ваші власні API-ключі                                   | ❌ Немає (Locize є окремим платним сервісом)                     |
| **Візуальний редактор / CMS**                    | ✅ Безкоштовний візуальний редактор + опціональна CMS                               | ❌ Немає (Locize або зовнішні платформи)                         |
| **Сервер MCP та навички агентів (Agent Skills)** | ✅ Підтримується                                                                    | ❌ Не підтримується                                              |
| **Екосистема та спільнота**                      | ⚠️ Новіша, але стрімко розвивається                                                 | ✅ Найбільша та найбільш перевірена часом                        |

## Тестування продуктивності (Benchmark)

### Що вимірювалося

Пакет тестів [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) збирає **один і той самий додаток** з кожною бібліотекою: **10 сторінок** (головна, про нас, блог, кар'єра, контакти, FAQ, ціни, продукти, налаштування, команда), **10 мов** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), однакові компоненти та ідентичний вміст. Сторінки тестувалися англійською (`en`) та французькою (`fr`) мовами. Кожна бібліотека перевірялася у чотирьох **стратегіях завантаження**:

| Стратегія          | Опис                                                                                   | Типовий сценарій використання               |
| ------------------ | -------------------------------------------------------------------------------------- | ------------------------------------------- |
| **static**         | Усі мови та сторінки запаковані разом (`resources` вбудовані прямо в `init()`)         | Швидкі прототипи, код, згенерований ШІ      |
| **dynamic**        | Тільки активна мова завантажується через бекенд, але всі простори імен одночасно       | Більшість звичайних проєктів                |
| **scoped-static**  | Один простір імен на маршрут, усе запаковано заздалегідь                               | Рідкісні конфігурації                       |
| **scoped-dynamic** | Простір імен на маршрут + ліниве завантаження. Тільки поточна сторінка та поточна мова | Проєкти із жорстким бюджетом продуктивності |

Intlayer не потребує окремого варіанту "scoped": компілятор автоматично ізолює контент **на рівні кожного компонента**, тому його конфігурації `static` та `dynamic` уже максимально оптимізовані.

Для кожної збірки фіксувалися такі показники:

- **Lib size**: gzip-розмір порожнього компонента, який імпортує лише бібліотеку i18n (постійна вага runtime).
- **Page JS**: середній обсяг JavaScript gzip, що завантажується на сторінку (усереднений по всіх сторінках і мовах).
- **Locale leak %**: частка перекладених рядків у завантаженому JS, що належать мові, яку користувач **не** переглядає.
- **Page leak %**: частка перекладених рядків у завантаженому JS, що належать сторінці, на якій користувач **не** перебуває.
- **Component avg**: середній gzip-розмір кожного компонента, скомпільованого окремо.
- **E2E reactivity**: реальний час від вибору нової мови до оновлення `html[lang]` у DOM (Playwright, середнє за 5 ітерацій).
- **Hydration**: тривалість етапу гідратації React.

> Подані нижче дані отримані під час тестування від **2026-09-12** з версіями `next-i18next` 16.3.0, `react-i18next` 17.0.13 та `intlayer` 9.5.1. Тестовий додаток навмисно компактний, тому відсотки витоку показують **закономірність**: витоки зростають разом із контентом, тоді як накладні витрати runtime залишаються фіксованими.

### Результати на Next.js (`next-i18next`)

Виберіть метрики та бібліотеки, які вас цікавлять:

<I18nBenchmark framework="nextjs" vertical/>

| Бібліотека                         | Стратегія      | Вага Lib (gz) | Сер. JS сторінки (gz) | Витік мов | Витік сторінок | Сер. вага комп. (gz) | Реактивність E2E | Час гідратації |
| ---------------------------------- | -------------- | ------------: | --------------------: | --------: | -------------: | -------------------: | ---------------: | -------------: |
| **base** (без i18n)                | -              |        0.0 KB |              141.0 KB |      0.0% |           0.0% |               0.9 KB |          13.4 ms |        11.8 ms |
| `next-i18next`                     | static         |       19.7 KB |              218.5 KB |      0.0% |          89.8% |              78.5 KB |          16.4 ms |        15.6 ms |
| `next-i18next`                     | dynamic        |       19.7 KB |              169.5 KB |     50.0% |          89.8% |              26.1 KB |          15.4 ms |        27.7 ms |
| `next-i18next`                     | scoped-static  |       19.7 KB |              220.1 KB |      0.0% |          89.8% |              78.9 KB |          16.4 ms |        14.7 ms |
| `next-i18next`                     | scoped-dynamic |       19.7 KB |              163.4 KB |      0.0% |           0.0% |              27.1 KB |          15.9 ms |        15.1 ms |
| **`next-intlayer`**                | static         |    **5.5 KB** |          **141.3 KB** |  **0.0%** |       **0.0%** |           **8.5 KB** |      **15.5 ms** |        16.9 ms |
| **`next-intlayer`**                | dynamic        |    **5.5 KB** |          **141.3 KB** |  **0.0%** |       **0.0%** |           **6.9 KB** |      **15.3 ms** |        15.9 ms |
| `@intlayer/next-i18next` (адаптер) | static         |        9.4 KB |              150.7 KB |      0.0% |           0.0% |               9.7 KB |          10.7 ms |        11.3 ms |
| `@intlayer/next-i18next` (адаптер) | dynamic        |        9.4 KB |              150.7 KB |      0.0% |           0.0% |               9.7 KB |          11.9 ms |        10.6 ms |

**Аналіз результатів**

- **Вага середовища виконання**: ядро `i18next` разом із `react-i18next` є найважчим runtime у тесті: **19.7 KB gzip** для порожнього компонента, порівняно з 5.5 KB у `next-intlayer`.
- **Базова конфігурація дуже громіздка**: вбудовування `resources` в `init()` створює **218.5 KB на сторінку** (+77.5 KB до базового додатку). Кожна сторінка завантажує абсолютно всі простори імен.
- **Оптимізація вручну потребує зусиль**: перехід на бекенд (`dynamic`) заощаджує 49 KB, але **все одно пропускає 90% рядків інших сторінок**, а половина завантаженого тексту належить іншій мові. Лише поділ на простори імен по маршрутах (`scoped-dynamic`) позбавляє витоків при вазі **163.4 KB**, що однаково на **+22.4 KB на сторінку більше**, ніж у Intlayer (141.3 KB), який не потребує ручного налаштування.
- **Розмір компонентів**: компонент із викликом `useTranslation()` компілюється у 26-79 KB; той самий компонент з `useIntlayer()` важить усього 6.9 KB.
- **Гідратація уповільнюється**: час гідратації зростає до 27.7 ms у конфігурації `dynamic`, оскільки екземпляр i18next має ініціалізуватися й отримати дані з бекенда на клієнті до того, як React завершить гідратацію.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Повна таблиця, кожна бібліотека та кожна стратегія, у [звіті про бенчмарк Next.js](https://intlayer.org/uk/doc/benchmark/nextjs).

### Результати на TanStack Start (`react-i18next`)

Той самий додаток на TanStack Start із чистим `react-i18next` для виключення специфіки Next.js:

| Бібліотека          | Стратегія      | Вага Lib (gz) | Сер. JS сторінки (gz) | Витік мов | Витік сторінок | Сер. вага комп. (gz) | Реактивність E2E | Час гідратації |
| ------------------- | -------------- | ------------: | --------------------: | --------: | -------------: | -------------------: | ---------------: | -------------: |
| **base** (без i18n) | -              |        0.0 KB |              111.0 KB |      0.0% |           0.0% |               0.7 KB |           8.1 ms |        21.6 ms |
| `react-i18next`     | static         |       18.4 KB |              180.3 KB |     50.0% |          89.8% |              24.3 KB |          12.9 ms |        85.1 ms |
| `react-i18next`     | dynamic        |       18.4 KB |              136.4 KB |     23.1% |          89.8% |              24.8 KB |         123.1 ms |        32.9 ms |
| `react-i18next`     | scoped-static  |       18.4 KB |              184.2 KB |     50.7% |          89.8% |              25.3 KB |         185.1 ms |        25.2 ms |
| `react-i18next`     | scoped-dynamic |       18.4 KB |              127.2 KB |      0.0% |           0.0% |              26.7 KB |          17.6 ms |        11.3 ms |
| **`intlayer`**      | static         |    **5.0 KB** |          **125.8 KB** |     50.0% |       **0.0%** |           **8.1 KB** |       **3.2 ms** |        11.5 ms |
| **`intlayer`**      | dynamic        |    **5.0 KB** |          **118.6 KB** |  **0.0%** |       **0.0%** |           **6.3 KB** |       **3.6 ms** |        14.1 ms |

**Аналіз результатів**

- Простий додаток `react-i18next` завантажує на **+69 KB на сторінку більше**, ніж додаток без i18n, а гідратація триває **85 ms** (вчетверо довше), оскільки все дерево ресурсів обробляється та реєструється на клієнті перед першим рендером.
- **Затримка лінивого завантаження при зміні мови**: при завантаженні за вимогою перемикання мови вимагає мережевого запиту до оновлення `html[lang]`: **123 ms** у `dynamic` та **185 ms** у `scoped-static`. Intlayer оновлює DOM за **3-4 ms** в обох режимах: перемикання відбувається миттєво і не залежить від мережі.
- Складна ручна оптимізація `scoped-dynamic` дозволяє дійти до 127.2 KB, що все одно на **+8.6 KB важче** за Intlayer у режимі `dynamic`, вимагаючи при цьому маппінгу маршрутів та меж Suspense.
- Режим `static` у Intlayer за замовчуванням має **0% витоку сторінок**, оскільки до бандла потрапляють лише словники, задіяні компонентами поточної сторінки. А увімкнення `importMode: 'dynamic'` повністю ліквідує витік мов.
- **Розмір компонентів**: 24-27 KB у `react-i18next` проти 6-8 KB в Intlayer. `useTranslation()` завжди прив'язує кожен компонент до глобального екземпляра i18next.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Повна таблиця у [звіті про бенчмарк TanStack Start](https://intlayer.org/uk/doc/benchmark/tanstack).

## Звідки така різниця? Глобальний екземпляр проти скомпільованих словників

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

`i18next` створювався у 2012 році як середовище виконання: єдиний глобальний об'єкт містить базу ресурсів, плагіни доповнюють його, а функція `t()` шукає ключі під час рендерингу. Це забезпечує високу гнучкість, але призводить до відчутного навантаження:

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
                └── page.tsx     # повинна знати, що потрібні ["common", "about"]
```

Глобальний екземпляр не знає заздалегідь, які ключі знадобляться конкретному компоненту; він завантажує весь переданий простір імен. Оптимізація вимагає, щоб **ви** розбивали каталоги, **ви** вказували простори імен для кожної сторінки та **ви** стежили за актуальністю цього списку при змінах.

Витрати зростають за двома осями одночасно, сторінками та локалями:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Як зазначається у [звіті бенчмарку](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md): "Підтримувати типобезпеку і точно знати, який простір імен додати на кожну сторінку - це справжній кошмар".

Intlayer повністю позбувається глобального екземпляра. Контент оголошується безпосередньо поруч із компонентом, а компілятор розв'язує дерево залежностей під час збірки:

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

`@intlayer/swc` / `@intlayer/babel` визначає, який компонент використовує який словник, упаковує лише їх і лише для активної мови, а невикористаний контент видаляє. Патерн "scoped-dynamic" стає автоматичним підсумком збірки, а не складним регламентом розробки.

> Щоб отримати показники рядка `dynamic`, вкажіть `dictionary.importMode: 'dynamic'` у файлі `intlayer.config.ts`. Детальніше дивіться у [документації з оптимізації bundle](https://intlayer.org/uk/doc/concept/bundle-optimization).

## Досвід розробника (DX)

### Налаштування конфігурації

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

Додатково потрібно налаштувати клієнтський `I18nProvider`, `generateStaticParams` та вручну вказувати масив `namespaces` на кожній сторінці.

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

### Клієнтський компонент

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

> Сторінка, на якій відображається цей компонент, зобов'язана підвантажити namespace `about`, а виклик `t("counter.label")` залишається простим нетипізованим рядком, якщо не розширювати `CustomTypeOptions`.

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

Поля `label` та `increment` суворо типізовані; будь-яка помилка друку викличе помилку TypeScript, а відсутність французького перекладу зупинить процес збірки.

</Tab>
</Tabs>

### Синхронний серверний компонент (RSC)

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

Сторінка повинна викликати `i18n.getFixedT(locale, "about")` і спускати `t` та `locale` вниз через props.

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

## Збережіть API i18next, отримайте швидкодію Intlayer

Вам не потрібно переписувати всі компоненти, щоб скористатися перевагами бенчмарку. Адаптери `@intlayer/i18next`, `@intlayer/react-i18next` та `@intlayer/next-i18next` підключаються як пряма заміна: виклики `useTranslation`, `t()`, `<Trans>`, форми множини та суфікси контексту продовжують працювати, транслюючись зі словників, скомпільованих Intlayer.

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

У бенчмарку адаптерний білд того самого додатку Next.js зменшив обсяг сторінки з **218.5 KB до 150.7 KB**, середній компонент з **78.5 KB до 9.7 KB**, витік сторінок скоротився з **~90% до 0%**, а час гідратації скоротився з 15.6 ms до 11.3 ms без зміни коду компонентів. Наявні файли `locales/{lng}/{ns}.json` можуть залишатися основним джерелом даних через плагін синхронізації JSON.

Дивіться посібники з міграції: [i18next](https://intlayer.org/uk/doc/migration/i18next), [react-i18next](https://intlayer.org/uk/doc/migration/react-i18next), [next-i18next](https://intlayer.org/uk/doc/migration/next-i18next).

## Що і коли обирати?

<AccordionGroup>
<Accordion header="Обрати i18next">

Якщо вам критично необхідна його екосистема плагінів (специфічні детектори, кастомні бекенди, ICU, Locize), ви реалізуєте переклад поза React (сервіси Node, чистий JS, інші фреймворки), команда вже має значний досвід, або зовнішня платформа вимагає структури `locales/{lng}/{ns}.json`. Але виділіть ресурси на підтримку просторів імен та маршрутів, якщо швидкість має значення.

</Accordion>
<Accordion header="Обрати Intlayer">

Вам потрібен **контент на рівні компонентів**, **суворий TypeScript**, **помилки відсутніх ключів на етапі збірки**, **tree-shaking та lazy loading без зусиль**, миттєве перемикання мови, синхронні серверні компоненти та вбудовані інструменти редагування ([Візуальний редактор](https://intlayer.org/uk/doc/concept/editor), [CMS](https://intlayer.org/uk/doc/concept/cms), [ШІ-переклад](https://intlayer.org/uk/doc/concept/auto-fill), [MCP-сервер](https://intlayer.org/uk/doc/mcp-server)). Особливо актуально для великих модульних кодових баз та дизайн-систем.

</Accordion>
<Accordion header="Обрати адаптери @intlayer/*-i18next">

Ви вже використовуєте i18next і хочете отримати переваги у розмірі бандла та реактивності без переписування компонентів. Ваші файли `locales/{lng}/{ns}.json` залишаються джерелом істини. Виміряно пліч-о-пліч у [i18next проти @intlayer/i18next](https://intlayer.org/uk/blog/i18next-vs-intlayer-i18next).

</Accordion>
</AccordionGroup>

## FAQ (Часті запитання)

<FAQ>

<Question title="Чому i18next набагато важчий за інші бібліотеки?">

Він створювався як агностичний до фреймворків рантайм: глобальний екземпляр, конвеєр плагінів, сховище ресурсів, резолвер ключів. Ця гнучкість компілюється в кожен бандл. Порожній компонент, який імпортує лише бібліотеку, коштує **19.7 KB gzip** з `next-i18next` проти **5.5 KB** з `next-intlayer`, і ця ціна сплачується на кожній сторінці, незалежно від обсягу вмісту.

</Question>

<Question title="Чи вирішує проблему ліниве завантаження з бекендом?">

Воно вирішує проблему байтів, а не затримки. Перехід на `i18next-resources-to-backend` заощаджує ~49 KB на сторінку, але додає мережевий запит при зміні мови: **123 мс** у конфігурації `dynamic` і **185 мс** у `scoped-static` проти **3-4 мс** в Intlayer. Гідратація також стрибає до 27.7 мс, оскільки інстанс опитує бекенд до гідратації React.

</Question>

<Question title="Чи можу я досягти 0% витоку з i18next?">

Так, із `scoped-dynamic`: один простір імен на маршрут, бекенд ресурсів і карта сторінок до просторів імен, яка підтримується вручну. Це дає 163.4 KB на сторінку в Next.js, що все одно на **+22 KB** більше, ніж 141.3 KB в Intlayer, який не вимагав жодного налаштування. Див. [оптимізацію бандла](https://intlayer.org/uk/doc/concept/bundle-optimization).

</Question>

<Question title="Чи потрібно переписувати компоненти для міграції?">

Ні. `@intlayer/i18next`, `@intlayer/react-i18next` та `@intlayer/next-i18next` зберігають `useTranslation`, `t()`, `<Trans>`, `{{interpolation}}`, множинні форми `_one` / `_other`, контекстні суфікси та `returnObjects`. Всього один рядок плагіна в `next.config.ts` або `vite.config.ts`. Покроково в [посібнику з міграції next-i18next](https://intlayer.org/uk/doc/migration/next-i18next).

</Question>

<Question title="Що відбувається з моїми плагінами i18next?">

Бекенди та детектори мови приймаються, але залишаються пасивними: у рантаймі більше нічого завантажувати або визначати. Визначення мови стає конфігурацією маршрутизації Intlayer (префікс URL, cookie, заголовок). Якщо ваш додаток отримує переклади з CMS під час запиту, використовуйте [Intlayer CMS](https://intlayer.org/uk/doc/concept/cms) або команди `intlayer pull` / `push`.

</Question>

</FAQ>

## Схожі порівняння

Той самий бенчмарк, інші бібліотеки:

- [next-intl vs Intlayer](https://intlayer.org/uk/blog/next-intl-vs-intlayer)
- [Lingui vs Intlayer](https://intlayer.org/uk/blog/lingui-vs-intlayer)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/uk/blog/vue-i18n-vs-intlayer-benchmark)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/uk/blog/next-i18next-vs-next-intl-vs-intlayer)
- [react-i18next vs react-intl vs Intlayer](https://intlayer.org/uk/blog/react-i18next-vs-react-intl-vs-intlayer)

Докладніше про i18next:

- [i18next проти @intlayer/i18next](https://intlayer.org/uk/blog/i18next-vs-intlayer-i18next), адаптери виміряні на одному додатку
- [Чи застарів i18next?](https://intlayer.org/uk/blog/is-i18next-outdated)
- [Використання Intlayer з i18next](https://intlayer.org/uk/blog/intlayer-with-i18next) та [з react-i18next](https://intlayer.org/uk/blog/intlayer-with-react-i18next)
- [Як інтернаціоналізувати додаток Next.js за допомогою next-i18next](https://intlayer.org/uk/blog/nextjs-internationalization-using-next-i18next)

Довідкова документація:

- [Звіт про бенчмарк Next.js](https://intlayer.org/uk/doc/benchmark/nextjs) та [звіт про бенчмарк TanStack Start](https://intlayer.org/uk/doc/benchmark/tanstack)
- Адаптери сумісності: [i18next](https://intlayer.org/uk/doc/compatibility/i18next), [react-i18next](https://intlayer.org/uk/doc/compatibility/react-i18next), [next-i18next](https://intlayer.org/uk/doc/compatibility/next-i18next)
- Посібники з міграції: [i18next](https://intlayer.org/uk/doc/migration/i18next), [react-i18next](https://intlayer.org/uk/doc/migration/react-i18next), [next-i18next](https://intlayer.org/uk/doc/migration/next-i18next)
- [Оптимізація бандла](https://intlayer.org/uk/doc/concept/bundle-optimization) та [компілятор Intlayer](https://intlayer.org/uk/doc/compiler)
- [Компонентна i18n проти централізованої](https://intlayer.org/uk/blog/per-component-vs-centralized-i18n)
- [Компіляторна i18n проти декларативної](https://intlayer.org/uk/blog/compiler-vs-declarative-i18n)

## Зірки на GitHub

Зірки на GitHub є чітким свідченням популярності проєкту, довіри спільноти та його довгострокової життєздатності. Хоча вони не вимірюють безпосередньо якість коду, вони показують, скільки розробників вважають інструмент корисним і обирають його для своїх проєктів.

[![Графік історії зірок](https://api.star-history.com/chart?repos=i18next%2Fi18next%2Ci18next%2Freact-i18next%2Ci18next%2Fnext-i18next%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#i18next/i18next&i18next/react-i18next&i18next/next-i18next&aymericzip/intlayer)

## Висновок

`i18next` заслужив свій статус: він працює всюди, має плагіни для будь-яких завдань і підтримується понад 10 років. Проте бенчмарк демонструє високу ціну такої орієнтованої на runtime архітектури. Звичайна збірка додає **+70-77 KB gzip на кожну сторінку**, **пропускає близько 90% контенту сторонніх сторінок**, а зміна мови з лінивим завантаженням триває **понад 100 ms**. Позбутися витоків можливо, але це вимагає складного ручного адміністрування, і результат все одно буде **на 9-22 KB важчим** за Intlayer.

Intlayer перекладає всю цю роботу на компілятор. Словники для кожного компонента, ліниве завантаження за мовами та очищення зайвого контенту стають природним результатом процесу збірки. На тому самому додатку: **лише +0.3 KB на сторінку**, **0% витоків**, компоненти **у 3-10 разів компактніші**, а зміна мови відбувається за **3-4 ms**.

Усі необроблені дані, тестові додатки та скрипти опубліковані у [репозиторії Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Ви можете запустити їх і переконатися самостійно.

Дізнайтеся більше у документації ['Чому Intlayer?'](https://intlayer.org/uk/doc/why).

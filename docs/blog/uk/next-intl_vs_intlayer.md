---
createdAt: 2026-09-13
updatedAt: 2026-09-22
priority: 8
title: "next-intl проти Intlayer: Бенчмарк та порівняння 2026"
description: "Детальне порівняння next-intl та Intlayer у Next.js App Router і TanStack Start. Розмір бандла, витік контенту, розмір компонентів, гідратація та досвід розробника."
keywords:
  - next-intl
  - use-intl
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer
author: aymericzip
---

# next-intl проти Intlayer | Бенчмарк інтернаціоналізації (i18n) у React та Next.js

![next-intl VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`next-intl` є найпопулярнішою бібліотекою i18n для Next.js. Intlayer, це альтернатива на основі компілятора з областю видимості на рівні компонентів. Обидва рішення локалізують застосунок App Router. Питання полягає в тому, скільки коштує кожне з них після збирання проєкту.

Ця стаття не є посібником. Це порівняння, підтверджене даними з [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), відкритого набору бенчмарків, який створює однаковий застосунок із кожною бібліотекою та вимірює те, що браузер фактично завантажує та виконує.

<TOC/>

> **Коротко (tl;dr)**: `next-intl` додає щонайменше **+12.6 КБ gzip** на кожній сторінці лише через свій runtime і призводить до витоку **~90% рядків з інших сторінок** у стандартних конфігураціях (`static` та `dynamic`). Щоб усунути цей витік, потрібно вручну розбивати каталоги на простори імен та підключати їх окремо для кожної сторінки. Натомість компілятор `Intlayer` гарантує **0% витоку**, **втричі менші компоненти** та лише **+0.3 КБ** понад базовий додаток без будь-яких ручних налаштувань.

## Короткий огляд

- **next-intl** - Стандарт спільноти Next.js. Централізовані словники JSON для кожної мови, повна підтримка ICU MessageFormat і глибока інтеграція з обробкою запитів та маршрутизацією Next.js.
- **Intlayer** - Модель контенту, орієнтована на компоненти. Файли `.content.ts` розташовані поруч із компонентами, компілятор часу збирання автоматично виконує tree-shaking та ліниве завантаження для кожного компонента і локалі, а також генерує суворі типи TypeScript.

| Бібліотека            | Зірки GitHub                                                                                                                                                                   | Всього комітів                                                                                                                                                                     | Останній коміт                                                                                                                                      | Перша версія  | Версія NPM                                                                                                    | Завантаження NPM                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Квітень 2024  | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   |
| `amannn/next-intl`    | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       | Березень 2021 | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) |

> Значки оновлюються автоматично.

## Порівняння функціональності

| Функція                                           | Intlayer (`react-intlayer` / `next-intlayer`)                                       | next-intl (`next-intl` / `use-intl`)                                   |
| ------------------------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Переклади поруч із компонентами**               | ✅ Так, `.content.ts` поруч із кожним компонентом                                   | ❌ Централізовані словники JSON у папці `messages/`                    |
| **Інтеграція з TypeScript**                       | ✅ Суворі типи генеруються автоматично з контенту                                   | ⚠️ Підтримується через ручне налаштування `global.d.ts`                |
| **Виявлення відсутніх перекладів**                | ✅ Помилка TypeScript + помилка/попередження під час збирання                       | ⚠️ У runtime повертає ключ або генерує помилку залежно від налаштувань |
| **Багатий контент (JSX / Markdown / компоненти)** | ✅ Пряма підтримка                                                                  | ⚠️ Через `t.rich()` з передачею компонентів зіставлення                |
| **Підтримка ICU MessageFormat**                   | ⚠️ У розробці                                                                       | ✅ Так, повна підтримка ICU                                            |
| **Синхронні серверні компоненти**                 | ✅ `useIntlayer` з `next-intlayer/server` працює у будь-якому дочірньому компоненті | ❌ Вимагає передачі перекладів через props від асинхронного предка     |
| **Tree-shaking**                                  | ✅ Автоматично для кожного компонента і локалі                                      | ⚠️ Вимагає ручного поділу на простори імен та використання `pick()`    |
| **Ліниве завантаження (Lazy loading)**            | ✅ Один рядок конфігурації (`importMode: 'dynamic'`)                                | ⚠️ Вимагає ручного динамічного імпорту в `getRequestConfig`            |
| **Візуальний редактор / CMS**                     | ✅ Безкоштовний Візуальний редактор + додаткова CMS                                 | ❌ Немає                                                               |
| **Переклад за допомогою ШІ**                      | ✅ Вбудовано, використовує ваші власні API-ключі                                    | ❌ Немає                                                               |
| **Сервер MCP та навички агентів**                 | ✅ Так                                                                              | ❌ Немає                                                               |

## Бенчмарк

### Що вимірювалося

Набір тестів [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) збирає **однаковий додаток** з кожною бібліотекою: **10 сторінок** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 локалей** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), однакові компоненти та ідентичний вміст. Сторінки вимірюються мовами `en` та `fr`. Кожна бібліотека протестована в чотирьох **стратегіях завантаження**:

| Стратегія          | Опис                                                                                      | Хто це використовує                       |
| ------------------ | ----------------------------------------------------------------------------------------- | ----------------------------------------- |
| **static**         | Усі локалі та всі сторінки запаковані разом на старті                                     | Швидкі прототипи, код, згенерований ШІ    |
| **dynamic**        | Завантажується лише активна локаль, але відразу для всіх сторінок                         | Більшість проєктів                        |
| **scoped-static**  | Простори імен на кожен маршрут, без лінивого завантаження                                 | Рідко                                     |
| **scoped-dynamic** | Простори імен на кожен маршрут + ліниве завантаження. Лише поточна сторінка поточної мови | Додатки з суворим бюджетом продуктивності |

Intlayer не має варіанта "scoped": компілятор автоматично обмежує контекст контенту **для кожного компонента**, тому рядки `static` і `dynamic` уже оптимізовані за маршрутами.

Для кожного збирання фіксувалося:

- **Розмір бібліотеки (Lib size)**: розмір gzip порожнього компонента, який імпортує лише бібліотеку i18n.
- **JS сторінки (Page JS)**: кількість стиснутого gzip JavaScript на сторінку.
- **% витоку локалі (Locale leak %)**: частка рядків мови, яку користувач не переглядає.
- **% витоку сторінки (Page leak %)**: частка рядків сторінки, на якій користувач не перебуває.
- **Середній розмір компонента (Component avg)**: середній розмір gzip кожного компонента, скомпільованого окремо.
- **Реактивність E2E**: час між перемиканням мови та оновленням `html[lang]` у DOM.
- **Гідратація**: тривалість фази гідратації React.

> Наведені дані отримані під час тестування від **2026-09-12** з `next-intl` 4.14.2 та `intlayer` 9.5.1.

### Результати на Next.js (App Router)

Виберіть метрики та бібліотеки, які вас цікавлять:

<I18nBenchmark framework="nextjs" vertical/>

| Бібліотека                      | Стратегія      | Розмір Lib (gz) | Сер. JS сторінки (gz) | Витік локалі | Витік сторінки | Сер. компонента (gz) | Реактивність E2E | Гідратація |
| ------------------------------- | -------------- | --------------: | --------------------: | -----------: | -------------: | -------------------: | ---------------: | ---------: |
| **Базовий додаток** (без i18n)  | -              |          0.0 KB |              141.0 KB |         0.0% |           0.0% |               0.9 KB |          13.4 ms |    11.8 ms |
| `next-intl`                     | static         |         14.7 KB |              153.6 KB |         4.2% |          89.8% |              21.8 KB |          16.0 ms |    14.7 ms |
| `next-intl`                     | dynamic        |         14.7 KB |              153.6 KB |         9.7% |          89.9% |              21.8 KB |          15.6 ms |    14.8 ms |
| `next-intl`                     | scoped-static  |         14.7 KB |              153.6 KB |         0.0% |           0.0% |              80.1 KB |          17.9 ms |    17.4 ms |
| `next-intl`                     | scoped-dynamic |         14.7 KB |              153.6 KB |         0.0% |           0.0% |              22.9 KB |          17.8 ms |    16.8 ms |
| **`next-intlayer`**             | static         |      **5.5 KB** |          **141.3 KB** |     **0.0%** |       **0.0%** |           **8.5 KB** |      **15.5 ms** |    16.9 ms |
| **`next-intlayer`**             | dynamic        |      **5.5 KB** |          **141.3 KB** |     **0.0%** |       **0.0%** |           **6.9 KB** |      **15.3 ms** |    15.9 ms |
| `@intlayer/next-intl` (сумісн.) | static         |          8.0 KB |              147.5 KB |         0.0% |           0.0% |               8.1 KB |          14.5 ms |    12.8 ms |
| `@intlayer/next-intl` (сумісн.) | dynamic        |          8.0 KB |              148.7 KB |         0.0% |           0.0% |               8.1 KB |          11.7 ms |    12.8 ms |

**Як інтерпретувати результати**

- **Витрати runtime.** Базовий додаток важить 141.0 КБ на сторінку. `next-intl` збільшує це значення до 153.6 КБ (**+12.6 КБ gzip на кожній сторінці**), тоді як Intlayer додає лише 141.3 КБ (**+0.3 КБ**).
- **Витік контенту.** У найпоширеніших конфігураціях (`static` та `dynamic`) `next-intl` відправляє на кожну сторінку **~90% рядків з інших сторінок**, оскільки весь файл `en.json` потрапляє до клієнтського провайдера. Щоб зменшити цей показник до 0%, потрібен складний ручний поділ на простори імен, тоді як в Intlayer це працює за замовчуванням.
- **Розмір компонента.** Компонент із `useTranslations()` важить у середньому 21.8 КБ; той самий компонент з `useIntlayer()` важить лише 6.9 КБ.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Повна таблиця, кожна бібліотека та кожна стратегія, у [звіті бенчмарку Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/nextjs.md).

### Результати на TanStack Start (`use-intl`)

`use-intl`, це незалежне від фреймворку ядро `next-intl`. Той самий API, той самий формат повідомлень. Порівняння його з `intlayer` на TanStack Start усуває особливості Next.js із рівняння.

| Бібліотека                     | Стратегія      | Розмір Lib (gz) | Сер. JS сторінки (gz) | Витік локалі | Витік сторінки | Сер. компонента (gz) | Реактивність E2E |
| ------------------------------ | -------------- | --------------: | --------------------: | -----------: | -------------: | -------------------: | ---------------: |
| **Базовий додаток** (без i18n) | -              |          0.0 KB |              111.0 KB |         0.0% |           0.0% |               0.7 KB |           8.1 ms |
| `use-intl`                     | static         |         14.1 KB |              179.8 KB |        50.0% |          89.8% |              76.0 KB |           6.7 ms |
| `use-intl`                     | dynamic        |         14.1 KB |              119.4 KB |         0.0% |          89.8% |              75.9 KB |           7.0 ms |
| `use-intl`                     | scoped-static  |         14.1 KB |              128.7 KB |         0.0% |           0.0% |              87.1 KB |          20.9 ms |
| `use-intl`                     | scoped-dynamic |         14.1 KB |              128.7 KB |         0.0% |           0.0% |              87.1 KB |          13.3 ms |
| **`intlayer`**                 | static         |      **5.0 KB** |          **125.8 KB** |        50.0% |       **0.0%** |           **8.1 KB** |       **3.2 ms** |
| **`intlayer`**                 | dynamic        |      **5.0 KB** |          **118.6 KB** |     **0.0%** |       **0.0%** |           **6.3 KB** |       **3.6 ms** |
| `@intlayer/use-intl` (сумісн.) | dynamic        |          7.3 KB |              129.7 KB |         0.0% |           0.0% |               9.3 KB |           8.7 ms |

**Як інтерпретувати результати**

- Просте налаштування `use-intl` передає **на 68.8 КБ більше JS на сторінку**, ніж базовий додаток.
- У режимі `dynamic` `use-intl` досягає 119.4 КБ, але все одно зберігає **89.8% витоку сторінок**.
- Архітектурна різниця особливо помітна у **розмірі компонентів**: 76-87 КБ у `use-intl` проти 6-8 КБ в Intlayer.
- **Перемикання локалі** відбувається у 2-4 рази швидше з Intlayer (3 мс проти 7-21 мс).

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Повна таблиця у [звіті бенчмарку TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md).

## Чому виникає різниця? Централізовані каталоги проти скомпільованих словників

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

`next-intl` слідує класичній моделі: один JSON для кожної мови, завантажується в `getRequestConfig`, передається в `NextIntlClientProvider` і зчитується через `t("namespace.key")`.

```bash
.
├── messages
│   ├── en.json
│   └── fr.json
└── src
    ├── i18n
    │   ├── request.ts
    │   └── routing.ts
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── about
                └── page.tsx
```

Runtime не може передбачити, які саме ключі знадобляться сторінці, тому відправка всього каталогу є єдиним безпечним варіантом.

Ціна недосягнення цієї мети зростає відразу по двох осях, сторінки та локалі:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Intlayer змінює цей підхід. Контент декларується безпосередньо поруч із компонентом:

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── about
                ├── page.tsx
                └── page.content.ts
    └── components
        └── Counter
            ├── index.tsx
            └── index.content.ts
```

Під час збирання компілятор визначає, який компонент імпортує конкретний словник, і пакує тільки ці словники для активної локалі.

> Щоб отримати показники рядка `dynamic`, встановіть `dictionary.importMode: 'dynamic'` у `intlayer.config.ts`. Дивіться [документацію з оптимізації бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md).

## Досвід розробника

### Клієнтський компонент

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```json fileName="messages/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/ClientCounter.tsx"
"use client";

import { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

export const Counter = () => {
  const t = useTranslations("counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button aria-label={t("label")} onClick={() => setCount((c) => c + 1)}>
        {t("increment")}
      </button>
    </div>
  );
};
```

> Не забудьте включити простір імен `counter` у повідомлення, що передаються до `NextIntlClientProvider` на кожній сторінці, яка рендерить цей компонент.

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

На сторінці нічого не потрібно реєструвати: компонент приносить власний вміст.

</Tab>
</Tabs>
### Синхронні серверні компоненти

Елементи дизайн-системи (навігаційні панелі, підвали, картки) часто є серверними компонентами, що відображаються всередині клієнтських компонентів, тому вони не можуть бути `async`.

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  formattedCount: string;
};

export const ServerCounter = ({ t, formattedCount }: ServerCounterProps) => (
  <div>
    <p>{formattedCount}</p>
    <button aria-label={t("label")}>{t("increment")}</button>
  </div>
);
```

Сторінка повинна виконати `await getTranslations("counter")` та `await getFormatter()`, а потім передати результати як пропси. Компонент більше не є автономним.

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
### Метадані

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```tsx fileName="src/app/[locale]/about/page.tsx"
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

const localizedPath = (locale: string, path: string) =>
  locale === routing.defaultLocale ? path : `/${locale}${path}`;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(l, "/about")])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
};
```

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const metadata = getIntlayer("about-metadata", locale);
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};
```

</Tab>
</Tabs>

## Збережіть API next-intl, отримайте оптимізований вихід Intlayer

Вам не потрібно переписувати компоненти, щоб отримати наведені вище результати продуктивності. Пакет `@intlayer/next-intl` є сумісним адаптером: він зберігає `useTranslations`, `getTranslations`, `useFormatter`, `t.rich()` та множинні форми ICU, обслуговуючи їх зі словників, скомпільованих компілятором Intlayer.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

У бенчмарку сумісна збірка того самого додатка зменшила розмір сторінки з **153.6 КБ до 147.5 КБ**, розмір компонентів з **21.8 КБ до 8.1 КБ**, а витік сторінки знизився з **~90% до 0%** без внесення змін у код самого додатка. Ваші наявні файли `messages/{locale}.json` можуть залишатися основним джерелом даних завдяки [плагіну синхронізації JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/next-intl.md).

Дивіться [посібник із міграції з next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_next-intl_to_intlayer.md) для отримання покрокових інструкцій.

## Що і коли обрати?

<AccordionGroup>
<Accordion header="Обрати next-intl">

Вам потрібен стандарт екосистеми для Next.js, ви покладаєтеся на ICU MessageFormat, ваш додаток невеликий або середнього розміру, або ви інтегруєтеся з платформою перекладу (Crowdin, Phrase, Lokalise...), яка очікує централізований JSON. Заплануйте час на поділ каталогів на простори імен і вибір повідомлень через `pick()` на кожній сторінці, якщо важлива продуктивність.

</Accordion>
<Accordion header="Обрати Intlayer">

Вам потрібен **контент з областю видимості компонента**, **суворий TypeScript**, **помилки відсутніх ключів на етапі збірки**, **автоматичний tree-shaking та ліниве завантаження**, синхронні серверні компоненти та вбудовані інструменти редагування ([Візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md), [ШІ-переклад](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/autoFill.md), [MCP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)). Особливо актуально для великих модульних кодових баз та дизайн-систем.

</Accordion>
<Accordion header="Обрати @intlayer/next-intl">

Ви вже використовуєте `next-intl` і хочете отримати переваги в розмірі бандла без повного переписування. [Адаптер сумісності](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/next-intl.md) зберігає ваші імпорти та файл `messages/{locale}.json` як єдине джерело правди. Порівняно пліч-о-пліч у [next-intl проти @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/next-intl_vs_intlayer-next-intl.md).

</Accordion>
</AccordionGroup>

## Часті запитання

<FAQ>

<Question title="next-intl повільніший за Intlayer?">

Не під час рендерингу. Різниця полягає в тому, що надсилається клієнту: `next-intl` додає **+12.6 KB gzip** рантайму на кожній сторінці і в стандартних конфігураціях надсилає ~90% рядків чужих сторінок з кожною сторінкою. Перемикання мови та гідратація порівнянні в Next.js (15-18 мс); в TanStack Start `use-intl` займає 7-21 мс проти 3-4 мс у Intlayer.

</Question>

<Question title="Чи можу я досягти 0% витоку з next-intl?">

Так, з конфігурацією `scoped-dynamic`: розділіть `messages/{locale}.json` на простори імен для кожного маршруту, потім використовуйте `pick(messages, [...])` на кожній сторінці і підтримуйте це зіставлення правильним у міру переміщення компонентів. Рядки `scoped-*` бенчмарку якраз відображають цю роботу. Intlayer досягає 0% за замовчуванням без цього, оскільки компілятор ізолює контент по компонентах. Див. [оптимізація бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md).

</Question>

<Question title="Чи потрібно переписувати компоненти для міграції?">

Ні. `@intlayer/next-intl` зберігає `useTranslations`, `getTranslations`, `useFormatter`, `t.rich()`, множинні форми ICU та помічники навігації, надаючи їх зі скомпільованих словників. Лише один рядок плагіна в `next.config.ts`. Покроково в [посібнику з міграції next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_next-intl_to_intlayer.md).

</Question>

<Question title="Чи підтримує Intlayer формат повідомлень ICU?">

Нативна підтримка ICU знаходиться в розробці. Адаптери сумісності (`@intlayer/next-intl`, `@intlayer/use-intl`) повністю підтримують ICU: множинні форми, `select`, `selectordinal`, `#` та `{ts, date, long}` обробляються резолвером ICU від Intlayer. Докладніше читайте в [формат повідомлень ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/icu_message_format.md).

</Question>

<Question title="Чи можу я зберегти файли messages/{locale}.json?">

Так. [Плагін синхронізації JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/next-intl.md) читає їх, розбиває ключі верхнього рівня на словники та перезаписує переклади в ті самі файли під час оновлення через CLI або CMS. Робочий процес ваших перекладачів не змінюється.

</Question>

</FAQ>

## Схожі порівняння

Той самий бенчмарк, інші бібліотеки:

- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18next_vs_intlayer.md)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/lingui_vs_intlayer.md)
- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/vue-i18n_vs_intlayer_benchmark.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/react-i18next_vs_react-intl_vs_intlayer.md)

Більше про next-intl:

- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/next-intl_vs_intlayer-next-intl.md), адаптер виміряно на тому ж додатку
- [Is next-intl outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/is_next-intl_outdated.md)
- [Using Intlayer with next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/intlayer_with_next-intl.md)
- [How to internationalize a Next.js app with next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18n_using_next-intl.md)

Довідкова документація:

- [Звіт бенчмарку Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/nextjs.md) та [звіт бенчмарку TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md)
- [Адаптер сумісності: next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/next-intl.md) та [посібник з міграції](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_next-intl_to_intlayer.md)
- [Оптимізація бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md) та [компілятор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md)
- [Компонентна i18n проти централізованої](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/per-component_vs_centralized_i18n.md)
- [Компіляторна i18n проти декларативної](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/compiler_vs_declarative_i18n.md)

## Зірки GitHub

Зірки на GitHub є важливим показником популярності проєкту, довіри спільноти та його довгострокової актуальності.

[![Графік історії зірок](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#amannn/next-intl&aymericzip/intlayer)

## Висновок

`next-intl` - це надійна, перевірена часом бібліотека, і бенчмарк підтверджує, що вона залишається хорошим вибором для Next.js. Проте централізована модель каталогів перекладає всю оптимізацію на розробника: стандартне налаштування призводить до витоку близько 90% вмісту інших сторінок, а сам runtime коштує +12.6 КБ gzip на кожній сторінці.

Intlayer переносить усю цю роботу до компілятора. Словники для кожного компонента, ліниве завантаження для кожної мови та очищення невикористаного контенту стають автоматичними результатами збирання. Результат на тому ж додатку: **+0.3 КБ на сторінку**, **0% витоку**, компоненти **втричі менші**, а перемикання мови **у 2-4 рази швидше** на TanStack Start.

Усі вихідні дані, тестові додатки та скрипти доступні у [репозиторії Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom).

Зверніться до документа ['Чому Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md) для отримання детальнішої інформації.

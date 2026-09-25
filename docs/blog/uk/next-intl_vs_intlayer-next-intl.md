---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "next-intl vs @intlayer/next-intl: Один API, різні Bundle"
description: Що змінюється, коли імпорти next-intl додатку Next.js обслуговуються адаптером сумісності @intlayer/next-intl. Розмір bundle, витік, розмір компонента та гідрація вимірюються на одному коді, а також те, що адаптер зберігає, ігнорує та не може замінити.
keywords:
  - next-intl
  - use-intl
  - "@intlayer/next-intl"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer-next-intl
author: aymericzip
---

# next-intl VS @intlayer/next-intl | Один API, різні Bundle

![next-intl VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`@intlayer/next-intl` - це адаптер сумісності: він надає API `next-intl` (`useTranslations`, `getTranslations`, `useLocale`, `t.rich()`, ICU plurals, `NextIntlClientProvider`...) та обслуговує його з словників, скомпільованих Intlayer. Код застосунку не змінюється. Змінюється bundle.

У цій статті порівнюються обидва на одному й тому ж Next.js застосунку, побудованому один раз з `next-intl` та один раз з адаптером. Цифри взяті з [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), open-source набору, який записує, що насправді завантажує браузер. Якщо вам потрібне порівняння `next-intl` та Intlayer як бібліотек, прочитайте [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/next-intl_vs_intlayer.md). Ця стаття про те, як адаптер змінює все, коли ви зберігаєте компоненти як вони є.

<TOC/>

> **tl;dr**: На тій же Next.js програмі заміна `next-intl` на `@intlayer/next-intl` зменшила JavaScript на сторінку з **153.6 KB до 147.5 KB** gzip, середній компонент з **21.8 KB до 8.1 KB**, витік рядків іноземних сторінок з **~90% до 0%** та гідрацію з **14.7 ms до 12.8 ms**, без редагування компонентів. На TanStack Start еквівалент `use-intl` (`@intlayer/use-intl`) зменшив компоненти з **76-87 KB до 9-11 KB** та перемикання локалі з **7-21 ms до 4-9 ms**. Адаптер коштує **8.0 KB** runtime порівняно з **14.7 KB** для `next-intl` та **5.5 KB** для нативного `next-intlayer`. Навігація та middleware переімплементовані на конфігурації маршрутизації Intlayer; локалізовані `pathnames` - це одна функція, яка не перенесена.

## Що таке `@intlayer/next-intl`

`next-intl` - це runtime: `getRequestConfig` завантажує `messages/{locale}.json` на запит, `NextIntlClientProvider` відправляє його на клієнт, а `useTranslations("about")` читає ключі з цього об'єкту під час рендерингу. Кожна оптимізація (namespaces, `pick(messages, [...])` на сторінку, ліниве завантаження) - це ваша робота.

`@intlayer/next-intl` зберігає першу та останню частину цього ланцюга й замінює середину. Ваші компоненти все ще викликають `useTranslations("about")`; те, що вони отримують, походить із словника Intlayer, скомпільованого під час збирання, обмеженого цією компонентою, лише в активній мові.

Три механізми роблять це можливим:

1. **Import aliasing.** `createNextIntlPlugin()` з `@intlayer/next-intl/plugin` обертає `withIntlayer` і додає aliases у Webpack / Turbopack, щоб `next-intl`, `next-intl/server`, `next-intl/navigation` та `next-intl/middleware` були перенаправлені на `@intlayer/next-intl`. Жоден import у вашій codebase не перейменовується.
2. **JSON як джерело істини.** The `syncJSON` plugin читає ваш існуючий `messages/{locale}.json`, ділить його top-level ключі на один словник на кожний namespace, і записує переклади назад в ті самі файли, коли CLI або CMS оновлює їх. Робочий процес ваших перекладачів залишається незмінним.
3. **Call-site binding.** The Intlayer optimize pass (Babel or SWC) rewrites `useTranslations("about")` into a call that receives the `about` dictionary directly. The component no longer reaches a global message tree; it reaches its own content.

```tsx fileName="app/[locale]/about/page.tsx"
// Ваш код, без змін
import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="What the compiler emits (simplified)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslations } from "@intlayer/next-intl";

const AboutPage = () => {
  const t = useTranslations(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

Це переписування - причина, чому колонки розміру компонента та витоку сторінки нижче зміщуються: сторінка завантажує лише словники компонентів, які вона рендерує, і тільки на мові, яка подається.

## Що адаптер зберігає, ігнорує та не замінює

| `next-intl` API                                                      | З `@intlayer/next-intl`                                                                                                                            |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useTranslations("ns")` / `getTranslations("ns")`                    | ✅ Збережено. Прив'язано до словника `ns` під час збірки. Ключи набиралися на основі вашого вмісту.                                                |
| `getTranslations({ locale, namespace })`                             | ✅ Збережено                                                                                                                                       |
| `t("key", { name })`, `t.rich()`, `t.markup()`, `t.raw()`            | ✅ Збережено. ICU plurals, `select`, `selectordinal`, `#`, `{ts, date, long}` обробляються через ICU resolver Intlayer                             |
| `useLocale()` / `getLocale()` / `setRequestLocale()` / `setLocale`   | ✅ Збережено                                                                                                                                       |
| `useFormatter()`                                                     | ✅ Збережено. `dateTime`, `number`, `relativeTime`, `list`, `dateTimeRange` підтримують нативний `Intl`                                            |
| `NextIntlClientProvider`                                             | ✅ Збережено. Props `messages`, `timeZone` та `now` **приймаються, але ігноруються** (девелопер отримує попередження)                              |
| `getMessages()`                                                      | ✅ Збережено для сумісності; більше не потрібен                                                                                                    |
| `getRequestConfig()` у `src/i18n.ts`                                 | ⚠️ Не потрібен. Словники компілюються під час збірки; немає завантаження повідомлень для кожного запиту                                            |
| `defineRouting()`                                                    | ✅ Збережено. Пропущені поля (`locales`, `defaultLocale`, `localePrefix`) читаються з `intlayer.config.ts`                                         |
| `createNavigation()`, `Link`, `redirect`, `usePathname`, `useRouter` | ✅ Збережено. Перереалізовано на базі конфігурації маршрутизації Intlayer; аргумент `routing` приймається, але ігнорується                         |
| `pathnames` (локалізовані імена маршрутів)                           | ❌ Приймається для типізації, **не інтерпольовується**. Зберігайте звичайні імена маршрутів або перенесіть це відображення на Intlayer's `rewrite` |
| `createMiddleware()`                                                 | ✅ Збережено. Повертає проксі Intlayer; встановлює cookie `NEXT_LOCALE`, щоб `useLocale()` та ваш перемикач продовжували працювати                 |
| `NEXT_LOCALE` cookie                                                 | ✅ Читається за замовчуванням (якщо ви не налаштуєте `routing.storage` самостійно)                                                                 |
| Простий `useTranslations()` без namespace                            | ⚠️ Працює, але місце виклику не пов'язане: розв'язується через реєстр runtime. Передайте namespace для отримання переваг bundle                    |

## Бенчмарк

### Що було вимірено

Набір [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) створює **одну й ту саму програму** з кожною конфігурацією: **10 сторінок** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 локалей** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), однакові компоненти та однаковий вміст. Сторінки вимірюються у `en` та `fr`.

`next-intl` було створено з чотирма стратегіями завантаження, від наївної конфігурації (`messages/{locale}.json` завантажується повністю) до оптимальної (`one namespace per route + per-page pick()`). Адаптер був створений на **тих же компонентах, що й наівна конфігурація**, з тільки змінами в `next.config.ts` та `intlayer.config.ts`. Він не має варіанту "scoped": компілятор охоплює контент на рівні компонента, тому його рядки `static` та `dynamic` вже охоплені.

Для кожної збірки набір тестів записує:

- **Lib size**: gzip розмір порожнього компонента, який лише імпортує бібліотеку i18n. Фіксована вартість runtime.
- **Page JS**: gzip JavaScript, завантажений на сторінку, усереднений по всіх сторінках і локалях.
- **Locale leak %**: частка перекладених рядків, знайдених у завантаженому JS, які належать мові, яку користувач **не** переглядає.
- **Page leak %**: частка перекладених рядків, знайдених у завантаженому JS, які належать сторінці, на якій користувач **не** знаходиться.
- **Component avg**: середній розмір gzip кожного компонента, скомпільованого окремо. Показує, скільки i18n runtime та каталогу витягує один компонент.
- **E2E reactivity**: час від моменту вибору нової мови до оновлення `html[lang]` у DOM (Playwright, 5 ітерацій).
- **Hydration**: тривалість фази React hydration.

> Числа нижче отримані з запуску від **2026-09-12** з `next-intl` / `use-intl` 4.14.2 та `@intlayer/*` 9.5.1. Тестовий застосунок навмисне малий (кілька десятків рядків на кожну мову), тому відсотки витоку описують **закономірність**: вони зростають з вашим контентом, тоді як витрати runtime залишаються постійними.

### Результати на Next.js

Виберіть метрики та бібліотеки, які вас цікавлять:

<I18nBenchmark framework="nextjs" vertical/>

| Setup                     | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |   Hydration |
| ------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ----------: |
| **base** (no i18n)        | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |     11.8 ms |
| `next-intl`               | static         |       14.7 KB |         153.6 KB |        4.2% |     89.8% |            21.8 KB |        16.0 ms |     14.7 ms |
| `next-intl`               | dynamic        |       14.7 KB |         153.6 KB |        9.7% |     89.9% |            21.8 KB |        15.6 ms |     14.8 ms |
| `next-intl`               | scoped-static  |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            80.1 KB |        17.9 ms |     17.4 ms |
| `next-intl`               | scoped-dynamic |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            22.9 KB |        17.8 ms |     16.8 ms |
| **`@intlayer/next-intl`** | static         |    **8.0 KB** |     **147.5 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **14.5 ms** | **12.8 ms** |
| **`@intlayer/next-intl`** | dynamic        |    **8.0 KB** |     **148.7 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **11.7 ms** | **12.8 ms** |
| `next-intlayer` (native)  | static         |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             8.5 KB |        15.5 ms |     16.9 ms |
| `next-intlayer` (native)  | dynamic        |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             6.9 KB |        15.3 ms |     15.9 ms |

**Як це читати**

- **Ті самі компоненти, на 6 KB менше на сторінку.** Адаптер build наївної програми приходить до **147.5 KB**, менше ніж будь-яка конфігурація `next-intl`, включаючи повністю оптимізовану (153.6 KB). Сам runtime є різницею: 8.0 KB проти 14.7 KB, сплачується на кожній сторінці.
- **Витік коду йде до 0% без змін компонентів.** Наївне налаштування `next-intl` поставляє ~90% рядків іноземних сторінок на кожну сторінку. Досягнення 0% за допомогою `next-intl` означає налаштування `scoped-*`: один простір імен на маршрут і `pick(messages, [...])` на кожній сторінці. Адаптер досягає 0% з наївного коду, оскільки крок оптимізації прив'язує кожен `useTranslations("ns")` до свого словника.
- **Компоненти зменшуються в 2,7 разу.** Компонент, скомпільований окремо, в середньому становить **21,8 KB** з `next-intl` (він досягає провайдера та дерева повідомлень) і **8,1 KB** з адаптером. У налаштуванні `scoped-static` `next-intl` це число _зростає_ до 80 KB, оскільки файл простору імен кожного маршруту стає доступним зі сторінки, яка його вибирає.
- **Гідрація на 2 мс швидша** (12.8 vs 14.7 мс): немає об'єкта повідомлень для десеріалізації з RSC payload перед тим, як React може гідрувати.
- **Адаптер - це не native runtime.** `next-intlayer` займає **141.3 KB**, +0.3 KB понад базову програму, з 5.5 KB runtime. Адаптер несе поверхню API `next-intl` (`useFormatter`, `t.rich`, ICU resolver) поверх ядра Intlayer, звідси 8.0 KB і +6 KB за сторінку. Це міст, а не пункт призначення.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Повна таблиця, кожна бібліотека та стратегія у [звіті про бенчмарк Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/nextjs.md).

### Результати на TanStack Start (`use-intl`)

`use-intl` - це framework-агностичне ядро `next-intl`. Його адаптер `@intlayer/use-intl` слідує тому ж дизайну з Vite плагіном (`@intlayer/use-intl/plugin`).

| Налаштування             | Стратегія      | Розмір Lib (gz) | Page JS середньо (gz) | Витік локалі | Page витік | Component середньо (gz) | E2E реактивність |  Гідратація |
| ------------------------ | -------------- | --------------: | --------------------: | -----------: | ---------: | ----------------------: | ---------------: | ----------: |
| **base** (без i18n)      | -              |          0.0 KB |              111.0 KB |         0.0% |       0.0% |                  0.7 KB |           8.1 ms |     21.6 ms |
| `use-intl`               | static         |         14.1 KB |              179.8 KB |        50.0% |      89.8% |                 76.0 KB |           6.7 ms |     15.3 ms |
| `use-intl`               | dynamic        |         14.1 KB |              119.4 KB |         0.0% |      89.8% |                 75.9 KB |           7.0 ms |     15.4 ms |
| `use-intl`               | scoped-static  |         14.1 KB |              128.7 KB |         0.0% |       0.0% |                 87.1 KB |          20.9 ms |     24.8 ms |
| `use-intl`               | scoped-dynamic |         14.1 KB |              128.7 KB |         0.0% |       0.0% |                 87.1 KB |          13.3 ms |     25.9 ms |
| **`@intlayer/use-intl`** | static         |      **7.3 KB** |              135.8 KB |        49.7% |   **0.0%** |             **10.9 KB** |       **4.2 ms** | **10.5 ms** |
| **`@intlayer/use-intl`** | dynamic        |      **7.3 KB** |          **129.7 KB** |     **0.0%** |   **0.0%** |              **9.3 KB** |       **8.7 ms** |     16.1 ms |
| `intlayer` (native)      | static         |          5.0 KB |              125.8 KB |        50.0% |       0.0% |                  8.1 KB |           3.2 ms |     11.5 ms |
| `intlayer` (native)      | dynamic        |          5.0 KB |              118.6 KB |         0.0% |       0.0% |                  6.3 KB |           3.6 ms |     14.1 ms |

**Як читати це**

- **Байти на сторінку практично однакові з оптимізованим `use-intl`.** `@intlayer/use-intl` у режимі `dynamic` (129.7 KB) знаходиться в межах 1 KB від `use-intl`'s `scoped-dynamic` (128.7 KB) і на 10 KB _вище_ звичайного `dynamic` від `use-intl` (119.4 KB). Той звичайний рядок `dynamic` все ще витікає 90% рядків зі сторінок інших мов; кількість байтів низька, тому що тестовий додаток має малий обсяг вмісту. Адаптер 0% залишається постійним у міру зростання вмісту.
- **Компоненти мають розмір у 7-9 разів менший.** Компоненти `use-intl` мають середній розмір **76-87 KB** у кожній стратегії, оскільки `useTranslations` привʹязаний до цілого об'єкту message провайдера. Адаптер має середній розмір **9-11 KB**.
- **Переключення локалі працює швидше.** Оптимізовані налаштування `use-intl` потребують **13-21 мс** для оновлення `html[lang]`; адаптер потребує **4-9 мс**. Менше компонентів перерендерюється, і ніщо не переважається із дерева повідомлень.
- **`static` зберігає кожну локаль.** Рядок адаптера `static` показує витік локалі 49.7%, той же, що й у нативному Intlayer у режимі `static`: усі локалі bundled, але лише словники сторінки. Один рядок конфігурації (`importMode: 'dynamic'`) видаляє його.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Повна таблиця у [звіті про бенчмарк TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md).

## Чому змінюються цифри

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Ніщо в компоненті не змінилось, тому виграш повністю походить від того, до чого привʹязаний `useTranslations`.

**З `next-intl`**, binding це провайдер. `NextIntlClientProvider` отримує весь об'єкт `messages` для локалі; кожен `useTranslations("about")` читає з нього. Bundler бачить один компонент, що імпортує один hook, який читає один контекст, і не може знати, що використовується тільки гілка `about`. Маршрути нижче всі ділять один і той же об'єкт messages, тому колонка page-leak читає ~90%, доки ви самі не розділите файл, і зайве навантаження зростає за двома осями одночасно, сторінками та мовами:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

```bash
.
├── messages
│   ├── en.json                       # кожен namespace, кожна сторінка
│   └── fr.json
└── src
    ├── i18n.ts                       # getRequestConfig({ messages: await import(...) })
    ├── middleware.ts                 # createMiddleware(routing)
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider messages={messages}>
        └── about/page.tsx            # useTranslations("about")
```

**З `@intlayer/next-intl`**, привʼязка - це словник. `syncJSON` перетворює `messages/en.json` на один словник для кожного ключа верхнього рівня; компілятор визначає, який компонент викликає `useTranslations("about")`, і передає йому `about` безпосередньо, активною мовою, як імпорт, який bundler може розпізнати та розділити.

```bash
.
├── intlayer.config.ts                # syncJSON({ source: ({ locale }) => `./messages/${locale}.json` })
├── messages
│   ├── en.json                       # unchanged, still the source of truth
│   └── fr.json
├── .intlayer/                        # generated: one dictionary per namespace, per locale
└── src
    ├── middleware.ts                 # createMiddleware() тепер повертає proxy Intlayer
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider> (без props messages)
        └── about/page.tsx            # useTranslations("about")  ← без змін
```

`src/i18n.ts` та props `messages` зникають. Все інше залишається ідентичним.

## Міграція в три кроки

<Steps>
<Step number={1} title="Встановлення">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

Команда виявляє `next-intl` і встановлює `intlayer`, `next-intlayer`, `@intlayer/next-intl` та `@intlayer/sync-json-plugin`. Тримайте `next-intl` встановленим: це peer dependency адаптера і надає типи.

</Step>
<Step number={2} title="Вкажіть Intlayer на ваші повідомлення">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" об'єднує кожну локаль; "dynamic" завантажує активну на вимогу
    importMode: "dynamic",
  },
  plugins: [
    syncJSON({
      // ICU placeholders: {name}, {count, plural, one {# item} other {# items}}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

`messages/{locale}.json` залишається на місці. Кожен ключ верхнього рівня стає словником; `useTranslations("about")` відображається на словник `about`.

</Step>
<Step number={3} title="Обгорнути next.config.ts">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

`createNextIntlPlugin()` компонує `withIntlayer` (спостереження за контентом, компіляція словників, оптимізаційний прохід) та `next-intl` → `@intlayer/next-intl` aliases для Webpack та Turbopack. Збуйте, і цифри в таблицях вище будуть вашими.

</Step>
</Steps>

### Що ви можете видалити потім

| Файл / шаблон                                | Чому                                                                                                                 |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `getRequestConfig` в `src/i18n.ts`           | Немає завантаження повідомлень за запитом. Збережіть файл лише якщо він також експортує `createNavigation` помічники |
| `messages={...}` на `NextIntlClientProvider` | Адаптер читає скомпільовані результати; властивість ігнорується та логує попередження під час розробки               |
| `await getMessages()` у layouts              | З тієї ж причини                                                                                                     |
| Per-page `pick(messages, [...])`             | Компілятор виконує вибір для кожного компонента                                                                      |

### Що ви отримуєте крім зменшення розміру

- **Типізовані ключі.** `useTranslations("about")` типізована проти скомпільованого словника `about`. `t("does.not.exist")` - це помилка TypeScript, а не fallback під час виконання.
- **`npx intlayer test`** не проходить CI, коли локалі не вистачає ключа. **`npx intlayer fill`** перекладає відсутні за допомогою обраного провайдера (OpenAI, Anthropic, Mistral, Gemini...) використовуючи ваш власний ключ, і записує результат назад у `messages/{locale}.json`.
- **Visual Editor і CMS** працюють з одними й тими ж словниками, тому розробники, що не є розробниками, можуть редагувати `messages/fr.json` через UI і файл оновлюється.
- **Постійний перехід до `.content.ts`.** Будь-який компонент може перейти з `useTranslations("about")` на `useIntlayer("about")` з co-located файлом вмісту, один за одним. JSON і `.content.ts` словники співіснують і об'єднуються.

## Обмеження, які варто знати перед початком

<AccordionGroup>
<Accordion header="Конфігурація маршрутизації переноситься в intlayer.config.ts">

`createNavigation(routing)` та `createMiddleware(routing)` зберігають сигнатуру, але ігнорують аргумент: локалі, локаль за замовчуванням та стратегія префіксів надходять із конфігурації `routing` Intlayer. Якщо ви використовуєте локалізовані `pathnames` у `next-intl` (`/about` до `/a-propos`), адаптер їх не інтерполює; `routing.rewrite` в Intlayer покриває цей випадок, але це окрема зміна.

</Accordion>
<Accordion header="useTranslations() без простору імен не зв'язується">

Фазі оптимізації потрібен статичний простір імен, щоб знати, який словник імпортувати. Простий виклик без namespace все одно працює через реєстр рантайму, що посилається на кожен словник, що є саме тим витоком, який ви намагалися усунути. Передавайте простір імен.

</Accordion>
<Accordion header="Адаптер не є безкоштовним">

8.0 KB рантайму проти 5.5 KB для `next-intlayer`, і +6-7 KB на сторінку порівняно з нативною збіркою. Це плата за інтерфейс API `next-intl`. Коли кожен компонент перейде на `useIntlayer`, видаліть адаптер.

</Accordion>
<Accordion header="messages, timeZone та now у провайдері ігноруються">

Форматери базуються на нативному `Intl`, і лише локаль впливає на їх результат. Якщо для стабільної гідратації дат ви покладаєтеся на примусовий часовий пояс або фіксований `now`, обробляйте це у місці виклику. Див. [форматування дати, часу та чисел](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/date_time_number_formatting_locales.md).

</Accordion>
</AccordionGroup>

## Коли використовувати що?

<AccordionGroup>
<Accordion header="Залишайтеся на next-intl">

Ваш застосунок невеликий, розмір бандла вас не турбує, а команді зручно вручну керувати просторами імен і `pick()` для кожної сторінки.

</Accordion>
<Accordion header="Використовуйте @intlayer/next-intl">

Ви вже використовуєте `next-intl` сьогодні й бажаєте отримати переваги у розмірі бандла, відсутності витоків та швидкій гідратації, типізованих ключах та інструментах CLI / CMS без переписування коду. Це рекомендована точка входу для будь-якої існуючої кодової бази `next-intl`.

</Accordion>
<Accordion header="Перейдіть на нативний next-intlayer">

Для нових проєктів або коли адаптер виконав свою перехідну роль. Це найлегший із трьох варіантів (5.5 KB, +0.3 KB на сторінку), що відкриває синхронні серверні компоненти, файли `.content.ts` для кожного компонента та повний набір функцій. Почніть з [Intlayer з Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Чи справді код мого застосунку залишається недоторканим?">

У Next.js так для компонентів: збірка бенчмарку змінила лише `next.config.ts` та `intlayer.config.ts`. `getRequestConfig` у `src/i18n.ts`, проп `messages` у провайдері та виклики `pick()` стають мертвим кодом, який ви можете згодом видалити.

</Question>

<Question title="Що відбувається з повідомленнями ICU?">

Вони продовжують працювати. `t("key", { count })`, `t.rich()`, `t.markup()`, `select`, `selectordinal`, `#` та `{ts, date, long}` обробляються резолвером ICU в Intlayer. Див. [формат повідомлень ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/icu_message_format.md).

</Question>

<Question title="Чому адаптер важчий за нативний next-intlayer?">

Він несе API `next-intl` поверх ядра Intlayer: `useFormatter`, `t.rich`, резолвер ICU, хелпери навігації. Це 8.0 KB проти 5.5 KB і +6 KB на сторінку. Це міст, а не кінцева мета.

</Question>

<Question title="Чи можу я мігрувати компонент за компонентом?">

Так. Будь-який компонент може перейти з `useTranslations("about")` на `useIntlayer("about")` з розташованим поруч файлом `.content.ts`. Словники JSON та `.content.ts` співіснують і об'єднуються.

</Question>

<Question title="Чи працюють локалізовані шляхи (pathnames)?">

Не через `pathnames` у `next-intl`: адаптер приймає їх для типізації, але не інтерполює. Використовуйте натомість `routing.rewrite` від Intlayer.

</Question>

</FAQ>

## Пов'язані порівняння

Та сама серія адаптерів:

- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18next_vs_intlayer-i18next.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/lingui_vs_intlayer-lingui.md)
- [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/vue-i18n_vs_intlayer-vue-i18n.md)

Пряме порівняння бібліотек:

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/next-intl_vs_intlayer.md), той самий бенчмарк
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/next-i18next_vs_next-intl_vs_intlayer.md)
- [Is next-intl outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/is_next-intl_outdated.md)

Довідкова документація:

- [Compat adapter: next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/next-intl.md)
- [Посібник із міграції: з next-intl на Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_next-intl_to_intlayer.md)
- [Звіт про бенчмарк Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/nextjs.md) та [звіт про бенчмарк TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md)
- [Оптимізація бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md) та [компілятор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md)
- [Візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md) та [переклад за допомогою ШІ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/autoFill.md)

## Висновок

`@intlayer/next-intl` робить одне: змінює те, до чого привязується `useTranslations`, від provider'а, який містить кожне повідомлення, до dictionary, скомпільованого для цього компонента. На тій же Next.js додатку, що коштує **6 KB на сторінку**, **компоненти в 2.7x менші**, **0% витоку** та **2 ms гідратації**, перед тим, як хтось відкриє файл компонента. Navigation і middleware зберігають свій API поверх конфігу маршрутизації Intlayer, а нативний `next-intlayer` runtime залишається ще легшим.

Усі вихідні дані, тестові додатки та скрипти знаходяться в репозиторії [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Запустіть це самостійно.

Зверніться до документації ['Why Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md) для більш детальної інформації.

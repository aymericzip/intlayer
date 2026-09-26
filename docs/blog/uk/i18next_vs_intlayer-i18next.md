---
createdAt: 2026-09-13
updatedAt: 2026-09-22
priority: 8
title: "i18next проти @intlayer/i18next: Однаковий API, інший bundle"
description: "Що змінюється, коли додаток React або Next.js зберігає виклики i18next, react-i18next та next-i18next, але обслуговує їх через адаптери @intlayer/i18next. JavaScript на сторінку, розмір компонентів, витоки рядків та гідратація, виміряні на одному коді, а також те, що адаптери зберігають, ігнорують і не можуть замінити."
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - "@intlayer/i18next"
  - "@intlayer/react-i18next"
  - "@intlayer/next-i18next"
  - Intlayer
  - Адаптер сумісності
  - Міграція
  - Інтернаціоналізація
  - i18n
  - Бенчмарк
  - Розмір bundle
  - Блог
  - Next.js
  - React
slugs:
  - blog
  - i18next-vs-intlayer-i18next
author: aymericzip
---

# i18next проти @intlayer/i18next | Однаковий API, інший bundle

![i18next VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`@intlayer/i18next`, `@intlayer/react-i18next` та `@intlayer/next-i18next` - це адаптери сумісності. Вони надають API `i18next`, який ваш код уже використовує (`useTranslation`, `t()`, `<Trans>`, `i18n.changeLanguage()`, `getFixedT`, `serverSideTranslations`...) і постачають його зі словників, скомпільованих Intlayer. Компоненти не змінюються. Змінюється середовище виконання (runtime) під ними.

У цій статті вимірюється така заміна на одному й тому ж додатку Next.js, зібраному один раз із `next-i18next` і один раз із `@intlayer/next-i18next`. Показники отримані з [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Для порівняння `i18next` та Intlayer як бібліотек прочитайте [i18next проти Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18next_vs_intlayer.md). Ця стаття присвячена тому, що саме змінює адаптер, якщо ви зберігаєте свій код без змін.

<TOC/>

> **tl;dr**: На тому ж додатку Next.js заміна `next-i18next` на `@intlayer/next-i18next` зменшила обсяг JavaScript на сторінку з **218.5 KB до 150.7 KB** gzip (базова конфігурація) і перевершила повністю оптимізовану конфігурацію `next-i18next` (163.4 KB) на **12.7 KB**. Середній компонент зменшився з **78.5 KB до 9.7 KB**, витік рядків з інших сторінок скоротився з **~90% до 0%**, гідратація прискорилася з **15.6 ms до 11.3 ms**, а runtime зменшився з **19.7 KB до 9.4 KB**. Жоден компонент не редагувався; змінено лише один файл провайдера. Плагіни `i18next` (бекенди, детектори мови) приймаються, але нічого не роблять: під час виконання більше нічого завантажувати або визначати.

## Що таке `@intlayer/i18next`

`i18next` - це середовище виконання (runtime). `i18n.init({ resources })` або плагін бекенда завантажує `locales/{lng}/{ns}.json` у глобальний екземпляр; `useTranslation("about")` підписує компонент на нього; `t("title")` шукає ключ під час рендерингу. Простори імен (namespaces), ліниве завантаження (lazy loading), списки просторів імен для кожної сторінки та типобезпека залишаються вашою турботою щодо налаштування та підтримки.

Адаптери зберігають API і замінюють екземпляр:

1. **Аліаси імпорту.** `createNextI18nPlugin()` з `@intlayer/next-i18next/plugin` (або `withI18next`) огортає `withIntlayer` та додає аліаси Webpack / Turbopack, завдяки чому `next-i18next`, `react-i18next` та `i18next` резолвляться до відповідників `@intlayer/*`. У Vite `reactI18nextVitePlugin()` з `@intlayer/react-i18next/plugin` робить те саме. Жоден імпорт не перейменовується.
2. **JSON як єдине джерело правди.** Плагін `syncJSON` зчитує наявні файли `locales/{lng}/{ns}.json` з `format: "i18next"` (завдяки чому `{{name}}`, вкладеність `$t()`, суфікси `_one` / `_other` і контексти парсяться коректно) і записує переклади назад, коли CLI або CMS оновлюють їх.
3. **Зв'язування у місці виклику (call-site binding).** Етап оптимізації Intlayer переписує `useTranslation("about")` у виклик, який отримує словник `about` напряму, в активній локалі. Компонент більше не звертається до глобального сховища.

```tsx fileName="components/About.tsx"
// Ваш код, без змін
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="Що генерує компілятор (спрощено)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslation } from "@intlayer/react-i18next";

const About = () => {
  const { t } = useTranslation(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

Саме це переписування визначає показники у стовпчиках розміру компонентів та витоку сторінок нижче.

## Що адаптери зберігають, ігнорують і не замінюють

| API `i18next`                                                                   | З `@intlayer/*`                                                                                                  |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `useTranslation("ns")`, `useTranslation("ns", { keyPrefix })`                   | ✅ Збережено. Прив'язано до словника `ns` під час збірки; ключі типізовані відповідно до контенту                |
| `t("key", { name })`, `{{interpolation}}`, вкладеність `$t(key)`                | ✅ Збережено                                                                                                     |
| Множина `key_one` / `key_other`, контекст `key_male`, `returnObjects`           | ✅ Збережено. Множина обчислюється за допомогою `Intl.PluralRules`                                               |
| `<Trans>` з `components`, нумеровані теги `<1>...</1>`, `values`                | ✅ Збережено                                                                                                     |
| `withTranslation`, `Translation`, `I18nContext`                                 | ✅ Збережено                                                                                                     |
| `i18n.changeLanguage()`, `i18n.language`, `i18n.dir()`, `on("languageChanged")` | ✅ Збережено. `changeLanguage` керує локаллю Intlayer                                                            |
| `getFixedT(lng, ns, keyPrefix)`, `i18n.exists()`, `hasLoadedNamespace()`        | ✅ Збережено                                                                                                     |
| `i18n.use(Backend).use(LanguageDetector).init({...})`                           | ⚠️ `use()` викликає `init` плагіна і повертає результат; бекендам і детекторам нічого завантажувати чи визначати |
| `init({ resources })`, `addResourceBundle()`                                    | ⚠️ `resources` **ігнорується** з попередженням dev; видаліть імпорти JSON, щоб отримати оптимізацію bundle       |
| `I18nextProvider i18n={i18n}`                                                   | ⚠️ Рендерить `IntlayerProvider`; проп `i18n` ігнорується. В App Router передавайте locale (див. нижче)           |
| `serverSideTranslations(locale, ["common"])` (next-i18next)                     | ⚠️ Повертає очікувану структуру і нічого не завантажує. Безпечно залишити або видалити                           |
| `appWithTranslation(App)` (next-i18next)                                        | ✅ Збережено                                                                                                     |
| `next-i18next.config.js`                                                        | ⚠️ Не зчитується. Локалі надходять з `intlayer.config.ts`                                                        |
| Простий `useTranslation()` без простору імен                                    | ✅ Працює зі словником `translation` для всього файлу (`splitKeys: false`)                                       |

## Бенчмарк

### Що вимірювалося

Набір тестів [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) збирає **один і той самий додаток** з кожною конфігурацією: **10 сторінок** (головна, про нас, блог, кар'єра, контакти, FAQ, ціни, продукти, налаштування, команда), **10 локалей** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), однакові компоненти й однаковий вміст. Сторінки вимірюються в `en` та `fr`.

`next-i18next` було зібрано за чотирма стратегіями завантаження: від імпорту JSON кожної локалі в `resources` (`static`) до одного простору імен на маршрут з лінивим завантаженням через бекенд (`scoped-dynamic`). Адаптер зібрано на **тих самих компонентах, що й базову конфігурацію**, зі зміненими `next.config.ts`, `intlayer.config.ts` та файлом провайдера. Він не має варіанту "scoped": компілятор самостійно обмежує контент для кожного компонента.

Для кожної збірки фіксуються такі показники:

- **Lib size**: розмір gzip порожнього компонента, який імпортує лише бібліотеку i18n.
- **Page JS**: обсяг JavaScript gzip, завантажений на сторінку, усереднений для всіх сторінок і локалей.
- **Locale leak %**: частка перекладених рядків у завантаженому JS, що належать локалі, яку користувач **не** переглядає.
- **Page leak %**: частка перекладених рядків у завантаженому JS, що належать сторінці, на якій користувач **не** перебуває.
- **Component avg**: середній розмір gzip кожного компонента, скомпільованого окремо.
- **E2E reactivity**: реальний час між вибором нової локалі та оновленням `html[lang]` у DOM (Playwright, 5 ітерацій).
- **Hydration**: тривалість фази гідратації React.

> Наведені нижче дані отримані під час тестування від **2026-09-12** з `next-i18next` 16.3.0 (`react-i18next` 17.0.13, `i18next` 26.4.2) та `@intlayer/next-i18next` 9.5.1. Тестовий додаток навмисно невеликий (кілька десятків рядків на локаль), тому відсотки витоку показують **закономірність**: вони зростають разом із вашим контентом, тоді як накладні витрати runtime залишаються фіксованими.

### Результати на Next.js

Виберіть метрики та бібліотеки, які вас цікавлять:

<I18nBenchmark framework="nextjs" vertical/>

| Конфігурація                 | Стратегія      | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |   Hydration |
| ---------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ----------: |
| **base** (без i18n)          | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |     11.8 ms |
| `next-i18next`               | static         |       19.7 KB |         218.5 KB |        0.0% |     89.8% |            78.5 KB |        16.4 ms |     15.6 ms |
| `next-i18next`               | dynamic        |       19.7 KB |         169.5 KB |       50.0% |     89.8% |            26.1 KB |        15.4 ms |     27.7 ms |
| `next-i18next`               | scoped-static  |       19.7 KB |         220.1 KB |        0.0% |     89.8% |            78.9 KB |        16.4 ms |     14.7 ms |
| `next-i18next`               | scoped-dynamic |       19.7 KB |         163.4 KB |        0.0% |      0.0% |            27.1 KB |        15.9 ms |     15.1 ms |
| **`@intlayer/next-i18next`** | static         |    **9.4 KB** |     **150.7 KB** |    **0.0%** |  **0.0%** |         **9.7 KB** |    **10.7 ms** | **11.3 ms** |
| **`@intlayer/next-i18next`** | dynamic        |    **9.4 KB** |     **150.7 KB** |    **0.0%** |  **0.0%** |         **9.7 KB** |    **11.9 ms** | **10.6 ms** |
| `next-intlayer` (native)     | static         |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             8.5 KB |        15.5 ms |     16.9 ms |
| `next-intlayer` (native)     | dynamic        |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             6.9 KB |        15.3 ms |     15.9 ms |

**Як інтерпретувати результати**

- **На 68 KB менше на сторінку порівняно з базовою конфігурацією.** `resources: { en, fr, ... }` передає кожну локаль і кожен простір імен на кожній сторінці: **218.5 KB**. Збірка адаптера для тих самих компонентів становить **150.7 KB**. Вона також перевершує найкращу конфігурацію `next-i18next` (163.4 KB, один простір імен на маршрут, ліниве завантаження) на 12.7 KB, оскільки лише runtime `i18next` важить 19.7 KB проти 9.4 KB.
- **Витік знижується до 0% без жодних змін у компонентах.** Кожна конфігурація `next-i18next`, крім повністю ізольованої (scoped), передає ~90% рядків сторонніх сторінок. Рядок `dynamic` виглядає гірше, ніж здається: він не зменшує витік сторінок і додає **50% витоку локалей**, оскільки бекенд для кожної локалі все одно підтягує весь простір імен `translation`. Адаптер досягає 0% / 0% безпосередньо з вихідного коду.
- **Компоненти: у 8 разів менші.** Компонент з `useTranslation()`, скомпільований ізольовано, важить у середньому **78.5 KB** із вбудованими `resources` та **26-27 KB** з бекендом, оскільки `t` прив'язаний до глобального сховища. З адаптером він важить у середньому **9.7 KB**.
- **Гідратація та перемикання відбуваються швидше.** Гідратація скорочується з 15.6 ms до **11.3 ms** (та з 27.7 ms у конфігурації `dynamic`, де запит до бекенда перебуває на критичному шляху). Перемикання локалі прискорюється з 15-16 ms до **11-12 ms**.
- **Адаптер - це не нативний runtime.** `next-intlayer` займає **141.3 KB**, лише +0.3 KB над базовим додатком. Адаптер несе поверхню API `i18next` (діалект інтерполяції, суфікси множини та контексту, парсинг тегів `<Trans>`) поверх ядра Intlayer: 9.4 KB та +9.4 KB на сторінку проти нативного варіанту. Це міст для переходу, а не кінцева точка.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Повна таблиця, кожна бібліотека та кожна стратегія, у [звіті про бенчмарк Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/nextjs.md).

> Адаптер `react-i18next` на Vite / TanStack Start не брав участі у цьому тестуванні. Базові показники `react-i18next` на TanStack Start наведено у статті [i18next проти Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18next_vs_intlayer.md): 127-184 KB на сторінку та перемикання локалі за 123-185 ms за наявності лінивого бекенда.

## Чому змінюються цифри

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

У каталозі `components/` нічого не змінилося, тож оптимізація пов'язана з тим, до чого саме прив'язаний `useTranslation`.

**З `i18next`** прив'язка здійснюється до глобального екземпляра. Усе, що було в нього завантажено (усі локалі в `static`, увесь простір імен активної локалі в `dynamic`), доступне кожному компоненту, що викликає `useTranslation()`. Бандлер не може розбити бандл нижче за вміст екземпляра, а runtime не може знати наперед, які ключі знадобляться компоненту.

```bash
.
├── next-i18next.config.js
├── public/locales
│   ├── en/translation.json           # рядки для кожної сторінки
│   └── fr/translation.json
├── i18n/i18n.ts                      # i18n.use(initReactI18next).init({ resources })
└── components
    ├── AppProviders.tsx              # <I18nextProvider i18n={i18n}>
    └── About.tsx                     # useTranslation(); t("about.title")
```

Все, що містить екземпляр, надсилається на кожну сторінку, і витрати зростають за двома осями, сторінки та локалі:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

**З `@intlayer/next-i18next`** прив'язка здійснюється до словника. `syncJSON` перетворює кожен файл простору імен на словник; оптимізаційний етап передає компоненту саме той словник, який йому потрібен, у вигляді імпорту, що бандлер може відстежити й розділити за сторінками та локалями.

```bash
.
├── intlayer.config.ts                # syncJSON({ format: "i18next", source: ... })
├── public/locales
│   ├── en/translation.json           # без змін, залишається джерелом правди
│   └── fr/translation.json
├── .intlayer/                        # згенеровано: один словник на простір імен для кожної локалі
└── components
    ├── AppProviders.tsx              # <IntlayerClientProvider locale={locale}>
    └── About.tsx                     # useTranslation(); t("about.title")  ← без змін
```

Файл `i18n/i18n.ts` та його імпорт `resources` стають мертвим кодом. Звідси й беруться ті самі 68 KB.

## Міграція у три кроки

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

Команда виявляє `i18next` / `react-i18next` / `next-i18next`, встановлює `intlayer`, пакет відповідного фреймворку (`next-intlayer` або `react-intlayer`), сумісний адаптер `@intlayer/*` та `@intlayer/sync-json-plugin`, а також формує базовий `intlayer.config.ts`. Залиште оригінальні пакети встановленими: вони є peer dependencies та постачають типи TypeScript.

</Step>
<Step number={2} title="Вкажіть Intlayer на файли локалей">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
    format: "i18next",
  },
  plugins: [
    syncJSON({
      // Діалект i18next: {{name}}, $t(key), key_one / key_other, key_male
      format: "i18next",
      // Один файл на простір імен: `useTranslation("about")` → about.json
      source: ({ locale, key }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

Якщо у вас є один файл `translation.json` на локаль (простір імен за замовчуванням в i18next), установіть `splitKeys: false`, щоб увесь файл залишався єдиним словником і звичайний виклик `useTranslation()` продовжував коректно працювати.

</Step>
<Step number={3} title="Додайте плагін">

<Tabs>
<Tab label="Next.js">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { withI18next } from "@intlayer/next-i18next/plugin";

const nextConfig: NextConfig = {};

export default withI18next(nextConfig);
```

В App Router клієнтські компоненти отримують свою локаль із сегмента `[locale]`. Компонент `I18nextProvider` адаптера не приймає проп locale, тому замініть його один раз у файлі провайдера:

```tsx fileName="components/AppProviders.tsx"
"use client";

import { IntlayerClientProvider } from "next-intlayer";
import type { LocalesValues } from "intlayer";

export const AppProviders = ({
  locale,
  children,
}: {
  locale: LocalesValues;
  children: React.ReactNode;
}) => (
  <IntlayerClientProvider locale={locale}>{children}</IntlayerClientProvider>
);
```

Кожен компонент нижче в дереві продовжує викликати `useTranslation()`.

</Tab>
<Tab label="Vite / TanStack Start">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

`reactI18nextVitePlugin()` огортає `vite-intlayer` та створює аліаси для `react-i18next` і `i18next`. Для проєктів без React плагін `i18nextVitePlugin()` з `@intlayer/i18next/plugin` створює аліас тільки для `i18next`.

</Tab>
</Tabs>

</Step>
</Steps>

### Що можна видалити після цього

| Файл / патерн                                          | Причина                                                                                |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| `resources: { en, fr, ... }` та імпорти JSON           | Ігноруються адаптером. Саме тут крилися зайві 68 KB                                    |
| `i18next-http-backend`, `i18next-resources-to-backend` | Більше нічого не потрібно завантажувати під час виконання                              |
| `i18next-browser-languagedetector`                     | Визначення локалі виконується маршрутизацією Intlayer (префікс URL, cookie, заголовок) |
| `serverSideTranslations()` у `getStaticProps`          | Повертає порожню структуру; безпечно, але більше непотрібно                            |
| `next-i18next.config.js`                               | Не зчитується. Локалі налаштовуються в `intlayer.config.ts`                            |
| Списки `ns: [...]` для кожної сторінки                 | Компілятор самостійно призначає простори імен для кожного компонента                   |

### Що ви отримуєте, крім зекономлених байтів

- **Типізовані ключі.** `useTranslation("about")` строго типізується на основі скомпільованого словника `about`; `t("does.not.exist")` спричинить помилку TypeScript замість повернення рядка ключа.
- **`npx intlayer test`** завершує перевірку помилкою в CI, якщо відсутній ключ у будь-якій локалі. **`npx intlayer fill`** перекладає відсутні ключі за допомогою вашого API-ключа постачальника (OpenAI, Anthropic, Mistral, Gemini...) та зберігає їх назад у `locales/{lng}/{ns}.json`.
- **Візуальний редактор і CMS** працюють із тими самими файлами JSON, тому перекладачі можуть редагувати контент через інтерфейс користувача, а файли оновлюються автоматично.
- **Поступовий перехід на `.content.ts`.** Будь-який компонент можна перевести з `useTranslation("about")` на `useIntlayer("about")` із супутнім файлом контенту. Словники JSON та `.content.ts` можуть мирно співіснувати.

## Обмеження, які слід врахувати перед початком

<AccordionGroup>
<Accordion header="Бекенди та детектори неактивні">

`i18n.use(HttpBackend)` викликає init плагіна і більше нічого. Якщо ваш додаток покладався на отримання перекладів з CMS під час виконання, цей процес більше не працює; використовуйте [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md) або команди `intlayer pull` / `push`. Визначення локалі стає конфігурацією маршрутизації Intlayer (префікс URL, cookie, заголовок).

</Accordion>
<Accordion header="resources ігнорується, а не об'єднується">

На відміну від деяких інших адаптерів, `@intlayer/i18next` не використовує вбудовані `resources` як резервний варіант. Кожен ключ повинен існувати в синхронізованих словниках, що перевіряє `intlayer test`.

</Accordion>
<Accordion header="App Router вимагає редагування провайдера">

Один файл, показаний вище. Pages Router з `appWithTranslation` не вимагає жодних змін.

</Accordion>
<Accordion header="next-i18next.config.js не читається">

`localePath`, `fallbackLng`, `reloadOnPrerender` та аналоги не мають еквівалентів; локалі та резервні варіанти надходять з `intlayer.config.ts`.

</Accordion>
<Accordion header="Адаптер не безкоштовний">

9.4 КБ рантайму та +9.4 КБ на сторінку порівняно з `next-intlayer`. Як тільки кожен компонент перейде на `useIntlayer`, видаліть його.

</Accordion>
</AccordionGroup>

## Коли що використовувати?

<AccordionGroup>
<Accordion header="Залишитися на i18next">

Ваш додаток залежить від бекендів часу виконання (переклади, що надаються CMS під час запиту), від екосистеми плагінів або від платформи без React, яку адаптери не підтримують.

</Accordion>
<Accordion header="Використовувати @intlayer/*">

Ви використовуєте `react-i18next` / `next-i18next` і хочете отримати 68 КБ економії, у 8 разів менші компоненти, 0% витоків, типізовані ключі та перевірки CI без переписування коду. Це відправна точка для існуючої кодової бази `i18next`.

</Accordion>
<Accordion header="Перейти на нативний (next-intlayer / react-intlayer)">

Для нових проєктів або коли адаптер виконав своє завдання. Він має найлегший рантайм (5.5 КБ, +0.3 КБ на сторінку) і відкриває доступ до синхронних Server Components та файлів `.content.ts` для кожного компонента. Почніть з [Intlayer з Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md) або [з Vite та React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+react.md).

</Accordion>
</AccordionGroup>

## Часті запитання

<FAQ>

<Question title="Звідки беруться 68 КБ?">

З `resources: { en, fr, ... }`. Стандартне налаштування `next-i18next` імпортує JSON кожної локалі в `init()`, тому кожна сторінка містить кожен простір імен на кожній мові: **218.5 КБ** на сторінку. Адаптер ніколи не включає цей блок повністю; він передає кожному компоненту лише названий словник на активній мові.

</Question>

<Question title="Чи продовжують працювати мої компоненти <Trans>?">

Так, з `components`, нумерованими тегами `<1>...</1>` та `values`. Також підтримуються `{{interpolation}}`, вкладеність `$t(key)`, форми множини `key_one` / `key_other` (обчислювані за допомогою `Intl.PluralRules`), суфікси контексту та `returnObjects`.

</Question>

<Question title="Що робити, якщо я використовую один translation.json для кожної локалі?">

Встановіть `splitKeys: false` у плагіні `syncJSON`. Весь файл залишається одним словником, і звичайний виклик `useTranslation()` продовжує розпізнаватися відносно нього.

</Question>

<Question title="Це те саме, що й міграція на Intlayer?">

Ні, це міст. Адаптер зберігає API `i18next` і потребує 9.4 КБ рантайму; нативний `next-intlayer` коштує 5.5 КБ і додає синхронні Server Components та файли `.content.ts` поруч із компонентами. Ви можете мігрувати покомпонентно, оскільки словники JSON та `.content.ts` співіснують.

</Question>

<Question title="Чи можуть перекладачі продовжувати працювати так, як вони звикли?">

Так. `locales/{lng}/{ns}.json` залишається джерелом правди: `syncJSON` зчитує його з діалектом i18next і записує переклади назад при оновленні через CLI або CMS.

</Question>

</FAQ>

## Схожі порівняння

Та ж серія адаптерів:

- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/next-intl_vs_intlayer-next-intl.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/lingui_vs_intlayer-lingui.md)
- [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/vue-i18n_vs_intlayer-vue-i18n.md)

Пряме порівняння бібліотек:

- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18next_vs_intlayer.md), same benchmark
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/react-i18next_vs_react-intl_vs_intlayer.md)
- [Is i18next outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/is_i18next_outdated.md)

Довідкова документація:

- Compat adapters: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/i18next.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/next-i18next.md)
- Migration guides: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_i18next_to_intlayer.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_react-i18next_to_intlayer.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_next-i18next_to_intlayer.md)
- [Next.js benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/nextjs.md) and [TanStack Start benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md)
- [Bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md) and [the Intlayer compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md)
- [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md) and [AI translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/autoFill.md)

## Висновок

`i18next` - найважчий runtime у цьому бенчмарку, і адаптери усувають більшу частину цього тягаря, не вимагаючи відмовлятися від знайомого API. На одному й тому ж додатку Next.js ви отримуєте **на 68 KB менше на кожну сторінку**, ніж у базовому налаштуванні, **на 12.7 KB менше**, ніж у найкращій оптимізованій вручну версії, **у 8 разів менші компоненти**, **0% витоків** та **на 4 ms швидшу гідратацію** - ціною одного конфігураційного файлу, одного рядка плагіна та налаштування одного провайдера. Бекенди та детектори стають безпечними no-op, `resources` ігнорується замість об'єднання, а нативний runtime `next-intlayer` залишається ще на 9 KB легшим.

Усі необроблені дані, тестові додатки та скрипти доступні у [репозиторії Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Запустіть і перевірте самі.

Докладніше дивіться в розділі ['Чому Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md).

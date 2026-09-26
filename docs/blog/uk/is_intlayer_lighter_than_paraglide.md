---
createdAt: 2026-09-23
updatedAt: 2026-09-23
priority: 8
title: Чи легший Intlayer за Paraglide?
description: Paraglide виглядає практично безкоштовним у бенчмарках i18n, оскільки його код генерується безпосередньо у ваш репозиторій. Розбираємося, куди насправді дівається ця вага, чому зчитування локалі для кожного вузла знижує продуктивність і як динамічне завантаження Intlayer передає одну локаль замість усіх.
keywords:
  - Paraglide
  - Intlayer
  - Інтернаціоналізація
  - i18n
  - Bundle size
  - Tree shaking
  - Benchmark
  - Blog
slugs:
  - blog
  - is-intlayer-lighter-than-paraglide
author: aymericzip
---

# Чи легший Intlayer за Paraglide?

Так.

`Paraglide` має чудову репутацію найлегшого рішення для i18n, і на перший погляд [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md) це підтверджує: розмір його бібліотеки близький до нуля. Проте нульовий розмір бібліотеки зовсім не означає нуль переданих байтів. Це лише вказує на те, що байти знаходяться там, куди ця метрика не заглядає.

<TOC/>

## Ключові висновки

**Розмір бібліотеки прихований, а не усунутий:**

Paraglide генерує свій runtime та функції повідомлень безпосередньо у вашу кодову базу. Цей код відправляється в браузер, але враховується як _ваш_ код, а не код бібліотеки.

**Відсутність провайдера - це не безкоштовний виграш:**

Кожен виклик `m.my_key()` самостійно визначає локаль, зчитуючи cookie або сховище для кожного відрендереного вузла, замість того щоб прочитати її один раз із контексту.

**Немає динамічного завантаження:**

Paraglide імпортує всі локалі повідомлення в клієнтський бандл. Intlayer із параметром `importMode: 'dynamic'` або `'fetch'` завантажує лише ту локаль, яка зараз відображається.

**Tree shaking не гарантується:**

У деяких наших тестах заявлений Paraglide tree shaking не спрацював. Обов'язково перевірте власний бандл.

## Куди дівається вага Paraglide?

У звітах бенчмарків метрика «розмір бібліотеки» вимірює провайдер і хуки кожної бібліотеки i18n у порожньому компоненті, до додавання будь-якого контенту.

| Бібліотека (TanStack Start)   | Розмір ліби (gz) | Розмір ліби (min) |
| ----------------------------- | ---------------- | ----------------- |
| `@inlang/paraglide-js@2.15.1` | 1.8 KB           | 4.5 KB            |
| `react-intlayer@9.5.1`        | 5.0 KB           | 15.2 KB           |

Якщо розглядати ці цифри окремо, Paraglide виграє. Але Paraglide - це компілятор: він читає ваші файли `messages/*.json` і записує папку `paraglide/` у ваш репозиторій. Вона містить `runtime.js` (визначення локалі, стратегії cookie та сховища, локалізація URL) і по одній функції JavaScript на кожне повідомлення.

```bash
src/paraglide/
├── runtime.js      # визначення локалі, стратегії, допоміжні інструменти URL
├── server.js
├── messages.js     # реекспорт усіх повідомлень
└── messages/
    ├── _index.js
    ├── en.js
    └── fr.js
```

Оскільки цей код розташований у вашій папці `src/` і імпортується за відносним шляхом, бандлер зараховує його до вашого додатку, а не до пакетів у `node_modules`. Колонка розміру бібліотеки не показує майже нічого, тоді як та сама логіка все одно передається в бандлі вашої сторінки.

Генерація коду сама по собі не є поганою ідеєю: згенерований runtime містить лише ту логіку, яка потрібна вашій конфігурації (стратегія префіксів, cookie проти local storage тощо). Intlayer досягає того ж результату інакше: впроваджуючи змінні середовища під час збірки, завдяки чому бандлер відкидає гілки, які ваша конфігурація не використовує. Обидва підходи виявляються в 3–10 разів легшими за `i18next` або `next-intl`.

Тому справедливе порівняння полягає не в розмірі бібліотеки. Це **обсяг JavaScript, який фактично передається на сторінку**.

## Виміряна вага сторінки

Додаток TanStack Start, 10 сторінок, виміри на маршрутах `en` та `fr`, стиснення gzip:

| Конфігурація                       | Сер. JS стор (gz) | Понад базу  | Витік локалі | Витік інших сторінок |
| ---------------------------------- | ----------------- | ----------- | ------------ | -------------------- |
| База (без i18n)                    | 111.0 KB          | -           | 0.0%         | 0.0%                 |
| `paraglide` (будь-яка стратегія)   | 125.1 KB          | +14.1 KB    | 49.7%        | 0.0%                 |
| `intlayer` (`importMode: static`)  | 125.8 KB          | +14.8 KB    | 50.0%        | 0.0%                 |
| `intlayer` (`importMode: dynamic`) | **118.6 KB**      | **+7.6 KB** | **0.0%**     | **0.0%**             |

Next.js 16 App Router, той самий додаток:

| Конфігурація     | Сер. JS стор (gz) | Понад базу  |
| ---------------- | ----------------- | ----------- |
| База (без i18n)  | 141.0 KB          | -           |
| `paraglide-next` | 155.3 KB          | +14.3 KB    |
| `next-intlayer`  | **141.3 KB**      | **+0.3 KB** |

<I18nBenchmark framework="tanstack" vertical/>

> Повні дані наведено у [звіті бенчмарку TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md) та [звіті бенчмарку Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/nextjs.md). Кожен бандл можна детально оглянути в [репозиторії бенчмарку](https://github.com/intlayer-org/benchmark-i18n).

Два висновки стають очевидними:

- У режимі `static` Intlayer передає практично той самий обсяг контенту, що й Paraglide (125.8 KB проти 125.1 KB). Це природно: обидва містять усі локалі повідомлень, які використовує сторінка.
- Paraglide залишається на рівні 125.1 KB за будь-якої стратегії, оскільки не має динамічного режиму. Кожен рядок у таблиці вище відповідає статичному варіанту.

## Відсутність Provider: ідея, яка здається гарною лише зовні

Paraglide не потребує провайдера. Ви просто імпортуєте повідомлення та викликаєте його:

```tsx fileName="Hero.tsx"
import { m } from "../paraglide/messages.js";

export const Hero = () => (
  <section>
    <h1>{m.hero_title()}</h1>
    <p>{m.hero_description()}</p>
    <button>{m.hero_cta()}</button>
  </section>
);
```

Жодного контексту, жодних обгорток, жодних хуків. Здається простішим. Але інформацію про локаль усе одно потрібно звідкись отримувати. Кожна згенерована функція повідомлення виглядає приблизно так (спрощено):

```js fileName="paraglide/messages/_index.js"
export const hero_title = (inputs = {}, options = {}) => {
  const locale = options.locale ?? getLocale(); // обчислюється під час кожного виклику

  if (locale === "en") return en.hero_title(inputs);
  if (locale === "fr") return fr.hero_title(inputs);
  // ...по одній гілці на кожну локаль
};
```

А `getLocale()` проходить по всіх налаштованих стратегіях (cookie, local storage, URL, базова локаль), щоб знайти поточну мову. Отже, кожен відрендерений текстовий вузол (`<>{m.my_key()}</>`) виконує власне визначення локалі, включно зі зчитуванням `document.cookie` в браузері. Сторінка з 200 перекладеними рядками визначає локаль 200 разів за одне рендерення, і повторює це під час кожного повторного рендерення.

Бібліотека з провайдером зчитує локаль **один раз**, зберігає її в контексті (або сигналі, або сторі), і кожен вузол читає значення, яке вже присутнє в пам'яті. Провайдер коштує всього кілька сотень байтів. Відмова від нього навантажує процесор під час кожного рендерення, що чітко видно в бенчмарках: час завантаження сторінки та перемикання мови в Paraglide стабільно поступаються Intlayer на TanStack Start (22.1 мс проти 14.6 мс при завантаженні сторінки, 4.3 мс проти 3.2 мс у реактивності E2E).

## Досвід розробника (DX)

Джерелом правди для Paraglide є JSON, але розробник ніколи не імпортує файли JSON безпосередньо. Ви імпортуєте згенерований файл `.js`:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "hero_title": "Ship your app in every language"
}
```

```json fileName="messages/uk.json"
{
  "hero_title": "Публікуйте свій застосунок усіма мовами"
}
```

```tsx fileName="Hero.tsx"
// Існує лише після перегенерації компілятором із файлу JSON
import { m } from "../paraglide/messages.js";

export const Hero = () => <h1>{m.hero_title()}</h1>;
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      uk: "Публікуйте свій застосунок усіма мовами",
      en: "Ship your app in every language",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
```

  </Tab>
</Tabs>

Такий робочий процес створює труднощі:

- Будь-яка зміна у файлі JSON вимагає перегенерації, перш ніж імпорт спрацює або оновляться типи.
- Згенеровану папку `paraglide/` доводиться або фіксувати в git (що призводить до конфліктів злиття у згенерованих файлах під час кожного PR зі зміною тексту), або ігнорувати (що вимагає кроку генерації перед кожною перевіркою типів, тестом і завданням CI).
- Кожен рядок стає викликом функції. Константи перетворюються на `m.key()` всюди, навіть там, де цілком вистачило б звичайного статичного значення.

## Tree Shaking: перевірте свій бандл

Головна обіцянка Paraglide полягає в тому, що невикористані повідомлення видаляються за допомогою tree shaking, оскільки кожне повідомлення є окремим експортом. У бенчмарку Svelte + Vite це працює саме так, як заявлено.

В інших середовищах цього не сталося. У наших тестах на [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/nextjs.md) сторінки Paraglide важать на 14 KB більше за базовий додаток, тоді як `next-intlayer` додає лише 0.3 KB. Попередні виміри на TanStack Start також показали, що повідомлення з інших сторінок потрапляли в бандл поточного маршруту.

Tree shaking залежить від вашого бандлера (Turbopack, Rolldown, Rollup), способу імпорту повідомлень (`import { m }` проти `import * as m`) та аналізу побічних ефектів. Якщо ви обираєте Paraglide через компактність, відкрийте візуалізатор бандла та перевірте, чи працює це у вашому додатку.

## Відсутність динамічного завантаження

Це фундаментальне структурне обмеження. У Paraglide немає можливості завантажувати по одній локалі за раз: кожна функція повідомлення статично імпортує реалізацію кожної мови, тому абсолютно всі мови потрапляють у ваш клієнтський бандл.

При 2 мовах половина переданих даних перекладів витрачається марно, що відповідає витоку локалі близько ~50%, виміряному вище. При 10 мовах марно витрачається 90%. При 30 мовах - 97%.

Перехід на динамічне завантаження також не вирішив би проблеми: коли кожне повідомлення є окремою функцією, ліниве завантаження кожної з них створило б тисячі мережевих запитів.

Intlayer дозволяє обирати стратегію глобально або для кожного словника окремо:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic", // 'static' | 'dynamic' | 'fetch'
  },
};

export default config;
```

| `importMode` | Що відправляється клієнту                                     | vs. Paraglide                     |
| ------------ | ------------------------------------------------------------- | --------------------------------- |
| `static`     | Усі локалі словників, які використовує сторінка               | Теоретично той самий обсяг        |
| `dynamic`    | Лише поточна локаль, ліниве завантаження для кожного словника | **У N разів менше** при N локалях |
| `fetch`      | Лише поточна локаль, отримана через Live Sync API             | **У N разів менше** при N локалях |

Завдяки [трансформації під час збірки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md) та режиму `importMode: 'static'`, Intlayer теоретично завантажує рівно той самий обсяг даних, що й Paraglide. А в режимах `'dynamic'` або `'fetch'` він завантажує лише те, що потрібно поточній мові: для додатку на N мовах обсяг переданих перекладів у N разів менший, ніж у Paraglide.

## Де Paraglide усе ще доречний

<AccordionGroup>
<Accordion header="Svelte + Vite з невеликою кількістю мов">

Якщо ваш стек побудований на Svelte з Vite і ви підтримуєте дві або три мови, tree shaking працює за планом, а накладні витрати на додаткові локалі залишаються незначними.

</Accordion>
<Accordion header="Наявний робочий процес із inlang">

Якщо ваша команда вже використовує екосистему inlang (Fink, Sherlock, плагіни форматів повідомлень), Paraglide нативно інтегрується в цей процес.

</Accordion>
</AccordionGroup>

## Спробуйте на власному додатку

Перевірте обсяг передачі даних та витоки локалей вашого робочого додатку за допомогою безкоштовного інструменту [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner):

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

Встановлення Intlayer:

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

## Додаткові матеріали

- [Бенчмарк i18n TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md)
- [Бенчмарк i18n Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/nextjs.md)
- [Оптимізація бандла та `importMode`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md)
- [Як вибрати бібліотеку i18n для React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/how_to_pick_react_i18n_library.md)
- [Аргументи на користь компіляторного підходу до інтернаціоналізації](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/compiler_vs_declarative_i18n.md)

---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "Hreflang, посібник для багатомовної SEO"
description: "Що таке hreflang, правила, які впроваджують пошукові системи, чому x-default майже завжди неправильний, і як генерувати правильні теги в Next.js та TanStack Start."
keywords:
  - hreflang
  - SEO
  - Internationalization
  - Intlayer
  - i18n
  - Sitemap
  - Canonical
  - Next.js
  - TanStack Start
slugs:
  - blog
  - hreflang-guide-multilingual-seo
author: aymericzip
---

# Hreflang: посібник з багатомовної SEO

Ви перекладали свій додаток. Ви розгорнули `/en`, `/fr`, `/es`. І французькі користувачі все ще потрапляють на англійську сторінку.

Переклад — це легка половина. Складна половина — це розповідь пошуковим системам, що ці сторінки — це **та ж сторінка іншою мовою**, а не три документи, які конкурують один з одним. Це те, що робить `hreflang`, і це місце, де більшість багатомовних сайтів тихо втрачають свій трафік.

---

## Що насправді робить hreflang

Анотація на сторінці, яка говорить: _ця URL має еквівалентні версії там для цих мов._

```html
<link rel="alternate" hreflang="en" href="https://example.com/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="es" href="https://example.com/es/about" />
<link rel="alternate" hreflang="x-default" href="https://example.com/about" />
```

Це дає вам два переваги: правильна версія, показана правильному користувачу, та ваші локалі консолідовані в один кластер замість того, щоб канібалізувати один одного як дублікати.

Варто бути ясним щодо того, що це не є. Це **не перенаправлення** — це підказка, і Google може його перевизначити. Це **не підвищення рейтингу** — воно змінює, _яка_ версія рейтингується, а не _чи_ ви рейтингуєтесь. А Bing ігнорує це повністю, натомість спираючись на `content-language` та геотаргетинг.

---

## Де його оголосити

Три розташування, всі дійсні. Виберіть одне і залишайтесь там — один і той же кластер, оголошений у двох місцях, — це як набори розходяться.

**HTML `<head>`** — звичайний вибір. Одне застереження: теги, вставлені після гідратації, ненадійні. Якщо ваш фреймворк додає їх лише на клієнтській стороні, краулер може ніколи їх не побачити.

**XML sitemap** є кращим варіантом для великих масштабів. Десять мов на 5 000 сторінок означає 50 000 елементів `<link>`, відправлених браузерам даремно; у sitemap це коштує вашим сторінкам нуль байтів.

**HTTP `Link` header** — єдиний варіант для файлів без HTML, як от PDF.

---

## Правила

### Самопосилання та взаємність

Набір на `/fr/about` повинен включати `hreflang="fr"`, який вказує на `/fr/about`. І якщо `/about` вказує на `/fr/about`, `/fr/about` повинен вказувати назад. Google називає однобічне посилання "no return tag" і відкидає його.

На практиці це означає, що **кожна сторінка в кластері відправляє ідентичний набір посилань**. Генерування їх із одного спільного списку мов — це не просто зручність, це єдиний спосіб залишатися коректним, як тільки у вас буде більш ніж дві мови.

### Абсолютні URL-адреси, завжди

```html
<!-- Мовчки ігнорується -->
<link rel="alternate" hreflang="fr" href="/fr/about" />

<!-- Правильно -->
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
```

Причина варта розуміння, а не просто запам'ятовування. `hreflang` є посиланням між документами: пошукові системи створюють кластер, ключований за URL, спільний для кожної сторінки в ньому. Відносний шлях має значення тільки щодо документа, в якому він знаходиться, тому він не може цього виразити. Він також не може перетинати хост — а альтернатива дуже часто це робить, коли локаль знаходиться на `example.fr` або `fr.example.com`. У карті сайту або HTTP-заголовку взагалі немає базового документа для дозволу.

Це має прямий наслідок у коді. `getLocalizedUrl("/about", "fr")` повертає `/fr/about` — відносна на вході, відносна на виході. Для `hreflang` ви повинні передати абсолютний URL:

```ts
getLocalizedUrl("/about", "fr"); // → "/fr/about"          ❌ відкинуто
getLocalizedUrl("https://example.com/about", "fr"); // → "https://example.com/fr/about"  ✅
```

Єдиний виняток — це фреймворк, який розв'язує для вас відносні значення перед рендерингом: Next.js розширює відносні `alternates` проти `metadataBase`. Добре — але правило застосовується до **виданого HTML**, тому перевірте за допомогою `curl`, а не інспектора DevTools.

### Коди мови

ISO 639-1 для мови, ISO 3166-1 Alpha 2 для необов'язкового регіону: `fr`, `fr-CA`, `pt-BR`.

Дві пастки ловлять майже всіх. Регіон окремо є недійсним — `hreflang="ca"` це каталанська, а не Канада; вам потрібно `en-CA` або `fr-CA`. А `en-UK` не існує: код країни для Сполученого Королівства це `GB`, тому це `en-GB`.

Додавайте регіон лише коли ви дійсно обслуговуєте цей регіон різним контентом — різні ціни, різні юридичні повідомлення. `fr` та `fr-FR` на однаковому контенті це шум.

### x-default

```html
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

Одна концепція, яка найчастіше забувається та неправильно розуміється, це `x-default` — менше 30% додатків реалізують її правильно.

Це резервна опція для користувачів, мова яких не відповідає жодному з записів у вашому наборі. Голландськомовний користувач на сайті з англійською, французькою та іспанською мовами не відповідає жодному запису; без `x-default`, Google вибирає за вас.

Де люди помиляються — в тому, що це означає. `x-default` **не є «англійською версією»** і **не є «мовою за замовчуванням»**, навіть якщо зазвичай вказує там. Це означає _сторінка для користувачів, яких цей набір не охоплює_. Тому це легітимно — і часто краще — вказувати її на селектор мови або цільову сторінку з георедиректом, а не на `/en`. Якщо у вас немає такої сторінки, ваша основна мова — розумна відповідь.

Два моменти, які варто розрізняти: `x-default` — це один додатковий запис у наборі, а не заміна самовідносного запису, і, як і будь-який інший запис, він повинен з'являтися однаково на кожній сторінці в кластері.

---

## Пастка з canonical

Кожна локалізована сторінка повинна бути **своєю власною canonical**:

```html
<!-- На https://example.com/fr/about -->
<link rel="canonical" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="en" href="https://example.com/about" />
```

Спрямування canonical кожної локалі на англійську версію замість цього:

```html
<!-- На https://example.com/fr/about — вбиває сторінку -->
<link rel="canonical" href="https://example.com/about" />
```

говорить, що франківська сторінка є дублікатом, який не повинен індексуватися, тоді як `hreflang` говорить, що це сторінка, яка повинна подаватися користувачам французькою мовою. Сигнали суперечать один одному, canonical перемагає, і ваші франківські сторінки випадають з індексу.

**Canonical є самопосилаючимся на кожну локаль. `hreflang` описує кластер.**

---

## Вибір структури URL

`hreflang` анотує URL-адреси, тому структура приходить першою.

| Структура       | Приклад           | Компроміс                                                              |
| --------------- | ----------------- | ---------------------------------------------------------------------- |
| **Підкаталоги** | `example.com/fr/` | Один домен, спільна авторитетність — слабший геосигнал                 |
| **Поддомени**   | `fr.example.com`  | Легко додавати або видаляти локаль — може читатися як окремий сайт     |
| **ccTLDs**      | `example.fr`      | Найсильніший сигнал країни — авторитет накопичується на кожному домені |

Піддиректорії — правильний вибір за замовчуванням для більшості проектів. Звертайтеся до ccTLDs тільки коли ви дійсно працюєте як окремі країнові бізнеси.

Одна структура, яку слід уникати: обслуговування різних мов на **одній URL** на основі `Accept-Language` або IP. Краулери бачать одну версію і індексують одну версію; все іншого невидимо.

> Intlayer охоплює всі три через `routing.mode` та `routing.domains`. Дивіться [користувацькі домени](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/custom_domains.md) та [довідник конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

---

## Реалізація

Писати ці теги вручну не витримує контакту з другою мовою. Замість цього виведіть їх зі свого списку мов.

<Steps>

<Step number={1} title="Видавати кластер на кожній сторінці">

Один і той же набір скрізь, канонічна версія для кожної мови, абсолютні URL-адреси, включена `x-default`.

<Tabs>

<Tab label="Next.js" value="nextjs">

Metadata API відкриває `alternates.languages`, а `getMultilingualUrls` будує весь запис із ваших налаштованих мов:

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

const SITE_URL = "https://example.com";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  /**
   * getMultilingualUrls(`${SITE_URL}/about`) повертає:
   * {
   *   en: 'https://example.com/about',
   *   fr: 'https://example.com/fr/about',
   *   es: 'https://example.com/es/about',
   * }
   */
  const multilingualUrls = getMultilingualUrls(`${SITE_URL}/about`);

  return {
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": `${SITE_URL}/about` },
    },
  };
};
```

Повна настройка: [Посібник i18n для Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md).

</Tab>

<Tab label="TanStack Start" value="tanstack">

Функція `head` маршруту будує посилання. `localeMap` проходить по налаштованим мовам, тому додавання мови до конфігу додає її скрізь одночасно:

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getLocalizedUrl, localeMap } from "intlayer";

const SITE_URL = "https://example.com";

export const Route = createFileRoute("/{-$locale}/about")({
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const url = `${SITE_URL}/about`;

    return {
      links: [
        { rel: "canonical", href: getLocalizedUrl(url, locale) },

        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(url, mapLocale),
        })),

        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(url, defaultLocale),
        },
      ],
    };
  },
});
```

`head` виконується на сервері, тому теги потрапляють в початковий HTML. Повна конфігурація: [TanStack Start i18n guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_tanstack.md).

</Tab>

</Tabs>

</Step>

<Step number={2} title="Або перемістіть все до sitemap">

У великих масштабах тримайте анотації подалі від ваших сторінок. `generateSitemap` видає `xhtml:link` альтернативи для кожного запису, читаючи локалі та режим маршрутизації з вашої конфігурації:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { generateSitemap } from "intlayer";

const sitemap = generateSitemap(
  [
    { path: "/", changefreq: "daily", priority: 1.0 },
    { path: "/about", changefreq: "monthly", priority: 0.8 },
  ],
  { siteUrl: "https://example.com" }
);
```

Два варіанти, варті уваги:

- `xhtmlLinks` (за замовчуванням `true`) — альтернативи видаються лише там, де URL-адреси локалей насправді відрізняються. У режимі `no-prefix` кожна локаль поділяє один URL, тому вони пропускаються, якщо `routing.domains` не надає локалям власні імена хостів.
- `entryPerLocale` (default `false`) — за замовчуванням один запис `<url>` містить усі альтернативи. Обидві форми є дійсними, але лише URL, зазначений як `<loc>`, вважається _поданим_ у Search Console; локалі, лише з альтернативами, залишаються придатними для виявлення, але не атрибутовані жодній карті сайту. Увімкнення цього дає кожній локалізованій URL власний запис з повним набором альтернатив, повтореним. Це множить записи на кількість локалей, тому стежте за обмеженням 50 000 URL / 50 МБ та розділіть на індекс карти сайту за його межами.

</Step>

<Step number={3} title="Перевірте, що отримує краулер">

`hreflang` виходить з ладу беззвучно, тому перевірте це замість того, щоб припускати.

Читайте вихідний код, а не інспектор — `curl https://example.com/fr/about | grep hreflang` показує, що отримує crawler; DevTools показує DOM після запуску JavaScript. Потім перейдіть за кожним альтернативним посиланням та підтвердьте, що воно вказує назад з ідентичним набором, і що жодне з них не перенаправляє. Звіт про міжнародне таргетування Search Console перевіряє решту на всьому сайті.

Для сканування, специфічного для багатомовних сайтів, [Intlayer SEO Scanner](https://intlayer.org/i18n-seo-scanner) перевіряє відсутні теги, розірвані альтернативи та конфлікти canonical по всіх локалізованих сторінках.

</Step>

</Steps>

---

## Контрольний список

- [ ] Кожна локаль має окрему, доступну для сканування URL
- [ ] Кожна сторінка посилається на себе, і кожне посилання є взаємним
- [ ] Один і той самий набір доставляється на кожній сторінці в кластері
- [ ] Усі значення `href` є абсолютними в завантаженому HTML
- [ ] Коди мають формат ISO 639-1 + ISO 3166-1 Alpha 2 (`en-GB`, не `en-UK`)
- [ ] `x-default` присутній і вказує на місце, куди мають йти незатребувані користувачі
- [ ] Canonical є самовідсильним для кожної локалі
- [ ] Теги рендеруються на сервері, а не додаються після гідрації
- [ ] Оголошені в точно одному місці
- [ ] Жодних редиректів у альтернативах

---

## Завершення

`hreflang` простий і безпощадний. Один пропущений зворотний тег, один відносний URL, один cross-locale canonical — і кластер буде відхилений без будь-якого повідомлення про помилку. Кожен з них походить від написання тегів вручну.

Виведіть набір із однієї мовної списку, відрендерьте його на стороні сервера, збережіть самовказуючий canonical і надайте `x-default` належну увагу. Зробіть це один раз, і коректність припиниться бути чимось, що ви підтримуєте.

### Йти далі

- [SEO та інтернаціоналізація](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/internationalization_and_SEO.md) — ширша картина багатомовної оптимізації для пошукових систем
- [SEO та i18n у Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/nextjs-multilingual-seo-comparison.md) — `next-intl` vs `next-i18next` vs Intlayer
- [Посібник i18n Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md)
- [Посібник з i18n TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_tanstack.md)
- [Користувацькі домени для кожної мови](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/custom_domains.md)
- [Довідка з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)

---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "Hreflang, руководство по многоязычной SEO"
description: "Что такое hreflang, правила, которые применяют поисковые системы, почему x-default почти всегда неправильный, и как генерировать правильные теги в Next.js и TanStack Start."
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

# Hreflang: руководство по многоязычной SEO

Вы перевели свое приложение. Вы развернули `/en`, `/fr`, `/es`. И французские пользователи все еще попадают на английскую страницу.

Перевод — это простая половина. Сложная половина — это сообщение поисковым системам, что эти страницы — это **одна и та же страница на другом языке**, а не три документа, конкурирующих друг с другом. Это то, что делает `hreflang`, и это именно то место, где большинство многоязычных сайтов тихо теряют свой трафик.

---

## Что такое hreflang на самом деле

Аннотация на странице, которая говорит: _у этого URL есть эквивалентные версии там, для этих языков._

```html
<link rel="alternate" hreflang="en" href="https://example.com/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="es" href="https://example.com/es/about" />
<link rel="alternate" hreflang="x-default" href="https://example.com/about" />
```

Это дает вам две вещи: правильную версию, показываемую правильному пользователю, и ваши локали консолидированы в один кластер вместо того, чтобы каннибализировать друг друга как дубликаты.

Стоит быть ясным насчет того, чем это не является. Это **не редирект** — это подсказка, и Google может её переопределить. Это **не бонус ранжирования** — это меняет _какая_ версия ранжируется, а не _ранжируется ли_ вы вообще. А Bing полностью его игнорирует, полагаясь вместо этого на `content-language` и геотаргетинг.

---

## Где его объявить

Три способа размещения, все действительные. Выберите один и оставайтесь там — один и тот же кластер, объявленный в двух местах, — это как наборы расходятся.

**HTML `<head>`** — обычный выбор. Одно предостережение: теги, внедренные после гидратации, ненадежны. Если ваш фреймворк добавляет их только на стороне клиента, краулер может их никогда не увидеть.

**XML sitemap** лучше масштабируется. Десять локалей на 5000 страницах означают 50000 элементов `<link>`, отправляемых браузерам впустую; в sitemap это стоит вашим страницам нулевые байты.

**HTTP `Link` header** — единственный вариант для файлов, не являющихся HTML, таких как PDF.

---

## Правила

### Самоссылка и взаимность

Набор на `/fr/about` должен включать `hreflang="fr"`, указывающий на `/fr/about`. И если `/about` указывает на `/fr/about`, `/fr/about` должен указывать обратно. Google называет односторонний ref "no return tag" и удаляет его.

На практике это означает, что **каждая страница в кластере отправляет одинаковый набор ссылок**. Генерация их из одного общего списка локалей — это не удобство, это единственный способ оставаться корректным, когда у вас более двух локалей.

### Абсолютные URL, всегда

```html
<!-- Молча игнорируется -->
<link rel="alternate" hreflang="fr" href="/fr/about" />

<!-- Правильно -->
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
```

Причину стоит понять, а не просто запомнить. `hreflang` — это перекрёстная ссылка между документами: поисковые системы создают кластер с ключом по URL, который используется на каждой странице в нём. Относительный путь имеет смысл только относительно документа, в котором он находится, поэтому он не может выразить это. Кроме того, он не может пересекать хост — а альтернатива часто пересекает, когда локаль находится на `example.fr` или `fr.example.com`. В карте сайта или HTTP-заголовке вообще нет базового документа для разрешения.

Это имеет прямое следствие в коде. `getLocalizedUrl("/about", "fr")` возвращает `/fr/about` — относительный на входе, относительный на выходе. Для `hreflang` вы должны передать абсолютный URL:

```ts
getLocalizedUrl("/about", "fr"); // → "/fr/about"          ❌ dropped
getLocalizedUrl("https://example.com/about", "fr"); // → "https://example.com/fr/about"  ✅
```

Единственное исключение — это framework, который разрешает относительные значения перед рендерингом: Next.js расширяет относительные `alternates` по отношению к `metadataBase`. Хорошо — но правило применяется к **выданному HTML**, поэтому проверяйте с помощью `curl`, а не инспектора DevTools.

### Коды языков

ISO 639-1 для языка, ISO 3166-1 Alpha 2 для необязательного региона: `fr`, `fr-CA`, `pt-BR`.

Две ловушки ловят почти всех. Регион отдельно недействителен — `hreflang="ca"` это каталанский, а не Канада; вам нужен `en-CA` или `fr-CA`. И `en-UK` не существует: код страны для Соединённого Королевства это `GB`, так что это `en-GB`.

Добавляйте регион только тогда, когда вы действительно подаёте этому региону разный контент — разные цены, разные юридические уведомления. `fr` и `fr-FR` на идентичном контенте это шум.

### x-default

```html
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

Одна концепция, которая чаще всего забывается и неправильно понимается, это `x-default` — менее 30% приложений реализуют это правильно.

Это резервный вариант для пользователей, язык которых не совпадает ни с одной записью в вашем наборе. Носитель нидерландского языка на сайте, предлагающем английский, французский и испанский языки, не совпадает ни с одной записью; без `x-default` Google выбирает за вас.

Люди ошибаются в том, что это означает. `x-default` **не "версия на английском языке"** и **не "локаль по умолчанию"**, даже если обычно указывает туда. Это означает _страница для пользователей, которых этот набор не охватывает_. Именно поэтому вполне допустимо — и часто лучше — указать на селектор языка или страницу переадресации на основе геолокации, а не на `/en`. Если у вас нет такой страницы, ваш основной язык является разумным ответом.

Два момента, которые нужно держать в уме: `x-default` — это одна дополнительная запись в наборе, а не замена самоссылающейся, и, как и любая другая запись, она должна появляться одинаково на каждой странице в кластере.

---

## Ловушка канонического URL

Каждая локализованная страница должна быть **своим собственным каноническим URL**:

```html
<!-- На https://example.com/fr/about -->
<link rel="canonical" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="en" href="https://example.com/about" />
```

Указание канонического URL каждой локали на английскую версию:

```html
<!-- На https://example.com/fr/about — убивает страницу -->
<link rel="canonical" href="https://example.com/about" />
```

говорит, что французская страница является дубликатом, который не должен индексироваться, в то время как `hreflang` говорит, что это страница для обслуживания пользователей французского языка. Сигналы противоречат друг другу, canonical имеет приоритет, и ваши французские страницы выпадают из индекса.

**Canonical является самореферентным для каждой локали. `hreflang` описывает кластер.**

---

## Выбор структуры URL

`hreflang` аннотирует URLs, поэтому структура идет в первую очередь.

| Структура         | Пример            | Компромисс                                                                   |
| ----------------- | ----------------- | ---------------------------------------------------------------------------- |
| **Поддиректории** | `example.com/fr/` | Один домен, общий авторитет — более слабый геосигнал                         |
| **Поддомены**     | `fr.example.com`  | Легко добавить или убрать локаль — может читаться как отдельный сайт         |
| **ccTLDs**        | `example.fr`      | Самый сильный сигнал страны — authority строится отдельно для каждого домена |

Подкаталоги — правильный выбор по умолчанию для большинства проектов. Обращайтесь к ccTLDs только если вы действительно работаете как отдельные страновые бизнесы.

Единственная структура, которой следует избегать: подача разных языков по **одному и тому же URL** на основе `Accept-Language` или IP. Краулеры видят одну версию и индексируют одну версию; всё остальное невидимо.

> Intlayer охватывает все три варианта через `routing.mode` и `routing.domains`. См. [пользовательские домены](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/custom_domains.md) и [справочник конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

---

## Реализация

Написание этих тегов вручную не переживает контакт со второй локалью. Вместо этого выводите их из вашего списка локалей.

<Steps>

<Step number={1} title="Выдавайте кластер на каждой странице">

Одинаковый набор везде, canonical для каждой локали, абсолютные URL, `x-default` включен.

<Tabs>

<Tab label="Next.js" value="nextjs">

Metadata API предоставляет `alternates.languages`, и `getMultilingualUrls` строит всю запись из ваших настроенных локалей:

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
   * getMultilingualUrls(`${SITE_URL}/about`) возвращает:
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

Полная настройка: [Руководство i18n Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_16.md).

</Tab>

<Tab label="TanStack Start" value="tanstack">

Функция `head` маршрута строит ссылки. `localeMap` перебирает ваши настроенные локали, поэтому добавление локали в конфиг добавляет её везде сразу:

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

`head` выполняется на сервере, поэтому теги попадают в исходный HTML. Полная настройка: [TanStack Start i18n guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_tanstack.md).

</Tab>

</Tabs>

</Step>

<Step number={2} title="Или переместите все это в sitemap">

В большом масштабе держите аннотации полностью вне ваших страниц. `generateSitemap` выдает `xhtml:link` альтернативы для каждой записи, читая локали и режим маршрутизации из вашей конфигурации:

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

Два варианта, на которые стоит обратить внимание:

- `xhtmlLinks` (по умолчанию `true`) — альтернативные версии выводятся только там, где URL-адреса локалей действительно отличаются. В режиме `no-prefix` каждая локаль использует один URL, поэтому они пропускаются, если только `routing.domains` не предоставляет локалям свои имена хостов.
- `entryPerLocale` (default `false`) — по умолчанию одна запись `<url>` содержит все альтернативы. Обе формы валидны, но только URL, указанный как `<loc>`, считается _отправленным_ в Search Console; локали только с альтернативами остаются обнаруживаемыми, но не атрибутируются никакой карте сайта. Включение этой опции дает каждому локализованному URL собственную запись с повторяющимся полным набором альтернатив. Это умножает количество записей на количество локалей, поэтому следите за лимитом в 50 000 URL / 50 МБ и разделите на индекс карты сайта при его превышении.

</Step>

<Step number={3} title="Проверьте, что получает краулер">

`hreflang` может молча не срабатывать, поэтому проверьте его вместо того, чтобы полагаться на предположения.

Читайте источник, а не инспектор — `curl https://example.com/fr/about | grep hreflang` показывает, что получает crawler; DevTools показывает DOM после выполнения JavaScript. Затем проверьте каждый alternate и подтвердите, что он указывает обратно с идентичным набором, и что ни один из них не перенаправляет. Отчет Search Console об International Targeting охватывает остальное по всему сайту.

Для crawl, ориентированного на многоязычность, [Intlayer SEO Scanner](https://intlayer.org/i18n-seo-scanner) проверяет отсутствующие теги, сломанные alternates и конфликты canonical на ваших локализованных страницах.

</Step>

</Steps>

---

## Checklist

- [ ] Each locale has a distinct, crawlable URL
- [ ] Every page self-references, and every reference is reciprocal
- [ ] The same set ships on every page in the cluster
- [ ] Все значения `href` являются абсолютными в выданном HTML
- [ ] Коды соответствуют ISO 639-1 + ISO 3166-1 Alpha 2 (`en-GB`, а не `en-UK`)
- [ ] `x-default` присутствует и указывает, куда должны перейти неопознанные пользователи
- [ ] Canonical самореференциален для каждой локали
- [ ] Теги отрендерены на сервере, а не внедрены после гидрации
- [ ] Объявлены ровно в одном месте
- [ ] Нет перенаправлений между альтернатами

---

## Завершение

`hreflang` прост и неумолим. Один пропущенный обратный тег, один относительный URL, один cross-locale canonical — и кластер отбрасывается без каких-либо ошибок. Каждый из этих случаев возникает из-за ручного написания тегов.

Выведите набор из одного списка локалей, отрендерьте его на сервере, сохраняйте canonical самоссылающимся и уделите `x-default` должное внимание. Сделайте это один раз, и правильность перестанет быть чем-то, что вы поддерживаете.

### Дальнейшее изучение

- [SEO и интернационализация](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/internationalization_and_SEO.md) — более широкая картина многоязычной оптимизации для поисковых систем
- [SEO и i18n в Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/nextjs-multilingual-seo-comparison.md) — `next-intl` vs `next-i18next` vs Intlayer
- [Руководство Next.js 16 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_16.md)
- [Руководство i18n TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_tanstack.md)
- [Пользовательские домены для каждой локали](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/custom_domains.md)
- [Справочник конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md)

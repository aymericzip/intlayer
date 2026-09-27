---
createdAt: 2026-06-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer scan: аудит i18n та SEO сайту"
description: Дізнайтеся, як використовувати команду scan в Intlayer CLI для вимірювання розміру сторінки та аудиту стану i18n/SEO будь-якого вебсайту.
keywords:
  - Scan
  - SEO
  - i18n
  - Аудит
  - CLI
  - Intlayer
  - Розмір сторінки
  - Збірка
slugs:
  - doc
  - concept
  - cli
  - scan
history:
  - version: 9.5.11
    date: 2026-09-26
    changes: "Визначення стратегії маршрутизації та i18n-стеку (бібліотеки, TMS); додавання перевірок взаємності hreflang, og:locale та перемикача мов; підтримка карт сайту з robots.txt, індексів sitemap та sitemap у форматі gzip"
  - version: 9.5.2
    date: 2026-09-12
    changes: "Додано прапорець `--ci`"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Додано вміст команди scan"
author: aymericzip
---

# Scan Website

Команда `scan` запитує публічний URL, вимірює загальний розмір сторінки та перевіряє стан i18n і SEO сторінки. Вона створює звіт з оцінкою (0–100), що охоплює HTML-атрибути, канонічні посилання, теги hreflang та зворотні посилання на них, robots.txt, карти сайту, локалізовані внутрішні посилання та вагу локалей у JavaScript-бандлі.

Вона також повідомляє, як сайт кодує локаль в URL (стратегія маршрутизації), а також який фреймворк, бібліотеку i18n, систему керування перекладами (TMS) або проксі перекладу використовує. Ті самі перевірки працюють в [онлайн i18n SEO-сканері](https://intlayer.org/i18n-seo-scanner) та в розширенні Intlayer для Chrome.

Жодних додаткових залежностей не потрібно. Якщо встановлено [puppeteer](https://pptr.dev/), сканування може фіксувати ліниво завантажувані (lazy-loaded) JavaScript-чанки для більш точного аналізу збірки; в іншому випадку воно перевіряє лише скрипти, оголошені в HTML для негайного завантаження.

## Використання

```bash packageManager="npm"
npx intlayer scan <url>
```

```bash packageManager="yarn"
yarn intlayer scan <url>
```

```bash packageManager="pnpm"
pnpm intlayer scan <url>
```

```bash packageManager="bun"
bun x intlayer scan <url>
```

### Приклад

```bash packageManager="npm"
npx intlayer scan https://example.com
```

Приклад виводу:

```
🔍 Scanned https://example.com/fr (basic mode)

Score: 91/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: fr, en, es, de
Routing: locale prefix except for the default locale (every hreflang alternate but "en" starts with a locale segment, default locale: en)

Stack:
  Framework Next.js 15.1.0 (window.next.version)
  i18n library next-intl (JavaScript bundle contains "X-NEXT-INTL-LOCALE")
  TMS Crowdin (loads https://distributions.crowdin.net/…)

Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ locale signals consistent (lang, URL, hreflang)
  ⚠ og:locale meta tag
      Missing <meta property="og:locale">: social previews default to en_US
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ hreflang alternates link back
  ✓ unused bundle locale content
  ✓ localized internal links
  ⚠ all internal links keep the locale
      2 internal links leave the "fr" locale (0 to another locale, 2 without locale)
        <a href="/pricing">Tarifs</a>
  ✓ crawlable language switcher
  ✓ robots.txt present
  ✓ robots.txt keeps localized URLs crawlable
  ✓ sitemap present
  ✓ sitemap lists every locale
  ✓ sitemap has alternate links
  ✓ sitemap has x-default

Bundle locale weight:
  Translations shipped: 120.50 KB
  Unused (other locales): 45.20 KB (37%)
```

## Параметри

### `<url>` (обов'язково)

Повний URL-адрес для сканування (наприклад, `https://example.com`).

### `--no-deep`

Вимкнути глибоке сканування на основі рендерингу сторінки.

За замовчуванням команда намагається використовувати [puppeteer](https://pptr.dev/) для рендерингу сторінки в headless-браузері, захоплення відкладено завантажуваних JS-чанків та вимірювання реального обсягу переданих даних. Якщо puppeteer не встановлено, команда автоматично перемикається в базовий режим.

Передайте `--no-deep`, щоб примусово використовувати базовий режим, навіть якщо puppeteer доступний.

> Приклад: `npx intlayer scan https://example.com --no-deep`

### `--json`

Вивід повного результату сканування у вигляді JSON-об'єкта замість форматованого звіту. Корисно для програмного використання або в CI-пайплайнах.

> Приклад: `npx intlayer scan https://example.com --json`

### Стандартні параметри конфігурації

- **`--base-dir`**: Базова директорія для пошуку файлу `intlayer.config.*`.
- **`-e, --env`**: Цільове оточення (наприклад, `development`, `production`).
- **`--env-file`**: Шлях до кастомного файлу `.env`.
- **`--no-cache`**: Вимкнути кешування конфігурації.
- **`--ci`**: Виконує команду в кожному проєкті Intlayer монорепозиторію (або лише в поточному при запуску з директорії проєкту). Облікові дані для кожного проєкту можна підставити через `INTLAYER_PROJECT_CREDENTIALS`, JSON-об'єкт, що зіставляє шлях проєкту з `{ "clientId", "clientSecret" }`.
- **`--verbose`**: Увімкнути докладне логування (за замовчуванням увімкнено в режимі CLI).
- **`--prefix`**: Кастомний префікс для логів.

## Стратегія маршрутизації

Шаблон локалей, спільний для альтернатив hreflang сторінки, показує, як сайт маршрутизує свої локалі. Без альтернатив використовується лише сканований URL (низький рівень впевненості).

| Стратегія           | Приклад                                         |
| ------------------- | ----------------------------------------------- |
| `prefix-all`        | `/en/about`, `/fr/about`                        |
| `prefix-no-default` | `/about` (локаль за замовчуванням), `/fr/about` |
| `search-params`     | `/about?lang=fr`                                |
| `subdomain`         | `fr.example.com`                                |
| `domain`            | `example.fr`, `example.de`                      |
| `no-prefix`         | Один URL для всіх локалей (cookie)              |

Перевірки посилань, канонічних URL, robots.txt та карт сайту аналізують кожен URL через цю стратегію. Наприклад, посилання без префікса є правильним для локалі за замовчуванням на сайті з `prefix-no-default`, а посилання без `?lang=` призводить до виходу з локалі на сайті з `search-params`.

## Виявлений стек

Фреймворки, бібліотеки інтернаціоналізації (Intlayer, i18next, react-i18next, next-i18next, next-intl, use-intl, react-intl, vue-i18n, @nuxtjs/i18n, Lingui, svelte-i18n, Paraglide, ngx-translate, Transloco, Polylang, WPML…), системи керування перекладами (Crowdin, Phrase, Lokalise, locize, Transifex, Tolgee, Localazy, SimpleLocalize, Localizely, Smartling, Intlayer CMS) та проксі перекладу (Weglot, Localize, GTranslate…) визначаються за HTML, завантаженими ресурсами та JavaScript-бандлами. У глибокому режимі також перевіряються глобальні змінні window та cookie.

## Що перевіряється

| Перевірка                       | Опис                                                                                                          | Вага в оцінці |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------- |
| `html lang`                     | `<html lang>` присутній і є коректним тегом BCP 47                                                            | 9             |
| `html dir`                      | `dir="rtl"` встановлено для мов із письмом справа наліво (`ltr` використовується за замовчуванням)            | 3             |
| `locale signals consistent`     | `<html lang>`, локаль URL та власний запис hreflang узгоджуються між собою                                    | 5             |
| `og:locale`                     | `og:locale` встановлено та збігається з `<html lang>`                                                         | 3             |
| `canonical`                     | Канонічне посилання існує і не вказує на версію для іншої локалі                                              | 10            |
| `hreflang`                      | Теги hreflang присутні з валідними кодами, абсолютними URL, без дублікатів та з посиланням на себе            | 9             |
| `x-default hreflang`            | Присутній альтернативний hreflang `x-default`                                                                 | 7             |
| `hreflang alternates link back` | Альтернативні сторінки відповідають кодом 200, не перенаправляють, посилаються у відповідь та декларують мову | 8             |
| `localized links`               | Внутрішні посилання вказують на поточну локаль сторінки                                                       | 8             |
| `all links keep the locale`     | Жодне внутрішнє посилання не перемикає і не скидає локаль                                                     | 6             |
| `language switcher`             | Присутні доступні для сканування посилання `<a href>` на інші мовні версії сторінки                           | 6             |
| `robots.txt present`            | `/robots.txt` повертає відповідь 200                                                                          | 10            |
| `robots.txt localized URLs`     | Ані сайт, ані його локалізовані URL не заблоковані для Googlebot                                              | 8             |
| `sitemap present`               | Карта сайту знайдена (директиви `Sitemap:` у robots.txt, `/sitemap.xml`, `/sitemap_index.xml`)                | 10            |
| `sitemap locale coverage`       | Кожна локаль вказана, а записи з альтернативами містять посилання на самих себе                               | 9             |
| `sitemap alternates`            | Карта сайту містить альтернативні посилання `hreflang`                                                        | 8             |
| `sitemap x-default`             | Карта сайту містить альтернативне посилання `x-default`                                                       | 7             |
| `unused bundle content`         | Основний JS-бандл не містить перекладів для інших локалей                                                     | 8             |

Попередження дає половину ваги оцінки. Підсумкова оцінка є середньозваженою сумою всіх виконаних перевірок, вираженою у відсотках (0–100). Непройдені перевірки виводять перші виявлені проблеми; використовуйте `--json` для отримання повної інформації.

## Використання функції сканування в коді

Функція `scan` також експортується з пакета `@intlayer/cli`, тому її можна викликати у ваших власних скриптах:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

Для більш низькорівневого доступу функція `scanWebsite` з модуля `@intlayer/engine/scan` повертає структурований об'єкт `ScanResult`:

```ts
import { scanWebsite } from "@intlayer/engine/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```

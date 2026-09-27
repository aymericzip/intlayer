---
createdAt: 2026-06-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer scan: аудит i18n и SEO сайта"
description: Узнайте, как использовать команду scan в Intlayer CLI для измерения размера страницы и аудита i18n/SEO любого веб-сайта.
keywords:
  - Scan
  - SEO
  - i18n
  - Аудит
  - CLI
  - Intlayer
  - Размер страницы
  - Сборка
slugs:
  - doc
  - concept
  - cli
  - scan
history:
  - version: 9.5.11
    date: 2026-09-26
    changes: "Определение стратегии маршрутизации и i18n-стека (библиотеки, TMS); добавление проверок взаимности hreflang, og:locale и переключателя языков; поддержка карт сайта из robots.txt, индексов sitemap и sitemap в формате gzip"
  - version: 9.5.2
    date: 2026-09-12
    changes: "Добавлен флаг `--ci`"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Добавлена команда scan"
author: aymericzip
---

# Scan Website

Команда `scan` запрашивает публичный URL, измеряет общий размер страницы и проверяет состояние i18n и SEO страницы. Она создает отчет с оценкой (0–100), охватывающий HTML-атрибуты, канонические ссылки, теги hreflang и обратные ссылки на них, robots.txt, карты сайта, локализованные внутренние ссылки и вес локалей в JavaScript-бандле.

Она также сообщает, как сайт кодирует локаль в URL (стратегия маршрутизации), а также какой фреймворк, библиотеку i18n, систему управления переводами (TMS) или прокси переводов использует. Те же проверки работают в [онлайн i18n SEO-сканере](https://intlayer.org/i18n-seo-scanner) и в расширении Intlayer для Chrome.

Никаких дополнительных зависимостей не требуется. Если установлен [puppeteer](https://pptr.dev/), сканирование может фиксировать лениво загружаемые (lazy-loaded) JavaScript-чанки для более точного анализа сборки; в противном случае оно проверяет только скрипты, объявленные в HTML для немедленной загрузки.

## Использование

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

### Пример

```bash packageManager="npm"
npx intlayer scan https://example.com
```

Пример вывода:

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

## Параметры

### `<url>` (обязательно)

Полный URL-адрес для сканирования (например, `https://example.com`).

### `--no-deep`

Отключить более глубокое сканирование на основе рендеринга страницы.

По умолчанию команда пытается использовать [puppeteer](https://pptr.dev/) для рендеринга страницы в headless-браузере, захвата отложенно загружаемых JS-чанков и измерения реального объема передаваемых данных. Если puppeteer не установлен, команда автоматически переключается в базовый режим.

Передайте `--no-deep`, чтобы принудительно использовать базовый режим, даже если puppeteer доступен.

> Пример: `npx intlayer scan https://example.com --no-deep`

### `--json`

Вывод полного результата сканирования в виде JSON-объекта вместо форматированного отчета. Полезно для программного использования или в CI-пайплайнах.

> Пример: `npx intlayer scan https://example.com --json`

### Стандартные параметры конфигурации

- **`--base-dir`** — Базовая директория для поиска файла `intlayer.config.*`.
- **`-e, --env`** — Целевое окружение (например, `development`, `production`).
- **`--env-file`** — Путь к кастомному файлу `.env`.
- **`--no-cache`** — Отключить кэширование конфигурации.
- **`--ci`** — Выполняет команду в каждом проекте Intlayer монорепозитория (или только в текущем при запуске из директории проекта). Учетные данные для каждого проекта можно подставить через `INTLAYER_PROJECT_CREDENTIALS` — JSON-объект, сопоставляющий путь проекта с `{ "clientId", "clientSecret" }`.
- **`--verbose`** — Включить подробное логирование (по умолчанию включено в режиме CLI).
- **`--prefix`** — Кастомный префикс для логов.

## Стратегия маршрутизации

Шаблон локалей, общий для альтернатив hreflang страницы, показывает, как сайт маршрутизирует свои локали. Без альтернатив используется только сканируемый URL (низкий уровень уверенности).

| Стратегия           | Пример                                      |
| ------------------- | ------------------------------------------- |
| `prefix-all`        | `/en/about`, `/fr/about`                    |
| `prefix-no-default` | `/about` (локаль по умолчанию), `/fr/about` |
| `search-params`     | `/about?lang=fr`                            |
| `subdomain`         | `fr.example.com`                            |
| `domain`            | `example.fr`, `example.de`                  |
| `no-prefix`         | Один URL для всех локалей (cookie)          |

Проверки ссылок, канонических URL, robots.txt и карты сайта анализируют каждый URL через эту стратегию. Например, ссылка без префикса корректна для локали по умолчанию на сайте с `prefix-no-default`, а ссылка без `?lang=` приводит к выходу из локали на сайте с `search-params`.

## Обнаруженный стек

Фреймворки, библиотеки интернационализации (Intlayer, i18next, react-i18next, next-i18next, next-intl, use-intl, react-intl, vue-i18n, @nuxtjs/i18n, Lingui, svelte-i18n, Paraglide, ngx-translate, Transloco, Polylang, WPML…), системы управления переводами (Crowdin, Phrase, Lokalise, locize, Transifex, Tolgee, Localazy, SimpleLocalize, Localizely, Smartling, Intlayer CMS) и прокси переводов (Weglot, Localize, GTranslate…) определяются по HTML, загруженным ресурсам и JavaScript-бандлам. В глубоком режиме также проверяются глобальные переменные window и cookie.

## Что проверяется

| Проверка                        | Описание                                                                                           | Вес в оценке |
| ------------------------------- | -------------------------------------------------------------------------------------------------- | ------------ |
| `html lang`                     | `<html lang>` присутствует и содержит корректный тег BCP 47                                        | 9            |
| `html dir`                      | `dir="rtl"` задан для языков с письмом справа налево (`ltr` используется по умолчанию)             | 3            |
| `locale signals consistent`     | `<html lang>`, локаль URL и собственная запись hreflang согласуются между собой                    | 5            |
| `og:locale`                     | `og:locale` задан и совпадает с `<html lang>`                                                      | 3            |
| `canonical`                     | Каноническая ссылка существует и не указывает на версию для другой локали                          | 10           |
| `hreflang`                      | Теги hreflang присутствуют с валидными кодами, абсолютными URL, без дубликатов и с ссылкой на себя | 9            |
| `x-default hreflang`            | Присутствует альтернативный hreflang `x-default`                                                   | 7            |
| `hreflang alternates link back` | Альтернативные страницы отвечают кодом 200, не перенаправляют, ссылаются в ответ и объявляют язык  | 8            |
| `localized links`               | Внутренние ссылки указывают на текущую локаль страницы                                             | 8            |
| `all links keep the locale`     | Ни одна внутренняя ссылка не переключает и не сбрасывает локаль                                    | 6            |
| `language switcher`             | Присутствуют доступные для сканирования ссылки `<a href>` на другие языковые версии страницы       | 6            |
| `robots.txt present`            | `/robots.txt` возвращает ответ 200                                                                 | 10           |
| `robots.txt localized URLs`     | Ни сайт, ни его локализованные URL не заблокированы для Googlebot                                  | 8            |
| `sitemap present`               | Карта сайта найдена (директивы `Sitemap:` в robots.txt, `/sitemap.xml`, `/sitemap_index.xml`)      | 10           |
| `sitemap locale coverage`       | Каждая локаль указана, а записи с альтернативами содержат ссылку на самих себя                     | 9            |
| `sitemap alternates`            | Карта сайта содержит альтернативные ссылки `hreflang`                                              | 8            |
| `sitemap x-default`             | Карта сайта содержит альтернативную ссылку `x-default`                                             | 7            |
| `unused bundle content`         | Основной JS-бандл не содержит переводов для других локалей                                         | 8            |

Предупреждение дает половину веса оценки. Итоговая оценка представляет собой средневзвешенную сумму всех выполненных проверок, выраженную в процентах (0–100). Непройденные проверки выводят первые обнаруженные проблемы; используйте `--json` для получения полной информации.

## Использование функции сканирования в коде

Функция `scan` также экспортируется из пакета `@intlayer/cli`, поэтому её можно вызывать в ваших собственных скриптах:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

Для более низкоуровневого доступа функция `scanWebsite` из модуля `@intlayer/engine/scan` возвращает структурированный объект `ScanResult`:

```ts
import { scanWebsite } from "@intlayer/engine/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```

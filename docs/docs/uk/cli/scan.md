---
createdAt: 2026-06-11
updatedAt: 2026-06-11
title: Scan Website
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
  - version: 8.13.0
    date: 2026-06-11
    changes: "Додано вміст команди scan"
author: aymericzip
---

# Scan Website

Команда `scan` запитує публічний URL, вимірює загальний розмір сторінки та перевіряє стан i18n і SEO сторінки. Вона створює звіт з оцінкою (0–100), що охоплює HTML-атрибути, канонічні посилання, теги hreflang, robots.txt, sitemap.xml, локалізовані внутрішні посилання та вагу локалей у JavaScript-бандлі.

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
🔍 Scanned https://example.com (basic mode)

Score: 90/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: en, fr, es, de, …

Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ localized internal links
  ⚠ all internal links localized
  ✓ current locale detected
  ✓ robots.txt present
  ✓ robots.txt keeps locale paths crawlable
  ✓ sitemap.xml present
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

- **`--base-dir`** — Базова директорія для пошуку файлу `intlayer.config.*`.
- **`-e, --env`** — Цільове оточення (наприклад, `development`, `production`).
- **`--env-file`** — Шлях до кастомного файлу `.env`.
- **`--no-cache`** — Вимкнути кешування конфігурації.
- **`--verbose`** — Увімкнути докладне логування (за замовчуванням увімкнено в режимі CLI).
- **`--prefix`** — Кастомний префікс для логів.

## Що перевіряється

| Перевірка                 | Опис                                                             | Вага в оцінці |
| ------------------------- | ---------------------------------------------------------------- | ------------- |
| `html lang`               | Наявність атрибута `<html lang="…">`                             | 9             |
| `html dir`                | Наявність атрибута `<html dir="…">`                              | 3             |
| `canonical`               | Наявність тегу `<link rel="canonical">`                          | 10            |
| `hreflang`                | Наявність тегів `<link rel="alternate" hreflang="…">`            | 9             |
| `x-default hreflang`      | Наявність альтернативного тегу hreflang `x-default`              | 7             |
| `localized links`         | Хоча б одне внутрішнє посилання містить сегмент локалі           | 5             |
| `all links localized`     | Кожне внутрішнє посилання містить сегмент локалі                 | 5             |
| `current locale`          | Локаль сторінки може бути визначена                              | 3             |
| `robots.txt present`      | `/robots.txt` повертає відповідь 200                             | 10            |
| `robots.txt locale paths` | Відсутність блокувань шляхів локалей у robots.txt                | 10            |
| `sitemap.xml present`     | `/sitemap.xml` повертає відповідь 200                            | 10            |
| `sitemap locale coverage` | Кожна виявлена локаль представлена в карті сайту                 | 10            |
| `sitemap alternates`      | Карта сайту містить альтернативні посилання `hreflang`           | 5             |
| `sitemap x-default`       | Карта сайту містить альтернативне посилання `x-default`          | 5             |
| `unused bundle content`   | JS-бандл не містить надлишкових невикористовуваних даних локалей | 9             |

Підсумкова оцінка є середньозваженою сумою всіх пройдених перевірок, вираженою у відсотках (0–100).

## Використання функції сканування в коді

Функція `scan` також експортується з пакета `@intlayer/cli`, тому її можна викликати у ваших власних скриптах:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

Для більш низькорівневого доступу функція `scanWebsite` з модуля `@intlayer/chokidar/scan` повертає структурований об'єкт `ScanResult`:

```ts
import { scanWebsite } from "@intlayer/chokidar/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```

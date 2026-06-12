---
createdAt: 2026-06-11
updatedAt: 2026-06-11
title: Scan Website
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
  - version: 8.13.0
    date: 2026-06-11
    changes: "Добавлена команда scan"
author: aymericzip
---

# Scan Website

Команда `scan` запрашивает публичный URL, измеряет общий размер страницы и проверяет состояние i18n и SEO страницы. Она создает отчет с оценкой (0–100), охватывающий HTML-атрибуты, канонические ссылки, теги hreflang, robots.txt, sitemap.xml, локализованные внутренние ссылки и вес локалей в JavaScript-бандле.

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
- **`--verbose`** — Включить подробное логирование (по умолчанию включено в режиме CLI).
- **`--prefix`** — Кастомный префикс для логов.

## Что проверяется

| Проверка                  | Описание                                                      | Вес в оценке |
| ------------------------- | ------------------------------------------------------------- | ------------ |
| `html lang`               | Наличие атрибута `<html lang="…">`                            | 9            |
| `html dir`                | Наличие атрибута `<html dir="…">`                             | 3            |
| `canonical`               | Наличие тега `<link rel="canonical">`                         | 10           |
| `hreflang`                | Наличие тегов `<link rel="alternate" hreflang="…">`           | 9            |
| `x-default hreflang`      | Наличие альтернативного тега hreflang `x-default`             | 7            |
| `localized links`         | Хотя бы одна внутренняя ссылка содержит сегмент локали        | 5            |
| `all links localized`     | Каждая внутренняя ссылка содержит сегмент локали              | 5            |
| `current locale`          | Локаль страницы может быть определена                         | 3            |
| `robots.txt present`      | `/robots.txt` возвращает ответ 200                            | 10           |
| `robots.txt locale paths` | Отсутствие блокировок путей локалей в robots.txt              | 10           |
| `sitemap.xml present`     | `/sitemap.xml` возвращает ответ 200                           | 10           |
| `sitemap locale coverage` | Каждая обнаруженная локаль представлена в карте сайта         | 10           |
| `sitemap alternates`      | Карта сайта содержит альтернативные ссылки `hreflang`         | 5            |
| `sitemap x-default`       | Карта сайта содержит альтернативную ссылку `x-default`        | 5            |
| `unused bundle content`   | JS-бандл не содержит избыточных неиспользуемых данных локалей | 9            |

Итоговая оценка представляет собой средневзвешенную сумму всех пройденных проверок, выраженную в процентах (0–100).

## Использование функции сканирования в коде

Функция `scan` также экспортируется из пакета `@intlayer/cli`, поэтому её можно вызывать в ваших собственных скриптах:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

Для более низкоуровневого доступа функция `scanWebsite` из модуля `@intlayer/chokidar/scan` возвращает структурированный объект `ScanResult`:

```ts
import { scanWebsite } from "@intlayer/chokidar/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```

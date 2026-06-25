---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Міграція з next-intl на Intlayer"
description: "Дізнайтеся, як мігрувати вашу Next.js програму з next-intl на Intlayer за допомогою адаптера сумісності."
keywords:
  - next-intl
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Переміщення з next-intl на Intlayer

Для повного та детального покрокового посібника, будь ласка, см. наш повний [посібник з міграції next-intl](../migration_from_next-intl_to_intlayer.md).

Переміщення з `next-intl` на Intlayer дозволяє вам повністю зберегти маршрутизацію та синтаксис вашої програми без змін.

## Що робити

Виконайте наступну команду у вашому репозиторії:

```bash
npx intlayer init
```

Це створить файл `intlayer.config.ts`. У вашому `next.config.ts` використовуйте обгортку плагіна, щоб безперешкодно вприскити `next-intl` aliases до `@intlayer/next-intl`.

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## Що це робить під капотом

The bundler wrapper замінює переклади, але **залишає функції `next-intl/navigation` без змін** (наприклад, `Link`, `redirect`, `usePathname`).

Під капотом:

- **ICU runtime:** Множини (`=0`, `one`, `other`), select/selectordinal, аргументи `#` та форматовані аргументи (`{ts, date, long}`) працюють правильно за допомогою спільного резолвера `resolveMessage(..., 'icu')`.
- **`useTranslations()` & `getTranslations()`:** Виклики без області видимості витягують перший сегмент ключа як правильний ідентифікатор словника. Вкладені простори імен грацильно розділяються на шляхи словника та префікси.
- **Rich formatting:** Обидва `t.rich()` і `t.markup()` повністю рідко реалізовані, перетворюючи HTML-подібні вузли на відтворені React-куски.
- **`useFormatter`:** `relativeTime`, `list`, `dateTimeRange` та названі формати з конфігурації переходять до основних нативних форматерів `Intl`.

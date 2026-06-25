---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Міграція з React Intl на Intlayer"
description: "Дізнайтеся, як перенести вашу React-додаток з react-intl на Intlayer, використовуючи адаптер сумісності."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - react-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Перехід від React Intl до Intlayer

Якщо ваш React додаток використовує `react-intl` (FormatJS), перехід на Intlayer — це просто. Наш compat layer безпроблемно обробляє ICU MessageFormat та всі існуючі компоненти `Formatted*`.

## Що робити

Почніть із запуску команди ініціалізації у вашому проекті:

```bash
npx intlayer init
```

Потім налаштуйте плагін Intlayer Vite або Next.js у вашій конфігурації. Цей плагін вводить alias'и часу збірки для перенаправлення імпортів `react-intl` на `@intlayer/react-intl`.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactIntlVitePlugin from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

## Що він робить під капотом

Плагін bundler створює alias `react-intl` на `@intlayer/react-intl`. Замість ручного парсингу великих JSON файлів та обгортання вашого додатку в `IntlProvider`, плагін Intlayer статично витягує ключі та використовує словники Intlayer під час виконання.

Під капотом:

- **ICU MessageFormat:** Intlayer використовує resolver `resolveMessage(..., 'icu')` який повністю підтримує ICU множину, вибір, форматування дати/числа та теги багатого тексту нативно.
- **Методи та JSX callers:** `intl.formatMessage({ id: 'a.b' })` та `<FormattedMessage id="a.b">` ідентифікуються плагінами компілятора Intlayer (`@intlayer/babel` / `@intlayer/swc`), конвертуючи плоскі ключі з крапками так, щоб перший сегмент коректно розв'язувався на ключ словника Intlayer.
- **Форматери:** `<FormattedNumber>`, `<FormattedDate>` тощо мостять до нативних `core/formatters` використовуючи `Intl`.

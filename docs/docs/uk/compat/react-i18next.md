---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Міграція з react-i18next на Intlayer"
description: "Дізнайтесь, як мігрувати свій React додаток з react-i18next на Intlayer за допомогою адаптера сумісності."
keywords:
  - react-i18next
  - i18next
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Міграція з react-i18next на Intlayer

Для повного та детального покрокового посібника дивіться наш повний [Посібник міграції з react-i18next](../migration_from_react-i18next_to_intlayer.md).

Використання адаптера сумісності Intlayer дозволяє вам перейти з `react-i18next` без будь-яких змін у імпортах вихідного коду.

## Що робити

Щоб ініціалізувати проект, виконайте:

```bash
npx intlayer init
```

Під час ініціалізації Intlayer встановить `@intlayer/react-i18next` і створить `intlayer.config.ts`. У вашому bundler (наприклад, Vite) застосуйте плагін Intlayer:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

## Що воно робить під капотом

`reactI18nextVitePlugin` обгортає основний плагін `vite-intlayer` і вводить alias'и розділення для `react-i18next` та `i18next`, перенаправляючи їх на `@intlayer/react-i18next` та `@intlayer/i18next`.

Під капотом:

- **`useTranslation` & `withTranslation`:** Переписано для використання нативних хуків Intlayer, що дає вам автоматичне завершення TypeScript для ключів вашого словника. Безпроблемно підтримує простори імен (наприклад `t('namespace:key')`).
- **Множини & Контекст:** Обробляє pluralization на основі суфіксів в i18next (`key_one`, `key_other`) з використанням нативного `Intl.PluralRules` та суфіксів контексту (`key_male`).
- **`<Trans>` Компонент:** Перереалізований для підтримки пропса `components`, форм об'єкта та масиву, а також нумерованих тегів `<1>...</1>` з прямим відображенням на ваші React-вузли.
- **`i18n` екземпляр:** Розв'язує ключі безпосередньо з Intlayer без завантаження великих JSON-файлів, що призводить до значно менших розмірів bundle.

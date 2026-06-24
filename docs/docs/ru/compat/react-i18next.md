---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Миграция с react-i18next на Intlayer"
description: "Узнайте, как перенести ваше приложение React с react-i18next на Intlayer, используя адаптер совместимости."
keywords:
  - react-i18next
  - i18next
  - intlayer
  - миграция
  - compat
slugs:
  - doc
  - compatibility
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Инициализация истории"
author: aymericzip
---

# Миграция с react-i18next на Intlayer

Для полного и подробного пошагового учебника см. наше полное [руководство по миграции react-i18next](../migration_from_react-i18next_to_intlayer.md).

Использование адаптера совместимости Intlayer позволяет вам переместить с `react-i18next` без каких-либо изменений в импортах исходного кода.

## Что делать

Чтобы инициализировать проект, запустите:

```bash
npx intlayer init
```

Во время инициализации Intlayer установит `@intlayer/react-i18next` и создаст `intlayer.config.ts`. В вашем bundler (например, Vite) примените плагин Intlayer:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

## Что происходит под капотом

`reactI18nextVitePlugin` оборачивает основной плагин `vite-intlayer` и впрыскивает resolve псевдонимы для `react-i18next` и `i18next`, перенаправляя их на `@intlayer/react-i18next` и `@intlayer/i18next`.

Под капотом:

- **`useTranslation` & `withTranslation`:** Переписаны для использования встроенных хуков Intlayer, предоставляя вам автоматическое завершение TypeScript для ключей вашего словаря. Это безлично поддерживает пространства имён (например, `t('namespace:key')`).
- **Множественное число и контекст:** Обрабатывает множественное число на основе суффиксов i18next (`key_one`, `key_other`), используя встроенный `Intl.PluralRules` и суффиксы контекста (`key_male`).
- **Компонент `<Trans>`:** Переимплементирован для поддержки prop `components`, объектных и массивных форм, и нумерованных тегов `<1>...</1>`, прямо сопоставляющихся с вашими узлами React.
- **Экземпляр `i18n`:** Разрешает ключи прямо из Intlayer без выборки больших JSON файлов, что приводит к значительно меньшим размерам bundle.

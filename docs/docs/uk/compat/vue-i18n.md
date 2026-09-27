---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/vue-i18n: адаптер сумісності для vue-i18n"
description: "Збережіть код на vue-i18n і обслуговуйте його через Intlayer: встановіть @intlayer/vue-i18n, налаштуйте аліаси імпортів і дізнайтеся, що адаптер змінює під капотом."
keywords:
  - vue-i18n
  - vue
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# @intlayer/vue-i18n: адаптер сумісності для vue-i18n

Якщо ваш Vue додаток наразі використовує `vue-i18n`, ви можете мігрувати на Intlayer без перепису компонентів або трансляції хуків. Intlayer надає адаптер сумісності, який ідеально віддзеркалює API `vue-i18n` під час використання потужних функцій Intlayer під капотом.

## Що робити

Щоб почати роботу, просто запустіть команду ініціалізації у вашому проєкті:

```bash
npx intlayer init --interactive
```

Під час ініціалізації Intlayer налаштує ваш файл конфігурації (`intlayer.config.ts`) і підготує ваш проєкт до міграції. Вам потрібно буде додати плагін Intlayer до конфігурації Vite, щоб автоматично створити псевдоніми для імпортів `vue-i18n`.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

## Що це робить під капотом

`vueI18nVitePlugin` впроваджує псевдонім модуля в ваш bundler. Будь-який імпорт `vue-i18n` у вашій кодовій базі буде прозоро перенаправлений на `@intlayer/vue-i18n`.

**Під капотом адаптер обробляє складний синтаксис `vue-i18n` нативно:**

- **Інтерполяція та множина:** Розв'язує `{name}` та списковану `{0}` інтерполяцію. Pipe множини (`"car | cars"`) конвертуються у вузли перерахування/множини Intlayer на основі позиційної семантики.
- **Формати:** Функції як `d()` та `n()` обгортають `Intl` під капотом, дотримуючись `datetimeFormats` та `numberFormats`, визначених у ваших опціях.
- **Глобальний та локальний стан:** `global.locale` відображається на `WritableComputedRef`, підкріплений Intlayer client, тому реактивність працює саме так як очікується (напр. `locale.value = 'fr'`).
- **Директиви:** Директива `v-t` реєструється та функціонує нормально.

Ваша програма продовжує рендеритися точно так само, як раніше, але вміст забезпечується вашими словниками Intlayer, надаючи вам типобезпеку, кращу оптимізацію bundle та безперебійну інтеграцію CMS.

> Щоб зрозуміти, звідки взялися ці бібліотеки, прочитайте історію i18n у JavaScript.

- [Історія i18n у JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/history_of_i18n.md)

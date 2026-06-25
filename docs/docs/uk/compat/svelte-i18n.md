---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Міграція з Svelte I18n на Intlayer"
description: "Дізнайтеся, як мігрувати вашу Svelte-програму з svelte-i18n на Intlayer за допомогою адаптера сумісності."
keywords:
  - svelte-i18n
  - svelte
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - svelte-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Міграція з Svelte I18n на Intlayer

Перенесення вашого Svelte додатку з `svelte-i18n` на Intlayer займає всього кілька хвилин за допомогою адаптера сумісності.

## Що робити

Просто запустіть команду ініціалізації в вашому проекті:

```bash
npx intlayer init
```

Це генерує `intlayer.config.ts`. Переконайтеся, що ваші плагіни SvelteKit / Vite обгорнуті плагіном alias від Intlayer, щоб безперебійно відобразити `svelte-i18n` на `@intlayer/svelte-i18n`.

## Як це працює під капотом

Svelte-i18n покладається на широко використовувані store (`$_`, `$t`, `$format` тощо) та ICU MessageFormat.

Під капотом:

- **Store:** Intlayer проксує store `svelte-i18n`. `$_` стає derived store поточної локалі, яка повертає Intlayer resolver.
- **Ключі:** Ваші плоскі ключі (наприклад, `$_('home.title')`) обчислюються так, що перший сегмент шляху представляє словник Intlayer.
- **ICU Syntax:** Повністю обробляється спільним ICU resolver (аналіз еквівалента `intl-messageformat`).
- **Форматери:** Виклики `$date`, `$time`, `$number` безпечно перенаправляються на вбудовані форматери Intlayer.
- **Babel/SWC Analysis:** Аналізатор Intlayer читає виклики Svelte store (`$_`) всередині ваших файлів `.svelte` перед компіляцією, щоб автоматично побудувати відповідні фрагменти словника.

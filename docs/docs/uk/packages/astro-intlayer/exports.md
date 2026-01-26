---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Пакет astro-intlayer
description: Інтеграція Astro для Intlayer, що забезпечує налаштування маршрутизації на основі локалі та керування словниками.
keywords:
  - astro-intlayer
  - astro
  - інтернаціоналізація
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Уніфікована документація для всіх експортів
---

# Пакет astro-intlayer

Пакет `astro-intlayer` надає необхідні інструменти для інтеграції Intlayer у додатки Astro. Він налаштовує маршрутизацію на основі локалі та керування словниками.

## Встановлення

```bash
npm install astro-intlayer
```

## Експорти

### Інтеграція

Пакет `astro-intlayer` надає інтеграцію для Astro для налаштування Intlayer у вашому проєкті.

Імпорт:

```tsx
import "astro-intlayer";
```

або додайте в `astro.config.mjs`:

```ts
export default defineConfig({
  integrations: [intlayer()],
});
```

| Функція    | Опис                                                            |
| ---------- | --------------------------------------------------------------- |
| `intlayer` | Інтеграція для Astro, яка налаштовує Intlayer у вашому проєкті. |

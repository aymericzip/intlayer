---
createdAt: 2026-01-21
updatedAt: 2026-09-19
priority: 5
title: Документація інтеграції intlayer | astro-intlayer
description: Дізнайтеся, як налаштувати та використовувати інтеграцію Astro intlayer у файлі astro.config.mjs.
keywords:
  - intlayer
  - astro
  - astro-intlayer
  - інтеграція
  - i18n
  - Інтернаціоналізація
  - Документація
slugs:
  - doc
  - packages
  - astro-intlayer
  - intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Оновлено документацію інтеграції з деталями про middleware та хуки"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Ініціалізація документації"
author: aymericzip
---

# Документація інтеграції Astro intlayer

Інтеграція `intlayer` для Astro налаштовує ваш проект для багатомовної інтернаціоналізації (i18n). Вона відповідає за підготовку словників під час збирання, додавання плагінів Vite, автоматичну реєстрацію middleware запитів та створення локалізованих пререндерених сторінок.

## Використання

Додайте `intlayer()` до вашого `astro.config.mjs`:

```ts fileName="astro.config.mjs"
import { defineConfig } from "astro/config";
import { intlayer } from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

Команда codemod Astro CLI (`astro add astro-intlayer`) також створює імпорт за замовчуванням, який повністю підтримується:

```ts
import intlayer from "astro-intlayer";
```

## Опис

Інтеграція підключається до життєвого циклу збирання та виконання Astro:

1. **Налаштування конфігурації (`astro:config:setup`)**:
   - **Підготовка словників**: Готує словники Intlayer та згенеровані типи перед запуском збирання.
   - **Плагіни Vite**: Додає плагіни для псевдонімів Vite (забезпечуючи зручний імпорт словників), проксі маршрутизації локалей та оптимізації коду.
   - **Реєстрація Middleware**: Автоматично додає `astro-intlayer/middleware` до ланцюжка middleware проекту, заповнюючи `Astro.locals.intlayer` для кожного вхідного запиту.
2. **Завершення збирання (`astro:build:done`)**:
   - **Переписування сторінок**: Аналізує правила переписування локалізованих URL-адрес та генерує пререндерені сторінки HTML за відповідними локалізованими шляхами.

## Що надається "з коробки"

Після налаштування ваш додаток Astro може одразу використовувати:

- Хуки `useIntlayer`, `useDictionary` та `useLocale` всередині frontmatter компонентів `.astro`.
- Об'єкт `Astro.locals.intlayer` в ендпоінтах та сторінках Astro.
- Клієнтські імпорти в блоках `<script>`, які дублюють той самий API з реактивними оновленнями.
- Вбудовані форматери в `astro-intlayer/format` (`useDate`, `useNumber`, `useCurrency` тощо).

## Пов'язана документація

- [Хук `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/astro-intlayer/useIntlayer.md)
- [Хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/astro-intlayer/useLocale.md)
- [Middleware `onRequest`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/astro-intlayer/onRequest.md)

---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Мігрувати з Transloco на Intlayer"
description: "Дізнайтеся, як мігрувати свій Angular додаток з Transloco на Intlayer за допомогою compat адаптера."
keywords:
  - transloco
  - angular
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - transloco
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Міграція з Transloco на Intlayer

Якщо ваш Angular додаток наразі використовує `@jsverse/transloco`, ви можете перенести його на Intlayer, використовуючи наш адаптер сумісності. Цей перехід дозволяє вам зберегти існуючий синтаксис шаблонів, одночасно використовуючи потужну структуру словників Intlayer.

## Що робити

Просто запустіть команду ініціалізації у вашому проекті:

```bash
npx intlayer init
```

Це створить необхідний конфігураційний файл `intlayer.config.ts`. Далі ви замінюєте свої імпорти Transloco на модулі `@intlayer/transloco` або покладаєтесь на build aliases.

## Що він робить під капотом

Transloco використовує scopes та `TranslocoService` (`translate`, `selectTranslate`), поряд зі structural directives (`*transloco="let t"`) та pipes (`| transloco`).

Під капотом:

- **Scopes:** Природно відображаються на ключі словників Intlayer, забезпечуючи чудову історію pruning для оптимізації bundle.
- **Service & Directives:** Angular adapter Intlayer безпроблемно замінює providers, дозволяючи вашим існуючим template pipes та directives розв'язувати рядки від словників Intlayer.
- **Build time parsing:** TypeScript analyzer розпізнає виклики `instant/get` та fallback pruning забезпечує коректність навіть коли використання template не можна статично відстежити.

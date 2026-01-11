---
createdAt: 2024-08-11
updatedAt: 2026-01-06
title: Перелік файлів декларації контенту
description: Дізнайтеся, як перерахувати всі файли декларацій контенту у вашому проєкті.
keywords:
  - Перелік
  - Декларація контенту
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - list
history:
  - version: 7.5.12
    date: 2026-01-06
    changes: Додано опцію виводу абсолютних шляхів для команди list
  - version: 7.5.11
    date: 2026-01-06
    changes: Додано опцію виводу у форматі JSON для команди list
---

# Перелік файлів декларації контенту

```bash
npx intlayer content list
```

## Аліаси:

- `npx intlayer list`

Ця команда відображає всі файли декларації контенту у вашому проєкті, показуючи їхні ключі в словнику та шляхи до файлів. Це корисно для отримання огляду всіх ваших файлів контенту та перевірки того, що Intlayer правильно їх виявляє.

## Arguments:

- **`--json`**: Виводити результати у форматі JSON замість відформатованого тексту. Корисно для скриптів і програмного доступу.

  > Приклад: `npx intlayer content list --json`

## Examples:

### List content declaration files:

```bash
npx intlayer content list
```

### Output as JSON:

```bash
npx intlayer content list --json
```

### Output as absolute paths:

```bash
npx intlayer content list --absolute
```

## Example output:

### Formatted output:

```bash
npx intlayer content list
Content declaration files:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Загальна кількість файлів декларації контенту: 3
```

### Вивід у форматі JSON:

```bash
$ npx intlayer content list --json

[{"key":"home-page","path":"src/components/HomePage/homePage.content.ts"},{"key":"server-component","path":"src/components/ServerComponent/serverComponent.content.ts"},{"key":"client-component","path":"src/components/ClientComponent/clientComponent.content.ts"}]
```

Ця команда виведе:

- Відформатований список усіх файлів декларації контенту з їхніми ключами та відносними шляхами
- Загальну кількість знайдених файлів декларації контенту

Вивід допомагає переконатися, що всі ваші файли контенту налаштовані правильно й доступні системі Intlayer.

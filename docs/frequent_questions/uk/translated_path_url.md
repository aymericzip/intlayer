---
createdAt: 2025-05-20
updatedAt: 2026-01-22
title: Чи можна перекласти шлях URL?
description: Дізнайтеся, як перекласти шлях URL.
keywords:
  - масив
  - контент
  - оголошення
  - intlayer
  - middleware
  - проксі
  - переписання
  - префікс
  - локаль
  - url
slugs:
  - frequent-questions
  - translated-path-url
---

# Чи можливо перекладати URL-адреси?

Так! Intlayer підтримує спеціальні переписання URL, які дозволяють визначати шляхи, специфічні для локалі. Наприклад:

```bash
en -> /product
fr -> /fr/produit
es -> /es/producto
```

Щоб реалізувати це, ви можете налаштувати розділ `routing` у вашому файлі `intlayer.config.ts`.

Для отримання додаткової інформації про те, як реалізувати цю функцію, див. [документацію про спеціальні переписання URL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md).

Ви також можете використовувати функції `getMultilingualUrl` та `getLocalizedUrl` для програмної генерації цих URL-адрес, і вони будуть враховувати ваші правила переписання.

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/produit (якщо налаштовано)
```

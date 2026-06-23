---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Документація функції usePathname | vue-intlayer
description: Дізнайтеся, як використовувати функцію usePathname з пакета vue-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Інтернаціоналізація
  - Документація
  - Vue
  - JavaScript
slugs:
  - doc
  - packages
  - vue-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Додано утиліту usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Ініціалізація історії"
author: aymericzip
---

# Інтеграція з Vue: Документація `usePathname`

Функція `usePathname` повертає поточний шлях браузера (pathname) з видаленим сегментом локалі, як Vue `ComputedRef<string>`. Це корисно для створення навігації, що залежить від локалі — наприклад, щоб визначити, який елемент навігації є активним — без необхідності обробляти префікс локалі вручну.

## Імпорт `usePathname` у Vue

```typescript
import { usePathname } from "vue-intlayer";
```

## Огляд

`usePathname` створює Vue обчислюване посилання (computed ref), яке зчитує `window.location.pathname`, видаляє префікс локалі через `getPathWithoutLocale` і оновлює своє значення щоразу, коли браузер ініціює подію `popstate` (навігація назад/вперед). Це значення можна безпосередньо використовувати у ваших шаблонах Vue або функціях setup.

## Використання

```vue fileName="src/components/NavItem.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const props = defineProps<{
  href: string;
  label: string;
}>();

const pathname = usePathname();
</script>

<template>
  <a :href="href" :aria-current="pathname === href ? 'page' : undefined">
    {{ label }}
  </a>
</template>
```

## Значення, що повертається

| Тип                   | Опис                                                                                |
| --------------------- | ----------------------------------------------------------------------------------- |
| `ComputedRef<string>` | Vue Computed Ref, що містить поточний шлях браузера (pathname) без префіксу локалі. |

## Поведінка

- **Видалення локалі (Locale stripping)**: Видаляє початковий сегмент локалі (наприклад, `/uk/dashboard` → `/dashboard`).
- **Реактивність**: Оновлює значення при кожній події `popstate` (навігація браузера назад / вперед).
- **Безпека для SSR**: Повертає `""`, коли `window` недоступний.
- **Очищення (Cleanup)**: Слухач події `popstate` додається глобально під час ініціалізації і зазвичай не потребує ручного очищення в кожному компоненті завдяки тому, як Vue керує життєвим циклом.

## Приклад

```vue fileName="src/components/Sidebar.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const links = [
  { href: "/dashboard", label: "Дашборд" },
  { href: "/settings", label: "Налаштування" },
];

const pathname = usePathname();
</script>

<template>
  <nav>
    <a
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      :style="{ fontWeight: pathname === link.href ? 'bold' : 'normal' }"
    >
      {{ link.label }}
    </a>
  </nav>
</template>
```

## Пов'язане

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vue-intlayer/useLocale.md) — поточна локаль + перемикач локалі
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getPathWithoutLocale.md) — базова утиліта, що використовується цим хуком

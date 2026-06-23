---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Документация функции usePathname | vue-intlayer
description: Узнайте, как использовать функцию usePathname из пакета vue-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Интернационализация
  - Документация
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
    changes: "Добавлена утилита usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Инициализация истории"
author: aymericzip
---

# Интеграция с Vue: Документация `usePathname`

Функция `usePathname` возвращает текущий путь (pathname) браузера с удалённым сегментом локали в виде вычисляемого свойства (computed ref) Vue, `ComputedRef<string>`. Это полезно для создания навигации с учётом локали — например, для определения активного элемента меню — без необходимости вручную удалять префикс локали.

## Импорт `usePathname` во Vue

```typescript
import { usePathname } from "vue-intlayer";
```

## Обзор

`usePathname` создаёт вычисляемое свойство Vue (computed ref), которое считывает `window.location.pathname`, удаляет префикс локали с помощью `getPathWithoutLocale` и обновляет своё значение каждый раз, когда браузер вызывает событие `popstate` (навигация назад/вперёд). Полученное значение можно использовать непосредственно в шаблонах (templates) Vue или в функции setup.

## Использование

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

## Возвращаемое значение

| Тип                   | Описание                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------ |
| `ComputedRef<string>` | Вычисляемое свойство (computed ref) Vue, содержащее текущий путь (pathname) без префикса локали. |

## Поведение

- **Удаление локали**: Удаляет начальный сегмент локали (например, `/ru/dashboard` → `/dashboard`).
- **Реактивность**: Обновляет значение при каждом событии `popstate` (при навигации назад/вперёд в браузере).
- **Безопасность для SSR**: Возвращает `""`, если объект `window` недоступен.
- **Очистка (Cleanup)**: Слушатель события `popstate` добавляется глобально при инициализации и обычно не требует ручной очистки в каждом компоненте благодаря механизмам жизненного цикла Vue.

## Пример

```vue fileName="src/components/Sidebar.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const links = [
  { href: "/dashboard", label: "Дашборд" },
  { href: "/settings", label: "Настройки" },
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

## Связанные разделы

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vue-intlayer/useLocale.md) — текущая локаль + переключатель локали
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getPathWithoutLocale.md) — базовая утилита, используемая этим хуком

---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Документація composable useRewriteURL
description: Composable для Vue, що керує локалізованими перезаписами URL в Intlayer.
keywords:
  - useRewriteURL
  - vue-intlayer
  - vue
  - інтернаціоналізація
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - useRewriteURL
---

# Composable useRewriteURL

`useRewriteURL` composable для Vue 3 призначений для обробки локалізованих перезаписів URL на клієнті. Він автоматично виправляє URL у браузері до його «красивої» локалізованої версії на основі поточної локалі користувача та конфігурації у `intlayer.config.ts`.

Це реалізовано за допомогою `window.history.replaceState`, що дозволяє уникнути небажаних навігацій через Vue Router.

## Використання

Викликайте composable всередині вашої функції `setup()` або у `<script setup>`.

```vue
<script setup>
import { useRewriteURL } from "vue-intlayer";

// Автоматично виправляє /fr/tests на /fr/essais у адресному рядку, якщо існує правило перепису
useRewriteURL();
</script>

<template>
  <router-view />
</template>
```

## Як це працює

1. **Реактивний моніторинг**: composable встановлює `watch` на `locale` користувача.
2. **Пошук відповідності перепису**: Коли змінюється локаль (або при монтуванні), він перевіряє, чи збігається поточний `window.location.pathname` з канонічним маршрутом, для якого існує більш читабельний локалізований alias.
3. **Виправлення URL**: Якщо знайдено більш читабельний alias, composable викликає `window.history.replaceState`, щоб оновити адресний рядок без перезавантаження сторінки або втрати стану роутера.

## Чому варто використовувати?

- **Оптимізація SEO**: Гарантує, що пошукові системи індексують авторитетну локалізовану версію ваших URL.
  /// **Покращений UX**: Виправляє вручну введені URL, щоб відображати ваші бажані найменування (наприклад, `/fr/a-propos` замість `/fr/about`).
  /// **Низьке навантаження**: Тихо оновлює URL без повторного виклику життєвих циклів компонентів або navigation guards.
  ///
  ///

---

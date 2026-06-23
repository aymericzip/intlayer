---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Dokumentacja funkcji usePathname | vue-intlayer
description: Dowiedz się, jak korzystać z funkcji usePathname z pakietu vue-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internacjonalizacja
  - Dokumentacja
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
    changes: "Dodanie narzędzia usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Inicjalizacja historii"
author: aymericzip
---

# Integracja Vue: Dokumentacja `usePathname`

Funkcja `usePathname` zwraca obecny pathname przeglądarki z usuniętym segmentem locale, w postaci `ComputedRef<string>` z Vue. Jest to przydatne do budowy nawigacji uwzględniającej locale — na przykład, aby określić, który element nawigacji jest aktywny — bez konieczności ręcznego usuwania prefiksu locale.

## Importowanie `usePathname` w Vue

```typescript
import { usePathname } from "vue-intlayer";
```

## Przegląd

`usePathname` tworzy Vue computed ref, który odczytuje `window.location.pathname`, usuwa prefiks locale za pomocą `getPathWithoutLocale`, i aktualizuje swoją wartość za każdym razem, gdy przeglądarka wywoła zdarzenie `popstate` (nawigacja wstecz/dalej). Ta wartość może być używana bezpośrednio w Twoich szablonach Vue lub funkcjach setup.

## Użycie

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

## Zwracana Wartość

| Typ                   | Opis                                                                                            |
| --------------------- | ----------------------------------------------------------------------------------------------- |
| `ComputedRef<string>` | Obiekt typu Computed Ref z Vue, zawierający obecny pathname z przeglądarki bez prefiksu locale. |

## Zachowanie

- **Usuwanie locale**: Usuwa wiodący segment locale (np. `/pl/dashboard` → `/dashboard`).
- **Reaktywność**: Aktualizuje wartość przy każdym zdarzeniu `popstate` (nawigacja wstecz / do przodu w przeglądarce).
- **Bezpieczne dla SSR**: Zwraca `""`, gdy `window` nie jest dostępne.
- **Czyszczenie (Cleanup)**: Nasłuchiwacz (listener) `popstate` jest dodawany globalnie podczas inicjalizacji i zazwyczaj nie wymaga ręcznego czyszczenia na poziomie komponentu, dzięki temu, jak Vue zarządza cyklem życia.

## Przykład

```vue fileName="src/components/Sidebar.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const links = [
  { href: "/dashboard", label: "Panel" },
  { href: "/settings", label: "Ustawienia" },
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

## Powiązane

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vue-intlayer/useLocale.md) — obecny locale + przełącznik locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getPathWithoutLocale.md) — użyteczność bazowa (utility) wykorzystywana przez ten hook

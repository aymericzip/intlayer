---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Funktion Dokumentation | vue-intlayer
description: Erfahren Sie, wie Sie die usePathname Funktion aus dem vue-intlayer Paket nutzen
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalisierung
  - Dokumentation
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
    changes: "usePathname-Dienstprogramm hinzufügen"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Init history"
author: aymericzip
---

# Vue Integration: `usePathname` Dokumentation

Die `usePathname` Funktion gibt den aktuellen Browser-Pfad (pathname) ohne das Locale-Segment als eine `ComputedRef<string>` in Vue zurück. Dies ist nützlich für den Aufbau einer Locale-basierten Navigation – zum Beispiel, um festzustellen, welcher Navigationspunkt aktiv ist – ohne den Locale-Präfix manuell entfernen zu müssen.

## Importieren von `usePathname` in Vue

```typescript
import { usePathname } from "vue-intlayer";
```

## Übersicht

`usePathname` erstellt eine berechnete Referenz (computed ref) in Vue, die `window.location.pathname` liest, das Locale-Präfix mittels `getPathWithoutLocale` entfernt und ihren Wert aktualisiert, wann immer der Browser ein `popstate` Ereignis auslöst (Zurück/Vorwärts-Navigation). Der Wert kann direkt in Ihren Vue-Templates oder Setup-Funktionen verwendet werden.

## Verwendung

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

## Rückgabewert

| Typ                   | Beschreibung                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------ |
| `ComputedRef<string>` | Vue Computed Ref, die den aktuellen Browser-Pfadnamen (pathname) ohne das Locale-Präfix enthält. |

## Verhalten

- **Locale-Bereinigung**: Entfernt das führende Locale-Segment (z.B. `/de/dashboard` → `/dashboard`).
- **Reaktiv**: Aktualisiert den Wert bei jedem `popstate` Event (Browser-Vor/Zurück-Navigation).
- **SSR-sicher**: Gibt `""` zurück, wenn `window` nicht verfügbar ist.
- **Bereinigung (Cleanup)**: Der `popstate` Event-Listener wird bei Initialisierung global hinzugefügt und erfordert aufgrund der Verwaltung des Lebenszyklus durch Vue in der Regel keine manuelle komponentenspezifische Bereinigung.

## Beispiel

```vue fileName="src/components/Sidebar.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Einstellungen" },
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

## Verwandt

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vue-intlayer/useLocale.md) — aktuelles Locale + Locale-Umschalter
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getPathWithoutLocale.md) — das von diesem Hook intern verwendete Hilfswerkzeug

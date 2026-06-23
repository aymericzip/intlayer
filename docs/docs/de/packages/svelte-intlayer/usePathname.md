---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Funktion Dokumentation | svelte-intlayer
description: Sehen Sie, wie Sie die Funktion usePathname für das Paket svelte-intlayer verwenden
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalisierung
  - Dokumentation
  - Svelte
  - JavaScript
slugs:
  - doc
  - packages
  - svelte-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Dienstprogramm usePathname hinzufügen"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Historie initialisieren"
author: aymericzip
---

# Svelte Integration: `usePathname` Dokumentation

Die Funktion `usePathname` gibt den aktuellen Browser-Pfadnamen (pathname) ohne das Locale-Segment als einen Svelte `Readable<string>` Store zurück. Sie ist nützlich für den Aufbau einer Locale-bewussten Navigation — zum Beispiel, um festzustellen, welches Navigationselement aktiv ist —, ohne das Locale-Präfix manuell entfernen zu müssen.

## Importieren von `usePathname` in Svelte

```typescript
import { usePathname } from "svelte-intlayer";
```

## Überblick

`usePathname` erstellt einen lesbaren Svelte-Store, der `window.location.pathname` liest, das Locale-Präfix über `getPathWithoutLocale` entfernt und einen neuen Wert ausgibt, wenn der Browser ein `popstate`-Ereignis auslöst (Zurück/Vorwärts-Navigation). Abonnieren Sie diesen Store mit der `$` Store-Syntax in Komponenten.

## Verwendung

```svelte fileName="src/components/NavItem.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  export let href: string;
  export let label: string;

  const pathname = usePathname();
</script>

<a {href} aria-current={$pathname === href ? "page" : undefined}>
  {label}
</a>
```

## Rückgabewert

| Typ                | Beschreibung                                                                       |
| ------------------ | ---------------------------------------------------------------------------------- |
| `Readable<string>` | Lesbarer Svelte-Store, der den aktuellen Pfadnamen ohne das Locale-Präfix enthält. |

## Verhalten

- **Entfernen des Locales**: Entfernt das führende Locale-Segment (z. B. `/de/dashboard` → `/dashboard`).
- **Reaktiv**: Gibt bei jedem `popstate`-Ereignis (Zurück / Vorwärts im Browser) einen neuen Wert aus.
- **SSR-sicher**: Gibt `""` zurück, wenn `window` nicht verfügbar ist.
- **Bereinigung (Cleanup)**: Der `popstate`-Listener wird automatisch entfernt, wenn der letzte Abonnent sich abmeldet.

## Beispiel

```svelte fileName="src/components/Sidebar.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/settings", label: "Einstellungen" },
  ];

  const pathname = usePathname();
</script>

<nav>
  {#each links as link}
    <a
      href={link.href}
      style:font-weight={$pathname === link.href ? "bold" : "normal"}
    >
      {link.label}
    </a>
  {/each}
</nav>
```

## Verwandt

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/svelte-intlayer/useLocale.md) — aktuelle Locale + Locale-Umschalter
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getPathWithoutLocale.md) — das grundlegende Dienstprogramm, das von diesem Hook verwendet wird

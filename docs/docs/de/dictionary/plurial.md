---
createdAt: 2026-05-04
updatedAt: 2026-05-04
title: Plural
description: Erfahren Sie, wie Sie sprachabhängige Pluralinhalte (CLDR-basiert) in Ihrer mehrsprachigen Website deklarieren und verwenden. Folgen Sie den Schritten in dieser Online-Dokumentation, um Ihr Projekt in wenigen Minuten einzurichten.
keywords:
  - Plural
  - Pluralisierung
  - CLDR
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - plural
history:
  - version: 8.8.0
    date: 2026-05-04
    changes: "Init history"
author: aymericzip
---

# Pluralinhalt / Plural in Intlayer

## Wie Plural funktioniert

<Tabs group="framework">
  <Tab label="React" value="react">

To use plural content inside a React component, retrieve it via the `useIntlayer` hook and call it with a count. The active locale and the count are combined to pick the matching CLDR category.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To use plural content in Next.js Client Components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

To use plural content in Vue components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

defineProps<{ count: number }>();

const { totalOpenings } = useIntlayer("total_openings");
</script>

<template>
  <div>
    <p>{{ totalOpenings(count) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To use plural content in Svelte components, retrieve it via the `useIntlayer` hook and call it with a count. The store is accessed with `$`. Here's an example:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

export let count: number;

const content = useIntlayer("total_openings");
</script>

<div>
  <p>{$content.totalOpenings(count)}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To use plural content in Preact components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

To use plural content in SolidJS components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const OpeningsComponent: Component<{ count: number }> = (props) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(props.count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

To use plural content in Angular components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component, Input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-openings",
  template: `
    <div>
      <p>{{ content().totalOpenings(count) }}</p>
    </div>
  `,
})
export class OpeningsComponent {
  @Input() count!: number;

  content = useIntlayer("total_openings");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To use plural content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("total_openings").onChange((newContent) => {
  document.getElementById("openings")!.textContent =
    newContent.totalOpenings(5);
});

// Initial render
document.getElementById("openings")!.textContent = content.totalOpenings(5);
```

  </Tab>
</Tabs>
## Wann man `plural` vs `enu` verwendet

<Tabs group="framework">
  <Tab label="React" value="react">

To use plural content inside a React component, retrieve it via the `useIntlayer` hook and call it with a count. The active locale and the count are combined to pick the matching CLDR category.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To use plural content in Next.js Client Components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

To use plural content in Vue components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

defineProps<{ count: number }>();

const { totalOpenings } = useIntlayer("total_openings");
</script>

<template>
  <div>
    <p>{{ totalOpenings(count) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To use plural content in Svelte components, retrieve it via the `useIntlayer` hook and call it with a count. The store is accessed with `$`. Here's an example:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

export let count: number;

const content = useIntlayer("total_openings");
</script>

<div>
  <p>{$content.totalOpenings(count)}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To use plural content in Preact components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

To use plural content in SolidJS components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const OpeningsComponent: Component<{ count: number }> = (props) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      <p>{totalOpenings(props.count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

To use plural content in Angular components, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component, Input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-openings",
  template: `
    <div>
      <p>{{ content().totalOpenings(count) }}</p>
    </div>
  `,
})
export class OpeningsComponent {
  @Input() count!: number;

  content = useIntlayer("total_openings");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To use plural content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook and call it with a count. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("total_openings").onChange((newContent) => {
  document.getElementById("openings")!.textContent =
    newContent.totalOpenings(5);
});

// Initial render
document.getElementById("openings")!.textContent = content.totalOpenings(5);
```

  </Tab>
</Tabs>

## Pluralinhalt einrichten

Um Pluralinhalt in Ihrem Intlayer-Projekt einzurichten, erstellen Sie ein Inhaltsmodul, das den `plural`-Helfer verwendet. Die Kategorie `other` ist erforderlich und wird als Fallback verwendet, wenn ein Gebietsschema keine spezifischere Kategorie definiert.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      de: plural({
        one: "{{count}} Stelle",
        other: "{{count}} Stellen",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "total_openings",
  "content": {
    "totalOpenings": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} opening",
            "other": "{{count}} openings"
          }
        },
        "de": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} Stelle",
            "other": "{{count}} Stellen"
          }
        }
      }
    }
  }
}
```

> Die unterstützten Kategorien sind `zero`, `one`, `two`, `few`, `many`, `other`. Sie müssen nur die Kategorien deklarieren, die Ihre Zielsprache verwendet – Intlayer fällt auf `other` zurück, wenn keine spezifische Kategorie passt.
>
> Der Platzhalter `{{count}}` wird automatisch durch die Anzahl ersetzt, die Sie zur Laufzeit übergeben. Sie können auch andere Platzhalter einschließen (siehe [Benutzerdefinierte Platzhalter](#custom-placeholders) unten).

## Pluralinhalt mit React Intlayer verwenden

Um Pluralinhalt in einer React-Komponente zu verwenden, rufen Sie ihn über den Hook `useIntlayer` ab und rufen Sie ihn mit einer Anzahl auf. Das aktive Gebietsschema und die Anzahl werden kombiniert, um die passende CLDR-Kategorie auszuwählen.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      {/* Auf Englisch:                                  */}
      {/*  count=0  → "0 openings"   (other)           */}
      {/*  count=1  → "1 opening"    (one)             */}
      {/*  count=2  → "2 openings"   (other)           */}
      {/*  count=21 → "21 openings"  (other)           */}
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

Sie können die zurückgegebene Funktion auf zwei äquivalente Arten aufrufen:

```tsx
totalOpenings(21); // Kurzform: nur Anzahl
totalOpenings({ count: 21 }); // explizite Form
```

## Benutzerdefinierte Platzhalter

Plural-Zeichenfolgen können andere Platzhalter als `{{count}}` enthalten. Übergeben Sie diese in der Objektform zusammen mit `count`:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox_summary",
  content: {
    summary: plural({
      one: "{{name}}, du hast {{count}} neue Nachricht",
      other: "{{name}}, du hast {{count}} neue Nachrichten",
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
const { summary } = useIntlayer("inbox_summary");

summary({ count: 1, name: "Alice" });
// → "Alice, du hast 1 neue Nachricht"

summary({ count: 7, name: "Alice" });
// → "Alice, du hast 7 neue Nachrichten"
```

## CLDR-Kategorien auf einen Blick

Verschiedene Sprachen verwenden unterschiedliche Teilmengen der CLDR-Kategorien. Einige häufige Fälle:

| Sprache                | Verwendete Kategorien                        |
| ---------------------- | -------------------------------------------- |
| Englisch (`en`)        | `one`, `other`                               |
| Französisch (`fr`)     | `one`, `many`, `other`                       |
| Russisch (`ru`)        | `one`, `few`, `many`, `other`                |
| Polnisch (`pl`)        | `one`, `few`, `many`, `other`                |
| Arabisch (`ar`)        | `zero`, `one`, `two`, `few`, `many`, `other` |
| Japanisch / Chinesisch | nur `other`                                  |

Sie müssen sich das nicht merken – deklarieren Sie die Kategorien, für die Sie Übersetzungen haben, und Intlayer wird bei Bedarf auf `other` zurückgreifen.

## Einschränkung

Im Gegensatz zu anderen Knoten kann der `plural`-Knoten noch nicht mit untergeordneten Knoten verschachtelt werden.

Beispiel:

Gültig:

```ts
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      fr: plural({
        one: "{{count}} offre",
        other: "{{count}} offres",
      }),
    }),
```

Ungültig:

```ts
totalOpenings: plural({
  one: t({
    en: "{{count}} opening",
    fr: "{{count}} offre",
  }),
  other: t({
    en: "{{count}} openings",
    fr: "{{count}} offres",
  }),
}),
```

## Zusätzliche Ressourcen

Weitere detaillierte Informationen zur Konfiguration und Verwendung finden Sie in den folgenden Ressourcen:

- [Dokumentation zur Aufzählung (Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/enumeration.md)
- [Dokumentation zur Einfügung (Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/insertion.md)
- [Intlayer CLI Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md)
- [React Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_create_react_app.md)
- [Next Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_15.md)

Diese Ressourcen bieten weitere Einblicke in die Einrichtung und Verwendung von Intlayer in verschiedenen Umgebungen und Frameworks.

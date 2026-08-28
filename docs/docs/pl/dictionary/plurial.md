---
createdAt: 2026-05-04
updatedAt: 2026-05-04
title: Liczba mnoga
description: Dowiedz się, jak deklarować i używać treści w liczbie mnogiej zależnych od języka (opartych na CLDR) w swojej wielojęzycznej witrynie. Postępuj zgodnie z krokami w tej dokumentacji online, aby skonfigurować swój projekt w kilka minut.
keywords:
  - Liczba mnoga
  - Pluralizacja
  - CLDR
  - Internacjonalizacja
  - Dokumentacja
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

# Treści w liczbie mnogiej / Liczba mnoga w Intlayer

## Jak działa liczba mnoga

W Intlayer treści w liczbie mnogiej są realizowane za pomocą funkcji `plural`, która mapuje kategorie liczby mnogiej CLDR, `zero`, `one`, `two`, `few`, `many`, `other`, do odpowiadającej im treści. Prawidłowa kategoria jest wybierana automatycznie na podstawie aktywnego języka i wartości licznika, przy użyciu wbudowanego w platformę API [`Intl.PluralRules`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules).

W przeciwieństwie do [`enu`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/enumeration.md), który wybiera treści na podstawie zdefiniowanych przez Ciebie zakresów liczbowych, `plural` deleguje wybór do reguł CLDR. To właśnie sprawia, że jest on skalowalny dla języków o złożonych regułach pluralizacji, takich jak polski, rosyjski, arabski czy walijski, bez konieczności ręcznego pisania logiki modulo.

## Konfigurowanie treści w liczbie mnogiej

Aby skonfigurować treści w liczbie mnogiej w swoim projekcie Intlayer, utwórz moduł treści korzystający z pomocnika `plural`. Kategoria `other` jest wymagana i służy jako rezerwowa, gdy dany język nie definiuje bardziej szczegółowej kategorii.

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
      pl: plural({
        one: "{{count}} wolne miejsce",
        few: "{{count}} wolne miejsca",
        many: "{{count}} wolnych miejsc",
        other: "{{count}} wolnych miejsc",
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
        "pl": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} wolne miejsce",
            "few": "{{count}} wolne miejsca",
            "many": "{{count}} wolnych miejsc",
            "other": "{{count}} wolnych miejsc"
          }
        }
      }
    }
  }
}
```

> Obsługiwane kategorie to `zero`, `one`, `two`, `few`, `many`, `other`. Musisz zadeklarować tylko te kategorie, których używa Twój język docelowy, Intlayer powraca do `other`, gdy żadna konkretna kategoria nie pasuje.
>
> Symbol zastępczy `{{count}}` jest automatycznie zastępowany wartością licznika przekazaną w czasie wykonywania. Możesz również dołączyć inne symbole zastępcze (patrz [Niestandardowe symbole zastępcze](#custom-placeholders) poniżej).

## Używanie treści w liczbie mnogiej z React Intlayer

<Tabs group="framework">
  <Tab label="React" value="react">

Aby użyć treści w liczbie mnogiej w komponencie React, pobierz ją za pomocą hooka `useIntlayer` i wywołaj z licznikiem. Aktywny język i licznik są łączone, aby wybrać pasującą kategorię CLDR.

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

Aby używać pluralnej zawartości w Next.js Client Components, pobierz ją za pomocą hook'a `useIntlayer` i wywołaj ją z parametrem count. Oto przykład:

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

Aby używać zawartości w liczbie mnogiej w komponentach Vue, pobierz ją za pośrednictwem hook'a `useIntlayer` i wywołaj ją z parametrem count. Oto przykład:

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

Aby używać treści w liczbie mnogiej w komponentach Svelte, pobierz je za pomocą hooka `useIntlayer` i wywołaj go z liczbą. Sklep jest dostępny za pomocą `$`. Oto przykład:

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

Aby używać zawartości w liczbie mnogiej w komponentach Preact, pobierz ją za pomocą hooka `useIntlayer` i wywołaj ją z licznikiem. Oto przykład:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      {/* W języku angielskim:                               */}
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

  </Tab>
  <Tab label="Solid" value="solid">

Aby korzystać z pluralnej zawartości w komponentach SolidJS, pobierz ją za pośrednictwem hooku `useIntlayer` i wywołaj ją z liczbą. Oto przykład:

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

Aby użyć zawartości w liczbie mnogiej w komponentach Angular, pobierz ją za pomocą hooka `useIntlayer` i wywołaj ją z liczbą. Oto przykład:

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

Możesz wywołać zwróconą funkcję na dwa równoważne sposoby:

Aby użyć zawartości w liczbie mnogiej z `vanilla-intlayer`, pobierz ją za pomocą hooka `useIntlayer` i wywołaj ją z liczbą. Oto przykład:

```tsx
totalOpenings(21); // skrót: tylko licznik
totalOpenings({ count: 21 }); // forma jawna
```

  </Tab>
</Tabs>

## Niestandardowe symbole zastępcze

Ciągi znaków w liczbie mnogiej mogą zawierać symbole zastępcze inne niż `{{count}}`. Przekaż je w formie obiektu obok `count`:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox_summary",
  content: {
    summary: plural({
      one: "{{name}}, masz {{count}} nową wiadomość",
      few: "{{name}}, masz {{count}} nowe wiadomości",
      many: "{{name}}, masz {{count}} nowych wiadomości",
      other: "{{name}}, masz {{count}} nowych wiadomości",
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
const { summary } = useIntlayer("inbox_summary");

summary({ count: 1, name: "Alice" });
// → "Alice, masz 1 nową wiadomość"

summary({ count: 7, name: "Alice" });
// → "Alice, masz 7 nowych wiadomości"
```

## Kategorie CLDR w skrócie

Różne języki używają różnych podzbiorów kategorii CLDR. Kilka typowych przypadków:

| Język              | Używane kategorie                            |
| ------------------ | -------------------------------------------- |
| Angielski (`en`)   | `one`, `other`                               |
| Francuski (`fr`)   | `one`, `many`, `other`                       |
| Rosyjski (`ru`)    | `one`, `few`, `many`, `other`                |
| Polski (`pl`)      | `one`, `few`, `many`, `other`                |
| Arabski (`ar`)     | `zero`, `one`, `two`, `few`, `many`, `other` |
| Japoński / Chiński | tylko `other`                                |

Nie musisz tego zapamiętywać, zadeklaruj kategorie, dla których masz tłumaczenia, a Intlayer w razie potrzeby powróci do `other`.

## Ograniczenie

W przeciwieństwie do innych węzłów, węzeł `plural` nie może być jeszcze zagnieżdżany z węzłami podrzędnymi.

Przykład:

Prawidłowe:

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

Nieprawidłowe:

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

## Dodatkowe zasoby

Aby uzyskać bardziej szczegółowe informacje na temat konfiguracji i użytkowania, zapoznaj się z następującymi zasobami:

- [Dokumentacja wyliczeń (Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/enumeration.md)
- [Dokumentacja wstawiania (Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/insertion.md)
- [Dokumentacja Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md)
- [Dokumentacja React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_create_react_app.md)
- [Dokumentacja Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_15.md)

Zasoby te oferują dalszy wgląd w konfigurację i użytkowanie Intlayer w różnych środowiskach i frameworkach.

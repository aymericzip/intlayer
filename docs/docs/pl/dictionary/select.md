---
createdAt: 2026-07-30
updatedAt: 2026-07-30
title: Treść Oparta na Wyborze (Select)
description: Dowiedz się, jak używać treści opartej na wyborze w Intlayer do dynamicznego renderowania treści na podstawie dowolnej wartości znakowej (string). Postępuj zgodnie z tą dokumentacją, aby efektywnie zaimplementować zawartość typu switch w swoim projekcie.
keywords:
  - Treść Oparta na Wyborze
  - Select Content
  - Switch Content
  - ICU select
  - Dynamiczne renderowanie
  - Dokumentacja
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - select
history:
  - version: 9.1.0
    date: 2026-07-30
    changes: "Wprowadzono treść opartą na wyborze (select)"
author: aymericzip
---

# Treść Oparta na Wyborze (Select) / Intlayer

## Jak Działa Select

W Intlayer treść oparta na wyborze jest osiągana za pomocą funkcji `select`, która mapuje dowolne wartości znakowe na odpowiadającą im treść. Jest to odpowiednik komunikatu ICU `{value, select, …}` lub podobne do instrukcji `switch` w kodzie Twojej aplikacji.

Używaj `select`, gdy dyskryminatorem (discriminant) jest dowolny ciąg znaków (string): status, plan, platforma lub rola (role). Dla innych dyskryminatorów Intlayer udostępnia dedykowane węzły:

| Dyskryminator      | Węzeł      |
| ------------------ | ---------- |
| Ilość (Quantity)   | `enu()`    |
| Logiczny (Boolean) | `cond()`   |
| Płeć (Gender)      | `gender()` |
| Dowolny inny ciąg  | `select()` |

## Konfigurowanie Treści Opartej na Wyborze

Aby skonfigurować treść opartą na wyborze w projekcie Intlayer, utwórz moduł treści zawierający Twoje definicje wyboru. Poniżej znajdują się przykłady w różnych formatach.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { select, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: "This post is a draft",
      published: "This post is live",
      scheduled: "This post is scheduled",
      fallback: "Unknown status", // opcjonalne
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "publishStatus": {
      "nodeType": "select",
      "select": {
        "draft": "This post is a draft",
        "published": "This post is live",
        "scheduled": "This post is scheduled",
        "fallback": "Unknown status", // opcjonalne
      },
    },
  },
}
```

> Jeśli nie zostanie zadeklarowany żaden `fallback`, ostatni zadeklarowany klucz jest uważany za wariant rezerwowy, gdy dostarczona wartość nie pasuje do żadnego z zadeklarowanych przypadków: dokładnie tak samo jak w kontraktach `cond()` i `gender()`.

### Bezpieczeństwo Typów (Type Safety)

Akceptowany argument jest wnioskowany z zadeklarowanych przypadków:

- Bez `fallback`, akceptowane są tylko zadeklarowane przypadki: literówka spowoduje błąd typu (type error).
- Z `fallback`, każdy ciąg znaków (string) jest akceptowany (ponieważ fallback pokrywa niedopasowane wartości), podczas gdy zadeklarowane przypadki nadal zapewniają autouzupełnianie.

## Dlaczego Nie Używać Zwykłego Obiektu?

Kuszące może być zadeklarowanie zwykłego obiektu i indeksowanie go za pomocą wartości w czasie wykonywania (runtime value):

```tsx
// ❌ Nie rób tego
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus[publishType]}</p>;
```

Kompilator Intlayer analizuje Twój kod źródłowy, aby wyeliminować nieużywane treści i zminifikować pozostałe klucze. Dynamicznie obliczany dostęp (`obj[expr]`) nie może zostać rozwiązany statycznie, dlatego cała gałąź zostanie oznaczona jako nieprzezroczysta (opaque): zostanie zachowana w bundle'u, a jej klucze nie zostaną zminifikowane.

Korzystając z `select()`, rozwiązywanie przypadków (case resolution) odbywa się wewnątrz wywołania funkcji, a nie poprzez dostęp do właściwości. Kompilator widzi to jako pojedynczy, statyczny dostęp do pola i optymalizuje ten węzeł dokładnie tak, jak robi to z `enu()`, `cond()` lub `gender()`:

```tsx
// ✅ Rób tak
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus(publishType)}</p>;
```

## Używanie Treści Opartej na Wyborze

<Tabs group="framework">
  <Tab label="React" value="react">

Aby wykorzystać treść opartą na wyborze w komponencie React, zaimportuj i użyj hooka `useIntlayer` z pakietu `react-intlayer`. Ten hook pobiera treść dla podanego klucza i pozwala przekazać wartość w celu wybrania odpowiedniego wyniku.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Wynik: This post is a draft */
          publishStatus("draft")
        }
      </p>
      <p>
        {
          /* Wynik: This post is live */
          publishStatus("published")
        }
      </p>
      <p>
        {
          /* Wynik: Unknown status */
          publishStatus("Archived")
        }
      </p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Aby wykorzystać treść opartą na wyborze w Next.js Client Components, pobierz zawartość za pomocą hooka `useIntlayer`. Oto przykład:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Vue" value="vue">

Aby wykorzystać treść opartą na wyborze w komponentach Vue, pobierz zawartość za pomocą hooka `useIntlayer`. Oto przykład:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { publishStatus } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ publishStatus("draft") }}</p>
    <p>{{ publishStatus("published") }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Aby wykorzystać treść opartą na wyborze w komponentach Svelte, pobierz zawartość za pomocą hooka `useIntlayer`. Dostęp do store uzyskuje się za pomocą znaku `$`. Oto przykład:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.publishStatus("draft")}</p>
  <p>{$content.publishStatus("published")}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Aby wykorzystać treść opartą na wyborze w komponentach Preact, pobierz zawartość za pomocą hooka `useIntlayer`. Oto przykład:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Solid" value="solid">

Aby wykorzystać treść opartą na wyborze w komponentach SolidJS, pobierz zawartość za pomocą hooka `useIntlayer`. Oto przykład:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const PostStatus: Component = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Angular" value="angular">

Aby wykorzystać treść opartą na wyborze w komponentach Angular, pobierz zawartość za pomocą hooka `useIntlayer`. Oto przykład:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-post-status",
  template: `
    <div>
      <p>{{ content().publishStatus("draft") }}</p>
      <p>{{ content().publishStatus("published") }}</p>
    </div>
  `,
})
export class PostStatusComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

Aby wykorzystać treść opartą na wyborze w `vanilla-intlayer`, pobierz zawartość za pomocą funkcji `useIntlayer`. Oto przykład:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("status")!.textContent =
    newContent.publishStatus("draft");
});

// Wstępne renderowanie (Initial render)
document.getElementById("status")!.textContent = content.publishStatus("draft");
```

  </Tab>
</Tabs>

## Łączenie Select z Innymi Węzłami

Ponieważ każdy przypadek (case) zawiera pełny węzeł treści, `select` można łączyć z `t()`, `insert()`, `md()` itp.:

```typescript fileName="**/*.content.ts" codeFormat="typescript"
import { insert, select, t, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: insert(
        t({
          en: "{{name}} saved a draft",
          fr: "{{name}} a enregistré un brouillon",
          pl: "{{name}} zapisał(a) szkic",
        })
      ),
      published: insert(
        t({
          en: "{{name}} published the post",
          fr: "{{name}} a publié l’article",
          pl: "{{name}} opublikował(a) post",
        })
      ),
      fallback: insert(
        t({
          en: "{{name}} updated the post",
          fr: "{{name}} a mis à jour l’article",
          pl: "{{name}} zaktualizował(a) post",
        })
      ),
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```tsx
publishStatus("draft")({ name: "Alice" }); // Wynik: Alice zapisał(a) szkic
```

## Migracja z ICU `select`

Wiadomości wykorzystujące argument ICU `select` są importowane jako węzeł `select`:

```text
{publishType, select, draft {draft} published {published} other {Unknown}}
```

Zostaną przekształcone na:

```typescript
select(
  {
    draft: "draft",
    published: "published",
    fallback: "Unknown",
  },
  "publishType"
);
```

Przypadek (case) `other` z ICU jest zmieniany na `fallback`, co jest kanoniczną nazwą w Intlayer dla wszystkich ogólnych przypadków typu catch-all. Drugi argument przechowuje nazwę zmiennej ICU, dzięki czemu przy eksporcie wiadomość przekształca się dokładnie w ten sam ciąg znaków ICU.

> Pamiętaj, że komunikaty ICU `select`, w których przypadkami są wartości płci (`male` / `female` / `other`), są importowane jako węzeł [`gender`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/gender.md).

## Dodatkowe Zasoby

Aby uzyskać bardziej szczegółowe informacje na temat konfiguracji i użytkowania, zapoznaj się z poniższymi zasobami:

- [Dokumentacja Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md)
- [Dokumentacja Intlayer React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_create_react_app.md)
- [Dokumentacja Intlayer Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_15.md)

Powyższe zasoby dostarczają dalszych spostrzeżeń dotyczących konfiguracji i używania Intlayer w różnych środowiskach i frameworkach.

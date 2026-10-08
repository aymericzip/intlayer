---
createdAt: 2025-07-27
updatedAt: 2026-10-08
priority: 8
title: "Treść zależna od płci w Intlayer"
description: "Dopasuj komunikaty do płci czytelnika za pomocą węzła gender() w Intlayer: wariant męski, żeński i domyślny w jednym miejscu."
keywords:
  - Treści oparte na płci
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
  - gender
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: "Wprowadzenie treści opartych na płci"
author: aymericzip
---

# Treści oparte na płci / Płeć w Intlayer

## Jak działa płeć

W Intlayer treści oparte na płci są realizowane za pomocą funkcji `gender`, która mapuje konkretne wartości płci ('male', 'female') na odpowiadające im treści. Takie podejście pozwala na dynamiczny wybór zawartości w zależności od podanej płci. Po integracji z React Intlayer, Next Intlayer lub innymi adapterami, odpowiednia treść jest automatycznie wybierana zgodnie z płcią przekazaną w czasie wykonywania.

## Konfiguracja treści opartych na płci

Aby skonfigurować treści oparte na płci w swoim projekcie Intlayer, utwórz moduł deklaracji treści, który zawiera definicje specyficzne dla płci. Poniżej znajdują się przykłady w różnych formatach.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { gender, type Dictionary } from "intlayer";

const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "moja treść dla użytkowników płci męskiej",
      female: "moja treść dla użytkowniczek płci żeńskiej",
      fallback: "moja treść, gdy płeć nie jest określona", // Opcjonalne
    }),
  },
} satisfies Dictionary;

export default myGenderContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myGender": {
      "nodeType": "gender",
      "gender": {
        "male": "moja treść dla użytkowników płci męskiej",
        "female": "moja treść dla użytkowniczek płci żeńskiej",
        "fallback": "moja treść, gdy płeć nie jest określona", // Opcjonalne
      },
    },
  },
}
```

> Jeśli nie zostanie zadeklarowany fallback, ostatni zadeklarowany klucz zostanie użyty jako fallback, jeśli płeć nie zostanie określona lub nie pasuje do żadnej zdefiniowanej wartości.

## Używanie treści zależnych od płci

<Tabs group="framework">
  <Tab label="React" value="react">

Aby użyć treści zależnych od płci w komponencie React, zaimportuj i użyj hooka `useIntlayer` z pakietu `react-intlayer`. Hook ten pobiera treść dla podanego klucza i pozwala przekazać płeć, aby wybrać odpowiedni wynik.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Wynik: moja treść dla użytkowników płci męskiej */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Wynik: moja treść dla użytkowniczek płci żeńskiej */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Wynik: moja treść, gdy płeć nie jest określona */
          myGender("")
        }
      </p>
      <p>
        {
          /* Wynik: moja treść, gdy płeć nie jest określona */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Aby użyć treści zależnych od płci w komponentach klienckich Next.js (Client Components), pobierz je za pomocą hooka `useIntlayer`. Oto przykład:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>{myGender("male")}</p>
      <p>{myGender("female")}</p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

Aby użyć treści zależnych od płci w komponentach Vue, pobierz je za pomocą hooka `useIntlayer`. Oto przykład:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myGender } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ myGender("male") }}</p>
    <p>{{ myGender("female") }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Aby użyć treści zależnych od płci w komponentach Svelte, pobierz je za pomocą hooka `useIntlayer`. Dostęp do magazynu (store) uzyskujemy za pomocą `$`. Oto przykład:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.myGender("male")}</p>
  <p>{$content.myGender("female")}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Aby użyć treści zależnych od płci w komponentach Preact, pobierz je za pomocą hooka `useIntlayer`. Oto przykład:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>{myGender("male")}</p>
      <p>{myGender("female")}</p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

Aby użyć treści zależnych od płci w komponentach SolidJS, pobierz je za pomocą hooka `useIntlayer`. Oto przykład:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const GenderComponent: Component = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>{myGender("male")}</p>
      <p>{myGender("female")}</p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

Aby użyć treści zależnych od płci w komponentach Angular, pobierz je za pomocą funkcji `useIntlayer`. Oto przykład:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-gender",
  template: `
    <div>
      <p>{{ content().myGender("male") }}</p>
      <p>{{ content().myGender("female") }}</p>
    </div>
  `,
})
export class GenderComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

Aby użyć treści zależnych od płci w czystym JavaScript (`vanilla-intlayer`), pobierz je za pomocą funkcji `useIntlayer`. Oto przykład:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("male-content")!.textContent =
    newContent.myGender("male");
  document.getElementById("female-content")!.textContent =
    newContent.myGender("female");
});

// Pierwsze renderowanie
document.getElementById("male-content")!.textContent = content.myGender("male");
document.getElementById("female-content")!.textContent =
  content.myGender("female");
```

  </Tab>
</Tabs>

## Dodatkowe zasoby

Aby uzyskać bardziej szczegółowe informacje na temat konfiguracji i użytkowania, zapoznaj się z następującymi zasobami:

- [Dokumentacja Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md)
- [Dokumentacja React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_create_react_app.md)
- [Dokumentacja Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_15.md)

Te zasoby oferują dodatkowe informacje na temat konfiguracji i użytkowania Intlayer w różnych środowiskach oraz frameworkach.

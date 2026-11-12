---
createdAt: 2025-02-07
updatedAt: 2026-10-08
priority: 8
title: "Treść warunkowa w Intlayer"
description: "Wyświetlaj różne treści w zależności od warunku logicznego za pomocą węzła cond() w Intlayer, deklarowanego raz i rozwiązywanego przy renderowaniu."
keywords:
  - Zawartość warunkowa
  - Treść warunkowa
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
  - condition
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inicjalizacja historii"
author: aymericzip
---

# Zawartość warunkowa / Warunek w Intlayer

## Jak działa warunek

W Intlayer zawartość warunkowa jest realizowana za pomocą funkcji `cond`, która mapuje określone warunki (zazwyczaj wartości logiczne boolean) na odpowiadającą im treść. To podejście pozwala dynamicznie wybierać treść na podstawie podanego warunku. Po integracji z React Intlayer, Next Intlayer lub innymi adapterami, odpowiednia treść jest automatycznie wybierana zgodnie z warunkiem przekazanym w czasie wykonywania.

## Konfiguracja zawartości warunkowej

Aby skonfigurować zawartość warunkową w swoim projekcie Intlayer, utwórz moduł deklaracji treści zawierający definicje warunkowe. Poniżej znajdują się przykłady w różnych formatach.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "moja treść, gdy prawda",
      false: "moja treść, gdy fałsz",
      fallback: "treść domyślna (fallback)", // Opcjonalne
    }),
  },
} satisfies Dictionary;

export default myConditionalContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myCondition": {
      "nodeType": "condition",
      "condition": {
        "true": "moja treść, gdy prawda",
        "false": "moja treść, gdy fałsz",
        "fallback": "treść domyślna (fallback)", // Opcjonalne
      },
    },
  },
}
```

> Jeśli nie zostanie zadeklarowana wartość domyślna (fallback), ostatni zadeklarowany klucz zostanie użyty jako fallback, gdy żaden warunek nie pasuje.

## Używanie zawartości warunkowej

<Tabs group="framework">
  <Tab label="React" value="react">

Aby użyć treści warunkowej w komponencie React, zaimportuj i użyj hooka `useIntlayer` z pakietu `react-intlayer`. Hook ten pobiera treść dla wskazanego klucza i pozwala przekazać warunek logiczny, aby wybrać odpowiedni wynik.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Wynik: moja treść, gdy prawda */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Wynik: moja treść, gdy fałsz */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Wynik: treść domyślna (fallback) */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Wynik: treść domyślna (fallback) */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Aby użyć treści warunkowej w komponentach klienckich Next.js (Client Components), pobierz ją za pomocą hooka `useIntlayer`. Oto przykład:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>{myCondition(true)}</p>
      <p>{myCondition(false)}</p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

Aby użyć treści warunkowej w komponentach Vue, pobierz ją za pomocą hooka `useIntlayer`. Oto przykład:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myCondition } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ myCondition(true) }}</p>
    <p>{{ myCondition(false) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Aby użyć treści warunkowej w komponentach Svelte, pobierz ją za pomocą hooka `useIntlayer`. Dostęp do magazynu (store) uzyskujemy przez `$`. Oto przykład:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.myCondition(true)}</p>
  <p>{$content.myCondition(false)}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Aby użyć treści warunkowej w komponentach Preact, pobierz ją za pomocą hooka `useIntlayer`. Oto przykład:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>{myCondition(true)}</p>
      <p>{myCondition(false)}</p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

Aby użyć treści warunkowej w komponentach SolidJS, pobierz ją za pomocą hooka `useIntlayer`. Oto przykład:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const ConditionalComponent: Component = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>{myCondition(true)}</p>
      <p>{myCondition(false)}</p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

Aby użyć treści warunkowej w komponentach Angular, pobierz ją za pomocą funkcji `useIntlayer`. Oto przykład:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-conditional",
  template: `
    <div>
      <p>{{ content().myCondition(true) }}</p>
      <p>{{ content().myCondition(false) }}</p>
    </div>
  `,
})
export class ConditionalComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

Aby użyć treści warunkowej w czystym JavaScript (`vanilla-intlayer`), pobierz ją za pomocą funkcji `useIntlayer`. Oto przykład:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("true-content")!.textContent =
    newContent.myCondition(true);
  document.getElementById("false-content")!.textContent =
    newContent.myCondition(false);
});

// Pierwsze renderowanie
document.getElementById("true-content")!.textContent =
  content.myCondition(true);
document.getElementById("false-content")!.textContent =
  content.myCondition(false);
```

  </Tab>
</Tabs>

## Dodatkowe zasoby

Aby uzyskać bardziej szczegółowe informacje na temat konfiguracji i użytkowania, zapoznaj się z następującymi zasobami:

- [Dokumentacja Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md)
- [Dokumentacja React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_create_react_app.md)
- [Dokumentacja Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_15.md)

Te zasoby oferują dodatkowe informacje na temat konfiguracji i użytkowania Intlayer w różnych środowiskach i frameworkach.

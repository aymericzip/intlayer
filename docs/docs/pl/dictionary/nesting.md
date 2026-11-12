---
createdAt: 2025-02-07
updatedAt: 2026-10-08
priority: 8
title: "Zagnieżdżanie: ponowne użycie treści między słownikami"
description: "Odwołuj się z jednego słownika do innego za pomocą węzła nest() w Intlayer, aby używać wspólnych treści bez duplikowania tłumaczeń."
keywords:
  - Zagnieżdżanie
  - Ponowne wykorzystywanie treści
  - Dokumentacja
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - nesting
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inicjalizacja historii"
author: aymericzip
---

# Zagnieżdżanie / Odwołania do podtreści

## Jak działa zagnieżdżanie

W Intlayer zagnieżdżanie realizowane jest za pomocą funkcji `nest`, która pozwala na odwoływanie się do treści z innego słownika i jej ponowne wykorzystanie. Zamiast duplikować treść, możesz wskazać istniejący moduł treści za pomocą jego klucza.

## Konfiguracja zagnieżdżania

Aby skonfigurować zagnieżdżanie w projekcie Intlayer, najpierw definiujesz zawartość bazową, którą chcesz ponownie wykorzystać. Następnie w osobnym module zawartości używasz funkcji `nest` do zaimportowania tej zawartości.

### Słownik podstawowy

Poniżej znajduje się przykład słownika podstawowego do zagnieżdżenia w innym słowniku:

```typescript fileName="firstDictionary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const myFirstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    mySubContent: t({
      pl: "Cześć",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
  },
} satisfies Dictionary;

export default myFirstDictionary;
```

```json5 fileName="firstDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_first_dictionary",
  "content": {
    "mySubContent": {
      "nodeType": "translation",
      "translation": {
        "pl": "Cześć",
        "en": "Hello",
        "fr": "Bonjour",
        "es": "Hola",
      },
    },
  },
}
```

### Odwoływanie się ze słownika bazowego

Następnie w drugim słowniku używasz funkcji `nest` do odwołania się do pierwszego słownika:

```typescript fileName="secondDictionary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { nest, type Dictionary } from "intlayer";

const mySecondDictionary = {
  key: "key_of_my_second_dictionary",
  content: {
    // Odwołaj się do całego słownika:
    fullNestedContent: nest("key_of_my_first_dictionary"),

    // Lub odwołaj się do konkretnej wartości zagnieżdżonej:
    partialNestedContent: nest("key_of_my_first_dictionary", "mySubContent"),
  },
} satisfies Dictionary;

export default mySecondDictionary;
```

```json5 fileName="secondDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_second_dictionary",
  "content": {
    "fullNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary",
      },
    },
    "partialNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary",
        "path": "mySubContent",
      },
    },
  },
}
```

Jako drugi parametr możesz określić ścieżkę do wartości zagnieżdżonej w ramach tej zawartości. Jeśli nie zostanie podana żadna ścieżka, zwracana jest cała zawartość wskazanego słownika.

## Używanie zagnieżdżania

<Tabs group="framework">
  <Tab label="React" value="react">

Aby użyć zagnieżdżonej treści w komponencie React, skorzystaj z hooka `useIntlayer` z pakietu `react-intlayer`. Hook ten pobiera odpowiednią treść na podstawie podanego klucza. Oto przykład użycia:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Pełna zagnieżdżona treść: {JSON.stringify(fullNestedContent)}</p>
      <p>Częściowa zagnieżdżona wartość: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Aby użyć zagnieżdżonej treści w komponentach klienckich Next.js (Client Components), pobierz ją za pomocą hooka `useIntlayer`. Oto przykład:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>{JSON.stringify(fullNestedContent)}</p>
      <p>{partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

Aby użyć zagnieżdżonej treści w komponentach Vue, pobierz ją za pomocą hooka `useIntlayer`. Oto przykład:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { fullNestedContent, partialNestedContent } = useIntlayer(
  "key_of_my_second_dictionary"
);
</script>

<template>
  <div>
    <p>{{ JSON.stringify(fullNestedContent) }}</p>
    <p>{{ partialNestedContent }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Aby użyć zagnieżdżonej treści w komponentach Svelte, pobierz ją za pomocą hooka `useIntlayer`. Dostęp do magazynu (store) uzyskujemy przez `$`. Oto przykład:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("key_of_my_second_dictionary");
</script>

<div>
  <p>{JSON.stringify($content.fullNestedContent)}</p>
  <p>{$content.partialNestedContent}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Aby użyć zagnieżdżonej treści w komponentach Preact, pobierz ją za pomocą hooka `useIntlayer`. Oto przykład:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>{JSON.stringify(fullNestedContent)}</p>
      <p>{partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

Aby użyć zagnieżdżonej treści w komponentach SolidJS, pobierz ją za pomocą hooka `useIntlayer`. Oto przykład:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const NestComponent: Component = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>{JSON.stringify(fullNestedContent)}</p>
      <p>{partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

Aby użyć zagnieżdżonej treści w komponentach Angular, pobierz ją za pomocą funkcji `useIntlayer`. Oto przykład:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-nest",
  template: `
    <div>
      <p>{{ fullNestedContent }}</p>
      <p>{{ content().partialNestedContent }}</p>
    </div>
  `,
})
export class NestComponent {
  content = useIntlayer("key_of_my_second_dictionary");

  get fullNestedContent() {
    return JSON.stringify(this.content().fullNestedContent);
  }
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

Aby użyć zagnieżdżonej treści w czystym JavaScript (`vanilla-intlayer`), pobierz ją za pomocą funkcji `useIntlayer`. Oto przykład:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("key_of_my_second_dictionary").onChange(
  (newContent) => {
    document.getElementById("full-nested-content")!.textContent =
      JSON.stringify(newContent.fullNestedContent);
    document.getElementById("partial-nested-content")!.textContent =
      newContent.partialNestedContent;
  }
);

// Pierwsze renderowanie
document.getElementById("full-nested-content")!.textContent = JSON.stringify(
  content.fullNestedContent
);
document.getElementById("partial-nested-content")!.textContent =
  content.partialNestedContent;
```

  </Tab>
</Tabs>

## Dodatkowe zasoby

Aby uzyskać bardziej szczegółowe informacje na temat konfiguracji i użytkowania, zapoznaj się z następującymi zasobami:

- [Dokumentacja Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md)
- [Dokumentacja React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_create_react_app.md)
- [Dokumentacja Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_15.md)

Te zasoby oferują dodatkowe informacje na temat konfiguracji i użytkowania Intlayer w różnych środowiskach oraz frameworkach.

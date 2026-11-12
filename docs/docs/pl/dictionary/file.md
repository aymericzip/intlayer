---
createdAt: 2025-03-13
updatedAt: 2026-10-08
priority: 8
title: "Treść z pliku: osadzanie plików zewnętrznych"
description: "Osadzaj zewnętrzne pliki, jak markdown czy tekst, w słownikach Intlayer za pomocą funkcji file(), zsynchronizowane z plikiem źródłowym."
keywords:
  - Plik
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
  - file
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inicjalizacja historii"
author: aymericzip
---

# Zawartość pliku / Osadzanie plików w Intlayer

W Intlayer funkcja `file` pozwala na osadzenie zawartości zewnętrznego pliku w słowniku. Takie podejście zapewnia, że Intlayer rozpoznaje plik źródłowy, umożliwiając płynną integrację z Intlayer Visual Editor i CMS.

## Dlaczego używać `file` zamiast `import`, `require` lub `fs`?

W przeciwieństwie do metod odczytu plików za pomocą `import`, `require` lub `fs`, użycie `file` wiąże plik ze słownikiem, co pozwala Intlayer śledzić i dynamicznie aktualizować treść podczas edycji pliku. W rezultacie użycie `file` zapewnia znacznie lepszą integrację z edytorem wizualnym Intlayer Visual Editor oraz systemem CMS.

## Konfiguracja zawartości pliku

Aby osadzić zawartość pliku w projekcie Intlayer, użyj funkcji `file` w module deklaracji treści. Poniżej znajdują się przykłady różnych implementacji.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
} satisfies Dictionary;

export default myFileContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myFile": {
      "nodeType": "file",
      "value": "./path/to/file.txt",
    },
  },
}
```

## Używanie zawartości pliku w komponentach

<Tabs group="framework">
  <Tab label="React" value="react">

Aby użyć osadzonej zawartości pliku w komponencie React, zaimportuj i użyj hooka `useIntlayer` z pakietu `react-intlayer`. Pobiera on treść dla wskazanego klucza i pozwala wyświetlić ją dynamicznie.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Aby użyć osadzonej zawartości pliku w komponentach klienckich Next.js (Client Components), pobierz ją za pomocą hooka `useIntlayer`. Oto przykład:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

Aby użyć osadzonej zawartości pliku w komponentach Vue, pobierz ją za pomocą hooka `useIntlayer`. Oto przykład:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myFile } = useIntlayer("my_key");
</script>

<template>
  <div>
    <pre>{{ myFile }}</pre>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Aby użyć osadzonej zawartości pliku w komponentach Svelte, pobierz ją za pomocą hooka `useIntlayer`. Dostęp do magazynu (store) uzyskujemy przez `$`. Oto przykład:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <pre>{$content.myFile}</pre>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Aby użyć osadzonej zawartości pliku w komponentach Preact, pobierz ją za pomocą hooka `useIntlayer`. Oto przykład:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

Aby użyć osadzonej zawartości pliku w komponentach SolidJS, pobierz ją za pomocą hooka `useIntlayer`. Oto przykład:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const FileComponent: Component = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

Aby użyć osadzonej zawartości pliku w komponentach Angular, pobierz ją za pomocą funkcji `useIntlayer`. Oto przykład:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-file",
  template: `
    <div>
      <pre>{{ content().myFile }}</pre>
    </div>
  `,
})
export class FileComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

Aby użyć osadzonej zawartości pliku w czystym JavaScript (`vanilla-intlayer`), pobierz ją za pomocą funkcji `useIntlayer`. Oto przykład:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("file-content")!.textContent = newContent.myFile;
});

// Pierwsze renderowanie
document.getElementById("file-content")!.textContent = content.myFile;
```

  </Tab>
</Tabs>

## Dodatkowe zasoby

Aby uzyskać bardziej szczegółowe informacje na temat konfiguracji i użytkowania, zapoznaj się z następującymi zasobami:

- [Dokumentacja Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md)
- [Dokumentacja React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_create_react_app.md)
- [Dokumentacja Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_15.md)

Te zasoby oferują dodatkowe informacje na temat konfiguracji i użytkowania Intlayer w różnych środowiskach oraz frameworkach.

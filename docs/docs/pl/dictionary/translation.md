---
createdAt: 2025-08-23
updatedAt: 2026-10-08
priority: 8
title: "Tłumaczenia: funkcja t()"
description: "Deklaruj tłumaczenia dla każdego locale funkcją t() w Intlayer, z typowaniem, które wskazuje brakujące locale podczas budowania."
keywords:
  - Tłumaczenie
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
  - translation
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inicjalizacja historii"
author: aymericzip
---

# Tłumaczenie

## Definiowanie tłumaczeń

Funkcja `t` w `intlayer` pozwala na deklarowanie treści w wielu językach. Funkcja ta zapewnia pełne bezpieczeństwo typów, zgłaszając błąd podczas kompilacji, jeśli brakuje jakichkolwiek tłumaczeń, co jest szczególnie przydatne w projektach TypeScript.

Oto przykład deklaracji treści z tłumaczeniami:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

interface Content {
  welcomeMessage: string;
}

export default {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      pl: "Witaj w naszej aplikacji",
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
} satisfies Dictionary<Content>;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "multi_lang",
  "content": {
    "welcomeMessage": {
      "nodeType": "translation",
      "translation": {
        "pl": "Witaj w naszej aplikacji",
        "en": "Welcome to our application",
        "fr": "Bienvenue dans notre application",
        "es": "Bienvenido a nuestra aplicación"
      }
    }
  }
}
```

## Konfiguracja lokalizacji

Aby zapewnić prawidłowe zarządzanie tłumaczeniami, skonfiguruj obsługiwane lokalizacje w pliku `intlayer.config.ts`. Ta konfiguracja pozwala zdefiniować języki, które Twoja aplikacja wspiera:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.POLISH, Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

## Używanie tłumaczeń w komponentach

<Tabs group="framework">
  <Tab label="React" value="react">

Dzięki `react-intlayer` możesz używać tłumaczeń w komponentach React. Oto przykład:

```jsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

Komponent ten pobiera odpowiednie tłumaczenie na podstawie aktualnego locale ustawionego w Twojej aplikacji.

  </Tab>
  <Tab label="Next.js" value="nextjs">

Dzięki `next-intlayer` możesz używać tłumaczeń zarówno w komponentach serwerowych (Server Components), jak i klienckich (Client Components). Oto przykład w komponencie klienckim:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const MyComponent: FC = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

Dzięki `vue-intlayer` możesz używać tłumaczeń w komponentach Vue. Oto przykład:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("multi_lang");
</script>

<template>
  <div>
    <p>{{ content.welcomeMessage }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Dzięki `svelte-intlayer` możesz używać tłumaczeń w komponentach Svelte. Dostęp do magazynu (store) uzyskujemy przez `$`:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("multi_lang");
</script>

<div>
  <p>{$content.welcomeMessage}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Dzięki `preact-intlayer` możesz używać tłumaczeń w komponentach Preact. Oto przykład:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const MyComponent: FC = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

Dzięki `solid-intlayer` możesz używać tłumaczeń w komponentach SolidJS. Oto przykład:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const MyComponent: Component = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

Dzięki `angular-intlayer` możesz używać tłumaczeń w komponentach Angular. Oto przykład:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-my-component",
  template: `
    <div>
      <p>{{ content().welcomeMessage }}</p>
    </div>
  `,
})
export class MyComponent {
  content = useIntlayer("multi_lang");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

Dzięki `vanilla-intlayer` możesz używać tłumaczeń w czystym JavaScript. Oto przykład:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("multi_lang").onChange((newContent) => {
  document.getElementById("welcome-message")!.textContent =
    newContent.welcomeMessage;
});

// Pierwsze renderowanie
document.getElementById("welcome-message")!.textContent =
  content.welcomeMessage;
```

  </Tab>
</Tabs>

## Dodatkowe zasoby

Aby uzyskać bardziej szczegółowe informacje na temat konfiguracji i użytkowania, zapoznaj się z następującymi zasobami:

- [Dokumentacja Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md)
- [Dokumentacja React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_create_react_app.md)
- [Dokumentacja Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_15.md)

Te zasoby oferują dodatkowe informacje na temat konfiguracji i użytkowania Intlayer w różnych środowiskach oraz frameworkach.

---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Enumeracja
description: Odkryj, jak deklarować i używać enumeracji na swojej wielojęzycznej stronie internetowej. Postępuj zgodnie z krokami w tej dokumentacji online, aby skonfigurować swój projekt w kilka minut.
keywords:
  - Enumeracja
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
  - enumeration
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inicjalizacja historii"
author: aymericzip
---

# Enumeracja / Pluralizacja

## Jak działa enumeracja

W Intlayer enumeracja jest realizowana za pomocą funkcji `enu`, która mapuje określone klucze na odpowiadające im treści. Klucze te mogą reprezentować wartości liczbowe, zakresy lub niestandardowe identyfikatory. W przypadku użycia z React Intlayer lub Next Intlayer odpowiednia treść jest automatycznie wybierana na podstawie lokalizacji aplikacji i zdefiniowanych reguł.

## Konfiguracja enumeracji

Aby skonfigurować enumerację w swoim projekcie Intlayer, musisz utworzyć moduł zawartości, który zawiera definicje enumeracji. Oto przykład prostej enumeracji dla liczby samochodów:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Mniej niż minus jeden samochód",
      "-1": "Minus jeden samochód",
      "0": "Brak samochodów",
      "1": "Jeden samochód",
      ">5": "Kilka samochodów",
      ">19": "Wiele samochodów",
      "fallback": "Wartość domyślna", // Opcjonalne
    }),
  },
} satisfies Dictionary;

export default carEnumeration;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "car_count",
  "content": {
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Mniej niż minus jeden samochód",
        "-1": "Minus jeden samochód",
        "0": "Brak samochodów",
        "1": "Jeden samochód",
        ">5": "Kilka samochodów",
        ">19": "Wiele samochodów",
        "fallback": "Wartość domyślna" // Opcjonalne
      }
    }
  }
}
```

W tym przykładzie `enu` mapuje różne warunki na określoną treść. Gdy jest używany w komponencie React, Intlayer może automatycznie wybrać odpowiednią treść na podstawie podanej zmiennej.

> Kolejność deklaracji jest ważna w enumeracjach Intlayer. Pierwsza prawidłowa deklaracja jest tą, która zostanie wybrana. Jeśli wiele warunków ma zastosowanie, upewnij się, że są one poprawnie uporządkowane, aby uniknąć nieoczekiwanego zachowania.

> Jeśli nie zostanie zadeklarowana wartość domyślna (fallback), funkcja zwróci `undefined`, jeśli żaden klucz nie pasuje.

## Używanie enumeracji z React Intlayer

<Tabs group="framework">
  <Tab label="React" value="react">

To use enumeration in a React component, you can leverage the `useIntlayer` hook from the `react-intlayer` package. This hook retrieves the correct content based on the specified ID. Here's an example of how to use it:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Output: No cars
        }
      </p>
      <p>
        {
          numberOfCar(6) // Output: Some cars
        }
      </p>
      <p>
        {
          numberOfCar(20) // Output: Many cars
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Output: Fallback value
        }
      </p>
    </div>
  );
};
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To use enumeration in Next.js Client Components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>{numberOfCar(6)}</p>
    </div>
  );
};

export default CarComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

To use enumeration in Vue components, retrieve it via the `useIntlayer` hook. Here's an example:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { numberOfCar } = useIntlayer("car_count");
</script>

<template>
  <div>
    <p>{{ numberOfCar(6) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To use enumeration in Svelte components, retrieve it via the `useIntlayer` hook. The store is accessed with `$`. Here's an example:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("car_count");
</script>

<div>
  <p>{$content.numberOfCar(6)}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To use enumeration in Preact components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>{numberOfCar(6)}</p>
    </div>
  );
};

export default CarComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

To use enumeration in SolidJS components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const CarComponent: Component = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>{numberOfCar(6)}</p>
    </div>
  );
};

export default CarComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

To use enumeration in Angular components, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-car",
  template: `
    <div>
      <p>{{ content().numberOfCar(6) }}</p>
    </div>
  `,
})
export class CarComponent {
  content = useIntlayer("car_count");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To use enumeration with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("car_count").onChange((newContent) => {
  document.getElementById("cars")!.textContent = newContent.numberOfCar(6);
});

// Initial render
document.getElementById("cars")!.textContent = content.numberOfCar(6);
```

  </Tab>
</Tabs>

## Dodatkowe zasoby

Aby uzyskać bardziej szczegółowe informacje na temat konfiguracji i użytkowania, zapoznaj się z następującymi zasobami:

- [Dokumentacja Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md)
- [Dokumentacja React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_create_react_app.md)
- [Dokumentacja Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_15.md)

Te zasoby dostarczają dodatkowych informacji na temat konfiguracji i użycia Intlayer w różnych środowiskach oraz z różnymi frameworkami.

### Using Ordinal Enumeration

<Tabs group="framework">
  <Tab label="React" value="react">

To use this in a React component, call the enumeration with the last digit of the number to get the correct suffix, then pass the full count as the insertion value:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const RankingComponent: FC<{ count: number }> = ({ count }) => {
  const { ordinal } = useIntlayer("ranking_component");

  // Get the last digit to determine the correct suffix
  const lastDigit = Math.abs(count) % 10;

  return (
    <div>
      <p>
        {
          ordinal(lastDigit)({ count }) // e.g., "5th place" for count=5
        }
      </p>
    </div>
  );
};
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To use this in Next.js Client Components, call the enumeration with the last digit of the number to get the correct suffix, then pass the full count as the insertion value:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const RankingComponent: FC<{ count: number }> = ({ count }) => {
  const { ordinal } = useIntlayer("ranking_component");
  const lastDigit = Math.abs(count) % 10;

  return (
    <div>
      <p>{ordinal(lastDigit)({ count })}</p>
    </div>
  );
};

export default RankingComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

To use this in Vue components, call the enumeration with the last digit of the number to get the correct suffix, then pass the full count as the insertion value:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

defineProps<{ count: number }>();

const { ordinal } = useIntlayer("ranking_component");
</script>

<template>
  <div>
    <p>{{ ordinal(Math.abs(count) % 10)({ count }) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To use this in Svelte components, call the enumeration with the last digit of the number to get the correct suffix, then pass the full count as the insertion value:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

export let count: number;

const content = useIntlayer("ranking_component");
$: lastDigit = Math.abs(count) % 10;
</script>

<div>
  <p>{$content.ordinal(lastDigit)({ count })}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To use this in Preact components, call the enumeration with the last digit of the number to get the correct suffix, then pass the full count as the insertion value:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const RankingComponent: FC<{ count: number }> = ({ count }) => {
  const { ordinal } = useIntlayer("ranking_component");
  const lastDigit = Math.abs(count) % 10;

  return (
    <div>
      <p>{ordinal(lastDigit)({ count })}</p>
    </div>
  );
};

export default RankingComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

To use this in SolidJS components, call the enumeration with the last digit of the number to get the correct suffix, then pass the full count as the insertion value:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const RankingComponent: Component<{ count: number }> = (props) => {
  const { ordinal } = useIntlayer("ranking_component");

  return (
    <div>
      <p>{ordinal(Math.abs(props.count) % 10)({ count: props.count })}</p>
    </div>
  );
};

export default RankingComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

To use this in Angular components, call the enumeration with the last digit of the number to get the correct suffix, then pass the full count as the insertion value:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component, Input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-ranking",
  template: `
    <div>
      <p>{{ content().ordinal(lastDigit())({ count }) }}</p>
    </div>
  `,
})
export class RankingComponent {
  @Input() count!: number;

  content = useIntlayer("ranking_component");

  lastDigit() {
    return Math.abs(this.count) % 10;
  }
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To use this with `vanilla-intlayer`, call the enumeration with the last digit of the number to get the correct suffix, then pass the full count as the insertion value:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("ranking_component");
const lastDigit = Math.abs(5) % 10;

document.getElementById("ranking")!.textContent = content.ordinal(lastDigit)({
  count: 5,
});
```

  </Tab>
</Tabs>

## Additional Resources

For more detailed information on configuration and usage, refer to the following resources:

- [Intlayer CLI Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)
- [React Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md)
- [Next Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md)

These resources provide further insights into the setup and usage of Intlayer in different environments and with various frameworks.

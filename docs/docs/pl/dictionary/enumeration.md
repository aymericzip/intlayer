---
createdAt: 2025-08-23
updatedAt: 2026-10-08
priority: 8
title: "Zawartość wyliczeniowa: komunikaty zależne od ilości i liczb"
description: "Używaj enumeracji w Intlayer, aby wyświetlać różne treści w zależności od liczby lub zakresu, z węzłem enu() i warunkami takimi jak '<-1' czy '>5'."
keywords:
  - Enumeracja
  - Pluralizacja
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

# Enumeracja / Liczba mnoga

## Jak działa enumeracja

W Intlayer wyliczenia (enumeracje) i obsługa liczb mnogich są realizowane za pomocą funkcji `enu`, która mapuje określone klucze na odpowiadającą im treść. Klucze te mogą reprezentować wartości liczbowe, zakresy lub niestandardowe identyfikatory. W przypadku użycia z bibliotekami React Intlayer, Next Intlayer czy innymi adapterami, właściwa treść jest automatycznie wybierana na podstawie locale aplikacji i zdefiniowanych reguł.

## Konfiguracja enumeracji

Aby skonfigurować enumerację w swoim projekcie Intlayer, musisz utworzyć moduł deklaracji treści zawierający definicje `enu`. Oto przykład prostej enumeracji dla liczby samochodów:

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

> Kolejność deklaracji jest istotna w enumeracjach Intlayer. Pierwsza pasująca deklaracja jest tą, która zostanie wybrana. Jeśli wiele warunków ma zastosowanie, upewnij się, że są one poprawnie uporządkowane, aby uniknąć nieoczekiwanego zachowania.

> Jeśli nie zostanie zadeklarowana wartość domyślna (`fallback`), funkcja zwróci `undefined`, gdy żaden warunek nie pasuje.

## Używanie enumeracji w komponentach

<Tabs group="framework">
  <Tab label="React" value="react">

Aby użyć enumeracji w komponencie React, skorzystaj z hooka `useIntlayer` z pakietu `react-intlayer`. Hook ten pobiera odpowiednią treść na podstawie zadanego klucza. Oto przykład użycia:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Wynik: Brak samochodów
        }
      </p>
      <p>
        {
          numberOfCar(6) // Wynik: Kilka samochodów
        }
      </p>
      <p>
        {
          numberOfCar(20) // Wynik: Wiele samochodów
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Wynik: Wartość domyślna
        }
      </p>
    </div>
  );
};
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Aby użyć enumeracji w komponentach klienckich Next.js (Client Components), pobierz ją za pomocą hooka `useIntlayer`. Oto przykład:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>{numberOfCar(0)}</p>
      <p>{numberOfCar(6)}</p>
      <p>{numberOfCar(20)}</p>
      <p>{numberOfCar(0.01)}</p>
    </div>
  );
};

export default CarComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

Aby użyć enumeracji w komponentach Vue, pobierz ją za pomocą hooka `useIntlayer`. Oto przykład:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { numberOfCar } = useIntlayer("car_count");
</script>

<template>
  <div>
    <p>{{ numberOfCar(0) }}</p>
    <p>{{ numberOfCar(6) }}</p>
    <p>{{ numberOfCar(20) }}</p>
    <p>{{ numberOfCar(0.01) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Aby użyć enumeracji w komponentach Svelte, pobierz ją za pomocą hooka `useIntlayer`. Dostęp do magazynu (store) uzyskujemy przez `$`. Oto przykład:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("car_count");
</script>

<div>
  <p>{$content.numberOfCar(0)}</p>
  <p>{$content.numberOfCar(6)}</p>
  <p>{$content.numberOfCar(20)}</p>
  <p>{$content.numberOfCar(0.01)}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Aby użyć enumeracji w komponentach Preact, pobierz ją za pomocą hooka `useIntlayer`. Oto przykład:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>{numberOfCar(0)}</p>
      <p>{numberOfCar(6)}</p>
      <p>{numberOfCar(20)}</p>
      <p>{numberOfCar(0.01)}</p>
    </div>
  );
};

export default CarComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

Aby użyć enumeracji w komponentach SolidJS, pobierz ją za pomocą hooka `useIntlayer`. Oto przykład:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const CarComponent: Component = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>{numberOfCar(0)}</p>
      <p>{numberOfCar(6)}</p>
      <p>{numberOfCar(20)}</p>
      <p>{numberOfCar(0.01)}</p>
    </div>
  );
};

export default CarComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

Aby użyć enumeracji w komponentach Angular, pobierz ją za pomocą funkcji `useIntlayer`. Oto przykład:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-car",
  template: `
    <div>
      <p>{{ content().numberOfCar(0) }}</p>
      <p>{{ content().numberOfCar(6) }}</p>
      <p>{{ content().numberOfCar(20) }}</p>
      <p>{{ content().numberOfCar(0.01) }}</p>
    </div>
  `,
})
export class CarComponent {
  content = useIntlayer("car_count");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

Aby użyć enumeracji w czystym JavaScript (`vanilla-intlayer`), pobierz ją za pomocą funkcji `useIntlayer`. Oto przykład:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("car_count").onChange((newContent) => {
  document.getElementById("cars")!.textContent = newContent.numberOfCar(6);
});

// Pierwsze renderowanie
document.getElementById("cars")!.textContent = content.numberOfCar(6);
```

  </Tab>
</Tabs>

## Łączenie enumeracji z interpolacją (insert) dla liczb porządkowych

Częstym przypadkiem użycia jest wyświetlanie liczb porządkowych (1., 2., 3. miejsce itd. lub 1st, 2nd, 3rd place). Możesz połączyć `enu` z `insert`, aby utworzyć dynamiczną treść dla liczb porządkowych:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { enu, insert, type Dictionary } from "intlayer";

const rankingContent = {
  key: "ranking_component",
  content: {
    ordinal: enu({
      1: insert("{{count}}st place"),
      2: insert("{{count}}nd place"),
      3: insert("{{count}}rd place"),
      fallback: insert("{{count}}th place"),
    }),
  },
} satisfies Dictionary;

export default rankingContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "ranking_component",
  "content": {
    "ordinal": {
      "nodeType": "enumeration",
      "enumeration": {
        "1": {
          "nodeType": "insertion",
          "insertion": "{{count}}st place"
        },
        "2": {
          "nodeType": "insertion",
          "insertion": "{{count}}nd place"
        },
        "3": {
          "nodeType": "insertion",
          "insertion": "{{count}}rd place"
        },
        "fallback": {
          "nodeType": "insertion",
          "insertion": "{{count}}th place"
        }
      }
    }
  }
}
```

### Używanie enumeracji liczb porządkowych

<Tabs group="framework">
  <Tab label="React" value="react">

Aby użyć tego w komponencie React, wywołaj enumerację z ostatnią cyfrą liczby, aby uzyskać poprawny sufiks, a następnie przekaż pełną liczbę jako wartość interpolowaną:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const RankingComponent: FC<{ count: number }> = ({ count }) => {
  const { ordinal } = useIntlayer("ranking_component");

  // Pobierz ostatnią cyfrę, aby wyznaczyć odpowiedni sufiks
  const lastDigit = Math.abs(count) % 10;

  return (
    <div>
      <p>
        {
          ordinal(lastDigit)({ count }) // np. "5th place" dla count=5
        }
      </p>
    </div>
  );
};
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Aby użyć tego w komponentach klienckich Next.js (Client Components), wywołaj enumerację z ostatnią cyfrą liczby, aby uzyskać poprawny sufiks, a następnie przekaż pełną liczbę jako wartość interpolowaną:

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

Aby użyć tego w komponentach Vue, wywołaj enumerację z ostatnią cyfrą liczby, aby uzyskać poprawny sufiks, a następnie przekaż pełną liczbę jako wartość interpolowaną:

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

Aby użyć tego w komponentach Svelte, wywołaj enumerację z ostatnią cyfrą liczby, aby uzyskać poprawny sufiks, a następnie przekaż pełną liczbę jako wartość interpolowaną:

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

Aby użyć tego w komponentach Preact, wywołaj enumerację z ostatnią cyfrą liczby, aby uzyskać poprawny sufiks, a następnie przekaż pełną liczbę jako wartość interpolowaną:

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

Aby użyć tego w komponentach SolidJS, wywołaj enumerację z ostatnią cyfrą liczby, aby uzyskać poprawny sufiks, a następnie przekaż pełną liczbę jako wartość interpolowaną:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const RankingComponent: Component<{ count: number }> = (props) => {
  const { ordinal } = useIntlayer("ranking_component");
  const lastDigit = () => Math.abs(props.count) % 10;

  return (
    <div>
      <p>{ordinal(lastDigit())({ count: props.count })}</p>
    </div>
  );
};

export default RankingComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

Aby użyć tego w komponentach Angular, wywołaj enumerację z ostatnią cyfrą liczby, aby uzyskać poprawny sufiks, a następnie przekaż pełną liczbę jako wartość interpolowaną:

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

Aby użyć tego z `vanilla-intlayer`, wywołaj enumerację z ostatnią cyfrą liczby, aby uzyskać poprawny sufiks, a następnie przekaż pełną liczbę jako wartość interpolowaną:

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

## Dodatkowe zasoby

Aby uzyskać bardziej szczegółowe informacje na temat konfiguracji i użytkowania, zapoznaj się z następującymi zasobami:

- [Dokumentacja Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md)
- [Dokumentacja React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_create_react_app.md)
- [Dokumentacja Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_15.md)

Zasoby te oferują dodatkowe informacje na temat konfiguracji i użytkowania Intlayer w różnych środowiskach oraz frameworkach.

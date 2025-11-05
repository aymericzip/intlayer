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
    changes: Inicjalizacja historii
---

# Enumeracja / Pluralizacja

## Jak działa enumeracja

W Intlayer enumeracja jest realizowana za pomocą funkcji `enu`, która mapuje określone klucze na odpowiadające im treści. Klucze te mogą reprezentować wartości liczbowe, zakresy lub niestandardowe identyfikatory. W przypadku użycia z React Intlayer lub Next Intlayer odpowiednia treść jest automatycznie wybierana na podstawie lokalizacji aplikacji i zdefiniowanych reguł.

## Konfiguracja enumeracji

Aby skonfigurować enumerację w swoim projekcie Intlayer, musisz utworzyć moduł zawartości, który zawiera definicje enumeracji. Oto przykład prostej enumeracji dla liczby samochodów:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { enu } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
};

export default carEnumeration;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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
};

module.exports = carEnumeration;
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

Aby użyć enumeracji w komponencie React, możesz skorzystać z hooka `useIntlayer` z pakietu `react-intlayer`. Ten hook pobiera odpowiednią treść na podstawie określonego ID. Oto przykład, jak go użyć:

```tsx fileName="**/*.tsx" codeFormat="typescript"
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

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
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

export default CarComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const CarComponent = () => {
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

module.exports = CarComponent;
```

W tym przykładzie komponent dynamicznie dostosowuje swój wynik w zależności od liczby samochodów. Poprawna treść jest wybierana automatycznie, w zależności od określonego zakresu.

## Dodatkowe zasoby

Aby uzyskać bardziej szczegółowe informacje na temat konfiguracji i użytkowania, zapoznaj się z następującymi zasobami:

- [Dokumentacja Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md)
- [Dokumentacja React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_create_react_app.md)
- [Dokumentacja Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_15.md)

Te zasoby dostarczają dodatkowych informacji na temat konfiguracji i użycia Intlayer w różnych środowiskach oraz z różnymi frameworkami.

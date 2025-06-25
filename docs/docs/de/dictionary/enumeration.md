---
docName: dictionary__enumeration
url: https://intlayer.org/doc/concept/content/enumeration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/enumeration.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Enumeration
description: Entdecken Sie, wie Sie Enumerationen in Ihrer mehrsprachigen Website deklarieren und verwenden. Befolgen Sie die Schritte in dieser Online-Dokumentation, um Ihr Projekt in wenigen Minuten einzurichten.
keywords:
  - Enumeration
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Enumeration / Pluralisierung

## Wie Enumeration funktioniert

In Intlayer wird die Enumeration durch die `enu`-Funktion erreicht, die spezifische Schlüssel ihren entsprechenden Inhalten zuordnet. Diese Schlüssel können numerische Werte, Bereiche oder benutzerdefinierte Bezeichner darstellen. Bei Verwendung mit React Intlayer oder Next Intlayer wird der passende Inhalt automatisch basierend auf der Anwendungslokalisierung und definierten Regeln ausgewählt.

## Einrichtung der Enumeration

Um die Enumeration in Ihrem Intlayer-Projekt einzurichten, müssen Sie ein Inhaltsmodul erstellen, das Enumerationsdefinitionen enthält. Hier ist ein Beispiel für eine einfache Enumeration für die Anzahl der Autos:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Weniger als minus ein Auto",
      "-1": "Minus ein Auto",
      "0": "Keine Autos",
      "1": "Ein Auto",
      ">5": "Einige Autos",
      ">19": "Viele Autos",
      "fallback": "Fallback-Wert", // Optional
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
      "<-1": "Weniger als minus ein Auto",
      "-1": "Minus ein Auto",
      "0": "Keine Autos",
      "1": "Ein Auto",
      ">5": "Einige Autos",
      ">19": "Viele Autos",
      "fallback": "Fallback-Wert", // Optional
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
      "<-1": "Weniger als minus ein Auto",
      "-1": "Minus ein Auto",
      "0": "Keine Autos",
      "1": "Ein Auto",
      ">5": "Einige Autos",
      ">19": "Viele Autos",
      "fallback": "Fallback-Wert", // Optional
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
        "<-1": "Weniger als minus ein Auto",
        "-1": "Minus ein Auto",
        "0": "Keine Autos",
        "1": "Ein Auto",
        ">5": "Einige Autos",
        ">19": "Viele Autos",
        "fallback": "Fallback-Wert" // Optional
      }
    }
  }
}
```

In diesem Beispiel ordnet `enu` verschiedene Bedingungen spezifischen Inhalten zu. Bei Verwendung in einer React-Komponente kann Intlayer automatisch den passenden Inhalt basierend auf der angegebenen Variablen auswählen.

> Die Reihenfolge der Deklaration ist wichtig bei Intlayer-Enumerationen. Die erste gültige Deklaration wird übernommen. Wenn mehrere Bedingungen zutreffen, stellen Sie sicher, dass sie korrekt geordnet sind, um unerwartetes Verhalten zu vermeiden.

> Wenn kein Fallback deklariert ist, gibt die Funktion `undefined` zurück, wenn keine Schlüssel übereinstimmen.

## Verwendung der Enumeration mit React Intlayer

Um Enumeration in einer React-Komponente zu verwenden, können Sie den `useIntlayer`-Hook aus dem `react-intlayer`-Paket nutzen. Dieser Hook ruft den korrekten Inhalt basierend auf der angegebenen ID ab. Hier ist ein Beispiel, wie man ihn verwendet:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Ausgabe: Keine Autos
        }
      </p>
      <p>
        {
          numberOfCar(6) // Ausgabe: Einige Autos
        }
      </p>
      <p>
        {
          numberOfCar(20) // Ausgabe: Viele Autos
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Ausgabe: Fallback-Wert
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
          numberOfCar(0) // Ausgabe: Keine Autos
        }
      </p>
      <p>
        {
          numberOfCar(6) // Ausgabe: Einige Autos
        }
      </p>
      <p>
        {
          numberOfCar(20) // Ausgabe: Viele Autos
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Ausgabe: Fallback-Wert
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
          numberOfCar(0) // Ausgabe: Keine Autos
        }
      </p>
      <p>
        {
          numberOfCar(6) // Ausgabe: Einige Autos
        }
      </p>
      <p>
        {
          numberOfCar(20) // Ausgabe: Viele Autos
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Ausgabe: Fallback-Wert
        }
      </p>
    </div>
  );
};

module.exports = CarComponent;
```

In diesem Beispiel passt die Komponente ihre Ausgabe dynamisch basierend auf der Anzahl der Autos an. Der korrekte Inhalt wird automatisch abhängig vom angegebenen Bereich ausgewählt.

## Zusätzliche Ressourcen

Für detailliertere Informationen zur Konfiguration und Nutzung lesen Sie die folgenden Ressourcen:

- [Intlayer CLI Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md)
- [React Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_create_react_app.md)
- [Next Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_15.md)

Diese Ressourcen bieten weitere Einblicke in die Einrichtung und Nutzung von Intlayer in verschiedenen Umgebungen und mit verschiedenen Frameworks.

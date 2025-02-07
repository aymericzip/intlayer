# Aufzählung / Pluralisierung

## Wie Aufzählungen Funktionieren

In Intlayer wird die Aufzählung durch die `enu`-Funktion erreicht, die spezifische Schlüssel ihren entsprechenden Inhalten zuordnet. Diese Schlüssel können numerische Werte, Bereiche oder benutzerdefinierte Identifikatoren darstellen. Bei der Verwendung mit React Intlayer oder Next Intlayer wird der passende Inhalt basierend auf der Locale der Anwendung und den definierten Regeln automatisch ausgewählt.

## Einrichten der Aufzählung

Um die Aufzählung in Ihrem Intlayer-Projekt einzurichten, müssen Sie ein Inhaltsmodul erstellen, das Aufzählungsdefinitionen enthält. Hier ist ein Beispiel für eine einfache Aufzählung der Anzahl der Autos:

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
      "fallback": "Standardwert", // Optional
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
      "fallback": "Standardwert", // Optional
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
      "fallback": "Standardwert", // Optional
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
        "fallback": "Standardwert" // Optional
      }
    }
  }
}
```

In diesem Beispiel ordnet `enu` verschiedene Bedingungen spezifischen Inhalten zu. Bei der Verwendung in einer React-Komponente kann Intlayer den entsprechenden Inhalt basierend auf der gegebenen Variablen automatisch auswählen.

> Die Reihenfolge der Deklaration ist wichtig bei Intlayer-Aufzählungen. Die erste gültige Deklaration wird ausgeführt. Wenn mehrere Bedingungen zutreffen, stellen Sie sicher, dass sie korrekt angeordnet sind, um unerwartetes Verhalten zu vermeiden.

> Wenn kein Fallback-Wert deklariert ist, gibt die Funktion `undefined` zurück, falls keine Schlüssel übereinstimmen.

## Verwendung der Aufzählung mit React Intlayer

Um Aufzählungen in einer React-Komponente zu verwenden, können Sie den `useIntlayer`-Hook aus dem `react-intlayer`-Paket einsetzen. Dieser Hook ruft den richtigen Inhalt basierend auf der angegebenen ID ab. Hier ist ein Beispiel, wie man ihn verwendet:

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
          numberOfCar(0.01) // Ausgabe: Standardwert
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
          numberOfCar(0.01) // Ausgabe: Standardwert
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
          numberOfCar(0.01) // Ausgabe: Standardwert
        }
      </p>
    </div>
  );
};

module.exports = CarComponent;
```

In diesem Beispiel passt die Komponente ihre Ausgabe dynamisch an die Anzahl der Autos an. Der korrekte Inhalt wird automatisch ausgewählt, abhängig von dem angegebenen Bereich.

## Zusätzliche Ressourcen

Für detailliertere Informationen zu Konfiguration und Nutzung können Sie auf die folgenden Ressourcen verweisen:

- [Intlayer CLI Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md)
- [React Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_create_react_app.md)
- [Next Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md)

Diese Ressourcen bieten weitere Einblicke in die Einrichtung und Nutzung von Intlayer in verschiedenen Umgebungen und mit verschiedenen Frameworks.

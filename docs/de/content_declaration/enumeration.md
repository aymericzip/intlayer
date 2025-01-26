# Aufzählung / Pluralisierung

## Wie Aufzählung funktioniert

In Intlayer wird die Aufzählung durch die `enu` Funktion erreicht, die spezifische Schlüssel den entsprechenden Inhalten zuordnet. Diese Schlüssel können numerische Werte, Bereiche oder benutzerdefinierte Identifikatoren darstellen. Bei der Verwendung mit React Intlayer oder Next Intlayer wird der entsprechende Inhalt automatisch basierend auf der Lokalisierung der Anwendung und definierten Regeln ausgewählt.

## Einrichten der Aufzählung

Um die Aufzählung in deinem Intlayer-Projekt einzurichten, musst du ein Inhaltsmodul erstellen, das die Aufzählungsdefinitionen umfasst. Hier ist ein Beispiel für eine einfache Aufzählung für die Anzahl der Autos:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type DeclarationContent } from "intlayer";

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
    }),
  },
} satisfies DeclarationContent;

export default carEnumeration;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { enu } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
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
    }),
  },
};

export default carEnumeration;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu, type DeclarationContent } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
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
      "<-1": "Weniger als minus ein Auto",
      "-1": "Minus ein Auto",
      "0": "Keine Autos",
      "1": "Ein Auto",
      ">5": "Einige Autos",
      ">19": "Viele Autos"
    }
  }
}
```

In diesem Beispiel ordnet `enu` verschiedene Bedingungen spezifischen Inhalten zu. Wenn es in einer React-Komponente verwendet wird, kann Intlayer automatisch den entsprechenden Inhalt basierend auf der gegebenen Variablen auswählen.

## Verwendung der Aufzählung mit React Intlayer

Um die Aufzählung in einer React-Komponente zu verwenden, kannst du den `useIntlayer` Hook aus dem `react-intlayer` Paket nutzen. Dieser Hook ruft den korrekten Inhalt basierend auf der angegebenen ID ab. Hier ist ein Beispiel, wie man ihn verwendet:

```typescript fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* Ausgabe: Keine Autos */}
      <p>{content.numberOfCar(6)}</p> {/* Ausgabe: Einige Autos */}
      <p>{content.numberOfCar(20)}</p> {/* Ausgabe: Einige Autos */}
    </div>
  );
};
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* Ausgabe: Keine Autos */}
      <p>{content.numberOfCar(6)}</p> {/* Ausgabe: Einige Autos */}
      <p>{content.numberOfCar(20)}</p> {/* Ausgabe: Einige Autos */}
    </div>
  );
};

export default CarComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* Ausgabe: Keine Autos */}
      <p>{content.numberOfCar(6)}</p> {/* Ausgabe: Einige Autos */}
      <p>{content.numberOfCar(20)}</p> {/* Ausgabe: Einige Autos */}
    </div>
  );
};

module.exports = CarComponent;
```

In diesem Beispiel passt die Komponente ihre Ausgabe dynamisch basierend auf der Anzahl der Autos an. Der korrekte Inhalt wird automatisch ausgewählt, abhängig vom angegebenen Bereich.

## Wichtige Hinweise

- Die Reihenfolge der Deklaration ist entscheidend in Intlayer-Aufzählungen. Die erste gültige Deklaration ist die, die ausgewählt wird.
- Wenn mehrere Bedingungen zutreffen, stelle sicher, dass sie korrekt angeordnet sind, um unerwartetes Verhalten zu vermeiden.

## Beste Praktiken für Aufzählungen

Um sicherzustellen, dass deine Aufzählungen wie erwartet funktionieren, Folge diesen besten Praktiken:

- **Konsistente Benennung**: Verwende klare und konsistente IDs für Aufzählungsmodule, um Verwirrung zu vermeiden.
- **Dokumentation**: Dokumentiere deine Aufzählungsschlüssel und deren erwartete Ausgaben, um zukünftige Wartbarkeit sicherzustellen.
- **Fehlerbehandlung**: Implementiere eine Fehlerbehandlung, um Fälle zu verwalten, in denen keine gültige Aufzählung gefunden wird.
- **Performance optimieren**: Reduziere für große Anwendungen die Anzahl der überwachten Dateierweiterungen, um die Leistung zu verbessern.

## Zusätzliche Ressourcen

Für detailliertere Informationen zur Konfiguration und Verwendung sieh dir die folgenden Ressourcen an:

- [Intlayer CLI Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md)
- [React Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_create_react_app.md)
- [Next Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md)

Diese Ressourcen bieten weitere Einblicke in die Einrichtung und Verwendung von Intlayer in verschiedenen Umgebungen und mit verschiedenen Frameworks.

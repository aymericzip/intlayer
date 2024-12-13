# Aufzählung / Pluralisierung

## Wie Aufzählung funktioniert

In Intlayer wird die Aufzählung durch die Funktion `enu` erreicht, die spezifische Schlüssel ihren entsprechenden Inhalten zuordnet. Diese Schlüssel können numerische Werte, Bereiche oder benutzerdefinierte Bezeichner darstellen. Bei Verwendung mit React Intlayer oder Next Intlayer wird der entsprechende Inhalt automatisch basierend auf der Regionaleinstellung der Anwendung und den definierten Regeln ausgewählt.

## Einrichtung der Aufzählung

Um die Aufzählung in Ihrem Intlayer-Projekt einzurichten, müssen Sie ein Inhaltsmodul erstellen, das Aufzählungsdefinitionen enthält. Hier ist ein Beispiel für eine einfache Aufzählung für die Anzahl der Autos:

```typescript
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

In diesem Beispiel ordnet `enu` verschiedene Bedingungen spezifischen Inhalten zu. Bei Verwendung in einer React-Komponente kann Intlayer automatisch den entsprechenden Inhalt basierend auf der gegebenen Variablen auswählen.

## Verwendung der Aufzählung mit React Intlayer

Um die Aufzählung in einer React-Komponente zu verwenden, können Sie den Hook `useIntlayer` aus dem Paket `react-intlayer` nutzen. Dieser Hook ruft den richtigen Inhalt basierend auf der spezifizierten ID ab. Hier ist ein Beispiel, wie man ihn verwendet:

```javascript
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

In diesem Beispiel passt sich die Komponente dynamisch an ihre Ausgabe basierend auf der Anzahl der Autos an. Der richtige Inhalt wird automatisch ausgewählt, abhängig vom angegebenen Bereich.

## Wichtige Hinweise

- Die Reihenfolge der Deklaration ist in Intlayer-Aufzählungen entscheidend. Die erste gültige Deklaration ist die, die ausgewählt wird.
- Wenn mehrere Bedingungen zutreffen, stellen Sie sicher, dass sie korrekt angeordnet sind, um unerwartetes Verhalten zu vermeiden.

## Beste Praktiken für die Aufzählung

Um sicherzustellen, dass Ihre Aufzählungen wie erwartet funktionieren, befolgen Sie diese besten Praktiken:

- **Konsistente Benennung**: Verwenden Sie klare und konsistente IDs für Aufzählungsmodule, um Verwirrung zu vermeiden.
- **Dokumentation**: Dokumentieren Sie Ihre Aufzählungsschlüssel und deren erwartete Ausgaben, um die zukünftige Wartbarkeit sicherzustellen.
- **Fehlerbehandlung**: Implementieren Sie eine Fehlerbehandlung, um Fälle zu verwalten, in denen keine gültige Aufzählung gefunden wird.
- **Leistungsoptimierung**: Reduzieren Sie für große Anwendungen die Anzahl der beobachteten Dateierweiterungen, um die Leistung zu verbessern.

## Zusätzliche Ressourcen

Für detailliertere Informationen zur Konfiguration und Nutzung verweisen Sie auf die folgenden Ressourcen:

- [Intlayer CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md)
- [React Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_create_react_app.md)
- [Next Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md)

Diese Ressourcen bieten weitere Einblicke in die Einrichtung und Verwendung von Intlayer in verschiedenen Umgebungen und mit verschiedenen Frameworks.

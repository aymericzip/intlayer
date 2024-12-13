# Funktion Abrufen

## Funktionsdeklarationen

Intlayer erlaubt es Ihnen, Inhaltsfunktionen in Ihren Inhaltsmodulen zu deklarieren, die entweder synchron oder asynchron sein können. Wenn die Anwendung aufgebaut wird, führt Intlayer diese Funktionen aus, um das Ergebnis der Funktion zu erhalten. Der Rückgabewert muss ein JSON-Objekt oder ein einfacher Wert wie eine Zeichenfolge oder eine Zahl sein.

Hier ist ein Beispiel für eine einfache synchrone Funktion, die Inhalte abruft:

```typescript
import type { DeclarationContent } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "Dies ist der Inhalt, der von einer Funktion gerendert wird",
  },
} satisfies DeclarationContent;

export default functionContent;
```

In diesem Beispiel enthält der Schlüssel `text` eine Funktion, die eine Zeichenfolge zurückgibt. Dieser Inhalt kann in Ihren React-Komponenten mit Intlayer's Interpreter-Paketen wie `react-intlayer` gerendert werden.

## Asynchrone Funktionsabfrage

Neben synchronen Funktionen unterstützt Intlayer asynchrone Funktionen, die es Ihnen ermöglichen, Daten aus externen Quellen abzurufen oder die Datenabfrage mit Mockdaten zu simulieren.

Unten steht ein Beispiel für eine asynchrone Funktion, die einen Serverabruf simuliert:

```typescript
import { setTimeout } from "node:timers/promises";
import type { DeclarationContent } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // Warten Sie 200 ms, um einen Abruf vom Server zu simulieren
  return await setTimeout(200).then(
    () => "Dies ist der Inhalt, der vom Server abgerufen wurde"
  );
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies DeclarationContent;

export default asyncFunctionContent;
```

In diesem Fall ahmt die Funktion `fakeFetch` eine Verzögerung nach, um die Antwortzeit des Servers zu simulieren. Intlayer führt die asynchrone Funktion aus und verwendet das Ergebnis als Inhalt für den Schlüssel `text`.

## Verwendung von funktionsbasiertem Inhalt in React-Komponenten

Um funktionsbasierten Inhalt in einer React-Komponente zu verwenden, müssen Sie `useIntlayer` von `react-intlayer` importieren und es mit der Inhalts-ID aufrufen, um den Inhalt abzurufen. Hier ist ein Beispiel:

```javascript
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Ausgabe: Dies ist der Inhalt, der von einer Funktion gerendert wird */}
      <p>{asyncFunctionContent.text}</p>
      {/* Ausgabe: Dies ist der Inhalt, der vom Server abgerufen wurde */}
    </div>
  );
};

export default MyComponent;
```

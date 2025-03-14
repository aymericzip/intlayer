## Wie Dateieinbettung funktioniert

In Intlayer ermöglicht die Funktion `file` das Einbetten externer Dateiinhalte in ein Wörterbuch. Dieser Ansatz stellt sicher, dass Intlayer die Quelldatei erkennt, was eine nahtlose Integration mit dem Intlayer Visual Editor und CMS ermöglicht. Im Gegensatz zu direkten `import`, `require` oder `fs` Methoden zur Dateilesung wird durch die Verwendung von `file` die Datei mit dem Wörterbuch verknüpft, sodass Intlayer den Inhalt dynamisch aktualisieren kann, wenn die Datei bearbeitet wird.

## Einrichten von Dateiinhalten

Um Dateiinhalte in Ihrem Intlayer-Projekt einzubetten, verwenden Sie die Funktion `file` in einem Inhaltsmodul. Nachfolgend finden Sie Beispiele, die verschiedene Implementierungen demonstrieren.

### TypeScript-Implementierung

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
} satisfies Dictionary;

export default myFileContent;
```

### ECMAScript-Modul (ESM) Implementierung

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
};

export default myFileContent;
```

### CommonJS-Implementierung

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
};

module.exports = myFileContent;
```

### JSON-Konfiguration

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

## Verwendung von Dateiinhalten in React Intlayer

Um eingebettete Dateiinhalte in einer React-Komponente zu verwenden, importieren und verwenden Sie den `useIntlayer` Hook aus dem `react-intlayer` Paket. Dieser ruft den Inhalt vom angegebenen Schlüssel ab und ermöglicht dessen dynamische Anzeige.

```tsx fileName="**/*.tsx" codeFormat="typescript"
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

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

module.exports = FileComponent;
```

## Mehrsprachiges Markdown-Beispiel

Um mehrsprachige, bearbeitbare Markdown-Dateien zu unterstützen, können Sie `file` in Kombination mit `t()` und `md()` verwenden, um verschiedene Sprachversionen einer Markdown-Inhaltsdatei zu definieren.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        de: file("src/components/test.de.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
} satisfies Dictionary;

export default myMultilingualContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file, t, md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        de: file("src/components/test.de.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};

export default myMultilingualContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file, t, md } = require("intlayer");

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        de: file("src/components/test.de.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};
```

Dieses Setup ermöglicht es, den Inhalt dynamisch basierend auf der Sprachpräferenz des Benutzers abzurufen. Wenn es im Intlayer Visual Editor oder CMS verwendet wird, erkennt das System, dass der Inhalt aus den angegebenen Markdown-Dateien stammt, und stellt sicher, dass diese bearbeitbar bleiben.

## Wie Intlayer Dateiinhalte verarbeitet

Die Funktion `file` basiert auf dem `fs` Modul von Node.js, um den Inhalt der angegebenen Datei zu lesen und in das Wörterbuch einzufügen. In Verbindung mit dem Intlayer Visual Editor oder CMS kann Intlayer die Beziehung zwischen dem Wörterbuch und der Datei verfolgen. Dadurch kann Intlayer:

- Erkennen, dass der Inhalt aus einer bestimmten Datei stammt.
- Den Wörterbuchinhalt automatisch aktualisieren, wenn die verknüpfte Datei bearbeitet wird.
- Die Synchronisation zwischen Datei und Wörterbuch sicherstellen und die Integrität des Inhalts bewahren.

## Zusätzliche Ressourcen

Weitere Details zur Konfiguration und Verwendung der Dateieinbettung in Intlayer finden Sie in den folgenden Ressourcen:

- [Intlayer CLI Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md)
- [React Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_create_react_app.md)
- [Next Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md)
- [Markdown-Inhaltsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/markdown.md)
- [Übersetzungsinhaltsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/translation.md)

Diese Ressourcen bieten weitere Einblicke in die Dateieinbettung, Inhaltsverwaltung und die Integration von Intlayer mit verschiedenen Frameworks.

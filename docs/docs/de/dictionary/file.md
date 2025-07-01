---
docName: dictionary__file
url: https://intlayer.org/doc/concept/content/file
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/file.md
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Datei
description: Erfahren Sie, wie Sie externe Dateien mit der Funktion `file` in Ihr Inhaltsverzeichnis einbetten. Diese Dokumentation erklärt, wie Intlayer Dateien dynamisch verknüpft und verwaltet.
keywords:
  - Datei
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Dateiinhalte / Einbetten von Dateien in Intlayer

## Wie das Einbetten von Dateien funktioniert

In Intlayer ermöglicht die Funktion `file` das Einbetten von externen Dateiinhalten in ein Wörterbuch. Dieser Ansatz stellt sicher, dass Intlayer die Quelldatei erkennt, was eine nahtlose Integration mit dem Intlayer Visual Editor und CMS ermöglicht. Im Gegensatz zu direkten `import`-, `require`- oder `fs`-Dateilesemethoden verknüpft die Verwendung von `file` die Datei mit dem Wörterbuch, sodass Intlayer den Inhalt dynamisch verfolgen und aktualisieren kann, wenn die Datei bearbeitet wird.

## Einrichten von Dateiinhalten

Um Dateiinhalte in Ihrem Intlayer-Projekt einzubetten, verwenden Sie die Funktion `file` in einem Inhaltsmodul. Nachfolgend finden Sie Beispiele, die verschiedene Implementierungen demonstrieren.

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

## Verwendung von Dateiinhalt in React Intlayer

Um eingebetteten Dateiinhalt in einer React-Komponente zu verwenden, importieren Sie den `useIntlayer` Hook aus dem `react-intlayer` Paket. Dieser ruft den Inhalt des angegebenen Schlüssels ab und ermöglicht die dynamische Anzeige.

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

Um mehrsprachige, editierbare Markdown-Dateien zu unterstützen, können Sie `file` in Kombination mit `t()` und `md()` verwenden, um verschiedene Sprachversionen einer Markdown-Inhaltsdatei zu definieren.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
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
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};
```

Diese Einrichtung ermöglicht es, den Inhalt dynamisch basierend auf der Sprachpräferenz des Benutzers abzurufen. Wenn sie im Intlayer Visual Editor oder CMS verwendet wird, erkennt das System, dass der Inhalt aus den angegebenen Markdown-Dateien stammt und stellt sicher, dass diese weiterhin bearbeitbar bleiben.

## Wie Intlayer mit Datei-Inhalten umgeht

Die `file`-Funktion basiert auf dem `fs`-Modul von Node.js, um den Inhalt der angegebenen Datei zu lesen und in das Wörterbuch einzufügen. Wenn sie in Verbindung mit dem Intlayer Visual Editor oder CMS verwendet wird, kann Intlayer die Beziehung zwischen dem Wörterbuch und der Datei verfolgen. Dies ermöglicht Intlayer:

- Zu erkennen, dass der Inhalt aus einer bestimmten Datei stammt.
- Den Wörterbuchinhalt automatisch zu aktualisieren, wenn die verknüpfte Datei bearbeitet wird.
- Sicherstellung der Synchronisation zwischen der Datei und dem Wörterbuch, um die Integrität des Inhalts zu bewahren.

## Zusätzliche Ressourcen

Für weitere Details zur Konfiguration und Verwendung der Dateieinbettung in Intlayer verweisen wir auf die folgenden Ressourcen:

- [Intlayer CLI Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md)
- [React Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_create_react_app.md)
- [Next Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_15.md)
- [Markdown Inhaltsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/markdown.md)
- [Übersetzungsinhaltsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/translation.md)

Diese Ressourcen bieten weitere Einblicke in die Dateieinbettung, Inhaltsverwaltung und die Integration von Intlayer mit verschiedenen Frameworks.

## Dokumentationshistorie

- 5.5.10 - 2025-06-29: Initiale Historie

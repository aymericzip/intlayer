---
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
slugs:
  - doc
  - concept
  - content
  - file
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Initiale Historie"
author: aymericzip
---

# Dateiinhalte / Einbetten von Dateien in Intlayer

## Wie das Einbetten von Dateien funktioniert

In Intlayer ermöglicht die Funktion `file` das Einbetten von externen Dateiinhalten in ein Wörterbuch. Dieser Ansatz stellt sicher, dass Intlayer die Quelldatei erkennt, was eine nahtlose Integration mit dem Intlayer Visual Editor und CMS ermöglicht. Im Gegensatz zu direkten `import`-, `require`- oder `fs`-Dateilesemethoden verknüpft die Verwendung von `file` die Datei mit dem Wörterbuch, sodass Intlayer den Inhalt dynamisch verfolgen und aktualisieren kann, wenn die Datei bearbeitet wird.

## Einrichten von Dateiinhalten

Um Dateiinhalte in Ihrem Intlayer-Projekt einzubetten, verwenden Sie die Funktion `file` in einem Inhaltsmodul. Nachfolgend finden Sie Beispiele, die verschiedene Implementierungen demonstrieren.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
} satisfies Dictionary;

export default myFileContent;
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

<Tabs group="framework">
  <Tab label="React" value="react">

To use embedded file content in a React component, import and use the `useIntlayer` hook from the `react-intlayer` package. This retrieves the content from the specified key and allows it to be displayed dynamically.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
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

  </Tab>
  <Tab label="Next.js" value="nextjs">

To use embedded file content in Next.js Client Components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

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

  </Tab>
  <Tab label="Vue" value="vue">

To use embedded file content in Vue components, retrieve it via the `useIntlayer` hook. Here's an example:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myFile } = useIntlayer("my_key");
</script>

<template>
  <div>
    <pre>{{ myFile }}</pre>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To use embedded file content in Svelte components, retrieve it via the `useIntlayer` hook. The store is accessed with `$`. Here's an example:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <pre>{$content.myFile}</pre>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To use embedded file content in Preact components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

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

  </Tab>
  <Tab label="Solid" value="solid">

To use embedded file content in SolidJS components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const FileComponent: Component = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

To use embedded file content in Angular components, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-file",
  template: `
    <div>
      <pre>{{ content().myFile }}</pre>
    </div>
  `,
})
export class FileComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To use embedded file content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("file-content")!.textContent = newContent.myFile;
});

// Initial render
document.getElementById("file-content")!.textContent = content.myFile;
```

  </Tab>
</Tabs>

## Mehrsprachiges Markdown-Beispiel

Um mehrsprachige, editierbare Markdown-Dateien zu unterstützen, können Sie `file` in Kombination mit `t()` und `md()` verwenden, um verschiedene Sprachversionen einer Markdown-Inhaltsdatei zu definieren.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

Diese Einrichtung ermöglicht es, den Inhalt dynamisch basierend auf der Sprachpräferenz des Benutzers abzurufen. Wenn sie im Intlayer Visual Editor oder CMS verwendet wird, erkennt das System, dass der Inhalt aus den angegebenen Markdown-Dateien stammt und stellt sicher, dass diese weiterhin bearbeitbar bleiben.

## Verschiedene Arten von Pfaden

Bei Verwendung der `file`-Funktion können Sie verschiedene Arten von Pfaden verwenden, um die einzubettende Datei anzugeben.

- `file("./path/to/file.txt")` - Relativer Pfad zur aktuellen Datei
- `file("path/to/file.txt")` - Relativer Pfad zum Projektroot-Verzeichnis
- `file("/users/username/path/to/file.txt")` - Absoluter Pfad

## Wie Intlayer mit Datei-Inhalten umgeht

Die `file`-Funktion basiert auf dem `fs`-Modul von Node.js, um den Inhalt der angegebenen Datei zu lesen und in das Wörterbuch einzufügen. Wenn sie in Verbindung mit dem Intlayer Visual Editor oder CMS verwendet wird, kann Intlayer die Beziehung zwischen dem Wörterbuch und der Datei verfolgen. Dies ermöglicht Intlayer:

- Zu erkennen, dass der Inhalt aus einer bestimmten Datei stammt.
- Den Wörterbuchinhalt automatisch zu aktualisieren, wenn die verknüpfte Datei bearbeitet wird.
- Sicherstellung der Synchronisation zwischen der Datei und dem Wörterbuch, um die Integrität des Inhalts zu bewahren.

## Zusätzliche Ressourcen

Für weitere Details zur Konfiguration und Verwendung der Dateieinbettung in Intlayer verweisen wir auf die folgenden Ressourcen:

- [Intlayer CLI Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md)
- [React Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_create_react_app.md)
- [Next Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_15.md)
- [Markdown Inhaltsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/markdown.md)
- [Übersetzungsinhaltsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/translation.md)

Diese Ressourcen bieten weitere Einblicke in die Dateieinbettung, Inhaltsverwaltung und die Integration von Intlayer mit verschiedenen Frameworks.

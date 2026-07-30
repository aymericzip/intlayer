---
createdAt: 2026-07-30
updatedAt: 2026-07-30
title: Auswahlbasierter Inhalt
description: Erfahren Sie, wie Sie auswahlbasierten Inhalt in Intlayer verwenden, um Inhalte basierend auf einem beliebigen Zeichenfolgenwert dynamisch anzuzeigen. Folgen Sie dieser Dokumentation, um Switch-ähnliche Inhalte effizient in Ihrem Projekt zu implementieren.
keywords:
  - Auswahlbasierter Inhalt
  - Select Content
  - Switch Inhalt
  - ICU select
  - Dynamisches Rendering
  - Dokumentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - select
history:
  - version: 9.1.0
    date: 2026-07-30
    changes: "Auswahlbasierten Inhalt eingeführt"
author: aymericzip
---

# Auswahlbasierter Inhalt / Select in Intlayer

## Wie Select funktioniert

In Intlayer wird auswahlbasierter Inhalt durch die Funktion `select` erreicht, die beliebige Zeichenfolgenwerte ihrem entsprechenden Inhalt zuordnet. Dies entspricht einer ICU-Nachricht `{value, select, …}` oder einer `switch`-Anweisung im Code Ihrer Anwendung.

Verwenden Sie `select`, wenn der Diskriminant eine freiformatige Zeichenfolge ist — ein Status, ein Plan, eine Plattform, eine Rolle. Für die anderen Diskriminanten bietet Intlayer spezielle Knoten:

| Diskriminant             | Knoten     |
| ------------------------ | ---------- |
| Eine Menge               | `enu()`    |
| Ein Boolean              | `cond()`   |
| Ein Geschlecht           | `gender()` |
| Jede andere Zeichenfolge | `select()` |

## Einrichten von auswahlbasiertem Inhalt

Um auswahlbasierten Inhalt in Ihrem Intlayer-Projekt einzurichten, erstellen Sie ein Inhaltsmodul, das Ihre Auswahl-Definitionen enthält. Unten finden Sie Beispiele in verschiedenen Formaten.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { select, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: "This post is a draft",
      published: "This post is live",
      scheduled: "This post is scheduled",
      fallback: "Unknown status", // Optional
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "publishStatus": {
      "nodeType": "select",
      "select": {
        "draft": "This post is a draft",
        "published": "This post is live",
        "scheduled": "This post is scheduled",
        "fallback": "Unknown status", // Optional
      },
    },
  },
}
```

> Wenn kein `fallback` deklariert ist, wird der zuletzt deklarierte Schlüssel als Fallback herangezogen, wenn der bereitgestellte Wert mit keinem deklarierten Fall übereinstimmt — derselbe Vertrag wie bei `cond()` und `gender()`.

### Typsicherheit

Das akzeptierte Argument wird aus den deklarierten Fällen abgeleitet:

- Ohne einen `fallback` werden nur die deklarierten Fälle akzeptiert — ein Tippfehler ist ein Typfehler.
- Mit einem `fallback` wird jede Zeichenfolge akzeptiert (der Fallback deckt die nicht übereinstimmenden Werte ab), während die deklarierten Fälle weiterhin automatisch vervollständigt werden.

## Warum kein einfaches Objekt?

Es ist verlockend, ein einfaches Objekt zu deklarieren und es mit dem Laufzeitwert zu indizieren:

```tsx
// ❌ Tun Sie das nicht
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus[publishType]}</p>;
```

Der Intlayer-Compiler analysiert Ihren Quellcode, um ungenutzten Inhalt zu bereinigen und die verbleibenden Schlüssel zu minimieren. Ein dynamischer berechneter Zugriff (`obj[expr]`) kann nicht statisch aufgelöst werden, sodass der gesamte Zweig als undurchsichtig markiert wird: Er bleibt im Bundle erhalten und seine Schlüssel bleiben unminimiert.

Mit `select()` erfolgt die Fallauflösung innerhalb eines Funktionsaufrufs und nicht als Eigenschaftszugriff. Der Compiler sieht einen einzelnen statischen Feldzugriff und optimiert den Knoten genau wie `enu()`, `cond()` oder `gender()`:

```tsx
// ✅ Tun Sie dies
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus(publishType)}</p>;
```

## Verwenden von auswahlbasiertem Inhalt

<Tabs group="framework">
  <Tab label="React" value="react">

Um auswahlbasierten Inhalt in einer React-Komponente zu verwenden, importieren und nutzen Sie den Hook `useIntlayer` aus dem Paket `react-intlayer`. Dieser Hook ruft den Inhalt für den angegebenen Schlüssel ab und ermöglicht es Ihnen, einen Wert zu übergeben, um die entsprechende Ausgabe auszuwählen.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Ausgabe: This post is a draft */
          publishStatus("draft")
        }
      </p>
      <p>
        {
          /* Ausgabe: This post is live */
          publishStatus("published")
        }
      </p>
      <p>
        {
          /* Ausgabe: Unknown status */
          publishStatus("Archived")
        }
      </p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Um auswahlbasierten Inhalt in Next.js-Client-Komponenten zu verwenden, rufen Sie ihn über den Hook `useIntlayer` ab. Hier ist ein Beispiel:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Vue" value="vue">

Um auswahlbasierten Inhalt in Vue-Komponenten zu verwenden, rufen Sie ihn über den Hook `useIntlayer` ab. Hier ist ein Beispiel:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { publishStatus } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ publishStatus("draft") }}</p>
    <p>{{ publishStatus("published") }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Um auswahlbasierten Inhalt in Svelte-Komponenten zu verwenden, rufen Sie ihn über den Hook `useIntlayer` ab. Auf den Store wird mit `$` zugegriffen. Hier ist ein Beispiel:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.publishStatus("draft")}</p>
  <p>{$content.publishStatus("published")}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Um auswahlbasierten Inhalt in Preact-Komponenten zu verwenden, rufen Sie ihn über den Hook `useIntlayer` ab. Hier ist ein Beispiel:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Solid" value="solid">

Um auswahlbasierten Inhalt in SolidJS-Komponenten zu verwenden, rufen Sie ihn über den Hook `useIntlayer` ab. Hier ist ein Beispiel:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const PostStatus: Component = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Angular" value="angular">

Um auswahlbasierten Inhalt in Angular-Komponenten zu verwenden, rufen Sie ihn über den Hook `useIntlayer` ab. Hier ist ein Beispiel:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-post-status",
  template: `
    <div>
      <p>{{ content().publishStatus("draft") }}</p>
      <p>{{ content().publishStatus("published") }}</p>
    </div>
  `,
})
export class PostStatusComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

Um auswahlbasierten Inhalt mit `vanilla-intlayer` zu verwenden, rufen Sie ihn über den Hook `useIntlayer` ab. Hier ist ein Beispiel:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("status")!.textContent =
    newContent.publishStatus("draft");
});

// Initiales Rendering
document.getElementById("status")!.textContent = content.publishStatus("draft");
```

  </Tab>
</Tabs>

## Kombination von Select mit anderen Knoten

Jeder Fall enthält einen vollständigen Inhaltsknoten, sodass sich `select` mit `t()`, `insert()`, `md()` und den anderen kombinieren lässt:

```typescript fileName="**/*.content.ts" codeFormat="typescript"
import { insert, select, t, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: insert(
        t({
          en: "{{name}} saved a draft",
          fr: "{{name}} a enregistré un brouillon",
          de: "{{name}} hat einen Entwurf gespeichert",
        })
      ),
      published: insert(
        t({
          en: "{{name}} published the post",
          fr: "{{name}} a publié l’article",
          de: "{{name}} hat den Beitrag veröffentlicht",
        })
      ),
      fallback: insert(
        t({
          en: "{{name}} updated the post",
          fr: "{{name}} a mis à jour l’article",
          de: "{{name}} hat den Beitrag aktualisiert",
        })
      ),
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```tsx
publishStatus("draft")({ name: "Alice" }); // Ausgabe: Alice hat einen Entwurf gespeichert
```

## Migration von ICU `select`

Nachrichten, die das ICU-Argument `select` verwenden, werden als `select`-Knoten importiert:

```text
{publishType, select, draft {draft} published {published} other {Unknown}}
```

wird zu

```typescript
select(
  {
    draft: "draft",
    published: "published",
    fallback: "Unknown",
  },
  "publishType"
);
```

Der ICU-Fall `other` wird in `fallback` umbenannt, was der kanonische Name von Intlayer für einen Auffangfall (Catch-All) ist. Das zweite Argument zeichnet den ICU-Variablennamen auf, sodass die Nachricht beim Exportieren wieder in genau dieselbe ICU-Zeichenfolge umgewandelt wird.

> Ein ICU `select`, dessen Fälle Geschlechterwerte sind (`male` / `female` / `other`), wird stattdessen als [`gender`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/gender.md)-Knoten importiert.

## Zusätzliche Ressourcen

Für detailliertere Informationen zur Konfiguration und Nutzung lesen Sie die folgenden Ressourcen:

- [Intlayer CLI Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md)
- [React Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_create_react_app.md)
- [Next Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_15.md)

Diese Ressourcen bieten weitere Einblicke in die Einrichtung und Verwendung von Intlayer in verschiedenen Umgebungen und Frameworks.

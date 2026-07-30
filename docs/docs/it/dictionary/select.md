---
createdAt: 2026-07-30
updatedAt: 2026-07-30
title: Contenuto Basato su Selezione
description: Scopri come utilizzare il contenuto basato su selezione in Intlayer per visualizzare contenuti dinamicamente in base a un valore stringa arbitrario. Segui questa documentazione per implementare in modo efficiente contenuti simili a switch nel tuo progetto.
keywords:
  - Contenuto Basato su Selezione
  - Select Content
  - Contenuto Switch
  - ICU select
  - Rendering Dinamico
  - Documentazione
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
    changes: "Introdotto il contenuto basato su selezione"
author: aymericzip
---

# Contenuto Basato su Selezione / Select in Intlayer

## Come funziona Select

In Intlayer, il contenuto basato su selezione si ottiene tramite la funzione `select`, che mappa valori stringa arbitrari al rispettivo contenuto. È l'equivalente di un messaggio `{value, select, …}` di ICU, o di un'istruzione `switch` nel codice della tua applicazione.

Usa `select` quando il discriminante è una stringa in formato libero: uno stato, un piano, una piattaforma, un ruolo. Per gli altri discriminanti, Intlayer fornisce nodi dedicati:

| Discriminante           | Nodo       |
| ----------------------- | ---------- |
| Una quantità            | `enu()`    |
| Un booleano             | `cond()`   |
| Un genere               | `gender()` |
| Qualsiasi altra stringa | `select()` |

## Impostazione del Contenuto Basato su Selezione

Per impostare il contenuto basato su selezione nel tuo progetto Intlayer, crea un modulo di contenuto che includa le tue definizioni di selezione. Di seguito sono riportati esempi in vari formati.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { select, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: "This post is a draft",
      published: "This post is live",
      scheduled: "This post is scheduled",
      fallback: "Unknown status", // Opzionale
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
        "fallback": "Unknown status", // Opzionale
      },
    },
  },
}
```

> Se non viene dichiarato un `fallback`, l'ultima chiave dichiarata verrà utilizzata come fallback quando il valore fornito non corrisponde ad alcun caso dichiarato: lo stesso contratto di `cond()` e `gender()`.

### Sicurezza dei Tipi

L'argomento accettato viene dedotto dai casi dichiarati:

- Senza un `fallback`, sono accettati solo i casi dichiarati: un errore di battitura è un errore di tipo.
- Con un `fallback`, viene accettata qualsiasi stringa (il fallback copre i valori non corrispondenti), mentre i casi dichiarati offrono comunque l'autocompletamento.

## Perché non un semplice oggetto?

È allettante dichiarare un semplice oggetto e indicizzarlo con il valore a runtime:

```tsx
// ❌ Non fare questo
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus[publishType]}</p>;
```

Il compilatore di Intlayer analizza il tuo codice sorgente per eliminare il contenuto inutilizzato e minimizzare le chiavi rimanenti. Un accesso computato dinamico (`obj[expr]`) non può essere risolto staticamente, per cui l'intero ramo viene contrassegnato come opaco: viene mantenuto nel bundle e le sue chiavi restano non minimizzate.

Con `select()`, la risoluzione del caso avviene all'interno di una chiamata a funzione anziché come accesso a una proprietà. Il compilatore vede un singolo accesso di campo statico e ottimizza il nodo esattamente come `enu()`, `cond()` o `gender()`:

```tsx
// ✅ Fai questo
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus(publishType)}</p>;
```

## Utilizzo del Contenuto Basato su Selezione

<Tabs group="framework">
  <Tab label="React" value="react">

Per utilizzare il contenuto basato su selezione all'interno di un componente React, importa e usa l'hook `useIntlayer` dal pacchetto `react-intlayer`. Questo hook recupera il contenuto per la chiave specificata e ti consente di passare un valore per selezionare l'output appropriato.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: This post is a draft */
          publishStatus("draft")
        }
      </p>
      <p>
        {
          /* Output: This post is live */
          publishStatus("published")
        }
      </p>
      <p>
        {
          /* Output: Unknown status */
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

Per utilizzare il contenuto basato su selezione all'interno dei componenti client Next.js, recuperalo tramite l'hook `useIntlayer`. Ecco un esempio:

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

Per utilizzare il contenuto basato su selezione all'interno dei componenti Vue, recuperalo tramite l'hook `useIntlayer`. Ecco un esempio:

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

Per utilizzare il contenuto basato su selezione all'interno dei componenti Svelte, recuperalo tramite l'hook `useIntlayer`. Si accede allo store utilizzando `$`. Ecco un esempio:

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

Per utilizzare il contenuto basato su selezione all'interno dei componenti Preact, recuperalo tramite l'hook `useIntlayer`. Ecco un esempio:

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

Per utilizzare il contenuto basato su selezione all'interno dei componenti SolidJS, recuperalo tramite l'hook `useIntlayer`. Ecco un esempio:

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

Per utilizzare il contenuto basato su selezione all'interno dei componenti Angular, recuperalo tramite l'hook `useIntlayer`. Ecco un esempio:

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

Per utilizzare il contenuto basato su selezione con `vanilla-intlayer`, recuperalo tramite l'hook `useIntlayer`. Ecco un esempio:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("status")!.textContent =
    newContent.publishStatus("draft");
});

// Rendering iniziale
document.getElementById("status")!.textContent = content.publishStatus("draft");
```

  </Tab>
</Tabs>

## Combinare Select con altri nodi

Ciascun caso contiene un nodo di contenuto completo, pertanto `select` si combina con `t()`, `insert()`, `md()` e gli altri:

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
          it: "{{name}} ha salvato una bozza",
        })
      ),
      published: insert(
        t({
          en: "{{name}} published the post",
          fr: "{{name}} a publié l’article",
          it: "{{name}} ha pubblicato il post",
        })
      ),
      fallback: insert(
        t({
          en: "{{name}} updated the post",
          fr: "{{name}} a mis à jour l’article",
          it: "{{name}} ha aggiornato il post",
        })
      ),
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```tsx
publishStatus("draft")({ name: "Alice" }); // Output: Alice ha salvato una bozza
```

## Migrazione da ICU `select`

I messaggi che utilizzano l'argomento `select` di ICU vengono importati come nodi `select`:

```text
{publishType, select, draft {draft} published {published} other {Unknown}}
```

diventa

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

Il caso ICU `other` viene rinominato in `fallback`, che è il nome canonico in Intlayer per il caso catch-all. Il secondo argomento registra il nome della variabile ICU affinché il messaggio ritorni esattamente alla stessa stringa ICU al momento dell'esportazione.

> Un ICU `select` i cui casi sono valori di genere (`male` / `female` / `other`) viene invece importato come nodo [`gender`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/gender.md).

## Risorse Aggiuntive

Per informazioni più dettagliate sulla configurazione e l'uso, fai riferimento alle seguenti risorse:

- [Documentazione CLI di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md)
- [Documentazione React di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_create_react_app.md)
- [Documentazione Next di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_15.md)

Queste risorse offrono ulteriori approfondimenti sulla configurazione e l'utilizzo di Intlayer in vari ambienti e framework.

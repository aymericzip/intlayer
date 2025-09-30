---
createdAt: 2024-03-07
updatedAt: 2025-09-30
title: Rendere un componente multilingue (libreria i18n) in React e Next.js
description: Impara come dichiarare e recuperare contenuti localizzati per costruire un componente React o Next.js multilingue con Intlayer.
keywords:
  - i18n
  - componente
  - react
  - multilingue
  - next.js
  - intlayer
slugs:
  - doc
  - component
  - i18n
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
---

# Come rendere un componente multilingue (i18n) con Intlayer

Questa guida mostra i passaggi minimi per rendere un componente UI multilingue in due configurazioni comuni:

- React (Vite/SPA)
- Next.js (App Router)

Per prima cosa dichiarerai il tuo contenuto, poi lo recupererai nel tuo componente.

## 1) Dichiara il tuo contenuto (condiviso per React e Next.js)

Crea un file di dichiarazione del contenuto vicino al tuo componente. Questo mantiene le traduzioni vicine al punto in cui vengono utilizzate e consente la sicurezza dei tipi.

```ts fileName="component.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    description: t({
      en: "A multilingual React component",
      fr: "Un composant React multilingue",
      es: "Un componente React multilingüe",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

Anche JSON è supportato se preferisci i file di configurazione.

```json fileName="component.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": { "en": "Hello", "fr": "Bonjour", "es": "Hola" }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "A multilingual React component",
        "fr": "Un composant React multilingue",
        "es": "Un componente React multilingüe"
      }
    }
  }
}
```

## 2) Recupera il tuo contenuto

### Caso A — App React (Vite/SPA)

Approccio predefinito: usa `useIntlayer` per recuperare tramite chiave. Questo mantiene i componenti leggeri e tipizzati.

```tsx fileName="ComponentExample.tsx"
import { useIntlayer } from "react-intlayer";

export function ComponentExample() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

Rendering lato server o fuori dal provider: usa `react-intlayer/server` e passa un `locale` esplicito quando necessario.

```tsx fileName="ServerRenderedExample.tsx"
import { useIntlayer } from "react-intlayer/server";

export function ServerRenderedExample({ locale }: { locale: string }) {
  const content = useIntlayer("component-example", locale);
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

Alternativa: `useDictionary` può leggere un intero oggetto dichiarato se preferisci collocare la struttura nel punto di chiamata.

```tsx fileName="ComponentWithDictionary.tsx"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

export function ComponentWithDictionary() {
  const { title, description } = useDictionary(componentContent);
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
```

### Caso B — Next.js (App Router)

Preferisci i componenti server per sicurezza dei dati e prestazioni. Usa `useIntlayer` da `next-intlayer/server` nei file server, e `useIntlayer` da `next-intlayer` nei componenti client.

```tsx fileName="app/[locale]/example/ServerComponent.tsx"
import { useIntlayer } from "next-intlayer/server";

export default function ServerComponent() {
  const content = useIntlayer("component-example");
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

```tsx fileName="app/[locale]/example/ClientComponent.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function ClientComponent() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

Suggerimento: Per i metadata della pagina e la SEO, puoi anche recuperare contenuti usando `getIntlayer` e generare URL multilingue tramite `getMultilingualUrls`.

## Perché l’approccio a componenti di Intlayer è il migliore

- **Collocazione**: Le dichiarazioni di contenuto vivono vicino ai componenti, riducendo la deriva e migliorando il riutilizzo nei sistemi di design.
- **Sicurezza dei tipi**: Chiavi e strutture sono fortemente tipizzate; le traduzioni mancanti emergono in fase di build anziché a runtime.
- **Server-first**: Funziona nativamente nei componenti server per una migliore sicurezza e prestazioni; gli hook client rimangono ergonomici.
- **Tree-shaking**: Viene incluso solo il contenuto utilizzato dal componente, mantenendo i payload piccoli nelle grandi applicazioni.
- **DX e strumenti**: Middleware integrati, helper SEO e traduzioni opzionali con Visual Editor/AI semplificano il lavoro quotidiano.

Consulta i confronti e i modelli nel riepilogo focalizzato su Next.js: https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

## Guide e riferimenti correlati

- Configurazione React (Vite): https://intlayer.org/doc/environment/vite-and-react
- React Router v7: https://intlayer.org/doc/environment/vite-and-react/react-router-v7
- TanStack Start: https://intlayer.org/doc/environment/vite-and-react/tanstack-start
- Configurazione Next.js: https://intlayer.org/doc/environment/nextjs
- Perché Intlayer vs. next-intl vs. next-i18next: https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

Queste pagine includono la configurazione end-to-end, i provider, il routing e gli helper SEO.

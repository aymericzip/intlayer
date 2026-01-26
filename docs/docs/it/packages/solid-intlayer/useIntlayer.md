---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione dell'hook useIntlayer | solid-intlayer
description: Scopri come usare l'hook useIntlayer per il pacchetto solid-intlayer
keywords:
  - useIntlayer
  - dizionario
  - Intlayer
  - intlayer
  - Internazionalizzazione
  - Documentazione
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - useIntlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentazione unificata per tutte le esportazioni
---

# Documentazione dell'hook useIntlayer

L'hook `useIntlayer` ti permette di recuperare contenuti localizzati da un dizionario usando la sua chiave. In Solid, questo hook restituisce una funzione reattiva **accessor** che si aggiorna ogni volta che la locale cambia.

## Utilizzo

```tsx
import { useIntlayer } from "solid-intlayer";

const MyComponent = () => {
  const content = useIntlayer("my_dictionary_key");

  return (
    <div>
      <h1>{content().title}</h1>
      <p>{content().description}</p>
    </div>
  );
};
```

## Descrizione

L'hook esegue le seguenti operazioni:

1. **Rilevamento del locale**: Utilizza il locale corrente dal contesto `IntlayerProvider`.
2. **Iniezione del dizionario**: Inietta automaticamente il contenuto del dizionario corrispondente alla chiave fornita, utilizzando le dichiarazioni ottimizzate generate dal compilatore Intlayer.
3. **Reattività**: Restituisce un accessor di Solid (`Accessor<T>`) che si ricalcola automaticamente quando lo stato globale del locale cambia.
4. **Elaborazione della traduzione**: risolve il contenuto in base alla locale rilevata, processando eventuali definizioni `t()`, `enu()`, ecc., presenti nel dizionario.

## Parametri

- **key**: La chiave univoca del dizionario (come definita nei tuoi file di dichiarazione dei contenuti).
- **locale** (opzionale): Sovrascrive la locale corrente.

## Restituisce

Una funzione accessor (`() => Content`) che restituisce il contenuto localizzato.

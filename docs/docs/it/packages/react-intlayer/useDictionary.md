---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Hook useDictionary - Documentazione React Intlayer
description: Guida completa all'uso del hook useDictionary nelle applicazioni React con Intlayer per una gestione efficiente dei contenuti localizzati senza editor visuale.
keywords:
  - useDictionary
  - React
  - hook
  - intlayer
  - localizzazione
  - i18n
  - dizionario
  - traduzione
slugs:
  - doc
  - packages
  - react-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inizio cronologia"
author: aymericzip
---

# Documentazione dell'Hook useDictionary

L'hook `useDictionary` ti consente di elaborare un oggetto che assomiglia a un dizionario (contenente chiavi e contenuto) e gestire traduzioni, enumerazioni, ecc., al suo interno. A differenza di `useIntlayer`, che è progettato per funzionare con dichiarazioni di dizionario generate, `useDictionary` è più flessibile e può essere utilizzato con qualsiasi oggetto che segue la struttura del dizionario.

## Esempio di utilizzo in React

Di seguito un esempio di come utilizzare l'hook `useDictionary` in un componente React:

```tsx fileName="./ComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample: FC = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Suggerimenti Aggiuntivi

- **Sicurezza del Tipo**: Usa sempre `Dictionary` per definire i tuoi dizionari per garantire la sicurezza del tipo.
- **Aggiornamenti di Localizzazione**: Quando aggiorni il contenuto, assicurati che tutte le localizzazioni siano coerenti per evitare traduzioni mancanti.

Questa documentazione si concentra sull'integrazione del hook `useDictionary`, fornendo un approccio semplificato per gestire contenuti localizzati senza fare affidamento sulle funzionalità degli editor visuali.

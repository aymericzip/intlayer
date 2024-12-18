# Integrazione di Next.js: Documentazione del Hook `useIntlayerAsync`

L'hook `useIntlayerAsync` estende la funzionalità di `useIntlayer` restituendo non solo dizionari pre-renderizzati ma anche recuperando aggiornamenti in modo asincrono, rendendolo ideale per le applicazioni che aggiornano frequentemente i contenuti localizzati dopo il render iniziale.

## Panoramica

- **Caricamento Asincrono del Dizionario:**  
  Sul lato client, `useIntlayerAsync` restituisce per primo il dizionario locale pre-renderizzato (proprio come `useIntlayer`) e poi recupera e unisce asincronicamente eventuali nuovi dizionari remoti disponibili.
- **Gestione dello Stato di Progresso:**  
  L'hook fornisce anche uno stato `isLoading`, che indica quando un dizionario remoto viene recuperato. Questo consente agli sviluppatori di visualizzare indicatori di caricamento o stati di scheletro per un'esperienza utente più fluida.

## Configurazione dell'Ambiente

Intlayer offre un sistema di gestione dei contenuti (CSM) headless che consente ai non sviluppatori di gestire e aggiornare senza problemi i contenuti delle applicazioni. Utilizzando il dashboard intuitivo di Intlayer, il tuo team può modificare testi localizzati, immagini e altre risorse senza modificare direttamente il codice. Questo semplifica il processo di gestione dei contenuti, favorisce la collaborazione e garantisce che gli aggiornamenti possano essere effettuati rapidamente e facilmente.

Per iniziare con Intlayer, prima devi registrarti e ottenere un token di accesso su [https://intlayer.org/dashboard](https://intlayer.org/dashboard). Una volta ottenute le tue credenziali, aggiungile al tuo file di configurazione come mostrato di seguito:

```typescript
import { type IntlayerConfig } from 'intlayer';

export default {
  ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
} satisfies IntlayerConfig;
```

Dopo aver configurato le tue credenziali, puoi caricare un nuovo dizionario locale su Intlayer eseguendo:

```bash
npm intlayer push -d my-first-dictionary-key
```

Questo comando carica i tuoi dizionari di contenuti iniziali, rendendoli disponibili per il recupero asincrono e la modifica tramite la piattaforma Intlayer.

## Importazione di `useIntlayerAsync` in Next.js

Poiché `useIntlayerAsync` è destinato a componenti **lato client**, dovrai importarlo dal medesimo punto di ingresso client di `useIntlayer`:

```tsx
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

Assicurati che il file di importazione sia annotato con `"use client"` in cima, se stai usando il Next.js App Router con componenti server e client separati.

## Parametri

1. **`key`**:  
   **Tipo**: `DictionaryKeys`  
   La chiave del dizionario utilizzata per identificare il blocco di contenuti localizzati. Questa chiave dovrebbe essere definita nei tuoi file di dichiarazione dei contenuti.

2. **`locale`** (opzionale):  
   **Tipo**: `Locales`  
   Il locale specifico che vuoi mirare. Se omesso, l'hook utilizza il locale dal contesto del client.

3. **`isRenderEditor`** (opzionale, impostato su `true` di default):  
   **Tipo**: `boolean`  
   Determina se il contenuto dovrebbe essere pronto per il rendering con il sovrapposizione dell'editor di Intlayer. Se impostato su `false`, i dati del dizionario restituiti escluderanno funzionalità specifiche dell'editor.

## Valore di Ritorno

L'hook restituisce un oggetto dizionario contenente contenuti localizzati chiave per `key` e `locale`. Include anche un booleano `isLoading` che indica se un dizionario lontano è attualmente in fase di recupero.

## Esempio di Utilizzo in Next.js

### Esempio di Componente Lato Client

```tsx
"use client";

import { useEffect } from "react";
import { useIntlayerAsync } from "next-intlayer";

export const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Il contenuto è in caricamento...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

**Punti Chiave:**

- Al primo render, `title` e `description` provengono dal dizionario locale pre-renderizzato.
- Quando `isLoading` è `true`, viene effettuata in background una richiesta remota per recuperare un dizionario aggiornato.
- Una volta completato il recupero, `title` e `description` vengono aggiornati con il contenuto più recente e `isLoading` torna a `false`.

## Gestione della Localizzazione degli Attributi

Come con `useIntlayer`, puoi recuperare valori di attributo localizzati per varie proprietà HTML (es. `alt`, `title`, `aria-label`):

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## File di Dichiarazione dei Contenuti

Tutte le chiavi di contenuto devono essere definite nei tuoi file di dichiarazione dei contenuti per la sicurezza dei tipi e per prevenire errori a runtime. Questi file abilitano la validazione di TypeScript, assicurando che tu faccia sempre riferimento a chiavi e locali esistenti.

Le istruzioni per impostare i file di dichiarazione dei contenuti sono disponibili [qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/get_started.md).

## Ulteriori Informazioni

- **Editor Visivo di Intlayer:**  
  Integra con l'editor visivo di Intlayer per gestire e modificare contenuti direttamente dall'interfaccia utente. Maggiori dettagli [qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_editor.md).

---

**In sintesi**, `useIntlayerAsync` è un potente hook lato client progettato per migliorare l'esperienza utente e mantenere la freschezza dei contenuti unendo dizionari pre-renderizzati con aggiornamenti di dizionario asincroni. Sfruttando `isLoading` e dichiarazioni di contenuti basate su TypeScript, puoi integrare senza soluzione di continuità contenuti dinamici e localizzati nelle tue applicazioni Next.js.

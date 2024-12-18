# Integrazione React: Documentazione del Hook `useIntlayerAsync`

Il hook `useIntlayerAsync` estende la funzionalità di `useIntlayer` non solo restituendo dizionari pre-renderizzati, ma anche recuperando aggiornamenti in modo asincrono, rendendolo ideale per applicazioni che aggiornano frequentemente i loro contenuti localizzati dopo il render iniziale.

## Panoramica

- **Caricamento asincrono dei dizionari:**  
  Al montaggio iniziale, `useIntlayerAsync` restituisce prima qualsiasi dizionario locale pre-fetchato o statico (proprio come farebbe `useIntlayer`) e poi recupera e unisce in modo asincrono eventuali nuovi dizionari remoti disponibili.
- **Gestione dello stato di progresso:**  
  Il hook offre anche uno stato `isLoading`, che indica quando un dizionario remoto è in fase di recupero. Questo consente agli sviluppatori di visualizzare indicatori di caricamento o stati scheletrici per una esperienza utente più fluida.

## Impostazione dell'ambiente

Intlayer fornisce un sistema di Content Source Management (CSM) headless che consente ai non sviluppatori di gestire e aggiornare i contenuti delle applicazioni senza problemi. Utilizzando il dashboard intuitivo di Intlayer, il tuo team può modificare testi localizzati, immagini e altre risorse senza dover modificare direttamente il codice. Questo semplifica il processo di gestione dei contenuti, favorisce la collaborazione e garantisce che gli aggiornamenti possano essere effettuati rapidamente e facilmente.

Per iniziare con Intlayer:

1. **Registrati e ottieni un token di accesso** su [https://intlayer.org/dashboard](https://intlayer.org/dashboard).
2. **Aggiungi le credenziali al tuo file di configurazione:**  
   Nel tuo progetto React, configura il client Intlayer con le tue credenziali:

   ```typescript
   import { type IntlayerConfig } from 'intlayer';

   export default {
     ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID,
       clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     },
   } satisfies  IntlayerConfig
   ```

3. **Carica un nuovo dizionario locale su Intlayer:**

   ```bash
   npm intlayer push -d my-first-dictionary-key
   ```

   Questo comando carica i tuoi dizionari di contenuti iniziali, rendendoli disponibili per il recupero e la modifica asincrona attraverso la piattaforma Intlayer.

## Importare `useIntlayerAsync` in React

Nei tuoi componenti React, importa `useIntlayerAsync`:

```tsx
import { useIntlayerAsync } from "react-intlayer";
```

## Parametri

1. **`key`**:  
   **Tipo**: `DictionaryKeys`  
   La chiave del dizionario utilizzata per identificare il blocco di contenuto localizzato. Questa chiave dovrebbe essere definita nei file di dichiarazione dei tuoi contenuti.

2. **`locale`** (opzionale):  
   **Tipo**: `Locales`  
   Il locale specifico che desideri mirare. Se omesso, il hook utilizza il locale dal contesto corrente di Intlayer.

3. **`isRenderEditor`** (opzionale, predefinito a `true`):  
   **Tipo**: `boolean`  
   Determina se il contenuto dovrebbe essere pronto per il rendering con la sovrapposizione dell'editor di Intlayer. Se impostato su `false`, i dati del dizionario restituiti escluderanno le funzionalità specifiche dell'editor.

## Valore restituito

Il hook restituisce un oggetto dizionario contenente contenuti localizzati chiave per `key` e `locale`. Include anche un booleano `isLoading` che indica se un dizionario remoto è attualmente in fase di recupero.

## Esempio di utilizzo in un componente React

```tsx
import { useEffect } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Il contenuto è in caricamento...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Caricamento…</h1>
          <p>Per favore attendi mentre vengono aggiornati i contenuti.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

**Punti chiave:**

- Al render iniziale, `title` e `description` provengono dal dizionario locale pre-fetchato o staticamente incorporato.
- Mentre `isLoading` è `true`, una richiesta di background recupera un dizionario aggiornato.
- Una volta completato il recupero, `title` e `description` vengono aggiornati con i contenuti più recenti, e `isLoading` torna a `false`.

## Gestione della localizzazione degli attributi

Puoi anche recuperare valori di attributo localizzati per varie proprietà HTML (ad es., `alt`, `title`, `aria-label`):

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## File di dichiarazione dei contenuti

Tutti i tasti di contenuto devono essere definiti nei tuoi file di dichiarazione dei contenuti per sicurezza di tipo e per prevenire errori a runtime. Questi file consentono la validazione TypeScript, assicurando che tu faccia sempre riferimento a chiavi e localizzazioni esistenti.

Le istruzioni per impostare i file di dichiarazione dei contenuti sono disponibili [qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/get_started.md).

## Ulteriori informazioni

- **Editor visivo Intlayer:**  
  Integra con l'editor visivo di Intlayer per gestire e modificare i contenuti direttamente dall'interfaccia utente. Maggiori dettagli [qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_editor.md).

---

**In sintesi**, `useIntlayerAsync` è un potente hook React progettato per migliorare l'esperienza utente e mantenere la freschezza dei contenuti unendo dizionari pre-renderizzati o pre-fetchati con aggiornamenti di dizionario asincroni. Sfruttando `isLoading` e dichiarazioni di contenuto basate su TypeScript, puoi integrare senza problemi contenuti localizzati e dinamici nelle tue applicazioni React.

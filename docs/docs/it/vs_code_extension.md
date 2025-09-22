---
createdAt: 2025-03-17
updatedAt: 2025-09-22
title: Estensione Ufficiale per VS Code
description: Scopri come utilizzare l'estensione Intlayer in VS Code per migliorare il tuo flusso di lavoro di sviluppo. Naviga rapidamente tra contenuti localizzati e gestisci i tuoi dizionari in modo efficiente.
keywords:
  - Estensione VS Code
  - Intlayer
  - Localizzazione
  - Strumenti di Sviluppo
  - React
  - Next.js
  - JavaScript
  - TypeScript
slugs:
  - doc
  - vs-code-extension
---

# Estensione Ufficiale per VS Code

## Panoramica

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) è l'estensione ufficiale di Visual Studio Code per **Intlayer**, progettata per migliorare l'esperienza dello sviluppatore quando si lavora con contenuti localizzati nei tuoi progetti.

![Estensione Intlayer per VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

Link all'estensione: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## Funzionalità

### Navigazione Istantanea

**Supporto Vai alla Definizione** – Usa `⌘ + Click` (Mac) o `Ctrl + Click` (Windows/Linux) su una chiave `useIntlayer` per aprire immediatamente il file di contenuto corrispondente.  
**Integrazione Perfetta** – Funziona senza problemi con i progetti **react-intlayer** e **next-intlayer**.  
**Supporto Multilingue** – Supporta contenuti localizzati in diverse lingue.  
**Integrazione con VS Code** – Si integra fluidamente con la navigazione e la palette dei comandi di VS Code.

### Comandi per la Gestione dei Dizionari

Gestisci i tuoi dizionari di contenuti direttamente da VS Code:

- **Costruisci Dizionari** – Genera file di contenuto basati sulla struttura del tuo progetto.
- **Carica Dizionari** – Carica l'ultimo contenuto del dizionario nel tuo repository.
- **Scarica Dizionari** – Sincronizza l'ultimo contenuto del dizionario dal tuo repository al tuo ambiente locale.
- **Riempi Dizionari** – Popola i dizionari con contenuti dal tuo progetto.
- **Testa Dizionari** – Identifica traduzioni mancanti o incomplete.

### Generatore di Dichiarazioni di Contenuto

Genera facilmente file di dizionario strutturati in diversi formati:

Se stai lavorando su un componente, genererà per te il file `.content.{ts,tsx,js,jsx,mjs,cjs,json}`.

Esempio di componente:

```tsx fileName="src/components/MyComponent/index.tsx"
const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("my-component");

  return <span>{myTranslatedContent}</span>;
};
```

File generato in formato TypeScript:

```tsx fileName="src/components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "my-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentContent;
```

Formati disponibili:

- **TypeScript (`.ts`)**
- **Modulo ES (`.esm`)**
- **CommonJS (`.cjs`)**
- **JSON (`.json`)**

### Scheda Intlayer (Barra delle Attività)

Apri la scheda Intlayer cliccando sull'icona Intlayer nella barra delle attività di VS Code. Contiene due viste:

- **Ricerca**: Una barra di ricerca live per filtrare rapidamente i dizionari e i loro contenuti. La digitazione aggiorna i risultati istantaneamente.
- **Dizionari**: Una vista ad albero dei tuoi ambienti/progetti, delle chiavi del dizionario e dei file che contribuiscono con voci. Puoi:
  - Cliccare su un file per aprirlo nell'editor.
  - Usare la barra degli strumenti per eseguire azioni: Build, Pull, Push, Fill, Refresh, Test e Create Dictionary File.
  - Usare il menu contestuale per azioni specifiche dell'elemento:
    - Su un dizionario: Pull o Push
    - Su un file: Fill Dictionary
  - Quando cambi editor, l'albero rivelerà il file corrispondente se appartiene a un dizionario.

## Installazione

Puoi installare **Intlayer** direttamente dal Marketplace di VS Code:

1. Apri **VS Code**.
2. Vai al **Marketplace delle Estensioni**.
3. Cerca **"Intlayer"**.
4. Clicca su **Installa**.

## Utilizzo

### Navigazione Rapida

1. Apri un progetto che utilizza **react-intlayer**.
2. Individua una chiamata a `useIntlayer()`, come:

   ```tsx
   const content = useIntlayer("app");
   ```

3. **Command-click** (`⌘+Click` su macOS) o **Ctrl+Click** (su Windows/Linux) sulla chiave (ad esempio, `"app"`).
4. VS Code aprirà automaticamente il file del dizionario corrispondente, ad esempio `src/app.content.ts`.

### Gestione dei Dizionari di Contenuto

### Scheda Intlayer (Barra delle Attività)

Usa la scheda laterale per navigare e gestire i dizionari:

- Apri l'icona Intlayer nella Barra delle Attività.
- In **Ricerca**, digita per filtrare dizionari e voci in tempo reale.
- In **Dizionari**, esplora ambienti, dizionari e file. Usa la barra degli strumenti per Costruire, Scaricare, Caricare, Riempire, Aggiornare, Testare e Creare File Dizionario. Clic destro per azioni contestuali (Scarica/Carica sui dizionari, Riempi sui file). Il file attualmente aperto nell’editor si rivela automaticamente nell’albero quando applicabile.

#### Costruire Dizionari

Genera tutti i file di contenuto dei dizionari con:

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

Cerca **Costruisci Dizionari** ed esegui il comando.

#### Caricare Dizionari

Carica l’ultimo contenuto dei dizionari:

1. Apri la **Palette dei Comandi**.
2. Cerca **Carica Dizionari**.
3. Seleziona i dizionari da caricare e conferma.

#### Scaricare Dizionari

Sincronizza l’ultimo contenuto del dizionario:

1. Apri la **Palette dei Comandi**.
2. Cerca **Scarica Dizionari**.
3. Scegli i dizionari da scaricare.

#### Riempire Dizionari

Riempi i dizionari con contenuti dal tuo progetto:

1. Apri la **Palette dei Comandi**.
2. Cerca **Riempi Dizionari**.
3. Esegui il comando per popolare i dizionari.

#### Testare Dizionari

Valida i dizionari e trova le traduzioni mancanti:

1. Apri la **Palette dei Comandi**.
2. Cerca **Testa Dizionari**.
3. Rivedi i problemi segnalati e correggili se necessario.

## Cronologia Documentazione

| Versione | Data       | Modifiche         |
| -------- | ---------- | ----------------- |
| 5.5.10   | 2025-06-29 | Inizio cronologia |

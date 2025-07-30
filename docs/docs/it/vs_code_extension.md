---
createdAt: 2025-03-17
updatedAt: 2025-06-29
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

**Supporto Vai alla Definizione** – Usa `Cmd+Click` (Mac) o `Ctrl+Click` (Windows/Linux) su una chiave `useIntlayer` per aprire istantaneamente il file di contenuto corrispondente.  
**Integrazione Perfetta** – Funziona senza sforzo con progetti **react-intlayer** e **next-intlayer**.  
**Supporto Multilingue** – Supporta contenuti localizzati in diverse lingue.  
**Integrazione con VS Code** – Si integra perfettamente con la navigazione e la palette dei comandi di VS Code.

### Comandi per la Gestione dei Dizionari

Gestisci i tuoi dizionari di contenuti direttamente da VS Code:

- **Costruisci Dizionari** (`extension.buildDictionaries`) – Genera i file di contenuto basati sulla struttura del tuo progetto.
- **Carica Dizionari** (`extension.pushDictionaries`) – Carica l'ultimo contenuto del dizionario nel tuo repository.
- **Scarica Dizionari** (`extension.pullDictionaries`) – Sincronizza l'ultimo contenuto del dizionario dal tuo repository al tuo ambiente locale.

### Generatore di Dichiarazioni di Contenuto

Genera facilmente file di dizionari strutturati in diversi formati:

- **TypeScript (`.ts`)** – `extension.createDictionaryFile.ts`
- **ES Module (`.esm`)** – `extension.createDictionaryFile.esm`
- **CommonJS (`.cjs`)** – `extension.createDictionaryFile.cjs`
- **JSON (`.json`)** – `extension.createDictionaryFile.json`

## Installazione

Puoi installare **Intlayer** direttamente dal Marketplace di VS Code:

1. Apri **VS Code**.
2. Vai al **Marketplace delle Estensioni**.
3. Cerca **"Intlayer"**.
4. Clicca su **Installa**.

In alternativa, installalo tramite la riga di comando:

```sh
code --install-extension intlayer
```

## Utilizzo

### Navigazione Rapida

1. Apri un progetto che utilizza **react-intlayer**.
2. Individua una chiamata a `useIntlayer()`, come:

   ```tsx
   const content = useIntlayer("app");
   ```

3. **Command-click** (`⌘+Click` su macOS) o **Ctrl+Click** (su Windows/Linux) sulla chiave (es. `"app"`).
4. VS Code aprirà automaticamente il file dizionario corrispondente, ad esempio `src/app.content.ts`.

### Gestione dei Dizionari di Contenuto

#### Costruire i Dizionari

Genera tutti i file di contenuto dei dizionari con:

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

Cerca **Build Dictionaries** ed esegui il comando.

#### Caricare i Dizionari

Carica l'ultimo contenuto dei dizionari:

1. Apri la **Command Palette**.
2. Cerca **Push Dictionaries**.
3. Seleziona i dizionari da caricare e conferma.

#### Scaricare i Dizionari

Sincronizza l'ultimo contenuto dei dizionari:

1. Apri la **Command Palette**.
2. Cerca **Pull Dictionaries**.
3. Scegli i dizionari da scaricare.

## Sviluppo e Contributi

Vuoi contribuire? Accogliamo con piacere i contributi della community!

URL del repository: https://github.com/aymericzip/intlayer-vs-code-extension

### Iniziare

Clona il repository e installa le dipendenze:

```sh
git clone https://github.com/aymericzip/intlayer-vs-code-extension.git
cd intlayer-vs-code-extension
npm install
```

> Usa il package manager `npm` per la compatibilità con il pacchetto `vsce` per costruire e pubblicare l'estensione.

### Eseguire in Modalità Sviluppo

1. Apri il progetto in **VS Code**.
2. Premi `F5` per avviare una nuova finestra **Extension Development Host**.

### Inviare una Pull Request

Se migliori l'estensione, invia una PR su [GitHub](https://github.com/aymericzip/intlayer-vs-code-extension).

## Feedback e Problemi

Hai trovato un bug o hai una richiesta di funzionalità? Apri un issue nel nostro **repository GitHub**:

[GitHub Issues](https://github.com/aymericzip/intlayer-vs-code-extension/issues)

## Licenza

Intlayer è rilasciato sotto la **Licenza MIT**.

## Cronologia della Documentazione

- 5.5.10 - 2025-06-29: Storia iniziale

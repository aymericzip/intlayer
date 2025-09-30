---
createdAt: 2025-03-17
updatedAt: 2025-09-30
title: Estensione Ufficiale per VS Code
description: Scopri come utilizzare l'estensione Intlayer in VS Code per migliorare il tuo flusso di lavoro di sviluppo. Naviga rapidamente tra i contenuti localizzati e gestisci i tuoi dizionari in modo efficiente.
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

![Riempi dizionari](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_fill_active_dictionary.gif?raw=true)

- **Navigazione Istantanea** – Passa rapidamente al file di contenuto corretto cliccando su una chiave `useIntlayer`.
- **Riempi Dizionari** – Riempi i dizionari con i contenuti del tuo progetto.

![Elenca comandi](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_list_commands.gif?raw=true)

- **Accesso facile ai comandi Intlayer** – Costruisci, invia, scarica, riempi, testa i dizionari di contenuti con facilità.

![Crea file di contenuto](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_create_content_file.gif?raw=true)

- **Generatore di dichiarazioni di contenuto** – Crea file di contenuto del dizionario in vari formati (`.ts`, `.esm`, `.cjs`, `.json`).

![Test dizionari](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_test_missing_dictionary.gif?raw=true)

- **Test dizionari** – Testa i dizionari per traduzioni mancanti.

![Ricostruisci dizionario](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_rebuild_dictionary.gif?raw=true)

- **Mantieni i tuoi dizionari aggiornati** – Mantieni i tuoi dizionari aggiornati con i contenuti più recenti del tuo progetto.

![Scheda Intlayer (Barra attività)](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_search_dictionary.gif?raw=true)

- **Scheda Intlayer (Barra attività)** – Naviga e cerca nei dizionari da una scheda laterale dedicata con barra degli strumenti e azioni contestuali (Costruisci, Scarica, Invia, Riempi, Aggiorna, Testa, Crea file).

## Uso

### Navigazione rapida

1. Apri un progetto che utilizza **react-intlayer**.
2. Individua una chiamata a `useIntlayer()`, come:

   ```tsx
   const content = useIntlayer("app");
   ```

3. **Command-click** (`⌘+Click` su macOS) o **Ctrl+Click** (su Windows/Linux) sulla chiave (ad esempio, `"app"`).
4. VS Code aprirà automaticamente il file dizionario corrispondente, ad esempio, `src/app.content.ts`.

### Scheda Intlayer (Barra attività)

Usa la scheda laterale per navigare e gestire i dizionari:

- Apri l'icona Intlayer nella Barra attività.
- In **Cerca**, digita per filtrare dizionari e voci in tempo reale.
- In **Dizionari**, esplora ambienti, dizionari e file. Usa la barra degli strumenti per Costruisci, Scarica, Invia, Riempi, Aggiorna, Testa e Crea file dizionario. Clic destro per azioni contestuali (Scarica/Invia sui dizionari, Riempi sui file). Il file attualmente aperto nell'editor si evidenzia automaticamente nell'albero quando applicabile.

### Accesso ai comandi

Puoi accedere ai comandi dalla **Command Palette**.

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

- **Costruisci Dizionari**
- **Invia Dizionari**
- **Scarica Dizionari**
- **Riempi Dizionari**
- **Testa Dizionari**
- **Crea File Dizionario**

### Caricamento delle Variabili d'Ambiente

Intlayer consiglia di memorizzare le chiavi API AI, così come l'ID client e il segreto di Intlayer, nelle variabili d'ambiente.

L'estensione può caricare le variabili d'ambiente dal tuo workspace per eseguire i comandi Intlayer con il contesto corretto.

- **Ordine di caricamento (per priorità)**: `.env.<env>.local` → `.env.<env>` → `.env.local` → `.env`
- **Non distruttivo**: i valori esistenti in `process.env` non vengono sovrascritti.
- **Ambito**: i file vengono risolti dalla directory base configurata (predefinita alla radice del workspace).

#### Selezione dell'ambiente attivo

- **Palette dei Comandi**: apri la palette ed esegui `Intlayer: Select Environment`, quindi scegli l'ambiente (ad esempio, `development`, `staging`, `production`). L'estensione tenterà di caricare il primo file disponibile nella lista di priorità sopra indicata e mostrerà una notifica come “Caricato env da .env.<env>.local”.
- **Impostazioni**: vai su `Impostazioni → Estensioni → Intlayer`, e imposta:
  - **Ambiente**: il nome dell'ambiente usato per risolvere i file `.env.<env>*`.
  - (Opzionale) **File Env**: un percorso esplicito a un file `.env`. Quando fornito, ha la precedenza sulla lista dedotta.

#### Monorepo e directory personalizzate

Se i tuoi file `.env` si trovano al di fuori della radice dello spazio di lavoro, imposta la **Directory Base** in `Impostazioni → Estensioni → Intlayer`. Il loader cercherà i file `.env` relativi a quella directory.

## Cronologia Documentazione

| Versione | Data       | Modifiche                           |
| -------- | ---------- | ----------------------------------- |
| 6.1.5    | 2025-09-30 | Aggiunta gif demo                   |
| 6.1.0    | 2025-09-24 | Aggiunta sezione selezione ambiente |
| 6.0.0    | 2025-09-22 | Comandi Intlayer Tab / Fill & Test  |
| 5.5.10   | 2025-06-29 | Inizializzazione cronologia         |

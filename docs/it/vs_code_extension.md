# Estensione ufficiale di VS Code

## Panoramica

**Intlayer** è l'estensione ufficiale di Visual Studio Code per **Intlayer**, progettata per migliorare l'esperienza dello sviluppatore quando lavora con contenuti localizzati in progetti **React, Next.js e JavaScript**.

Con questa estensione, gli sviluppatori possono **navigare rapidamente** nei loro dizionari di contenuti, gestire i file di localizzazione e ottimizzare il loro flusso di lavoro con potenti comandi di automazione.

## Funzionalità

### Navigazione Istantanea

**Supporto Vai alla Definizione** – Usa `Cmd+Click` (Mac) o `Ctrl+Click` (Windows/Linux) su una chiave `useIntlayer` per aprire immediatamente il file di contenuto corrispondente.  
**Integrazione Perfetta** – Funziona senza problemi con progetti **react-intlayer** e **next-intlayer**.  
**Supporto Multilingue** – Supporta contenuti localizzati in diverse lingue.  
**Integrazione con VS Code** – Si integra perfettamente con la navigazione e il pannello comandi di VS Code.

### Comandi di Gestione dei Dizionari

Gestisci i tuoi dizionari di contenuti direttamente da VS Code:

- **Crea Dizionari** (`extension.buildDictionaries`) – Genera file di contenuti basati sulla struttura del tuo progetto.
- **Carica Dizionari** (`extension.pushDictionaries`) – Carica i contenuti più recenti dei dizionari nel tuo repository.
- **Scarica Dizionari** (`extension.pullDictionaries`) – Sincronizza i contenuti più recenti dei dizionari dal tuo repository al tuo ambiente locale.

### Generatore di Dichiarazioni di Contenuto

Genera facilmente file di dizionari strutturati in diversi formati:

- **TypeScript (`.ts`)** – `extension.createDictionaryFile.ts`
- **Modulo ES (`.esm`)** – `extension.createDictionaryFile.esm`
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

3. **Cmd+Click** (`⌘+Click` su macOS) o **Ctrl+Click** (su Windows/Linux) sulla chiave (ad esempio, `"app"`).
4. VS Code aprirà automaticamente il file di dizionario corrispondente, ad esempio `src/app.content.ts`.

### Gestione dei Dizionari di Contenuti

#### Creazione dei Dizionari

Genera tutti i file di contenuti dei dizionari con:

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

Cerca **Crea Dizionari** ed esegui il comando.

#### Caricamento dei Dizionari

Carica i contenuti più recenti dei dizionari:

1. Apri il **Pannello Comandi**.
2. Cerca **Carica Dizionari**.
3. Seleziona i dizionari da caricare e conferma.

#### Scaricamento dei Dizionari

Sincronizza i contenuti più recenti dei dizionari:

1. Apri il **Pannello Comandi**.
2. Cerca **Scarica Dizionari**.
3. Scegli i dizionari da scaricare.

### Personalizzazione dei Percorsi dei File dei Dizionari

Per impostazione predefinita, l'estensione segue la struttura standard del progetto **Intlayer**. Tuttavia, puoi configurare percorsi personalizzati:

1. Apri **Impostazioni (`Cmd + ,` su macOS / `Ctrl + ,` su Windows/Linux)`**.
2. Cerca `Intlayer`.
3. Regola l'impostazione del percorso dei file di contenuto.

## Sviluppo e Contributi

Vuoi contribuire? Accogliamo con piacere i contributi della comunità!

URL del Repository: https://github.com/aymericzip/intlayer-vs-code-extension

### Per Iniziare

Clona il repository e installa le dipendenze:

```sh
git clone https://github.com/aymericzip/intlayer-vs-code-extension.git
cd intlayer-vs-code-extension
npm install
```

> Usa il gestore di pacchetti `npm` per la compatibilità con il pacchetto `vsce` per costruire e pubblicare l'estensione.

### Esegui in Modalità Sviluppo

1. Apri il progetto in **VS Code**.
2. Premi `F5` per avviare una nuova finestra di **Extension Development Host**.

### Invia una Pull Request

Se migliori l'estensione, invia una PR su [GitHub](https://github.com/aymericzip/intlayer-vs-code-extension).

## Feedback e Problemi

Hai trovato un bug o hai una richiesta di funzionalità? Apri un problema sul nostro **repository GitHub**:

[Problemi su GitHub](https://github.com/aymericzip/intlayer-vs-code-extension/issues)

## Licenza

Intlayer è rilasciato sotto la **Licenza MIT**.

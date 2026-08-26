---
createdAt: 2025-12-16
updatedAt: 2025-12-16
title: CLI - Login
description: Scopri come utilizzare il comando login della CLI di Intlayer per autenticarti con il CMS di Intlayer e ottenere le credenziali di accesso.
keywords:
  - CLI
  - Login
  - Autenticazione
  - CMS
  - Intlayer
  - Credenziali
slugs:
  - doc
  - concept
  - cli
  - login
author: aymericzip
---

# Comando Login CLI di Intlayer

---

## Descrizione

Il comando `login` della CLI di Intlayer ti consente di autenticarti con il CMS di Intlayer. Questo comando apre automaticamente il tuo browser predefinito per completare il processo di autenticazione e ricevere le credenziali necessarie (Client ID e Client Secret) per utilizzare i servizi di Intlayer.

## Utilizzo

```bash packageManager="npm"
npx intlayer login [opzioni]
```

```bash packageManager="yarn"
yarn intlayer login [opzioni]
```

```bash packageManager="pnpm"
pnpm intlayer login [opzioni]
```

```bash packageManager="bun"
bun x intlayer login [opzioni]
```

o

```bash
intlayer login [opzioni]
```

## Opzioni

### `--cms-url <url>`

Specifica l'URL del CMS di Intlayer a cui connettersi per l'autenticazione.

- **Tipo**: `string`
- **Default**: Il valore configurato in `intlayer.config.*` o `https://intlayer.org`
- **Esempio**:

```bash packageManager="npm"
npx intlayer login --cms-url https://intlayer.org
```

```bash packageManager="yarn"
yarn intlayer login --cms-url https://intlayer.org
```

```bash packageManager="pnpm"
pnpm intlayer login --cms-url https://intlayer.org
```

```bash packageManager="bun"
bun x intlayer login --cms-url https://intlayer.org
```

### Opzioni di Configurazione

Puoi anche utilizzare le opzioni di configurazione comuni:

- `--env-file <path>`: Percorso del file di environment
- `-e, --env <env>`: Environment di esecuzione
- `--base-dir <dir>`: Directory base del progetto
- `--verbose`: Abilita l'output dettagliato (default: true)
- `--prefix <prefix>`: Prefisso per i log

## Come Funziona

1. **Avvio del Server Locale**: Il comando avvia un server HTTP locale su una porta casuale per ricevere le credenziali dal CMS
2. **Apertura del Browser**: Il comando apre automaticamente il tuo browser predefinito all'URL di login del CMS
3. **Autenticazione**: Completa l'autenticazione nel browser utilizzando il tuo account Intlayer
4. **Ricezione Credenziali**: Il server locale riceve il Client ID e il Client Secret dal CMS
5. **Istruzioni**: Il comando mostra le istruzioni per configurare le credenziali nel tuo progetto

## Output

Dopo un login riuscito, il comando mostrerà:

1. **Le credenziali ricevute** (Client ID e Client Secret)
2. **Istruzioni per il file `.env`**:

```bash
INTLAYER_CLIENT_ID=your_client_id
INTLAYER_CLIENT_SECRET=your_client_secret
```

3. **Istruzioni per il file di configurazione Intlayer**:

```typescript
{
  editor: {
    cmsURL: 'https://intlayer.org',
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
}
```

## Mantenere la chiave di accesso al sicuro

`intlayer login` rilascia una **chiave di accesso**: una coppia `clientId` / `clientSecret` che ogni comando autenticato (`push`, `pull`, `fill`, `configuration push`, `live`, …) utilizza per autenticarsi.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

> **`clientSecret` è una credenziale lato server.** Concede accesso API completo nell'ambito del progetto — lettura e scrittura dei tuoi dizionari, del tuo progetto e della tua organizzazione. Conservala in `.env` (ignorato da git) o nel tuo archivio di secret CI, e non inserirla mai inline nel file di configurazione.

Intlayer lo applica piuttosto che solo documentarlo:

- `clientSecret` è **rimossa dalla configurazione che il tuo bundler incorpora**, quindi non può raggiungere un bundle del browser indipendentemente dall'integrazione del framework che utilizzi. Viene letta solo lato server, a runtime, dall'ambiente.
- `clientId` è diverso: è la **chiave pubblica** del progetto, sicura da distribuire, ed è utilizzato da [`@intlayer/analytics`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/analytics.md#how-events-are-authenticated) per ottenere un token di breve durata, solo per l'inserimento.

Commentare `clientId` è sufficiente per disabilitare ogni comportamento autenticato — recupero di dizionari remoti, accesso CMS, analytics — anche quando le variabili di ambiente sono ancora definite.

Per le pipeline CI, preferisci il comando [`ci`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/ci.md), che inietta le credenziali per la durata di una singola esecuzione invece di farle persistere.

## Configurazione Manuale

Se il browser non si apre automaticamente, puoi visitare manualmente l'URL mostrato nel terminale.

## Esempi

### Login con URL CMS Personalizzato

```bash packageManager="npm"
npx intlayer login --cms-url https://custom-cms.example.com
```

```bash packageManager="yarn"
yarn intlayer login --cms-url https://custom-cms.example.com
```

```bash packageManager="pnpm"
pnpm intlayer login --cms-url https://custom-cms.example.com
```

```bash packageManager="bun"
bun x intlayer login --cms-url https://custom-cms.example.com
```

### Login con File Environment Specifico

```bash packageManager="npm"
npx intlayer login --env-file .env.production
```

```bash packageManager="yarn"
yarn intlayer login --env-file .env.production
```

```bash packageManager="pnpm"
pnpm intlayer login --env-file .env.production
```

```bash packageManager="bun"
bun x intlayer login --env-file .env.production
```

### Login in Modalità Verbose

```bash packageManager="npm"
npx intlayer login --verbose
```

```bash packageManager="yarn"
yarn intlayer login --verbose
```

```bash packageManager="pnpm"
pnpm intlayer login --verbose
```

```bash packageManager="bun"
bun x intlayer login --verbose
```

## Risoluzione dei Problemi

### Il Browser Non Si Apre

Se il browser non si apre automaticamente, copia l'URL mostrato nel terminale e aprilo manualmente nel tuo browser.

### Problemi di Connessione

Se riscontri problemi di connessione, verifica:

1. Che l'URL del CMS sia corretto
2. Che la tua connessione internet funzioni correttamente
3. Che non ci siano firewall che bloccano la connessione

### Credenziali Non Ricevute

Se le credenziali non vengono ricevute:

1. Assicurati di aver completato il processo di autenticazione nel browser
2. Verifica che la porta locale non sia bloccata
3. Riprova il comando

## Prossimi Passi

Dopo aver completato il login:

1. Aggiungi le credenziali al tuo file `.env`
2. Configura il tuo file `intlayer.config.*` con le credenziali
3. Utilizza i comandi CLI per gestire i tuoi dizionari:
   - [`npx intlayer push`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/push.md) - Invia i dizionari al CMS
   - [`npx intlayer pull`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/pull.md) - Scarica i dizionari dal CMS
   - [`npx intlayer fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/fill.md) - Compila le traduzioni mancanti

## Vedi Anche

- [Documentazione CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md)
- [Configurazione Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)
- [CMS di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)

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
---

# Comando Login CLI di Intlayer

---

## Descrizione

Il comando `login` della CLI di Intlayer ti consente di autenticarti con il CMS di Intlayer. Questo comando apre automaticamente il tuo browser predefinito per completare il processo di autenticazione e ricevere le credenziali necessarie (Client ID e Client Secret) per utilizzare i servizi di Intlayer.

## Utilizzo

```bash
npx intlayer login [opzioni]
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

```bash
npx intlayer login --cms-url https://intlayer.org
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

## Configurazione Manuale

Se il browser non si apre automaticamente, puoi visitare manualmente l'URL mostrato nel terminale.

## Esempi

### Login con URL CMS Personalizzato

```bash
npx intlayer login --cms-url https://custom-cms.example.com
```

### Login con File Environment Specifico

```bash
npx intlayer login --env-file .env.production
```

### Login in Modalità Verbose

```bash
npx intlayer login --verbose
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

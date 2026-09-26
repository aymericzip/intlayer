---
createdAt: 2026-09-13
updatedAt: 2026-09-13
priority: 4
title: Come limitare il consumo di token di Claude Code per generare traduzioni
description: Perché tradurre con Claude Code spreca token, cosa fa invece Intlayer (filtra le chiavi già tradotte, suddivide il JSON in blocchi, traduce il markdown blocco per blocco) e come riutilizzare il tuo abbonamento Claude con claude setup-token.
keywords:
  - claude code
  - token
  - consumo di token
  - setup-token
  - i18n
  - internazionalizzazione
  - traduzione
  - fill
  - mcp
  - agent
slugs:
  - frequent-questions
  - claude-code-token-consumption
author: aymericzip
---

# Come limitare il consumo di token di Claude Code per generare traduzioni

## Descrizione del problema

Chiedere a Claude Code (o a qualsiasi agente di sviluppo) di tradurre i tuoi contenuti è il modo più costoso in assoluto. A ogni esecuzione, l'agente deve:

- Caricare l'intero file JSON o di contenuto nel suo contesto, comprese le chiavi già tradotte.
- Cercare nei file correlati per capire dove si trova il contenuto e come è strutturato.
- Individuare quali locale mancano e devono essere generate.
- Rileggere ogni volta le tue istruzioni personalizzate ("trasforma gli URL in questo modo", "mantieni il nome del brand in inglese", "usa una forma informale").
- Riscrivere l'intero file, incluse le parti rimaste invariate.

Tutto questo viene reinviato a ogni iterazione, quindi il costo cresce in base a `dimensione del contenuto × numero di locale × numero di iterazioni`, e ogni minima divergenza di formattazione o di chiavi deve essere controllata manualmente.

## Cosa fa invece Intlayer

Il vantaggio di Intlayer è svolgere questo lavoro al di fuori dell'agente, grazie a una pipeline progettata specificamente per la traduzione:

- **Filtra le traduzioni esistenti** per limitare l'uso dei token. Le chiavi già tradotte nel tuo JSON vengono escluse, inviando al modello solo quelle mancanti.
- **Traduce il markdown blocco per blocco.** Per la documentazione, [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/doc-translate.md) e [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/doc-review.md) confrontano ogni blocco con il documento base e saltano i blocchi già tradotti o invariati.
- **Suddivide il tuo JSON in chunk** se è troppo grande, per operare nella parte migliore della finestra di contesto.
- **Appiattisce e ricostruisce il tuo JSON** per ottimizzare il consumo di token.
- **Inserisce prompt personalizzati** per regole specifiche sul tuo brand e stile (`applicationContext`, `--custom-instructions`), così da scriverli una sola volta invece di ripeterli in ogni conversazione.
- **Valida la struttura** per assicurare coerenza, prevenire la deviazione delle chiavi e preservare la formattazione (markdown, HTML, inserimenti, plurali).
- **Implementa la gestione dei tentativi (retry)** quando l'output è malformato.
- **Accoda e parallelizza le richieste** tra file, blocchi e locale per massimizzare la velocità.

Niente di tutto questo passa attraverso il contesto dell'agente. La regola d'oro: lascia che l'agente decida **cosa** internazionalizzare, e lascia a Intlayer il lavoro ripetitivo.

## Soluzione

### 1. Delegare l'estrazione a `intlayer extract`

Invece di chiedere all'agente di riscrivere ogni componente a mano, fagli eseguire il comando [`extract`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/extract.md). Questo sposta le stringhe hardcoded in un file `.content` accanto al componente senza caricare l'intero file nel contesto dell'agente.

```bash
npx intlayer extract --file src/components/Header.tsx
```

### 2. Delegare la traduzione a `intlayer fill`

Non chiedere mai all'agente di tradurre direttamente. Il comando [`fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/fill.md) applica la pipeline sopra descritta: invia solo le chiavi mancanti, le suddivide, elabora le locale in parallelo e riscrive il risultato direttamente nei file di contenuto.

```bash
npx intlayer fill
```

Alcuni flag consentono di contenere l'elaborazione:

- `--git-diff` (o `--uncommitted`) elabora solo i dizionari modificati nel branch corrente.
- `--file` o `--keys` punta a file di contenuto specifici.
- `--output-locales fr es` limita l'esecuzione alle sole locale necessarie al momento.
- `--skip-metadata` ignora la generazione di titolo, descrizione e tag.
- `--data-serialization toon` invia un payload più compatto al modello (meno token, output leggermente meno prevedibile).

```bash
npx intlayer fill --git-diff --output-locales fr es --skip-metadata
```

### 3. Tradurre il markdown con `doc translate` e `doc review`

Chiedere a un agente di tradurre un file `.md` comporta l'inclusione dell'intero documento, per ogni locale, a ogni modifica. I comandi [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/doc-translate.md) e [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/doc-review.md) lavorano invece blocco per blocco.

Usa `doc translate` quando il file tradotto non esiste ancora. Suddivide il markdown, lo traduce in parallelo e crea i file di destinazione:

```bash
npx intlayer doc translate --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

Usa `doc review` quando il file tradotto esiste già. Confronta ogni blocco con il documento base, salta i blocchi già tradotti o invariati e invia solo quelli divergenti:

```bash
npx intlayer doc review --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

Entrambi i comandi accettano le tue regole una volta sola, senza doverle ripetere in ogni prompt:

```bash
npx intlayer doc translate --custom-instructions "Do not translate URLs. Keep the markdown structure and the code blocks untouched."
```

Due modalità di `doc review` sono utili quando l'agente deve rimanere coinvolto nel flusso, senza alcuna chiamata AI da parte di Intlayer:

- `--mode report` segnala i blocchi che richiedono attenzione, completi di numero di riga, in modo che l'agente modifichi solo quei blocchi.
- `--mode synthesis` riporta unicamente quali documenti sono aggiornati e quali presentano ancora blocchi da modificare.

```bash
npx intlayer doc review --mode report --locales fr
```

### 4. Far chiamare la CLI all'agente tramite il server MCP

Grazie al [server MCP di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md), l'agente risponde basandosi sulla documentazione aggiornata ed esegue autonomamente `intlayer fill` o `intlayer doc review`, invece di dover reimplementare la logica nella conversazione.

```bash
claude mcp add intlayer npx -y @intlayer/mcp
```

Installare le [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md) con `npx intlayer init skills` evita inoltre che l'agente debba indovinare l'API di Intlayer e rileggere la documentazione a ogni task.

### 5. Riutilizzare l'abbonamento Claude con `claude setup-token`

Eseguire la configurazione di i18n nella sessione interattiva di Claude Code mantiene l'intera cronologia della conversazione nel contesto. Sposta invece questo carico di lavoro su una breve sessione headless.

Genera un token a lunga durata dal tuo abbonamento Claude:

```bash
claude setup-token
```

Salvalo come `CLAUDE_CODE_OAUTH_TOKEN` (in un file `.env` o nei secret della tua CI), quindi riutilizzalo per una sessione mirata che esegua i comandi Intlayer:

```bash
CLAUDE_CODE_OAUTH_TOKEN=... claude -p "Run npx intlayer extract on src/components, then npx intlayer fill --uncommitted"
```

La sessione conterrà solo quel prompt e l'output del comando, evitando tutta la cronologia precedente. Lo stesso token funziona nella [Claude Code GitHub Action](https://github.com/anthropics/claude-code-action) per eseguire `intlayer fill` su ogni pull request.

> Il token generato da `claude setup-token` autentica unicamente Claude Code. Non può essere usato come chiave API Anthropic in `ai.apiKey`. Per la traduzione vera e propria, `intlayer fill` usa il tuo [account Intlayer](https://app.intlayer.org) (piano gratuito incluso) o la tua chiave fornitore configurata in [`ai`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md#ai-configuration).

## Riepilogo

| Attività                     | Chi la esegue                    | Token nel contesto dell'agente |
| ---------------------------- | -------------------------------- | ------------------------------ |
| Decidere cosa localizzare    | Claude Code                      | Basso                          |
| Estrarre le stringhe         | `intlayer extract`               | Nessuno                        |
| Tradurre i contenuti         | `intlayer fill`                  | Nessuno                        |
| Tradurre la documentazione   | `intlayer doc translate`         | Nessuno                        |
| Aggiornare la documentazione | `intlayer doc review`            | Nessuno                        |
| Eseguire i comandi           | Claude Code in modalità headless | Prompt + output del comando    |

---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Comando Intlayer non definito
description: Scopri come risolvere l'errore comando intlayer non definito.
keywords:
  - intlayer
  - comando
  - non definito
  - errore
  - vscode
  - estensione
  - plugin
  - framework
  - next.js
  - vite
slugs:
  - frequent-questions
  - intlayer-command-undefined
---

# Comando Intlayer non definito

## Panoramica

La CLI di Intlayer offre un modo comodo per gestire i contenuti di intlayer, inclusa la creazione di dizionari, l'invio delle traduzioni e altro ancora. Tuttavia, non è essenziale per il funzionamento del tuo progetto. Se stai utilizzando il plugin bundler (come `withIntlayer()` per Next.js o `intlayer()` per Vite), Intlayer costruirà automaticamente i dizionari durante la compilazione dell'app o l'avvio del server di sviluppo. In modalità sviluppo, monitorerà anche le modifiche e ricostruirà automaticamente i file di dichiarazione dei contenuti.

Puoi accedere ai comandi di intlayer in diversi modi:

- Usando direttamente il comando CLI `intlayer`
- Usando l'[estensione VSCode](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/vs_code_extension.md)
- Usando l'SDK `@intlayer/cli`

## Problema

Quando si tenta di utilizzare il comando `intlayer`, potresti incontrare questo errore:

```bash
'intlayer' non è riconosciuto come comando interno o esterno,
programma eseguibile o file batch.
```

## Soluzioni

Prova queste soluzioni in ordine:

1. **Verifica che il comando sia installato**

```bash
npx intlayer -h
```

Output previsto:

```bash
Usage: intlayer [options] [command]

Intlayer CLI

Options:
    -V, --version            output the version number
    -h, --help               display help for command

Commands:
    dictionary|dictionaries  Dictionaries operations
    configuration|config     Configuration operations
    help [command]           display help for command
```

2. **Installa globalmente il pacchetto intlayer-cli**

```bash
npm install intlayer-cli -g -g
```

> Non dovrebbe essere necessario se hai già installato il pacchetto `intlayer`

3. **Installa il pacchetto globalmente**

```bash
npm install intlayer -g
```

4. **Riavvia il terminale**
   A volte è necessario riavviare il terminale per riconoscere i nuovi comandi.

5. **Pulisci e reinstalla**
   Se le soluzioni precedenti non funzionano:

```bash
rm -rf node_modules package-lock.json
npm install
```

6. **Verifica i file di installazione**
   Se il problema persiste, controlla che questi file esistano:
   - `node_modules/intlayer/dist/cjs/cli.cjs`
   - `node_modules/intlayer/package.json` (dovrebbe avere un campo `bin` che fa riferimento a `./dist/cjs/cli.cjs`)

7. **Controlla la variabile d'ambiente PATH**
   Assicurati che la directory bin globale di npm sia nel tuo PATH:

```bash
# Per sistemi Unix-based (macOS/Linux)
echo $PATH
# Dovrebbe includere qualcosa come /usr/local/bin o ~/.npm-global/bin

# Per Windows
echo %PATH%
# Dovrebbe includere la directory bin globale di npm
```

8. **Usa npx con il percorso completo**
   Se il comando non viene ancora trovato, prova a usare npx con il percorso completo:

```bash
npx ./node_modules/intlayer/ dictionaries build
```

9. **Controlla installazioni in conflitto**

```bash
# Elenca tutti i pacchetti installati globalmente
npm list -g --depth=0

# Rimuovi eventuali installazioni globali in conflitto
npm uninstall -g intlayer
npm uninstall -g intlayer-cli
# Poi reinstalla
npm install -g intlayer
```

10. **Verifica le versioni di Node.js e npm**
    Assicurati di usare versioni compatibili:

```bash
node --version
npm --version
```

    Se stai usando una versione obsoleta, considera di aggiornare Node.js e npm.

11. **Controlla problemi di permessi**
    Se ricevi errori di permessi:

    ```bash
    # Per sistemi basati su Unix
    sudo npm install -g intlayer

    # Oppure cambia la directory predefinita di npm
    mkdir ~/.npm-global
    npm config set prefix '~/.npm-global'
    # Aggiungi al tuo ~/.profile o ~/.bashrc:
    export PATH=~/.npm-global/bin:$PATH
    ```

---
createdAt: 2025-03-01
updatedAt: 2025-06-29
title: Roadmap
description: Scopri la roadmap di Intlayer. Visualizza tutte le funzionalità che Intlayer ha implementato e che prevede di implementare.
keywords:
  - Roadmap
  - Intlayer
  - Internazionalizzazione
  - CMS
  - Sistema di Gestione dei Contenuti
  - Editor Visivo
slugs:
  - doc
  - roadmap
history:
  - version: 5.5.10
    date: 2025-06-30
    changes: Aggiunto supporto per Preact e Nuxt, MCP Server, aggiornamento CLI
  - version: 5.5.10
    date: 2025-06-29
    changes: Inizializzazione della cronologia
---

# Intlayer: Panoramica delle Funzionalità & Roadmap

Intlayer è una soluzione per la gestione dei contenuti e l'internazionalizzazione progettata per semplificare il modo in cui dichiari, gestisci e aggiorni i contenuti nelle tue applicazioni. Offre funzionalità potenti come la dichiarazione dei contenuti centralizzata o distribuita, ampie opzioni di internazionalizzazione, supporto per Markdown, rendering condizionale, integrazione con TypeScript/JavaScript/JSON e altro ancora. Di seguito è riportata una panoramica completa di ciò che Intlayer offre attualmente, seguita dalle funzionalità previste nella roadmap.

---

## Funzionalità Attuali

### 1. Dichiarazione dei Contenuti

#### Centralizzata o Distribuita

- **Centralizzata**: Dichiara tutti i tuoi contenuti in un unico grande file alla base della tua applicazione, simile a i18next, in modo da poter gestire tutto in un unico posto.
- **Distribuita**: In alternativa, suddividi i tuoi contenuti in file separati a livello di componente o funzionalità per una migliore manutenibilità. Questo mantiene i tuoi contenuti vicini al codice pertinente (componenti, test, Storybook, ecc.). Rimuovendo un componente, si assicura che anche i contenuti associati vengano eliminati, evitando che dati residui ingombrino il tuo codice.

> Risorse:
>
> - [Dichiarazione dei Contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/get_started.md)

### 2. Internazionalizzazione

- Supporto per **230 lingue e località** (inclusi varianti regionali come francese (Francia), inglese (Canada), inglese (Regno Unito), portoghese (Portogallo), ecc.).
- Gestisci facilmente le traduzioni per tutte queste località da un unico posto.

> Risorse:
>
> - [Internazionalizzazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/translation.md)

### 3. Supporto Markdown

- Dichiara contenuti usando **Markdown**, permettendoti di formattare automaticamente il testo con paragrafi, titoli, link e altro.
- Ideale per post di blog, articoli, pagine di documentazione o qualsiasi scenario in cui sia necessaria una formattazione di testo ricca.

> Risorse:
>
> - [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/markdown.md)

### 4. Supporto file esterni

- Importa contenuti da file esterni in formato testo, come TXT, HTML, JSON, YAML o CSV.
- Usa la funzione `file` in Intlayer per incorporare il contenuto di file esterni in un dizionario, garantendo un'integrazione senza soluzione di continuità con l'Editor Visuale e il CMS di Intlayer.
- Supporta aggiornamenti dinamici dei contenuti, il che significa che quando il file sorgente viene modificato, il contenuto si aggiorna automaticamente all'interno di Intlayer.
- Consente la gestione multilingue dei contenuti collegando dinamicamente file Markdown specifici per lingua.

> Risorse:
>
> - [Incorporamento contenuti da file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/file.md)

### 5. Contenuto Dinamico e Recupero Funzioni

Intlayer offre vari metodi per inserire e gestire contenuti dinamici, garantendo flessibilità e adattabilità nella distribuzione dei contenuti. Questo include funzioni per l'inserimento dinamico di contenuti, il rendering condizionale, l'enumerazione, l'annidamento e il recupero di funzioni.

1. Inserimento di Contenuti Dinamici

   Usa la funzione insert per definire contenuti con segnaposto ({{name}}, {{age}}, ecc.).

   Consente contenuti simili a template che si adattano in base all'input dell'utente, alle risposte API o ad altre fonti di dati dinamici.

   Funziona perfettamente con configurazioni TypeScript, ESM, CommonJS e JSON.

   Si integra facilmente con React Intlayer e Next Intlayer utilizzando useIntlayer.

2. Rendering Condizionale

   Definisce contenuti che si adattano in base a condizioni specifiche dell'utente, come la lingua o lo stato di autenticazione.

   Personalizza esperienze senza duplicare contenuti su più file.

3. Enumerazione e Pluralizzazione

   Usa la funzione enu per definire variazioni di contenuto basate su valori numerici, intervalli o chiavi personalizzate.

   Garantisce la selezione automatica della frase corretta in base a un valore dato.

   Supporta regole di ordinamento, assicurando un comportamento prevedibile.

4. Annidamento e Riferimento a Sotto-Contenuti

   Usa la funzione nest per fare riferimento e riutilizzare contenuti da un altro dizionario, riducendo la duplicazione.

   Supporta una gestione dei contenuti strutturata e gerarchica per una migliore manutenibilità.

5. Recupero tramite Funzioni

   Intlayer consente di dichiarare i contenuti come funzioni, permettendo sia il recupero sincrono che asincrono dei contenuti.

   Funzioni Sincrone: I contenuti vengono generati dinamicamente in fase di build.

   Funzioni Asincrone: Recupera dati da fonti esterne (es. API, database) in modo dinamico.

   Integrazione: Funziona con TypeScript, ESM e CommonJS ma non è supportato nei file JSON o nei file di contenuti remoti.

### 6. Formati di Dichiarazione dei Contenuti

Intlayer supporta **TypeScript** (e anche JavaScript) e **JSON** per dichiarare i contenuti.

- **TypeScript**:
  - Garantisce che la struttura del contenuto sia corretta e che non manchino traduzioni.
  - Offre modalità di validazione rigorose o più flessibili.
  - Permette il recupero dinamico dei dati da variabili, funzioni o API esterne.

- **JSON**:
  - Facilita l'integrazione con strumenti esterni (come editor visuali) grazie al suo formato standardizzato.

  > Risorse:
  >
  > - [Formati di Dichiarazione del Contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md)

### 7. Pulizia, ottimizzazione del bundle e importazioni dinamiche

- Intlayer integra i plugin `Babel` e `SWC` per ottimizzare il tuo bundle e migliorare le prestazioni. Sostituisce gli import, permettendo di importare solo i dizionari effettivamente utilizzati nel bundle.
- Attivando l'opzione, Intlayer consente anche di importare dinamicamente il contenuto del dizionario solo per la locale corrente.

> Risorse:
>
> - [Configurazione della Build](https://intlayer.org/doc/concept/configuration#build-configuration)

---

## Integrazione con Framework e Ambienti

### 1. Next.js

#### a. Componenti Server e Client

- Fornisce un **approccio unificato alla gestione dei contenuti** sia per i componenti server che client.
- Offre un contesto integrato per i componenti server, semplificando l'implementazione rispetto ad altre soluzioni.

#### b. Metadata, Sitemap e robots.txt

- Recupera e inietta contenuti dinamicamente per generare metadata, sitemap o file `robots.txt`.

#### c. Middleware

- Aggiunge un middleware per **reindirizzare gli utenti** ai contenuti basati sulla loro lingua preferita.

#### d. Compatibilità Turbopack e Webpack

- Completamente compatibile con il nuovo Turbopack di Next.js così come con il tradizionale Webpack.

> Risorse:
>
> - [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_15.md)

### 2. Vite

- Simile a Next.js, puoi integrare Intlayer con Vite e utilizzare un **middleware** per reindirizzare gli utenti ai contenuti in base alla loro lingua preferita.

> Risorse:
>
> - [Vite](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+react.md)

### 3. Express

- Gestisci i contenuti e internazionalizza i servizi backend basati su Express.
- Personalizza email, messaggi di errore, notifiche push e altro ancora con testi localizzati.

> Risorse:
>
> - [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_express.md)

### 4. React Native

- Integra Intlayer con React Native per gestire i contenuti e internazionalizzare le tue applicazioni mobili.
- Supporta entrambe le piattaforme iOS e Android.

> Risorse:
>
> - [React Native](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_react_native.md)

### 5. Lynx

- Integra Intlayer con Lynx per gestire i contenuti e internazionalizzare le tue applicazioni mobili.
- Supporta entrambe le piattaforme iOS e Android.

> Risorse:
>
> - [Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_lynx.md)

### 6. Vue

- Integra Intlayer con Vue per gestire i contenuti e internazionalizzare le tue applicazioni Vite / Vue.js.

> Risorse:
>
> - [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vue.md)

### 7. Nuxt

- Integra Intlayer con Nuxt per gestire i contenuti e internazionalizzare le tue applicazioni Nuxt / Vue.js.
- Supporta sia componenti server che client.
- Integra il routing e il middleware per reindirizzare gli utenti ai contenuti in base alla loro lingua preferita.

> Risorse:
>
> - [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nuxt.md)

### 8. Preact

- Integra Intlayer con Preact per gestire i contenuti e internazionalizzare le tue applicazioni Preact.

> Risorse:
>
> - [Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_preact.md)

---

## Editor Visuali e CMS

### 1. Editor Visuale Locale

- Un **editor visuale locale gratuito** che ti permette di modificare il contenuto della tua applicazione selezionando direttamente gli elementi sulla pagina.
- Integra funzionalità di intelligenza artificiale per aiutarti a:
  - Generare o correggere traduzioni
  - Controllare sintassi e ortografia
  - Suggerire miglioramenti
- Può essere ospitato localmente o distribuito su un server remoto.

> Risorse:
>
> - [Editor Visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md)

### 2. Intlayer CMS (Remoto)

- Una soluzione **CMS ospitata** che ti consente di gestire il contenuto dell'applicazione online, senza modificare il codice.
- Fornisce funzionalità assistite da AI per dichiarare contenuti, gestire traduzioni e correggere errori di sintassi o ortografia.
- Interagisci con i tuoi contenuti tramite l'interfaccia della tua applicazione live.

> Risorse:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)

---

## Estensioni IDE

- Estensioni per i principali IDE che forniscono un'**interfaccia grafica** per gestire le traduzioni locali e remote.
- Le funzionalità potrebbero includere la generazione automatica di file di dichiarazione dei contenuti per i componenti, l'integrazione diretta con l'Intlayer CMS e la validazione in tempo reale.

---

## Server MCP

- Un **server MCP** che ti permette di gestire i tuoi contenuti e traduzioni utilizzando uno strumento integrato nel tuo IDE.

---

## Intlayer CLI

- **Traduzione e generazione file**: Esegui audit sui tuoi file di contenuto per generare traduzioni mancanti e rivedere le incoerenze.
- **Interazione remota**: Invia i tuoi contenuti locali al CMS remoto o scarica contenuti remoti per integrarli nella tua applicazione locale.
- **Traduzione e revisione della documentazione**: Traduci e rivedi la tua documentazione / file ecc.

> Risorse:
>
> - [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md)

---

## Ambienti

- Usa le **variabili d'ambiente** per configurare Intlayer in modo differente tra produzione, test e ambienti locali.
- Definisci quale editor visuale o progetto CMS remoto utilizzare a seconda del tuo ambiente.

---

## Aggiornamenti Contenuti a Caldo

- Quando usi dizionari remoti e il CMS Intlayer, puoi **aggiornare i contenuti della tua applicazione al volo**, senza bisogno di ridistribuire.

> Risorse:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)

---

## Funzionalità in Arrivo

### 1. Test A/B e Personalizzazione

- **Test multivariati**: Testa diverse versioni di un dato contenuto per vedere quale funziona meglio (ad esempio, con un tasso di clic più alto).
- **Personalizzazione basata sui dati**: Mostra contenuti diversi in base a dati demografici dell’utente (genere, età, posizione, ecc.) o altri modelli di comportamento.
- **Iterazione automatizzata**: Permetti all’IA di testare automaticamente più versioni e scegliere quella con le migliori prestazioni o raccomandare opzioni per l’approvazione dell’amministratore.

### 2. Versionamento

- Ripristina versioni precedenti dei tuoi contenuti con il **versionamento dei contenuti**.
- Monitora le modifiche nel tempo e torna a stati precedenti se necessario.

### 3. Traduzione automatica

- Per gli utenti del CMS remoto, **generazione della traduzione con un clic** per qualsiasi lingua supportata.
- Il sistema genererebbe traduzioni in background e poi ti chiederebbe di convalidarle o modificarle.

### 4. Miglioramenti SEO

- Strumenti per **analizzare le parole chiave**, l'intento di ricerca degli utenti e le tendenze emergenti.
- Suggerire contenuti migliorati per un posizionamento migliore e monitorare le prestazioni a lungo termine.

### 5. Compatibilità con più Framework

- Sono in corso sforzi per supportare **Solid, Svelte, Angular** e altri.
- L'obiettivo è rendere Intlayer compatibile con **qualsiasi applicazione basata su JavaScript**.

---

## Conclusione

Intlayer mira a essere una soluzione completa per la gestione dei contenuti e l'internazionalizzazione. Si concentra sulla flessibilità (file centralizzati o distribuiti), sul supporto a un'ampia gamma di lingue, sull'integrazione semplice con framework e bundler moderni, e su potenti funzionalità basate sull'intelligenza artificiale. Man mano che nuove capacità, come i test A/B, il versioning e le traduzioni automatizzate, diventeranno disponibili, Intlayer continuerà a semplificare i flussi di lavoro dei contenuti e a migliorare l'esperienza utente su diverse piattaforme.

Rimanete sintonizzati per i prossimi rilasci e sentitevi liberi di esplorare le funzionalità esistenti per vedere come Intlayer può aiutare a centralizzare e ottimizzare oggi i vostri processi di gestione dei contenuti!

---

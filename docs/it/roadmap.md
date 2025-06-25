---
docName: roadmap
url: /doc/roadmap
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/roadmap.md
createdAt: 2025-03-01
updatedAt: 2025-03-01
title: Tabella di marcia
description: Scopri la roadmap di Intlayer. Vedi tutte le funzionalità che l'Intlayer ha implementato, e sta pianificando di implementarle.
keywords:
  - Roadmap
  - Intlayer
  - Internazionalizzazione
  - CMS
  - Sistema di gestione dei contenuti
  - Editor visuale
---

# Intlayer: Panoramica delle Funzionalità e Roadmap

Intlayer è una soluzione per la gestione dei contenuti e l'internazionalizzazione progettata per semplificare la dichiarazione, la gestione e l'aggiornamento dei contenuti nelle tue applicazioni. Offre funzionalità potenti come dichiarazione centralizzata o distribuita dei contenuti, ampie opzioni di internazionalizzazione, supporto Markdown, rendering condizionale, integrazione con TypeScript/JavaScript/JSON e altro ancora. Di seguito è riportata una panoramica completa di ciò che Intlayer offre attualmente, seguita dalle funzionalità in arrivo nella roadmap.

---

## Funzionalità Attuali

### 1. Dichiarazione dei Contenuti

#### Centralizzata o Distribuita

- **Centralizzata**: Dichiarare tutti i tuoi contenuti in un unico file di grandi dimensioni alla base della tua applicazione, simile a i18next, in modo da poter gestire tutto in un unico posto.
- **Distribuita**: In alternativa, suddividi i tuoi contenuti in file separati a livello di componente o funzionalità per una migliore manutenibilità. Questo mantiene i tuoi contenuti vicini al codice pertinente (componenti, test, Storybook, ecc.). Rimuovere un componente garantisce che qualsiasi contenuto associato venga rimosso, evitando che dati residui ingombrino il tuo codice.

> Risorse:
>
> - [Dichiarazione dei Contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/get_started.md)

### 2. Internazionalizzazione

- Supporto per **230 lingue e localizzazioni** (inclusi varianti regionali come Francese (Francia), Inglese (Canada), Inglese (Regno Unito), Portoghese (Portogallo), ecc.).
- Gestisci facilmente le traduzioni per tutte queste localizzazioni da un unico posto.

> Risorse:
>
> - [Internazionalizzazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/translation.md)

### 3. Supporto Markdown

- Dichiarare contenuti utilizzando **Markdown**, consentendo di formattare automaticamente il testo con paragrafi, intestazioni, collegamenti e altro.
- Ideale per post di blog, articoli, pagine di documentazione o qualsiasi scenario in cui è necessaria una formattazione di testo ricca.

> Risorse:
>
> - [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/markdown.md)

### 4. Rendering Condizionale

- Definire contenuti che si adattano in base a condizioni specifiche, come la lingua dell'utente, lo stato di accesso dell'utente o qualsiasi altra variabile contestuale.
- Aiuta a creare esperienze personalizzate senza duplicare contenuti in più file.

> Risorse:
>
> - [Rendering Condizionale](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/condition.md)

### 5. Formati di Dichiarazione dei Contenuti

Intlayer supporta **TypeScript** (anche JavaScript) e **JSON** per dichiarare i contenuti.

- **TypeScript**:

  - Garantisce che la struttura dei tuoi contenuti sia corretta e che non manchino traduzioni.
  - Offre modalità di validazione rigorose o più flessibili.
  - Consente il recupero dinamico dei dati da variabili, funzioni o API esterne.

- **JSON**:

  - Facilita l'integrazione con strumenti esterni (come editor visivi) grazie al suo formato standardizzato.

  > Risorse:
  >
  > - [Formati di Dichiarazione dei Contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/content_extention_customization.md)

---

## Integrazione con Framework ed Ambienti

### 1. Next.js

#### a. Componenti Server e Client

- Fornisce un **approccio unificato alla gestione dei contenuti** per componenti server e client.
- Offre un contesto integrato per i componenti server, semplificando l'implementazione rispetto ad altre soluzioni.

#### b. Metadata, Sitemaps e robots.txt

- Recupera e inietta contenuti dinamicamente per generare metadata, sitemaps o file `robots.txt`.

#### c. Middleware

- Aggiungi un middleware per **reindirizzare gli utenti** ai contenuti in base alla loro lingua preferita.

#### d. Compatibilità con Turbopack e Webpack

- Completamente compatibile con il nuovo Turbopack di Next.js e con il tradizionale Webpack.

> Risorse:
>
> - [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_15.md)

### 2. Vite

- Simile a Next.js, puoi integrare Intlayer con Vite e utilizzare un **middleware** per reindirizzare gli utenti ai contenuti in base alla loro lingua preferita.

> Risorse:
>
> - [Vite](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_vite+react.md)

### 3. Express

- Gestisci contenuti e internazionalizza i servizi backend costruiti su Express.
- Personalizza email, messaggi di errore, notifiche push e altro con testo localizzato.

> Risorse:
>
> - [Express](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_express.md)

---

## Editor Visivi e CMS

### 1. Editor Visivo Locale

- Un **editor visivo locale gratuito** che ti consente di modificare i contenuti della tua applicazione selezionando direttamente gli elementi sulla pagina.
- Integra funzionalità AI per aiutarti a:
  - Generare o correggere traduzioni
  - Controllare sintassi e ortografia
  - Suggerire miglioramenti
- Può essere ospitato localmente o distribuito su un server remoto.

> Risorse:
>
> - [Editor Visivo](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_visual_editor.md)

### 2. Intlayer CMS (Remoto)

- Una soluzione **CMS ospitata** che ti consente di gestire i contenuti dell'applicazione online, senza toccare il tuo codice.
- Fornisce funzionalità AI-assistite per dichiarare contenuti, gestire traduzioni e correggere errori di sintassi o ortografia.
- Interagisci con i tuoi contenuti tramite l'interfaccia della tua applicazione live.

> Risorse:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_CMS.md)

---

## Intlayer CLI

- **Audit e Generazione di Traduzioni**: Esegui audit sui tuoi file di contenuti per generare traduzioni mancanti o identificare quelle inutilizzate.
- **Interazione Remota**: Pubblica i tuoi contenuti locali sul CMS remoto o recupera contenuti remoti per integrarli nella tua applicazione locale.
- Utile per **pipeline CI/CD**, garantendo che i tuoi contenuti siano sempre sincronizzati con il tuo codice.

> Risorse:
>
> - [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_cli.md)

---

## Ambienti

- Utilizza **variabili di ambiente** per configurare Intlayer in modo diverso tra ambienti di produzione, test e locali.
- Definisci quale progetto dell'editor visivo o del CMS remoto mirare a seconda del tuo ambiente.

---

## Aggiornamenti Contenuti in Tempo Reale

- Quando utilizzi dizionari remoti e il CMS Intlayer, puoi **aggiornare i contenuti della tua applicazione al volo**, senza bisogno di ridistribuire.

> Risorse:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_CMS.md)

---

## Roadmap: Funzionalità in Arrivo

### 1. Test A/B e Personalizzazione

- **Test Multivariati**: Testa diverse versioni di un determinato contenuto per vedere quale performa meglio (ad esempio, tasso di clic più alto).
- **Personalizzazione Basata sui Dati**: Mostra contenuti diversi in base a demografia dell'utente (genere, età, posizione, ecc.) o altri schemi comportamentali.
- **Iterazione Automatica**: Consenti all'AI di testare automaticamente più versioni e scegliere il miglior performer o raccomandare opzioni per l'approvazione dell'amministratore.

### 2. Versionamento

- Ripristina versioni precedenti dei tuoi contenuti con il **versionamento dei contenuti**.
- Tieni traccia delle modifiche nel tempo e torna a stati precedenti se necessario.

### 3. Traduzione Automatica

- Per gli utenti del CMS remoto, **generazione di traduzioni con un clic** per qualsiasi lingua supportata.
- Il sistema genererà traduzioni in background e poi ti chiederà di convalidarle o modificarle.

### 4. Miglioramenti SEO

- Strumenti per **analizzare parole chiave**, intento di ricerca degli utenti e tendenze emergenti.
- Suggerisci contenuti migliorati per un posizionamento migliore e monitora le prestazioni a lungo termine.

### 5. Compatibilità con Altri Framework

- Sono in corso sforzi per supportare **Vue, Solid, Svelte, Angular** e altro.
- L'obiettivo è rendere Intlayer compatibile con **qualsiasi applicazione basata su JavaScript**.

### 6. Estensioni IDE

- Estensioni per i principali IDE per fornire un'interfaccia grafica per la gestione delle traduzioni locali e remote.
- Le funzionalità potrebbero includere la generazione automatica di file di dichiarazione dei contenuti per i componenti, l'integrazione diretta con il CMS Intlayer e la validazione in tempo reale.

---

## Conclusione

Intlayer mira a essere una soluzione completa per la gestione dei contenuti e l'internazionalizzazione. Si concentra su flessibilità (file centralizzati o distribuiti), ampio supporto linguistico, facile integrazione con framework e bundler moderni e potenti funzionalità guidate dall'AI. Con l'introduzione di nuove capacità, come test A/B, versionamento e traduzioni automatiche, Intlayer continuerà a semplificare i flussi di lavoro dei contenuti e migliorare le esperienze degli utenti su diverse piattaforme.

Rimani aggiornato per i prossimi rilasci e sentiti libero di esplorare le funzionalità esistenti per vedere come Intlayer può aiutarti a centralizzare e ottimizzare i tuoi processi di gestione dei contenuti oggi!

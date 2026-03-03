---
createdAt: 2026-02-09
updatedAt: 2026-03-03
title: Competenze dell'Agente
description: Scopri come utilizzare le Intlayer Agent Skills per migliorare la comprensione del tuo progetto da parte del tuo agente AI, inclusi i manuali completi di configurazione per Metadati, Sitemap e Azioni del Server.
keywords:
  - Intlayer
  - Competenze dell'Agente
  - Agente AI
  - Internazionalizzazione
  - Documentazione
slugs:
  - doc
  - agent_skills
history:
  - version: 8.1.0
    date: 2026-02-09
    changes: Init history
---

# Competenze dell'Agente

## Configurazione

### Utilizzo della CLI

Il comando `intlayer init skills` è il modo più semplice per configurare le competenze dell'agente nel tuo progetto. Rileva il tuo ambiente e installa i file di configurazione necessari per le tue piattaforme preferite.

```bash
npx intlayer init skills
```

### Utilizzo dell'SDK Vercel Skill

```bash
npx skills add aymericzip/intlayer-skills
```

### Utilizzo dell'estensione VS Code

1. Apri la Tavolozza dei Comandi (Ctrl+Shift+P o Cmd+Shift+P).
2. Digita `Intlayer: Setup AI Agent Skills`.
3. Scegli la piattaforma che utilizzi (es. `VS Code`, `Cursor`, `Windsurf`, `OpenCode`, `Claude Code`, `GitHub Copilot Workspace`, ecc.).
4. Scegli le competenze che desideri installare (es. `Next.js`, `React`, `Vite`, `Compiler`, `Configuration`).
5. Premi Invio.

## Elenco delle competenze

**intlayer-config**

- Consente all'agente di comprendere le impostazioni i18n specifiche del tuo progetto, permettendogli di configurare accuratamente le lingue, i modelli di routing e le strategie di fallback.

**intlayer-cli**

- Permette all'agente di gestire autonomamente il ciclo di vita della traduzione, includendo il controllo delle traduzioni mancanti, la creazione di dizionari e la sincronizzazione dei contenuti tramite la riga di comando.

**intlayer-angular**

- Dota l'agente di competenze specifiche per il framework per implementare correttamente i modelli i18n reattivi e i segnali secondo le migliori pratiche di Angular.

**intlayer-astro**

- Fornisce all'agente le conoscenze necessarie per gestire le traduzioni lato server e i modelli di routing localizzati unici per l'ecosistema Astro.

**intlayer-content**

- Insegna all'agente come utilizzare nodi di contenuto avanzati, come pluralizzazione, condizioni e markdown, per costruire dizionari ricchi, dinamici e localizzati.

**intlayer-next-js**

- Conferisce all'agente la capacità di implementare i18n sia nei componenti Server che in quelli Client di Next.js, assicurando l'ottimizzazione SEO e un routing localizzato senza interruzioni.

**intlayer-react**

- Fornisce conoscenze specializzate all'agente per implementare in modo efficiente componenti e hook i18n dichiarativi in qualsiasi ambiente basato su React.

**intlayer-preact**

- Ottimizza la capacità dell'agente di implementare i18n per Preact, permettendogli di scrivere componenti leggeri e localizzati utilizzando segnali e modelli reattivi efficienti.

**intlayer-solid**

- Consente all'agente di sfruttare la reattività fine di SolidJS per una gestione dei contenuti localizzati ad alte prestazioni.

**intlayer-svelte**

- Insegna all'agente a utilizzare gli store di Svelte e una sintassi idiomatica per contenuti localizzati reattivi e sicuri dal punto di vista dei tipi nelle app Svelte e SvelteKit.

**intlayer-cms**

- Permette all'agente di integrare e gestire contenuti remoti, consentendogli di gestire flussi di lavoro di sincronizzazione in tempo reale e traduzione remota tramite il CMS Intlayer.

**intlayer-usage**

- Standardizza l'approccio dell'agente alla struttura del progetto e alla dichiarazione dei contenuti, assicurando che segua i flussi di lavoro più efficienti per il tuo progetto i18n.

**intlayer-vue**

- Dota l'agente di modelli specifici per Vue, inclusi i Composable e il supporto Nuxt, per costruire applicazioni web moderne e localizzate.

**intlayer-compiler**

- Semplifica il flusso di lavoro dell'agente consentendo l'estrazione automatica dei contenuti, permettendogli di scrivere stringhe traducibili direttamente nel codice senza file di dizionari manuali.

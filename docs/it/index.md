# Documentazione di Intlayer

Benvenuto nella documentazione ufficiale di **Intlayer**! Qui troverai tutto ciò di cui hai bisogno per integrare, configurare e padroneggiare Intlayer per tutte le tue esigenze di internazionalizzazione (i18n), che tu stia lavorando con **Next.js**, **React**, **Vite**, **Express** o un altro ambiente JavaScript.

Intlayer offre un approccio flessibile e moderno per tradurre la tua applicazione. I nostri documenti ti guideranno dall'installazione e configurazione fino alle funzionalità avanzate come la **traduzione basata sull'intelligenza artificiale**, le definizioni **TypeScript** e il supporto per i **componenti server**—permettendoti di creare un'esperienza multilingue senza soluzione di continuità.

---

## Iniziare

- **[Introduzione](https://github.com/aymericzip/intlayer/blob/main/docs/it/introduction.md)**  
  Ottieni una panoramica su come funziona Intlayer, le sue caratteristiche principali e perché è rivoluzionario per l'i18n.

- **[Come Funziona Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/how_works_intlayer.md)**  
  Approfondisci il design architetturale e scopri come Intlayer gestisce tutto, dalla dichiarazione dei contenuti alla consegna delle traduzioni.

- **[Configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md)**  
  Personalizza Intlayer per soddisfare le esigenze del tuo progetto. Esplora le opzioni middleware, le strutture delle directory e le impostazioni avanzate.

- **[CLI di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_cli.md)**  
  Gestisci contenuti e traduzioni utilizzando il nostro strumento da riga di comando. Scopri come caricare e scaricare contenuti, automatizzare le traduzioni e altro ancora.

- **[Editor di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_visual_editor.md)**  
  Semplifica la collaborazione con i non sviluppatori e potenzia le tue traduzioni con l'AI—direttamente nel nostro CMS gratuito e intuitivo.

---

## Concetti Fondamentali

### Dizionario

Organizza i tuoi contenuti multilingue vicino al tuo codice per mantenere tutto coerente e gestibile.

- **[Inizia](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/get_started.md)**  
  Impara le basi per dichiarare i tuoi contenuti in Intlayer.

- **[Traduzione](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/translation.md)**  
  Comprendi come vengono generate, archiviate e utilizzate le traduzioni nella tua applicazione.

- **[Enumerazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/enumeration.md)**  
  Gestisci facilmente set di dati ripetuti o fissi in varie lingue.

- **[Recupero Funzioni](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/function_fetching.md)**  
  Scopri come recuperare dinamicamente i contenuti con logiche personalizzate per adattarsi al flusso di lavoro del tuo progetto.

---

## Ambienti e Integrazioni

Abbiamo progettato Intlayer con flessibilità in mente, offrendo un'integrazione senza soluzione di continuità con i framework e gli strumenti di build più popolari:

- **[Intlayer con Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_15.md)**
- **[Intlayer con Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_14.md)**
- **[Intlayer con Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_page_router.md)**
- **[Intlayer con React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_create_react_app.md)**
- **[Intlayer con Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_vite+react.md)**
- **[Intlayer con Express](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_express.md)**

Ogni guida di integrazione include le migliori pratiche per utilizzare le funzionalità di Intlayer—come il **rendering lato server**, il **routing dinamico** o il **rendering lato client**—per mantenere un'applicazione veloce, SEO-friendly e altamente scalabile.

---

## Pacchetti

Il design modulare di Intlayer offre pacchetti dedicati per ambienti e necessità specifiche:

### `intlayer`

Funzioni di utilità principali per configurare e gestire la tua configurazione i18n.

- **[getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getConfiguration.md)**
- **[getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getHTMLTextDir.md)**
- **[getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getLocaleLang.md)**
- **[getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getLocaleName.md)**
- **[getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getLocalizedUrl.md)**
- **[getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getMultilingualUrls.md)**
- **[getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getPathWithoutLocale.md)**
- **[getTranslation](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getTranslation.md)**
- **[getEnumeration](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getEnumeration.md)**

### `express-intlayer`

Sfrutta Intlayer nelle app basate su **Express**:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/express-intlayer/t.md)**  
  Un helper di traduzione minimale e diretto per le tue rotte e viste del server.

### `react-intlayer`

Migliora le tue applicazioni **React** con potenti hook:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/useLocale.md)**

### `next-intlayer`

Integra senza problemi con **Next.js**:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/next-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/next-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/next-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/next-intlayer/useLocale.md)**

---

## Risorse Aggiuntive

- **[Blog: Intlayer e i18next](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_i18next.md)**  
  Scopri come Intlayer si integra e si confronta con la popolare libreria **i18next**.

- **[Tutorial Live su YouTube](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)**  
  Guarda una demo completa e scopri come integrare Intlayer in tempo reale.

---

## Contributi e Feedback

Valorizziamo il potere dell'open-source e dello sviluppo guidato dalla comunità. Se desideri proporre miglioramenti, aggiungere una nuova guida o correggere eventuali problemi nei nostri documenti, sentiti libero di inviare una Pull Request o aprire un problema sul nostro [repository GitHub](https://github.com/aymericzip/intlayer/blob/main/docs).

**Pronto a tradurre la tua applicazione più velocemente ed efficientemente?** Esplora i nostri documenti per iniziare a utilizzare Intlayer oggi stesso. Vivi un approccio robusto e semplificato all'internazionalizzazione che mantiene i tuoi contenuti organizzati e il tuo team più produttivo.

Buona traduzione!  
— Il Team di Intlayer

# Intlayer Documentazione

Benvenuti alla documentazione ufficiale di **Intlayer**! Qui troverete tutto il necessario per integrare, configurare e padroneggiare Intlayer per tutte le vostre esigenze di internazionalizzazione (i18n)—che stiate lavorando con **Next.js**, **React**, **Vite**, **Express**, o un altro ambiente JavaScript.

Intlayer offre un approccio flessibile e moderno per tradurre la vostra applicazione. I nostri documenti vi guideranno dall'installazione e configurazione attraverso funzionalità avanzate come la **traduzione potenziata dall'IA**, le **definizioni TypeScript**, e il supporto per i **componenti server**—dandovi la possibilità di creare un'esperienza multilingue senza soluzione di continuità.

---

## Iniziare

- **[Introduzione](https://github.com/aymericzip/intlayer/blob/main/docs/it/introduction.md)**  
  Ottenete una panoramica su come funziona Intlayer, le sue caratteristiche principali e perché rappresenta una svolta per l'i18n.

- **[Come funziona Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/how_works_intlayer.md)**  
  Esplora il design architettonico e scopri come Intlayer gestisce tutto, dalla dichiarazione dei contenuti alla consegna delle traduzioni.

- **[Configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md)**  
  Personalizzate Intlayer per soddisfare le esigenze del vostro progetto. Esplorate opzioni middleware, strutture di directory e impostazioni avanzate.

- **[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_cli.md)**  
  Gestite contenuti e traduzioni utilizzando il nostro strumento da riga di comando. Scoprite come inviare e ricevere contenuti, automatizzare le traduzioni e altro ancora.

- **[Intlayer Editor](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_editor.md)**  
  Semplificate la collaborazione con i non sviluppatori e potenziate le vostre traduzioni con l'IA—direttamente nel nostro CMS gratuito e intuitivo.

---

## Concetti Fondamentali

### Dichiarazione dei Contenuti

Organizzate i vostri contenuti multilingue vicino al vostro codice per mantenere tutto coerente e manutenibile.

- **[Iniziare](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/get_started.md)**  
  Imparate le basi della dichiarazione dei vostri contenuti in Intlayer.

- **[Traduzione](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/translation.md)**  
  Comprendete come vengono generate, memorizzate e utilizzate le traduzioni nella vostra applicazione.

- **[Enumerazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/enumeration.md)**  
  Gestite facilmente set di dati ripetuti o fissi in diverse lingue.

- **[Estrazione di Funzioni](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/function_fetching.md)**  
  Scoprite come estrarre dinamicamente contenuti con logica personalizzata per adattarsi al flusso di lavoro del vostro progetto.

---

## Ambienti e Integrazioni

Abbiamo costruito Intlayer pensando alla flessibilità, offrendo integrazioni senza soluzione di continuità con i framework e strumenti di build più popolari:

- **[Intlayer con Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_15.md)**
- **[Intlayer con Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_14.md)**
- **[Intlayer con Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_page_router.md)**
- **[Intlayer con React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_create_react_app.md)**
- **[Intlayer con Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_vite+react.md)**
- **[Intlayer con Express](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_express.md)**

Ogni guida all'integrazione include le migliori pratiche per utilizzare le funzionalità di Intlayer—come il **rendering lato server**, il **routing dinamico**, o il **rendering lato client**—per mantenere un'applicazione veloce, ottimizzata per SEO e altamente scalabile.

---

## Pacchetti

Il design modulare di Intlayer offre pacchetti dedicati per ambienti e esigenze specifiche:

### `intlayer`

Funzioni utility core per configurare e gestire la vostra configurazione i18n.

- **[getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getConfiguration.md)**
- **[getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getHTMLTextDir.md)**
- **[getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getLocaleLang.md)**
- **[getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getLocaleName.md)**
- **[getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getLocalizedUrl.md)**
- **[getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getMultilingualUrls.md)**
- **[getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getPathWithoutLocale.md)**
- **[getTranslationContent](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getTranslationContent.md)**
- **[getEnumerationContent](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getEnumerationContent.md)**

### `express-intlayer`

Sfruttate Intlayer all'interno di app basate su **Express**:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/express-intlayer/t.md)**  
  Un semplice aiuto alla traduzione minimale per i vostri percorsi e visualizzazioni del server.

### `react-intlayer`

Potenziare le vostre applicazioni **React** con potenti hook:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/useLocale.md)**

### `next-intlayer`

Integrate senza problemi con **Next.js**:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/next-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/next-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/next-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/next-intlayer/useLocale.md)**

---

## Risorse Aggiuntive

- **[Blog: Intlayer e i18next](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_i18next.md)**  
  Scoprite come Intlayer si complementa e confronta con la popolare libreria **i18next**.

- **[Tutorial Live su YouTube](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)**  
  Guardate una demo comprensiva e imparate come integrare Intlayer in tempo reale.

---

## Contributi e Feedback

Valutiamo il potere dell'open-source e dello sviluppo guidato dalla comunità. Se desiderate proporre miglioramenti, aggiungere una nuova guida, o correggere eventuali problemi nella nostra documentazione, sentitevi liberi di inviare una Pull Request o aprire un'issue nel nostro [repository GitHub](https://github.com/aymericzip/intlayer/blob/main/docs).

**Pronti a tradurre la vostra applicazione più velocemente e in modo più efficiente?** Immergetevi nei nostri documenti per iniziare a utilizzare Intlayer oggi stesso. Sperimentate un approccio robusto e semplificato all'internazionalizzazione che mantiene i vostri contenuti organizzati e il vostro team più produttivo.

Buona traduzione!  
— Il Team di Intlayer

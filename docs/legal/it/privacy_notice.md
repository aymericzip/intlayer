---
createdAt: 2025-04-18
updatedAt: 2026-09-22
priority: 1
title: Informativa sulla Privacy di Intlayer
description: Scopri come Intlayer gestisce le informazioni raccolte tramite il nostro sito web e CMS. Segui la documentazione per comprendere i diversi formati e casi d'uso.
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Privacy
  - Informativa
  - Cookie
  - Tracciamento
  - Analisi
  - Google Analytics
  - Meta (Facebook) Pixel
  - Autenticazione
  - Dati Utente
slugs:
  - privacy-notice
author: aymericzip
---

# Informativa sulla Privacy di Intlayer

## Introduzione

In Intlayer prendiamo la privacy sul serio. Questa informativa spiega come gestiamo le informazioni raccolte tramite il nostro sito web e CMS.

## Contatti

Se hai domande o dubbi sulla privacy, ti preghiamo di contattarci al seguente indirizzo: [contact@intlayer.org](mailto:contact@intlayer.org).

## Uso di Cookie e Tecnologie di Tracciamento

Utilizziamo **Google Analytics** e il **Meta (Facebook) Pixel** per analizzare l'uso del nostro sito web e migliorare i nostri servizi. Questi strumenti generano statistiche e altre informazioni sul sito web utilizzando cookie memorizzati sui dispositivi degli utenti.

Per maggiori informazioni:

- [Informativa sulla privacy di Google](https://policies.google.com/privacy)
- [Informativa sulla privacy di Meta](https://www.facebook.com/privacy/policy)

## Autenticazione e Dati Utente

L'accesso al CMS di Intlayer richiede l'autenticazione dell'utente. Offriamo sia l'autenticazione tramite email/password sia l'accesso tramite terze parti come **Google** e **GitHub**.

Durante il processo di autenticazione, raccogliamo:

- Indirizzo email
- Nome visualizzato (o nome scelto)

Gli utenti possono anche accedere al CMS tramite token di accesso collegati al loro account. Questi token sono associati agli stessi dati di autenticazione.

## Intlayer i18n Scanner (estensione Chrome)

L'estensione Chrome **Intlayer i18n Scanner** analizza la configurazione di internazionalizzazione della pagina aperta nella scheda corrente.

- **Analisi locale:** Quando apri il popup dell'estensione, questa legge la pagina corrente (attributi di lingua, link hreflang, meta tag, variabili globali del framework) direttamente nel tuo browser. Questo contenuto non viene inviato ai nostri server.
- **Scansione di audit:** Solo quando fai clic sul pulsante di scansione, l'URL della pagina corrente viene inviato all'API di Intlayer (`back.intlayer.org`) per eseguire l'audit. Conserviamo esclusivamente il **nome di dominio** della pagina analizzata, il **punteggio** ottenuto e la **data** della scansione, per calcolare statistiche aggregate. Questo record non è collegato alla tua identità né a un account Intlayer.
- **Nessun'altra raccolta:** L'estensione non raccoglie informazioni personali, dati di autenticazione o attività dell'utente, non traccia le pagine che visiti, non utilizza cookie né strumenti di analisi e non esegue codice remoto.

## Archiviazione e Sicurezza dei Dati

I dati di autenticazione degli utenti sono archiviati in un **database MongoDB** ospitato su **cloud.mongodb.com**:

- **Regione:** AWS / Oregon (us-west-2)
- **Tipo:** Replica Set (3 nodi)
- **Sicurezza delle password:** Tutte le password sono hashate utilizzando pratiche standard del settore.

Non memorizziamo dati personali non necessari oltre a quelli richiesti per l'autenticazione e l'accesso sicuro al CMS.

## Condivisione dei Dati con Terze Parti

Non vendiamo né condividiamo i tuoi dati personali con terze parti, salvo quanto richiesto per analisi (Google Analytics, Facebook Pixel) o come parte del processo di autenticazione (accesso tramite Google o GitHub).

## Diritti degli Utenti

Come utente, hai il diritto di:

- Accedere ai dati personali che deteniamo su di te
- Richiedere la correzione o la cancellazione dei tuoi dati
- Revocare l'accesso o cancellare il tuo account

Per qualsiasi richiesta relativa ai tuoi dati, contattaci all'indirizzo [contact@intlayer.org](mailto:contact@intlayer.org).

## Modifiche a Questa Informativa

Potremmo aggiornare questa informativa sulla privacy di tanto in tanto. Si consiglia agli utenti di controllare regolarmente questa pagina per rimanere informati su eventuali modifiche.

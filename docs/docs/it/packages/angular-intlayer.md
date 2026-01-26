---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione del pacchetto angular-intlayer
description: Integrazione specifica per Angular di Intlayer, che fornisce provider e servizi per le applicazioni Angular.
keywords:
  - angular-intlayer
  - angular
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentazione unificata per tutte le esportazioni
---

# Pacchetto angular-intlayer

Il pacchetto `angular-intlayer` fornisce gli strumenti necessari per integrare Intlayer nelle applicazioni Angular. Include provider e servizi per la gestione di contenuti multilingue.

## Installazione

```bash
npm install angular-intlayer
```

## Esportazioni

### Configurazione

| Funzione          | Descrizione                                                   |
| ----------------- | ------------------------------------------------------------- |
| `provideIntlayer` | Funzione per fornire Intlayer nella tua applicazione Angular. |

### Servizi

| Servizio          | Descrizione                                                                            |
| ----------------- | -------------------------------------------------------------------------------------- |
| `IntlayerService` | Servizio che seleziona un dizionario tramite la sua chiave e restituisce il contenuto. |
| `LocaleService`   | Servizio che restituisce la locale corrente e una funzione per impostarla.             |

### Componenti

| Componente                  | Descrizione                                           |
| --------------------------- | ----------------------------------------------------- |
| `IntlayerMarkdownComponent` | Componente Angular che visualizza contenuti Markdown. |

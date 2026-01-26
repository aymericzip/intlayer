---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione del pacchetto angular-intlayer
description: Integrazione specifica per Angular di Intlayer, fornendo provider e servizi per applicazioni Angular.
keywords:
  - angular-intlayer
  - angular
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
  - exports
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

Import:

```tsx
import "angular-intlayer";
```

### Configurazione

| Funzione          | Descrizione                                                   |
| ----------------- | ------------------------------------------------------------- |
| `provideIntlayer` | Funzione per fornire Intlayer nella tua applicazione Angular. |

### Hooks

| Hook                   | Descrizione                                                                                                   | Doc correlato |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- | ------------- |
| `useIntlayer`          | Basato su `useDictionary`, ma inietta una versione ottimizzata del dizionario dalla dichiarazione generata.   | -             |
| `useDictionary`        | Elabora oggetti che assomigliano a dizionari (key, content). Gestisce le traduzioni `t()`, enumerazioni, ecc. | -             |
| `useDictionaryAsync`   | Come `useDictionary`, ma gestisce dizionari asincroni.                                                        | -             |
| `useDictionaryDynamic` | Come `useDictionary`, ma gestisce dizionari dinamici.                                                         | -             |
| `useLocale`            | Restituisce la locale corrente e una funzione per impostarla.                                                 | -             |
| `useIntl`              | Restituisce l'oggetto Intl per la locale corrente.                                                            | -             |
| `useLoadDynamic`       | Hook per caricare dizionari dinamici.                                                                         | -             |

### Componenti

| Componente                  | Descrizione                                              |
| --------------------------- | -------------------------------------------------------- |
| `IntlayerMarkdownComponent` | Componente Angular che renderizza il contenuto Markdown. |

---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Pacchetto solid-intlayer
description: Integrazione specifica per Solid di Intlayer, che fornisce provider e hook per applicazioni Solid.
keywords:
  - solid-intlayer
  - solidjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentazione unificata per tutte le esportazioni
---

# Pacchetto solid-intlayer

Il pacchetto `solid-intlayer` fornisce gli strumenti necessari per integrare Intlayer nelle applicazioni Solid. Include provider e hook per la gestione dei contenuti multilingue.

## Installazione

```bash
npm install solid-intlayer
```

## Esportazioni

### Provider

Importazione:

```tsx
import "solid-intlayer";
```

| Componente         | Descrizione                                                                             | Documento correlato                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Il provider principale che avvolge la tua applicazione e fornisce il contesto Intlayer. | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/solid-intlayer/IntlayerProvider.md) |

### Hooks

Importazione:

```tsx
import "solid-intlayer";
```

| Hook                   | Descrizione                                                                                                                            | Documento correlato                                                                                                     |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Basato su `useDictionary`, ma inietta una versione ottimizzata del dizionario dalla dichiarazione generata.                            | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/solid-intlayer/useIntlayer.md)     |
| `useDictionary`        | Elabora oggetti che assomigliano a dizionari (chiave, contenuto). Gestisce le traduzioni `t()`, le enumerazioni, ecc.                  | -                                                                                                                       |
| `useDictionaryAsync`   | Stesso di `useDictionary`, ma gestisce dizionari asincroni.                                                                            | -                                                                                                                       |
| `useDictionaryDynamic` | Stesso di `useDictionary`, ma gestisce dizionari dinamici.                                                                             | -                                                                                                                       |
| `useLocale`            | Restituisce la locale corrente e una funzione per impostarla.                                                                          | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/solid-intlayer/useLocale.md)         |
| `useRewriteURL`        | Hook lato client per gestire le riscritture degli URL. Aggiorna automaticamente l'URL se esiste una regola di riscrittura localizzata. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/solid-intlayer/useRewriteURL.md) |
| `useIntl`              | Restituisce l'oggetto Intl per la locale corrente.                                                                                     | -                                                                                                                       |
| `useLoadDynamic`       | Hook per caricare dizionari dinamici.                                                                                                  | -                                                                                                                       |
| `t`                    | Seleziona il contenuto in base alla locale corrente.                                                                                   | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/translation.md)                  |

### Componenti

Importazione:

```tsx
import "solid-intlayer";
```

| Componente         | Descrizione                                     |
| ------------------ | ----------------------------------------------- |
| `MarkdownProvider` | Provider per il contesto di rendering Markdown. |

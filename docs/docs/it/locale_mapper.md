---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Locale Mapper
description: Scopri come funziona Locale Mapper. Vedi i passaggi utilizzati da Locale Mapper nella tua applicazione. Scopri cosa fanno i diversi pacchetti.
keywords:
  - Locale Mapper
  - Inizia
  - Intlayer
  - Applicazione
  - Pacchetti
slugs:
  - doc
  - locale-mapper
---

# Locale Mapper

Locale Mapper è un potente strumento che ti aiuta a lavorare con i dati di internazionalizzazione nella tua applicazione Intlayer. Fornisce tre funzioni principali per trasformare e organizzare i dati specifici per locale: `localeMap`, `localeFlatMap` e `localeRecord`.

## Come Funziona Locale Mapper

Locale Mapper opera su un oggetto `LocaleData` che contiene tutte le informazioni necessarie su un locale:

```typescript
type LocaleData = {
  locale: LocalesValues; // Codice del locale corrente (es. 'en', 'fr')
  defaultLocale: LocalesValues; // Codice del locale predefinito
  isDefault: boolean; // Indica se questo è il locale predefinito
  locales: LocalesValues[]; // Array di tutti i locali disponibili
  urlPrefix: string; // Prefisso URL per questo locale (es. '/fr' o '')
};
```

Le funzioni mapper generano automaticamente questi dati per ogni locale nella tua configurazione, tenendo conto di:

- La lista dei locali configurati
- L'impostazione del locale predefinito
- Se il locale predefinito deve avere un prefisso negli URL

## Funzioni Principali

### `localeMap`

Trasforma ogni locale in un singolo oggetto usando una funzione mapper.

```typescript
localeMap<T>(
  mapper: (locale: LocaleData) => T,
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**Esempio: Creazione di oggetti route**

```typescript
import { localeMap } from "intlayer";

const routes = localeMap((localizedData) => ({
  path: localizedData.urlPrefix,
  name: localizedData.locale,
  isDefault: localizedData.isDefault,
  locales: localizedData.locales,
  defaultLocale: localizedData.defaultLocale,
}));

// Risultato:
// [
//   { path: '/', name: 'en', isDefault: true, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/fr', name: 'fr', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/es', name: 'es', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' }
// ]
```

### `localeFlatMap`

Simile a `localeMap`, ma la funzione mapper restituisce un array di oggetti che viene appiattito in un singolo array.

```typescript
localeFlatMap<T>(
  mapper: (locale: LocaleData) => T[],
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**Esempio: Creazione di più route per locale**

```typescript
import { localeFlatMap } from "intlayer";

const routes = localeFlatMap((localizedData) => [
  {
    path: localizedData.urlPrefix,
    name: localizedData.locale,
    isDefault: localizedData.isDefault,
  },
  {
    path: `${localizedData.urlPrefix}/about`,
    name: `${localizedData.locale}-about`,
    isDefault: localizedData.isDefault,
  },
]);

// Risultato:
// [
//   { path: '/', name: 'en', isDefault: true },
//   { path: '/about', name: 'en-about', isDefault: true },
//   { path: '/fr', name: 'fr', isDefault: false },
//   { path: '/fr/about', name: 'fr-about', isDefault: false },
//   { path: '/es', name: 'es', isDefault: false },
//   { path: '/es/about', name: 'es-about', isDefault: false }
// ]
```

### `localeRecord`

Crea un oggetto record dove ogni locale è una chiave che mappa a un valore trasformato dalla funzione mapper.

```typescript
localeRecord<T>(
  mapper: (locale: LocaleData) => T,
  locales?: Locales[],
  defaultLocale?: Locales,
  prefixDefault?: boolean
): Record<Locales, T>
```

**Esempio: Caricamento dei file di traduzione**

```typescript
import { localeRecord } from "intlayer";

const translations = localeRecord(({ locale }) =>
  require(`./translations/${locale}.json`)
);

// Risultato:
// {
//   en: { welcome: 'Welcome', hello: 'Hello' },
//   fr: { welcome: 'Bienvenue', hello: 'Bonjour' },
//   es: { welcome: 'Bienvenido', hello: 'Hola' }
// }
```

## Configurazione del Locale Mapper

Il Locale Mapper utilizza automaticamente la configurazione di Intlayer, ma puoi sovrascrivere i valori predefiniti passando dei parametri:

### Utilizzo della Configurazione Predefinita

```typescript
import { localeMap } from "intlayer";

// Usa la configurazione da intlayer.config.ts
const routes = localeMap((data) => ({
  path: data.urlPrefix,
  locale: data.locale,
}));
```

### Sovrascrivere la Configurazione

```typescript
import { localeMap } from "intlayer";

// Sovrascrivi i locali e il locale predefinito
const customRoutes = localeMap(
  (data) => ({ path: data.urlPrefix, locale: data.locale }),
  //  ["en", "fr", "de"], // Locali personalizzate
  "en", // Locale predefinito personalizzato
  true // Prefisso del locale predefinito negli URL
);
```

## Esempi di Utilizzo Avanzato

### Creazione di Menu di Navigazione

```typescript
import { localeMap } from "intlayer";

const navigationItems = localeMap((data) => ({
  label: data.locale.toUpperCase(),
  href: data.urlPrefix || "/",
  isActive: data.isDefault,
  flag: `/flags/${data.locale}.svg`,
}));
```

### Generazione dei Dati per la Sitemap

```typescript
import { localeFlatMap } from "intlayer";

const sitemapUrls = localeFlatMap((data) => [
  {
    url: `${data.urlPrefix}/`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: data.isDefault ? 1.0 : 0.8,
  },
  {
    url: `${data.urlPrefix}/about`,
    lastmod: new Date().toISOString(),
    changefreq: "mensile",
    priority: data.isDefault ? 0.8 : 0.6,
  },
]);
```

### Caricamento Dinamico delle Traduzioni

```typescript
import { localeRecord } from "intlayer";

const translationModules = localeRecord(({ locale }) => ({
  messages: import(`./locales/${locale}/messages.json`),
  validation: import(`./locales/${locale}/validation.json`),
  metadata: {
    locale,
    direction: ["ar", "he", "fa"].includes(locale) ? "rtl" : "ltr",
  },
}));
```

## Integrazione della Configurazione

Il Locale Mapper si integra perfettamente con la tua configurazione Intlayer:

- **Locali**: Utilizza automaticamente `configuration.internationalization.locales`
- **Locale Predefinito**: Utilizza `configuration.internationalization.defaultLocale`
- **Prefisso URL**: Rispetta `configuration.middleware.prefixDefault`

Questo garantisce coerenza in tutta la tua applicazione e riduce la duplicazione della configurazione.

## Cronologia della Documentazione

| Versione | Data       | Modifiche                                 |
| -------- | ---------- | ----------------------------------------- |
| 5.7.2    | 2025-07-27 | Aggiunta documentazione del locale mapper |

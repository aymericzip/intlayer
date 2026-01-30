---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: Documentazione della funzione t | adonis-intlayer
description: Scopri come utilizzare la funzione t per il pacchetto adonis-intlayer
keywords:
  - t
  - traduzione
  - Intlayer
  - Internazionalizzazione
  - Documentazione
  - AdonisJS
  - JavaScript
slugs:
  - doc
  - packages
  - adonis-intlayer
  - t
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Documentazione iniziale
---

# Documentazione: Funzione `t` in `adonis-intlayer`

La funzione `t` nel pacchetto `adonis-intlayer` è l'utilità principale per fornire risposte localizzate nella tua applicazione AdonisJS. Semplifica l'internazionalizzazione (i18n) selezionando dinamicamente il contenuto in base alla lingua preferita dell'utente.

---

## Panoramica

La funzione `t` viene utilizzata per definire e recuperare le traduzioni per un determinato set di lingue. Determina automaticamente la lingua appropriata da restituire in base alle impostazioni della richiesta del client, come l'intestazione `Accept-Language`. Se la lingua preferita non è disponibile, ripiega elegantemente sulla locale predefinita specificata nella configurazione.

---

## Caratteristiche principali

- **Localizzazione dinamica**: Seleziona automaticamente la traduzione più appropriata per il client.
- **Fallback alla locale predefinita**: Ripiega su una locale predefinita se la lingua preferita del client non è disponibile, garantendo la continuità nell'esperienza utente.
- **Contesto asincrono**: Funziona perfettamente all'interno del ciclo di vita della richiesta AdonisJS utilizzando Async Local Storage.
- **Supporto TypeScript**: Applica la sicurezza dei tipi per le tue traduzioni.

---

## Firma della funzione

```typescript
t(translations: Record<string, any>): any;
```

### Parametri

- `translations`: Un oggetto in cui le chiavi sono codici locale (es. `en`, `fr`, `es`) e i valori sono il contenuto tradotto corrispondente.

### Restituisce

- Il contenuto che rappresenta la lingua preferita del client.

---

## Caricamento del Middleware

Per garantire che la funzione `t` funzioni correttamente, **devi** registrare il middleware `intlayer` nella tua applicazione AdonisJS.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

---

## Esempi di utilizzo

### Esempio di base

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Welcome!",
    fr: "Bienvenue!",
    es: "¡Bienvenido!",
  });
});
```

### Utilizzo nei Controller

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour depuis il contrôleur",
      })
    );
  }
}
```

---

## Argomenti avanzati

### Meccanismo di Fallback

Se una locale preferita non è disponibile, la funzione `t` ripiegherà sulla locale predefinita definita nel tuo `intlayer.config.ts`.

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Integrazione TypeScript

La funzione `t` è sicura dal punto di vista dei tipi quando viene utilizzata con dizionari definiti. Per ulteriori dettagli, consultare la [documentazione TypeScript](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

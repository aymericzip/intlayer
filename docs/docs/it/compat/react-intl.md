---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrare da React Intl a Intlayer"
description: "Scopri come migrare la tua applicazione React da react-intl a Intlayer utilizzando l'adapter di compatibilità."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - react-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migra da React Intl a Intlayer

Se la tua applicazione React utilizza `react-intl` (FormatJS), la transizione a Intlayer è semplicissima. Il nostro compat layer gestisce facilmente ICU MessageFormat e tutti i componenti `Formatted*` esistenti.

## Cosa fare

Inizia eseguendo il comando di inizializzazione nel tuo progetto:

```bash
npx intlayer init
```

Quindi, configura il plugin Intlayer Vite o Next.js nella tua configurazione. Questo plugin inietta alias in fase di build per reindirizzare gli import di `react-intl` a `@intlayer/react-intl`.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactIntlVitePlugin from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

## Cosa fa sotto il cofano

Il plugin bundler crea un alias di `react-intl` a `@intlayer/react-intl`. Invece di analizzare manualmente file JSON di grandi dimensioni e avvolgere la tua app in un `IntlProvider`, il plugin Intlayer estrae staticamente le chiavi e utilizza i dizionari Intlayer a runtime.

Sotto il cofano:

- **ICU MessageFormat:** Intlayer utilizza il resolver `resolveMessage(..., 'icu')` che supporta completamente la pluralizzazione ICU, la selezione, la formattazione di data/numero e i tag di testo ricco nativamente.
- **Method & JSX callers:** `intl.formatMessage({ id: 'a.b' })` e `<FormattedMessage id="a.b">` sono identificati dai plugin compilatore Intlayer (`@intlayer/babel` / `@intlayer/swc`), convertendo le chiavi puntate piatte in modo che il primo segmento si risolva correttamente nella chiave del dizionario Intlayer.
- **Formatters:** `<FormattedNumber>`, `<FormattedDate>`, ecc., si collegano ai `core/formatters` nativi utilizzando `Intl`.

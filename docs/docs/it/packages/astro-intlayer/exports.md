---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione del pacchetto astro-intlayer
description: Integrazione Astro per Intlayer, che fornisce la configurazione per il routing basato sulla locale e la gestione dei dizionari.
keywords:
  - astro-intlayer
  - astro
  - internazionalizzazione
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentazione unificata per tutte le esportazioni
---

# Pacchetto astro-intlayer

Il pacchetto `astro-intlayer` fornisce gli strumenti necessari per integrare Intlayer nelle applicazioni Astro. Configura il routing basato sulla locale e la gestione dei dizionari.

## Installazione

```bash
npm install astro-intlayer
```

## Esportazioni

### Integrazione

Il pacchetto `astro-intlayer` fornisce un'integrazione per Astro per configurare Intlayer nel tuo progetto.

Importazione:

```tsx
import "astro-intlayer";
```

oppure aggiungendolo a `astro.config.mjs`:

```ts
export default defineConfig({
  integrations: [intlayer()],
});
```

| Funzione   | Descrizione                                                 |
| ---------- | ----------------------------------------------------------- |
| `intlayer` | Integrazione Astro che configura Intlayer nel tuo progetto. |

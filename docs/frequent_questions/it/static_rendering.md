---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Rendering Statico vs Dinamico con i18n in Next.js
description: Scopri come utilizzare il rendering statico vs dinamico con i18n in Next.js.
keywords:
  - statico
  - dinamico
  - rendering
  - i18n
  - next.js
  - next-intl
  - intlayer
  - framework
  - middleware
  - configurazione
slugs:
  - frequent-questions
  - static-rendering
---

# Rendering Statico vs Dinamico con i18n in Next.js

## Il problema con **next-intl**

- **Cosa succede?**
  Quando usi `useTranslations`, `getTranslations` o qualsiasi helper di next-intl _all'interno di un Componente Server_ in un'app con routing i18n (`/en/…`, `/fr/…`), Next.js marca l'intero percorso come **dinamico**. ([Next Intl][1])

- **Perché?**
  next-intl recupera la locale corrente da un header disponibile solo nella richiesta (`x-next-intl-locale`) tramite `headers()`. Poiché `headers()` è un'**API dinamica**, qualsiasi componente che la utilizza perde l'ottimizzazione statica. ([Next Intl][1], [Next.js][2])

- **Soluzione ufficiale (boilerplate)**
  1. Esporta `generateStaticParams` con ogni locale supportata.
  2. Chiama `setRequestLocale(locale)` in **ogni** layout/pagina _prima_ di chiamare `useTranslations`. ([Next Intl][1])
     Questo rimuove la dipendenza dall'header, ma ora hai codice extra da mantenere e un'API instabile in produzione.

## Come **intlayer** evita il problema

**Scelte di design**

1. **Solo parametro di rotta** – La locale proviene dal segmento URL `[locale]` che Next.js passa già a ogni pagina.
2. **Bundle a tempo di compilazione** – Le traduzioni sono importate come normali moduli ES, quindi vengono ottimizzate tramite tree-shaking e incorporate al momento della build.
3. **Nessuna API dinamica** – `useT()` legge dal contesto React, non da `headers()` o `cookies()`.
4. **Nessuna configurazione aggiuntiva** – Una volta che le tue pagine risiedono sotto `app/[locale]/`, Next.js prerenderizza automaticamente un file HTML per ogni locale.

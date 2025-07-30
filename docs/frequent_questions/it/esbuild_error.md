---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Errore ESBuild
description: Scopri come risolvere gli errori di ESBuild.
keywords:
  - esbuild
  - errore
  - intlayer
  - plugin
  - framework
  - next.js
  - vite
  - react-native
  - lynx
slugs:
  - doc
  - faq
  - esbuild-error
---

# Errore ESBuild

Se incontri un errore ESBuild durante il processo di build, è probabile che il plugin Intlayer non sia stato configurato correttamente.

ESBuild è responsabile della lettura dei file di dichiarazione del contenuto (`.content.{ts,js,mjs,cjs,json}`) e della generazione dei dizionari corrispondenti nella cartella `.intlayer/dictionary`. Inoltre, legge il file di configurazione (`intlayer.config.ts`).

Intlayer fornisce plugin per integrarsi con i tuoi bundler. È progettato per aliasare componenti che devono essere eseguiti solo sul lato server.

Se stai utilizzando un framework come Next.js (Webpack / Turbopack), Vite, React Native, Lynx, ecc., Intlayer fornisce un plugin che puoi utilizzare per integrare Intlayer nella tua applicazione. Consulta quindi la documentazione specifica del tuo framework per imparare come integrare il plugin.

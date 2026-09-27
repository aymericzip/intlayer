---
createdAt: 2025-05-20
updatedAt: 2026-09-27
priority: 4
title: "Jak naprawić błędy ESBuild z Intlayer"
description: "Napraw błędy ESBuild podczas builda Intlayer, zwykle spowodowane brakującym lub źle skonfigurowanym pluginem bundlera dla Twojego frameworka."
keywords:
  - esbuild
  - błąd
  - intlayer
  - wtyczka
  - framework
  - next.js
  - vite
  - react-native
  - lynx
slugs:
  - frequent-questions
  - esbuild-error
author: aymericzip
---

# Błąd ESBuild

Jeśli podczas procesu budowania napotkasz błąd ESBuild, prawdopodobnie wtyczka Intlayer nie została poprawnie skonfigurowana.

ESBuild odpowiada za odczytywanie plików deklaracji zawartości (`.content.{ts,js,mjs,cjs,json}`) oraz generowanie odpowiadających słowników w folderze `.intlayer/dictionary`. Odpowiada również za odczyt pliku konfiguracyjnego (`intlayer.config.ts`).

Intlayer dostarcza wtyczki do integracji z Twoimi bundlerami. Zostały one zaprojektowane do aliasowania komponentów, które mają działać wyłącznie po stronie serwera.

Jeśli używasz frameworka takiego jak Next.js (Webpack / Turbopack), Vite, React Native, Lynx itp., Intlayer udostępnia wtyczkę, którą możesz wykorzystać do integracji Intlayer z Twoją aplikacją. Odwołaj się więc do specyficznej dokumentacji swojego frameworka, aby dowiedzieć się, jak zintegrować tę wtyczkę.

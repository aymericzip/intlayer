---
createdAt: 2025-05-20
updatedAt: 2026-09-27
priority: 4
title: "ESBuild-Fehler mit Intlayer beheben"
description: "Beheben Sie ESBuild-Fehler beim Intlayer-Build, meist verursacht durch ein fehlendes oder falsch konfiguriertes Bundler-Plugin für Ihr Framework."
keywords:
  - esbuild
  - fehler
  - intlayer
  - plugin
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

# ESBuild-Fehler

Wenn Sie während des Build-Prozesses auf einen ESBuild-Fehler stoßen, liegt dies wahrscheinlich daran, dass das Intlayer-Plugin nicht korrekt konfiguriert wurde.

ESBuild ist dafür verantwortlich, die Inhaltsdeklarationsdateien (`.content.{ts,js,mjs,cjs,json}`) zu lesen und die entsprechenden Wörterbücher im Ordner `.intlayer/dictionary` zu generieren. Ebenso liest es die Konfigurationsdatei (`intlayer.config.ts`).

Intlayer stellt Plugins zur Integration mit Ihren Bundlern bereit. Es ist darauf ausgelegt, Komponenten zu aliasieren, die ausschließlich auf der Serverseite ausgeführt werden sollen.

Wenn Sie ein Framework wie Next.js (Webpack / Turbopack), Vite, React Native, Lynx usw. verwenden, stellt Intlayer ein Plugin bereit, das Sie zur Integration von Intlayer in Ihre Anwendung verwenden können. Konsultieren Sie daher die spezifische Dokumentation Ihres Frameworks, um zu erfahren, wie Sie das Plugin integrieren können.

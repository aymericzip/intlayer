---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: ESBuild-Fehler
description: Erfahren Sie, wie Sie ESBuild-Fehler beheben können.
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
---

# ESBuild-Fehler

Wenn Sie während des Build-Prozesses auf einen ESBuild-Fehler stoßen, liegt dies wahrscheinlich daran, dass das Intlayer-Plugin nicht korrekt konfiguriert wurde.

ESBuild ist dafür verantwortlich, die Inhaltsdeklarationsdateien (`.content.{ts,js,mjs,cjs,json}`) zu lesen und die entsprechenden Wörterbücher im Ordner `.intlayer/dictionary` zu generieren. Ebenso liest es die Konfigurationsdatei (`intlayer.config.ts`).

Intlayer stellt Plugins zur Integration mit Ihren Bundlern bereit. Es ist darauf ausgelegt, Komponenten zu aliasieren, die ausschließlich auf der Serverseite ausgeführt werden sollen.

Wenn Sie ein Framework wie Next.js (Webpack / Turbopack), Vite, React Native, Lynx usw. verwenden, stellt Intlayer ein Plugin bereit, das Sie zur Integration von Intlayer in Ihre Anwendung verwenden können. Konsultieren Sie daher die spezifische Dokumentation Ihres Frameworks, um zu erfahren, wie Sie das Plugin integrieren können.

---
createdAt: 2025-05-20
updatedAt: 2026-09-27
priority: 4
title: "Corriger les erreurs ESBuild avec Intlayer"
description: "Corrigez les erreurs ESBuild pendant un build Intlayer, souvent dues à un plugin de bundler absent ou mal configuré pour votre framework."
keywords:
  - esbuild
  - erreur
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

# Erreur ESBuild

Si vous rencontrez une erreur ESBuild lors du processus de compilation, il est probable que le plugin Intlayer n'ait pas été configuré correctement.

ESBuild est responsable de la lecture des fichiers de déclaration de contenu (`.content.{ts,js,mjs,cjs,json}`) et de la génération des dictionnaires correspondants dans le dossier `.intlayer/dictionary`. Il lit également le fichier de configuration (`intlayer.config.ts`).

Intlayer fournit des plugins pour s'intégrer à vos bundlers. Il est conçu pour aliaser les composants destinés à s'exécuter uniquement côté serveur.

Si vous utilisez un framework comme Next.js (Webpack / Turbopack), Vite, React Native, Lynx, etc., Intlayer propose un plugin que vous pouvez utiliser pour intégrer Intlayer dans votre application. Référez-vous donc à la documentation spécifique de votre framework pour apprendre comment intégrer le plugin.

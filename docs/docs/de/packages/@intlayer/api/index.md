---
docName: packages__intlayer__api
url: https://intlayer.org/doc/packages/intlayer/api
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/@intlayer/api/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/api - SDK für die Intlayer API-Integration
description: NPM-Paket, das ein Software Development Kit (SDK) bereitstellt, um mit der Intlayer API für Inhaltsprüfung, Organisationen, Projekte und Benutzerverwaltung zu interagieren.
keywords:
  - intlayer
  - API
  - SDK
  - integration
  - inhaltsprüfung
  - organisationen
  - projekte
  - JavaScript
---

# @intlayer/api: NPM-Paket zur Interaktion mit der Intlayer API

**Intlayer** ist eine Sammlung von Paketen, die speziell für JavaScript-Entwickler entwickelt wurden. Es ist kompatibel mit Frameworks wie React, React und Express.js.

**`@intlayer/api`**-Paket ist ein SDK (Software Development Kit), um mit der Intlayer API zu interagieren. Es stellt eine Reihe von Funktionen bereit, um Inhaltsdeklarationen zu prüfen, mit Organisationen, Projekten und Benutzern zu interagieren usw.

## Verwendung

```ts
import { intlayerAPI } from "@intlayer/api";

intlayerAPI.user.getUser({
  ids: ["user-id-1", "user-id-2"],
});
```

## Installation

Installieren Sie das erforderliche Paket mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

## Dokumentationsverlauf

- 5.5.10 - 2025-06-29: Anfangshistorie

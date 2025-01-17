# @intlayer/api: NPM-Paket zur Interaktion mit der Intlayer-API

**Intlayer** ist eine Suite von Paketen, die speziell für JavaScript-Entwickler entwickelt wurden. Es ist kompatibel mit Frameworks wie React, React und Express.js.

Das **`@intlayer/api`**-Paket ist ein SDK (Software Development Kit) zur Interaktion mit der Intlayer-API. Es bietet eine Reihe von Funktionen zur Überprüfung der Inhaltsdeklaration, zur Interaktion mit Organisationen, Projekten und Benutzern usw.

## Verwendung

```ts
import { intlayerAPI } from "@intlayer/api";

// Benutzer-API abrufen
intlayerAPI.user.getUser({
  ids: ["user-id-1", "user-id-2"],
});
```

## Installation

Installieren Sie das notwendige Paket mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

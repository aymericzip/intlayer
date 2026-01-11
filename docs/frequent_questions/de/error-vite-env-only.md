---
createdAt: 2026-01-11
updatedAt: 2026-01-11
title: "`vite-env-only` & Intlayer – falsch-positiver `node:fs`-Verweigerungsfehler"
description: Warum vite-env-only einen verweigerten `node:fs`-Import mit Intlayer + React-Router + Vite meldet und was zu tun ist.
keywords:
  - intlayer
  - vite
  - react-router
  - vite-env-only
  - node:fs
  - Import verweigert
  - Alias
  - Client-Bundle
slugs:
  - frequent-questions
  - vite-env-only-node-fs-false-positive
---

# vite-env-only verweigert `node:fs` mit Intlayer

Wenn du das **vite-env-only**-Plugin verwendet hast (wie in älteren Empfehlungen von React-Router v7 erwähnt) und Folgendes siehst:

```bash

Error: [vite-env-only] Import denied

* Denied by specifier pattern: /^node:/
* Importer: index.html
* Import: "node:fs"

```

…auch wenn sich **kein `node:fs` in deinem Client-Bundle** befindet, handelt es sich um ein **false positive**.

## Was verursacht es

`vite-env-only` führt eine Babel-basierte Prüfung **früh während der Vite-Graphauflösung** durch, _bevor_:

- aliasing (einschließlich Intlayer’s browser vs node mappings),
- Dead-Code-Elimination,
- SSR- vs. Client-Auflösung,
- virtuelle Module wie die von React-Router.

Intlayer-Pakete enthalten Code, der sowohl in Node als auch im Browser funktionieren kann. In einem _zwischenzeitlichen_ Stadium kann ein Node-Builtin wie `node:fs` im Graph erscheinen, **bevor** Vite es aus dem Client-Build entfernt. `vite-env-only` erkennt das und löst sofort einen Fehler aus, obwohl das finale Bundle es nicht enthält.

## React-Router und Server-Module

In der React-Router-Dokumentation zu den **Konventionen für Server-Module**
(https://reactrouter.com/api/framework-conventions/server-modules), das Team **empfiehlt ausdrücklich die Verwendung von `vite-env-only`**, um zu verhindern, dass serverseitige Importe in das Client-Bundle gelangen.

Diese Konventionen beruhen jedoch auf Vites Aliasing, conditional exports und tree-shaking, um serverseitigen Code zu entfernen. Während Aliasing und conditional exports bereits angewendet werden, sind einige Node-basierte Hilfsfunktionen zu diesem Zeitpunkt in Paketen wie `@intlayer/core` noch vorhanden (obwohl sie im Client niemals importiert werden). Da das tree-shaking noch nicht ausgeführt wurde, werden diese Funktionen weiterhin von Babel geparst, und `vite-env-only` erkennt deren `node:`-Importe und meldet einen False Positive — obwohl sie im finalen Client-Bundle korrekt entfernt werden.

## Wie man das behebt / umgeht

### Empfehlung: `vite-env-only` entfernen

Entfernen Sie einfach das Plugin. In vielen Fällen ist es nicht nötig — Vite unterscheidet bereits über seine eigene Auflösung zwischen Client- und Server-Imports.

Damit wird die fälschliche `node:fs`-Ablehnung behoben, ohne Änderungen an Intlayer.

### Stattdessen den finalen Build prüfen

Wenn Sie dennoch sicherstellen möchten, dass keine Node-Built-ins im Client landen, prüfen Sie dies **nach dem Build**, z. B.:

```bash
pnpm build
grep -R "node:" dist/
```

Wenn es keine Ergebnisse gibt, sind Ihre Client-Bundles sauber.

## Zusammenfassung

- `vite-env-only` kann bei `node:fs` einen Fehler melden, weil es zu früh prüft.
- Vite + Intlayer + die Server-Module-Konventionen von React-Router entfernen normalerweise Server-only-Referenzen korrekt.
- Das Entfernen des Plugins oder die Überprüfung der _finalen Ausgabe_ ist in der Regel die beste Lösung.

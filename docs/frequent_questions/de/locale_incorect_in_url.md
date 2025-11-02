---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Falsche Locale aus URL abgerufen
description: Erfahren Sie, wie Sie die falsche Locale, die aus der URL abgerufen wird, beheben können.
keywords:
  - locale
  - url
  - intlayer
  - next.js
  - vite
  - framework
  - middleware
  - konfiguration
  - prefixDefault
  - noPrefix
slugs:
  - frequent-questions
  - locale-incorect-in-url
---

# Falsche Locale aus URL abgerufen

## Problembeschreibung

Beim Versuch, den Locale-Parameter aus der URL abzurufen, kann es vorkommen, dass der Locale-Wert falsch ist:

```js
const { locale } = await params;
console.log(locale); // gibt "about" zurück anstelle der erwarteten Locale
```

## Lösung

### 1. Überprüfen Sie die Dateistruktur

Stellen Sie sicher, dass Ihr Next.js App-Router-Pfad dieser Struktur folgt:

```bash
src/app/[locale]/about/page.tsx
```

### 2. Überprüfen Sie die Middleware-Konfiguration

Das Problem tritt häufig auf, wenn die Middleware nicht vorhanden ist oder nicht ausgelöst wird. Die Middleware-Datei sollte sich befinden unter:

```bash
src/middleware.ts
```

Diese Middleware ist verantwortlich für das Umschreiben von Routen, wenn `prefixDefault` auf `false` gesetzt ist. Zum Beispiel schreibt sie `/en/about` in `/about` um.

### 3. URL-Muster basierend auf der Konfiguration

#### Standardkonfiguration (`prefixDefault: false`, `noPrefix: false`)

- Englisch: `/about`
- Französisch: `/fr/about`
- Spanisch: `/es/about`

#### Mit `prefixDefault: true`

- Englisch: `/en/about`
- Französisch: `/fr/about`
- Spanisch: `/es/about`

#### Mit `noPrefix: true`

- Englisch: `/about`
- Französisch: `/about`
- Spanisch: `/about`

src/app/[locale]/about/page.tsx

```
- Spanisch: `/es/about`

#### Mit `noPrefix: true`

- Englisch: `/about`
- Französisch: `/about`
- Spanisch: `/about`

Für weitere Details zu diesen Konfigurationsoptionen siehe die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).
```

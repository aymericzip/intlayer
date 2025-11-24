---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Konfiguration verwalten
description: Erfahren Sie, wie Sie Ihre Intlayer-Konfiguration abrufen und in das CMS hochladen.
keywords:
  - Konfiguration
  - Config
  - CLI
  - Intlayer
  - CMS
slugs:
  - doc
  - concept
  - cli
  - configuration
---

# Konfiguration verwalten

## Konfiguration abrufen

Der Befehl `configuration get` ruft die aktuelle Konfiguration für Intlayer ab, insbesondere die Locale-Einstellungen. Dies ist nützlich, um Ihre Einrichtung zu überprüfen.

```bash
npx intlayer configuration get
```

## Aliase:

- `npx intlayer config get`
- `npx intlayer conf get`

## Argumente:

- **`--env`**: Gibt die Umgebung an (z.B. `development`, `production`).
- **`--env-file`**: Gibt eine benutzerdefinierte Umgebungsdatei an, aus der Variablen geladen werden.
- **`--base-dir`**: Gibt das Basisverzeichnis für das Projekt an.
- **`--verbose`**: Aktiviert ausführliche Protokollierung zur Fehlerbehebung. (Standardmäßig über CLI auf true gesetzt)
- **`--no-cache`**: Deaktiviert den Cache.

## Konfiguration hochladen

Der Befehl `configuration push` lädt Ihre Konfiguration in das Intlayer CMS und den Editor hoch. Dieser Schritt ist notwendig, um die Verwendung entfernter Wörterbücher im Intlayer Visual Editor zu ermöglichen.

```bash
npx intlayer configuration push
```

## Aliase:

- `npx intlayer config push`
- `npx intlayer conf push`

## Argumente:

- **`--env`**: Gibt die Umgebung an (z.B. `development`, `production`).
- **`--env-file`**: Gibt eine benutzerdefinierte Umgebungsdatei an, aus der Variablen geladen werden.
- **`--base-dir`**: Gibt das Basisverzeichnis für das Projekt an.
- **`--verbose`**: Aktiviert ausführliche Protokollierung zur Fehlerbehebung. (Standardmäßig über CLI auf true gesetzt)
- **`--no-cache`**: Deaktiviert den Cache.

Durch das Hochladen der Konfiguration ist Ihr Projekt vollständig in das Intlayer CMS integriert, was eine nahtlose Verwaltung von Wörterbüchern über Teams hinweg ermöglicht.

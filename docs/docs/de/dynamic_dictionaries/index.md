---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: Dynamische Wörterbücher
description: Übersicht über die drei dynamischen Wörterbuchfunktionen von Intlayer — Sammlungen, Varianten und dynamische Einträge — zur Erstellung flexibler, zur Laufzeit gesteuerter i18n-Inhalte.
keywords:
  - Dynamische Wörterbücher
  - Sammlungen
  - Varianten
  - Dynamische Einträge
  - Intlayer
  - Internationalisierung
slugs:
  - doc
  - concept
  - dynamic-dictionaries
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Veröffentlichung der dynamischen Wörterbuchfunktion"
author: aymericzip
---

# Dynamische Wörterbücher

Intlayer unterstützt drei Mechanismen zur Darstellung von Inhalten, die über ein einzelnes statisches Wörterbuch pro Schlüssel hinausgehen. Jeder Mechanismus wird über ein **Metadatenfeld auf oberster Ebene** in der Inhaltsdatei deklariert; es ist keine Wrapper-Funktion erforderlich.

| Funktion                                                                                                                     | Metadatenfeld     | Selector in `useIntlayer` |
| ---------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------------------------- |
| [Sammlungen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/collections.md)              | `item: N`         | `{ item: N }`             |
| [Varianten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/variants.md)                  | `variant: "name"` | `{ variant: "name" }`     |
| [Dynamische Einträge](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/dynamic_content.md) | `meta: { id, … }` | `{ id, … }`               |

Alle drei lassen sich mit dem Locale-Argument kombinieren und unterstützen selektives / Lazy Loading via `importMode`.

<h2>Wann was zu verwenden ist</h2>

- **Sammlungen** — geordnete Liste von Elementen, die in separaten Dateien verwaltet werden (FAQ-Einträge, Blogbeiträge, Produkte).
- **Varianten** — benannte Inhaltsalternativen für A/B-Tests, saisonale Banner oder Feature-Flags.
- **Dynamische Einträge** — Inhalte, die zur Laufzeit über eine opake ID abgerufen werden (CMS-Einträge, benutzerspezifische Texte).

## Selektor-Eindeutigkeit

Wenn mehrere Selektoren für ein Wörterbuch vorhanden sind, ist die Reihenfolge der Auflösung:

```
variant → meta → item
```

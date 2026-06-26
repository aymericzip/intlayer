---
createdAt: 2026-06-12
updatedAt: 2026-06-26
title: Dynamische Wörterbücher
description: Überblick über die Funktionen für dynamische Wörterbücher von Intlayer — Sammlungen und Varianten — zum Erstellen flexibler, zur Laufzeit gesteuerter i18n-Inhalte.
keywords:
  - Dynamische Wörterbücher
  - Sammlungen
  - Varianten
  - Intlayer
  - Internationalisierung
slugs:
  - doc
  - concept
  - dynamic-dictionaries
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Veröffentlichung der Funktion für dynamische Wörterbücher"
  - version: 9.1.0
    date: 2026-06-26
    changes: "Dynamische Datensätze in Varianten zusammengeführt — `variant` akzeptiert jetzt einen String oder ein Objekt"
author: aymericzip
---

# Dynamische Wörterbücher

Intlayer unterstützt zwei Mechanismen, um Inhalte auszudrücken, die über ein einzelnes statisches Wörterbuch pro Schlüssel hinausgehen. Jeder wird über ein **Metadatenfeld auf oberster Ebene** in der Inhaltsdatei deklariert; es ist keine Wrapper-Funktion nötig.

| Funktion                                                                                                        | Metadatenfeld                             | Selektor in `useIntlayer`                         |
| --------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------- |
| [Sammlungen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/collections.md) | `item: N`                                 | `{ item: N }`                                     |
| [Varianten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/variants.md)     | `variant: "name"` _oder_ `variant: { … }` | `{ variant: "name" }` _oder_ `{ variant: { … } }` |

Beide lassen sich mit dem locale-Argument kombinieren und unterstützen selektives / verzögertes Laden über `importMode`.

## Wann was verwenden

- **Sammlungen** — geordnete Liste von Elementen, die in separaten Dateien verwaltet werden (FAQ-Einträge, Blogbeiträge, Produkte).
- **Varianten** — benannte oder strukturierte Inhaltsalternativen:
  - eine **String**-Variante für A/B-Tests, saisonale Banner oder Funktion-Flags;
  - eine **Objekt**-Variante für CMS-Datensätze, benutzerspezifische Inhalte oder beliebige Inhalte, die über eine Reihe von Feldern adressiert werden (die früheren „dynamischen Datensätze").

> Frühere Versionen boten ein separates `meta`-Feld für datensatzbasierte Inhalte. Es wurde in `variant` zusammengeführt: Übergeben Sie ein **Objekt** an `variant`, anstatt `meta` zu verwenden.

## Selektor-Disambiguierung

Ein Schlüssel kann beide Dimensionen gleichzeitig deklarieren (z. B. eine Sammlung, deren Elemente jeweils eine Variante haben). Sie werden in dieser Reihenfolge aufgelöst:

```
variant → item
```

So gibt `{ variant: "promo" }` bei einem Variant-×-Item-Schlüssel alle Promo-Elemente als Array zurück, und das Hinzufügen von `{ item: 2 }` grenzt es auf einen einzelnen Eintrag ein.

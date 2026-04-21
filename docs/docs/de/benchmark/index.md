---
createdAt: 2026-04-20
updatedAt: 2026-04-20
title: Benchmark i18n-Bibliotheken
description: Erfahren Sie, wie Intlayer im Vergleich zu anderen i18n-Bibliotheken in Bezug auf Performance und Bundle-Größe abschneidet.
keywords:
  - Benchmark
  - i18n
  - intl
  - nextjs
  - tanstack
  - intlayer
slugs:
  - doc
  - benchmark
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Benchmark initialisiert"
---

# Benchmark Bloom — Bericht

Benchmark Bloom ist eine Performance-Benchmark-Suite, die die realen Auswirkungen von i18n-Bibliotheken (Internationalisierung) über mehrere React-Frameworks und Ladestrategien hinweg misst.

Detaillierte Berichte und technische Dokumentationen für jedes Framework finden Sie unten:

- [**Next.js Benchmark-Bericht**](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/nextjs.md)
- [**TanStack Start Benchmark-Bericht**](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md)

---

## Aktuelle Ergebnisse

Besuchen Sie das [**interaktive Benchmark-Dashboard**](https://intlayer.org/benchmark) für Live-Vergleiche und zusammengefasste Daten.
| `scoped-dynamic` | Hoch (nahezu Null-Leakage) | Hoch |

Der Wechsel von `static` zu `scoped-dynamic` reduziert ungenutzte Inhalte in der Regel um 60–90 %, erfordert aber deutlich mehr Konfiguration. Bibliotheken wie Intlayer automatisieren das Scoped-Dynamic-Pattern, sodass Entwickler die Effizienz ohne den Boilerplate erhalten.

### Lesen von Leakage-Zahlen

Ein Page-Leakage von **35 %** bedeutet, dass 35 % des für diese Seite heruntergeladenen JavaScripts Strings von anderen Seiten enthalten – Inhalte, die der Benutzer auf dieser Seite nicht sehen kann. Auf einer 400-KB-Seite sind das ~140 KB vermeidbare Daten.

Ein Locale-Leakage von **10 %** bedeutet, dass 10 % des Bundles Übersetzungen in Sprachen enthalten, die der aktuelle Benutzer nicht verwendet.

### Reaktivität vs. Renderzeit

- **E2E-Reaktivität** misst das vollständige Benutzererlebnis: Netzwerk, Framework-Overhead, DOM-Update.
- **React Profiler-Zeit** isoliert die Kosten für den Re-Render des React-Trees.

Eine Bibliothek kann eine niedrige Profiler-Zeit, aber eine hohe E2E-Zeit haben, wenn der Sprachwechsel eine Netzwerkanfrage beinhaltet (Abrufen der neuen Sprachdatei). Umgekehrt kann eine Bibliothek eine hohe Profiler-Zeit haben, sich aber dennoch schnell anfühlen, wenn sie Updates effizient bündelt.

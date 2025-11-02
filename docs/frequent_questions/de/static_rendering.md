---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Statisches vs. dynamisches Rendering mit i18n in Next.js
description: Erfahren Sie, wie Sie statisches vs. dynamisches Rendering mit i18n in Next.js verwenden.
keywords:
  - statisch
  - dynamisch
  - rendering
  - i18n
  - next.js
  - next-intl
  - intlayer
  - framework
  - middleware
  - konfiguration
slugs:
  - frequent-questions
  - static-rendering
---

# Statisches vs. dynamisches Rendering mit i18n in Next.js

## Das Problem mit **next-intl**

- **Was passiert?**
  Wenn Sie `useTranslations`, `getTranslations` oder einen anderen next-intl-Helfer _innerhalb einer Server-Komponente_ in einer i18n-gerouteten App (`/en/…`, `/fr/…`) verwenden, markiert Next.js die gesamte Route als **dynamisch**. ([Next Intl][1])

- **Warum?**
  next-intl liest die aktuelle Locale aus einem nur bei der Anfrage verfügbaren Header (`x-next-intl-locale`) über `headers()` aus. Da `headers()` eine **dynamische API** ist, verliert jede Komponente, die darauf zugreift, die statische Optimierung. ([Next Intl][1], [Next.js][2])

- **Offizieller Workaround (Boilerplate)**
  1. Exportieren Sie `generateStaticParams` mit jeder unterstützten Locale.
  2. Rufen Sie `setRequestLocale(locale)` in **jedem** Layout/Seite _vor_ dem Aufruf von `useTranslations` auf. ([Next Intl][1])
     Dies entfernt die Abhängigkeit vom Header, aber Sie haben nun zusätzlichen Code zu pflegen und eine instabile API in der Produktion.

## Wie **intlayer** das Problem umgeht

**Designentscheidungen**

1. **Nur Routen-Parameter** – Die Locale stammt aus dem `[locale]` URL-Segment, das Next.js bereits an jede Seite übergibt.
2. **Kompilierungszeit-Bundles** – Übersetzungen werden als reguläre ES-Module importiert, sodass sie baumgeschüttelt und zur Build-Zeit eingebettet werden.
3. **Keine dynamischen APIs** – `useT()` liest aus dem React-Kontext, nicht aus `headers()` oder `cookies()`.
4. **Keine zusätzliche Konfiguration** – Sobald Ihre Seiten unter `app/[locale]/` liegen, rendert Next.js automatisch eine HTML-Datei pro Locale vor.

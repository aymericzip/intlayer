---
createdAt: 2026-02-09
updatedAt: 2026-03-03
title: Agent Skills
description: Erfahren Sie, wie Sie die Intlayer Agent Skills nutzen können, um das Verständnis Ihres AI-Agenten für Ihr Projekt zu verbessern, einschließlich umfassender Setup-Anleitungen für Metadaten, Sitemaps und Server-Aktionen.
keywords:
  - Intlayer
  - Agent Skills
  - AI Agent
  - Internationalisierung
  - Dokumentation
slugs:
  - doc
  - agent_skills
history:
  - version: 8.1.0
    date: 2026-02-09
    changes: Init history
---

# Agent Skills

## Setup

### CLI verwenden

Der Befehl `intlayer init skills` ist der am einfachsten Weg, um Agenten-Skills in Ihrem Projekt einzurichten. Er erkennt Ihre Umgebung und installiert die notwendigen Konfigurationsdateien für Ihre bevorzugten Plattformen.

```bash
npx intlayer init skills
```

### Vercel Skill SDK verwenden

```bash
npx skills add aymericzip/intlayer-skills
```

### VS Code Erweiterung verwenden

1. Öffnen Sie die Befehlspalette (Strg+Umschalt+P oder Cmd+Umschalt+P).
2. Geben Sie `Intlayer: Setup AI Agent Skills` ein.
3. Wählen Sie die Plattform, die Sie verwenden (z. B. `VS Code`, `Cursor`, `Windsurf`, `OpenCode`, `Claude Code`, `GitHub Copilot Workspace` usw.).
4. Wählen Sie die Skills aus, die Sie installieren möchten (z. B. `Next.js`, `React`, `Vite`, `Compiler`, `Configuration`).
5. Drücken Sie die Eingabetaste.

## Skills-Liste

**intlayer-config**

- Ermöglicht dem Agenten, die spezifischen i18n-Einstellungen Ihres Projekts zu verstehen, wodurch er Locales, Routing-Muster und Fallback-Strategien genau konfigurieren kann.

**intlayer-cli**

- Ermöglicht dem Agenten, Ihren Übersetzungslebenszyklus autonom zu verwalten, einschließlich der Prüfung fehlender Übersetzungen, des Aufbaus von Wörterbüchern und der Synchronisierung von Inhalten über die Kommandozeile.

**intlayer-angular**

- Statten Sie den Agenten mit Framework-spezifischem Fachwissen aus, um reaktive i18n-Muster und Signale gemäß den Best Practices von Angular korrekt zu implementieren.

**intlayer-astro**

- Vermittelt dem Agenten das Wissen für den Umgang mit serverseitigen Übersetzungen und lokalisierten Routing-Mustern, die für das Astro-Ökosystem spezifisch sind.

**intlayer-content**

- Lehrt den Agenten die Nutzung fortgeschrittener Inhaltsknoten – wie Pluralisierung, Bedingungen und Markdown – um reichhaltige, dynamische und lokalisierte Wörterbücher aufzubauen.

**intlayer-next-js**

- Verleiht dem Agenten die Tiefe, um i18n über Next.js Server- und Client-Komponenten hinweg zu implementieren und so SEO-Optimierung sowie nahtloses lokalisiertes Routing sicherzustellen.

**intlayer-react**

- Bietet dem Agenten spezialisiertes Wissen für die effiziente Implementierung deklarativer i18n-Komponenten und Hooks in jeder React-basierten Umgebung.

**intlayer-preact**

- Optimiert die Fähigkeit des Agenten, i18n für Preact zu implementieren, sodass er leichtgewichtige, lokalisierte Komponenten mit Signalen und effizienten reaktiven Mustern schreiben kann.

**intlayer-solid**

- Ermöglicht dem Agenten, die feinkörnige Reaktivität von SolidJS für ein leistungsstarkes, lokalisiertes Inhaltsmanagement zu nutzen.

**intlayer-svelte**

- Lehrt den Agenten Svelte-Stores und idiomatische Syntax für reaktive und typsichere lokalisierte Inhalte in Svelte- und SvelteKit-Apps zu verwenden.

**intlayer-cms**

- Ermöglicht dem Agenten die Integration und Verwaltung von Remote-Inhalten, sodass er Live-Synchronisierung und Remote-Übersetzungs-Workflows über das Intlayer CMS abwickeln kann.

**intlayer-usage**

- Standardisiert den Ansatz des Agenten für Projektstruktur und Inhaltsdeklaration und stellt sicher, dass er den effizientesten Workflows für Ihr i18n-Projekt folgt.

**intlayer-vue**

- Statten Sie den Agenten mit Vue-spezifischen Mustern aus – einschließlich Composables und Nuxt-Unterstützung –, um moderne, lokalisierte Webanwendungen zu erstellen.

**intlayer-compiler**

- Vereinfacht den Workflow des Agenten durch die automatische Inhaltsextraktion, sodass er übersetzbare Strings direkt in Ihren Code schreiben kann, ohne manuelle Wörterbuchdateien.

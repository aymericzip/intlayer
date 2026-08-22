---
createdAt: 2026-07-08
updatedAt: 2026-08-22
title: Intlayer Analytics | Inhalte nachverfolgen und A/B-Tests durchführen
description: Erfahren Sie, wie @intlayer/analytics Seiten-/Gebietsschema-Aufrufe und die Anzeige von Inhalten nachverfolgt und wie Sie damit A/B-Tests für Ihre Intlayer-Inhalte durchführen können.
keywords:
  - Analytics
  - A/B-Tests
  - Zielgruppe
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - analytics
history:
  - version: 9.3.3
    date: 2026-08-22
    changes: "Analytics standardmäßig aktivieren, sobald `@intlayer/analytics` installiert ist"
  - version: 9.0.0
    date: 2026-07-08
    changes: "Init doc — @intlayer/analytics Paket, Nachverfolgung auf Provider-/Node-Ebene, A/B-Tests, Dashboard"
author: aymericzip
---

# Intlayer Analytics Dokumentation

`@intlayer/analytics` ist ein optionales Begleitpaket, das Ihnen mitteilt, **welche Inhalte Ihren Besuchern tatsächlich angezeigt werden** — welche Seite, in welchem Gebietsschema (Locale) und welcher spezifische Teil des übersetzten Inhalts — damit Sie Ihr Publikum verstehen und **A/B-Tests für Inhalte** durchführen können.

## Inhaltsverzeichnis

<TOC/>

---

## Was es nachverfolgt

`@intlayer/analytics` bündelt drei Arten von anonymen Ereignissen:

| Ereignis           | Wo erfasst                                       | Was es Ihnen sagt                                                                                                                               |
| ------------------ | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `page_view`        | Provider-Ebene (`IntlayerProvider`)              | Welche Seite und welches Gebietsschema eine Sitzung beim ersten Laden, beim Routenwechsel oder Gebietsschema-Wechsel aufgerufen hat.            |
| `content_exposure` | Node-Ebene (`useIntlayer` / Interpreter-Plugins) | Welcher Wörterbuchschlüssel / Schlüsselpfad tatsächlich aufgelöst und angezeigt wurde — und, falls Teil eines Experiments, welche **Variante**. |
| `conversion`       | Überall dort, wo Sie `useConversion()` aufrufen  | Ein erreichtes Ziel (Anmeldung, Klick, Kauf...), das der A/B-Variante zugeschrieben wird, der die Sitzung ausgesetzt war.                       |

Ereignisse werden im Speicher gesammelt und als **einzelne Batch-Anfrage etwa alle 20 Sekunden** gesendet — niemals bei jedem Tastendruck oder Rendern — sodass die Analytik niemals die erste Renderzeit beeinträchtigt oder eine Anfrage pro Interaktion hinzufügt.

## Wie es A/B-Tests für Inhalte ermöglicht

Mit Intlayer können Sie bereits inhaltliche [Varianten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/index.md) deklarieren (z. B. ein `hero-banner` Wörterbuch mit einer `control` und einer `black_friday` Variante). `@intlayer/analytics` schließt den Kreis:

1. `getVariant(experimentKey, variants)` weist jede anonyme Sitzung deterministisch einer Variante zu — eine reine Funktion der Sitzungs-ID und des Experimentschlüssels, sodass die Zuweisung **über die gesamte Sitzung hinweg stabil** ist und **keine Server-Roundtrips** vor dem ersten Rendern erfordert (kein Flackern, keine Layout-Verschiebung).
2. Jedes `content_exposure` Ereignis enthält die `variant`, die angezeigt wurde.
3. Mit `useConversion()` können Sie dieser Variante ein Ziel (z. B. `"cta_click"`) zuschreiben.
4. Der Endpunkt für die Experimentergebnisse des Dashboards vergleicht die Konversionsraten pro Variante, einschließlich der statistischen Signifikanz (ein z-Test).

## Installation

`@intlayer/analytics` ist eine **optionale Abhängigkeit** jedes Framework-Pakets (`react-intlayer`, `next-intlayer`, `vue-intlayer`, …) und ist daher in den meisten Projekten bereits vorhanden. Installieren Sie es explizit, wenn Ihr Setup optionale Abhängigkeiten überspringt (`npm install --no-optional`, …):

```bash packageManager="npm"
npm install @intlayer/analytics
```

```bash packageManager="yarn"
yarn add @intlayer/analytics
```

```bash packageManager="pnpm"
pnpm add @intlayer/analytics
```

```bash packageManager="bun"
bun add @intlayer/analytics
```

Die Installation des Pakets genügt, um Analytics einzuschalten: `analytics.enabled` ist standardmäßig `true`, und `@intlayer/config` setzt es auf `false`, sobald das Paket in Ihrem Projekt nicht gefunden wird. Wenn Sie es nicht installieren, wird jeder Integrationspunkt in ein No-Op aufgelöst — siehe [Keine Kosten, wenn nicht installiert](#keine-kosten-wenn-nicht-installiert) unten.

## Konfiguration

Analytics benötigt keine Konfiguration, um zu starten: Es ist **standardmäßig aktiviert** und **verwendet den bestehenden `editor`-Konfigurationsblock** für Endpunkt und Projektschlüssel.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    backendURL: "https://back.intlayer.org", // Wird auch als Analytics-Ingestion-Endpunkt verwendet
    clientId: "your-client-id", // Wird auch als Analytics-Projektschlüssel verwendet
    clientSecret: "your-client-secret",
  },
};

export default config;
```

- `editor.backendURL` — die Basis-URL, an die Analytics-Ereignisse gesendet werden (`POST {backendURL}/api/analytics/events`).
- `editor.clientId` — der öffentliche Projektschlüssel, der jedem aufgenommenen Ereignis zugeschrieben wird. Es fungiert auch als **Aktivierungsschalter**: Analytics bleibt vollständig deaktiviert (und als Dead-Code eliminiert, siehe unten), bis `clientId` konfiguriert ist.

Wenn Sie Intlayer selbst hosten, verweist die Analytik automatisch auf Ihre eigene Instanz, da sie `editor.backendURL` teilt.

### Deaktivieren (Opt-out)

Der optionale `analytics`-Block steuert die Erfassung — oder schaltet sie ab:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  analytics: {
    enabled: false, // Standard: true — nimmt die gesamte Integration aus dem Bundle
    flushInterval: 20_000, // Millisekunden zwischen zwei gebündelten Übertragungen
    sampleRate: 1, // Anteil der aufgezeichneten Sitzungen, von 0 (keine) bis 1 (alle)
  },
};

export default config;
```

Das Deinstallieren von `@intlayer/analytics` hat dieselbe Wirkung wie `enabled: false`. Die vollständige Feldliste finden Sie in der [Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

## Framework-Unterstützung

Analytics ist mit dem freigegebenen `IntlayerProvider` von `react-intlayer` verdrahtet und steht daher heute überall dort zur Verfügung, wo dieser Provider verwendet wird:

| Framework                                                | Status                                                                                            |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| React                                                    | ✅ Verfügbar                                                                                      |
| Next.js (`next-intlayer`)                                | ✅ Verfügbar (über `react-intlayer`)                                                              |
| React Native / Expo (`react-native-intlayer`)            | ✅ Verfügbar (über `react-intlayer`)                                                              |
| Vue, Svelte, Angular, Solid, Preact, Lit, Astro, Vanilla | 🚧 Geplant — gleicher Client, Provider-Level-Bindungen nach dem `@intlayer/editor` Rollout-Muster |

## Verwendung

### Automatische Nachverfolgung auf Provider-Ebene

Es sind keine Codeänderungen erforderlich. Sobald `@intlayer/analytics` installiert und `editor.clientId` konfiguriert ist, führt der `IntlayerProvider` automatisch Folgendes aus:

- initialisiert den Analytics-Client beim Mounten,
- zeichnet einen `page_view` beim ersten Laden auf,
- zeichnet einen `page_view` bei jedem Gebietsschema-Wechsel auf,
- startet die ca. 20-sekündige Flush-Schleife und flusht verbleibende Ereignisse beim Unmounten / Schließen des Tabs (über `navigator.sendBeacon`, andernfalls `fetch(..., { keepalive: true })`).

### Automatische Nachverfolgung auf Node-Ebene

Jedes Mal, wenn `useIntlayer` einen Inhalt zur Anzeige auflöst, meldet der Interpreter ein `content_exposure` Ereignis für genau diese `dictionaryKey` + Schlüsselpfad + Gebietsschema — auch hier sind keine Codeänderungen erforderlich. Wiederholte Expositionen desselben Knotens innerhalb eines Flush-Fensters werden zu einem einzigen Ereignis mit einem `count` zusammengefasst, sodass eine Liste, die 50 Mal neu gerendert wird, nicht 50 Ereignisse sendet.

### Nachverfolgung von Konversionen für A/B-Tests

Verwenden Sie `useConversion()`, um einer Variante, die eine Sitzung gesehen hat, ein Ziel zuzuschreiben:

```tsx fileName="CTAButton.tsx" codeFormat="tsx"
import { useConversion } from "react-intlayer";

const CTAButton = () => {
  const trackConversion = useConversion();

  return (
    <button
      onClick={() =>
        trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        })
      }
    >
      Loslegen
    </button>
  );
};
```

### Auflösung einer Variante auf der Clientseite

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

## Datenschutz & Leistung

- **Anonym durch Design**: Sitzungen werden durch eine rotierende ID identifiziert; das Backend speichert nur einen **SHA-256-Hash** dieser ID — niemals die rohe ID, niemals eine IP-Adresse.
- **Standort ist grob**: nur ein Ländercode, der aus CDN-Geolokalisierungs-Headern (`cf-ipcountry`, `x-vercel-ip-country`, ...) abgeleitet wird — es wird keine IP gelesen oder gespeichert.
- **URLs schließen Suchparameter aus**: standardmäßig werden Query-Strings nie erfasst.
- **Sampling**: `sampleRate` ermöglicht es Ihnen, bei Traffic-starken Apps nur einen Bruchteil der Content-Exposure-Ereignisse zu behalten.
- **Gepoolt**: eine Anfrage ungefähr alle 20 Sekunden (`flushInterval`), oder früher, wenn der Puffer voll ist (`maxBufferSize`) — niemals eine Anfrage pro Ereignis.

### Keine Kosten, wenn nicht installiert

`@intlayer/analytics` folgt genau dem gleichen optionalen Abhängigkeitsmuster wie `@intlayer/editor`:

- Jeder Integrationspunkt lädt das Paket über einen **dynamischen `import()` umhüllt in `try/catch`** — eine App, die `@intlayer/analytics` nie installiert, zahlt weder für Bundle-Größe noch Laufzeitkosten und sieht nie einen Fehler;
- eine Compile-Zeit-Umgebungsvariable (`INTLAYER_ANALYTICS_ENABLED`), die von `@intlayer/config` automatisch auf `'false'` gesetzt wird, wenn das Paket nicht installiert ist, `analytics.enabled` `false` ist oder `editor.clientId` nicht konfiguriert ist, ermöglicht Bundlern die **Dead-Code-Elimination** der gesamten Integration;
- Analytics ist im Intlayer Editor/CMS-Vorschau-Iframe deaktiviert, sodass Editor-Sitzungen niemals als echter Traffic gewertet werden.

## Dashboard: Analytics-Seite

Sobald Ihr Projekt Ereignisse gesammelt hat, zeigt die Seite **Analytics** im [Intlayer Dashboard](https://app.intlayer.org/analytics) (sichtbar in der Seitenleiste, sobald ein Projekt ausgewählt ist) Folgendes an:

- **Aktive Nutzer** — eindeutige Besucher über das ausgewählte rollierende Zeitfenster (7 / 30 / 90 Tage).
- **Nutzer heute** und **Nutzer in den letzten 7 Tagen**.
- **Seitenaufrufe** über das ausgewählte Zeitfenster.
- Ein **Verlaufsdiagramm** der täglichen eindeutigen Besucher.
- Registerkarten für die Aufschlüsselung nach **Gebietsschemas (Locales)** und **Standort**, die Ihre Zielgruppe nach Gebietsschema und Land einordnen.

## Backend-API-Referenz

Alle Lese-Endpunkte erfordern Authentifizierung; die Ingestion ist öffentlich und wird durch `clientId` zugeordnet.

| Methode | Endpunkt                                    | Beschreibung                                                                                |
| ------- | ------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `POST`  | `/api/analytics/events`                     | Aufnahme eines Batches von Ereignissen (öffentlich, zugewiesen durch `clientId` im Body).   |
| `GET`   | `/api/analytics/overview`                   | Seiten-/Gebietsschema-Gesamtwerte für das authentifizierte Projekt.                         |
| `GET`   | `/api/analytics/audience?days=30`           | Eindeutige Besucher, Seitenaufrufe, Tagesserien, Gebietsschema- + Länder-Aufschlüsselungen. |
| `GET`   | `/api/analytics/content-stats`              | Content-Exposure-Gesamtwerte, gruppiert nach Wörterbuchschlüssel / Pfad / Gebietsschema.    |
| `GET`   | `/api/analytics/experiments/:experimentKey` | Konversionsraten pro Variante und statistische Signifikanz für ein A/B-Experiment.          |

Sie können diese auch programmgesteuert mit dem [CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) aufrufen:

```ts fileName="analytics.ts"
import { createIntlayerCMS } from "@intlayer/api";
import { analyticsEndpoint } from "@intlayer/api/analytics";

const cms = createIntlayerCMS();

const { data: audience } = await analyticsEndpoint(cms).getAudience(30);
```

## Nützliche Links

- [Dynamische Wörterbücher - Kollektionen & Varianten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md)
- [Intlayer Visueller Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md)
- [Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)
- [Self-Hosting-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md)

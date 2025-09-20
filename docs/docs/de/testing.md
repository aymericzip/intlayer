---
createdAt: 2025-03-01
updatedAt: 2025-09-20
title: Testen Ihres Inhalts
description: Entdecken Sie, wie Sie Ihre Inhalte mit Intlayer testen können.
keywords:
  - Testen
  - Intlayer
  - Internationalisierung
  - CMS
  - Content-Management-System
  - Visueller Editor
slugs:
  - doc
  - testing
---

# Testen Ihres Inhalts

Dieser Leitfaden zeigt, wie Sie automatisch überprüfen können, ob Ihre Wörterbücher vollständig sind, fehlende Übersetzungen vor der Veröffentlichung erkennen und die lokalisierte Benutzeroberfläche in Ihrer App testen.

---

## Was Sie testen können

- **Fehlende Übersetzungen**: CI schlägt fehl, wenn für ein Wörterbuch erforderliche Sprachversionen fehlen.
- **Lokalisierte UI-Darstellung**: Komponenten mit einem bestimmten Sprachprovider rendern und sichtbaren Text/Attribute überprüfen.
- **Build-Zeit Prüfungen**: Führen Sie lokal eine schnelle Prüfung über die CLI durch.

---

## Schnellstart: Prüfung über CLI

Führen Sie die Prüfung vom Projektstammverzeichnis aus durch:

```bash
npx intlayer content test
```

Nützliche Optionen:

- `--env-file [Pfad]`: lädt Umgebungsvariablen aus einer Datei.
- `-e, --env [Name]`: wählt ein Umgebungsprofil aus.
- `--base-dir [Pfad]`: legt das Basisverzeichnis der App für die Auflösung fest.
- `--verbose`: zeigt ausführliche Protokolle an.
- `--prefix [Label]`: fügt den Protokollzeilen ein Präfix hinzu.

Hinweis: Die CLI gibt einen detaillierten Bericht aus, beendet sich jedoch bei Fehlern nicht mit einem Fehlercode. Für CI-Gates fügen Sie einen Unit-Test (siehe unten) hinzu, der sicherstellt, dass keine erforderlichen Sprachversionen fehlen.

---

## Programmatischer Test (Vitest/Jest)

Verwenden Sie die Intlayer CLI API, um sicherzustellen, dass keine Übersetzungen für Ihre erforderlichen Sprachversionen fehlen.

```ts fileName=i18n.test.ts
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("Übersetzungen", () => {
  it("hat keine fehlenden erforderlichen Sprachversionen", () => {
    const result = listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      // Hilfreich, wenn der Test lokal oder in CI fehlschlägt
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Jest-Äquivalent:

```ts fileName=i18n.test.ts
import { listMissingTranslations } from "intlayer/cli";

test("hat keine fehlenden erforderlichen Sprachversionen", () => {
  const result = listMissingTranslations();

  if (result.missingRequiredLocales.length > 0) {
    // eslint-disable-next-line no-console
    console.log(result.missingTranslations);
  }

  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

Wie es funktioniert:

- Intlayer liest Ihre Konfiguration (locales, requiredLocales) und deklarierte Wörterbücher aus und meldet dann:
  - `missingTranslations`: pro Schlüssel, welche Sprachversionen fehlen und aus welcher Datei.
  - `missingLocales`: Vereinigung aller fehlenden Sprachversionen.
  - `missingRequiredLocales`: Teilmenge beschränkt auf `requiredLocales` (oder alle Sprachversionen, wenn `requiredLocales` nicht gesetzt ist).

---

## Testen der lokalisierten Benutzeroberfläche (React / Next.js)

Rendern Sie Komponenten unter einem Intlayer-Provider und prüfen Sie den sichtbaren Inhalt.

React-Beispiel (Testing Library):

```tsx
import { IntlayerProvider } from "react-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

test("renders localized title in English", () => {
  render(
    <IntlayerProvider locale="en-US">
      <MyComponent />
    </IntlayerProvider>
  );

  expect(screen.getByText("Erwarteter englischer Titel")).toBeInTheDocument();
});
```

Next.js (App Router) Beispiel: Verwenden Sie den Framework-Wrapper:

```tsx
import { IntlayerClientProvider } from "next-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyPage } from "./MyPage";

test("rendert lokalisierten Überschrift auf Französisch", () => {
  render(
    <IntlayerClientProvider locale="fr-FR">
      <MyPage />
    </IntlayerClientProvider>
  );
  expect(
    screen.getByRole("heading", { name: "Titre attendu" })
  ).toBeInTheDocument();
});
```

Tipps:

- Wenn Sie rohe Zeichenkettenwerte für Attribute benötigen (z. B. `aria-label`), greifen Sie auf das `.value`-Feld zu, das von `useIntlayer` in React zurückgegeben wird.
- Behalten Sie Wörterbücher in der Nähe der Komponenten für einfachere Unit-Tests und Bereinigung bei.

---

## Kontinuierliche Integration

Fügen Sie einen Test hinzu, der den Build fehlschlagen lässt, wenn erforderliche Übersetzungen fehlen.

`package.json`:

```json
{
  "scripts": {
    "test:i18n": "vitest run -c"
  }
}
```

GitHub Actions Beispiel:

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run test:i18n
```

Optional: Führen Sie die CLI-Prüfung für eine menschenlesbare Zusammenfassung neben den Tests aus:

```bash
npx intlayer content test --verbose
```

---

## Fehlerbehebung

- Stellen Sie sicher, dass Ihre Intlayer-Konfiguration `locales` und (optional) `requiredLocales` definiert.
- Wenn Ihre Anwendung dynamische oder entfernte Wörterbücher verwendet, führen Sie die Tests in einer Umgebung aus, in der die Wörterbücher verfügbar sind.
- Für gemischte Monorepos verwenden Sie `--base-dir`, um die CLI auf das richtige Anwendungs-Stammverzeichnis zu verweisen.

---

## Dokumentationsverlauf

| Version | Datum      | Änderungen           |
| ------- | ---------- | -------------------- |
| 6.0.0   | 2025-09-20 | Einführung von Tests |

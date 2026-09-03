---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Übersetzungen in CI/CD automatisieren ohne fehlerhafte Texte auszuliefern"
description: Drei Ebenen zur i18n-Automatisierung, Pre-Push, Pull Request und Laufzeit. Wie man Builds über Abdeckung absichert, sicher automatisch befüllt und endlose CI-Commit-Schleifen vermeidet.
keywords:
  - übersetzungen automatisieren ci
  - i18n ci cd
  - github actions übersetzungen
  - husky pre-push
  - kontinuierliche lokalisierung
  - translation pipeline
slugs:
  - blog
  - i18n-in-ci-cd-pipelines
author: aymericzip
---

# Übersetzungen in CI/CD automatisieren ohne fehlerhafte Texte auszuliefern

Manuelle Übersetzung hält modernen Release-Zyklen nicht stand. Jemand fügt am Freitag einen String hinzu, der Export erfolgt im nächsten Sprint, und bis dahin hinken drei weitere Sprachen hinterher. Die Automatisierung an sich ist unkompliziert. Sie so zu gestalten, dass nicht unbemerkt maschinell erzeugte Texte vor die Augen von Kunden geraten, ist der entscheidende Punkt.

## Inhaltsverzeichnis

<TOC/>

## Keine Migration erforderlich zur Automatisierung

Die folgenden Pipeline-Architekturen sind bibliotheksunabhängig, genau wie die verwendeten Werkzeuge. Wenn Ihre Nachrichten in JSON-Katalogen für i18next, next-intl, react-intl, vue-i18n oder next-translate liegen, liest und schreibt das [Sync JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md) diese Dateien direkt an Ort und Stelle:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // oder "icu" für next-intl / react-intl
    }),
  ],
};

export default config;
```

Ihre Anwendung importiert weiterhin genau das, was sie bisher importiert hat. Die nachfolgenden CI-Jobs befüllen und überwachen Ihre vorhandenen Kataloge, und das Diff, das ein Reviewer sieht, betrifft `locales/fr/checkout.json` und keine Architekturmigration. Es gibt auch ein [Sync PO-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-po.md) für gettext-Workflows sowie [Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md), um die gewohnte Runtime-API beizubehalten.

## Die Schranke (Gate) vom Befüllen (Fill) trennen

Zwei unterschiedliche Aufgaben werden ständig verwechselt.

Ein **Gate** ist eine Prüfung, die fehlschlägt. Sie besagt, dass dieser Build nicht freigegeben werden darf, weil erforderliche Sprachen unvollständig sind. Ein Gate schreibt keine Dateien.

Ein **Fill** ist eine Mutation. Er generiert die fehlenden Übersetzungen und committet sie. Ein Fill lässt einen Build niemals fehlschlagen.

Führt man nur einen Fill aus, wird niemals etwas blockiert, und ungesehene maschinelle Übersetzungen gelangen ungeprüft in Produktion. Führt man nur ein Gate aus, schlägt der Build fehl und ein Entwickler muss jedes Mal manuell eingreifen. Die meisten Teams kombinieren beides an getrennten Auslösern: Fill bei einem Pull Request, Gate beim Merge in den Release-Branch.

## Wo Automatisierung stattfinden kann

| Phase          | Auslöser    | Geeignet für                              | Kosten                                          |
| :------------- | :---------- | :---------------------------------------- | :---------------------------------------------- |
| Pre-Push-Hook  | Lokales Git | Schnelles Feedback, keine CI-Minuten      | Läuft auf dem Entwickler-Rechner mit dessen Key |
| Pull Request   | CI-Job      | Review vor dem Merge, ein Ort für Secrets | CI-Minuten plus Modellaufrufe pro PR            |
| Release-Branch | CI-Job      | Harte Schranke bezüglich Abdeckung        | Günstig, keine Modellaufrufe                    |
| Laufzeit       | CMS         | Inhaltsänderungen ohne Rebuild            | Gehostete Abhängigkeit                          |

## Pre-Push: Der schnellste Zyklus

Husky führt das Befüllen aus, bevor der Code die lokale Maschine verlässt, sodass Übersetzungen im selben Push ankommen wie die neuen Strings.

```bash fileName=".husky/pre-push"
npx intlayer build
npx intlayer fill --unpushed --mode complete
```

`--unpushed` beschränkt die Arbeit auf noch nicht gepushte Inhalte, wodurch der Vorgang nicht bei jedem Push eine Minute dauert. `--mode complete` befüllt nur das, was fehlt, ohne bestehende Übersetzungen zu überschreiben, sodass bereits überprüfte Texte nicht verloren gehen.

In einem Monorepo grenzen Sie jede Anwendung ab:

```bash fileName=".husky/pre-push"
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode complete
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode complete
```

Der Nachteil liegt auf der Hand: Jeder Entwickler benötigt einen API-Key, und die Kosten trägt derjenige, der pusht. Deshalb verlagern die meisten Teams diesen Schritt in die CI, sobald das Team wächst.

## Pull Request: Befüllen dort, wo das Review stattfindet

Derselbe Ablauf in GitHub Actions, begrenzt auf das Git-Diff:

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
on:
  pull_request:
    branches: ["main"]

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: "autofill-${{ github.ref }}"
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      AI_PROVIDER: openai
      AI_MODEL: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}
    steps:
      - uses: actions/checkout@v4
        with:
          persist-credentials: true
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npx intlayer build
      - run: npx intlayer fill --git-diff --mode complete --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY
      - name: Commit
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            git config --local user.email "action@github.com"
            git config --local user.name "GitHub Action"
            git add .
            git commit -m "chore: auto-fill missing translations [skip ci]"
            git push origin HEAD:${{ github.head_ref }}
          fi
```

Vier Details sind hier essenziell:

- **`fetch-depth: 0`** ist erforderlich, damit `--git-diff` funktioniert. Ein flacher Klon hat keine Basis für ein Diff, und der Vorgang befüllt stillschweigend nichts.
- **`[skip ci]` in der Commit-Nachricht** verhindert, dass sich der Workflow endlos selbst auslöst. Ohne diesen Zusatz committet der Job, startet einen neuen CI-Lauf, der wieder committet, der klassische Weg, um das CI-Budget über Nacht zu leeren.
- **`concurrency` mit `cancel-in-progress`** stoppt konkurrierende Pushes daran, gleichzeitig in dieselben Dateien zu schreiben.
- **`--git-diff`** beschränkt die Generierung auf die Änderungen im PR. Ohne dieses Flag wird bei jedem Durchlauf der gesamte Katalog neu übersetzt.

Die Übersetzungen landen als Commit direkt auf dem PR-Branch, sodass der Reviewer sie im Diff begutachten kann. Genau darin liegt der Vorteil gegenüber einer Generierung nach dem Merge.

## Release-Branch: Das Gate

Das Gate benötigt keinen Modellzugriff und muss schnell sein.

```yaml fileName=".github/workflows/ci.yml"
- run: npm run test:i18n
```

Abgesichert durch einen Test, der die Abdeckung per Assertion prüft, statt sich auf Terminal-Ausgaben zu verlassen:

```ts fileName="i18n.test.ts"
import { listMissingTranslations } from "intlayer/cli";

test("hat keine fehlenden erforderlichen Locales", async () => {
  const result = await listMissingTranslations();
  if (result.missingRequiredLocales.length > 0) {
    console.log(result.missingTranslations);
  }
  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

`npx intlayer content test` gibt einen Bericht aus, beendet sich aber mit Status 0, informiert also nur, ohne den Build anzuhalten. Nutzen Sie es lokal; nutzen Sie den Assertion-Test in der CI. Mehr dazu in [Fehlende Übersetzungen aufspüren](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/detecting_missing_translations.md).

## `requiredLocales` macht das Gate alltagstauglich

Ein Gate, das alle achtzehn Sprachen als vollständig verlangt, blockiert jeden Release, bis die letzte Sprache fertig ist, und wird innerhalb eines Monats deaktiviert.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Deklarieren Sie die angebotenen Locales und verlangen Sie nur diejenigen verpflichtend, die einen Release tatsächlich blockieren müssen. Der Rest wird asynchron befüllt und hält Auslieferungen nicht auf.

## Übersetzungen komplett aus dem Repository auslagern

Das alternative Modell deklariert eine Quellsprache im Code und verwaltet den Rest extern über das CMS mit Live Sync. Inhaltsänderungen erfordern dann überhaupt keinen Rebuild mehr, was redaktionelle Anpassungen von Software-Releases entkoppelt.

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    liveSync: true,
  },
};

export default config;
```

Dies eignet sich besonders für Teams, in denen Nicht-Entwickler Texte pflegen. Es ist ein Kompromiss: Man gewinnt redaktionelle Unabhängigkeit, verliert jedoch die Eigenschaft, dass ein Git-Checkout den genauen Render-Zustand der Anwendung widerspiegelt. Details in der [CMS-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md).

Beachten Sie, dass `clientSecret` ein vertraulicher Serverschlüssel ist. Er gehört in CI-Secrets und Server-Umgebungsvariablen, niemals in ein Client-Bundle.

## Die ehrliche Einschränkung

Alles oben Genannte automatisiert die _Abdeckung_, nicht die _Qualität_. Ein maschineller Fill verwandelt eine sichtbare Lücke in eine unsichtbare: Das Audit wird grün, weil der Schlüssel nun einen Wert hat, den jedoch kein Mensch gegengelesen hat.

Das ist akzeptabel für interne Tools, Changelogs oder Beta-Sprachen. Es ist ungeeignet für Preisseiten, rechtliche Hinweise, Zahlungsfehlermeldungen oder Texte vor Kaufentscheidungen. Leiten Sie diese durch menschliche Reviews und nutzen Sie überall `--mode complete`, damit manuell geprüfte Strings nicht überschrieben werden.

Geben Sie dem Modell Kontext für konsistente Ergebnisse:

```ts
ai: {
  applicationContext: "B2B-Rechnungs-App. Formeller Tonfall. Den Produktnamen niemals übersetzen.",
}
```

## Häufige Fehler

- **Kein `[skip ci]` beim Auto-Commit.** Der Job startet sich endlos in einer Schleife neu.
- **Flacher Klon mit `--git-diff`.** Keine Vergleichsbasis vorhanden, nichts wird befüllt, kein Fehler gemeldet.
- **Gesamten Katalog bei jedem Durchlauf füllen.** Mit `--git-diff` oder `--unpushed` eingrenzen, um Kosten zu sparen.
- **CLI-Bericht als Gate nutzen.** Er beendet sich mit Return-Code 0.
- **Jede Sprache zwingend verlangen.** Die Schranke wird beim ersten blockierten Release abgeschaltet.
- **Fill-Job ganz ohne Gate.** Nichts schlägt fehl, ungeprüfte Texte wandern unbemerkt in Produktion.
- **Modell-API-Keys im Repository.** Gehören ebenso wie `clientSecret` in CI-Secrets.

## Weiterführende Ressourcen

- [CI/CD: Übersetzungen automatisch generieren mit Husky, GitHub Actions und CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/CI_CD.md)
- [Inhalte testen und Builds auf Abdeckung absichern](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/testing.md)
- [autoFill: Deklarationsdateien pro Locale erzeugen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/autoFill.md)
- [Konfigurationsreferenz: `locales`, `requiredLocales`, `editor`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)
- [Benchmark-Berichte über Frameworks hinweg](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/index.md)
- [i18next-Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/i18next.md)
- [Fehlende Übersetzungen aufspüren](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/detecting_missing_translations.md)
- [Übersetzungen testen ohne fragile Tests](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18n_testing_strategies.md)

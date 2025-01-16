# intlayer-cli: NPM-Paket zur Verwendung der Intlayer CLI

**Intlayer** ist eineSuite von Paketen, die speziell für JavaScript-Entwickler entwickelt wurden. Es ist kompatibel mit Frameworks wie React, React und Express.js.

Das **`intlayer-cli`** Paket ist ein NPM-Paket, das das `@intlayer/cli` Paket konsumiert und es für die `intlayer` Befehlszeilenoberflächen verfügbar macht.

> Beachten Sie, dass dieses Paket nicht benötigt wird, wenn das [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/index.md) Paket installiert ist. Im Vergleich zum `intlayer` Paket ist das `intlayer-cli` Paket ein leichteres Paket, das nur das CLI-Tool enthält, ohne `@intlayer/core` Abhängigkeiten.

## Installation

Installieren Sie das notwendige Paket mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

## Verwendung

Hier ein Beispiel, wie man das `intlayer-cli` Paket verwendet:

```bash
npx intlayer build
```

## CLI-Befehle

Intlayer bietet ein CLI-Tool, um:

- Ihre Inhaltsdeklarationen zu überprüfen und fehlende Übersetzungen zu vervollständigen
- Wörterbücher aus Ihren Inhaltsdeklarationen zu erstellen
- entfernte Wörterbücher von Ihrem CMS auf Ihr locales Projekt zu pushen und zu pullen

Konsultieren Sie [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md) für weitere Informationen.

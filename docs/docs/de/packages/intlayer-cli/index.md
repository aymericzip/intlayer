# intlayer-cli: NPM-Paket zur Verwendung der Intlayer-CLI

**Intlayer** ist eine Suite von Paketen, die speziell für JavaScript-Entwickler entwickelt wurde. Es ist mit Frameworks wie React, React und Express.js kompatibel.

Das **`intlayer-cli`**-Paket ist ein NPM-Paket, das das `@intlayer/cli`-Paket konsumiert und es für die `intlayer`-Befehlszeilenschnittstellen verfügbar macht.

> Beachten Sie, dass dieses Paket nicht erforderlich ist, wenn das [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/de/packages/intlayer/index.md)-Paket installiert ist. Im Vergleich zum `intlayer`-Paket ist das `intlayer-cli`-Paket ein leichteres Paket, das nur das CLI-Tool ohne `@intlayer/core`-Abhängigkeiten enthält.

## Installation

Installieren Sie das erforderliche Paket mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

## Verwendung

Hier ein Beispiel, wie das `intlayer-cli`-Paket verwendet wird:

```bash
npx intlayer dictionaries build
```

## CLI-Befehle

Intlayer bietet ein CLI-Tool, um:

- Ihre Inhaltsdeklarationen zu prüfen und fehlende Übersetzungen zu vervollständigen
- Wörterbücher aus Ihren Inhaltsdeklarationen zu erstellen
- entfernte Wörterbücher von Ihrem CMS in Ihr lokales Projekt zu übertragen und umgekehrt

Konsultieren Sie [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md) für weitere Informationen.

---
createdAt: 2024-08-11
updatedAt: 2026-09-12
priority: 8
title: CLI - Všechny příkazy Intlayer CLI pro váš vícejazyčný web
description: Naučte se používat Intlayer CLI pro správu vašeho vícejazyčného webu. Postupujte podle kroků v této online dokumentaci a nastavte svůj projekt během několika minut.
keywords:
  - CLI
  - Rozhraní příkazového řádku
  - Internacionalizace
  - Dokumentace
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 9.5.2
    date: 2026-09-12
    changes: "Nahrazení příkazu `ci` příznakem `--ci`"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Přidán obsah příkazu scan"
  - version: 8.6.4
    date: 2026-03-31
    changes: "Přidán obsah příkazu standalone"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Přidán obsah příkazu CI"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Přidán obsah příkazu list projects"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Přidán obsah příkazu init"
  - version: 7.2.3
    date: 2025-11-22
    changes: "Přidán obsah příkazu extract"
  - version: 7.1.0
    date: 2025-11-05
    changes: "Přidána volba skipIfExists do příkazu translate"
  - version: 6.1.4
    date: 2025-01-27
    changes: "Přidány aliasy pro argumenty a příkazy CLI"
  - version: 6.1.3
    date: 2025-10-05
    changes: "Přidána volba build do příkazů"
  - version: 6.1.2
    date: 2025-09-26
    changes: "Přidán obsah příkazu version"
  - version: 6.1.0
    date: 2025-09-26
    changes: "Nastavena volba verbose na true jako výchozí přes CLI"
  - version: 6.1.0
    date: 2025-09-23
    changes: "Přidán příkaz watch a volba with"
  - version: 6.0.1
    date: 2025-09-23
    changes: "Přidán obsah příkazu editor"
  - version: 6.0.0
    date: 2025-09-17
    changes: "Přidány příkazy content test a list"
  - version: 5.5.11
    date: 2025-07-11
    changes: "Aktualizována dokumentace parametrů příkazů CLI"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inicializace historie"
author: aymericzip
---

# Intlayer CLI - Všechny příkazy Intlayer CLI pro váš vícejazyčný web

## Obsah

<TOC/>

## Instalace balíčku

Nainstalujte potřebné balíčky pomocí npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="bun"
bun add intlayer-cli -g
```

> Pokud je balíček `intlayer` již nainstalován, CLI se nainstaluje automaticky. Tento krok můžete přeskočit.

## Balíček intlayer-cli

Balíček `intlayer-cli` je navržen k transpilaci vašich [deklarací intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/content_file.md) do slovníků.

Tento balíček transpiluje všechny soubory intlayer, jako jsou `src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}`. [Podívejte se, jak deklarovat soubory s deklarací Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

K interpretaci slovníků Intlayer můžete použít interprety, jako je [react-intlayer](https://www.npmjs.com/package/react-intlayer) nebo [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Podpora konfiguračních souborů

Intlayer přijímá několik formátů konfiguračních souborů:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Chcete-li se dozvědět, jak nakonfigurovat dostupné jazyky nebo jiné parametry, podívejte se na [dokumentaci ke konfiguraci zde](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/configuration.md).

## Provádění příkazů Intlayer

### Autentizace

- **[Login](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/login.md)** - Autentizujte se v Intlayer CMS a získejte přístupové údaje

### Základní příkazy

- [Build Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/build.md)
- [Watch Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/watch.md)
- [Create Standalone Bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/standalone.md)
- [Check CLI Version](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/version.md)
- [List Projects](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/list_projects.md)

### Správa slovníků

- [Push Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/push.md)
- [Pull Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/pull.md)
- [Fill Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/fill.md)
- [Test Missing Translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/test.md)
- [List Content Declaration Files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/list.md)

### Správa komponent

- **[Extract Strings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/extract.md)** - Extrahuje řetězce z komponent do souboru .content poblíž komponenty

### Konfigurace

- **[Initialize Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/init.md)** - Nastavte Intlayer ve vašem projektu s automatickou konfigurací
- **[Manage Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/configuration.md)** - Získejte svou konfiguraci Intlayer a odešlete ji do CMS

### Správa dokumentů

- [Translate Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/doc-translate.md)
- [Review Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/doc-review.md)

### Editor a Live Sync

- [Editor Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/editor.md)
- [Live Sync Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/live.md)

### Audit a diagnostika

- **[Scan Website](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/scan.md)** - Změřte velikost stránky a auditujte i18n/SEO zdraví jakékoli veřejné URL

### Vývojářské nástroje

- [CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/sdk.md)
- [Debug Intlayer Command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/debug.md)

## Používejte příkazy intlayer ve svém souboru `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:standalone": "npx intlayer standalone --packages intlayer vanilla-intlayer",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:extract": "npx intlayer extract",
  "intlayer:projects": "npx intlayer projects list",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review",
  "intlayer:scan": "npx intlayer scan https://example.com"
}
```

> **Poznámka**: Můžete také použít kratší aliasy:
>
> - `npx intlayer list`: nahrazuje `npx intlayer content list`
> - `npx intlayer test`: nahrazuje `npx intlayer content test`
> - `npx intlayer projects-list` nebo `npx intlayer pl`: nahrazuje `npx intlayer projects list`

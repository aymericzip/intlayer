---
createdAt: 2024-08-11
updatedAt: 2026-09-12
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

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/login" />
</TechGrid>

### Základní příkazy

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/build" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/watch" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/standalone" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/version" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/list_projects" />
</TechGrid>

### Správa slovníků

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/push" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/pull" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/fill" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/test" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/list" />
</TechGrid>

### Správa komponent

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/extract" />
</TechGrid>

### Konfigurace

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/init" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/configuration" />
</TechGrid>

### Správa dokumentů

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/doc-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/doc-review" />
</TechGrid>

### Editor a Live Sync

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/editor" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/live" />
</TechGrid>

### Audit a diagnostika

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/scan" />
</TechGrid>

### Vývojářské nástroje

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/sdk" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/debug" />
</TechGrid>

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

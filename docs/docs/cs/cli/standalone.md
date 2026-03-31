---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: Samostatný balíček (Standalone Bundle)
description: Naučte se, jak vytvořit samostatný balíček JavaScriptu pro obsah aplikace.
keywords:
  - Standalone
  - Balíček
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - standalone
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "Inicializace dokumentace příkazu standalone"
---

# Samostatný balíček (Standalone Bundle)

Příkaz `standalone` vám umožňuje vytvořit samostatný balíček JavaScriptu obsahující Intlayer a jakékoli další specifikované balíčky. To je užitečné zejména pro použití Intlayeru v prostředích bez správce balíčků nebo bundleru, jako je jednoduchá aplikace HTML/JS.

Balíček používá [esbuild](https://esbuild.github.io/) ke kombinaci požadovaných balíčků a jejich závislostí do jediného souboru, který lze snadno importovat do jakéhokoli webového projektu.

## Použití

```bash
npx intlayer standalone --packages [balíčky...] [volby]
```

## Volby

- `-o, --outfile [outfile]` - Volitelné. Název výstupního souboru. Výchozí: `intlayer-bundle.js`.
- `--packages [balíčky...]` - Povinné. Seznam balíčků, které mají být zahrnuty do balíčku (např. `intlayer`, `vanilla-intlayer`).
- `--version [version]` - Volitelné. Verze balíčků, které mají být sbaleny. Pokud není specifikováno, použije se výchozí verze Intlayer CLI.
- `--minify` - Volitelné. Zda se má výstup minimalizovat (minify). Výchozí: `true`.
- `--platform [platform]` - Volitelné. Cílová platforma pro balíček (např. `browser`, `node`). Výchozí: `browser`.
- `--format [format]` - Volitelné. Výstupní formát balíčku (např. `esm`, `cjs`, `iife`). Výchozí: `esm`.

## Obecné volby

- `--env-file [envFile]` - Soubor prostředí.
- `-e, --env [env]` - Prostředí.
- `--base-dir [baseDir]` - Základní adresář.
- `--no-cache` - Zakázat mezipaměť (cache).
- `--verbose` - Podrobný výstup.

## Příklady:

### Vytvoření balíčku pro Vanilla JS:

```bash
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js
```

Tím se vytvoří soubor `intlayer.js` obsahující balíčky `intlayer` i `vanilla-intlayer`, minimalizovaný a ve formátu ESM, připravený k použití v prohlížeči přes tag `<script>`.

### Sbalení konkrétní verze:

```bash
npx intlayer standalone --packages intlayer --version 8.6.4
```

### Sbalení v jiném formátu:

```bash
npx intlayer standalone --packages intlayer --format iife
```

## Co dělá:

1. **Vytvoří dočasné prostředí** - Nastaví dočasný adresář pro správu závislostí.
2. **Nainstaluje balíčky** - Použije `npm` nebo `bun` (pokud je k dispozici) k instalaci požadovaných balíčků a jejich závislostí.
3. **Vygeneruje vstupní bod** - Vytvoří dočasný soubor vstupního bodu, který exportuje všechny požadované balíčky a vystavuje je jako globální proměnné při spuštění v prohlížeči.
4. **Sbalí pomocí esbuild** - Použije esbuild ke spojení všeho do jednoho souboru, aplikuje minimalizaci a formátování podle požadavků.
5. **Vygeneruje soubor** - Zapíše výsledný balíček do zadané výstupní cesty.

## Globální proměnné

Po načtení balíčku v prohlížeči vystaví požadované balíčky jako globální proměnné na objektu `window`. Názvy proměnných jsou odvozeny od názvů balíčků (např. `intlayer` se stane `Intlayer`, `vanilla-intlayer` se stane `VanillaIntlayer`).

```javascript
// Přístup k Intlayeru z balíčku
const { getLocaleName } = window.Intlayer;
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;
```

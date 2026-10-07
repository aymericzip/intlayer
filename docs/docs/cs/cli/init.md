---
createdAt: 2025-12-30
updatedAt: 2026-09-29
priority: 5
title: Inicializace Intlayeru
description: Naučte se, jak inicializovat Intlayer ve vašem projektu.
keywords:
  - Inicializace
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 9.5.13
    date: 2026-09-29
    changes: "init pouze instaluje balíčky a nastavuje framework; samostatný podpříkaz pro každý krok; --interactive bez terminálu selže"
  - version: 8.6.4
    date: 2026-03-31
    changes: "Přidána volba --no-gitignore"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Přidán obsah příkazu init"
author: aymericzip
---

# Inicializace Intlayeru

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

Příkaz `init` nainstaluje balíčky Intlayer a nastaví váš framework (konfigurační soubor, TypeScript, plugin bundleru, middleware/proxy, providery). Je to doporučený způsob, jak s Intlayerem začít.

Vše ostatní (CI workflowy, AI skilly, MCP server, nástroje editoru, pravidla linteru, CMS, infrastruktura) je volitelné: vyberte to v checklistu `--interactive`, nebo spusťte příslušný podpříkaz (viz níže).

## Aliasy:

- `npx intlayer init`

## Argumenty:

- `--project-root [projectRoot]` - Volitelné. Určete kořenový adresář projektu. Pokud není zadán, příkaz bude hledat kořen projektu počínaje aktuálním pracovním adresářem.
- `--no-gitignore` - Volitelné. Přeskočí automatickou aktualizaci souboru `.gitignore`. Pokud je tento příznak nastaven, `.intlayer` nebude přidán do `.gitignore`.
- `--no-framework-setup` - Volitelné. Pouze nainstaluje balíčky, bez úprav souborů projektu.
- `--routing <routing>` - Volitelné. Směrování lokalizací: `prefix-no-default` (výchozí), `prefix-all`, `no-prefix`, `search-params` nebo `none`.
- `--content <layout>` - Volitelné. Jak je obsah deklarován:
  - `multilingual` - `{fileName}.content.{ts,json}` vedle komponenty, všechny lokalizace v jednom souboru (nastavuje `compiler.output`).
  - `per-locale` - `{fileName}.{locale}.content.{ts,json}` vedle komponenty (nastavuje `compiler.output` a `dictionary.locale`).
  - `centralized` - jeden katalog `/locales/{locale}.{json,po}` na lokalizaci (přidává plugin `syncJSON` / `syncPO`).
  - `namespaces` - katalogy `/locales/{locale}/{namespace}.{json,po}` (přidává plugin `syncJSON` / `syncPO`).
- `--content-format <format>` - Volitelné, s `--content`. `ts` nebo `json` pro `multilingual` / `per-locale`, `json` nebo `po` pro `centralized` / `namespaces`. Výchozí je první z nich.
- `--message-format <format>` - Volitelné, s `--content centralized` nebo `namespaces` v JSON. Syntaxe zpráv v katalozích: `icu` (výchozí), `i18next`, `vue-i18n` nebo `intlayer`.
- `-i, --interactive` - Volitelné. Vyberte kroky z checklistu (balíčky, CI, skilly, MCP, VS Code, LSP, lint, CMS, infrastruktura, …) místo výchozí sady. Vyžaduje terminál: bez něj (AI agent, CI) příkaz selže a vypíše podpříkazy, které spustit místo něj.
- `--no-github-actions` - Volitelné. S `--interactive` nikdy nevytvoří workflowy GitHub Actions, ani když jsou vybrány.

## Co dělá:

Příkaz `init` provádí následující úlohy nastavení:

1. **Validace struktury projektu** - Zajistí, že se nacházíte v platném adresáři projektu se souborem `package.json`.
2. **Instaluje balíčky** - Nainstaluje chybějící balíčky Intlayer pro váš stack (např. `react-intlayer`, `vite-intlayer`) a aktualizuje zastaralé.
3. **Aktualizace `.gitignore`** - Přidá `.intlayer` do vašeho souboru `.gitignore`, aby byly vygenerované soubory vyloučeny ze správy verzí (lze přeskočit pomocí `--no-gitignore`).
4. **Konfigurace TypeScriptu** - Aktualizuje soubory `tsconfig.json`, aby obsahovaly definice typů Intlayer (`.intlayer/**/*.ts`).
5. **Vytvoření konfiguračního souboru** - Vygeneruje `intlayer.config.ts` (pro projekty v TypeScriptu) nebo `intlayer.config.mjs` (pro projekty v JavaScriptu) s výchozím nastavením.
6. **Aktualizuje konfiguraci bundleru / frameworku** - Přidá plugin Intlayer do konfigurace Vite, Next.js, Nuxt, Astro, … a vytvoří middleware/proxy a providery, pokud to framework podporuje.

## Nastavení po jednotlivých krocích

Každý krok checklistu `--interactive` má vlastní podpříkaz. Na nic se neptají, když jsou hodnoty předány jako přepínače, takže je lze bezpečně spouštět z AI agenta nebo CI úlohy.

| Příkaz                                                                | Co nastavuje                                                                                 |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `intlayer init packages`                                              | Nainstaluje chybějící balíčky Intlayer a aktualizuje zastaralé                               |
| `intlayer init project [--routing <routing>] [--content <layout>]`    | Konfigurační soubor, TypeScript, plugin bundleru, middleware/proxy, providery a `.gitignore` |
| `intlayer init github-actions`                                        | Workflowy GitHub Actions `fill` a `test`                                                     |
| `intlayer init vscode-extension`                                      | Doporučí rozšíření Intlayer v `.vscode/extensions.json`                                      |
| `intlayer init lsp`                                                   | Jazykový server Intlayer v `.vscode/settings.json`                                           |
| `intlayer init eslint`                                                | Pravidla linteru Intlayer (ESLint / oxlint), pokud projekt už linter používá                 |
| `intlayer init skills [--platform <platform>] [--skills <skills…>]`   | Dokumentaci Intlayer jako skilly pro AI agenty                                               |
| `intlayer init mcp [--platform <platform>] [--transport <stdio/sse>]` | MCP server Intlayer                                                                          |
| `intlayer init extension [--browser <chrome/firefox>]`                | Otevře stránku rozšíření prohlížeče Intlayer v obchodě                                       |
| `intlayer init cms`                                                   | Přihlášení do Intlayer CMS přes prohlížeč a uložení přihlašovacích údajů do `.env`           |
| `intlayer init infra --mode <desktop/docker/compose>`                 | Desktopovou aplikaci nebo self-hosted stack                                                  |

### Z AI agenta nebo CI úlohy

Shell AI agenta nemá terminál, takže na otázku nelze odpovědět. Použijte výchozí příkaz a poté podpříkazy, které potřebujete:

```bash
npx intlayer init
npx intlayer init skills --platform Claude
npx intlayer init mcp --platform Claude --transport stdio
```

Bez terminálu:

- `init skills` nainstaluje skilly odpovídající vašemu stacku, pokud není nastaveno `--skills` (např. `--skills Usage Content React`).
- `init skills` a `init mcp` použijí zjištěnou AI platformu (Claude Code, Cursor, VS Code, Windsurf, …), pokud není nastaveno `--platform`, a selžou se seznamem platforem, když žádnou nezjistí.
- `init mcp` použije transport `stdio`, pokud není nastaveno `--transport`.
- `init infra` vyžaduje `--mode` a `init extension` jen vypíše odkazy do obchodu, pokud není nastaveno `--browser`.

MCP server se vždy konfiguruje uvnitř projektu (pro Claude Code v `.mcp.json`).

## Příklady:

### Základní inicializace:

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

Tím se inicializuje Intlayer v aktuálním adresáři s automatickou detekcí kořene projektu.

### Inicializace s vlastním kořenem projektu:

```bash packageManager="npm"
npx intlayer init --project-root ./muj-projekt
```

```bash packageManager="yarn"
yarn intlayer init --project-root ./muj-projekt
```

```bash packageManager="pnpm"
pnpm intlayer init --project-root ./muj-projekt
```

```bash packageManager="bun"
bun x intlayer init --project-root ./muj-projekt
```

Tím se inicializuje Intlayer v zadaném adresáři.

### Inicializace bez aktualizace .gitignore:

```bash packageManager="npm"
npx intlayer init --no-gitignore
```

```bash packageManager="yarn"
yarn intlayer init --no-gitignore
```

```bash packageManager="pnpm"
pnpm intlayer init --no-gitignore
```

```bash packageManager="bun"
bun x intlayer init --no-gitignore
```

Tím se nastaví všechny konfigurační soubory, ale neupraví se váš soubor `.gitignore`.

## Příklad výstupu:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## Poznámky:

- Příkaz je idempotentní - můžete jej bezpečně spustit několikrát. Již nakonfigurované kroky budou přeskočeny.
- Pokud konfigurační soubor již existuje, nebude přepsán.
- Konfigurace TypeScriptu bez pole `include` (např. konfigurace ve stylu řešení s referencemi) jsou přeskočeny.
- Příkaz se zastaví s chybou, pokud v kořenu projektu nebude nalezen soubor `package.json`.

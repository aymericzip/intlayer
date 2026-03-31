---
createdAt: 2025-12-30
updatedAt: 2025-12-30
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
  - version: 8.6.4
    date: 2026-03-31
    changes: "Přidána volba --no-gitignore"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Přidán obsah příkazu init"
---

# Inicializace Intlayeru

```bash
npx intlayer init
```

Příkaz `init` automaticky nakonfiguruje Intlayer ve vašem projektu vytvořením potřebných souborů a nastavení. Toto je doporučený způsob, jak začít s Intlayerem.

## Aliasy:

- `npx intlayer init`

## Argumenty:

- `--project-root [projectRoot]` - Volitelné. Určete kořenový adresář projektu. Pokud není zadán, příkaz bude hledat kořen projektu počínaje aktuálním pracovním adresářem.
- `--no-gitignore` - Volitelné. Přeskočí automatickou aktualizaci souboru `.gitignore`. Pokud je tento příznak nastaven, `.intlayer` nebude přidán do `.gitignore`.

## Co dělá:

Příkaz `init` provádí následující úlohy nastavení:

1. **Validace struktury projektu** - Zajistí, že se nacházíte v platném adresáři projektu se souborem `package.json`.
2. **Aktualizace `.gitignore`** - Přidá `.intlayer` do vašeho souboru `.gitignore`, aby byly vygenerované soubory vyloučeny ze správy verzí (lze přeskočit pomocí `--no-gitignore`).
3. **Konfigurace TypeScriptu** - Aktualizuje soubory `tsconfig.json`, aby obsahovaly definice typů Intlayer (`.intlayer/**/*.ts`).
4. **Vytvoření konfiguračního souboru** - Vygeneruje `intlayer.config.ts` (pro projekty v TypeScriptu) nebo `intlayer.config.mjs` (pro projekty v JavaScriptu) s výchozím nastavením.
5. **Aktualizace konfigurace Vite** - Pokud je detekován konfigurační soubor Vite, přidá import pro plugin `vite-intlayer`.
6. **Aktualizace konfigurace Next.js** - Pokud je detekován konfigurační soubor Next.js, přidá import pro plugin `next-intlayer`.

## Příklady:

### Základní inicializace:

```bash
npx intlayer init
```

Tím se inicializuje Intlayer v aktuálním adresáři s automatickou detekcí kořene projektu.

### Inicializace s vlastním kořenem projektu:

```bash
npx intlayer init --project-root ./muj-projekt
```

Tím se inicializuje Intlayer v zadaném adresáři.

### Inicializace bez aktualizace .gitignore:

```bash
npx intlayer init --no-gitignore
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

- Příkaz je idempotentní — můžete jej bezpečně spustit několikrát. Již nakonfigurované kroky budou přeskočeny.
- Pokud konfigurační soubor již existuje, nebude přepsán.
- Konfigurace TypeScriptu bez pole `include` (např. konfigurace ve stylu řešení s referencemi) jsou přeskočeny.
- Příkaz se zastaví s chybou, pokud v kořenu projektu nebude nalezen soubor `package.json`.

---
createdAt: 2024-08-13
updatedAt: 2026-04-08
title: Konfigurace (Configuration)
description: Naučte se, jak nakonfigurovat Intlayer pro vaši aplikaci. Porozumějte různým nastavením a možnostem dostupným pro přizpůsobení Intlayer vašim potřebám.
keywords:
  - Konfigurace
  - Nastavení
  - Přizpůsobení
  - Intlayer
  - Možnosti
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 8.7.0
    date: 2026-04-08
    changes: "Přidány volby `prune` a `minify` do konfigurace sestavení"
  - version: 8.7.0
    date: 2026-04-03
    changes: "Přidána volba `currentDomain`"
  - version: 8.4.0
    date: 2026-03-20
    changes: "Přidána objektová notace pro jednotlivé lokality pro 'compiler.output' a 'dictionary.fill'"
  - version: 8.3.0
    date: 2026-03-11
    changes: "'baseDir' přesunut z konfigurace 'content' do konfigurace 'system'"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Aktualizovány volby kompilátoru, přidána podpora pro 'output' a 'noMetadata'"
  - version: 8.1.7
    date: 2026-02-25
    changes: "Aktualizovány volby kompilátoru"
  - version: 8.1.5
    date: 2026-02-23
    changes: "Přidána volba kompilátoru 'build-only' a prefix slovníku"
  - version: 8.0.6
    date: 2026-02-12
    changes: "Přidána podpora pro poskytovatele Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face a Together.ai"
  - version: 8.0.5
    date: 2026-02-06
    changes: "Přidán `dataSerialization` do konfigurace AI"
  - version: 8.0.0
    date: 2026-01-24
    changes: "Režim importu `live` přejmenován na `fetch` pro lepší popis základního mechanismu."
  - version: 8.0.0
    date: 2026-01-22
    changes: "Konfigurace sestavení `importMode` přesunuta do konfigurace `dictionary`."
  - version: 8.0.0
    date: 2026-01-22
    changes: "Přidána volba `rewrite` do konfigurace routování"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Konfigurace systému oddělena od konfigurace obsahu. Interní cesty přesunuty do vlastnosti `system`. Přidán `codeDir` pro oddělení souborů obsahu od transformace kódu."
  - version: 8.0.0
    date: 2026-01-18
    changes: "Přidány volby slovníku `location` a `schema`"
  - version: 7.5.1
    date: 2026-01-10
    changes: "Přidána podpora pro formáty souborů JSON5 a JSONC"
  - version: 7.5.0
    date: 2025-12-17
    changes: "Přidána volba `buildMode`"
  - version: 7.0.0
    date: 2025-10-25
    changes: "Přidána konfigurace `dictionary`"
  - version: 7.0.0
    date: 2025-10-21
    changes: "`middleware` nahrazen konfigurací `routing`"
  - version: 7.0.0
    date: 2025-10-12
    changes: "Přidána volba `formatCommand`"
  - version: 6.2.0
    date: 2025-10-12
    changes: "Aktualizována volba `excludedPath`"
  - version: 6.0.2
    date: 2025-09-23
    changes: "Přidána volba `outputFormat`"
  - version: 6.0.0
    date: 2025-09-21
    changes: "Odstraněna pole `dictionaryOutput` a `i18nextResourcesDir`"
  - version: 6.0.0
    date: 2025-09-16
    changes: "Přidán režim importu `live`"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Pole `hotReload` nahrazeno `liveSync` a přidána pole `liveSyncPort`, `liveSyncURL`"
  - version: 5.6.1
    date: 2025-07-25
    changes: "`activateDynamicImport` nahrazen volbou `importMode`"
  - version: 5.6.0
    date: 2025-07-13
    changes: "Výchozí `contentDir` změněn z `['src']` na `['.']`"
  - version: 5.5.11
    date: 2025-06-29
    changes: "Přidány příkazy `docs`"
---

# Dokumentace ke konfiguraci Intlayer

## Přehled

Konfigurační soubory Intlayer umožňují přizpůsobit různé aspekty pluginu, jako je internacionalizace, middleware a správa obsahu. Tento dokument poskytuje podrobný popis každé vlastnosti v konfiguraci.

---

## Obsah

<TOC/>

---

## Podpora konfiguračních souborů

Intlayer přijímá formáty konfiguračních souborů JSON, JS, MJS a TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Příklad konfiguračního souboru

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * Příklad konfiguračního souboru Intlayer se všemi dostupnými možnostmi.
 */
const config: IntlayerConfig = {
  /**
   * Konfigurace internacionalizace.
   */
  internationalization: {
    /**
     * Seznam podporovaných lokalit v aplikaci.
     * Výchozí: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * Seznam povinných lokalit, které musí být definovány v každém slovníku.
     * Pokud je prázdný, jsou v režimu `strict` povinné všechny lokality.
     * Výchozí: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Úroveň přísnosti pro internacionalizovaný obsah.
     * - "strict": Vyvolá chybu, pokud deklarovaná lokalita chybí nebo není deklarována.
     * - "inclusive": Vyvolá varování, pokud deklarovaná lokalita chybí.
     * - "loose": Přijímá jakoukoli existující lokalitu.
     * Výchozí: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * Výchozí lokalita použitá jako záložní, pokud požadovaná lokalita není nalezena.
     * Výchozí: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * Nastavení ovládající operace se slovníky a chování při chybějícím obsahu.
   */
  dictionary: {
    /**
     * Ovládá způsob importu slovníků.
     * - "static": Statický import během sestavení.
     * - "dynamic": Dynamický import pomocí Suspense.
     * - "fetch": Dynamické načítání přes API Live Sync.
     * Výchozí: "static"
     */
    importMode: "static",

    /**
     * Strategie pro automatické doplnění chybějících překladů pomocí AI.
     * Může být boolean nebo vzor cesty pro uložení doplněného obsahu.
     * Výchozí: true
     */
    fill: true,

    /**
     * Fyzické umístění souborů slovníku.
     * - "local": Uloženo v lokálním souborovém systému.
     * - "remote": Uloženo v Intlayer CMS.
     * - "hybrid": Uloženo lokálně i v Intlayer CMS.
     * - "plugin" (nebo libovolný vlastní řetězec): Poskytováno pluginem nebo vlastním zdrojem.
     * Výchozí: "local"
     */
    location: "local",

    /**
     * Zda automaticky transformovat obsah (např. Markdown na HTML).
     * Výchozí: false
     */
    contentAutoTransformation: false,
  },

  /**
   * Konfigurace routování a middleware.
   */
  routing: {
    /**
     * Strategie routování podle lokality.
     * - "prefix-no-default": Prefix pro všechny lokality kromě výchozí (např. /dashboard, /fr/dashboard).
     * - "prefix-all": Prefix pro všechny lokality (např. /en/dashboard, /fr/dashboard).
     * - "no-prefix": Žádná lokalita v URL.
     * - "search-params": Použití ?locale=...
     * Výchozí: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Kde ukládat uživatelem zvolenou lokalitu.
     * Možnosti: 'cookie', 'localStorage', 'sessionStorage', 'header' nebo jejich pole.
     * Výchozí: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * Základní cesta pro URL aplikace.
     * Výchozí: ""
     */
    basePath: "",

    /**
     * Vlastní pravidla přepisu URL pro cesty v konkrétních lokalitách.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),

    /**
     * Mapuje lokality na doménová jména hostitelů pro směrování založené na doménách.
     * URL pro tyto lokality budou absolutní (např. https://intlayer.cn/).
     * Doména implikuje lokalitu, takže do cesty není přidán žádný prefix lokality.
     * Výchozí: undefined
     */
    domains: {
      en: "intlayer.org",
      zh: "intlayer.cn",
    },
  },

  /**
   * Nastavení pro hledání a zpracování souborů obsahu.
   */
  content: {
    /**
     * Přípony souborů pro skenování slovníků.
     * Výchozí: ['.content.ts', '.content.js', '.content.json', atd.]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * Adresáře, kde se nacházejí soubory .content.
     * Výchozí: ["."]
     */
    contentDir: ["src"],

    /**
     * Zdrojový adresář kódu.
     * Používá se pro optimalizaci sestavení a transformaci kódu.
     * Výchozí: ["."]
     */
    codeDir: ["src"],

    /**
     * Vzory pro vyloučení ze skenování.
     * Výchozí: ['node_modules', '.intlayer', atd.]
     */
    excludedPath: ["node_modules"],

    /**
     * Zda sledovat změny a regenerovat slovníky během vývoje.
     * Výchozí: true ve vývojovém režimu
     */
    watch: true,

    /**
     * Příkaz pro formátování nově vytvořených / aktualizovaných souborů .content.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Konfigurace vizuálního editoru.
   */
  editor: {
    /**
     * Zda je vizuální editor povolen.
     * Výchozí: false
     */
    enabled: true,

    /**
     * URL vaší aplikace pro validaci původu (origin).
     * Výchozí: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * Port pro lokální editor server.
     * Výchozí: 8000
     */
    port: 8000,

    /**
     * Veřejná URL pro editor.
     * Výchozí: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * URL Intlayer CMS.
     * Výchozí: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * URL backend API serveru.
     * Výchozí: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * Zda povolit synchronizaci obsahu v reálném čase.
     * Výchozí: false
     */
    liveSync: true,
  },

  /**
   * Nastavení překladů a generování pomocí AI.
   */
  ai: {
    /**
     * Použitý poskytovatel AI.
     * Možnosti: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * Výchozí: 'openai'
     */
    provider: "openai",

    /**
     * Použitý model zvoleného poskytovatele.
     */
    model: "gpt-4o",

    /**
     * API klíč poskytovatele.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Globální kontext pro vedení AI při generování překladů.
     */
    applicationContext: "Toto je aplikace pro rezervaci cest.",

    /**
     * Základní URL pro AI API.
     */
    baseURL: "http://localhost:3000",

    /**
     * Serializace dat
     *
     * Možnosti:
     * - "json": Výchozí, spolehlivé; spotřebovává více tokenů.
     * - "toon": Méně tokenů, méně stabilní než JSON.
     *
     * Výchozí: "json"
     */
    dataSerialization: "json",
  },

  /**
   * Nastavení sestavení a optimalizace.
   */
  build: {
    /**
     * Režim spuštění sestavení.
     * - "auto": Automatické sestavení během sestavení aplikace.
     * - "manual": Vyžaduje explicitní příkaz sestavení.
     * Výchozí: "auto"
     */
    mode: "auto",

    /**
     * Zda optimalizovat výsledný balíček odstraněním nepoužívaných slovníků.
     * Výchozí: true v produkci
     */
    optimize: true,

    /**
     * Minifikujte slovníky pro snížení velikosti balíčku.
     * Výchozí: false
     *
     * Poznámka:
     * - Tato možnost bude ignorována, pokud je `optimize` zakázáno.
     * - Tato možnost bude ignorována, pokud je `editor.enabled` nastaveno na true.
     */
    minify: true,

    /**
     * Odstraňte nepoužívané klíče ve slovnících.
     * Výchozí: false
     *
     * Poznámka:
     * - Tato možnost bude ignorována, pokud je `optimize` zakázáno.
     */
    purge: true,

    /**
     * Výstupní formát pro generované soubory slovníku.
     * Výchozí: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * Zda má sestavení kontrolovat typy TypeScript.
     * Výchozí: false
     */
    checkTypes: false,
  },

  /**
   * Konfigurace logování.
   */
  log: {
    /**
     * Úroveň logování.
     * - "default": Standardní logování.
     * - "verbose": Podrobné ladicí logování.
     * - "disabled": Bez logování.
     * Výchozí: "default"
     */
    mode: "default",

    /**
     * Prefix pro všechny zprávy v logu.
     * Výchozí: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * Konfigurace systému (pokročilé případy užití)
   */
  system: {
    /**
     * Adresář pro uložení lokalizovaných slovníků.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Adresář pro rozšíření modulů (module augmentation).
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * Adresář pro uložení nesloučených slovníků.
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * Adresář pro uložení typů slovníků.
     */
    typesDir: ".intlayer/types",

    /**
     * Adresář, kde jsou uloženy hlavní soubory aplikace.
     */
    mainDir: ".intlayer/main",

    /**
     * Adresář, kde jsou uloženy zkompilované soubory konfigurace.
     */
    configDir: ".intlayer/config",

    /**
     * Adresář pro soubory mezipaměti (cache).
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * Konfigurace kompilátoru (pokročilé případy užití)
   */
  compiler: {
    /**
     * Zda povolit kompilátor.
     *
     * - false: Zakázat kompilátor.
     * - true: Povolit kompilátor.
     * - "build-only": Přeskočit kompilátor při vývoji pro rychlejší spuštění.
     *
     * Výchozí: false
     */
    enabled: true,

    /**
     * Definuje cestu pro výstupní soubory. Nahrazuje `outputDir`.
     *
     * - Cesty `./` se rozliší relativně k adresáři komponenty.
     * - Cesty `/` se rozliší relativně ke kořenu projektu (`baseDir`).
     *
     * - Přítomnost proměnné `{{locale}}` v cestě aktivuje generování samostatných slovníků pro každou lokalitu.
     *
     * Příklad:
     * ```ts
     * {
     *   // Vytvářet vícejazyčné soubory .content.ts vedle komponenty
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Ekvivalentní přes šablonový řetězec
     * }
     * ```
     *
     * ```ts
     * {
     *   // Vytvářet centralizované JSON podle lokalit v kořenu projektu
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Ekvivalentní přes šablonový řetězec
     * }
     * ```
     *
     * Seznam proměnných:
     *   - `fileName`: Název souboru.
     *   - `key`: Klíč obsahu.
     *   - `locale`: Lokalita obsahu.
     *   - `extension`: Přípona souboru.
     *   - `componentFileName`: Název souboru komponenty.
     *   - `componentExtension`: Přípona souboru komponenty.
     *   - `format`: Formát slovníku.
     *   - `componentFormat`: Formát slovníku komponenty.
     *   - `componentDirPath`: Cesta k adresáři komponenty.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Zda ukládat komponenty po jejich transformaci.
     * Tímto způsobem lze kompilátor spustit jednou pro transformaci aplikace a poté jej odstranit.
     */
    saveComponents: false,

    /**
     * Do vygenerovaného souboru vložit pouze obsah. Užitečné pro výstupy ve formátu i18next nebo ICU MessageFormat JSON podle lokalit.
     */
    noMetadata: false,

    /**
     * Prefix klíče slovníku
     */
    dictionaryKeyPrefix: "", // Přidat volitelný prefix pro extrahované klíče slovníků
  },

  /**
   * Vlastní schémata pro validaci obsahu slovníků.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * Konfigurace pluginů.
   */
  plugins: [],
};

export default config;
````

---

## Referenční příručka ke konfiguraci

Níže jsou popsány různé parametry konfigurace dostupné v Intlayer.

---

### Konfigurace internacionalizace (Internationalization)

Definuje nastavení související s internacionalizací, včetně dostupných lokalit a výchozí lokality.

| Pole              | Popis                                                                             | Typ        | Výchozí             | Příklad              | Poznámka                                                                                                                                                                                                                                                                                                               |
| ----------------- | --------------------------------------------------------------------------------- | ---------- | ------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | Seznam lokalit podporovaných v aplikaci.                                          | `string[]` | `[Locales.ENGLISH]` | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                                                        |
| `requiredLocales` | Seznam povinných lokalit v aplikaci.                                              | `string[]` | `[]`                | `[]`                 | • Pokud je prázdný, jsou v režimu `strict` povinné všechny lokality.<br/>• Ujistěte se, že povinné lokality jsou definovány také v poli `locales`.                                                                                                                                                                     |
| `strictMode`      | Zajišťuje robustní implementaci internacionalizovaného obsahu pomocí TypeScriptu. | `string`   | `'inclusive'`       |                      | • Pokud `"strict"`: funkce `t` vyžaduje definici každé deklarované lokality — vyvolá chybu, pokud některá chybí nebo není deklarována.<br/>• Pokud `"inclusive"`: varuje před chybějícími lokalitami, ale umožňuje použití existujících nedeklarovaných.<br/>• Pokud `"loose"`: přijímá jakoukoli existující lokalitu. |
| `defaultLocale`   | Výchozí lokalita použitá jako záložní, pokud požadovaná lokalita není nalezena.   | `string`   | `Locales.ENGLISH`   | `'en'`               | Používá se k určení lokality, když není uvedena v URL, cookie nebo hlavičce.                                                                                                                                                                                                                                           |

---

### Konfigurace editoru (Editor)

Definuje nastavení pro vestavěný vizuální editor, včetně portu serveru a stavu povolení.

| Pole                         | Popis                                                                                                                                                                     | Typ                               | Výchozí                             | Příklad                                                                                         | Poznámka                                                                                                                                                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | URL aplikace.                                                                                                                                                             | `string`                          | `undefined`                         | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • Používá se k omezení původu (origin) editoru z bezpečnostních důvodů.<br/>• Pokud je nastaveno na `'*'`, je editor přístupný z jakéhokoli původu.                                                                             |
| `port`                       | Port používaný serverem vizuálního editoru.                                                                                                                               | `number`                          | `8000`                              |                                                                                                 |                                                                                                                                                                                                                                 |
| `editorURL`                  | URL serveru editoru.                                                                                                                                                      | `string`                          | `'http://localhost:8000'`           | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • Používá se k omezení původů, které mohou komunikovat s aplikací.<br/>• Pokud je nastaveno na `'*'`, je přístupný z jakéhokoli původu.<br/>• Musí být nastaveno, pokud byl změněn port nebo je editor hostován na jiné doméně. |
| `cmsURL`                     | URL Intlayer CMS.                                                                                                                                                         | `string`                          | `'https://app.intlayer.org'`        | `'https://app.intlayer.org'`                                                                    |                                                                                                                                                                                                                                 |
| `backendURL`                 | URL backend serveru.                                                                                                                                                      | `string`                          | `https://back.intlayer.org`         | `http://localhost:4000`                                                                         |                                                                                                                                                                                                                                 |
| `enabled`                    | Zda má aplikace komunikovat s vizuálním editorem.                                                                                                                         | `boolean`                         | `false`                             | `process.env.NODE_ENV !== 'production'`                                                         | • Pokud `false`, editor nemůže s aplikací komunikovat.<br/>• Zakázání pro určitá prostředí zvyšuje bezpečnost.                                                                                                                  |
| `clientId`                   | Umožňuje balíčkům intlayer autentizovat se na backendu přes oAuth2. Pro získání přístupového tokenu přejděte na [intlayer.org/project](https://app.intlayer.org/project). | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | Musí být uchováváno v tajnosti; použijte proměnné prostředí.                                                                                                                                                                    |
| `clientSecret`               | Umožňuje balíčkům intlayer autentizovat se na backendu přes oAuth2. Pro získání přístupového tokenu přejděte na [intlayer.org/project](https://app.intlayer.org/project). | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | Musí být uchováváno v tajnosti; použijte proměnné prostředí.                                                                                                                                                                    |
| `dictionaryPriorityStrategy` | Strategie priority slovníků, pokud existují lokální i vzdálené slovníky.                                                                                                  | `string`                          | `'local_first'`                     | `'distant_first'`                                                                               | • `'distant_first'`: prioritizuje vzdálené slovníky před lokálními.<br/>• `'local_first'`: prioritizuje lokální slovníky před vzdálenými.                                                                                       |
| `liveSync`                   | Zda má server aplikace okamžitě znovu načíst obsah při detekci změn v CMS <br/> Vizuálním editoru <br/> Backend serveru.                                                  | `boolean`                         | `true`                              | `true`                                                                                          | • Při přidání/aktualizaci slovníku aplikace aktualizuje obsah stránky.<br/>• Live Sync přesouvá obsah na jiný server, což může mírně ovlivnit výkon.<br/>• Doporučuje se hostovat obojí na stejném stroji.                      |
| `liveSyncPort`               | Port serveru live sync.                                                                                                                                                   | `number`                          | `4000`                              | `4000`                                                                                          |                                                                                                                                                                                                                                 |
| `liveSyncURL`                | URL serveru live sync.                                                                                                                                                    | `string`                          | `'http://localhost:{liveSyncPort}'` | `'https://example.com'`                                                                         | Ve výchozím nastavení ukazuje na localhost; lze změnit na vzdálený server live sync.                                                                                                                                            |

---

### Konfigurace routování (Routing)

Nastavení ovládající chování routování, včetně struktury URL, ukládání lokalit a správy middleware.

| Pole       | Popis                                                                                                                                                                                                                      | Typ                                                                                                                                                                                                          | Výchozí                | Příklad                                                                                                                                                                                           | Poznámka                                                                                                                                                                                                                                                                   |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | Režim routování URL pro správu lokalit.                                                                                                                                                                                    | `'prefix-no-default'` &#124; <br/> `'prefix-all'` &#124; <br/> `'no-prefix'` &#124; <br/> `'search-params'`                                                                                                  | `'prefix-no-default'`  | `'prefix-no-default'`: `/dashboard` (en) nebo `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: lokalita spravována jinými způsoby. `'search-params'`: `/dashboard?locale=fr` | Neovlivňuje správu cookies nebo úložiště lokalit.                                                                                                                                                                                                                          |
| `storage`  | Konfigurace ukládání lokality na klientovi.                                                                                                                                                                                | `false` &#124; <br/> `'cookie'` &#124; <br/> `'localStorage'` &#124; <br/> `'sessionStorage'` &#124; <br/> `'header'` &#124; <br/> `CookiesAttributes` &#124; <br/> `StorageAttributes` &#124; <br/> `Array` | `['cookie', 'header']` | `'localStorage'` <br/> `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                | Viz tabulka parametrů úložiště níže.                                                                                                                                                                                                                                       |
| `basePath` | Základní cesta pro URL aplikace.                                                                                                                                                                                           | `string`                                                                                                                                                                                                     | `''`                   | `'/my-app'`                                                                                                                                                                                       | Pokud aplikace běží na adrese `https://example.com/my-app`, basePath je `'/my-app'` a URL se stanou `https://example.com/my-app/en`.                                                                                                                                       |
| `rewrite`  | Vlastní pravidla přepisu URL, která přebíjejí výchozí režim routování pro konkrétní cesty. Podporuje dynamické parametry `[param]`.                                                                                        | `Record<string, StrictModeLocaleMap<string>>`                                                                                                                                                                | `undefined`            | Viz příklad níže                                                                                                                                                                                  | • Pravidla přepisu mají prioritu před `mode`.<br/>• Funguje s Next.js a Vite.<br/>• `getLocalizedUrl()` automaticky aplikuje odpovídající pravidla.<br/>• Viz [Vlastní přepisy URL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md). |
| `domains`  | Mapuje lokality na doménová jména hostitelů pro směrování založené na doménách. Pokud je nastaveno, URL pro danou lokalitu používají tuto doménu jako základ (absolutní URL) a do cesty není přidán žádný prefix lokality. | `Partial<Record<Locale, string>>`                                                                                                                                                                            | `undefined`            | `{ zh: 'intlayer.zh', fr: 'intlayer.org' }`                                                                                                                                                       | • Výchozí protokol je `https://`, pokud není součástí hostitele.<br/>• Doména sama identifikuje lokalitu, takže prefix `/zh/` není přidán.<br/>• `getLocalizedUrl('/', 'zh')` vrací `https://intlayer.zh/`.                                                                |

**Příklad `rewrite`**:

```typescript
routing: {
  mode: "prefix-no-default", // Záložní strategie
  rewrite: nextjsRewrite({
    "/about": {
      en: "/about",
      fr: "/a-propos",
    },
    "/product/[slug]": {
      en: "/product/[slug]",
      fr: "/produit/[slug]",
    },
    "/blog/[category]/[id]": {
      en: "/blog/[category]/[id]",
      fr: "/journal/[category]/[id]",
    },
  }),
}
```

#### Parametry úložiště (Storage)

| Hodnota            | Poznámka                                                                                                                                                                              | Popis                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `'cookie'`         | • Pro soulad s GDPR zajistěte řádný souhlas uživatele.<br/>• Nastavitelné přes `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`).      | Ukládá lokalitu v cookies — dostupné na klientovi i serveru.               |
| `'localStorage'`   | • Nevyprší, dokud není explicitně smazáno.<br/>• Proxy Intlayer k tomu nemá přístup.<br/>• Nastavitelné přes `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`). | Ukládá lokalitu v prohlížeči bez omezení doby — pouze na straně klienta.   |
| `'sessionStorage'` | • Smaže se po zavření karty/okna.<br/>• Proxy Intlayer k tomu nemá přístup.<br/>• Nastavitelné přes `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`).        | Ukládá lokalitu po dobu relace stránky — pouze na straně klienta.          |
| `'header'`         | • Užitečné pro volání API.<br/>• Strana klienta k tomu nemá přístup.<br/>• Nastavitelné přes `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`).                       | Ukládá nebo předává lokalitu přes HTTP hlavičky — pouze na straně serveru. |

#### Atributy cookie (Cookies Attributes)

Při použití ukládání v cookies lze nastavit další atributy:

| Pole       | Popis                                               | Typ                                                   |
| ---------- | --------------------------------------------------- | ----------------------------------------------------- |
| `name`     | Název cookie. Výchozí: `'INTLAYER_LOCALE'`          | `string`                                              |
| `domain`   | Doména cookie. Výchozí: `undefined`                 | `string`                                              |
| `path`     | Cesta cookie. Výchozí: `undefined`                  | `string`                                              |
| `secure`   | Vyžadovat HTTPS. Výchozí: `undefined`               | `boolean`                                             |
| `httpOnly` | Vlajka HTTP-only. Výchozí: `undefined`              | `boolean`                                             |
| `sameSite` | Politika SameSite.                                  | `'strict'` &#124; <br/> `'lax'` &#124; <br/> `'none'` |
| `expires`  | Datum vypršení nebo počet dní. Výchozí: `undefined` | `Date` &#124; <br/> `number`                          |

#### Atributy úložiště (Storage Attributes)

Při použití localStorage nebo sessionStorage:

| Pole   | Popis                                                | Typ                                              |
| ------ | ---------------------------------------------------- | ------------------------------------------------ |
| `type` | Typ úložiště.                                        | `'localStorage'` &#124; <br/> `'sessionStorage'` |
| `name` | Název klíče v úložišti. Výchozí: `'INTLAYER_LOCALE'` | `string`                                         |

#### Příklady konfigurace

Zde je několik běžných příkladů konfigurace pro novou strukturu routování v7:

**Základní konfigurace (výchozí)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**Konfigurace se souladem s GDPR**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: [
      {
        type: "localStorage",
        name: "user-locale",
      },
      {
        type: "cookie",
        name: "user-locale",
        secure: true,
        sameSite: "strict",
        httpOnly: false,
      },
    ],
    basePath: "",
  },
};

export default config;
```

**Režim parametrů hledání (Search Params)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "search-params",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**Režim bez prefixu s vlastním úložištěm**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "no-prefix",
    storage: {
      type: "sessionStorage",
      name: "app-locale",
    },
    basePath: "/my-app",
  },
};

export default config;
```

**Vlastní přepis URL s dynamickými cestami**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // Záloha pro nepřepsané cesty
    storage: "cookie",
    rewrite: nextjsRewrite({
      "/about": {
        en: "/about",
        fr: "/a-propos",
      },
      "/product/[slug]": {
        en: "/product/[slug]",
        fr: "/produit/[slug]",
      },
      "/blog/[category]/[id]": {
        en: "/blog/[category]/[id]",
        fr: "/journal/[category]/[id]",
      },
    }),
  },
};

export default config;
```

---

### Konfigurace obsahu (Content)

Nastavení související s tím, jak se obsah spravuje v aplikaci, včetně názvů adresářů, přípon souborů a odvozených konfigurací.

| Pole             | Popis                                                                                       | Typ        | Výchozí                                                                                                                                                                   | Příklad                                                                                                                                                                               | Poznámka                                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `watch`          | Udává, zda má Intlayer sledovat změny v souborech deklarace obsahu pro regeneraci slovníků. | `boolean`  | `true`                                                                                                                                                                    |                                                                                                                                                                                       |                                                                                                                                                   |
| `fileExtensions` | Přípony souborů pro skenování při kompilaci slovníků.                                       | `string[]` | `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.json5', '.content.jsonc', '.content.tsx', '.content.jsx']`                     | `['.data.ts', '.data.js', '.data.json']`                                                                                                                                              | Přizpůsobení pomůže vyhnout se konfliktům.                                                                                                        |
| `contentDir`     | Cesta k adresáři, kde jsou uloženy soubory definice obsahu (`.content.*`).                  | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library', require.resolve("@my-package/content"), '@my-package/content']`                                                                                          | Používá se pro sledování souborů obsahu a regeneraci slovníků.                                                                                    |
| `codeDir`        | Cesta k adresáři, kde je uložen kód, relativně k základnímu adresáři.                       | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library']`                                                                                                                                                         | • Používá se pro sledování souborů kódu pro transformaci (odstranění zbytečného, optimalizace).<br/>• Oddělení od `contentDir` může zvýšit výkon. |
| `excludedPath`   | Adresáře vyloučené ze skenování obsahu.                                                     | `string[]` | `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']` |                                                                                                                                                                                       | Zatím se nepoužívá; plánováno pro budoucnost.                                                                                                     |
| `formatCommand`  | Příkaz pro formátování souborů obsahu při jejich lokálním zápisu Intlayerem.                | `string`   | `undefined`                                                                                                                                                               | `'npx prettier --write "{{file}}" --log-level silent'` (Prettier), `'npx biome format "{{file}}" --write --log-level none'` (Biome), `'npx eslint --fix "{{file}}" --quiet'` (ESLint) | • `{{file}}` bude nahrazeno cestou k souboru.<br/>• Pokud není definováno, Intlayer určí automaticky (testuje prettier, biome, eslint).           |

---

### Konfigurace slovníků (Dictionary)

Parametry ovládající operace se slovníky, včetně chování automatického doplnění a generování obsahu.

| Pole                        | Popis                                                                                                                                                     | Typ                                                                                                             | Výchozí       | Příklad                                                                                     | Poznámka                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fill`                      | Ovládá, jak se generují výstupní soubory automatického doplnění (překlad AI).                                                                             | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `true`        | `{ en: '/locales/en/{{key}}.json', fr: ({ key }) => '/locales/fr/${key}.json', es: false }` | • `true`: výchozí cesta (stejný soubor jako zdroj).<br/>• `false`: zakázat.<br/>• Šablona řetězec/funkce generuje soubory podle lokalit.<br/>• Objekt podle lokalit: každá lokalita odpovídá své šabloně; `false` ignoruje tuto lokalitu.<br/>• Zahrnutí `{{locale}}` aktivuje generování podle lokalit.<br/>• `fill` na úrovni slovníku má vždy prioritu před tímto globálním nastavením. |
| `description`               | Pomáhá editoru a CMS pochopit účel slovníku. Také se používá jako kontext pro generování překladů pomocí AI.                                              | `string`                                                                                                        | `undefined`   | `'User profile section'`                                                                    |                                                                                                                                                                                                                                                                                                                                                                                            |
| `locale`                    | Transformuje slovník do formátu pro konkrétní lokalitu. Každé deklarované pole se stává uzlem překladu. Pokud chybí, slovník je považován za vícejazyčný. | `LocalesValues`                                                                                                 | `undefined`   | `'en'`                                                                                      | Použijte toto, pokud je slovník určen pro jednu konkrétní lokalitu, nikoli pro více překladů.                                                                                                                                                                                                                                                                                              |
| `contentAutoTransformation` | Automaticky transformuje řetězce obsahu do typovaných uzlů (markdown, HTML nebo vložení).                                                                 | `boolean` &#124; <br/> `{ markdown?: boolean; html?: boolean; insertion?: boolean }`                            | `false`       | `true`                                                                                      | • Markdown : `### Title` → `md('### Title')`.<br/>• HTML : `<div>Title</div>` → `html('<div>Title</div>')`.<br/>• Vložení : `Hello {{name}}` → `insert('Hello {{name}}')`.                                                                                                                                                                                                                 |
| `location`                  | Udává, kde jsou uloženy soubory slovníků a jak jsou synchronizovány s CMS.                                                                                | `'local'` &#124; <br/> `'remote'` &#124; <br/> `'hybrid'` &#124; <br/> `'plugin'` &#124; <br/> `string`         | `'local'`     | `'hybrid'`                                                                                  | • `'local'`: správa pouze lokálně.<br/>• `'remote'`: správa pouze vzdáleně (CMS).<br/>• `'hybrid'`: správa lokálně i vzdáleně.<br/>• `'plugin'` nebo vlastní řetězec: správa pluginem nebo vlastním zdrojem.                                                                                                                                                                               |
| `importMode`                | Ovládá způsob importu slovníků.                                                                                                                           | `'static'` &#124; <br/> `'dynamic'` &#124; <br/> `'fetch'`                                                      | `'static'`    | `'dynamic'`                                                                                 | • `'static'`: statický import.<br/>• `'dynamic'`: dynamický import přes Suspense.<br/>• `'fetch'`: načtení přes Live Sync API; odklad na `'dynamic'` při neúspěchu.<br/>• Vyžaduje pluginy `@intlayer/babel` a `@intlayer/swc`.<br/>• Klíče musí být deklarovány staticky.<br/>• Ignorováno, pokud je `optimize` vypnuto.<br/>• Neovlivňuje `getIntlayer`, `getDictionary` atd.            |
| `priority`                  | Priorita slovníku. Vyšší hodnoty vítězí nad nižšími při řešení konfliktů mezi slovníky.                                                                   | `number`                                                                                                        | `undefined`   | `1`                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                            |
| `live`                      | Zastaralé — použijte `importMode: 'fetch'`. Udávalo, zda se má obsah slovníku načítat dynamicky přes Live Sync API.                                       | `boolean`                                                                                                       | `undefined`   |                                                                                             | Přejmenováno na `importMode: 'fetch'` ve v8.0.0.                                                                                                                                                                                                                                                                                                                                           |
| `schema`                    | Generováno automaticky Intlayerem pro validaci JSON schématu.                                                                                             | `'https://intlayer.org/schema.json'`                                                                            | auto-generace |                                                                                             | Neupravujte ručně.                                                                                                                                                                                                                                                                                                                                                                         |
| `title`                     | Pomáhá identifikovat slovník v editoru a CMS.                                                                                                             | `string`                                                                                                        | `undefined`   | `'User Profile'`                                                                            |                                                                                                                                                                                                                                                                                                                                                                                            |
| `tags`                      | Kategorizuje slovníky a poskytuje kontext nebo instrukce pro editor a AI.                                                                                 | `string[]`                                                                                                      | `undefined`   | `['user', 'profile']`                                                                       |                                                                                                                                                                                                                                                                                                                                                                                            |
| `version`                   | Verze vzdáleného slovníku; pomáhá sledovat aktuálně používanou verzi.                                                                                     | `string`                                                                                                        | `undefined`   | `'1.0.0'`                                                                                   | • Spravováno v CMS.<br/>• Neupravujte lokálně.                                                                                                                                                                                                                                                                                                                                             |

**Příklad `fill`**:

```ts
dictionary: {
  fill: {
    en: "/locales/en/{{key}}.content.json",
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  },
};
```

---

### Konfigurace logování (Log)

Parametry pro přizpůsobení výstupu logování Intlayer.

| Pole     | Popis                             | Typ                                                            | Výchozí         | Příklad          | Poznámka                                                                                   |
| -------- | --------------------------------- | -------------------------------------------------------------- | --------------- | ---------------- | ------------------------------------------------------------------------------------------ |
| `mode`   | Udává režim logování.             | `'default'` &#124; <br/> `'verbose'` &#124; <br/> `'disabled'` | `'default'`     | `'verbose'`      | • `'verbose'`: loguje více informací pro ladění.<br/>• `'disabled'`: úplně vypne logování. |
| `prefix` | Prefix pro všechny zprávy v logu. | `string`                                                       | `'[intlayer] '` | `'[my prefix] '` |                                                                                            |

---

### Konfigurace AI (AI)

Nastavení ovládající AI funkce Intlayer, včetně poskytovatele, modelu a API klíče.

Tato konfigurace je volitelná, pokud jste registrováni v [Intlayer Dashboard](https://app.intlayer.org/project) s přístupovým klíčem. Intlayer bude automaticky spravovat nejefektivnější a nejúspornější řešení AI pro vaše potřeby. Použití výchozích možností zaručuje nejlepší dlouhodobou podporu, protože Intlayer se neustále aktualizuje pro použití nejaktuálnějších modelů.

Pokud dáváte přednost použití vlastního API klíče nebo konkrétního modelu, můžete definovat svou konfiguraci AI.
Tato konfigurace AI bude použita globálně ve vašem prostředí Intlayer. Příkazy CLI budou používat tato nastavení jako výchozí pro příkazy jako `fill`, stejně jako SDK, vizuální editor a CMS. Tyto výchozí hodnoty můžete přebít pro konkrétní případy užití přes parametry příkazů.

Intlayer podporuje několik AI poskytovatelů pro maximální flexibilitu. V současnosti jsou podporováni tito poskytovatelé:

- **OpenAI** (Výchozí)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Google AI Studio**
- **Google Vertex**
- **Meta Llama**
- **Ollama**
- **OpenRouter**
- **Alibaba Cloud**
- **Fireworks**
- **Hugging Face**
- **Groq**
- **Amazon Bedrock**
- **Together.ai**

| Pole                 | Popis                                                                                                                        | Typ                                                                                                                                                                                                                                                                                                                                                                                            | Výchozí     | Příklad                                                       | Poznámka                                                                                                                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`           | Poskytovatel použitý pro AI funkce Intlayer.                                                                                 | `'openai'` &#124; <br/> `'anthropic'` &#124; <br/> `'mistral'` &#124; <br/> `'deepseek'` &#124; <br/> `'gemini'` &#124; <br/> `'ollama'` &#124; <br/> `'openrouter'` &#124; <br/> `'alibaba'` &#124; <br/> `'fireworks'` &#124; <br/> `'groq'` &#124; <br/> `'huggingface'` &#124; <br/> `'bedrock'` &#124; <br/> `'googleaistudio'` &#124; <br/> `'googlevertex'` &#124; <br/> `'togetherai'` | `undefined` | `'anthropic'`                                                 | Různí poskytovatelé vyžadují různé API klíče a mají různé ceny.                                                                                                                       |
| `model`              | Model použitý pro AI funkce.                                                                                                 | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Žádný       | `'gpt-4o-2024-11-20'`                                         | Konkrétní model závisí na poskytovateli.                                                                                                                                              |
| `temperature`        | Ovládá náhodnost odpovědí AI.                                                                                                | `number`                                                                                                                                                                                                                                                                                                                                                                                       | Žádný       | `0.1`                                                         | Vyšší teplota = kreativnější a méně předvídatelné.                                                                                                                                    |
| `apiKey`             | Váš API klíč pro zvoleného poskytovatele.                                                                                    | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Žádný       | `process.env.OPENAI_API_KEY`                                  | Musí být uchováváno v tajnosti; použijte proměnné prostředí.                                                                                                                          |
| `applicationContext` | Dodatečný kontext o vaší aplikaci, který pomůže AI generovat přesnější překlady (doména, cílová skupina, tón, terminologie). | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Žádný       | `'Můj vlastní kontext aplikace'`                              | Lze použít k přidání pravidel (např.: `"Neměli byste transformovat URL"`).                                                                                                            |
| `baseURL`            | Základní URL pro AI API.                                                                                                     | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Žádný       | `'https://api.openai.com/v1'` <br/> `'http://localhost:5000'` | Může ukazovat na lokální nebo vlastní endpoint AI API.                                                                                                                                |
| `dataSerialization`  | Formát serializace dat pro AI funkce.                                                                                        | `'json'` &#124; <br/> `'toon'`                                                                                                                                                                                                                                                                                                                                                                 | `undefined` | `'toon'`                                                      | • `'json'`: výchozí, spolehlivé; spotřebovává více tokenů.<br/>• `'toon'`: méně tokenů, méně stabilní.<br/>• Další parametry se předávají modelu jako kontext (úsilí uvažování atd.). |

---

### Konfigurace sestavení (Build)

Parametry ovládající, jak Intlayer optimalizuje a kompiluje internacionalizaci vaší aplikace.

Volby sestavení se aplikují na pluginy `@intlayer/babel` a `@intlayer/swc`.

> Ve vývojovém režimu používá Intlayer statický import slovníků pro zjednodušení vývojového procesu.

> Během optimalizace Intlayer nahradí volání slovníků pro optimalizaci dělení kódu (chunking), aby výsledný balíček importoval pouze ty slovníky, které se skutečně používají.

| Pole              | Popis                                                                | Typ                              | Výchozí                                                                                                                                                                           | Příklad                                                                       | Poznámka                                                                                                                                                                                                                                                                                                  |
| ----------------- | -------------------------------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`            | Ovládá režim sestavení.                                              | `'auto'` &#124; <br/> `'manual'` | `'auto'`                                                                                                                                                                          | `'manual'`                                                                    | • `'auto'`: sestavení se spustí automaticky během sestavení aplikace.<br/>• `'manual'`: provede se pouze při explicitním volání příkazu sestavení.<br/>• Lze použít k vypnutí sestavení slovníků (např. pro zamezení běhu v prostředích Node.js).                                                         |
| `optimize`        | Ovládá, zda se má provádět optimalizace sestavení.                   | `boolean`                        | `undefined`                                                                                                                                                                       | `process.env.NODE_ENV === 'production'`                                       | • Pokud není definováno, optimalizace se spustí při sestavení frameworku (Vite/Next.js).<br/>• `true` vynutí optimalizaci i v dev režimu.<br/>• `false` ji vypne.<br/>• Pokud je zapnuto, nahradí volání slovníků pro optimalizaci chunkingu.<br/>• Vyžaduje pluginy `@intlayer/babel` a `@intlayer/swc`. |
| `minify`          | Minifikujte slovníky pro snížení velikosti balíčku.                  | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | • Určuje, zda má být balíček minifikován.<br/>• Výchozí: `true` v produkci.<br/>• Tato volba bude ignorována, pokud je `optimize` zakázáno.<br/>• Tato volba bude ignorována, pokud je `editor.enabled` true.                                                                                             |
| `purge`           | Odstraňte nepoužívané klíče ve slovnících.                           | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | • Určuje, zda má být balíček vyčištěn.<br/>• Výchozí: `true` v produkci.<br/>• Tato volba bude ignorována, pokud je `optimize` zakázáno.                                                                                                                                                                  |
| `checkTypes`      | Udává, zda má sestavení kontrolovat typy TypeScript a logovat chyby. | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | Může zpomalit proces sestavení.                                                                                                                                                                                                                                                                           |
| `outputFormat`    | Ovládá výstupní formát slovníků.                                     | `('esm' &#124; 'cjs')[]`         | `['esm', 'cjs']`                                                                                                                                                                  | `['cjs']`                                                                     |                                                                                                                                                                                                                                                                                                           |
| `traversePattern` | Vzory definující, které soubory skenovat během optimalizace.         | `string[]`                       | `['**/*.{tsx,ts,js,mjs,cjs,jsx,vue,svelte,svte}', '!**/node_modules/**', '!**/dist/**', '!**/.intlayer/**', '!**/*.config.*', '!**/*.test.*', '!**/*.spec.*', '!**/*.stories.*']` | `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']` | • Omezte optimalizaci na relevantní soubory pro zvýšení výkonu sestavení.<br/>• Ignorovalo by se, kdyby byl `optimize` vypnutý.<br/>• Používá vzory glob.                                                                                                                                                 |

---

### Systémová konfigurace (System)

Tato nastavení jsou určena pro pokročilé případy užití a vnitřní konfiguraci Intlayer.

| Pole                      | Popis                                       | Typ      | Výchozí                           | Příklad | Poznámka |
| ------------------------- | ------------------------------------------- | -------- | --------------------------------- | ------- | -------- |
| `dictionariesDir`         | Adresář pro zkompilované slovníky.          | `string` | `'.intlayer/dictionary'`          |         |          |
| `moduleAugmentationDir`   | Adresář pro rozšíření modulů TypeScript.    | `string` | `'.intlayer/types'`               |         |          |
| `unmergedDictionariesDir` | Adresář pro uložení nesloučených slovníků.  | `string` | `'.intlayer/unmerged_dictionary'` |         |          |
| `typesDir`                | Adresář pro vygenerované typy.              | `string` | `'.intlayer/types'`               |         |          |
| `mainDir`                 | Adresář hlavního souboru Intlayer.          | `string` | `'.intlayer/main'`                |         |          |
| `configDir`               | Adresář zkompilovaných souborů konfigurace. | `string` | `'.intlayer/config'`              |         |          |
| `cacheDir`                | Adresář souborů mezipaměti (cache).         | `string` | `'.intlayer/cache'`               |         |          |

---

### Konfigurace kompilátoru (Compiler)

Nastavení ovládající kompilátor Intlayer, který extrahuje slovníky přímo z vašich komponent.

| Pole                  | Popis                                                                                                                                                                                                                                                                                                             | Typ                                                                                                             | Výchozí     | Příklad                                                                                                                                                  | Poznámka                                                                                                                                                                                                   |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`             | Udává, zda má být kompilátor povolen pro extrakci slovníků.                                                                                                                                                                                                                                                       | `boolean` &#124; <br/> `'build-only'`                                                                           | `true`      | `'build-only'`                                                                                                                                           | `'build-only'` přeskočí kompilátor při vývoji pro rychlejší sestavení; provede se pouze při příkazech sestavení.                                                                                           |
| `dictionaryKeyPrefix` | Prefix pro extrahované klíče slovníků.                                                                                                                                                                                                                                                                            | `string`                                                                                                        | `''`        | `'my-prefix-'`                                                                                                                                           | Přidává se k vygenerovanému klíči (na základě názvu souboru) pro zamezení konfliktům.                                                                                                                      |
| `saveComponents`      | Zda mají být komponenty uloženy po jejich transformaci.                                                                                                                                                                                                                                                           | `boolean`                                                                                                       | `false`     |                                                                                                                                                          | • Pokud `true`, přepíše původní soubory jejich transformovanými verzemi.<br/>• Kompilátor lze po jednom spuštění odstranit.                                                                                |
| `output`              | Definuje cestu pro výstupní soubory. Nahrazuje `outputDir`. Podporuje proměnné šablony: `{{fileName}}`, <br/> `{{key}}`, <br/> `{{locale}}`, <br/> `{{extension}}`, <br/> `{{componentFileName}}`, <br/> `{{componentExtension}}`, <br/> `{{format}}`, <br/> `{{componentFormat}}`, <br/> `{{componentDirPath}}`. | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `undefined` | `'./{{fileName}}{{extension}}'` <br/> `'/locales/{{locale}}/{{key}}.json'` <br/> `{ en: ({ key }) => './locales/en/${key}.json', fr: '...', es: false }` | • Cesty `./` se rozliší relativně k adresáři komponenty.<br/>• Cesty `/` relativně ke kořenu.<br/>• `{{locale}}` zahrnuje generování podle lokalit.<br/>• Podporuje objektovou notaci pro každou lokalitu. |
| `noMetadata`          | Pokud `true`, kompilátor vynechá metadata slovníku (klíč, obal obsahu) z výstupu.                                                                                                                                                                                                                                 | `boolean`                                                                                                       | `false`     | `false` → `{"key":"my-key","content":{"key":"value"}}` <br/> `true` → `{"key":"value"}`                                                                  | • Užitečné pro výstupy ve formátu i18next nebo ICU MessageFormat JSON.<br/>• Dobře funguje s pluginem `loadJSON`.                                                                                          |
| `dictionaryKeyPrefix` | Prefix klíče slovníku                                                                                                                                                                                                                                                                                             | `string`                                                                                                        | `''`        |                                                                                                                                                          | Přidat volitelný prefix pro extrahované klíče slovníků                                                                                                                                                     |

---

### Vlastní schémata (Custom Schemas)

| Pole      | Popis                                                                   | Typ                         |
| --------- | ----------------------------------------------------------------------- | --------------------------- |
| `schemas` | Umožňuje definovat schémata Zod pro validaci struktury vašich slovníků. | `Record<string, ZodSchema>` |

---

### Pluginy (Plugins)

| Pole      | Popis                                 | Typ                |
| --------- | ------------------------------------- | ------------------ |
| `plugins` | Seznam pluginů Intlayer pro zahrnutí. | `IntlayerPlugin[]` |

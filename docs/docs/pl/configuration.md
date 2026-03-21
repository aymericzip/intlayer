---
createdAt: 2024-08-13
updatedAt: 2026-03-20
title: Konfiguracja (Configuration)
description: Dowiedz się, jak skonfigurować Intlayer dla swojej aplikacji. Zrozum różne ustawienia i opcje dostępne do dostosowania Intlayera do swoich potrzeb.
keywords:
  - Konfiguracja
  - Ustawienia
  - Dostosowanie
  - Intlayer
  - Opcje
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 8.4.0
    date: 2026-03-20
    changes: Dodano notację obiektową dla poszczególnych wersji językowych dla 'compiler.output' i 'dictionary.fill'
  - version: 8.3.0
    date: 2026-03-11
    changes: Przeniesiono 'baseDir' z konfiguracji 'content' do konfiguracji 'system'
  - version: 8.2.0
    date: 2026-03-09
    changes: Zaktualizowano opcje kompilatora (compiler), dodano wsparcie dla 'output' i 'noMetadata'
  - version: 8.1.7
    date: 2026-02-25
    changes: Zaktualizowano opcje kompilatora
  - version: 8.1.5
    date: 2026-02-23
    changes: Dodano opcję kompilatora 'build-only' i prefiks słownika
  - version: 8.0.6
    date: 2026-02-12
    changes: Dodano wsparcie dla dostawców Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face i Together.ai
  - version: 8.0.5
    date: 2026-02-06
    changes: Dodano `dataSerialization` do konfiguracji AI
  - version: 8.0.0
    date: 2026-01-24
    changes: Zmieniono nazwę trybu importu `live` na `fetch`, aby lepiej opisać mechanizm bazowy.
  - version: 8.0.0
    date: 2026-01-22
    changes: Przeniesiono konfigurację budowania `importMode` do konfiguracji słownika `dictionary`.
  - version: 8.0.0
    date: 2026-01-22
    changes: Dodano opcję `rewrite` do konfiguracji routingu
  - version: 8.0.0
    date: 2026-01-18
    changes: Oddzielono konfigurację systemu od konfiguracji treści. Przeniesiono ścieżki wewnętrzne do właściwości `system`. Dodano `codeDir`, aby oddzielić pliki treści i transformację kodu.
  - version: 8.0.0
    date: 2026-01-18
    changes: Dodano opcje słownika `location` i `schema`
  - version: 7.5.1
    date: 2026-01-10
    changes: Dodano wsparcie dla formatów plików JSON5 i JSONC
  - version: 7.5.0
    date: 2025-12-17
    changes: Dodano opcję `buildMode`
  - version: 7.0.0
    date: 2025-10-25
    changes: Dodano konfigurację `dictionary`
  - version: 7.0.0
    date: 2025-10-21
    changes: Zastąpiono `middleware` konfiguracją routingu `routing`
  - version: 7.0.0
    date: 2025-10-12
    changes: Dodano opcję `formatCommand`
  - version: 6.2.0
    date: 2025-10-12
    changes: Zaktualizowano opcję `excludedPath`
  - version: 6.0.2
    date: 2025-09-23
    changes: Dodano opcję `outputFormat`
  - version: 6.0.0
    date: 2025-09-21
    changes: Usunięto pola `dictionaryOutput` i `i18nextResourcesDir`
  - version: 6.0.0
    date: 2025-09-16
    changes: Dodano tryb importu `live`
  - version: 6.0.0
    date: 2025-09-04
    changes: Zastąpiono pole `hotReload` przez `liveSync` oraz dodano pola `liveSyncPort` i `liveSyncURL`
  - version: 5.6.1
    date: 2025-07-25
    changes: Zastąpiono `activateDynamicImport` opcją `importMode`
  - version: 5.6.0
    date: 2025-07-13
    changes: Zmieniono domyślny contentDir z `['src']` na `['.']`
  - version: 5.5.11
    date: 2025-06-29
    changes: Dodano polecenia `docs`
---

# Dokumentacja Konfiguracji Intlayer

## Przegląd

Pliki konfiguracyjne Intlayer pozwalają na dostosowanie różnych aspektów wtyczki, takich jak internacjonalizacja (internationalization), middleware oraz obsługa treści. Niniejsza dokumentacja zawiera szczegółowy opis każdej właściwości w konfiguracji.

---

## Spis Treści

<TOC/>

---

## Obsługiwane Formaty Plików Konfiguracyjnych

Intlayer akceptuje formaty plików konfiguracyjnych JSON, JS, MJS oraz TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Przykładowy Plik Konfiguracyjny

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * Przykładowy plik konfiguracyjny Intlayer wyświetlający wszystkie dostępne opcje.
 */
const config: IntlayerConfig = {
  /**
   * Konfiguracja ustawień internacjonalizacji.
   */
  internationalization: {
    /**
     * Lista obsługiwanych wersji językowych (locales) w aplikacji.
     * Domyślnie: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * Lista obowiązkowych wersji językowych, które muszą być zdefiniowane w każdym słowniku.
     * Jeśli puste, wszystkie wersje językowe są obowiązkowe w trybie `strict`.
     * Domyślnie: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Poziom rygoru dla treści internacjonalizowanych.
     * - "strict": Błąd, jeśli brakuje jakiejkolwiek zadeklarowanej wersji językowej lub jeśli nie jest zadeklarowana.
     * - "inclusive": Ostrzeżenie, jeśli brakuje zadeklarowanej wersji językowej.
     * - "loose": Akceptuje dowolną istniejącą wersję językową.
     * Domyślnie: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * Domyślna wersja językowa używana jako rezerwowa (fallback) w przypadku nieznalezienia żądanej.
     * Domyślnie: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * Ustawienia kontrolujące operacje na słownikach i zachowanie rezerwowe (fallback).
   */
  dictionary: {
    /**
     * Kontroluje sposób importowania słowników.
     * - "static": Importowane statycznie w czasie budowania (build time).
     * - "dynamic": Importowane dynamicznie przy użyciu Suspense.
     * - "fetch": Pobierane dynamicznie za pośrednictwem Live Sync API.
     * Domyślnie: "static"
     */
    importMode: "static",

    /**
     * Strategia automatycznego uzupełniania brakujących tłumaczeń przy użyciu AI.
     * Może być wartością logiczną (boolean) lub wzorcem ścieżki do zapisywania uzupełnionej treści.
     * Domyślnie: true
     */
    fill: true,

    /**
     * Fizyczna lokalizacja plików słownika.
     * - "local": Przechowywane w lokalnym systemie plików.
     * - "remote": Przechowywane w Intlayer CMS.
     * - "hybrid": Przechowywane lokalnie i w Intlayer CMS.
     * - "plugin" (lub dowolny niestandardowy ciąg znaków): Dostarczane przez wtyczkę lub niestandardowe źródło.
     * Domyślnie: "local"
     */
    location: "local",

    /**
     * Czy treść powinna być automatycznie przekształcana (np. Markdown na HTML).
     * Domyślnie: false
     */
    contentAutoTransformation: false,
  },

  /**
   * Konfiguracja routingu i middleware.
   */
  routing: {
    /**
     * Strategia routingu wersji językowych.
     * - "prefix-no-default": Dodaje prefiks do wszystkich oprócz domyślnej (np. /dashboard, /fr/dashboard).
     * - "prefix-all": Dodaje prefiks do wszystkich wersji językowych (np. /en/dashboard, /fr/dashboard).
     * - "no-prefix": Brak wersji językowej w URL.
     * - "search-params": Używa ?locale=...
     * Domyślnie: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Miejsce przechowywania wersji językowej wybranej przez użytkownika.
     * Opcje: 'cookie', 'localStorage', 'sessionStorage', 'header' lub ich tablica.
     * Domyślnie: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * Ścieżka bazowa dla adresów URL aplikacji.
     * Domyślnie: ""
     */
    basePath: "",

    /**
     * Niestandardowe reguły przepisywania (rewrite) URL dla poszczególnych ścieżek wersji językowych.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * Ustawienia dotyczące wyszukiwania i przetwarzania plików treści.
   */
  content: {
    /**
     * Rozszerzenia plików do skanowania słowników.
     * Domyślnie: ['.content.ts', '.content.js', '.content.json', itp.]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * Katalogi, w których znajdują się pliki .content.
     * Domyślnie: ["."]
     */
    contentDir: ["src"],

    /**
     * Miejsce, w którym znajduje się kod źródłowy.
     * Używane do optymalizacji budowania i transformacji kodu.
     * Domyślnie: ["."]
     */
    codeDir: ["src"],

    /**
     * Wzorce wykluczone ze skanowania.
     * Domyślnie: ['node_modules', '.intlayer', itp.]
     */
    excludedPath: ["node_modules"],

    /**
     * Czy monitorować zmiany i przebudowywać słowniki podczas programowania.
     * Domyślnie: true w trybie programistycznym (development)
     */
    watch: true,

    /**
     * Polecenie używane do formatowania nowo utworzonych / zaktualizowanych plików .content.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Konfiguracja Edytora Wizualnego (Visual Editor).
   */
  editor: {
    /**
     * Czy edytor wizualny jest włączony.
     * Domyślnie: false
     */
    enabled: true,

    /**
     * Adres URL Twojej aplikacji do walidacji pochodzenia (origin validation).
     * Domyślnie: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * Port dla lokalnego serwera edytora.
     * Domyślnie: 8000
     */
    port: 8000,

    /**
     * Publiczny adres URL edytora.
     * Domyślnie: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * Adres URL Intlayer CMS.
     * Domyślnie: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * Adres URL Backend API.
     * Domyślnie: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * Czy włączyć synchronizację treści w czasie rzeczywistym.
     * Domyślnie: false
     */
    liveSync: true,
  },

  /**
   * Ustawienia tłumaczenia i budowania opartego na AI.
   */
  ai: {
    /**
     * Dostawca AI do użycia.
     * Opcje: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * Domyślnie: 'openai'
     */
    provider: "openai",

    /**
     * Model wybranego dostawcy do użycia.
     */
    model: "gpt-4o",

    /**
     * Klucz API dostawcy.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Kontekst globalny dla AI podczas budowania tłumaczeń.
     */
    applicationContext: "To jest aplikacja do rezerwacji podróży.",

    /**
     * Bazowy adres URL ścieżki (base path URL) dla AI API.
     */
    baseURL: "http://localhost:3000",

    /**
     * Serializacja danych (Data Serialization)
     *
     * Opcje:
     * - "json": Domyślna, solidna; zużywa więcej tokenów.
     * - "toon": Zużywa mniej tokenów, może nie być tak spójna jak JSON.
     *
     * Domyślnie: "json"
     */
    dataSerialization: "json",
  },

  /**
   * Ustawienia budowania i optymalizacji.
   */
  build: {
    /**
     * Tryb wykonywania budowania.
     * - "auto": Będzie budowane automatycznie podczas budowania aplikacji.
     * - "manual": Wymaga wyraźnego polecenia budowania.
     * Domyślnie: "auto"
     */
    mode: "auto",

    /**
     * Czy optymalizować ostateczny pakiet (bundle) poprzez usuwanie nieużywanych słowników.
     * Domyślnie: true w środowisku produkcyjnym (production)
     */
    optimize: true,

    /**
     * Format wyjściowy dla wygenerowanych plików słownika.
     * Domyślnie: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * Określa, czy podczas budowania należy sprawdzać typy TypeScript.
     * Domyślnie: false
     */
    checkTypes: false,
  },

  /**
   * Konfiguracja rejestratora (Logger).
   */
  log: {
    /**
     * Poziom rejestrowania.
     * - "default": Standardowe rejestrowanie.
     * - "verbose": Szczegółowe rejestrowanie debugowania.
     * - "disabled": Wyłącza rejestrowanie.
     * Domyślnie: "default"
     */
    mode: "default",

    /**
     * Prefiks wszystkich komunikatów dziennika.
     * Domyślnie: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * Konfiguracja systemu (do użytku zaawansowanego)
   */
  system: {
    /**
     * Katalog do przechowywania zlokalizowanych słowników.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Katalog dla TypeScript module augmentation.
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * Katalog do przechowywania niepołączonych (unmerged) słowników.
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * Katalog do przechowywania typów słowników.
     */
    typesDir: ".intlayer/types",

    /**
     * Katalog, w którym przechowywane są główne pliki aplikacji.
     */
    mainDir: ".intlayer/main",

    /**
     * Katalog, w którym przechowywane są pliki konfiguracyjne.
     */
    configDir: ".intlayer/config",

    /**
     * Katalog, w którym przechowywane są pliki pamięci podręcznej (cache).
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * Konfiguracja Kompilatora (dla użytku zaawansowanego)
   */
  compiler: {
    /**
     * Określa, czy kompilator powinien być włączony.
     *
     * - false: Wyłącza kompilator.
     * - true: Włącza kompilator.
     * - "build-only": Pomija kompilator podczas programowania i przyspiesza czas uruchamiania.
     *
     * Domyślnie: false
     */
    enabled: true,

    /**
     * Definiuje ścieżkę dla plików wyjściowych. Zastępuje `outputDir`.
     *
     * - Ścieżki z `./` są rozwiązywane względem katalogu komponentów.
     * - Ścieżki z `/` są rozwiązywane względem katalogu głównego projektu (`baseDir`).
     *
     * - Uwzględnienie zmiennej `{{locale}}` w ścieżce spowoduje tworzenie oddzielnych słowników dla każdego języka.
     *
     * Przykład:
     * ```ts
     * {
     *   // Twórz wielojęzyczne pliki .content.ts obok komponentu
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Równoważne przy użyciu ciągu szablonowego
     * }
     * ```
     *
     * ```ts
     * {
     *   // Twórz scentralizowane JSONy dla każdego języka w katalogu głównym projektu
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Równoważne przy użyciu ciągu szablonowego
     * }
     * ```
     *
     * Lista zmiennych:
     *   - `fileName`: Nazwa pliku.
     *   - `key`: Klucz treści (key).
     *   - `locale`: Wersja językowa treści.
     *   - `extension`: Rozszerzenie pliku.
     *   - `componentFileName`: Nazwa pliku komponentu.
     *   - `componentExtension`: Rozszerzenie pliku komponentu.
     *   - `format`: Format słownika.
     *   - `componentFormat`: Format słownika komponentu.
     *   - `componentDirPath`: Ścieżka katalogu komponentu.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Określa, czy komponenty powinny być zapisywane po transformacji.
     * W ten sposób kompilator może zostać uruchomiony tylko raz, aby przekształcić aplikację, a następnie usunięty.
     */
    saveComponents: false,

    /**
     * Wstawia tylko treść do wygenerowanego pliku. Przydatne dla wyjścia JSON dla każdego języka dla i18next lub ICU MessageFormat.
     */
    noMetadata: false,

    /**
     * Prefiks klucza słownika
     */
    dictionaryKeyPrefix: "", // Dodaj opcjonalny prefiks do wyodrębnionych kluczy słownika
  },

  /**
   * Niestandardowe schematy (Schemas) do walidacji zawartości słownika.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * Konfiguracja wtyczek (Plugins).
   */
  plugins: [],
};

export default config;
````

---

## Odniesienie do Konfiguracji (Configuration Reference)

Poniższe sekcje opisują różne opcje konfiguracyjne dostępne w Intlayer.

---

### Konfiguracja Internacjonalizacji (Internationalization Configuration)

Definiuje ustawienia związane z internacjonalizacją, w tym dostępne wersje językowe i domyślną wersję językową aplikacji.

| Pole              | Typ        | Opis                                                                                                                   | Przykład             | Uwaga                                                                                                                                                                                                                                                                                                                                                      |
| ----------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | `string[]` | Lista obsługiwanych wersji językowych w aplikacji. Domyślnie: `[Locales.ENGLISH]`                                      | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                                                                                            |
| `requiredLocales` | `string[]` | Lista obowiązkowych wersji językowych w aplikacji. Domyślnie: `[]`                                                     | `[]`                 | Jeśli puste, wszystkie wersje językowe są obowiązkowe w trybie `strict`. Upewnij się, że obowiązkowe wersje językowe są również zdefiniowane w polu `locales`.                                                                                                                                                                                             |
| `strictMode`      | `string`   | Zapewnia solidną implementację internacjonalizowanej treści dzięki użyciu TypeScript. Domyślnie: `inclusive`           |                      | Jeśli `"strict"`: funkcja `t` wymaga zdefiniowania każdej zadeklarowanej wersji językowej — zgłasza błąd, jeśli jakiejkolwiek brakuje lub nie jest zadeklarowana. Jeśli `"inclusive"`: ostrzega o brakujących wersjach językowych, ale akceptuje istniejące niezadeklarowane wersje językowe. Jeśli `"loose"`: akceptuje każdą istniejącą wersję językową. |
| `defaultLocale`   | `string`   | Domyślna wersja językowa używana jako rezerwowa (fallback), jeśli nie znaleziono żądanej. Domyślnie: `Locales.ENGLISH` | `'en'`               | Używane do określenia wersji językowej, gdy żadna nie jest określona w URL, pliku cookie lub nagłówku (header).                                                                                                                                                                                                                                            |

---

### Konfiguracja Edytora (Editor Configuration)

Definiuje ustawienia związane ze zintegrowanym edytorem, w tym port serwera i status aktywności.

| Pole                         | Typ                       | Opis                                                                                                                                                                                                | Przykład                                                                              | Uwaga                                                                                                                                                                                                                                 |
| ---------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | `string`                  | Adres URL Twojej aplikacji. Domyślnie: `''`                                                                                                                                                         | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Używane do ograniczania pochodzenia (origins) edytora ze względów bezpieczeństwa. Jeśli ustawione na `'*'`, edytor jest dostępny z dowolnego pochodzenia.                                                                             |
| `port`                       | `number`                  | Port używany przez serwer Edytora Wizualnego. Domyślnie: `8000`                                                                                                                                     |                                                                                       |                                                                                                                                                                                                                                       |
| `editorURL`                  | `string`                  | Adres URL serwera edytora. Domyślnie: `'http://localhost:8000'`                                                                                                                                     | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Używane do ograniczania pochodzenia, które może wchodzić w interakcję z aplikacją. Jeśli ustawione na `'*'`, dostępne z dowolnego pochodzenia. Musi być ustawione przy zmianie portu lub jeśli edytor jest hostowany w innej domenie. |
| `cmsURL`                     | `string`                  | Adres URL Intlayer CMS. Domyślnie: `'https://intlayer.org'`                                                                                                                                         | `'https://intlayer.org'`                                                              |                                                                                                                                                                                                                                       |
| `backendURL`                 | `string`                  | Adres URL serwera backendu. Domyślnie: `https://back.intlayer.org`                                                                                                                                  | `http://localhost:4000`                                                               |                                                                                                                                                                                                                                       |
| `enabled`                    | `boolean`                 | Określa, czy aplikacja będzie współpracować z edytorem wizualnym. Domyślnie: `true`                                                                                                                 | `process.env.NODE_ENV !== 'production'`                                               | Jeśli `false`, edytor nie może wchodzić w interakcję z aplikacją. Wyłączenie go dla określonych środowisk zwiększa bezpieczeństwo.                                                                                                    |
| `clientId`                   | `string &#124; undefined` | Umożliwia pakietom intlayer uwierzytelnianie w backendzie przy użyciu oAuth2. Aby otrzymać token dostępu, wejdź na [intlayer.org/project](https://app.intlayer.org/project). Domyślnie: `undefined` |                                                                                       | Zachowaj go w tajemnicy; przechowuj w zmiennych środowiskowych.                                                                                                                                                                       |
| `clientSecret`               | `string &#124; undefined` | Umożliwia pakietom intlayer uwierzytelnianie w backendzie przy użyciu oAuth2. Aby otrzymać token dostępu, wejdź na [intlayer.org/project](https://app.intlayer.org/project). Domyślnie: `undefined` |                                                                                       | Zachowaj go w tajemnicy; przechowuj w zmiennych środowiskowych.                                                                                                                                                                       |
| `dictionaryPriorityStrategy` | `string`                  | Strategia ustalania priorytetów słowników, gdy istnieją zarówno słowniki lokalne, jak i zdalne. Domyślnie: `'local_first'`                                                                          | `'distant_first'`                                                                     | `'distant_first'`: Priorytetyzuje zdalne nad lokalnymi. `'local_first'`: Priorytetyzuje lokalne nad zdalnymi.                                                                                                                         |
| `liveSync`                   | `boolean`                 | Określa, czy serwer aplikacji powinien przeładowywać treści na gorąco (hot reload), gdy wykryta zostanie zmiana w CMS / Edytorze Wizualnym / Backendzie. Domyślnie: `true`                          | `true`                                                                                | Gdy słownik zostanie dodany/zaktualizowany, aplikacja aktualizuje zawartość strony. Live sync zleca treść innemu serwerowi, co może nieznacznie wpłynąć na wydajność. Zaleca się hostowanie obu na tej samej maszynie.                |
| `liveSyncPort`               | `number`                  | Port serwera Live Sync. Domyślnie: `4000`                                                                                                                                                           | `4000`                                                                                |                                                                                                                                                                                                                                       |
| `liveSyncURL`                | `string`                  | Adres URL serwera Live Sync. Domyślnie: `'http://localhost:{liveSyncPort}'`                                                                                                                         | `'https://example.com'`                                                               | Domyślnie wskazuje na localhost; można zmienić na zdalny serwer synchroniczny na żywo (live sync server).                                                                                                                             |

### Konfiguracja Routingu (Routing Configuration)

Ustawienia kontrolujące zachowanie routingu, w tym strukturę adresów URL, przechowywanie wersji językowej i obsługę middleware.

| Pole       | Typ                                                                                                                                                  | Opis                                                                                                                                                                                | Przykład                                                                                                                                                                                                        | Uwaga                                                                                                                                                                                                                                                                      |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | `'prefix-no-default' &#124; 'prefix-all' &#124; 'no-prefix' &#124; 'search-params'`                                                                  | Tryb routingu URL dla obsługi wersji językowych. Domyślnie: `'prefix-no-default'`                                                                                                   | `'prefix-no-default'`: `/dashboard` (en) lub `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: wersja językowa obsługiwana innymi środkami. `'search-params'`: używa `/dashboard?locale=fr` | Nie wpływa na zarządzanie plikami cookie ani na przechowywanie wersji językowej (locale storage).                                                                                                                                                                          |
| `storage`  | `false &#124; 'cookie' &#124; 'localStorage' &#124; 'sessionStorage' &#124; 'header' &#124; CookiesAttributes &#124; StorageAttributes &#124; Array` | Konfiguracja przechowywania wersji językowej na kliencie. Domyślnie: `['cookie', 'header']`                                                                                         | `'localStorage'`, `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                                   | Zobacz poniższą tabelę Opcji Przechowywania (Storage Options).                                                                                                                                                                                                             |
| `basePath` | `string`                                                                                                                                             | Ścieżka bazowa dla adresów URL aplikacji. Domyślnie: `''`                                                                                                                           | `'/my-app'`                                                                                                                                                                                                     | Jeśli aplikacja znajduje się pod adresem `https://example.com/my-app`, basePath to `'/my-app'`, a adresy URL stają się takie jak `https://example.com/my-app/en`.                                                                                                          |
| `rewrite`  | `Record<string, StrictModeLocaleMap<string>>`                                                                                                        | Niestandardowe reguły przepisywania (rewrite) URL, które zastępują domyślny tryb routingu dla określonych ścieżek. Obsługuje parametry dynamiczne `[param]`. Domyślnie: `undefined` | Zobacz przykład poniżej                                                                                                                                                                                         | Reguły przepisywania mają pierwszeństwo przed `mode`. Działa z Next.js i Vite. `getLocalizedUrl()` automatycznie stosuje pasujące reguły. Zobacz [Niestandardowe Przepisywanie URL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/custom_url_rewrites.md). |

**Przykład `rewrite`**:

```typescript
routing: {
  mode: "prefix-no-default", // Strategia rezerwowa (fallback)
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

#### Opcje Przechowywania (Storage Options)

| Wartość            | Opis                                                                                              | Uwaga                                                                                                                                                                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'cookie'`         | Zapisuje wersję językową w plikach cookie — dostępnych zarówno po stronie klienta, jak i serwera. | Aby zachować zgodność z RODO (GDPR), upewnij się, że uzyskano odpowiednią zgodę użytkownika. Możliwość dostosowania za pomocą `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`). |
| `'localStorage'`   | Zapisuje wersję językową w przeglądarce bez daty wygaśnięcia — tylko po stronie klienta.          | Nie wygasa, dopóki nie zostanie wyraźnie wyczyszczone. Proxy Intlayer nie może uzyskać do tego dostępu. Możliwość dostosowania za pomocą `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`).               |
| `'sessionStorage'` | Zapisuje wersję językową na czas trwania sesji strony — tylko po stronie klienta.                 | Wyczyszczone po zamknięciu karty/okna. Proxy Intlayer nie może uzyskać do tego dostępu. Możliwość dostosowania za pomocą `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`).                             |
| `'header'`         | Zapisuje lub przesyła wersję językową za pośrednictwem nagłówków HTTP — tylko po stronie serwera. | Przydatne przy wywołaniach API. Strona klienta nie może uzyskać dostępu. Możliwość dostosowania za pomocą `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`).                                                    |

#### Atrybuty Plików Cookie (Cookie Attributes)

Przy korzystaniu z przechowywania w plikach cookie można skonfigurować dodatkowe atrybuty:

| Pole       | Typ                                   | Opis                                                    |
| ---------- | ------------------------------------- | ------------------------------------------------------- |
| `name`     | `string`                              | Nazwa pliku cookie. Domyślnie: `'INTLAYER_LOCALE'`      |
| `domain`   | `string`                              | Domena pliku cookie. Domyślnie: `undefined`             |
| `path`     | `string`                              | Ścieżka pliku cookie. Domyślnie: `undefined`            |
| `secure`   | `boolean`                             | Wymaga HTTPS. Domyślnie: `undefined`                    |
| `httpOnly` | `boolean`                             | Flaga HTTP-only. Domyślnie: `undefined`                 |
| `sameSite` | `'strict' &#124; 'lax' &#124; 'none'` | Polityka SameSite.                                      |
| `expires`  | `Date &#124; number`                  | Data wygaśnięcia lub liczba dni. Domyślnie: `undefined` |

#### Atrybuty Przechowywania Wersji Językowej (Locale Storage Attributes)

Przy korzystaniu z localStorage lub sessionStorage:

| Pole   | Typ                                      | Opis                                                        |
| ------ | ---------------------------------------- | ----------------------------------------------------------- |
| `type` | `'localStorage' &#124; 'sessionStorage'` | Typ przechowywania.                                         |
| `name` | `string`                                 | Nazwa klucza przechowywania. Domyślnie: `'INTLAYER_LOCALE'` |

#### Przykłady Konfiguracji

Oto kilka typowych przykładów konfiguracji dla nowej struktury routingu v7:

**Podstawowa Konfiguracja (Domyślna)**:

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

**Konfiguracja Zgodna z RODO**:

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

**Tryb Parametrów Wyszukiwania (Search Parameters Mode)**:

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

**Tryb Bez Prefiksu (No Prefix Mode) z niestandardowym przechowywaniem**:

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

**Niestandardowe Przepisywanie URL z ścieżkami dynamicznymi**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // Strategia rezerwowa dla nieprzepisanych ścieżek
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

### Konfiguracja Treści (Content Configuration)

Ustawienia związane z przetwarzaniem treści w aplikacji (nazwy katalogów, rozszerzenia plików i konfiguracje pochodne).

| Pole             | Typ        | Opis                                                                                                                                                                                                 | Przykład                            | Uwaga                                                                                                                                          |
| ---------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `watch`          | `boolean`  | Określa, czy Intlayer powinien monitorować zmiany w plikach deklaracji treści w celu przebudowy słowników. Domyślnie: `process.env.NODE_ENV === 'development'`                                       |                                     |                                                                                                                                                |
| `fileExtensions` | `string[]` | Rozszerzenia plików używane do skanowania plików deklaracji treści. Domyślnie: `['.content.ts', '.content.js', '.content.mjs', '.content.cjs', '.content.json', '.content.json5', '.content.jsonc']` | `['.content.ts', '.content.js']`    |                                                                                                                                                |
| `contentDir`     | `string[]` | Ścieżki do katalogów, w których znajdują się pliki deklaracji treści. Domyślnie: `['.']`                                                                                                             | `['src/content']`                   |                                                                                                                                                |
| `codeDir`        | `string[]` | Ścieżki do katalogów, w których znajdują się pliki kodu źródłowego Twojej aplikacji. Domyślnie: `['.']`                                                                                              | `['src']`                           | Używane do optymalizacji budowania i zapewnienia, że transformacja kodu oraz przeładowanie na gorąco są stosowane tylko do niezbędnych plików. |
| `excludedPath`   | `string[]` | Ścieżki wykluczone ze skanowania treści. Domyślnie: `['node_modules', '.intlayer', '.next', 'dist', 'build']`                                                                                        | `['src/styles']`                    |                                                                                                                                                |
| `formatCommand`  | `string`   | Polecenie, które zostanie wykonane w celu sformatowania nowo utworzonych lub zaktualizowanych plików treści. Domyślnie: `undefined`                                                                  | `'npx prettier --write "{{file}}"'` | Używane podczas wyodrębniania treści lub za pośrednictwem edytora wizualnego.                                                                  |

---

### Konfiguracja Słownika (Dictionary Configuration)

Ustawienia kontrolujące operacje na słownikach, w tym zachowanie automatycznego uzupełniania i tworzenie treści.

Ta konfiguracja słownika ma dwa główne cele:

1. **Wartości domyślne**: Definiowanie wartości domyślnych podczas tworzenia plików deklaracji treści.
2. **Zachowanie rezerwowe (fallback)**: Pozwala na globalne ustawienie zachowania operacji na słownikach, zapewniając wartości rezerwowe, gdy określone pola nie są zdefiniowane.

Aby uzyskać więcej informacji na temat sposobu stosowania plików deklaracji treści i wartości konfiguracyjnych, zobacz [dokumentację plików treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

| Pole                        | Typ                                                                                             | Opis                                                                                                             | Przykład                | Uwaga                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | `boolean &#124; FilePathPattern &#124; Partial<Record<Locale, boolean &#124; FilePathPattern>>` | Kontroluje sposób generowania plików wyjściowych automatycznego uzupełniania (tłumaczenie AI). Domyślnie: `true` | Zobacz przykład poniżej | `true`: domyślna ścieżka (ten sam plik co źródło). `false`: wyłączone. Wzorce ciągów/funkcji generują pliki dla poszczególnych języków. Obiekt dla poszczególnych języków: każdy język mapuje się na własny wzorzec; `false` pomija ten język. Uwzględnienie zmiennej `{{locale}}` aktywuje generowanie dla poszczególnych języków. `fill` na poziomie słownika zawsze ma pierwszeństwo przed tą globalną konfiguracją. |
| `importMode`                | `'static' &#124; 'dynamic' &#124; 'fetch'`                                                      | Kontroluje sposób importowania słowników. Domyślnie: `'static'`                                                  | `'dynamic'`             | `'static'`: Importowane statycznie. `'dynamic'`: Importowane dynamicznie przez 'Suspense'. `'fetch'`: Pobierane dynamicznie przez 'Live Sync API'. Nie ma wpływu na `getIntlayer`, `getDictionary`, `useDictionary` itp.                                                                                                                                                                                                |
| `location`                  | `'local' &#124; 'remote' &#124; 'hybrid' &#124; string`                                         | Gdzie przechowywane są słowniki. Domyślnie: `'local'`                                                            | `'remote'`              | `'local'`: system plików. `'remote'`: Intlayer CMS. `'hybrid'`: oba.                                                                                                                                                                                                                                                                                                                                                    |
| `contentAutoTransformation` | `boolean`                                                                                       | Czy pliki treści mają być automatycznie przekształcane (np. z Markdown na HTML). Domyślnie: `false`              | `true`                  | Przydatne do przetwarzania pól Markdown za pośrednictwem @intlayer/markdown.                                                                                                                                                                                                                                                                                                                                            |

**Przykład `fill`**:

```ts
dictionary: {
  fill: {
    en: '/locales/en/{{key}}.content.json',
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  }
}
```

---

### Konfiguracja AI (AI Configuration)

Definiuje ustawienia dla funkcji Intlayer opartych na AI, takich jak tłumaczenie podczas budowania (build translation).

| Pole                 | Typ                    | Opis                                                                           | Przykład                                    | Uwaga                                                                                                  |
| -------------------- | ---------------------- | ------------------------------------------------------------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `provider`           | `string`               | Dostawca AI do użycia.                                                         | `'openai'`, `'anthropic'`, `'googlevertex'` |                                                                                                        |
| `model`              | `string`               | Model AI do użycia.                                                            | `'gpt-4o'`, `'claude-3-5-sonnet-20240620'`  |                                                                                                        |
| `apiKey`             | `string`               | Klucz API dla wybranego dostawcy.                                              | `process.env.OPENAI_API_KEY`                |                                                                                                        |
| `applicationContext` | `string`               | Dodatkowy kontekst Twojej aplikacji w celu poprawy dokładności tłumaczenia AI. | `'Platforma edukacyjna dla dzieci.'`        |                                                                                                        |
| `baseURL`            | `string`               | Opcjonalny bazowy adres URL dla wywołań API.                                   |                                             | Przydatne, jeśli używasz proxy lub lokalnego wdrożenia AI.                                             |
| `dataSerialization`  | `'json' &#124; 'toon'` | Definiuje sposób wysyłania danych do AI. Domyślnie: `'json'`                   | `'json'`                                    | `'json'`: bardziej stabilny i precyzyjny. `'toon'`: zużywa mniej tokenów, ale może być mniej stabilny. |

---

### Konfiguracja Budowania (Build Configuration)

Ustawienia procesu budowania i optymalizacji Intlayer.

| Pole           | Typ                      | Opis                                                                                                                     | Przykład | Uwaga |
| -------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------ | -------- | ----- |
| `mode`         | `'auto' &#124; 'manual'` | Określa, czy Intlayer ma być uruchamiany automatycznie podczas etapów pre-build aplikacji. Domyślnie: `'auto'`           |          |       |
| `optimize`     | `boolean`                | Określa, czy skompilowane słowniki powinny być optymalizowane pod kątem czasu wykonywania. Domyślnie: `true` w produkcji |          |       |
| `outputFormat` | `('cjs' &#124; 'esm')[]` | Format wyjściowy generowanych plików słownika. Domyślnie: `['cjs', 'esm']`                                               |          |       |
| `checkTypes`   | `boolean`                | Określa, czy Intlayer powinien sprawdzać typy w wygenerowanych plikach. Domyślnie: `false`                               |          |       |

---

### Konfiguracja Systemu (System Configuration)

Te ustawienia są przeznaczone dla zaawansowanych przypadków użycia i wewnętrznej konfiguracji Intlayer.

| Pole                      | Typ      | Opis                                            | Domyślnie                         |
| ------------------------- | -------- | ----------------------------------------------- | --------------------------------- |
| `dictionariesDir`         | `string` | Katalog skompilowanych słowników.               | `'.intlayer/dictionary'`          |
| `moduleAugmentationDir`   | `string` | Katalog dla TypeScript module augmentation.     | `'.intlayer/types'`               |
| `unmergedDictionariesDir` | `string` | Katalog niepołączonych słowników.               | `'.intlayer/unmerged_dictionary'` |
| `typesDir`                | `string` | Katalog wygenerowanych typów.                   | `'.intlayer/types'`               |
| `mainDir`                 | `string` | Główny katalog plików Intlayer.                 | `'.intlayer/main'`                |
| `configDir`               | `string` | Katalog skompilowanych plików konfiguracyjnych. | `'.intlayer/config'`              |
| `cacheDir`                | `string` | Katalog plików pamięci podręcznej.              | `'.intlayer/cache'`               |

---

### Konfiguracja Kompilatora (Compiler Configuration)

Ustawienia kompilatora Intlayer (`intlayer compiler`).

| Pole                  | Typ                      | Opis                                                                                       | Domyślnie |
| --------------------- | ------------------------ | ------------------------------------------------------------------------------------------ | --------- |
| `enabled`             | `boolean`                | Określa, czy kompilator jest aktywny.                                                      | `false`   |
| `output`              | `string &#124; Function` | Ścieżka wyjściowa dla wyodrębnionych słowników.                                            |           |
| `saveComponents`      | `boolean`                | Określa, czy oryginalne pliki źródłowe powinny zostać nadpisane wersjami przekształconymi. | `false`   |
| `noMetadata`          | `boolean`                | Jeśli `true`, kompilator nie będzie dołączać metadanych w wygenerowanych plikach.          | `false`   |
| `dictionaryKeyPrefix` | `string`                 | Opcjonalny prefiks klucza słownika.                                                        | `''`      |

---

### Konfiguracja Rejestratora (Logger Configuration)

Ustawienia dostosowywania wyjścia logów Intlayer.

| Pole     | Typ                                            | Opis                       | Domyślnie      |
| -------- | ---------------------------------------------- | -------------------------- | -------------- |
| `mode`   | `'default' &#124; 'verbose' &#124; 'disabled'` | Tryb rejestrowania.        | `'default'`    |
| `prefix` | `string`                                       | Prefiks komunikatów logów. | `'[intlayer]'` |

---

### Niestandardowe Schematy (Custom Schemas)

| Pole      | Typ                         | Opis                                                                  |
| --------- | --------------------------- | --------------------------------------------------------------------- |
| `schemas` | `Record<string, ZodSchema>` | Pozwala definiować schematy Zod w celu walidacji struktury słowników. |

---

### Wtyczki (Plugins)

| Pole      | Typ                | Opis                                 |
| --------- | ------------------ | ------------------------------------ |
| `plugins` | `IntlayerPlugin[]` | Lista wtyczek Intlayer do aktywacji. |

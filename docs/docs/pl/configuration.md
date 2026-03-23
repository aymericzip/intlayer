---
createdAt: 2024-08-13
updatedAt: 2026-03-20
title: Konfiguracja
description: Dowiedz się, jak skonfigurować Intlayer dla swojej aplikacji. Zrozum różne ustawienia i opcje dostępne do dostosowania Intlayer do Twoich potrzeb.
keywords:
  - konfiguracja
  - ustawienia
  - dostosowywanie
  - Intlayer
  - opcje
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 8.4.0
    date: 2026-03-20
    changes: "Dodano obsługę zapisu obiektowego na poziomie lokali dla 'compiler.output' i 'dictionary.fill'"
  - version: 8.3.0
    date: 2026-03-11
    changes: "Przeniesiono 'baseDir' z konfiguracji 'content' do konfiguracji 'system'"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Zaktualizowano opcje kompilatora, dodano obsługę 'output' i 'noMetadata'"
  - version: 8.1.7
    date: 2026-02-25
    changes: "Zaktualizowano opcje kompilatora"
  - version: 8.1.5
    date: 2026-02-23
    changes: "Dodano opcję kompilatora 'build-only' i prefiks klucza słownika"
  - version: 8.0.6
    date: 2026-02-12
    changes: "Dodano obsługę dostawców Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face i Together AI"
  - version: 8.0.5
    date: 2026-02-06
    changes: "Dodano `dataSerialization` do konfiguracji AI"
  - version: 8.0.0
    date: 2026-01-24
    changes: "Zmiana nazwy trybu importu `live` na `fetch`, aby lepiej opisać mechanizm."
  - version: 8.0.0
    date: 2026-01-22
    changes: "Przeniesiono konfigurację budowania `importMode` do konfiguracji `dictionary`."
  - version: 8.0.0
    date: 2026-01-22
    changes: "Dodano opcję `rewrite` do konfiguracji routingu"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Oddzielono konfigurację systemową od konfiguracji treści. Przeniesiono ścieżki wewnętrzne do właściwości `system`. Dodano `codeDir`, aby oddzielić pliki treści od przekształceń kodu."
  - version: 8.0.0
    date: 2026-01-18
    changes: "Dodano opcje słownika `location` i `schema`"
  - version: 7.5.1
    date: 2026-01-10
    changes: "Dodano obsługę formatów plików JSON5 i JSONC"
  - version: 7.5.0
    date: 2025-12-17
    changes: "Dodano opcję `buildMode`"
  - version: 7.0.0
    date: 2025-10-25
    changes: "Dodano konfigurację `dictionary`"
  - version: 7.0.0
    date: 2025-10-21
    changes: "Zastąpiono `middleware` przez konfigurację `routing`"
  - version: 7.0.0
    date: 2025-10-12
    changes: "Dodano opcję `formatCommand`"
  - version: 6.2.0
    date: 2025-10-12
    changes: "Zaktualizowano opcję `excludedPath`"
  - version: 6.0.2
    date: 2025-09-23
    changes: "Dodano opcję `outputFormat`"
  - version: 6.0.0
    date: 2025-09-21
    changes: "Usunięto pola `dictionaryOutput` i `i18nextResourcesDir`"
  - version: 6.0.0
    date: 2025-09-16
    changes: "Dodano tryb importu `live`"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Zastąpiono pole `hotReload` przez `liveSync` oraz dodano pola `liveSyncPort`, `liveSyncURL`"
  - version: 5.6.1
    date: 2025-07-25
    changes: "Zastąpiono `activateDynamicImport` przez opcję `importMode`"
  - version: 5.6.0
    date: 2025-07-13
    changes: "Zmieniono domyślny `contentDir` z `['src']` na `['.']`"
  - version: 5.5.11
    date: 2025-06-29
    changes: "Dodano komendy `docs`"
---

# Dokumentacja konfiguracji Intlayer

## Przegląd

Pliki konfiguracyjne Intlayer pozwalają na dostosowanie różnych aspektów wtyczki, takich jak internacjonalizacja (i18n), middleware i zarządzanie treścią. Ten dokument zawiera szczegółowy opis każdej właściwości w konfiguracji.

---

## Spis treści

<TOC/>

---

## Obsługa plików konfiguracyjnych

Intlayer akceptuje formaty plików konfiguracyjnych JSON, JS, MJS i TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Przykładowy plik konfiguracyjny

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * Przykład pliku konfiguracyjnego Intlayer pokazujący wszystkie dostępne opcje.
 */
const config: IntlayerConfig = {
  /**
   * Konfiguracja ustawień internacjonalizacji.
   */
  internationalization: {
    /**
     * Lista obsługiwanych lokali w aplikacji.
     * Domyślnie: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * Lista wymaganych lokali, które muszą być zdefiniowane w każdym słowniku.
     * Jeśli pusta, wszystkie locale są wymagane w trybie `strict`.
     * Domyślnie: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Poziom rygoru dla treści zinternacjonalizowanej.
     * - "strict": Błąd, jeśli brakuje zadeklarowanych lokali lub używane są niezadeklarowane locale.
     * - "inclusive": Ostrzeżenia, jeśli brakuje zadeklarowanych lokali.
     * - "loose": Akceptuje każde istniejące locale.
     * Domyślnie: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * Domyślne locale używane jako zapasowe, gdy żądane locale nie zostanie znalezione.
     * Domyślnie: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * Ustawienia kontrolujące operacje na słownikach i zachowanie zapasowe.
   */
  dictionary: {
    /**
     * Kontroluje sposób importowania słowników.
     * - "static": Importowane statycznie w czasie budowania.
     * - "dynamic": Importowane dynamicznie za pomocą Suspense.
     * - "fetch": Pobierane dynamicznie przez API Live Sync.
     * Domyślnie: "static"
     */
    importMode: "static",

    /**
     * Strategia automatycznego uzupełniania brakujących tłumaczeń za pomocą AI.
     * Może być wartością logiczną lub wzorcem ścieżki do zapisywania uzupełnionej treści.
     * Domyślnie: true
     */
    fill: true,

    /**
     * Fizyczna lokalizacja plików słowników.
     * - "local": Przechowywane w lokalnym systemie plików.
     * - "remote": Przechowywane w Intlayer CMS.
     * - "hybrid": Przechowywane zarówno lokalnie, jak i w Intlayer CMS.
     * - "plugin" (lub dowolny ciąg znaków): Dostarczane przez wtyczkę lub niestandardowe źródło.
     * Domyślnie: "local"
     */
    location: "local",

    /**
     * Czy automatycznie przekształcać treść (np. Markdown do HTML).
     * Domyślnie: false
     */
    contentAutoTransformation: false,
  },

  /**
   * Konfiguracja routingu i middleware.
   */
  routing: {
    /**
     * Strategia routingu lokali.
     * - "prefix-no-default": Prefiks dla wszystkich języków z wyjątkiem domyślnego (np. /dashboard, /fr/dashboard).
     * - "prefix-all": Prefiks dla wszystkich języków (np. /en/dashboard, /fr/dashboard).
     * - "no-prefix": Locale nie jest widoczne w adresie URL.
     * - "search-params": Użycie ?locale=...
     * Domyślnie: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Miejsce przechowywania locale wybranego przez użytkownika.
     * Opcje: 'cookie', 'localStorage', 'sessionStorage', 'header' lub ich tablica.
     * Domyślnie: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * Bazowa ścieżka dla adresów URL aplikacji.
     * Domyślnie: ""
     */
    basePath: "",

    /**
     * Własne reguły przepisywania URL dla określonych ścieżek zlokalizowanych.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * Ustawienia wyszukiwania i przetwarzania plików treści.
   */
  content: {
    /**
     * Rozszerzenia plików do skanowania w poszukiwaniu słowników.
     * Domyślnie: ['.content.ts', '.content.js', '.content.json' itp.]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * Katalogi, w których znajdują się pliki .content.
     * Domyślnie: ["."]
     */
    contentDir: ["src"],

    /**
     * Katalog kodu źródłowego.
     * Używany do optymalizacji budowania i przekształceń kodu.
     * Domyślnie: ["."]
     */
    codeDir: ["src"],

    /**
     * Wzorce do wykluczenia ze skanowania.
     * Domyślnie: ['node_modules', '.intlayer' itp.]
     */
    excludedPath: ["node_modules"],

    /**
     * Czy śledzić zmiany i regenerować słowniki podczas deweloperki.
     * Domyślnie: true w trybie deweloperskim
     */
    watch: true,

    /**
     * Polecenie do formatowania nowo utworzonych / zaktualizowanych plików .content.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Konfiguracja edytora wizualnego.
   */
  editor: {
    /**
     * Czy edytor wizualny jest włączony.
     * Domyślnie: false
     */
    enabled: true,

    /**
     * URL Twojej aplikacji do walidacji źródła.
     * Domyślnie: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * Port lokalnego serwera edytora.
     * Domyślnie: 8000
     */
    port: 8000,

    /**
     * Publiczny URL edytora.
     * Domyślnie: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * URL Intlayer CMS.
     * Domyślnie: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * URL serwera API backendu.
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
   * Ustawienia tłumaczenia i generowania opartego na AI.
   */
  ai: {
    /**
     * Wybrany dostawca AI.
     * Opcje: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * Domyślnie: 'openai'
     */
    provider: "openai",

    /**
     * Model dostawcy do użycia.
     */
    model: "gpt-4o",

    /**
     * Klucz API dostawcy.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Globalny kontekst ułatwiający AI generowanie tłumaczeń.
     */
    applicationContext: "To jest aplikacja do rezerwacji podróży.",

    /**
     * Bazowy URL dla API AI.
     */
    baseURL: "http://localhost:3000",

    /**
     * Serializacja danych (Data Serialization)
     *
     * Opcje:
     * - "json": domyślnie, niezawodna; zużywa więcej tokenów.
     * - "toon": szybciej, mniej tokenów, mniej spójna niż JSON.
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
     * - "auto": Automatyczne budowanie podczas budowania aplikacji.
     * - "manual": Wymaga jawnego polecenia budowania.
     * Domyślnie: "auto"
     */
    mode: "auto",

    /**
     * Czy optymalizować wynikowy pakiet poprzez usuwanie nieużywanych słowników.
     * Domyślnie: true w środowisku produkcyjnym
     */
    optimize: true,

    /**
     * Format wyjściowy generowanych plików słowników.
     * Domyślnie: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * Czy przeprowadzać sprawdzanie typów TypeScript podczas budowania.
     * Domyślnie: false
     */
    checkTypes: false,
  },

  /**
   * Konfiguracja loggera.
   */
  log: {
    /**
     * Tryb logowania.
     * - "default": Standardowe logowanie.
     * - "verbose": Szczegółowe logowanie do debugowania.
     * - "disabled": Wyłącz logowanie.
     * Domyślnie: "default"
     */
    mode: "default",

    /**
     * Prefiks dla wszystkich wiadomości w logach.
     * Domyślnie: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * Konfiguracja systemowa (do zaawansowanych zastosowań)
   */
  system: {
    /**
     * Katalog, w którym przechowywane są zlokalizowane słowniki.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Katalog dla module augmentation.
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * Katalog dla niepołączonych słowników.
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * Katalog typów słowników.
     */
    typesDir: ".intlayer/types",

    /**
     * Katalog głównych plików aplikacji.
     */
    mainDir: ".intlayer/main",

    /**
     * Katalog skompilowanych plików konfiguracyjnych.
     */
    configDir: ".intlayer/config",

    /**
     * Katalog plików cache.
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * Konfiguracja kompilatora (do zaawansowanych zastosowań)
   */
  compiler: {
    /**
     * Czy kompilator jest włączony.
     *
     * - false: wyłącz kompilator.
     * - true: włącz kompilator.
     * - "build-only": pomiń kompilator podczas deweloperki dla szybszego startu.
     *
     * Domyślnie: false
     */
    enabled: true,

    /**
     * Definiuje ścieżkę do pliku wyjściowego. Zastępuje `outputDir`.
     *
     * - Ścieżki `./` są rozwiązywane względem katalogu komponentu.
     * - Ścieżki `/` są rozwiązywane względem katalogu bazowego projektu (`baseDir`).
     *
     * - Obecność zmiennej `{{locale}}` w ścieżce wyzwala generowanie osobnych słowników na język.
     *
     * Przykłady:
     * ```ts
     * {
     *   // Tworzy wielojęzyczne pliki .content.ts obok komponentu
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // To samo poprzez ciąg szablonowy
     * }
     * ```
     *
     * ```ts
     * {
     *   // Tworzy scentralizowane pliki JSON na język w korzeniu projektu
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // To samo poprzez ciąg szablonowy
     * }
     * ```
     *
     * Lista zmiennych:
     *   - `fileName`: Nazwa pliku.
     *   - `key`: Klucz treści.
     *   - `locale`: Locale treści.
     *   - `extension`: Rozszerzenie pliku.
     *   - `componentFileName`: Nazwa pliku komponentu.
     *   - `componentExtension`: Rozszerzenie pliku komponentu.
     *   - `format`: Format słownika.
     *   - `componentFormat`: Format słownika komponentu.
     *   - `componentDirPath`: Ścieżka do katalogu komponentu.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Czy zapisać komponenty po ich przekształceniu.
     * W ten sposób można uruchomić kompilator raz, aby przekształcić aplikację, a następnie go usunąć.
     */
    saveComponents: false,

    /**
     * Pozostaw tylko treść w wygenerowanym pliku. Przydatne dla formatów i18next lub ICU MessageFormat JSON na język.
     */
    noMetadata: false,

    /**
     * Prefiks klucza słownika
     */
    dictionaryKeyPrefix: "", // Dodaje opcjonalny prefiks do wyodrębnionych kluczy słownika
  },

  /**
   * Własne schematy do walidacji struktury słowników.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * Konfiguracja wtyczek.
   */
  plugins: [],
};

export default config;
````

---

## Odniesienia do konfiguracji

Poniższe sekcje szczegółowo opisują różne właściwości konfiguracji dostępne w Intlayer.

---

### Konfiguracja internacjonalizacji (Internationalization)

Definiuje ustawienia związane z internacjonalizacją, w tym dostępne locale i domyślne locale.

| Pole              | Opis                                                                              | Typ        | Domyślnie           | Przykład             | Uwagi                                                                                                                                                                                                                                                                                                                               |
| ----------------- | --------------------------------------------------------------------------------- | ---------- | ------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | Lista obsługiwanych lokali w aplikacji.                                           | `string[]` | `[Locales.ENGLISH]` | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                                                                     |
| `requiredLocales` | Lista wymaganych lokali w aplikacji.                                              | `string[]` | `[]`                | `[]`                 | • Jeśli pusta, wszystkie locale są wymagane w trybie `strict`.<br/>• Upewnij się, że wymagane locale są również zdefiniowane w polu `locales`.                                                                                                                                                                                      |
| `strictMode`      | Zapewnia silną implementację zinternacjonalizowanej treści za pomocą TypeScript.  | `string`   | `'inclusive'`       |                      | • Jeśli `"strict"`: Każde zadeklarowane locale musi być zdefiniowane dla funkcji `t` — błąd w przypadku braku lub niezadeklarowanego locale.<br/>• Jeśli `"inclusive"`: Ostrzeżenie dla brakujących lokali, ale pozwala na użycie istniejących niezadeklarowanych lokali.<br/>• Jeśli `"loose"`: Akceptuje każde istniejące locale. |
| `defaultLocale`   | Domyślne locale używane jako zapasowe, gdy żądane locale nie zostanie znalezione. | `string`   | `Locales.ENGLISH`   | `'en'`               | Używane do określenia locale, jeśli żadne nie jest określone w URL, plikach cookie lub nagłówku.                                                                                                                                                                                                                                    |

---

### Konfiguracja edytora (Editor)

Definiuje ustawienia edytora wizualnego, w tym port serwera i status aktywacji.

| Pole                         | Opis                                                                                                                                                                         | Typ                               | Domyślnie                           | Przykład                                                                                        | Uwagi                                                                                                                                                                                                                                           |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | URL Twojej aplikacji.                                                                                                                                                        | `string`                          | `undefined`                         | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • Używane do ograniczania źródła edytora ze względów bezpieczeństwa.<br/>• Jeśli ustawione na `'*'`, edytor jest dostępny z dowolnego źródła.                                                                                                   |
| `port`                       | Port serwera edytora wizualnego.                                                                                                                                             | `number`                          | `8000`                              |                                                                                                 |                                                                                                                                                                                                                                                 |
| `editorURL`                  | URL serwera edytora.                                                                                                                                                         | `string`                          | `'http://localhost:8000'`           | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • Używane do ograniczania źródeł, które mogą wchodzić w interakcję z aplikacją.<br/>• Jeśli ustawione na `'*'`, dostępne z dowolnego źródła.<br/>• Należy to ustawić, jeśli port zostanie zmieniony lub edytor jest hostowany na innej domenie. |
| `cmsURL`                     | URL Intlayer CMS.                                                                                                                                                            | `string`                          | `'https://app.intlayer.org'`        | `'https://app.intlayer.org'`                                                                    |                                                                                                                                                                                                                                                 |
| `backendURL`                 | URL serwera backendu.                                                                                                                                                        | `string`                          | `https://back.intlayer.org`         | `http://localhost:4000`                                                                         |                                                                                                                                                                                                                                                 |
| `enabled`                    | Czy aplikacja powinna wchodzić w interakcję z edytorem wizualnym.                                                                                                            | `boolean`                         | `false`                             | `process.env.NODE_ENV !== 'production'`                                                         | • Jeśli `false`, edytor nie będzie mógł wchodzić w interakcję z aplikacją.<br/>• Wyłączenie tego dla określonych środowisk zwiększa bezpieczeństwo.                                                                                             |
| `clientId`                   | Pozwala pakietom intlayer na uwierzytelnianie w backendzie za pomocą oAuth2. Przejdź do [intlayer.org/project](https://app.intlayer.org/project), aby uzyskać token dostępu. | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | Musi pozostać tajne; używaj zmiennych środowiskowych.                                                                                                                                                                                           |
| `clientSecret`               | Pozwala pakietom intlayer na uwierzytelnianie w backendzie za pomocą oAuth2. Przejdź do [intlayer.org/project](https://app.intlayer.org/project), aby uzyskać token dostępu. | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | Musi pozostać tajne; używaj zmiennych środowiskowych.                                                                                                                                                                                           |
| `dictionaryPriorityStrategy` | Strategia priorytetu słowników, gdy obecne są zarówno słowniki lokalne, jak i zdalne.                                                                                        | `string`                          | `'local_first'`                     | `'distant_first'`                                                                               | • `'distant_first'`: Słowniki zdalne mają pierwszeństwo przed lokalnymi.<br/>• `'local_first'`: Słowniki lokalne mają pierwszeństwo przed zdalnymi.                                                                                             |
| `liveSync`                   | Czy serwer aplikacji powinien natychmiast przeładowywać treść po wykryciu zmian w <br/> CMS <br/> edytorze wizualnym <br/> serwerze backendu.                                | `boolean`                         | `true`                              | `true`                                                                                          | • Aktualizuje treść strony aplikacji po dodaniu/aktualizacji słowników.<br/>• Live Sync pobiera treść z innego serwera, co może nieznacznie wpłynąć na wydajność.<br/>• Zaleca się hostowanie obu na tej samej maszynie.                        |
| `liveSyncPort`               | Port serwera Live Sync.                                                                                                                                                      | `number`                          | `4000`                              | `4000`                                                                                          |                                                                                                                                                                                                                                                 |
| `liveSyncURL`                | URL serwera Live Sync.                                                                                                                                                       | `string`                          | `'http://localhost:{liveSyncPort}'` | `'https://example.com'`                                                                         | Domyślnie wskazuje na localhost; można zmienić na zdalny serwer Live Sync.                                                                                                                                                                      |

---

### Konfiguracja routingu (Routing)

Ustawienia kontrolujące zachowanie routingu, w tym strukturę URL, przechowywanie locale i obsługę middleware.

| Pole       | Opis                                                                                                                                       | Typ                                                                                                                                                                                                          | Domyślnie              | Przykład                                                                                                                                                                                | Uwagi                                                                                                                                                                                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | Tryb struktury URL do zarządzania locale.                                                                                                  | `'prefix-no-default'` &#124; <br/> `'prefix-all'` &#124; <br/> `'no-prefix'` &#124; <br/> `'search-params'`                                                                                                  | `'prefix-no-default'`  | `'prefix-no-default'`: `/dashboard` (en) lub `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: locale zarządzane inaczej. `'search-params'`: `/dashboard?locale=fr` | Nie wpływa na zarządzanie plikami cookie ani pamięcią lokalną.                                                                                                                                                                                                                     |
| `storage`  | Konfiguracja przechowywania locale u klienta.                                                                                              | `false` &#124; <br/> `'cookie'` &#124; <br/> `'localStorage'` &#124; <br/> `'sessionStorage'` &#124; <br/> `'header'` &#124; <br/> `CookiesAttributes` &#124; <br/> `StorageAttributes` &#124; <br/> `Array` | `['cookie', 'header']` | `'localStorage'` <br/> `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                      | Zobacz tabelę opcji przechowywania poniżej.                                                                                                                                                                                                                                        |
| `basePath` | Bazowa ścieżka dla adresów URL aplikacji.                                                                                                  | `string`                                                                                                                                                                                                     | `''`                   | `'/my-app'`                                                                                                                                                                             | Jeśli Twoja aplikacja znajduje się pod adresem `https://example.com/my-app`, basePath to `'/my-app'`, co wskazuje na URL `https://example.com/my-app/en`.                                                                                                                          |
| `rewrite`  | Własne reguły przepisywania URL w celu zmiany domyślnego trybu routingu dla określonych ścieżek. Obsługuje parametry dynamiczne `[param]`. | `Record<string, StrictModeLocaleMap<string>>`                                                                                                                                                                | `undefined`            | Zobacz przykład poniżej                                                                                                                                                                 | • Reguły routingu mają wyższy priorytet niż `mode`.<br/>• Działa z Next.js i Vite.<br/>• `getLocalizedUrl()` automatycznie stosuje pasujące reguły.<br/>• Zobacz [Własne przepisywanie URL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md). |

**Przykład `rewrite`**:

```typescript
routing: {
  mode: "prefix-no-default", // Strategia zapasowa
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

#### Opcje przechowywania (Storage)

| Wartość            | Uwagi                                                                                                                                                                                                  | Opis                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `'cookie'`         | • Zapewnij odpowiednią zgodę użytkownika zgodnie z RODO.<br/>• Można dostosować przez `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`).                | Przechowuje locale w pliku cookie — dostępne zarówno u klienta, jak i na serwerze. |
| `'localStorage'`   | • Nie wygasa, dopóki nie zostanie usunięte jawnie.<br/>• Intlayer Proxy nie ma do niego dostępu.<br/>• Można dostosować przez `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`). | Przechowuje locale w przeglądarce bez daty wygaśnięcia — tylko klient.             |
| `'sessionStorage'` | • Usuwane po zamknięciu karty/okna przeglądarki.<br/>• Intlayer Proxy nie ma do niego dostępu.<br/>• Można dostosować przez `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`). | Przechowuje locale na czas sesji strony — tylko klient.                            |
| `'header'`         | • Przydatne przy wywołaniach API.<br/>• Klient nie ma do niego dostępu.<br/>• Można dostosować przez `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`).                                | Przechowuje lub przekazuje locale przez nagłówki HTTP — tylko serwer.              |

#### Atrybuty Cookie (Cookies Attributes)

Przy użyciu przechowywania w plikach cookie można skonfigurować dodatkowe atrybuty:

| Pole       | Opis                                                    | Typ                                                   |
| ---------- | ------------------------------------------------------- | ----------------------------------------------------- |
| `name`     | Nazwa pliku cookie. Domyślnie: `'INTLAYER_LOCALE'`      | `string`                                              |
| `domain`   | Domena pliku cookie. Domyślnie: `undefined`             | `string`                                              |
| `path`     | Ścieżka pliku cookie. Domyślnie: `undefined`            | `string`                                              |
| `secure`   | Wymagane HTTPS. Domyślnie: `undefined`                  | `boolean`                                             |
| `httpOnly` | Flaga HTTP-only. Domyślnie: `undefined`                 | `boolean`                                             |
| `sameSite` | Polityka SameSite.                                      | `'strict'` &#124; <br/> `'lax'` &#124; <br/> `'none'` |
| `expires`  | Data wygaśnięcia lub liczba dni. Domyślnie: `undefined` | `Date` &#124; <br/> `number`                          |

#### Atrybuty przechowywania (Storage Attributes)

Przy użyciu localStorage lub sessionStorage:

| Pole   | Opis                                                   | Typ                                              |
| ------ | ------------------------------------------------------ | ------------------------------------------------ |
| `type` | Typ przechowywania.                                    | `'localStorage'` &#124; <br/> `'sessionStorage'` |
| `name` | Nazwa klucza w pamięci. Domyślnie: `'INTLAYER_LOCALE'` | `string`                                         |

#### Przykłady konfiguracji

Oto kilka typowych konfiguracji korzystających z nowej struktury routingu v7:

**Podstawowa konfiguracja (Standard)**:

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

**Konfiguracja zgodna z RODO**:

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

**Tryb parametrów wyszukiwania (Search Params)**:

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

**Tryb bez prefiksu (No-Prefix) z własnym miejscem przechowywania**:

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

**Własne przepisywanie URL ze ścieżkami dynamicznymi**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // Rezerwowa strategia dla nieprzepisanych ścieżek
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

### Konfiguracja treści (Content)

Ustawienia do zarządzania treścią w aplikacji, w tym nazwy katalogów, rozszerzenia plików i pochodne konfiguracje.

| Pole             | Opis                                                                                                     | Typ        | Domyślnie                                                                                                                                                                 | Przykład                                                                                                                                                                              | Uwagi                                                                                                                                                     |
| ---------------- | -------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `watch`          | Wskazuje, czy Intlayer powinien śledzić zmiany w plikach deklaracji treści w celu regeneracji słowników. | `boolean`  | `true`                                                                                                                                                                    |                                                                                                                                                                                       |                                                                                                                                                           |
| `fileExtensions` | Rozszerzenia plików do skanowania podczas kompilacji słowników.                                          | `string[]` | `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.json5', '.content.jsonc', '.content.tsx', '.content.jsx']`                     | `['.data.ts', '.data.js', '.data.json']`                                                                                                                                              | Może pomóc uniknąć konfliktów przy dostosowywaniu.                                                                                                        |
| `contentDir`     | Ścieżki do katalogów, w których znajdują się pliki definicji treści (`.content.*`).                      | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library', require.resolve("@my-package/content"), '@my-package/content']`                                                                                          | Używane do śledzenia plików treści i regeneracji słowników.                                                                                               |
| `codeDir`        | Ścieżka do katalogów, w których znajduje się kod, względem katalogu bazowego.                            | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library']`                                                                                                                                                         | • Używane do śledzenia przekształceń plików kodu (usuwanie niepotrzebnych części, optymalizacja).<br/>• Oddzielenie od `contentDir` zwiększa wydajność.   |
| `excludedPath`   | Katalogi, które należy wykluczyć ze skanowania treści.                                                   | `string[]` | `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']` |                                                                                                                                                                                       | Obecnie nieużywane; zaplanowane na przyszłość.                                                                                                            |
| `formatCommand`  | Polecenie do formatowania plików treści, gdy Intlayer zapisuje je lokalnie.                              | `string`   | `undefined`                                                                                                                                                               | `'npx prettier --write "{{file}}" --log-level silent'` (Prettier), `'npx biome format "{{file}}" --write --log-level none'` (Biome), `'npx eslint --fix "{{file}}" --quiet'` (ESLint) | • `{{file}}` zostanie zastąpione ścieżką do pliku.<br/>• Jeśli niezdefiniowane, Intlayer spróbuje automatycznie wykryć (testuje prettier, biome, eslint). |

---

### Konfiguracja słownika (Dictionary)

Opcje kontrolujące operacje na słownikach, w tym zachowanie automatycznego uzupełniania i generowanie treści.

| Pole                        | Opis                                                                                                                                                                                | Typ                                                                                                             | Domyślnie    | Przykład                                                                                    | Uwagi                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | Kontroluje generowanie plików wyjściowych automatycznego uzupełniania (tłumaczenia AI).                                                                                             | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `true`       | `{ en: '/locales/en/{{key}}.json', fr: ({ key }) => '/locales/fr/${key}.json', es: false }` | • `true`: Domyślna ścieżka (ten sam plik co źródło).<br/>• `false`: Wyłączone.<br/>• Wzorzec ciągu/funkcji pozwala na generowanie na poziomie lokali.<br/>• Obiekt na poziomie lokali: Każde locale ma własny wzorzec; `false` wyklucza locale.<br/>• Uwzględnienie `{{locale}}` pozwala na generowanie na poziomie lokali.<br/>• Ustawienie `fill` na poziomie słownika zawsze ma priorytet nad tym globalnym ustawieniem. |
| `description`               | Pomaga edytorowi i CMS zrozumieć przeznaczenie słownika. Używane również jako kontekst do generowania tłumaczeń przez AI.                                                           | `string`                                                                                                        | `undefined`  | `'User profile section'`                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `locale`                    | Przełącza słownik na format specyficzny dla danego locale. Każde zadeklarowane pole staje się węzłem tłumaczenia. Jeśli brak, słownik jest uznawany za zawierający wiele tłumaczeń. | `LocalesValues`                                                                                                 | `undefined`  | `'en'`                                                                                      | Używaj tego, jeśli słownik jest przeznaczony dla konkretnego języka, a nie zawiera wielu tłumaczeń.                                                                                                                                                                                                                                                                                                                         |
| `contentAutoTransformation` | Czy automatycznie przekształcać ciągi znaków treści w typowane węzły (Markdown, HTML lub wstawki).                                                                                  | `boolean` &#124; <br/> `{ markdown?: boolean; html?: boolean; insertion?: boolean }`                            | `false`      | `true`                                                                                      | • Markdown : `### Title` → `md('### Title')` .<br/>• HTML : `<div>Title</div>` → `html('<div>Title</div>')` .<br/>• Wstawki : `Hello {{name}}` → `insert('Hello {{name}}')` .                                                                                                                                                                                                                                               |
| `location`                  | Wskazuje na lokalizację przechowywania plików słowników oraz sposób ich synchronizacji z CMS.                                                                                       | `'local'` &#124; <br/> `'remote'` &#124; <br/> `'hybrid'` &#124; <br/> `'plugin'` &#124; <br/> `string`         | `'local'`    | `'hybrid'`                                                                                  | • `'local'`: Tylko lokalne zarządzanie.<br/>• `'remote'`: Tylko zdalne zarządzanie (CMS).<br/>• `'hybrid'`: Zarządzanie zarówno lokalne, jak i zdalne.<br/>• `'plugin'` lub własne ciągi: Zarządzanie przez wtyczkę lub własne źródło.                                                                                                                                                                                      |
| `importMode`                | Kontroluje sposób importowania słowników.                                                                                                                                           | `'static'` &#124; <br/> `'dynamic'` &#124; <br/> `'fetch'`                                                      | `'static'`   | `'dynamic'`                                                                                 | • `'static'`: Statyczny import.<br/>• `'dynamic'`: Dynamiczny import przez Suspense.<br/>• `'fetch'`: Pobieranie przez API Live Sync; rezerwowa opcja `'dynamic'` w razie błędu.<br/>• Wymagane wtyczki `@intlayer/babel` i `@intlayer/swc`.<br/>• Klucze muszą być zadeklarowane statycznie.<br/>• Ignorowane, jeśli `optimize` jest wyłączone.<br/>• Nie wpływa na `getIntlayer`, `getDictionary` itp.                    |
| `priority`                  | Priorytet słownika. Przy rozwiązywaniu konfliktów między słownikami wyższa wartość ma pierwszeństwo przed niższą.                                                                   | `number`                                                                                                        | `undefined`  | `1`                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `live`                      | ZDEPRECJONOWANE — używaj `importMode: 'fetch'`. Wcześniej wskazywało, czy należy pobierać treść słownika dynamicznie przez API Live Sync.                                           | `boolean`                                                                                                       | `undefined`  |                                                                                             | Przemianowano na `importMode: 'fetch'` w v8.0.0.                                                                                                                                                                                                                                                                                                                                                                            |
| `schema`                    | Generowane automatycznie przez Intlayer do walidacji schematu JSON.                                                                                                                 | `'https://intlayer.org/schema.json'`                                                                            | Automatyczne |                                                                                             | Nie edytuj ręcznie.                                                                                                                                                                                                                                                                                                                                                                                                         |
| `title`                     | Pomaga identyfikować słowniki w edytorze i CMS.                                                                                                                                     | `string`                                                                                                        | `undefined`  | `'User Profile'`                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `tags`                      | Klasyfikuje słowniki i dostarcza kontekst lub instrukcje dla edytora i AI.                                                                                                          | `string[]`                                                                                                      | `undefined`  | `['user', 'profile']`                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `version`                   | Wersja zdalnego słownika; pomaga śledzić używaną obecnie wersję.                                                                                                                    | `string`                                                                                                        | `undefined`  | `'1.0.0'`                                                                                   | • Zarządzane w CMS.<br/>• Nie edytuj lokalnie.                                                                                                                                                                                                                                                                                                                                                                              |

**Przykład `fill`**:

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

### Konfiguracja loggera (Log)

Ustawienia dostosowywania wyjścia logów Intlayer.

| Pole     | Opis                                        | Typ                                                            | Domyślnie       | Przykład           | Uwagi                                                                                                     |
| -------- | ------------------------------------------- | -------------------------------------------------------------- | --------------- | ------------------ | --------------------------------------------------------------------------------------------------------- |
| `mode`   | Wskazuje tryb loggera.                      | `'default'` &#124; <br/> `'verbose'` &#124; <br/> `'disabled'` | `'default'`     | `'verbose'`        | • `'verbose'`: Zapisuje więcej informacji do debugowania.<br/>• `'disabled'`: Całkowicie wyłącza loggera. |
| `prefix` | Prefiks dla wszystkich wiadomości w logach. | `string`                                                       | `'[intlayer] '` | `'[mój prefiks] '` |                                                                                                           |

---

### Konfiguracja AI (AI)

Ustawienia do zarządzania funkcjami AI w Intlayer, w tym dostawca, model i klucz API.

Ta konfiguracja jest opcjonalna, jeśli zarejestrujesz się za pomocą klucza dostępu w [Intlayer Dashboard](https://app.intlayer.org/project). Intlayer automatycznie wybierze najbardziej opłacalne i wydajne rozwiązanie AI dla Twoich potrzeb. Korzystanie z domyślnych ustawień zapewnia najlepsze długoterminowe wsparcie, ponieważ Intlayer stale aktualizuje się, aby korzystać z najnowszych modeli.

Jeśli wolisz korzystać z własnego klucza API lub konkretnego modelu, możesz zdefiniować własną konfigurację AI.
Ta konfiguracja AI będzie używana globalnie w Twoim środowisku Intlayer. Komendy CLI, takie jak `fill`, będą domyślnie używać tych ustawień, podobnie jak SDK, edytor wizualny i CMS. Możesz nadpisać te wartości domyślne w konkretnych przypadkach za pomocą parametrów komend.

Intlayer obsługuje szeroką gamę dostawców AI, aby zapewnić maksymalną elastyczność. Obecnie obsługiwani dostawcy to:

- **OpenAI** (Domyślnie)
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

| Pole                 | Opis                                                                                                                                 | Typ                                                                                                                                                                                                                                                                                                                                                                                            | Domyślnie   | Przykład                                                      | Uwagi                                                                                                                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`           | Dostawca, który będzie używany do funkcji AI w Intlayer.                                                                             | `'openai'` &#124; <br/> `'anthropic'` &#124; <br/> `'mistral'` &#124; <br/> `'deepseek'` &#124; <br/> `'gemini'` &#124; <br/> `'ollama'` &#124; <br/> `'openrouter'` &#124; <br/> `'alibaba'` &#124; <br/> `'fireworks'` &#124; <br/> `'groq'` &#124; <br/> `'huggingface'` &#124; <br/> `'bedrock'` &#124; <br/> `'googleaistudio'` &#124; <br/> `'googlevertex'` &#124; <br/> `'togetherai'` | `undefined` | `'anthropic'`                                                 | Różni dostawcy wymagają różnych kluczy API i mają różne cenniki.                                                                                                                             |
| `model`              | Model AI do użycia w funkcjach AI.                                                                                                   | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Brak        | `'gpt-4o-2024-11-20'`                                         | Konkretne modele zależą od dostawcy.                                                                                                                                                         |
| `temperature`        | Kontroluje losowość odpowiedzi AI.                                                                                                   | `number`                                                                                                                                                                                                                                                                                                                                                                                       | Brak        | `0.1`                                                         | Wyższa temperatura = bardziej kreatywne, ale mniej niezawodne odpowiedzi.                                                                                                                    |
| `apiKey`             | Twój klucz API dla wybranego dostawcy.                                                                                               | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Brak        | `process.env.OPENAI_API_KEY`                                  | Musi pozostać tajny; używaj zmiennych środowiskowych.                                                                                                                                        |
| `applicationContext` | Dodatkowy kontekst o Twojej aplikacji, aby pomóc AI generować dokładniejsze tłumaczenia (domena, grupa docelowa, ton, terminologia). | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Brak        | `'mój własny kontekst aplikacji'`                             | Można użyć do dodania zasad (np.: `"Nie powinieneś tłumaczyć swoich URL"` ).                                                                                                                 |
| `baseURL`            | Bazowy URL dla API AI.                                                                                                               | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Brak        | `'https://api.openai.com/v1'` <br/> `'http://localhost:5000'` | Może wskazywać na lokalne lub własne punkty końcowe API AI.                                                                                                                                  |
| `dataSerialization`  | Format serializacji danych dla funkcji AI.                                                                                           | `'json'` &#124; <br/> `'toon'`                                                                                                                                                                                                                                                                                                                                                                 | `undefined` | `'toon'`                                                      | • `'json'`: domyślnie, niezawodne; zużywa więcej tokenów.<br/>• `'toon'`: mniej tokenów, mniej stabilne.<br/>• Przekazuje modelowi kontekst jako dodatkowy parametr (reasoning effort itp.). |

---

### Konfiguracja budowania (Build)

Ustawienia kontrolujące sposób, w jaki Intlayer optymalizuje i kompiluje internacjonalizację aplikacji.

Ustawienia budowania mają zastosowanie do wtyczek `@intlayer/babel` i `@intlayer/swc`.

> W trybie deweloperskim Intlayer używa statycznego importu słowników w celu ułatwienia procesu deweloperskiego.

> Podczas optymalizacji Intlayer zastępuje wywołania słowników optymalizacją dzielenia kodu (chunking), aby wynikowy pakiet importował tylko te słowniki, które są faktycznie używane.

| Pole              | Opis                                                                       | Typ                              | Domyślnie                                                                                                                                                                         | Przykład                                                                      | Uwagi                                                                                                                                                                                                                                                                                                                                 |
| ----------------- | -------------------------------------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`            | Kontroluje tryb wykonywania budowania.                                     | `'auto'` &#124; <br/> `'manual'` | `'auto'`                                                                                                                                                                          | `'manual'`                                                                    | • `'auto'`: Budowanie jest automatycznie wyzwalane podczas budowania aplikacji.<br/>• `'manual'`: Uruchamiane tylko poprzez jawne polecenie budowania.<br/>• Może być użyte do zapobiegania budowaniu słowników (np. aby uniknąć uruchamiania w środowisku Node.js).                                                                  |
| `optimize`        | Kontroluje, czy optymalizacja budowania jest wykonywana.                   | `boolean`                        | `undefined`                                                                                                                                                                       | `process.env.NODE_ENV === 'production'`                                       | • Jeśli niezdefiniowane, optymalizacja jest wyzwalana podczas budowania frameworka (Vite/Next.js).<br/>• `true` wymusza optymalizację nawet w trybie deweloperskim.<br/>• `false` wyłącza ją.<br/>• Jeśli włączone, zastępuje wywołania słowników optymalizacją chunking.<br/>• Wymagane wtyczki `@intlayer/babel` i `@intlayer/swc`. |
| `checkTypes`      | Wskazuje, czy budowanie powinno sprawdzać typy TypeScript i logować błędy. | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | Może spowolnić proces budowania.                                                                                                                                                                                                                                                                                                      |
| `outputFormat`    | Kontroluje format wyjściowy słowników.                                     | `('esm' &#124; 'cjs')[]`         | `['esm', 'cjs']`                                                                                                                                                                  | `['cjs']`                                                                     |                                                                                                                                                                                                                                                                                                                                       |
| `traversePattern` | Wzorzec dla plików, które mają być skanowane podczas optymalizacji.        | `string[]`                       | `['**/*.{tsx,ts,js,mjs,cjs,jsx,vue,svelte,svte}', '!**/node_modules/**', '!**/dist/**', '!**/.intlayer/**', '!**/*.config.*', '!**/*.test.*', '!**/*.spec.*', '!**/*.stories.*']` | `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']` | • Poprawia wydajność budowania poprzez ograniczenie optymalizacji do odpowiednich plików.<br/>• Ignorowane, jeśli `optimize` jest wyłączone.<br/>• Używa wzorców glob.                                                                                                                                                                |

---

### Konfiguracja systemowa (System)

Te ustawienia są przeznaczone dla zaawansowanych użytkowników i wewnętrznej konfiguracji Intlayer.

| Pole                      | Opis                                            | Typ      | Domyślnie                         | Przykład | Uwagi |
| ------------------------- | ----------------------------------------------- | -------- | --------------------------------- | -------- | ----- |
| `dictionariesDir`         | Katalog dla skompilowanych słowników.           | `string` | `'.intlayer/dictionary'`          |          |       |
| `moduleAugmentationDir`   | Katalog dla module augmentation TypeScript.     | `string` | `'.intlayer/types'`               |          |       |
| `unmergedDictionariesDir` | Katalog dla niepołączonych słowników.           | `string` | `'.intlayer/unmerged_dictionary'` |          |       |
| `typesDir`                | Katalog dla wygenerowanych typów.               | `string` | `'.intlayer/types'`               |          |       |
| `mainDir`                 | Katalog głównych plików Intlayer.               | `string` | `'.intlayer/main'`                |          |       |
| `configDir`               | Katalog skompilowanych plików konfiguracyjnych. | `string` | `'.intlayer/config'`              |          |       |
| `cacheDir`                | Katalog plików cache.                           | `string` | `'.intlayer/cache'`               |          |       |

---

### Konfiguracja kompilatora (Compiler)

Kontroluje ustawienia kompilatora Intlayer, który kolekcjonuje słowniki bezpośrednio z Twoich komponentów.

| Pole                  | Opis                                                                                                                                                                                                                                                                                                                    | Typ                                                                                                             | Domyślnie   | Przykład                                                                                                                                                 | Uwagi                                                                                                                                                                                                                                         |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`             | Wskazuje, czy kompilator powinien być aktywny w celu kolekcjonowania słowników.                                                                                                                                                                                                                                         | `boolean` &#124; <br/> `'build-only'`                                                                           | `true`      | `'build-only'`                                                                                                                                           | `'build-only'` pomija kompilator podczas deweloperki dla szybszego startu; uruchamia się tylko podczas poleceń budowania.                                                                                                                     |
| `dictionaryKeyPrefix` | Prefiks dla zebranych kluczy słowników.                                                                                                                                                                                                                                                                                 | `string`                                                                                                        | `''`        | `'my-prefix-'`                                                                                                                                           | Dodawany przed wygenerowanym kluczem (opartym na nazwie pliku), aby uniknąć konfliktów.                                                                                                                                                       |
| `saveComponents`      | Czy zapisać komponenty po ich przekształceniu.                                                                                                                                                                                                                                                                          | `boolean`                                                                                                       | `false`     |                                                                                                                                                          | • Jeśli `true`, oryginalne pliki zostaną nadpisane przekształconymi wersjami.<br/>• Pozwala na jednorazowe uruchomienie kompilatora, a następnie jego usunięcie.                                                                              |
| `output`              | Definiuje ścieżkę do pliku wyjściowego. Zastępuje `outputDir`. Obsługuje zmienne szablonowe: `{{fileName}}`, <br/> `{{key}}`, <br/> `{{locale}}`, <br/> `{{extension}}`, <br/> `{{componentFileName}}`, <br/> `{{componentExtension}}`, <br/> `{{format}}`, <br/> `{{componentFormat}}`, <br/> `{{componentDirPath}}` . | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `undefined` | `'./{{fileName}}{{extension}}'` <br/> `'/locales/{{locale}}/{{key}}.json'` <br/> `{ en: ({ key }) => './locales/en/${key}.json', fr: '...', es: false }` | • Ścieżki `./` są obliczane względem katalogu komponentu.<br/>• Ścieżki `/` są obliczane względem korzenia projektu.<br/>• `{{locale}}` pozwala na generowanie na poziomie lokali.<br/>• Obsługuje definicję przez obiekt na poziomie lokali. |
| `noMetadata`          | Jeśli `true`, kompilator usuwa metadane słownika (klucz, content wrapper) z wyniku.                                                                                                                                                                                                                                     | `boolean`                                                                                                       | `false`     | `false` → `{"key":"my-key","content":{"key":"value"}}` <br/> `true` → `{"key":"value"}`                                                                  | • Przydatne dla formatów i18next lub ICU MessageFormat JSON na język.<br/>• Dobrze współpracuje z wtyczką `loadJSON`.                                                                                                                         |
| `dictionaryKeyPrefix` | Prefiks klucza słownika                                                                                                                                                                                                                                                                                                 | `string`                                                                                                        | `''`        |                                                                                                                                                          | Dodaje opcjonalny prefiks do wyodrębnionych kluczy słownika                                                                                                                                                                                   |

---

### Własne schematy (Custom Schemas)

| Pole      | Opis                                                                     | Typ                         |
| --------- | ------------------------------------------------------------------------ | --------------------------- |
| `schemas` | Pozwala definiować schematy Zod do walidacji struktury Twoich słowników. | `Record<string, ZodSchema>` |

---

### Wtyczki (Plugins)

| Pole      | Opis                                              | Typ                |
| --------- | ------------------------------------------------- | ------------------ |
| `plugins` | Lista wtyczek Intlayer, które mają być dołączone. | `IntlayerPlugin[]` |

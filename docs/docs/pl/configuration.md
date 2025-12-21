---
createdAt: 2024-08-13
updatedAt: 2025-10-25
title: Konfiguracja
description: Dowiedz się, jak skonfigurować Intlayer dla swojej aplikacji. Zrozum różne ustawienia i opcje dostępne do dostosowania Intlayer do Twoich potrzeb.
keywords:
  - Konfiguracja
  - Ustawienia
  - Personalizacja
  - Intlayer
  - Opcje
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 7.5.0
    date: 2025-12-17
    changes: Dodano opcję `buildMode`
  - version: 7.0.0
    date: 2025-10-25
    changes: Dodano konfigurację `dictionary`
  - version: 7.0.0
    date: 2025-10-21
    changes: Zastąpiono konfigurację `middleware` konfiguracją `routing`
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
    changes: Usunięto pole `dictionaryOutput` oraz pole `i18nextResourcesDir`
  - version: 6.0.0
    date: 2025-09-16
    changes: Dodano tryb importu `live`
  - version: 6.0.0
    date: 2025-09-04
    changes: Zastąpiono pole `hotReload` polem `liveSync` oraz dodano pola `liveSyncPort` i `liveSyncURL`
  - version: 5.6.1
    date: 2025-07-25
    changes: Zastąpiono `activateDynamicImport` opcją `importMode`
  - version: 5.6.0
    date: 2025-07-13
    changes: Zmieniono domyślny contentDir z `['src']` na `['.']`
  - version: 5.5.11
    date: 2025-06-29
    changes: Dodano komendy `docs`
---

# Dokumentacja konfiguracji Intlayer

## Przegląd

Pliki konfiguracyjne Intlayer umożliwiają dostosowanie różnych aspektów wtyczki, takich jak internacjonalizacja, middleware oraz obsługa treści. Ten dokument zawiera szczegółowy opis każdej właściwości w konfiguracji.

---

## Spis treści

<TOC/>

---

## Obsługiwane formaty plików konfiguracyjnych

Intlayer obsługuje formaty plików konfiguracyjnych JSON, JS, MJS oraz TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Przykładowy plik konfiguracyjny

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    contentDir: ["src", "../ui-library"],
  },
  dictionary: {
    fill: "./{{fileName}}.content.json",
  },
  routing: {
    mode: "prefix-no-default",
    storage: "cookie",
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "To jest aplikacja testowa",
  },
  build: {
    importMode: "dynamic",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    contentDir: ["src", "../ui-library"],
  },
  routing: {
    mode: "prefix-no-default",
    storage: "cookie",
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "To jest aplikacja testowa",
  },
  build: {
    importMode: "dynamic",
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
{
  "internationalization": {
    "locales": ["en"],
  },
  "content": {
    "contentDir": ["src", "../ui-library"],
  },
  "dictionary": {
    "fill": "./{{fileName}}.content.json",
  },
  "routing": {
    "mode": "prefix-no-default",
    "storage": "cookie",
  },
  "editor": {
    "applicationURL": "https://example.com",
  },
  "ai": {
    "apiKey": "XXXX",
    "applicationContext": "To jest aplikacja testowa",
  },
  "build": {
    "importMode": "dynamic",
  },
}
```

---

## Odniesienie do konfiguracji

Poniższe sekcje opisują różne ustawienia konfiguracyjne dostępne dla Intlayer.

---

### Konfiguracja internacjonalizacji

Definiuje ustawienia związane z internacjonalizacją, w tym dostępne lokalizacje oraz domyślną lokalizację dla aplikacji.

#### Właściwości

- **locales**:
  - _Typ_: `string[]`
  - _Domyślnie_: `['en']`
  - _Opis_: Lista obsługiwanych lokalizacji w aplikacji.
  - _Przykład_: `['en', 'fr', 'es']`

- **requiredLocales**:
  - _Typ_: `string[]`
  - _Domyślnie_: `[]`
  - _Opis_: Lista wymaganych lokalizacji w aplikacji.
  - _Przykład_: `[]`
  - _Uwaga_: Jeśli pusta, wszystkie lokalizacje są wymagane w trybie `strict`.
  - _Uwaga_: Upewnij się, że wymagane lokalizacje są również zdefiniowane w polu `locales`.
- **strictMode**:
  - _Typ_: `string`
  - _Domyślnie_: `inclusive`
  - _Opis_: Zapewnia silną implementację zinternacjonalizowanej zawartości przy użyciu TypeScript.
  - _Uwaga_: Jeśli ustawione na "strict", funkcja tłumaczenia `t` będzie wymagać zdefiniowania każdej zadeklarowanej lokalizacji. Jeśli jakaś lokalizacja będzie brakować lub nie będzie zadeklarowana w konfiguracji, zostanie zgłoszony błąd.
  - _Uwaga_: Jeśli ustawione na "inclusive", funkcja tłumaczenia `t` będzie wymagać zdefiniowania każdej zadeklarowanej lokalizacji. Jeśli jakaś lokalizacja będzie brakować, zostanie wyświetlone ostrzeżenie. Jednak zaakceptuje lokalizację, która nie jest zadeklarowana w konfiguracji, ale istnieje.
  - _Uwaga_: Jeśli ustawione na "loose", funkcja tłumaczenia `t` zaakceptuje dowolną istniejącą lokalizację.

- **defaultLocale**:
  - _Typ_: `string`
  - _Domyślnie_: `'en'`
  - _Opis_: Domyślna lokalizacja używana jako zapasowa, jeśli żądana lokalizacja nie zostanie znaleziona.
  - _Przykład_: `'en'`
  - _Uwaga_: Używane do określenia lokalizacji, gdy żadna nie jest podana w URL, ciasteczku lub nagłówku.

---

### Konfiguracja edytora

Definiuje ustawienia związane z zintegrowanym edytorem, w tym port serwera i status aktywności.

#### Właściwości

- **applicationURL**:
  - _Typ_: `string`
  - _Domyślnie_: `http://localhost:3000`
  - _Opis_: URL aplikacji. Używany do ograniczenia pochodzenia edytora ze względów bezpieczeństwa.
  - _Przykład_:
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Uwaga_: URL aplikacji. Używany do ograniczenia pochodzenia edytora ze względów bezpieczeństwa. Jeśli ustawiony na `'*'`, edytor jest dostępny z dowolnego pochodzenia.

- **port**:
  - _Typ_: `number`
  - _Domyślnie_: `8000`
  - _Opis_: Port używany przez serwer wizualnego edytora.

- **editorURL**:
  - _Typ_: `string`
  - _Domyślnie_: `'http://localhost:8000'`
  - _Opis_: URL serwera edytora. Używany do ograniczenia pochodzenia edytora ze względów bezpieczeństwa.
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Uwaga_: URL serwera edytora, do którego aplikacja się łączy. Używany do ograniczenia pochodzenia, które może wchodzić w interakcję z aplikacją ze względów bezpieczeństwa. Jeśli ustawiony na `'*'`, edytor jest dostępny z dowolnego pochodzenia. Powinien być ustawiony, jeśli zmieniono port lub jeśli edytor jest hostowany na innej domenie.

- **cmsURL**:
  - _Typ_: `string`
  - _Domyślnie_: `'https://intlayer.org'`
  - _Opis_: URL systemu CMS Intlayer.
  - _Przykład_: `'https://intlayer.org'`
  - _Uwaga_: URL systemu CMS Intlayer.

- **backendURL**:
  - _Typ_: `string`
  - _Domyślnie_: `https://back.intlayer.org`
  - _Opis_: URL serwera backendowego.
  - _Przykład_: `http://localhost:4000`

- **enabled**:
  - _Typ_: `boolean`
  - _Domyślnie_: `true`
  - _Opis_: Wskazuje, czy aplikacja wchodzi w interakcję z edytorem wizualnym.
  - _Przykład_: `process.env.NODE_ENV !== 'production'`
  - _Uwaga_: Jeśli wartość jest prawdziwa, edytor będzie mógł wchodzić w interakcję z aplikacją. Jeśli fałszywa, edytor nie będzie mógł wchodzić w interakcję z aplikacją. W każdym przypadku edytor może być włączony tylko przez edytor wizualny. Wyłączanie edytora dla określonych środowisk jest sposobem na zwiększenie bezpieczeństwa.

- **clientId**:
  - _Typ_: `string` | `undefined`
  - _Domyślnie_: `undefined`
  - _Opis_: clientId i clientSecret pozwalają pakietom intlayer na uwierzytelnianie się z backendem za pomocą uwierzytelniania oAuth2. Token dostępu jest używany do uwierzytelniania użytkownika związanego z projektem. Aby uzyskać token dostępu, przejdź do https://intlayer.org/dashboard/project i załóż konto.
  - _Przykład_: `true`
  - _Uwaga_: Ważne: clientId i clientSecret powinny być przechowywane w tajemnicy i nie udostępniane publicznie. Upewnij się, że są przechowywane w bezpiecznym miejscu, na przykład w zmiennych środowiskowych.

- **clientSecret**:
  - _Typ_: `string` | `undefined`
  - _Domyślnie_: `undefined`
  - _Opis_: clientId i clientSecret pozwalają pakietom intlayer na uwierzytelnianie się z backendem za pomocą uwierzytelniania oAuth2. Token dostępu jest używany do uwierzytelniania użytkownika związanego z projektem. Aby uzyskać token dostępu, przejdź do https://intlayer.org/dashboard/project i załóż konto.
  - _Przykład_: `true`
  - _Uwaga_: Ważne: clientId i clientSecret powinny być przechowywane w tajemnicy i nie udostępniane publicznie. Upewnij się, że są przechowywane w bezpiecznym miejscu, na przykład w zmiennych środowiskowych.

- **dictionaryPriorityStrategy**:
  - _Typ_: `string`
  - _Domyślnie_: `'local_first'`
  - _Opis_: Strategia priorytetyzacji słowników w przypadku obecności zarówno lokalnych, jak i zdalnych słowników. Jeśli ustawiona na `'distant_first'`, aplikacja będzie priorytetowo traktować słowniki zdalne nad lokalnymi. Jeśli ustawiona na `'local_first'`, aplikacja będzie priorytetowo traktować słowniki lokalne nad zdalnymi.
  - _Przykład_: `'distant_first'`

- **liveSync**:
  - _Typ_: `boolean`
  - _Domyślnie_: `false`
  - _Opis_: Wskazuje, czy serwer aplikacji powinien automatycznie przeładowywać zawartość aplikacji po wykryciu zmiany w CMS / Visual Editor / Backend.
  - _Przykład_: `true`
  - _Uwaga_: Na przykład, gdy zostanie dodany lub zaktualizowany nowy słownik, aplikacja zaktualizuje zawartość wyświetlaną na stronie.
  - _Uwaga_: Live sync wymaga zewnętrznego udostępnienia zawartości aplikacji na innym serwerze. Oznacza to, że może to nieznacznie wpłynąć na wydajność aplikacji. Aby to ograniczyć, zalecamy hostowanie aplikacji i serwera live sync na tej samej maszynie. Ponadto, połączenie live sync i `optimize` może generować znaczną liczbę zapytań do serwera live sync. W zależności od infrastruktury, zalecamy przetestowanie obu opcji oraz ich kombinacji.

- **liveSyncPort**:
  - _Typ_: `number`
  - _Domyślnie_: `4000`
  - _Opis_: Port serwera live sync.
  - _Przykład_: `4000`
  - _Uwaga_: Port serwera live sync.

- **liveSyncURL**:
  - _Typ_: `string`
  - _Domyślnie_: `'http://localhost:{liveSyncPort}'`
  - _Opis_: URL serwera live sync.
  - _Przykład_: `'https://example.com'`
  - _Uwaga_: Domyślnie wskazuje na localhost, ale może zostać zmieniony na dowolny URL w przypadku zdalnego serwera live sync.

### Konfiguracja routingu

Ustawienia kontrolujące zachowanie routingu, w tym strukturę URL, przechowywanie lokalizacji oraz obsługę middleware.

#### Właściwości

- **mode**:
  - _Typ_: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
  - _Domyślnie_: `'prefix-no-default'`
  - _Opis_: Tryb routingu URL dla obsługi lokalizacji.
  - _Przykłady_:
    - `'prefix-no-default'`: `/dashboard` (en) lub `/fr/dashboard` (fr)
    - `'prefix-all'`: `/en/dashboard` (en) lub `/fr/dashboard` (fr)
    - `'no-prefix'`: `/dashboard` (lokalizacja obsługiwana innymi metodami)
    - `'search-params'`: `/dashboard?locale=fr`
  - _Uwaga_: To ustawienie nie wpływa na zarządzanie ciasteczkami ani przechowywaniem lokalizacji.

- **storage**:
  - _Typ_: `false | 'cookie' | 'localStorage' | 'sessionStorage' | 'header' | CookiesAttributes | StorageAttributes | Array`
  - _Domyślnie_: `'localStorage'`
  - _Opis_: Konfiguracja przechowywania lokalizacji po stronie klienta.

  - **cookie**:
    - _Opis_: Przechowuje dane w ciasteczkach, małych fragmentach danych zapisywanych w przeglądarce klienta, dostępnych zarówno po stronie klienta, jak i serwera.
    - _Uwaga_: Aby przechowywanie było zgodne z RODO, należy zapewnić odpowiednią zgodę użytkownika przed użyciem.
    - _Uwaga_: Parametry ciasteczek są konfigurowalne, jeśli ustawione jako CookiesAttributes (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`).

  - **localStorage**:
    - _Opis_: Przechowuje dane w przeglądarce bez dat wygaśnięcia, co pozwala na utrzymanie danych pomiędzy sesjami, dostępne tylko po stronie klienta.
    - _Uwaga_: Idealne do przechowywania danych długoterminowych, ale należy pamiętać o kwestiach prywatności i bezpieczeństwa ze względu na brak automatycznego wygasania, chyba że dane zostaną wyraźnie usunięte.
    - _Uwaga_: Przechowywanie lokalizacji jest dostępne tylko po stronie klienta, proxy intlayer nie będzie miało do niego dostępu.
    - _Uwaga_: Parametry przechowywania lokalizacji są konfigurowalne, jeśli ustawione jako StorageAttributes (`{ type: 'localStorage', name: 'custom-locale' }`).

  - **sessionStorage**:
    - _Opis_: Przechowuje dane przez czas trwania sesji strony, co oznacza, że dane są usuwane po zamknięciu zakładki lub okna, dostępne tylko po stronie klienta.
    - _Uwaga_: Odpowiednie do tymczasowego przechowywania danych dla każdej sesji.
    - _Uwaga_: Przechowywanie lokalne jest dostępne tylko po stronie klienta, proxy intlayer nie będzie miało do niego dostępu.
    - _Uwaga_: Parametry przechowywania lokalnego są konfigurowalne, jeśli ustawione jako StorageAttributes (`{ type: 'sessionStorage', name: 'custom-locale' }`).

  - **header**:
    - _Opis_: Wykorzystuje nagłówki HTTP do przechowywania lub przesyłania danych lokalizacyjnych, odpowiednie do określania języka po stronie serwera.
    - _Uwaga_: Przydatne w wywołaniach API do utrzymania spójnych ustawień językowych w żądaniach.
    - _Uwaga_: Nagłówek jest dostępny tylko po stronie serwera, klient nie będzie miał do niego dostępu.
    - _Uwaga_: Nazwa nagłówka jest konfigurowalna, jeśli ustawiona jako StorageAttributes (`{ type: 'header', name: 'custom-locale' }`).

- **basePath**:
  - _Typ_: `string`
  - _Domyślnie_: `''`
  - _Opis_: Podstawowa ścieżka dla adresów URL aplikacji.
  - _Przykład_: `'/my-app'`
  - _Uwaga_:
    - Jeśli aplikacja jest hostowana pod adresem `https://example.com/my-app`
    - Podstawowa ścieżka to `'/my-app'`
    - Adres URL będzie `https://example.com/my-app/en`
    - Jeśli podstawowa ścieżka nie jest ustawiona, adres URL będzie `https://example.com/en`

#### Atrybuty ciasteczek

Podczas korzystania z przechowywania w ciasteczkach, możesz skonfigurować dodatkowe atrybuty ciasteczek:

- **name**: Nazwa ciasteczka (domyślnie: `'INTLAYER_LOCALE'`)
- **domain**: Domeną ciasteczka (domyślnie: niezdefiniowane)
- **path**: Ścieżka ciasteczka (domyślnie: niezdefiniowane)
- **secure**: Wymagaj HTTPS (domyślnie: niezdefiniowane)
- **httpOnly**: Flaga HTTP-only (domyślnie: niezdefiniowane)
- **sameSite**: Polityka SameSite (`'strict' | 'lax' | 'none'`)
- **expires**: Data wygaśnięcia lub liczba dni (domyślnie: niezdefiniowane)

#### Atrybuty przechowywania lokalnego

Podczas korzystania z localStorage lub sessionStorage:

- **type**: Typ przechowywania (`'localStorage' | 'sessionStorage'`)
- **name**: Nazwa klucza przechowywania (domyślnie: `'INTLAYER_LOCALE'`)

#### Przykłady konfiguracji

Oto kilka typowych przykładów konfiguracji dla nowej struktury routingu w wersji v7:

**Podstawowa konfiguracja (domyślna)**:

```typescript
// intlayer.config.ts
export default defineConfig({
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: "localStorage",
    headerName: "x-intlayer-locale",
    basePath: "",
  },
});
```

**Konfiguracja zgodna z RODO**:

```typescript
// intlayer.config.ts
export default defineConfig({
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
    headerName: "x-intlayer-locale",
    basePath: "",
  },
});
```

**Tryb parametrów wyszukiwania**:

```typescript
// intlayer.config.ts
export default defineConfig({
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "search-params",
    storage: "localStorage",
    headerName: "x-intlayer-locale",
    basePath: "",
  },
});
```

**Tryb bez prefiksu z niestandardową pamięcią**:

```typescript
// intlayer.config.ts
export default defineConfig({
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
    headerName: "x-custom-locale",
    basePath: "/my-app",
  },
});
```

---

### Konfiguracja treści

Ustawienia związane z obsługą treści w aplikacji, w tym nazwy katalogów, rozszerzenia plików oraz pochodne konfiguracje.

#### Właściwości

- **watch**:
  - _Typ_: `boolean`
  - _Domyślnie_: `process.env.NODE_ENV === 'development'`
  - _Opis_: Wskazuje, czy Intlayer powinien obserwować zmiany w plikach deklaracji treści w aplikacji, aby przebudować powiązane słowniki.

- **fileExtensions**:
  - _Typ_: `string[]`
  - _Domyślnie_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Opis_: Rozszerzenia plików, które mają być wyszukiwane podczas budowania słowników.
  - _Przykład_: `['.data.ts', '.data.js', '.data.json']`
  - _Uwaga_: Dostosowanie rozszerzeń plików może pomóc uniknąć konfliktów.

- **baseDir**:
  - _Typ_: `string`
  - _Domyślnie_: `process.cwd()`
  - _Opis_: Katalog bazowy projektu.
  - _Przykład_: `'/path/to/project'`
  - _Uwaga_: Jest używany do rozwiązywania wszystkich katalogów związanych z Intlayer.

- **contentDir**:
  - _Typ_: `string[]`
  - _Domyślnie_: `['.']`
  - _Przykład_: `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _Opis_: Ścieżka katalogu, w którym przechowywana jest zawartość.

- **dictionariesDir**:
  - _Typ_: `string`
  - _Domyślnie_: `'.intlayer/dictionaries'`
  - _Opis_: Ścieżka katalogu do przechowywania wyników pośrednich lub wyjściowych.

- **moduleAugmentationDir**:
  - _Typ_: `string`
  - _Domyślnie_: `'.intlayer/types'`
  - _Opis_: Katalog do rozszerzania modułów, umożliwiający lepsze sugestie w IDE i sprawdzanie typów.
  - _Przykład_: `'intlayer-types'`
  - _Uwaga_: Upewnij się, że jest to uwzględnione w `tsconfig.json`.

- **unmergedDictionariesDir**:
  - _Typ_: `string`
  - _Domyślnie_: `'.intlayer/unmerged_dictionary'`
  - _Opis_: Katalog do przechowywania niepołączonych słowników.
  - _Przykład_: `'translations'`

- **dictionariesDir**:
  - _Typ_: `string`
  - _Domyślnie_: `'.intlayer/dictionary'`
  - _Opis_: Katalog do przechowywania słowników lokalizacyjnych.
  - _Przykład_: `'translations'`

- **typesDir**:
  - _Typ_: `string`
  - _Domyślnie_: `'types'`
  - _Opis_: Katalog do przechowywania typów słowników.
  - _Przykład_: `'intlayer-types'`

- **mainDir**:
  - _Typ_: `string`
  - _Domyślnie_: `'main'`
  - _Opis_: Katalog, w którym przechowywane są główne pliki aplikacji.
  - _Przykład_: `'intlayer-main'`

- **excludedPath**:
  - _Typ_: `string[]`
  - _Domyślnie_: `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']`
  - _Opis_: Katalogi wykluczone z wyszukiwania treści.
  - _Uwaga_: To ustawienie nie jest jeszcze używane, ale planowane do implementacji w przyszłości.

- **formatCommand**:
  - _Typ_: `string`
  - _Domyślnie_: `undefined`
  - _Opis_: Komenda do formatowania zawartości. Gdy intlayer zapisuje lokalnie twoje pliki .content, ta komenda będzie używana do formatowania zawartości.
  - _Przykład_: `'npx prettier --write "{{file}}" --log-level silent'` Użycie Prettier
  - _Przykład_: `'npx biome format "{{file}}" --write --log-level none'` Użycie Biome
  - _Przykład_: `'npx eslint --fix "{{file}}"  --quiet'` Użycie ESLint
  - _Uwaga_: Intlayer zastąpi {{file}} ścieżką do pliku, który ma zostać sformatowany.
  - _Uwaga_: Jeśli nie zostanie ustawione, Intlayer spróbuje automatycznie wykryć polecenie formatowania. Próbując rozpoznać następujące polecenia: prettier, biome, eslint.

### Konfiguracja Słownika

Ustawienia kontrolujące operacje słownika, w tym zachowanie automatycznego wypełniania oraz generowanie zawartości.

Ta konfiguracja słownika służy dwóm głównym celom:

1. **Wartości domyślne**: Definiowanie wartości domyślnych podczas tworzenia plików deklaracji zawartości
2. **Zachowanie zapasowe**: Zapewnienie wartości zapasowych, gdy konkretne pola nie są zdefiniowane, co pozwala na globalne określenie zachowania operacji słownika

Aby uzyskać więcej informacji na temat plików deklaracji zawartości oraz sposobu stosowania wartości konfiguracyjnych, zobacz [Dokumentację pliku zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

#### Właściwości

- **fill**
- **description**
- **locale**
- **priority**
- **live**
- **title**
- **tags**
- **version**

---

### Konfiguracja Loggera

Ustawienia kontrolujące logger, w tym prefiks do użycia.

#### Właściwości

- **mode**:
  - _Typ_: `string`
  - _Domyślnie_: `default`
  - _Opis_: Określa tryb loggera.
  - _Opcje_: `default`, `verbose`, `disabled`
  - _Przykład_: `default`
  - _Uwaga_: Tryb loggera. Tryb verbose będzie logował więcej informacji, ale może być używany do celów debugowania. Tryb disabled wyłączy logger.

- **prefix**:
  - _Typ_: `string`
  - _Domyślnie_: `'[intlayer] '`
  - _Opis_: Prefiks loggera.
  - _Przykład_: `'[my custom prefix] '`
  - _Uwaga_: Prefiks loggera.

### Konfiguracja AI

Ustawienia kontrolujące funkcje AI w Intlayer, w tym dostawcę, model i klucz API.

Ta konfiguracja jest opcjonalna, jeśli jesteś zarejestrowany na [Intlayer Dashboard](https://intlayer.org/dashboard/project) i korzystasz z klucza dostępu. Intlayer automatycznie zarządza najbardziej efektywnym i opłacalnym rozwiązaniem AI dla Twoich potrzeb. Korzystanie z domyślnych opcji zapewnia lepszą długoterminową utrzymalność, ponieważ Intlayer stale aktualizuje się, aby korzystać z najbardziej odpowiednich modeli.

Jeśli wolisz używać własnego klucza API lub konkretnego modelu, możesz zdefiniować własną konfigurację AI.
Ta konfiguracja AI będzie używana globalnie w całym środowisku Intlayer. Polecenia CLI będą korzystać z tych ustawień jako domyślnych dla poleceń (np. `fill`), a także SDK, Visual Editor i CMS. Możesz nadpisać te domyślne wartości dla konkretnych przypadków użycia, korzystając z parametrów poleceń.

Intlayer obsługuje wielu dostawców AI, aby zapewnić większą elastyczność i wybór. Obecnie obsługiwani dostawcy to:

- **OpenAI** (domyślny)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Meta Llama**

#### Właściwości

- **provider**:
  - _Typ_: `string`
  - _Domyślnie_: `'openai'`
  - _Opis_: Dostawca używany do funkcji AI w Intlayer.
  - _Opcje_: `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`, `'ollama'`
  - _Przykład_: `'anthropic'`
  - _Uwaga_: Różni dostawcy mogą wymagać różnych kluczy API i mieć różne modele cenowe.

- **model**:
  - _Typ_: `string`
  - _Domyślnie_: Brak
  - _Opis_: Model używany do funkcji AI w Intlayer.
  - _Przykład_: `'gpt-4o-2024-11-20'`
  - _Uwaga_: Konkretne modele różnią się w zależności od dostawcy.

- **temperature**:
  - _Typ_: `number`
  - _Domyślnie_: Brak
  - _Opis_: Temperatura kontroluje losowość odpowiedzi AI.
  - _Przykład_: `0.1`
  - _Uwaga_: Wyższa temperatura sprawia, że AI jest bardziej kreatywne i mniej przewidywalne.

- **apiKey**:
  - _Typ_: `string`
  - _Domyślnie_: Brak
  - _Opis_: Twój klucz API dla wybranego dostawcy.
  - _Przykład_: `process.env.OPENAI_API_KEY`
  - _Uwaga_: Ważne: Klucze API powinny być przechowywane w tajemnicy i nie udostępniane publicznie. Proszę upewnić się, że są przechowywane w bezpiecznym miejscu, takim jak zmienne środowiskowe.

- **applicationContext**:
  - _Typ_: `string`
  - _Domyślnie_: Brak
  - _Opis_: Dostarcza dodatkowy kontekst dotyczący Twojej aplikacji dla modelu AI, pomagając mu generować dokładniejsze i kontekstowo odpowiednie tłumaczenia. Może to obejmować informacje o domenie aplikacji, docelowej grupie odbiorców, tonie lub specyficznej terminologii.

- **baseURL**:
  - _Typ_: `string`
  - _Domyślnie_: Brak
  - _Opis_: Podstawowy URL dla API AI.
  - _Przykład_: `'https://api.openai.com/v1'`
  - _Uwaga_: Może być używany do wskazania lokalnego lub niestandardowego punktu końcowego API AI.

### Konfiguracja Budowania

Ustawienia kontrolujące, jak Intlayer optymalizuje i buduje internacjonalizację Twojej aplikacji.

Opcje budowania dotyczą wtyczek `@intlayer/babel` oraz `@intlayer/swc`.

> W trybie deweloperskim Intlayer używa statycznych importów słowników, aby uprościć proces tworzenia aplikacji.

> Po optymalizacji Intlayer zastąpi wywołania słowników, aby zoptymalizować podział na części (chunking), dzięki czemu finalny pakiet zaimportuje tylko te słowniki, które są faktycznie używane.

#### Właściwości

- **mode**:
  - _Typ_: `'auto' | 'manual'`
  - _Domyślnie_: `'auto'`
  - _Opis_: Kontroluje tryb budowania.
  - _Przykład_: `'manual'`
  - _Uwaga_: Jeśli 'auto', budowanie zostanie włączone automatycznie podczas budowania aplikacji.
  - _Uwaga_: Jeśli 'manual', budowanie zostanie ustawione tylko po wykonaniu polecenia budowania.
  - _Uwaga_: Może być używane do wyłączenia budowania słowników, na przykład gdy należy unikać wykonywania w środowisku Node.js.

- **optimize**:
  - _Typ_: `boolean`
  - _Domyślnie_: `process.env.NODE_ENV === 'production'`
  - _Opis_: Kontroluje, czy budowa powinna być zoptymalizowana.
  - _Przykład_: `true`
  - _Uwaga_: Po włączeniu Intlayer zastąpi wszystkie wywołania słowników, aby zoptymalizować podział na części. W ten sposób finalny pakiet zaimportuje tylko używane słowniki. Wszystkie importy pozostaną statyczne, aby uniknąć asynchronicznego przetwarzania podczas ładowania słowników.
  - _Uwaga_: Intlayer zastąpi wszystkie wywołania `useIntlayer` trybem zdefiniowanym przez opcję `importMode` oraz `getIntlayer` funkcją `getDictionary`.
  - _Uwaga_: Ta opcja wymaga wtyczek `@intlayer/babel` oraz `@intlayer/swc`.
  - _Uwaga_: Upewnij się, że wszystkie klucze są deklarowane statycznie w wywołaniach `useIntlayer`, np. `useIntlayer('navbar')`.

- **importMode**:
  - _Typ_: `'static' | 'dynamic' | 'live'`
  - _Domyślnie_: `'static'`
  - _Opis_: Kontroluje sposób importowania słowników.
  - _Przykład_: `'dynamic'`
  - _Uwaga_: Dostępne tryby:
    - "static": Słowniki są importowane statycznie. Zastępuje `useIntlayer` funkcją `useDictionary`.
    - "dynamic": Słowniki są importowane dynamicznie z użyciem Suspense. Zastępuje `useIntlayer` funkcją `useDictionaryDynamic`.
- "live": Słowniki są pobierane dynamicznie za pomocą API synchronizacji na żywo. Zastępuje `useIntlayer` funkcją `useDictionaryDynamic`.
- _Uwaga_: Importy dynamiczne opierają się na Suspense i mogą nieznacznie wpływać na wydajność renderowania.
- _Uwaga_: Jeśli wyłączone, wszystkie lokalizacje zostaną załadowane jednocześnie, nawet jeśli nie są używane.
- _Uwaga_: Ta opcja wymaga wtyczek `@intlayer/babel` oraz `@intlayer/swc`.
- _Uwaga_: Upewnij się, że wszystkie klucze są zadeklarowane statycznie w wywołaniach `useIntlayer`, np. `useIntlayer('navbar')`.
- _Uwaga_: Ta opcja zostanie zignorowana, jeśli `optimize` jest wyłączone.
  - _Uwaga_: Jeśli ustawione na "live", tylko słowniki zawierające zdalną zawartość i oznaczone flagą "live" zostaną przekształcone w tryb live. Pozostałe zostaną zaimportowane dynamicznie w trybie "dynamic", aby zoptymalizować liczbę zapytań fetch i wydajność ładowania.
  - _Uwaga_: Tryb live będzie korzystał z API synchronizacji na żywo do pobierania słowników. Jeśli wywołanie API się nie powiedzie, słowniki zostaną zaimportowane dynamicznie w trybie "dynamic".
  - _Uwaga_: Ta opcja nie wpłynie na funkcje `getIntlayer`, `getDictionary`, `useDictionary`, `useDictionaryAsync` oraz `useDictionaryDynamic`.
- **outputFormat**:
  - _Typ_: `'esm' | 'cjs'`
  - _Domyślnie_: `'esm'`
  - _Opis_: Kontroluje format wyjściowy słowników.
  - _Przykład_: `'cjs'`
  - _Uwaga_: Format wyjściowy słowników.

- **traversePattern**:
  - _Typ_: `string[]`
  - _Domyślnie_: `['**\/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx}', '!**\/node_modules/**']`
  - _Opis_: Wzorce definiujące, które pliki powinny być przeszukiwane podczas optymalizacji.
    - _Przykład_: `['src/**\/*.{ts,tsx}', '../ui-library/**\/*.{ts,tsx}', '!**/node_modules/**']`
  - _Uwaga_: Użyj tego, aby ograniczyć optymalizację do istotnych plików kodu i poprawić wydajność budowania.
  - _Uwaga_: Ta opcja zostanie zignorowana, jeśli `optimize` jest wyłączone.
  - _Uwaga_: Używaj wzorców glob.

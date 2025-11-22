---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: CLI
description: Odkryj, jak używać Intlayer CLI do zarządzania swoją wielojęzyczną stroną internetową. Postępuj zgodnie z krokami w tej dokumentacji online, aby skonfigurować swój projekt w kilka minut.
keywords:
  - CLI
  - Interfejs wiersza poleceń
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 7.2.3
    date: 2025-11-22
    changes: Dodaj polecenie transform
  - version: 7.1.0
    date: 2025-11-05
    changes: Dodano opcję skipIfExists do polecenia translate
  - version: 6.1.4
    date: 2025-01-27
    changes: Dodano aliasy dla argumentów i poleceń CLI
  - version: 6.1.3
    date: 2025-10-05
    changes: Dodano opcję build do poleceń
  - version: 6.1.2
    date: 2025-09-26
    changes: Dodano polecenie version
  - version: 6.1.0
  date: 2025-09-26
  changes: Ustaw opcję verbose domyślnie na true za pomocą CLI
- version: 6.1.0
  date: 2025-09-23
  changes: Dodano polecenie watch oraz opcję with
- version: 6.0.1
  date: 2025-09-23
  changes: Dodano polecenie editor
- version: 6.0.0
  date: 2025-09-17
  changes: Dodano polecenia content test i list
- version: 5.5.11
  date: 2025-07-11
  changes: Zaktualizowano dokumentację parametrów poleceń CLI
- version: 5.5.10
  date: 2025-06-29
  changes: Inicjalizacja historii
---

# Intlayer CLI

---

## Spis treści

<TOC/>

---

## Instalacja pakietu

Zainstaluj niezbędne pakiety za pomocą npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> Jeśli pakiet `intlayer` jest już zainstalowany, CLI jest instalowane automatycznie. Możesz pominąć ten krok.

## Pakiet intlayer-cli

Pakiet `intlayer-cli` służy do transpile'owania Twoich [deklaracji intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md) na słowniki.

Ten pakiet transpile'uje wszystkie pliki intlayer, takie jak `src/**/*.content.{ts|js|mjs|cjs|json}`. [Zobacz, jak deklarować pliki deklaracji Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Aby interpretować słowniki intlayer, możesz użyć interpreterów, takich jak [react-intlayer](https://www.npmjs.com/package/react-intlayer) lub [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Obsługa plików konfiguracyjnych

Intlayer akceptuje wiele formatów plików konfiguracyjnych:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Aby zobaczyć, jak skonfigurować dostępne lokalizacje lub inne parametry, odwołaj się do [dokumentacji konfiguracyjnej tutaj](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

## Uruchamianie poleceń intlayer

### Sprawdź wersję CLI

```bash
npx intlayer --version
npx intlayer version
```

Oba polecenia wyświetlają zainstalowaną wersję Intlayer CLI.

### Budowanie słowników

Aby zbudować swoje słowniki, możesz uruchomić polecenia:

```bash
npx intlayer build
```

lub w trybie obserwacji

```bash
npx intlayer build --watch
```

To polecenie domyślnie znajdzie Twoje pliki deklaracji zawartości w ścieżce `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. Następnie zbuduje słowniki w katalogu `.intlayer`.

##### Alias:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

##### Argumenty:

- **`--base-dir`**: Określ katalog bazowy projektu. Aby pobrać konfigurację intlayer, polecenie będzie szukać pliku `intlayer.config.{ts,js,json,cjs,mjs}` w katalogu bazowym.

  > Przykład: `npx intlayer build --base-dir ./src`

- **`--env`**: Określ środowisko (np. `development`, `production`). Przydatne, gdy używasz zmiennych środowiskowych w pliku konfiguracyjnym intlayer.

  > Przykład: `npx intlayer build --env production`

- **`--env-file`**: Podaj niestandardowy plik środowiskowy, z którego mają być ładowane zmienne. Przydatne, gdy używasz zmiennych środowiskowych w pliku konfiguracyjnym intlayer.

  > Przykład: `npx intlayer build --env-file .env.production.local`

- **`--with`**: Uruchom polecenie równolegle z budowaniem.

  > Przykład: `npx intlayer build --with "next dev --turbopack"`

- **`--skip-prepare`**: Pomiń krok przygotowania.

  > Przykład: `npx intlayer build --skip-prepare`

- **`--no-cache`**: Wyłącz pamięć podręczną.

  > Przykład: `npx intlayer build --no-cache`

### Obserwuj słowniki

```bash
npx intlayer watch
```

To polecenie będzie obserwować zmiany w Twoich plikach deklaracji zawartości i budować słowniki w katalogu `.intlayer`.
To polecenie jest równoważne z `npx intlayer build --watch --skip-prepare`.

##### Alias:

- `npx intlayer dictionaries watch`
- `npx intlayer dictionary watch`
- `npx intlayer dic watch`

##### Argumenty:

- **`--with`**: Uruchom polecenie równolegle z obserwacją.

  > Przykład: `npx intlayer watch --with "next dev --turbopack"`

### Wypchnij słowniki

```bash
npx intlayer dictionary push
```

Jeśli [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) jest zainstalowany, możesz również przesyłać słowniki do edytora. To polecenie pozwoli udostępnić słowniki [edytorowi](https://intlayer.org/dashboard). W ten sposób możesz dzielić się swoimi słownikami z zespołem i edytować zawartość bez konieczności modyfikowania kodu aplikacji.

##### Alias:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### Argumenty:

**Opcje słownika:**

- **`-d`, `--dictionaries`**: identyfikatory słowników do pobrania. Jeśli nie zostaną podane, zostaną przesłane wszystkie słowniki.

  > Przykład: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: identyfikatory słowników do pobrania (alias dla --dictionaries).

  > Przykład: `npx intlayer dictionary push --dictionary my-dictionary-id my-other-dictionary-id`

**Opcje konfiguracji:**

- **`--base-dir`**: Określ katalog bazowy projektu. Aby pobrać konfigurację intlayer, polecenie będzie szukać pliku `intlayer.config.{ts,js,json,cjs,mjs}` w katalogu bazowym.

  > Przykład: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Wyłącz cache.

  > Przykład: `npx intlayer build --no-cache`

**Opcje zmiennych środowiskowych:**

- **`--env`**: Określ środowisko (np. `development`, `production`). Przydatne, gdy używasz zmiennych środowiskowych w pliku konfiguracyjnym intlayer.
- **`--env-file`**: Podaj niestandardowy plik środowiskowy, z którego mają być ładowane zmienne. Przydatne, gdy używasz zmiennych środowiskowych w pliku konfiguracyjnym intlayer.

  > Przykład: `npx intlayer dictionary push --env-file .env.production.local`

  > Przykład: `npx intlayer dictionary push --env production`

**Opcje wyjścia:**

- **`-r`, `--delete-locale-dictionary`**: Pomiń pytanie o usunięcie katalogów lokalizacji po przesłaniu słowników i usuń je. Domyślnie, jeśli słownik jest zdefiniowany lokalnie, nadpisze zawartość słowników zdalnych.

  > Przykład: `npx intlayer dictionary push -r`

  > Przykład: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: Pomiń pytanie o usunięcie katalogów lokalizacji po przesłaniu słowników i zachowaj je. Domyślnie, jeśli słownik jest zdefiniowany lokalnie, nadpisze zawartość słowników zdalnych.

  > Przykład: `npx intlayer dictionary push -k`

  > Przykład: `npx intlayer dictionary push --keep-locale-dictionary`

**Opcje przygotowania:**

- **`--build`**: Zbuduj słowniki przed przesłaniem, aby zapewnić aktualność zawartości. True wymusi budowanie, false pominie budowanie, undefined pozwoli na użycie pamięci podręcznej budowania.

**Opcje logowania:**

- **`--verbose`**: Włącz szczegółowe logowanie do debugowania. (domyślnie true przy użyciu CLI)

**Opcje Git:**

- **`--git-diff`**: Uruchom tylko na słownikach, które zawierają zmiany od bazy (domyślnie `origin/main`) do bieżącej gałęzi (domyślnie: `HEAD`).
- **`--git-diff-base`**: Określ bazowe odniesienie dla git diff (domyślnie `origin/main`).
- **`--git-diff-current`**: Określ bieżące odniesienie dla git diff (domyślnie `HEAD`).
- **`--uncommitted`**: Uwzględnij niezacommitowane zmiany.
- **`--unpushed`**: Uwzględnij nieprzesłane zmiany.
- **`--untracked`**: Uwzględnij nieśledzone pliki.

  > Przykład: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Przykład: `npx intlayer dictionary push --uncommitted --unpushed --untracked`

### Pobierz zdalne słowniki

```bash
npx intlayer pull
```

Jeśli [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) jest zainstalowany, możesz również pobierać słowniki z edytora. W ten sposób możesz nadpisać zawartość swoich słowników zgodnie z potrzebami swojej aplikacji.

##### Alias:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### Argumenty:

**Opcje słownika:**

- **`-d, --dictionaries`**: Identyfikatory słowników do pobrania. Jeśli nie zostanie określone, pobrane zostaną wszystkie słowniki.

  > Przykład: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: Identyfikatory słowników do pobrania (alias dla --dictionaries).

  > Przykład: `npx intlayer dictionary pull --dictionary my-dictionary-id my-other-dictionary-id`

**Opcje konfiguracji:**

- **`--base-dir`**: Określ katalog bazowy projektu. Aby pobrać konfigurację intlayer, polecenie będzie szukać pliku `intlayer.config.{ts,js,json,cjs,mjs}` w katalogu bazowym.

  > Przykład: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Wyłącz pamięć podręczną.

  > Przykład: `npx intlayer build --no-cache`

**Opcje zmiennych środowiskowych:**

- **`--env`**: Określ środowisko (np. `development`, `production`).
- **`--env-file`**: Podaj niestandardowy plik środowiskowy do załadowania zmiennych.
- **`--base-dir`**: Określ katalog bazowy projektu. Aby pobrać konfigurację intlayer, polecenie będzie szukać pliku `intlayer.config.{ts,js,json,cjs,mjs}` w katalogu bazowym.

  > Przykład: `npx intlayer dictionary push --env-file .env.production.local`

  > Przykład: `npx intlayer dictionary push --env production`

**Opcje wyjścia:**

- **`--new-dictionaries-path`**: Ścieżka do katalogu, w którym zostaną zapisane nowe słowniki. Jeśli nie zostanie określona, nowe słowniki zostaną zapisane w katalogu `./intlayer-dictionaries` projektu. Jeśli w zawartości słownika określono pole `filePath`, słowniki nie będą brały pod uwagę tego argumentu i zostaną zapisane w określonym katalogu `filePath`.

**Opcje logowania:**

- **`--verbose`**: Włącz szczegółowe logowanie do debugowania. (domyślnie true przy użyciu CLI)

##### Przykład:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Wypełnianie / audyt / tłumaczenie słowników

```bash
npx intlayer fill
```

To polecenie analizuje Twoje pliki deklaracji zawartości pod kątem potencjalnych problemów, takich jak brakujące tłumaczenia, niespójności strukturalne lub niezgodności typów. Jeśli znajdzie jakieś problemy, **intlayer fill** zaproponuje lub zastosuje aktualizacje, aby utrzymać Twoje słowniki spójne i kompletne.

##### Alias:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### Argumenty:

**Opcje listy plików:**

- **`-f, --file [files...]`**: Lista konkretnych plików deklaracji zawartości do audytu. Jeśli nie zostanie podana, audytowane będą wszystkie znalezione pliki `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` zgodnie z konfiguracją.

  > Przykład: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: Filtruj słowniki na podstawie kluczy. Jeśli nie zostanie podane, audytowane będą wszystkie słowniki.

  > Przykład: `npx intlayer dictionary fill -k key1 key2`

- **`--key [keys...]`**: Filtruj słowniki na podstawie kluczy (alias dla --keys).

  > Przykład: `npx intlayer dictionary fill --key key1 key2`

- **`--excluded-keys [excludedKeys...]`**: Wyklucz słowniki na podstawie kluczy. Jeśli nie zostanie podane, audytowane będą wszystkie słowniki.

  > Przykład: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--excluded-key [excludedKeys...]`**: Wyklucz słowniki na podstawie kluczy (alias dla --excluded-keys).

  > Przykład: `npx intlayer dictionary fill --excluded-key key1 key2`

- **`--path-filter [pathFilters...]`**: Filtruj słowniki na podstawie wzorca glob dla ścieżek plików.

  > Przykład: `npx intlayer dictionary fill --path-filter "src/home/**"`

**Opcje wyjścia wpisów:**

- **`--source-locale [sourceLocale]`**: Źródłowa lokalizacja do tłumaczenia. Jeśli nie zostanie podana, użyta zostanie domyślna lokalizacja z Twojej konfiguracji.

- **`--output-locales [outputLocales...]`**: Docelowe lokalizacje do tłumaczenia. Jeśli nie zostanie podana, użyte zostaną wszystkie lokalizacje z Twojej konfiguracji z wyjątkiem lokalizacji źródłowej.

- **`--mode [mode]`**: Tryb tłumaczenia: `complete`, `review`. Domyślnie `complete`. `complete` wypełni wszystkie brakujące treści, `review` wypełni brakujące treści i przejrzy istniejące klucze.

**Opcje Git:**

- **`--git-diff`**: Uruchom tylko na słownikach, które zawierają zmiany od bazy (domyślnie `origin/main`) do bieżącej gałęzi (domyślnie `HEAD`).
- **`--git-diff-base`**: Określ bazowe odniesienie dla różnic git (domyślnie `origin/main`).
- **`--git-diff-current`**: Określ bieżące odniesienie dla różnic git (domyślnie `HEAD`).
- **`--uncommitted`**: Uwzględnij niezacommitowane zmiany.
- **`--unpushed`**: Uwzględnij niewypchnięte zmiany.
- **`--untracked`**: Uwzględnij nieśledzone pliki.

  > Przykład: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Przykład: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**Opcje AI:**

- **`--model [model]`**: Model AI używany do tłumaczenia (np. `gpt-3.5-turbo`).
- **`--provider [provider]`**: Dostawca AI używany do tłumaczenia.
- **`--temperature [temperature]`**: Ustawienie temperatury dla modelu AI.
- **`--api-key [apiKey]`**: Podaj własny klucz API dla usługi AI.
- **`--custom-prompt [prompt]`**: Podaj niestandardową instrukcję (prompt) dla tłumaczenia.
- **`--application-context [applicationContext]`**: Podaj dodatkowy kontekst dla tłumaczenia AI.

  > Przykład: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "Moja aplikacja to sklep z kotami"`

**Opcje zmiennych środowiskowych:**

- **`--env`**: Określ środowisko (np. `development`, `production`).
- **`--env-file [envFile]`**: Podaj niestandardowy plik środowiskowy do załadowania zmiennych.

  > Przykład: `npx intlayer fill --env-file .env.production.local`

  > Przykład: `npx intlayer fill --env production`

**Opcje konfiguracji:**

- **`--base-dir`**: Określ katalog bazowy dla projektu.

  > Przykład: `npx intlayer fill --base-dir ./src`

- **`--no-cache`**: Wyłącz pamięć podręczną.

  > Przykład: `npx intlayer build --no-cache`

**Opcje przygotowania:**

- **`--build`**: Buduj słowniki przed wysłaniem, aby zapewnić aktualność zawartości. True wymusi budowę, false pominie budowę, undefined pozwoli na użycie pamięci podręcznej budowy.

- **`--skip-metadata`**: Pomiń uzupełnianie brakujących metadanych (opis, tytuł, tagi) dla słowników.

**Opcje logowania:**

- **`--verbose`**: Włącz szczegółowe logowanie do debugowania. (domyślnie true przy użyciu CLI)

##### Przykład:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

To polecenie przetłumaczy zawartość z angielskiego na francuski i hiszpański dla wszystkich plików deklaracji zawartości w katalogu `src/home/` używając modelu GPT-3.5 Turbo.

### Przekształć komponenty

```bash
npx intlayer transform
```

To polecenie analizuje pliki kodu, aby pomóc w migracji istniejących komponentów do używania Intlayer. Obsługuje interaktywny wybór plików lub wskazywanie konkretnych plików.

##### Aliasy:

- `npx intlayer trans`

##### Argumenty:

**Opcje wyboru plików:**

- **`-f, --file [files...]`**: Lista konkretnych plików do przekształcenia. Jeśli nie podano, CLI przeskanuje pasujące pliki (`**/*.{tsx,jsx,vue,svelte,ts,js}`) i poprosi o wybór, które przekształcić.

  > Przykład: `npx intlayer transform -f src/components/MyComponent.tsx`

**Opcje wyjścia:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: Katalog do zapisania wygenerowanych plików deklaracji zawartości.

  > Przykład: `npx intlayer transform -o src/content`

**Opcje konfiguracji:**

- **`--base-dir`**: Określ katalog bazowy projektu.
- **`--env`**: Określ środowisko.
- **`--env-file`**: Podaj niestandardowy plik środowiskowy.
- **`--verbose`**: Włącz szczegółowe logowanie.

### Testuj brakujące tłumaczenia

```bash
npx intlayer content test
```

##### Alias:

- `npx intlayer test`

To polecenie analizuje Twoje pliki deklaracji zawartości, aby zidentyfikować brakujące tłumaczenia we wszystkich skonfigurowanych lokalizacjach. Dostarcza kompleksowy raport pokazujący, które klucze tłumaczeń są brakujące dla których lokalizacji, pomagając utrzymać spójność w wielojęzycznej zawartości.

##### Przykładowy wynik:

```bash
pnpm intlayer content test
Brakujące tłumaczenia:
 - home-page                      - tr         - src/components/HomePage/homePage.content.ts
 - server-component               - es, tr     - src/components/ServerComponent/serverComponent.content.ts
 - client-component               - pl, tr     - src/components/ClientComponent/clientComponent.content.ts
Lokalizacje: en, ru, ja, fr, ko, zh, es, de, ar, it, en-GB, pt, hi, tr, pl
Wymagane lokalizacje: en
Brakujące lokalizacje: pl, tr, es
Brak wymaganych lokalizacji: -
Łączna liczba brakujących lokalizacji: 3
Łączna liczba brakujących wymaganych lokalizacji: 0
```

##### Argumenty:

**Opcje konfiguracji:**

- **`--env`**: Określ środowisko (np. `development`, `production`).
- **`--env-file [envFile]`**: Podaj niestandardowy plik środowiskowy do załadowania zmiennych.
- **`--base-dir`**: Określ katalog bazowy projektu.

  > Przykład: `npx intlayer content test --base-dir ./src --env-file .env.production.local`

- **`--no-cache`**: Wyłącz pamięć podręczną.

  > Przykład: `npx intlayer build --no-cache`

**Opcje przygotowania:**

- **`--build`**: Zbuduj słowniki przed wysłaniem, aby upewnić się, że zawartość jest aktualna. True wymusi budowę, false pominie budowę, undefined pozwoli na użycie pamięci podręcznej budowy.

**Opcje logowania:**

- **`--verbose`**: Włącz szczegółowe logowanie do debugowania. (domyślnie true przy użyciu CLI)

  > Przykład: `npx intlayer content test --verbose`

##### Przykład:

```bash
npx intlayer content test --verbose
```

##### Przykładowy wynik:

```bash
npx intlayer content list
Pliki deklaracji treści:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Łączna liczba plików deklaracji treści: 3
```

To polecenie przeskanuje wszystkie Twoje pliki deklaracji treści i wyświetli:

- Szczegółową listę brakujących tłumaczeń wraz z ich kluczami, brakującymi lokalizacjami oraz ścieżkami plików
- Podsumowanie statystyk, w tym łączną liczbę brakujących lokalizacji i brakujących wymaganych lokalizacji
- Kolorowe oznaczenia ułatwiające identyfikację problemów

Wynik pomaga szybko zidentyfikować, które tłumaczenia muszą zostać uzupełnione, aby zapewnić prawidłowe działanie aplikacji we wszystkich skonfigurowanych lokalizacjach.

### Wyświetl listę plików deklaracji treści

```bash
npx intlayer content list
```

##### Alias:

- `npx intlayer list`

To polecenie wyświetla wszystkie pliki deklaracji treści w Twoim projekcie, pokazując ich klucze słownika oraz ścieżki do plików. Jest to przydatne do uzyskania przeglądu wszystkich plików treści oraz weryfikacji, czy zostały poprawnie wykryte przez Intlayer.

##### Przykład:

```bash
npx intlayer content list
```

To polecenie wyświetli:

- Sformatowaną listę wszystkich plików deklaracji treści wraz z ich kluczami i względnymi ścieżkami do plików
- Łączną liczbę znalezionych plików deklaracji treści

Wynik pomaga zweryfikować, czy wszystkie Twoje pliki treści są poprawnie skonfigurowane i wykrywalne przez system Intlayer.

### Zarządzanie konfiguracją

#### Pobierz konfigurację

Polecenie `configuration get` pobiera aktualną konfigurację Intlayer, w szczególności ustawienia lokalizacji. Jest to przydatne do weryfikacji Twojej konfiguracji.

```bash
npx intlayer configuration get
```

##### Aliasy:

- `npx intlayer config get`
- `npx intlayer conf get`

##### Argumenty:

- **`--env`**: Określ środowisko (np. `development`, `production`).
- **`--env-file`**: Podaj niestandardowy plik środowiskowy do załadowania zmiennych.
- **`--base-dir`**: Określ katalog bazowy projektu.
- **`--verbose`**: Włącz szczegółowe logowanie do debugowania. (domyślnie true przy użyciu CLI)
- **`--no-cache`**: Wyłącz pamięć podręczną.

#### Wypchnij konfigurację

Polecenie `configuration push` przesyła Twoją konfigurację do Intlayer CMS i edytora. Ten krok jest niezbędny, aby umożliwić korzystanie z zdalnych słowników w Intlayer Visual Editor.

```bash
npx intlayer configuration push
```

##### Alias:

- `npx intlayer config push`
- `npx intlayer conf push`

##### Argumenty:

- **`--env`**: Określ środowisko (np. `development`, `production`).
- **`--env-file`**: Podaj niestandardowy plik środowiskowy do załadowania zmiennych.
- **`--base-dir`**: Określ katalog bazowy projektu.
- **`--verbose`**: Włącz szczegółowe logowanie do debugowania. (domyślnie true w CLI)
- **`--no-cache`**: Wyłącz pamięć podręczną.

Poprzez wypchnięcie konfiguracji, Twój projekt jest w pełni zintegrowany z Intlayer CMS, co umożliwia płynne zarządzanie słownikami w zespołach.

### Zarządzanie dokumentacją

Polecenia `doc` dostarczają narzędzi do zarządzania i tłumaczenia plików dokumentacji w wielu lokalizacjach.

#### Tłumaczenie dokumentu

Polecenie `doc translate` automatycznie tłumaczy pliki dokumentacji z lokalizacji bazowej na lokalizacje docelowe, korzystając z usług tłumaczenia AI.

```bash
npx intlayer doc translate
```

##### Argumenty:

**Opcje listy plików:**

- **`--doc-pattern [docPattern...]`**: Wzorce glob do dopasowania plików dokumentacji do tłumaczenia.

  > Przykład: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Wzorce glob do wykluczenia z tłumaczenia.

  > Przykład: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Pomiń plik, jeśli został zmodyfikowany przed podanym czasem.
  - Może to być czas absolutny, np. "2025-12-05" (string lub Date)
  - Może to być czas względny w ms `1 * 60 * 60 * 1000` (1 godzina)
  - Ta opcja sprawdza czas aktualizacji pliku za pomocą metody `fs.stat`. Może to być wpływane przez Git lub inne narzędzia modyfikujące plik.

  > Przykład: `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Pomiń plik, jeśli został zmodyfikowany w podanym czasie.
  - Może to być czas absolutny, np. "2025-12-05" (string lub Date)
  - Może to być czas względny w ms `1 * 60 * 60 * 1000` (1 godzina)
  - Ta opcja sprawdza czas aktualizacji pliku za pomocą metody `fs.stat`. Może więc być wpływana przez Git lub inne narzędzia modyfikujące plik.

  > Przykład: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: Pomiń plik, jeśli już istnieje.

  > Przykład: `npx intlayer doc translate --skip-if-exists`

**Opcje wyjścia wpisu:**

- **`--locales [locales...]`**: Docelowe lokalizacje, na które ma być przetłumaczona dokumentacja.

  > Przykład: `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**: Źródłowa lokalizacja, z której ma być wykonane tłumaczenie.

  > Przykład: `npx intlayer doc translate --base-locale en`

**Opcje przetwarzania plików:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Liczba plików do jednoczesnego przetworzenia podczas tłumaczenia.

  > Przykład: `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**Opcje AI:**

- **`--model [model]`**: Model AI używany do tłumaczenia (np. `gpt-3.5-turbo`).
- **`--provider [provider]`**: Dostawca AI używany do tłumaczenia.
- **`--temperature [temperature]`**: Ustawienie temperatury dla modelu AI.
- **`--api-key [apiKey]`**: Podaj własny klucz API do usługi AI.
- **`--application-context [applicationContext]`**: Podaj dodatkowy kontekst dla tłumaczenia AI.
- **`--custom-prompt [prompt]`**: Dostosuj bazowy prompt używany do tłumaczenia. (Uwaga: W większości przypadków zaleca się użycie opcji `--custom-instructions`, ponieważ zapewnia lepszą kontrolę nad zachowaniem tłumaczenia.)

  > Przykład: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "Moja aplikacja to sklep z kotami"`

**Opcje zmiennych środowiskowych:**

- **`--env`**: Określ środowisko (np. `development`, `production`).
- **`--env-file [envFile]`**: Podaj niestandardowy plik środowiskowy do załadowania zmiennych.
- **`--base-dir`**: Określ katalog bazowy projektu.
- **`--no-cache`**: Wyłącz pamięć podręczną.

  > Przykład: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**Opcje logowania:**

- **`--verbose`**: Włącz szczegółowe logowanie do celów debugowania. (domyślnie włączone przy użyciu CLI)

  > Przykład: `npx intlayer doc translate --verbose`

**Opcje niestandardowych instrukcji:**

- **`--custom-instructions [customInstructions]`**: Niestandardowe instrukcje dodane do promptu. Przydatne do stosowania specyficznych reguł dotyczących formatowania, tłumaczenia adresów URL itp.
  - Może być to czas absolutny, np. "2025-12-05" (string lub Date)
  - Może być to czas względny w ms `1 * 60 * 60 * 1000` (1 godzina)
  - Ta opcja sprawdza czas aktualizacji pliku za pomocą metody `fs.stat`. Może więc być wpływana przez Git lub inne narzędzia modyfikujące plik.

  > Przykład: `npx intlayer doc translate --custom-instructions "Unikaj tłumaczenia adresów URL i zachowaj format markdown"`

  > Przykład: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Opcje Git:**

- **`--git-diff`**: Uruchom tylko na słownikach, które zawierają zmiany od bazy (domyślnie `origin/main`) do bieżącej gałęzi (domyślnie `HEAD`).
- **`--git-diff-base`**: Określ bazowy punkt odniesienia dla git diff (domyślnie `origin/main`).
- **`--git-diff-current`**: Określ bieżący punkt odniesienia dla git diff (domyślnie `HEAD`).
- **`--uncommitted`**: Uwzględnij niezacommitowane zmiany.
- **`--unpushed`**: Uwzględnij niepushowane zmiany.
- **`--untracked`**: Uwzględnij nieśledzone pliki.

  > Przykład: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Przykład: `npx intlayer doc translate --uncommitted --unpushed --untracked`

> Zauważ, że ścieżka pliku wyjściowego zostanie określona przez zastąpienie następujących wzorców
>
> - `/{{baseLocale}}/` na `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` na `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` na `_{{locale}}.`
> - `{{baseLocale}}_` na `{{locale}}_`
> - `.{{baseLocaleName}}.` na `.{{localeName}}.`
>
> Jeśli wzorzec nie zostanie znaleziony, plik wyjściowy doda `.{{locale}}` do rozszerzenia pliku. `./my/file.md` zostanie przetłumaczony na `./my/file.fr.md` dla lokalizacji francuskiej.

#### Przegląd dokumentu

Polecenie `doc review` analizuje pliki dokumentacji pod kątem jakości, spójności i kompletności w różnych lokalizacjach.

```bash
npx intlayer doc review
```

Można go używać do przeglądania plików, które są już przetłumaczone, oraz do sprawdzania, czy tłumaczenie jest poprawne.

W większości przypadków,

- preferuj używanie `doc translate`, gdy przetłumaczona wersja tego pliku nie jest dostępna.
- preferuj używanie `doc review`, gdy przetłumaczona wersja tego pliku już istnieje.

> Zauważ, że proces przeglądu zużywa więcej tokenów wejściowych niż proces tłumaczenia, aby w pełni przejrzeć ten sam plik. Jednak proces przeglądu zoptymalizuje przeglądane fragmenty i pominie części, które nie zostały zmienione.

##### Argumenty:

Polecenie `doc review` akceptuje te same argumenty co `doc translate`, co pozwala na przeglądanie konkretnych plików dokumentacji i stosowanie kontroli jakości.

Jeśli aktywowałeś jedną z opcji git, polecenie będzie przeglądać tylko te części plików, które zostały zmienione. Skrypt będzie przetwarzał plik, dzieląc go na fragmenty (chunk), i przeglądał każdy fragment. Jeśli w danym fragmencie nie ma zmian, skrypt go pominie, aby przyspieszyć proces przeglądu i ograniczyć koszty korzystania z API dostawcy AI.

## Używaj poleceń intlayer w swoim `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Uwaga**: Możesz również używać krótszych aliasów:
>
> - `npx intlayer list` zamiast `npx intlayer content list`
> - `npx intlayer test` zamiast `npx intlayer content test`

### Polecenia edytora

Polecenie `editor` opakowuje polecenia `intlayer-editor`.

> Aby móc używać polecenia `editor`, pakiet `intlayer-editor` musi być zainstalowany. (Zobacz [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md))

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```

### Polecenia Live Sync

Live Sync pozwala Twojej aplikacji odzwierciedlać zmiany treści CMS w czasie rzeczywistym. Nie jest wymagane ponowne budowanie ani wdrażanie. Po włączeniu, aktualizacje są przesyłane do serwera Live Sync, który odświeża słowniki odczytywane przez Twoją aplikację. Zobacz [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md) po więcej szczegółów.

```json fileName="package.json"
"scripts": {
  "intlayer:live:start": "npx intlayer live start --with 'next dev --turbopack'"
}
```

##### Argumenty:

**Opcje konfiguracji:**

- **`--base-dir`**: Określ katalog bazowy projektu. Aby pobrać konfigurację intlayer, polecenie będzie szukać pliku `intlayer.config.{ts,js,json,cjs,mjs}` w katalogu bazowym.

- **`--no-cache`**: Wyłącz pamięć podręczną.

  > Przykład: `npx intlayer dictionary push --env-file .env.production.local`

**Opcje logowania:**

- **`--verbose`**: Włącz szczegółowe logowanie do debugowania. (domyślnie true w CLI)

---

## CLI SDK

CLI SDK to biblioteka, która pozwala używać Intlayer CLI w Twoim własnym kodzie.

```bash packageManager="npm"
npm install @intlayer/cli --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/cli --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli --save-dev
```

Przykład użycia:

```ts
import {
  push,
  pull,
  fill,
  build,
  listContentDeclaration,
  testMissingTranslations,
  docTranslate,
  docReview,
} from "@intlayer/cli";

push();
// ...
pull();
// ...
fill();
// ...
build();
// ...
listContentDeclaration();
// ...
testMissingTranslations();
// ...
docTranslate();
// ...
docReview();
// ...
```

## Debugowanie polecenia intlayer

### 1. **Upewnij się, że używasz najnowszej wersji**

Uruchom:

```bash
npx intlayer --version                  # aktualna wersja intlayer dla lokalizacji
npx intlayer@latest --version           # najnowsza dostępna wersja intlayer
```

### 2. **Sprawdź, czy polecenie jest zarejestrowane**

Możesz to sprawdzić za pomocą:

```bash
npx intlayer --help                     # Wyświetla listę dostępnych poleceń i informacje o użyciu
npx intlayer dictionary build --help    # Wyświetla listę dostępnych opcji dla polecenia
```

### 3. **Uruchom ponownie terminal**

Czasami konieczne jest ponowne uruchomienie terminala, aby rozpoznał nowe polecenia.

### 4. **Wyczyść pamięć podręczną npx (jeśli utknąłeś na starszej wersji)**

```bash
npx clear-npx-cache
```

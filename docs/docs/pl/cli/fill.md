---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Wypełnianie słowników
description: Dowiedz się, jak wypełniać, audytować i tłumaczyć swoje słowniki za pomocą AI.
keywords:
  - Wypełnianie
  - Audyt
  - Tłumaczenie
  - Słowniki
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - fill
---

# Wypełnianie / audyt / tłumaczenie słowników

```bash
npx intlayer fill
```

To polecenie analizuje Twoje pliki deklaracji treści pod kątem potencjalnych problemów, takich jak brakujące tłumaczenia, niespójności strukturalne lub niezgodności typów. Jeśli wykryje jakiekolwiek problemy, **intlayer fill** zaproponuje lub zastosuje aktualizacje, aby utrzymać Twoje słowniki spójne i kompletne.

Kluczowe punkty:

- Dzieli duże pliki JSON na fragmenty, aby pozostać w granicach okna kontekstowego modelu AI.
- Ponawia tłumaczenie, jeśli format wyjściowy jest nieprawidłowy.
- Włącza kontekst specyficzny dla aplikacji i pliku, aby poprawić dokładność tłumaczenia.
- Zachowuje istniejące tłumaczenia, nie nadpisując ich.
- Przetwarza pliki, fragmenty i lokalizacje równolegle przy użyciu systemu kolejkowego, aby zwiększyć prędkość.

## Alias:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

## Przykłady wyjścia:

```bash
npx intlayer fill

Preparing Intlayer (v7.5.14)
Done 76ms
@intlayer/ai found - Run process locally
Provider: (default) - Model: (default) - API Key: ✓
Affected dictionary keys for processing: app, comp-test, hello-world, lang-switcher
 - [comp-test]      No locales to fill, Skipping comp-test.content.json
 - [app]            Processing app.content.tsx
 - [app]            Filling missing metadata for app.content.tsx
 - [hello-world]    Processing test.content.ts
 - [hello-world]   [French (fr)]      Preparing test.content.ts
 - [hello-world]   [Spanish (es)]     Preparing test.content.ts
 - [lang-switcher]  Processing langSwitcher.content.ts
 - [lang-switcher]  Filling missing metadata for langSwitcher.content.ts
 - [hello-world]    Translation completed successfully for test.content.ts
 - [lang-switcher] [Spanish (es)]     Preparing langSwitcher.content.ts
 - [app]           [French (fr)]      Preparing app.content.tsx
 - [app]           [Spanish (es)]     Preparing app.content.tsx
 - [hello-world]    Content declaration written to test.content.ts
 - [app]            Translation completed successfully for app.content.tsx
 - [app]            Content declaration written to app.content.tsx
 - [lang-switcher]  Translation completed successfully for langSwitcher.content.ts
 - [lang-switcher]  Content declaration written to langSwitcher.content.ts
```

## Argumenty:

**Opcje listy plików:**

- **`-f, --file [files...]`**: Lista konkretnych plików deklaracji treści do audytu. Jeśli nie zostanie podana, audytowane będą wszystkie znalezione pliki `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` zgodnie z konfiguracją.

  > Przykład: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: Filtrowanie słowników na podstawie kluczy. Jeśli nie zostanie podane, audytowane będą wszystkie słowniki.

  > Przykład: `npx intlayer dictionary fill -k key1 key2`

- **`--key [keys...]`**: Filtrowanie słowników na podstawie kluczy (alias dla --keys).

  > Przykład: `npx intlayer dictionary fill --key key1 key2`

- **`--excluded-keys [excludedKeys...]`**: Wykluczanie słowników na podstawie kluczy. Jeśli nie zostanie podane, audytowane będą wszystkie słowniki.

  > Przykład: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--excluded-key [excludedKeys...]`**: Wykluczanie słowników na podstawie kluczy (alias dla --excluded-keys).

  > Przykład: `npx intlayer dictionary fill --excluded-key key1 key2`

- **`--path-filter [pathFilters...]`**: Filtrowanie słowników na podstawie wzorca glob dla ścieżek plików.

  > Przykład: `npx intlayer dictionary fill --path-filter "src/home/**"`

**Opcje wyjścia wpisów:**

- **`--source-locale [sourceLocale]`**: Źródłowa lokalizacja do tłumaczenia. Jeśli nie zostanie podana, zostanie użyta domyślna lokalizacja z Twojej konfiguracji.

- **`--output-locales [outputLocales...]`**: Docelowe lokalizacje do tłumaczenia. Jeśli nie zostaną podane, zostaną użyte wszystkie lokalizacje z Twojej konfiguracji z wyjątkiem lokalizacji źródłowej.

- **`--mode [mode]`**: Tryb tłumaczenia: `complete`, `review`. Domyślnie `complete`. `complete` wypełni wszystkie brakujące treści, `review` wypełni brakujące treści i przejrzy istniejące klucze.

**Opcje Git:**

- **`--git-diff`**: Uruchom tylko na słownikach, które zawierają zmiany od bazy (domyślnie `origin/main`) do bieżącej gałęzi (domyślnie `HEAD`).
- **`--git-diff-base`**: Określ bazowe odniesienie dla różnic git (domyślnie `origin/main`).
- **`--git-diff-current`**: Określ bieżące odniesienie dla różnic git (domyślnie `HEAD`).
- **`--uncommitted`**: Uwzględnij niezacommitowane zmiany.
- **`--unpushed`**: Uwzględnij niepushowane zmiany.
- **`--untracked`**: Uwzględnij nieśledzone pliki.

  > Przykład: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Przykład: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**Opcje AI:**

- **`--model [model]`**: Model AI do użycia przy tłumaczeniu (np. `gpt-3.5-turbo`).
- **`--provider [provider]`**: Dostawca AI do użycia przy tłumaczeniu.
- **`--temperature [temperature]`**: Ustawienie temperatury dla modelu AI.
- **`--api-key [apiKey]`**: Podaj własny klucz API dla usługi AI.
- **`--custom-prompt [prompt]`**: Podaj niestandardowe polecenie dla instrukcji tłumaczenia.
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

- **`--build`**: Buduj słowniki przed wysłaniem, aby zapewnić aktualność zawartości. Wartość true wymusi budowanie, false pominie budowanie, undefined pozwoli na użycie pamięci podręcznej budowania.

- **`--skip-metadata`**: Pomiń uzupełnianie brakujących metadanych (opis, tytuł, tagi) dla słowników.

**Opcje logowania:**

- **`--verbose`**: Włącz szczegółowe logowanie do debugowania. (domyślnie true przy użyciu CLI)

## Przykład:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

To polecenie przetłumaczy zawartość z angielskiego na francuski i hiszpański dla wszystkich plików deklaracji zawartości w katalogu `src/home/` używając modelu GPT-3.5 Turbo.

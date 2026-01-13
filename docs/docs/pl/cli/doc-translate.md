---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Tłumaczenie dokumentu
description: Dowiedz się, jak automatycznie tłumaczyć pliki dokumentacji za pomocą usług tłumaczenia AI.
keywords:
  - Tłumaczenie
  - Dokument
  - Dokumentacja
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-translate
---

# Tłumaczenie dokumentu

Polecenie `doc translate` automatycznie tłumaczy pliki dokumentacji z bazowego języka na docelowe lokalizacje, wykorzystując usługi tłumaczenia AI.

## Kluczowe punkty:

- Dzieli duże pliki markdown na fragmenty, aby pozostać w granicach okna kontekstowego modelu AI.
- Ponawia tłumaczenie, jeśli format wyjściowy jest nieprawidłowy.
- Włącza kontekst specyficzny dla aplikacji i pliku, aby poprawić dokładność tłumaczenia.
- Zachowuje istniejące tłumaczenia, nie nadpisując ich.
- Przetwarza pliki, fragmenty i lokalizacje równolegle przy użyciu systemu kolejkowego, aby zwiększyć prędkość.

```bash
npx intlayer doc translate
```

## Argumenty:

**Opcje listy plików:**

- **`--doc-pattern [docPattern...]`**: Wzorce glob do dopasowania plików dokumentacji do tłumaczenia.

  > Przykład: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Wzorce glob do wykluczenia z tłumaczenia.

  > Przykład: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Pomiń plik, jeśli został zmodyfikowany przed podanym czasem.
  - Może to być czas absolutny, np. "2025-12-05" (string lub Date)
  - Może to być czas względny w ms `1 * 60 * 60 * 1000` (1 godzina)
  - Ta opcja sprawdza czas aktualizacji pliku za pomocą metody `fs.stat`. Może więc być wpływana przez Git lub inne narzędzia modyfikujące plik.

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

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Liczba plików przetwarzanych jednocześnie podczas tłumaczenia.

  > Przykład: `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**Opcje AI:**

- **`--model [model]`**: Model AI używany do tłumaczenia (np. `gpt-3.5-turbo`).
- **`--provider [provider]`**: Dostawca AI używany do tłumaczenia.
- **`--temperature [temperature]`**: Ustawienie temperatury dla modelu AI.
- **`--api-key [apiKey]`**: Podaj własny klucz API dla usługi AI.
- **`--application-context [applicationContext]`**: Podaj dodatkowy kontekst dla tłumaczenia AI.
- **`--custom-prompt [prompt]`**: Dostosuj podstawowy prompt używany do tłumaczenia. (Uwaga: W większości przypadków zaleca się użycie opcji `--custom-instructions`, ponieważ zapewnia lepszą kontrolę nad zachowaniem tłumaczenia.)

  > Przykład: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "Moja aplikacja to sklep z kotami"`

**Opcje zmiennych środowiskowych:**

- **`--env`**: Określ środowisko (np. `development`, `production`).
- **`--env-file [envFile]`**: Podaj niestandardowy plik środowiskowy do załadowania zmiennych.
- **`--base-dir`**: Określ katalog bazowy projektu.
- **`--no-cache`**: Wyłącz pamięć podręczną.

  > Przykład: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**Opcje logowania:**

- **`--verbose`**: Włącz szczegółowe logowanie do debugowania. (domyślnie true przy użyciu CLI)

  > Przykład: `npx intlayer doc translate --verbose`

**Opcje niestandardowych instrukcji:**

- **`--custom-instructions [customInstructions]`**: Niestandardowe instrukcje dodane do promptu. Przydatne do stosowania specyficznych reguł dotyczących formatowania, tłumaczenia URL itp.
  - Może być to czas absolutny, np. "2025-12-05" (string lub Date)
  - Może być to czas względny w ms `1 * 60 * 60 * 1000` (1 godzina)
  - Ta opcja sprawdza czas aktualizacji pliku za pomocą metody `fs.stat`. Może więc być wpływana przez Git lub inne narzędzia modyfikujące plik.

  > Przykład: `npx intlayer doc translate --custom-instructions "Unikaj tłumaczenia URL-i i zachowaj format markdown"`

  > Przykład: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Opcje Git:**

- **`--git-diff`**: Uruchom tylko na słownikach, które zawierają zmiany od bazy (domyślnie `origin/main`) do bieżącej gałęzi (domyślnie `HEAD`).
- **`--git-diff-base`**: Określ bazowe odniesienie dla git diff (domyślnie `origin/main`).
- **`--git-diff-current`**: Określ bieżące odniesienie dla git diff (domyślnie `HEAD`).
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

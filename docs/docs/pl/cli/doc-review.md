---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Przegląd dokumentu
description: Dowiedz się, jak przeglądać pliki dokumentacji pod kątem jakości, spójności i kompletności w różnych lokalizacjach.
keywords:
  - Przegląd
  - Dokument
  - Dokumentacja
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-review
author: aymericzip
---

# Przegląd dokumentu

Polecenie `doc review` analizuje pliki dokumentacji pod kątem jakości, spójności i kompletności w różnych lokalizacjach.

## Kluczowe punkty:

- Dzieli duże pliki markdown na fragmenty, aby pozostać w granicach okna kontekstowego modelu AI.
- Optymalizuje fragmenty do przeglądu i pomija części, które są już przetłumaczone i nie zostały zmienione.
- Przetwarza pliki, fragmenty i lokalizacje równolegle przy użyciu systemu kolejkowego, aby zwiększyć prędkość.

```bash packageManager="npm"
npx intlayer doc review
```

```bash packageManager="yarn"
yarn intlayer doc review
```

```bash packageManager="pnpm"
pnpm intlayer doc review
```

```bash packageManager="bun"
bun x intlayer doc review
```

Można go użyć do przeglądu plików, które są już przetłumaczone, oraz do sprawdzenia, czy tłumaczenie jest poprawne.

W większości przypadków,

- preferuj użycie `doc translate`, gdy przetłumaczona wersja tego pliku nie jest dostępna.
- preferuj użycie `doc review`, gdy przetłumaczona wersja tego pliku już istnieje.

> Zauważ, że proces przeglądu zużywa więcej tokenów wejściowych niż proces tłumaczenia, aby w pełni przejrzeć ten sam plik. Jednak proces przeglądu zoptymalizuje fragmenty do przeglądu i pominie części, które nie zostały zmienione.

## Argumenty:

**Opcje listy plików:**

- **`--doc-pattern [docPattern...]`**: Wzorce glob do dopasowania plików dokumentacji do przeglądu.

  > Przykład: `npx intlayer doc review --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Wzorce glob do wykluczenia z przeglądu.

  > Przykład: `npx intlayer doc review --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Pomiń plik, jeśli został zmodyfikowany przed podanym czasem.
  - Może to być czas absolutny, np. "2025-12-05" (string lub Date)
  - Może to być czas względny w ms `1 * 60 * 60 * 1000` (1 godzina)
  - Ta opcja sprawdza czas aktualizacji pliku za pomocą metody `fs.stat`. Może więc być wpływana przez Git lub inne narzędzia modyfikujące plik.

  > Przykład: `npx intlayer doc review --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Pomiń plik, jeśli został zmodyfikowany w podanym czasie.
  - Może to być czas absolutny, np. "2025-12-05" (string lub Date)
  - Może to być czas względny w ms `1 * 60 * 60 * 1000` (1 godzina)
  - Ta opcja sprawdza czas aktualizacji pliku za pomocą metody `fs.stat`. Może więc być wpływana przez Git lub inne narzędzia modyfikujące plik.

  > Przykład: `npx intlayer doc review --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: Pomiń plik, jeśli już istnieje.

  > Przykład: `npx intlayer doc review --skip-if-exists`

**Opcje trybu przeglądu:**

- **`--log`**: Tryb tylko logowania. Nie tłumaczy za pomocą AI; zamiast tego loguje bloki wymagające uwagi (wraz z numerami linii i zawartością) dla bazowych i docelowych lokalizacji, aby pomóc innemu agentowi w wygenerowaniu tłumaczeń.

  > Przykład: `npx intlayer doc review --log`

**Opcje wyjścia wpisu:**

- **`--locales [locales...]`**: Docelowe lokalizacje, dla których ma być przejrzana dokumentacja.

  > Przykład: `npx intlayer doc review --locales fr es de`

- **`--base-locale [baseLocale]`**: Źródłowa lokalizacja (bazowy dokument), z którą należy porównać.

  > Przykład: `npx intlayer doc review --base-locale en`

**Opcje przetwarzania plików:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Liczba plików przetwarzanych jednocześnie podczas przeglądu.

  > Przykład: `npx intlayer doc review --nb-simultaneous-file-processed 5`

**Opcje AI:**

- **`--model [model]`**: Model AI używany do przeglądu (np. `gpt-3.5-turbo`).
- **`--provider [provider]`**: Dostawca AI używany do przeglądu.
- **`--temperature [temperature]`**: Ustawienie temperatury dla modelu AI.
- **`--api-key [apiKey]`**: Podaj własny klucz API dla usługi AI.
- **`--application-context [applicationContext]`**: Podaj dodatkowy kontekst dla przeglądu AI.
- **`--data-serialization [dataSerialization]`**: Format serializacji danych dla funkcji AI w Intlayer. Opcje: `json` (standardowy, niezawodny), `toon` (mniej tokenów, mniej spójny).
- **`--custom-prompt [prompt]`**: Dostosuj podstawowy prompt używany do przeglądu. (Uwaga: W większości przypadków zaleca się użycie opcji `--custom-instructions`, ponieważ zapewnia lepszą kontrolę.)

  > Przykład: `npx intlayer doc review --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "Moja aplikacja to sklep z kotami"`

**Opcje zmiennych środowiskowych:**

- **`--env`**: Określ środowisko (np. `development`, `production`).
- **`--env-file [envFile]`**: Podaj niestandardowy plik środowiskowy do załadowania zmiennych.
- **`--base-dir`**: Określ katalog bazowy projektu.
- **`--no-cache`**: Wyłącz pamięć podręczną.

  > Przykład: `npx intlayer doc review --base-dir ./docs --env-file .env.production.local`

**Opcje logowania:**

- **`--verbose`**: Włącz szczegółowe logowanie do debugowania. (domyślnie true przy użyciu CLI)

  > Przykład: `npx intlayer doc review --verbose`

**Opcje niestandardowych instrukcji:**

- **`--custom-instructions [customInstructions]`**: Niestandardowe instrukcje dodane do promptu. Przydatne do stosowania specyficznych reguł dotyczących formatowania, tłumaczenia URL itp.

  > Przykład: `npx intlayer doc review --custom-instructions "Unikaj tłumaczenia URL-i i zachowaj format markdown"`

  > Przykład: `npx intlayer doc review --custom-instructions "$(cat ./instructions.md)"`

**Opcje Git:**

- **`--git-diff`**: Uruchom tylko na plikach, które zawierają zmiany od bazy (domyślnie `origin/main`) do bieżącej gałęzi (domyślnie `HEAD`).
- **`--git-diff-base`**: Określ bazowe odniesienie dla git diff (domyślnie `origin/main`).
- **`--git-diff-current`**: Określ bieżące odniesienie dla git diff (domyślnie `HEAD`).
- **`--uncommitted`**: Uwzględnij niezacommitowane zmiany.
- **`--unpushed`**: Uwzględnij niepushowane zmiany.
- **`--untracked`**: Uwzględnij nieśledzone pliki.

  > Przykład: `npx intlayer doc review --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Przykład: `npx intlayer doc review --uncommitted --unpushed --untracked`

> Zauważ, że ścieżka pliku wyjściowego zostanie określona przez zastąpienie następujących wzorców:
>
> - `/{{baseLocale}}/` na `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` na `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` na `_{{locale}}.`
> - `{{baseLocale}}_` na `{{locale}}_`
> - `.{{baseLocaleName}}.` na `.{{localeName}}.`
>
> Jeśli wzorzec nie zostanie znaleziony, plik wyjściowy doda `.{{locale}}` do rozszerzenia pliku. `./my/file.md` zostanie przejrzany i zaktualizowany do `./my/file.fr.md` dla lokalizacji francuskiej.

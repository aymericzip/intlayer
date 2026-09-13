---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: Jak ograniczyć zużycie tokenów Claude Code podczas generowania tłumaczeń
description: Dlaczego tłumaczenie z Claude Code zużywa nadmierną liczbę tokenów, co zamiast tego robi Intlayer (filtruje przetłumaczone klucze, dzieli JSON na fragmenty, tłumaczy markdown blok po bloku) oraz jak ponownie wykorzystać subskrypcję Claude za pomocą claude setup-token.
keywords:
  - claude code
  - tokens
  - zużycie tokenów
  - setup-token
  - i18n
  - internacjonalizacja
  - tłumaczenie
  - fill
  - mcp
  - agent
slugs:
  - frequent-questions
  - claude-code-token-consumption
author: aymericzip
---

# Jak ograniczyć zużycie tokenów Claude Code podczas generowania tłumaczeń

## Opis problemu

Zlecanie tłumaczenia treści narzędziu Claude Code (lub jakiemukolwiek innemu agentowi programistycznemu) jest najbardziej kosztownym podejściem. Przy każdym uruchomieniu agent musi:

- Załadować cały plik JSON lub plik zawartości do swojego kontekstu, w tym klucze, które zostały już przetłumaczone.
- Przeszukać powiązane pliki, aby ustalić, gdzie znajduje się treść i jak jest zorganizowana.
- Określić, których wersji językowych (locales) brakuje i które należy wygenerować.
- Za każdym razem ponownie odczytywać niestandardowe instrukcje ("przekształcaj adresy URL w ten sposób", "pozostaw nazwę marki po angielsku", "stosuj formę nieformalną").
- Przepisać cały plik od nowa, łącznie z fragmentami, które w ogóle się nie zmieniły.

Wszystkie te informacje są przesyłane ponownie w każdej turze konwersacji, przez co koszt rośnie według wzoru `rozmiar treści × liczba wersji językowych × liczba tur`, a wszelkie rozbieżności w formatowaniu lub kluczach trzeba wychwytywać ręcznie.

## Co zamiast tego robi Intlayer

Zaletą Intlayer jest wykonywanie tej pracy poza agentem, za pośrednictwem potoku stworzonego specjalnie do zadań tłumaczeniowych:

- **Filtruje istniejące tłumaczenia**, aby ograniczyć zużycie tokenów. Klucze już przetłumaczone w pliku JSON są pomijane, a do modelu trafiają wyłącznie brakujące wpisy.
- **Tłumaczy markdown blok po bloku.** W przypadku dokumentacji polecenia [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/doc-translate.md) oraz [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/doc-review.md) porównują każdy blok z dokumentem bazowym i pomijają bloki przetłumaczone lub niezmienione.
- **Dzieli plik JSON na mniejsze fragmenty (chunking)**, jeśli jest zbyt duży, aby operować w optymalnej części okna kontekstu.
- **Spłaszcza i rekonstruuje JSON**, optymalizując zużycie tokenów.
- **Wstawia niestandardowe prompty** dla określonych zasad dotyczących marki i słownictwa (`applicationContext`, `--custom-instructions`), dzięki czemu definiujesz je raz, zamiast powtarzać w każdej rozmowie.
- **Weryfikuje strukturę**, zapewniając spójność, zapobiegając rozbieżnościom kluczy i zachowując formatowanie (markdown, HTML, wstawki, formy mnogie).
- **Zapewnia obsługę ponownych prób (retry)** w przypadku nieprawidłowego formatu odpowiedzi.
- **Kolejkuje i zrównolegla żądania** pomiędzy plikami, fragmentami i językami, znacznie zwiększając szybkość działania.

Żaden z tych procesów nie obciąża kontekstu agenta. Złota zasada: pozwól agentowi decydować, **co** zinternacjonalizować, a powtarzalną pracę powierz Intlayer.

## Rozwiązanie

### 1. Przekaż ekstrakcję poleceniu `intlayer extract`

Zamiast prosić agenta o ręczne przepisywanie każdego komponentu, uruchom polecenie [`extract`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md). Przenosi ono zahardkodowane ciągi znaków do pliku `.content` obok komponentu, bez ładowania całego pliku do kontekstu agenta.

```bash
npx intlayer extract --file src/components/Header.tsx
```

### 2. Przekaż tłumaczenie poleceniu `intlayer fill`

Nigdy nie zlecaj tłumaczenia bezpośrednio agentowi. Polecenie [`fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/fill.md) stosuje wyżej opisany proces: wysyła wyłącznie brakujące klucze, dzieli je na części, przetwarza języki równolegle i zapisuje wynik z powrotem w plikach zawartości.

```bash
npx intlayer fill
```

Kilka flag pozwala utrzymać oszczędny zakres operacji:

- `--git-diff` (lub `--uncommitted`) przetwarza tylko słowniki zmodyfikowane w bieżącej gałęzi.
- `--file` lub `--keys` wskazuje konkretne pliki zawartości.
- `--output-locales fr es` ogranicza wykonanie do języków, których faktycznie potrzebujesz w danym momencie.
- `--skip-metadata` pomija generowanie tytułów, opisów i tagów.
- `--data-serialization toon` przesyła bardziej zwarty ładunek danych do modelu (mniej tokenów, nieco mniej przewidywalny wynik).

```bash
npx intlayer fill --git-diff --output-locales fr es --skip-metadata
```

### 3. Tłumacz markdown za pomocą `doc translate` i `doc review`

Zlecenie agentowi przetłumaczenia pliku `.md` wiąże się z wklejaniem całego dokumentu dla każdego języka przy każdej zmianie. Z kolei polecenia [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/doc-translate.md) i [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/doc-review.md) operują blok po bloku.

Używaj `doc translate`, gdy przetłumaczony plik jeszcze nie istnieje. Dzieli on markdown na części, tłumaczy je równolegle i generuje pliki docelowe:

```bash
npx intlayer doc translate --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

Używaj `doc review`, gdy przetłumaczony plik już istnieje. Porównuje on każdy blok z dokumentem bazowym, pomija bloki przetłumaczone lub bez zmian i wysyła wyłącznie te różniące się:

```bash
npx intlayer doc review --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

Oba polecenia przyjmują Twoje wytyczne raz, bez potrzeby powtarzania ich w każdym monicie:

```bash
npx intlayer doc translate --custom-instructions "Do not translate URLs. Keep the markdown structure and the code blocks untouched."
```

Dwa tryby `doc review` są przydatne, gdy agent musi uczestniczyć w procesie bez wykonywania wywołań AI przez Intlayer:

- `--mode report` raportuje bloki wymagające uwagi wraz z numerami linii, dzięki czemu agent modyfikuje tylko te konkretne fragmenty.
- `--mode synthesis` informuje wyłącznie o tym, które dokumenty są aktualne, a które nadal zawierają bloki do edycji.

```bash
npx intlayer doc review --mode report --locales fr
```

### 4. Pozwól agentowi wywoływać CLI za pośrednictwem serwera MCP

Dzięki [serwerowi MCP Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md) agent odpowiada na podstawie aktualnej dokumentacji i samodzielnie uruchamia `intlayer fill` lub `intlayer doc review`, zamiast odtwarzać logikę w rozmowie.

```bash
claude mcp add intlayer npx -y @intlayer/mcp
```

Zainstalowanie [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md) za pomocą `npx intlayer init skills` zapobiega ponadto zgadywaniu API Intlayer przez agenta i ponownemu czytaniu dokumentacji przy każdym zadaniu.

### 5. Wykorzystaj ponownie subskrypcję Claude dzięki `claude setup-token`

Wykonywanie konfiguracji i18n w interaktywnej sesji Claude Code utrzymuje całą historię rozmowy w oknie kontekstu. Przenieś to obciążenie do krótkiej sesji w trybie headless.

Wygeneruj długoterminowy token w ramach swojej subskrypcji Claude:

```bash
claude setup-token
```

Zapisz go jako `CLAUDE_CODE_OAUTH_TOKEN` (w pliku `.env` lub w zmiennych CI), a następnie użyj go w jednorazowej sesji uruchamiającej polecenia Intlayer:

```bash
CLAUDE_CODE_OAUTH_TOKEN=... claude -p "Run npx intlayer extract on src/components, then npx intlayer fill --uncommitted"
```

Sesja obejmie wyłącznie ten prompt oraz wynik polecenia, bez obciążania wcześniejszą historią. Ten sam token działa w akcji [Claude Code GitHub Action](https://github.com/anthropics/claude-code-action), umożliwiając uruchamianie `intlayer fill` przy każdym pull requeście.

> Token wygenerowany przez `claude setup-token` uwierzytelnia wyłącznie Claude Code. Nie można go używać jako klucza Anthropic API w parametrze `ai.apiKey`. Do samego tłumaczenia `intlayer fill` wykorzystuje Twoje [konto Intlayer](https://app.intlayer.org) (w tym darmowy plan) lub własny klucz dostawcy skonfigurowany w sekcji [`ai`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md#ai-configuration).

## Podsumowanie

| Zadanie                   | Kto wykonuje             | Tokeny w kontekście agenta |
| ------------------------- | ------------------------ | -------------------------- |
| Decyzja o lokalizacji     | Claude Code              | Niskie                     |
| Ekstrakcja ciągów znaków  | `intlayer extract`       | Brak                       |
| Tłumaczenie zawartości    | `intlayer fill`          | Brak                       |
| Tłumaczenie dokumentacji  | `intlayer doc translate` | Brak                       |
| Aktualizacja dokumentacji | `intlayer doc review`    | Brak                       |
| Uruchamianie poleceń      | Headless Claude Code     | Prompt + wynik polecenia   |

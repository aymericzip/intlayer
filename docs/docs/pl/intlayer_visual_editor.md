---
createdAt: 2025-08-23
updatedAt: 2025-09-23
title: Intlayer Visual Editor | Edytuj swoją zawartość za pomocą edytora wizualnego
description: Odkryj, jak korzystać z Intlayer Editor do zarządzania swoją wielojęzyczną stroną internetową. Postępuj zgodnie z krokami w tej dokumentacji online, aby skonfigurować swój projekt w kilka minut.
keywords:
  - Edytor
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - editor
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 6.1.0
    date: 2025-09-23
    changes: "Dodano opcję with w CLI"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Zmieniono zachowanie edytora, gdy rozszerzenie pliku nie jest `.json`"
  - version: 6.0.0
    date: 2025-09-21
    changes: "Dodano polecenie reexported"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inicjalizacja historii"
author: aymericzip
---

# Dokumentacja Intlayer Visual Editor

<iframe title="Edytor wizualny + CMS dla Twojej aplikacji internetowej: wyjaśnienie Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer Visual Editor to narzędzie, które otacza Twoją stronę internetową, aby umożliwić interakcję z plikami deklaracji zawartości za pomocą edytora wizualnego.

![Interfejs Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

Pakiet `intlayer-editor` jest oparty na Intlayer i jest dostępny dla aplikacji JavaScript, takich jak React (Create React App), Vite + React oraz Next.js.

## Edytor wizualny a CMS

Intlayer Visual Editor to narzędzie, które pozwala zarządzać zawartością w edytorze wizualnym dla lokalnych słowników. Po dokonaniu zmiany zawartość zostanie zastąpiona w bazie kodu. Oznacza to, że aplikacja zostanie przebudowana, a strona przeładowana, aby wyświetlić nową zawartość.

W przeciwieństwie do tego, [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md) to narzędzie, które pozwala zarządzać zawartością w edytorze wizualnym dla zdalnych słowników. Po dokonaniu zmiany zawartość **nie** wpłynie na bazę kodu. Strona internetowa automatycznie wyświetli zmienioną zawartość.

## Integracja Intlayer z Twoją aplikacją

Aby uzyskać więcej szczegółów na temat integracji Intlayer, zobacz odpowiednią sekcję poniżej:

### Integracja z Next.js

Aby zintegrować z Next.js, zapoznaj się z [przewodnikiem konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_15.md).

### Integracja z Create React App

Aby zintegrować z Create React App, zapoznaj się z [przewodnikiem konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_create_react_app.md).

### Integracja z Vite + React

Aby zintegrować z Vite + React, zapoznaj się z [przewodnikiem konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+react.md).

## Jak działa Intlayer Editor

Edytor wizualny w aplikacji obejmuje dwie rzeczy:

- Aplikację frontendową, która wyświetli Twoją stronę internetową w iframe. Jeśli Twoja strona korzysta z Intlayer, edytor wizualny automatycznie wykryje Twoją zawartość i pozwoli Ci z nią interagować. Po dokonaniu modyfikacji będziesz mógł pobrać swoje zmiany.

- Po kliknięciu przycisku pobierania, edytor wizualny wyśle żądanie do serwera, aby zastąpić pliki deklaracji zawartości nową zawartością (w miejscach, gdzie te pliki są zadeklarowane w Twoim projekcie).

> Zauważ, że Intlayer Editor zapisze Twoje pliki deklaracji zawartości jako JSON, jeśli rozszerzenie pliku to `.json`. Jeśli rozszerzenie pliku to `.ts`, `.tsx`, `.js`, `.jsx`, `.mjs`, `.cjs`, zapisze plik jako plik JavaScript, używając transformera babel.

## Instalacja

Gdy Intlayer jest skonfigurowany w Twoim projekcie, po prostu zainstaluj `intlayer-editor` jako zależność deweloperską:

```bash packageManager="npm"
npm install intlayer-editor --save-dev
```

```bash packageManager="yarn"
yarn add intlayer-editor --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer-editor --save-dev
```

```bash packageManager="bun"
bun add intlayer-editor --dev
```

Dzięki flagowi `--with` możesz uruchomić edytor równolegle z innym poleceniem:

```json5 fileName="package.json"
{
  "scripts": {
    "start:editor": "npx intlayer-editor start --with 'next dev --turbopack'",
  },
}
```

## Konfiguracja

W pliku konfiguracyjnym Intlayer możesz dostosować ustawienia edytora:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... inne ustawienia konfiguracyjne
  editor: {
    /**
     * Wymagane
     * URL aplikacji.
     * To jest URL, na który celuje edytor wizualny.
     * Przykład: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Opcjonalne
     * Domyślnie `true`. Jeśli `false`, edytor jest nieaktywny i nie można uzyskać do niego dostępu.
     * Może być używane do wyłączenia edytora w określonych środowiskach ze względów bezpieczeństwa, takich jak produkcja.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * Opcjonalne
     * Domyślnie `8000`.
     * Port serwera edytora.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Opcjonalne
     * Domyślnie "http://localhost:8000"
     * URL serwera edytora.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

> Aby zobaczyć wszystkie dostępne parametry, zapoznaj się z [dokumentacją konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

## Używanie edytora

1. Po zainstalowaniu edytora możesz go uruchomić za pomocą następującego polecenia:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

   > **Uwaga: aplikacja powinna być uruchomiona równolegle.** URL aplikacji powinien odpowiadać temu, który ustawiłeś w konfiguracji edytora (`applicationURL`).

   > **Uwaga: polecenie jest reeksportowane przez pakiet `intlayer`. Możesz zamiast tego użyć `npx intlayer editor start`.**

2. Następnie otwórz podany URL. Domyślnie `http://localhost:8000`.

   Możesz zobaczyć każde pole indeksowane przez Intlayer, najeżdżając kursorem na zawartość.

   ![Najazd kursorem na zawartość](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. Jeśli Twoja zawartość jest obrysowana, możesz przytrzymać ją dłużej, aby wyświetlić panel edycji.

## Konfiguracja środowiska

Edytor można skonfigurować tak, aby używał konkretnego pliku środowiskowego. Jest to przydatne, gdy chcesz używać tego samego pliku konfiguracyjnego dla środowiska deweloperskiego i produkcyjnego.

Aby użyć konkretnego pliku środowiskowego, możesz użyć flagi `--env-file` lub `-f` podczas uruchamiania edytora:

```bash packageManager="npm"
npx intlayer-editor start -f .env.development
```

```bash packageManager="yarn"
yarn intlayer-editor start -f .env.development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -f .env.development
```

> Zauważ, że plik środowiskowy powinien znajdować się w katalogu głównym Twojego projektu.

Lub możesz użyć flagi `--env` lub `-e`, aby określić środowisko:

```bash packageManager="npm"
npx intlayer-editor start -e development
```

```bash packageManager="yarn"
yarn intlayer-editor start -e development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -e development
```

## Debugowanie

Jeśli napotkasz jakiekolwiek problemy z edytorem wizualnym, sprawdź następujące kwestie:

- Edytor wizualny oraz aplikacja są uruchomione.

- Konfiguracja [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) jest poprawnie ustawiona w Twoim pliku konfiguracyjnym Intlayer.
  - Wymagane pola:
- URL aplikacji powinien odpowiadać temu, który ustawiłeś w konfiguracji edytora (`applicationURL`).

- Edytor wizualny używa iframe do wyświetlania Twojej strony internetowej. Upewnij się, że Polityka Bezpieczeństwa Treści (CSP) Twojej strony pozwala na adres URL CMS jako `frame-ancestors` (domyślnie `http://localhost:8000`). Sprawdź konsolę edytora pod kątem błędów.

## Często Zadawane Pytania

<FAQ>

<Question title="Jaka jest różnica między edytorem wizualnym a CMS?">

Edytor wizualny edytuje lokalne słowniki i zapisuje zmiany bezpośrednio w plikach kodu źródłowego, dzięki czemu przechodzą one przez normalny proces kontroli wersji Git. CMS zapisuje treść na serwerze zdalnym, umożliwiając natychmiastową publikację bez wdrażania kodu.

</Question>

<Question title="O ile i18n zwiększa rozmiar mojego bundle'a?">

Znacznie mniej niż rozwiązania oparte na przestrzeniach nazw, ponieważ strona nigdy nie pobiera katalogu, którego nie renderuje. Znaczniki renderowane po stronie serwera rozwiązują treść na serwerze, a kompilator czasu budowy zastępuje wywołania `useIntlayer` dokładnymi wpisami, których używa komponent, dzięki czemu nieużywane klucze i nieużywane języki są usuwane. [Słowniki dynamiczne](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/index.md) dzielą resztę na poszczególne języki. W porównaniu z typowymi alternatywami, Intlayer zmniejsza rozmiar bundle'a i strony nawet o 50%. Zobacz [optymalizację bundle'a](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md) oraz [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/index.md).

</Question>

<Question title="Czy mogę zmigrować z i18next, next-intl lub react-i18next bez przepisywania moich komponentów?">

Tak, i są dwie drogi. Możesz migrować treść stopniowo za pomocą [przewodnika migracji z i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_i18next_to_intlayer.md) lub [przewodnika migracji z next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_next-intl_to_intlayer.md). Możesz także zachować obecne API w całości: [adaptery kompatybilności](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md) udostępniają dokładnie to samo API co `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` i `Lingui`, ale zasilane słownikami Intlayer, więc zmieniają się importy, a kod komponentów pozostaje nienaruszony.

</Question>

<Question title="Czy mogę zachować moje istniejące pliki tłumaczeń JSON?">

Tak. Wtyczka [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md) utrzymuje Twoje pliki `/messages/{locale}/{namespace}.json` jako źródło prawdy i generuje z nich słowniki Intlayer w obu kierunkach. Wtyczka [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-po.md) robi to samo dla katalogów gettext, a [pliki per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/per_locale_file.md) pozwalają rozdzielić zawartość według języka zamiast grupować lokalizacje w jednym pliku.

</Question>

<Question title="Czy muszę przenosić moją zawartość klucz po kluczu?">

Nie. Uruchom `npx intlayer extract`, a Intlayer odczyta Twoje pliki źródłowe, wyodrębni ciągi widoczne dla użytkownika i utworzy plik `.content` obok każdego z nich, dzięki czemu przeglądasz diff zamiast ręcznie kopiować ciągi do katalogu pojedynczo. Zobacz [polecenie extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md).

W przypadku w pełni zautomatyzowanego procesu [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) robi to samo w czasie budowania w kodzie JSX, TSX, Vue i Svelte, generując słowniki przy każdej zmianie, dzięki czemu nie ma potrzeby ręcznego zarządzania kluczami. Działa on w oparciu o analizę statyczną, więc ciągi istniejące tylko w czasie wykonywania pozostają poza jego zasięgiem i wymaga kilku adnotacji do odróżnienia tekstu dla użytkownika od logiki aplikacji.

</Question>

<Question title="Jakie narzędzia dla edytora i agentów AI są dostępne?">

Pięć narzędzi, wszystkie opcjonalne:

- **[Rozszerzenie VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)**: przejście od klucza `useIntlayer` do pliku treści, który go deklaruje, wyodrębnianie treści z komponentu oraz uruchamianie build, fill, test, push i pull z palety poleceń lub dedykowanej karty Intlayer.
- **[Serwer LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/lsp.md)**: taka sama świadomość w dowolnym edytorze obsługującym LSP, z funkcjami przejdź do definicji (go to definition), znajdź wszystkie referencje, podglądem przetłumaczonej wartości po najechaniu kursorem, autouzupełnianiem kluczy i pól oraz ostrzeżeniem, gdy klucz nie jest nigdzie zadeklarowany. Rozpoznaje również wywołania `i18next`, `react-i18next`, `next-intl` i `use-intl`, co ułatwia migrację.
- **[Serwer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md)**: udostępnia dokumentację i CLI Intlayer dla Cursor, VS Code, Claude Desktop, Claude Code i ChatGPT, dzięki czemu asystent odpowiada na podstawie aktualnej dokumentacji zamiast zgadywać i może samodzielnie wykonywać polecenia, takie jak `intlayer fill`.
- **[Umiejętności agenta (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)**: wyspecjalizowane umiejętności, takie jak `intlayer-config`, `intlayer-cli` i `intlayer-content`, oraz po jednej dla każdego frameworka, które uczą agenta konfiguracji routingu i typów węzłów treści.
- **[Wtyczka ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/eslint.md)**: reguła `no-raw-text` oznacza zakodowane na stałe ciągi tekstowe, z dodatkowymi regułami dla statycznych kluczy słownika i nieużywanej zawartości.

</Question>

<Question title="Gdzie działa edytor wizualny?">

Na Twojej własnej infrastrukturze. Ładuje Twoją aplikację w elemencie iframe i komunikuje się z lokalnym serwerem edytora, więc treść nigdy nie opuszcza Twojego komputera.

</Question>

<Question title="Czy edytorzy muszą umieć programować?">

Nie. Otwierają stronę, klikają bezpośrednio w element tekstowy i edytują go w miejscu. Edytor sam lokalizuje powiązany wpis w pliku słownika.

</Question>

<Question title="Czy edycja przez edytor wizualny zmienia moje pliki źródłowe?">

Tak, taki jest cel. Zmiana jest zapisywana w pliku deklaracji treści w Twojej bazie kodu, pojawiając się jako zwykła modyfikacja w diffie gita.

</Question>

<Question title="Edytor wyświetla pustą stronę lub odmawia załadowania witryny. Co sprawdzić?">

Edytor wyświetla aplikację w iframe, więc Twoja Polityka Bezpieczeństwa Treści (CSP) musi zezwalać na adres edytora w dyrektywie `frame-ancestors`. Upewnij się również, że serwer aplikacji i serwer edytora działają.

</Question>

<Question title="Czy mogę używać edytora wizualnego na produkcji?">

Jest on zaprojektowany dla środowisk deweloperskich i stagingowych, gdzie przebudowanie po edycji jest akceptowalne. Do edycji treści na działającej stronie produkcyjnej zalecany jest [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

</Question>

<Question title="Czy edytor wizualny jest bezpłatny?">

Tak. Edytor wizualny jest częścią projektu open source na licencji Apache 2.0, włączając zastosowania komercyjne.

</Question>

</FAQ>

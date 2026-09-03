---
createdAt: 2025-08-23
updatedAt: 2026-05-31
title: "Hono i18n - Kompletny przewodnik po tłumaczeniu swojej aplikacji"
description: "Koniec z i18next. Przewodnik 2026 do budowania wielojęzycznej (i18n) aplikacji Hono. Tłumacz z agentami AI i optymalizuj rozmiar bundle, SEO i wydajność."
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Hono
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - hono
applicationTemplate: https://github.com/aymericzip/intlayer-hono-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualizacja użycia API useIntlayer w Solid do bezpośredniego dostępu do właściwości"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Dodaj polecenie init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inicjalizacja historii"
author: aymericzip
---

# Przetłumacz swój backend Hono używając Intlayer | Internacjonalizacja (i18n)

`hono-intlayer` to potężne oprogramowanie pośredniczące (middleware) do internacjonalizacji (i18n) dla aplikacji Hono, zaprojektowane w celu udostępnienia usług backendowych globalnie poprzez dostarczanie zlokalizowanych odpowiedzi opartych na preferencjach klienta.

### Praktyczne Przypadki Użycia

- **Wyświetlanie Błędów Backendowych w Języku Użytkownika**: Gdy wystąpi błąd, wyświetlanie komunikatów w ojczystym języku użytkownika poprawia zrozumienie i zmniejsza frustrację. Jest to szczególnie przydatne w przypadku dynamicznych komunikatów o błędach, które mogą być wyświetlane w komponentach front-endowych, takich jak toasty czy modale.

- **Pobieranie Wielojęzycznej Treści**: W przypadku aplikacji pobierających treść z bazy danych, internacjonalizacja zapewnia możliwość serwowania tej treści w wielu językach. Jest to kluczowe dla platform takich jak witryny e-commerce czy systemy zarządzania treścią, które muszą wyświetlać opisy produktów, artykuły i inne treści w języku preferowanym przez użytkownika.

- **Wysyłanie Wielojęzycznych Wiadomości E-mail**: Niezależnie od tego, czy są to wiadomości transakcyjne, kampanie marketingowe czy powiadomienia, wysyłanie e-maili w języku odbiorcy może znacznie zwiększyć zaangażowanie i skuteczność.

- **Wielojęzyczne Powiadomienia Push**: W przypadku aplikacji mobilnych wysyłanie powiadomień push w preferowanym języku użytkownika może poprawić interakcję i retencję. Ten osobisty akcent sprawia, że powiadomienia wydają się bardziej istotne i skłaniające do działania.

- **Inna Komunikacja**: Każda forma komunikacji z backendu, taka jak wiadomości SMS, alerty systemowe czy aktualizacje interfejsu użytkownika, zyskuje na byciu w języku użytkownika, zapewniając jasność i poprawiając ogólne wrażenia użytkownika.

Poprzez internacjonalizację backendu, Twoja aplikacja nie tylko szanuje różnice kulturowe, ale także lepiej dopasowuje się do potrzeb rynku globalnego, co jest kluczowym krokiem w skalowaniu usług na całym świecie.

## Pierwsze Kroki

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-hono-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Zobacz [Application Template](https://github.com/aymericzip/intlayer-hono-template) na GitHub.

### Instalacja

Aby zacząć korzystać z `hono-intlayer`, zainstaluj pakiet za pomocą npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> flaga `--interactive` jest opcjonalna. Użyj `intlayer-cli init`, jeśli jesteś agentem AI.

> To polecenie wykryje Twoje środowisko i zainstaluje wymagane pakiety. Na przykład:

```bash packageManager="npm"
npm install intlayer hono-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
```

### Konfiguracja

Skonfiguruj ustawienia internacjonalizacji, tworząc plik `intlayer.config.ts` w katalogu głównym projektu:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
      Locales.POLISH,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Deklarowanie Treści

Twórz i zarządzaj deklaracjami treści, aby przechowywać tłumaczenia:

```typescript fileName="src/index.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      pl: "Przykład zwróconej treści w języku polskim",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      pl: "Przykład zwróconej zawartości w języku polskim",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "pl": "Przykład zwróconej zawartości w języku polskim",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Deklaracje treści mogą być definiowane w dowolnym miejscu w aplikacji, o ile są zawarte w katalogu `contentDir` (domyślnie `./src`) i pasują do rozszerzenia pliku deklaracji treści (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Więcej szczegółów znajdziesz w [dokumentacji deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

### Konfiguracja Aplikacji Hono

Skonfiguruj aplikację Hono do korzystania z `hono-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer, t, getDictionary, getIntlayer } from "hono-intlayer";
import dictionaryExample from "./index.content";

const app = new Hono();

// Załaduj obsługę żądań internacjonalizacji
app.use("*", intlayer());

// Trasy
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      pl: "Przykład zwróconej treści w języku polskim",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

export default app;
```

### Kompatybilność

`hono-intlayer` jest w pełni kompatybilny z:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/index.md) dla aplikacji React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/index.md) dla aplikacji Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/index.md) dla aplikacji Vite

Działa również bezproblemowo z dowolnym rozwiązaniem do internacjonalizacji w różnych środowiskach, w tym w przeglądarkach i żądaniach API. Możesz dostosować middleware, aby wykrywał język poprzez nagłówki lub pliki cookie:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Inne opcje konfiguracji
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

Domyślnie `hono-intlayer` będzie interpretować nagłówek `Accept-Language` w celu określenia preferowanego języka klienta.

> Więcej informacji na temat konfiguracji i zaawansowanych tematów znajdziesz w naszej [dokumentacji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

### Konfiguracja TypeScript

`hono-intlayer` wykorzystuje potężne możliwości TypeScript, aby usprawnić proces internacjonalizacji. Statyczne typowanie TypeScript zapewnia uwzględnienie każdego klucza tłumaczenia, zmniejszając ryzyko brakujących tłumaczeń i poprawiając łatwość utrzymania.

![Autouzupełnianie](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Błąd tłumaczenia](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Upewnij się, że automatycznie wygenerowane typy (domyślnie w ./types/intlayer.d.ts) są uwzględnione w pliku tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Twoje istniejące konfiguracje TypeScript
  "include": [
    // ... Twoje istniejące konfiguracje TypeScript
    ".intlayer/**/*.ts", // Uwzględnij automatycznie wygenerowane typy
  ],
}
```

### Rozszerzenie VS Code

Aby poprawić wrażenia z programowania z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer VS Code**.

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie zapewnia:

- **Autouzupełnianie** dla kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podglądy inline** przetłumaczonej treści.
- **Szybkie akcje** ułatwiające tworzenie i aktualizowanie tłumaczeń.

Więcej szczegółów na temat korzystania z rozszerzenia znajdziesz w [dokumentacji rozszerzenia Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć zatwierdzania ich do repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

## Często Zadawane Pytania

<FAQ>

<Question title="Jakie są różne rozwiązania dostępne do internacjonalizacji backendu Hono?">

Klasyczną opcją jest `i18next` z middleware HTTP, który ładuje katalogi JSON dla przestrzeni nazw i przechowuje lokalizację w żądaniu. Alternatywą jest `Intlayer` poprzez `hono-intlayer`, który deklaruje treść w typowanych plikach współdzielonych z frontendem, określa lokalizację na poziomie żądania oraz dodaje tłumaczenia AI i CMS.

Powodem internacjonalizacji backendu jest fakt, że duża część tekstu czytanego przez użytkownika nigdy nie przechodzi przez frontend: komunikaty błędów API, transakcyjne e-maile, powiadomienia push, SMS-y i eksporty PDF. Wymagają one języka odbiorcy, rozwiązywanego per żądanie, a nie per sesja.

Zobacz [dlaczego Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/interest_of_intlayer.md).

</Question>

<Question title="O ile i18n zwiększa rozmiar bundle'a mojego serwera Hono?">

W bardzo niewielkim stopniu. Słowniki są kompilowane z wyprzedzeniem i uwzględniane są tylko zadeklarowane języki, więc nie ma ładowania katalogów przy starcie ani odczytów plików na ścieżce żądania. Ma to największe znaczenie we wdrożeniach serverless i edge, gdzie rozmiar pakietu wpływa na czas zimnego startu (cold start). Zobacz [optymalizację bundle'a](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md).

</Question>

<Question title="Czy mogę zmigrować z i18next bez przepisywania moich handlerów?">

Tak, i są dwie drogi. Możesz migrować treść stopniowo za pomocą [przewodnika migracji z i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_i18next_to_intlayer.md). Możesz także zachować obecne API: [adaptery kompatybilności](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md) udostępniają dokładnie to samo API co `i18next`, ale zasilane słownikami Intlayer, więc zmieniają się importy, a kod handlerów pozostaje bez zmian.

</Question>

<Question title="Czy mogę zachować moje istniejące pliki tłumaczeń JSON?">

Tak. Wtyczka [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md) utrzymuje Twoje pliki `/messages/{locale}/{namespace}.json` jako źródło prawdy i generuje z nich słowniki Intlayer w obu kierunkach. Wtyczka [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-po.md) robi to samo dla katalogów gettext, a [pliki per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/per_locale_file.md) pozwalają rozdzielić zawartość według języka zamiast grupować lokalizacje w jednym pliku.

</Question>

<Question title="Czy muszę przenosić moją zawartość klucz po kluczu?">

Nie. Uruchom `npx intlayer extract`, a Intlayer odczyta Twoje komponenty, wyodrębni ciągi widoczne dla użytkownika i utworzy plik `.content` obok każdego z nich, dzięki czemu przeglądasz diff zamiast ręcznie kopiować ciągi do katalogu pojedynczo.

W przypadku w pełni zautomatyzowanego procesu [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) robi to samo w czasie budowania: skanuje kod JSX, TSX, Vue i Svelte przy każdej zmianie, generuje słowniki i utrzymuje je w synchronizacji za pośrednictwem hot module replacement, dzięki czemu nie trzeba w ogóle ręcznie utrzymywać kluczy.

</Question>

<Question title="Jakie narzędzia dla edytora i agentów AI są dostępne?">

Pięć narzędzi, wszystkie opcjonalne:

- **[Rozszerzenie VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)**: przejście od klucza `useIntlayer` do pliku treści, który go deklaruje, wyodrębnianie treści z komponentu oraz uruchamianie build, fill, test, push i pull z palety poleceń lub dedykowanej karty Intlayer.
- **[Serwer LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/lsp.md)**: taka sama świadomość w dowolnym edytorze obsługującym LSP, z funkcjami przejdź do definicji (go to definition), znajdź wszystkie referencje, podglądem przetłumaczonej wartości po najechaniu kursorem, autouzupełnianiem kluczy i pól oraz ostrzeżeniem, gdy klucz nie jest nigdzie zadeklarowany. Rozpoznaje również wywołania `i18next`, `react-i18next`, `next-intl` i `use-intl`, co ułatwia migrację.
- **[Serwer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md)**: udostępnia dokumentację i CLI Intlayer dla Cursor, VS Code, Claude Desktop, Claude Code i ChatGPT, dzięki czemu asystent odpowiada na podstawie aktualnej dokumentacji zamiast zgadywać i może samodzielnie wykonywać polecenia, takie jak `intlayer fill`.
- **[Umiejętności agenta (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)**: wyspecjalizowane umiejętności, takie jak `intlayer-config`, `intlayer-cli` i `intlayer-content`, oraz po jednej dla każdego frameworka, które uczą agenta konfiguracji routingu i typów węzłów treści.
- **[Wtyczka ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/eslint.md)**: reguła `no-raw-text` oznacza zakodowane na stałe ciągi tekstowe, z dodatkowymi regułami dla statycznych kluczy słownika i nieużywanej zawartości.

</Question>

<Question title="Skąd Intlayer wie, w jakim języku odpowiedzieć?">

Domyślnie `hono-intlayer` odczytuje nagłówek `Accept-Language` przychodzącego żądania i wybiera najbliższy zadeklarowany język, powracając do domyślnego języka. Źródło można zmienić za pomocą `routing.storage`, na przykład na niestandardowy nagłówek lub ciasteczko ustawione przez frontend, aby API odpowiadało w języku faktycznie wybranym przez użytkownika. Zobacz [dokumentację konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

</Question>

<Question title="Czy lokalizacja jest izolowana per żądanie?">

Tak. Middleware izoluje aktywny język w kontekście żądania, więc dwa równoległe żądania w różnych językach nigdy nie odczytują wzajemnie swoich lokalizacji. Dzięki temu wywołania `t()` i `getIntlayer()` są w pełni bezpieczne w serwisach bez konieczności przekazywania argumentu języka przez każdą funkcję.

</Question>

<Question title="Jak wysyłać maile transakcyjne w języku odbiorcy?">

Zadeklaruj treść wiadomości e-mail w pliku zawartości tak jak każdy inny element, a następnie pobierz ją za pomocą `getIntlayer` dla zapisanego języka odbiorcy zamiast języka żądania. Ma to kluczowe znaczenie w zadaniach asynchronicznych i kolejkach, gdzie język pochodzi z rekordu użytkownika w bazie danych.

</Question>

<Question title="Jak lokalizować komunikaty błędów API?">

Otocz komunikat błędu funkcją `t()` w miejscu jego tworzenia. Aktywny język żądania natychmiast go rozwiąże, dzięki czemu klient otrzyma komunikat gotowy do bezpośredniego wyświetlenia, a frontend nie musi utrzymywać równoległego katalogu kodów błędów.

</Question>

<Question title="Czy to działa z istniejącą aplikacją Hono i innymi middleware?">

Tak. `hono-intlayer` to standardowy middleware dla Hono, więc doskonale współpracuje z istniejącym stosem. Zarejestruj go przed trasami, które odczytują treść, aby język był określony w momencie wywołania `t()` lub `getIntlayer()`.

</Question>

<Question title="Jak automatycznie przetłumaczyć zawartość backendu za pomocą AI?">

Uruchom `npx intlayer fill`, który uzupełnia brakujące tłumaczenia za pomocą wybranego modelu LLM, korzystając z Twojego dostawcy i klucza API. Flaga `--git-diff` ogranicza operację do treści zmienionych na bieżącej gałęzi. Zobacz [polecenie fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/fill.md) oraz [integrację CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/CI_CD.md).

</Question>

<Question title="Czy Intlayer obsługuje formy mnogie, płeć i wartości interpolowane na serwerze?">

Tak: [formy mnogie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/plurial.md), [treści zależne od płci](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/gender.md), warunki, [wstawki (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/insertion.md) dla interpolacji, [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/markdown.md) dla treści e-maili oraz [formatowania](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/formatters.md) dla liczb, dat i walut.

</Question>

<Question title="Czy otrzymuję autouzupełnianie TypeScript na serwerze?">

Tak. Intlayer generuje definicje typów słowników w katalogu `./types` lub `.intlayer`, więc nieistniejący klucz powoduje błąd kompilacji, a nie pusty ciąg w czasie działania. Uruchom `npx intlayer test` w CI, aby przerwać proces budowania, gdy brakuje tłumaczeń w zadeklarowanym języku.

</Question>

<Question title="Czy frontend i backend mogą współdzielić tę samą treść?">

Tak, i jest to typowa konfiguracja. Pakiet `hono-intlayer` działa obok `react-intlayer`, `next-intlayer` lub `vite-intlayer` na tych samych deklaracjach treści, więc etykieta używana zarówno w odpowiedzi API, jak i na stronie jest definiowana tylko raz. Zobacz [jak działa Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/how_works_intlayer.md).

</Question>

<Question title="Czy Intlayer jest darmowy i open source?">

Tak, na licencji Apache 2.0, włączając zastosowania komercyjne. Hostowany CMS to opcjonalna płatna usługa, którą można również [hostować samodzielnie (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/self_hosting.md).

</Question>

</FAQ>

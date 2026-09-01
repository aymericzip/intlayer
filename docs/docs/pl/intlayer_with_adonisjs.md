---
createdAt: 2025-08-23
updatedAt: 2026-05-31
title: "AdonisJS i18n - Kompletny przewodnik po tłumaczeniu swojej aplikacji"
description: "Koniec z i18next. Przewodnik 2026 do budowania wielojęzycznej (i18n) aplikacji AdonisJS. Tłumacz z agentami AI i optymalizuj rozmiar bundle, SEO i wydajność."
keywords:
  - Międzynarodowienie
  - Dokumentacja
  - Intlayer
  - AdonisJS
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - adonisjs
applicationTemplate: https://github.com/aymericzip/intlayer-adonisjs-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualizacja użycia API useIntlayer w Solid do bezpośredniego dostępu do właściwości"
  - version: 8.0.0
    date: 2025-12-30
    changes: "Inicjalizacja historii"
author: aymericzip
---

# Przetłumacz swój backend AdonisJS za pomocą Intlayer | Międzynarodowienie (i18n)

`adonis-intlayer` to potężny pakiet do międzynarodowienia (i18n) dla aplikacji AdonisJS, zaprojektowany, aby uczynić Twoje usługi backendowe dostępnymi globalnie poprzez dostarczanie zlokalizowanych odpowiedzi na podstawie preferencji klienta.

### Praktyczne przypadki użycia

- **Wyświetlanie błędów backendu w języku użytkownika**: Gdy wystąpi błąd, wyświetlanie komunikatów w ojczystym języku użytkownika poprawia zrozumienie i zmniejsza frustrację. Jest to szczególnie przydatne w przypadku dynamicznych komunikatów o błędach, które mogą być wyświetlane w komponentach front-endowych, takich jak toasty czy modale.

- **Pobieranie wielojęzycznej treści**: W przypadku aplikacji pobierających treści z bazy danych, międzynarodowienie zapewnia, że możesz serwować te treści w wielu językach. Jest to kluczowe dla platform takich jak strony e-commerce czy systemy zarządzania treścią, które muszą wyświetlać opisy produktów, artykuły i inne treści w języku preferowanym przez użytkownika.

- **Wysyłanie wielojęzycznych wiadomości e-mail**: Niezależnie od tego, czy są to e-maile transakcyjne, kampanie marketingowe czy powiadomienia, wysyłanie e-maili w języku odbiorcy może znacznie zwiększyć zaangażowanie i skuteczność.

- **Wielojęzyczne powiadomienia push**: W przypadku aplikacji mobilnych wysyłanie powiadomień push w preferowanym języku użytkownika może zwiększyć interakcję i retencję. Ten osobisty akcent sprawia, że powiadomienia wydają się bardziej istotne i zachęcające do działania.

- **Inne formy komunikacji**: Każda forma komunikacji z backendu, taka jak wiadomości SMS, alerty systemowe czy aktualizacje interfejsu użytkownika, zyskuje na byciu w języku użytkownika, zapewniając jasność i poprawiając ogólne wrażenia użytkownika.

Umiędzynarodawiając backend, Twoja aplikacja nie tylko szanuje różnice kulturowe, ale także lepiej dopasowuje się do potrzeb globalnego rynku, co jest kluczowym krokiem w skalowaniu usług na całym świecie.

## Pierwsze kroki

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-adonisjs-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Zobacz [Application Template](https://github.com/aymericzip/intlayer-adonisjs-template) na GitHub.

### Instalacja

Aby zacząć korzystać z `adonis-intlayer`, zainstaluj pakiet za pomocą npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> flaga `--interactive` jest opcjonalna. Użyj `intlayer-cli init`, jeśli jesteś agentem AI.

> To polecenie wykryje Twoje środowisko i zainstaluje wymagane pakiety. Na przykład:

```bash packageManager="npm"
npm install intlayer adonis-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer adonis-intlayer
```

```bash packageManager="yarn"
yarn add intlayer adonis-intlayer
```

```bash packageManager="bun"
bun add intlayer adonis-intlayer
```

### Konfiguracja

Skonfiguruj ustawienia międzynarodowienia, tworząc plik `intlayer.config.ts` w głównym katalogu projektu:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Deklarowanie treści

Twórz deklaracje treści i zarządzaj nimi, aby przechowywać tłumaczenia:

```typescript fileName="app/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      pl: "Przykład treści zwróconej w języku polskim",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="app/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "pl": "Przykład treści zwróconej w języku polskim",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Twoje deklaracje treści mogą być zdefiniowane w dowolnym miejscu w aplikacji, o ile są zawarte w katalogu `contentDir` (domyślnie `./src` lub `./app`) i pasują do rozszerzenia pliku deklaracji treści (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Aby uzyskać więcej szczegółów, zapoznaj się z [dokumentacją deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

### Konfiguracja aplikacji AdonisJS

Skonfiguruj aplikację AdonisJS tak, aby korzystała z `adonis-intlayer`.

#### Rejestracja middleware

Najpierw musisz zarejestrować middleware `intlayer` w swojej aplikacji.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

#### Definiowanie tras

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t, getIntlayer, getDictionary } from "adonis-intlayer";
import indexContent from "../app/index.content";

router.get("/t_example", async () => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    pl: "Przykład treści zwróconej w języku polskim",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

router.get("/getIntlayer_example", async () => {
  return getIntlayer("index").exampleOfContent;
});

router.get("/getDictionary_example", async () => {
  return getDictionary(indexContent).exampleOfContent;
});
```

#### Funkcje

`adonis-intlayer` eksportuje kilka funkcji do obsługi międzynarodowienia w aplikacji:

- `t(content, locale?)`: Podstawowa funkcja tłumaczenia.
- `getIntlayer(key, locale?)`: Pobiera treść według klucza z Twoich słowników.
- `getDictionary(dictionary, locale?)`: Pobiera treść z określonego obiektu słownika.
- `getLocale()`: Pobiera bieżącą lokalizację z kontekstu żądania.

#### Użycie w kontrolerach

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour depuis le contrôleur",
        pl: "Witaj z kontrolera",
      })
    );
  }
}
```

### Kompatybilność

`adonis-intlayer` jest w pełni kompatybilny z:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/index.md) dla aplikacji React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/index.md) dla aplikacji Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/index.md) dla aplikacji Vite

Działa również bezproblemowo z dowolnym rozwiązaniem do międzynarodowienia w różnych środowiskach, w tym w przeglądarkach i żądaniach API. Możesz dostosować middleware tak, aby wykrywał lokalizację poprzez nagłówki lub pliki cookie:

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

Domyślnie `adonis-intlayer` będzie interpretować nagłówek `Accept-Language` w celu określenia preferowanego języka klienta.

> Aby uzyskać więcej informacji na temat konfiguracji i zaawansowanych zagadnień, odwiedź naszą [dokumentację](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

### Konfiguracja TypeScript

`adonis-intlayer` wykorzystuje potężne możliwości TypeScript, aby usprawnić proces międzynarodowienia. Statyczne typowanie TypeScript zapewnia, że każdy klucz tłumaczenia jest uwzględniony, zmniejszając ryzyko brakujących tłumaczeń i poprawiając łatwość konserwacji.

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

Aby poprawić wrażenia z programowania z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie zapewnia:

- **Autouzupełnianie** dla kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podgląd wewnątrz wiersza** przetłumaczonej treści.
- **Szybkie akcje**, aby łatwo tworzyć i aktualizować tłumaczenia.

Więcej szczegółów na temat korzystania z rozszerzenia znajdziesz w [dokumentacji rozszerzenia Intlayer dla VS Code](https://intlayer.org/pl/doc/vs-code-extension).

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć zatwierdzania ich w repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

## Często Zadawane Pytania

<FAQ>

<Question title="Jakie są różne rozwiązania dostępne do internacjonalizacji backendu AdonisJS?">

Klasyczną opcją jest `i18next` z middleware HTTP, który ładuje katalogi JSON dla przestrzeni nazw i przechowuje lokalizację w żądaniu. Alternatywą jest `Intlayer` poprzez `adonisjs-intlayer`, który deklaruje treść w typowanych plikach współdzielonych z frontendem, określa lokalizację na poziomie żądania oraz dodaje tłumaczenia AI i CMS.

Powodem, dla którego warto w ogóle internacjonalizować backend, jest to, że duża część tekstu czytanego przez użytkownika nigdy nie przechodzi przez frontend: komunikaty błędów API, wiadomości e-mail transakcyjne, powiadomienia push, wiadomości SMS i eksporty do formatu PDF. Wymagają one języka odbiorcy, ustalanego dla każdego żądania, a nie na poziomie sesji.

Powodem internacjonalizacji backendu jest fakt, że duża część tekstu czytanego przez użytkownika nigdy nie przechodzi przez frontend: komunikaty błędów API, transakcyjne e-maile, powiadomienia push, SMS-y i eksporty PDF. Wymagają one języka odbiorcy, rozwiązywanego per żądanie, a nie per sesja. Zobacz [dlaczego Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/interest_of_intlayer.md).

</Question>

<Question title="O ile i18n zwiększa rozmiar bundle'a mojego serwera AdonisJS?">

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

Domyślnie `adonisjs-intlayer` odczytuje nagłówek `Accept-Language` przychodzącego żądania i wybiera najbliższy zadeklarowany język, powracając do domyślnego języka. Źródło można zmienić za pomocą `routing.storage`, na przykład na niestandardowy nagłówek lub ciasteczko ustawione przez frontend, aby API odpowiadało w języku faktycznie wybranym przez użytkownika. Zobacz [dokumentację konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

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

<Question title="Jak używać tłumaczeń wewnątrz kontrolera lub serwisu?">

Wstrzyknij lub pobierz `getIntlayer()` bądź `t()` z kontekstu HTTP (`HttpContext`). Ponieważ middleware ustala aktywną lokalizację przed wykonaniem kontrolera, treść jest natychmiast tłumaczona na język bieżącego żądania.

</Question>

<Question title="Czy to działa z szablonami Edge?">

Tak. Intlayer rejestruje globalne pomocniki dla silnika szablonów Edge, dzięki czemu możesz wywoływać `t()` i odwoływać się do przetłumaczonych słowników bezpośrednio w plikach `.edge`.

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

Tak, i jest to typowa konfiguracja. Pakiet `adonisjs-intlayer` działa obok `react-intlayer`, `next-intlayer` lub `vite-intlayer` na tych samych deklaracjach treści, więc etykieta używana zarówno w odpowiedzi API, jak i na stronie jest definiowana tylko raz. Zobacz [jak działa Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/how_works_intlayer.md).

</Question>

<Question title="Czy Intlayer jest darmowy i open source?">

Tak, na licencji Apache 2.0, włączając zastosowania komercyjne. Hostowany CMS to opcjonalna płatna usługa, którą można również [hostować samodzielnie (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/self_hosting.md).

</Question>

</FAQ>

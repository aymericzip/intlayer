---
createdAt: 2026-08-23
updatedAt: 2026-08-24
title: "Elysia i18n - Kompletny przewodnik tłumaczenia aplikacji"
description: "Żegnaj i18next. Przewodnik z 2026 roku na temat budowania wielojęzycznej aplikacji Elysia (i18n). Tłumacz za pomocą agentów AI i optymalizuj rozmiar pakietu, SEO i wydajność."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Elysia
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - elysia
applicationTemplate: https://github.com/aymericzip/intlayer-elysia-template
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Dostosowuje przewodnik do szablonu Elysia (typowanie kontekstu, konfiguracja Bun, skrypty)"
  - version: 9.4.0
    date: 2026-08-23
    changes: "init Elysia plugin"
author: aymericzip
---

# Tłumacz swoją stronę backendową Elysia przy użyciu Intlayer | Internationalization (i18n)

`elysia-intlayer` to potężny plugin internacjonalizacji (i18n) dla aplikacji Elysia, zaprojektowany aby uczynić Twoje usługi backendowe dostępnymi globalnie, poprzez dostarczanie zlokalizowanych odpowiedzi na podstawie preferencji klienta.

> Przejrzyj [implementację pakietu na GitHubie](https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer).

### Praktyczne przypadki użycia

- **Wyświetlanie błędów backendu w języku użytkownika**: Gdy występuje błąd, wyświetlanie komunikatów w natywnym języku użytkownika poprawia zrozumienie i zmniejsza frustrację. Jest to szczególnie przydatne dla dynamicznych komunikatów błędów, które mogą być wyświetlane w komponentach front-end, takich jak toasty lub modale.
- **Pobieranie zawartości wielojęzycznej**: W przypadku aplikacji pobierających zawartość z bazy danych, internacjonalizacja zapewnia, że możesz serwować tę zawartość w wielu językach. Jest to kluczowe dla platform takich jak witryny e-commerce lub systemy zarządzania zawartością, które muszą wyświetlać opisy produktów, artykuły i inną zawartość w preferowanym przez użytkownika języku.
- **Wysyłanie wielojęzycznych wiadomości e-mail**: Niezależnie od tego, czy chodzi o wiadomości transakcyjne, kampanie marketingowe czy powiadomienia, wysyłanie wiadomości e-mail w języku odbiorcy może znacznie zwiększyć zaangażowanie i efektywność.
- **Wielojęzyczne powiadomienia push**: W przypadku aplikacji mobilnych wysyłanie powiadomień push w preferowanym przez użytkownika języku może zwiększyć interakcję i retencję. Ten osobisty dotyk może sprawić, że powiadomienia będą się wydawać bardziej trafne i funkcjonalne.
- **Inne komunikacje**: Każda forma komunikacji z backendu, taka jak wiadomości SMS, alerty systemowe lub aktualizacje interfejsu użytkownika, korzysta z tego, że jest w języku użytkownika, zapewniając przejrzystość i poprawiając ogólne doświadczenie użytkownika.

Poprzez internacjonalizację backendu Twoja aplikacja nie tylko szanuje różnice kulturowe, ale także lepiej dostosowuje się do globalnych potrzeb rynku, czyniąc to kluczowym krokiem w skalowaniu Twoich usług na całym świecie.

## Rozpoczęcie pracy

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-elysia-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Zobacz [Application Template](https://github.com/aymericzip/intlayer-elysia-template) na GitHub.

### Instalacja

Aby rozpocząć korzystanie z `elysia-intlayer`, zainstaluj pakiet za pomocą npm:

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
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

> Elysia jest przeznaczony dla runtime **Bun**. `elysia-intlayer` opiera się na `AsyncLocalStorage` (zamiast na bibliotece `cls-hooked` używanej przez pluginy Intlayer oparte na Node) właśnie dlatego, że Bun nie implementuje `async_hooks.createHook`.

### Konfiguracja

Skonfiguruj ustawienia internacjonalizacji, tworząc `intlayer.config.ts` w katalogu głównym projektu:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    /**
     * Domyślny locale używany jako fallback, jeśli żądany locale nie zostanie znaleziony.
     */
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Deklaruj Swoją Treść

Utwórz i zarządzaj deklaracjami treści, aby przechowywać tłumaczenia:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      pl: "Przykład zwróconej treści w języku polskim",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "pl": "Przykład zwróconej treści w języku polskim",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es": "Ejemplo de contenido devuelto en español"
      }
    }
  }
}
```

> Deklaracje treści można definiować w dowolnym miejscu aplikacji, o ile znajdują się w katalogu `contentDir` (domyślnie `./src`) i odpowiadają rozszerzeniu pliku deklaracji treści (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Aby uzyskać więcej informacji, zapoznaj się z [dokumentacją deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

### Konfiguracja aplikacji Elysia

Skonfiguruj swoją aplikację Elysia do użycia `elysia-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia()
  // Załaduj wtyczkę internacjonalizacji
  .use(intlayer())
  // Trasy
  .get("/", ({ intlayer }) => ({
    // Lokalizacja używana dla tego żądania, negocjowana z `Accept-Language` lub odczytana z magazynu
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      pl: "Cześć",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> Plugin rejestruje swój kontekst poprzez **globalny** `derive`, który Elysia typuje jako `Partial<{ intlayer: IntlayerContext }>`. W czasie działania wartość jest zawsze obecna dla tras zarejestrowanych po `.use(intlayer())`, dlatego użyj non-null assertion (`intlayer!.locale`) — lub optional chaining — aby zadowolić TypeScript w trybie `strict`.

Kontekst trasy udostępnia:

| Właściwość        | Opis                                                                                                  |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| `locale`          | Locale używane dla tego żądania, przy czym `locale_storage` ma pierwszeństwo przed `locale_detected`. |
| `locale_storage`  | Locale zażądane jawnie przez klienta poprzez cookie lub header.                                       |
| `locale_detected` | Locale wynegocjowane z nagłówków żądania.                                                             |
| `defaultLocale`   | Locale skonfigurowane jako fallback w `intlayer.config.ts`.                                           |
| `t`               | Funkcja tłumaczenia.                                                                                  |
| `getIntlayer`     | Funkcja pobierająca słowniki po kluczu.                                                               |
| `getDictionary`   | Funkcja przetwarzająca obiekty słowników.                                                             |

Te same helpery są też eksportowane samodzielnie. Rozwiązują bieżące żądanie przez `AsyncLocalStorage`, więc możesz je wywołać bez destrukturyzacji kontekstu:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer, t, getDictionary, getIntlayer } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  .use(intlayer())
  .get("/t_example", () =>
    t({
      pl: "Przykład zwróconej treści w języku polskim",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);
```

> Kontekst żądania jest zwalniany po zmapowaniu odpowiedzi, więc samodzielne helpery nigdy nie rozwiązują się względem już zakończonego żądania. Wywołane poza żądaniem obsługiwanym przez wtyczkę, wracają do skonfigurowanego domyślnego locale.

### Uruchom swoją aplikację

Dodaj skrypty Intlayer do swojego `package.json`. `intlayer build` kompiluje deklaracje treści do katalogu `.intlayer` i generuje typy TypeScript:

```json fileName="package.json"
{
  "scripts": {
    "dev": "intlayer build && bun run --watch src/index.ts",
    "build": "intlayer build",
    "start": "bun run src/index.ts",
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Następnie uruchom serwer:

```bash
bun run dev
```

Przetestuj negocjację locale za pomocą `Accept-Language`:

```bash
curl -H "Accept-Language: fr" http://localhost:3000/
# {"locale":"fr","greeting":"Bonjour","content":"Exemple de contenu renvoyé en français"}

curl -H "Accept-Language: es" http://localhost:3000/
# {"locale":"es","greeting":"Hola","content":"Ejemplo de contenido devuelto en español"}
```

> `intlayer build` nie jest bezwzględnie wymagany przed `bun run src/index.ts`: plugin przygotowuje słowniki również przy starcie aplikacji Elysia. Uruchomienie go wcześniej utrzymuje wygenerowane typy w synchronizacji dla Twojego edytora i eliminuje koszt builda przy pierwszym żądaniu.

### Kompatybilność

`elysia-intlayer` jest w pełni kompatybilny z:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/index.md) dla aplikacji React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/index.md) dla aplikacji Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/index.md) dla aplikacji Vite

Działa również bezproblemowo z dowolnym rozwiązaniem internationalization w różnych środowiskach, w tym w przeglądarkach i żądaniach API.

Domyślnie plugin rozwiązuje locale w następującej kolejności:

1. Cookie `INTLAYER_LOCALE`.
2. Nagłówek `x-intlayer-locale`.
3. Negocjacja nagłówka `Accept-Language`.

Możesz dostosować cookie i nagłówek używane do wykrywania locale:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Pozostałe opcje konfiguracji
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

> Aby uzyskać więcej informacji na temat konfiguracji i zaawansowanych zagadnień, odwiedź naszą [dokumentację](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

### Konfiguracja TypeScript

`elysia-intlayer` wykorzystuje solidne możliwości TypeScript w celu usprawnienia procesu internacjonalizacji. Statyczne typowanie TypeScript zapewnia, że każdy klucz tłumaczenia jest uwzględniony, co zmniejsza ryzyko brakujących tłumaczeń i poprawia łatwość konserwacji.

Upewnij się, że autogenerowane typy (domyślnie w ./types/intlayer.d.ts) są zawarte w pliku tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Twoje istniejące konfiguracje TypeScript
  "include": [
    // ... Twoje istniejące konfiguracje TypeScript
    ".intlayer/**/*.ts", // Dołącz autogenerowane typy
  ],
}
```

### Rozszerzenie VS Code

Aby ulepszyć doświadczenie programistyczne w Intlayer, możesz zainstalować oficjalne **Rozszerzenie Intlayer VS Code**.

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie zapewnia:

- **Autocompletion** dla kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podglądy inline** przetłumaczonej zawartości.
- **Szybkie akcje** do łatwego tworzenia i aktualizacji tłumaczeń.

Aby uzyskać więcej szczegółów na temat korzystania z rozszerzenia, zapoznaj się z [dokumentacją Rozszerzenia Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

### Konfiguracja Git

Zalecane jest ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć zatwierdzania ich w repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

## Często Zadawane Pytania

<FAQ>

<Question title="Jakie są różne rozwiązania dostępne do internacjonalizacji backendu Elysia?">

Klasyczną opcją jest `i18next` z middleware HTTP, który ładuje katalogi JSON dla przestrzeni nazw i przechowuje lokalizację w żądaniu. Alternatywą jest `Intlayer` poprzez `elysia-intlayer`, który deklaruje treść w typowanych plikach współdzielonych z frontendem, określa lokalizację na poziomie żądania oraz dodaje tłumaczenia AI i CMS.

Powodem, dla którego warto w ogóle internacjonalizować backend, jest to, że duża część tekstu czytanego przez użytkownika nigdy nie przechodzi przez frontend: komunikaty błędów API, wiadomości e-mail transakcyjne, powiadomienia push, wiadomości SMS i eksporty do formatu PDF. Wymagają one języka odbiorcy, ustalanego dla każdego żądania, a nie na poziomie sesji.

Powodem internacjonalizacji backendu jest fakt, że duża część tekstu czytanego przez użytkownika nigdy nie przechodzi przez frontend: komunikaty błędów API, transakcyjne e-maile, powiadomienia push, SMS-y i eksporty PDF. Wymagają one języka odbiorcy, rozwiązywanego per żądanie, a nie per sesja. Zobacz [dlaczego Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/interest_of_intlayer.md).

</Question>

<Question title="O ile i18n zwiększa rozmiar bundle'a mojego serwera Elysia?">

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

Domyślnie `elysia-intlayer` odczytuje nagłówek `Accept-Language` przychodzącego żądania i wybiera najbliższy zadeklarowany język, powracając do domyślnego języka. Źródło można zmienić za pomocą `routing.storage`, na przykład na niestandardowy nagłówek lub ciasteczko ustawione przez frontend, aby API odpowiadało w języku faktycznie wybranym przez użytkownika. Zobacz [dokumentację konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

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

<Question title="Czy to działa na Bun i środowiskach brzegowych (edge runtimes)?">

Tak. Pakiet `elysia-intlayer` został zaprojektowany dla Bun i działa we wszystkich środowiskach zgodnych ze standardami sieciowymi. Nie wymaga modułów natywnych dla Node.js ani operacji na dysku w runtime, co zapewnia natychmiastowe uruchamianie na Cloudflare Workers i w kontenerach Bun.

</Question>

<Question title="Czy wtyczka zachowuje wnioskowanie typów end-to-end w Elysia?">

Tak. Metody `t()` i `getIntlayer()` dodane do kontekstu Elysia są w pełni typowane zgodnie z deklaracjami treści, a Eden Treaty przekazuje te typy do klienta frontendowego bez konieczności ręcznego definiowania schematów.

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

Tak, i jest to typowa konfiguracja. Pakiet `elysia-intlayer` działa obok `react-intlayer`, `next-intlayer` lub `vite-intlayer` na tych samych deklaracjach treści, więc etykieta używana zarówno w odpowiedzi API, jak i na stronie jest definiowana tylko raz. Zobacz [jak działa Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/how_works_intlayer.md).

</Question>

<Question title="Czy Intlayer jest darmowy i open source?">

Tak, na licencji Apache 2.0, włączając zastosowania komercyjne. Hostowany CMS to opcjonalna płatna usługa, którą można również [hostować samodzielnie (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/self_hosting.md).

</Question>

</FAQ>

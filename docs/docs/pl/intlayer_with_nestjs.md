---
createdAt: 2025-09-09
updatedAt: 2026-05-31
title: "NestJS i18n - Kompletny przewodnik po tłumaczeniu swojej aplikacji"
description: "Koniec z i18next. Przewodnik 2026 do budowania wielojęzycznej (i18n) aplikacji NestJS. Tłumacz z agentami AI i optymalizuj rozmiar bundle, SEO i wydajność."
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - NestJS
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - nest
applicationTemplate: https://github.com/AydinTheFirst/nestjs-intlayer
author:
  name: AydinTheFirst
  github: AydinTheFirst
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualizacja użycia API useIntlayer w Solid do bezpośredniego dostępu do właściwości"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Dodaj polecenie init"
  - version: 5.8.0
    date: 2025-09-09
    changes: "Dokumentacja początkowa"
---

# Tłumaczenie backendu Nest za pomocą Intlayer | Internacjonalizacja (i18n)

`express-intlayer` to potężne middleware do internacjonalizacji (i18n) dla aplikacji Express, zaprojektowane tak, aby uczynić Twoje usługi backendowe globalnie dostępnymi poprzez dostarczanie spersonalizowanych odpowiedzi w oparciu o preferencje klienta. Ponieważ NestJS jest zbudowany na bazie Express, możesz bezproblemowo zintegrować `express-intlayer` ze swoimi aplikacjami NestJS, aby skutecznie obsługiwać wielojęzyczne treści.

Praktyczne przypadki użycia

- **Wyświetlanie błędów backendu w języku użytkownika**: Gdy wystąpi błąd, wyświetlanie komunikatów w ojczystym języku użytkownika poprawia zrozumienie i zmniejsza frustrację. Jest to szczególnie przydatne dla dynamicznych komunikatów o błędach, które mogą być wyświetlane w komponentach front-end, takich jak toasty czy modale.

- **Pobieranie wielojęzycznych treści**: Dla aplikacji pobierających treści z bazy danych, internacjonalizacja zapewnia możliwość serwowania tych treści w wielu językach. Jest to kluczowe dla platform takich jak sklepy e-commerce czy systemy zarządzania treścią, które muszą wyświetlać opisy produktów, artykuły i inne treści w języku preferowanym przez użytkownika.

- **Wysyłanie wielojęzycznych e-maili**: Niezależnie od tego, czy są to e-maile transakcyjne, kampanie marketingowe czy powiadomienia, wysyłanie wiadomości w języku odbiorcy może znacząco zwiększyć zaangażowanie i skuteczność.

- **Wielojęzyczne powiadomienia push**: W przypadku aplikacji mobilnych, wysyłanie powiadomień push w preferowanym przez użytkownika języku może zwiększyć interakcję i retencję. Ten osobisty akcent sprawia, że powiadomienia wydają się bardziej istotne i angażujące.

- **Inne formy komunikacji**: Każda forma komunikacji z backendu, taka jak wiadomości SMS, alerty systemowe czy aktualizacje interfejsu użytkownika, zyskuje na tym, że jest w języku użytkownika, co zapewnia jasność przekazu i poprawia ogólne doświadczenie użytkownika.

Dzięki internacjonalizacji backendu Twoja aplikacja nie tylko szanuje różnice kulturowe, ale także lepiej dostosowuje się do potrzeb globalnego rynku, co jest kluczowym krokiem w skalowaniu usług na całym świecie.

## Pierwsze kroki

### Utwórz nowy projekt NestJS

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### Instalacja

Aby rozpocząć korzystanie z `express-intlayer`, zainstaluj pakiet za pomocą npm:

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
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

```bash packageManager="bun"
bun add intlayer express-intlayer
```

### Konfiguracja tsconfig.json

Aby używać Intlayer z TypeScript, upewnij się, że twój plik `tsconfig.json` jest skonfigurowany do obsługi modułów ES. Możesz to zrobić, ustawiając opcje `module` oraz `moduleResolution` na `nodenext`.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    module: "nodenext",
    moduleResolution: "nodenext",
    // ... inne opcje
  },
}
```

### Konfiguracja

Skonfiguruj ustawienia internacjonalizacji, tworząc plik `intlayer.config.ts` w katalogu głównym projektu:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Zadeklaruj swoją zawartość

Twórz i zarządzaj deklaracjami zawartości, aby przechowywać tłumaczenia:

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  content: {
    greet: t({
      en: "Hello World!",
      fr: "Bonjour le monde !",
      es: "¡Hola Mundo!",
    }),
  },
};

export default appContent;
```

> Twoje deklaracje zawartości mogą być definiowane w dowolnym miejscu w aplikacji, pod warunkiem, że znajdują się w katalogu `contentDir` (domyślnie `./src`). I mają rozszerzenie pliku deklaracji zawartości (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Aby uzyskać więcej szczegółów, zapoznaj się z [dokumentacją deklaracji zawartości](/doc/concept/content).

### Konfiguracja middleware Express

Zintegruj middleware `express-intlayer` ze swoją aplikacją NestJS, aby obsługiwać internacjonalizację:

```typescript fileName="src/app.module.ts" codeFormat="typescript"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { intlayer } from "express-intlayer";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(intlayer()).forRoutes("*"); // Zastosuj do wszystkich tras
  }
}
```

### Używanie tłumaczeń w usługach lub kontrolerach

Możesz teraz użyć funkcji `getIntlayer`, aby uzyskać dostęp do tłumaczeń w swoich usługach lub kontrolerach:

```typescript fileName="src/app.service.ts" codeFormat="typescript"
import { Injectable } from "@nestjs/common";
import { getIntlayer } from "express-intlayer";

@Injectable()
export class AppService {
  getHello(): string {
    return getIntlayer("app").greet; // pobierz tłumaczenie "greet" z przestrzeni "app"
  }
}
```

### Kompatybilność

`express-intlayer` jest w pełni kompatybilny z:

- [`react-intlayer`](/doc/packages/react-intlayer) dla aplikacji React
- [`next-intlayer`](/doc/packages/next-intlayer) dla aplikacji Next.js
- [`vite-intlayer`](/doc/packages/vite-intlayer) dla aplikacji Vite

Działa również bezproblemowo z dowolnym rozwiązaniem do internacjonalizacji w różnych środowiskach, w tym w przeglądarkach i zapytaniach API. Możesz dostosować middleware, aby wykrywać lokalizację za pomocą nagłówków lub ciasteczek:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Inne opcje konfiguracji
  middleware: {
    headerName: "my-locale-header", // nazwa nagłówka do wykrywania lokalizacji
    cookieName: "my-locale-cookie", // nazwa ciasteczka do wykrywania lokalizacji
  },
};

export default config;
```

Domyślnie `express-intlayer` interpretuje nagłówek `Accept-Language`, aby określić preferowany język klienta.

> Aby uzyskać więcej informacji na temat konfiguracji i zaawansowanych zagadnień, odwiedź naszą [dokumentację](/doc/concept/configuration).

### Konfiguracja TypeScript

`express-intlayer` wykorzystuje solidne możliwości TypeScript, aby usprawnić proces internacjonalizacji. Statyczne typowanie w TypeScript zapewnia, że każdy klucz tłumaczenia jest uwzględniony, co zmniejsza ryzyko brakujących tłumaczeń i poprawia utrzymanie kodu.

![Autouzupełnianie](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Błąd tłumaczenia](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Upewnij się, że autogenerowane typy (domyślnie w ./types/intlayer.d.ts) są uwzględnione w pliku tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Twoje istniejące konfiguracje TypeScript
  include: [
    // ... Twoje istniejące konfiguracje TypeScript
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### Rozszerzenie VS Code

Aby poprawić doświadczenie programistyczne z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie oferuje:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podglądy w linii** przetłumaczonej zawartości.
- **Szybkie akcje** umożliwiające łatwe tworzenie i aktualizowanie tłumaczeń.

Aby uzyskać więcej informacji o korzystaniu z rozszerzenia, zapoznaj się z [dokumentacją rozszerzenia Intlayer dla VS Code](https://intlayer.org/doc/vs-code-extension).

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć ich zatwierdzania do repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

## Często Zadawane Pytania

<FAQ>

<Question title="Jakie są różne rozwiązania dostępne do internacjonalizacji backendu NestJS?">

Klasyczną opcją jest `i18next` z middleware HTTP, który ładuje katalogi JSON dla przestrzeni nazw i przechowuje lokalizację w żądaniu. Alternatywą jest `Intlayer` poprzez `nestjs-intlayer`, który deklaruje treść w typowanych plikach współdzielonych z frontendem, określa lokalizację na poziomie żądania oraz dodaje tłumaczenia AI i CMS.

Powodem internacjonalizacji backendu jest fakt, że duża część tekstu czytanego przez użytkownika nigdy nie przechodzi przez frontend: komunikaty błędów API, transakcyjne e-maile, powiadomienia push, SMS-y i eksporty PDF. Wymagają one języka odbiorcy, rozwiązywanego per żądanie, a nie per sesja. Zobacz [dlaczego Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/interest_of_intlayer.md).

</Question>

<Question title="O ile i18n zwiększa rozmiar bundle'a mojego serwera NestJS?">

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

Warto pamiętać o dwóch ograniczeniach przed włączeniem kompilatora. Działa on w oparciu o analizę statyczną, więc ciągi tekstowe istniejące tylko w czasie wykonywania, takie jak kody błędów API czy pola z CMS, pozostają poza jego zasięgiem. Musi on także odróżnić tekst dla użytkownika od logiki aplikacji, takiej jak `className="active"` czy kod stanu, co w dużej bazie kodu wymaga kilku adnotacji. Polecenie [extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md) unika obu tych problemów, pozostawiając Ci pełną kontrolę.

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

Domyślnie `nestjs-intlayer` odczytuje nagłówek `Accept-Language` przychodzącego żądania i wybiera najbliższy zadeklarowany język, powracając do domyślnego języka. Źródło można zmienić za pomocą `routing.storage`, na przykład na niestandardowy nagłówek lub ciasteczko ustawione przez frontend, aby API odpowiadało w języku faktycznie wybranym przez użytkownika. Zobacz [dokumentację konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

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

<Question title="Czy to działa z istniejącą aplikacją NestJS i innymi middleware?">

Tak. `nestjs-intlayer` to standardowy middleware dla NestJS, więc doskonale współpracuje z istniejącym stosem. Zarejestruj go przed trasami, które odczytują treść, aby język był określony w momencie wywołania `t()` lub `getIntlayer()`.

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

Tak, i jest to typowa konfiguracja. Pakiet `nestjs-intlayer` działa obok `react-intlayer`, `next-intlayer` lub `vite-intlayer` na tych samych deklaracjach treści, więc etykieta używana zarówno w odpowiedzi API, jak i na stronie jest definiowana tylko raz. Zobacz [jak działa Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/how_works_intlayer.md).

</Question>

<Question title="Czy Intlayer jest darmowy i open source?">

Tak, na licencji Apache 2.0, włączając zastosowania komercyjne. Hostowany CMS to opcjonalna płatna usługa, którą można również [hostować samodzielnie (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/self_hosting.md).

</Question>

</FAQ>

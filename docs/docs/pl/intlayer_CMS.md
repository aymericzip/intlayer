---
createdAt: 2025-08-23
updatedAt: 2026-07-08
title: Intlayer CMS | Zewnętrzne zarządzanie treścią w Intlayer CMS
description: Zewnętrzne zarządzanie treścią w Intlayer CMS, aby delegować zarządzanie treścią do Twojego zespołu.
keywords:
  - CMS
  - Edytor Wizualny
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cms
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Przeniesiono sekcję „Synchronizacja na żywo” na osobną stronę (live-sync.md), pozostawiając tu krótkie wprowadzenie i link"
  - version: 9.0.0
    date: 2026-06-30
    changes: "Dodano sekcję samodzielnego hostowania"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Dodano dokumentację synchronizacji na żywo"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Zastąpiono pole `hotReload` polem `liveSync`"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inicjalizacja historii"
author: aymericzip
---

# Dokumentacja Systemu Zarządzania Treścią Intlayer (CMS)

<iframe title="Edytor wizualny + CMS dla Twojej aplikacji internetowej: Intlayer wyjaśniony" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer CMS to aplikacja, która pozwala na zewnętrzne zarządzanie treścią projektu Intlayer.

W tym celu Intlayer wprowadza koncepcję „zdalnych słowników”.

![Interfejs Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Spis treści

<TOC/>

---

## Zrozumienie zdalnych słowników

Intlayer rozróżnia „lokalne” i „zdalne” słowniki.

- „Lokalny” słownik to słownik zadeklarowany w Twoim projekcie Intlayer. Na przykład plik deklaracji przycisku lub pasek nawigacyjny. Zewnętrzne zarządzanie taką treścią nie ma sensu, ponieważ ta zawartość nie powinna się często zmieniać.

- „Zdalny” słownik to słownik zarządzany za pomocą Intlayer CMS. Może być przydatny, aby umożliwić Twojemu zespołowi bezpośrednie zarządzanie treścią na Twojej stronie internetowej, a także ma na celu wykorzystanie funkcji testów A/B oraz automatycznej optymalizacji SEO.

## Edytor wizualny a CMS

[Edytor Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) to narzędzie, które pozwala zarządzać treścią w edytorze wizualnym dla lokalnych słowników. Po wprowadzeniu zmiany, zawartość zostanie zastąpiona w bazie kodu. Oznacza to, że aplikacja zostanie przebudowana, a strona przeładowana, aby wyświetlić nową treść.

W przeciwieństwie do tego, Intlayer CMS to narzędzie, które pozwala zarządzać treścią w edytorze wizualnym dla zdalnych słowników. Po wprowadzeniu zmiany, zawartość **nie** wpłynie na bazę kodu. Strona internetowa automatycznie wyświetli zmienioną treść.

## Integracja

Aby uzyskać więcej szczegółów na temat instalacji pakietu, zobacz odpowiednią sekcję poniżej:

### Integracja z Next.js

Aby zintegrować z Next.js, zapoznaj się z [przewodnikiem instalacji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_15.md).

### Integracja z Create React App

Aby zintegrować z Create React App, zapoznaj się z [przewodnikiem instalacji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_create_react_app.md).

### Integracja z Vite + React

Aby zintegrować z Vite + React, zapoznaj się z [przewodnikiem instalacji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+react.md).

## Konfiguracja

Uruchom następujące polecenie, aby zalogować się do Intlayer CMS:

```bash packageManager="npm"
npx intlayer login
```

```bash packageManager="yarn"
yarn intlayer login
```

```bash packageManager="pnpm"
pnpm intlayer login
```

```bash packageManager="bun"
bun x intlayer login
```

Spowoduje to otwarcie domyślnej przeglądarki w celu ukończenia procesu uwierzytelniania i otrzymania niezbędnych poświadczeń (Client ID i Client Secret) do korzystania z usług Intlayer.

W pliku konfiguracyjnym Intlayer możesz dostosować ustawienia CMS:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... inne ustawienia konfiguracyjne
  editor: {
    /**
     * Wymagane
     *
     * URL aplikacji.
     * To jest URL, na który wskazuje edytor wizualny.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Wymagane
     *
     * Client ID oraz client secret są wymagane do włączenia edytora.
     * Pozwalają one zidentyfikować użytkownika, który edytuje zawartość.
     * Można je uzyskać tworząc nowego klienta w Intlayer Dashboard - Projects (https://app.intlayer.org/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Opcjonalne
     *
     * W przypadku, gdy hostujesz Intlayer CMS samodzielnie, możesz ustawić URL CMS.
     *
     * URL Intlayer CMS.
     * Domyślnie ustawiony jest na https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Opcjonalne
     *
     * W przypadku, gdy hostujesz Intlayer CMS samodzielnie, możesz ustawić URL backendu.
     *
     * URL backendu Intlayer CMS.
     * Domyślnie ustawiony jest na https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

export default config;
```

> Jeśli nie masz client ID i client secret, możesz je uzyskać, tworząc nowego klienta w [Intlayer Dashboard - Projects](https://app.intlayer.org/projects).

> Aby zobaczyć wszystkie dostępne parametry, zapoznaj się z [dokumentacją konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

## Korzystanie z CMS

### Wypchnij swoją konfigurację

Aby skonfigurować Intlayer CMS, możesz użyć poleceń [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/pl/cli/index.md).

```bash packageManager="npm"
npx intlayer config push
```

```bash packageManager="yarn"
yarn intlayer config push
```

```bash packageManager="pnpm"
pnpm intlayer config push
```

```bash packageManager="bun"
bun x intlayer config push
```

> Jeśli używasz zmiennych środowiskowych w pliku konfiguracyjnym `intlayer.config.ts`, możesz określić żądane środowisko za pomocą argumentu `--env`:

```bash packageManager="npm"
npx intlayer config push --env production
```

```bash packageManager="yarn"
yarn intlayer config push --env production
```

```bash packageManager="pnpm"
pnpm intlayer config push --env production
```

```bash packageManager="bun"
bun x intlayer config push --env production
```

To polecenie przesyła Twoją konfigurację do Intlayer CMS.

### Wypchnij słownik

Aby przekształcić swoje słowniki lokalizacyjne w zdalny słownik, możesz użyć poleceń [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/pl/cli/index.md).

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key
```

> Jeśli używasz zmiennych środowiskowych w pliku konfiguracyjnym `intlayer.config.ts`, możesz określić żądane środowisko za pomocą argumentu `--env`:

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key --env production
```

To polecenie przesyła Twoje początkowe słowniki treści, udostępniając je do asynchronicznego pobierania i edycji za pośrednictwem platformy Intlayer.

### Edytuj słownik

Następnie będziesz mógł zobaczyć i zarządzać swoim słownikiem w [Intlayer CMS](https://app.intlayer.org/content).

## Programmatyczny dostęp za pomocą SDK `@intlayer/api`

Oprócz CLI i edytora wizualnego, Intlayer dostarcza typizowany SDK w pakiecie [`@intlayer/api`](https://www.npmjs.com/package/@intlayer/api). Umożliwia traktowanie CMS jako **headless'owej bazy zawartości**: możesz pobierać projekty, pobierać słowniki oraz wypychać lub aktualizować je bezpośrednio z własnej aplikacji, skryptów lub pipeline'u CI.

SDK obsługuje uwierzytelnianie za Ciebie. Dopóki Twoje `clientId` i `clientSecret` są dostępne (w konfiguracji Intlayer lub zmiennych środowiskowych), automatycznie uzyskuje i odświeża token dostępu OAuth2 oraz podpisuje każde żądanie.

### Instalacja

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="bun"
bun add @intlayer/api
```

### Jak to działa: authenticator + endpoints

SDK jest podzielony na **dwa odrębne importy** celowo, aby utrzymać rozmiar bundla na małym poziomie:

1. `createIntlayerCMS` — tworzy lekki **authenticator**. Zawiera tylko poświadczenia i zarządzany token dostępu; nic nie wie o żadnej konkretnej domenie.
2. `dictionaryEndpoint`, `projectEndpoint`, … — bindery **endpoint'ów** dla poszczególnych domen, każdy importowany z własnej ścieżki (`@intlayer/api/dictionary`, `@intlayer/api/project`, …). Przekazujesz authenticator do potrzebnego Ci endpoint'u.

Ponieważ każdy endpoint jest importowany oddzielnie, Twój bundle zawiera tylko domeny, których faktycznie używasz — importowanie `dictionaryEndpoint` nigdy nie ściąga projektu, AI lub żadnego innego klienta domeny.

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

// Konfiguracja jest opcjonalna: gdy jest pominięta, poświadczenia są odczytywane z
// `@intlayer/config/built`, które rozwiązuje zmienne środowiskowe INTLAYER_CLIENT_ID i
// INTLAYER_CLIENT_SECRET.
export const cmsAuthenticator = createIntlayerCMS();
```

> [!WARNING]
> Poświadczenia CMS (`clientId` / `clientSecret`) przyznają **dostęp do zapisu** do Twojej zawartości. Zawsze twórz authenticator wyłącznie po **stronie serwera** (server actions, route handlers, skrypty, CI). Nigdy nie importuj go do kodu po stronie klienta ani nie ujawniaj swoich poświadczeń przeglądarce.

Jeśli wolisz nie polegać na konfiguracji w czasie budowania, przekaż poświadczenia jawnie:

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

export const cmsAuthenticator = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    // Opcjonalnie, dla backendów self-hosted:
    // backendURL: process.env.INTLAYER_BACKEND_URL,
  },
});
```

> Pobierz swoje poświadczenia, tworząc nowy klucz dostępu w [Panelu Intlayer - Projekty](https://app.intlayer.org/projects).

### Pobierz projekty

```typescript fileName="projects.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { projectEndpoint } from "@intlayer/api/project";

const cmsAuthenticator = createIntlayerCMS();

// Wylistuj projekty dostępne z twoimi danymi uwierzytelniającymi
const { data: projects } =
  await projectEndpoint(cmsAuthenticator).getProjects();

// Przeczytaj zagregowane spostrzeżenia lokalizacyjne wybranego projektu
const { data: insights } =
  await projectEndpoint(cmsAuthenticator).getProjectInsights();
```

### Pobieranie słowników

```typescript fileName="read-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// Wyświetl listę wszystkich zdalnych słowników projektu
const { data: dictionaries } =
  await dictionaryEndpoint(cmsAuthenticator).getDictionaries();

// Lub pobierz pojedynczy słownik według klucza
const { data: dictionary } = await dictionaryEndpoint(
  cmsAuthenticator
).getDictionary("my-first-dictionary-key");
```

### Wysyłanie i aktualizowanie słowników

Użyj CMS jako bazy danych do zapisywania zawartości:

```typescript fileName="write-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// Utwórz nowy słownik
await dictionaryEndpoint(cmsAuthenticator).addDictionary({
  key: "my-first-dictionary-key",
  content: { title: "Hello world" },
});

// Upsert partii słowników (utwórz lub zaktualizuj je w jednym wywołaniu)
await dictionaryEndpoint(cmsAuthenticator).pushDictionaries([
  { key: "home", content: { title: "Home" } },
  { key: "about", content: { title: "About" } },
]);

// Zaktualizuj istniejący słownik
await dictionaryEndpoint(cmsAuthenticator).updateDictionary({
  id: "<dictionary-id>",
  key: "home",
  content: { title: "Updated title" },
});
```

> Wskazówka: ponownie użyj powiązanego punktu końcowego, aby uniknąć powtórzeń:
>
> ```typescript codeFormat="typescript"
> const dictionary = dictionaryEndpoint(cmsAuthenticator);
> await dictionary.pushDictionaries([myDictionary]);
> const { data } = await dictionary.getDictionaries();
> ```

### Wyodrębnianie pojedynczej metody

Każda metoda endpointu jest już uwierzytelniona i niezależna (obsługuje własne zarządzanie tokenami), więc możesz wyodrębnić jedną i przekazywać ją — na przykład aby wstrzyknąć ją jako zależność:

```typescript fileName="push.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const dictionary = dictionaryEndpoint(createIntlayerCMS());

// Już uwierzytelnione — automatycznie odświeża token przy każdym wywołaniu
export const pushDictionaries = dictionary.pushDictionaries;

// Użycie
await pushDictionaries([{ key: "home", content: { title: "Home" } }]);
```

## Synchronizacja na żywo

Synchronizacja na żywo pozwala Twojej aplikacji odzwierciedlać zmiany treści CMS w czasie rzeczywistym. Nie jest wymagane ponowne budowanie ani wdrażanie. Po włączeniu aktualizacje są przesyłane do serwera synchronizacji na żywo, który odświeża słowniki odczytywane przez Twoją aplikację.

Pełny przewodnik po konfiguracji (włączanie, uruchamianie serwera Live Sync, lokalny przepływ pracy programistycznej i ograniczenia) znajdziesz w [dokumentacji Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/live-sync.md).

## Samodzielne hostowanie (Self-Hosting)

Intlayer może działać w całości na Twojej własnej infrastrukturze. Jedna komenda uruchamia pełny stos (panel, API, bazę danych, magazyn obiektów i pocztę e-mail) za pomocą Docker Compose:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Pełny przewodnik konfiguracji, dokumentację zmiennych środowiskowych, instrukcje aktualizacji oraz procedury tworzenia kopii zapasowych i przywracania znajdziesz w [Przewodniku po samodzielnym hostowaniu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/self_hosting.md).

---

## Debug

Jeśli napotkasz jakiekolwiek problemy z CMS, sprawdź następujące kwestie:

- Aplikacja jest uruchomiona.

- Konfiguracja [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) jest poprawnie ustawiona w pliku konfiguracyjnym Intlayer.
  - Wymagane pola:
    - URL aplikacji powinien odpowiadać temu, który ustawiłeś w konfiguracji edytora (`applicationURL`).
    - URL CMS

- Upewnij się, że konfiguracja projektu została przesłana do Intlayer CMS.

- Edytor wizualny używa iframe do wyświetlania Twojej strony internetowej. Upewnij się, że Polityka Bezpieczeństwa Treści (CSP) Twojej strony pozwala na URL CMS jako `frame-ancestors` (domyślnie 'https://intlayer.org'). Sprawdź konsolę edytora pod kątem błędów.

## Często Zadawane Pytania

<FAQ>

<Question title="Jaka jest różnica między Intlayer CMS a edytorem wizualnym?">

[Edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) edytuje lokalne pliki słowników w Twojej bazie kodu. CMS zarządza treścią zdalnie na serwerze, umożliwiając zmianę tekstów bez konieczności ponownego wdrażania aplikacji.

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

<Question title="Które treści powinny trafić do CMS?">

Treści, które często się zmieniają i nie są ściśle powiązane z cyklem wydań kodu: teksty na landing page'ach, cenniki, ogłoszenia, banery promocyjne oraz artykuły blogowe.

</Question>

<Question title="Co się stanie, jeśli CMS będzie nieosiągalny?">

Aplikacja automatycznie powraca do lokalnej deklaracji słownika w bazie kodu, dzięki czemu awaria sieci lub serwera CMS nie powoduje wyświetlenia pustej strony użytkownikowi.

</Question>

<Question title="Czy mogę hostować CMS samodzielnie?">

Tak. CMS może działać na Twojej własnej infrastrukturze, co jest idealnym rozwiązaniem, gdy dane nie mogą opuszczać Twojej sieci. Zobacz [przewodnik po self-hostingu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/self_hosting.md).

</Question>

<Question title="Czy edytorzy treści potrzebują programisty do publikacji zmian?">

Nie. Taki jest cel zdalnych słowników: edytor zmienia tekst w CMS, a witryna natychmiast odzwierciedla zmiany za pośrednictwem mechanizmu synchronizacji na żywo (live sync).

</Question>

<Question title="Czy mogę zautomatyzować CMS zamiast korzystać z interfejsu?">

Tak. Pakiet `@intlayer/api` SDK udostępnia te same punkty końcowe co interfejs, umożliwiając pobieranie projektów, odczytywanie słowników i automatyzację publikacji z poziomu skryptów.

</Question>

<Question title="Czy CMS obsługuje testy A/B tłumaczeń?">

Tak. Zdalne słowniki obsługują [warianty treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/index.md), co pozwala na testowanie różnych wersji tekstów dla różnych grup odbiorców.

</Question>

<Question title="Czy CMS jest darmowy?">

Biblioteka Intlayer, CLI, kompilator i edytor wizualny są bezpłatne i open source na licencji Apache 2.0. Hostowany CMS to płatna usługa chmurowa, ale wersję CMS można również uruchomić na własnym serwerze bez opłat.

</Question>

</FAQ>

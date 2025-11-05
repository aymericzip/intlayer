---
createdAt: 2025-08-23
updatedAt: 2025-08-23
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
  - version: 6.0.1
    date: 2025-09-22
    changes: Dodano dokumentację synchronizacji na żywo
  - version: 6.0.0
    date: 2025-09-04
    changes: Zastąpiono pole `hotReload` polem `liveSync`
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Dokumentacja Systemu Zarządzania Treścią Intlayer (CMS)

<iframe title="Edytor wizualny + CMS dla Twojej aplikacji internetowej: Intlayer wyjaśniony" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

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

W pliku konfiguracyjnym Intlayer możesz dostosować ustawienia CMS:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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
     * Można je uzyskać tworząc nowego klienta w Intlayer Dashboard - Projects (https://intlayer.org/dashboard/projects).
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... inne ustawienia konfiguracyjne
  editor: {
    /**
     * Wymagane
     *
     * URL aplikacji.
     * To jest URL, na który kierowany jest wizualny edytor.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Wymagane
     *
     * Client ID oraz client secret są wymagane do włączenia edytora.
     * Pozwalają one na identyfikację użytkownika edytującego zawartość.
     * Można je uzyskać tworząc nowego klienta w Intlayer Dashboard - Projects (https://intlayer.org/dashboard/projects).
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
     * Domyślnie ustawiony na https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Opcjonalne
     *
     * W przypadku samodzielnego hostowania Intlayer CMS, możesz ustawić URL backendu.
     *
     * URL backendu Intlayer CMS.
     * Domyślnie ustawiony na https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... inne ustawienia konfiguracyjne
  editor: {
    /**
     * Wymagane
     *
     * URL aplikacji.
     * To jest URL, na który kierowany jest wizualny edytor.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Wymagane
     *
     * Client ID oraz client secret są wymagane do włączenia edytora.
     * Pozwalają one na identyfikację użytkownika, który edytuje zawartość.
     * Można je uzyskać, tworząc nowego klienta w Intlayer Dashboard - Projects (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Opcjonalne
     *
     * W przypadku samodzielnego hostowania Intlayer CMS, możesz ustawić URL CMS.
     *
     * URL Intlayer CMS.
     * Domyślnie ustawiony na https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Opcjonalne
     *
     * W przypadku samodzielnego hostowania Intlayer CMS, możesz ustawić URL backendu.
     *
     * URL backendu Intlayer CMS.
     * Domyślnie ustawiony na https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> Jeśli nie masz client ID i client secret, możesz je uzyskać, tworząc nowego klienta w [Intlayer Dashboard - Projects](https://intlayer.org/dashboard/projects).

> Aby zobaczyć wszystkie dostępne parametry, zapoznaj się z [dokumentacją konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

## Korzystanie z CMS

### Wypchnij swoją konfigurację

Aby skonfigurować Intlayer CMS, możesz użyć poleceń [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/pl/intlayer_cli.md).

```bash
npx intlayer config push
```

> Jeśli używasz zmiennych środowiskowych w pliku konfiguracyjnym `intlayer.config.ts`, możesz określić żądane środowisko za pomocą argumentu `--env`:

```bash
npx intlayer config push --env production
```

To polecenie przesyła Twoją konfigurację do Intlayer CMS.

### Wypchnij słownik

Aby przekształcić swoje słowniki lokalizacyjne w zdalny słownik, możesz użyć poleceń [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/pl/intlayer_cli.md).

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> Jeśli używasz zmiennych środowiskowych w pliku konfiguracyjnym `intlayer.config.ts`, możesz określić żądane środowisko za pomocą argumentu `--env`:

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

To polecenie przesyła Twoje początkowe słowniki treści, udostępniając je do asynchronicznego pobierania i edycji za pośrednictwem platformy Intlayer.

### Edytuj słownik

Następnie będziesz mógł zobaczyć i zarządzać swoim słownikiem w [Intlayer CMS](https://intlayer.org/dashboard/content).

## Synchronizacja na żywo

Synchronizacja na żywo pozwala Twojej aplikacji odzwierciedlać zmiany treści CMS w czasie rzeczywistym. Nie jest wymagane ponowne budowanie ani wdrażanie. Po włączeniu aktualizacje są przesyłane do serwera synchronizacji na żywo, który odświeża słowniki odczytywane przez Twoją aplikację.

Włącz synchronizację na żywo, aktualizując konfigurację Intlayer:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... inne ustawienia konfiguracyjne
  editor: {
    /**
     * Włącza hot reloading konfiguracji lokalizacji, gdy wykryte zostaną zmiany.
     * Na przykład, gdy słownik zostanie dodany lub zaktualizowany, aplikacja aktualizuje
     * wyświetlaną na stronie zawartość.
     *
     * Ponieważ hot reloading wymaga ciągłego połączenia z serwerem,
     * jest dostępny tylko dla klientów planu `enterprise`.
     *
     * Domyślnie: false
     */
    liveSync: true,
  },
  build: {
    /**
     * Kontroluje sposób importowania słowników:
     *
     * - "live": Słowniki są pobierane dynamicznie za pomocą API Live Sync.
     *   Zastępuje useIntlayer funkcją useDictionaryDynamic.
     *
     * Uwaga: Tryb live korzysta z API Live Sync do pobierania słowników. Jeśli wywołanie API
     * zakończy się niepowodzeniem, słowniki są importowane dynamicznie.
     * Uwaga: Tryb live jest używany tylko dla słowników zdalnych i oznaczonych flagą "live".
     * Pozostałe używają trybu dynamicznego dla wydajności.
     */
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... inne ustawienia konfiguracyjne
  editor: {
    /**
     * Włącza hot reloading konfiguracji lokalizacji, gdy wykryte zostaną zmiany.
     * Na przykład, gdy słownik zostanie dodany lub zaktualizowany, aplikacja aktualizuje
     * zawartość wyświetlaną na stronie.
     *
     * Ponieważ hot reloading wymaga ciągłego połączenia z serwerem, jest on
     * dostępny tylko dla klientów planu `enterprise`.
     *
     * Domyślnie: false
     */
    liveSync: true,
  },
  build: {
    /**
     * Kontroluje sposób importowania słowników:
     *
     * - "live": Słowniki są pobierane dynamicznie za pomocą API Live Sync.
     *   Zastępuje useIntlayer funkcją useDictionaryDynamic.
     *
     * Uwaga: Tryb live korzysta z API Live Sync do pobierania słowników. Jeśli wywołanie API
     * zakończy się niepowodzeniem, słowniki są importowane dynamicznie.
     * Uwaga: Tryb live jest używany tylko dla słowników zdalnych i oznaczonych flagą "live".
     * Inne używają trybu dynamicznego dla wydajności.
     */
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... inne ustawienia konfiguracyjne
  editor: {
    /**
     * Włącza hot reloading konfiguracji lokalizacji, gdy wykryte zostaną zmiany.
     * Na przykład, gdy słownik zostanie dodany lub zaktualizowany, aplikacja aktualizuje
     * zawartość wyświetlaną na stronie.
     *
     * Ponieważ hot reloading wymaga ciągłego połączenia z serwerem, jest on
     * dostępny tylko dla klientów planu `enterprise`.
     *
     * Domyślnie: false
     */
    liveSync: true,

    /**
     * Port serwera Live Sync.
     *
     * Domyślnie: 4000
     */
    liveSyncPort: 4000,

    /**
     * URL serwera Live Sync.
     *
     * Domyślnie: http://localhost:{liveSyncPort}
     */
    liveSyncURL: "https://live.example.com",
  },
  build: {
    /**
     * Kontroluje sposób importowania słowników:
     *
     * - "live": Słowniki są pobierane dynamicznie za pomocą API Live Sync.
     *   Zastępuje useIntlayer funkcją useDictionaryDynamic.
     *
     * Uwaga: Tryb live korzysta z API Live Sync do pobierania słowników. Jeśli wywołanie API
     * się nie powiedzie, słowniki są importowane dynamicznie.
     * Uwaga: Tryb live jest używany tylko dla słowników zdalnych i oznaczonych flagą "live".
     * Pozostałe używają trybu dynamicznego dla wydajności.
     */
    importMode: "live",
  },
};

module.exports = config;
```

Uruchom serwer Live Sync, aby otoczyć swoją aplikację:

Przykład użycia samodzielnego serwera:

```json5 fileName="package.json"
{
  "scripts": {
    // ... inne skrypty
    "live:start": "npx intlayer live",
  },
}
```

Możesz również używać swojego serwera aplikacji równolegle, korzystając z argumentu `--process`.

Przykład użycia Next.js:

```json5 fileName="package.json"
{
  "scripts": {
    // ... inne skrypty
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --process 'next start'",
  },
}
```

Przykład użycia Vite:

```json5 fileName="package.json"
{
  "scripts": {
    // ... inne skrypty
    "build": "vite build",
    "dev": "vite dev",
    "start": "npx intlayer live --process 'vite start'",
  },
}
```

Serwer Live Sync otacza Twoją aplikację i automatycznie stosuje zaktualizowaną zawartość w momencie jej pojawienia się.

Aby otrzymywać powiadomienia o zmianach z CMS, serwer Live Sync utrzymuje połączenie SSE z backendem. Gdy zawartość w CMS ulega zmianie, backend przekazuje aktualizację do serwera Live Sync, który zapisuje nowe słowniki. Twoja aplikacja odzwierciedli aktualizację przy następnej nawigacji lub przeładowaniu przeglądarki — nie jest wymagane ponowne budowanie.

Schemat przepływu (CMS/Backend -> Serwer Live Sync -> Serwer aplikacji -> Frontend):

![Schemat przepływu Live Sync CMS/Backend/Serwer Live Sync/Serwer aplikacji/Frontend](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

Jak to działa:

![Schemat logiki Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

### Przebieg pracy podczas developmentu (lokalnie)

- Podczas developmentu wszystkie zdalne słowniki są pobierane przy starcie aplikacji, dzięki czemu możesz szybko testować aktualizacje.
- Aby przetestować Live Sync lokalnie z Next.js, opakuj swój serwer deweloperski:

```json5 fileName="package.json"
{
  "scripts": {
    // ... inne skrypty
    "dev": "npx intlayer live --process 'next dev'",
    // "dev": "npx intlayer live --process 'vite dev'", // Dla Vite
  },
}
```

Włącz optymalizację, aby Intlayer stosował transformacje importu Live podczas developmentu:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true, // domyślnie: process.env.NODE_ENV === 'production'
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true, // domyślnie: process.env.NODE_ENV === 'production'
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true, // domyślnie: process.env.NODE_ENV === 'production'
    importMode: "live",
  },
};

module.exports = config;
```

To ustawienie owija Twój serwer deweloperski serwerem Live Sync, pobiera zdalne słowniki podczas uruchamiania i przesyła aktualizacje z CMS za pomocą SSE. Odśwież stronę, aby zobaczyć zmiany.

Uwagi i ograniczenia:

- Dodaj pochodzenie live sync do polityki bezpieczeństwa swojej strony (CSP). Upewnij się, że adres URL live sync jest dozwolony w `connect-src` (oraz `frame-ancestors`, jeśli ma to zastosowanie).
- Live Sync nie działa ze statycznym outputem. W Next.js strona musi być dynamiczna, aby otrzymywać aktualizacje w czasie wykonywania (np. użyj `generateStaticParams`, `generateMetadata`, `getServerSideProps` lub `getStaticProps` odpowiednio, aby uniknąć pełnych ograniczeń statycznych).
- W CMS każdy słownik ma flagę `live`. Tylko słowniki z `live=true` są pobierane przez API live sync; pozostałe są importowane dynamicznie i pozostają niezmienione w czasie wykonywania.
- Flaga `live` jest oceniana dla każdego słownika podczas budowania. Jeśli zdalna zawartość nie była oznaczona jako `live=true` podczas budowania, musisz przebudować projekt, aby włączyć Live Sync dla tego słownika.
- Serwer live sync musi mieć możliwość zapisu do `.intlayer`. W kontenerach upewnij się, że masz dostęp do zapisu do `/.intlayer`.

## Debug

Jeśli napotkasz jakiekolwiek problemy z CMS, sprawdź następujące kwestie:

- Aplikacja jest uruchomiona.

- Konfiguracja [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) jest poprawnie ustawiona w pliku konfiguracyjnym Intlayer.
  - Wymagane pola:
    - URL aplikacji powinien odpowiadać temu, który ustawiłeś w konfiguracji edytora (`applicationURL`).
    - URL CMS

- Upewnij się, że konfiguracja projektu została przesłana do Intlayer CMS.

- Edytor wizualny używa iframe do wyświetlania Twojej strony internetowej. Upewnij się, że Polityka Bezpieczeństwa Treści (CSP) Twojej strony pozwala na URL CMS jako `frame-ancestors` (domyślnie 'https://intlayer.org'). Sprawdź konsolę edytora pod kątem błędów.

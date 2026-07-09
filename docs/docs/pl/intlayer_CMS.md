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

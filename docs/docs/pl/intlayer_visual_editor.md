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
    changes: Dodano opcję with w CLI
  - version: 6.0.1
    date: 2025-09-22
    changes: Zmieniono zachowanie edytora, gdy rozszerzenie pliku nie jest `.json`
  - version: 6.0.0
    date: 2025-09-21
    changes: Dodano polecenie reexported
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Dokumentacja Intlayer Visual Editor

<iframe title="Edytor wizualny + CMS dla Twojej aplikacji internetowej: wyjaśnienie Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

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

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... inne ustawienia konfiguracyjne
  editor: {
    /**
     * Wymagane
     * URL aplikacji.
     * To jest URL, na który skierowany jest wizualny edytor.
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
     * Port używany przez serwer wizualnego edytora.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Opcjonalne
     * Domyślnie "http://localhost:8000"
     * URL serwera edytora, do którego można dotrzeć z aplikacji. Używany do ograniczenia źródeł, które mogą wchodzić w interakcję z aplikacją ze względów bezpieczeństwa. Jeśli ustawione na `'*'`, edytor jest dostępny z dowolnego źródła. Powinno być ustawione, jeśli zmieniono port lub jeśli edytor jest hostowany na innej domenie.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
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
     * URL aplikacji.
     * To jest URL, na który skierowany jest wizualny edytor.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
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
    /**
     * Opcjonalne
     * Domyślnie `true`. Jeśli `false`, edytor jest nieaktywny i nie można go używać.
     * Może być używane do wyłączenia edytora w określonych środowiskach ze względów bezpieczeństwa, takich jak produkcja.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
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

- Edytor wizualny używa iframe do wyświetlania Twojej strony internetowej. Upewnij się, że Polityka Bezpieczeństwa Treści (CSP) Twojej strony pozwala na adres URL CMS jako `frame-ancestors` (domyślnie 'http://localhost:8000'). Sprawdź konsolę edytora pod kątem błędów.

---
createdAt: 2024-08-12
updatedAt: 2025-06-29
title: Jak działa Intlayer
description: Dowiedz się, jak Intlayer działa wewnętrznie. Poznaj architekturę i komponenty, które czynią Intlayer potężnym.
keywords:
  - Intlayer
  - Jak działa
  - Architektura
  - Komponenty
  - Działanie wewnętrzne
slugs:
  - doc
  - concept
  - how-works-intlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalna historia
---

# Jak działa Intlayer

## Spis treści

<TOC/>

## Przegląd

Główną ideą stojącą za Intlayer jest przyjęcie zarządzania treścią per komponent. Tak więc Intlayer pozwala na deklarowanie treści w dowolnym miejscu w Twojej bazie kodu, na przykład w tym samym katalogu co komponent.

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

Aby to zrobić, rolą Intlayer jest znalezienie wszystkich Twoich `plików deklaracji treści`, we wszystkich różnych formatach obecnych w Twoim projekcie, a następnie wygenerowanie z nich `słowników`.

Są więc dwa główne kroki:

- krok budowania
- krok interpretacji

### Krok budowania słowników

Krok budowania można wykonać na trzy sposoby:

- używając CLI z `npx intlayer build`
- używając [rozszerzenia vscode](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)
- używając wtyczek aplikacji, takich jak pakiet [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/index.md) lub ich odpowiedników dla [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/index.md). Gdy używasz jednej z tych wtyczek, Intlayer automatycznie zbuduje Twoje słowniki podczas uruchamiania (dev) lub budowania (prod) aplikacji.

1. Deklaracja plików treści
   - Pliki treści mogą być definiowane w różnych formatach, takich jak TypeScript, ECMAScript, CommonJS lub JSON.
   - Pliki treści mogą być definiowane w dowolnym miejscu w projekcie, co pozwala na lepszą konserwację i skalowalność. Ważne jest, aby przestrzegać konwencji rozszerzeń plików dla plików treści. Domyślnie to rozszerzenie to `*.content.{js|cjs|mjs|ts|tsx|json}`, ale można je zmienić w [pliku konfiguracyjnym](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

2. Generowanie `słowników`
   - Słowniki są generowane na podstawie plików treści. Domyślnie słowniki Intlayer są generowane w katalogu `.intlayer/dictionaries` w projekcie.
   - Te słowniki są generowane w różnych formatach, aby spełnić wszystkie potrzeby i zoptymalizować wydajność aplikacji.

3. Generowanie typów słowników

Na podstawie Twoich `słowników`, Intlayer wygeneruje typy, aby można je było używać w Twojej aplikacji.

- Typy słowników są generowane z Intlayer `plików deklaracji treści`. Domyślnie typy słowników Intlayer są generowane w katalogu `.intlayer/types` w projekcie.

- Intlayer [rozszerzenie modułu](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) to funkcja TypeScript, która pozwala definiować dodatkowe typy dla Intlayer. Ułatwia to doświadczenie programistyczne, sugerując dostępne lub wymagane argumenty.
  Wśród generowanych typów, typy słowników Intlayer, a nawet typy konfiguracji języka, są dodawane do pliku `types/intlayer.d.ts` i używane przez inne pakiety. Aby to działało, konieczne jest, aby plik `tsconfig.json` był skonfigurowany tak, aby uwzględniał katalog `types` w projekcie.

### Etap interpretacji słowników

Korzystając z Intlayer, uzyskasz dostęp do swojej zawartości w aplikacji za pomocą hooka `useIntlayer`.

```tsx
const MyComponent = () => {
  const content = useIntlayer("my-component");
  return <div>{content.title}</div>;
};
```

Ten hook zajmie się wykrywaniem lokalizacji za Ciebie i zwróci zawartość dla bieżącej lokalizacji. Korzystając z tego hooka, będziesz także mógł interpretować markdown, zarządzać pluralizacją i nie tylko.

> Aby zobaczyć wszystkie funkcje Intlayer, możesz przeczytać [dokumentację słowników](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

## Zdalna zawartość

Intlayer pozwala na deklarowanie zawartości lokalnie, a następnie eksportowanie jej do CMS, aby mogła być edytowana przez Twój nietechniczny zespół.

Dzięki temu będziesz mógł przesyłać zawartość do CMS i pobierać ją z CMS do swojej aplikacji, podobnie jak robisz to z kodem za pomocą Git.

Dla zewnętrznych słowników korzystających z CMS, Intlayer wykonuje podstawową operację fetch, aby pobrać zdalne słowniki i scala je z lokalnymi. Jeśli jest to skonfigurowane w Twoim projekcie, Intlayer automatycznie zarządza pobieraniem zawartości z CMS podczas uruchamiania aplikacji (dev) lub budowania (prod).

## Edytor wizualny

Intlayer zapewnia również edytor wizualny, który pozwala na edycję zawartości w sposób wizualny. Ten [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) jest dostępny w zewnętrznym pakiecie `intlayer-editor`.

![edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

- Serwer to prosta aplikacja Express, która nasłuchuje żądań od klienta i pobiera zawartość Twojej aplikacji, taką jak `dictionaries` oraz konfigurację, aby udostępnić ją po stronie klienta.
- Z kolei klient to aplikacja React, która służy do interakcji z Twoją zawartością za pomocą interfejsu wizualnego.

Kiedy wywołujesz swoją zawartość za pomocą `useIntlayer` i edytor jest włączony, automatycznie otacza Twoje ciągi znaków obiektem Proxy o nazwie `IntlayerNode`. Ten węzeł używa `window.postMessage` do komunikacji z osadzonym iframe zawierającym interfejs edytora wizualnego.
Po stronie edytora, edytor nasłuchuje tych wiadomości i symuluje rzeczywistą interakcję z Twoją zawartością, pozwalając na edycję tekstu bezpośrednio w kontekście Twojej aplikacji.

## Optymalizacja budowania aplikacji

Aby zoptymalizować rozmiar paczki Twojej aplikacji, Intlayer dostarcza dwa wtyczki do optymalizacji budowania aplikacji: wtyczki `@intlayer/babel` oraz `@intlayer/swc`.

Wtyczki Babel i SWC działają poprzez analizę Abstrakcyjnego Drzewa Składni (AST) Twojej aplikacji, aby zastąpić wywołania funkcji Intlayer zoptymalizowanym kodem. Proces ten sprawia, że ostateczny pakiet jest lżejszy w produkcji, zapewniając importowanie tylko tych słowników, które są faktycznie używane, optymalizując podział na części i zmniejszając rozmiar pakietu.

W trybie deweloperskim Intlayer używa scentralizowanego statycznego importu słowników, aby uprościć proces tworzenia aplikacji.

Aktywując opcję `importMode = "dynamic"` w [konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md), Intlayer będzie używał dynamicznego importu do ładowania słowników. Opcja ta jest domyślnie wyłączona, aby uniknąć asynchronicznego przetwarzania podczas renderowania aplikacji.

> `@intlayer/babel` jest dostępny domyślnie w pakiecie `vite-intlayer`,

> `@intlayer/swc` nie jest domyślnie instalowany w pakiecie `next-intlayer`, ponieważ wtyczki SWC są nadal eksperymentalne w Next.js.

Aby dowiedzieć się, jak skonfigurować budowę swojej aplikacji, możesz przeczytać [dokumentację konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

## Pakiety

Intlayer składa się z kilku pakietów, z których każdy pełni określoną rolę w procesie tłumaczenia. Oto graficzna reprezentacja struktury tego pakietu:

![pakiety intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

Pakiet `intlayer` jest używany w aplikacjach do deklarowania treści w plikach zawartości.

### react-intlayer

Pakiet `react-intlayer` jest używany do interpretacji słowników Intlayer i umożliwia ich użycie w aplikacjach React.

### next-intlayer

Pakiet `next-intlayer` jest używany jako warstwa nad `react-intlayer`, aby umożliwić korzystanie ze słowników Intlayer w aplikacjach Next.js. Integruje on niezbędne funkcje, aby Intlayer działał w środowisku Next.js, takie jak middleware tłumaczeń, routing czy konfiguracja pliku `next.config.js`.

### vue-intlayer

Pakiet `vue-intlayer` jest używany do interpretacji słowników Intlayer i umożliwia ich użycie w aplikacjach Vue.

### nuxt-intlayer

Pakiet `nuxt-intlayer` jest modułem Nuxt, który umożliwia korzystanie ze słowników Intlayer w aplikacjach Nuxt. Integruje on niezbędne funkcje, aby Intlayer działał w środowisku Nuxt, takie jak middleware tłumaczeń, routing czy konfiguracja pliku `nuxt.config.js`.

### svelte-intlayer

Pakiet `svelte-intlayer` jest używany do interpretacji słowników Intlayer i umożliwia ich użycie w aplikacjach Svelte.

### solid-intlayer (WIP)

Pakiet `solid-intlayer` jest używany do interpretacji słowników Intlayer i umożliwia ich użycie w aplikacjach Solid.js.

### preact-intlayer

Pakiet `preact-intlayer` jest używany do interpretacji słowników Intlayer i umożliwia ich użycie w aplikacjach Preact.

### angular-intlayer (WIP)

Pakiet `angular-intlayer` jest używany do interpretacji słowników Intlayer i umożliwia ich użycie w aplikacjach Angular.

### express-intlayer

Pakiet `express-intlayer` jest używany do korzystania z Intlayer na backendzie Express.js.

### react-native-intlayer

Pakiet `react-native-intlayer` dostarcza narzędzia integrujące pluginy, które umożliwiają działanie Intlayer z bundlerem Metro.

### lynx-intlayer

Pakiet `lynx-intlayer` dostarcza narzędzia integrujące pluginy, które umożliwiają działanie Intlayer z bundlerem Lynx.

### vite-intlayer

Zawiera plugin Vite do integracji Intlayer z [bundlerem Vite](https://vite.dev/guide/why.html#why-bundle-for-production), a także middleware do wykrywania preferowanego języka użytkownika, zarządzania ciasteczkami oraz obsługi przekierowań URL.

### react-scripts-intlayer

Zawiera polecenia i pluginy `react-scripts-intlayer` do integracji Intlayer z aplikacją opartą na Create React App. Te pluginy bazują na [craco](https://craco.js.org/) i zawierają dodatkową konfigurację dla bundlera [Webpack](https://webpack.js.org/).

### intlayer-editor

Pakiet `intlayer-editor` służy do umożliwienia korzystania z edytora wizualnego. Ten pakiet, opcjonalny, może być zainstalowany w aplikacjach i będzie używany przez pakiet `react-intlayer`.
Składa się z dwóch części: serwera i klienta.

Klient zawiera elementy UI, które będą używane przez `react-intlayer`.

Serwer, oparty na Express, służy do odbierania żądań edytora wizualnego oraz zarządzania lub modyfikowania plików z zawartością.

### intlayer-cli

Pakiet `intlayer-cli` może być używany do generowania słowników za pomocą polecenia `npx intlayer dictionaries build`. Jeśli `intlayer` jest już zainstalowany, CLI jest instalowany automatycznie i ten pakiet nie jest konieczny.

### @intlayer/core

Pakiet `@intlayer/core` jest głównym pakietem Intlayer. Zawiera funkcje zarządzania tłumaczeniami i słownikami. `@intlayer/core` jest multiplatformowy i jest używany przez inne pakiety do interpretacji słowników.

### @intlayer/config

Pakiet `@intlayer/config` służy do konfigurowania ustawień Intlayer, takich jak dostępne języki, parametry middleware Next.js lub ustawienia zintegrowanego edytora.

### @intlayer/webpack

Pakiet `@intlayer/webpack` służy do dostarczania konfiguracji Webpack, aby aplikacja oparta na Webpack mogła współpracować z Intlayer. Pakiet ten dostarcza również wtyczkę do dodania do istniejącej aplikacji Webpack.

### @intlayer/cli

Pakiet `@intlayer/cli` jest pakietem NPM, który służy do deklarowania skryptów związanych z interfejsami wiersza poleceń Intlayer. Zapewnia jednolitość wszystkich poleceń CLI Intlayer. Ten pakiet jest szczególnie wykorzystywany przez pakiety [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/pl/packages/intlayer-cli/index.md) oraz [intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/pl/packages/intlayer/index.md).

### @intlayer/mcp

Pakiet `@intlayer/mcp` dostarcza serwer MCP (Model Context Protocol), który oferuje wsparcie IDE oparte na sztucznej inteligencji, dostosowane do ekosystemu Intlayer. Automatycznie ładuje dokumentację i integruje się z CLI Intlayer.

### @intlayer/dictionaries-entry & @intlayer/unmerged-dictionaries-entry & @intlayer/dynamic-dictionaries-entry

Pakiety `@intlayer/dictionaries-entry`, `@intlayer/unmerged-dictionaries-entry` oraz `@intlayer/dynamic-dictionaries-entry` zwracają ścieżkę wejściową słowników Intlayer. Ponieważ przeszukiwanie systemu plików z poziomu przeglądarki jest niemożliwe, używanie bundlerów takich jak Webpack czy Rollup do pobrania ścieżki wejściowej słowników również nie jest możliwe. Te pakiety zostały zaprojektowane do aliasowania, co pozwala na optymalizację bundlowania w różnych bundlerach, takich jak Vite, Webpack i Turbopack.

### @intlayer/chokidar

Pakiet `@intlayer/chokidar` służy do monitorowania plików z zawartością i regenerowania zmodyfikowanego słownika przy każdej zmianie.

### @intlayer/editor

Pakiet `@intlayer/editor` dostarcza narzędzia związane z edytorem słowników. Zawiera w szczególności API do interfejsu aplikacji z edytorem Intlayer oraz narzędzia do manipulacji słownikami. Ten pakiet jest wieloplatformowy.

### @intlayer/editor-react

Pakiet `@intlayer/editor-react` dostarcza stany, konteksty, hooki oraz komponenty do interfejsu aplikacji React z edytorem Intlayer.

### @intlayer/babel

Pakiet `@intlayer/babel` dostarcza narzędzia optymalizujące bundlowanie słowników dla aplikacji opartych na Vite i Webpack.

### @intlayer/swc

Pakiet `@intlayer/swc` dostarcza narzędzia optymalizujące bundlowanie słowników dla aplikacji Next.js.

### @intlayer/api

Pakiet `@intlayer/api` to SDK API do interakcji z backendem.

### @intlayer/design-system

Pakiet `@intlayer/design-system` służy do udostępniania elementów designu pomiędzy CMS a edytorem wizualnym.

### @intlayer/backend

Pakiet `@intlayer/backend` eksportuje typy backendowe i w przyszłości zaoferuje backend jako samodzielny pakiet.

## Rozmowa z naszą inteligentną dokumentacją

- [Zadaj pytania naszej inteligentnej dokumentacji](https://intlayer.org/doc/chat)

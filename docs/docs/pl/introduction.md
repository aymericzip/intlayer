---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Wprowadzenie
description: Odkryj, jak działa Intlayer. Zobacz kroki używane przez Intlayer w Twojej aplikacji. Dowiedz się, co robią różne pakiety.
keywords:
  - Wprowadzenie
  - Pierwsze kroki
  - Intlayer
  - Aplikacja
  - Pakiety
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Dokumentacja Intlayer

Witamy w oficjalnej dokumentacji Intlayer! Znajdziesz tutaj wszystko, czego potrzebujesz, aby zintegrować, skonfigurować i opanować Intlayer dla wszystkich Twoich potrzeb związanych z internacjonalizacją (i18n), niezależnie od tego, czy pracujesz z Next.js, React, Vite, Express czy innym środowiskiem JavaScript.

## Wprowadzenie

### Czym jest Intlayer?

**Intlayer** to biblioteka do internacjonalizacji zaprojektowana specjalnie dla programistów JavaScript. Pozwala na deklarowanie Twoich treści w dowolnym miejscu w kodzie. Przekształca deklaracje wielojęzycznych treści w ustrukturyzowane słowniki, które można łatwo zintegrować w Twoim kodzie. Korzystając z TypeScript, **Intlayer** sprawia, że Twój rozwój jest silniejszy i bardziej efektywny.

Intlayer oferuje również opcjonalny edytor wizualny, który pozwala łatwo edytować i zarządzać Twoimi treściami. Ten edytor jest szczególnie przydatny dla programistów, którzy wolą wizualny interfejs do zarządzania treścią, lub dla zespołów generujących treści bez konieczności martwienia się o kod.

### Przykład użycia

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary; // spełnia typ Dictionary (słownik)

export default componentContent; // eksportuje zawartość komponentu
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentContent; // eksportuje zawartość komponentu
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

module.exports = componentContent; // eksportuje zawartość komponentu
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

## Główne funkcje

Intlayer oferuje szereg funkcji dostosowanych do potrzeb nowoczesnego tworzenia stron internetowych. Poniżej znajdują się kluczowe funkcje wraz z linkami do szczegółowej dokumentacji dla każdej z nich:

- **Wsparcie dla internacjonalizacji**: Zwiększ globalny zasięg swojej aplikacji dzięki wbudowanemu wsparciu dla internacjonalizacji.
- **Edytor wizualny**: Ulepsz swój proces tworzenia dzięki wtyczkom do edytorów zaprojektowanym dla Intlayer. Sprawdź [Przewodnik po edytorze wizualnym](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md).
- **Elastyczność konfiguracji**: Dostosuj swoje środowisko za pomocą rozbudowanych opcji konfiguracyjnych opisanych w [Przewodniku po konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).
- **Zaawansowane narzędzia CLI**: Zarządzaj swoimi projektami efektywnie, korzystając z interfejsu wiersza poleceń Intlayer. Poznaj możliwości w [Dokumentacji narzędzi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md).

## Podstawowe koncepcje

### Słownik

Organizuj swoje wielojęzyczne treści blisko kodu, aby wszystko było spójne i łatwe w utrzymaniu.

- **[Pierwsze kroki](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md)**  
  Poznaj podstawy deklarowania treści w Intlayer.

- **[Tłumaczenie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/translation.md)**  
  Zrozum, jak tłumaczenia są generowane, przechowywane i wykorzystywane w Twojej aplikacji.

- **[Enumeracja](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/enumeration.md)**  
  Łatwo zarządzaj powtarzającymi się lub stałymi zestawami danych w różnych językach.

- **[Warunek](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/conditional.md)**  
  Naucz się, jak używać logiki warunkowej w Intlayer, aby tworzyć dynamiczne treści.

- **[Wstawianie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/insertion.md)**  
  Odkryj, jak wstawiać wartości do ciągu znaków za pomocą symboli zastępczych wstawiania.

- **[Pobieranie funkcji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/function_fetching.md)**  
  Zobacz, jak dynamicznie pobierać zawartość za pomocą niestandardowej logiki, aby dopasować ją do przepływu pracy Twojego projektu.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/markdown.md)**  
  Naucz się, jak używać Markdown w Intlayer do tworzenia bogatej zawartości.

- **[Osadzanie plików](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/file_embeddings.md)**  
  Odkryj, jak osadzać zewnętrzne pliki w Intlayer, aby używać ich w edytorze treści.

- **[Zagnieżdżanie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/nesting.md)**  
  Zrozum, jak zagnieżdżać zawartość w Intlayer, aby tworzyć złożone struktury.

### Środowiska i integracje

Intlayer został zaprojektowany z myślą o elastyczności, oferując bezproblemową integrację z popularnymi frameworkami i narzędziami do budowania:

- **[Intlayer z Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_16.md)**
- **[Intlayer z Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_15.md)**
- **[Intlayer z Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_14.md)**
- **[Intlayer z Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_page_router.md)**
- **[Intlayer z React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_create_react_app.md)**
- **[Intlayer z Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+react.md)**
- **[Intlayer z React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_react_router_v7.md)**
- **[Intlayer z Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_tanstack.md)**
- **[Intlayer z React Native i Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_react_native+expo.md)**
- **[Intlayer z Lynx i React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_lynx+react.md)**
- **[Intlayer z Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+preact.md)**
- **[Intlayer z Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+vue.md)**
- **[Intlayer z Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nuxt.md)**
- **[Intlayer z Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_express.md)**
- **[Intlayer z NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nestjs.md)**
- **[Intlayer z Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_angular.md)**

Każdy przewodnik integracyjny zawiera najlepsze praktyki korzystania z funkcji Intlayer, takich jak **renderowanie po stronie serwera**, **dynamiczne routowanie** czy **renderowanie po stronie klienta**, dzięki czemu możesz utrzymać szybką, przyjazną dla SEO i wysoce skalowalną aplikację.

## Współtworzenie i opinie

Cenimy siłę open-source i rozwój oparty na społeczności. Jeśli chcesz zaproponować ulepszenia, dodać nowy przewodnik lub poprawić jakiekolwiek problemy w naszej dokumentacji, śmiało zgłoś Pull Request lub otwórz issue w naszym [repozytorium GitHub](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

Każdy przewodnik integracji zawiera najlepsze praktyki dotyczące korzystania z funkcji Intlayer, takich jak **renderowanie po stronie serwera**, **dynamiczne routowanie** czy **renderowanie po stronie klienta**, dzięki czemu możesz utrzymać szybką, przyjazną dla SEO i wysoce skalowalną aplikację.

## Współtworzenie i opinie

Cenimy siłę open-source i rozwój oparty na społeczności. Jeśli chcesz zaproponować ulepszenia, dodać nowy przewodnik lub poprawić jakiekolwiek błędy w naszej dokumentacji, śmiało zgłoś Pull Request lub otwórz issue w naszym [repozytorium GitHub](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Gotowy, aby tłumaczyć swoją aplikację szybciej i efektywniej?** Zanurz się w naszej dokumentacji i zacznij korzystać z Intlayer już dziś. Doświadcz solidnego, usprawnionego podejścia do internacjonalizacji, które pozwala utrzymać porządek w treściach i zwiększa produktywność Twojego zespołu.

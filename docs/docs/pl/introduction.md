---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Wprowadzenie
description: Dowiedz się, jak działa Intlayer. Zobacz kroki, których używa Intlayer w Twojej aplikacji. Sprawdź, co robią poszczególne pakiety.
keywords:
  - Wprowadzenie
  - Jak zacząć
  - Intlayer
  - Aplikacja
  - Pakiety
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
author: aymericzip
---

# Dokumentacja Intlayer

Witamy w oficjalnej dokumentacji Intlayer! Tutaj znajdziesz wszystko, czego potrzebujesz, aby zintegrować, skonfigurować i opanować Intlayer dla wszystkich Twoich potrzeb związanych z internacjonalizacją (i18n), niezależnie od tego, czy pracujesz z Next.js, React, Vite, Express, czy w innym środowisku JavaScript.

## Wprowadzenie

### Czym jest Intlayer?

**Intlayer** to biblioteka internacjonalizacji zaprojektowana specjalnie dla programistów JavaScript. Pozwala ona na deklarowanie treści w dowolnym miejscu Twojego kodu. Przekształca deklaracje wielojęzycznych treści w ustrukturyzowane słowniki w celu ich łatwej integracji z Twoim kodem. Wykorzystując TypeScript, **Intlayer** sprawia, że Twoje tworzenie oprogramowania jest solidniejsze i bardziej wydajne.

Intlayer udostępnia również opcjonalny edytor wizualny, który pozwala w prosty sposób edytować i zarządzać treścią. Ten edytor jest szczególnie przydatny dla programistów, którzy preferują wizualny interfejs do zarządzania treścią, lub dla zespołów generujących treści bez konieczności przejmowania się kodem.

### Przykład użycia

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
      pl: "Witaj świecie",
    }),
  },
} satisfies Dictionary;

export default componentContent;
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
        "es": "Hola Mundo",
        "pl": "Witaj świecie"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### Dlaczego Intlayer, a nie alternatywy?

W porównaniu do wiodących rozwiązań takich jak `next-intl` lub `i18next`, Intlayer to rozwiązanie, które ma zintegrowane optymalizacje, takie jak:

<AccordionGroup>

<Accordion header="Rozmiar paczki (Bundle size)">

Zamiast pobierać ogromne pliki JSON do Twoich stron, ładuj tylko niezbędną treść. Intlayer pomaga **zmniejszyć rozmiary Twojego kodu wynikowego oraz stron nawet o 50%**.

</Accordion>

<Accordion header="Łatwość w utrzymaniu (Maintainability)">

Ograniczanie zasięgu (scoping) treści Twojej aplikacji **ułatwia utrzymanie** dużych projektów. Możesz skopiować lub usunąć folder pojedynczej funkcjonalności bez obciążania umysłu koniecznością przeglądania całej bazy kodu treści. Ponadto, Intlayer jest **w pełni zadeklarowany statycznie (fully typed)**, co gwarantuje poprawność Twojej treści.

</Accordion>

<Accordion header="Agent AI">

Wspólne umiejscowienie (co-locating) kodu i treści **zmniejsza kontekst wymagany** przez duże modele językowe (LLM). Intlayer jest również dostarczany z pakietem narzędzi, takim jak **CLI** służącym do testowania pod kątem brakujących tłumaczeń, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md)** oraz **[umiejętności agentów (agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)**, dzięki czemu środowisko programistyczne (DX) dla agentów AI staje się znacznie wygodniejsze.

</Accordion>

<Accordion header="Automatyzacja">

Skorzystaj z automatyzacji, by tłumaczyć w Twoim potoku CI/CD, używając wybranego modelu LLM zgodnie z kosztem Twojego dostawcy AI. Intlayer oferuje również **kompilator**, aby automatyzować wyciąganie treści, a także [platformę webową](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md), by pomóc **tłumaczyć w tle**.

</Accordion>

<Accordion header="Wydajność (Performance)">

Podłączanie ogromnych plików JSON do komponentów może prowadzić do problemów z wydajnością i reaktywnością. Intlayer optymalizuje proces ładowania Twojej treści w fazie budowania (build time).

</Accordion>

<Accordion header="Skalowanie bez angażowania programistów (Scaling with non-dev)">

Więcej niż rozwiązanie i18n — Intlayer dostarcza **samodzielnie hostowany [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md)** oraz **[w pełni wyposażony system CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)**, który pomaga zarządzać Twoimi wielojęzycznymi treściami **w czasie rzeczywistym**, umożliwiając bezproblemową współpracę między tłumaczami, twórcami treści i pozostałymi członkami zespołu. Treść można przechowywać lokalnie i/lub zdalnie.

</Accordion>
</AccordionGroup>

## Główne funkcje

Intlayer oferuje szereg funkcji dostosowanych do potrzeb nowoczesnego tworzenia stron internetowych. Poniżej znajdują się kluczowe funkcje wraz z linkami do szczegółowej dokumentacji dla każdej z nich:

- **Wsparcie dla internacjonalizacji**: Zwiększ globalny zasięg swojej aplikacji dzięki wbudowanemu wsparciu dla internacjonalizacji.
- **Edytor Wizualny**: Usprawnij swój przepływ pracy za pomocą wtyczek edytora zaprojektowanych dla Intlayer. Sprawdź [Przewodnik po Edytorze Wizualnym](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md).
- **Elastyczność Konfiguracji**: Dostosuj swoją konfigurację za pomocą rozbudowanych opcji konfiguracyjnych, wyszczególnonych w [Przewodniku po konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).
- **Zaawansowane Narzędzia CLI**: Zarządzaj efektywnie swoimi projektami przy użyciu interfejsu wiersza poleceń Intlayer. Odkryj możliwości w [Dokumentacji Narzędzi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

## Kluczowe Koncepcje

### Słownik (Dictionary)

Organizuj swoje wielojęzyczne treści w pobliżu kodu, aby zachować spójność i łatwość w utrzymaniu.

- **[Rozpocznij](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md)**  
  Poznaj podstawy deklarowania treści w Intlayer.

- **[Tłumaczenie (Translation)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/translation.md)**  
  Zrozum, jak tłumaczenia są generowane, przechowywane i wykorzystywane w Twojej aplikacji.

- **[Wyliczenie (Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/enumeration.md)**  
  Łatwo zarządzaj powtarzalnymi lub stałymi zestawami danych w różnych językach.

- **[Warunek (Condition)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/condition.md)**  
  Dowiedz się, jak stosować logikę warunkową w Intlayer, aby tworzyć dynamiczne treści.

- **[Wstawianie (Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/insertion.md)**  
  Odkryj, jak wstawiać wartości w łańcuch znaków przy użyciu znaczników (placeholders).

- **[Pobieranie przez Funkcje (Function Fetching)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/function_fetching.md)**  
  Zobacz, jak dynamicznie pobierać treść za pomocą niestandardowej logiki, aby dopasować ją do przepływu pracy Twojego projektu.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/markdown.md)**  
  Dowiedz się, jak używać Markdown w Intlayer, aby tworzyć wzbogacone teksty.

- **[Osadzanie Plików (File embeddings)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/file.md)**  
  Odkryj, jak osadzać zewnętrzne pliki w Intlayer, aby korzystać z nich w edytorze treści.

- **[Zagnieżdżanie (Nesting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/nesting.md)**  
  Zrozum, jak zagnieżdżać treści w Intlayer, aby budować złożone struktury.

### Środowiska i Integracje

Zbudowaliśmy Intlayer z myślą o elastyczności, oferując płynną integrację w obrębie popularnych frameworków i narzędzi do budowania:

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
- **[Intlayer z Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+svelte.md)**
- **[Intlayer z SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_svelte_kit.md)**
- **[Intlayer z Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_express.md)**
- **[Intlayer z NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nestjs.md)**
- **[Intlayer z Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_hono.md)**
- **[Intlayer z Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_angular_21.md)**

Każdy przewodnik integracyjny zawiera najlepsze praktyki korzystania z funkcji Intlayer, takich jak **renderowanie po stronie serwera (SSR)**, **dynamiczne routowanie**, czy **renderowanie po stronie klienta**, dzięki czemu możesz utrzymać szybką, przyjazną dla SEO i wysoce skalowalną aplikację.

## Wnoszenie Wkładu i Opinie

Cenimy siłę open-source i tworzenia oprogramowania opartego o społeczność. Jeśli chciałbyś zaproponować usprawnienia, dodać nowy poradnik lub poprawić błędy w naszych dokumentach, śmiało wyślij Pull Request lub otwórz Issue w naszym [repozytorium GitHub](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Gotowy, aby tłumaczyć swoją aplikację szybciej i wydajniej?** Zanurz się w naszej dokumentacji, aby rozpocząć korzystanie z Intlayer już dziś. Doświadcz solidnego, zoptymalizowanego podejścia do internacjonalizacji, które sprawi, że Twoje treści będą uporządkowane, a Twój zespół bardziej produktywny.

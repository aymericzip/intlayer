---
createdAt: 2025-09-10
updatedAt: 2025-09-10
title: i18n per-komponentowy kontra scentralizowany: nowe podejście z Intlayer
description: Dogłębna analiza strategii internacjonalizacji w React, porównująca podejścia scentralizowane, per-key i per-component oraz wprowadzająca Intlayer.
keywords:
  - i18n
  - React
  - Internacjonalizacja
  - Intlayer
  - Optymalizacja
  - Rozmiar bundla
slugs:
  - blog
  - per-component-vs-centralized-i18n
---

# i18n per-komponentowy kontra scentralizowany

Podejście per-komponentowe nie jest nowym pojęciem. Na przykład w ekosystemie Vue `vue-i18n` obsługuje [i18n SFC (Single File Component)](https://vue-i18n.intlify.dev/guide/advanced/sfc.html). Nuxt również oferuje [tłumaczenia per-component](https://i18n.nuxtjs.org/docs/guide/per-component-translations), a Angular wykorzystuje podobny wzorzec poprzez swoje [Feature Modules](https://v17.angular.io/guide/feature-modules).

Nawet w aplikacji Flutter często można znaleźć taki wzorzec:

```bash
lib/
└── features/
    └── login/
        ├── login_screen.dart
        └── login_screen.i18n.dart  # <- Tłumaczenia znajdują się tutaj
```

```dart fileName='lib/features/login/login_screen.i18n.dart'
import 'package:i18n_extension/i18n_extension.dart';

extension Localization on String {
  static var _t = Translations.byText("en") +
      {
        "Hello": {
          "en": "Hello",
          "fr": "Bonjour",
        },
      };

  String get i18n => localize(this, _t);
}
```

Jednak w świecie React głównie widzimy różne podejścia, które pogrupuję w trzy kategorie:

<Columns>
  <Column>

**Podejście scentralizowane** (i18next, next-intl, react-intl, lingui)

- (bez namespaces) zakłada pojedyncze źródło pobierania treści. Domyślnie ładujesz treści ze wszystkich stron przy uruchomieniu aplikacji.

  </Column>
  <Column>

Drobnoziarniste podejście (intlayer, inlang)

- pobieranie treści w sposób drobnoziarnisty — na poziomie klucza lub komponentu.

  </Column>
</Columns>

> W tym wpisie na blogu nie będę się skupiał na rozwiązaniach opartych na kompilatorze, które już omówiłem tutaj: [Kompilator vs deklaratywne i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/compiler_vs_declarative_i18n.md).
> Zwróć uwagę, że i18n oparty na kompilatorze (np. Lingui) jedynie automatyzuje ekstrakcję i ładowanie treści. Pod maską często ma te same ograniczenia co inne podejścia.

> Im bardziej drobnoziarnie kontrolujesz pobieranie treści, tym większe ryzyko wprowadzenia dodatkowego stanu i logiki do Twoich komponentów.

Podejścia granularne są bardziej elastyczne niż scentralizowane, ale często wiąże się to z kompromisem. Nawet jeśli biblioteki reklamują "tree shaking", w praktyce często i tak skończysz ładując stronę we wszystkich językach.

Ogólnie rzecz biorąc, decyzja wygląda mniej więcej tak:

- Jeśli Twoja aplikacja ma więcej stron niż języków, warto preferować podejście granularne.
- Jeśli masz więcej języków niż stron, powinieneś skłaniać się ku podejściu scentralizowanemu.

Oczywiście autorzy bibliotek zdają sobie sprawę z tych ograniczeń i proponują obejścia. Wśród nich: dzielenie na namespaces, dynamiczne ładowanie plików JSON (`await import()`), albo oczyszczanie zawartości podczas procesu budowania.

Jednocześnie powinieneś wiedzieć, że gdy dynamicznie ładujesz swoją zawartość, wprowadzasz dodatkowe żądania do serwera. Każde dodatkowe `useState` lub hook oznacza dodatkowe żądanie do serwera.

> Aby rozwiązać ten problem, Intlayer proponuje grupowanie wielu definicji treści pod tym samym kluczem — Intlayer następnie scali tę zawartość.

Ale z tych wszystkich rozwiązań jasno wynika, że najbardziej popularnym podejściem jest podejście scentralizowane.

### Dlaczego więc podejście scentralizowane jest tak popularne?

- Po pierwsze, i18next było pierwszym rozwiązaniem, które zyskało szerokie zastosowanie, podążając za filozofią inspirowaną architekturami PHP i Java (MVC), które opierają się na ścisłym rozdziale odpowiedzialności (trzymaniu treści oddzielnie od kodu). Pojawiło się w 2011 roku, ustanawiając swoje standardy jeszcze przed masowym przejściem na architektury oparte na komponentach (takie jak React).
- Po drugie, gdy biblioteka zostanie szeroko przyjęta, trudno jest przestawić ekosystem na inne wzorce.
- Stosowanie podejścia scentralizowanego ułatwia też pracę w systemach zarządzania tłumaczeniami (TMS) takich jak Crowdin, Phrase czy Localized.
- Logika stojąca za podejściem per-component jest bardziej złożona niż w podejściu scentralizowanym i wymaga więcej czasu na rozwój, zwłaszcza gdy trzeba rozwiązywać problemy takie jak identyfikacja miejsca, w którym znajduje się dany content.

### Ok, ale dlaczego nie pozostać przy podejściu scentralizowanym?

Pozwól, że wyjaśnię, dlaczego może to być problematyczne dla Twojej aplikacji:

- **Nieużywane dane:**
  Gdy ładuje się strona, często pobierane są treści ze wszystkich pozostałych stron. (W aplikacji z 10 stronami to 90% załadowanej zawartości jest nieużywane). Lazy-loadujesz modal? Biblioteka i18n i tak na to nie zważa — i tak najpierw ładuje stringi.
- **Wydajność:**
  Przy każdym re-renderze każdy komponent zostaje obciążony olbrzymim ładunkiem JSON, co negatywnie wpływa na reaktywność aplikacji w miarę jej rozrostu.
- **Utrzymanie:**
  Utrzymywanie dużych plików JSON jest uciążliwe. Musisz skakać między plikami, aby dodać tłumaczenie, upewniając się, że żadne tłumaczenia nie są pominięte i że nie pozostają żadne **orphan keys**.
- **Design-system:**
  To powoduje niekompatybilność z design systemami (np. komponent `LoginForm`) i ogranicza możliwość duplikowania komponentów między różnymi aplikacjami.

**"Ale wymyśliliśmy Namespaces!"**

Oczywiście — to ogromny krok naprzód. Przyjrzyjmy się porównaniu rozmiaru głównego bundle'a dla konfiguracji Vite + React + React Router v7 + Intlayer. Zasymulowaliśmy aplikację z 20 stronami.

Pierwszy przykład nie uwzględnia leniwego ładowania tłumaczeń dla każdego locale i nie stosuje podziału na namespaces. Drugi obejmuje content purging + dynamiczne ładowanie tłumaczeń.

| Zoptymalizowany bundle                                                                                                        | Bundle bez optymalizacji                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| ![bundle bez optymalizacji](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle_no_optimization.png?raw=true) | ![zoptymalizowany bundle](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true) |

Dzięki namespaces, przeszliśmy z tej struktury:

```bash
locale/
├── en.json
├── fr.json
└── es.json
```

Do takiej:

```bash
locale/
├── en/
│   ├── common.json
│   ├── navbar.json
│   ├── footer.json
│   ├── home.json
│   └── about.json
├── fr/
│   └── ...
└── es/
    └── ...

```

Teraz musisz precyzyjnie zarządzać, która część zawartości Twojej aplikacji powinna być ładowana i gdzie. W praktyce zdecydowana większość projektów pomija ten etap ze względu na jego złożoność (zobacz na przykład [przewodnik next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_using_next-i18next.md), aby zobaczyć wyzwania, jakie stanowi (tylko) przestrzeganie dobrych praktyk).
W konsekwencji te projekty kończą z opisanym wcześniej problemem masywnego ładowania plików JSON.

> Należy zauważyć, że problem ten nie dotyczy tylko i18next, lecz wszystkich scentralizowanych podejść wymienionych powyżej.

Jednak chcę przypomnieć, że nie wszystkie podejścia granularne to rozwiązują. Na przykład podejścia `vue-i18n SFC` czy `inlang` nie realizują domyślnie lazy loadingu tłumaczeń per-locale, więc po prostu zamieniasz problem wielkości bundla na inny.

Co więcej, bez odpowiedniego separation of concerns znacznie trudniej jest wyodrębnić tłumaczenia i udostępnić je tłumaczom do przeglądu.

### Jak podejście per-component w Intlayer rozwiązuje ten problem

Intlayer działa w kilku etapach:

1. **Deklaracja:** Zadeklaruj swoją zawartość w dowolnym miejscu kodu, używając plików `*.content.{ts|jsx|cjs|json|json5|...}`. Zapewnia to separation of concerns przy jednoczesnym utrzymaniu zawartości zlokalizowanej obok kodu. Plik zawartości może być per-locale lub wielojęzyczny.
2. **Przetwarzanie:** Intlayer uruchamia krok builda, aby przetworzyć logikę JS, obsłużyć brakujące tłumaczenia (fallbacki), wygenerować typy TypeScript, zarządzać zduplikowaną zawartością, pobierać treści z Twojego CMS i inne.
3. **Czyszczenie (Purging):** Gdy Twoja aplikacja się buduje, Intlayer usuwa nieużywaną zawartość (trochę jak Tailwind zarządza klasami) poprzez zastąpienie zawartości w następujący sposób:

**Deklaracja:**

```tsx
// src/MyComponent.tsx
export const MyComponent = () => {
  const content = useIntlayer("my-key");
  return <h1>{content.title}</h1>;
};
```

```tsx
// src/myComponent.content.ts
export const {
  key: "my-key",
  content: t({
    en: { title: "My title" },
    fr: { title: "Mon titre" }
  })
}

```

**Przetwarzanie:** Intlayer buduje słownik na podstawie pliku `.content` i generuje:

```json5
// .intlayer/dynamic_dictionary/pl/my-key.json
{
  "key": "my-key",
  "content": { "title": "Mój tytuł" },
}
```

**Zastąpienie:** Intlayer przekształca twój komponent podczas budowania aplikacji.

**- Tryb importu statycznego:**

```tsx
// Reprezentacja komponentu w składni podobnej do JSX
export const MyComponent = () => {
  const content = useDictionary({
    key: "my-key",
    content: {
      nodeType: "translation",
      translation: {
        pl: { title: "Mój tytuł" },
        en: { title: "My title" },
        fr: { title: "Mon titre" },
      },
    },
  });

  return <h1>{content.title}</h1>;
};
```

**- Tryb importu dynamicznego:**

```tsx
// Reprezentacja komponentu w składni podobnej do JSX
export const MyComponent = () => {
  const content = useDictionaryAsync({
    en: () =>
      import(".intlayer/dynamic_dictionary/en/my-key.json", {
        with: { type: "json" },
      }).then((mod) => mod.default),
    // Same for other languages
  });

  return <h1>{content.title}</h1>;
};
```

> `useDictionaryAsync` używa mechanizmu podobnego do Suspense, aby ładować zlokalizowany JSON tylko wtedy, gdy jest to potrzebne.

**Kluczowe korzyści tego podejścia per-component:**

- Utrzymywanie deklaracji treści blisko komponentów umożliwia lepszą konserwowalność (np. przeniesienie komponentu do innej aplikacji lub design systemu. Usunięcie folderu komponentu usuwa także powiązaną treść, tak jak prawdopodobnie już robisz dla swoich `.test` i `.stories`)

/// Podejście per-component zapobiega konieczności, by agenty AI musiały przeskakiwać przez wszystkie różne pliki. Traktuje wszystkie tłumaczenia w jednym miejscu, ograniczając złożoność zadania i liczbę używanych tokenów.

### Ograniczenia

Oczywiście to podejście wiąże się z kompromisami:

- Trudniej je połączyć z innymi systemami l10n i dodatkowymi narzędziami.
- Możesz zostać zablokowany w konkretnym rozwiązaniu (co właściwie już ma miejsce przy każdym rozwiązaniu i18n ze względu na ich specyficzną składnię).

Dlatego Intlayer stara się dostarczyć kompletny zestaw narzędzi do i18n (100% darmowy i OSS), w tym tłumaczenia AI przy użyciu własnego dostawcy AI i kluczy API. Intlayer dostarcza również narzędzia do synchronizacji plików JSON, działające jak formatery wiadomości ICU / vue-i18n / i18next, mapujące treść do ich specyficznych formatów.

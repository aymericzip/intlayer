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

> Przejrzyj implementację pakietu na GitHubie: https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer

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

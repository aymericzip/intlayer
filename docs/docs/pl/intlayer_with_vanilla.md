---
createdAt: 2026-03-31
updatedAt: 2026-05-31
title: "Vanilla JS i18n - Kompletny przewodnik po tłumaczeniu aplikacji Vanilla JS"
description: "Koniec z i18next. Przewodnik 2026 do budowania wielojęzycznej (i18n) aplikacji Vanilla JS. Tłumacz z agentami AI i optymalizuj rozmiar bundle, SEO i wydajność."
keywords:
  - Międzynarodowienie
  - Dokumentacja
  - Intlayer
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vanilla-template
applicationShowcase: https://intlayer-vanilla-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualizacja użycia API useIntlayer w Solid do bezpośredniego dostępu do właściwości"
  - version: 8.4.10
    date: 2026-03-31
    changes: "Inicjalizacja historii"
---

# Przetłumacz swoją stronę Vanilla JS używając Intlayer | Międzynarodowienie (i18n)

<Tabs defaultTab="code">
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vanilla-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vanilla-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vanilla-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Spis treści

<TOC/>

## Dlaczego Interlayer zamiast alternatyw?

W porównaniu do głównych rozwiązań, takich jak `i18next` czy `i18n.js`, Intlayer jest rozwiązaniem wyposażonym w zintegrowane optymalizacje, takie jak:

**Pełne pokrycie Vanilla JS**

Intlayer jest zoptymalizowany do doskonałej współpracy z Vanilla JavaScript, oferując **zarządzanie treścią niezależnie od platformy**, **obsługę TypeScript** i wszystkie funkcje potrzebne do skalowania internacjonalizacji (i18n).

**Rozmiar bundle'a**

Zamiast ładować ogromne pliki JSON na swoje strony, ładuj tylko niezbędną treść. Intlayer pomaga **zmniejszyć rozmiary bundle'a i stron nawet o 50%**.

**Łatwość konserwacji**

Określanie zakresu zawartości aplikacji **ułatwia konserwację** aplikacji na dużą skalę. Możesz powielić lub usunąć pojedynczy folder funkcji bez obciążania psychicznego koniecznością przeglądania całej bazy kodu zawartości. Dodatkowo Inlayer jest **w pełni napisany**, aby zapewnić dokładność treści.

**Agent AI**

Wspólna lokalizacja treści **zmniejsza potrzebny kontekst** dzięki modelom dużego języka (LLM). Intlayer zawiera także zestaw narzędzi, taki jak **CLI** do sprawdzania brakujących tłumaczeń**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** i **[umiejętności agenta](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, aby praca programisty (DX) była jeszcze płynniejsza dla agentów AI.

**Automatyzacja**

Korzystaj z automatyzacji, aby tłumaczyć w swoim potoku CI/CD przy użyciu wybranego LLM na koszt dostawcy sztucznej inteligencji. Intlayer oferuje także **kompilator** do automatyzacji ekstrakcji treści, a także [platformę internetową] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), która pomaga **tłumaczyć w tle**.

**Wydajność**

Łączenie ogromnych plików JSON z komponentami może prowadzić do problemów z wydajnością i reaktywnością. Inlayer optymalizuje ładowanie treści w czasie kompilacji.

**Skalowanie bez użycia dewelopera**

Więcej niż tylko rozwiązanie i18n, Intlayer zapewnia **samodzielny [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** i **[pełny CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, który pomoże Ci zarządzać wielojęzyczną treścią w **w czasie rzeczywistym**, dzięki czemu współpraca z tłumaczami, copywriterami i innymi członkami zespołu będzie płynna. Treść może być przechowywana lokalnie i/lub zdalnie.

---

## Przewodnik krok po kroku konfiguracji Intlayer w aplikacji Vanilla JS

<Steps>

<Step number={1} title="Instalacja zależności">

Zainstaluj niezbędne pakiety za pomocą npm:

```bash packageManager="npm"
# Wygeneruj samodzielny pakiet intlayer i vanilla-intlayer
# Ten plik zostanie zaimportowany do Twojego pliku HTML
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Zainicjuj intlayer z plikiem konfiguracyjnym
npx intlayer init --no-gitignore

# Zbuduj słowniki
npx intlayer build
```

```bash packageManager="pnpm"
# Wygeneruj samodzielny pakiet intlayer i vanilla-intlayer
# Ten plik zostanie zaimportowany do Twojego pliku HTML
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Zainicjuj intlayer z plikiem konfiguracyjnym
pnpm intlayer init --no-gitignore

# Zbuduj słowniki
pnpm intlayer build
```

```bash packageManager="yarn"
# Wygeneruj samodzielny pakiet intlayer i vanilla-intlayer
# Ten plik zostanie zaimportowany do Twojego pliku HTML
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Zainicjuj plik konfiguracyjny intlayer, TypeScript jeśli skonfigurowany, zmienne środowiskowe
yarn intlayer init --no-gitignore

# Zbuduj słowniki
yarn intlayer build
```

```bash packageManager="bun"
# Wygeneruj samodzielny pakiet intlayer i vanilla-intlayer
# Ten plik zostanie zaimportowany do Twojego pliku HTML
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Zainicjuj intlayer z plikiem konfiguracyjnym
bun x intlayer init --no-gitignore

# Zbuduj słowniki
bun x intlayer build
```

- **intlayer**
  Główny pakiet dostarczający narzędzia do międzynarodowienia w zakresie zarządzania konfiguracją, tłumaczenia, [deklarowania treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilacji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

- **vanilla-intlayer**
  Pakiet integrujący Intlayer z czystymi aplikacjami JavaScript / TypeScript. Dostarcza singleton pub/sub (`IntlayerClient`) oraz pomocników opartych na callbackach (`useIntlayer`, `useLocale` itp.), dzięki czemu każda część Twojej aplikacji może reagować na zmiany języka bez zależności od frameworka UI.

> Eksport bundlingu z CLI `intlayer standalone` generuje zoptymalizowaną kompilację dzięki usuwaniu nieużywanych kodów (tree-shaking) nieużywanych pakietów, lokalizacji i nieistotnej logiki (takiej jak przekierowania lub prefiksy), specyficznych dla Twojej konfiguracji.

</Step>

<Step number={2} title="Konfiguracja Twojego projektu">

Utwórz plik konfiguracyjny, aby skonfigurować języki Twojej aplikacji:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Twoje inne języki
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Za pomocą tego pliku konfiguracyjnego możesz ustawić zlokalizowane adresy URL, przekierowania middleware, nazwy ciasteczek, lokalizację i rozszerzenie deklaracji treści, wyłączyć logi Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

</Step>

<Step number={3} title="Zaimportuj pakiet do HTML">

Po wygenerowaniu pakietu `intlayer.js`, możesz go zaimportować do swojego pliku HTML:

```html fileName="index.html"
<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />

    <!-- Zaimportuj pakiet -->
    <script src="./intlayer.js" defer></script>
    <!-- Zaimportuj swój główny skrypt -->
    <script src="./src/main.js" defer></script>
  </head>
  <body>
    <h1 id="title"></h1>
    <p class="read-the-docs"></p>
  </body>
</html>
```

Pakiet udostępnia `Intlayer` i `VanillaIntlayer` jako obiekty globalne na `window`.

</Step>

<Step number={4} title="Uruchom Intlayer w punkcie wejścia">

W swoim `src/main.js` wywołaj `installIntlayer()` **zanim** jakakolwiek treść zostanie wyrenderowana, aby globalny singleton języka był gotowy.

```javascript fileName="src/main.js"
const { installIntlayer } = window.VanillaIntlayer;

// Musi zostać wywołane przed renderowaniem jakiejkolwiek treści i18n.
installIntlayer();
```

Jeśli chcesz również używać renderera markdown, wywołaj `installIntlayerMarkdown()`:

```javascript fileName="src/main.js"
const { installIntlayer, installIntlayerMarkdown } = window.VanillaIntlayer;

installIntlayer();
installIntlayerMarkdown();
```

</Step>

<Step number={5} title="Zadeklaruj swoje treści">

Twórz i zarządzaj swoimi deklaracjami treści, aby przechowywać tłumaczenia:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Kliknij na logo Vite, aby dowiedzieć się więcej",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Vanilla",
    "viteLogoLabel": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite Logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "count": {
      "nodeType": "insertion",
      "insertion": {
        "nodeType": "translation",
        "translation": {
          "en": "count is {{count}}",
          "fr": "le compte est {{count}}",
          "es": "el recuento es {{count}}"
        }
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite logo to learn more",
        "fr": "Cliquez sur le logo Vite pour en savoir plus",
        "es": "Kliknij na logo Vite, aby dowiedzieć się więcej"
      }
    }
  }
}
```

> Deklaracje treści mogą być definiowane w dowolnym miejscu aplikacji, o ile znajdują się w katalogu `contentDir` (domyślnie `./src`) i pasują do rozszerzenia pliku deklaracji treści (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).
>
> Więcej szczegółów znajdziesz w [dokumentacji deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

</Step>

<Step number={6} title="Użyj Intlayer w swoim JavaScript">

Obiekt `window.VanillaIntlayer` dostarcza pomocników API: `useIntlayer(key, locale?)` zwraca przetłumaczoną treść dla danego klucza.

```javascript fileName="src/main.js"
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;

installIntlayer();

// Pobierz początkową treść dla bieżącego języka.
// Podepnij .onChange(), aby otrzymywać powiadomienia o każdej zmianie języka.
const content = useIntlayer("app").onChange((newContent) => {
  // Ponownie wyrenderuj lub zaktualizuj tylko dotknięte węzły DOM
  document.querySelector("h1").textContent = String(newContent.title);
  document.querySelector(".read-the-docs").textContent = String(
    newContent.readTheDocs
  );
});

// Początkowy render
document.querySelector("h1").textContent = String(content.title);
document.querySelector(".read-the-docs").textContent = String(
  content.readTheDocs
);
```

> Uzyskuj dostęp do wartości liści jako ciągów znaków, owijając je w `String()`, co wywołuje metodę `toString()` węzła i zwraca przetłumaczony tekst.
>
> Gdy potrzebujesz wartości dla natywnego atrybutu HTML (np. `alt`, `aria-label`), użyj bezpośrednio `.value`:
>
> ```javascript
> img.alt = content.viteLogoLabel.value;
> ```

</Step>

<Step number={7} title="Zmień język swojej treści" isOptional={true}>

Aby zmienić język treści, użyj funkcji `setLocale` udostępnianej przez `useLocale`.

```javascript fileName="src/locale-switcher.js"
const { getLocaleName } = window.Intlayer;
const { useLocale } = window.VanillaIntlayer;

export function setupLocaleSwitcher(container) {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Język");

  const render = (currentLocale) => {
    select.innerHTML = availableLocales
      .map(
        (loc) =>
          `<option value="${loc}"${loc === currentLocale ? " selected" : ""}>
            ${getLocaleName(loc)}
          </option>`
      )
      .join("");
  };

  render(locale);
  container.appendChild(select);

  select.addEventListener("change", () => setLocale(select.value));

  // Utrzymuj listę rozwijaną w synchronizacji, gdy język zmieni się z innego miejsca
  return subscribe((newLocale) => render(newLocale));
}
```

</Step>

<Step number={8} title="Przełącz atrybuty języka i kierunku HTML" isOptional={true}>

Zaktualizuj atrybuty `lang` i `dir` tagu `<html>`, aby pasowały do bieżącego języka dla dostępności i SEO.

```javascript fileName="src/main.js"
const { getHTMLTextDir } = window.Intlayer;
const { installIntlayer, useLocale } = window.VanillaIntlayer;

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

</Step>

<Step number={9} title="Leniwe ładowanie słowników na język" isOptional={true}>

Jeśli chcesz leniwie ładować słowniki dla każdego języka, możesz użyć `useDictionaryDynamic`. Jest to przydatne, jeśli nie chcesz pakować wszystkich tłumaczeń w początkowym pliku `intlayer.js`.

```javascript fileName="src/app.js"
const { installIntlayer, useDictionaryDynamic } = window.VanillaIntlayer;

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1").textContent = String(content.title);
});
```

> Uwaga: `useDictionaryDynamic` wymaga, aby słowniki były dostępne jako oddzielne pliki ESM. Podejście to jest zazwyczaj stosowane, jeśli masz serwer WWW serwujący słowniki.
> </Step>

</Steps>

### Konfiguracja TypeScript

Upewnij się, że Twoja konfiguracja TypeScript zawiera automatycznie generowane typy.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Rozszerzenie VS Code

Aby poprawić wrażenia z programowania z Intlayer, możesz zainstalować oficjalne **Rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie zapewnia:

- **Autouzupełnianie** dla kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podgląd wewnątrz kodu** przetłumaczonej treści.
- **Szybkie akcje**, aby łatwo tworzyć i aktualizować tłumaczenia.

Więcej szczegółów na temat korzystania z rozszerzenia znajdziesz w [dokumentacji rozszerzenia Intlayer dla VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Idź dalej

Aby pójść dalej, możesz zaimplementować [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub wyeksportować swoje treści za pomocą [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

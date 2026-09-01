---
createdAt: 2026-03-31
updatedAt: 2026-05-31
title: "Vanilla JS i18n - Kompletny przewodnik po tłumaczeniu swojej aplikacji"
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
author: aymericzip
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

<AccordionGroup>
<Accordion header="Pełne pokrycie Vanilla JS">

Intlayer jest zoptymalizowany do doskonałej współpracy z Vanilla JavaScript, oferując **zarządzanie treścią niezależnie od platformy**, **obsługę TypeScript** i wszystkie funkcje potrzebne do skalowania internacjonalizacji (i18n).

</Accordion>

<Accordion header="Rozmiar bundle'a">

Zamiast ładować ogromne pliki JSON na swoje strony, ładuj tylko niezbędną treść. Intlayer pomaga **zmniejszyć rozmiary bundle'a i stron nawet o 50%**.

</Accordion>

<Accordion header="Łatwość konserwacji">

Określanie zakresu zawartości aplikacji **ułatwia konserwację** aplikacji na dużą skalę. Możesz powielić lub usunąć pojedynczy folder funkcji bez obciążania psychicznego koniecznością przeglądania całej bazy kodu zawartości. Dodatkowo Inlayer jest **w pełni napisany**, aby zapewnić dokładność treści.

</Accordion>

<Accordion header="Agent AI">

Wspólna lokalizacja treści **zmniejsza potrzebny kontekst** dzięki modelom dużego języka (LLM). Intlayer zawiera także zestaw narzędzi, taki jak **CLI** do sprawdzania brakujących tłumaczeń**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** i **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)**, aby praca programisty (DX) była jeszcze płynniejsza dla agentów AI.

</Accordion>

<Accordion header="Automatyzacja">

Korzystaj z automatyzacji, aby tłumaczyć w swoim potoku CI/CD przy użyciu wybranego LLM na koszt dostawcy sztucznej inteligencji. Intlayer oferuje także **kompilator** do automatyzacji ekstrakcji treści, a także [platformę internetową] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), która pomaga **tłumaczyć w tle**.

</Accordion>

<Accordion header="Wydajność">

Łączenie ogromnych plików JSON z komponentami może prowadzić do problemów z wydajnością i reaktywnością. Inlayer optymalizuje ładowanie treści w czasie kompilacji.

</Accordion>

<Accordion header="Skalowanie bez użycia dewelopera">

Więcej niż tylko rozwiązanie i18n, Intlayer zapewnia **samodzielny [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** i **[pełny CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, który pomoże Ci zarządzać wielojęzyczną treścią w **w czasie rzeczywistym**, dzięki czemu współpraca z tłumaczami, copywriterami i innymi członkami zespołu będzie płynna. Treść może być przechowywana lokalnie i/lub zdalnie.

</Accordion>
</AccordionGroup>

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

> Deklaracje treści mogą być definiowane w dowolnym miejscu aplikacji, o ile znajdują się w katalogu `contentDir` (domyślnie `./src`) i pasują do rozszerzenia pliku deklaracji treści (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
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

## Często Zadawane Pytania

<FAQ>

<Question title="Czy mogę używać Intlayer bez bundlera lub frameworka?">

Tak. Temu poświęcony jest ten przewodnik. Importujesz paczkę `vanilla-intlayer` bezpośrednio w swoim pliku HTML, jak pokazuje krok 3, inicjalizujesz ją i odczytujesz treść za pomocą `useIntlayer` lub `getIntlayer`.

</Question>

<Question title="O ile i18n zwiększa wagę mojej strony?">

W znacznie mniejszym stopniu niż tradycyjny katalog runtime, ponieważ strona nigdy nie pobiera języka, którego nie renderuje. Treść jest pobierana w zoptymalizowanych formatach, redukując wagę strony w porównaniu z alternatywami. Zobacz [optymalizację bundle'a](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md).

</Question>

<Question title="Czy mogę zmigrować z i18next bez przepisywania moich skryptów?">

W znacznej mierze tak. Postępuj zgodnie z [przewodnikiem migracji z i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_i18next_to_intlayer.md), aby przenieść treść. Możesz także zachować obecne API za pośrednictwem adapterów kompatybilności.

</Question>

<Question title="Czy mogę zachować moje istniejące pliki tłumaczeń JSON?">

Tak. Wtyczka [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md) utrzymuje Twoje pliki `/messages/{locale}/{namespace}.json` jako źródło prawdy i generuje z nich słowniki Intlayer w obu kierunkach. Wtyczka [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-po.md) robi to samo dla katalogów gettext, a [pliki per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/per_locale_file.md) pozwalają rozdzielić zawartość według języka zamiast grupować lokalizacje w jednym pliku.

</Question>

<Question title="Czy muszę przenosić moją zawartość klucz po kluczu?">

Nie. Uruchom `npx intlayer extract`, a Intlayer odczyta Twoje pliki źródłowe, wyodrębni ciągi widoczne dla użytkownika i utworzy plik `.content` obok każdego z nich, dzięki czemu przeglądasz diff zamiast ręcznie kopiować ciągi do katalogu pojedynczo.

W przypadku w pełni zautomatyzowanego procesu [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) robi to samo w czasie kompilacji kodu źródłowego JSX, TSX, Vue i Svelte, generując słowniki przy każdej zmianie, dzięki czemu nie trzeba ręcznie zarządzać kluczami. Działa w oparciu o analizę statyczną, więc ciągi znaków istniejące tylko w czasie wykonywania pozostają poza zasięgiem, a rozróżnienie tekstu dla użytkownika od logiki aplikacji wymaga kilku adnotacji.

</Question>

<Question title="Jakie narzędzia dla edytora i agentów AI są dostępne?">

Pięć narzędzi, wszystkie opcjonalne:

- **[Rozszerzenie VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)**: przejście od klucza `useIntlayer` do pliku treści, który go deklaruje, wyodrębnianie treści z komponentu oraz uruchamianie build, fill, test, push i pull z palety poleceń lub dedykowanej karty Intlayer.
- **[Serwer LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/lsp.md)**: taka sama świadomość w dowolnym edytorze obsługującym LSP, z funkcjami przejdź do definicji (go to definition), znajdź wszystkie referencje, podglądem przetłumaczonej wartości po najechaniu kursorem, autouzupełnianiem kluczy i pól oraz ostrzeżeniem, gdy klucz nie jest nigdzie zadeklarowany. Rozpoznaje również wywołania `i18next`, `react-i18next`, `next-intl` i `use-intl`, co ułatwia migrację.
- **[Serwer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md)**: udostępnia dokumentację i CLI Intlayer dla Cursor, VS Code, Claude Desktop, Claude Code i ChatGPT, dzięki czemu asystent odpowiada na podstawie aktualnej dokumentacji zamiast zgadywać i może samodzielnie wykonywać polecenia, takie jak `intlayer fill`.
- **[Umiejętności agenta (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)**: wyspecjalizowane umiejętności, takie jak `intlayer-config`, `intlayer-cli` i `intlayer-content`, oraz po jednej dla każdego frameworka, które uczą agenta konfiguracji routingu i typów węzłów treści.
- **[Wtyczka ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/eslint.md)**: reguła `no-raw-text` oznacza zakodowane na stałe ciągi tekstowe, z dodatkowymi regułami dla statycznych kluczy słownika i nieużywanej zawartości.

</Question>

<Question title="Jakie są różne rozwiązania dostępne do internacjonalizacji zwykłej witryny JavaScript?">

- **Ręcznie pisany obiekt słownika**, zwykle jeden plik JSON na język ładowany przez `fetch`: brak zależności, ale brak typowania, reguł liczby mnogiej i narzędzi do wykrywania braków.
- **`i18next`**: biblioteka ogólnego przeznaczenia ze słownikami ładowanymi w runtime.
- **`Intlayer`**: najbardziej zaawansowane rozwiązanie. Deklaracje w plikach treści, opcjonalna kompilacja w czasie budowy, typowanie, edytor wizualny i system CMS.

Zobacz [dlaczego Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/interest_of_intlayer.md).

</Question>

<Question title="Jak odczytać tłumaczenie i wstawić je do DOM?">

Wywołaj `useIntlayer` z kluczem słownika i samodzielnie przypisz wartość do węzła DOM, jak pokazuje krok 6. Ponieważ nie ma tu wirtualnego DOM, zachowujesz pełną kontrolę nad momentem aktualizacji węzłów.

</Question>

<Question title="W jaki sposób wykrywany jest język odwiedzającego?">

Ze źródeł wymienionych w `routing.storage`, zazwyczaj najpierw z ciasteczka, następnie z nagłówka `Accept-Language`, powracając do domyślnego języka. Zobacz [dokumentację konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

</Question>

<Question title="Jak obsługiwać języki pisane od prawej do lewej, takie jak arabski lub hebrajski?">

Krok 8 to opisuje. Funkcja `getHTMLTextDir` zwraca `ltr`, `rtl` lub `auto` dla danej lokalizacji, więc ustawiasz atrybuty `lang` i `dir` na elemencie `html` lub `body`.

</Question>

<Question title="Czy odwiedzający pobierają każdy język?">

Nie, jeśli tego nie chcesz. Krok 9 omawia leniwe ładowanie słowników na żądanie, dzięki czemu strona pobiera tylko aktywny język, a pozostałe ładuje wyłącznie wtedy, gdy użytkownik przełączy język.

</Question>

<Question title="Jak automatycznie przetłumaczyć aplikację za pomocą AI?">

Uruchom `npx intlayer fill`. Narzędzie CLI wykrywa brakujące tłumaczenia i uzupełnia je za pomocą wybranego modelu LLM, korzystając z Twojego dostawcy i klucza API. Flaga `--git-diff` ogranicza operację do treści zmienionych na bieżącej gałęzi. Zobacz [polecenie fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/fill.md) oraz [integrację CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/CI_CD.md).

</Question>

<Question title="Czy Intlayer obsługuje formy mnogie, płeć i sformatowany tekst (rich text)?">

Tak: [formy mnogie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/plurial.md), [treści zależne od płci](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/gender.md), warunki, [wstawki (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/markdown.md) dla dłuższych tekstów oraz [formatowania](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/formatters.md) dla liczb, dat i walut.

</Question>

<Question title="Jak tłumacze mogą edytować treść bez dotykania kodu?">

Za pośrednictwem [edytora wizualnego](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md), który pozwala każdemu edytować tekst bezpośrednio w działającej aplikacji, lub systemu [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md), który wyodrębnia treść, dzięki czemu może być zmieniana bez konieczności ponownego wdrażania.

</Question>

<Question title="Czy Intlayer jest darmowy i open source?">

Tak, na licencji Apache 2.0, włączając zastosowania komercyjne. Hostowany CMS to opcjonalna płatna usługa, którą można również [hostować samodzielnie (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/self_hosting.md).

</Question>

</FAQ>

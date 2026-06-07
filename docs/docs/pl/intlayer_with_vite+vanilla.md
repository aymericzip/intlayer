---
createdAt: 2026-03-23
updatedAt: 2026-05-31
title: "Vite + Vanilla JS i18n - Kompletny przewodnik po tłumaczeniu swojej aplikacji"
description: "Koniec z i18next. Przewodnik 2026 do budowania wielojęzycznej (i18n) aplikacji Vite + Vanilla JS. Tłumacz z agentami AI i optymalizuj rozmiar bundle, SEO i wydajność."
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Vite
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vite-and-vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vite-vanilla-template
applicationShowcase: https://intlayer-vite-vanilla.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualizacja użycia API useIntlayer w Solid do bezpośredniego dostępu do właściwości"
  - version: 8.4.10
    date: 2026-03-23
    changes: "Początkowa historia"
---

# Przetłumacz swoją stronę Vite i Vanilla JS za pomocą Intlayer | Internacjonalizacja (i18n)

<Tabs defaultTab="code">
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-vanilla-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-175 md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vite-vanilla.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-175 md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vite-vanilla-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Spis treści

<TOC/>

## Dlaczego Interlayer zamiast alternatyw?

W porównaniu do głównych rozwiązań, takich jak `i18next` czy `i18n.js`, Intlayer jest rozwiązaniem wyposażonym w zintegrowane optymalizacje, takie jak:

**Pełny zasięg Vite**

Intlayer jest zoptymalizowany do doskonałej współpracy z Vite, oferując **zarządzanie treścią niezależnie od platformy**, **obsługę TypeScript** i wszystkie funkcje potrzebne do skalowania internacjonalizacji (i18n).

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

## Przewodnik krok po kroku dotyczący konfiguracji Intlayer w aplikacji Vite i Vanilla JS

<Steps>

<Step number={1} title="Instalacja zależności">

Zainstaluj niezbędne pakiety za pomocą npm:

```bash packageManager="npm"
npm install intlayer vanilla-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vanilla-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vanilla-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vanilla-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**
  Główny pakiet oferujący narzędzia do internacjonalizacji do zarządzania konfiguracją, tłumaczenia, [deklarowania treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilacji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

- **vanilla-intlayer**
  Pakiet integrujący Intlayer z czystymi aplikacjami JavaScript / TypeScript. Zapewnia singleton pub/sub (`IntlayerClient`) oraz pomocników opartych na wywołaniach zwrotnych (`useIntlayer`, `useLocale` itp.), dzięki czemu dowolna część aplikacji może reagować na zmiany języka bez zależności od frameworka UI.

- **vite-intlayer**
  Zawiera plugin Vite do integracji Intlayer z [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), a także middleware do wykrywania preferowanego języka użytkownika, zarządzania plikami cookie i obsługi przekierowań adresów URL.

</Step>

<Step number={2} title="Konfiguracja projektu">

Utwórz plik konfiguracyjny, aby skonfigurować języki aplikacji:

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

> Poprzez ten plik konfiguracyjny możesz skonfigurować zlokalizowane adresy URL, przekierowania middleware, nazwy plików cookie, lokalizację i rozszerzenie deklaracji treści, wyłączyć logi Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

</Step>

<Step number={3} title="Integracja Intlayer w konfiguracji Vite">

Dodaj wtyczkę intlayer do swojej konfiguracji.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

> Wtyczka `intlayer()` Vite jest używana do integracji Intlayer z Vite. Zapewnia budowanie plików deklaracji treści i monitoruje je w trybie deweloperskim. Definiuje zmienne środowiskowe Intlayer w aplikacji Vite. Ponadto udostępnia aliasy w celu optymalizacji wydajności.

</Step>

<Step number={4} title="Uruchomienie Intlayer w punkcie wejścia">

Wywołaj `installIntlayer()` **przed** wyrenderowaniem jakiejkolwiek treści, aby globalny singleton języka był gotowy.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "vanilla-intlayer";

// Musi być wywołane przed renderowaniem jakiejkolwiek treści i18n.
installIntlayer();

// Zaimportuj i uruchom moduły aplikacji.
import "./app.js";
```

Jeśli używasz również deklaracji treści `md()` (Markdown), zainstaluj również renderer markdown:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "vanilla-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./app.js";
```

</Step>

<Step number={5} title="Deklaracja treści">

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
      es: "Kliknij logo Vite, aby dowiedzieć się więcej",
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
        "fr": "Kliknij logo Vite, aby dowiedzieć się więcej",
        "es": "Kliknij logo Vite, aby dowiedzieć się więcej"
      }
    }
  }
}
```

> Deklaracje treści mogą być definiowane w dowolnym miejscu w aplikacji, o ile znajdują się w katalogu `contentDir` (domyślnie `./src`) i pasują do rozszerzenia pliku deklaracji treści (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Więcej szczegółów znajdziesz w [dokumentacji deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

</Step>

<Step number={6} title="Użycie Intlayer w JavaScript">

`vanilla-intlayer` odzwierciedla API powierzchniowe `react-intlayer`: `useIntlayer(key, locale?)` zwraca przetłumaczoną treść bezpośrednio. Wywołaj `.onChange()` na wyniku, aby zasubskrybować zmiany języka - co jest jawnym odpowiednikiem re-renderu w React.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

// Pobierz początkową treść dla aktualnego języka.
// Wywołaj .onChange(), aby otrzymywać powiadomienia o każdej zmianie języka.
const content = useIntlayer("app").onChange((newContent) => {
  // Przerenderuj lub zaktualizuj tylko dotknięte węzły DOM
  document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
    newContent.title
  );
  document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
    String(newContent.readTheDocs);
});

// Renderewanie początkowe
document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
  content.title
);
document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
  String(content.readTheDocs);
```

> Uzyskuj dostęp do wartości liści jako ciągów znaków, owijając je w `String()`, co wywołuje metodę `toString()` węzła i zwraca przetłumaczony tekst.
>
> Jeśli potrzebujesz wartości dla natywnego atrybutu HTML (np. `alt`, `aria-label`), użyj bezpośrednio `.value`:
>
> ```typescript
> img.alt = content.viteLogoLabel.value;
> ```

</Step>

<Step number={7} title="Zmiana języka treści" isOptional={true}>

Aby zmienić język treści, użyj funkcji `setLocale` udostępnionej przez `useLocale`.

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { getLocaleName } from "intlayer";
import { useLocale } from "vanilla-intlayer";

export function setupLocaleSwitcher(container: HTMLElement): () => void {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Language");

  const render = (currentLocale: string) => {
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

  select.addEventListener("change", () => setLocale(select.value as any));

  // Synchronizuj listę rozwijaną, gdy język zmieni się gdzie indziej
  return subscribe((newLocale) => render(newLocale));
}
```

</Step>

<Step number={8} title="Renderowanie treści Markdown i HTML" isOptional={true}>

Intlayer obsługuje deklaracje treści `md()` i `html()`. W czystym JS skompilowana treść jest wstawiana jako surowy HTML za pomocą `innerHTML`.

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/main.ts` and save to test **HMR**",
        fr: "Modifiez `src/main.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/main.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

Kompilacja i wstrzykiwanie HTML:

```typescript fileName="src/main.ts" codeFormat="typescript"
import {
  compileMarkdown,
  installIntlayerMarkdown,
  useIntlayer,
} from "vanilla-intlayer";

installIntlayerMarkdown();

const content = useIntlayer("app").onChange((newContent) => {
  const el = document.querySelector<HTMLDivElement>(".edit-note")!;
  el.innerHTML = compileMarkdown(String(newContent.editNote));
});

document.querySelector<HTMLDivElement>(".edit-note")!.innerHTML =
  compileMarkdown(String(content.editNote));
```

> [!TIP]
> `String(content.editNote)` wywołuje `toString()` na `IntlayerNode`, co zwraca surowy ciąg znaków Markdown. Przekaż go do `compileMarkdown`, aby uzyskać ciąg HTML, a następnie ustaw za pomocą `innerHTML`.

> [!WARNING]
> Używaj `innerHTML` tylko z zaufaną treścią. Jeśli markdown pochodzi od użytkownika, najpierw go zneutralizuj (np. za pomocą DOMPurify). Możesz zainstalować renderer neutralizujący dynamicznie:
>
> ```typescript
> import { installIntlayerMarkdownDynamic } from "vanilla-intlayer";
>
> await installIntlayerMarkdownDynamic(async () => {
>   const DOMPurify = await import("dompurify");
>   return (markdown) => DOMPurify.sanitize(compileMarkdown(markdown));
> });
> ```

</Step>

<Step number={9} title="Dodawanie zlokalizowanego routingu do aplikacji" isOptional={true}>

Aby stworzyć unikalne trasy dla każdego języka (przydatne dla SEO), możesz użyć `intlayerProxy` w konfiguracji Vite do wykrywania języka po stronie serwera.

Najpierw dodaj `intlayerProxy` do konfiguracji Vite:

> Pamiętaj, że aby używać `intlayerProxy` na produkcji, musisz przenieść `vite-intlayer` z `devDependencies` do `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // powinien być umieszczony jako pierwszy
    intlayer(),
  ],
});
```

</Step>

<Step number={10} title="Zmiana adresu URL przy zmianie języka" isOptional={true}>

Aby aktualizować adres URL w przeglądarce przy zmianie języka, wywołaj `useRewriteURL()` po zainstalowaniu Intlayer:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useRewriteURL } from "vanilla-intlayer";

installIntlayer();

// Przepisuje adres URL natychmiast i przy każdej kolejnej zmianie języka.
// Zwraca funkcję anulującą subskrypcję w celu wyczyszczenia.
const stopRewriteURL = useRewriteURL();
```

</Step>

<Step number={11} title="Przełączanie atrybutów języka i kierunku tekstu HTML" isOptional={true}>

Zaktualizuj atrybuty `lang` i `dir` tagu `<html>`, aby odpowiadały aktualnemu językowi w celu ułatwienia dostępu i SEO.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";
import { installIntlayer, useLocale } from "vanilla-intlayer";

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

</Step>

<Step number={12} title="Leniwe ładowanie słowników na język" isOptional={true}>

W przypadku dużych aplikacji możesz chcieć podzielić słownik każdego języka na osobny fragment. Użyj `useDictionaryDynamic` wraz z dynamicznym `import()` z Vite:

```typescript fileName="src/app.ts" codeFormat="typescript"
import { installIntlayer, useDictionaryDynamic } from "vanilla-intlayer";

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1")!.textContent = String(content.title);
});
```

> Pakiet każdego języka jest pobierany tylko wtedy, gdy ten język stanie się aktywny, a wynik jest buforowany - kolejne przełączenia na ten sam język są natychmiastowe.

</Step>

<Step number={13} title="Wyodrębnianie treści komponentów" isOptional={true}>

Jeśli masz istniejącą bazę kodu, przekształcanie tysięcy plików może być czasochłonne.

Aby ułatwić ten proces, Intlayer proponuje [kompilator](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) / [ekstraktor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md) do przekształcania komponentów i wyodrębniania treści.

Aby go skonfigurować, możesz dodać sekcję `compiler` w pliku `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Reszta konfiguracji
  compiler: {
    /**
     * Wskazuje, czy kompilator powinien być włączony.
     */
    enabled: true,

    /**
     * Definiuje ścieżkę do plików wyjściowych
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Wskazuje, czy komponenty powinny zostać zapisane po przekształceniu.
     * W ten sposób kompilator można uruchomić tylko raz, aby przekształcić aplikację, a następnie go usunąć.
     */
    saveComponents: false,

    /**
     * Prefiks klucza słownika
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Polecenie Extract'>

Uruchom ekstraktor, aby przekształcić komponenty i wyodrębnić treść

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Kompilator Babel'>

Zaktualizuj `vite.config.ts`, aby dołączyć wtyczkę `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Dodaje wtyczkę kompilatora
  ],
});
```

```bash packageManager="npm"
npm run build # Lub npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Lub pnpm run dev
```

```bash packageManager="yarn"
yarn build # Lub yarn dev
```

```bash packageManager="bun"
bun run build # Lub bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### (Opcjonalnie) Sitemap i robots.txt (generacja przy buildzie)

Intlayer udostępnia `generateSitemap` i `getMultilingualUrls` - narzędzia do formatowania wielojęzycznych plików `sitemap.xml` i `robots.txt` dla crawlerów i automatycznego zapisu do `public/`. Zwykle uruchamia się mały skrypt Node **przed** Vite (np. hooki npm `predev` / `prebuild`).

#### Sitemap

Generator sitemap uwzględnia locale i dodaje metadane dla crawlerów.

> Sitemap obsługuje przestrzeń nazw `xhtml:link` (hreflang). Zamiast płaskiej listy URL Intlayer tworzy dwukierunkowe powiązania wszystkich wersji językowych strony (np. `/about`, `/fr/about` lub `/about?lang=fr` w zależności od routingu).

#### Robots.txt

Użyj `getMultilingualUrls`, by reguły `Disallow` obejmowały wszystkie zlokalizowane warianty ścieżek.

#### 1. Plik `generate-seo.mjs` w katalogu głównym

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

Pakiet `intlayer` musi być zainstalowany. W produkcji ustaw `SITE_URL` w środowisku (np. w CI).

> Preferuj `generate-seo.mjs` dla ESM w Node. Przy `generate-seo.js` ustaw `"type": "module"` w `package.json` lub włącz ESM inaczej.

#### 2. Uruchom skrypt przed Vite

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Dostosuj polecenia dla pnpm lub yarn. Możesz też wywołać skrypt z CI.

### Konfiguracja TypeScript

Upewnij się, że konfiguracja TypeScript zawiera automatycznie generowane typy.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć ich zatwierdzania w repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```bash
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

### Rozszerzenie VS Code

Aby poprawić wrażenia z programowania z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer VS Code**.

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie zapewnia:

- **Autouzupełnianie** dla kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podgląd wierszowy** przetłumaczonej treści.
- **Szybkie akcje** do łatwego tworzenia i aktualizowania tłumaczeń.

Więcej szczegółów na temat korzystania z rozszerzenia znajdziesz w [dokumentacji rozszerzenia Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Idź dalej

Aby pójść dalej, możesz zaimplementować [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub wyeksportować treść za pomocą [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

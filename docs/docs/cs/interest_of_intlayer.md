---
createdAt: 2024-08-14
updatedAt: 2025-09-27
title: Výhody Intlayer
description: Objevte výhody a přednosti používání Intlayer ve vašich projektech. Pochopte, proč Intlayer vyniká mezi ostatními frameworky.
keywords:
  - Výhody
  - Přednosti
  - Intlayer
  - Framework
  - Porovnání
slugs:
  - doc
  - why
history:
  - version: 7.3.1
    date: 2025-11-27
    changes: "Vydání překladače"
  - version: 5.8.0
    date: 2025-08-19
    changes: "Aktualizace srovnávací tabulky"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inicializace historie"
---

# Proč byste měli zvážit Intlayer?

## Co je Intlayer?

**Intlayer** je knihovna pro internacionalizaci navržená speciálně pro vývojáře v JavaScriptu. Umožňuje deklarovat obsah kdekoli ve vašem kódu. Převádí deklarace vícejazyčného obsahu do strukturovaných slovníků, které lze snadno integrovat do vašeho kódu. Díky použití TypeScriptu činí **Intlayer** váš vývoj robustnějším a efektivnějším.

## Proč byl Intlayer vytvořen?

Intlayer byl vytvořen, aby vyřešil běžný problém, který postihuje všechny běžné i18n knihovny, jako jsou `next-intl`, `react-i18next`, `react-intl`, `next-i18next`, `react-intl` a `vue-i18n`.

Všechna tato řešení využívají centralizovaný přístup k výpisu a správě vašeho obsahu. Například:

```bash
.
├── locales
│   ├── en.json
│   ├── es.json
│   └── fr.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

Nebo zde s použitím jmenných prostorů (namespaces):

```bash
.
├── locales
│   ├── en
│   │  ├── footer.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── footer.json
│   │  └── navbar.json
│   └── es
│      ├── footer.json
│      └── navbar.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

Tento typ architektury zpomaluje proces vývoje a komplikuje údržbu kódu z několika důvodů:

1. **U každé nově vytvořené komponenty byste měli:**
   - Vytvořit nový prostředek/jmenný prostor ve složce `locales`
   - Nezapomenout importovat nový jmenný prostor ve vaší stránce
   - Přeložit váš obsah (často prováděno ručně kopírováním/vkládáním od poskytovatelů AI)

2. **Při jakékoli změně provedené na vašich komponentách byste měli:**
   - Hledat související prostředek/jmenný prostor (daleko od komponenty)
   - Přeložit váš obsah
   - Zajistit, aby byl váš obsah aktuální pro jakékoli národní prostředí (locale)
   - Ověřit, zda váš jmenný prostor neobsahuje nepoužívané klíče/hodnoty
   - Zajistit, aby struktura vašich JSON souborů byla stejná pro všechna národní prostředí

U profesionálních projektů používajících tato řešení se často využívají lokalizační platformy, které pomáhají se správou překladů obsahu. U velkých projektů se to však může rychle prodražit.

K vyřešení tohoto problému Intlayer přejímá přístup, který omezuje rozsah vašeho obsahu na úroveň komponenty a udržuje váš obsah v blízkosti komponenty, podobně jako to často děláme s CSS (`styled-components`), typy, dokumentací (`storybook`) nebo jednotkovými testy (`jest`).

```bash codeFormat="typescript"
.
└── components
    └── MyComponent
        ├── index.content.ts
        ├── index.test.tsx
        ├── index.stories.tsx
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── components
    └── MyComponent
        ├── index.content.cjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```bash codeFormat="esm"
.
└── components
    └── MyComponent
        ├── index.content.mjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```tsx fileName="./components/MyComponent/index.content.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```tsx fileName="./components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

Tento přístup vám umožňuje:

1. **Zrychlit vývoj**
   - Soubory `.content.{{ts|mjs|cjs|json}}` lze vytvářet pomocí rozšíření pro VSCode
   - Nástroje AI pro automatické doplňování ve vašem IDE (jako je GitHub Copilot) vám mohou pomoci s deklarací obsahu, čímž se omezí kopírování/vkládání

2. **Vyčistit vaši kódovou základnu**
   - Snížit složitost
   - Zlepšit udržovatelnost

3. **Snadněji duplikovat vaše komponenty a jejich související obsah (např. komponenty pro přihlášení/registraci atd.)**
   - Omezením rizika ovlivnění obsahu jiných komponent
   - Kopírováním/vkládáním vašeho obsahu z jedné aplikace do druhé bez externích závislostí

4. **Vyhnout se znečištění kódové základny nepoužívanými klíči/hodnotami u nepoužívaných komponent**
   - Pokud komponentu nepoužíváte, Intlayer neimportuje její související obsah
   - Pokud komponentu smažete, snáze si vzpomenete na smazání jejího souvisejícího obsahu, protože bude přítomen ve stejné složce

5. **Snížit náklady na uvažování (reasoning costs) pro agenty AI při deklaraci vašeho vícejazyčného obsahu**
   - Agent AI nebude muset prohledávat celou kódovou základnu, aby věděl, kam váš obsah implementovat
   - Překlady lze snadno provést pomocí nástrojů AI pro automatické doplňování ve vašem IDE (jako je GitHub Copilot)

6. **Optimalizovat výkon načítání**
   - Pokud je komponenta načítána opožděně (lazy-loaded), její související obsah se načte ve stejnou chvíli

## Další funkce Intlayer

| Funkce                                                                                                                    | Popis                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ![Funkce](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                           | **Podpora napříč frameworky**<br><br>Intlayer je kompatibilní se všemi hlavními frameworky a knihovnami, včetně Next.js, React, Vite, Vue.js, Nuxt, Preact, Express a dalších.                                                                                                                                                                                                                                     |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)       | **Správa obsahu poháněná JavaScriptem**<br><br>Využijte flexibilitu JavaScriptu k efektivní definici a správě vašeho obsahu. <br><br> - [Deklarace obsahu](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Funkce" width="700">   | **Překladač (Compiler)**<br><br>Překladač Intlayer automaticky extrahuje obsah z komponent a generuje soubory slovníků.<br><br> - [Překladač](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **Soubor deklarace obsahu pro každé národní prostředí**<br><br>Zrychlete svůj vývoj deklarováním obsahu jednou, před automatickým generováním.<br><br> - [Soubor deklarace obsahu pro každé národní prostředí](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **Typově bezpečné prostředí**<br><br>Využijte TypeScript k zajištění bezchybnosti definic obsahu a kódu a zároveň čerpejte výhody z automatického doplňování v IDE.<br><br> - [Konfigurace TypeScriptu](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **Zjednodušené nastavení**<br><br>Rychle začněte s minimální konfigurací. Snadno upravte nastavení pro internacionalizaci, směrování, AI, sestavování a zpracování obsahu. <br><br> - [Prozkoumejte integraci Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **Zjednodušené získávání obsahu**<br><br>Není třeba volat funkci `t` pro každou část obsahu. Získejte veškerý obsah přímo pomocí jediného hooku.<br><br> - [Integrace React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **Konzistentní implementace Server Component**<br><br>Skvěle se hodí pro Next.js server components, používejte stejnou implementaci pro klientské i serverové komponenty, není třeba předávat funkci `t` skrze každou serverovou komponentu. <br><br> - [Server Components](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **Organizovaná kódová základna**<br><br>Udržujte svou kódovou základnu organizovanější: 1 komponenta = 1 slovník ve stejné složce. Překlady v blízkosti jejich příslušných komponent zvyšují udržovatelnost a přehlednost. <br><br> - [Jak Intlayer funguje](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **Vylepšené směrování**<br><br>Plná podpora směrování aplikací, plynule se přizpůsobující komplexním strukturám aplikací, pro Next.js, React, Vite, Vue.js atd.<br><br> - [Prozkoumejte integraci Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **Podpora Markdownu**<br><br>Importujte a interpretujte lokální soubory a vzdálený Markdown pro vícejazyčný obsah, jako jsou zásady ochrany osobních údajů, dokumentace atd. Interpretujte a zpřístupněte metadata Markdownu ve vašem kódu.<br><br> - [Soubory obsahu](https://intlayer.org/doc/concept/content/file)                                                                                              |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **Zdarma vizuální editor a CMS**<br><br>Pro autory obsahu je k dispozici bezplatný vizuální editor a CMS, což eliminuje potřebu lokalizační platformy. Udržujte svůj obsah synchronizovaný pomocí Gitu nebo jej zcela či částečně externalizujte pomocí CMS.<br><br> - [Intlayer Editor](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms)                      |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **Tree-shakable obsah**<br><br>Obsah typu tree-shakable, který snižuje velikost výsledného balíčku. Načítá obsah pro každou komponentu a vylučuje jakýkoli nepoužívaný obsah z vašeho balíčku. Podporuje opožděné načítání (lazy loading) pro zvýšení efektivity načítání aplikace. <br><br> - [Optimalizace sestavení aplikace](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **Statické vykreslování (Static Rendering)**<br><br>Neblokuje statické vykreslování. <br><br> - [Integrace Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **Překlad s podporou AI**<br><br>Převeďte svůj web do 231 jazyků jediným kliknutím pomocí pokročilých nástrojů pro překlad poháněných AI od Intlayer s využitím vlastního poskytovatele AI/klíče API. <br><br> - [Integrace CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [Automatické vyplňování](https://intlayer.org/doc/concept/auto-fill) |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **Integrace serveru MCP**<br><br>Poskytuje server MCP (Model Context Protocol) pro automatizaci IDE, což umožňuje bezproblémovou správu obsahu a pracovní postupy i18n přímo ve vašem vývojovém prostředí. <br><br> - [Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/cs/mcp_server.md)                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **Rozšíření pro VSCode**<br><br>Intlayer poskytuje rozšíření pro VSCode, které vám pomůže spravovat obsah a překlady, vytvářet slovníky, překládat obsah a další. <br><br> - [Rozšíření pro VSCode](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **Interoperabilita**<br><br>Umožňuje interoperabilitu s react-i18next, next-i18next, next-intl a react-intl. <br><br> - [Intlayer a react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer a next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer a next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                                        |
| Testování chybějících překladů (CLI/CI)                                                                                   | ✅ CLI: npx intlayer content test (audit vhodný pro CI)                                                                                                                                                                                                                                                                                                                                                            |

## Porovnání Intlayer s jinými řešeními

| Funkce                                         | `intlayer`                                                                                                                    | `react-i18next`                                                                                                          | `react-intl` (FormatJS)                                                                                                                          | `lingui`                                                             | `next-intl`                                                                                                              | `next-i18next`                                                                                                           | `vue-i18n`                                                            |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| **Překlady v blízkosti komponent**             | ✅ Ano, obsah je umístěn u každé komponenty                                                                                   | ❌ Ne                                                                                                                    | ❌ Ne                                                                                                                                            | ❌ Ne                                                                | ❌ Ne                                                                                                                    | ❌ Ne                                                                                                                    | ✅ Ano - při použití `Single File Components` (SFCs)                  |
| **Integrace TypeScriptu**                      | ✅ Pokročilá, automaticky generované striktní typy                                                                            | ⚠️ Základní; pro bezpečnost je nutná dodatečná konfigurace                                                               | ✅ Dobrá, ale méně striktní                                                                                                                      | ⚠️ Typování vyžaduje konfiguraci                                     | ✅ Dobrá                                                                                                                 | ⚠️ Základní                                                                                                              | ✅ Dobrá (typy jsou k dispozici; bezpečnost klíčů vyžaduje nastavení) |
| **Detekce chybějících překladů**               | ✅ Zvýraznění chyb TypeScriptu a chyba/varování při sestavení                                                                 | ⚠️ Většinou záložní (fallback) řetězce při běhu                                                                          | ⚠️ Záložní řetězce                                                                                                                               | ⚠️ Vyžaduje dodatečnou konfiguraci                                   | ⚠️ Záložní řešení při běhu                                                                                               | ⚠️ Záložní řešení při běhu                                                                                               | ⚠️ Záložní řešení/varování při běhu (konfigurovatelné)                |
| **Bohatý obsah (JSX/Markdown/komponenty)**     | ✅ Přímá podpora                                                                                                              | ⚠️ Omezeno / pouze interpolace                                                                                           | ⚠️ ICU syntaxe, nikoli skutečné JSX                                                                                                              | ⚠️ Omezeno                                                           | ❌ Není navrženo pro bohaté uzly                                                                                         | ⚠️ Omezeno                                                                                                               | ⚠️ Omezeno (komponenty přes `<i18n-t>`, Markdown přes pluginy)        |
| **Překlad s podporou AI**                      | ✅ Ano, podporuje více poskytovatelů AI. Použitelné s vlastními klíči API. Bere v úvahu kontext vaší aplikace a rozsah obsahu | ❌ Ne                                                                                                                    | ❌ Ne                                                                                                                                            | ❌ Ne                                                                | ❌ Ne                                                                                                                    | ❌ Ne                                                                                                                    | ❌ Ne                                                                 |
| **Vizuální editor**                            | ✅ Ano, lokální vizuální editor + volitelné CMS; může externalizovat obsah kódové základny; lze vložit (embed)                | ❌ Ne / dostupné přes externí lokalizační platformy                                                                      | ❌ Ne / dostupné přes externí lokalizační platformy                                                                                              | ❌ Ne / dostupné přes externí lokalizační platformy                  | ❌ Ne / dostupné přes externí lokalizační platformy                                                                      | ❌ Ne / dostupné přes externí lokalizační platformy                                                                      | ❌ Ne / dostupné přes externí lokalizační platformy                   |
| **Lokalizované směrování (Routing)**           | ✅ Ano, podporuje lokalizované cesty přímo (funguje s Next.js a Vite)                                                         | ⚠️ Není vestavěno, vyžaduje pluginy (např. `next-i18next`) nebo vlastní konfiguraci routeru                              | ❌ Ne, pouze formátování zpráv, směrování musí být ruční                                                                                         | ⚠️ Není vestavěno, vyžaduje pluginy nebo ruční konfiguraci           | ✅ Vestavěno, App Router podporuje segment `[locale]`                                                                    | ✅ Vestavěno                                                                                                             | ✅ Vestavěno                                                          |
| **Dynamické generování tras**                  | ✅ Ano                                                                                                                        | ⚠️ Plugin/ekosystém nebo ruční nastavení                                                                                 | ❌ Neposkytuje se                                                                                                                                | ⚠️ Plugin/ručně                                                      | ✅ Ano                                                                                                                   | ✅ Ano                                                                                                                   | ❌ Neposkytuje se (poskytuje Nuxt i18n)                               |
| **Množné číslo**                               | ✅ Vzory založené na výčtech (enums)                                                                                          | ✅ Konfigurovatelné (pluginy jako i18next-icu)                                                                           | ✅ (ICU)                                                                                                                                         | ✅ (ICU/messageformat)                                               | ✅ Dobré                                                                                                                 | ✅ Dobré                                                                                                                 | ✅ Vestavěná pravidla pro množné číslo                                |
| **Formátování (data, čísla, měny)**            | ✅ Optimalizované formátovače (interně Intl)                                                                                  | ⚠️ Přes pluginy nebo vlastní použití Intl                                                                                | ✅ Formátovače ICU                                                                                                                               | ✅ Pomocníci ICU/CLI                                                 | ✅ Dobré (pomocníci Intl)                                                                                                | ✅ Dobré (pomocníci Intl)                                                                                                | ✅ Vestavěné formátovače data/čísel (Intl)                            |
| **Formát obsahu**                              | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml ve vývoji)                                                                        | ⚠️ .json                                                                                                                 | ✅ .json, .js                                                                                                                                    | ⚠️ .po, .json                                                        | ✅ .json, .js, .ts                                                                                                       | ⚠️ .json                                                                                                                 | ✅ .json, .js                                                         |
| **Podpora ICU**                                | ⚠️ Ve vývoji                                                                                                                  | ⚠️ Přes plugin (i18next-icu)                                                                                             | ✅ Ano                                                                                                                                           | ✅ Ano                                                               | ✅ Ano                                                                                                                   | ⚠️ Přes plugin (`i18next-icu`)                                                                                           | ⚠️ Přes vlastní formátovač/překladač                                  |
| **SEO pomocníci (hreflang, sitemap)**          | ✅ Vestavěné nástroje: pomocníci pro sitemap, robots.txt, metadata                                                            | ⚠️ Komunitní pluginy/ručně                                                                                               | ❌ Není jádrem                                                                                                                                   | ❌ Není jádrem                                                       | ✅ Dobré                                                                                                                 | ✅ Dobré                                                                                                                 | ❌ Není jádrem (pomocníky poskytuje Nuxt i18n)                        |
| **Ekosystém / Komunita**                       | ⚠️ Menší, ale rychle rostoucí a reagující                                                                                     | ✅ Největší a nejvyspělejší                                                                                              | ✅ Velká                                                                                                                                         | ⚠️ Menší                                                             | ✅ Středně velká, zaměřená na Next.js                                                                                    | ✅ Středně velká, zaměřená na Next.js                                                                                    | ✅ Velká v ekosystému Vue                                             |
| **Server-side Rendering a Server Components**  | ✅ Ano, optimalizováno pro SSR / React Server Components                                                                      | ⚠️ Podporováno na úrovni stránky, ale vyžaduje předávání t-funkcí po stromě komponent pro podřízené serverové komponenty | ⚠️ Podporováno na úrovni stránky s dodatečným nastavením, ale vyžaduje předávání t-funkcí po stromě komponent pro podřízené serverové komponenty | ✅ Podporováno, vyžaduje nastavení                                   | ⚠️ Podporováno na úrovni stránky, ale vyžaduje předávání t-funkcí po stromě komponent pro podřízené serverové komponenty | ⚠️ Podporováno na úrovni stránky, ale vyžaduje předávání t-funkcí po stromě komponent pro podřízené serverové komponenty | ✅ SSR přes Nuxt/Vue SSR (bez RSC)                                    |
| **Tree-shaking (načítat pouze použitý obsah)** | ✅ Ano, pro každou komponentu v době sestavení přes Babel/SWC pluginy                                                         | ⚠️ Většinou načítá vše (lze zlepšit jmennými prostory / rozdělením kódu)                                                 | ⚠️ Většinou načítá vše                                                                                                                           | ❌ Není výchozí                                                      | ⚠️ Částečně                                                                                                              | ⚠️ Částečně                                                                                                              | ⚠️ Částečně (s rozdělením kódu/ručním nastavením)                     |
| **Opožděné načítání (Lazy loading)**           | ✅ Ano, pro každé národní prostředí / pro každý slovník                                                                       | ✅ Ano (např. on-demand backendy/jmenné prostory)                                                                        | ✅ Ano (rozdělené balíčky národních prostředí)                                                                                                   | ✅ Ano (dynamické importy katalogů)                                  | ✅ Ano (pro každou trasu / každé národní prostředí), vyžaduje správu jmenných prostorů                                   | ✅ Ano (pro každou trasu / každé národní prostředí), vyžaduje správu jmenných prostorů                                   | ✅ Ano (asynchronní zprávy národních prostředí)                       |
| **Vyčištění nepoužívaného obsahu**             | ✅ Ano, pro každý slovník v době sestavení                                                                                    | ❌ Ne, pouze ručním segmentováním jmenných prostorů                                                                      | ❌ Ne, všechny deklarované zprávy jsou zabaleny                                                                                                  | ✅ Ano, nepoužívané klíče jsou detekovány a při sestavení odstraněny | ❌ Ne, lze spravovat ručně se správou jmenných prostorů                                                                  | ❌ Ne, lze spravovat ručně se správou jmenných prostorů                                                                  | ❌ Ne, možné pouze přes ruční lazy-loading                            |
| **Správa velkých projektů**                    | ✅ Podporuje modularitu, vhodné pro designové systémy                                                                         | ⚠️ Vyžaduje dobrou disciplínu v souborech                                                                                | ⚠️ Centrální katalogy se mohou rozrůst                                                                                                           | ⚠️ Může se stát komplexním                                           | ✅ Modulární s nastavením                                                                                                | ✅ Modulární s nastavením                                                                                                | ✅ Modulární s nastavením Vue Router/Nuxt i18n                        |

---

## Hvězdičky na GitHubu

Hvězdičky na GitHubu jsou silným ukazatelem popularity projektu, důvěry komunity a dlouhodobé relevance. Přestože nejsou přímým měřítkem technické kvality, odrážejí, kolik vývojářů považuje projekt za užitečný, sleduje jeho pokrok a pravděpodobně jej přijme. Pro odhad hodnoty projektu pomáhají hvězdičky porovnat zájem o alternativy a poskytují náhled na růst ekosystému.

[![Star History Chart](https://api.star-history.com/chart?repos=aymericzip/intlayer%2Cformatjs/formatjs%2Ci18next/react-i18next%2Ci18next/i18next%2Ci18next/next-i18next%2Clingui/js-lingui%2Camannn/next-intl%2Cintlify/vue-i18n%2Ccodingcommons/typesafe-i18n%2Copral/paraglide-js&type=date&legend=top-left)](https://www.star-history.com/#aymericzip/intlayer&formatjs/formatjs&i18next/react-i18next&i18next/i18next&i18next/next-i18next&lingui/js-lingui&amannn/next-intl&intlify/vue-i18n&codingcommons/typesafe-i18n&opral/paraglide-js)

---

## Interoperabilita

`intlayer` může také pomoci spravovat vaše jmenné prostory pro `react-intl`, `react-i18next`, `next-intl`, `next-i18next` a `vue-i18n`.

Pomocí `intlayer` můžete deklarovat svůj obsah ve formátu vaší oblíbené knihovny i18n a intlayer vygeneruje vaše jmenné prostory v umístění podle vašeho výběru (příklad: `/messages/{{locale}}/{{namespace}}.json`).

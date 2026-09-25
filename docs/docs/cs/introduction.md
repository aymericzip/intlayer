---
createdAt: 2025-08-23
updatedAt: 2026-09-06
title: Úvod
description: Zjistěte, jak Intlayer funguje. Podívejte se na kroky, které Intlayer ve vaší aplikaci používá. Objevte, co dělají různé balíčky.
keywords:
  - Úvod
  - Začínáme
  - Intlayer
  - Aplikace
  - Balíčky
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
author: aymericzip
---

# Dokumentace Intlayer

Vítejte v oficiální dokumentaci Intlayer! Zde najdete vše, co potřebujete k integraci, konfiguraci a ovládnutí Intlayer pro všechny vaše potřeby internacionalizace (i18n), ať už pracujete s Next.js, React, Vite, Express nebo jiným JavaScriptovým prostředím.

## Úvod

### Co je to Intlayer?

**Intlayer** je knihovna pro internacionalizaci navržená speciálně pro vývojáře JavaScriptu. Umožňuje deklaraci vašeho obsahu kdekoli ve vašem kódu. Převádí deklarace vícejazyčného obsahu do strukturovaných slovníků, které se snadno integrují do vašeho kódu. Díky použití TypeScriptu činí **Intlayer** váš vývoj robustnějším a efektivnějším.

Intlayer také poskytuje volitelný vizuální editor, který vám umožní snadno upravovat a spravovat váš obsah. Tento editor je obzvláště užitečný pro vývojáře, kteří preferují vizuální rozhraní pro správu obsahu, nebo pro týmy vytvářející obsah bez nutnosti starat se o kód.

### Příklad použití

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
      cs: "Ahoj světe",
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
        "cs": "Ahoj světe"
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

### Proč Intlayer místo alternativ?

Ve srovnání s hlavními řešeními, jako je `next-intl` nebo `i18next`, je Intlayer řešením, které přináší integrované optimalizace, jako jsou:

<AccordionGroup>
<Accordion header="Velikost balíčku (Bundle size)">

Místo načítání obrovských JSON souborů na vaše stránky načtěte pouze potřebný obsah. Intlayer pomáhá **snížit velikost vašeho balíčku a stránek až o 50 %**.

</Accordion>
<Accordion header="Udržovatelnost (Maintainability)">

Zapouzdření obsahu vaší aplikace do scope blízko komponent **usnadňuje údržbu** u velkých aplikací. Můžete duplikovat nebo smazat složku s jedinou funkcí (feature) bez psychické zátěže plynoucí z nutnosti procházet celou kódovou základnu obsahu. Intlayer je navíc **plně typovaný (fully typed)**, aby zajistil přesnost vašeho obsahu.

</Accordion>
<Accordion header="Agent AI">

Umístění obsahu na stejném místě (co-locating) **snižuje potřebný kontext** pro velké jazykové modely (LLM). Intlayer je také dodáván se sadou nástrojů, jako je **CLI** pro testování chybějících překladů, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/mcp_server.md)** a **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/agent_skills.md)**, aby byl vývojářský zážitek (DX) pro AI agenty ještě plynulejší.

</Accordion>
<Accordion header="Automatizace">

Využijte automatizaci k překladům ve vašem CI/CD pipeline pomocí libovolného LLM dle vašeho výběru na náklady vašeho poskytovatele AI. Intlayer nabízí také **kompilátor (compiler)** pro automatizaci extrakce obsahu a [webovou platformu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_CMS.md), která vám pomůže s **překladem na pozadí**.

</Accordion>
<Accordion header="Výkon (Performance)">

Propojování masivních souborů JSON ke komponentám může vést k problémům s výkonem a reaktivitou. Intlayer optimalizuje načítání obsahu během sestavování (build time).

</Accordion>
<Accordion header="Škálování bez vývojářů (Scaling with non-dev)">

Víc než jen i18n řešení, Intlayer poskytuje **samostatně hostovatelný (self-hosted) [vizuální editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_visual_editor.md)** a **[kompletní CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_CMS.md)**, který vám pomůže spravovat vícejazyčný obsah v **reálném čase**. Díky tomu je spolupráce s překladateli, copywritery a dalšími členy týmu bezproblémová. Obsah lze ukládat lokálně a/nebo vzdáleně.

</Accordion>
</AccordionGroup>

## Hlavní funkce

Intlayer nabízí řadu funkcí přizpůsobených potřebám moderního webového vývoje. Níže jsou uvedeny klíčové funkce s odkazy na podrobnou dokumentaci pro každou z nich:

- **Podpora internacionalizace**: Zvyšte globální dosah své aplikace pomocí integrované podpory pro internacionalizaci.
- **Vizuální editor**: Vylepšete svůj vývojový pracovní postup pomocí pluginů editoru navržených pro Intlayer. Podívejte se na [Průvodce vizuálním editorem](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_visual_editor.md).
- **Flexibilita konfigurace**: Přizpůsobte si nastavení pomocí rozsáhlých možností konfigurace podrobně popsaných v [Průvodci konfigurací](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/configuration.md).
- **Pokročilé nástroje CLI**: Spravujte své projekty efektivně pomocí rozhraní příkazového řádku Intlayer. Objevte možnosti v [Dokumentaci k nástrojům CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/index.md).

## Klíčové koncepty

### Slovník (Dictionary)

Uspořádejte svůj vícejazyčný obsah blízko kódu, abyste udrželi vše konzistentní a snadno udržovatelné.

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/content_file" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/translation" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/enumeration" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/condition" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/insertion" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/function_fetching" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/markdown" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/file" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/nesting" />
</TechGrid>

### Prostředí a integrace

Vybudovali jsme Intlayer s ohledem na flexibilitu a nabízíme bezproblémovou integraci napříč populárními frameworky a nástroji pro sestavení:

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_nextjs_16" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_nextjs_15" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_nextjs_14" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_nextjs_page_router" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_tanstack" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_tanstack+solid" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_vite+react" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_react_router_v7" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_remix_3" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_create_react_app" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_react_native+expo" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_lynx+react" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_astro" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_astro_react" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_astro_vue" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_astro_svelte" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_astro_solid" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_astro_preact" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_astro_lit" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_vite+vue" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_nuxt" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_vite+svelte" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_svelte_kit" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_vite+solid" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_solid_start" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_vite+preact" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_angular_21" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_angular_19" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_analog" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_vite+lit" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_vite+vanilla" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_vanilla" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_htmx" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_express" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_nestjs" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_fastify" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_hono" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_adonisjs" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_elysia" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_storybook" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_next-intl" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_next-i18next" />
</TechGrid>

Každý průvodce integrací obsahuje osvědčené postupy pro využívání funkcí Intlayer, jako je **vykreslování na straně serveru (SSR)**, **dynamické směrování** nebo **vykreslování na straně klienta**, abyste mohli udržovat rychlou, vysoce škálovatelnou aplikaci přátelskou pro SEO.

## Přispívání a zpětná vazba

Ceníme si síly open-source a vývoje řízeného komunitou. Pokud byste chtěli navrhnout vylepšení, přidat nového průvodce nebo opravit jakékoli problémy v naší dokumentaci, neváhejte odeslat Pull Request nebo otevřít Issue v našem [repozitáři na GitHubu](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Jste připraveni překládat svou aplikaci rychleji a efektivněji?** Ponořte se do naší dokumentace a začněte Intlayer používat ještě dnes. Vyzkoušejte robustní a zjednodušený přístup k internacionalizaci, který udrží váš obsah uspořádaný a váš tým produktivnější.

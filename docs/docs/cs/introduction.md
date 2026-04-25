---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Úvod
description: Zjistěte, jak Intlayer funguje. Podívejte se na kroky používané Intlayer ve vaší aplikaci. Podívejte se, co dělají různé balíčky.
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
    changes: "Iniciace historie"
---

# Dokumentace Intlayer

Vítejte v oficiální dokumentaci Intlayer! Zde najdete vše, co potřebujete k integraci, konfiguraci a ovládnutí Intlayer pro všechny vaše potřeby internacionalizace (i18n), ať už pracujete s Next.js, React, Vite, Express nebo jiným prostředím JavaScriptu.

## Úvod

### Co je Intlayer?

**Intlayer** je knihovna pro internacionalizaci navržená speciálně pro JavaScriptové vývojáře. Umožňuje deklaraci vašeho obsahu kdekoli ve vašem kódu. Převádí deklaraci vícejazyčného obsahu do strukturovaných slovníků, které lze snadno integrovat do vašeho kódu. S využitím TypeScriptu dělá **Intlayer** váš vývoj silnějším a efektivnějším.

Intlayer také poskytuje volitelný vizuální editor, který vám umožní snadno upravovat a spravovat váš obsah. Tento editor je užitečný zejména pro vývojáře, kteří preferují vizuální rozhraní pro správu obsahu, nebo pro týmy generující obsah, aniž by se musely starat o kód.

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
        "es": "Hola Mundo"
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

## Hlavní funkce

Intlayer nabízí řadu funkcí přizpůsobených potřebám moderního webového vývoje. Níže jsou uvedeny klíčové funkce s odkazy na podrobnou dokumentaci pro každou z nich:

- **Podpora internacionalizace**: Zvyšte globální dosah své aplikace s vestavěnou podporou internacionalizace.
- **Vizuální editor**: Vylepšete svůj vývojový proces pomocí pluginů editoru navržených pro Intlayer. Podívejte se na [Průvodce vizuálním editorem](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_visual_editor.md).
- **Flexibilita konfigurace**: Přizpůsobte si nastavení pomocí rozsáhlých možností konfigurace popsaných v [Průvodci konfigurací](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/configuration.md).
- **Pokročilé CLI nástroje**: Spravujte své projekty efektivně pomocí příkazového řádku Intlayeru. Prozkoumejte možnosti v [Dokumentaci pro CLI nástroje](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/index.md).

## Základní pojmy

### Slovník (Dictionary)

Organizujte svůj vícejazyčný obsah v blízkosti svého kódu, aby bylo vše konzistentní a udržovatelné.

- **[Začínáme](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/content_file.md)**  
  Naučte se základy deklarace obsahu v Intlayeru.

- **[Překlad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/translation.md)**  
  Pochopte, jak jsou překlady generovány, ukládány a používány ve vaší aplikaci.

- **[Výčet (Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/enumeration.md)**  
  Snadno spravujte opakované nebo pevné sady dat napříč různými jazyky.

- **[Podmínka (Condition)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/condition.md)**  
  Naučte se používat podmíněnou logiku v Intlayeru k vytváření dynamického obsahu.

- **[Vkládání (Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/insertion.md)**
  Zjistěte, jak vkládat hodnoty do řetězce pomocí zástupných symbolů pro vkládání.

- **[Získávání funkcí (Function Fetching)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/function_fetching.md)**  
  Podívejte se, jak dynamicky získávat obsah pomocí vlastní logiky tak, aby odpovídal pracovnímu postupu vašeho projektu.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/markdown.md)**  
  Naučte se používat Markdown v Intlayeru k vytváření bohatého obsahu.

- **[Vkládání souborů (File embeddings)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/file.md)**  
  Zjistěte, jak vkládat externí soubory do Intlayeru a používat je v editoru obsahu.

- **[Vnořování (Nesting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/nesting.md)**  
  Pochopte, jak vnořovat obsah v Intlayeru a vytvářet složité struktury.

### Prostředí a integrace

Intlayer jsme vytvořili s ohledem na flexibilitu a nabízíme bezproblémovou integraci napříč populárními frameworky a nástroji pro sestavení:

- **[Intlayer s Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_nextjs_16.md)**
- **[Intlayer s Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_nextjs_15.md)**
- **[Intlayer s Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_nextjs_14.md)**
- **[Intlayer s Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_nextjs_page_router.md)**
- **[Intlayer s React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_create_react_app.md)**
- **[Intlayer s Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_vite+react.md)**
- **[Intlayer s React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_react_router_v7.md)**
- **[Intlayer s Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_tanstack.md)**
- **[Intlayer s React Native a Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_react_native+expo.md)**
- **[Intlayer s Lynx a React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_lynx+react.md)**
- **[Intlayer s Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_vite+preact.md)**
- **[Intlayer s Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_vite+vue.md)**
- **[Intlayer s Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_nuxt.md)**
- **[Intlayer s Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_vite+svelte.md)**
- **[Intlayer se SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_svelte_kit.md)**
- **[Intlayer s Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_express.md)**
- **[Intlayer s NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_nestjs.md)**
- **[Intlayer s Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_hono.md)**
- **[Intlayer s Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_angular.md)**

Každý průvodce integrací obsahuje osvědčené postupy pro používání funkcí Intlayer, jako je **server-side rendering**, **dynamické směrování** nebo **client-side rendering**, abyste mohli udržovat rychlou aplikaci vhodnou pro SEO a s vysokou škálovatelností.

## Přispívání a zpětná vazba

Vážíme si síly open-source a vývoje řízeného komunitou. Pokud byste chtěli navrhnout vylepšení, přidat nového průvodce nebo opravit jakékoli problémy v našich dokumentech, neváhejte odeslat Pull Request nebo otevřít problém v našem [GitHub repozitáři](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Jste připraveni překládat svou aplikaci rychleji a efektivněji?** Ponořte se do našich dokumentů a začněte používat Intlayer ještě dnes. Zažijte robustní, efektivní přístup k internacionalizaci, který udržuje váš obsah uspořádaný a váš tým produktivnější.

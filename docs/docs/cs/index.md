---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Dokumentace Intlayer - Kompletní průvodce i18n pro JavaScript
description: Kompletní dokumentace pro Intlayer, moderní knihovnu pro internacionalizaci pro JavaScript, React, Next.js, Express a další frameworky.
keywords:
  - intlayer
  - internacionalizace
  - i18n
  - JavaScript
  - React
  - Next.js
  - dokumentace
  - překlad
  - multilinguální
slugs:
  - doc
  - index
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Iniciace historie"
---

# Dokumentace Intlayer

Vítejte v oficiální dokumentaci **Intlayer**! Zde najdete vše, co potřebujete k integraci, konfiguraci a ovládnutí Intlayer pro všechny vaše potřeby internacionalizace (i18n), ať už pracujete s **Next.js**, **React**, **Vite**, **Express** nebo jiným prostředím JavaScriptu.

Intlayer nabízí flexibilní, moderní přístup k překladu vaší aplikace. Naše dokumentace vás provede od instalace a nastavení až po pokročilé funkce, jako je **překlad s podporou AI**, definice **TypeScript** a podpora **serverových komponent**, což vám umožní vytvořit bezproblémový vícejazyčný zážitek.

---

## Začínáme

- **[Úvod](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/introduction.md)**  
  Získejte přehled o tom, jak Intlayer funguje, o jeho klíčových funkcích a proč přináší revoluci do i18n.

- **[Jak Intlayer funguje](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/how_works_intlayer.md)**  
  Ponořte se do architektonického návrhu a zjistěte, jak Intlayer zvládá vše od deklarace obsahu až po doručení překladu.

- **[Konfigurace](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/configuration.md)**  
  Přizpůsobte Intlayer potřebám vašeho projektu. Prozkoumejte možnosti middleware, struktury adresářů a pokročilá nastavení.

- **[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/index.md)**  
  Spravujte obsah a překlady pomocí našeho nástroje příkazového řádku. Zjistěte, jak nahrávat a stahovat obsah, automatizovat překlady a další.

- **[Intlayer Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_visual_editor.md)**  
  Zjednodušte spolupráci s nevývojáři a posilte své překlady pomocí AI přímo v našem bezplatném intutivním CMS.

---

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

- **[Pohlaví (Gender)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/gender.md)**  
  Naučte se používat logiku pohlaví v Intlayeru k vytváření dynamického obsahu.

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

---

## Prostředí a integrace

Intlayer jsme vytvořili s ohledem na flexibilitu a nabízíme bezproblémovou integraci napříč populárními frameworky a nástroji pro sestavení:

- **[Intlayer s Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_nextjs_16.md)**
- **[Intlayer s Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_nextjs_15.md)**
- **[Intlayer s Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_nextjs_14.md)**
- **[Intlayer s Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_nextjs_page_router.md)**
- **[Intlayer s React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_create_react_app.md)**
- **[Intlayer s Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_vite+react.md)**
- **[Intlayer s React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_react_router_v7.md)**
- **[Intlayer s React Router v7 (fs routes)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_react_router_v7_fs_routes.md)**
- **[Intlayer s Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_tanstack.md)**
- **[Intlayer s React Native a Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_react_native+expo.md)**
- **[Intlayer s Lynx a React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_lynx+react.md)**
- **[Intlayer s Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_vite+preact.md)**
- **[Intlayer s Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_vite+vue.md)**
- **[Intlayer s Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_nuxt.md)**
- **[Intlayer s Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_express.md)**
- **[Intlayer s NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_nestjs.md)**
- **[Intlayer s Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_hono.md)**
- **[Intlayer s Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_angular.md)**

Každý průvodce integrací obsahuje osvědčené postupy pro používání funkcí Intlayer, jako je **server-side rendering**, **dynamické směrování** nebo **client-side rendering**, abyste mohli udržovat rychlou aplikaci vhodnou pro SEO a s vysokou škálovatelností.

---

## Balíčky

Modulární design Intlayer nabízí dedikované balíčky pro specifická prostředí a potřeby:

### `intlayer`

Základní pomocné funkce pro konfiguraci a správu vašeho nastavení i18n.

- **[getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/intlayer/getConfiguration.md)**
- **[getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/intlayer/getHTMLTextDir.md)**
- **[getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/intlayer/getLocaleLang.md)**
- **[getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/intlayer/getLocaleName.md)**
- **[getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/intlayer/getLocalizedUrl.md)**
- **[getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/intlayer/getMultilingualUrls.md)**
- **[getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/intlayer/getPathWithoutLocale.md)**
- **[getTranslation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/intlayer/getTranslation.md)**
- **[getEnumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/intlayer/getEnumeration.md)**

### `express-intlayer`

Využijte Intlayer v aplikacích založených na **Express**:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/express-intlayer/t.md)**  
  Jednoduchý pomocník pro překlad pro vaše serverové cesty a pohledy.

### `hono-intlayer`

Využijte Intlayer v aplikacích založených na **Hono**:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/hono-intlayer/t.md)**  
  Jednoduchý pomocník pro překlad pro vaše serverové cesty.

### `react-intlayer`

Vylepšete své aplikace **React** pomocí výkonných hooků:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/react-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/react-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/react-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/react-intlayer/useLocale.md)**

### `next-intlayer`

Bezproblémově integrujte s **Next.js**:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/next-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/next-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/next-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/packages/next-intlayer/useLocale.md)**

---

## Další zdroje

- **[Blog: Intlayer a i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_with_i18next.md)**  
  Zjistěte, jak se Intlayer doplňuje a srovnává s populární knihovnou **i18next**.

- **[Živý tutoriál na YouTube](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)**  
  Podívejte se na komplexní demo a naučte se integrovat Intlayer v reálném čase.

---

## Přispívání a zpětná vazba

Vážíme si síly open-source a vývoje řízeného komunitou. Pokud byste chtěli navrhnout vylepšení, přidat nového průvodce nebo opravit jakékoli problémy v našich dokumentech, neváhejte odeslat Pull Request nebo otevřít problém v našem [GitHub repozitáři](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Jste připraveni překládat svou aplikaci rychleji a efektivněji?** Ponořte se do našich dokumentů a začněte používat Intlayer ještě dnes. Zažijte robustní, efektivní přístup k internacionalizaci, který udržuje váš obsah uspořádaný a váš tým produktivnější.

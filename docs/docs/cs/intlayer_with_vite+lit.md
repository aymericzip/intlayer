---
createdAt: 2026-03-23
updatedAt: 2026-03-23
title: i18n Vite + Lit - Jak přeložit Lit aplikaci v roce 2026
description: Zjistěte, jak vytvořit svůj web ve Vite a Lit vícejazyčný. Postupujte podle dokumentace pro internacionalizaci (i18n) and překlad.
keywords:
  - Internacionalizace
  - Dokumentace
  - Intlayer
  - Vite
  - Lit
  - Web Components
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-lit
applicationTemplate: https://github.com/aymericzip/intlayer-vite-lit-template
history:
  - version: 8.4.10
    date: 2026-03-23
    changes: "Init history"
---

# Přeložte svůj web ve Vite a Lit pomocí Intlayer | Internacionalizace (i18n)

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-lit-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

## Obsah

<TOC/>

## Co je Intlayer?

**Intlayer** je inovativní open-source knihovna pro internacionalizaci (i18n) navržená pro zjednodušení vícejazyčné podpory v moderních webových aplikacích.

S Intlayer můžete:

- **Snadno spravovat překlady** pomocí deklarativních slovníků na úrovni komponent.
- **Dynamicky lokalizovat metadata**, routy a obsah.
- **Zajistit podporu TypeScriptu** s automaticky generovanými typy, což zlepšuje automatické doplňování a detekci chyb.
- **Využívat pokročilé funkce**, jako je dynamická detekce a přepínání jazyka.

---

## Průvodce krok za krokem k nastavení Intlayer v aplikaci Vite a Lit

### Krok 1: Instalace závislostí

Nainstalujte potřebné balíčky pomocí npm:

```bash packageManager="npm"
npm install intlayer lit-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer lit-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer lit-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer lit-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**

  Základní balíček, který poskytuje nástroje pro internacionalizaci pro správu konfigurace, překlad, [deklaraci obsahu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/content_file.md), transpilaci a [příkazy CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/index.md).

- **lit-intlayer**
  Balíček, který integruje Intlayer s aplikacemi Lit. Poskytuje hooky založené na `ReactiveController` (`useIntlayer`, `useLocale` atd.), aby se LitElementy automaticky znovu vyrenderovaly, když se změní jazyk.

- **vite-intlayer**
  Obsahuje plugin Vite pro integraci Intlayer s [bundlerem Vite](https://vite.dev/guide/why.html#why-bundle-for-production), stejně jako middleware pro detekci preferovaného jazyka uživatele, správu cookies a zpracování přesměrování URL.

### Krok 2: Konfigurace vašeho projektu

Vytvořte konfigurační soubor pro nastavení jazyků vaší aplikace:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Vaše další jazyky
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Prostřednictvím tohoto konfiguračního souboru můžete nastavit lokalizované URL, přesměrování middleware, názvy cookies, umístění a příponu vašich deklarací obsahu, zakázat logy Intlayer v konzoli a další. Pro kompletní seznam dostupných parametrů se podívejte do [dokumentace konfigurace](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/configuration.md).

### Krok 3: Integrujte Intlayer do vaší konfigurace Vite

Přidejte plugin intlayer do své konfigurace.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

> Plugin Vite `intlayer()` se používá k integraci Intlayer s Vite. Zajišťuje sestavení souborů s deklarací obsahu a sleduje je ve vývojovém režimu. Definuje proměnné prostředí Intlayer v rámci aplikace Vite. Navíc poskytuje aliasy pro optimalizaci výkonu.

### Krok 4: Spuštění Intlayer ve vašem vstupním bodě

Zavolejte `installIntlayer()` **před** registrací jakýchkoli vlastních elementů, aby byl globální singleton jazyka připraven, když se první element připojí.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "lit-intlayer";

// Musí být zavoláno předtím, než se jakýkoli LitElement připojí k DOM.
installIntlayer();

// Importujte a zaregistrujte své vlastní elementy.
import "./my-element.js";
```

Pokud používáte také deklarace obsahu `md()` (Markdown), nainstalujte také renderer markdownu:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "lit-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./my-element.js";
```

### Krok 5: Deklarujte svůj obsah

Vytvořte a spravujte své deklarace obsahu pro uložení překladů:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Lit",

    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    litLogo: t({
      en: "Lit logo",
      fr: "Logo Lit",
      es: "Logo Lit",
    }),

    count: t({
      en: "count is {{count}}",
      fr: "le compte est {{count}}",
      es: "el recuento es {{count}}",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Lit logos to learn more",
      fr: "Cliquez sur les logos Vite et Lit pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Lit para obtener más información",
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
    "title": "Vite + Lit",
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "litLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Lit logo",
        "fr": "Logo Lit",
        "es": "Logo Lit"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is {{count}}",
        "fr": "le compte est {{count}}",
        "es": "el recuento es {{count}}"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Lit logos to learn more",
        "fr": "Cliquez sur les logos Vite et Lit pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Lit para obtener más información"
      }
    }
  }
}
```

> Vaše deklarace obsahu mohou být definovány kdekoli ve vaší aplikaci, pokud jsou zahrnuty v adresáři `contentDir` (ve výchozím nastavení `./src`) a odpovídají příponě souboru deklarace obsahu (ve výchozím nastavení `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).
>
> Pro více informací se podívejte do [dokumentace deklarace obsahu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/dictionary/content_file.md).

### Krok 6: Využijte Intlayer ve vašem LitElementu

Použijte `useIntlayer` uvnitř `LitElement`. Vrací proxy `ReactiveController`, který automaticky spouští nové vykreslení pokaždé, když se změní aktivní jazyk — není vyžadováno žádné další nastavení.

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { useIntlayer } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  @property({ type: Number })
  count = 0;

  // useIntlayer se zaregistruje jako ReactiveController.
  // Element se automaticky znovu vykreslí, když se změní jazyk.
  private content = useIntlayer(this, "app");

  override render() {
    const { content } = this;

    return html`
      <h1>${content.title}</h1>

      <img src="/vite.svg" alt=${content.viteLogo.value} />
      <img src="/lit.svg" alt=${content.litLogo.value} />

      <button @click=${() => this.count++}>
        ${content.count({ count: this.count })}
      </button>

      <p>${content.readTheDocs}</p>
    `;
  }
}
```

> Když potřebujete přeložený řetězec v nativním HTML atributu (např. `alt`, `aria-label`, `title`), zavolejte `.value` na koncovém uzlu (leaf node):
>
> ```typescript
> html`<img alt=${content.viteLogo.value} />`;
> ```

### (Volitelné) Krok 7: Změňte jazyk svého obsahu

Chcete-li změnit jazyk svého obsahu, použijte metodu `setLocale` vystavenou kontrolerem `useLocale`.

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

### (Volitelné) Krok 8: Renderování Markdownu a HTML obsahu

Intlayer podporuje deklarace obsahu `md()` a `html()`. V Lit je zkompilovaný výstup vložen jako surové HTML prostřednictvím direktivy `unsafeHTML`.

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/my-element.ts` and save to test **HMR**",
        fr: "Modifiez `src/my-element.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/my-element.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

Vyrenderujte zkompilované HTML ve vašem elementu:

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { useIntlayer } from "lit-intlayer";
import { compileMarkdown } from "lit-intlayer/markdown";

@customElement("my-element")
export class MyElement extends LitElement {
  private content = useIntlayer(this, "app");

  override render() {
    return html`
      <div class="edit-note">
        ${unsafeHTML(compileMarkdown(String(this.content.editNote)))}
      </div>
    `;
  }
}
```

> [!TIP]
> `String(content.editNote)` zavolá `toString()` na `IntlayerNode`, což vrátí surový řetězec Markdownu. Předejte ho do `compileMarkdown`, abyste získali HTML řetězec, a poté jej vyrenderujte pomocí direktivy `unsafeHTML` z Lit.

### (Volitelné) Krok 9: Přidejte lokalizované směrování do své aplikace

Chcete-li vytvořit jedinečné trasy pro každý jazyk (užitečné pro SEO), můžete použít router na straně klienta spolu s pomocníky Intlayer `localeMap` / `localeFlatMap` a pluginem Vite `intlayerProxy` pro detekci jazyka na straně serveru.

Nejprve přidejte `intlayerProxy` do své konfigurace Vite:

> Všimněte si, že pro použití `intlayerProxy` v produkci musíte přesunout `vite-intlayer` z `devDependencies` do `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerProxy()],
});
```

### (Volitelné) Krok 10: Změňte URL, když se změní jazyk

Chcete-li aktualizovat URL prohlížeče, když se změní jazyk, použijte `useRewriteURL` spolu s přepínačem jazyka:

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale, useRewriteURL } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  // Automaticky přepíše aktuální URL, když se změní jazyk.
  private _rewriteURL = useRewriteURL(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

### (Volitelné) Krok 11: Přepínání atributů jazyka a směru HTML

Aktualizujte atributy `lang` a `dir` tagu `<html>`, aby odpovídaly aktuálnímu jazyku kvůli přístupnosti a SEO.

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  private locale = useLocale(this, {
    onLocaleChange: (loc) => {
      document.documentElement.lang = loc;
      document.documentElement.dir = getHTMLTextDir(loc);
    },
  });

  override render() {
    return html`<!-- váš obsah -->`;
  }
}
```

### (Volitelné) Krok 12: Extrahuje obsah vašich komponent

Pokud máte existující kódovou základnu, transformace tisíců souborů může být časově náročná.

Pro usnadnění tohoto procesu Intlayer navrhuje [kompilátor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/compiler.md) / [extraktor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/cli/extract.md) pro transformaci vašich komponent a extrakci obsahu.

Chcete-li jej nastavit, můžete do souboru `intlayer.config.ts` přidat sekci `compiler`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... zbytek vaší konfigurace
  compiler: {
    /**
     * Indikuje, zda má být kompilátor povolen.
     */
    enabled: true,

    /**
     * Definuje cestu k výstupním souborům
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Indikuje, zda mají být komponenty po transformaci uloženy.
     * Tímto způsobem lze kompilátor spustit pouze jednou pro transformaci aplikace a poté jej lze odstranit.
     */
    saveComponents: false,

    /**
     * Předpona klíče slovníku
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

### Konfigurace TypeScriptu

Ujistěte se, že vaše konfigurace TypeScriptu zahrnuje automaticky generované typy.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

> `experimentalDecorators` a `useDefineForClassFields: false` jsou vyžadovány Lit pro podporu dekorátorů.

### Konfigurace Git

Doporučuje se ignorovat soubory generované Intlayerem. To vám umožní vyhnout se jejich verzování v Git repozitáři.

Chcete-li to provést, můžete do souboru `.gitignore` přidat následující pokyny:

```bash
# Ignorovat soubory generované Intlayerem
.intlayer
```

### Rozšíření pro VS Code

Chcete-li zlepšit své zkušenosti s vývojem s Intlayerem, můžete si nainstalovat oficiální **rozšíření Intlayer pro VS Code**.

[Instalovat z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Toto rozšíření poskytuje:

- **Automatické doplňování** pro klíče překladů.
- **Detekci chyb v reálném čase** u chybějících překladů.
- **Inline náhledy** přeloženého obsahu.
- **Rychlé akce** pro snadné vytváření a aktualizaci překladů.

Další podrobnosti o tom, jak rozšíření používat, najdete v [dokumentaci rozšíření Intlayer pro VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Jděte dále

Chcete-li jít dále, můžete implementovat [vizuální editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_visual_editor.md) nebo externalizovat svůj obsah pomocí [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_CMS.md).

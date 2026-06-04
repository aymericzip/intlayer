---
createdAt: 2025-04-18
updatedAt: 2026-05-31
title: "Analog i18n - Complete guide to translate your app"
description: "No more i18next. The 2026 guide to building a multilingual (i18n) Analog app. Translate with AI agents and optimize bundle size, SEO and performances."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Analog
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - analog
applicationTemplate: https://github.com/aymericzip/intlayer-analog-template
applicationShowcase: https://intlayer-analog-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 8.0.4
    date: 2026-01-26
    changes: "Initial history"
---

# Translate your Analog (Angular) app using Intlayer | Internationalization (i18n)

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-analog-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-analog-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-analog-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Table of Contents

<TOC/>

## Why Intlayer over alternatives?

Compared to main solutions like `ngx-translate` or `angular-l10n`, Intlayer is a solution that comes with integrated optimizations such as:

<AccordionGroup>

<Accordion header="Full Analog coverage">

Intlayer is optimized to work perfectly with Analog by offering **multilingual routing**, **SSR support**, and all the features needed for scaling internationalization (i18n).

</Accordion>

<Accordion header="Bundle size">

Instead of loading massive JSON files into your pages, load only the necessary content. Intlayer helps **reduce your bundle and page sizes by up to 50%**.

</Accordion>

<Accordion header="Maintainability">

Scoping your application's content **facilitates maintenance** for large-scale applications. You can duplicate or delete a single feature folder without the mental burden of reviewing your entire content codebase. Additionally, Intlayer is **fully typed** to ensure your content's accuracy.

</Accordion>

<Accordion header="AI Agent">

Co-locating content **reduces the context needed** by Large Language Models (LLMs). Intlayer also comes with a suite of tools, such as a **CLI** to test for missing translations,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, and **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, to make the developer experience (DX) even smoother for AI agents.

</Accordion>

<Accordion header="Automation">

Use automation to translate in your CI/CD pipeline using the LLM of your choice at the cost of your AI provider. Intlayer also offers a **compiler** to automate content extraction, as well as a [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) to help **translate in the background**.

</Accordion>

<Accordion header="Performance">

Connecting massive JSON files to components can lead to performance and reactivity issues. Intlayer optimizes your content loading at build time.

</Accordion>

<Accordion header="Scaling with none-dev">

More than just an i18n solution, Intlayer provides an **self-hosted [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** and a **[full CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** to help you manage your multilingual content in **real-time**, making collaboration with translators, copywriters, and other team members seamless. Content can be stored locally and/or remotely.

</Accordion>
</AccordionGroup>

---

## Step-by-Step Guide to Set Up Intlayer in an Analog Application

See [Application Template](https://github.com/aymericzip/intlayer-analog-template) on GitHub.

<Steps>

<Step number={1} title="Install Dependencies">

Install the necessary packages using npm:

```bash packageManager="npm"
npm install intlayer angular-intlayer vite-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer vite-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer vite-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer angular-intlayer vite-intlayer
bun x intlayer init
```

- **intlayer**

  The core package that provides internationalization tools for configuration management, translation, [content declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), transpilation, and [CLI commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **angular-intlayer**
  The package that integrates Intlayer with Angular application. It provides context providers and hooks for Angular internationalization.

- **vite-intlayer**
  The package that integrates Intlayer with Vite. It provides a plugin to handle content declaration files and sets up aliases for optimal performance.

</Step>

<Step number={2} title="Configuration of your project">

Create a config file to configure the languages of your application:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Through this configuration file, you can set up localized URLs, middleware redirection, cookie names, the location and extension of your content declarations, disable Intlayer logs in the console, and more. For a complete list of available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

</Step>

<Step number={3} title="Integrate Intlayer in Your Vite Configuration">

To integrate Intlayer with Analog, you need to use the `vite-intlayer` plugin.

Modify your `vite.config.ts` file:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import analog from "@analogjs/platform";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    analog(),
    intlayer(), // Add the Intlayer plugin
  ],
}));
```

> The `intlayer()` plugin configures Vite with Intlayer. It handles content declaration files and sets up aliases for optimal performance.

</Step>

<Step number={4} title="Declare Your Content">

Create and manage your content declarations to store translations:

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    congratulations: t({
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Your content declarations can be defined anywhere in your application as soon they are included into the `contentDir` directory (by default, `./src`). And match the content declaration file extension (by default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> For more details, refer to the [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

</Step>

<Step number={5} title="Utilize Intlayer in Your Code">

To utilize Intlayer's internationalization features throughout your Analog application, you need to provide Intlayer in your application configuration.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideIntlayer } from "angular-intlayer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideIntlayer(), // Add the Intlayer provider here
  ],
};
```

Then, you can use the `useIntlayer` function within any component.

```typescript fileName="src/app/pages/index.page.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-home",
  standalone: true,
  template: `
    <div class="content">
      <h1>{{ content().title }}</h1>
      <p>{{ content().congratulations }}</p>
    </div>
  `,
})
export default class HomeComponent {
  content = useIntlayer("app");
}
```

Intlayer content is returned as a `Signal`, so you access the values by calling the signal: `content().title`.

</Step>

<Step number={6} title="Change the language of your content" isOptional={true}>

To change the language of your content, you can use the `setLocale` function provided by the `useLocale` function. This allows you to set the locale of the application and update the content accordingly.

Create a component to switch between languages:

```typescript fileName="src/app/locale-switcher.component.ts"
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { useLocale } from "angular-intlayer";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="locale-switcher">
      <select
        [value]="locale()"
        (change)="setLocale($any($event.target).value)"
      >
        @for (loc of availableLocales; track loc) {
          <option [value]="loc">{{ loc }}</option>
        }
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  localeCtx = useLocale();

  locale = this.localeCtx.locale;
  availableLocales = this.localeCtx.availableLocales;
  setLocale = this.localeCtx.setLocale;
}
```

Then, use this component in your pages:

```typescript fileName="src/app/pages/index.page.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";
import { LocaleSwitcherComponent } from "../locale-switcher.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [LocaleSwitcherComponent],
  template: `
    <app-locale-switcher></app-locale-switcher>
    <div class="content">
      <h1>{{ content().title }}</h1>
      <p>{{ content().congratulations }}</p>
    </div>
  `,
})
export default class HomeComponent {
  content = useIntlayer("app");
}
```

</Step>

</Steps>

### Configure TypeScript

Intlayer uses module augmentation to get benefits of TypeScript and make your codebase stronger.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Ensure your TypeScript configuration includes the autogenerated types.

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  "include": [
    // ... Your existing TypeScript configurations
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### Git Configuration

It is recommended to ignore the files generated by Intlayer. This allows you to avoid committing them to your Git repository.

To do this, you can add the following instructions to your `.gitignore` file:

```bash
# Ignore the files generated by Intlayer
.intlayer
```

### VS Code Extension

To improve your development experience with Intlayer, you can install the official **Intlayer VS Code Extension**.

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

This extension provides:

- **Autocompletion** for translation keys.
- **Real-time error detection** for missing translations.
- **Inline previews** of translated content.
- **Quick actions** to easily create and update translations.

For more details on how to use the extension, refer to the [Intlayer VS Code Extension documentation](https://intlayer.org/doc/vs-code-extension).

---

### Go Further

To go further, you can implement the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) or externalize your content using the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

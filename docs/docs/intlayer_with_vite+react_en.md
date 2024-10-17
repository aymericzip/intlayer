# Getting Started with Intlayer vite + react

Setting up Intlayer in a Create React App application is straightforward:

## Step 1: Install Dependencies

Install the necessary packages using npm:

```bash
npm install intlayer react-intlayer
```

```bash
yarn install intlayer react-intlayer
```

```bash
pnpm install intlayer react-intlayer
```

## Step 2: Configuration of your project

Create a config file to configure the languages of your application:

```typescript
// intlayer.config.ts

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

To see all available parameters, refer to the [configuration documentation here](https://github.com/aymericzip/intlayer/blob/main/docs/docs/configuration_en.md).

## Step 3: Integrate Intlayer in Your Vite Configuration

Add the intlayer plugin into your configuration.

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin } from "react-intlayer/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin()],
});
```

## Step 4: Declare Your Content

Create and manage your content dictionaries:

```tsx
// src/app.content.tsx
import { t, type DeclarationContent } from "intlayer";
import { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      // N'oubliez pas d'importer React si vous utilisez un React node dans votre contenu
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies DeclarationContent;

export default appContent;
```

> Note: If your content file includes TSX code, you should consider importing `import React from "react";` in your content file.

[See how to declare your Intlayer declaration files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/content_declaration/get_started_en.md).

## Step 5: Utilize Intlayer in Your Code

Access your content dictionaries throughout your application:

```tsx
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { LocaleSwitcher } from "./components/LangSwitcherDropDown";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

function AppContent() {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
      <div className="absolute bottom-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
    </>
  );
}

function App() {
  return (
    <IntlayerProvider>
      <AppContent />
    </IntlayerProvider>
  );
}

export default App;
```

> Note: If you want to use your content in a `string` attribute, such as `alt`, `title`, `href`, `aria-label`, etc., you must call the value of the function, like:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

## (Optional) Step 6: Change the language of your content

To change the language of your content, you can use the `setLocale` function provided by the `useLocale` hook. This function allows you to set the locale of the application and update the content accordingly.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

## Configure TypeScript

Intlayer use module augmentation to get benefits of TypeScript and make your codebase stronger.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Ensure your TypeScript configuration includes the autogenerated types.

```json5
// tsconfig.json

{
  // your custom config
  include: [
    "src",
    "types", // <- Include the auto generated types
  ],
}
```

## Git Configuration

It is recommended to ignore the files generated by Intlayer. This allows you to avoid committing them to your Git repository.

To do this, you can add the following instructions to your `.gitignore` file:

```gitignore
# Ignore the files generated by Intlayer
.intlayer
```

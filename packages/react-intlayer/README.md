<div align="center">
  <a href="https://www.npmjs.com/package/react-intlayer">
    <img src="docs/assets/logo.png" width="500" alt="intlayer" />
  </a>
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/react-intlayer">
    <img alt="npm" src="https://img.shields.io/npm/v/react-intlayer.svg?labelColor=49516F&color=8994BC" />
  </a>
  <a href="https://npmjs.org/package/react-intlayer">
    <img alt="downloads" src="https://badgen.net/npm/dm/react-intlayer?labelColor=49516F&color=8994BC" />
  </a>
  <a href="https://npmjs.org/package/react-intlayer">
    <img alt="types included" src="https://badgen.net/npm/types/react-intlayer?labelColor=49516F&color=8994BC" 
  />
  </a>
</div>

# Intlayer: Next-Level Content Management in JavaScript

**Intlayer** is an internationalization library designed specifically for JavaScript developers. It allow the declaration of your content everywhere in your code. It converts declaration of multilingual content into structured dictionaries to integrate easily in your code. Using TypeScript, **Intlayer** make your development stronger and more efficient.

## Example of usage

```bash
.
├── Component1
│   ├── index.content.ts
│   └── index.tsx
└── Component2
    ├── index.content.ts
    └── index.tsx
```

```tsx
// ./Component1/index.content.ts

import { DeclarationContent, t } from "intlayer";

const component1Content: DeclarationContent = {
  id: "component1",
  myTranslatedContent: t({
    en: "Hello World",
    fr: "Bonjour le monde",
    es: "Hola Mundo",
  }),
};
```

```tsx
// ./Component1/index.tsx

import { useIntlayer } from "react-intlayer";

export const Component1 = () => {
  const { myTranslatedContent } = useIntlayer("component1");

  return <span>{myTranslatedContent}</span>;
};
```

## Why Choose Intlayer?

- **JavaScript-Powered Content Management**: Harness the flexibility of JavaScript to define and manage your content efficiently.
- **Type-Safe Environment**: Leverage TypeScript to ensure all your content definitions are precise and error-free.
- **Integrated Content Files**: Keep your translations close to their respective components, enhancing maintainability and clarity.
- **Simplified Setup**: Get up and running quickly with minimal configuration, especially optimized for Next.js projects.
- **Server Component Support**: Perfectly suited for Next.js server components, ensuring smooth server-side rendering.
- **Enhanced Routing**: Full support for Next.js app routing, adapting seamlessly to complex application structures.

# Getting Started with Intlayer and React Create App

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

## Step 3: Integrate Intlayer in Your CRA Configuration

Change your scripts to use react-intlayer

```json
  "scripts": {
    "build": "react-intlayer build",
    "start": "react-intlayer start",
    "transpile": "intlayer transpile"
  },
```

Note: react-intlayer scripts are based on craco. You can also implement your own setup based on the intlayer craco plugin. [See example here](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

## Step 4: Declare Your Content

Create and manage your content dictionaries:

```tsx
// src/app.content.tsx
import { t, type DeclarationContent } from "intlayer";
import { type ReactNode } from "react";

const appContent: DeclarationContent = {
  id: "app",

  getStarted: t<ReactNode>({
    en: (
      <>
        Edit <code>src/App.tsx</code> and save to reload
      </>
    ),
    fr: (
      <>
        Éditez <code>src/App.tsx</code> et enregistrez pour recharger
      </>
    ),
    es: (
      <>
        Edita <code>src/App.tsx</code> y guarda para recargar
      </>
    ),
  }),
  reactLink: {
    href: "https://reactjs.org",
    content: t({
      en: "Learn React",
      fr: "Apprendre React",
      es: "Aprender React",
    }),
  },
};

export default appContent;
```

[See how to declare your Intlayer declaration files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/content_declaration/get_started_en.md).

## Step 5: Utilize Intlayer in Your Code

Access your content dictionaries throughout your application:

```tsx
import logo from "./logo.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { LocaleSwitcher } from "./components/LangSwitcherDropDown";

function AppContent() {
  const content = useIntlayer("app");

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </header>
  );
}

function App() {
  return (
    <IntlayerProvider>
      <div className="App">
        {/* To use the useIntlayer hook properly, you should access your data in a children component */}
        <AppContent />
      </div>
      <div className="absolute bottom-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
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

# Getting Started with Intlayer and Vite + React

For integration with Vite + React, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_vite_react_en.md).

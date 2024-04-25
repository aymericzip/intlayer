# Getting Started with Intlayer

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

## Step 2: Integrate Intlayer in Your CRA Configuration

Change your scripts to use react-intlayer

```json
  "scripts": {
    "build": "react-intlayer build",
    "start": "react-intlayer start",
    "transpile": "intlayer transpile"
  },
```

Note: react-intlayer scripts are based on craco. You can also implement your own setup based on the intlayer craco plugin. (See example here)[https://github.com/aypineau/intlayer/blob/main/examples/react-app/craco.config.js].

## Step 3: Declare Your Content

Create and manage your content dictionaries:

```tsx
// src/app/[locale]/page.content.ts
import { t, type ContentModule } from "intlayer";

const pageContent: ContentModule = {
  id: "page",
  getStarted: {
    main: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    pageLink: "src/app/page.tsx",
  },
};

export default pageContent;
```

### Step 4: Utilize Intlayer in Your Code

Access your content dictionaries throughout your application:

```tsx
import logo from "./logo.svg";
import "./App.css";
import { IntlayerClientProvider, useIntlayer } from "react-intlayer";
import { LocaleSwitcher } from "./components/LangSwitcherDropDown";

function AppContent() {
  const content = useIntlayer("app");

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href}
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
    <IntlayerClientProvider>
      <div className="App">
        {/* To use the useIntlayer hook properly, you should access your data in a children component */}
        <AppContent />
      </div>
      <div className="absolute bottom-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
    </IntlayerClientProvider>
  );
}

export default App;
```

## Configuration of your project

Create a config file to configure the languages of your application:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

To see all available parameters, refer to the [configuration documentation here](https://github.com/aypineau/intlayer/blob/main/docs/configuration.md).

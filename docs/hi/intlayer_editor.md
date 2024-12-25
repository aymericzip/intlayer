# Intlayer संपादक डॉक्यूमेंटेशन

Intlayer संपादक एक उपकरण है जो आपके अनुप्रयोग को एक दृश्य संपादक में परिवर्तित करता है। Intlayer संपादक के साथ, आपकी टीमें आपकी साइट की सामग्री को सभी कॉन्फ़िगर किए गए भाषाओं में प्रबंधित कर सकती हैं।

![Intlayer संपादक इंटरफ़ेस](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

`intlayer-editor` पैकेज Intlayer पर आधारित है और यह JavaScript अनुप्रयोगों, जैसे React (Create React App), Vite + React, और Next.js के लिए उपलब्ध है।

## एकीकृत करना

पैकेज को स्थापित करने के तरीके के बारे में अधिक जानकारी के लिए, नीचे संबंधित अनुभाग देखें:

### Next.js के साथ एकीकृत करना

Next.js के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md) देखें।

### Create React App के साथ एकीकृत करना

Create React App के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md) देखें।

### Vite + React के साथ एकीकृत करना

Vite + React के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_vite+react.md) देखें।

## Intlayer संपादक कैसे काम करता है

हर बार जब आप Intlayer संपादक का उपयोग करके एक परिवर्तन करते हैं, तो सर्वर स्वचालित रूप से आपके परिवर्तन को आपके [Intlayer घोषणा फाइलों](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md) में डाल देता है, जहाँ भी ये फाइलें आपके प्रोजेक्ट में घोषित की जाती हैं।

इस प्रकार, आपको चिंता करने की आवश्यकता नहीं है कि फाइल कहाँ घोषित की गई है या आपके शब्दकोश संग्रह में आपके कुंजी को खोजने के बारे में।

## स्थापना

एक बार जब Intlayer आपके प्रोजेक्ट में कॉन्फ़िगर हो जाता है, तो बस `intlayer-editor` को विकास निर्भरता के रूप में स्थापित करें:

```bash packageManager="npm"
npm install intlayer-editor
```

```bash packageManager="yarn"
yarn add intlayer-editor
```

```bash packageManager="pnpm"
pnpm add intlayer-editor
```

## कॉन्फ़िगरेशन

### 1. अपने intlayer.config.ts फ़ाइल में संपादक को सक्षम करें

अपने Intlayer कॉन्फ़िगरेशन फ़ाइल में, आप संपादक सेटिंग्स को अनुकूलित कर सकते हैं:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... अन्य कॉन्फ़िगरेशन सेटिंग्स
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // अगर false है, तो संपादक निष्क्रिय है और इसे एक्सेस नहीं किया जा सकता।
    // क्लाइंट आईडी और क्लाइंट सीक्रेट संपादक को सक्षम करने के लिए आवश्यक हैं।
    // वे उस उपयोगकर्ता की पहचान करते हैं जो सामग्री को संपादित कर रहा है।
    // इन्हें Intlayer डैशबोर्ड - प्रोजेक्ट्स में एक नया क्लाइंट बनाकर प्राप्त किया जा सकता है (https://intlayer.org/dashboard/projects)।
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... अन्य कॉन्फ़िगरेशन सेटिंग्स
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // अगर false है, तो संपादक निष्क्रिय है और इसे एक्सेस नहीं किया जा सकता।
    // क्लाइंट आईडी और क्लाइंट सीक्रेट संपादक को सक्षम करने के लिए आवश्यक हैं।
    // वे उस उपयोगकर्ता की पहचान करते हैं जो सामग्री को संपादित कर रहा है।
    // इन्हें Intlayer डैशबोर्ड - प्रोजेक्ट्स में एक नया क्लाइंट बनाकर प्राप्त किया जा सकता है (https://intlayer.org/dashboard/projects)।
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { type IntlayerConfig } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... अन्य कॉन्फ़िगरेशन सेटिंग्स
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // अगर false है, तो संपादक निष्क्रिय है और इसे एक्सेस नहीं किया जा सकता।
    // क्लाइंट आईडी और क्लाइंट सीक्रेट संपादक को सक्षम करने के लिए आवश्यक हैं।
    // वे उस उपयोगकर्ता की पहचान करते हैं जो सामग्री को संपादित कर रहा है।
    // इन्हें Intlayer डैशबोर्ड - प्रोजेक्ट्स में एक नया क्लाइंट बनाकर प्राप्त किया जा सकता है (https://intlayer.org/dashboard/projects)।
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

module.exports = config;
```

> यदि आपके पास क्लाइंट आईडी और क्लाइंट सीक्रेट नहीं है, तो आप इन्हें [Intlayer डैशबोर्ड - प्रोजेक्ट्स](https://intlayer.org/dashboard/projects) में एक नया क्लाइंट बनाकर प्राप्त कर सकते हैं।

> सभी उपलब्ध पैरामीटर देखने के लिए, [कॉन्फ़िगरेशन डॉक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

### 2. अपने अनुप्रयोग में Intlayer संपादक प्रदाता डालें

संपादक को सक्षम करने के लिए, आपको अपने अनुप्रयोग में Intlayer संपादक प्रदाता डालने की आवश्यकता है।

React JS या Vite + React अनुप्रयोगों के लिए उदाहरण:

```tsx {3,6,8} fileName="App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

const App: FC = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* आपका अनुप्रयोग */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

```jsx {2,5,7} fileName="App.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

const App = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* आपका अनुप्रयोग */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

```jsx {2,5,7} fileName="App.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerEditorProvider } = require("intlayer-editor");

const App = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* आपका अनुप्रयोग */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

Next.js अनुप्रयोगों के लिए उदाहरण:

```tsx {3,11,13} fileName="src/app/page.tsx" codeFormat="typescript"
import { IntlayerClientProvider, type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { IntlayerEditorProvider } from "intlayer-editor";

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>{/* आपका अनुप्रयोग */}</IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

export default Page;
```

```jsx {3,11,13} fileName="src/app/page.mjx" codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { IntlayerEditorProvider } from "intlayer-editor";

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>{/* आपका अनुप्रयोग */}</IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

export default Page;
```

```jsx {3,11,13} fileName="src/app/page.csx" codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider } = require("next-intlayer/server");
const { IntlayerEditorProvider } = require("intlayer-editor");

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>{/* आपका अनुप्रयोग */}</IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

module.exports = Page;
```

## 3. अपने अनुप्रयोग में स्टाइलशीट जोड़ें

संपादक के स्टाइल प्रदर्शित करने के लिए, आपको अपने अनुप्रयोग में स्टाइलशीट जोड़ने की आवश्यकता है।

यदि टेलविंड का उपयोग किया जा रहा है, तो आप अपने `tailwind.config.js` फ़ाइल में स्टाइलशीट जोड़ सकते हैं:

```js fileName="tailwind.config.js"
import tailwindConfig, { tailwindPresetConfig } from "intlayer-editor/tailwind";

module.exports = {
  presets: [tailwindPresetConfig],
  content: [
    ...tailwindConfig.content,
    // ... आपकी सामग्री का बाकी हिस्सा
  ],
  // ...
};
```

अन्यथा, आप अपने अनुप्रयोग में स्टाइलशीट आयात कर सकते हैं:

```tsx fileName="app.tsx"
import "intlayer-editor/css";
```

या

```css fileName="app.css"
@import "intlayer-editor/css";
```

## संपादक का उपयोग करना

जब संपादक स्थापित, सक्षम, और प्रारंभ किया जाता है, तो आप अपने सामग्री पर अपने कर्सर से होवर करने पर Intlayer द्वारा अनुक्रमित प्रत्येक फ़ील्ड को देख सकते हैं।

![सामग्री पर होवर करते हुए](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

यदि आपकी सामग्री रेखांकित है, तो आप इसे संपादित ड्रा दिखाने के लिए लंबे समय तक दबा सकते हैं।

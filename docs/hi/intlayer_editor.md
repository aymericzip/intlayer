# Intlayer Editor Documentation

Intlayer Editor एक उपकरण है जो आपके अनुप्रयोग को एक दृश्य संपादक में परिवर्तित करता है। Intlayer Editor के साथ, आपकी टीमें आपके साइट के सामग्री को सभी निर्धारित भाषाओं में प्रबंधित कर सकती हैं।

![Intlayer Editor Interface](https://github.com/aymericzip/intlayer/blob/main/docs/hi/assets/intlayer_editor_ui.png)

`intlayer-editor` पैकेज Intlayer पर आधारित है और यह JavaScript अनुप्रयोगों के लिए उपलब्ध है, जैसे कि React (Create React App), Vite + React, और Next.js।

## Integrating

पैकेज को स्थापित करने के तरीके के बारे में अधिक जानकारी के लिए, नीचे दिए गए संबंधित अनुभाग को देखें:

### Integrating with Next.js

Next.js के साथ एकीकरण के लिए, [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md) देखें।

### Integrating with Create React App

Create React App के साथ एकीकरण के लिए, [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md) देखें।

### Integrating with Vite + React

Vite + React के साथ एकीकरण के लिए, [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_vite+react.md) देखें।

## How Intlayer Editor Works

जब भी आप Intlayer Editor का उपयोग करके परिवर्तन करते हैं, तो सर्वर स्वचालित रूप से आपके परिवर्तनों को आपके [Intlayer declaration files](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md) में डाल देता है, जहाँ भी ये फ़ाइलें आपके प्रोजेक्ट में घोषित होती हैं।

इस प्रकार, आपको यह चिंता करने की आवश्यकता नहीं है कि फ़ाइल कहाँ घोषित की गई है या आपके शब्दकोश संग्रह में आपकी कुंजी को खोजने के बारे में।

## Installation

एक बार जब Intlayer आपके प्रोजेक्ट में कॉन्फ़िगर हो जाता है, तो बस "intlayer-editor" को विकास निर्भरता के रूप में स्थापित करें:

```bash
npm install intlayer-editor
```

```bash
yarn add intlayer-editor
```

```bash
pnpm add intlayer-editor
```

## Configuration

### 1. Enable the Editor in your intlayer.config.ts file

अपने Intlayer कॉन्फ़िगरेशन फ़ाइल में, आप संपादक सेटिंग्स को अनुकूलित कर सकते हैं:

```typescript
const config: IntlayerConfig = {
  // ... अन्य कॉन्फ़िगरेशन सेटिंग्स
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // यदि false है, तो संपादक निष्क्रिय है और पहुंचा नहीं जा सकता।
    // क्लाइंट ID और क्लाइंट गुप्त संपादक को सक्षम करने के लिए आवश्यक हैं।
    // वे उस उपयोगकर्ता की पहचान करने की अनुमति देते हैं जो सामग्री को संपादित कर रहा है।
    // उन्हें Intlayer डैशबोर्ड - प्रोजेक्ट्स (https://intlayer.org/dashboard/projects) में एक नया ग्राहक बनाकर प्राप्त किया जा सकता है।
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> यदि आपके पास क्लाइंट ID और क्लाइंट गुप्त नहीं हैं, तो आप उन्हें [Intlayer Dashboard - Projects](https://intlayer.org/dashboard/projects) में एक नया ग्राहक बनाकर प्राप्त कर सकते हैं।

> सभी उपलब्ध पैरामीटर देखने के लिए, [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

### 2. Insert the Intlayer Editor Provider in your application

संपादक को सक्षम करने के लिए, आपको अपने अनुप्रयोग में Intlayer Editor Provider डालने की आवश्यकता है।

React JS या Vite + React अनुप्रयोगों के लिए उदाहरण:

```tsx
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

function App() {
  return (
    <IntlayerProvider>
      <IntlayerEditorProvider>{/* आपका अनुप्रयोग */}</IntlayerEditorProvider>
    </IntlayerProvider>
  );
}
```

Next.js अनुप्रयोगों के लिए उदाहरण:

```tsx
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

function Page() {
  return (
    <IntlayerServerProvider locale={locale}>
      <IntlayerClientProvider locale={locale}>
        <IntlayerEditorProvider>{/* आपका अनुप्रयोग */}</IntlayerEditorProvider>
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
}
```

## 3. Add the stylesheets to your application

संपादक शैलियों को प्रदर्शित करने के लिए, आपको अपने अनुप्रयोग में शैलियों को जोड़ने की आवश्यकता है।

यदि टेलविंड का उपयोग किया जाता है, तो आप अपने `tailwind.config.js` फ़ाइल में शैलियों को जोड़ सकते हैं:

```js
// tailwind.config.js
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

अन्यथा, आप अपने अनुप्रयोग में शैलियों को आयात कर सकते हैं:

```tsx
// app.tsx
import "intlayer-editor/css";
```

या

```css
/* app.css */
@import "intlayer-editor/css";
```

## Using the Editor

जब संपादक स्थापित, सक्षम, और चालू है, तो आप अपने सामग्री पर अपना कर्सर ले जाकर Intlayer द्वारा अनुक्रमित प्रत्येक फ़ील्ड को देख सकते हैं।

![Hovering over content](https://github.com/aymericzip/intlayer/blob/main/docs/hi/assets/intlayer_editor_hover_content.png)

यदि आपकी सामग्री को रेखांकित किया गया है, तो आप संपादित दराज प्रदर्शित करने के लिए इसे लंबे समय तक दबा सकते हैं।

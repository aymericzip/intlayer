---
docName: package__intlayer-editor
url: https://intlayer.org/doc/package/intlayer-editor
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer-editor/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: intlayer-editor - विज़ुअल ट्रांसलेशन एडिटर पैकेज
description: Intlayer के लिए विज़ुअल एडिटर पैकेज जो अनुवाद प्रबंधन और AI सहायता के साथ सहयोगी सामग्री संपादन के लिए एक सहज इंटरफ़ेस प्रदान करता है।
keywords:
  - intlayer
  - editor
  - visual
  - translation
  - collaborative
  - AI
  - NPM
  - interface
---

# intlayer-editor: Intlayer विज़ुअल एडिटर का उपयोग करने के लिए NPM पैकेज

**Intlayer** पैकेजों का एक समूह है जो विशेष रूप से जावास्क्रिप्ट डेवलपर्स के लिए डिज़ाइन किया गया है। यह React, React और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`intlayer-editor`** पैकेज एक NPM पैकेज है जो Intlayer विज़ुअल एडिटर को आपके React प्रोजेक्ट में एकीकृत करता है।

## Intlayer एडिटर कैसे काम करता है

intlayer एडिटर आपको Intlayer दूरस्थ शब्दकोश के साथ इंटरैक्ट करने की अनुमति देता है। इसे क्लाइंट साइड पर इंस्टॉल किया जा सकता है और यह आपके एप्लिकेशन को एक CMS जैसे एडिटर में बदल सकता है ताकि आप अपनी साइट की सामग्री को सभी कॉन्फ़िगर की गई भाषाओं में प्रबंधित कर सकें।

![Intlayer एडिटर इंटरफ़ेस](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

## स्थापना

अपनी पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install intlayer-editor
```

```bash packageManager="pnpm"
pnpm add intlayer-editor
```

```bash packageManager="yarn"
yarn add intlayer-editor
```

### कॉन्फ़िगरेशन

अपने Intlayer कॉन्फ़िगरेशन फ़ाइल में, आप एडिटर सेटिंग्स को कस्टमाइज़ कर सकते हैं:

```typescript
const config: IntlayerConfig = {
  // ... अन्य कॉन्फ़िगरेशन सेटिंग्स
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // यदि false है, तो एडिटर निष्क्रिय होगा और एक्सेस नहीं किया जा सकेगा।
    // एडिटर को सक्षम करने के लिए क्लाइंट ID और क्लाइंट सीक्रेट आवश्यक हैं।
    // ये उपयोगकर्ता की पहचान करने की अनुमति देते हैं जो सामग्री संपादित कर रहा है।
    // इन्हें Intlayer डैशबोर्ड - प्रोजेक्ट्स (https://intlayer.org/dashboard/projects) में नया क्लाइंट बनाकर प्राप्त किया जा सकता है।
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> यदि आपके पास क्लाइंट ID और क्लाइंट सीक्रेट नहीं हैं, तो आप उन्हें [Intlayer डैशबोर्ड - प्रोजेक्ट्स](https://intlayer.org/dashboard/projects) में नया क्लाइंट बनाकर प्राप्त कर सकते हैं।

> सभी उपलब्ध पैरामीटर देखने के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

`intlayer-editor` पैकेज Intlayer पर आधारित है और यह JavaScript एप्लिकेशन जैसे React (Create React App), Vite + React, और Next.js के लिए उपलब्ध है।

पैकेज को इंस्टॉल करने के बारे में अधिक जानकारी के लिए, नीचे संबंधित अनुभाग देखें:

### Next.js के साथ एकीकरण

Next.js के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_15.md) देखें।

### Create React App के साथ एकीकरण

Create React App के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_create_react_app.md) देखें।

### Vite + React के साथ एकीकरण

Vite + React के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+react.md) देखें।

### एकीकरण का उदाहरण

अपने React प्रोजेक्ट में Intlayer विज़ुअल एडिटर को एकीकृत करने के लिए, निम्नलिखित चरणों का पालन करें:

- अपने React एप्लिकेशन में Intlayer एडिटर कॉम्पोनेंट को इम्पोर्ट करें:

  ```tsx fileName="src/App.jsx"
  import { IntlayerEditorProvider } from "intlayer-editor";
  import { IntlayerProvider } from "react-intlayer";

  export default function App() {
    return (
      <IntlayerProvider>
        <IntlayerEditorProvider>
          <IntlayerEditor>{/* आपका ऐप कंटेंट यहाँ */}</IntlayerEditor>
        </IntlayerEditorProvider>
      </IntlayerProvider>
    );
  }
  ```

- अपने Next.js एप्लिकेशन में Intlayer एडिटर स्टाइल्स को इम्पोर्ट करें:

  ```tsx fileName="src/app/[locale]/layout.jsx"
  import { IntlayerEditorStyles } from "intlayer-editor";

  export default async function RootLayout({ children, params }) {
    const { locale } = await params;
    return (
      <IntlayerClientProvider locale={locale}>
        <IntlayerEditorProvider>
          <html lang={locale}>
            <body className={IntlayerEditorStyles}>{children}</body>
          </html>
        </IntlayerEditorProvider>
      </IntlayerClientProvider>
    );
  }
  ```

## एडिटर का उपयोग करना

जब एडिटर इंस्टॉल, सक्षम और शुरू हो जाता है, तो आप अपने कर्सर को अपनी सामग्री पर होवर करके Intlayer द्वारा इंडेक्स किए गए प्रत्येक फ़ील्ड को देख सकते हैं।

![सामग्री पर होवर करना](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

यदि आपकी सामग्री को आउटलाइन किया गया है, तो आप संपादन ड्रॉअर दिखाने के लिए इसे लंबे समय तक दबा सकते हैं।

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास

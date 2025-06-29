# intlayer-editor: Intlayer विजुअल संपादक का उपयोग करने के लिए NPM पैकेज

**Intlayer** जावास्क्रिप्ट डेवलपर्स के लिए विशेष रूप से डिज़ाइन किए गए पैकेजों का एक सूट है। यह React, React और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`intlayer-editor`** पैकेज एक NPM पैकेज है जो आपके React प्रोजेक्ट में Intlayer विजुअल संपादक को एकीकृत करता है।

## Intlayer संपादक कैसे काम करता है

Intlayer संपादक Intlayer दूरस्थ शब्दकोश के साथ इंटरैक्ट करने की अनुमति देता है। इसे क्लाइंट साइड पर इंस्टॉल किया जा सकता है और आपकी एप्लिकेशन को एक CMS-जैसे संपादक में बदल सकता है ताकि आपकी साइट की सामग्री को सभी कॉन्फ़िगर की गई भाषाओं में प्रबंधित किया जा सके।

![Intlayer संपादक इंटरफ़ेस](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

## स्थापना

अपने पसंदीदा पैकेज प्रबंधक का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

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

अपने Intlayer कॉन्फ़िगरेशन फ़ाइल में, आप संपादक सेटिंग्स को अनुकूलित कर सकते हैं:

```typescript
const config: IntlayerConfig = {
  // ... अन्य कॉन्फ़िगरेशन सेटिंग्स
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // यदि false है, तो संपादक निष्क्रिय है और इसे एक्सेस नहीं किया जा सकता।
    // क्लाइंट आईडी और क्लाइंट सीक्रेट संपादक को सक्षम करने के लिए आवश्यक हैं।
    // वे उस उपयोगकर्ता की पहचान करने की अनुमति देते हैं जो सामग्री संपादित कर रहा है।
    // इन्हें Intlayer डैशबोर्ड - प्रोजेक्ट्स (https://intlayer.org/dashboard/projects) में एक नया क्लाइंट बनाकर प्राप्त किया जा सकता है।
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> यदि आपके पास क्लाइंट आईडी और क्लाइंट सीक्रेट नहीं है, तो आप [Intlayer डैशबोर्ड - प्रोजेक्ट्स](https://intlayer.org/dashboard/projects) में एक नया क्लाइंट बनाकर उन्हें प्राप्त कर सकते हैं।

> सभी उपलब्ध पैरामीटर देखने के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

`intlayer-editor` पैकेज Intlayer पर आधारित है और यह जावास्क्रिप्ट एप्लिकेशन जैसे React (Create React App), Vite + React, और Next.js के लिए उपलब्ध है।

पैकेज को इंस्टॉल करने के तरीके के बारे में अधिक जानकारी के लिए, नीचे दिए गए संबंधित अनुभाग देखें:

### Next.js के साथ एकीकरण

Next.js के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_15.md) देखें।

### Create React App के साथ एकीकरण

Create React App के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_create_react_app.md) देखें।

### Vite + React के साथ एकीकरण

Vite + React के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+react.md) देखें।

### एकीकरण का उदाहरण

अपने React प्रोजेक्ट में Intlayer विजुअल संपादक को एकीकृत करने के लिए, इन चरणों का पालन करें:

- अपने React एप्लिकेशन में Intlayer संपादक घटक आयात करें:

  ```tsx fileName="src/App.jsx"
  import { IntlayerEditorProvider } from "intlayer-editor";
  import { IntlayerProvider } from "react-intlayer";

  export default function App() {
    return (
      <IntlayerProvider>
        <IntlayerEditorProvider>
          <IntlayerEditor>{/* यहां आपकी ऐप सामग्री */}</IntlayerEditor>
        </IntlayerEditorProvider>
      </IntlayerProvider>
    );
  }
  ```

- अपने Next.js एप्लिकेशन में Intlayer संपादक शैलियाँ आयात करें:

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

## संपादक का उपयोग करना

जब संपादक इंस्टॉल, सक्षम और शुरू किया जाता है, तो आप अपने कर्सर के साथ अपनी सामग्री पर होवर करके Intlayer द्वारा अनुक्रमित प्रत्येक फ़ील्ड देख सकते हैं।

![सामग्री पर होवर करना](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

यदि आपकी सामग्री रेखांकित है, तो आप इसे संपादन ड्रॉअर प्रदर्शित करने के लिए लंबे समय तक दबा सकते हैं।

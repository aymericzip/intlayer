# intlayer-editor: NPM पैकेज जो Intlayer दृश्य संपादक का उपयोग करता है

**Intlayer** विशेष रूप से जावास्क्रिप्ट विकासकर्ताओं के लिए डिज़ाइन किए गए पैकेजों का एक सूट है। यह React, React, और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`intlayer-editor`** पैकेज एक NPM पैकेज है जो आपके React प्रोजेक्ट में Intlayer दृश्य संपादक को एकीकृत करता है।

## Intlayer संपादक कैसे काम करता है

intlayer संपादक Intlayer दूरस्थ शब्दकोश के साथ इंटरैक्ट करने की अनुमति देता है। इसे क्लाइंट साइड पर स्थापित किया जा सकता है और आपके एप्लिकेशन को CMS-जैसे संपादक में बदलता है ताकि आपके साइट के सभी कॉन्फ़िगर किए गए भाषाओं में सामग्री प्रबंधित की जा सके।

![Intlayer संपादक इंटरफ़ेस](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_editor_ui.png)

## स्थापना

आवश्यक पैकेज को अपने पसंदीदा पैकेज प्रबंधक का उपयोग करके स्थापित करें:

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

आपकी Intlayer कॉन्फ़िगरेशन फ़ाइल में, आप संपादक सेटिंग्स को अनुकूलित कर सकते हैं:

```typescript
const config: IntlayerConfig = {
  // ... अन्य कॉन्फ़िगरेशन सेटिंग्स
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // यदि गलत है, तो संपादक अनुप्रभावी है और तक नहीं पहुँचा जा सकता।
    // संपादक को सक्षम करने के लिए क्लाइंट आईडी और क्लाइंट सीक्रेट आवश्यक हैं।
    // ये उस उपयोगकर्ता की पहचान करने की अनुमति देते हैं जो सामग्री को संपादित कर रहा है।
    // इन्हें Intlayer डैशबोर्ड - प्रोजेक्ट्स में एक नया क्लाइंट बनाकर प्राप्त किया जा सकता है (https://intlayer.org/dashboard/projects)।
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> यदि आपके पास क्लाइंट आईडी और क्लाइंट सीक्रेट नहीं हैं, तो आप इन्हें [Intlayer डैशबोर्ड - प्रोजेक्ट्स](https://intlayer.org/dashboard/projects) में एक नया क्लाइंट बनाकर प्राप्त कर सकते हैं।

> सभी उपलब्ध पैरामेटर्स को देखने के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) को देखें।

`intlayer-editor` पैकेज Intlayer पर आधारित है और जावास्क्रिप्ट एप्लिकेशनों के लिए उपलब्ध है, जैसे React (Create React App), Vite + React, और Next.js।

पैकेज को स्थापित करने के लिए अधिक जानकारी के लिए, नीचे दिए गए संबंधित अनुभाग देखें:

### Next.js के साथ एकीकृत करना

Next.js के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md) देखें।

### Create React App के साथ एकीकृत करना

Create React App के साथ एकीकृत करने के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md) देखें।

### Vite + React के साथ एकीकृत करना

Vite + React के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_vite+react.md) देखें।

### एकीकरण का उदाहरण

अपने React प्रोजेक्ट में Intlayer दृश्य संपादक को एकीकृत करने के लिए, निम्नलिखित कदमों का पालन करें:

- अपने React एप्लिकेशन में Intlayer संपादक घटक को आयात करें:

  ```tsx fileName="src/App.jsx"
  import { IntlayerEditorProvider } from "intlayer-editor";
  import { IntlayerProvider } from "react-intlayer";

  export default function App() {
    return (
      <IntlayerProvider>
        <IntlayerEditorProvider>
          <IntlayerEditor>{/* यहाँ आपका ऐप सामग्री */}</IntlayerEditor>
        </IntlayerEditorProvider>
      </IntlayerProvider>
    );
  }
  ```

- अपने Next.js एप्लिकेशन में Intlayer संपादक शैलियों को आयात करें:

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

जब संपादक स्थापित, सक्षम और शुरू किया जाता है, तो आप अपने सामग्री पर कर्सर के साथ होवर करके प्रत्येक क्षेत्र को Intlayer द्वारा अनुक्रमित देख सकते हैं।

![सामग्री पर होवरिंग](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_editor_hover_content.png)

यदि आपकी सामग्री रेखांकित है, तो आप इसे संपादन ड्रावर प्रदर्शित करने के लिए लंबे समय तक दबा सकते हैं।

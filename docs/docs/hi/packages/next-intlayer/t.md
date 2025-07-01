---
docName: package__next-intlayer__t
url: https://intlayer.org/doc/packages/next-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/t.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: t फ़ंक्शन दस्तावेज़ीकरण | next-intlayer
description: next-intlayer पैकेज के लिए t फ़ंक्शन का उपयोग कैसे करें देखें
keywords:
  - t
  - अनुवाद
  - Intlayer
  - next-intlayer
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Next.js
  - जावास्क्रिप्ट
  - React
---

# दस्तावेज़ीकरण: `next-intlayer` में `t` फ़ंक्शन

`next-intlayer` पैकेज में `t` फ़ंक्शन आपके Next.js एप्लिकेशन के भीतर इनलाइन अंतर्राष्ट्रीयकरण के लिए एक मौलिक उपकरण है। यह आपको अपने कंपोनेंट्स के भीतर सीधे अनुवाद परिभाषित करने की अनुमति देता है, जिससे वर्तमान लोकल के आधार पर स्थानीयकृत सामग्री प्रदर्शित करना सरल हो जाता है।

---

## अवलोकन

` t` फ़ंक्शन का उपयोग आपके कंपोनेंट्स में सीधे विभिन्न लोकल के लिए अनुवाद प्रदान करने के लिए किया जाता है। प्रत्येक समर्थित लोकल के लिए अनुवादों वाले ऑब्जेक्ट को पास करके, `t` आपके Next.js एप्लिकेशन में वर्तमान लोकल संदर्भ के आधार पर उपयुक्त अनुवाद लौटाता है।

---

## मुख्य विशेषताएँ

- **इनलाइन अनुवाद**: त्वरित, इनलाइन टेक्स्ट के लिए आदर्श जो अलग सामग्री घोषणा की आवश्यकता नहीं है।
- **स्वचालित लोकल चयन**: वर्तमान लोकल के अनुरूप अनुवाद स्वचालित रूप से लौटाता है।
- **टाइपस्क्रिप्ट समर्थन**: टाइपस्क्रिप्ट के साथ उपयोग करने पर टाइप सुरक्षा और ऑटोकंप्लीशन प्रदान करता है।
- **आसान एकीकरण**: Next.js में क्लाइंट और सर्वर दोनों कंपोनेंट्स के भीतर सहजता से काम करता है।

---

## फ़ंक्शन हस्ताक्षर

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### पैरामीटर

- `translations`: एक ऑब्जेक्ट जिसमें कुंजी लोकल कोड (जैसे, `en`, `fr`, `es`) होते हैं और मान संबंधित अनुवादित स्ट्रिंग्स होते हैं।

### रिटर्न करता है

- एक स्ट्रिंग जो वर्तमान लोकल के लिए अनुवादित सामग्री का प्रतिनिधित्व करती है।

---

## उपयोग के उदाहरण

### क्लाइंट कंपोनेंट में `t` का उपयोग करना

`'use client';` निर्देश को अपने कंपोनेंट फ़ाइल के शीर्ष पर शामिल करना सुनिश्चित करें जब आप क्लाइंट-साइड कंपोनेंट में `t` का उपयोग कर रहे हों।

```tsx codeFormat="typescript"
"use client";

import type { FC } from "react";
import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer";

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

const ClientComponentExample = () => (
  <p>
    {t({
      en: "यह एक क्लाइंट कंपोनेंट उदाहरण की सामग्री है",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es le contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

### सर्वर कंपोनेंट में `t` का उपयोग करना

```tsx codeFormat="typescript"
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      en: "यह एक सर्वर कंपोनेंट उदाहरण की सामग्री है",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer/server";

const ServerComponentExample = () => (
  <p>
    {t({
      en: "यह एक सर्वर कंपोनेंट उदाहरण की सामग्री है",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer/server");

const ServerComponentExample = () => (
  <p>
    {t({
      en: "यह एक सर्वर कंपोनेंट उदाहरण की सामग्री है",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

###एट्रिब्यूट्स में इनलाइन अनुवाद

`t` फ़ंक्शन JSX एट्रिब्यूट्स में इनलाइन अनुवाद के लिए विशेष रूप से उपयोगी है।
जब आप `alt`, `title`, `href`, या `aria-label` जैसे एट्रिब्यूट्स का स्थानीयकरण कर रहे हों, तो आप सीधे एट्रिब्यूट के भीतर `t` का उपयोग कर सकते हैं।

```jsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## उन्नत विषय

### TypeScript एकीकरण

जब `t` फ़ंक्शन TypeScript के साथ उपयोग किया जाता है, तो यह टाइप-सुरक्षित होता है, जिससे यह सुनिश्चित होता है कि सभी आवश्यक लोकल्स प्रदान किए गए हैं।

```typescript codeFormat="typescript"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### लोकल डिटेक्शन और संदर्भ

`next-intlayer` में, वर्तमान लोकल को संदर्भ प्रदाताओं के माध्यम से प्रबंधित किया जाता है: `IntlayerClientProvider` और `IntlayerServerProvider`। सुनिश्चित करें कि ये प्रदाता आपके घटकों को लपेटते हैं और `locale` प्रॉप सही ढंग से पास किया गया है।

#### उदाहरण:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* आपके घटक यहाँ */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="esm"
javascript codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* आपके घटक यहाँ */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider } = require("next-intlayer/server");

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* आपके घटक यहाँ */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## सामान्य त्रुटियाँ और समस्या निवारण

### `t` अपरिभाषित या गलत अनुवाद लौटाता है

- **कारण**: वर्तमान लोकल सही ढंग से सेट नहीं है, या वर्तमान लोकल के लिए अनुवाद गायब है।
- **समाधान**:
  - सत्यापित करें कि `IntlayerClientProvider` या `IntlayerServerProvider` उचित `locale` के साथ सही ढंग से सेट है।
  - सुनिश्चित करें कि आपके अनुवाद ऑब्जेक्ट में सभी आवश्यक लोकल शामिल हैं।

### TypeScript में अनुवाद गायब हैं

- **कारण**: अनुवाद ऑब्जेक्ट आवश्यक लोकल को पूरा नहीं करता है, जिससे TypeScript त्रुटियाँ होती हैं।
- **समाधान**: अपने अनुवादों की पूर्णता सुनिश्चित करने के लिए `IConfigLocales` प्रकार का उपयोग करें।

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' के अभाव में TypeScript त्रुटि होगी [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' के अभाव में TypeScript त्रुटि होगी [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' के अभाव में TypeScript त्रुटि होगी [!code error]
};

const text = t(translations);
```

---

## प्रभावी उपयोग के लिए सुझाव

1. **सरल इनलाइन अनुवाद के लिए `t` का उपयोग करें**: अपने कॉम्पोनेंट्स के भीतर सीधे छोटे टेक्स्ट के टुकड़ों का अनुवाद करने के लिए आदर्श।
2. **संरचित सामग्री के लिए `useIntlayer` को प्राथमिकता दें**: अधिक जटिल अनुवादों और सामग्री पुन: उपयोग के लिए, घोषणा फ़ाइलों में सामग्री को परिभाषित करें और `useIntlayer` का उपयोग करें।
3. **सुसंगत लोकल प्रदान करना**: सुनिश्चित करें कि आपका लोकल आपके एप्लिकेशन में उपयुक्त प्रदाताओं के माध्यम से लगातार प्रदान किया जाता है।
4. **TypeScript का लाभ उठाएं**: TypeScript प्रकारों का उपयोग करें ताकि गायब अनुवादों को पकड़ सकें और प्रकार सुरक्षा सुनिश्चित कर सकें।

---

## निष्कर्ष

`next-intlayer` में `t` फ़ंक्शन आपके Next.js एप्लिकेशन में इनलाइन अनुवादों को प्रबंधित करने के लिए एक शक्तिशाली और सुविधाजनक उपकरण है। इसे प्रभावी ढंग से एकीकृत करके, आप अपने ऐप की अंतरराष्ट्रीयकरण क्षमताओं को बढ़ाते हैं, जिससे विश्व भर के उपयोगकर्ताओं के लिए बेहतर अनुभव प्रदान होता है।

अधिक विस्तृत उपयोग और उन्नत सुविधाओं के लिए, कृपया [next-intlayer दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) देखें।

---

**नोट**: याद रखें कि अपने `IntlayerClientProvider` और `IntlayerServerProvider` को सही ढंग से सेटअप करें ताकि वर्तमान लोकल आपके घटकों तक सही तरीके से पहुंच सके। यह `t` फ़ंक्शन के सही अनुवाद लौटाने के लिए अत्यंत महत्वपूर्ण है।

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास

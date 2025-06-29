---
docName: package__next-intlayer__t
url: https://intlayer.org/doc/packages/next-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/t.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: t फ़ंक्शन प्रलेखन | next-intlayer
description: next-intlayer पैकेज के लिए t फ़ंक्शन का उपयोग कैसे करें, यह जानें
keywords:
  - t
  - अनुवाद
  - Intlayer
  - next-intlayer
  - अंतर्राष्ट्रीयकरण
  - प्रलेखन
  - Next.js
  - JavaScript
  - React
---

# दस्तावेज़: `t` फ़ंक्शन `next-intlayer` में

`next-intlayer` पैकेज में `t` फ़ंक्शन आपके Next.js एप्लिकेशन में इनलाइन अंतर्राष्ट्रीयकरण के लिए एक मौलिक उपकरण है। यह आपको अपने घटकों के भीतर सीधे अनुवाद परिभाषित करने की अनुमति देता है, जिससे वर्तमान लोकेल के आधार पर स्थानीयकृत सामग्री प्रदर्शित करना सरल हो जाता है।

---

## अवलोकन

`t` फ़ंक्शन का उपयोग आपके घटकों में सीधे विभिन्न लोकेल्स के लिए अनुवाद प्रदान करने के लिए किया जाता है। प्रत्येक समर्थित लोकेल के लिए अनुवादों की एक वस्तु पास करके, `t` आपके Next.js एप्लिकेशन में वर्तमान लोकेल संदर्भ के आधार पर उपयुक्त अनुवाद लौटाता है।

---

## मुख्य विशेषताएं

- **इनलाइन अनुवाद**: त्वरित, इनलाइन टेक्स्ट के लिए आदर्श जो अलग सामग्री घोषणा की आवश्यकता नहीं है।
- **स्वचालित लोकेल चयन**: स्वचालित रूप से वर्तमान लोकेल के अनुरूप अनुवाद लौटाता है।
- **टाइपस्क्रिप्ट समर्थन**: टाइपस्क्रिप्ट के साथ उपयोग किए जाने पर प्रकार सुरक्षा और स्वतः पूर्णता प्रदान करता है।
- **आसान एकीकरण**: Next.js में क्लाइंट और सर्वर दोनों घटकों के भीतर सहजता से काम करता है।

---

## फ़ंक्शन हस्ताक्षर

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### पैरामीटर

- `translations`: एक वस्तु जहां कुंजियाँ लोकेल कोड (जैसे, `en`, `fr`, `es`) हैं और मान संबंधित अनुवादित स्ट्रिंग्स हैं।

### रिटर्न्स

- एक स्ट्रिंग जो वर्तमान लोकेल के लिए अनुवादित सामग्री का प्रतिनिधित्व करती है।

---

## उपयोग के उदाहरण

### क्लाइंट घटक में `t` का उपयोग करना

जब क्लाइंट-साइड घटक में `t` का उपयोग करते हैं, तो सुनिश्चित करें कि आप अपने घटक फ़ाइल के शीर्ष पर `'use client';` निर्देश शामिल करें।

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
      hi: "यह एक क्लाइंट घटक उदाहरण की सामग्री है",
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
      hi: "यह एक क्लाइंट घटक उदाहरण की सामग्री है",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es le contenido d un ejemplo de componente cliente",
      hi: "यह एक क्लाइंट घटक उदाहरण की सामग्री है",
    })}
  </p>
);
```

### सर्वर घटक में `t` का उपयोग करना

```tsx codeFormat="typescript"
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
      hi: "यह एक सर्वर घटक उदाहरण की सामग्री है",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer/server";

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
      hi: "यह एक सर्वर घटक उदाहरण की सामग्री है",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer/server");

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
      hi: "यह एक सर्वर घटक उदाहरण की सामग्री है",
    })}
  </p>
);
```

### गुणों में इनलाइन अनुवाद

`t` फ़ंक्शन JSX गुणों में इनलाइन अनुवाद के लिए विशेष रूप से उपयोगी है। जब `alt`, `title`, `href`, या `aria-label` जैसे गुणों को स्थानीयकृत करते हैं, तो आप सीधे गुण के भीतर `t` का उपयोग कर सकते हैं।

```jsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
    hi: "जमा करें",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
    hi: "जमा करें",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
      hi: "एक सुंदर दृश्य",
    })}
  />
</button>
```

---

## उन्नत विषय

### टाइपस्क्रिप्ट एकीकरण

जब टाइपस्क्रिप्ट के साथ उपयोग किया जाता है, तो `t` फ़ंक्शन प्रकार-सुरक्षित होता है, यह सुनिश्चित करता है कि सभी आवश्यक लोकेल प्रदान किए गए हैं।

```typescript codeFormat="typescript"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
  hi: "स्वागत है",
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
  hi: "स्वागत है",
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
  hi: "स्वागत है",
};

const greeting = t(translations);
```

### लोकेल का पता लगाना और संदर्भ

`next-intlayer` में, वर्तमान लोकेल संदर्भ प्रदाताओं के माध्यम से प्रबंधित किया जाता है: `IntlayerClientProvider` और `IntlayerServerProvider`। सुनिश्चित करें कि ये प्रदाता आपके घटकों को लपेटते हैं और `locale` प्रॉप सही ढंग से पास किया गया है।

#### उदाहरण:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* आपके घटक यहां */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* आपके घटक यहां */}
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
      {/* आपके घटक यहां */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## सामान्य त्रुटियां और समस्या निवारण

### `t` अपरिभाषित या गलत अनुवाद लौटाता है

- **कारण**: वर्तमान लोकेल सही ढंग से सेट नहीं है, या वर्तमान लोकेल के लिए अनुवाद गायब है।
- **समाधान**:
  - सत्यापित करें कि `IntlayerClientProvider` या `IntlayerServerProvider` उचित `locale` के साथ सही ढंग से सेट किया गया है।
  - सुनिश्चित करें कि आपकी अनुवाद वस्तु में सभी आवश्यक लोकेल शामिल हैं।

### टाइपस्क्रिप्ट में गायब अनुवाद

- **कारण**: अनुवाद वस्तु आवश्यक लोकेल को संतुष्ट नहीं करती है, जिससे टाइपस्क्रिप्ट त्रुटियां होती हैं।
- **समाधान**: अपने अनुवादों की पूर्णता को लागू करने के लिए `IConfigLocales` प्रकार का उपयोग करें।

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' गायब होने से टाइपस्क्रिप्ट त्रुटि होगी [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' गायब होने से टाइपस्क्रिप्ट त्रुटि होगी [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' गायब होने से टाइपस्क्रिप्ट त्रुटि होगी [!code error]
};

const text = t(translations);
```

---

## प्रभावी उपयोग के लिए सुझाव

1. **सरल इनलाइन अनुवाद के लिए `t` का उपयोग करें**: अपने घटकों के भीतर सीधे छोटे टेक्स्ट का अनुवाद करने के लिए आदर्श।
2. **संरचित सामग्री के लिए `useIntlayer` को प्राथमिकता दें**: अधिक जटिल अनुवाद और सामग्री पुन: उपयोग के लिए, घोषणा फ़ाइलों में सामग्री परिभाषित करें और `useIntlayer` का उपयोग करें।
3. **संगत लोकेल प्रावधान**: सुनिश्चित करें कि आपके एप्लिकेशन में उपयुक्त प्रदाताओं के माध्यम से आपका लोकेल लगातार प्रदान किया गया है।
4. **टाइपस्क्रिप्ट का लाभ उठाएं**: गायब अनुवादों को पकड़ने और प्रकार सुरक्षा सुनिश्चित करने के लिए टाइपस्क्रिप्ट प्रकारों का उपयोग करें।

---

## निष्कर्ष

`next-intlayer` में `t` फ़ंक्शन आपके Next.js एप्लिकेशन में इनलाइन अनुवाद प्रबंधन के लिए एक शक्तिशाली और सुविधाजनक उपकरण है। इसे प्रभावी ढंग से एकीकृत करके, आप अपने ऐप की अंतर्राष्ट्रीयकरण क्षमताओं को बढ़ाते हैं, जिससे दुनिया भर के उपयोगकर्ताओं के लिए बेहतर अनुभव मिलता है।

अधिक विस्तृत उपयोग और उन्नत सुविधाओं के लिए, [next-intlayer दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) देखें।

---

**नोट**: सुनिश्चित करें कि आपके `IntlayerClientProvider` और `IntlayerServerProvider` को सही ढंग से सेट किया गया है ताकि वर्तमान लोकेल आपके घटकों तक सही ढंग से पहुंच सके। यह सुनिश्चित करने के लिए महत्वपूर्ण है कि `t` फ़ंक्शन सही अनुवाद लौटाए।

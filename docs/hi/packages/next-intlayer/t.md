# Documentation: `t` Function in `next-intlayer`

`next-intlayer` पैकेज में `t` फ़ंक्शन आपके Next.js एप्लिकेशन में इनलाइन अंतरराष्ट्रीयकरण के लिए एक मौलिक टूल है। यह आपको अपने घटकों के भीतर सीधे अनुवाद को परिभाषित करने की अनुमति देता है, जिससे वर्तमान स्थान के आधार पर स्थानीयकृत सामग्री प्रदर्शित करना सरल हो जाता है।

---

## Overview

`t` फ़ंक्शन का उपयोग आपके घटकों में सीधे विभिन्न स्थलों के लिए अनुवाद प्रदान करने के लिए किया जाता है। प्रत्येक समर्थित स्थान के लिए अनुवादों वाली एक वस्तु प्राप्त करके, `t` आपके Next.js एप्लिकेशन के वर्तमान स्थान संदर्भ के आधार पर उपयुक्त अनुवाद लौटाता है।

---

## Key Features

- **Inline Translations**: तेजी से, इनलाइन टेक्स्ट के लिए अनुकूल है जिसे एक अलग सामग्री घोषणा की आवश्यकता नहीं है।
- **Automatic Locale Selection**: वर्तमान स्थान से संबंधित अनुवाद स्वचालित रूप से लौटाता है।
- **TypeScript Support**: TypeScript के साथ उपयोग करने पर प्रकार सुरक्षा और स्व-पूर्णता प्रदान करता है।
- **Easy Integration**: Next.js में ग्राहक और सर्वर दोनों घटकों के भीतर आसानी से काम करता है।

---

## Function Signature

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parameters

- `translations`: एक वस्तु जहाँ कुंजियाँ स्थान कोड (जैसे, `en`, `fr`, `es`) हैं और मान संबंधित अनुवादित स्ट्रिंग्स हैं।

### Returns

- वर्तमान स्थान के लिए अनुवादित सामग्री का प्रतिनिधित्व करने वाला एक स्ट्रिंग।

---

## Usage Examples

### Using `t` in a Client Component

जब आप `t` को ग्राहक-पक्ष घटक में उपयोग कर रहे हैं, तो सुनिश्चित करें कि आप अपने घटक फ़ाइल के शीर्ष पर `'use client';` निर्देश शामिल करें।

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
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

### Using `t` in a Server Component

```tsx codeFormat="typescript"
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
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
      en: "This is the content of a server component example",
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
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

### Inline Translations in Attributes

`t` फ़ंक्शन JSX गुणों में इनलाइन अनुवादों के लिए विशेष रूप से उपयोगी है।
जब `alt`, `title`, `href`, या `aria-label` जैसे गुणों का स्थानीयकरण करना हो, तो आप विशेष रूप से गुण के भीतर सीधे `t` का उपयोग कर सकते हैं।

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

## Advanced Topics

### TypeScript Integration

`t` फ़ंक्शन TypeScript के साथ उपयोग करने पर प्रकार-सुरक्षित होता है, यह सुनिश्चित करता है कि सभी आवश्यक स्थलों को प्रदान किया गया है।

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Locale Detection and Context

`next-intlayer` में, वर्तमान स्थान को संदर्भ प्रदाताओं के माध्यम से प्रबंधित किया जाता है: `IntlayerClientProvider` और `IntlayerServerProvider`। सुनिश्चित करें कि ये प्रदाता आपके घटकों को लपेटें और `locale` प्रॉप सही ढंग से पास किया गया है।

#### Example:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";

const Page: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* आपके घटक यहाँ */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";

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

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* आपके घटक यहाँ */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## Common Errors and Troubleshooting

### `t` Returns Undefined or Incorrect Translation

- **Cause**: वर्तमान स्थान सही रूप से सेट नहीं किया गया है, या वर्तमान स्थान के लिए अनुवाद गायब है।
- **Solution**:
  - सत्यापित करें कि `IntlayerClientProvider` या `IntlayerServerProvider` सही रूप से सेट अप किया गया है।
  - सुनिश्चित करें कि आपकी अनुवादों की वस्तु सभी आवश्यक स्थलों को शामिल करती है।

### Missing Translations in TypeScript

- **Cause**: अनुवादों की वस्तु आवश्यक स्थलों को संतुष्ट नहीं करती है, जिससे TypeScript त्रुटियाँ होती हैं।
- **Solution**: अपने अनुवादों की पूर्णता को लागू करने के लिए `IConfigLocales` प्रकार का उपयोग करें।

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Missing 'es' will cause a TypeScript error [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Missing 'es' will cause a TypeScript error [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Missing 'es' will cause a TypeScript error [!code error]
};

const text = t(translations);
```

---

## Tips for Effective Usage

1. **Use `t` for Simple Inline Translations**: सीधे अपने घटकों के भीतर छोटे टेक्स्ट के अनुवाद के लिए आदर्श।
2. **Prefer `useIntlayer` for Structured Content**: अधिक जटिल अनुवादों और सामग्री पुन: उपयोग के लिए, सामग्री को घोषणा फ़ाइलों में परिभाषित करें और `useIntlayer` का उपयोग करें।
3. **Consistent Locale Provision**: सुनिश्चित करें कि आपके एप्लिकेशन में उचित प्रदाताओं के माध्यम से स्थलों को स्थिरता से प्रदान किया गया है।
4. **Leverage TypeScript**: गायब अनुवादों को पकड़ने और प्रकार सुरक्षा सुनिश्चित करने के लिए TypeScript प्रकारों का उपयोग करें।

---

## Conclusion

`next-intlayer` में `t` फ़ंक्शन आपके Next.js एप्लिकेशनों में इनलाइन अनुवादों को प्रबंधित करने के लिए एक शक्तिशाली और सुविधाजनक टूल है। इसे प्रभावी ढंग से एकीकृत करके, आप अपने ऐप के अंतरराष्ट्रीयकरण क्षमताओं को बढ़ाते हैं, जो विश्वभर के उपयोगकर्ताओं के लिए बेहतर अनुभव प्रदान करता है।

अधिक विस्तृत उपयोग और उन्नत सुविधाओं के लिए, [next-intlayer documentation](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_editor.md) पर जाएं।

---

**Note**: सुनिश्चित करें कि आप अपने `IntlayerClientProvider` और `IntlayerServerProvider` को सही ढंग से सेट अप करें ताकि वर्तमान स्थान को सही रूप से आपके घटकों तक पहुँचाया जा सके। यह आवश्यक है ताकि `t` फ़ंक्शन सही अनुवाद लौटाए।

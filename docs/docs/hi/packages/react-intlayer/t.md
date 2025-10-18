---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: t फ़ंक्शन दस्तावेज़ीकरण | react-intlayer
description: react-intlayer पैकेज के लिए t फ़ंक्शन का उपयोग कैसे करें देखें
keywords:
  - t
  - अनुवाद
  - Intlayer
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: प्रारंभिक इतिहास
---

# दस्तावेज़ीकरण: `react-intlayer` में `t` फ़ंक्शन

`react-intlayer` पैकेज में `t` फ़ंक्शन आपके React एप्लिकेशन के भीतर इनलाइन अंतरराष्ट्रीयकरण के लिए एक मौलिक उपकरण है। यह आपको अपने कॉम्पोनेंट्स के भीतर सीधे अनुवाद परिभाषित करने की अनुमति देता है, जिससे वर्तमान लोकल के आधार पर स्थानीयकृत सामग्री प्रदर्शित करना सरल हो जाता है।

---

## अवलोकन

`t` फ़ंक्शन का उपयोग आपके कॉम्पोनेंट्स में सीधे विभिन्न लोकल के लिए अनुवाद प्रदान करने के लिए किया जाता है। प्रत्येक समर्थित लोकल के लिए अनुवादों वाला एक ऑब्जेक्ट पास करके, `t` आपके React एप्लिकेशन में वर्तमान लोकल संदर्भ के आधार पर उपयुक्त अनुवाद लौटाता है।

---

## मुख्य विशेषताएँ

- **इनलाइन अनुवाद**: त्वरित, इनलाइन टेक्स्ट के लिए आदर्श जो अलग सामग्री घोषणा की आवश्यकता नहीं है।
- **स्वचालित लोकल चयन**: वर्तमान लोकल के अनुसार अनुवाद स्वचालित रूप से लौटाता है।
- **टाइपस्क्रिप्ट समर्थन**: टाइपस्क्रिप्ट के साथ उपयोग करने पर टाइप सुरक्षा और ऑटोकम्प्लीशन प्रदान करता है।
- **आसान एकीकरण**: React कॉम्पोनेंट्स के भीतर सहजता से काम करता है।

---

## फ़ंक्शन हस्ताक्षर

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### पैरामीटर

- `translations`: एक ऑब्जेक्ट जहां कुंजी लोकल कोड होते हैं (जैसे, `en`, `fr`, `es`) और मान संबंधित अनुवादित स्ट्रिंग्स होते हैं।

### रिटर्न करता है

- एक स्ट्रिंग जो वर्तमान लोकल के लिए अनुवादित सामग्री का प्रतिनिधित्व करती है।

---

## उपयोग के उदाहरण

### एक कॉम्पोनेंट में `t` का बुनियादी उपयोग

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { t } from "react-intlayer";

export const ComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { t } from "react-intlayer";

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { t } = require("react-intlayer");

// एक उदाहरण घटक
const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

### एट्रिब्यूट्स में इनलाइन अनुवाद

` t` फ़ंक्शन JSX एट्रिब्यूट्स में इनलाइन अनुवाद के लिए विशेष रूप से उपयोगी है। जब आप `alt`, `title`, `href`, या `aria-label` जैसे एट्रिब्यूट्स का स्थानीयकरण करते हैं, तो आप सीधे एट्रिब्यूट के भीतर `t` का उपयोग कर सकते हैं।

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

### टाइपस्क्रिप्ट एकीकरण

जब टाइपस्क्रिप्ट के साथ `t` फ़ंक्शन का उपयोग किया जाता है, तो यह टाइप-सुरक्षित होता है, जिससे यह सुनिश्चित होता है कि सभी आवश्यक स्थानीय भाषाएँ प्रदान की गई हैं।

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "react-intlayer";

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### स्थानीय भाषा पहचान और संदर्भ

`react-intlayer` में, वर्तमान स्थानीय भाषा `IntlayerProvider` के माध्यम से प्रबंधित की जाती है। सुनिश्चित करें कि यह प्रदाता आपके घटकों को लपेटता है और `locale` प्रॉप सही ढंग से पास किया गया है।

#### उदाहरण:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerProvider } from "react-intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerProvider locale={locale}>{/* आपके घटक यहाँ */}</IntlayerProvider>
);
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>{/* आपके घटक यहाँ */}</IntlayerProvider>
);
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>{/* आपके घटक यहाँ */}</IntlayerProvider>
);
```

---

## सामान्य त्रुटियाँ और समस्या निवारण

### `t` अपरिभाषित या गलत अनुवाद लौटाता है

- **कारण**: वर्तमान लोकल सही ढंग से सेट नहीं है, या वर्तमान लोकल के लिए अनुवाद गायब है।
- **समाधान**:
  - सत्यापित करें कि `IntlayerProvider` उपयुक्त `locale` के साथ सही ढंग से सेट किया गया है।
  - सुनिश्चित करें कि आपके अनुवाद ऑब्जेक्ट में सभी आवश्यक लोकल शामिल हैं।

### TypeScript में अनुवाद गायब होना

- **कारण**: अनुवाद ऑब्जेक्ट आवश्यक लोकल को पूरा नहीं करता है, जिससे TypeScript त्रुटियाँ होती हैं।
- **समाधान**: अपने अनुवादों की पूर्णता सुनिश्चित करने के लिए `IConfigLocales` प्रकार का उपयोग करें।

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' का अभाव TypeScript त्रुटि उत्पन्न करेगा
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' का अभाव TypeScript त्रुटि उत्पन्न करेगा
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' का अभाव TypeScript त्रुटि उत्पन्न करेगा
};

const text = t(translations);
```

---

## प्रभावी उपयोग के लिए सुझाव

1. **सरल इनलाइन अनुवाद के लिए `t` का उपयोग करें**: अपने कंपोनेंट्स के भीतर सीधे छोटे टेक्स्ट के टुकड़ों का अनुवाद करने के लिए आदर्श।
2. **संरचित सामग्री के लिए `useIntlayer` को प्राथमिकता दें**: अधिक जटिल अनुवाद और सामग्री पुन: उपयोग के लिए, घोषणा फ़ाइलों में सामग्री परिभाषित करें और `useIntlayer` का उपयोग करें।
3. **सुसंगत लोकल प्रदान करना**: सुनिश्चित करें कि आपका लोकल आपके पूरे एप्लिकेशन में `IntlayerProvider` के माध्यम से सुसंगत रूप से प्रदान किया गया है।
4. **TypeScript का लाभ उठाएं**: TypeScript प्रकारों का उपयोग करें ताकि गायब अनुवादों को पकड़ा जा सके और प्रकार सुरक्षा सुनिश्चित हो सके।

---

## निष्कर्ष

`react-intlayer` में `t` फ़ंक्शन आपके React एप्लिकेशन में इनलाइन अनुवादों को प्रबंधित करने के लिए एक शक्तिशाली और सुविधाजनक उपकरण है। इसे प्रभावी ढंग से एकीकृत करके, आप अपने ऐप की अंतरराष्ट्रीयकरण क्षमताओं को बढ़ाते हैं, जिससे विश्व भर के उपयोगकर्ताओं के लिए बेहतर अनुभव प्रदान होता है।

अधिक विस्तृत उपयोग और उन्नत सुविधाओं के लिए, कृपया [react-intlayer प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) देखें।

---

**ध्यान दें**: याद रखें कि अपने `IntlayerProvider` को सही ढंग से सेट अप करें ताकि वर्तमान लोकल आपके घटकों तक सही ढंग से पहुंचाया जा सके। यह `t` फ़ंक्शन के लिए सही अनुवाद लौटाने के लिए अत्यंत महत्वपूर्ण है।

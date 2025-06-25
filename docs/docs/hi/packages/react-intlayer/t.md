---
docName: package__react-intlayer__t
url: https://intlayer.org/doc/packages/react-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/t.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: t फ़ंक्शन दस्तावेज़ | react-intlayer
description: react-intlayer पैकेज के लिए t फ़ंक्शन का उपयोग कैसे करें, यह देखें
keywords:
  - t
  - अनुवाद
  - Intlayer
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़
  - Next.js
  - JavaScript
  - React
---

# दस्तावेज़: `t` फ़ंक्शन `react-intlayer` में

`react-intlayer` पैकेज में `t` फ़ंक्शन आपके React एप्लिकेशन में इनलाइन अंतर्राष्ट्रीयकरण के लिए एक मौलिक उपकरण है। यह आपको अपने घटकों के भीतर सीधे अनुवाद परिभाषित करने की अनुमति देता है, जिससे वर्तमान लोकेल के आधार पर स्थानीयकृत सामग्री प्रदर्शित करना सरल हो जाता है।

---

## अवलोकन

`t` फ़ंक्शन का उपयोग आपके घटकों में विभिन्न लोकेल्स के लिए अनुवाद प्रदान करने के लिए किया जाता है। प्रत्येक समर्थित लोकेल के लिए अनुवादों वाली एक वस्तु पास करके, `t` आपके React एप्लिकेशन में वर्तमान लोकेल संदर्भ के आधार पर उपयुक्त अनुवाद लौटाता है।

---

## मुख्य विशेषताएँ

- **इनलाइन अनुवाद**: त्वरित, इनलाइन टेक्स्ट के लिए आदर्श जो अलग सामग्री घोषणा की आवश्यकता नहीं है।
- **स्वचालित लोकेल चयन**: स्वचालित रूप से वर्तमान लोकेल के अनुरूप अनुवाद लौटाता है।
- **टाइपस्क्रिप्ट समर्थन**: टाइप सेफ्टी और टाइपस्क्रिप्ट के साथ उपयोग किए जाने पर ऑटो-कम्प्लीशन प्रदान करता है।
- **आसान एकीकरण**: React घटकों के भीतर सहजता से काम करता है।

---

## फ़ंक्शन हस्ताक्षर

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### पैरामीटर्स

- `translations`: एक वस्तु जहाँ कुंजियाँ लोकेल कोड्स (जैसे, `en`, `fr`, `es`) हैं और मान संबंधित अनुवादित स्ट्रिंग्स हैं।

### रिटर्न्स

- वर्तमान लोकेल के लिए अनुवादित सामग्री का प्रतिनिधित्व करने वाली एक स्ट्रिंग।

---

## उपयोग के उदाहरण

### एक घटक में `t` का बुनियादी उपयोग

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
          hi: "यह एक घटक का उदाहरण है",
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
          hi: "यह एक घटक का उदाहरण है",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { t } = require("react-intlayer");

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
          hi: "यह एक घटक का उदाहरण है",
        })}
      </p>
    </div>
  );
};
```

### गुणों में इनलाइन अनुवाद

`t` फ़ंक्शन JSX गुणों में इनलाइन अनुवाद के लिए विशेष रूप से उपयोगी है। `alt`, `title`, `href`, या `aria-label` जैसे गुणों को स्थानीयकृत करते समय, आप सीधे गुण के भीतर `t` का उपयोग कर सकते हैं।

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

जब टाइपस्क्रिप्ट के साथ उपयोग किया जाता है, तो `t` फ़ंक्शन टाइप-सुरक्षित होता है, यह सुनिश्चित करता है कि सभी आवश्यक लोकेल्स प्रदान किए गए हैं।

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
  hi: "स्वागत है",
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
  hi: "स्वागत है",
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
  hi: "स्वागत है",
};

const greeting = t(translations);
```

### लोकेल डिटेक्शन और संदर्भ

`react-intlayer` में, वर्तमान लोकेल `IntlayerProvider` के माध्यम से प्रबंधित किया जाता है। सुनिश्चित करें कि यह प्रदाता आपके घटकों को रैप करता है और `locale` प्रॉप सही तरीके से पास किया गया है।

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

- **कारण**: वर्तमान लोकेल सही तरीके से सेट नहीं है, या वर्तमान लोकेल के लिए अनुवाद गायब है।
- **समाधान**:
  - सुनिश्चित करें कि `IntlayerProvider` उपयुक्त `locale` के साथ सही तरीके से सेटअप किया गया है।
  - सुनिश्चित करें कि आपकी अनुवाद वस्तु में सभी आवश्यक लोकेल्स शामिल हैं।

### टाइपस्क्रिप्ट में गायब अनुवाद

- **कारण**: अनुवाद वस्तु आवश्यक लोकेल्स को संतुष्ट नहीं करती है, जिससे टाइपस्क्रिप्ट त्रुटियाँ होती हैं।
- **समाधान**: अपने अनुवादों की पूर्णता को लागू करने के लिए `IConfigLocales` प्रकार का उपयोग करें।

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' गायब होने से टाइपस्क्रिप्ट त्रुटि होगी
  hi: "पाठ",
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' गायब होने से टाइपस्क्रिप्ट त्रुटि होगी
  hi: "पाठ",
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' गायब होने से टाइपस्क्रिप्ट त्रुटि होगी
  hi: "पाठ",
};

const text = t(translations);
```

---

## प्रभावी उपयोग के लिए सुझाव

1. **सरल इनलाइन अनुवादों के लिए `t` का उपयोग करें**: अपने घटकों के भीतर सीधे छोटे टेक्स्ट का अनुवाद करने के लिए आदर्श।
2. **संरचित सामग्री के लिए `useIntlayer` को प्राथमिकता दें**: अधिक जटिल अनुवादों और सामग्री पुन: उपयोग के लिए, घोषणा फ़ाइलों में सामग्री परिभाषित करें और `useIntlayer` का उपयोग करें।
3. **संगत लोकेल प्रावधान**: सुनिश्चित करें कि आपके एप्लिकेशन में `IntlayerProvider` के माध्यम से आपका लोकेल लगातार प्रदान किया गया है।
4. **टाइपस्क्रिप्ट का लाभ उठाएँ**: गायब अनुवादों को पकड़ने और टाइप सेफ्टी सुनिश्चित करने के लिए टाइपस्क्रिप्ट प्रकारों का उपयोग करें।

---

## निष्कर्ष

`react-intlayer` में `t` फ़ंक्शन आपके React एप्लिकेशन में इनलाइन अनुवाद प्रबंधन के लिए एक शक्तिशाली और सुविधाजनक उपकरण है। इसे प्रभावी ढंग से एकीकृत करके, आप अपने ऐप की अंतर्राष्ट्रीयकरण क्षमताओं को बढ़ाते हैं, जिससे दुनिया भर के उपयोगकर्ताओं के लिए बेहतर अनुभव प्रदान होता है।

अधिक विस्तृत उपयोग और उन्नत सुविधाओं के लिए, [react-intlayer दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) देखें।

---

**नोट**: सुनिश्चित करें कि आपका `IntlayerProvider` सही तरीके से सेटअप किया गया है ताकि वर्तमान लोकेल आपके घटकों तक सही तरीके से पहुँचाया जा सके। यह सुनिश्चित करने के लिए महत्वपूर्ण है कि `t` फ़ंक्शन सही अनुवाद लौटाए।

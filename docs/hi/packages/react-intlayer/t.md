# Documentation: `t` Function in `react-intlayer`

`react-intlayer` पैकेज में `t` फ़ंक्शन आपके React ऐप्लिकेशन के भीतर इनलाइन अंतर्राष्ट्रीयकरण के लिए एक मौलिक उपकरण है। यह आपको अपने घटकों के भीतर सीधे अनुवादों को परिभाषित करने की अनुमति देता है, जिससे वर्तमान स्थानीयता के आधार पर स्थानीयकृत सामग्री प्रदर्शित करना सरल हो जाता है।

---

## Overview

`t` फ़ंक्शन का उपयोग आपके घटकों में सीधे विभिन्न स्थानीयताओं के लिए अनुवाद प्रदान करने के लिए किया जाता है। प्रत्येक समर्थित स्थानीयता के लिए अनुवादों को शामिल करने वाले एक ऑब्जेक्ट को पास करके, `t` आपके React ऐप्लिकेशन में वर्तमान स्थानीयता संदर्भ के आधार पर उपयुक्त अनुवाद लौटाता है।

---

## Key Features

- **Inline Translations**: त्वरित, इनलाइन टेक्स्ट के लिए आदर्श जो अलग सामग्री घोषणा की आवश्यकता नहीं है।
- **Automatic Locale Selection**: स्वचालित रूप से वर्तमान स्थानीयता से संबंधित अनुवाद लौटाता है।
- **TypeScript Support**: TypeScript के साथ उपयोग करने पर प्रकार सुरक्षा और ऑटोकम्प्लीशन प्रदान करता है।
- **Easy Integration**: React घटकों के भीतर बेधड़क काम करता है।

---

## Function Signature

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parameters

- `translations`: एक ऑब्जेक्ट जहाँ कुंजी स्थानीयता कोड (जैसे, `en`, `fr`, `es`) हैं और मान संबंधित अनुवादित स्ट्रिंग हैं।

### Returns

- वर्तमान स्थानीयता के लिए अनुवादित सामग्री का प्रतिनिधित्व करने वाला एक स्ट्रिंग।

---

## Usage Examples

### Basic Usage of `t` in a Component

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

### Inline Translations in Attributes

`t` फ़ंक्शन JSX विशेषताओं में इनलाइन अनुवादों के लिए विशेष रूप से उपयोगी है। जैसे `alt`, `title`, `href`, या `aria-label` जैसे विशेषताओं को स्थानीयकृत करने के लिए, आप विशेषता के भीतर सीधे `t` का उपयोग कर सकते हैं।

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

`t` फ़ंक्शन TypeScript के साथ उपयोग करने पर प्रकार-निष्क्रिय होता है, यह सुनिश्चित करते हुए कि सभी आवश्यक स्थानीयताएं प्रदान की गई हैं।

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

### Locale Detection and Context

`react-intlayer` में वर्तमान स्थानीयता को `IntlayerProvider` के माध्यम से प्रबंधित किया जाता है। सुनिश्चित करें कि यह प्रदाता आपके घटकों को लपेटता है और `locale` प्रॉप सही ढंग से पास की गई है।

#### Example:

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

## Common Errors and Troubleshooting

### `t` Returns Undefined or Incorrect Translation

- **Cause**: वर्तमान स्थानीयता ठीक से सेट नहीं की गई है, या वर्तमान स्थानीयता के लिए अनुवाद गायब है।
- **Solution**:
  - यह सत्यापित करें कि `IntlayerProvider` को उचित `locale` के साथ सही तरीके से सेट किया गया है।
  - सुनिश्चित करें कि आपकी अनुवादों की वस्तु सभी आवश्यक स्थानीयताओं को शामिल करती है।

### Missing Translations in TypeScript

- **Cause**: अनुवादों की वस्तु आवश्यक स्थानीयताओं को पूरा नहीं करती, जिसके कारण TypeScript त्रुटियाँ उत्पन्न होती हैं।
- **Solution**: अपने अनुवादों की पूर्णता को प्रवर्तित करने के लिए `IConfigLocales` प्रकार का उपयोग करें।

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' का गायब होना TypeScript त्रुटि का कारण बनेगा
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' का गायब होना TypeScript त्रुटि का कारण बनेगा
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' का गायब होना TypeScript त्रुटि का कारण बनेगा
};

const text = t(translations);
```

---

## Tips for Effective Usage

1. **Use `t` for Simple Inline Translations**: अपने घटकों के भीतर सीधे छोटे टेक्स्ट के अनुवाद के लिए आदर्श।
2. **Prefer `useIntlayer` for Structured Content**: अधिक जटिल अनुवादों और सामग्री पुनः उपयोग के लिए, सामग्री को घोषणा फ़ाइलों में परिभाषित करें और `useIntlayer` का उपयोग करें।
3. **Consistent Locale Provision**: सुनिश्चित करें कि आपकी स्थानीयता को `IntlayerProvider` के माध्यम से आपके ऐप्लिकेशन में लगातार प्रदान किया गया है।
4. **Leverage TypeScript**: गायब अनुवादों को पकड़ने और प्रकार की सुरक्षा सुनिश्चित करने के लिए TypeScript प्रकारों का उपयोग करें।

---

## Conclusion

`react-intlayer` में `t` फ़ंक्शन आपके React ऐप्लिकेशन में इनलाइन अनुवादों को प्रबंधित करने के लिए एक शक्तिशाली और सुविधाजनक उपकरण है। इसे प्रभावी ढंग से एकीकृत करके, आप अपने ऐप की अंतर्राष्ट्रीयकरण क्षमताओं को बढ़ाते हैं, जिससे दुनिया भर के उपयोगकर्ताओं के लिए बेहतर अनुभव प्रदान करते हैं।

अधिक विस्तृत उपयोग और उन्नत विशेषताओं के लिए [react-intlayer documentation](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_editor.md) पर जाएँ।

---

**Note**: सुनिश्चित करें कि आपके `IntlayerProvider` को ठीक से सेट अप किया गया है ताकि वर्तमान स्थानीयता आपके घटकों को सही तरीके से पास की जा सके। यह `t` फ़ंक्शन के द्वारा सही अनुवाद लौटाने के लिए महत्वपूर्ण है।

# Documentation: `t` Function in `react-intlayer`

`react-intlayer` पैकेज में `t` फ़ंक्शन आपके React एप्लिकेशन में इनलाइन इंटरनेशनलाइज़ेशन के लिए एक बुनियादी उपकरण है। यह आपको अपने घटकों के भीतर सीधे अनुवादों को परिभाषित करने की अनुमति देता है, जिससे वर्तमान लोकेल के आधार पर स्थानीयकृत सामग्री प्रदर्शित करना सरल हो जाता है।

---

## Overview

`t` फ़ंक्शन का उपयोग आपके घटकों में सीधे विभिन्न लोकल के लिए अनुवाद प्रदान करने के लिए किया जाता है। प्रत्येक समर्थित लोकेल के लिए अनुवादों वाला एक ऑब्जेक्ट पास करके, `t` आपके React एप्लिकेशन में वर्तमान लोकेल संदर्भ के आधार पर उपयुक्त अनुवाद लौटाता है।

---

## Key Features

- **Inline Translations**: त्वरित, इनलाइन टेक्स्ट के लिए आदर्श जो एक अलग सामग्री घोषणा की आवश्यकता नहीं है।
- **Automatic Locale Selection**: वर्तमान लोकेल के अनुसार अनुवाद स्वतः लौटाता है।
- **TypeScript Support**: TypeScript के साथ उपयोग करते समय टाइप सुरक्षा और ऑटो-कंप्लीशन प्रदान करता है।
- **Easy Integration**: React घटकों के भीतर निर्बाध रूप से कार्य करता है।

---

## Function Signature

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parameters

- `translations`: एक ऑब्जेक्ट जहाँ कुंजी लोकेल कोड (जैसे, `en`, `fr`, `es`) हैं और मान संबंधित अनुवादित स्ट्रिंग्स हैं।

### Returns

- वर्तमान लोकेल के लिए अनुवादित सामग्री का प्रतिनिधित्व करने वाला एक स्ट्रिंग।

---

## Usage Examples

### Basic Usage of `t` in a Component

```tsx
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

### Inline Translations in Attributes

`t` फ़ंक्शन JSX विशेषताओं में इनलाइन अनुवादों के लिए विशेष रूप से उपयोगी है। जब `alt`, `title`, `href`, या `aria-label` जैसी विशेषताओं को स्थानीयकरण करते हैं, तो आप विशेषता के भीतर `t` का उपयोग कर सकते हैं।

```tsx
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

`t` फ़ंक्शन को TypeScript के साथ उपयोग करते समय टाइप-सुरक्षित होता है, यह सुनिश्चित करता है कि सभी आवश्यक लोकल प्रदान किए गए हैं।

```typescript
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Locale Detection and Context

`react-intlayer` में, वर्तमान लोकेल `IntlayerProvider` के माध्यम से प्रबंधित होता है। सुनिश्चित करें कि यह प्रदाता आपके घटकों को लपेटता है और `locale` प्रॉप सही ढंग से पास की जाती है।

#### Example:

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>{/* आपके घटक यहाँ */}</IntlayerProvider>
);
```

---

## Common Errors and Troubleshooting

### `t` Returns Undefined or Incorrect Translation

- **Cause**: वर्तमान लोकेल ठीक से सेट नहीं है, या वर्तमान लोकेल के लिए अनुवाद गायब है।
- **Solution**:
  - सत्यापित करें कि `IntlayerProvider` उपयुक्त `locale` के साथ ठीक से सेटअप किया गया है।
  - सुनिश्चित करें कि आपका अनुवाद ऑब्जेक्ट सभी आवश्यक लोकल को शामिल करता है।

### Missing Translations in TypeScript

- **Cause**: अनुवाद ऑब्जेक्ट आवश्यक लोकल को संतोषजनक नहीं बनाता, जिससे TypeScript त्रुटियाँ पैदा होती हैं।
- **Solution**: अपने अनुवादों की संपूर्णता को लागू करने के लिए `IConfigLocales` प्रकार का उपयोग करें।

```typescript
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' गायब होने से TypeScript त्रुटि होगी
};

const text = t(translations);
```

---

## Tips for Effective Usage

1. **Use `t` for Simple Inline Translations**: सीधे अपने घटकों के भीतर छोटे टेक्स्ट के अनुवाद के लिए आदर्श।
2. **Prefer `useIntlayer` for Structured Content**: अधिक जटिल अनुवादों और सामग्री के पुनरुपयोग के लिए, घोषणा फ़ाइलों में सामग्री को परिभाषित करें और `useIntlayer` का उपयोग करें।
3. **Consistent Locale Provision**: अपने एप्लिकेशन में `IntlayerProvider` के माध्यम से अपने लोकल को निरंतर प्रदान करना सुनिश्चित करें।
4. **Leverage TypeScript**: गायब अनुवाद को पकड़ने और टाइप सुरक्षा सुनिश्चित करने के लिए TypeScript प्रकारों का उपयोग करें।

---

## Conclusion

`react-intlayer` में `t` फ़ंक्शन आपके React अनुप्रयोगों में इनलाइन अनुवादों को प्रबंधित करने के लिए एक शक्तिशाली और सुविधाजनक उपकरण है। इसे प्रभावी ढंग से एकीकृत करके, आप अपने ऐप के इंटरनेशनलाइज़ेशन क्षमताओं को बढ़ाते हैं, जिससे उपयोगकर्ताओं को वैश्विक स्तर पर बेहतर अनुभव मिलता है।

अधिक विस्तृत उपयोग और उन्नत सुविधाओं के लिए, [react-intlayer documentation](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_editor.md) पर जाएं।

---

**Note**: अपने घटकों में वर्तमान लोकेल को सही ढंग से पास करने के लिए अपने `IntlayerProvider` को ठीक से सेटअप करना न भूलें। यह `t` फ़ंक्शन को सही अनुवाद लौटाने के लिए महत्वपूर्ण है।

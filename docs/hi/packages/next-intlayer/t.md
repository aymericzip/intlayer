# Documentation: `t` Function in `next-intlayer`

`next-intlayer` पैकेज में `t` फ़ंक्शन आपके Next.js एप्लिकेशन में इनलाइन अंतर्राष्ट्रीयकरण का एक मौलिक उपकरण है। यह आपको सीधे अपने कंपोनेंट्स के भीतर अनुवाद परिभाषित करने की अनुमति देता है, जिससे वर्तमान स्थानीयता के आधार पर स्थानीयकृत सामग्री प्रदर्शित करना सरल हो जाता है।

---

## Overview

`t` फ़ंक्शन का उपयोग आपके कंपोनेंट्स में विभिन्न स्थानीयताओं के लिए अनुवाद प्रदान करने के लिए किया जाता है। प्रत्येक समर्थित स्थानीयता के लिए अनुवादों वाली वस्तु को पास करके, `t` आपके Next.js एप्लिकेशन के वर्तमान स्थानीयता संदर्भ के आधार पर उपयुक्त अनुवाद लौटाता है।

---

## Key Features

- **Inline Translations**: तेज़, इनलाइन पाठ के लिए आदर्श जो एक अलग सामग्री घोषणा की आवश्यकता नहीं होती।
- **Automatic Locale Selection**: वर्तमान स्थानीयता के अनुसार अनुवाद स्वचालित रूप से लौटाता है।
- **TypeScript Support**: TypeScript के साथ उपयोग पर प्रकार की सुरक्षा और स्वचालित पूर्णता प्रदान करता है।
- **Easy Integration**: Next.js में क्लाइंट और सर्वर दोनों कंपोनेंट्स के भीतर बिना किसी समस्या के काम करता है।

---

## Function Signature

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parameters

- `translations`: एक वस्तु जहाँ कुंजियाँ स्थानीयता कोड (जैसे, `en`, `fr`, `es`) हैं और मान संबंधित अनूदित स्ट्रिंग्स हैं।

### Returns

- वर्तमान स्थानीयता के लिए अनूदित सामग्री को दर्शाने वाली एक स्ट्रिंग।

---

## Usage Examples

### Using `t` in a Client Component

जब आप क्लाइंट-साइड कंपोनेंट में `t` का उपयोग कर रहे हों, तो सुनिश्चित करें कि आपको अपने कंपोनेंट फ़ाइल के शीर्ष पर `'use client';` निर्देश शामिल करें।

```tsx
"use client";

import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is the content of a client component example",
          fr: "Ceci est le contenu d'un exemple de composant client",
          es: "Este es el contenido d un ejemplo de componente cliente",
        })}
      </p>
    </div>
  );
};
```

### Using `t` in a Server Component

```tsx
import { t } from "next-intlayer/server";

export const ServerComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is the content of a server component example",
          fr: "Ceci est le contenu d'un exemple de composant serveur",
          es: "Este es el contenido de un ejemplo de componente servidor",
        })}
      </p>
    </div>
  );
};
```

### Inline Translations in Attributes

`t` फ़ंक्शन JSX गुणों में इनलाइन अनुवाद के लिए विशेष रूप से उपयोगी है। जब आप `alt`, `title`, `href`, या `aria-label` जैसे गुणों को स्थानीयकृत कर रहे हों, तो आप सीधे गुण के भीतर `t` का उपयोग कर सकते हैं।

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

`t` फ़ंक्शन TypeScript के साथ उपयोग पर प्रकार-सेफ है, यह सुनिश्चित करते हुए कि सभी आवश्यक स्थानीयताएँ प्रदान की गई हैं।

```typescript
import { t, type IConfigLocales } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Locale Detection and Context

`next-intlayer` में, वर्तमान स्थानीयता को संदर्भ प्रदाताओं के माध्यम से प्रबंधित किया जाता है: `IntlayerClientProvider` और `IntlayerServerProvider`। सुनिश्चित करें कि ये प्रदाता आपके कंपोनेंट्स को लपेटते हैं और `locale` प्रॉप्स सही तरीके से पास की जाती हैं।

#### Example:

```tsx
import { IntlayerClientProvider } from "next-intlayer";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Your components here */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## Common Errors and Troubleshooting

### `t` Returns Undefined or Incorrect Translation

- **Cause**: वर्तमान स्थानीयता सही तरीके से सेट नहीं की गई है, या वर्तमान स्थानीयता के लिए अनुवाद गायब है।
- **Solution**:
  - सुनिश्चित करें कि `IntlayerClientProvider` या `IntlayerServerProvider` उचित `locale` के साथ सही तरीके से सेट किया गया है।
  - सुनिश्चित करें कि आपकी अनुवाद वस्तु सभी आवश्यक स्थानीयताओं को शामिल करती है।

### Missing Translations in TypeScript

- **Cause**: अनुवाद वस्तु आवश्यक स्थानीयताओं को संतुष्ट नहीं करती, जिससे TypeScript गलती होती है।
- **Solution**: अपने अनुवादों की पूर्णता सुनिश्चित करने के लिए `IConfigLocales` प्रकार का उपयोग करें।

```typescript
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' की कमी TypeScript गलती का कारण बनेगी
};

const text = t(translations);
```

---

## Tips for Effective Usage

1. **Use `t` for Simple Inline Translations**: अपने कंपोनेंट्स के भीतर सीधे छोटे पाठों का अनुवाद करने के लिए आदर्श।
2. **Prefer `useIntlayer` for Structured Content**: अधिक जटिल अनुवादों और सामग्री के पुनः उपयोग के लिए, सामग्री को घोषणा फ़ाइलों में परिभाषित करें और `useIntlayer` का उपयोग करें।
3. **Consistent Locale Provision**: सुनिश्चित करें कि आपके एप्लिकेशन में उपयुक्त प्रदाताओं के माध्यम से आपकी स्थानीयता निरंतर प्रदान की गई है।
4. **Leverage TypeScript**: गायब अनुवादों को पकड़ने और प्रकार की सुरक्षा सुनिश्चित करने के लिए TypeScript प्रकारों का उपयोग करें।

---

## Conclusion

`next-intlayer` में `t` फ़ंक्शन आपके Next.js एप्लिकेशन में इनलाइन अनुवादों का प्रबंधन करने के लिए एक शक्तिशाली और सुविधाजनक उपकरण है। इसे प्रभावी ढंग से एकीकृत करके, आप अपने ऐप की अंतर्राष्ट्रीयकरण क्षमताओं को बढ़ाते हैं, विश्व स्तर पर उपयोगकर्ताओं के लिए एक बेहतर अनुभव प्रदान करते हैं।

विस्तृत उपयोग और उन्नत सुविधाओं के लिए, [next-intlayer documentation](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_editor.md) देखें।

---

**Note**: सुनिश्चित करें कि अपने `IntlayerClientProvider` और `IntlayerServerProvider` को सही तरीके से सेट करें ताकि वर्तमान स्थानीयता सही तरीके से आपके कंपोनेंट्स में पास की जा सके। यह `t` फ़ंक्शन के सही अनुवाद लौटाने के लिए महत्वपूर्ण है।

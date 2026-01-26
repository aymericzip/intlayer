---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: svelte-intlayer पैकेज दस्तावेज़ीकरण
description: Intlayer के लिए Svelte-विशिष्ट एकीकरण, जो Svelte एप्लिकेशनों के लिए setup फ़ंक्शंस और stores प्रदान करता है।
keywords:
  - svelte-intlayer
  - svelte
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: सभी एक्सपोर्ट्स के लिए एकीकृत दस्तावेज़ीकरण
---

# svelte-intlayer पैकेज

`svelte-intlayer` पैकेज Svelte एप्लिकेशन में Intlayer को एकीकृत करने के लिए आवश्यक टूल प्रदान करता है। इसमें बहुभाषी सामग्री को संभालने के लिए setup फ़ंक्शंस और stores शामिल हैं।

## इंस्टॉलेशन

```bash
npm install svelte-intlayer
```

## एक्सपोर्ट्स

### सेटअप

इम्पोर्ट:

```tsx
import "svelte-intlayer";
```

| फ़ंक्शन         | विवरण                                                        |
| --------------- | ------------------------------------------------------------ |
| `setupIntlayer` | आपकी Svelte एप्लिकेशन में Intlayer को सेटअप करने का फ़ंक्शन। |

### स्टोर

इम्पोर्ट:

```tsx
import "svelte-intlayer";
```

| स्टोर           | विवरण                                             |
| --------------- | ------------------------------------------------- |
| `intlayerStore` | वर्तमान Intlayer state को रखने वाला Svelte स्टोर। |

### हुक्स (संदर्भ)

इम्पोर्ट:

```tsx
import "svelte-intlayer";
```

| फ़ंक्शन                | विवरण                                                                                                                                             | संबंधित दस्तावेज                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `useIntlayer`          | `useDictionary` पर आधारित है, लेकिन जनरेट की गई declaration से dictionary का एक optimized संस्करण inject करता है।                                 | -                                                                                                                        |
| `useDictionary`        | उन ऑब्जेक्ट्स को प्रोसेस करता है जो शब्दकोश जैसे दिखते हैं (key, content)। यह `t()` अनुवादों, enumerations, आदि को प्रोसेस करता है।               | -                                                                                                                        |
| `useDictionaryAsync`   | `useDictionary` जैसा ही, लेकिन असिंक्रोनस शब्दकोशों को संभालता है।                                                                                | -                                                                                                                        |
| `useDictionaryDynamic` | `useDictionary` जैसा ही, लेकिन डायनामिक शब्दकोशों को संभालता है।                                                                                  | -                                                                                                                        |
| `useLocale`            | वर्तमान locale और इसे सेट करने के लिए एक फ़ंक्शन लौटाता है।                                                                                       | -                                                                                                                        |
| `useRewriteURL`        | URL रीराइट्स को प्रबंधित करने के लिए क्लाइंट-साइड फ़ंक्शन। यदि कोई स्थानीयकृत रीराइट नियम मौजूद है तो यह स्वचालित रूप से URL को अपडेट कर देता है। | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/svelte-intlayer/useRewriteURL.md) |
| `useIntl`              | वर्तमान locale के लिए Intl ऑब्जेक्ट लौटाता है।                                                                                                    | -                                                                                                                        |

### मार्कडाउन

इंपोर्ट:

```tsx
import "svelte-intlayer";
```

| फ़ंक्शन               | विवरण                                                              |
| --------------------- | ------------------------------------------------------------------ |
| `setIntlayerMarkdown` | आपके Svelte एप्लिकेशन में Markdown संदर्भ सेट करने के लिए फ़ंक्शन। |

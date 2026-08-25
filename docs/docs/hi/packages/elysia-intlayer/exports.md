---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: elysia-intlayer पैकेज दस्तावेज़ीकरण
description: Intlayer के लिए Elysia प्लगइन, जो अनुवाद फ़ंक्शन और locale का पता लगाने की सुविधाएँ प्रदान करता है।
keywords:
  - elysia-intlayer
  - elysia
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - elysia-intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "सभी एक्सपोर्ट्स के लिए एकीकृत दस्तावेज़ीकरण"
author: aymericzip
---

# elysia-intlayer पैकेज

`elysia-intlayer` पैकेज Elysia एप्लिकेशनों के लिए एक प्लगइन प्रदान करता है जो internationalization को संभालता है। यह उपयोगकर्ता की locale का पता लगाता है और route context में एक `intlayer` ऑब्जेक्ट इंजेक्ट करता है।

## स्थापना

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

> `elysia` एक peer dependency है (`>=1.0.0`)। Elysia **Bun** रनटाइम को लक्षित करता है।

## निर्यात

### प्लगइन

इम्पोर्ट:

```ts
import { intlayer } from "elysia-intlayer";
```

| फ़ंक्शन    | विवरण                                                                                                                                                                                                                                                                                                                                    | संबंधित दस्तावेज                                                                                               |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Elysia प्लगइन जो Intlayer को आपके Elysia एप्लिकेशन में एकीकृत करता है। storage (cookies, headers) से और फिर `Accept-Language` से locale पहचान संभालता है, route context में `locale`, `t`, `getIntlayer` और `getDictionary` को उजागर करने वाला `intlayer` ऑब्जेक्ट इंजेक्ट करता है, और `AsyncLocalStorage` रिक्वेस्ट संदर्भ सेट करता है। | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/elysia-intlayer/intlayer.md) |

### फ़ंक्शन्स

इम्पोर्ट:

```ts
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| फ़ंक्शन         | विवरण                                                                                                                                                                                                                                                                                                       | संबंधित दस्तावेज                                                                                       |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | वैश्विक अनुवाद फ़ंक्शन जो Elysia में वर्तमान locale के लिए सामग्री प्राप्त करता है। `intlayer` प्लगइन द्वारा सेट किए गए रिक्वेस्ट संदर्भ तक पहुँचने के लिए `AsyncLocalStorage` का उपयोग करता है, और उसके बाहर डिफ़ॉल्ट locale पर fallback करता है। इसे `intlayer.t` के माध्यम से भी एक्सेस किया जा सकता है। | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/translation.md) |
| `getIntlayer`   | जनरेट की गई डिक्लेरेशन से कुंजी द्वारा एक dictionary प्राप्त करता है और वर्तमान locale के लिए उसकी सामग्री लौटाता है। `getDictionary` का अनुकूलित संस्करण। रिक्वेस्ट संदर्भ तक पहुँचने के लिए `AsyncLocalStorage` का उपयोग करता है। इसे `intlayer.getIntlayer` के माध्यम से भी एक्सेस किया जा सकता है।      | -                                                                                                      |
| `getDictionary` | dictionary ऑब्जेक्ट्स को प्रोसेस करता है और वर्तमान locale के लिए सामग्री लौटाता है। `t()` अनुवाद, enumerations, markdown, HTML आदि को प्रोसेस करता है। रिक्वेस्ट संदर्भ तक पहुँचने के लिए `AsyncLocalStorage` का उपयोग करता है। इसे `intlayer.getDictionary` के माध्यम से भी एक्सेस किया जा सकता है।       | -                                                                                                      |

### प्रकार

इम्पोर्ट:

```ts
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| प्रकार              | विवरण                                                                                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerContext`   | प्रत्येक route context में इंजेक्ट किए गए `intlayer` ऑब्जेक्ट की संरचना: `locale`, `locale_storage`, `locale_detected`, `defaultLocale`, `t`, `getIntlayer`, `getDictionary`। |
| `TranslateFunction` | अनुवाद फ़ंक्शन का सिग्नेचर, जो एक locale map को वर्तमान रिक्वेस्ट locale से मेल खाने वाली सामग्री में बदलता है।                                                               |

## उपयोग

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { getDictionary, getIntlayer, intlayer, t } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // अंतर्राष्ट्रीयकरण plugin को लोड करें
  .use(intlayer())
  // Route context से locale और helpers पढ़ें
  .get("/", ({ intlayer }) => ({
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      hi: "नमस्ते",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  // या मौजूदा request से बंधे standalone helpers का उपयोग करें
  .get("/t_example", () =>
    t({
      hi: "अंग्रेजी में लौटाई गई सामग्री का उदाहरण",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> प्लगइन अपना context एक **ग्लोबल** `derive` के माध्यम से रजिस्टर करता है, जिसे Elysia `Partial<{ intlayer: IntlayerContext }>` के रूप में टाइप करता है। `.use(intlayer())` के बाद रजिस्टर किए गए routes के लिए रनटाइम पर यह मान हमेशा मौजूद रहता है, इसलिए `strict` मोड में TypeScript को संतुष्ट करने के लिए non-null assertion (`intlayer!.locale`) — या optional chaining — का उपयोग करें।

## संबंधित दस्तावेज़

- [Elysia i18n - अपने ऐप्लिकेशन को अनुवाद करने के लिए संपूर्ण गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_elysia.md)
- [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)

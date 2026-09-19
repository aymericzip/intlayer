---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: useLocale हुक प्रलेखन | remix-intlayer
description: वर्तमान अनुरोध लोकेल, डिफ़ॉल्ट लोकेल, और उपलब्ध लोकेल्स प्राप्त करने के लिए Remix 3 एप्लिकेशनों में useLocale हुक का उपयोग करने का तरीका देखें।
keywords:
  - useLocale
  - locale
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - प्रलेखन
slugs:
  - doc
  - packages
  - remix-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "useLocale हुक का प्रारंभिक प्रलेखन"
author: aymericzip
---

# useLocale हुक प्रलेखन

`remix-intlayer` का `useLocale` हुक वर्तमान में संसाधित किए जा रहे HTTP अनुरोध के लोकेल के साथ-साथ प्रोजेक्ट के कॉन्फ़िगर किए गए डिफ़ॉल्ट और उपलब्ध लोकेल्स तक पहुंच प्रदान करता है।

## उपयोग

एक Remix घटक में (उदाहरण के लिए भाषा चयनकर्ता):

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { Link } from "@remix-run/react";
import { useLocale } from "remix-intlayer";
import { getLocalizedUrl, getPathWithoutLocale } from "intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales } = useLocale();
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <nav>
      <ul>
        {availableLocales.map((localeItem) => (
          <li key={localeItem} className="p-1">
            <Link
              href={getLocalizedUrl(pathWithoutLocale, localeItem)}
              aria-current={localeItem === locale ? "page" : undefined}
            >
              {localeItem.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

रूट हैंडलर में:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/locale-info", () => {
  const { locale, defaultLocale, availableLocales } = useLocale();

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

## रिटर्न मान

हुक `UseLocaleResult` प्रकार का एक ऑब्जेक्ट लौटाता है:

| गुण                | प्रकार              | विवरण                                                                 |
| ------------------ | ------------------- | --------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | वर्तमान अनुरोध के लिए हल किया गया लोकेल।                              |
| `defaultLocale`    | `DeclaredLocales`   | `intlayer.config.ts` में कॉन्फ़िगर किया गया डिफ़ॉल्ट फ़ॉलबैक लोकेल।   |
| `availableLocales` | `DeclaredLocales[]` | `intlayer.config.ts` में कॉन्फ़िगर किए गए सभी उपलब्ध लोकेल्स की सूची। |

## विवरण

1. **अनुरोध-दायरा समाधान**: `intlayer()` मिडलवेयर द्वारा प्रबंधित सक्रिय अनुरोध में, `useLocale` अनुरोध संग्रहण से हल किए गए लोकेल को पढ़ता है।
2. **सहज फ़ॉलबैक**: यदि अनुरोध संदर्भ के बाहर कॉल किया जाता है (जैसे कि आरंभीकरण स्क्रिप्ट या परीक्षण सुइट के दौरान), तो यह कॉन्फ़िगर किए गए `defaultLocale` पर डिफ़ॉल्ट हो जाता है।

## संबंधित दस्तावेज़

- [`intlayer` मिडलवेयर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/intlayerMiddleware.md)
- [`useIntlayer` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/useIntlayer.md)
- [`useDictionary` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/useDictionary.md)

---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: useLocale हुक प्रलेखन | astro-intlayer
description: वर्तमान लोकेल तक पहुँचने और उसे प्रबंधित करने के लिए Astro एप्लिकेशनों में useLocale हुक का उपयोग करने का तरीका देखें।
keywords:
  - useLocale
  - locale
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - प्रलेखन
slugs:
  - doc
  - packages
  - astro-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "प्रारंभिक प्रलेखन"
author: aymericzip
---

# useLocale हुक प्रलेखन

`astro-intlayer` का `useLocale` हुक वर्तमान अनुरोध लोकेल, कॉन्फ़िगर किए गए डिफ़ॉल्ट लोकेल, और Astro एप्लिकेशनों में सभी उपलब्ध लोकेल्स तक पहुंच प्रदान करता है।

यह सर्वर-रेंडर किए गए `.astro` फ्रंटमैटर और क्लाइंट-साइड `<script>` ब्लॉक्स में सुसंगत रूप से व्यवहार करता है।

## उपयोग

### कंपोनेंट फ्रंटमैटर में (सर्वर-रेंडर किया गया)

```astro fileName="src/layouts/Layout.astro"
---
import { useLocale } from "astro-intlayer";
import { getLocalizedUrl, getPathWithoutLocale } from "intlayer";

const { locale, defaultLocale, availableLocales } = useLocale();
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
---

<!DOCTYPE html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <title>Astro + Intlayer</title>
  </head>
  <body>
    <header>
      <span>वर्तमान: {locale}</span>
      <span>डिफ़ॉल्ट: {defaultLocale}</span>
      <nav>
        <ul>
          {availableLocales.map((localeItem) => (
            <li key={localeItem} className="p-1">
              <a
                href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                aria-current={localeItem === locale ? "page" : undefined}
              >
                {localeItem.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
    <slot />
  </body>
</html>
```

### क्लाइंट `<script>` में (इंटरैक्टिव)

```astro fileName="src/components/LocaleSwitcher.astro"
---
import { useLocale } from "astro-intlayer";

const { locale, availableLocales } = useLocale();
---

<select id="locale-select">
  {availableLocales.map((loc) => (
    <option value={loc} selected={loc === locale}>
      {loc.toUpperCase()}
    </option>
  ))}
</select>

<script>
  import { useLocale, setLocaleInStorage } from "astro-intlayer";

  const { setLocale } = useLocale();

  document.getElementById("locale-select")?.addEventListener("change", (e) => {
    const target = e.target as HTMLSelectElement;
    setLocale(target.value);
  });
</script>
```

## रिटर्न मान

हुक `UseLocaleResult` प्रकार का एक ऑब्जेक्ट लौटाता है:

| गुण                | प्रकार                                 | विवरण                                                                                              |
| ------------------ | -------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`                      | सक्रिय लोकेल।                                                                                      |
| `defaultLocale`    | `DeclaredLocales`                      | `intlayer.config.ts` में कॉन्फ़िगर किया गया डिफ़ॉल्ट फ़ॉलबैक लोकेल।                                |
| `availableLocales` | `DeclaredLocales[]`                    | प्रोजेक्ट के लिए कॉन्फ़िगर किए गए सभी समर्थित लोकेल्स की सूची।                                     |
| `setLocale`        | `(locale: LocalesValues) => void`      | लोकेल को अपडेट करने का फ़ंक्शन। (क्लाइंट `<script>` में इंटरैक्टिव, SSR के दौरान चेतावनी देता है)। |
| `subscribe`        | `(callback: () => void) => () => void` | क्लाइंट-साइड लोकेल परिवर्तनों की सदस्यता लेता है।                                                  |

## सर्वर बनाम क्लाइंट व्यवहार

- **SSR / सर्वर रेंडरिंग के दौरान**: एक अनुरोध को निश्चित मापदंडों के साथ एक बार रेंडर किया जाता है। सर्वर रेंडर के दौरान `setLocale()` को कॉल करने का कोई प्रभाव नहीं होता है और एक चेतावनी जारी होती है; लोकेल स्विचिंग क्लाइंट पर या लक्ष्य लोकेल URL पर नेविगेट करके की जानी चाहिए।
- **क्लाइंट स्क्रिप्ट्स में**: `setLocale` क्लाइंट स्टोर को अपडेट करता है और आपके Intlayer कॉन्फ़िगरेशन के अनुसार सहेजे गए कुकीज़ या स्थानीय स्टोरेज को अपडेट करता है।

## संबंधित दस्तावेज़

- [`intlayer` एकीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/astro-intlayer/intlayer.md)
- [`useIntlayer` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/astro-intlayer/useIntlayer.md)
- [`useDictionary` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/astro-intlayer/useDictionary.md)

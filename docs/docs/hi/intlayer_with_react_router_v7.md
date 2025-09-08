---
createdAt: 2025-09-04
updatedAt: 2025-09-04
title: React Router v7 में Intlayer के साथ शुरुआत करना
description: जानें कि कैसे Intlayer का उपयोग करके अपने React Router v7 एप्लिकेशन में अंतरराष्ट्रीयकरण (i18n) जोड़ें। इस व्यापक गाइड का पालन करें ताकि आपका ऐप बहुभाषी और locale-सचेत रूटिंग के साथ हो।
keywords:
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - React Router v7
  - React
  - i18n
  - TypeScript
  - Locale रूटिंग
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7
applicationTemplate: https://github.com/AydinTheFirst/react-router-intlayer
author: AydinTheFirst
---

# Intlayer और React Router v7 के साथ अंतरराष्ट्रीयकरण (i18n) शुरू करना

यह गाइड दिखाता है कि कैसे **Intlayer** को React Router v7 प्रोजेक्ट्स में seamless अंतरराष्ट्रीयकरण के लिए locale-सचेत रूटिंग, TypeScript समर्थन, और आधुनिक विकास प्रथाओं के साथ एकीकृत किया जाए।

## Intlayer क्या है?

**Intlayer** एक अभिनव, ओपन-सोर्स अंतरराष्ट्रीयकरण (i18n) लाइब्रेरी है जिसे आधुनिक वेब एप्लिकेशन में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है।

Intlayer के साथ, आप कर सकते हैं:

- **घोषणात्मक शब्दकोशों का उपयोग करके अनुवादों का आसानी से प्रबंधन करें** जो कि कंपोनेंट स्तर पर होते हैं।
- **मेटाडेटा, रूट्स, और सामग्री को गतिशील रूप से स्थानीयकृत करें**।
- **स्वचालित रूप से उत्पन्न प्रकारों के साथ TypeScript समर्थन सुनिश्चित करें**, जिससे ऑटो-कम्प्लीशन और त्रुटि पहचान में सुधार होता है।
- **उन्नत सुविधाओं का लाभ उठाएं**, जैसे गतिशील locale पहचान और स्विचिंग।
- **React Router v7 के कॉन्फ़िगरेशन-आधारित रूटिंग सिस्टम के साथ locale-सचेत रूटिंग सक्षम करें**।

---

## React Router v7 एप्लिकेशन में Intlayer सेटअप करने के लिए चरण-दर-चरण मार्गदर्शिका

### चरण 1: निर्भरताएँ स्थापित करें

अपनी पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

- **intlayer**

- **intlayer**

  मुख्य पैकेज जो कॉन्फ़िगरेशन प्रबंधन, अनुवाद, [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md), ट्रांसपाइलेशन, और [CLI कमांड्स](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md) के लिए अंतरराष्ट्रीयकरण उपकरण प्रदान करता है।

- **react-intlayer**
  वह पैकेज जो Intlayer को React एप्लिकेशन के साथ एकीकृत करता है। यह React अंतरराष्ट्रीयकरण के लिए संदर्भ प्रदाता और हुक्स प्रदान करता है।

- **vite-intlayer**
  इसमें Vite प्लगइन शामिल है जो Intlayer को [Vite बंडलर](https://vite.dev/guide/why.html#why-bundle-for-production) के साथ एकीकृत करता है, साथ ही उपयोगकर्ता की पसंदीदा भाषा का पता लगाने, कुकीज़ प्रबंधित करने, और URL पुनर्निर्देशन को संभालने के लिए मिडलवेयर भी शामिल है।

### चरण 2: अपने प्रोजेक्ट का कॉन्फ़िगरेशन

अपने एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फ़ाइल बनाएं:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true, // URLs में हमेशा डिफ़ॉल्ट भाषा को प्रीफिक्स करें
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true, // URLs में हमेशा डिफ़ॉल्ट भाषा को प्रीफिक्स करें
  },
};

module.exports = config;
```

> इस कॉन्फ़िगरेशन फ़ाइल के माध्यम से, आप स्थानीयकृत URL, मिडलवेयर रीडायरेक्शन, कुकी नाम, आपकी सामग्री घोषणाओं का स्थान और एक्सटेंशन, कंसोल में Intlayer लॉग को अक्षम करना, और भी बहुत कुछ सेट कर सकते हैं। उपलब्ध सभी पैरामीटर की पूरी सूची के लिए, कृपया [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

### चरण 3: React Router v7 रूट्स कॉन्फ़िगर करें

अपने रूटिंग कॉन्फ़िगरेशन को लोकल-जानकारी वाले रूट्स के साथ सेट करें:

```typescript fileName="app/routes.ts" codeFormat="typescript"
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    route("/", "routes/page.tsx"), // रूट पेज - लोकल पर रीडायरेक्ट करता है
    route("/:lang", "routes/[lang]/page.tsx"), // स्थानीयकृत होम पेज
    route("/:lang/about", "routes/[lang]/about/page.tsx"), // स्थानीयकृत अबाउट पेज
  ]),
] satisfies RouteConfig;
```

### चरण 4: अपने Vite कॉन्फ़िगरेशन में Intlayer को एकीकृत करें

अपने कॉन्फ़िगरेशन में intlayer प्लगइन जोड़ें:

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayerMiddlewarePlugin, intlayerPlugin } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    intlayerPlugin(),
    intlayerMiddlewarePlugin(),
  ],
});
```

> `intlayerPlugin()` Vite प्लगइन का उपयोग Intlayer को Vite के साथ एकीकृत करने के लिए किया जाता है। यह कंटेंट घोषणा फ़ाइलों के निर्माण को सुनिश्चित करता है और विकास मोड में उनकी निगरानी करता है। यह Vite एप्लिकेशन के भीतर Intlayer पर्यावरण चर को परिभाषित करता है। इसके अतिरिक्त, यह प्रदर्शन को अनुकूलित करने के लिए उपनाम प्रदान करता है।

### चरण 5: लेआउट कॉम्पोनेंट बनाएं

अपने रूट लेआउट और स्थानीय-विशिष्ट लेआउट सेट करें:

#### रूट लेआउट

```tsx fileName="app/routes/layout.tsx" codeFormat="typescript"
// app/routes/layout.tsx
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

export default function RootLayout() {
  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### चरण 6: अपनी सामग्री घोषित करें

अपने अनुवादों को संग्रहीत करने के लिए अपनी सामग्री घोषणाएँ बनाएं और प्रबंधित करें:

```tsx fileName="app/routes/[lang]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      en: "Welcome to React Router v7 + Intlayer",
      tr: "React Router v7 + Intlayer'a Hoş Geldiniz",
    }),
    description: t({
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      tr: "React Router v7 ve Intlayer kullanarak kolayca çok dilli uygulamalar geliştirin.",
    }),
    aboutLink: t({
      en: "हमारे बारे में जानें",
      tr: "Hakkımızda Öğrenin",
    }),
    homeLink: t({
      en: "होम",
      tr: "Ana Sayfa",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

> आपकी सामग्री घोषणाएँ आपकी एप्लिकेशन में कहीं भी परिभाषित की जा सकती हैं जब तक कि वे `contentDir` निर्देशिका (डिफ़ॉल्ट रूप से, `./app`) में शामिल हों। और सामग्री घोषणा फ़ाइल एक्सटेंशन से मेल खाती हों (डिफ़ॉल्ट रूप से, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)।

> अधिक विवरण के लिए, [सामग्री घोषणा प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md) देखें।

### चरण 7: लोकल-एवेयर कंपोनेंट बनाएं

`LocalizedLink` कंपोनेंट बनाएं जो स्थानीय-ज्ञान नेविगेशन के लिए हो:

```tsx fileName="app/components/localized-link.tsx" codeFormat="typescript"
// app/components/localized-link.tsx
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import React from "react";
import { Link, useLocation } from "react-router";

type RouterLinkProps = React.ComponentProps<typeof Link>;

export default function LocalizedLink({ to, ...props }: RouterLinkProps) {
  const { locale } = useLocale(); // वर्तमान स्थानीय भाषा प्राप्त करें
  const location = useLocation(); // वर्तमान स्थान प्राप्त करें

  const isExternal = (path: string) =>
    /^([a-z][a-z0-9+.-]*:)?\/\//i.test(path) || path.startsWith("mailto:"); // जांचें कि पथ बाहरी है या नहीं

  if (typeof to === "string") {
    if (to.startsWith("/") && !isExternal(to)) {
      return <Link to={getLocalizedUrl(to, locale)} {...props} />;
    }
    return <Link to={to} {...props} />;
  }

  if (to && typeof to === "object") {
    const pathname = (to as { pathname?: string }).pathname;
    if (pathname && pathname.startsWith("/") && !isExternal(pathname)) {
      return (
        <Link
          to={{ ...to, pathname: getLocalizedUrl(pathname, locale) }}
          {...props}
        />
      );
    }
    return <Link to={to} {...props} />;
  }

  return (
    <Link
      to={getLocalizedUrl(location.pathname + location.search, locale)}
      {...props}
    />
  );
}
```

### चरण 8: अपने पृष्ठों में Intlayer का उपयोग करें

अपने एप्लिकेशन में अपने कंटेंट डिक्शनरीज़ तक पहुँचें:

#### रूट रीडायरेक्ट पेज

```tsx fileName="app/routes/page.tsx" codeFormat="typescript"
// app/routes/page.tsx
import { useLocale } from "react.intlayer";
import { Navigate } from "react-router";

export default function Page() {
  const { locale } = useLocale();

  return <Navigate replace to={locale} />;
}
```

#### स्थानीयकृत होम पेज

```tsx fileName="app/routes/[lang]/page.tsx" codeFormat="typescript"
import { useIntlayer } from "react.intlayer";
import LocalizedLink from "~/components/localized-link";

export default function Page() {
  const content = useIntlayer("page");

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <nav style={{ marginTop: "2rem" }}>
        <LocalizedLink
          to="/about"
          style={{
            display: "inline-block",
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          {content.aboutLink}
        </LocalizedLink>
      </nav>
    </div>
  );
}
```

> `useIntlayer` हुक के बारे में अधिक जानने के लिए, [दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useIntlayer.md) देखें।

### चरण 9: एक लोकल स्विचर कॉम्पोनेंट बनाएं

उपयोगकर्ताओं को भाषाएँ बदलने की अनुमति देने के लिए एक कॉम्पोनेंट बनाएं:

```tsx fileName="app/components/locale-switcher.tsx" codeFormat="typescript"
import { getLocalizedUrl, getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router";

export default function LocaleSwitcher() {
  const { locale, availableLocales, setLocale } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLocaleChange = (newLocale: string) => {
    const localizedUrl = getLocalizedUrl(
      location.pathname + location.search,
      newLocale
    );
    setLocale(newLocale);
    navigate(localizedUrl);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <label htmlFor="locale-select">भाषा चुनें: </label>
      <select
        id="locale-select"
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        style={{ padding: "0.25rem", marginLeft: "0.5rem" }}
      >
        {availableLocales.map((availableLocale) => (
          <option key={availableLocale} value={availableLocale}>
            {getLocaleName(availableLocale)}
          </option>
        ))}
      </select>
    </div>
  );
}
```

> `useLocale` हुक के बारे में अधिक जानने के लिए, [दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useLocale.md) देखें।

### चरण 10: HTML एट्रिब्यूट्स प्रबंधन जोड़ें (वैकल्पिक)

HTML lang और dir एट्रिब्यूट्स को प्रबंधित करने के लिए एक हुक बनाएं:

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
// app/hooks/useI18nHTMLAttributes.tsx
import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { useLocale } from "react-intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

फिर इसे अपने रूट कॉम्पोनेंट में उपयोग करें:

```tsx fileName="app/root.tsx" codeFormat="typescript"
// app/routes/layout.tsx
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

import { useI18nHTMLAttributes } from "app/hooks/useI18nHTMLAttributes"; // हुक को इम्पोर्ट करें

export default function RootLayout() {
  useI18nHTMLAttributes(); // हुक को कॉल करें

  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### चरण 11: अपना एप्लिकेशन बनाएं और चलाएं

सामग्री शब्दकोश बनाएं और अपने एप्लिकेशन को चलाएं:

```bash packageManager="npm"
# Intlayer शब्दकोश बनाएं
npm run intlayer:build

# विकास सर्वर शुरू करें
npm run dev
```

```bash packageManager="pnpm"
# Intlayer शब्दकोश बनाएं
pnpm intlayer:build

# विकास सर्वर शुरू करें
pnpm dev
```

```bash packageManager="yarn"
# Intlayer शब्दकोश बनाएं
yarn intlayer:build

# विकास सर्वर शुरू करें
yarn dev
```

### चरण 12: TypeScript कॉन्फ़िगर करें (वैकल्पिक)

Intlayer TypeScript के लाभ प्राप्त करने और आपके कोडबेस को मजबूत बनाने के लिए मॉड्यूल ऑगमेंटेशन का उपयोग करता है।

सुनिश्चित करें कि आपकी TypeScript कॉन्फ़िगरेशन में स्वचालित रूप से जनरेट किए गए प्रकार शामिल हैं:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... आपकी मौजूदा TypeScript कॉन्फ़िगरेशन
  },
  include: [
    // ... your existing includes
    ".intlayer/**/*.ts", // ऑटो-जनरेटेड टाइप्स शामिल करें
  ],
}
```

### गिट कॉन्फ़िगरेशन

यह अनुशंसित है कि Intlayer द्वारा जनरेट की गई फाइलों को अनदेखा किया जाए। इससे आप उन्हें अपनी Git रिपॉजिटरी में कमिट करने से बच सकते हैं।

इसके लिए, आप अपनी `.gitignore` फाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```plaintext fileName=".gitignore"
# Intlayer द्वारा जनरेट की गई फाइलों को अनदेखा करें
.intlayer
```

---

## प्रोडक्शन डिप्लॉयमेंट

जब आप अपना एप्लिकेशन डिप्लॉय करें:

1. **अपना एप्लिकेशन बनाएं:**

   ```bash
   npm run build
   ```

2. **Intlayer शब्दकोश बनाएं:**

   ```bash
   npm run intlayer:build
   ```

3. **यदि प्रोडक्शन में मिडलवेयर का उपयोग कर रहे हैं तो `vite-intlayer` को dependencies में जोड़ें:**
   ```bash
   npm install vite-intlayer --save
   ```

आपका एप्लिकेशन अब निम्नलिखित का समर्थन करेगा:

- **URL संरचना**: `/en`, `/en/about`, `/tr`, `/tr/about`
- ब्राउज़र प्राथमिकताओं के आधार पर **स्वचालित लोकल डिटेक्शन**
- React Router v7 के साथ **लोकल-अवेयर राउटिंग**
- ऑटो-जनरेटेड टाइप्स के साथ **TypeScript समर्थन**
- उचित लोकल हैंडलिंग के साथ **सर्वर-साइड रेंडरिंग**

## VS कोड एक्सटेंशन

Intlayer के साथ अपने विकास अनुभव को बेहतर बनाने के लिए, आप आधिकारिक **Intlayer VS कोड एक्सटेंशन** इंस्टॉल कर सकते हैं।

[VS कोड मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह एक्सटेंशन प्रदान करता है:

- अनुवाद कुंजियों के लिए **ऑटोकंप्लीशन**
- गायब अनुवादों के लिए **रियल-टाइम त्रुटि पहचान**
- अनुवादित सामग्री के **इनलाइन पूर्वावलोकन**
- **त्वरित क्रियाएं** जो अनुवादों को आसानी से बनाने और अपडेट करने में मदद करती हैं।

एक्सटेंशन का उपयोग कैसे करें, इसके लिए अधिक जानकारी के लिए देखें [Intlayer VS कोड एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension)।

---

## आगे बढ़ें

आगे बढ़ने के लिए, आप [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) को लागू कर सकते हैं या अपनी सामग्री को [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का उपयोग करके बाहरी कर सकते हैं।

---

## दस्तावेज़ संदर्भ

- [Intlayer दस्तावेज़](https://intlayer.org)
- [React Router v7 दस्तावेज़](https://reactrouter.com/)
- [useIntlayer हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useIntlayer.md)
- [useLocale hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useLocale.md)
- [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md)
- [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)

यह व्यापक मार्गदर्शिका आपको Intlayer को React Router v7 के साथ पूरी तरह से अंतरराष्ट्रीयकृत एप्लिकेशन के लिए एकीकृत करने में आवश्यक सभी जानकारी प्रदान करती है, जिसमें स्थानीय-जानकारी वाले रूटिंग और TypeScript समर्थन शामिल हैं।

## दस्तावेज़ इतिहास

| संस्करण | तिथि      | परिवर्तन                         |
| ------- | --------- | -------------------------------- |
| 5.8.2   | 2025-09-4 | React Router v7 के लिए जोड़ा गया |

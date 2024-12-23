# Intlayer और Next.js का उपयोग करते हुए अंतर्राष्ट्रीयकरण (i18n) के लिए गाइड

## Intlayer क्या है?

**Intlayer** एक नवोन्मेषी, ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) पुस्तकालय है जिसे आधुनिक वेब अनुप्रयोगों में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है। Intlayer नवीनतम **Next.js** फ्रेमवर्क के साथ Seamlessly एकीकृत होता है, जिसमें इसका पारंपरिक **Page Router** शामिल है।

Intlayer के साथ, आप:

- **सरलता से अनुवाद प्रबंधित करें** कंपोनेंट स्तर पर वर्णात्मक शब्दकोश का उपयोग करते हुए।
- **डायनामिक रूप से मेटाडेटा**, रूट और सामग्री का स्थान स्थानीयकरण करें।
- **टाइपस्क्रिप्ट समर्थन सुनिश्चित करें** ऑटो-जनरेटेड प्रकारों के साथ, ऑटोकम्प्लीशन और त्रुटि पहचान में सुधार।
- **अग्र avanzado सुविधाओं का लाभ लें**, जैसे कि डायनामिक लोकेल पहचान और स्विचिंग।

> नोट: Intlayer Next.js 12, 13, 14, और 15 के साथ संगत है। यदि आप Next.js App Router का उपयोग कर रहे हैं, तो [App Router गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_14.md) देखें। Next.js 15 के लिए, इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md) का पालन करें।

---

## Next.js एप्लिकेशन में Page Router का उपयोग करते हुए Intlayer सेट अप करने के लिए चरण-दर-चरण गाइड

### चरण 1: निर्भरता स्थापित करें

अपने पसंदीदा पैकेज प्रबंधक का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash
npm install intlayer next-intlayer
```

```bash
yarn add intlayer next-intlayer
```

```bash
pnpm add intlayer next-intlayer
```

### चरण 2: अपने प्रोजेक्ट का कॉन्फ़िगर करें

एक कॉन्फ़िगरेशन फ़ाइल बनाएँ ताकि आपकी एप्लिकेशन द्वारा समर्थित भाषाएँ निर्धारित की जा सकें:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // यहां अपने अन्य लोकेल जोड़ें
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

उपलब्ध कॉन्फ़िगरेशन विकल्पों की पूरी सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

### चरण 3: Next.js कॉन्फ़िगरेशन के साथ Intlayer को एकीकृत करें

Intlayer को शामिल करने के लिए अपने Next.js कॉन्फ़िगरेशन में संशोधन करें:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // आपका मौजूदा Next.js कॉन्फ़िगरेशन
};

export default withIntlayer(nextConfig);
```

### चरण 4: लोकेल पहचान के लिए मिडलवेयर कॉन्फ़िगर करें

उपयोगकर्ता की पसंदीदा लोकेल का स्वचालित रूप से पता लगाने और संभालने के लिए मिडलवेयर सेट अप करें:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### चरण 5: डायनामिक लोकेल रूट परिभाषित करें

उपयोगकर्ता की लोकेल के आधार पर स्थानीयकृत सामग्री प्रदान करने के लिए डायनामिक रूटिंग को लागू करें।

1. **लोकेल-विशिष्ट पृष्ठ बनाएं:**

   अपने मुख्य पृष्ठ फ़ाइल का नाम बदलें ताकि `[locale]` डायनामिक खंड शामिल किया जा सके।

   ```bash
   mv src/pages/index.tsx src/pages/[locale]/index.tsx
   ```

2. **स्थानीयकरण को संभालने के लिए `_app.tsx` को अपडेट करें:**

   Intlayer प्रदाताओं को शामिल करने के लिए अपने `_app.tsx` को संशोधित करें।

   ```tsx
   // src/pages/_app.tsx

   import { AppProps } from "next/app";
   import { IntlayerClientProvider } from "next-intlayer";
   import { IntlayerServerProvider } from "next-intlayer/server";
   import intlayerConfig from "../../intlayer.config";

   function MyApp({ Component, pageProps }: AppProps) {
     const { locale } = pageProps;

     return (
       <IntlayerClientProvider locale={locale}>
         <Component {...pageProps} />
       </IntlayerClientProvider>
     );
   }

   export default MyApp;
   ```

3. **`getStaticPaths` और `getStaticProps` सेट अप करें:**

   अपने `[locale]/index.tsx` में विभिन्न लोकेल को संभालने के लिए पथ और प्रॉप्स को परिभाषित करें।

   ```tsx
   // src/pages/[locale]/index.tsx

   import { GetStaticPaths, GetStaticProps } from "next";
   import { useIntlayer } from "next-intlayer";
   import { Locales } from "intlayer";

   const HomePage = () => {
     return <div>{/* आपकी सामग्री यहाँ */}</div>;
   };

   export const getStaticPaths: GetStaticPaths = async () => {
     const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH]; // यहां अपने लोकेल जोड़ें

     const paths = locales.map((locale) => ({
       params: { locale },
     }));

     return { paths, fallback: false };
   };

   export const getStaticProps: GetStaticProps = async ({ params }) => {
     const locale = params?.locale as string;

     return {
       props: {
         locale,
       },
     };
   };

   export default HomePage;
   ```

### चरण 6: अपनी सामग्री घोषित करें

अनुवादों को संग्रहीत करने के लिए सामग्री शब्दकोष बनाएं और प्रबंधित करें।

```tsx
// src/pages/[locale]/home.content.ts
import { t, type DeclarationContent } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "Welcome to My Website",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      en: "Get started by editing this page.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies DeclarationContent;

export default homeContent;
```

सामग्री घोषित करने के लिए अधिक जानकारी के लिए, [सामग्री घोषणा गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md) देखें।

### चरण 7: अपने कोड में सामग्री का उपयोग करें

अनुवादित सामग्री प्रदर्शित करने के लिए अपने आवेदन के पूरी तरह से सामग्री शब्दकोषों तक पहुँचें।

```tsx
// src/pages/[locale]/index.tsx

import { GetStaticPaths, GetStaticProps } from "next";
import { useIntlayer } from "next-intlayer";
import { Locales } from "intlayer";
import { ComponentExample } from "@component/ComponentExample";

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <ComponentExample />
      {/* अतिरिक्त घटक */}
    </div>
  );
};

// ... शेष कोड, जिसमें getStaticPaths और getStaticProps शामिल हैं

export default HomePage;
```

```tsx
// src/components/ComponentExample.tsx

import { useIntlayer } from "next-intlayer";

export const ComponentExample = () => {
  const content = useIntlayer("client-component-example"); // सुनिश्चित करें कि आपके पास एक संबंधित सामग्री घोषणा है

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> **नोट:** जब `string` एट्रिब्यूट्स (जैसे, `alt`, `title`, `href`, `aria-label`) में अनुवादों का उपयोग कर रहे हैं, तो नीचे दिए गए अनुसार फ़ंक्शन के मान को कॉल करें:

```tsx
<img src={content.image.src.value} alt={content.image.value} />
```

### (वैकल्पिक) चरण 8: अपने मेटाडेटा का अंतर्राष्ट्रीयकरण करें

पृष्ठ के शीर्षक और विवरण जैसे मेटाडेटा का अंतर्राष्ट्रीयकरण करने के लिए, Intlayer के `getTranslationContent` फ़ंक्शन के साथ `getStaticProps` फ़ंक्शन का उपयोग करें।

```tsx
// src/pages/[locale]/index.tsx

import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslationContent, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

interface HomePageProps {
  locale: string;
  metadata: Metadata;
}

const HomePage = ({ metadata }: HomePageProps) => {
  // मेटाडेटा का उपयोग आवश्यकतानुसार शीर्षक या अन्य घटकों में किया जा सकता है
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* अतिरिक्त सामग्री */}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string;

  const t = <T,>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

export default HomePage;

// ... शेष कोड जिसमें getStaticPaths शामिल हैं
```

### (वैकल्पिक) चरण 9: अपनी सामग्री की भाषा बदलें

उपयोगकर्ताओं को डायनामिक रूप से भाषाओं को स्विच करने की अनुमति देने के लिए, `useLocale` हुक द्वारा प्रदान किए गए `setLocale` फ़ंक्शन का उपयोग करें।

```tsx
// src/components/LanguageSwitcher.tsx

import { Locales } from "intlayer";
import { useLocalePageRouter } from "next-intlayer";

const LanguageSwitcher = () => {
  const { setLocale } = useLocalePageRouter();

  return (
    <div>
      <button onClick={() => setLocale(Locales.ENGLISH)}>English</button>
      <button onClick={() => setLocale(Locales.FRENCH)}>Français</button>
      <button onClick={() => setLocale(Locales.SPANISH)}>Español</button>
      {/* अतिरिक्त लोकेल के लिए अधिक बटन जोड़ें */}
    </div>
  );
};

export default LanguageSwitcher;
```

### टाइपस्क्रिप्ट को कॉन्फ़िगर करें

Intlayer टाइपस्क्रिप्ट की क्षमताओं को बढ़ाने के लिए मॉड्यूल विस्तार का उपयोग करता है, जिससे बेहतर प्रकार सुरक्षा और ऑटोकम्प्लीशन उपलब्ध होती है।

1. **सुनिश्चित करें कि टाइपस्क्रिप्ट ऑटो-जनरेटेड प्रकारों को शामिल करता है:**

   अपने `tsconfig.json` को ऑटो-जनरेटेड प्रकारों को शामिल करने के लिए अपडेट करें।

   ```json
   // tsconfig.json

   {
     "compilerOptions": {
       // आपके मौजूदा टाइपस्क्रिप्ट कॉन्फ़िगरेशन
     },
     "include": [
       "src",
       "types" // ऑटो-जनरेटेड प्रकारों को शामिल करें
     ]
   }
   ```

2. **टाइपस्क्रिप्ट के लाभों का उदाहरण:**

   ![Autocompletion Example](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

   ![Translation Error Example](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

### गिट कॉन्फ़िगरेशन

अपने रिपॉजिटरी को साफ़ रखने और Intlayer द्वारा बनाए गए फ़ाइलों को कमिट करने से बचने के लिए, फ़ाइलों को अनदेखा करना अनुशंसित है।

1. **`.gitignore` अपडेट करें:**

   अपने `.gitignore` फ़ाइल में निम्नलिखित पंक्तियां जोड़ें:

   ```plaintext
   # Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
   .intlayer
   ```

## अतिरिक्त संसाधन

- **Intlayer दस्तावेज़:** [GitHub रिपॉजिटरी](https://github.com/aymericzip/intlayer)
- **सामग्री घोषणा गाइड:** [सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md)
- **कॉन्फ़िगरेशन दस्तावेज़:** [कॉन्फ़िगरेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md)

इस गाइड का पालन करके, आप अपने Next.js एप्लिकेशन में Page Router का उपयोग करते हुए Intlayer को प्रभावी ढंग से एकीकृत कर सकते हैं, जिससे आपके वेब परियोजनाओं के लिए मजबूत और स्केलेबल अंतर्राष्ट्रीयकरण समर्थन सक्षम होता है।

```

```

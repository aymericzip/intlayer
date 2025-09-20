---
createdAt: 2025-03-01
updatedAt: 2025-09-20
title: आपकी सामग्री का परीक्षण
description: Intlayer के साथ अपनी सामग्री का परीक्षण कैसे करें, जानें।
keywords:
  - परीक्षण
  - Intlayer
  - अंतर्राष्ट्रीयकरण
  - CMS
  - सामग्री प्रबंधन प्रणाली
  - विज़ुअल एडिटर
slugs:
  - doc
  - testing
---

# आपकी सामग्री का परीक्षण

यह मार्गदर्शिका दिखाती है कि कैसे अपने शब्दकोशों की पूर्णता को स्वचालित रूप से सत्यापित करें, शिपिंग से पहले गायब अनुवाद पकड़ें, और अपने ऐप में स्थानीयकृत UI का परीक्षण करें।

---

## आप क्या परीक्षण कर सकते हैं

- **गायब अनुवाद**: यदि किसी भी शब्दकोश के लिए आवश्यक स्थानीय भाषाएँ गायब हैं तो CI असफल हो जाएगा।
- **स्थानीयकृत UI रेंडरिंग**: किसी विशिष्ट स्थानीय प्रदाता के साथ घटकों को रेंडर करें और दिखाई देने वाले टेक्स्ट/विशेषताओं पर सत्यापन करें।
- **बिल्ड-टाइम ऑडिट**: CLI के माध्यम से स्थानीय रूप से एक त्वरित ऑडिट चलाएं।

---

## त्वरित प्रारंभ: CLI के माध्यम से ऑडिट

अपने प्रोजेक्ट रूट से ऑडिट चलाएं:

```bash
npx intlayer content test
```

उपयोगी फ्लैग्स:

- `--env-file [path]`: किसी फ़ाइल से पर्यावरण चर लोड करें।
- `-e, --env [name]`: एक पर्यावरण प्रोफ़ाइल चुनें।
- `--base-dir [path]`: समाधान के लिए ऐप बेस डायरेक्टरी सेट करें।
- `--verbose`: विस्तृत लॉग दिखाएं।
- `--prefix [label]`: लॉग लाइनों के लिए उपसर्ग जोड़ें।

ध्यान दें: CLI एक विस्तृत रिपोर्ट प्रिंट करता है लेकिन विफलताओं पर गैर-शून्य कोड के साथ बाहर नहीं निकलता। CI गेटिंग के लिए, एक यूनिट टेस्ट (नीचे) जोड़ें जो यह सुनिश्चित करे कि कोई आवश्यक स्थानीय भाषा गायब न हो।

---

## प्रोग्रामेटिक परीक्षण (Vitest/Jest)

अपने आवश्यक स्थानीय भाषाओं के लिए कोई गायब अनुवाद न होने का सत्यापन करने के लिए Intlayer CLI API का उपयोग करें।

```ts
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("अनुवाद", () => {
  it("कोई आवश्यक स्थानीय भाषा गायब नहीं है", () => {
    const result = listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      // जब परीक्षण स्थानीय रूप से या CI में विफल होता है तो सहायक
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Jest समतुल्य:

```ts
import { listMissingTranslations } from "intlayer/cli";

test("कोई आवश्यक स्थानीय भाषा गायब नहीं है", () => {
  const result = listMissingTranslations();

  if (result.missingRequiredLocales.length > 0) {
    // eslint-disable-next-line no-console
    console.log(result.missingTranslations);
  }

  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

यह कैसे काम करता है:

- Intlayer आपकी कॉन्फ़िगरेशन (locales, requiredLocales) और घोषित शब्दकोशों को पढ़ता है, फिर रिपोर्ट करता है:
  - `missingTranslations`: प्रति-कुंजी, कौन-कौन सी स्थानीय भाषाएँ गायब हैं और किस फ़ाइल से।
  - `missingLocales`: सभी गायब स्थानीय भाषाओं का संघ।
  - `missingRequiredLocales`: `requiredLocales` तक सीमित उपसमूह (या यदि `requiredLocales` सेट नहीं है तो सभी स्थानीय भाषाएँ)।

---

## स्थानीयकृत UI का परीक्षण (React / Next.js)

Intlayer प्रदाता के अंतर्गत घटकों को रेंडर करें और दृश्य सामग्री पर सत्यापन करें।

React उदाहरण (Testing Library):

```tsx
import { IntlayerProvider } from "react-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

test("अंग्रेज़ी में स्थानीयकृत शीर्षक रेंडर करता है", () => {
  render(
    <IntlayerProvider locale="en-US">
      <MyComponent />
    </IntlayerProvider>
  );

  expect(screen.getByText("अपेक्षित अंग्रेज़ी शीर्षक")).toBeInTheDocument();
});
```

Next.js (App Router) उदाहरण: फ्रेमवर्क रैपर का उपयोग करें:

```tsx
import { IntlayerClientProvider } from "next-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyPage } from "./MyPage";

test("फ्रेंच में स्थानीयकृत शीर्षक प्रदर्शित करता है", () => {
  render(
    <IntlayerClientProvider locale="fr-FR">
      <MyPage />
    </IntlayerClientProvider>
  );
  expect(
    screen.getByRole("heading", { name: "Titre attendu" })
  ).toBeInTheDocument();
});
```

टिप्स:

- जब आपको गुणों के लिए कच्चे स्ट्रिंग मानों की आवश्यकता हो (जैसे, `aria-label`), तो React में `useIntlayer` द्वारा लौटाए गए `.value` फ़ील्ड तक पहुँचें।
- आसान यूनिट परीक्षण और सफाई के लिए शब्दकोशों को घटकों के साथ ही रखें।

---

## सतत एकीकरण

एक ऐसा परीक्षण जोड़ें जो आवश्यक अनुवादों के गायब होने पर बिल्ड को विफल कर दे।

`package.json`:

```json
{
  "scripts": {
    "test:i18n": "vitest run -c"
  }
}
```

GitHub Actions उदाहरण:

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run test:i18n
```

वैकल्पिक: परीक्षणों के साथ-साथ एक मानव-पठनीय सारांश के लिए CLI ऑडिट चलाएं:

```bash
npx intlayer content test --verbose
```

---

## समस्या निवारण

- सुनिश्चित करें कि आपका Intlayer कॉन्फ़िगरेशन `locales` और (वैकल्पिक रूप से) `requiredLocales` को परिभाषित करता है।
- यदि आपका ऐप डायनामिक या रिमोट शब्दकोशों का उपयोग करता है, तो ऐसे वातावरण में परीक्षण चलाएं जहां शब्दकोश उपलब्ध हों।
- मिश्रित मोनोरिपोज़ के लिए, CLI को सही एप्लिकेशन रूट पर इंगित करने के लिए `--base-dir` का उपयोग करें।

---

## दस्तावेज़ इतिहास

| संस्करण | तिथि       | परिवर्तन         |
| ------- | ---------- | ---------------- |
| 6.0.0   | 2025-09-20 | परीक्षण का परिचय |

# intlayer-cli: Intlayer CLI का उपयोग करने के लिए NPM पैकेज

**Intlayer** जावास्क्रिप्ट डेवलपर्स के लिए विशेष रूप से डिज़ाइन किए गए पैकेजों का एक सूट है। यह React, React और Express.js जैसे फ्रेमवर्क्स के साथ संगत है।

**`intlayer-cli`** पैकेज एक NPM पैकेज है जो `@intlayer/cli` पैकेज का उपभोग करता है और इसे `intlayer` कमांड लाइन इंटरफेस के लिए उपलब्ध कराता है।

> ध्यान दें कि इस पैकेज की आवश्यकता नहीं है यदि [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/hi/packages/intlayer/index.md) पैकेज स्थापित है। `intlayer` पैकेज की तुलना में, `intlayer-cli` पैकेज एक हल्का पैकेज है जिसमें केवल CLI टूल शामिल है, बिना `@intlayer/core` निर्भरताओं के।

## स्थापना

अपने पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

## उपयोग

यहाँ `intlayer-cli` पैकेज का उपयोग करने का एक उदाहरण है:

```bash
npx intlayer build
```

## CLI कमांड्स

Intlayer एक CLI टूल प्रदान करता है जो:

- आपकी सामग्री घोषणाओं का ऑडिट करता है और गायब अनुवादों को पूरा करता है
- आपकी सामग्री घोषणाओं से शब्दकोश बनाता है
- आपके CMS से आपके स्थानीय प्रोजेक्ट में दूरस्थ शब्दकोशों को पुश और पुल करता है

अधिक जानकारी के लिए [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md) पर परामर्श करें।

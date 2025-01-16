# intlayer-cli: NPM पैकेज का उपयोग करने के लिए Intlayer CLI

**Intlayer** जावास्क्रिप्ट डेवलपर्स के लिए विशेष रूप से डिज़ाइन किए गए पैकेजों का एक सूट है। यह React, React और Express.js जैसे ढाँचों के साथ संगत है।

**`intlayer-cli`** पैकेज एक NPM पैकेज है जो `@intlayer/cli` पैकेज का उपभोग करता है और इसे `intlayer` कमांड लाइन इंटरफेस के लिए उपलब्ध कराता है।

> ध्यान दें कि यदि [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/hi/packages/intlayer/index.md) पैकेज स्थापित है तो इस पैकेज की आवश्यकता नहीं है। `intlayer` पैकेज की तुलना में, `intlayer-cli` पैकेज एक हल्का पैकेज है जिसमें केवल CLI टूल होता है, जिसमें `@intlayer/core` निर्भरताएँ नहीं होती हैं।

## स्थापना

अपने पसंदीदा पैकेज प्रबंधक का उपयोग करके आवश्यक पैकेज स्थापित करें:

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

यहां `intlayer-cli` पैकेज का उपयोग करने का एक उदाहरण है:

```bash
npx intlayer build
```

## CLI आदेश

Intlayer एक CLI उपकरण प्रदान करता है:

- आपकी सामग्री घोषणाओं का ऑडिट करें और गायब अनुवाद पूर्ण करें
- आपकी सामग्री घोषणाओं से शब्दकोष बनाएं
- अपने CMS से अपने स्थान स्थानीय प्रोजेक्ट में दूरस्थ शब्दकोष पुश और पुल करें

अधिक जानकारी के लिए [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md) पर परामर्श करें।

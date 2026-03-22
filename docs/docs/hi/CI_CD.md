---
createdAt: 2025-05-20
updatedAt: 2025-08-13
title: CI/CD एकीकरण
description: स्वचालित सामग्री प्रबंधन और परिनियोजन के लिए Intlayer को अपने CI/CD पाइपलाइन में एकीकृत करना सीखें।
keywords:
  - CI/CD
  - सतत एकीकरण
  - सतत परिनियोजन
  - स्वचालन
  - अंतरराष्ट्रीयकरण
  - प्रलेखन
  - Intlayer
slugs:
  - doc
  - concept
  - ci-cd
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "इतिहास प्रारंभ करें"
---

# CI/CD पाइपलाइन में स्वचालित अनुवाद उत्पन्न करें

Intlayer आपके सामग्री घोषणा फ़ाइलों के लिए अनुवादों का स्वचालित उत्पादन करने की अनुमति देता है। आपके कार्यप्रवाह के आधार पर इसे प्राप्त करने के कई तरीके हैं।

## CMS का उपयोग करना

Intlayer के साथ, आप एक ऐसा कार्यप्रवाह अपना सकते हैं जहाँ केवल एक ही स्थानीय भाषा स्थानीय रूप से घोषित की जाती है, जबकि सभी अनुवाद CMS के माध्यम से दूरस्थ रूप से प्रबंधित किए जाते हैं। यह सामग्री और अनुवादों को कोडबेस से पूरी तरह से अलग करने की अनुमति देता है, जिससे सामग्री संपादकों के लिए अधिक लचीलापन मिलता है और हॉट कंटेंट रीलोडिंग सक्षम होती है (परिवर्तन लागू करने के लिए एप्लिकेशन को पुनः निर्माण करने की आवश्यकता नहीं होती)।

### उदाहरण विन्यास

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // वैकल्पिक स्थानीय भाषाएँ दूरस्थ रूप से प्रबंधित की जाएंगी
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    dictionaryPriorityStrategy: "distant_first", // दूरस्थ सामग्री को प्राथमिकता दी जाती है

    applicationURL: process.env.APPLICATION_URL, // CMS द्वारा उपयोग किया जाने वाला एप्लिकेशन URL

    clientId: process.env.INTLAYER_CLIENT_ID, // CMS प्रमाणपत्र
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    applicationContext: "यह एक परीक्षण एप्लिकेशन है", // सुनिश्चित करता है कि अनुवाद सुसंगत रूप से उत्पन्न हों
  },
};

export default config;
```

CMS के बारे में अधिक जानने के लिए, [आधिकारिक दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) देखें।

## Husky का उपयोग करना

आप अपने स्थानीय Git वर्कफ़्लो में अनुवाद निर्माण को [Husky](https://typicode.github.io/husky/) का उपयोग करके एकीकृत कर सकते हैं।

### उदाहरण विन्यास

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // वैकल्पिक लोकल दूरस्थ रूप से संभाले जाते हैं
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // अपना स्वयं का API कुंजी उपयोग करें

    applicationContext: "यह एक परीक्षण एप्लिकेशन है", // सुनिश्चित करता है कि अनुवाद सुसंगत रूप से उत्पन्न हों
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # सुनिश्चित करने के लिए कि शब्दकोश अद्यतित हैं
npx intlayer fill --unpushed --mode fill    # केवल गायब सामग्री भरें, मौजूदा को अपडेट नहीं करता
```

> Intlayer CLI कमांड और उनके उपयोग के बारे में अधिक जानकारी के लिए, [CLI दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) देखें।

> यदि आपके रिपॉजिटरी में कई ऐप्स अलग-अलग intlayer इंस्टेंस का उपयोग कर रहे हैं, तो आप `--base-dir` तर्क इस प्रकार उपयोग कर सकते हैं:

```bash fileName=".husky/pre-push"
# ऐप 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# ऐप 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## GitHub Actions का उपयोग करना

Intlayer एक CLI कमांड प्रदान करता है जो शब्दकोश सामग्री को स्वचालित रूप से भरने और समीक्षा करने के लिए है। इसे GitHub Actions का उपयोग करके आपके CI/CD वर्कफ़्लो में एकीकृत किया जा सकता है।

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer ऑटो-फिल
# इस वर्कफ़्लो के लिए ट्रिगर शर्तें
on:
  pull_request:
    branches:
      - "main"

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: "autofill-${{ github.ref }}"
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      # OpenAI
      AI_MODEL: openai
      AI_PROVIDER: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}

    steps:
      # चरण 1: रिपॉजिटरी से नवीनतम कोड प्राप्त करें
      - name: ⬇️ रिपॉजिटरी चेकआउट करें
        uses: actions/checkout@v4
        with:
          persist-credentials: true # PRs बनाने के लिए क्रेडेंशियल्स रखें
          fetch-depth: 0 # डिफ़ एनालिसिस के लिए पूरी गिट हिस्ट्री प्राप्त करें

      # चरण 2: Node.js पर्यावरण सेट करें
      - name: 🟢 Node.js सेट करें
        uses: actions/setup-node@v4
        with:
          node-version: 20 # स्थिरता के लिए Node.js 20 LTS का उपयोग करें

      # चरण 3: प्रोजेक्ट निर्भरताएँ इंस्टॉल करें
      - name: 📦 निर्भरताएँ इंस्टॉल करें
        run: npm install

      # चरण 4: अनुवाद प्रबंधन के लिए Intlayer CLI को ग्लोबली इंस्टॉल करें
      - name: 📦 Intlayer इंस्टॉल करें
        run: npm install -g intlayer-cli

      # चरण 5: अनुवाद फ़ाइलें उत्पन्न करने के लिए Intlayer प्रोजेक्ट बनाएं
      - name: ⚙️ Intlayer प्रोजेक्ट बनाएं
        run: npx intlayer build

      # चरण 6: AI का उपयोग करके स्वचालित रूप से गायब अनुवाद भरें
      - name: 🤖 गायब अनुवादों को स्वचालित रूप से भरें
        run: npx intlayer fill --git-diff --mode fill --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY

      # चरण 7: जांचें कि क्या कोई परिवर्तन हैं और उन्हें कमिट करें
      - name: � परिवर्तनों के लिए जांच करें
        id: check-changes
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            echo "has-changes=true" >> $GITHUB_OUTPUT
          else
            echo "has-changes=false" >> $GITHUB_OUTPUT
          fi

      # चरण 8: यदि कोई परिवर्तन हैं तो उन्हें कमिट और पुश करें
      - name: 📤 परिवर्तन कमिट और पुश करें
        if: steps.check-changes.outputs.has-changes == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git commit -m "chore: गायब अनुवादों को स्वचालित रूप से भरें [skip ci]"
          git push origin HEAD:${{ github.head_ref }}
```

पर्यावरण चर सेट करने के लिए, GitHub → Settings → Secrets and variables → Actions पर जाएं और सीक्रेट जोड़ें।

> Husky के समान, मोनोरिपो के मामले में, आप प्रत्येक ऐप को क्रमिक रूप से संसाधित करने के लिए `--base-dir` तर्क का उपयोग कर सकते हैं।

> डिफ़ॉल्ट रूप से, `--git-diff` तर्क उन शब्दकोशों को फ़िल्टर करता है जिनमें बेस (डिफ़ॉल्ट `origin/main`) से वर्तमान शाखा (डिफ़ॉल्ट: `HEAD`) तक के परिवर्तन शामिल होते हैं।

> Intlayer CLI कमांड और उनके उपयोग के बारे में अधिक जानकारी के लिए, [CLI दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) देखें।

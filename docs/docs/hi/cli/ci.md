---
createdAt: 2026-01-06
updatedAt: 2026-01-06
title: CI कमांड
description: CI/CD पाइपलाइन और मोनोरेपो में स्वचालित रूप से इंजेक्ट किए गए क्रेडेंशियल के साथ Intlayer कमांड चलाने के लिए Intlayer CI कमांड का उपयोग कैसे करें, यह जानें।
keywords:
  - CI
  - CI/CD
  - स्वचालन
  - मोनोरेपो
  - क्रेडेंशियल
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - ci
history:
  - version: 7.5.11
    date: 2026-01-06
    changes: CI कमांड जोड़ें
---

# CI कमांड

```bash
npx intlayer ci <command...>
```

CI कमांड स्वचालन और CI/CD पाइपलाइन के लिए डिज़ाइन किया गया है। यह स्वचालित रूप से `INTLAYER_PROJECT_CREDENTIALS` environment variable से क्रेडेंशियल इंजेक्ट करता है और मोनोरेपो में कई प्रोजेक्ट पर Intlayer कमांड चला सकता है।

## यह कैसे काम करता है

CI कमांड दो मोड में काम करता है:

1. **एकल प्रोजेक्ट मोड**: यदि वर्तमान working directory `INTLAYER_PROJECT_CREDENTIALS` में प्रोजेक्ट पथों में से एक से मेल खाता है, तो यह केवल उस विशिष्ट प्रोजेक्ट के लिए कमांड चलाता है।

2. **पुनरावृत्ति मोड**: यदि कोई विशिष्ट प्रोजेक्ट context का पता नहीं चलता है, तो यह सभी configured प्रोजेक्ट पर iterate करता है और प्रत्येक के लिए कमांड चलाता है।

## Environment Variable

कमांड के लिए `INTLAYER_PROJECT_CREDENTIALS` environment variable सेट होना आवश्यक है। इस variable में एक JSON object होना चाहिए जो प्रोजेक्ट पथों को उनके क्रेडेंशियल से map करता है:

```json
{
  "packages/app": {
    "clientId": "your-client-id-1",
    "clientSecret": "your-client-secret-1"
  },
  "packages/admin": {
    "clientId": "your-client-id-2",
    "clientSecret": "your-client-secret-2"
  }
}
```

## Package Manager Detection

CI कमांड स्वचालित रूप से पता लगाता है कि कौन सा package manager उपयोग किया जा रहा है (npm, yarn, pnpm, या bun) `npm_config_user_agent` environment variable के आधार पर और Intlayer को execute करने के लिए उपयुक्त कमांड का उपयोग करता है।

## Arguments

- **`<command...>`**: execute करने के लिए Intlayer कमांड (उदाहरण के लिए, `fill`, `push`, `build`)। आप कोई भी Intlayer कमांड और उसके arguments पास कर सकते हैं।

  > उदाहरण: `npx intlayer ci fill --verbose`
  >
  > उदाहरण: `npx intlayer ci push`
  >
  > उदाहरण: `npx intlayer ci build`

## उदाहरण

### एकल प्रोजेक्ट मोड में कमांड चलाएं

यदि आप एक प्रोजेक्ट directory में हैं जो `INTLAYER_PROJECT_CREDENTIALS` में paths में से एक से मेल खाता है:

```bash
cd packages/app
npx intlayer ci fill
```

यह `packages/app` प्रोजेक्ट के लिए स्वचालित रूप से injected क्रेडेंशियल के साथ `fill` कमांड चलाएगा।

### सभी प्रोजेक्ट पर कमांड चलाएं

यदि आप एक directory में हैं जो किसी भी प्रोजेक्ट path से मेल नहीं खाता है, तो कमांड सभी configured प्रोजेक्ट पर iterate करेगा:

```bash
cd /path/to/monorepo
npx intlayer ci push
```

यह `INTLAYER_PROJECT_CREDENTIALS` में configured प्रत्येक प्रोजेक्ट के लिए `push` कमांड चलाएगा।

### अतिरिक्त flags पास करें

आप underlying Intlayer कमांड में कोई भी flags पास कर सकते हैं:

```bash
npx intlayer ci fill --verbose --mode complete
```

### CI/CD pipelines में उपयोग करें

अपने CI/CD configuration में (उदाहरण के लिए, GitHub Actions, GitLab CI), `INTLAYER_PROJECT_CREDENTIALS` को secret के रूप में सेट करें:

```yaml
# GitHub Actions उदाहरण
env:
  INTLAYER_PROJECT_CREDENTIALS: ${{ secrets.INTLAYER_PROJECT_CREDENTIALS }}

steps:
  - name: शब्दकोश भरें
    run: npx intlayer ci fill
```

## Error Handling

- यदि `INTLAYER_PROJECT_CREDENTIALS` सेट नहीं है, तो कमांड error के साथ exit होगा।
- यदि `INTLAYER_PROJECT_CREDENTIALS` valid JSON नहीं है, तो कमांड error के साथ exit होगा।
- यदि कोई प्रोजेक्ट path मौजूद नहीं है, तो इसे warning के साथ skip किया जाएगा।
- यदि कोई प्रोजेक्ट fail होता है, तो कमांड non-zero status code के साथ exit होगा।

## Use Cases

- **मोनोरेपो स्वचालन**: मोनोरेपो में कई प्रोजेक्ट पर Intlayer कमांड चलाएं
- **CI/CD pipelines**: continuous integration workflows में शब्दकोश प्रबंधन को स्वचालित करें
- **बल्क operations**: एक साथ कई Intlayer प्रोजेक्ट पर एक ही operation perform करें
- **Secret management**: environment variables का उपयोग करके कई प्रोजेक्ट के लिए क्रेडेंशियल को सुरक्षित रूप से manage करें

## Security Best Practices

- अपने CI/CD platform में `INTLAYER_PROJECT_CREDENTIALS` को encrypted secrets के रूप में store करें
- कभी भी क्रेडेंशियल को version control में commit न करें
- विभिन्न deployment environments के लिए environment-specific क्रेडेंशियल का उपयोग करें
- नियमित रूप से क्रेडेंशियल rotate करें

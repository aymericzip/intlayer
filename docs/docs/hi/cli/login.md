---
createdAt: 2025-12-16
updatedAt: 2025-12-16
title: "CLI - लॉगिन"
description: "Intlayer CLI के `login` कमांड का उपयोग करके Intlayer CMS के साथ प्रमाणीकृत होने और एक्सेस क्रेडेंशियल प्राप्त करने का तरीका जानें।"
keywords:
  - CLI
  - Login
  - Authentication
  - CMS
  - Intlayer
  - Credentials
slugs:
  - doc
  - concept
  - cli
  - login
---

# Intlayer CLI लॉगिन कमांड

---

## विवरण

Intlayer CLI का `login` कमांड आपको Intlayer CMS के साथ प्रमाणीकृत होने की अनुमति देता है। यह कमांड आपके डिफ़ॉल्ट ब्राउज़र को स्वचालित रूप से खोलता है ताकि प्रमाणीकरण प्रक्रिया पूरी की जा सके और Intlayer सेवाओं का उपयोग करने के लिए आवश्यक क्रेडेंशियल (Client ID और Client Secret) प्राप्त किए जा सकें।

## उपयोग

```bash
npx intlayer login [options]
```

या

```bash
intlayer login [options]
```

## विकल्प

### `--cms-url <url>`

प्रमाणीकरण के लिए कनेक्ट करने हेतु Intlayer CMS का URL निर्दिष्ट करें।

- **प्रकार**: `string`
- **डिफ़ॉल्ट**: `intlayer.config.*` में कॉन्फ़िगर किया गया मान या `https://intlayer.org`
- **उदाहरण**:

```bash
npx intlayer login --cms-url https://intlayer.org
```

### कॉन्फ़िगरेशन विकल्प

आप सामान्य कॉन्फ़िगरेशन विकल्प भी उपयोग कर सकते हैं:

- `--env-file <path>`: पर्यावरण फ़ाइल का पथ
- `-e, --env <env>`: निष्पादन पर्यावरण
- `--base-dir <dir>`: प्रोजेक्ट की बेस डायरेक्टरी
- `--verbose`: विस्तृत आउटपुट सक्षम करें (डिफ़ॉल्ट: true)
- `--prefix <prefix>`: लॉग के लिए उपसर्ग

## यह कैसे काम करता है

1. **लोकल सर्वर शुरू करना**: यह कमांड CMS से क्रेडेंशियल प्राप्त करने के लिए एक रैंडम पोर्ट पर लोकल HTTP सर्वर शुरू करता है

प्रमाणीकरण के लिए कनेक्ट करने हेतु Intlayer CMS का URL निर्दिष्ट करें।

- **प्रकार**: `string`
- **डिफ़ॉल्ट**: `intlayer.config.*` में कॉन्फ़िगर किया गया मान या `https://intlayer.org`
- **उदाहरण**:

```bash
npx intlayer login --cms-url https://intlayer.org
```

### कॉन्फ़िगरेशन विकल्प

आप सामान्य कॉन्फ़िगरेशन विकल्प भी उपयोग कर सकते हैं:

- `--env-file <path>`: एनवायरनमेंट फ़ाइल का पथ
- `-e, --env <env>`: निष्पादन वातावरण
- `--base-dir <dir>`: प्रोजेक्ट की मूल निर्देशिका
- `--verbose`: विस्तृत आउटपुट सक्षम करें (डिफ़ॉल्ट: true)
- `--prefix <prefix>`: लॉग्स के लिए प्रीफ़िक्स

## यह कैसे काम करता है

1. **स्थानीय सर्वर शुरू**: कमांड CMS से क्रेडेंशियल प्राप्त करने के लिए एक रैंडम पोर्ट पर स्थानीय HTTP सर्वर शुरू करता है
2. **ब्राउज़र खोलना**: यह कमांड स्वचालित रूप से आपका डिफ़ॉल्ट ब्राउज़र CMS लॉगिन URL में खोलता है
3. **प्रमाणीकरण**: ब्राउज़र में अपने Intlayer खाते का उपयोग करके प्रमाणीकरण पूरा करें
4. **क्रेडेंशियल प्राप्ति**: लोकल सर्वर CMS से Client ID और Client Secret प्राप्त करता है
5. **निर्देश**: यह कमांड आपके प्रोजेक्ट में क्रेडेंशियल कॉन्फ़िगर करने के निर्देश प्रदर्शित करता है

## आउटपुट

सफल लॉगिन के बाद, यह कमांड निम्न प्रदर्शित करेगा:

1. **प्राप्त क्रेडेंशियल** (Client ID और Client Secret)
2. **`.env` फ़ाइल के लिए निर्देश**:

```bash
INTLAYER_CLIENT_ID=your_client_id
INTLAYER_CLIENT_SECRET=your_client_secret
```

3. **Intlayer कॉन्फ़िगरेशन फ़ाइल के लिए निर्देश**:

```typescript
{
  editor: {
    cmsURL: 'https://intlayer.org',
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
}
```

## मैनुअल कॉन्फ़िगरेशन

यदि ब्राउज़र स्वचालित रूप से नहीं खुलता है, तो आप टर्मिनल में दिखाई गई URL को मैन्युअली खोल सकते हैं।

## उदाहरण

### कस्टम CMS URL के साथ लॉगिन

```bash
npx intlayer login --cms-url https://custom-cms.example.com
```

### विशिष्ट एनवायरनमेंट फ़ाइल के साथ लॉगिन

```bash
npx intlayer login --env-file .env.production
```

### विस्तृत मोड में लॉगिन

```bash
npx intlayer login --verbose
```

## समस्या निवारण

### ब्राउज़र नहीं खुलता

यदि ब्राउज़र स्वचालित रूप से नहीं खुलता है, तो टर्मिनल में दिखाई गई URL को कॉपी कर अपने ब्राउज़र में मैन्युअली खोलें।

### कनेक्शन समस्याएँ

यदि आप कनेक्शन समस्याओं का सामना कर रहे हैं, तो जांचें:

1. कि CMS URL सही है
2. कि आपका इंटरनेट कनेक्शन सही ढंग से काम कर रहा है
3. कि कोई फ़ायरवॉल कनेक्शन को ब्लॉक नहीं कर रहा है

### क्रेडेंशियल प्राप्त नहीं हुए

यदि क्रेडेंशियल प्राप्त नहीं हुए:

1. सुनिश्चित करें कि आपने ब्राउज़र में प्रमाणीकरण प्रक्रिया पूरा की है
2. सत्यापित करें कि लोकल पोर्ट अवरुद्ध नहीं है
3. कमांड को पुनः चलाएँ

## अगले कदम

लॉगिन पूरा करने के बाद:

1. क्रेडेंशियल को अपनी `.env` फ़ाइल में जोड़ें
2. क्रेडेंशियल के साथ अपनी `intlayer.config.*` फ़ाइल कॉन्फ़िगर करें
3. डिक्शनरी प्रबंधित करने के लिए CLI कमांड का उपयोग करें:
   - [`npx intlayer push`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/push.md) - डिक्शनरी को CMS में पुश करें
   - [`npx intlayer pull`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/pull.md) - CMS से डिक्शनरी खींचें
   - [`npx intlayer fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/fill.md) - लापता अनुवाद भरें

## इन्हें भी देखें

- [CLI दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md)
- [Intlayer कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md)

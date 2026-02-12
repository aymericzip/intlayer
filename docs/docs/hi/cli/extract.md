---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: स्ट्रिंग्स निकालना
description: अपने कंपोनेंट्स से स्ट्रिंग्स को निकालीए और उन्हें कंपोनेंट के पास .content फ़ाइल में रखें।
keywords:
  - निकासी
  - कंपोनेंट्स
  - माइग्रेशन
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - extract
---

# स्ट्रिंग्स निकालना

```bash
npx intlayer extract
```

यह कमांड आपके कोड फ़ाइलों का विश्लेषण करता है ताकि कंपोनेंट्स से स्ट्रिंग्स को निकाला जा सके और उन्हें कंपोनेंट के पास .content फ़ाइल में रखा जा सके। यह इंटरैक्टिव फ़ाइल चयन या विशिष्ट फाइल लक्षित करने का समर्थन करता है।

## उपनाम:

- `npx intlayer ext`

## तर्क:

**फ़ाइल चयन विकल्प:**

/// **`-f, --file [files...]`**: निकालने के लिए विशिष्ट फ़ाइलों की सूची। यदि प्रदान नहीं किया गया, तो CLI मिलान करने वाली फ़ाइलों के लिए स्कैन करेगा (`**/*.{tsx,jsx,vue,svelte,ts,js}`) और आपको चुनने के लिए संकेत देगा कि किन्हें निकालना है।

> उदाहरण: `npx intlayer extract -f src/components/MyComponent.tsx`

**आउटपुट विकल्प:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: उत्पन्न सामग्री घोषणा फ़ाइलों को सहेजने के लिए निर्देशिका।

  > उदाहरण: `npx intlayer extract -o src/content`

- **`--code-only`**: केवल घटक कोड निकालें (सामग्री घोषणा न लिखें)।

  > उदाहरण: `npx intlayer extract --code-only`

- **`--declaration-only`**: केवल सामग्री घोषणा उत्पन्न करें (घटक को फिर से न लिखें)।

  > उदाहरण: `npx intlayer extract --declaration-only`

**कॉन्फ़िगरेशन विकल्प:**

- **`--base-dir`**: परियोजना के लिए बेस निर्देशिका निर्दिष्ट करें।
- **`--env`**: environment निर्दिष्ट करें।
- **`--env-file`**: कस्टम environment फ़ाइल प्रदान करें।
- **`--verbose`**: verbose लॉगिंग सक्षम करें।

**आवश्यक प्लगइन्स:**

extract कमांड TypeScript / JSX फ़ाइलों पर अतिरिक्त प्लगइन के बिना काम करता है। हालांकि, Vue और Svelte प्रोजेक्ट्स के लिए निम्नलिखित प्लगइन्स इंस्टॉल करने आवश्यक हैं:

- **`@intlayer/vue-transformer`**: Vue फ़ाइलों के लिए।
- **`@intlayer/svelte-transformer`**: Svelte फ़ाइलों के लिए।

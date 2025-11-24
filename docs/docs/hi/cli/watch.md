---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: डिक्शनरी देखें
description: जानें कि अपनी कंटेंट घोषणा फ़ाइलों में परिवर्तनों को कैसे देखें और स्वचालित रूप से डिक्शनरी बनाएं।
keywords:
  - देखें
  - डिक्शनरी
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - watch
---

# डिक्शनरी देखें

```bash
npx intlayer watch
```

यह कमांड आपकी कंटेंट घोषणा फ़ाइलों में परिवर्तनों को देखेगा और `.intlayer` निर्देशिका में डिक्शनरी बनाएगा।
यह कमांड `npx intlayer build --watch --skip-prepare` के समान है।

## उपनाम:

- `npx intlayer dictionaries watch`
- `npx intlayer dictionary watch`
- `npx intlayer dic watch`

## तर्क:

- **`--with`**: watch के साथ समानांतर में कमांड शुरू करें।

> उदाहरण: `npx intlayer watch --with "next dev --turbopack"`

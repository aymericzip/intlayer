---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: MarkdownRenderer कॉम्पोनेंट डॉक्यूमेंटेशन | react-intlayer
description: देखें कि react-intlayer पैकेज के लिए MarkdownRenderer component का उपयोग कैसे करें
keywords:
  - MarkdownRenderer
  - react
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - डॉक्यूमेंटेशन
slugs:
  - doc
  - packages
  - react-intlayer
  - MarkdownRenderer
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Init doc
---

# MarkdownRenderer कॉम्पोनेंट डॉक्यूमेंटेशन

`MarkdownRenderer` कॉम्पोनेंट कस्टम components के साथ markdown सामग्री को रेंडर करता है।

## उपयोग

```tsx
import { MarkdownRenderer } from "react-intlayer";

const MyComponent = () => (
  <MarkdownRenderer># My Title My content</MarkdownRenderer>
);
```

## प्रॉप्स

| प्रॉपर्टी    | प्रकार            | विवरण                                                                       |
| ------------ | ----------------- | --------------------------------------------------------------------------- |
| `children`   | `string`          | रेंडर करने के लिए Markdown सामग्री।                                         |
| `components` | `Overrides`       | विशिष्ट Markdown तत्वों के लिए उपयोग किए जाने वाले कस्टम components का मैप। |
| `options`    | `MarkdownOptions` | Markdown renderer के लिए अतिरिक्त विकल्प।                                   |

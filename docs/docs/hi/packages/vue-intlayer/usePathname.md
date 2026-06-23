---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Function Documentation | vue-intlayer
description: vue-intlayer पैकेज के लिए usePathname फ़ंक्शन का उपयोग करना सीखें
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalization
  - Documentation
  - Vue
  - JavaScript
slugs:
  - doc
  - packages
  - vue-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "usePathname उपयोगिता जोड़ें"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Init history"
author: aymericzip
---

# Vue Integration: `usePathname` Documentation

`usePathname` फ़ंक्शन वर्तमान ब्राउज़र पथनाम (pathname) को locale खंड हटाकर Vue `ComputedRef<string>` के रूप में लौटाता है। यह locale-जागरूक नेविगेशन बनाने के लिए उपयोगी है — उदाहरण के लिए, यह निर्धारित करना कि कौन सा नेव आइटम सक्रिय है — बिना locale उपसर्ग को मैन्युअल रूप से हटाए।

## Vue में `usePathname` आयात (Import) करना

```typescript
import { usePathname } from "vue-intlayer";
```

## अवलोकन (Overview)

`usePathname` एक Vue कंप्यूटेड रेफ (computed ref) बनाता है जो `window.location.pathname` को पढ़ता है, `getPathWithoutLocale` के माध्यम से locale उपसर्ग हटाता है, और जब भी ब्राउज़र `popstate` इवेंट (बैक/फ़ॉरवर्ड नेविगेशन) फायर करता है, तो अपने मान को अपडेट करता है। इस मान को सीधे आपके Vue टेम्प्लेट (templates) या सेटअप फ़ंक्शंस (setup functions) में उपयोग किया जा सकता है।

## उपयोग (Usage)

```vue fileName="src/components/NavItem.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const props = defineProps<{
  href: string;
  label: string;
}>();

const pathname = usePathname();
</script>

<template>
  <a :href="href" :aria-current="pathname === href ? 'page' : undefined">
    {{ label }}
  </a>
</template>
```

## रिटर्न वैल्यू (Return Value)

| प्रकार                | विवरण                                                                                     |
| --------------------- | ----------------------------------------------------------------------------------------- |
| `ComputedRef<string>` | Vue Computed Ref जिसमें locale उपसर्ग के बिना वर्तमान ब्राउज़र पथनाम (pathname) शामिल है। |

## व्यवहार (Behavior)

- **Locale stripping**: शुरुआत के locale खंड को हटाता है (उदा. `/hi/dashboard` → `/dashboard`)।
- **Reactive**: हर `popstate` इवेंट (ब्राउज़र बैक / फॉरवर्ड नेविगेशन) पर मान को अपडेट करता है।
- **SSR-safe**: `window` उपलब्ध न होने पर `""` लौटाता है।
- **Cleanup**: `popstate` श्रोता (listener) इनिशियलाइज़ेशन पर विश्व स्तर पर (globally) जोड़ा जाता है और Vue द्वारा जीवनचक्र (lifecycle) को प्रबंधित करने के तरीके के कारण आमतौर पर प्रति-घटक (per-component) मैन्युअल क्लीनअप की आवश्यकता नहीं होती है।

## उदाहरण (Example)

```vue fileName="src/components/Sidebar.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const links = [
  { href: "/dashboard", label: "डैशबोर्ड" },
  { href: "/settings", label: "सेटिंग्स" },
];

const pathname = usePathname();
</script>

<template>
  <nav>
    <a
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      :style="{ fontWeight: pathname === link.href ? 'bold' : 'normal' }"
    >
      {{ link.label }}
    </a>
  </nav>
</template>
```

## संबंधित (Related)

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vue-intlayer/useLocale.md) — वर्तमान locale + locale स्विचर
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getPathWithoutLocale.md) — इस हुक द्वारा उपयोग की जाने वाली अंतर्निहित उपयोगिता

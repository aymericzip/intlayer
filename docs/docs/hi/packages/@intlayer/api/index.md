# @intlayer/api: Intlayer API के साथ इंटरैक्ट करने के लिए NPM पैकेज

**Intlayer** विशेष रूप से जावास्क्रिप्ट डेवलपर्स के लिए डिज़ाइन किए गए पैकेजों का एक सूट है। यह React, React और Express.js जैसे फ्रेमवर्क्स के साथ संगत है।

**`@intlayer/api`** पैकेज Intlayer API के साथ इंटरैक्ट करने के लिए एक SDK (सॉफ़्टवेयर डेवलपमेंट किट) है। यह सामग्री घोषणा का ऑडिट करने, संगठनों, परियोजनाओं और उपयोगकर्ताओं के साथ इंटरैक्ट करने आदि के लिए फ़ंक्शंस का एक सेट प्रदान करता है।

## उपयोग

```ts
import { intlayerAPI } from "@intlayer/api";

intlayerAPI.user.getUser({
  ids: ["user-id-1", "user-id-2"],
});
```

## स्थापना

अपना पसंदीदा पैकेज प्रबंधक का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

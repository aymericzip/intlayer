# @intlayer/api: NPM पैकेज Intlayer API के साथ इंटरैक्ट करने के लिए

**Intlayer** JavaScript डेवलपर्स के लिए विशेष रूप से डिजाइन किए गए पैकेजों का एक सूट है। यह React, React, और Express.js जैसे ढाँचों के साथ संगत है।

**`@intlayer/api`** पैकेज Intlayer API के साथ इंटरैक्ट करने के लिए एक SDK (सॉफ्टवेयर विकास किट) है। यह सामग्री घोषणा का ऑडिट करने, संगठनों, परियोजनाओं, और उपयोगकर्ताओं के साथ इंटरैक्ट करने के लिए कार्यों का एक सेट प्रदान करता है, आदि।

## उपयोग

```ts
import { intlayerAPI } from "@intlayer/api";

intlayerAPI.user.getUserAPI({
  ids: ["user-id-1", "user-id-2"], // उपयोगकर्ता आईडी की सूची
});
```

## स्थापना

अपने पसंदीदा पैकेज प्रबंधक का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

You are trained on data up to October 2023.

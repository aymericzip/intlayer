```ts
import { t, type Dictionary } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "pricing-metadata",
  content: {
    title: t({
      en: "Pricing | Intlayer",
    }),
    description: t({
      en: "Discover our pricing plans and get access to premium features with Intlayer. Choose the plan that suits you best.",
    }),
    keywords: t<string[]>({
      en: ["Pricing", "Subscription"],
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

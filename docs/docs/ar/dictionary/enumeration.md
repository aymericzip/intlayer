---
createdAt: 2024-08-11
updatedAt: 2026-10-08
priority: 8
title: "التعداد: رسائل حسب الكمية"
description: "استخدم تعدادات Intlayer لعرض محتوى مختلف حسب رقم أو نطاق، مع العقدة enu() وشروط مثل '<-1' أو '>5'."
keywords:
  - التعداد
  - التدويل
  - التوثيق
  - Intlayer
  - Next.js
  - جافا سكريبت
  - React
slugs:
  - doc
  - concept
  - content
  - enumeration
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "بداية التاريخ"
author: aymericzip
---

# التعداد / الجمع

## كيف يعمل التعداد

في Intlayer، يتم تحقيق التعداد من خلال دالة `enu`، التي تربط مفاتيح محددة بالمحتوى المقابل لها. يمكن أن تمثل هذه المفاتيح قيمًا رقمية، أو نطاقات، أو معرفات مخصصة. عند استخدامها مع React Intlayer أو Next Intlayer، يتم اختيار المحتوى المناسب تلقائيًا بناءً على لغة التطبيق والقواعد المعرفة.

## إعداد التعداد

لإعداد التعداد في مشروع Intlayer الخاص بك، تحتاج إلى إنشاء وحدة محتوى تتضمن تعريفات التعداد. فيما يلي مثال على تعداد بسيط لعدد السيارات:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "أقل من ناقص سيارة واحدة",
      "-1": "ناقص سيارة واحدة",
      "0": "لا سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "العديد من السيارات",
      "fallback": "قيمة بديلة", // اختياري
    }),
  },
} satisfies Dictionary;

export default carEnumeration;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "car_count",
  "content": {
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "أقل من ناقص سيارة واحدة",
        "-1": "ناقص سيارة واحدة",
        "0": "لا سيارات",
        "1": "سيارة واحدة",
        ">5": "بعض السيارات",
        ">19": "العديد من السيارات",
        "fallback": "قيمة بديلة" // اختياري
      }
    }
  }
}
```

في هذا المثال، تقوم الدالة `enu` بربط شروط مختلفة بمحتوى محدد. عند استخدامها في مكون React، يمكن لـ Intlayer اختيار المحتوى المناسب تلقائيًا بناءً على المتغير المعطى.

> ترتيب التصريحات مهم في تعداد Intlayer. أول تصريح صالح هو الذي سيتم اختياره. إذا كانت هناك شروط متعددة تنطبق، تأكد من ترتيبها بشكل صحيح لتجنب سلوك غير متوقع.

> إذا لم يتم إعلان قيمة بديلة (fallback)، ستُعيد الدالة `undefined` إذا لم تتطابق أي من المفاتيح.

## استخدام التعداد مع React Intlayer

<Tabs group="framework">
  <Tab label="React" value="react">

لاستخدام التعداد في مكون React، يمكنك الاستفادة من خطاف `useIntlayer` من حزمة `react-intlayer`. يسترجع هذا الخطاف المحتوى المناسب بناءً على المعرف المحدد. فيما يلي مثال على كيفية استخدامه:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Output: No cars
        }
      </p>
      <p>
        {
          numberOfCar(6) // Output: Some cars
        }
      </p>
      <p>
        {
          numberOfCar(20) // Output: Many cars
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Output: Fallback value
        }
      </p>
    </div>
  );
};
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

لاستخدام التعداد في مكونات عميل Next.js، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>{numberOfCar(6)}</p>
    </div>
  );
};

export default CarComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

لاستخدام التعداد في مكونات Vue، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { numberOfCar } = useIntlayer("car_count");
</script>

<template>
  <div>
    <p>{{ numberOfCar(6) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

لاستخدام التعداد في مكونات Svelte، استرجعه عبر خطاف `useIntlayer`. يتم الوصول إلى المخزن باستخدام `---
createdAt: 2024-08-11
updatedAt: 2025-06-29
priority: 8
title: "التعداد: رسائل حسب الكمية"
description: "استخدم تعدادات Intlayer لعرض محتوى مختلف حسب رقم أو نطاق، مع العقدة enu() وشروط مثل '<-1' أو '>5'."
keywords:

- التعداد
- التدويل
- التوثيق
- Intlayer
- Next.js
- جافا سكريبت
- React
  slugs:
- doc
- concept
- content
- enumeration
  history:
- version: 5.5.10
  date: 2025-06-29
  changes: "بداية التاريخ"
  author: aymericzip

---

# التعداد / الجمع

## كيف يعمل التعداد

في Intlayer، يتم تحقيق التعداد من خلال دالة `enu`، التي تربط مفاتيح محددة بالمحتوى المقابل لها. يمكن أن تمثل هذه المفاتيح قيمًا رقمية، أو نطاقات، أو معرفات مخصصة. عند استخدامها مع React Intlayer أو Next Intlayer، يتم اختيار المحتوى المناسب تلقائيًا بناءً على لغة التطبيق والقواعد المعرفة.

## إعداد التعداد

لإعداد التعداد في مشروع Intlayer الخاص بك، تحتاج إلى إنشاء وحدة محتوى تتضمن تعريفات التعداد. فيما يلي مثال على تعداد بسيط لعدد السيارات:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "أقل من ناقص سيارة واحدة",
      "-1": "ناقص سيارة واحدة",
      "0": "لا سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "العديد من السيارات",
      "fallback": "قيمة بديلة", // اختياري
    }),
  },
} satisfies Dictionary;

export default carEnumeration;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "car_count",
  "content": {
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "أقل من ناقص سيارة واحدة",
        "-1": "ناقص سيارة واحدة",
        "0": "لا سيارات",
        "1": "سيارة واحدة",
        ">5": "بعض السيارات",
        ">19": "العديد من السيارات",
        "fallback": "قيمة بديلة" // اختياري
      }
    }
  }
}
```

في هذا المثال، تقوم الدالة `enu` بربط شروط مختلفة بمحتوى محدد. عند استخدامها في مكون React، يمكن لـ Intlayer اختيار المحتوى المناسب تلقائيًا بناءً على المتغير المعطى.

> ترتيب التصريحات مهم في تعداد Intlayer. أول تصريح صالح هو الذي سيتم اختياره. إذا كانت هناك شروط متعددة تنطبق، تأكد من ترتيبها بشكل صحيح لتجنب سلوك غير متوقع.

> إذا لم يتم إعلان قيمة بديلة (fallback)، ستُعيد الدالة `undefined` إذا لم تتطابق أي من المفاتيح.

## استخدام التعداد مع React Intlayer

<Tabs group="framework">
  <Tab label="React" value="react">

لاستخدام التعداد في مكون React، يمكنك الاستفادة من خطاف `useIntlayer` من حزمة `react-intlayer`. يسترجع هذا الخطاف المحتوى المناسب بناءً على المعرف المحدد. فيما يلي مثال على كيفية استخدامه:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Output: No cars
        }
      </p>
      <p>
        {
          numberOfCar(6) // Output: Some cars
        }
      </p>
      <p>
        {
          numberOfCar(20) // Output: Many cars
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Output: Fallback value
        }
      </p>
    </div>
  );
};
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

لاستخدام التعداد في مكونات عميل Next.js، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>{numberOfCar(6)}</p>
    </div>
  );
};

export default CarComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

لاستخدام التعداد في مكونات Vue، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { numberOfCar } = useIntlayer("car_count");
</script>

<template>
  <div>
    <p>{{ numberOfCar(6) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

. فيما يلي مثال:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("car_count");
</script>

<div>
  <p>{$content.numberOfCar(6)}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

لاستخدام التعداد في مكونات Preact، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>{numberOfCar(6)}</p>
    </div>
  );
};

export default CarComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

لاستخدام التعداد في مكونات SolidJS، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const CarComponent: Component = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>{numberOfCar(6)}</p>
    </div>
  );
};

export default CarComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

لاستخدام التعداد في مكونات Angular، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-car",
  template: `
    <div>
      <p>{{ content().numberOfCar(6) }}</p>
    </div>
  `,
})
export class CarComponent {
  content = useIntlayer("car_count");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

لاستخدام التعداد مع `vanilla-intlayer`، استرجعه عبر خطاف `useIntlayer`. فيما يلي مثال:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("car_count").onChange((newContent) => {
  document.getElementById("cars")!.textContent = newContent.numberOfCar(6);
});

// Initial render
document.getElementById("cars")!.textContent = content.numberOfCar(6);
```

  </Tab>
</Tabs>

## موارد إضافية

لمزيد من المعلومات التفصيلية حول التكوين والاستخدام، يرجى الرجوع إلى الموارد التالية:

- [توثيق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md)
- [توثيق React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md)
- [توثيق Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_15.md)

توفر هذه الموارد رؤى إضافية حول إعداد واستخدام Intlayer في بيئات مختلفة ومع أُطُر عمل متنوعة.

### استخدام التعداد الترتيبي (Ordinal Enumeration)

<Tabs group="framework">
  <Tab label="React" value="react">

لاستخدام هذا في مكون React، استدعِ التعداد مع الرقم الأخير من العدد للحصول على اللاحقة الصحيحة، ثم مرر العدد الكامل كقيمة إدراج:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const RankingComponent: FC<{ count: number }> = ({ count }) => {
  const { ordinal } = useIntlayer("ranking_component");

  // Get the last digit to determine the correct suffix
  const lastDigit = Math.abs(count) % 10;

  return (
    <div>
      <p>
        {
          ordinal(lastDigit)({ count }) // e.g., "5th place" for count=5
        }
      </p>
    </div>
  );
};
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

لاستخدام هذا في مكونات عميل Next.js، استدعِ التعداد مع الرقم الأخير من العدد للحصول على اللاحقة الصحيحة، ثم مرر العدد الكامل كقيمة إدراج:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const RankingComponent: FC<{ count: number }> = ({ count }) => {
  const { ordinal } = useIntlayer("ranking_component");
  const lastDigit = Math.abs(count) % 10;

  return (
    <div>
      <p>{ordinal(lastDigit)({ count })}</p>
    </div>
  );
};

export default RankingComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

لاستخدام هذا في مكونات Vue، استدعِ التعداد مع الرقم الأخير من العدد للحصول على اللاحقة الصحيحة، ثم مرر العدد الكامل كقيمة إدراج:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

defineProps<{ count: number }>();

const { ordinal } = useIntlayer("ranking_component");
</script>

<template>
  <div>
    <p>{{ ordinal(Math.abs(count) % 10)({ count }) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

لاستخدام هذا في مكونات Svelte، استدعِ التعداد مع الرقم الأخير من العدد للحصول على اللاحقة الصحيحة، ثم مرر العدد الكامل كقيمة إدراج:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

export let count: number;

const content = useIntlayer("ranking_component");
$: lastDigit = Math.abs(count) % 10;
</script>

<div>
  <p>{$content.ordinal(lastDigit)({ count })}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

لاستخدام هذا في مكونات Preact، استدعِ التعداد مع الرقم الأخير من العدد للحصول على اللاحقة الصحيحة، ثم مرر العدد الكامل كقيمة إدراج:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const RankingComponent: FC<{ count: number }> = ({ count }) => {
  const { ordinal } = useIntlayer("ranking_component");
  const lastDigit = Math.abs(count) % 10;

  return (
    <div>
      <p>{ordinal(lastDigit)({ count })}</p>
    </div>
  );
};

export default RankingComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

لاستخدام هذا في مكونات SolidJS، استدعِ التعداد مع الرقم الأخير من العدد للحصول على اللاحقة الصحيحة، ثم مرر العدد الكامل كقيمة إدراج:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const RankingComponent: Component<{ count: number }> = (props) => {
  const { ordinal } = useIntlayer("ranking_component");

  return (
    <div>
      <p>{ordinal(Math.abs(props.count) % 10)({ count: props.count })}</p>
    </div>
  );
};

export default RankingComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

لاستخدام هذا في مكونات Angular، استدعِ التعداد مع الرقم الأخير من العدد للحصول على اللاحقة الصحيحة، ثم مرر العدد الكامل كقيمة إدراج:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component, Input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-ranking",
  template: `
    <div>
      <p>{{ content().ordinal(lastDigit())({ count }) }}</p>
    </div>
  `,
})
export class RankingComponent {
  @Input() count!: number;

  content = useIntlayer("ranking_component");

  lastDigit() {
    return Math.abs(this.count) % 10;
  }
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

لاستخدام هذا مع `vanilla-intlayer`، استدعِ التعداد مع الرقم الأخير من العدد للحصول على اللاحقة الصحيحة، ثم مرر العدد الكامل كقيمة إدراج:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("ranking_component");
const lastDigit = Math.abs(5) % 10;

document.getElementById("ranking")!.textContent = content.ordinal(lastDigit)({
  count: 5,
});
```

  </Tab>
</Tabs>

## Additional Resources

لمزيد من المعلومات التفصيلية حول التكوين والاستخدام، يرجى الرجوع إلى الموارد التالية:

- [توثيق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md)
- [توثيق React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md)
- [توثيق Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_15.md)

توفر هذه الموارد رؤى إضافية حول إعداد واستخدام Intlayer في بيئات مختلفة ومع أطر عمل متنوعة.

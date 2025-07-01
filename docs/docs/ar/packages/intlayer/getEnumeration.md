---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق دالة getEnumeration | intlayer
description: تعرف على كيفية استخدام دالة getEnumeration لحزمة intlayer
keywords:
  - getEnumeration
  - ترجمة
  - Intlayer
  - intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافا سكريبت
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getEnumeration
---

# التوثيق: دالة `getEnumeration` في `intlayer`

## الوصف

تسترجع دالة `getEnumeration` المحتوى المقابل لكمية محددة بناءً على شروط معرفة مسبقًا في كائن التعداد. تُعرف الشروط كمفاتيح، ويتم تحديد أولويتها حسب ترتيبها في الكائن.

## المعاملات

- `enumerationContent: QuantityContent<Content>`

  - **الوصف**: كائن حيث تمثل المفاتيح الشروط (مثل `<=`، `<`، `>=`، `=`) وتمثل القيم المحتوى المقابل. يحدد ترتيب المفاتيح أولوية المطابقة.
  - **النوع**: `QuantityContent<Content>`
    - يمكن أن يكون `Content` من أي نوع.

- `quantity: number`

  - **الوصف**: القيمة الرقمية المستخدمة للمطابقة مع الشروط في `enumerationContent`.
  - **النوع**: `number`

## القيم المرجعة

- **النوع**: `Content`
- **الوصف**: المحتوى المقابل لأول شرط يطابق في `enumerationContent`. إذا لم يتم العثور على تطابق، يتم التعامل مع الحالة بناءً على التنفيذ (مثل الخطأ أو محتوى بديل).

## مثال على الاستخدام

### الاستخدام الأساسي

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<=-2.3": "لديك أقل من -2.3",
    "<1": "لديك أقل من واحد",
    "2": "لديك اثنان",
    ">=3": "لديك ثلاثة أو أكثر",
  },
  2
);

console.log(content); // الناتج: "لديك اثنان"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<1": "لديك أقل من واحد",
    "2": "لديك اثنان",
    ">=3": "لديك ثلاثة أو أكثر",
  },
  2
);

console.log(content); // الناتج: "لديك اثنان"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<1": "لديك أقل من واحد",
    "2": "لديك اثنان",
    ">=3": "لديك ثلاثة أو أكثر",
  },
  2
);

console.log(content); // الناتج: "لديك اثنان"
```

### أولوية الشروط

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "لديك أقل من أربعة",
    "2": "لديك اثنان",
  },
  2
);

console.log(content); // الناتج: "لديك أقل من أربعة"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "لديك أقل من أربعة",
    "2": "لديك اثنان",
  },
  2
);

console.log(content); // الناتج: "لديك أقل من أربعة"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<4": "لديك أقل من أربعة",
    "2": "لديك اثنان",
  },
  2
);

console.log(content); // الناتج: "لديك أقل من أربعة"
```

## الحالات الخاصة

- **عدم وجود شرط مطابق:**

  - إذا لم يتطابق أي شرط مع الكمية المقدمة، فإن الدالة ستُرجع إما `undefined` أو تتعامل مع السيناريو الافتراضي/الاحتياطي بشكل صريح.

- **الشروط الغامضة:**

  - إذا تداخلت الشروط، فإن أول شرط مطابق (بناءً على ترتيب الكائن) يأخذ الأولوية.

- **المفاتيح غير الصالحة:**

  - تفترض الدالة أن جميع المفاتيح في `enumerationContent` صالحة وقابلة للتحليل كالشروط. قد تؤدي المفاتيح غير الصالحة أو ذات التنسيق غير الصحيح إلى سلوك غير متوقع.

- **تطبيق TypeScript:**
  - تضمن الدالة أن نوع `Content` متسق عبر جميع المفاتيح، مما يسمح بسلامة النوع في المحتوى المسترجع.

## ملاحظات

- تُستخدم أداة `findMatchingCondition` لتحديد الشرط المناسب بناءً على الكمية المعطاة.

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية التاريخ

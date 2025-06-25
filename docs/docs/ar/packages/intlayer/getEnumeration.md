---
docName: package__intlayer__getEnumeration
url: https://intlayer.org/doc/packages/intlayer/getEnumeration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getEnumeration.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: وثائق دالة getEnumeration | intlayer
description: انظر كيف تستخدم دالة getEnumeration لحزمة intlayer
keywords:
  - getEnumeration
  - ترجمة
  - Intlayer
  - intlayer
  - الدولية
  - المستندات
  - Next.js
  - JavaScript
  - React
---

# التوثيق: وظيفة `getEnumeration` في `intlayer`

## الوصف

تقوم وظيفة `getEnumeration` باسترجاع المحتوى الذي يتوافق مع كمية معينة بناءً على شروط محددة مسبقًا في كائن التعداد. يتم تعريف الشروط كمفاتيح، ويتم تحديد أولويتها بناءً على ترتيبها في الكائن.

## المعاملات

- `enumerationContent: QuantityContent<Content>`

  - **الوصف**: كائن حيث تمثل المفاتيح الشروط (مثل `<=`, `<`, `>=`, `=`) وتمثل القيم المحتوى المقابل. يحدد ترتيب المفاتيح أولوية المطابقة.
  - **النوع**: `QuantityContent<Content>`
    - يمكن أن يكون `Content` أي نوع.

- `quantity: number`

  - **الوصف**: القيمة العددية المستخدمة للمطابقة مع الشروط في `enumerationContent`.
  - **النوع**: `number`

## الإرجاع

- **النوع**: `Content`
- **الوصف**: المحتوى الذي يتوافق مع أول شرط مطابق في `enumerationContent`. إذا لم يتم العثور على تطابق، فإنه يتم التعامل مع ذلك بناءً على التنفيذ (مثل الخطأ أو محتوى افتراضي).

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

  - إذا لم يتطابق أي شرط مع الكمية المقدمة، فإن الوظيفة ستعيد إما `undefined` أو تتعامل مع السيناريو الافتراضي بشكل صريح.

- **الشروط الغامضة:**

  - إذا كانت الشروط متداخلة، فإن أول شرط مطابق (بناءً على ترتيب الكائن) له الأولوية.

- **المفاتيح غير الصالحة:**

  - تفترض الوظيفة أن جميع المفاتيح في `enumerationContent` صالحة وقابلة للتحليل كشرط. قد تؤدي المفاتيح غير الصالحة أو ذات التنسيق غير الصحيح إلى سلوك غير متوقع.

- **التطبيق في TypeScript:**
  - تضمن الوظيفة أن نوع `Content` متسق عبر جميع المفاتيح، مما يسمح بالأمان النوعي في المحتوى المسترجع.

## ملاحظات

- يتم استخدام أداة `findMatchingCondition` لتحديد الشرط المناسب بناءً على الكمية المعطاة.

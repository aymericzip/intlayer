# الوثيقة: دالة `getEnumeration` في `intlayer`

## الوصف:

تسترجع دالة `getEnumeration` المحتوى المقابل لعدد محدد بناءً على شروط محددة مسبقًا في كائن التعداد. يتم تعريف الشروط كمفاتيح، وتحدد أولويتها من خلال ترتيبها في الكائن.

## المعاملات:

- `enumerationContent: QuantityContent<Content>`

  - **الوصف**: كائن حيث تمثل المفاتيح الشروط (مثل `<=`, `<`, `>=`, `=`) والقيم تمثل المحتوى المقابل. يحدد ترتيب المفاتيح أولويات المطابقة.
  - **النوع**: `QuantityContent<Content>`
    - `Content` يمكن أن يكون من أي نوع.

- `quantity: number`

  - **الوصف**: القيمة الرقمية المستخدمة لمطابقتها مع الشروط في `enumerationContent`.
  - **النوع**: `number`

## الإرجاع:

- **النوع**: `Content`
- **الوصف**: المحتوى المقابل لأولى شروط المطابقة في `enumerationContent`. إذا لم يتم العثور على مطابقة، فإنه يتطابق مع ما يعتمد على التنفيذ (مثل، خطأ أو محتوى احتياطي).

## مثال على الاستخدام:

### الاستخدام الأساسي:

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

console.log(content); // الإخراج: "لديك اثنان"
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

console.log(content); // الإخراج: "لديك اثنان"
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

console.log(content); // الإخراج: "لديك اثنان"
```

### أولوية الشروط:

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "لديك أقل من أربعة",
    "2": "لديك اثنان",
  },
  2
);

console.log(content); // الإخراج: "لديك أقل من أربعة"
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

console.log(content); // الإخراج: "لديك أقل من أربعة"
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

console.log(content); // الإخراج: "لديك أقل من أربعة"
```

## الحالات الحادة:

- **لا توجد شروط مطابقة:**

  - إذا لم تتطابق أي شرط مع العدد المقدم، ستقوم الدالة إما بإرجاع `undefined` أو التعامل مع السيناريو الافتراضي/الاحتياطي بشكل صريح.

- **شروط غامضة:**

  - إذا تداخلت الشروط، فإن أول شرط مطابق (استنادًا إلى ترتيب الكائن) يأخذ الأولوية.

- **مفاتيح غير صالحة:**

  - تفترض الدالة أن جميع المفاتيح في `enumerationContent` صالحة وقابلة للتحليل كشرط. قد تؤدي المفاتيح غير الصالحة أو المهيكلة بشكل غير صحيح إلى سلوك غير متوقع.

- **تنفيذ TypeScript:**
  - تضمن الدالة أن يكون نوع `Content` متسقًا عبر جميع المفاتيح، مما يسمح بالأمان من النوع في المحتوى المسترجع.

## ملاحظات:

- تُستخدم وحدة `findMatchingCondition` لتحديد الشرط المناسب بناءً على العدد المعطى.

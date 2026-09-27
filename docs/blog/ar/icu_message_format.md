---
createdAt: 2026-09-02
updatedAt: 2026-09-26
priority: 8
title: "صيغة رسائل ICU: بناء الجملة، صيغ الجمع وSelect"
description: مرجع عملي لصيغة ICU MessageFormat، تضمين المعاملات، تفرعات الجمع وselect، فئات الجمع في CLDR لكل لغة، والأخطاء الشائعة.
keywords:
  - صيغة رسائل icu
  - icu messageformat
  - قواعد الجمع cldr
  - فئات الجمع
  - selectordinal
  - جمع i18n
  - بناء جمل الرسائل
slugs:
  - blog
  - icu-message-format
author: aymericzip
---

# صيغة رسائل ICU: القواعد والتفاصيل التي يخطئ فيها الكثيرون

تُعد ICU MessageFormat صيغة نصوص تتيح للترجمة أن تحتوي على منطق التفرع الخاص بها: صيغ الجمع، الأشكال المعتمدة على الجنس، وتنسيق الأرقام والتواريخ. تعتمد فكرتها الأساسية على أن القواعد النحوية مسؤولية المترجم وليست مسؤولية المطور الذي يكتب `if (count === 1)`. يستعرض هذا المقال بناء الجملة، والخصائص المعتمدة على اللغة التي تفشل فيها التطبيقات البسيطة، وكيف يتعامل نظام JavaScript البيئي مع هذه التحديات.

## جدول المحتويات

<TOC/>

## المشكلة بشكل عملي

إليك الكود الذي يبدأ بكتابته معظم المطورين:

```ts
const label = count + " " + (count === 1 ? t("item") : t("items"));
```

يعمل هذا الأسلوب باللغة الإنجليزية ولكنه يفشل في بقية اللغات الأخرى تقريبًا:

- **الروسية والبولندية** تتطلبان ثلاث أو أربع صيغ، وليس اثنتين.
- **اليابانية** تحتاج صيغة واحدة فقط، والمسافة التي تمت إضافتها بالدمج غير صحيحة.
- **العربية** تتطلب ست صيغ جمع، كما يجب عرض الرقم نفسه وفقًا لنظام الأرقام المعتمد في اللغة.
- **الفرنسية** تضع مسافة غير قابلة للكسر قبل بعض علامات الترقيم، وهو ما يدمره الدمج عبر `+ " "`.

المشكلة الأعمق تكمن في تقطيع الجملة إلى أجزاء منفصلة. يرى المترجم الكلمتين `item` و`items` دون أي سياق ودون القدرة على إعادة ترتيب كلمات الجملة. تعالج ICU MessageFormat هذه المسألة بالحفاظ على الجملة كاملة داخل نص واحد قابل للترجمة مع منح المترجم أدوات التفرع الشرطي.

## المعاملات البسيطة

أصغر وحدة هي العنصر النائب المحاط بأقواس معقوفة مفردة:

```text
Hello, {name}!
```

عند التنسيق، تمرر `{ name: "Alice" }` لتحصل على `Hello, Alice!`. الأقواس المعقوفة هي الرموز الخاصة الوحيدة، ولطباعة قوس معقوف حرفيًا يتم تغليفه بعلامات اقتباس مفردة: `'{'`.

هذه هي ميزة التضمين (الاستيفاء) بالكامل، وكل شيء آخر في ICU مبني عليها.

## صيغ الجمع (plural)

يقوم `plural` باختيار الفرع المناسب بناءً على قيمة رقمية:

```text
{count, plural,
  one {You have one unread message}
  other {You have # unread messages}
}
```

ثلاث قواعد أساسية يجب معرفتها:

- **يتم استبدال الرمز `#`** بالقيمة المنسقة لـ `count` طبقًا للغة المحلية. على سبيل المثال، يتحول `1234` إلى `1,234` في `en-US`.
- **الفرع `other` إلزامي.** ستتوقف أي مكتبة ICU أو تفشل في التحقق عند غيابه، حيث يعمل كخيار احتياطي عند عدم تطابق أي فئة.
- **القواعد `=0` و`=1` تطابق قيمًا دقيقة** وتتم معالجتها _قبل_ فئات CLDR. استخدمها للنصوص ذات الحالات الخاصة (مثل "لا توجد رسائل")، وليس كبديل عن `one`.

```text
{count, plural,
  =0 {No unread messages}
  one {One unread message}
  other {# unread messages}
}
```

### الإزاحة (offset)

تقوم `offset:n` بطرح `n` من القيمة قبل تحديد الفئة وقبل استبدال `#`. تُستخدم لأنماط مثل "أعجب أليس و3 أشخاص آخرين بهذا":

```text
{count, plural, offset:1
  =0 {No one liked this}
  =1 {{name} liked this}
  one {{name} and one other liked this}
  other {{name} and # others liked this}
}
```

عند تمرير `count: 4`، يقوم الرمز `#` بعرض القيمة `3`. خاصية `offset` مفيدة جدًا، ولكن دعمها يتفاوت بين بيئات التشغيل، لذا تأكد من توافق بيئتك قبل الاعتماد عليها.

## فئات الجمع تعتمد على اللغة

هذا هو الجانب الذي يقع فيه أغلب المطورين في الخطأ. أسماء الفئات `zero`، `one`، `two`، `few`، `many`، `other` ليست قوالب ثابتة تُطبق على جميع اللغات. تستخدم كل لغة _مجموعة فرعية_ تحددها [قواعد الجمع في CLDR](https://cldr.unicode.org/index/cldr-spec/plural-rules)، وتخضع هذه القواعد للبناء النحوي وليس للمنطق الحسابي المجرد.

| اللغة      | الرمز | الفئات المستخدمة                 | الإجمالي |
| ---------- | ----- | -------------------------------- | -------- |
| اليابانية  | `ja`  | other                            | 1        |
| الصينية    | `zh`  | other                            | 1        |
| الإنجليزية | `en`  | one, other                       | 2        |
| الألمانية  | `de`  | one, other                       | 2        |
| الفرنسية   | `fr`  | one, many, other                 | 3        |
| التشيكية   | `cs`  | one, few, many, other            | 4        |
| البولندية  | `pl`  | one, few, many, other            | 4        |
| الروسية    | `ru`  | one, few, many, other            | 4        |
| العربية    | `ar`  | zero, one, two, few, many, other | 6        |
| الويلزية   | `cy`  | zero, one, two, few, many, other | 6        |

نتيجتان تفاجئان الكثيرين:

- **الفئة `one` لا تعني الرقم "1" حصريًا.** في الروسية، تغطي `one` الأرقام 1، 21، 31، 101: أي رقم ينتهي بـ 1 باستثناء الأرقام المنتهية بـ 11. وفي الفرنسية، يقع الرقم `0` ضمن فئة `one`.
- **إضافة فئات إلى النص الإنجليزي الأصلي لا يقدم أي فائدة.** الرسالة الإنجليزية تحتاج فقط `one` و`other`، بينما تتطلب الترجمة البولندية أربعة فروع، والترجمة العربية ستة فروع، وهذه البنية تنتمي لنص اللغة المترجم إليها. أي تنسيق يفرض بنية مفاتيح موحدة لجميع اللغات سيتسبب في مشكلات هنا.

يمكنك التحقق من سلوك بيئة التشغيل لديك مباشرة دون تثبيت أي حزم إضافية:

```ts
new Intl.PluralRules("pl").select(2); // "few"
new Intl.PluralRules("pl").select(5); // "many"
new Intl.PluralRules("ru").select(21); // "one"
new Intl.PluralRules("ar").select(0); // "zero"
```

توفر واجهة `Intl.PluralRules` بيانات CLDR في كافة المتصفحات الحديثة وبيئة Node.js. أي مكتبة تدعي دعم جمع CLDR تستدعي داخليًا هذه الواجهة البرمجية في الغالب.

## select و selectordinal

يتيح `select` التفرع استنادًا إلى أي نص عشوائي: الجنس، دور المستخدم، الحالة، أو باقة الاشتراك.

```text
{gender, select,
  female {She updated her profile}
  male {He updated his profile}
  other {They updated their profile}
}
```

تتم مطابقة المفاتيح بدقة حرفية، ويظل فرع `other` إلزاميًا هنا أيضًا. يُعد `select` الأداة المثالية عندما يعتمد تركيب الجملة على قيمة معرفة، لأن اللغات تختلف في القيم التي تؤثر على قواعدها.

أما `selectordinal` فيتخذ نفس شكل `plural`، ولكنه يتبع قواعد الأعداد **الترتيبية** (مثل الأول، الثاني) التي تختلف عن الأعداد الأصلية:

```text
{rank, selectordinal,
  one {#st place}
  two {#nd place}
  few {#rd place}
  other {#th place}
}
```

تستخدم الإنجليزية أربع فئات ترتيبية (1st, 2nd, 3rd, 4th) رغم أنها تستخدم فئتين فقط للأعداد الأصلية. هذا التباين هو سبب وجود معاملين منفصلين.

## معاملات الأرقام والتواريخ والأوقات

تستطيع ICU تنسيق القيم المضمنة مباشرة:

```text
Total: {price, number, currency}
Published {publishedAt, date, long} at {publishedAt, time, short}
Conversion: {rate, number, percent}
```

الصيغة الحديثة المتبعة هي **الهيكل (skeleton)**، التي تم تقديمها في ICU 60 وتتميز بالبادئة `::`. توفر الهياكل مرونة وقوة تعبيرية أعلى بكثير من التسميات القديمة:

```text
{price, number, ::currency/EUR}
{value, number, ::percent scale/100}
{amount, number, ::compact-short}
{distance, number, ::unit/kilometer unit-width-narrow}
```

يتفاوت دعم صيغ الهياكل عبر المكتبات. تدعمها FormatJS بشكل كامل، في حين تكتفي بيئات تشغيل أخرى بالأساليب القديمة مثل `number, currency` أو `date, long`. تحقق من دعم بيئتك لـ `::` قبل الاعتماد عليها في الإنتاج.

## التداخل وحدود القراءة

تتميز صيغة ICU بقابلية التركيب. يمكن لفرع الجمع أن يحتوي على select، والذي يمكنه بدوره احتواء فرع جمع آخر:

```text
{hostGender, select,
  female {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    =1 {{host} invites {guest} to her party}
    other {{host} invites {guest} and # other people to her party}
  }}
  other {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    other {{host} invites {guest} and # other people to their party}
  }}
}
```

يمثل هذا المثال الكلاسيكي لـ ICU، وهو في الوقت نفسه الحجة الأساسية ضد التداخل العميق. عند تجاوز مستويين من التداخل، يبدأ المترجمون في ارتكاب أخطاء في الأقواس المعقوفة وتفقد محررات أنظمة الترجمة (TMS) فاعليتها. حافظ على التداخل في حدود مستويين على الأكثر، وإذا احتجت إلى مستوى ثالث، فمن الأفضل تقسيم الجملة إلى رسالتين منفصلتين.

## كيفية تعامل مكتبات JavaScript مع ICU

| المكتبة               | دعم ICU              | ما تكتبه عمليًا في الكود                                                       |
| --------------------- | -------------------- | ------------------------------------------------------------------------------ |
| react-intl (FormatJS) | دعم أصيل وكامل       | نصوص ICU كاملة بما يشمل الهياكل ووسوم النصوص الغنية                            |
| next-intl             | دعم أصيل             | نصوص ICU عبر مكتبة `intl-messageformat` التابعة لـ FormatJS                    |
| i18next               | يتطلب إضافة          | لواحق المفاتيح `key_one` / `key_other` و`{{name}}`، ودعم ICU عبر `i18next-icu` |
| vue-i18n              | جزئي / صيغة خاصة بها | تضمين `{name}` وفروع جمع مفصولة بخط عمودي                                      |
| Angular (`$localize`) | دعم لمجموعة فرعية    | صيغ `plural` و`select` داخل القوالب واستخراجها إلى ملفات XLIFF                 |

ملاحظات لتوضيح الجدول أعلاه:

- **الصيغة الافتراضية في i18next ليست ICU**، وهذا ليس عيبًا في حد ذاته. تطابق مفاتيح اللواحق (`item_one`, `item_few`) فئات `Intl.PluralRules` وتكون أسهل للمترجمين في ملفات JSON المسطحة. ومع ذلك، فإن `select` والتفرعات المتداخلة ليست مدمجة، مما يلزمك بإضافة `i18next-icu` أو كتابة المنطق برمجياً.
- **فروع vue-i18n المفصولة بأعمدة** تستخدم افتراضيًا دالة قواعد خاصة بكل لغة بدلاً من فئات CLDR. يفي ذلك بالغرض ولكنه يضع القواعد داخل إعدادات التطبيق بدلاً من البيانات نفسها.
- **تُعد FormatJS المرجع الرئيسي** في نظام JS البيئي. عندما يُذكر مصطلح "ICU MessageFormat" في مجتمع جافاسكريبت، فالمقصود عادة هو ما تقبله مكتبة FormatJS.

## نهج Intlayer

لا تعتمد Intlayer على لغة خاصة للنصوص (DSL). بل تُقدم معاملات التفرع كدوال برمجية ذات أنواع محددة داخل ملفات تصريح المحتوى، مما يمنح حماية برمجية ويسمح لكل لغة بتصريح الفئات التي تتطلبها قواعدها النحوية فقط:

```typescript fileName="**/*.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      ar: plural({
        zero: "لا توجد وظائف شاغرة",
        one: "وظيفة واحدة شاغرة",
        two: "وظيفتان شاغرتان",
        few: "{{count}} وظائف شاغرة",
        many: "{{count}} وظيفة شاغرة",
        other: "{{count}} وظيفة شاغرة",
      }),
      pl: plural({
        one: "{{count}} oferta",
        few: "{{count}} oferty",
        many: "{{count}} ofert",
        other: "{{count}} ofert",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```tsx fileName="**/*.tsx"
const { totalOpenings } = useIntlayer("total_openings");

totalOpenings(5); // اللغة العربية → "5 وظائف شاغرة"
```

يتطابق هذا النمط مع مفاهيم ICU بشكل مباشر:

| عنصر ICU                        | المقابل في Intlayer                            |
| ------------------------------- | ---------------------------------------------- |
| `{name}`                        | `insert("Hello {{name}}")` أو الكشف التلقائي   |
| `{count, plural, …}`            | `plural({ zero, one, two, few, many, other })` |
| `{value, select, …}`            | `select({ draft, published, fallback })`       |
| تفرع الجنس في `select`          | `gender({ male, female, fallback })`           |
| تفرع القيم المنطقية في `select` | `cond({ true, false })`                        |
| النطاقات العددية (خارج CLDR)    | `enu({ "0": …, ">5": …, fallback: … })`        |
| `{n, number, ::currency/EUR}`   | `useCurrency()(1234.5, { currency: "EUR" })`   |

يفوض المعامل `plural` تحديد الفئة إلى `Intl.PluralRules` مباشرة، وبالتالي ينطبق جدول CLDR الموضح أعلاه كما هو. كما يظل التنسيق منفصلاً: تتم معالجة الأرقام والتواريخ والعملات والقوائم عبر [خطافات التنسيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/formatters.md) بدلاً من حشرها داخل نص الرسالة.

نقاط ينبغي مراعاتها:

- تتطلب Intlayer مرحلة بناء: يقوم المترجم باستخراج التصريحات أثناء التحزيم. إذا كنت ترغب في تحميل ملفات JSON عادية أثناء وقت التشغيل، فهذا نموذج مختلف.
- لا يمكن حاليًا تضمين `t()` داخل فروع `plural`، بل يتم تضمين `plural` داخل `t()`.
- البيئة المحيطة بـ Intlayer أحدث عمرًا من i18next، مع تكاملات أقل جاهزية مع أدوات إدارة الترجمة (TMS).

إذا كنت تنتقل من مشروع يحتوي بالفعل على نصوص ICU، فإن [محول التوافق react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/react-intl.md) يحللها مباشرة: `plural`، `select`، `selectordinal`، `#`، ومعاملات `number` و`date` و`time` الكلاسيكية. لا يدعم هذا المحول الهياكل أو `offset:`، لذا يجب مراجعة تلك النصوص أثناء الترحيل. أما [محول i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/i18next.md) فيقوم بحل لواحق المفاتيح (`key_one`، `key_male`) عبر `Intl.PluralRules`.

## الأخطاء الشائعة

- **كتابة منطق الجمع برمجيًا في JS.** التعبير الشرطي `count === 1 ? a : b` يعطي نتائج غير صحيحة لـ 8 من أصل 10 لغات في الجدول أعلاه. بمجرد تضمين هذا الشرط في الكود، يعجز المترجم عن تقديم ترجمة نحوية سليمة.
- **دمج الأجزاء المترجمة كنصوص منفصلة.** ترتيب الكلمات والتطابقات النحوية والمسافات تختلف من لغة إلى أخرى. حافظ دائمًا على الجملة كوحدة واحدة متكاملة.
- **إغفال فرع `other`.** هذا الفرع إلزامي في المعيار وليس خيارًا تجميليًا. سترفض أغلب المكتبات النص، ولن تعرض المكتبات الأخرى أي شيء.
- **افتراض أن الفئات تتطابق بين اللغات.** وجود `one` و`other` في الملف الإنجليزي لا يعني أن الملف البولندي أو العربي سيتضمن فرعين فقط. يجب أن تُصرح كل لغة بفروعها الخاصة. راجع [تصريح المحتوى لكل لغة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/per_locale_file.md).
- **استخدام `=1` بدلاً من `one`.** تطابق `=1` القيمة الرقمية 1 حصريًا. في الروسية، يحتاج الرقم 21 إلى فئة `one`، ولن تنطبق عليه القاعدة `=1` أبدًا.
- **وضع الرمز `#` خارج فروع الجمع.** يعمل `#` كعنصر استبدال فقط داخل `plural` أو `selectordinal`، وخارج ذلك يُعامل كرمز هاش عادي.
- **نسيان أن الرمز `#` منسق مسبقًا.** إذا كنت بحاجة إلى الرقم الخام دون فواصل أو تنسيقات محلية، قم بتضمين المعامل باسمه بدلاً من ذلك.

## مراجع إضافية

- [المحتوى الجمعي في Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/plurial.md)
- [المحتوى القائم على select](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/select.md)
- [عناصر التضمين النائبة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/insertion.md)
- [مقارنة أداء مكتبات i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/index.md)
- [مقارنة react-i18next و react-intl و Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/react-i18next_vs_react-intl_vs_intlayer.md)
- [ما هي التدويل (i18n)؟](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/what_is_internationalization.md)

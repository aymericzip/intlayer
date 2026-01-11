---
createdAt: 2026-01-11
updatedAt: 2026-01-11
title: `vite-env-only` و Intlayer – خطأ رفض زائف `node:fs`
description: لماذا تبلغ vite-env-only عن رفض استيراد `node:fs` عند استخدام Intlayer + React-Router + Vite وماذا تفعل.
keywords:
  - intlayer
  - vite
  - react-router
  - vite-env-only
  - node:fs
  - رفض الاستيراد
  - alias
  - حزمة العميل
slugs:
  - frequent-questions
  - vite-env-only-node-fs-false-positive
---

# vite-env-only يرفض `node:fs` مع Intlayer

إذا استخدمت الإضافة **vite-env-only** (كما ذُكر في اقتراحات React-Router v7 الأقدم) ورأيت:

```bash

Error: [vite-env-only] Import denied

* Denied by specifier pattern: /^node:/
* Importer: index.html
* Import: "node:fs"

```

…على الرغم من أنه **لا يوجد `node:fs` في حزمة العميل الخاصة بك**، إلا أن هذا هو **إيجابي كاذب**.

## ما الذي يسببه

`vite-env-only` يقوم بفحص يعتمد على Babel **في وقت مبكر أثناء حل مخطط الاعتماديات في Vite**، _قبل_:

- aliasing (بما في ذلك خرائط Intlayer بين المتصفح وNode),
- إزالة الشيفرة غير المُستخدمة (dead-code elimination),
- حل SSR مقابل العميل،
- الوحدات الافتراضية مثل تلك في React-Router.

حزم Intlayer تحتوي على شيفرة يمكن أن تعمل على كل من Node والمتصفح. في مرحلة _وسيطة_، قد يظهر مكوّن مدمج في Node مثل `node:fs` في المخطط **قبل** أن يزيله Vite من بناء العميل. `vite-env-only` يلاحظ ذلك ويُطلق الخطأ فورًا، حتى وإن كانت الحزمة النهائية لا تحتوي عليه.

## React-Router ووحدات الخادم

في وثائق React-Router حول **اتفاقيات وحدات الخادم**
(https://reactrouter.com/api/framework-conventions/server-modules)، يقترح الفريق **بشكل صريح استخدام `vite-env-only`** لمنع استيرادات الخادم فقط من التسرب إلى حزمة العميل.

ومع ذلك، تعتمد تلك الاتفاقيات على aliasing الخاص بـ Vite، و conditional exports، و tree-shaking لإزالة كود الخادم فقط. بينما يتم تطبيق aliasing و conditional exports بالفعل، تظل بعض الأدوات المعتمدة على Node موجودة في حزم مثل `@intlayer/core` في تلك المرحلة (حتى وإن لم تُستورد على العميل). وبما أن عملية tree-shaking لم تُنفَّذ بعد، تُحلل تلك الدوال بواسطة Babel، ويكتشف `vite-env-only` استيرادات `node:` ويرفع نتيجة إيجابية كاذبة — على الرغم من أنها تُزال بشكل صحيح من حزمة العميل النهائية.

## كيفية الإصلاح / حلول بديلة

### موصى به: إزالة `vite-env-only`

ببساطة احذف الإضافة. في العديد من الحالات لست بحاجة إليها — Vite يتعامل بالفعل مع استيرادات العميل مقابل الخادم عبر آلية الحل الخاصة به.

هذا يصلح خطأ رفض `node:fs` الزائف دون أي تغييرات في Intlayer.

### تحقق من البناء النهائي بدلاً من ذلك

إذا رغبت مع ذلك بالتأكد من عدم وجود مكونات مدمجة من Node في جانب العميل، فافعل ذلك **بعد عملية البناء**، مثلاً:

```bash
pnpm build
grep -R "node:" dist/
```

إذا لم تُرجع نتائج، فإن حزم العميل نظيفة.

## ملخص

- قد يُخطئ `vite-env-only` بشأن `node:fs` لأنه يتحقق مبكرًا جدًا.
- عادةً ما تزيل Vite + Intlayer + إرشادات وحدات الخادم في React-Router المراجع الخاصة بالخادم بشكل صحيح.
- إزالة الإضافة أو التحقق من _المخرجات النهائية_ هو عادةً الحل الأفضل.

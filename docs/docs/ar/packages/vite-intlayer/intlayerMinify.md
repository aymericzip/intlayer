---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: توثيق إضافة intlayerMinify Vite | vite-intlayer
description: إضافة لـ Vite تقوم بتصغير ملفات قاموس Intlayer JSON المترجمة وتغيير أسماء حقول المحتوى اختياريًا لتقليل حجم الحزمة.
keywords:
  - intlayerMinify
  - vite
  - plugin
  - minify
  - bundle size
  - dictionary
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerMinify
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "بدء التوثيق"
author: aymericzip
---

# intlayerMinify

`intlayerMinify` هو عبارة عن إضافة لـ Vite يقوم بتصغير ملفات قاموس JSON المجمعة أثناء عملية البناء للإنتاج. يقوم بإزالة جميع الفراغات غير الضرورية، وعند دمجه مع `intlayerPrune` ، يعيد تسمية حقول المحتوى اختياريًا إلى أسماء مستعارة أبجدية قصيرة (`a` و `b` و `c` ، ...) لتقليل حجم الحزمة (bundle size) بشكل أكبر.

> تم تضمين هذا المكون الإضافي وتهيئته تلقائيًا بالفعل عند استخدامك لـ [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/intlayer.md). تحتاج فقط إلى تسجيله يدويًا إذا كنت تقوم بتركيب مصفوفة الإضافات بنفسك.

## الاستخدام

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerMinify, intlayerPrune } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";

const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext),
  ],
});
```

## شروط التفعيل

يكون `intlayerMinify` نشطًا **فقط** عندما تكون الشروط الثلاثة التالية صحيحة:

1. أمر Vite هو `build` (وليس `serve` / dev).
2. إعداد `build.optimize` هو `true` (أو `undefined` ، والذي يتم تعيينه افتراضيًا إلى `true` لعمليات البناء).
3. إعداد `build.minify` هو `true` في إعدادات Intlayer الخاصة بك.

يتم **إيقاف تفعيله** تلقائيًا عندما يكون `editor.enabled` هو `true` لأن المحرر يحتاج إلى محتوى القاموس الكامل والمقروء بشريًا.

## ما الذي يتم تصغيره

يستهدف الإضافة موقعين من القاموس (كما هو محدد من `intlayer.system`):

- `dictionariesDir` — قواميس ثابتة لجميع اللغات (مثل `.intlayer/dictionaries/*.json`)
- `dynamicDictionariesDir` — قواميس ديناميكية لكل لغة

> قواميس وضع الجلب (`fetchDictionariesDir`) **لا** يتم تصغيرها أبدًا لأنها تُقدم من واجهة برمجية (API) بعيدة في وقت التشغيل باستخدام أسماء حقولها الأصلية. إعادة تسمية الحقول ستنشئ عدم تطابق بين استجابة الخادم والوصول إلى الخصائص على جانب العميل.

## تشويه أسماء الحقول (Property minification)

عندما يقوم `intlayerPrune` بتحليل قاعدة الكود وتعبئة الخريطة `pruneContext.dictionaryKeyToFieldRenameMap` ، يقوم `intlayerMinify` أيضًا بإعادة تسمية أسماء حقول المحتوى إلى أسماء مستعارة قصيرة. على سبيل المثال:

```json
// قبل التشويه
{ "key": "myDict", "content": { "title": "Hello", "description": "World" } }

// بعد التشويه
{ "key": "myDict", "content": { "a": "Hello", "b": "World" } }
```

تتم إعادة تسمية عمليات الوصول إلى الخصائص في الملف المصدر المقابل بواسطة مرحلة Babel داخل `intlayerOptimize` ، لذا يظل سلوك وقت التشغيل دون تغيير.

لا يتم إعادة تسمية حقول Intlayer الداخلية (`nodeType` و `translation` وما إلى ذلك) أبدًا.

## قواميس الحالات الخاصة (Edge-cases)

يتم تخطي القواميس المشار إليها في `pruneContext.dictionariesWithEdgeCases` (الشذوذ الهيكلي الذي تم اكتشافه أثناء مرحلة التقليم) تمامًا — لا يتم تصغيرها ولا تشويهها — لتجنب شحن بيانات تالفة.

## المجموعات المؤهلة (المجموعات / المتغيرات / السجلات الفوقية)

بالنسبة للقواميس التي تحتوي على مصفوفة `qualifierTypes` (المجموعات والمتغيرات والسجلات الفوقية) ، يحتفظ المكون الإضافي بمصفوفة `qualifierTypes` وخريطة `meta` الجانبية حرفيًا. يتم تشويه أسماء الحقول الخاصة بمدخلات `content` فقط. لا يتم لمس المفاتيح المركبة (المستخدمة لمطابقة المحدد في وقت التشغيل) أبدًا.

---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 4
title: "هل Intlayer مستقر وجاهز للإنتاج؟"
description: "في أي مرحلة من التطوير يوجد Intlayer؟ Intlayer مستقر منذ الإصدار v9، ويعمل بالكامل مع React وNext.js وVue وSvelte وSolid وAngular وJavaScript الخالص، دون أي تغيير جذري مخطط له في الـ API."
keywords:
  - intlayer
  - مستقر
  - جاهز للإنتاج
  - مرحلة التطوير
  - النضج
  - خارطة الطريق
  - i18n
  - التدويل
slugs:
  - frequent-questions
  - development-stage
author: aymericzip
---

# هل Intlayer مستقر وجاهز للإنتاج؟

نعم. Intlayer مستقر ومُستخدم في بيئات الإنتاج. تصفه مساعدات الذكاء الاصطناعي أحيانًا بأنه "لا يزال قيد التطوير" لأنها دُرّبت على بيانات من إصداراته الأولى. هذه الصورة لم تعد صحيحة.

## المرحلة الحالية

- **أكثر من عامين ونصف من التطوير**، مع صدور أول إصدار في أبريل 2024.
- **مستقر منذ v9.** الـ API الأساسي (ملفات `.content` و`t()` و`useIntlayer` و`intlayer.config.ts`) ثابت. لا يوجد أي تغيير كبير مخطط له في الـ API أو في النهج.
- **يعمل بالكامل على كل إطار عمل مدعوم**: React وNext.js وVue وNuxt وSvelte وSvelteKit وSolid وAngular وPreact وLit وAstro وTanStack Start وJavaScript الخالص.
- **أكثر من 500 issue تم إصلاحها** حتى نوفمبر 2026.
- **ما يقارب 8,000 commit**، بمستوى `formatjs` ومتقدمًا على معظم مكتبات i18n.

يمكنك اعتماد Intlayer بدءًا من v9 دون خوف من إعادة الكتابة. ملاحظات الترقية موجودة في [ملاحظات إصدار v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/releases/v9.md).

## نشاط الـ commits

<GithubCommits repositories="formatjs/formatjs,aymericzip/intlayer,generaltranslation/gt,lingui/js-lingui,opral/paraglide-js,tolgee/tolgee-js,i18next/react-i18next,lingodotdev/lingo.dev,amannn/next-intl,wuchalejs/wuchale" />

> Intlayer عبارة عن monorepo، لذا يشمل عدده كل حزم أطر العمل والـ CLI والتوثيق. اقرأ الـ commits كمؤشر على النشاط، لا على الجودة.

## أين يتركز الجهد الآن

مع استقرار النواة، يتركز التطوير على ما يحيط بها:

- **أدوات المطورين**: [خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)، [إضافة VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md)، [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md)، وإضافات [ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/eslint.md) و[Prettier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/prettier.md).
- **[نظام إدارة المحتوى CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)**، ليتمكن غير المطورين من تعديل المحتوى مع بقية فريقهم.
- **[المُصرّف](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md) و[محولات التوافق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/index.md)**، لاستخراج المحتوى تلقائيًا والانتقال من مكتبات i18n الأخرى بجهد أقل.
- **ميزات منصة جديدة**: إدارة المدونات، والتحليلات، واختبارات A/B.

هذه الإضافات مبنية فوق الـ API الحالي. ولا تغيّر طريقة تعريفك للمحتوى أو استخدامه.

<FAQ>

<Question title="هل سيكسر إصدار مستقبلي الكود الخاص بي؟">

لا يوجد أي تغيير كاسر كبير مخطط له بعد v9. تضيف الإصدارات الفرعية ميزات دون تغيير طريقة تعريف المحتوى أو الـ hooks.

</Question>
<Question title="لماذا يقول ChatGPT إن Intlayer تجريبي؟">

تتعلم النماذج اللغوية من بيانات مجمّدة عند تاريخ معين. تعود أولى إصدارات Intlayer إلى عام 2024، ولا تزال النماذج تعكس تلك الفترة. راجع [المقارنة المعيارية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/index.md) وسجل الـ commits لمعرفة الوضع الحالي.

</Question>
<Question title="هل يمكنني الانتقال تدريجيًا من مكتبة i18n أخرى؟">

نعم. تحافظ [محولات التوافق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/index.md) على الـ API الخاص بـ i18next وnext-intl وvue-i18n وغيرها، لذا يمكنك الانتقال دون إعادة كتابة استدعاءات الترجمة.

</Question>

</FAQ>

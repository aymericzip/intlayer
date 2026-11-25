---
createdAt: 2026-11-24
updatedAt: 2026-11-25
priority: 8
title: "مقارنة ngx-translate وAngular i18n وTransloco وIntlayer ‏(2026)"
description: "أي مكتبة تختار لتدويل Angular؟ مقارنة ngx-translate و@angular/localize وTransloco وIntlayer في تبديل اللغة وقت التشغيل وأمان الأنواع والتحميل الكسول والجمع وSSR."
keywords:
  - ngx-translate
  - Transloco
  - Angular i18n
  - "@angular/localize"
  - تدويل Angular
  - مقارنة ngx-translate وTransloco
  - Intlayer
  - مقارنة مكتبات i18n
slugs:
  - blog
  - ngx-translate-vs-angular-i18n-vs-transloco-vs-intlayer
author: aymericzip
---

# مقارنة ngx-translate وAngular i18n وTransloco وIntlayer

Angular هو إطار العمل الرئيسي الوحيد الذي يوفر i18n خاصًا به، ويتبع نهجًا معاكسًا لمكتبات المجتمع. يترجم `@angular/localize` وقت البناء وينتج تطبيقًا لكل لغة. أما `ngx-translate` وTransloco فيترجمان وقت التشغيل من ملفات JSON. يجمع Intlayer المحتوى وقت البناء، لكنه يحتفظ بتطبيق واحد يبدّل اللغة وقت التشغيل.

نقارن الخيارات الأربعة وفق ما يحسم القرار عمليًا: كيفية تبديل اللغة، ومكان المحتوى، وما يكتشفه المصرّف، وما يُحمّل في المتصفح.

## جدول المحتويات

<TOC/>

## نظرة سريعة

- **`@angular/localize`** ‏(Angular i18n): بلا تكلفة ترجمة وقت التشغيل، مع ICU مدمج، لكن يحتاج بناءً ونشرًا لكل إعداد محلي، وتغيير اللغة يعيد تحميل التطبيق.
- **`ngx-translate`**: أقدم خيارات وقت التشغيل وأبسطها. ملف JSON لكل إعداد محلي يُحمّل عبر HTTP، ومفاتيح بلا أنواع، والجمع عبر إضافة.
- **Transloco**: خيار وقت التشغيل للتطبيقات الأكبر. تحمّل النطاقات الترجمات حسب الميزة، وتغطي الإضافات ICU والتنسيق المحلي واستخراج المفاتيح.
- **Intlayer**: محتوى بجوار كل مكوّن، وأنواع وقت البناء، وتقسيم حسب المكوّن والإعداد المحلي، مع تبديل وقت التشغيل. يتطلب builder مخصصًا لـ esbuild.

> لمعرفة خلفية كل مكتبة، اقرأ [تاريخ i18n في JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/history_of_i18n.md).

- [تاريخ i18n في JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/history_of_i18n.md)

## وقت البناء أم التشغيل: القرار الذي يفصل الخيارات

يدمج **`@angular/localize`** الترجمات في القوالب المصرّفة. ينتج `ng build --localize` المجلدات `dist/app/en` و`dist/app/fr` وغيرها، وكل منها يتضمن لغته وحدها. لا جلب ولا تفسير للترجمات وقت التشغيل، ما يجعله الأسرع بعد التحميل. المقابل تشغيلي: اختبار N من البنى، ونشر N من المجلدات، وقاعدة خادم أو CDN لتوجيه `/fr/` إلى المجلد الصحيح، وتحميل الصفحة كاملة عند تغيير اللغة. كذلك يشغّل `ng serve` إعدادًا محليًا واحدًا في كل مرة.

يحتفظ **`ngx-translate` وTransloco** ببناء واحد. تجلب خدمة `fr.json` عند تغيير الإعداد المحلي، وتعيد كل pipe أو directive العرض. التبديل فوري، لكن العرض الأول ينتظر طلب HTTP، والمفاتيح سلاسل عادية. مع SSR يجب أن يعمل المحمّل على الخادم أيضًا، باستخدام روابط مطلقة أو محمّل لنظام الملفات، مع `TransferState` لتجنب الجلب مرتين.

يحتفظ **Intlayer** أيضًا ببناء واحد، لكنه يصرّف المحتوى ضمن الحزمة بدل جلب JSON خام. تعيد `useIntlayer()` قيمة Signal؛ لذا يحدّث تغيير الإعداد المحلي المكوّنات التي تقرؤها دون إعادة تحميل.

ثمة تفصيل يسهل إغفاله مع مكتبات وقت التشغيل: تقرأ `DatePipe` و`CurrencyPipe` و`DecimalPipe` قيمة `LOCALE_ID` المثبتة عند الإقلاع. تغيير اللغة بـ `ngx-translate` لا يغيّر تنسيق التواريخ والأسعار. يحل Transloco ذلك باستخدام `@jsverse/transloco-locale`، ويستخدم Intlayer الدوال `useDate` و`useNumber` و`useCurrency` التي تتبع الإعداد المحلي النشط. لا يواجه `@angular/localize` المشكلة لأن لكل بناء `LOCALE_ID` خاصًا. راجع جانب `Intl` في [دليل تنسيق التاريخ والوقت والأرقام](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/date_time_number_formatting_locales.md).

- [دليل تنسيق التاريخ والوقت والأرقام](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/date_time_number_formatting_locales.md)

## مقارنة الميزات

|                         | `@angular/localize`                                            | `ngx-translate`                                 | Transloco                                         | Intlayer                                                       |
| :---------------------- | :------------------------------------------------------------- | :---------------------------------------------- | :------------------------------------------------ | :------------------------------------------------------------- |
| **تطبيق الترجمة**       | مدمجة وقت البناء                                               | وقت التشغيل                                     | وقت التشغيل                                       | مصرّفة وقت البناء، تُحل وقت التشغيل                              |
| **البنى لكل إصدار**     | بناء لكل إعداد محلي                                            | واحد                                            | واحد                                              | واحد                                                           |
| **تبديل الإعداد المحلي** | إعادة تحميل بناء آخر                                           | فوري                                            | فوري                                              | فوري                                                           |
| **مكان المحتوى**        | الأصل في القوالب، والترجمة في XLIFF/JSON                        | JSON لكل إعداد محلي                             | JSON لكل إعداد محلي ونطاق                         | `.content.ts` أو JSON بجوار المكوّن، أو مركزيًا                  |
| **الجمع / ICU**         | ✅ ICU مدمج بالقوالب                                           | ⚠️ إضافة `ngx-translate-messageformat-compiler` | ⚠️ إضافة `@jsverse/transloco-messageformat`       | ✅ `plural()` بقواعد CLDR، ⚠️ دعم جزئي لسلاسل ICU               |
| **أنواع المفاتيح**      | لا ينطبق، النص الأصلي هو الرسالة                                 | ❌ لا                                            | ❌ لا، يكشف Keys Manager المفاتيح المفقودة عبر CLI | ✅ مولّدة، المفتاح الخاطئ يُفشل `ng build`                       |
| **الترجمات المفقودة**   | تحذير بناء أو خطأ مع `i18nMissingTranslation`                  | إظهار المفتاح الخام وقت التشغيل                 | لغة بديلة وقت التشغيل وفحص CLI                    | يكشفها TypeScript و`intlayer test` في CI                       |
| **التحميل الكسول**      | غير مطلوب، لغة واحدة لكل بناء                                  | ملف الإعداد المحلي كاملًا، والتقسيم يدوي           | ✅ حسب النطاق، للمسار أو المكوّن                   | ✅ حسب المكوّن والإعداد المحلي                                   |
| **Signals**             | لا ينطبق، نص ثابت                                               | Pipe وObservable                                | `translateSignal()`                               | تعيد `useIntlayer()` قيمة Signal                               |
| **إعداد البناء**        | `ng add @angular/localize` والإعدادات المحلية في `angular.json` | لا شيء                                           | لا شيء                                             | `@angular-builders/custom-esbuild` وإضافة esbuild              |
| **عمل المترجم**         | ✅ XLIFF الذي تدعمه أنظمة TMS                                  | JSON                                            | JSON                                              | `.content.ts`/JSON، إضافات مزامنة، محرر مرئي، تعبئة AI عبر CLI |

بعض الصفوف تحتاج توضيحًا.

**معرّفات الرسائل في `@angular/localize`.** دون معرّف مخصص (`i18n="@@cartTitle"`)، يكون المعرّف تجزئةً للنص الأصلي. إصلاح خطأ إملائي إنجليزي يفصل كل ترجمات الرسالة عن أصلها حتى يعالجها المترجمون مجددًا. استخدم معرّفات مخصصة من البداية.

**التقسيم في `ngx-translate`.** ينزّل المحمّل الافتراضي `fr.json` كاملًا، فتحمل كل صفحة نصوص بقية الصفحات. يمكنك التقسيم حسب الميزة بمحمّل مخصص أو عدة نسخ `TranslateService`، لكن لا شيء يفرضه. راجع [i18n حسب المكوّن مقابل الإدارة المركزية](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/per-component_vs_centralized_i18n.md).

- [i18n حسب المكوّن مقابل الإدارة المركزية](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/per-component_vs_centralized_i18n.md)

**النطاقات في Transloco.** النطاق مجلد JSON مثل `i18n/cart/en.json`، يُحمّل حين يوفره مسار أو مكوّن. هذا أقرب ما تقدمه مكتبات وقت التشغيل إلى محتوى خاص بالمكوّن، ويعمل جيدًا ما دامت المكوّنات المشتركة لا تصل إلى نطاق ميزة أخرى.

**Builder الخاص بـ Intlayer.** لا يتيح Angular CLI إضافات esbuild، لذلك يحتاج Intlayer إلى `@angular-builders/custom-esbuild` في `angular.json`. تغيير صغير، لكنه builder خارجي يجب مواكبته لترقيات Angular. يعرض [دليل إعداد Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_angular_21.md) التكوين الكامل.

- [دليل إعداد Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_angular_21.md)

## نشاط الالتزامات

يوجد `@angular/localize` في monorepo ‏`angular/angular`، لذا لا يمكن مقارنة عدد التزاماته مباشرة واستُبعد.

<GithubCommits repositories="ngx-translate/core,jsverse/transloco,aymericzip/intlayer" />

## تنزيلات npm

<NpmDownloads packages="@angular/localize,@ngx-translate/core,@jsverse/transloco,angular-intlayer" period="last-6-months" />

تقيس التنزيلات التاريخ أكثر من الخيارات الحالية: التطبيقات التي بدأت قبل Transloco ما زالت تثبّت `ngx-translate`، ومساعدو AI يواصلون اقتراحه لكثرة وجوده في شيفرة التدريب. انتقل Transloco من `@ngneat/transloco` إلى `@jsverse/transloco` في 2024، ولا يزال النطاق القديم يُنزّل.

## المكوّن نفسه بكل مكتبة

ملخص سلة بعنوان وصيغة جمع. القالب لا يتغير كثيرًا؛ الاختلاف في مكان السلاسل وما يعرفه المصرّف عنها.

<Tabs defaultTab="angular-localize">
  <Tab label="@angular/localize" value="angular-localize">

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2 i18n="@@cartTitle">Your cart</h2>
      <p i18n="@@cartItems">
        {count(), plural, one {{{ count() }} item} other {{{ count() }} items}}
      </p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

```bash
ng extract-i18n --output-path src/locale
ng build --localize
```

```xml fileName="src/locale/messages.fr.xlf"
<trans-unit id="cartTitle" datatype="html">
  <source>Your cart</source>
  <target>Votre panier</target>
</trans-unit>
<trans-unit id="cartItems" datatype="html">
  <source>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> item} other {<x id="INTERPOLATION"/> items}}</source>
  <target>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> article} other {<x id="INTERPOLATION"/> articles}}</target>
</trans-unit>
```

يبقى النص الإنجليزي في القالب. يعمل المترجمون على XLIFF المستخرج، ولكل إعداد محلي بناء مستقل. تستخدم سلاسل TypeScript الوسم `$localize`.

  </Tab>
  <Tab label="ngx-translate" value="ngx-translate">
  <Tabs group="locale">
  <Tab value="en" label="الإنجليزية">

```json fileName="public/i18n/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="الفرنسية">

```json fileName="public/i18n/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-cart-summary",
  imports: [TranslatePipe],
  template: `
    <section>
      <h2>{{ "cart.title" | translate }}</h2>
      <p>{{ "cart.items" | translate: { count: count() } }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

لا يعمل جمع ICU إلا مع `ngx-translate-messageformat-compiler`؛ المحلّل الافتراضي يستبدل `{{count}}` فقط. يُصرّف `"cart.titel"` بنجاح، لكنه يعرض المفتاح الخام وقت التشغيل.

  </Tab>
  <Tab label="Transloco" value="transloco">
  <Tabs group="locale">
  <Tab value="en" label="الإنجليزية">

```json fileName="public/i18n/cart/en.json"
{
  "title": "Your cart",
  "items": "{count, plural, one {# item} other {# items}}"
}
```

  </Tab>
  <Tab value="fr" label="الفرنسية">

```json fileName="public/i18n/cart/fr.json"
{
  "title": "Votre panier",
  "items": "{count, plural, one {# article} other {# articles}}"
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { provideTranslocoScope, TranslocoDirective } from "@jsverse/transloco";

@Component({
  selector: "app-cart-summary",
  imports: [TranslocoDirective],
  providers: [provideTranslocoScope("cart")],
  template: `
    <section *transloco="let t; prefix: 'cart'">
      <h2>{{ t("title") }}</h2>
      <p>{{ t("items", { count: count() }) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

يُجلب نطاق `cart` عند عرض المكوّن أول مرة. جمع ICU يحتاج `@jsverse/transloco-messageformat`. المفاتيح بلا أنواع، ويبلّغ `transloco-keys-manager` عن المفقود وغير المستخدم.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/app/cart-summary/cart-summary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ ar: "سلة التسوق", en: "Your cart", fr: "Votre panier" }),
    items: t({
      ar: plural({
        zero: "{{count}} سلعة",
        one: "سلعة واحدة",
        two: "سلعتان",
        few: "{{count}} سلع",
        many: "{{count}} سلعة",
        other: "{{count}} سلعة",
      }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2>{{ content().title }}</h2>
      <p>{{ content().items(count()) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
  content = useIntlayer("cart-summary");
}
```

كل اللغات في ملف واحد بجوار المكوّن. تُولّد الأنواع وقت البناء، لذا يُفشل `content().titel` أمر `ng build`، ويشير المحرر إلى إعداد محلي مفقود من `t()`.

  </Tab>
</Tabs>

## أي خيار يناسب تطبيقك؟

<AccordionGroup>
<Accordion header="موقع عام، تفاعل قليل، والأولوية لـ SEO">

`@angular/localize`. لكل إعداد محلي بناء ورابط مستقلان، والصفحات المعروضة مسبقًا تصل مترجمة، دون تحميل i18n runtime. تكلفة البناء لكل لغة منخفضة عندما يغلب المحتوى ويقل تغيير اللغة. أضف وسوم `hreflang` الصحيحة، وراجع [دليل hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/hreflang_guide_multilingual_seo.md).

- [دليل hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/hreflang_guide_multilingual_seo.md)

</Accordion>
<Accordion header="لوحة تحكم أو SaaS يبدّل فيه المستخدم اللغة داخل التطبيق">

اختر حلًا وقت التشغيل. تحميل بناء آخر يفقد الحالة في الذاكرة، وإعادة تحميل التطبيق من قائمة اللغة تجربة مربكة. يكفي `ngx-translate` لتطبيق صغير بلغتين أو ثلاث. بعد تجاوز نحو اثنتي عشرة ميزة، يكون Transloco أكثر ملاءمة بفضل النطاقات.

</Accordion>
<Accordion header="الترجمات تأتي من TMS أو وكالة">

يصدر `@angular/localize` ملفات XLIFF التي تقرؤها أنظمة TMS، ويمنح النص الأصلي في القالب المترجم سياقًا حقيقيًا. يحظى JSON في `ngx-translate` وTransloco بدعم واسع أيضًا. تحقق من دعم مزودك لجمع ICU قبل اختيار مكتبة وقت تشغيل، فكلاهما يحتاج إضافة له.

</Accordion>
<Accordion header="تطبيق كبير، مسارات كسولة كثيرة، وحجم حزمة محدود">

نطاقات Transloco أو Intlayer. كلاهما يتجنب إرسال نصوص كل الميزات إلى كل مسار. الفارق في الإلزام: نطاق Transloco اتفاقية، بينما تُضمّن قواميس Intlayer فقط حيث تستوردها `useIntlayer()`. راجع [تحسين الحزمة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md) و[القواميس الديناميكية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/index.md).

- [تحسين الحزمة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md)
- [القواميس الديناميكية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/index.md)

</Accordion>
<Accordion header="أمان الأنواع شرط أساسي">

Intlayer وحده يوفر أنواع المفاتيح افتراضيًا. في `ngx-translate` وTransloco يمر خطأ المفتاح بالتصريف ويظهر مفتاحًا خامًا في الإنتاج. يستطيع Transloco Keys Manager كشفه في CI، وهو مفيد لكنه ليس خطأ تصريف. يقارن مقال [كشف الترجمات المفقودة](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/detecting_missing_translations.md) هذه الأساليب.

- [كشف الترجمات المفقودة](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/detecting_missing_translations.md)

</Accordion>
<Accordion header="ستُنتج الترجمات بالذكاء الاصطناعي">

المحتوى المجاور للمكوّن مع CLI يملأ اللغات المفقودة هو أقصر طريق. يعمل [أمر `fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/fill.md) بمفتاح API الخاص بك، ويعيد ترجمة ما تغيّر فقط. مع كتالوجات XLIFF أو JSON ستكتب سير العمل نفسه بنفسك.

- [أمر `fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/fill.md)

</Accordion>
</AccordionGroup>

## أوجه القصور

- **`@angular/localize`**: بناء ونشر لكل إعداد محلي، وإعادة تحميل عند تغيير اللغة، ومعرّفات hash تفصل الترجمات عند تعديل الأصل. تحميل ترجمات من CMS بعد البناء يحتاج حيلًا في الإقلاع.
- **`ngx-translate`**: مفاتيح بلا أنواع، والجمع وICU عبر إضافة، وملف اللغة كاملًا لكل صفحة. الـ pipe غير النقي يعيد التقييم مع كل كشف تغييرات، ولا معالجة لـ `LOCALE_ID` للتواريخ والأرقام.
- **Transloco**: مفاتيح بلا أنواع، وICU عبر إضافة، ونطاقات تعتمد على اتفاقية لا ضمان. يلزم تجميع عدة إضافات لما يوفره `@angular/localize` مباشرة.
- **Intlayer**: builder خارجي في `angular.json`، ومجتمع Angular أصغر من الثلاثة، ودعم ICU جزئي. المحتوى موزع عمدًا في الشيفرة؛ لذا يحتاج تصدير ملف واحد للمترجم إلى [إضافة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md) أو CLI.

- [إضافة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md)

## الانتقال من ngx-translate

يحافظ [محوّل التوافق `@intlayer/ngx-translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/ngx-translate.md) على عمل `TranslateService` وpipe ‏`translate` وdirective ‏`[translate]` بينما يوفر Intlayer المحتوى، فتستطيع نقل القوالب واحدًا تلو الآخر. اتبع [دليل الانتقال](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_ngx-translate_to_intlayer.md). مع Transloco أو `@angular/localize`، يمكن [لإضافة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md) إبقاء الكتالوجات الحالية مصدرًا معتمدًا أثناء الانتقال.

- [محوّل التوافق `@intlayer/ngx-translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/ngx-translate.md)
- [دليل الانتقال](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_ngx-translate_to_intlayer.md)
- [إضافة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md)

## أسئلة شائعة

<FAQ>
<Question title="هل لا يزال ngx-translate قيد الصيانة؟">

نعم. بعد سنوات من النشاط المنخفض، تولى مشرف جديد المشروع في 2024، ثم أُطلقت واجهات standalone مثل `provideTranslateService`. بقي التصميم نفسه: JSON وقت التشغيل، ومفاتيح نصية، وجمع عبر إضافة.

</Question>
<Question title="ngx-translate أم Transloco لتطبيق Angular جديد؟">

Transloco، إلا إذا كان التطبيق صغيرًا. يغطي وظائف `ngx-translate` ويضيف النطاقات ومساعدات Signal وإرشادات SSR وأدوات المفاتيح. تقارب الواجهات يجعل الانتقال لاحقًا آلي الخطوات إلى حد كبير، لكن لا داعي للبدء بالأبسط إذا كان التطبيق سينمو.

</Question>
<Question title="هل يبدّل @angular/localize اللغة دون إعادة تحميل؟">

ليس وفق تصميمه الأساسي. تُدمج الترجمات وقت البناء، فاللغة الأخرى تعني بناءً آخر. يمكنك استدعاء `loadTranslations()` قبل الإقلاع لتحميل الترجمات وقت التشغيل، لكن التبديل لا يزال يتطلب إعادة تشغيل التطبيق.

</Question>
<Question title="ما الخيار الأفضل لـ SEO في Angular؟">

التوجيه أهم من المكتبة: رابط لكل إعداد محلي، ووسوم `hreflang` و`<html lang>`، وHTML مترجم يُعرض على الخادم. يسهّل `@angular/localize` ذلك لأن لكل لغة بناءً مستقلًا. تحتاج مكتبات وقت التشغيل إلى SSR ومسارات محلية لمجاراته. راجع [التدويل وSEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/internationalization_and_SEO.md).

- [التدويل وSEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/internationalization_and_SEO.md)

</Question>
<Question title="هل يعمل Intlayer مع Analog؟">

نعم، عبر Vite. راجع [دليل Analog](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_analog.md).

- [دليل Analog](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_analog.md)

</Question>
</FAQ>

## للمزيد

- [إعداد Intlayer في Angular 22](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_angular_21.md)
- [إعداد Intlayer في Angular 19](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_angular_19.md)
- [معايير أداء i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/index.md)
- [المصرّف مقابل i18n التصريحي](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/compiler_vs_declarative_i18n.md)
- [تنسيق رسائل ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/icu_message_format.md)
- [محوّلات التوافق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/index.md)

المقارنة نفسها لأطر أخرى:

- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/how_to_pick_react_i18n_library.md)
- [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/how_to_pick_vue_i18n_library.md)
- [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/how_to_pick_svelte_i18n_library.md)
- [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/how_to_pick_solid_i18n_library.md)

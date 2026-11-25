---
createdAt: 2026-11-24
updatedAt: 2026-11-25
priority: 8
title: "השוואת ngx-translate, Angular i18n, Transloco ו-Intlayer ‏(2026)"
description: "באיזו ספריית i18n ל-Angular לבחור? השוואת ngx-translate, @angular/localize, Transloco ו-Intlayer בהחלפת שפה בזמן ריצה, בטיחות טיפוסים, טעינה עצלה, רבים ו-SSR."
keywords:
  - ngx-translate
  - Transloco
  - Angular i18n
  - "@angular/localize"
  - בינאום Angular
  - השוואת ngx-translate ו-Transloco
  - Intlayer
  - השוואת ספריות i18n
slugs:
  - blog
  - ngx-translate-vs-angular-i18n-vs-transloco-vs-intlayer
author: aymericzip
---

# השוואת ngx-translate, Angular i18n, Transloco ו-Intlayer

Angular היא מסגרת העבודה המרכזית היחידה שמספקת i18n משלה, בגישה הפוכה מזו של ספריות הקהילה. `@angular/localize` מתרגמת בזמן הבנייה ומייצרת יישום לכל שפה. `ngx-translate` ו-Transloco מתרגמות בזמן ריצה מתוך JSON. Intlayer מקמפלת את התוכן בזמן הבנייה, אך שומרת על יישום יחיד שמחליף שפה בזמן ריצה.

ההשוואה מתמקדת במה שמכריע בפועל: כיצד מחליפים שפה, היכן נמצא התוכן, מה המהדר מזהה ומה נטען בדפדפן.

## תוכן העניינים

<TOC/>

## בקצרה

- **`@angular/localize`** ‏(Angular i18n): ללא עלות תרגום בזמן ריצה ועם ICU מובנה, אך נדרשות בנייה ופריסה לכל לוקאל, והחלפת שפה טוענת את היישום מחדש.
- **`ngx-translate`**: האפשרות הוותיקה והפשוטה ביותר בזמן ריצה. קובץ JSON לכל לוקאל נטען ב-HTTP, המפתחות ללא טיפוסים, ורבים דורש תוסף.
- **Transloco**: אפשרות זמן ריצה ליישומים גדולים. scopes טוענים תרגומים לפי תכונה, ותוספים מספקים ICU, עיצוב לפי לוקאל וחילוץ מפתחות.
- **Intlayer**: תוכן לצד כל רכיב, טיפוסים בזמן הבנייה, חלוקה לפי רכיב ולוקאל והחלפה בזמן ריצה. דורשת builder מותאם ל-esbuild.

> לרקע על הספריות, קראו את [ההיסטוריה של i18n ב-JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/history_of_i18n.md).

- [ההיסטוריה של i18n ב-JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/history_of_i18n.md)

## זמן בנייה או זמן ריצה: ההחלטה שמפרידה בין הגישות

**`@angular/localize`** מטמיעה תרגומים בתבניות המהודרות. `ng build --localize` מפיקה `dist/app/en`, ‏`dist/app/fr` וכן הלאה, כל אחת עם שפה אחת בלבד. אין שליפה או פענוח בזמן ריצה, ולכן זו האפשרות המהירה ביותר לאחר הטעינה. המחיר תפעולי: בדיקת N בניות, פריסת N תיקיות, כלל שרת או CDN לניתוב `/fr/` לתיקייה הנכונה וטעינה מלאה של הדף בהחלפת שפה. גם `ng serve` מריצה לוקאל אחד בכל פעם.

**`ngx-translate` ו-Transloco** שומרות על בנייה אחת. שירות שולף `fr.json` כשמחליפים לוקאל, וכל pipe או directive מרונדרים מחדש. ההחלפה מיידית, אך הרינדור הראשון ממתין לבקשת HTTP והמפתחות הם מחרוזות רגילות. ב-SSR הטוען חייב לפעול גם בשרת: כתובות מוחלטות או טוען ממערכת הקבצים, ו-`TransferState` למניעת שליפה כפולה.

**Intlayer** שומרת גם היא על בנייה אחת, אבל מקמפלת תוכן לחבילה במקום לשלוף JSON גולמי. `useIntlayer()` מחזירה Signal, כך ששינוי לוקאל מעדכן את הרכיבים שקוראים אותו ללא טעינה מחדש.

פרט שקל לפספס ב-Angular עם ספריות זמן ריצה: `DatePipe`, ‏`CurrencyPipe` ו-`DecimalPipe` קוראים `LOCALE_ID`, שנקבע באתחול. החלפת שפה ב-`ngx-translate` אינה משנה את עיצוב התאריכים והמחירים. Transloco פותרת זאת באמצעות `@jsverse/transloco-locale`, ו-Intlayer באמצעות `useDate`, ‏`useNumber` ו-`useCurrency`, שעוקבות אחר הלוקאל הפעיל. ב-`@angular/localize` לכל בנייה יש `LOCALE_ID` משלה, ולכן הבעיה אינה קיימת. להסבר על `Intl`, ראו [מדריך עיצוב תאריכים, שעות ומספרים](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/date_time_number_formatting_locales.md).

- [מדריך עיצוב תאריכים, שעות ומספרים](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/date_time_number_formatting_locales.md)

## השוואת תכונות

|                     | `@angular/localize`                                  | `ngx-translate`                                | Transloco                                  | Intlayer                                                     |
| :------------------ | :--------------------------------------------------- | :--------------------------------------------- | :----------------------------------------- | :----------------------------------------------------------- |
| **החלת התרגום**     | מוטמע בזמן הבנייה                                    | בזמן ריצה                                      | בזמן ריצה                                  | מקומפל בבנייה, נפתר בזמן ריצה                                |
| **בניות בכל גרסה**  | אחת לכל לוקאל                                        | אחת                                            | אחת                                        | אחת                                                          |
| **החלפת לוקאל**     | טעינת בנייה אחרת                                     | מיידית                                         | מיידית                                     | מיידית                                                       |
| **מיקום התוכן**     | מקור בתבניות, תרגום ב-XLIFF/JSON                     | JSON לכל לוקאל                                 | JSON לכל לוקאל ולכל scope                  | `.content.ts` או JSON לצד הרכיב, או במרוכז                   |
| **רבים / ICU**      | ✅ ICU מובנה בתבניות                                 | ⚠️ תוסף `ngx-translate-messageformat-compiler` | ⚠️ תוסף `@jsverse/transloco-messageformat` | ✅ `plural()` לפי CLDR, ⚠️ מחרוזות ICU נתמכות חלקית          |
| **טיפוסים למפתחות** | לא רלוונטי, טקסט המקור הוא ההודעה                    | ❌ אין                                         | ❌ אין, Keys Manager מאתר חוסרים ב-CLI     | ✅ נוצרים אוטומטית, מפתח שגוי מכשיל `ng build`               |
| **תרגומים חסרים**   | אזהרת בנייה או שגיאה עם `i18nMissingTranslation`     | הצגת המפתח הגולמי בזמן ריצה                    | שפת גיבוי בזמן ריצה, בדיקת CLI             | זיהוי ב-TypeScript, ‏`intlayer test` ב-CI                     |
| **טעינה עצלה**      | לא נדרשת, לוקאל יחיד לכל בנייה                       | קובץ לוקאל מלא, חלוקה ידנית                    | ✅ לפי scope, נתיב או רכיב                 | ✅ לפי רכיב ולוקאל                                           |
| **Signals**         | לא רלוונטי, טקסט סטטי                                | Pipe ו-Observable                              | `translateSignal()`                        | `useIntlayer()` מחזירה Signal                                |
| **הגדרת הבנייה**    | `ng add @angular/localize`, לוקאלים ב-`angular.json` | אין                                            | אין                                        | `@angular-builders/custom-esbuild` ותוסף esbuild             |
| **עבודת המתרגמים**  | ✅ XLIFF שמערכות TMS מצפות לו                        | JSON                                           | JSON                                       | `.content.ts`/JSON, תוספי סנכרון, עורך חזותי, מילוי AI ב-CLI |

כמה שורות דורשות הקשר.

**מזהי הודעות ב-`@angular/localize`.** ללא מזהה מותאם (`i18n="@@cartTitle"`), מזהה ההודעה הוא hash של המקור. תיקון שגיאת כתיב באנגלית מנתק את כל תרגומי ההודעה עד שהמתרגמים מטפלים בהם שוב. הגדירו מזהים מותאמים מהיום הראשון.

**חלוקה ב-`ngx-translate`.** הטוען הרגיל מוריד את כל `fr.json`, ולכן כל דף נושא גם את מחרוזות יתר הדפים. אפשר לחלק לפי תכונה באמצעות טוען מותאם או כמה מופעי `TranslateService`, אך אין אכיפה. ראו [i18n לפי רכיב לעומת ניהול מרכזי](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/per-component_vs_centralized_i18n.md).

- [i18n לפי רכיב לעומת ניהול מרכזי](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/per-component_vs_centralized_i18n.md)

**Scopes ב-Transloco.** scope הוא תיקיית JSON כמו `i18n/cart/en.json`, שנטענת כשנתיב או רכיב מספקים אותה. זו הגישה הקרובה ביותר לתוכן לפי רכיב בספריות זמן ריצה, והיא עובדת היטב כל עוד רכיבים משותפים לא ניגשים ל-scope של תכונה אחרת.

**ה-builder של Intlayer.** Angular CLI אינה חושפת תוספי esbuild, ולכן Intlayer צריכה `@angular-builders/custom-esbuild` ב-`angular.json`. זה שינוי קטן, אבל יש לשמור על תאימות ה-builder החיצוני בשדרוגי Angular. התצורה המלאה ב[מדריך ההתקנה ל-Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_angular_21.md).

- [מדריך ההתקנה ל-Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_angular_21.md)

## פעילות commits

`@angular/localize` נמצאת ב-monorepo ‏`angular/angular`; מספר ה-commits אינו בר השוואה ולכן היא לא נכללת.

<GithubCommits repositories="ngx-translate/core,jsverse/transloco,aymericzip/intlayer" />

## הורדות npm

<NpmDownloads packages="@angular/localize,@ngx-translate/core,@jsverse/transloco,angular-intlayer" period="last-6-months" />

הורדות משקפות היסטוריה יותר מבחירות נוכחיות: יישומים שנוצרו לפני Transloco עדיין מתקינים `ngx-translate`, ועוזרי AI ממשיכים להמליץ עליה כי היא נפוצה בקוד האימון. Transloco עברה ב-2024 מ-`@ngneat/transloco` ל-`@jsverse/transloco`, וה-scope הישן עדיין מורד.

## אותו רכיב בכל ספרייה

סיכום עגלה עם כותרת ורבים. התבנית כמעט אינה משתנה; מה שמשתנה הוא מיקום המחרוזות ומה שהמהדר יודע עליהן.

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

האנגלית נשארת בתבנית. המתרגמים עובדים על XLIFF שחולץ, וכל לוקאל הופך לבנייה נפרדת. מחרוזות ב-TypeScript משתמשות בתגית `$localize`.

  </Tab>
  <Tab label="ngx-translate" value="ngx-translate">
  <Tabs group="locale">
  <Tab value="en" label="אנגלית">

```json fileName="public/i18n/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="צרפתית">

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

רבים של ICU עובד רק עם `ngx-translate-messageformat-compiler`; המפענח הרגיל רק מחליף `{{count}}`. ‏`"cart.titel"` מתקמפל ומציג את המפתח הגולמי בזמן ריצה.

  </Tab>
  <Tab label="Transloco" value="transloco">
  <Tabs group="locale">
  <Tab value="en" label="אנגלית">

```json fileName="public/i18n/cart/en.json"
{
  "title": "Your cart",
  "items": "{count, plural, one {# item} other {# items}}"
}
```

  </Tab>
  <Tab value="fr" label="צרפתית">

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

ה-scope ‏`cart` נשלף ברינדור הראשון של הרכיב. רבים של ICU דורש `@jsverse/transloco-messageformat`. למפתחות אין טיפוסים; `transloco-keys-manager` מדווח על חסרים ועל מפתחות שאינם בשימוש.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/app/cart-summary/cart-summary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ "he-IL": "העגלה שלך", en: "Your cart", fr: "Votre panier" }),
    items: t({
      "he-IL": plural({
        one: "פריט אחד",
        two: "{{count}} פריטים",
        other: "{{count}} פריטים",
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

כל הלוקאלים נמצאים בקובץ אחד לצד הרכיב. הטיפוסים נוצרים בבנייה, לכן `content().titel` מכשיל `ng build`, ולוקאל חסר ב-`t()` מסומן בעורך.

  </Tab>
</Tabs>

## מה מתאים ליישום שלכם

<AccordionGroup>
<Accordion header="אתר ציבורי, מעט אינטראקציות, SEO בעדיפות">

`@angular/localize`. לכל לוקאל בנייה וכתובת נפרדות, דפים שרונדרו מראש מגיעים מתורגמים ואין runtime של i18n לטעון. עלות הבנייה לפי לוקאל קטנה ביישום שרובו תוכן והחלפת שפה בו נדירה. הוסיפו תגיות `hreflang` תקינות, ראו [מדריך hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/hreflang_guide_multilingual_seo.md).

- [מדריך hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/hreflang_guide_multilingual_seo.md)

</Accordion>
<Accordion header="לוח בקרה או SaaS שבו מחליפים שפה בתוך היישום">

בחרו אפשרות זמן ריצה. טעינת בנייה אחרת מאבדת את המצב בזיכרון, ותפריט שפה שטוען את היישום מחדש מרגיש תקול. `ngx-translate` מספיקה ליישום קטן עם שניים או שלושה לוקאלים. מעבר לכשתים עשרה תכונות, Transloco היא בחירה בטוחה יותר בזכות scopes.

</Accordion>
<Accordion header="התרגומים מגיעים ממערכת TMS או מסוכנות">

`@angular/localize` מייצאת XLIFF שכל TMS קוראת, והמקור בתבנית מספק למתרגמים הקשר אמיתי. גם JSON של `ngx-translate` ו-Transloco נתמך בהרחבה. ודאו שהספק מטפל ברבים של ICU לפני בחירת ספריית זמן ריצה, כי שתיהן דורשות תוסף לכך.

</Accordion>
<Accordion header="יישום גדול, נתיבים עצלים רבים ותקציב גודל חבילה">

Scopes של Transloco או Intlayer. שתיהן נמנעות משליחת מחרוזות כל התכונות לכל נתיב. ההבדל באכיפה: scope של Transloco הוא מוסכמה, ומילון Intlayer נכלל רק היכן ש-`useIntlayer()` מייבאת אותו. ראו [מיטוב החבילה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md) ו[מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md).

- [מיטוב החבילה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)
- [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md)

</Accordion>
<Accordion header="בטיחות טיפוסים היא דרישה">

רק Intlayer מספקת טיפוסים למפתחות כברירת מחדל. ב-`ngx-translate` וב-Transloco שגיאת כתיב במפתח מתקמפלת ומופיעה בייצור כמפתח גולמי. Transloco Keys Manager יכולה לזהות זאת ב-CI, אבל זה שונה משגיאת הידור. ראו [זיהוי תרגומים חסרים](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/detecting_missing_translations.md).

- [זיהוי תרגומים חסרים](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/detecting_missing_translations.md)

</Accordion>
<Accordion header="התרגומים ייווצרו באמצעות AI">

תוכן לצד הרכיב ו-CLI שממלא לוקאלים חסרים הם הדרך הקצרה ביותר. [פקודת `fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md) של Intlayer פועלת עם מפתח ה-API שלכם ומתרגמת מחדש רק שינויים. בקטלוגי XLIFF או JSON תצטרכו לכתוב בעצמכם את אותו התהליך.

- [פקודת `fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md)

</Accordion>
</AccordionGroup>

## החסרונות של כל אחת

- **`@angular/localize`**: בנייה ופריסה לכל לוקאל, טעינה מחדש בהחלפת שפה, ומזהי hash שמנתקים תרגומים בשינוי המקור. טעינת תרגומים מ-CMS אחרי הבנייה דורשת התאמות אתחול מיוחדות.
- **`ngx-translate`**: מפתחות ללא טיפוסים, רבים ו-ICU דרך תוסף, קובץ לוקאל מלא בכל דף, pipe לא טהור שמוערך מחדש בכל זיהוי שינויים, וללא טיפול ב-`LOCALE_ID` לתאריכים ולמספרים.
- **Transloco**: מפתחות ללא טיפוסים, ICU דרך תוסף ו-scopes שהם מוסכמה ולא הבטחה. צריך להרכיב כמה תוספים כדי לקבל מה ש-`@angular/localize` מספקת מובנה.
- **Intlayer**: builder חיצוני ב-`angular.json`, קהילת Angular קטנה יותר ותמיכת ICU חלקית. התוכן מפוזר בכוונה בקוד, ולכן ייצוא קובץ אחד למתרגם דורש [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) או CLI.

- [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)

## מעבר מ-ngx-translate

[מתאם התאימות `@intlayer/ngx-translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/ngx-translate.md) משאיר את `TranslateService`, ה-pipe ‏`translate` וה-directive ‏`[translate]` פעילים בזמן ש-Intlayer מספקת את התוכן, כך שאפשר להעביר תבנית אחת בכל פעם. ההוראות ב[מדריך המעבר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_ngx-translate_to_intlayer.md). עבור Transloco או `@angular/localize`, [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) מאפשר להשאיר את הקטלוגים הקיימים כמקור האמת במהלך המעבר.

- [מתאם התאימות `@intlayer/ngx-translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/ngx-translate.md)
- [מדריך המעבר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_ngx-translate_to_intlayer.md)
- [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)

## שאלות נפוצות

<FAQ>
<Question title="האם ngx-translate עדיין מתוחזקת?">

כן. אחרי שנים של פעילות נמוכה, הצטרף מתחזק חדש ב-2024, ומאז יצאו ממשקי standalone כמו `provideTranslateService`. העיצוב נותר: JSON בזמן ריצה, מפתחות מחרוזת ורבים באמצעות תוסף.

</Question>
<Question title="ngx-translate או Transloco ליישום Angular חדש?">

Transloco, אלא אם היישום קטן. היא מכסה את יכולות `ngx-translate` ומוסיפה scopes, עזרי Signal, הנחיות SSR וכלי מפתחות. הממשקים דומים מספיק כדי שמעבר מאוחר יהיה בעיקר מכני, אך אין סיבה להתחיל בפשוטה יותר אם היישום יגדל.

</Question>
<Question title="האם @angular/localize יכולה להחליף שפה ללא טעינה מחדש?">

לא לפי התכנון המקורי. התרגומים מוטמעים בבנייה, ולכן שפה אחרת מצריכה בנייה אחרת. אפשר לקרוא ל-`loadTranslations()` לפני האתחול כדי לטעון תרגומים בזמן ריצה, אך החלפה עדיין מחייבת הפעלה מחדש של היישום.

</Question>
<Question title="איזו אפשרות עדיפה ל-SEO ב-Angular?">

הניתוב חשוב מהספרייה: כתובת לכל לוקאל, תגיות `hreflang`, ‏`<html lang>` ו-HTML מתורגם שמרונדר בשרת. `@angular/localize` מקלה על כך כי כל לוקאל הוא בנייה נפרדת. ספריות זמן ריצה דורשות SSR ונתיבים מותאמי לוקאל כדי להשתוות. ראו [בינאום ו-SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/internationalization_and_SEO.md).

- [בינאום ו-SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/internationalization_and_SEO.md)

</Question>
<Question title="האם Intlayer עובדת עם Analog?">

כן, דרך Vite. ראו [מדריך Analog](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_analog.md).

- [מדריך Analog](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_analog.md)

</Question>
</FAQ>

## להמשך קריאה

- [הגדרת Intlayer ב-Angular 22](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_angular_21.md)
- [הגדרת Intlayer ב-Angular 19](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_angular_19.md)
- [מדדי ביצועים של i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md)
- [מהדר לעומת i18n הצהרתי](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/compiler_vs_declarative_i18n.md)
- [פורמט הודעות ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/icu_message_format.md)
- [מתאמי תאימות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md)

אותה השוואה למסגרות אחרות:

- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/how_to_pick_react_i18n_library.md)
- [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/how_to_pick_vue_i18n_library.md)
- [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/how_to_pick_svelte_i18n_library.md)
- [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/how_to_pick_solid_i18n_library.md)

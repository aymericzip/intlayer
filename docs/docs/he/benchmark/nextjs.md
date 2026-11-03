---
createdAt: 2026-04-20
updatedAt: 2026-11-03
priority: 8
title: "פתרון ה-i18n הטוב ביותר עבור Next.js בשנת 2026, דוח בנצ'מרק"
description: "השוו בין ספריות בינאום (i18n) עבור Next.js כגון next-intl, next-i18next ו-Intlayer. דוח ביצועים מפורט על גודל חבילה, זליגת תוכן ותגובתיות."
keywords:
  - בנצ'מרק
  - i18n
  - intl
  - nextjs
  - ביצועים
  - intlayer
slugs:
  - doc
  - benchmark
  - nextjs
author: aymericzip
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "עדכון תוצאות בנצ'מרק"
  - version: 9.5.7
    date: 2026-09-23
    changes: "עדכון תוצאות בנצ'מרק"
  - version: 9.5.1
    date: 2026-09-11
    changes: "עדכון תוצאות בנצ'מרק"
  - version: 8.9.8
    date: 2026-05-18
    changes: "הוספת השוואת כוכבי GitHub"
  - version: 8.7.5
    date: 2026-01-06
    changes: "אתחול בנצ'מרק"
---

# ספריות i18n עבור Next.js, דוח בנצ'מרק 2026

דף זה הוא דוח בנצ'מרק עבור פתרונות i18n ב-Next.js.

## תוכן עניינים

<Toc/>

## בנצ'מרק אינטראקטיבי

<I18nBenchmark framework="nextjs" vertical/>

## הפניה לתוצאות:

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

- [צפו בנתוני הבנצ'מרק המלאים](https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md)
- [צפו במאגר הבנצ'מרק המלא](https://github.com/intlayer-org/benchmark-i18n)

## מבוא

לספריות בינאום יש השפעה כבדה על האפליקציה שלכם. הסיכון המרכזי הוא טעינת תוכן עבור כל דף וכל שפה כאשר המשתמש מבקר רק בדף בודד.

ככל שהאפליקציה שלכם גדלה, גודל החבילה (bundle size) עשוי לצמוח באופן אקספוננציאלי, מה שעלול לפגוע בביצועים בצורה מורגשת.

לדוגמה, במקרים הגרועים ביותר, לאחר הוספת בינאום הדף שלכם עלול להיות גדול פי 2 כמעט.

השפעה נוספת של ספריות i18n היא האטה בקצב הפיתוח. הפיכת רכיבים לבעלי תוכן רב-לשוני על פני שפות שונות גוזלת זמן רב.

מכיוון שהבעיה מורכבת, קיימים פתרונות רבים, חלקם מתמקדים ב-DX (חוויית מפתח), אחרים בביצועים או בסקלאביליות וכדומה.

Intlayer מנסה לבצע אופטימיזציה על פני כל הממדים הללו.

> כדי להבין מהיכן הגיעו הספריות הללו, קראו את ההיסטוריה של JavaScript i18n.

- [ההיסטוריה של JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/history_of_i18n.md)

## תקציר (TL;DR)

- **Intlayer** ו-**next-translate**: הבחירות המובילות לביצועי Next.js, המציעות את טביעת הרגל הקטנה ביותר ואת התמיכה הטובה ביותר ברינדור סטטי.
- **next-intl**: האפשרות הטרנדית ביותר, אך כבדה ומורכבת לאופטימיזציה באפליקציות גדולות.
- **next-i18next**: פופולרית ועשירה בתוספים, אך נושאת משקל חבילה משמעותי (~פי 3.8 מ-Intlayer).
- **להימנע מ**: **gt-next** ו-**lingo.dev** בשל בעיות ביצועים חמורות, נעילת ספק (vendor lock-in) ובאגים ששוברים את ה-build.

## בדקו את האפליקציה שלכם

כדי לחשוף בעיות אלו, תוכלו לנסות את [סורק ה-SEO ל-i18n](https://intlayer.org/i18n-seo-scanner) החינמי.

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## הבעיה

ישנן שתי דרכים עיקריות להגביל את ההשפעה של אפליקציה רב-לשונית על גודל ה-bundle שלכם:

- פיצול ה-JSON (או התוכן) על פני קבצים / משתנים / מרחבי שמות (namespaces) כדי שה-bundler יוכל לבצע tree-shaking לתוכן שאינו בשימוש עבור דף נתון
- טעינה דינמית של תוכן הדף רק בשפת הדף הנצפית

מגבלות טכניות עבור גישות אלו:

**טעינה דינמית**

גם כאשר מגדירים נתיבים כמו `[locale]/page.tsx`, עם Webpack או Turbopack, ואפילו אם מוגדר `generateStaticParams`, ה-bundler אינו מתייחס ל-`locale` כאל קבוע סטטי. המשמעות היא שהוא עלול למשוך תוכן עבור כל השפות לתוך כל דף. הדרך העיקרית להגביל זאת היא לטעון תוכן באמצעות dynamic import (למשל `import('./locales/${locale}.json')`).

מה שקורה בזמן ה-build הוא ש-Next.js מייצר קובץ JS bundle אחד לכל שפה (לדוגמה `./locales_fr_12345.js`). לאחר שהאתר נשלח לקליינט, כאשר הדף רץ, הדפדפן מבצע בקשת HTTP נוספת עבור קובץ ה-JS הנדרש (למשל `./locales_fr_12345.js`).

> דרך נוספת להתמודד עם אותה בעיה היא להשתמש ב-`fetch()` כדי לטעון JSON באופן דינמי. כך פועלת `Tolgee` כאשר קובצי JSON יושבים תחת `/public`, או `next-translate`, שמסתמכת על `getStaticProps` כדי לטעון תוכן. הזרימה זהה: הדפדפן מבצע בקשת HTTP נוספת לטעינת הנכס.

**פיצול תוכן**

אם משתמשים בתחביר כמו `const t = useTranslation()` + `t('my-object.my-sub-object.my-key')`, לרוב כל ה-JSON חייב להיות נוכח ב-bundle כדי שהספרייה תוכל לנתח אותו ולחלץ את המפתח. חלק ניכר מאותו תוכן נשלח לקליינט גם כאשר אינו בשימוש כלל בדף.

כדי להקל על כך, חלק מהספריות מבקשות מכם להצהיר לכל דף אילו מרחבי שמות לטעון, לדוגמה `next-i18next`, `next-intl`, `lingui`, `next-translate`, `next-international`.

לעומת זאת, `Paraglide` מוסיפה שלב נוסף לפני ה-build כדי להפוך JSON לסמלים שטוחים כגון `const en_my_var = () => 'my value'`. בתיאוריה הדבר מאפשר tree-shaking של תוכן שאינו בשימוש בדף. כפי שנראה, לשיטה זו עדיין יש פשרות (trade-offs).

לבסוף, `Intlayer` מיישמת אופטימיזציה בזמן ה-build כך ש-`useIntlayer('my-key')` מוחלף בתוכן המתאים ישירות.

## מתודולוגיה

עבור בנצ'מרק זה, השווינו בין הספריות הבאות:

- `Base App` (ללא ספריית i18n)
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/next-intlayer/exports.md) (גרסה 9.5.10)
- [`@intlayer/next-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compat/next-intl.md) (גרסה 9.5.10)
- [`@intlayer/next-i18next`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compat/next-i18next.md) (גרסה 9.5.10)
- [`next-i18next`](https://github.com/i18next/next-i18next) (גרסה 16.3.0)
- [`next-intl`](https://github.com/amannn/next-intl) (גרסה 4.14.2)
- [`@lingui/core`](https://github.com/lingui/js-lingui) (גרסה 6.6.0)
- [`next-translate`](https://github.com/aralroca/next-translate) (גרסה 3.2.0)
- [`next-international`](https://github.com/QuiiBz/next-international) (גרסה 1.3.1)
- [`@inlang/paraglide-js`](https://github.com/opral/paraglide-js) (גרסה 2.15.1)
- [`@tolgee/react`](https://github.com/tolgee/tolgee-js) (גרסה 7.2.0)
- [`@lingo.dev/compiler`](https://github.com/lingodotdev/lingo.dev) (גרסה 0.4.12)
- [`wuchale`](https://github.com/wuchalejs/wuchale) (גרסה 0.26.6)
- [`gt-next`](https://github.com/generaltranslation/gt) (גרסה 11.1.24)

השתמשתי ב-`Next.js` גרסה `16.3.4` עם ה-App Router.

בניתי אפליקציה רב-לשונית עם **10 דפים** ו-**10 שפות**.

השווינו **ארבע אסטרטגיות טעינה**:

| אסטרטגיה         | ללא מרחבי שמות (גלובלי)             | עם מרחבי שמות (scoped)                                     |
| :--------------- | :---------------------------------- | :--------------------------------------------------------- |
| **טעינה סטטית**  | **סטטי**: הכל בזיכרון בזמן העלייה.  | **סטטי מתוחם**: מפוצל לפי מרחב שמות; הכל נטען בזמן העלייה. |
| **טעינה דינמית** | **דינמי**: טעינה לפי דרישה לכל שפה. | **דינמי מתוחם**: טעינה פרטנית לכל מרחב שמות ולכל שפה.      |

## סיכום אסטרטגיות

- **סטטי**: פשוט; ללא השהיית רשת לאחר הטעינה הראשונית. חיסרון: גודל חבילה גדול.
- **דינמי**: מפחית את המשקל הראשוני (lazy-loading). אידיאלי כאשר יש שפות רבות.
- **סטטי מתוחם**: שומר על קוד מסודר (הפרדה לוגית) ללא בקשות רשת מורכבות נוספות.
- **דינמי מתוחם**: הגישה הטובה ביותר עבור _code splitting_ וביצועים. ממזער את צריכת הזיכרון על ידי טעינה של מה שנחוץ לתצוגה הנוכחית ולשפה הפעילה בלבד.

### מה נמדד:

הרצתי את אותה אפליקציה רב-לשונית בדפדפן אמיתי עבור כל מחסנית טכנולוגית, ולאחר מכן תיעדתי מה עבר בפועל ברשת וכמה זמן ארכה כל פעולה. הגדלים מדווחים **לאחר דחיסת רשת רגילה (Gzip/Brotli)**, כיוון שזה קרוב יותר למה שמשתמשים מורידים בפועל לעומת ספירת תווים גולמית של קוד מקור.

- **גודל ספריית בינאום**: לאחר bundling, tree-shaking ו-minification, גודל ספריית ה-i18n הוא גודל הקוד של ה-providers (למשל `NextIntlClientProvider`) + ה-hooks (למשל `useTranslations`) ברכיב ריק. הוא אינו כולל טעינת קובצי תרגום. זה עונה על השאלה עד כמה הספרייה כבדה עוד לפני שהתוכן שלכם נכנס לתמונה.

- **JavaScript לכל דף**: עבור כל נתיב בנצ'מרק, כמה סקריפטים הדפדפן מושך עבור אותו ביקור, בממוצע על פני הדפים במערך הבדיקה (ועל פני השפות שבהן הדוח משקלל אותם). דפים כבדים הם דפים איטיים.

- **זליגה משפות אחרות (Leakage from other locales)**: זהו תוכן של אותו דף אך בשפה אחרת שנטען בטעות בתוך הדף שנבדק. תוכן זה מיותר ויש להימנע ממנו (למשל תוכן דף `/fr/about` בתוך ה-bundle של דף `/en/about`).

- **זליגה מנתיבים אחרים (Leakage from other routes)**: אותו רעיון עבור **מסכים אחרים** באפליקציה: האם הטקסט שלהם נגרר פנימה כאשר פתחתם דף בודד בלבד (למשל תוכן דף `/en/about` בתוך ה-bundle של דף `/en/contact`). ציון גבוה מרמז על פיצול חלש או חבילות רחבות מדי.

- **גודל חבילה ממוצע לרכיב (Average component bundle size)**: רכיבי ממשק משתמש נפוצים נמדדים **אחד אחד** במקום להסתתר בתוך מספר ענק אחד של האפליקציה כולה. זה מראה האם בינאום מנפח בשקט רכיבים יומיומיים. לדוגמה, אם הרכיב שלכם מרנדר מחדש, הוא יטען את כל הנתונים הללו מהזיכרון. הצמדת JSON ענקי לכל רכיב שקולה לחיבור מאגר גדול של נתונים שאינם בשימוש, מה שיאט את ביצועי הרכיבים שלכם.

- **זמן תגובה בהחלפת שפה**: החלפתי את השפה באמצעות הפקד של האפליקציה עצמה ומדדתי כמה זמן לוקח עד שהדף התחלף בבירור, מה שמבקר היה מבחין בו, ולא שלב מעבדה מיקרוסקופי.

- **עבודת רינדור לאחר שינוי שפה**: מעקב ממוקד יותר: כמה מאמץ נדרש מהממשק כדי לצייר מחדש (repaint) את השפה החדשה ברגע שההחלפה מתבצעת. שימושי כאשר הזמן "המורגש" ועלות ה-framework מתפצלים.

- **זמן טעינת דף ראשוני (Initial page load time)**: מרגע הניווט ועד שהדפדפן מחשיב את הדף כטעון במלואו עבור התרחישים שנבדקו. מתאים להשוואת cold starts.

- **זמן הידרציה (Hydration time)**: כאשר האפליקציה חושפת זאת, כמה זמן הקליינט משקיע בהפיכת ה-HTML מהשרת למשהו שניתן ללחוץ עליו. מקף בטבלאות פירושו שאותו מימוש לא סיפק נתון הידרציה אמין בבנצ'מרק זה.

## כוכבי GitHub

כוכבי GitHub הם אינדיקטור חזק לפופולריות של פרויקט, אמון הקהילה ורלוונטיות לטווח ארוך. למרות שאינם מדד ישיר לאיכות טכנית, הם משקפים כמה מפתחים מוצאים את הפרויקט שימושי, עוקבים אחר התקדמותו ונוטים לאמץ אותו. לצורך הערכת שווי של פרויקט, כוכבים עוזרים להשוות משיכה (traction) בין חלופות ומספקים תובנות לגבי צמיחת האקוסיסטם.

[![Star History Chart](https://api.star-history.com/chart?repos=i18next%2Fnext-i18next%2Camannn%2Fnext-intl%2Clingui%2Fjs-lingui%2Caralroca%2Fnext-translate%2Cquiibz%2Fnext-international%2Copral%2Fparaglide-js%2Ctolgee%2Ftolgee-js%2Cgeneraltranslation%2Fgt%2Clingodotdev%2Flingo.dev%2Cwuchalejs%2Fwuchale%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#i18next/next-i18next&amannn/next-intl&lingui/js-lingui&aralroca/next-translate&quiibz/next-international&opral/paraglide-js&tolgee/tolgee-js&generaltranslation/gt&lingodotdev/lingo.dev&wuchalejs/wuchale&aymericzip/intlayer)

## פעילות Commits

כוכבים מעידים על פופולריות. Commits מראים כמה עבודה מושקעת בפרויקט. נכון למועד כתיבת שורות אלו, Intlayer מונה כ-7,500 קומיטים, יותר מרוב הספריות המושוות כאן, וכפי 5 יותר מ-`next-intl` או `next-i18next`.

<GithubCommits repositories="i18next/next-i18next,amannn/next-intl,lingui/js-lingui,aralroca/next-translate,QuiiBz/next-international,opral/paraglide-js,tolgee/tolgee-js,generaltranslation/gt,lingodotdev/lingo.dev,wuchalejs/wuchale,aymericzip/intlayer" />

> Intlayer הוא מונו-ריפו (monorepo), כך שהספירה שלו כוללת כל חבילת framework, את ה-CLI ואת התיעוד. קראו קומיטים כסימן לפעילות, לא כמדד יחיד לאיכות.

## הורדות npm

<NpmDownloads packages="next-i18next,next-intl,@lingui/react,next-translate,next-international,@inlang/paraglide-js,@tolgee/react,gt-next,lingo.dev,wuchale,next-intlayer" period="last-6-months" />

הורדות מתגמלות את הפתרונות הוותיקים ביותר, לא בהכרח את הטובים ביותר. ספרייה ששוחררה לפני שנים עדיין מותקנת על ידי כל פרויקט שבחר בה בעבר, בכל ריצת CI ועל ידי כל חבילה התלויה בה. הספירה מודדת אינרציה יותר מאשר בחירה עדכנית.

עוזרי AI מעצימים את האפקט. `next-intl`, `i18next` ו-`vue-i18n` נמצאים בכל מקום בקוד שעליו הם אומנו, ולכן הם מציעים אותם כברירת מחדל מבלי להשוות חלופות. כל הצעה מוסיפה הורדות, מה שמזין את ההצעה הבאה. השוו על סמך הבנצ'מרק ולא על סמך כמות ההורדות בלבד.

## תוצאות בפירוט

### 1 - פתרונות שכדאי להימנע מהם

פתרונות מסוימים, כגון `gt-next` או `lingo.dev`, עדיף בבירור להימנע מהם. הם משלבים נעילת ספק עם זיהום בסיס הקוד שלכם. למרות שעות רבות של ניסיונות להטמיע אותם, מעולם לא הצלחתי לגרום להם לעבוד ב-TanStack Start או ב-Next.js.

בעיות שנתקלתי בהן:

**(General Translation)** (`gt-next@11.1.24`):

- עבור אפליקציה של 141kb, `gt-next` מוסיפה יותר מ-50kb נוספים.
- שגיאת `Quota Exceeded, please upgrade your plan` כבר ב-build הראשון עם General Translation.
- תרגומים אינם מרונדרים; מתקבלת השגיאה `Error: <T> used on the client-side outside of <GTProvider>`, שנראית כבאג בספרייה.
- במהלך הטמעת **gt-next**, נתקלתי גם ב-[GitHub issue](https://github.com/generaltranslation/gt/issues/1210#event-24510646961) בספרייה: `does not provide an export named 'printAST' - @formatjs/icu-messageformat-parser`, שגרם לאפליקציה להישבר. לאחר דיווח על בעיה זו, המתחזק תיקן אותה תוך 24 שעות.
- הספרייה חוסמת רינדור סטטי של דפי Next.js.

**(Lingo.dev)** (`@lingo.dev/compiler@0.4.12`):

- חריגה ממכסת ה-AI חסמה את ה-build לחלוטין, כך שלא ניתן לשלוח לפרודקשן בלי לשלם.
- המהדר החמיץ כמעט 40% מהתוכן המתורגם. נאלצתי לשכתב את כל ה-`.map` לבלוקי רכיבים שטוחים כדי שזה יעבוד.
- ה-CLI שלהם עמוס באגים ואיפס את קובץ התצורה ללא סיבה.
- בזמן ה-build, הוא מחק לחלוטין את קובצי ה-JSON שנוצרו כאשר נוסף תוכן חדש. כתוצאה מכך, קומץ מפתחות עלול היה למחוק יותר מ-300 מפתחות קיימים.

### 2 - פתרונות ניסיוניים

**(Wuchale)** (`wuchale@0.26.6`):

הרעיון מאחורי `Wuchale` מעניין אך עדיין אינו בר-קיימא. נתקלתי בבעיות תגובתיות (reactivity) ונאלצתי לכפות רינדור מחדש של ה-provider כדי שהאפליקציה תעבוד. התיעוד גם די מעורפל, מה שמקשה על ההתאקלמות הראשונית.

**(Paraglide)** (`@inlang/paraglide-js@2.15.1`):

`Paraglide` מציעה גישה חדשנית ומחושבת היטב. למרות זאת, בבנצ'מרק זה ה-tree-shaking המפורסם לא עבד עבור הגדרות ה-Next.js או ה-TanStack Start שלי. זרימת העבודה ו-DX מורכבים יותר מחלופות אחרות.
באופן אישי איני אוהב את הצורך לייצר מחדש קובצי JS לפני כל push, מה שיוצר סיכון קבוע לקונפליקטים במיזוג דרך PRs. הכלי גם נראה ממוקד יותר ב-Vite מאשר ב-Next.js.
גם אם בתיאוריה אסטרטגיית ה-tree-shaking עובדת, היא כוללת את כל השפות בתוך ה-bundle בכל מקרה. Paraglide אינה מציעה דרך ל-lazy-loading של התוכן. המשמעות היא שגודל הדף שלכם גדל ביחס ישיר למספר השפות שלכם.
לבסוף, בהשוואה לפתרונות אחרים, Paraglide אינה משתמשת ב-store (כגון React context) כדי לשלוף את השפה הנוכחית לרינדור התוכן. עבור כל צומת שמנותח, היא מבקשת את השפה מ-localStorage / cookie וכו'. הדבר מוביל לביצוע לוגיקה מיותרת המשפיעה על תגובתיות הרכיב.

> הערה לגבי paraglide: הפתרון מזריק קוד לתוך בסיס הקוד שלכם לייבוא, וכתוצאה מכך המדד 'lib size' בדוח הבנצ'מרק הוא כמעט 0. יצירת קוד (Code gen) היא דבר טוב, מכיוון שהפונקציה שבשימוש תכלול רק את הלוגיקה ההכרחית (קידומת לכולם מול ללא קידומת, cookie מול אחסון וכו'). לשם השוואה, Intlayer מבצעת סינון זה באמצעות הזרקת משתני סביבה ב-build כדי לאלץ את ה-bundler לבצע tree-shake לתוכן בהתאם ללוגיקה. הודות לכך, paraglide ו-intlayer מתגלות כפתרונות קלים פי 3 עד 8 מ-i18next או next-intl.

### 3 - פתרונות סבירים

**(Tolgee)** (`@tolgee/react@7.2.0`):

`Tolgee` מטפלת ברבות מהבעיות שהוזכרו קודם לכן. מצאתי שקשה יותר לאמץ אותה בהשוואה לכלים דומים. היא אינה מספקת type safety, מה שמקשה על איתור מפתחות חסרים בזמן הידור. נאלצתי לעטוף את הפונקציות של Tolgee בפונקציות משלי כדי להוסיף זיהוי מפתחות חסרים. החבילה גם כבדה יחסית (~14.3kb, שזה בערך פי 2.8 מ-`next-intlayer`).

**(Next Intl)** (`next-intl@4.14.2`):

`next-intl` היא האפשרות הטרנדית ביותר וזו שסוכני AI מקדמים הכי הרבה, אך לדעתי שלא בצדק. קל להתחיל לעבוד איתה. בפועל, ביצוע אופטימיזציה להגבלת זליגת תוכן הוא מורכב. שילוב של טעינה דינמית + מרחבי שמות + טיפוסי TypeScript מאט את הפיתוח במידה ניכרת. החבילה גם כבדה למדי (~14.7kb עבור `NextIntlClientProvider` + `useTranslations`, שזה יותר מפי 2.8 מ-`next-intlayer`). **next-intl** נהגה לחסום רינדור סטטי של דפי Next.js. היא מספקת פונקציית עזר בשם `setRequestLocale()`. נראה שזה טופל חלקית עבור קבצים מרוכזים כמו `en.json` / `fr.json`, אך הרינדור הסטטי עדיין נשבר כאשר התוכן מפוצל למרחבי שמות כגון `en/shared.json` / `fr/shared.json` / `es/shared.json`.

**(Next I18next)** (`next-i18next@16.3.0`):

`next-i18next` היא כנראה האפשרות הפופולרית ביותר מכיוון שהייתה מבין פתרונות ה-i18n הראשונים לאפליקציות JavaScript. יש לה תוספי קהילה רבים. היא חולקת את אותם חסרונות עיקריים כמו `next-intl`. החבילה כבדה במיוחד (~19.7kb עבור `I18nProvider` + `useTranslation`, בערך פי 3.8 מ-`next-intlayer`).

פורמטי ההודעות שונים גם הם: `next-intl` משתמשת ב-ICU MessageFormat, בעוד ש-`i18next` משתמשת בפורמט משלה.

**(Next International)** (`next-international@1.3.1`):

`next-international` מתמודדת גם היא עם הבעיות שלעיל, אך אינה שונה בהרבה מ-`next-intl` או `next-i18next`. היא כוללת את `scopedT()` עבור תרגומים ספציפיים למרחב שמות, אך לשימוש בה אין כמעט השפעה על גודל ה-bundle.

**(Lingui)** (`@lingui/core@6.6.0`):

`Lingui` זוכה לעתים קרובות לשבחים. באופן אישי מצאתי שזרימת העבודה של `lingui extract` / `lingui compile` מורכבת יותר מחלופות, ללא יתרון ברור. הבחנתי גם בתחבירים לא עקביים שמבלבלים כלי AI (למשל `t()`, `t''`, `i18n.t()`, `<Trans>`).

### 4 - המלצות

**(Next Translate)** (`next-translate@3.2.0`):

`next-translate` היא ההמלצה העיקרית שלי אם אתם אוהבים ממשק בסגנון `t()`. היא אלגנטית באמצעות `next-translate-plugin`, וטוענת מרחבי שמות דרך `getStaticProps` עם loader של Webpack / Turbopack. היא גם אחת האפשרויות הקלות ביותר כאן (~3.5kb). עבור חלוקה למרחבי שמות, הגדרתם לכל דף או נתיב בקובץ התצורה מתוכננת היטב וקלה יותר לתחזוקה מאשר החלופות המובילות כמו **next-intl** או **next-i18next**. בגרסה `3.1.2`, ציינתי שרינדור סטטי לא עבד; Next.js נסוגה לרינדור דינמי.

**(Intlayer)** (`next-intlayer@9.5.10`):

לא אשפוט באופן אישי את `next-intlayer` למען האובייקטיביות, מכיוון שזהו הפתרון שלי עצמי.

### הערה אישית

הערה זו היא אישית ואינה משפיעה על תוצאות הבנצ'מרק. בעולם ה-i18n רואים לעתים קרובות קונצנזוס סביב `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>`.

באפליקציות React, הזרקת פונקציה כ-`ReactNode` היא, לדעתי, anti-pattern. היא גם מוסיפה מורכבות מיותרת ותקורת ביצוע של JavaScript (גם אם בקושי מורגשת).

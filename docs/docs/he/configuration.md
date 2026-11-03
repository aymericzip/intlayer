---
createdAt: 2024-08-13
updatedAt: 2026-11-03
priority: 8
title: "הגדרות Intlayer (intlayer.config.ts)"
description: למדו כיצד להגדיר את Intlayer עבור האפליקציה שלכם. הבינו את ההגדרות והאפשרויות השונות הזמינות להתאמת Intlayer לצרכים שלכם.
keywords:
  - הגדרות
  - קונפיגורציה
  - התאמה אישית
  - Intlayer
  - אפשרויות
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 9.3.3
    date: 2026-08-22
    changes: "הפעלת analytics כברירת מחדל, פעיל ברגע ש-`@intlayer/analytics` מותקן"
  - version: 9.1.3
    date: 2026-08-06
    changes: "הפיכת `routing.enableProxy` לשלושה מצבים: לא מוגדר (אוטומטי), `true`, `false`"
  - version: 9.0.0
    date: 2026-07-11
    changes: "הוספת הגדרת `analytics`"
  - version: 9.0.0
    date: 2026-06-24
    changes: "הוספת אפשרות `enableProxy` להגדרות הניתוב"
  - version: 8.10.0
    date: 2026-06-17
    changes: "הוספת אפשרות `format` להגדרות המילון"
  - version: 8.9.4
    date: 2026-05-12
    changes: "הוספת תמיכה בספק LM Studio"
  - version: 8.7.0
    date: 2026-04-08
    changes: "הוספת אפשרויות `prune` ו-`minify` להגדרות הבנייה"
  - version: 8.7.0
    date: 2026-04-03
    changes: "הוספת אפשרות `currentDomain`"
  - version: 8.4.0
    date: 2026-03-20
    changes: "הוספת סימון אובייקט לפי שפה עבור 'compiler.output' ו-'dictionary.fill'"
  - version: 8.3.0
    date: 2026-03-11
    changes: "העברת 'baseDir' מהגדרות 'content' להגדרות 'system'"
  - version: 8.2.0
    date: 2026-03-09
    changes: "עדכון אפשרויות מהדר, הוספת תמיכה ב-'output' ו-'noMetadata'"
  - version: 8.1.7
    date: 2026-02-25
    changes: "עדכון אפשרויות המהדר"
  - version: 8.1.5
    date: 2026-02-23
    changes: "הוספת אפשרות מהדר 'build-only', וקידומת מילון"
  - version: 8.0.6
    date: 2026-02-12
    changes: "הוספת תמיכה בספקים Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face ו-Together.ai"
  - version: 8.0.5
    date: 2026-02-06
    changes: "הוספת `dataSerialization` להגדרות ה-AI"
  - version: 8.0.0
    date: 2026-01-24
    changes: "שינוי שם מצב ייבוא `live` ל-`fetch` כדי לתאר טוב יותר את המנגנון הפנימי."
  - version: 8.0.0
    date: 2026-01-22
    changes: "העברת הגדרת הבנייה `importMode` להגדרות `dictionary`."
  - version: 8.0.0
    date: 2026-01-22
    changes: "הוספת אפשרות `rewrite` להגדרות הניתוב"
  - version: 8.0.0
    date: 2026-01-18
    changes: "הפרדת הגדרות המערכת מהגדרות התוכן. העברת נתיבים פנימיים למאפיין `system`. הוספת `codeDir` להפרדת קובצי תוכן מטרנספורמציית קוד."
  - version: 8.0.0
    date: 2026-01-18
    changes: "הוספת אפשרויות מילון `location` ו-`schema`"
  - version: 7.5.1
    date: 2026-01-10
    changes: "הוספת תמיכה בפורמטי קבצים JSON5 ו-JSONC"
  - version: 7.5.0
    date: 2025-12-17
    changes: "הוספת אפשרות `buildMode`"
  - version: 7.0.0
    date: 2025-10-25
    changes: "הוספת הגדרת `dictionary`"
  - version: 7.0.0
    date: 2025-10-21
    changes: "החלפת הגדרת `middleware` בהגדרת `routing`"
  - version: 7.0.0
    date: 2025-10-12
    changes: "הוספת אפשרות `formatCommand`"
  - version: 6.2.0
    date: 2025-10-12
    changes: "עדכון אפשרות `excludedPath`"
  - version: 6.0.2
    date: 2025-09-23
    changes: "הוספת אפשרות `outputFormat`"
  - version: 6.0.0
    date: 2025-09-21
    changes: "הסרת שדה `dictionaryOutput` ושדה `i18nextResourcesDir`"
  - version: 6.0.0
    date: 2025-09-16
    changes: "הוספת מצב ייבוא `live`"
  - version: 6.0.0
    date: 2025-09-04
    changes: "החלפת שדה `hotReload` ב-`liveSync` והוספת שדות `liveSyncPort` ו-`liveSyncURL`"
  - version: 5.6.1
    date: 2025-07-25
    changes: "החלפת `activateDynamicImport` באפשרות `importMode`"
  - version: 5.6.0
    date: 2025-07-13
    changes: "שינוי ברירת המחדל של contentDir מ-`['src']` ל-`['.']`"
  - version: 5.5.11
    date: 2025-06-29
    changes: "הוספת פקודות `docs`"
author: aymericzip
---

# תיעוד הגדרות Intlayer

## סקירה כללית

קובצי ההגדרות של Intlayer מאפשרים התאמה אישית של היבטים שונים בתוסף, כגון בינאום (internationalization), ניתוב (routing/middleware) וטיפול בתוכן. מסמך זה מספק תיאור מפורט של כל מאפיין בהגדרות.

## תוכן עניינים

<TOC/>

## פורמטים נתמכים לקובץ ההגדרות

Intlayer מקבל קובצי הגדרות בפורמטים JSON, JS, MJS ו-TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

## קובץ הגדרות לדוגמה

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { syncJSON } from "@intlayer/sync-json-plugin";
import { z } from "zod";

/**
 * קובץ הגדרות לדוגמה של Intlayer המציג את כל האפשרויות הזמינות.
 */
const config: IntlayerConfig = {
  /**
   * הגדרות בינאום (Internationalization).
   */
  internationalization: {
    /**
     * רשימת השפות הנתמכות באפליקציה.
     * ברירת מחדל: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * רשימת שפות חובה שיש להגדיר בכל מילון.
     * אם ריק, כל השפות נדרשות במצב `strict`.
     * ברירת מחדל: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * רמת ההקפדה עבור תוכן מתורגם.
     * - "strict": שגיאה אם אחת מהשפות המוצהרות חסרה או אינה מוגדרת.
     * - "inclusive": אזהרה אם שפה מוצהרת חסרה.
     * - "loose": מקבל כל שפה קיימת.
     * ברירת מחדל: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * שפת ברירת מחדל המשמשת כגיבוי (fallback) אם השפה המבוקשת לא נמצאה.
     * ברירת מחדל: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * הגדרות השולטות בפעולות המילון והתנהגות ה-fallback.
   */
  dictionary: {
    /**
     * שולט באופן שבו מילונים מיובאים.
     * - "static": מיובא סטטית בזמן הבנייה.
     * - "dynamic": מיובא דינמית באמצעות Suspense.
     * - "fetch": נשלף דינמית דרך API של live sync.
     * ברירת מחדל: "static"
     */
    importMode: "static",

    /**
     * אסטרטגיה למילוי אוטומטי של תרגומים חסרים באמצעות AI.
     * יכול להיות בוליאני או תבנית נתיב לשמירת התוכן הממולא.
     * ברירת מחדל: true
     */
    fill: true,

    /**
     * המיקום הפיזי של קובצי המילון.
     * - "local": נשמר במערכת הקבצים המקומית.
     * - "remote": נשמר ב-Intlayer CMS.
     * - "hybrid": נשמר הן מקומית והן ב-Intlayer CMS.
     * - "plugin" (או כל מחרוזת מותאמת אישית): מסופק על ידי תוסף או מקור מותאם אישית.
     * ברירת מחדל: "local"
     */
    location: "local",

    /**
     * האם להמיר תוכן אוטומטית (למשל Markdown ל-HTML).
     * ברירת מחדל: false
     */
    contentAutoTransformation: false,
  },

  /**
   * הגדרות ניתוב ו-middleware.
   */
  routing: {
    /**
     * אסטרטגיית ניתוב שפות ב-URL.
     * - "prefix-no-default": קידומת לכל השפות מלבד שפת ברירת המחדל (לדוגמה: /dashboard, /fr/dashboard).
     * - "prefix-all": קידומת לכל השפות (לדוגמה: /en/dashboard, /fr/dashboard).
     * - "no-prefix": ללא שפה ב-URL.
     * - "search-params": שימוש ב-?locale=...
     * ברירת מחדל: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * הפעלת פרוקסי ניתוב השפות (middleware) של Intlayer.
     * שילוב כלי הבנייה (למשל תוסף Vite `intlayer()`) מחבר את ה-middleware
     * לזיהוי שפה / הפניה / שכתוב בפיתוח, תצוגה מקדימה ו-SSR בייצור.
     * - unset (אוטומטי): הפרוקסי פועל, אך שרתי פיתוח ותצוגה מקדימה שומרים על ניתוב
     *   מונע-URL ומתעלמים מהשפה השמורה ב-cookies וב-headers. קידומות עדיין מפוענחות,
     *   השפה עדיין נשמרת, וזיהוי Accept-Language עדיין חל. ייצור מתנהג כמו `true`.
     * - true: התנהגות מלאה בכל סביבה, כולל הפניות מונעות-אחסון.
     * - false: ללא ניתוב שפות. ב-Next.js, ה-middleware של `intlayerProxy`
     *   הופך ל-pass-through בלבד.
     * ברירת מחדל: undefined (auto)
     */
    enableProxy: undefined,

    /**
     * היכן לאחסן את השפה שנבחרה על ידי המשתמש.
     * אפשרויות: 'cookie', 'localStorage', 'sessionStorage', 'header', או מערך של אלו.
     * ברירת מחדל: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * נתיב בסיס (base path) עבור כתובות ה-URL של האפליקציה.
     * ברירת מחדל: ""
     */
    basePath: "",

    /**
     * כללי שכתוב כתובות (URL rewrite) מותאמים אישית לנתיבים ספציפיים לפי שפה.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),

    /**
     * מיפוי שפות לשמות מארח (domain hostnames) עבור ניתוב מבוסס דומיין.
     * כתובות URL עבור שפות אלו יהיו מוחלטות (לדוגמה: https://intlayer.cn/).
     * הדומיין עצמו מגדיר את השפה, ולכן לא מתווספת קידומת שפה לנתיב.
     * ברירת מחדל: undefined
     */
    domains: {
      en: "intlayer.org",
      zh: "intlayer.cn",
    },
  },

  /**
   * הגדרות לאיתור ועיבוד קובצי תוכן.
   */
  content: {
    /**
     * סיומות קבצים לסריקת מילונים.
     * ברירת מחדל: ['.content.ts', '.content.js', '.content.json', וכו']
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * ספריות שבהן ממוקמים קובצי .content.
     * ברירת מחדל: ["."]
     */
    contentDir: ["src"],

    /**
     * ספריות שבהן ממוקם קוד המקור.
     * משמש לאופטימיזציית בנייה וטרנספורמציית קוד.
     * ברירת מחדל: ["."]
     */
    codeDir: ["src"],

    /**
     * תבניות שלא ייכללו בסריקה.
     * ברירת מחדל: ['node_modules', '.intlayer', וכו']
     */
    excludedPath: ["node_modules"],

    /**
     * האם להאזין לשינויים ולבנות מחדש מילונים בזמן פיתוח.
     * ברירת מחדל: true בזמן פיתוח
     */
    watch: true,

    /**
     * פקודה לעיצוב קובצי .content שנוצרו או עודכנו.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * הגדרות עורך ויזואלי (Visual Editor).
   */
  editor: {
    /**
     * האם העורך הוויזואלי מופעל.
     * ברירת מחדל: false
     */
    enabled: true,

    /**
     * כתובת ה-URL של האפליקציה שלכם לאימות מקור (origin).
     * ברירת מחדל: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * פורט עבור שרת העורך המקומי.
     * ברירת מחדל: 8000
     */
    port: 8000,

    /**
     * כתובת URL ציבורית עבור העורך.
     * ברירת מחדל: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * כתובת URL של ה-CMS של Intlayer.
     * ברירת מחדל: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * כתובת URL של ה-API ב-backend.
     * ברירת מחדל: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * האם להפעיל סנכרון תוכן בזמן אמת.
     * ברירת מחדל: false
     */
    liveSync: true,
  },

  /**
   * הגדרות Analytics.
   */
  analytics: {
    /**
     * האם איסוף אנליטיקה מופעל (צפיות בדפים, חשיפות תוכן, אירועי A/B).
     * דורש את התקנת `@intlayer/analytics`, והגדרת `editor.clientId` לשיוך.
     * ברירת מחדל: true
     */
    enabled: true,

    /**
     * אלפיות שנייה בין שליחות אוטומטיות במקבצים ל-backend.
     * ברירת מחדל: 20000
     */
    flushInterval: 20000,

    /**
     * חלק יחסי של הפעלות (sessions) להקלטה, מ-0 (ללא) עד 1 (כולן).
     * ברירת מחדל: 1
     */
    sampleRate: 1,
  },

  /**
   * הגדרות תרגום ויצירה מבוססי AI.
   */
  ai: {
    /**
     * ספק ה-AI לשימוש.
     * אפשרויות: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai', 'lmstudio', 'moonshotai'
     * ברירת מחדל: 'openai'
     */
    provider: "openai",

    /**
     * המודל לשימוש מהספק שנבחר.
     */
    model: "gpt-5.6-terra",

    /**
     * מפתח ה-API של הספק.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * הקשר גלובלי להנחיית ה-AI ביצירת תרגומים.
     */
    applicationContext: "This is a travel booking application.",

    /**
     * כתובת בסיס ל-API של ה-AI.
     */
    baseURL: "http://localhost:3000",

    /**
     * סריאליזציית נתונים (Data serialization).
     *
     * אפשרויות:
     * - "json": סטנדרטי ואמין, צורך יותר טוקנים.
     * - "toon": פחות טוקנים, פחות עקבי מ-JSON.
     *
     * ברירת מחדל: "json"
     */
    dataSerialization: "json",
  },

  /**
   * הגדרות בנייה ואופטימיזציה.
   */
  build: {
    /**
     * הכנת תיקיית .intlayer לפני הבנייה.
     * כברירת מחדל מנסה להכין את תוכן intlayer לפני בניית האפליקציה, אך ניתן להפעיל גם ידנית באמצעות הפקודה `intlayer build`.
     * - "auto": בנייה אוטומטית במהלך בניית האפליקציה.
     * - "manual": דורש פקודת בנייה מפורשת.
     * ברירת מחדל: "auto"
     */
    mode: "auto",

    /**
     * האם לבצע אופטימיזציה ל-bundle הסופי על ידי ניפוי מילונים שאינם בשימוש.
     * ברירת מחדל: true בסביבת ייצור (production)
     */
    optimize: true,

    /**
     * מזעור (minify) המילונים להפחתת גודל ה-bundle.
     * ברירת מחדל: false
     *
     * הערה:
     * - אפשרות זו תתעלם אם `optimize` מושבת.
     * - אפשרות זו תתעלם אם `editor.enabled` מוגדר כ-true.
     */
    minify: false,

    /**
     * ניקוי (purge) מפתחות שאינם בשימוש בתוך מילונים.
     * ברירת מחדל: false
     *
     * הערה:
     * - אפשרות זו תתעלם אם `optimize` מושבת.
     */
    purge: false,

    /**
     * קיבוץ מקטעי (chunks) מילון לפי שפה בהתאם לגבול פיצול הקוד המשתמש בהם,
     * כך שדף הנטען בטעינה עצלה שולף את התוכן שלו בבקשה אחת.
     * ברירת מחדל: true
     *
     * הערה:
     * - חל רק על מילונים המשתמשים ב-`importMode: 'dynamic'`.
     */
    chunkGrouping: true,

    /**
     * טעינת מילון יחד עם המקטע (chunk) שמשתמש בו, במקום לשלוף אותו לאחר רינדור המקטע.
     * קריאות הרינדור מתבצעות סינכרונית במקום להמתין ב-suspension, כך שניווט אינו מהבהב מצב טעינה.
     * ברירת מחדל: true
     *
     * הערה:
     * - חל רק על מילונים המשתמשים ב-`importMode: 'dynamic'`.
     * - רק השפה שנבחרה ממתינה לטעינה, כך שדף עדיין מוריד אך ורק את השפה שהוא מרנדר.
     */
    dictionariesPreload: true,

    /**
     * פורמט הפלט עבור קובצי המילון שנוצרו.
     * ברירת מחדל: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * האם הבנייה צריכה לבדוק טיפוסי TypeScript.
     * ברירת מחדל: false
     */
    checkTypes: false,
  },

  /**
   * הגדרות רישום יומן (Logger).
   */
  log: {
    /**
     * רמת רישום היומן.
     * - "default": רישום רגיל.
     * - "verbose": רישום מפורט לצורכי ניפוי שגיאות (debug).
     * - "disabled": ללא רישום כלל.
     * ברירת מחדל: "default"
     */
    mode: "default",

    /**
     * קידומת לכל הודעות היומן.
     * ברירת מחדל: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * הגדרות מערכת (למקרים מתקדמים)
   */
  system: {
    /**
     * תיקייה לאחסון מילוני לוקליזציה.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * תיקייה עבור module augmentation.
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * תיקייה לאחסון מילונים שטרם מוזגו (unmerged).
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * תיקייה לאחסון טיפוסי מילון.
     */
    typesDir: ".intlayer/types",

    /**
     * תיקייה שבה שמורים קובצי האפליקציה הראשיים.
     */
    mainDir: ".intlayer/main",

    /**
     * תיקייה שבה שמורים קובצי ההגדרות.
     */
    configDir: ".intlayer/config",

    /**
     * תיקייה שבה שמורים קובצי המטמון (cache).
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * הגדרות מהדר (Compiler) (למקרים מתקדמים)
   */
  compiler: {
    /**
     * מציין אם המהדר מופעל.
     *
     * - false: השבתת המהדר.
     * - true: הפעלת המהדר.
     * - "build-only": דילוג על המהדר בזמן פיתוח כדי להאיץ את זמני ההפעלה.
     *
     * ברירת מחדל: false
     */
    enabled: true,

    /**
     * מגדיר את נתיב קובצי הפלט. מחליף את `outputDir`.
     *
     * - נתיבים המתחילים ב-`./` מפוענחים ביחס לתיקיית הרכיב.
     * - נתיבים המתחילים ב-`/` מפוענחים ביחס לשורש הפרויקט (`baseDir`).
     *
     * - שילוב המשתנה `{{locale}}` בנתיב יפעיל יצירה של מילונים נפרדים לכל שפה.
     *
     * דוגמה:
     * ```ts
     * {
     *   // יצירת קובצי .content.ts רב-לשוניים בסמוך לרכיב
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // שווה ערך בשימוש בתבנית מחרוזת
     * }
     * ```
     *
     * ```ts
     * {
     *   // יצירת JSON מרכזי לפי שפה בשורש הפרויקט
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // שווה ערך בשימוש בתבנית מחרוזת
     * }
     * ```
     *
     * רשימת משתנים:
     *   - `fileName`: שם הקובץ.
     *   - `key`: מפתח התוכן.
     *   - `locale`: שפת התוכן.
     *   - `extension`: סיומת הקובץ.
     *   - `componentFileName`: שם קובץ הרכיב.
     *   - `componentExtension`: סיומת קובץ הרכיב.
     *   - `format`: פורמט המילון.
     *   - `componentFormat`: פורמט מילון הרכיב.
     *   - `componentDirPath`: נתיב תיקיית הרכיב.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * מציין אם לשמור את הרכיבים לאחר הטרנספורמציה.
     *
     * - אם `true`, המהדר ישכתב את קובץ הרכיב בדיסק. הטרנספורמציה תהיה קבועה, והמהדר ידלג על הטרנספורמציה בהרצה הבאה. כך, המהדר יכול לבצע טרנספורמציה לאפליקציה, ולאחר מכן ניתן להסירו.
     *
     * - אם `false`, המהדר יזריק את קריאת הפונקציה `useIntlayer()` לקוד בפלט הבנייה בלבד, וישמור על בסיס הקוד המקורי ללא שינוי. הטרנספורמציה תתבצע בזיכרון בלבד.
     */
    saveComponents: false,

    /**
     * הכנסת תוכן בלבד לקובץ שנוצר. שימושי עבור פלטי JSON לפי שפה בפורמט i18next או ICU MessageFormat.
     */
    noMetadata: false,

    /**
     * קידומת מפתח מילון
     */
    dictionaryKeyPrefix: "", // הוספת קידומת אופציונלית למפתחות מילון שחולצו
  },

  /**
   * סכמות מותאמות אישית לאימות תוכן המילונים.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * הגדרות מילון.
   */
  dictionary: {
    /**
     * שולט באופן שבו מילונים מיובאים.
     * - "static": מיובא סטטית בזמן הבנייה.
     * - "dynamic": מיובא דינמית באמצעות Suspense.
     * - "fetch": נשלף דינמית דרך API של live sync.
     */
    importMode: "static",

    /**
     * פורמט הודעות ברירת מחדל לכל המילונים בפרויקט.
     * - 'intlayer': פורמט intlayer המקורי (ברירת מחדל).
     * - 'icu': פורמט הודעות ICU (בשימוש על ידי next-intl, react-intl וכו').
     * - 'i18next': פורמט אינטרפולציה של i18next (בשימוש על ידי i18next, react-i18next, next-i18next).
     * - 'vue-i18n': פורמט Vue I18n (בשימוש על ידי vue-i18n).
     * - 'po': פורמט GNU Gettext PO.
     */
    format: "icu",
  },

  /**
   * הגדרות תוספים (Plugins).
   */
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
    }),
  ],
};

export default config;
````

## מדריך לעיון בהגדרות

הסעיפים הבאים מתארים את הגדרות התצורה השונות הזמינות עבור Intlayer.

### הגדרות בינאום (Internationalization)

מגדיר הגדרות הקשורות לבינאום, כולל שפות זמינות ושפת ברירת המחדל של האפליקציה.

| שדה               | תיאור                                                             | טיפוס      | ברירת מחדל          | דוגמה                | הערה                                                                                                                                                                                                                     |
| ----------------- | ----------------------------------------------------------------- | ---------- | ------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `locales`         | רשימת השפות הנתמכות באפליקציה.                                    | `string[]` | `[Locales.ENGLISH]` | `['en', 'fr', 'es']` |                                                                                                                                                                                                                          |
| `requiredLocales` | רשימת שפות חובה באפליקציה.                                        | `string[]` | `[]`                | `[]`                 | • אם ריק, כל השפות נדרשות במצב `strict`.<br/>• ודאו ששפות החובה מוגדרות גם בשדה `locales`.                                                                                                                               |
| `strictMode`      | הבטחת יישום קפדני של תוכן מתורגם באמצעות TypeScript.              | `string`   | `'inclusive'`       |                      | • אם `"strict"`: הפונקציה `t` דורשת שכל שפה מוצהרת תוגדר, וזורקת שגיאה אם אחת חסרה או אינה מוצהרת.<br/>• אם `"inclusive"`: מתריע על שפות חסרות אך מקבל שפות קיימות שאינן מוצהרות.<br/>• אם `"loose"`: מקבל כל שפה קיימת. |
| `defaultLocale`   | שפת ברירת מחדל המשמשת כגיבוי (fallback) אם השפה המבוקשת לא נמצאה. | `string`   | `Locales.ENGLISH`   | `'en'`               | משמש לקביעת השפה כאשר לא צוינה שפה ב-URL, ב-cookie או ב-header.                                                                                                                                                          |

### הגדרות עורך (Editor)

מגדיר הגדרות הקשורות לעורך המשולב, כולל פורט השרת ומצב פעילות.

| שדה                          | תיאור                                                                                                                                          | טיפוס                             | ברירת מחדל                          | דוגמה                                                                                           | הערה                                                                                                                                                                     |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `applicationURL`             | כתובת ה-URL של האפליקציה.                                                                                                                      | `string`                          | `undefined`                         | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • משמש להגבלת מקור (origin) העורך מטעמי אבטחה.<br/>• אם מוגדר ל-`'*'`, העורך נגיש מכל מקור.                                                                              |
| `port`                       | הפורט המשמש את שרת העורך הוויזואלי.                                                                                                            | `number`                          | `8000`                              |                                                                                                 |                                                                                                                                                                          |
| `editorURL`                  | כתובת ה-URL של שרת העורך.                                                                                                                      | `string`                          | `'http://localhost:8000'`           | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • משמש להגבלת המקורות הרשאים לקיים אינטראקציה עם האפליקציה.<br/>• אם מוגדר ל-`'*'`, נגיש מכל מקור.<br/>• יש להגדיר אם הפורט השתנה או שהעורך מאוחסן בדומיין אחר.          |
| `cmsURL`                     | כתובת ה-URL של ה-CMS של Intlayer.                                                                                                              | `string`                          | `'https://app.intlayer.org'`        | `'https://app.intlayer.org'`                                                                    |                                                                                                                                                                          |
| `backendURL`                 | כתובת ה-URL של שרת ה-backend.                                                                                                                  | `string`                          | `https://back.intlayer.org`         | `http://localhost:4000`                                                                         |                                                                                                                                                                          |
| `enabled`                    | מציין אם האפליקציה מקיימת אינטראקציה עם העורך הוויזואלי.                                                                                       | `boolean`                         | `false`                             | `process.env.NODE_ENV !== 'production'`                                                         | • אם `false`, העורך אינו יכול לקיים אינטראקציה עם האפליקציה.<br/>• השבתה בסביבות מסוימות מחזקת את האבטחה.                                                                |
| `clientId`                   | מאפשר לחבילות intlayer להזדהות מול ה-backend באמצעות oAuth2. לקבלת טוקן גישה, גשו אל [intlayer.org/project](https://app.intlayer.org/project). | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | יש לשמור בסוד; אחסנו במשתני סביבה.                                                                                                                                       |
| `clientSecret`               | מאפשר לחבילות intlayer להזדהות מול ה-backend באמצעות oAuth2. לקבלת טוקן גישה, גשו אל [intlayer.org/project](https://app.intlayer.org/project). | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | יש לשמור בסוד; אחסנו במשתני סביבה.                                                                                                                                       |
| `dictionaryPriorityStrategy` | אסטרטגיית תעדוף מילונים כאשר קיימים מילונים מקומיים ומרוחקים כאחד.                                                                             | `string`                          | `'local_first'`                     | `'distant_first'`                                                                               | • `'distant_first'`: מתעדף מרוחק על פני מקומי.<br/>• `'local_first'`: מתעדף מקומי על פני מרוחק.                                                                          |
| `liveSync`                   | מציין אם שרת האפליקציה יבצע רענון חם (hot reload) של תוכן כאשר מזוהה שינוי ב-CMS, בעורך הוויזואלי או ב-Backend.                                | `boolean`                         | `true`                              | `true`                                                                                          | • כאשר מילון נוסף או מתעדכן, האפליקציה מעדכנת את תוכן הדף.<br/>• סנכרון חי מוציא תוכן לשרת אחר, מה שעלול להשפיע קלות על הביצועים.<br/>• מומלץ לארח את שניהם באותו המחשב. |
| `liveSyncPort`               | הפורט של שרת הסנכרון החי (live sync).                                                                                                          | `number`                          | `4000`                              | `4000`                                                                                          |                                                                                                                                                                          |
| `liveSyncURL`                | כתובת ה-URL של שרת הסנכרון החי.                                                                                                                | `string`                          | `'http://localhost:{liveSyncPort}'` | `'https://example.com'`                                                                         | מצביע ל-localhost כברירת מחדל; ניתן לשינוי עבור שרת live sync מרוחק.                                                                                                     |

### הגדרות Analytics

מגדיר הגדרות הקשורות ל-Intlayer analytics: איסוף נתונים על איזה תוכן מוצג בפועל למשתמשים (צפיות בדפים, חשיפות תוכן) והפעלת בדיקות A/B של תוכן.

אנליטיקה פועלת במודל opt-out: היא מופעלת כברירת מחדל, ומתחילה לאסוף נתונים ברגע שחבילת [`@intlayer/analytics`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/analytics.md) מותקנת **ו-** מוגדר מפתח פרויקט (`editor.clientId`) לשיוך. הגדירו את `analytics.enabled` ל-`false`, או הימנעו מהתקנת החבילה, וכל מנגנון האנליטיקה ינופה (dead-code-eliminated) מתוך ה-bundle של האפליקציה שלכם.

- [`@intlayer/analytics`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/analytics.md)

| שדה             | תיאור                                                            | טיפוס     | ברירת מחדל | דוגמה   | הערה                                                                                                                            |
| --------------- | ---------------------------------------------------------------- | --------- | ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`       | מפעיל איסוף אנליטיקה (צפיות בדפים, חשיפות תוכן, אירועי A/B).     | `boolean` | `true`     | `false` | דורש התקנה של `@intlayer/analytics` והגדרת `editor.clientId` לשיוך; אחרת האנליטיקה תישאר מושבתת גם אם `enabled` מוגדר כ-`true`. |
| `flushInterval` | אלפיות שנייה בין שליחות אוטומטיות במקבצים ל-backend.             | `number`  | `20000`    | `10000` |                                                                                                                                 |
| `sampleRate`    | חלק יחסי של הפעלות (sessions) להקלטה, מ-`0` (ללא) עד `1` (כולן). | `number`  | `1`        | `0.5`   | הדגימה היא דטרמיניסטית לכל session, כך ש-session מוקלט מדווח על כל האירועים שלו (ללא משפכים חלקיים).                            |

### הגדרות ניתוב (Routing)

הגדרות השולטות בהתנהגות הניתוב, כולל מבנה ה-URL, אחסון שפה וטיפול ב-middleware.

| שדה           | תיאור                                                                                                                                                             | טיפוס                                                                                                                                                                                                        | ברירת מחדל             | דוגמה                                                                                                                                                                                              | הערה                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`        | מצב ניתוב URL לטיפול בשפות.                                                                                                                                       | `'prefix-no-default'` &#124; <br/> `'prefix-all'` &#124; <br/> `'no-prefix'` &#124; <br/> `'search-params'`                                                                                                  | `'prefix-no-default'`  | `'prefix-no-default'`: `/dashboard` (en) או `/fr/dashboard` (fr).<br/>`'prefix-all'`: `/en/dashboard`.<br/>`'no-prefix'`: השפה מנוהלת באמצעים אחרים.<br/>`'search-params'`: `/dashboard?locale=fr` | אינו משפיע על ניהול עוגיות או אחסון שפה.                                                                                                                                                                                                                                                                                                                                                                                  |
| `enableProxy` | מפעיל את פרוקסי ניתוב השפות (middleware) של Intlayer.                                                                                                             | `boolean` &#124; <br/> `undefined`                                                                                                                                                                           | `undefined` (auto)     | `true`                                                                                                                                                                                             | • לא מוגדר (אוטומטי): הפרוקסי רץ, אך שרתי פיתוח ותצוגה מקדימה מתעלמים מהשפה השמורה ב-cookies/headers כמקור להפניה. קידומות שפה עדיין מפוענחות (`/en` → `/`), השפה עדיין נשמרת, וזיהוי `Accept-Language` עדיין חל. ייצור מתנהג כמו `true`.<br/>• `true`: התנהגות מלאה בכל סביבה, כולל הפניות מונעות-אחסון.<br/>• `false`: ללא ניתוב שפות; נהלו זאת בעצמכם. ב-Next.js, ה-middleware של `intlayerProxy` הופך ל-pass-through. |
| `storage`     | תצורה לשמירת השפה בלקוח.                                                                                                                                          | `false` &#124; <br/> `'cookie'` &#124; <br/> `'localStorage'` &#124; <br/> `'sessionStorage'` &#124; <br/> `'header'` &#124; <br/> `CookiesAttributes` &#124; <br/> `StorageAttributes` &#124; <br/> `Array` | `['cookie', 'header']` | `'localStorage'` <br/> `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                 | ראו טבלת אפשרויות אחסון להלן.                                                                                                                                                                                                                                                                                                                                                                                             |
| `basePath`    | נתיב הבסיס עבור כתובות ה-URL של האפליקציה.                                                                                                                        | `string`                                                                                                                                                                                                     | `''`                   | `'/my-app'`                                                                                                                                                                                        | אם האפליקציה נמצאת ב-`https://example.com/my-app`, ה-basePath הוא `'/my-app'` וכתובות ה-URL הופכות ל-`https://example.com/my-app/en`.                                                                                                                                                                                                                                                                                     |
| `rewrite`     | כללי שכתוב URL מותאמים אישית העוקפים את מצב הניתוב המוגדר עבור נתיבים ספציפיים. תומך בפרמטרים דינמיים של `[param]`.                                               | `Record<string, StrictModeLocaleMap<string>>`                                                                                                                                                                | `undefined`            | ראו דוגמה להלן                                                                                                                                                                                     | • כללי שכתוב מקבלים עדיפות על פני `mode`.<br/>• עובד עם Next.js ו-Vite.<br/>• הפונקציה `getLocalizedUrl()` מחילה אוטומטית כללים תואמים.<br/>• ראו [שכתוב כתובות מותאם אישית](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/custom_url_rewrites.md).                                                                                                                                                       |
| `domains`     | ממפה שפות לשמות מארח של דומיין עבור ניתוב מבוסס דומיין. כאשר מוגדר, כתובות URL עבור שפה מסוימת משתמשות בדומיין זה כבסיס (URL מוחלט) ולא מתווספת קידומת שפה לנתיב. | `Partial<Record<Locale, string>>`                                                                                                                                                                            | `undefined`            | `{ zh: 'intlayer.zh', fr: 'intlayer.org' }`                                                                                                                                                        | • הפרוטוקול מוגדר כ-`https://` כברירת מחדל אם אינו כלול בשם המארח.<br/>• הדומיין עצמו מזהה את השפה, כך שלא מתווספת קידומת כגון `/zh/`.<br/>• `getLocalizedUrl('/', 'zh')` מחזיר `https://intlayer.zh/`.                                                                                                                                                                                                                   |

**דוגמת `rewrite`**:

```typescript
routing: {
  mode: "prefix-no-default", // אסטרטגיית גיבוי
  rewrite: nextjsRewrite({
    "/about": {
      en: "/about",
      fr: "/a-propos",
    },
    "/product/[slug]": {
      en: "/product/[slug]",
      fr: "/produit/[slug]",
    },
    "/blog/[category]/[id]": {
      en: "/blog/[category]/[id]",
      fr: "/journal/[category]/[id]",
    },
  }),
}
```

#### אפשרויות אחסון (Storage Options)

| ערך                | הערה                                                                                                                                                                                 | תיאור                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| `'cookie'`         | • לעמידה בתקנות GDPR, ודאו הסכמת משתמש נאותה.<br/>• ניתן להתאמה אישית באמצעות `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`).      | מאחסן שפה בעוגיות, נגיש הן בצד הלקוח והן בצד השרת.     |
| `'localStorage'`   | • ללא תפוגה אלא אם נמחק מפורשות.<br/>• פרוקסי Intlayer אינו יכול לגשת אליו.<br/>• ניתן להתאמה אישית באמצעות `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`). | מאחסן שפה בדפדפן ללא תפוגה, בצד הלקוח בלבד.            |
| `'sessionStorage'` | • נמחק בעת סגירת הלשונית/חלון.<br/>• פרוקסי Intlayer אינו יכול לגשת אליו.<br/>• ניתן להתאמה אישית באמצעות `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`). | מאחסן שפה למשך משך הפעלת הדף, בצד הלקוח בלבד.          |
| `'header'`         | • שימושי לקריאות API.<br/>• צד הלקוח אינו יכול לגשת אליו.<br/>• ניתן להתאמה אישית באמצעות `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`).                         | מאחסן או מעביר שפה באמצעות כותרות HTTP, בצד השרת בלבד. |

#### מאפייני עוגייה (Cookie Attributes)

בעת שימוש באחסון עוגיות, ניתן להגדיר מאפייני עוגייה נוספים:

| שדה        | תיאור                                                                                                            | טיפוס                                                 |
| ---------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `name`     | שם העוגייה. ברירת מחדל: `'INTLAYER_LOCALE'`                                                                      | `string`                                              |
| `domain`   | דומיין העוגייה. ברירת מחדל: `undefined`                                                                          | `string`                                              |
| `path`     | נתיב העוגייה. ברירת מחדל: `undefined`                                                                            | `string`                                              |
| `secure`   | דרישת HTTPS. ברירת מחדל: `undefined`                                                                             | `boolean`                                             |
| `httpOnly` | דגל HTTP-only. ברירת מחדל: `undefined`                                                                           | `boolean`                                             |
| `sameSite` | מדיניות SameSite.                                                                                                | `'strict'` &#124; <br/> `'lax'` &#124; <br/> `'none'` |
| `expires`  | ערך מספרי מציין ימים מרגע היצירה; אובייקט `Date` (או מחרוזת תאריך ISO) הוא תפוגה מוחלטת. ברירת מחדל: `undefined` | `Date` &#124; <br/> `number` &#124; <br/> `string`    |
| `maxAge`   | משך חיים בשניות מרגע היצירה. מקבל עדיפות על פני `expires`. ברירת מחדל: `undefined`                               | `number`                                              |

#### מאפייני אחסון שפה (Locale Storage Attributes)

בעת שימוש ב-localStorage או ב-sessionStorage:

| שדה    | תיאור                                           | טיפוס                                            |
| ------ | ----------------------------------------------- | ------------------------------------------------ |
| `type` | סוג האחסון.                                     | `'localStorage'` &#124; <br/> `'sessionStorage'` |
| `name` | שם מפתח האחסון. ברירת מחדל: `'INTLAYER_LOCALE'` | `string`                                         |

#### דוגמאות להגדרות

להלן מספר דוגמאות נפוצות להגדרת מבנה הניתוב החדש:

**הגדרה בסיסית (ברירת מחדל)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**הגדרה תואמת GDPR**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: [
      {
        type: "localStorage",
        name: "user-locale",
      },
      {
        type: "cookie",
        name: "user-locale",
        secure: true,
        sameSite: "strict",
        httpOnly: false,
      },
    ],
    basePath: "",
  },
};

export default config;
```

**מצב פרמטרי חיפוש (Search Parameters Mode)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "search-params",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**מצב ללא קידומת עם אחסון מותאם אישית (No Prefix Mode)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "no-prefix",
    storage: {
      type: "sessionStorage",
      name: "app-locale",
    },
    basePath: "/my-app",
  },
};

export default config;
```

**שכתוב URL מותאם אישית עם נתיבים דינמיים**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // גיבוי לנתיבים שאינם משוכתבים
    storage: "cookie",
    rewrite: nextjsRewrite({
      "/about": {
        en: "/about",
        fr: "/a-propos",
      },
      "/product/[slug]": {
        en: "/product/[slug]",
        fr: "/produit/[slug]",
      },
      "/blog/[category]/[id]": {
        en: "/blog/[category]/[id]",
        fr: "/journal/[category]/[id]",
      },
    }),
  },
};

export default config;
```

### הגדרות תוכן (Content)

הגדרות הקשורות לטיפול בתוכן בתוך האפליקציה, כולל שמות תיקיות, סיומות קבצים ותצורות נגזרות.

| שדה              | תיאור                                                                            | טיפוס      | ברירת מחדל                                                                                                                                                                | דוגמה                                                                                                                                                                                 | הערה                                                                                                                     |
| ---------------- | -------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `watch`          | מציין אם Intlayer צריך להאזין לשינויים בקובצי הצהרת תוכן כדי לבנות מחדש מילונים. | `boolean`  | `true`                                                                                                                                                                    |                                                                                                                                                                                       |                                                                                                                          |
| `fileExtensions` | סיומות קבצים לחיפוש בעת בניית מילונים.                                           | `string[]` | `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.json5', '.content.jsonc', '.content.tsx', '.content.jsx']`                     | `['.data.ts', '.data.js', '.data.json']`                                                                                                                                              | התאמה אישית יכולה לסייע במניעת התנגשויות.                                                                                |
| `contentDir`     | נתיב התיקייה שבה שמורים קובצי הגדרת תוכן (`.content.*`).                         | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library', require.resolve("@my-package/content"), '@my-package/content']`                                                                                          | משמש להאזנה לקובצי תוכן כדי לבנות מחדש מילונים.                                                                          |
| `codeDir`        | נתיב התיקייה שבה שמור קוד המקור, ביחס לתיקיית הבסיס.                             | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library']`                                                                                                                                                         | • משמש להאזנה לקובצי קוד לצורך טרנספורמציה (ניפוי, אופטימיזציה).<br/>• הפרדה מ-`contentDir` יכולה לשפר את ביצועי הבנייה. |
| `excludedPath`   | תיקיות שיוחרגו מחיפוש תוכן.                                                      | `string[]` | `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']` |                                                                                                                                                                                       | מיועד ליישום עתידי.                                                                                                      |
| `formatCommand`  | פקודה לעיצוב קובצי תוכן כאשר Intlayer כותב אותם מקומית.                          | `string`   | `undefined`                                                                                                                                                               | `'npx prettier --write "{{file}}" --log-level silent'` (Prettier), `'npx biome format "{{file}}" --write --log-level none'` (Biome), `'npx eslint --fix "{{file}}" --quiet'` (ESLint) | • `{{file}}` מוחלף בנתיב הקובץ.<br/>• אם לא הוגדר, Intlayer מזהה אוטומטית (מנסה prettier, biome, eslint).                |

### הגדרות מערכת (System)

הגדרות הקשורות לנתיבים פנימיים ולתוצאות הפלט של Intlayer. הגדרות אלו הן פנימיות בדרך כלל ואין צורך לשנותן.

| שדה                       | תיאור                                                                         | טיפוס    | ברירת מחדל                        | דוגמה                | הערה                                       |
| ------------------------- | ----------------------------------------------------------------------------- | -------- | --------------------------------- | -------------------- | ------------------------------------------ |
| `baseDir`                 | תיקיית הבסיס של הפרויקט.                                                      | `string` | `process.cwd()`                   | `'/path/to/project'` | משמש לפענוח כל התיקיות הקשורות ל-Intlayer. |
| `dictionariesDir`         | נתיב התיקייה לאחסון מילוני לוקליזציה.                                         | `string` | `'.intlayer/dictionary'`          |                      |                                            |
| `moduleAugmentationDir`   | תיקייה עבור module augmentation, המאפשרת הצעות IDE טובות יותר ובדיקת טיפוסים. | `string` | `'.intlayer/types'`               | `'intlayer-types'`   | הקפידו לכלול זאת ב-`tsconfig.json`.        |
| `unmergedDictionariesDir` | התיקייה לאחסון מילונים שטרם מוזגו.                                            | `string` | `'.intlayer/unmerged_dictionary'` |                      |                                            |
| `typesDir`                | התיקייה לאחסון טיפוסי מילון.                                                  | `string` | `'.intlayer/types'`               |                      |                                            |
| `mainDir`                 | התיקייה שבה שמורים קובצי האפליקציה הראשיים.                                   | `string` | `'.intlayer/main'`                |                      |                                            |
| `configDir`               | התיקייה שבה שמורים קובצי ההגדרות.                                             | `string` | `'.intlayer/config'`              |                      |                                            |
| `cacheDir`                | התיקייה שבה שמורים קובצי המטמון.                                              | `string` | `'.intlayer/cache'`               |                      |                                            |

### הגדרות מילון (Dictionary)

הגדרות השולטות בפעולות המילון, כולל התנהגות מילוי אוטומטי (auto-fill) ויצירת תוכן.

הגדרת מילון זו משרתת שתי מטרות עיקריות:

1. **ערכי ברירת מחדל**: הגדרת ערכי ברירת מחדל בעת יצירת קובצי הצהרת תוכן
2. **התנהגות Fallback**: אספקת ערכי fallback כאשר שדות מסוימים אינם מוגדרים, מה שמאפשר להגדיר התנהגות פעולות מילון באופן גלובלי

למידע נוסף על קובצי הצהרת תוכן וכיצד מוחלים ערכי תצורה, עיינו ב[תיעוד קובצי תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md).

- [תיעוד קובצי תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md)

| שדה                         | תיאור                                                                                                                   | טיפוס                                                                                                           | ברירת מחדל     | דוגמה                                                                                       | הערה                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | שולט באופן שבו נוצרים קובצי פלט של מילוי אוטומטי (תרגום AI).                                                            | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `true`         | `{ en: '/locales/en/{{key}}.json', fr: ({ key }) => '/locales/fr/${key}.json', es: false }` | • `true`: נתיב ברירת מחדל (אותו קובץ כמו המקור).<br/>• `false`: השבתה.<br/>• תבנית מחרוזת/פונקציה מייצרת קבצים לפי שפה.<br/>• אובייקט לפי שפה: כל שפה ממופה לתבנית משלה; `false` מדלג על אותה שפה.<br/>• הכללת `{{locale}}` מפעילה יצירה לפי שפה.<br/>• הגדרת `fill` ברמת המילון תמיד מקבלת עדיפות על פני הגדרה גלובלית זו.                                                                                                                        |
| `description`               | עוזר להבין את מטרת המילון בעורך וב-CMS. משמש גם כהקשר ליצירת תרגומי AI.                                                 | `string`                                                                                                        | `undefined`    | `'User profile section'`                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `locale`                    | ממיר את המילון לפורמט לפי שפה. כל שדה שמוצהר הופך לצומת תרגום. בהיעדרו, המילון מטופל כרב-לשוני.                         | `LocalesValues`                                                                                                 | `undefined`    | `'en'`                                                                                      | השתמשו בזה כאשר המילון ספציפי לשפה אחת בלבד במקום להכיל תרגומים למספר שפות.                                                                                                                                                                                                                                                                                                                                                                        |
| `contentAutoTransformation` | ממיר אוטומטית מחרוזות תוכן לצמתים בעלי טיפוסיות (markdown, HTML, או insertion).                                         | `boolean` &#124; <br/> `{ markdown?: boolean; html?: boolean; insertion?: boolean }`                            | `false`        | `true`                                                                                      | • Markdown: `### Title` → `md('### Title')`.<br/>• HTML: `<div>Title</div>` → `html('<div>Title</div>')`.<br/>• Insertion: `Hello {{name}}` → `insert('Hello {{name}}')`.                                                                                                                                                                                                                                                                          |
| `location`                  | מציין היכן נשמרים קובצי המילון ואת מצב סנכרון ה-CMS שלהם.                                                               | `'local'` &#124; <br/> `'remote'` &#124; <br/> `'hybrid'` &#124; <br/> `'plugin'` &#124; <br/> `string`         | `'local'`      | `'hybrid'`                                                                                  | • `'local'`: מנוהל מקומית בלבד.<br/>• `'remote'`: מנוהל מרחוק בלבד (CMS).<br/>• `'hybrid'`: מנוהל הן מקומית והן מרחוק.<br/>• `'plugin'` או מחרוזת מותאמת אישית: מנוהל על ידי תוסף או מקור מותאם אישית.                                                                                                                                                                                                                                             |
| `importMode`                | שולט באופן שבו מילונים מיובאים.                                                                                         | `'static'` &#124; <br/> `'dynamic'` &#124; <br/> `'fetch'`                                                      | `'static'`     | `'dynamic'`                                                                                 | • `'static'`: מיובא סטטית (מחליף את `useIntlayer` ב-`useDictionary`).<br/>• `'dynamic'`: מיובא דינמית דרך Suspense (מחליף ב-`useDictionaryDynamic`).<br/>• `'fetch'`: נשלף דרך ה-API של live sync; עובר ל-`'dynamic'` במקרה של כשל.<br/>• מסתמך על תוספי `@intlayer/babel` ו-`@intlayer/swc`.<br/>• המפתחות חייבים להיות מוצהרים סטטית.<br/>• מתעלם אם `optimize` מושבת.<br/>• אינו משפיע על `getIntlayer`, `getDictionary`, `useDictionary` וכו'. |
| `format`                    | פורמט ברירת המחדל להודעות עבור כל המילונים בפרויקט.                                                                     | `'intlayer'` &#124; <br/> `'icu'` &#124; <br/> `'i18next'` &#124; <br/> `'vue-i18n'` &#124; <br/> `'po'`        | `'intlayer'`   | `'icu'`                                                                                     | • `'intlayer'`: פורמט intlayer המקורי.<br/>• `'icu'`: פורמט הודעות ICU.<br/>• `'i18next'`: פורמט אינטרפולציה של i18next.<br/>• `'vue-i18n'`: פורמט Vue I18n.<br/>• `'po'`: פורמט GNU Gettext PO.                                                                                                                                                                                                                                                   |
| `priority`                  | עדיפות המילון. ערכים גבוהים יותר מקבלים קדימות על פני נמוכים יותר בעת פתרון התנגשויות בין מילונים.                      | `number`                                                                                                        | `undefined`    | `1`                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `live`                      | מיושן (Deprecated) - השתמשו ב-`importMode: 'fetch'` במקום זאת. ציין האם תוכן המילון נשלף דינמית דרך ה-API של live sync. | `boolean`                                                                                                       | `undefined`    |                                                                                             | שונה שמו ל-`importMode: 'fetch'` בגרסה v8.0.0.                                                                                                                                                                                                                                                                                                                                                                                                     |
| `schema`                    | נוצר אוטומטית על ידי Intlayer לאימות סכמת JSON.                                                                         | `'https://intlayer.org/schema.json'`                                                                            | auto-generated |                                                                                             | אין לשנות ידנית.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `title`                     | עוזר לזהות את המילון בעורך וב-CMS.                                                                                      | `string`                                                                                                        | `undefined`    | `'User Profile'`                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `tags`                      | מקטלג מילונים ומספק הקשר או הנחיות לעורך ול-AI.                                                                         | `string[]`                                                                                                      | `undefined`    | `['user', 'profile']`                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `version`                   | גרסת המילון המרוחק; עוזר לעקוב איזו גרסה נמצאת כעת בשימוש.                                                              | `string`                                                                                                        | `undefined`    | `'1.0.0'`                                                                                   | • ניתן לניהול ב-CMS.<br/>• אין לשנות מקומית.                                                                                                                                                                                                                                                                                                                                                                                                       |

**דוגמת `fill`**:

```ts
dictionary: {
  fill: {
    en: '/locales/en/{{key}}.content.json',
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  }
}
```

### הגדרות Logger

הגדרות השולטות ביומן הרישום, כולל הקידומת לשימוש.

| שדה      | תיאור                     | טיפוס                                                          | ברירת מחדל      | דוגמה                   | הערה                                                                                       |
| -------- | ------------------------- | -------------------------------------------------------------- | --------------- | ----------------------- | ------------------------------------------------------------------------------------------ |
| `mode`   | מציין את מצב יומן הרישום. | `'default'` &#124; <br/> `'verbose'` &#124; <br/> `'disabled'` | `'default'`     | `'verbose'`             | • `'verbose'`: רישום מידע נוסף לניפוי שגיאות.<br/>• `'disabled'`: משבית לחלוטין את הרישום. |
| `prefix` | קידומת יומן הרישום.       | `string`                                                       | `'[intlayer] '` | `'[my custom prefix] '` |                                                                                            |

### הגדרות AI

הגדרות השולטות בתכונות ה-AI של Intlayer, כולל הספק, המודל ומפתח ה-API.

הגדרה זו היא אופציונלית אם אתם רשומים ב-[לוח הבקרה של Intlayer](https://app.intlayer.org/project) באמצעות מפתח גישה. Intlayer ינהל אוטומטית את פתרון ה-AI היעיל והחסכוני ביותר עבור הצרכים שלכם. שימוש באפשרויות ברירת המחדל מבטיח תחזוקתיות טובה יותר לטווח ארוך, כיוון ש-Intlayer מתעדכן ברציפות לשימוש במודלים הרלוונטיים ביותר.

אם אתם מעדיפים להשתמש במפתח API משלכם או במודל ספציפי, תוכלו להגדיר את תצורת ה-AI המותאמת אישית שלכם.
תצורת AI זו תשמש באופן גלובלי בכל סביבת Intlayer שלכם. פקודות CLI ישתמשו בהגדרות אלו כברירות מחדל עבור הפקודות (למשל `fill`), וכך גם ה-SDK, העורך הוויזואלי וה-CMS. ניתן לעקוף ערכי ברירת מחדל אלו עבור מקרי שימוש ספציפיים באמצעות פרמטרים של הפקודה.

Intlayer תומך במספר ספקי AI לגמישות וחופש בחירה מרביים. הספקים הנתמכים כיום הם:

- **OpenAI** (ברירת מחדל)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Google AI Studio**
- **Google Vertex**
- **Meta Llama**
- **Ollama**
- **OpenRouter**
- **Alibaba Cloud**
- **Fireworks**
- **Hugging Face**
- **Groq**
- **Amazon Bedrock**
- **Together.ai**
- **LM Studio**

| שדה                  | תיאור                                                                                                 | טיפוס                                                                                                                                                                                                                                                                                                                                                                                                                                                | ברירת מחדל  | דוגמה                                                         | הערה                                                                                                                                                                   |
| -------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`           | הספק לשימוש עבור תכונות ה-AI של Intlayer.                                                             | `'openai'` &#124; <br/> `'anthropic'` &#124; <br/> `'mistral'` &#124; <br/> `'deepseek'` &#124; <br/> `'gemini'` &#124; <br/> `'ollama'` &#124; <br/> `'openrouter'` &#124; <br/> `'alibaba'` &#124; <br/> `'fireworks'` &#124; <br/> `'groq'` &#124; <br/> `'huggingface'` &#124; <br/> `'bedrock'` &#124; <br/> `'googleaistudio'` &#124; <br/> `'googlevertex'` &#124; <br/> `'togetherai'` &#124; <br/> `'lmstudio'` &#124; <br/> `'moonshotai'` | `undefined` | `'anthropic'`                                                 | ספקים שונים דורשים מפתחות API שונים ובעלי תמחור שונה.                                                                                                                  |
| `model`              | המודל לשימוש עבור תכונות ה-AI.                                                                        | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                             | ללא         | `'gpt-5.6-terra'`                                             | המודל הספציפי משתנה לפי הספק.                                                                                                                                          |
| `temperature`        | שולט במידת האקראיות של תגובות ה-AI.                                                                   | `number`                                                                                                                                                                                                                                                                                                                                                                                                                                             | ללא         | `0.1`                                                         | טמפרטורה גבוהה יותר = יצירתי יותר ופחות צפוי.                                                                                                                          |
| `apiKey`             | מפתח ה-API שלכם עבור הספק שנבחר.                                                                      | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                             | ללא         | `process.env.OPENAI_API_KEY`                                  | יש לשמור בסוד; אחסנו במשתני סביבה.                                                                                                                                     |
| `applicationContext` | הקשר נוסף אודות האפליקציה שלכם כדי לסייע ל-AI לייצר תרגומים מדויקים יותר (תחום, קהל יעד, טון, מינוח). | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                             | ללא         | `'My application context'`                                    | יכול לשמש להוספת כללים (לדוגמה: `"You should not transform urls"`).                                                                                                    |
| `baseURL`            | כתובת ה-URL הבסיסית עבור ה-API של ה-AI.                                                               | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                             | ללא         | `'https://api.openai.com/v1'` <br/> `'http://localhost:5000'` | יכול להצביע לנקודת קצה מקומית או מותאמת אישית של ה-API.                                                                                                                |
| `dataSerialization`  | פורמט סריאליזציית נתונים עבור תכונות ה-AI.                                                            | `'json'` &#124; <br/> `'toon'`                                                                                                                                                                                                                                                                                                                                                                                                                       | `undefined` | `'toon'`                                                      | • `'json'`: סטנדרטי ואמין; צורך יותר טוקנים.<br/>• `'toon'`: פחות טוקנים, פחות עקבי.<br/>• פרמטרים נוספים מועברים למודל ה-AI כהקשר (reasoning effort, verbosity וכו'). |

### הגדרות בנייה (Build)

הגדרות השולטות באופן שבו Intlayer מבצע אופטימיזציה ובונה את הבינאום של האפליקציה שלכם.

אפשרויות הבנייה חלות על התוספים `@intlayer/babel` ו-`@intlayer/swc`.

> במצב פיתוח, Intlayer משתמש בייבוא סטטי עבור מילונים כדי לפשט את חוויית הפיתוח.

> בעת אופטימיזציה, Intlayer יחליף קריאות למילונים כדי לבצע אופטימיזציה לפיצול מקטעים (chunking), כך שה-bundle הסופי מייבא אך ורק מילונים שנמצאים בשימוש בפועל.

| שדה                   | תיאור                                                                                      | טיפוס                            | ברירת מחדל                                                                                                                                                                        | דוגמה                                                                         | הערה                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------ | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`                | שולט במצב הבנייה.                                                                          | `'auto'` &#124; <br/> `'manual'` | `'auto'`                                                                                                                                                                          | `'manual'`                                                                    | • `'auto'`: הבנייה מופעלת אוטומטית בעת בניית האפליקציה.<br/>• `'manual'`: רץ רק כאשר פקודת הבנייה מופעלת במפורש.<br/>• יכול לשמש להשבתת בניית מילונים (לדוגמה כדי למנוע הרצה בסביבות Node.js מסוימות).                                                                                                                                                                                                        |
| `optimize`            | שולט האם יש לבצע אופטימיזציה לבנייה.                                                       | `boolean`                        | `undefined`                                                                                                                                                                       | `process.env.NODE_ENV === 'production'`                                       | • אם לא מוגדר, אופטימיזציה מופעלת בבניית ה-framework ‏(Vite/Next.js).<br/>• `true` כופה אופטימיזציה כולל במצב dev.<br/>• `false` משבית אותה.<br/>• כאשר מופעל, מחליף קריאות מילון לשיפור ה-chunking - רק מילונים בשימוש מיובאים.<br/>• מסתמך על תוספי `@intlayer/babel` ו-`@intlayer/swc`.<br/>• מפתחות חייבים להיות מוצהרים סטטית.                                                                           |
| `minify`              | האם למזער (minify) את המילונים כדי להפחית את גודל ה-bundle.                                | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | • מציין האם יש למזער את ה-bundle.<br/>• ברירת מחדל: `false`.<br/>• אפשרות זו תתעלם אם `optimize` מושבת.<br/>• אפשרות זו תתעלם אם `editor.enabled` מוגדר כ-true.                                                                                                                                                                                                                                               |
| `purge`               | האם לנקות (purge) מפתחות שאינם בשימוש במילונים.                                            | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | • מציין האם יש לנקות את ה-bundle ממפתחות שאינם בשימוש.<br/>• ברירת מחדל: `false`.<br/>• אפשרות זו תתעלם אם `optimize` מושבת.                                                                                                                                                                                                                                                                                  |
| `checkTypes`          | מציין אם על הבנייה לבדוק טיפוסי TypeScript ולרשום שגיאות.                                  | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | יכול להאט את תהליך הבנייה.                                                                                                                                                                                                                                                                                                                                                                                    |
| `chunkGrouping`       | האם לקבץ מקטעי מילון לפי שפה בהתאם לגבול פיצול הקוד המשתמש בהם.                            | `boolean`                        | `true`                                                                                                                                                                            |                                                                               | • ללא קיבוץ, דף המורכב מרכיבים רבים מוציא בקשה נפרדת לכל מילון.<br/>• מילונים הנגישים ממספר גבולות מועברים למקטע משותף, כך שאף דף אינו שולח תוכן של דף אחר.<br/>• חל רק על מילונים המשתמשים ב-`importMode: 'dynamic'`.<br/>• חל רק על בניית הלקוח (client build), ורק בעת bundling (לא בפיתוח).                                                                                                               |
| `dictionariesPreload` | האם מילון צריך להיטען יחד עם המקטע (chunk) שמשתמש בו, במקום להישלף לאחר שאותו מקטע מרונדר. | `boolean`                        | `true`                                                                                                                                                                            |                                                                               | • נקודת הכניסה שנוצרה מבקשת את השפה הנדרשת תוך כדי הערכתה, כך שהבקשה יוצאת יחד עם המקטע שזקוק לה ולא רק לאחר הרינדור.<br/>• קריאות רינדור נעשות לרוב סינכרונית ללא suspension, כך שניווט אינו מהבהב מצב טעינה.<br/>• רק השפה שנבחרה מתבקשת, כך שדף עדיין מוריד רק את השפה שהוא מרנדר.<br/>• חל רק על מילונים המשתמשים ב-`importMode: 'dynamic'`, בבניית הלקוח.<br/>• אינו מיושם על ידי bundlers מבוססי Metro. |
| `outputFormat`        | שולט בפורמט הפלט של המילונים.                                                              | `('esm' &#124; 'cjs')[]`         | `['esm', 'cjs']`                                                                                                                                                                  | `['cjs']`                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                               |
| `traversePattern`     | תבניות המגדירות אילו קבצים ייסרקו במהלך האופטימיזציה.                                      | `string[]`                       | `['**/*.{tsx,ts,js,mjs,cjs,jsx,vue,svelte,svte}', '!**/node_modules/**', '!**/dist/**', '!**/.intlayer/**', '!**/*.config.*', '!**/*.test.*', '!**/*.spec.*', '!**/*.stories.*']` | `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']` | • הגבלת האופטימיזציה לקבצים רלוונטיים בלבד משפרת את ביצועי הבנייה.<br/>• מתעלם אם `optimize` מושבת.<br/>• משתמש בתבנית glob.                                                                                                                                                                                                                                                                                  |

### הגדרות מהדר (Compiler)

הגדרות השולטות במהדר של Intlayer, אשר מחלץ מילונים ישירות מתוך הרכיבים שלכם.

| שדה                   | תיאור                                                                                                                                                                                                                                                                                       | טיפוס                                                                                                           | ברירת מחדל  | דוגמה                                                                                                                                                    | הערה                                                                                                                                                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`             | מציין אם המהדר מופעל לחילוץ מילונים.                                                                                                                                                                                                                                                        | `boolean` &#124; <br/> `'build-only'`                                                                           | `true`      | `'build-only'`                                                                                                                                           | `'build-only'` מדלג על המהדר בזמן פיתוח כדי להאיץ בנייה; רץ רק בפקודות build.                                                                                                                                           |
| `dictionaryKeyPrefix` | קידומת למפתחות המילון שחולצו.                                                                                                                                                                                                                                                               | `string`                                                                                                        | `''`        | `'my-key-'`                                                                                                                                              | מתווסף למפתח שנוצר (המבוסס על שם הקובץ) כדי למנוע התנגשויות.                                                                                                                                                            |
| `saveComponents`      | מציין האם לשמור את הרכיבים לאחר הטרנספורמציה שלהם.                                                                                                                                                                                                                                          | `boolean`                                                                                                       | `false`     |                                                                                                                                                          | • אם `true`, המהדר ישכתב את קובץ הרכיב בדיסק. הטרנספורמציה תהיה קבועה, ולאחר מכן ניתן להסיר את המהדר.<br/>• אם `false`, המהדר יזריק את קריאת `useIntlayer()` לקוד בפלט הבנייה בלבד, וישמור על בסיס הקוד המקורי ללא פגע. |
| `output`              | מגדיר את נתיב קובץ הפלט. מחליף את `outputDir`. תומך במשתני תבנית: `{{fileName}}`, <br/> `{{key}}`, <br/> `{{locale}}`, <br/> `{{extension}}`, <br/> `{{componentFileName}}`, <br/> `{{componentExtension}}`, <br/> `{{format}}`, <br/> `{{componentFormat}}`, <br/> `{{componentDirPath}}`. | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `undefined` | `'./{{fileName}}{{extension}}'` <br/> `'/locales/{{locale}}/{{key}}.json'` <br/> `{ en: ({ key }) => './locales/en/${key}.json', fr: '...', es: false }` | • נתיבי `./` מפוענחים ביחס לתיקיית הרכיב.<br/>• נתיבי `/` מפוענחים ביחס לשורש הפרויקט.<br/>• הכללת `{{locale}}` מייצרת מילונים נפרדים לפי שפה.<br/>• תומך בסימון אובייקט לפי שפה; `false` מדלג על אותה שפה.             |
| `noMetadata`          | אם `true`, המהדר משמיט מטא-דאטה של מילון (מפתח, מעטפת תוכן) מהפלט.                                                                                                                                                                                                                          | `boolean`                                                                                                       | `false`     | `false` → `{"key":"my-key","content":{"key":"value"}}` <br/> `true` → `{"key":"value"}`                                                                  | • שימושי עבור פלטי JSON בפורמט i18next או ICU MessageFormat.<br/>• עובד היטב עם תוסף `loadJSON`.                                                                                                                        |

### סכמות מותאמות אישית (Custom Schemas)

| שדה       | תיאור                                                  | טיפוס                       |
| --------- | ------------------------------------------------------ | --------------------------- |
| `schemas` | מאפשר להגדיר סכמות Zod כדי לאמת את מבנה המילונים שלכם. | `Record<string, ZodSchema>` |

### תוספים (Plugins)

| שדה       | תיאור                                  | טיפוס              |
| --------- | -------------------------------------- | ------------------ |
| `plugins` | רשימת תוספי (plugins) Intlayer להפעלה. | `IntlayerPlugin[]` |

## שאלות נפוצות

<FAQ>

<Question title="היכן צריך להימצא הקובץ intlayer.config.ts?">

בשורש הפרויקט שלכם, לצד `package.json`.‏ Intlayer מקבל גם `intlayer.config.js`,‏ `intlayer.config.mjs`,‏ `intlayer.config.cjs` ו-JSON, כך שהקובץ תואם לכל מערכת מודולים שבה הפרויקט שלכם משתמש.

</Question>
<Question title="כמה בינאום (i18n) מוסיף לגודל ה-bundle שלי?">

הרבה פחות מהגדרה המבוססת על namespaces, מכיוון שדף אינו מוריד לעולם קטלוג שאינו מרונדר בו. תוכן מרונדר בשרת פותר את התוכן שלו בשרת, והמהדר בזמן הבנייה מחליף קריאות `useIntlayer` בערכי המילון המדויקים שבהם הרכיב משתמש, כך שמפתחות ושפות שאינם בשימוש מושמטים. [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/index.md) מפצלים את השאר לפי שפה. בהשוואה לחלופות המקובלות, Intlayer מפחית את גודל ה-bundle וגודל הדף בעד 50%. ראו [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md) ואת ה-[benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/index.md).

- [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/index.md)
- [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md)
- [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/index.md)

</Question>
<Question title="האם ניתן להגר מ-`i18next`,‏ `next-intl` או `react-i18next` מבלי לשכתב את הרכיבים שלי?">

כן, וישנם שני מסלולים. ניתן להגר את התוכן בהדרגה בעזרת [מדריך ההגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/migration_from_i18next_to_intlayer.md) או [מדריך ההגירה מ-next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/migration_from_next-intl_to_intlayer.md). לחלופין, תוכלו לשמור על ה-API הקיים שלכם לחלוטין: [מתאמי התאימות (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compat/index.md) חושפים בדיוק את אותו ה-API של `i18next`,‏ `react-i18next`,‏ `next-intl`,‏ `next-i18next`,‏ `react-intl`,‏ `use-intl`,‏ `vue-i18n` ו-`Lingui`, אך מופעלים על ידי מילוני Intlayer, כך שרק ה-imports משתנים וקוד הרכיב נשאר זהה.

- [מדריך ההגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/migration_from_i18next_to_intlayer.md)
- [מדריך ההגירה מ-next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/migration_from_next-intl_to_intlayer.md)
- [מתאמי תאימות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compat/index.md)

</Question>
<Question title="האם ניתן לשמור על קובצי תרגום ה-JSON הקיימים שלי?">

כן. ה-[תוסף לסנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-json.md) שומר על קובצי ה-`/messages/{locale}/{namespace}.json` שלכם כמקור האמת ומייצר מהם מילוני Intlayer, בשני הכיוונים. [תוסף לסנכרון PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-po.md) עושה את אותו הדבר עבור קטלוגי gettext, ו-[קבצים לפי שפה (per locale files)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/per_locale_file.md) מאפשרים לפצל תוכן לפי שפה במקום לקבץ את כל השפות בקובץ יחיד.

- [תוסף לסנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-json.md)
- [תוסף לסנכרון PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-po.md)
- [קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/per_locale_file.md)

</Question>
<Question title="האם עליי להעביר את התוכן שלי מפתח אחר מפתח?">

לא. הריצו `npx intlayer extract` ו-Intlayer יקרא את קובצי המקור שלכם, ישלוף את המחרוזות הפונות למשתמש ויכתוב קובץ `.content` לצד כל אחד מהם, כך שתוכלו לבדוק diff במקום להעתיק מחרוזות לקטלוג אחת אחת. עיינו ב[פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md).

- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md)

עבור צינור אוטומטי לחלוטין, ה-[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md) מבצע את אותה פעולה בזמן הבנייה על קוד מקור של JSX, TSX, Vue ו-Svelte, ומייצר את המילונים בכל שינוי כך שאין מפתחות לתחזק ידנית. הוא פועל באמצעות ניתוח סטטי, ולכן מחרוזות שקיימות רק בזמן ריצה נותרות מחוץ להישג ידו, והוא דורש מעט הערות (annotations) כדי להבדיל בין טקסט הפונה למשתמש לבין לוגיקת אפליקציה.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md)

</Question>
<Question title="אילו כלי עורך וסוכני AI זמינים?">

חמישה כלים, כולם אופציונליים:

- **[תוסף VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/vs_code_extension.md)**: קפיצה ישירה ממפתח ב-`useIntlayer` אל קובץ התוכן שמצהיר עליו, חילוץ תוכן מרכיב, והרצת build, fill, test, push ו-pull מלוח הפקודות או מלשונית Intlayer ייעודית.
- **[שרת LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/lsp.md)**: אותה מודעות בכל עורך התומך ב-LSP, עם go to definition, חיפוש כל ההפניות, תצוגה מקדימה בריחוף של ערך מתורגם, השלמה אוטומטית של מפתחות ושדות, והתרעה כאשר מפתח אינו מוצהר בשום מקום. הוא גם מפענח קריאות של `i18next`,‏ `react-i18next`,‏ `next-intl` ו-`use-intl`, מה שמסייע בזמן תהליך ההגירה.
- **[שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/mcp_server.md)**: חושף את התיעוד וה-CLI של Intlayer עבור Cursor, VS Code, Claude Desktop, Claude Code ו-ChatGPT, כך שעוזר יכול לענות מתוך התיעוד העדכני במקום לנחש, ויכול להריץ פקודות כגון `intlayer fill` בעצמו.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/agent_skills.md)**: מיומנויות ממוקדות כגון `intlayer-config`,‏ `intlayer-cli` ו-`intlayer-content`, בתוספת מיומנות ייעודית לכל framework, המלמדות סוכן על תצורת הניתוב שלכם ועל סוגי צומתי התוכן.
- **[תוסף ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/eslint.md)**: כלל `no-raw-text` מתריע על מחרוזות מוטמעות בקוד (hardcoded), עם כללים נוספים למפתחות מילון סטטיים ולתוכן שאינו בשימוש.

</Question>
<Question title="כיצד אוכל להוסיף שפה חדשה לאפליקציה שלי?">

הוסיפו את השפה אל `internationalization.locales`, ולאחר מכן הריצו `npx intlayer fill` כדי לתרגם את התוכן הקיים אליה. הטיפוסים שנוצרו מתעדכנים בו-זמנית, כך שכל קובץ תוכן שבו חסרה השפה החדשה הופך לשגיאת טיפוס (type error) במקום לעבור ל-fallback שקט.

</Question>
<Question title="כיצד אוכל להסיר את קידומת השפה מכתובות ה-URL שלי?">

הגדירו את `routing.mode`. ברירת המחדל `"prefix-no-default"` נותנת `/about` עבור שפת ברירת המחדל ו-`/fr/about` עבור האחרות. הערך `"prefix-all"` מוסיף קידומת לכל שפה. הערך `"no-prefix"` שומר על השפה מחוץ לנתיב לחלוטין ומפענח אותה מתוך עוגייה (cookie), כותרת (header) או דומיין. הערך `"search-params"` מציב אותה במחרוזת השאילתה כמו `/about?locale=fr`.

</Question>
<Question title="האם ניתן להגיש כל שפה מדומיין משלה?">

כן. ההגדרה `routing.domains` ממפה שפה לשם מארח, לדוגמה `{ fr: 'example.fr', en: 'example.com' }`. הדומיין עצמו מזהה את השפה, כך שלא מתווספת קידומת לנתיב, והפונקציה `getLocalizedUrl` מחזירה כתובת URL מוחלטת בדומיין הנכון.

</Question>
<Question title="כיצד מזוהה שפת המשתמש?">

באמצעות `routing.storage`, המפרט את המקורות לקריאה לפי הסדר, בדרך כלל ה-URL, לאחר מכן עוגייה, ולבסוף כותרת `Accept-Language`. בחירה מפורשת של המשתמש נשמרת כך שהיא מנצחת בביקור הבא.

</Question>
<Question title="מה עושה routing.enableProxy?">

הוא שולט בפרוקסי ניתוב השפות, ה-middleware שמפענח קידומות והפניות. כאשר אינו מוגדר, הפרוקסי פועל אך שרתי פיתוח ותצוגה מקדימה מתעלמים מהשפה השמורה כמקור להפניה, מה שמונע הקפצה לשפה שאינכם בודקים כעת; סביבת ייצור מתנהגת כאילו הוגדר `true`. הגדירו כ-`false` כדי לנהל את ניתוב השפות בעצמכם.

</Question>
<Question title="מה ההבדל בין מצבי importMode של static, dynamic ו-fetch?">

`"static"`, ברירת המחדל, מייבא מילונים באופן סטטי כך שהם נארזים ב-bundle ונקראים סינכרונית. `"dynamic"` מייבא אותם דרך Suspense, כך ששפה מורדת רק כאשר רכיב מרנדר אותה, מה שמתאים במיוחד למאגרי תוכן גדולים. `"fetch"` שולף אותם מ-API של live sync ונסוג ל-`"dynamic"` במקרה של כשל. ראו [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md) ו-[מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/index.md).

- [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md)
- [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/index.md)

</Question>
<Question title="היכן מגדירים את ספק ה-AI ומפתח ה-API עבור תרגום אוטומטי?">

או בקובץ ההגדרות או בשורת הפקודה באמצעות `--provider`,‏ `--model` ו-`--api-key`. המפתח נשאר שלכם: קריאות התרגום יוצאות מהמחשב שלכם או מרץ ה-CI שלכם ישירות לספק שבחרתם, כך ששום דבר אינו מנותב דרך צד שלישי. עיינו ב[פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/fill.md).

- [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/fill.md)

</Question>
<Question title="האם עליי להפעיל מחדש את שרת הפיתוח לאחר שינוי ההגדרות?">

בדרך כלל לא. הצופה (watcher) של Intlayer מאזין לקובץ `intlayer.config.ts` בעצמו: בעת שמירה הוא טוען מחדש את ההגדרות ומכין את המילונים מחדש, כך שהוספת שפה או שינוי מצב ניתוב נקלט כמו שינוי תוכן. עם זאת, ייתכן שההגדרות נשמרות במטמון על ידי המערכות, ולכן הפעלה מחדש של האפליקציה עשויה להיות פתרון טוב במידת הצורך.

</Question>

</FAQ>
